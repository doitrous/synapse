import { useEffect, useMemo, useState } from 'react'
import { Bot, CircleAlert, KeyRound, Plus, RefreshCw, RotateCcw, Trash2, TriangleAlert } from 'lucide-react'
import { PageContainer, PageHeader } from '@/components/shell/Page'
import { Panel, PanelHeader } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Field, Select, TextInput, Textarea } from '@/components/ui/Field'
import { IconButton } from '@/components/ui/IconButton'
import { Toggle } from '@/components/ui/Toggle'
import { Table, Td, Th, Tr } from '@/components/ui/Table'
import { Icon } from '@/components/ui/Icon'
import { useAssistantAdmin, type AssistantTier } from '@/lib/useAssistantAdmin'

/**
 * The study assistant's control surface.
 *
 * Three things an admin needs to be able to do without a deploy: change the
 * model, change the key, and change what each plan may spend. They are three
 * panels in that order, because that is the order they are needed in — a
 * misconfigured key makes the quota irrelevant.
 *
 * The API key is write-only. What comes back is four characters and where the
 * key came from, which is enough to tell two keys apart and useless to anyone
 * reading over a shoulder.
 */

function emptyTier(): AssistantTier {
  return { plan: '', label: '', dailyMessages: 30, enabled: true }
}

export function AssistantSetup() {
  const { settings, usage, loading, saving, error, notice, save, saveTier, removeTier, reload, live,
          models, modelsLoading, loadModels } = useAssistantAdmin()

  const [provider, setProvider] = useState('')
  const [baseUrl, setBaseUrl] = useState('')
  const [model, setModel] = useState('')
  const [maxTokens, setMaxTokens] = useState(700)
  const [temperature, setTemperature] = useState(0.3)
  const [extraPrompt, setExtraPrompt] = useState('')
  const [apiKey, setApiKey] = useState('')
  const [draftTier, setDraftTier] = useState<AssistantTier | null>(null)

  // The form mirrors the server's answer whenever it changes, so a save that
  // was rejected leaves the fields showing what is actually stored.
  useEffect(() => {
    if (!settings) return
    setProvider(settings.provider)
    setBaseUrl(settings.baseUrl)
    setModel(settings.model)
    setMaxTokens(settings.maxTokens)
    setTemperature(settings.temperature)
    setExtraPrompt(settings.extraPrompt)
  }, [settings])

  const activeProvider = settings?.providers.find((entry) => entry.id === provider)
  /** The live list when it is for this provider, else the built-in suggestions. */
  const modelOptions = useMemo(() => {
    const live = models && models.provider === provider ? models.models : []
    return live.length ? live : (activeProvider?.suggested ?? [])
  }, [models, provider, activeProvider])

  if (!live) {
    return (
      <PageContainer>
        <PageHeader title="AI Assistant" description="Model, key, and what each plan may spend." />
        <Panel className="p-6">
          <div className="flex items-start gap-3">
            <Icon icon={CircleAlert} size={18} className="mt-0.5 shrink-0 text-ink-3" />
            <div>
              <p className="text-[14px] font-semibold text-ink">This screen needs a live backend</p>
              <p className="mt-1.5 max-w-prose text-[13px] leading-relaxed text-ink-2">
                The assistant is configured on the server, not in the browser. Set <code className="font-mono text-[12px]">VITE_API_BASE</code> and
                sign in against a real Supabase project to edit it. Nothing here is stored in demo mode.
              </p>
            </div>
          </div>
        </Panel>
      </PageContainer>
    )
  }

  const unconfiguredPlans = settings?.plansInUse.filter((plan) => !plan.configured) ?? []
  const totalMessages = usage?.daily.reduce((sum, day) => sum + day.messages, 0) ?? 0
  const totalStudents = usage?.byPlan.reduce((sum, row) => sum + row.students, 0) ?? 0

  return (
    <PageContainer>
      <PageHeader
        title="AI Assistant"
        description="Model, key, and what each plan may spend."
        actions={
          <div className="flex items-center gap-3">
            {settings && (
              <div className="flex items-center gap-2">
                <Toggle
                  checked={settings.enabled}
                  onChange={(next) => void save({ enabled: next })}
                  label="Assistant enabled"
                />
                <span className="text-[13px] font-medium text-ink-2">
                  {settings.enabled ? 'On for students' : 'Off'}
                </span>
              </div>
            )}
            <Button variant="secondary" iconLeft={RotateCcw} onClick={() => void reload()} disabled={loading}>
              Refresh
            </Button>
          </div>
        }
      />

      {error && (
        <div className="mb-4 flex items-start gap-2.5 rounded-lg border border-danger/30 bg-danger/8 px-3.5 py-2.5">
          <Icon icon={TriangleAlert} size={15} className="mt-0.5 shrink-0 text-danger" />
          <p className="text-[13px] leading-relaxed text-ink">{error}</p>
        </div>
      )}
      {notice && !error && (
        <div className="mb-4 rounded-lg border border-success/30 bg-success/10 px-3.5 py-2.5 text-[13px] text-ink">{notice}</div>
      )}

      {loading && !settings && <Panel className="p-6 text-[13.5px] text-ink-3">Loading…</Panel>}

      {settings && (
        <div className="grid gap-5">
          {/* ---- Key ---- */}
          <Panel>
            <PanelHeader
              title={`API key — ${activeProvider?.label ?? 'provider'}`}
              icon={KeyRound}
              hint="One key per provider, stored encrypted. Never sent back to this screen."
            />
            <div className="grid gap-4 border-t border-line p-4 sm:p-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-[13px] text-ink-2">Currently using</span>
                {settings.keySource === 'stored' && (
                  <Badge tone="success" dot>Stored key ····{settings.keyHint}</Badge>
                )}
                {settings.keySource === 'environment' && (
                  <Badge tone="neutral" dot>A key from the server environment</Badge>
                )}
                {settings.keySource === 'none' && <Badge tone="danger" dot>No key — the assistant cannot answer</Badge>}
                {activeProvider?.consoleUrl && (
                  <a
                    href={activeProvider.consoleUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-[12.5px] font-medium text-accent-strong hover:underline"
                  >
                    Get a {activeProvider.label} key
                  </a>
                )}
              </div>

              {settings.keyUnreadable && (
                <p className="rounded-lg border border-warning/30 bg-warning/10 px-3.5 py-2.5 text-[12.5px] leading-relaxed text-ink">
                  A key is stored but will not decrypt — <code className="font-mono">ASSISTANT_KEY_SECRET</code> has changed since it was
                  saved. Enter the key again to re-encrypt it under the current secret.
                </p>
              )}

              {!settings.keyStorageAvailable && (
                <p className="rounded-lg border border-line bg-inset px-3.5 py-2.5 text-[12.5px] leading-relaxed text-ink-2">
                  <code className="font-mono">ASSISTANT_KEY_SECRET</code> is not set on the server, so a key cannot be stored from here.
                  Set it (16+ characters) and restart, or supply <code className="font-mono">ANTHROPIC_API_KEY</code> in the environment.
                </p>
              )}

              <div className="flex flex-wrap items-end gap-3">
                <Field
                  label={`Key for ${activeProvider?.label ?? 'this provider'}`}
                  hint="Paste a key to store it against this provider. Switching provider does not lose the others."
                  className="min-w-[260px] flex-1"
                >
                  <TextInput
                    type="password"
                    autoComplete="off"
                    placeholder="sk-ant-…"
                    value={apiKey}
                    onChange={(event) => setApiKey(event.target.value)}
                    disabled={!settings.keyStorageAvailable}
                  />
                </Field>
                <Button
                  variant="primary"
                  loading={saving}
                  disabled={!settings.keyStorageAvailable || !apiKey.trim()}
                  onClick={async () => { if (await save({ apiKey: apiKey.trim(), keyProvider: provider })) setApiKey('') }}
                >
                  Save key
                </Button>
                {settings.keySource === 'stored' && (
                  <Button variant="secondary" disabled={saving} onClick={() => void save({ apiKey: '', keyProvider: provider })}>
                    Clear stored key
                  </Button>
                )}
              </div>
            </div>
          </Panel>

          {/* ---- Provider and model ---- */}
          <Panel>
            <PanelHeader
              title="Provider and model"
              icon={Bot}
              hint="Applies to the next message a student sends."
            />
            <div className="grid gap-4 border-t border-line p-4 sm:p-5 lg:grid-cols-2">
              <Field
                label="Provider"
                htmlFor="assistant-provider"
                hint={activeProvider?.requiresBaseUrl
                  ? 'Any OpenAI-compatible endpoint. Give it a base URL below.'
                  : activeProvider?.defaultBaseUrl ?? undefined}
              >
                <Select
                  id="assistant-provider"
                  value={provider}
                  onChange={(event) => {
                    const next = event.target.value
                    setProvider(next)
                    // The model belongs to the provider: keeping the old id
                    // would leave a Groq model selected against Gemini.
                    const def = settings.providers.find((entry) => entry.id === next)
                    setModel(def?.suggested[0] ?? '')
                  }}
                >
                  {settings.providers.map((entry) => (
                    <option key={entry.id} value={entry.id}>
                      {entry.label}
                      {entry.hasStoredKey || entry.hasEnvKey ? ' — key set' : ' — no key'}
                    </option>
                  ))}
                </Select>
              </Field>

              <Field
                label="Base URL"
                hint={activeProvider?.requiresBaseUrl
                  ? 'Required for a custom provider.'
                  : 'Leave empty to use the provider default. Set it to route through a proxy.'}
              >
                <TextInput
                  value={baseUrl}
                  onChange={(event) => setBaseUrl(event.target.value)}
                  placeholder={activeProvider?.defaultBaseUrl ?? 'https://…/v1'}
                />
              </Field>

              <Field
                className="lg:col-span-2"
                label="Model"
                hint="Type any model id the provider accepts. Load the list to see what it offers today."
              >
                <div className="flex flex-wrap items-center gap-2">
                  <TextInput
                    className="min-w-[240px] flex-1"
                    list="assistant-model-options"
                    value={model}
                    onChange={(event) => setModel(event.target.value)}
                    placeholder={activeProvider?.suggested[0] ?? 'model-id'}
                  />
                  <Button
                    variant="secondary"
                    iconLeft={RefreshCw}
                    loading={modelsLoading}
                    onClick={() => void loadModels(provider)}
                  >
                    Load models
                  </Button>
                </div>
                {/* A datalist, not a select: the list is a suggestion and the
                    field must still accept a model released this morning. */}
                <datalist id="assistant-model-options">
                  {modelOptions.map((id) => <option key={id} value={id} />)}
                </datalist>
                {models && models.provider === provider && (
                  <p className="mt-1.5 text-[12px] text-ink-3">
                    {models.models.length > 0
                      ? `${models.models.length} models offered by ${activeProvider?.label ?? provider}.`
                      : 'That provider did not return a list. The suggestions above still work.'}
                  </p>
                )}
              </Field>

              <Field label="Longest answer" hint="In tokens, 100–4000. Short answers are the house style; 700 is about six sentences.">
                <TextInput
                  type="number" min={100} max={4000} step={50}
                  value={maxTokens}
                  onChange={(event) => setMaxTokens(Number(event.target.value))}
                />
              </Field>

              <Field label="Temperature" hint="0 is repeatable, 1 is varied. Clinical explanation wants the low end.">
                <TextInput
                  type="number" min={0} max={1} step={0.05}
                  value={temperature}
                  onChange={(event) => setTemperature(Number(event.target.value))}
                />
              </Field>

              <Field
                className="lg:col-span-2"
                label="Additional instructions"
                hint="Appended to the built-in prompt — it cannot replace it. The clinical-guidance refusal is not editable from here."
              >
                <Textarea
                  rows={4}
                  value={extraPrompt}
                  onChange={(event) => setExtraPrompt(event.target.value)}
                  placeholder="e.g. Refer students to the Year 3 handbook for cardiology station criteria."
                />
              </Field>

              <div className="lg:col-span-2 flex flex-wrap items-center gap-3">
                <Button
                  variant="primary"
                  loading={saving}
                  disabled={!model.trim() || (Boolean(activeProvider?.requiresBaseUrl) && !baseUrl.trim())}
                  onClick={() => void save({ provider, baseUrl, model: model.trim(), maxTokens, temperature, extraPrompt })}
                >
                  Save provider and model
                </Button>
                {activeProvider && !activeProvider.hasStoredKey && !activeProvider.hasEnvKey && (
                  <span className="text-[12.5px] text-warning">
                    {activeProvider.label} has no key yet — set one above before enabling.
                  </span>
                )}
              </div>
            </div>
          </Panel>

          {/* ---- Limits ---- */}
          <Panel>
            <PanelHeader
              title="Daily limits by plan"
              hint="Messages a student may send per day. Enforced on the server."
              action={
                <Button variant="secondary" size="sm" iconLeft={Plus} onClick={() => setDraftTier(emptyTier())}>
                  Add a plan
                </Button>
              }
            />

            {unconfiguredPlans.length > 0 && (
              <div className="border-t border-line bg-warning/8 px-4 py-3 sm:px-5">
                <p className="text-[12.5px] leading-relaxed text-ink">
                  <Icon icon={TriangleAlert} size={13} className="me-1.5 inline text-warning" />
                  {unconfiguredPlans.map((plan) => `${plan.plan} (${plan.accounts})`).join(', ')} — on live subscriptions with no limit of
                  their own, so they use the Free allowance. Add a plan below to give them their own.
                </p>
              </div>
            )}

            <div className="border-t border-line">
              <Table>
                <thead>
                  <tr>
                    <Th>Plan</Th>
                    <Th align="end">Messages / day</Th>
                    <Th align="center">Assistant on</Th>
                    <Th align="end" />
                  </tr>
                </thead>
                <tbody>
                  {settings.tiers.map((tier) => (
                    <Tr key={tier.plan}>
                      <Td>
                        <span className="font-medium text-ink">{tier.label}</span>
                        <span className="ms-2 font-mono text-[11.5px] text-ink-3">{tier.plan}</span>
                      </Td>
                      <Td align="end">
                        <input
                          type="number" min={0} max={10000}
                          className="tnum w-24 rounded-md border border-line bg-surface px-2 py-1 text-end text-[13px] text-ink focus:border-accent focus:outline-none"
                          defaultValue={tier.dailyMessages}
                          onBlur={(event) => {
                            const next = Number(event.target.value)
                            if (next !== tier.dailyMessages) void saveTier({ ...tier, dailyMessages: next })
                          }}
                        />
                      </Td>
                      <Td align="center">
                        <div className="flex justify-center">
                          <Toggle
                            checked={tier.enabled}
                            onChange={(next) => void saveTier({ ...tier, enabled: next })}
                            label={`Assistant on for ${tier.label}`}
                          />
                        </div>
                      </Td>
                      <Td align="end">
                        {tier.plan !== 'free' && (
                          <IconButton
                            icon={Trash2}
                            label={`Remove ${tier.label}`}
                            onClick={() => void removeTier(tier.plan)}
                          />
                        )}
                      </Td>
                    </Tr>
                  ))}
                </tbody>
              </Table>
            </div>

            {draftTier && (
              <div className="grid gap-3 border-t border-line p-4 sm:grid-cols-[1fr_1fr_auto_auto] sm:items-end sm:p-5">
                <Field label="Plan name" hint="As typed on the subscription screen.">
                  <TextInput
                    value={draftTier.label}
                    onChange={(event) => setDraftTier({ ...draftTier, label: event.target.value, plan: event.target.value })}
                    placeholder="Residency"
                  />
                </Field>
                <Field label="Messages / day">
                  <TextInput
                    type="number" min={0} max={10000}
                    value={draftTier.dailyMessages}
                    onChange={(event) => setDraftTier({ ...draftTier, dailyMessages: Number(event.target.value) })}
                  />
                </Field>
                <Button
                  variant="primary"
                  disabled={!draftTier.label.trim() || saving}
                  onClick={async () => { if (await saveTier(draftTier)) setDraftTier(null) }}
                >
                  Add
                </Button>
                <Button variant="ghost" onClick={() => setDraftTier(null)}>Cancel</Button>
              </div>
            )}
          </Panel>

          {/* ---- Usage ---- */}
          <Panel>
            <PanelHeader title="Usage" hint={`Last ${usage?.days ?? 30} days.`} />
            <div className="grid gap-4 border-t border-line p-4 sm:p-5">
              <div className="flex flex-wrap gap-x-10 gap-y-3">
                <div>
                  <p className="text-[11.5px] font-medium uppercase tracking-[0.06em] text-ink-3">Messages</p>
                  <p className="tnum mt-1 font-serif text-[26px] font-semibold text-ink">{totalMessages.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[11.5px] font-medium uppercase tracking-[0.06em] text-ink-3">Students</p>
                  <p className="tnum mt-1 font-serif text-[26px] font-semibold text-ink">{totalStudents.toLocaleString()}</p>
                </div>
              </div>

              {usage && usage.byPlan.length > 0 ? (
                <Table>
                  <thead>
                    <tr>
                      <Th>Plan</Th>
                      <Th align="end">Messages</Th>
                      <Th align="end">Students</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {usage.byPlan.map((row) => (
                      <Tr key={row.plan}>
                        <Td>{row.plan}</Td>
                        <Td align="end" className="tnum">{row.messages.toLocaleString()}</Td>
                        <Td align="end" className="tnum">{row.students.toLocaleString()}</Td>
                      </Tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p className="text-[13px] text-ink-3">Nothing spent yet.</p>
              )}
            </div>
          </Panel>
        </div>
      )}
    </PageContainer>
  )
}
