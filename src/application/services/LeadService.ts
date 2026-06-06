import { InMemoryLeadRepository } from '../../infrastructure/repositories/InMemoryLeadRepository'
import { GetLeads } from '../usecases/GetLeads'
import { GetLeadById } from '../usecases/GetLeadById'
import { CreateLead } from '../usecases/CreateLead'
import { UpdateLeadStatus } from '../usecases/UpdateLeadStatus'

const repo = new InMemoryLeadRepository()

export const getLeadsUseCase = new GetLeads(repo)
export const getLeadByIdUseCase = new GetLeadById(repo)
export const createLeadUseCase = new CreateLead(repo)
export const updateLeadStatusUseCase = new UpdateLeadStatus(repo)
