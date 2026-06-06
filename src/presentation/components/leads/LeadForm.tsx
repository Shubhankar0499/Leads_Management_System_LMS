'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '../ui/Input'
import { Select } from '../ui/Select'
import { Button } from '../ui/Button'
import { LEAD_STATUS_OPTIONS } from '@/domain/valueObjects/LeadStatus'
import { CreateLeadInput } from '@/application/validators/leadSchema'
import { Lead } from '@/domain/entities/Lead'
import { useCreateLead } from '@/presentation/hooks/useCreateLead'

interface LeadFormProps {
  onSuccess?: (lead: Lead) => void
}

const defaultForm: CreateLeadInput = {
  name: '',
  email: '',
  company: '',
  phone: '',
  status: 'new',
  createdBy: 'user',
}

type FormErrors = Partial<Record<keyof CreateLeadInput, string>>

export function LeadForm({ onSuccess }: LeadFormProps) {
  const router = useRouter()
  const [form, setForm] = useState<CreateLeadInput>(defaultForm)
  const [errors, setErrors] = useState<FormErrors>({})

  const { submit, loading, error, success } = useCreateLead((lead) => {
    onSuccess?.(lead)
    setTimeout(() => router.push('/leads'), 1500)
  })

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (form.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = 'Please enter a valid email'
    if (form.company.trim().length < 2) newErrors.company = 'Company must be at least 2 characters'
    if (form.phone.replace(/\D/g, '').length < 10) newErrors.phone = 'Phone must have at least 10 digits'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    await submit(form)
  }

  const set = (field: keyof CreateLeadInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 max-w-2xl">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input id="name" label="Full Name *" value={form.name} onChange={set('name')} error={errors.name} placeholder="Rahul Sharma" />
        <Input id="email" label="Email *" type="email" value={form.email} onChange={set('email')} error={errors.email} placeholder="rahul@company.in" />
        <Input id="company" label="Company *" value={form.company} onChange={set('company')} error={errors.company} placeholder="TechCorp India" />
        <Input id="phone" label="Phone *" value={form.phone} onChange={set('phone')} error={errors.phone} placeholder="+91-9876543210" />
        <Select
          id="status"
          label="Status *"
          value={form.status}
          onChange={set('status')}
          options={LEAD_STATUS_OPTIONS.map(o => ({ value: o.value, label: o.label }))}
        />
        <Input id="createdBy" label="Created By" value={form.createdBy} onChange={set('createdBy')} placeholder="user" />
      </div>

      {error && <p className="mt-4 text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg">{error}</p>}
      {success && <p className="mt-4 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg"> Lead created! Redirecting...</p>}

      <div className="mt-6 flex gap-3">
        <Button type="submit" loading={loading}>Create Lead</Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>Cancel</Button>
      </div>
    </form>
  )
}
