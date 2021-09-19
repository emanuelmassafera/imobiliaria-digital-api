import { DbUpdateProperty } from '@/data/usecases'
import { UpdateProperty } from '@/domain/usecases'
import { PropertyMongoRepository } from '@/infra/db'

export const makeDbUpdateProperty = (): UpdateProperty => {
  const propertyMongoRepository = new PropertyMongoRepository()
  return new DbUpdateProperty(propertyMongoRepository)
}
