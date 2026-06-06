'use client'
import Link from 'next/link'
import { Lead } from '@/domain/entities/Lead'
import { Badge } from '../ui/Badge'

interface LeadTableProps {
  leads: Lead[]
}

export function LeadTable({ leads }: LeadTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {['Name', 'Email', 'Company', 'Phone', 'Status', 'Created On', ''].map(h => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {leads.map(lead => (
            <tr key={lead.id} className="hover:bg-indigo-50 transition-colors">
              <td className="px-4 py-3 font-medium text-gray-900 text-sm">{lead.name}</td>
              <td className="px-4 py-3 text-gray-600 text-sm">{lead.email}</td>
              <td className="px-4 py-3 text-gray-600 text-sm">{lead.company}</td>
              <td className="px-4 py-3 text-gray-600 text-sm">{lead.phone}</td>
              <td className="px-4 py-3"><Badge status={lead.status} /></td>
              <td className="px-4 py-3 text-gray-500 text-sm">
                {new Date(lead.createdOn).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
              </td>
              <td className="px-4 py-3 text-right">
                <Link href={`/leads/${lead.id}`} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors">
                  View →
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
