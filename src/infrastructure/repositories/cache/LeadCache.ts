import { Lead } from '../../../domain/entities/Lead'

export class LeadCache {
  private static instance: LeadCache
  private cache: Map<string, Lead> = new Map()
  private allLeads: Lead[] | null = null
  private readonly ttl: number = 5 * 60 * 1000
  private lastFetched: number = 0

  private constructor() {}

  static getInstance(): LeadCache {
    if (!LeadCache.instance) {
      LeadCache.instance = new LeadCache()
    }
    return LeadCache.instance
  }

  isStale(): boolean {
    return Date.now() - this.lastFetched > this.ttl
  }

  getAll(): Lead[] | null {
    if (this.isStale()) return null
    return this.allLeads
  }

  setAll(leads: Lead[]): void {
    this.allLeads = leads
    this.lastFetched = Date.now()
    leads.forEach(lead => this.cache.set(lead.id, lead))
  }

  getById(id: string): Lead | undefined {
    return this.cache.get(id)
  }

  upsert(lead: Lead): void {
    this.cache.set(lead.id, lead)
    if (this.allLeads) {
      const index = this.allLeads.findIndex(l => l.id === lead.id)
      if (index >= 0) {
        this.allLeads[index] = lead
      } else {
        this.allLeads.push(lead)
      }
    }
  }

  invalidate(): void {
    this.allLeads = null
    this.lastFetched = 0
  }
}