import { GetLeads } from '../src/application/usecases/GetLeads'
import { ILeadRepository } from '../src/domain/repositories/ILeadRepository'
import { Lead } from '../src/domain/entities/Lead'

const mockLeads: Lead[] = [
  new Lead('1', 'Rahul Sharma', 'rahul@test.com', 'TechCorp', '+91-9876543210', 'new', 'system'),
  new Lead('2', 'Priya Patel', 'priya@test.com', 'Innovate', '+91-9823456789', 'contacted', 'system'),
]

const mockRepo: ILeadRepository = {
  getAll: jest.fn().mockResolvedValue(mockLeads),
  getById: jest.fn(),
  create: jest.fn(),
  updateStatus: jest.fn(),
}

describe('GetLeads Use Case', () => {
  const useCase = new GetLeads(mockRepo)

  it('should return success with leads list', async () => {
    const result = await useCase.execute()
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data).toHaveLength(2)
      expect(result.data[0].name).toBe('Rahul Sharma')
    }
  })

  it('should return failure when repo throws', async () => {
    const failRepo: ILeadRepository = {
      ...mockRepo,
      getAll: jest.fn().mockRejectedValue(new Error('DB error')),
    }
    const failCase = new GetLeads(failRepo)
    const result = await failCase.execute()
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error).toBe('Failed to fetch leads. Please try again.')
    }
  })
})
