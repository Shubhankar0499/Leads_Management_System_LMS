'use client'
import { useState, useEffect } from 'react'
import { Lead } from '@/domain/entities/Lead'

export function useLeadById(id: string) {
  const [lead, setLead] = useState<Lead | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch(`/api/leads/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found')
        return res.json()
      })
      .then(setLead)
      .catch(() => setError('Lead not found.'))
      .finally(() => setLoading(false))
  }, [id])

  const updateStatus = (updated: Lead) => setLead(updated)

  return { lead, loading, error, updateStatus }
}
