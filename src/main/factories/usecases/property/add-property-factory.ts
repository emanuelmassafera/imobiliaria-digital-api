import { DbAddProperty } from '@/data/usecases'
import { AddProperty } from '@/domain/usecases'
import { PropertyMongoRepository } from '@/infra/db'

export const makeDbAddProperty = (): AddProperty => {
  const propertyMongoRepository = new PropertyMongoRepository()
  return new DbAddProperty(propertyMongoRepository)
}
