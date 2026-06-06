import { CreateLead } from '../src/application/usecases/CreateLead'
import { ILeadRepository, CreateLeadData } from '../src/domain/repositories/ILeadRepository'
import { Lead } from '../src/domain/entities/Lead'

const mockLead = new Lead('uuid-1', 'Test User', 'test@test.com', 'TestCorp', '+91-9876543210', 'new', 'user')

const mockRepo: ILeadRepository = {
  getAll: jest.fn(),
  getById: jest.fn(),
  create: jest.fn().mockResolvedValue(mockLead),
  updateStatus: jest.fn(),
}

describe('CreateLead Use Case', () => {
  const useCase = new CreateLead(mockRepo)

  const validData: CreateLeadData = {
    name: 'Test User',
    email: 'test@test.com',
    company: 'TestCorp',
    phone: '+91-9876543210',
    status: 'new',
    createdBy: 'user',
  }

  it('should create a lead with valid data', async () => {
    const result = await useCase.execute(validData)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.name).toBe('Test User')
      expect(result.data.email).toBe('test@test.com')
    }
  })

  it('should fail with invalid email', async () => {
    const result = await useCase.execute({ ...validData, email: 'not-an-email' })
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toContain('email')
    }
  })

  it('should fail with short name', async () => {
    const result = await useCase.execute({ ...validData, name: 'A' })
    expect(result.success).toBe(false)
  })
})
