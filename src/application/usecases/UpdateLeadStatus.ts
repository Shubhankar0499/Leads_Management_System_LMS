import { ILeadRepository } from '../../domain/repositories/ILeadRepository'
import { Lead } from '../../domain/entities/Lead'
import { LeadStatus } from '../../domain/valueObjects/LeadStatus'
import { Result, ok, fail } from '../../domain/common/Result'
import { updateStatusSchema } from '../validators/leadSchema'

export class UpdateLeadStatus {
  constructor(private readonly repo: ILeadRepository) {}

  async execute(id: string, status: LeadStatus, updatedBy: string): Promise<Result<Lead>> {
    try {
      const validation = updateStatusSchema.safeParse({ status, updatedBy })
      if (!validation.success) {
        return fail(validation.error.errors[0].message)
      }
      const lead = await this.repo.updateStatus(id, status, updatedBy)
      return ok(lead)
    } catch {
      return fail('Failed to update lead status. Please try again.')
    }
  }
}
