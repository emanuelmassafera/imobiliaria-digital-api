import { AddOwnerRepository, CheckOwnerByCpfRepository, CheckOwnerByEmailRepository, LoadOwnerByEmailRepository, LoadOwnerByTokenRepository, UpdateAccessTokenRepository } from '@/data/protocols'

import faker from 'faker'

export class AddOwnerRepositorySpy implements AddOwnerRepository {
  params: AddOwnerRepository.Params

  async add (params: AddOwnerRepository.Params): Promise<void> {
    this.params = params
  }
}

export class CheckOwnerByEmailRepositorySpy implements CheckOwnerByEmailRepository {
  email: string
  result: boolean = false

  async checkByEmail (email: string): Promise<boolean> {
    this.email = email
    return this.result
  }
}

export class CheckOwnerByCpfRepositorySpy implements CheckOwnerByCpfRepository {
  cpf: string
  result: boolean = false

  async checkByCpf (cpf: string): Promise<boolean> {
    this.cpf = cpf
    return this.result
  }
}

export class LoadOwnerByEmailRepositorySpy implements LoadOwnerByEmailRepository {
  email: string
  result: LoadOwnerByEmailRepository.Result = {
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    password: faker.internet.password()
  }

  async loadByEmail (email: string): Promise<LoadOwnerByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  id: string
  token: string

  async updateAccessToken (id: string, token: string): Promise<void> {
    this.id = id
    this.token = token
  }
}

export class LoadOwnerByTokenRepositorySpy implements LoadOwnerByTokenRepository {
  accessToken: string
  result: LoadOwnerByTokenRepository.Result = {
    id: faker.datatype.uuid()
  }

  async loadByToken (accessToken: string): Promise<LoadOwnerByTokenRepository.Result> {
    this.accessToken = accessToken
    return this.result
  }
}
