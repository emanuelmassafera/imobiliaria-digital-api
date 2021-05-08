import { DbLoadProperties } from '@/data/usecases'
import { LoadProperties } from '@/domain/usecases'
import { PropertyMongoRepository } from '@/infra/db'

export const makeDbLoadProperties = (): LoadProperties => {
  const propertyMongoRepository = new PropertyMongoRepository()
  return new DbLoadProperties(propertyMongoRepository)
}
