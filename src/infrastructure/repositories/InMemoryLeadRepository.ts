import { v4 as uuidv4 } from 'uuid'
import { Lead } from '../../domain/entities/Lead'
import { LeadStatus } from '../../domain/valueObjects/LeadStatus'
import { ILeadRepository, CreateLeadData } from '../../domain/repositories/ILeadRepository'
import { LeadCache } from './cache/LeadCache'
import leadsData from './data/leads.json'

export class InMemoryLeadRepository implements ILeadRepository {
  private leads: Lead[] = leadsData.map(
    (l) =>
      new Lead(
        l.id,
        l.name,
        l.email,
        l.company,
        l.phone,
        l.status as LeadStatus,
        l.createdBy,
        l.createdOn,
        l.updatedBy,
        l.updatedOn
      )
  )

  private cache = LeadCache.getInstance()

  private simulateDelay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 600))
  }

  async getAll(): Promise<Lead[]> {
    const cached = this.cache.getAll()
    if (cached) {
      console.log(' Serving from cache')
      return cached
    }
    await this.simulateDelay()
    this.cache.setAll(this.leads)
    console.log('Fetched fresh data')
    return this.leads
  }

  async getById(id: string): Promise<Lead | null> {
    const cached = this.cache.getById(id)
    if (cached) {
      console.log(` Lead ${id} served from cache`)
      return cached
    }
    await this.simulateDelay()
    const lead = this.leads.find((l) => l.id === id) ?? null
    return lead
  }

  async create(data: CreateLeadData): Promise<Lead> {
    await this.simulateDelay()
    const newLead = new Lead(
      uuidv4(),
      data.name,
      data.email,
      data.company,
      data.phone,
      data.status,
      data.createdBy
    )
    this.leads.push(newLead)
    this.cache.invalidate()
    console.log(' New lead created, cache invalidated')
    return newLead
  }

  async updateStatus(
    id: string,
    status: LeadStatus,
    updatedBy: string
  ): Promise<Lead> {
    await this.simulateDelay()
    const lead = this.leads.find((l) => l.id === id)
    if (!lead) throw new Error(`Lead with id ${id} not found`)
    lead.status = status
    lead.updatedBy = updatedBy
    lead.updatedOn = new Date().toISOString()
    this.cache.upsert(lead)
    console.log(` Lead ${id} status updated to ${status}`)
    return lead
  }
}