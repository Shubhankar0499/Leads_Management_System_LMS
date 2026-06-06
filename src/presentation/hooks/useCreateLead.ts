'use client'
import { useState } from 'react'
import { Lead } from '@/domain/entities/Lead'
import { CreateLeadInput } from '@/application/validators/leadSchema'

export function useCreateLead(onSuccess: (lead: Lead) => void) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const submit = async (data: CreateLeadInput) => {
    setLoading(true)
    setError(null)
    setSuccess(false)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const json = await res.json()
        throw new Error(json.error || 'Failed to create lead')
      }
      const lead = await res.json()
      setSuccess(true)
      onSuccess(lead)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return { submit, loading, error, success }
}
