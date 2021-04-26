import { DbAddOwner } from '@/data/usecases'
import { AddOwner } from '@/domain/usecases'
import { BcryptAdapter } from '@/infra/cryptography'
import { OwnerMongoRepository } from '@/infra/db'

export const makeDbAddOwner = (): AddOwner => {
  const ownerMongoRepository = new OwnerMongoRepository()
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  return new DbAddOwner(ownerMongoRepository, ownerMongoRepository, bcryptAdapter, ownerMongoRepository)
}
