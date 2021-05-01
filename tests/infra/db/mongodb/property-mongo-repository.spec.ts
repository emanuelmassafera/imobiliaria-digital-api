import { MongoHelper, PropertyMongoRepository } from '@/infra/db'
import { mockAddPropertyParams } from '@/tests/domain/mocks'

import MockDate from 'mockdate'
import { Collection } from 'mongodb'

const makeSut = (): PropertyMongoRepository => {
  return new PropertyMongoRepository()
}

let propertyCollection: Collection

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
})
