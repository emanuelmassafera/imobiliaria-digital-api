import { MongoHelper, OwnerMongoRepository } from '@/infra/db'
import { mockAddOwnerParams } from '@/tests/domain/mocks'

import faker from 'faker'
import MockDate from 'mockdate'
import { Collection, ObjectId } from 'mongodb'

const makeSut = (): OwnerMongoRepository => {
  return new OwnerMongoRepository()
}

let ownerCollection: Collection

describe('OwnerMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    MockDate.set(new Date())
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
    MockDate.reset()
  })

  beforeEach(async () => {
    ownerCollection = await MongoHelper.getCollection('owners')
    await ownerCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should add an owner on success', async () => {
      const sut = makeSut()
      const addOwnerParams = mockAddOwnerParams()
      await sut.add(addOwnerParams)
      const count = await ownerCollection.countDocuments()
      expect(count).toBe(1)
    })
  })

  describe('checkByEmail()', () => {
    test('Should return true if email is already in use', async () => {
      const sut = makeSut()
      const addOwnerParams = mockAddOwnerParams()
      await ownerCollection.insertOne(addOwnerParams)
      const emailInUse = await sut.checkByEmail(addOwnerParams.email)
      expect(emailInUse).toBeTruthy()
    })

    test('Should return false if email is not in use', async () => {
      const sut = makeSut()
      const emailInUse = await sut.checkByEmail(faker.internet.email())
      expect(emailInUse).toBeFalsy()
    })
  })

  describe('checkByCpf()', () => {
    test('Should return true if cpf is already in use', async () => {
      const sut = makeSut()
      const addOwnerParams = mockAddOwnerParams()
      await ownerCollection.insertOne(addOwnerParams)
      const cpfInUse = await sut.checkByCpf(addOwnerParams.cpf)
      expect(cpfInUse).toBeTruthy()
    })

    test('Should return false if cpf is not in use', async () => {
      const sut = makeSut()
      const cpfInUse = await sut.checkByCpf(faker.datatype.uuid())
      expect(cpfInUse).toBeFalsy()
    })
  })

  describe('loadByEmail()', () => {
    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const owner = await sut.loadByEmail(faker.internet.email())
      expect(owner).toBeNull()
    })

    test('Should return an owner on success', async () => {
      const sut = makeSut()
      const addOwnerParams = mockAddOwnerParams()
      await ownerCollection.insertOne(addOwnerParams)
      const owner = await sut.loadByEmail(addOwnerParams.email)
      expect(owner).toBeTruthy()
      expect(owner.id).toBeTruthy()
      expect(owner.name).toBe(addOwnerParams.name)
      expect(owner.password).toBe(addOwnerParams.password)
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update the owner accessToken on success', async () => {
      const sut = makeSut()
      const res = await ownerCollection.insertOne(mockAddOwnerParams())
      const fakeOwner = res.ops[0]
      expect(fakeOwner.accessToken).toBeFalsy()
      const accessToken = faker.datatype.uuid()
      await sut.updateAccessToken(fakeOwner._id, accessToken)
      const owner = await ownerCollection.findOne({ _id: new ObjectId(fakeOwner._id) })
      expect(owner).toBeTruthy()
      expect(owner.accessToken).toBe(accessToken)
    })
  })

  describe('loadByToken()', () => {
    test('Should return null if loadByToken fails', async () => {
      const sut = makeSut()
      const accessToken = faker.datatype.uuid()
      const owner = await sut.loadByToken(accessToken)
      expect(owner).toBeNull()
    })

    test('Should return an owner on success', async () => {
      const sut = makeSut()
      const addOwnerParams = mockAddOwnerParams()
      const accessToken = faker.datatype.uuid()
      await ownerCollection.insertOne({
        ...addOwnerParams,
        accessToken
      })
      const owner = await sut.loadByToken(accessToken)
      expect(owner).toBeTruthy()
      expect(owner.id).toBeTruthy()
    })
  })
})
