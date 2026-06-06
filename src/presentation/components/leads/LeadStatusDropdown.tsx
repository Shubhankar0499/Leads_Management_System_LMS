'use client'
import { useState } from 'react'
import { LeadStatus, LEAD_STATUS_OPTIONS } from '@/domain/valueObjects/LeadStatus'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'

interface LeadStatusDropdownProps {
  leadId: string
  currentStatus: LeadStatus
  onUpdate: (newStatus: LeadStatus) => void
}

export function LeadStatusDropdown({ leadId, currentStatus, onUpdate }: LeadStatusDropdownProps) {
  const [selected, setSelected] = useState<LeadStatus>(currentStatus)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleUpdate = async () => {
    if (selected === currentStatus) return
    setLoading(true)
    setMessage(null)

    // Optimistic update
    onUpdate(selected)

    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: selected, updatedBy: 'user' }),
      })
      if (!res.ok) throw new Error('Update failed')
      setMessage('Status updated successfully!')
    } catch {
      // Revert on failure
      onUpdate(currentStatus)
      setSelected(currentStatus)
      setMessage('Failed to update status.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <Select
        label="Change Status"
        options={LEAD_STATUS_OPTIONS.map(o => ({ value: o.value, label: o.label }))}
        value={selected}
        onChange={e => setSelected(e.target.value as LeadStatus)}
        aria-label="Change lead status"
      />
      <Button onClick={handleUpdate} loading={loading} disabled={selected === currentStatus}>
        Update Status
      </Button>
      {message && (
        <p className={`text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-500'}`}>
          {message}
        </p>
      )}
    </div>
  )
}
