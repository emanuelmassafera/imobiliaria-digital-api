import { AddPropertyRepository, LoadPropertiesRepository, LoadPropertyByIdRepository, RemovePropertyRepository } from '@/data/protocols/db'
import { MongoHelper, QueryBuilder } from '@/infra/db'

import { ObjectId } from 'mongodb'

export class PropertyMongoRepository implements AddPropertyRepository, LoadPropertiesRepository, LoadPropertyByIdRepository, RemovePropertyRepository {
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

  async loadPropertyById (params: LoadPropertyByIdRepository.Params): Promise<LoadPropertyByIdRepository.Result> {
    const propertyCollection = await MongoHelper.getCollection('properties')
    const queryBuilder = new QueryBuilder()

    queryBuilder.match({
      _id: new ObjectId(params.propertyId)
    })

    if (params.ownerId) {
      queryBuilder.match({
        ownerId: new ObjectId(params.ownerId)
      })
    }

    if (params.active) {
      queryBuilder.match({
        status: 'active'
      })
    }

    const properties = await propertyCollection.aggregate(queryBuilder.query).toArray()
    return properties.length ? MongoHelper.map(properties[0]) : null
  }

  async removeProperty (params: RemovePropertyRepository.Params): Promise<RemovePropertyRepository.Result> {
    const propertyCollection = await MongoHelper.getCollection('properties')
    await propertyCollection.deleteOne({
      _id: new ObjectId(params.propertyId),
      ownerId: new ObjectId(params.ownerId)
    })
  }
}
