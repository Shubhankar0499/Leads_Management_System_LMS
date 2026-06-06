'use client'
import { useState, useEffect } from 'react'
import { Lead } from '@/domain/entities/Lead'

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/leads')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then(setLeads)
      .catch(() => setError('Failed to fetch leads. Please try again.'))
      .finally(() => setLoading(false))
  }, [])

  const addLead = (lead: Lead) => setLeads(prev => [lead, ...prev])

  return { leads, loading, error, addLead }
}
