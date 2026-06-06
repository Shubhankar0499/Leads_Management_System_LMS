import { LeadStatus, LEAD_STATUS_OPTIONS } from '@/domain/valueObjects/LeadStatus'

interface BadgeProps {
  status: LeadStatus
}

export function Badge({ status }: BadgeProps) {
  const option = LEAD_STATUS_OPTIONS.find(o => o.value === status)
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${option?.color}`}>
      {option?.label ?? status}
    </span>
  )
}
