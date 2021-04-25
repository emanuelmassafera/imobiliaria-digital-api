import { MongoHelper as sut } from '@/infra/db'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('Should reconnect if mongodb is down', async () => {
    let ownerCollection = await sut.getCollection('owners')
    expect(ownerCollection).toBeTruthy()
    await sut.disconnect()
    ownerCollection = await sut.getCollection('owners')
    expect(ownerCollection).toBeTruthy()
  })
})
