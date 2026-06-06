import { AuditableEntity } from '../common/AuditableEntity'
import { LeadStatus } from '../valueObjects/LeadStatus'

export class Lead extends AuditableEntity {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
    public readonly company: string,
    public readonly phone: string,
    public status: LeadStatus,
    createdBy: string,
    createdOn?: string,
    updatedBy?: string,
    updatedOn?: string
  ) {
    super(createdBy, createdOn, updatedBy, updatedOn)
  }
}
