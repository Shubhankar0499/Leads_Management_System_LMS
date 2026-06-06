'use client'
import { use } from 'react'
import Link from 'next/link'
import { useLeadById } from '@/presentation/hooks/useLeadById'
import { LeadDetailCard } from '@/presentation/components/leads/LeadDetailCard'
import { Spinner } from '@/presentation/components/ui/Spinner'
import { LeadStatus } from '@/domain/valueObjects/LeadStatus'

export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { lead, loading, error, updateStatus } = useLeadById(id)

  const handleStatusUpdate = (status: LeadStatus) => {
    if (lead) updateStatus({ ...lead, status })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link href="/leads" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
          ← Back to Leads
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-sm text-gray-700 font-medium">{lead?.name ?? 'Lead Detail'}</span>
      </div>

      {loading && <Spinner />}

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      {!loading && !error && lead && (
        <LeadDetailCard lead={lead} onStatusUpdate={handleStatusUpdate} />
      )}
    </div>
  )
}
