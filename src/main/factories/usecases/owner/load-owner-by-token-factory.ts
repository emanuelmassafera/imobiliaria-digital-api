import { DbLoadOwnerByToken } from '@/data/usecases'
import { LoadOwnerByToken } from '@/domain/usecases'
import { JwtAdapter } from '@/infra/cryptography'
import { OwnerMongoRepository } from '@/infra/db'
import env from '@/main/config/env'

export const makeDbLoadOwnerByToken = (): LoadOwnerByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const ownerMongoRepository = new OwnerMongoRepository()
  return new DbLoadOwnerByToken(jwtAdapter, ownerMongoRepository)
}
