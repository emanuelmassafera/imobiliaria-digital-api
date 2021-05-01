import { AddOwnerRepository, CheckOwnerByCpfRepository, CheckOwnerByEmailRepository, LoadOwnerByEmailRepository, LoadOwnerByTokenRepository, UpdateAccessTokenRepository } from '@/data/protocols/db'
import { MongoHelper } from '@/infra/db'

import { ObjectId } from 'mongodb'

export class OwnerMongoRepository implements AddOwnerRepository, CheckOwnerByEmailRepository, CheckOwnerByCpfRepository, LoadOwnerByEmailRepository, UpdateAccessTokenRepository, LoadOwnerByTokenRepository {
  async add (params: AddOwnerRepository.Params): Promise<void> {
    const ownerCollection = await MongoHelper.getCollection('owners')
    await ownerCollection.insertOne(params)
  }

  async checkByEmail (email: string): Promise<boolean> {
    const ownerCollection = await MongoHelper.getCollection('owners')
    const owner = await ownerCollection.findOne({
      email
    }, {
      projection: {
        _id: 1
      }
    })
    return owner !== null
  }

  async checkByCpf (cpf: string): Promise<boolean> {
    const ownerCollection = await MongoHelper.getCollection('owners')
    const owner = await ownerCollection.findOne({
      cpf
    }, {
      projection: {
        _id: 1
      }
    })
    return owner !== null
  }

  async loadByEmail (email: string): Promise<LoadOwnerByEmailRepository.Result> {
    const ownerCollection = await MongoHelper.getCollection('owners')
    const owner = await ownerCollection.findOne({
      email
    }, {
      projection: {
        _id: 1,
        name: 1,
        password: 1
      }
    })
    return owner ? MongoHelper.map(owner) : null
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const ownerCollection = await MongoHelper.getCollection('owners')
    await ownerCollection.updateOne({
      _id: new ObjectId(id)
    }, {
      $set: {
        accessToken: token
      }
    })
  }

  async loadByToken (accessToken: string): Promise<LoadOwnerByTokenRepository.Result> {
    const ownerCollection = await MongoHelper.getCollection('owners')
    const owner = await ownerCollection.findOne({
      accessToken
    }, {
      projection: {
        _id: 1
      }
    })
    return owner ? MongoHelper.map(owner) : null
  }
}
