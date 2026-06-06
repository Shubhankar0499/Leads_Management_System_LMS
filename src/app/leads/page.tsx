'use client'
import Link from 'next/link'
import { useLeads } from '@/presentation/hooks/useLeads'
import { useLeadFilters } from '@/presentation/hooks/useLeadFilters'
import { LeadTable } from '@/presentation/components/leads/LeadTable'
import { LeadFilters } from '@/presentation/components/leads/LeadFilters'
import { Spinner } from '@/presentation/components/ui/Spinner'
import { EmptyState } from '@/presentation/components/ui/EmptyState'
import { Button } from '@/presentation/components/ui/Button'

export default function LeadsPage() {
  const { leads, loading, error } = useLeads()
  const { search, setSearch, statusFilter, setStatusFilter, sortOrder, setSortOrder, filtered } = useLeadFilters(leads)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-sm text-gray-500 mt-0.5">Manage and track your sales leads</p>
        </div>
        <Link href="/leads/new">
          <Button>+ New Lead</Button>
        </Link>
      </div>

      {loading && <Spinner />}

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-red-700 text-sm">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <LeadFilters
            search={search}
            setSearch={setSearch}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            total={leads.length}
            filtered={filtered.length}
          />
          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <LeadTable leads={filtered} />
          )}
        </>
      )}
    </div>
  )
}
