import { ILeadRepository, CreateLeadData } from '../../domain/repositories/ILeadRepository'
import { Lead } from '../../domain/entities/Lead'
import { Result, ok, fail } from '../../domain/common/Result'
import { createLeadSchema } from '../validators/leadSchema'

export class CreateLead {
  constructor(private readonly repo: ILeadRepository) {}

  async execute(data: CreateLeadData): Promise<Result<Lead>> {
    try {
      const validation = createLeadSchema.safeParse(data)
      if (!validation.success) {
        return fail(validation.error.errors[0].message)
      }
      const lead = await this.repo.create(validation.data)
      return ok(lead)
    } catch {
      return fail('Failed to create lead. Please try again.')
    }
  }
}
