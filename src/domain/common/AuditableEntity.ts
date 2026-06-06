export abstract class AuditableEntity {
  readonly createdBy: string
  readonly createdOn: string
  updatedBy: string
  updatedOn: string

  constructor(
    createdBy: string,
    createdOn?: string,
    updatedBy?: string,
    updatedOn?: string
  ) {
    this.createdBy = createdBy
    this.createdOn = createdOn ?? new Date().toISOString()
    this.updatedBy = updatedBy ?? createdBy
    this.updatedOn = updatedOn ?? new Date().toISOString()
  }
}