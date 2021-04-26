import { DbAuthentication } from '@/data/usecases'
import { Authentication } from '@/domain/usecases'
import { BcryptAdapter, JwtAdapter } from '@/infra/cryptography'
import { OwnerMongoRepository } from '@/infra/db'
import env from '@/main/config/env'

export const makeDbAuthentication = (): Authentication => {
  const ownerMongoRepository = new OwnerMongoRepository()
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  return new DbAuthentication(ownerMongoRepository, bcryptAdapter, jwtAdapter, ownerMongoRepository)
}
