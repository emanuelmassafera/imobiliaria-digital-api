import { AddPropertyRepository } from '@/data/protocols/db'
import { AddProperty } from '@/domain/usecases'
import { MongoHelper } from '@/infra/db'

export class PropertyMongoRepository implements AddPropertyRepository {
  async add (params: AddProperty.Params): Promise<AddPropertyRepository.Result> {
    const propertyCollection = await MongoHelper.getCollection('properties')
    const result = await propertyCollection.insertOne(params)
    return MongoHelper.map(result.ops[0])
  }
}
