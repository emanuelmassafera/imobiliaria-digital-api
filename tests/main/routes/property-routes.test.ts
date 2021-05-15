/* eslint-disable @typescript-eslint/no-var-requires */
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import app from '@/main/config/app'
import env from '@/main/config/env'
import { mockAddOwnerParams, mockAddPropertyParams } from '@/tests/domain/mocks'

import { sign } from 'jsonwebtoken'
import { Collection, ObjectId } from 'mongodb'
import request from 'supertest'

let propertyCollection: Collection
let ownerCollection: Collection

const mockAccessToken = async (): Promise<{accessToken: string, id: string}> => {
  const res = await ownerCollection.insertOne(mockAddOwnerParams())
  const id = res.ops[0]._id
  const accessToken = sign({ payload: id }, env.jwtSecret)
  await ownerCollection.updateOne({
    _id: new ObjectId(id)
  }, {
    $set: {
      accessToken
    }
  })
  return { accessToken, id }
}

describe('Property Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    propertyCollection = await MongoHelper.getCollection('properties')
    await propertyCollection.deleteMany({})
    ownerCollection = await MongoHelper.getCollection('owners')
    await ownerCollection.deleteMany({})
  })

  describe('POST /owners/properties/add', () => {
    test('Should return 401 on add property without accessToken', async () => {
      await request(app)
        .post('/api/owners/properties/add')
        .send({
          ownerId: 'any_id',
          type: 'any_type',
          availableTo: 'any_available_to',
          price: 0,
          condominium: 0,
          iptu: 0,
          cep: '69305-380',
          state: 'any_state',
          city: 'any_city',
          neighborhood: 'any_neighborhood',
          number: 'any_number',
          street: 'any_street',
          complement: 'any_complement',
          description: 'any_description',
          dimensions: 0,
          numberOfBedrooms: 0,
          numberOfBathrooms: 0,
          numberOfParkingSpaces: 0,
          images: ['any_image'],
          additionalInformation: 'any_additional_information'
        })
        .expect(401)
    })

    test('Should return 200 on add property success', async () => {
      const { accessToken } = await mockAccessToken()
      await request(app)
        .post('/api/owners/properties/add')
        .set('x-access-token', accessToken)
        .send({
          ownerId: 'any_id',
          type: 'any_type',
          availableTo: 'any_available_to',
          price: 0,
          condominium: 0,
          iptu: 0,
          cep: '69305-380',
          state: 'any_state',
          city: 'any_city',
          neighborhood: 'any_neighborhood',
          number: 'any_number',
          street: 'any_street',
          complement: 'any_complement',
          description: 'any_description',
          dimensions: 0,
          numberOfBedrooms: 0,
          numberOfBathrooms: 0,
          numberOfParkingSpaces: 0,
          images: ['any_image'],
          additionalInformation: 'any_additional_information'
        })
        .expect(200)
    })
  })

  describe('GET /owners/properties', () => {
    test('Should return 401 on load properties without accessToken', async () => {
      await request(app)
        .get('/api/owners/properties')
        .expect(401)
    })

    test('Should return 204 on load properties success', async () => {
      const { accessToken } = await mockAccessToken()
      await request(app)
        .get('/api/owners/properties')
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })

  describe('GET /owners/properties/:propertyId', () => {
    test('Should return 401 on load property by id without accessToken', async () => {
      await request(app)
        .get('/api/owners/properties/any_id')
        .expect(401)
    })

    test('Should return 200 on load property by id success', async () => {
      const { accessToken, id } = await mockAccessToken()
      const addPropertyParams = mockAddPropertyParams()
      const res = await propertyCollection.insertOne({
        ...addPropertyParams,
        ownerId: id
      })
      await request(app)
        .get(`/api/owners/properties/${res.ops[0]._id}`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })

  describe('GET /properties', () => {
    test('Should return 204 on load properties success', async () => {
      await request(app)
        .get('/api/properties')
        .expect(204)
    })
  })
})
