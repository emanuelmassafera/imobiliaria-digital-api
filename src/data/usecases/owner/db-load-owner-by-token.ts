import { DecodedModel, Decrypter, LoadOwnerByTokenRepository } from '@/data/protocols'
import { LoadOwnerByToken } from '@/domain/usecases'

export class DbLoadOwnerByToken implements LoadOwnerByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadOwnerByTokenRepository: LoadOwnerByTokenRepository
  ) {}

  async load (accessToken: string): Promise<LoadOwnerByToken.Result> {
    let token: DecodedModel
    try {
      token = await this.decrypter.decrypt(accessToken)
    } catch (error) {
      return null
    }

    if (token) {
      const owner = await this.loadOwnerByTokenRepository.loadByToken(accessToken)
      if (owner) {
        return owner
      }
    }
    return null
  }
}
