import { Lead } from '../entities/Lead'
import { LeadStatus } from '../valueObjects/LeadStatus'

export interface ILeadRepository {
  getAll(): Promise<Lead[]>
  getById(id: string): Promise<Lead | null>
  create(data: CreateLeadData): Promise<Lead>
  updateStatus(id: string, status: LeadStatus, updatedBy: string): Promise<Lead>
}

export interface CreateLeadData {
  name: string
  email: string
  company: string
  phone: string
  status: LeadStatus
  createdBy: string
}