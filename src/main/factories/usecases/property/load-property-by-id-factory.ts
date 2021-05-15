import { DbLoadPropertyById } from '@/data/usecases'
import { LoadPropertyById } from '@/domain/usecases'
import { PropertyMongoRepository } from '@/infra/db'

export const makeDbLoadPropertyById = (): LoadPropertyById => {
  const propertyMongoRepository = new PropertyMongoRepository()
  return new DbLoadPropertyById(propertyMongoRepository)
}
