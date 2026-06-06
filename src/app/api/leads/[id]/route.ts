import { NextRequest, NextResponse } from 'next/server'
import { getLeadByIdUseCase, updateLeadStatusUseCase } from '@/application/services/LeadService'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const result = await getLeadByIdUseCase.execute(id)
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 404 })
  }
  return NextResponse.json(result.data)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = await req.json()
  const result = await updateLeadStatusUseCase.execute(id, body.status, body.updatedBy ?? 'user')
  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }
  return NextResponse.json(result.data)
}
