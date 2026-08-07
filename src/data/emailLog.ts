export type MessageStatus = 'Queued' | 'Sent' | 'Delivered' | 'Opened' | 'Bounced' | 'Failed' | 'Received'
export type MessageDirection = 'outbound' | 'inbound'

export interface EmailMessage {
  id: string
  direction: MessageDirection
  to: string
  from: string
  subject: string
  automation?: string
  status: MessageStatus
  at: string
  provider: 'Resend' | 'Inbound'
}

export const EMAIL_LOG_STORAGE_KEY = 'synapse-email-log-v1'

const ago = (h: number) => new Date(Date.now() - h * 3_600_000).toISOString()

export const initialEmailLog: EmailMessage[] = [
  { id: 'em-1', direction: 'outbound', to: 'maya.adeyemi@oms.edu', from: 'no-reply@synapse.app', subject: 'Welcome to Synapse', automation: 'Welcome to Synapse', status: 'Delivered', at: ago(1.5), provider: 'Resend' },
  { id: 'em-2', direction: 'outbound', to: 'sam.okoro@oms.edu', from: 'no-reply@synapse.app', subject: 'Your assessment result is ready', automation: 'Your assessment result is ready', status: 'Opened', at: ago(3), provider: 'Resend' },
  { id: 'em-3', direction: 'outbound', to: 'priya.nair@mms.edu', from: 'billing@synapse.app', subject: 'Synapse Payment Receipt', automation: 'Synapse Payment Receipt', status: 'Sent', at: ago(5), provider: 'Resend' },
  { id: 'em-4', direction: 'outbound', to: 'karim.hassan@num.edu', from: 'no-reply@synapse.app', subject: 'A Review is Due', automation: 'A Review is Due', status: 'Delivered', at: ago(7), provider: 'Resend' },
  { id: 'em-5', direction: 'outbound', to: 'old.address@oms.edu', from: 'billing@synapse.app', subject: 'Synapse Payment Needs Attention', automation: 'Synapse Payment Needs Attention', status: 'Bounced', at: ago(9), provider: 'Resend' },
  { id: 'em-6', direction: 'outbound', to: 'nour.saleh@oms.edu', from: 'no-reply@synapse.app', subject: 'Your Planned Study Session', automation: 'Your Planned Study Session', status: 'Failed', at: ago(11), provider: 'Resend' },
  { id: 'em-7', direction: 'inbound', to: 'support@synapse.app', from: 'youssef.farouk@oms.edu', subject: 'Re: Your assessment result is ready — question about my score', status: 'Received', at: ago(2), provider: 'Inbound' },
  { id: 'em-8', direction: 'inbound', to: 'support@synapse.app', from: 'layla.mansour@mms.edu', subject: 'Cannot access Adaptive after payment', status: 'Received', at: ago(6), provider: 'Inbound' },
]
