'use client'
import { useState, useMemo } from 'react'
import { Lead } from '@/domain/entities/Lead'
import { LeadStatus } from '@/domain/valueObjects/LeadStatus'

export function useLeadFilters(leads: Lead[]) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'all'>('all')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')

  const filtered = useMemo(() => {
    let result = [...leads]

    if (statusFilter !== 'all') {
      result = result.filter(l => l.status === statusFilter)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(
        l => l.name.toLowerCase().includes(q) || l.email.toLowerCase().includes(q)
      )
    }

    result.sort((a, b) => {
      const dateA = new Date(a.createdOn).getTime()
      const dateB = new Date(b.createdOn).getTime()
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB
    })

    return result
  }, [leads, search, statusFilter, sortOrder])

  return { search, setSearch, statusFilter, setStatusFilter, sortOrder, setSortOrder, filtered }
}
