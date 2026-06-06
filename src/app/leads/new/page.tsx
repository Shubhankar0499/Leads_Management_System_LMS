import Link from 'next/link'
import { LeadForm } from '@/presentation/components/leads/LeadForm'

export default function NewLeadPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Link href="/leads" className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
          ← Back to Leads
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-sm text-gray-700 font-medium">New Lead</span>
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Add New Lead</h1>
        <p className="text-sm text-gray-500 mt-0.5">Fill in the details to create a new lead</p>
      </div>
      <LeadForm />
    </div>
  )
}
