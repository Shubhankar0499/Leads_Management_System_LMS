import { ILeadRepository } from '../../domain/repositories/ILeadRepository'
import { Lead } from '../../domain/entities/Lead'
import { Result, ok, fail } from '../../domain/common/Result'

export class GetLeadById {
  constructor(private readonly repo: ILeadRepository) {}

  async execute(id: string): Promise<Result<Lead>> {
    try {
      const lead = await this.repo.getById(id)
      if (!lead) return fail(`Lead with id ${id} not found`)
      return ok(lead)
    } catch {
      return fail('Failed to fetch lead. Please try again.')
    }
  }
}
