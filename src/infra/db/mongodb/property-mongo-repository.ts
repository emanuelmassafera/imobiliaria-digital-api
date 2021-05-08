import { AddPropertyRepository, LoadPropertiesRepository } from '@/data/protocols/db'
import { MongoHelper, QueryBuilder } from '@/infra/db'

import { ObjectId } from 'mongodb'

export class PropertyMongoRepository implements AddPropertyRepository, LoadPropertiesRepository {
  async add (params: AddPropertyRepository.Params): Promise<AddPropertyRepository.Result> {
    const propertyCollection = await MongoHelper.getCollection('properties')
    const result = await propertyCollection.insertOne(params)
    return MongoHelper.map(result.ops[0])
  }

  async loadProperties (params: LoadPropertiesRepository.Params): Promise<LoadPropertiesRepository.Result> {
    const propertyCollection = await MongoHelper.getCollection('properties')
    const queryBuilder = new QueryBuilder()

    if (params.ownerId) {
      queryBuilder.match({
        ownerId: new ObjectId(params.ownerId)
      })
    }

    if (params.type) {
      queryBuilder.match({
        type: params.type
      })
    }

    if (params.availableTo) {
      queryBuilder.match({
        availableTo: params.availableTo
      })
    }

    if (params.state) {
      queryBuilder.match({
        'address.state': { $regex: params.state, $options: 'i' }
      })
    }

    if (params.city) {
      queryBuilder.match({
        'address.city': { $regex: params.city, $options: 'i' }
      })
    }

    if (params.neighborhood) {
      queryBuilder.match({
        'address.neighborhood': { $regex: params.neighborhood, $options: 'i' }
      })
    }

    if (params.minimumOfBedrooms) {
      queryBuilder.match({
        numberOfBedrooms: { $gte: params.minimumOfBedrooms }
      })
    }

    if (params.active) {
      queryBuilder.match({
        status: 'active'
      })
    }

    const properties = await propertyCollection.aggregate(queryBuilder.query).toArray()
    return MongoHelper.mapCollection(properties)
  }
}
