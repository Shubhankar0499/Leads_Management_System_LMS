import { NextRequest, NextResponse } from 'next/server'
import { getLeadsUseCase, createLeadUseCase } from '@/application/services/LeadService'

export async function GET() {
  const result = await getLeadsUseCase.execute()
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 })
  }
  return NextResponse.json(result.data)
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const result = await createLeadUseCase.execute(body)
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }
  return NextResponse.json(result.data, { status: 201 })
}
