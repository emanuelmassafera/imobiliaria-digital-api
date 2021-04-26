/* eslint-disable @typescript-eslint/no-var-requires */
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import app from '@/main/config/app'

import { Collection } from 'mongodb'
import request from 'supertest'

let ownerCollection: Collection

describe('Owner Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    ownerCollection = await MongoHelper.getCollection('owners')
    await ownerCollection.deleteMany({})
  })

  describe('POST /owners/register', () => {
    test('Should return 200 on success', async () => {
      await request(app)
        .post('/api/owners/register')
        .send({
          name: 'any_name',
          email: 'any_email@mail.com',
          emailConfirmation: 'any_email@mail.com',
          cpf: '745.722.430-00',
          phoneNumber: '(33) 98674-3562',
          password: 'Any_passw0rd',
          passwordConfirmation: 'Any_passw0rd',
          cep: '69305-380',
          state: 'any_state',
          city: 'any_city',
          neighborhood: 'any_neighborhood',
          number: 'any_number',
          street: 'any_street',
          complement: 'any_complement'
        })
        .expect(200)
    })
  })
})
