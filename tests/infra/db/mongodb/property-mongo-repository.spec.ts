import { MongoHelper, PropertyMongoRepository } from '@/infra/db'
import { mockAddOwnerParams, mockAddPropertyParams } from '@/tests/domain/mocks'

import MockDate from 'mockdate'
import { Collection } from 'mongodb'

const makeSut = (): PropertyMongoRepository => {
  return new PropertyMongoRepository()
}

let propertyCollection: Collection
let ownerCollection: Collection

describe('PropertyMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    MockDate.set(new Date())
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
    MockDate.reset()
  })

  beforeEach(async () => {
    propertyCollection = await MongoHelper.getCollection('properties')
    await propertyCollection.deleteMany({})
    ownerCollection = await MongoHelper.getCollection('owners')
    await ownerCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should add a property on success', async () => {
      const sut = makeSut()
      const addPropertyParams = mockAddPropertyParams()
      const property = await sut.add(addPropertyParams)
      const count = await propertyCollection.countDocuments()
      expect(count).toBe(1)
      expect(property).toBeTruthy()
      expect(property.type).toBe(addPropertyParams.type)
    })
  })

  describe('loadProperties()', () => {
    test('Should return an empty array if there are no properties', async () => {
      const sut = makeSut()
      const properties = await sut.loadProperties({})
      expect(properties).toEqual([])
    })

    test('Should return all properties if there are no filters', async () => {
      const sut = makeSut()
      const addPropertyParams = mockAddPropertyParams()
      const anotherAddPropertyParams = mockAddPropertyParams()
      const res = await propertyCollection.insertOne(addPropertyParams)
      const anotherRes = await propertyCollection.insertOne(anotherAddPropertyParams)
      const properties = await sut.loadProperties({})
      expect(properties).toEqual([
        MongoHelper.map(res.ops[0]),
        MongoHelper.map(anotherRes.ops[0])
      ])
    })

    test('Should return only properties of the provided owner', async () => {
      const sut = makeSut()
      const addOwnerParams = mockAddOwnerParams()
      const owner = await ownerCollection.insertOne(addOwnerParams)
      const addPropertyParams = mockAddPropertyParams()
      const anotherAddPropertyParams = mockAddPropertyParams()
      const res = await propertyCollection.insertOne({
        ...addPropertyParams,
        ownerId: owner.ops[0]._id
      })
      await propertyCollection.insertOne(anotherAddPropertyParams)
      const properties = await sut.loadProperties({ ownerId: owner.ops[0]._id })
      expect(properties).toEqual([
        MongoHelper.map(res.ops[0])
      ])
    })

    test('Should return only properties of the provided type', async () => {
      const sut = makeSut()
      const addPropertyParams = mockAddPropertyParams()
      const anotherAddPropertyParams = mockAddPropertyParams()
      const res = await propertyCollection.insertOne(addPropertyParams)
      await propertyCollection.insertOne(anotherAddPropertyParams)
      const properties = await sut.loadProperties({ type: addPropertyParams.type })
      expect(properties).toEqual([
        MongoHelper.map(res.ops[0])
      ])
    })

    test('Should return only properties of the provided availableTo', async () => {
      const sut = makeSut()
      const addPropertyParams = mockAddPropertyParams()
      const anotherAddPropertyParams = mockAddPropertyParams()
      const res = await propertyCollection.insertOne(addPropertyParams)
      await propertyCollection.insertOne(anotherAddPropertyParams)
      const properties = await sut.loadProperties({ availableTo: addPropertyParams.availableTo })
      expect(properties).toEqual([
        MongoHelper.map(res.ops[0])
      ])
    })

    test('Should return only properties of the provided state', async () => {
      const sut = makeSut()
      const addPropertyParams = mockAddPropertyParams()
      const anotherAddPropertyParams = mockAddPropertyParams()
      const res = await propertyCollection.insertOne(addPropertyParams)
      await propertyCollection.insertOne(anotherAddPropertyParams)
      const properties = await sut.loadProperties({ state: addPropertyParams.address.state })
      expect(properties).toEqual([
        MongoHelper.map(res.ops[0])
      ])
    })

    test('Should return only properties of the provided city', async () => {
      const sut = makeSut()
      const addPropertyParams = mockAddPropertyParams()
      const anotherAddPropertyParams = mockAddPropertyParams()
      const res = await propertyCollection.insertOne(addPropertyParams)
      await propertyCollection.insertOne(anotherAddPropertyParams)
      const properties = await sut.loadProperties({ city: addPropertyParams.address.city })
      expect(properties).toEqual([
        MongoHelper.map(res.ops[0])
      ])
    })

    test('Should return only properties of the provided neighborhood', async () => {
      const sut = makeSut()
      const addPropertyParams = mockAddPropertyParams()
      const anotherAddPropertyParams = mockAddPropertyParams()
      const res = await propertyCollection.insertOne(addPropertyParams)
      await propertyCollection.insertOne(anotherAddPropertyParams)
      const properties = await sut.loadProperties({ neighborhood: addPropertyParams.address.neighborhood })
      expect(properties).toEqual([
        MongoHelper.map(res.ops[0])
      ])
    })

    test('Should return only properties with the number of bedrooms equal or greater than the provided minimumOfBedrooms', async () => {
      const sut = makeSut()
      const addPropertyParams = mockAddPropertyParams()
      const anotherAddPropertyParams = mockAddPropertyParams()
      const res = await propertyCollection.insertOne({
        ...addPropertyParams,
        numberOfBedrooms: 5
      })
      await propertyCollection.insertOne({
        ...anotherAddPropertyParams,
        numberOfBedrooms: 2
      })
      const properties = await sut.loadProperties({ minimumOfBedrooms: 4 })
      expect(properties).toEqual([
        MongoHelper.map(res.ops[0])
      ])
    })

    test('Should return only properties with active status', async () => {
      const sut = makeSut()
      const addPropertyParams = mockAddPropertyParams()
      const anotherAddPropertyParams = mockAddPropertyParams()
      const res = await propertyCollection.insertOne({
        ...addPropertyParams,
        status: 'active'
      })
      await propertyCollection.insertOne(anotherAddPropertyParams)
      const properties = await sut.loadProperties({ active: true })
      expect(properties).toEqual([
        MongoHelper.map(res.ops[0])
      ])
    })

    test('Should return only properties that match with all filters', async () => {
      const sut = makeSut()
      const addOwnerParams = mockAddOwnerParams()
      const owner = await ownerCollection.insertOne(addOwnerParams)
      const addPropertyParams = mockAddPropertyParams()
      const anotherAddPropertyParams = mockAddPropertyParams()
      const res = await propertyCollection.insertOne({
        ...addPropertyParams,
        ownerId: owner.ops[0]._id,
        numberOfBedrooms: 5,
        status: 'active'
      })
      await propertyCollection.insertOne({
        ...anotherAddPropertyParams,
        numberOfBedrooms: 2
      })
      const properties = await sut.loadProperties({
        ownerId: owner.ops[0]._id,
        type: addPropertyParams.type,
        availableTo: addPropertyParams.availableTo,
        state: addPropertyParams.address.state,
        city: addPropertyParams.address.city,
        neighborhood: addPropertyParams.address.neighborhood,
        minimumOfBedrooms: 4,
        active: true
      })
      expect(properties).toEqual([
        MongoHelper.map(res.ops[0])
      ])
    })
  })

  describe('loadPropertyById()', () => {
    test('Should return null if there is no property with the provided id', async () => {
      const sut = makeSut()
      const addOwnerParams = mockAddOwnerParams()
      const owner = await ownerCollection.insertOne(addOwnerParams)
      const addPropertyParams = mockAddPropertyParams()
      const res = await propertyCollection.insertOne({
        ...addPropertyParams,
        ownerId: owner.ops[0]._id,
        status: 'active'
      })
      await propertyCollection.deleteOne({ _id: res.ops[0]._id })
      const property = await sut.loadPropertyById({
        propertyId: res.ops[0]._id,
        ownerId: owner.ops[0]._id,
        active: true
      })
      expect(property).toBeNull()
    })

    test('Should return null if there is no property with the provided ownerId', async () => {
      const sut = makeSut()
      const addOwnerParams = mockAddOwnerParams()
      const owner = await ownerCollection.insertOne(addOwnerParams)
      const addPropertyParams = mockAddPropertyParams()
      const res = await propertyCollection.insertOne({
        ...addPropertyParams,
        status: 'active'
      })
      const property = await sut.loadPropertyById({
        propertyId: res.ops[0]._id,
        ownerId: owner.ops[0]._id,
        active: true
      })
      expect(property).toBeNull()
    })

    test('Should return null if there is no property with active status', async () => {
      const sut = makeSut()
      const addOwnerParams = mockAddOwnerParams()
      const owner = await ownerCollection.insertOne(addOwnerParams)
      const addPropertyParams = mockAddPropertyParams()
      const res = await propertyCollection.insertOne({
        ...addPropertyParams,
        ownerId: owner.ops[0]._id,
        status: 'paused'
      })
      const property = await sut.loadPropertyById({
        propertyId: res.ops[0]._id,
        ownerId: owner.ops[0]._id,
        active: true
      })
      expect(property).toBeNull()
    })

    test('Should return the property that matches with the provided filters', async () => {
      const sut = makeSut()
      const addOwnerParams = mockAddOwnerParams()
      const owner = await ownerCollection.insertOne(addOwnerParams)
      const addPropertyParams = mockAddPropertyParams()
      const res = await propertyCollection.insertOne({
        ...addPropertyParams,
        ownerId: owner.ops[0]._id,
        status: 'active'
      })
      const property = await sut.loadPropertyById({
        propertyId: res.ops[0]._id,
        ownerId: owner.ops[0]._id,
        active: true
      })
      expect(property).toEqual(MongoHelper.map(res.ops[0]))
    })
  })
})
