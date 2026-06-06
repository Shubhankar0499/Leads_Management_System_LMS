'use client'
import { Lead } from '@/domain/entities/Lead'
import { Badge } from '../ui/Badge'
import { LeadStatusDropdown } from './LeadStatusDropdown'
import { LeadStatus } from '@/domain/valueObjects/LeadStatus'

interface LeadDetailCardProps {
  lead: Lead
  onStatusUpdate: (status: LeadStatus) => void
}

export function LeadDetailCard({ lead, onStatusUpdate }: LeadDetailCardProps) {
  const fields = [
    { label: 'Email', value: lead.email },
    { label: 'Company', value: lead.company },
    { label: 'Phone', value: lead.phone },
    { label: 'Created By', value: lead.createdBy },
    { label: 'Created On', value: new Date(lead.createdOn).toLocaleString('en-IN') },
    { label: 'Updated By', value: lead.updatedBy },
    { label: 'Updated On', value: new Date(lead.updatedOn).toLocaleString('en-IN') },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{lead.name}</h2>
            <p className="text-gray-500 mt-1">{lead.company}</p>
          </div>
          <Badge status={lead.status} />
        </div>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {fields.map(f => (
            <div key={f.label} className="rounded-lg bg-gray-50 px-4 py-3">
              <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{f.label}</dt>
              <dd className="mt-1 text-sm text-gray-900 font-medium">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Update Status</h3>
        <LeadStatusDropdown leadId={lead.id} currentStatus={lead.status} onUpdate={onStatusUpdate} />
      </div>
    </div>
  )
}
