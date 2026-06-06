export type LeadStatus = 
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'lost'

export const LEAD_STATUS_OPTIONS: { value: LeadStatus; label: string; color: string }[] = [
  { value: 'new',        label: 'New',        color: 'bg-blue-100 text-blue-700'   },
  { value: 'contacted',  label: 'Contacted',  color: 'bg-yellow-100 text-yellow-700' },
  { value: 'qualified',  label: 'Qualified',  color: 'bg-green-100 text-green-700'  },
  { value: 'lost',       label: 'Lost',       color: 'bg-red-100 text-red-700'     },
]