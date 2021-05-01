/* eslint-disable @typescript-eslint/no-var-requires */
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import app from '@/main/config/app'

import { hash } from 'bcrypt'
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

  describe('POST /owners/login', () => {
    test('Should return 403 if login fails', async () => {
      await request(app)
        .post('/api/owners/login')
        .send({
          email: 'any_email@mail.com',
          password: 'Any_passw0rd'
        })
        .expect(403)
    })

    test('Should return 200 on success', async () => {
      const password = await hash('Any_passw0rd', 12)
      await ownerCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        cpf: '745.722.430-00',
        phoneNumber: '(33) 98674-3562',
        password: password,
        cep: '69305-380',
        state: 'any_state',
        city: 'any_city',
        neighborhood: 'any_neighborhood',
        number: 'any_number',
        street: 'any_street',
        complement: 'any_complement'
      })
      await request(app)
        .post('/api/owners/login')
        .send({
          email: 'any_email@mail.com',
          password: 'Any_passw0rd'
        })
        .expect(200)
    })
  })
})
