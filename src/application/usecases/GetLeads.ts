import { ILeadRepository } from '../../domain/repositories/ILeadRepository'
import { Lead } from '../../domain/entities/Lead'
import { Result, ok, fail } from '../../domain/common/Result'

export class GetLeads {
  constructor(private readonly repo: ILeadRepository) {}

  async execute(): Promise<Result<Lead[]>> {
    try {
      const leads = await this.repo.getAll()
      return ok(leads)
    } catch {
      return fail('Failed to fetch leads. Please try again.')
    }
  }
}
