import { useCallback, useEffect, useState } from 'react'
import { API_MODE, apiDelete, apiGet, apiPut } from '@/lib/api'

/**
 * The study assistant's configuration, from the admin side.
 *
 * Every write returns the whole settings document rather than the field that
 * changed, and this hook replaces its state with that answer. The server owns
 * things the browser cannot compute — whether a key decrypts, which plans are
 * on real subscriptions, which of those have no limit row — and patching local
 * state would show an admin a configuration the server does not hold.
 *
 * The API key is never part of what comes back. `keyHint` is four characters.
 */

export interface AssistantTier {
  plan: string
  label: string
  dailyMessages: number
  enabled: boolean
}

/** A plan on live subscriptions, and whether it has a limit of its own. */
export interface AssistantPlanInUse {
  plan: string
  key: string
  accounts: number
  configured: boolean
}

export interface AssistantSettings {
  enabled: boolean
  model: string
  maxTokens: number
  temperature: number
  extraPrompt: string
  keyHint: string | null
  keySource: 'stored' | 'environment' | 'none'
  /** A stored key that will not decrypt — usually a rotated wrapping secret. */
  keyUnreadable: boolean
  /** False when ASSISTANT_KEY_SECRET is unset, which forbids saving a key. */
  keyStorageAvailable: boolean
  tiers: AssistantTier[]
  plansInUse: AssistantPlanInUse[]
}

export interface AssistantUsage {
  days: number
  daily: { day: string; messages: number; students: number; inputTokens: number; outputTokens: number }[]
  byPlan: { plan: string; messages: number; students: number }[]
  heaviest: { userId: string; email: string | null; messages: number }[]
}

export interface AssistantSettingsPatch {
  enabled?: boolean
  model?: string
  maxTokens?: number
  temperature?: number
  extraPrompt?: string
  /** Empty string clears the stored key and falls back to the environment. */
  apiKey?: string
}

/** The server's error code, turned into a sentence an admin can act on. */
const MESSAGES: Record<string, string> = {
  key_storage_unavailable:
    'ASSISTANT_KEY_SECRET is not set on the server, so a key cannot be stored. Set it and restart, or supply ANTHROPIC_API_KEY in the environment instead.',
  invalid_api_key: 'That does not look like an API key.',
  invalid_model: 'Enter a model id.',
  invalid_max_tokens: 'Answer length must be between 100 and 4000 tokens.',
  invalid_temperature: 'Temperature must be between 0 and 1.',
  prompt_too_long: 'Additional instructions must be under 4000 characters.',
  invalid_limit: 'A daily limit must be a whole number between 0 and 10,000.',
  cannot_delete_fallback: 'Free is the fallback every unconfigured plan uses, so it cannot be removed.',
}

async function readError(error: unknown): Promise<string> {
  const message = error instanceof Error ? error.message : String(error)
  for (const [code, text] of Object.entries(MESSAGES)) if (message.includes(code)) return text
  const status = message.match(/(\d{3})/)
  return status ? `Request failed (${status[1]}).` : message || 'Something went wrong.'
}

export function useAssistantAdmin() {
  const [settings, setSettings] = useState<AssistantSettings | null>(null)
  const [usage, setUsage] = useState<AssistantUsage | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  const load = useCallback(async () => {
    if (!API_MODE) { setLoading(false); return }
    setLoading(true)
    try {
      const [next, spend] = await Promise.all([
        apiGet<AssistantSettings>('/api/admin/assistant'),
        apiGet<AssistantUsage>('/api/admin/assistant/usage?days=30'),
      ])
      setSettings(next)
      setUsage(spend)
      setError('')
    } catch (cause) {
      setError(await readError(cause))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { void load() }, [load])

  /** Run a write, adopt the settings it returns, and report what happened. */
  const mutate = useCallback(async (run: () => Promise<AssistantSettings>, success: string) => {
    setSaving(true)
    setError('')
    setNotice('')
    try {
      setSettings(await run())
      setNotice(success)
      return true
    } catch (cause) {
      setError(await readError(cause))
      return false
    } finally {
      setSaving(false)
    }
  }, [])

  const save = useCallback(
    (patch: AssistantSettingsPatch) =>
      mutate(() => apiPut<AssistantSettings>('/api/admin/assistant', patch), 'Saved.'),
    [mutate],
  )

  const saveTier = useCallback(
    (tier: { plan: string; label: string; dailyMessages: number; enabled: boolean }) =>
      mutate(
        () => apiPut<AssistantSettings>(`/api/admin/assistant/tiers/${encodeURIComponent(tier.plan)}`, tier),
        `${tier.label} limit saved.`,
      ),
    [mutate],
  )

  const removeTier = useCallback(
    (plan: string) =>
      mutate(() => apiDelete<AssistantSettings>(`/api/admin/assistant/tiers/${encodeURIComponent(plan)}`), 'Tier removed.'),
    [mutate],
  )

  return { settings, usage, loading, saving, error, notice, setNotice, save, saveTier, removeTier, reload: load, live: API_MODE }
}
