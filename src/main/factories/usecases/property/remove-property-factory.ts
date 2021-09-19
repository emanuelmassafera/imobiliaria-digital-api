import { DbRemoveProperty } from '@/data/usecases'
import { RemoveProperty } from '@/domain/usecases'
import { PropertyMongoRepository } from '@/infra/db'

export const makeDbRemoveProperty = (): RemoveProperty => {
  const propertyMongoRepository = new PropertyMongoRepository()
  return new DbRemoveProperty(propertyMongoRepository)
}
