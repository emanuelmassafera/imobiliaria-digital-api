import { Encrypter, HashComparer, LoadOwnerByEmailRepository, UpdateAccessTokenRepository } from '@/data/protocols'
import { UserNotFoundError, WrongPasswordError } from '@/domain/errors'
import { Authentication } from '@/domain/usecases'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadOwnerByEmailRepository: LoadOwnerByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (params: Authentication.Params): Promise<Authentication.Result> {
    const owner = await this.loadOwnerByEmailRepository.loadByEmail(params.email)
    if (!owner) {
      throw new UserNotFoundError()
    }

    const isValid = await this.hashComparer.compare(params.password, owner.password)
    if (!isValid) {
      throw new WrongPasswordError()
    }

    const accessToken = await this.encrypter.encrypt(owner.id, '1d')
    await this.updateAccessTokenRepository.updateAccessToken(owner.id, accessToken)
    return {
      accessToken,
      name: owner.name
    }
  }
}
