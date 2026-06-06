'use client'
import Link from 'next/link'
import { Lead } from '@/domain/entities/Lead'
import { Badge } from '../ui/Badge'

export function LeadCard({ lead }: { lead: Lead }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-semibold text-gray-900">{lead.name}</p>
          <p className="text-sm text-gray-500">{lead.company}</p>
        </div>
        <Badge status={lead.status} />
      </div>
      <p className="text-sm text-gray-600 mb-1">{lead.email}</p>
      <p className="text-sm text-gray-600 mb-3">{lead.phone}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-400">
          {new Date(lead.createdOn).toLocaleDateString('en-IN')}
        </span>
        <Link href={`/leads/${lead.id}`} className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
          View →
        </Link>
      </div>
    </div>
  )
}
