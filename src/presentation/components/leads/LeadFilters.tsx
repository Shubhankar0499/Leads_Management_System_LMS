'use client'
import { LeadStatus, LEAD_STATUS_OPTIONS } from '@/domain/valueObjects/LeadStatus'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'

interface LeadFiltersProps {
  search: string
  setSearch: (v: string) => void
  statusFilter: LeadStatus | 'all'
  setStatusFilter: (v: LeadStatus | 'all') => void
  sortOrder: 'asc' | 'desc'
  setSortOrder: (v: 'asc' | 'desc') => void
  total: number
  filtered: number
}

export function LeadFilters({ search, setSearch, statusFilter, setStatusFilter, sortOrder, setSortOrder, total, filtered }: LeadFiltersProps) {
  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    ...LEAD_STATUS_OPTIONS.map(o => ({ value: o.value, label: o.label })),
  ]

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
      <div className="flex gap-3 flex-wrap">
        <Input
          placeholder="Search by name or email..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-64"
          aria-label="Search leads"
        />
        <Select
          options={statusOptions}
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as LeadStatus | 'all')}
          aria-label="Filter by status"
        />
        <Select
          options={[
            { value: 'desc', label: '↓ Newest first' },
            { value: 'asc', label: '↑ Oldest first' },
          ]}
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value as 'asc' | 'desc')}
          aria-label="Sort by date"
        />
      </div>
      <p className="text-sm text-gray-500 whitespace-nowrap">
        Showing {filtered} of {total} leads
      </p>
    </div>
  )
}
