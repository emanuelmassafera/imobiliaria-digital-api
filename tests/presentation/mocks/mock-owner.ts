import { AddOwner, Authentication, LoadOwnerByToken } from '@/domain/usecases'

import faker from 'faker'

export class AddOwnerSpy implements AddOwner {
  params: AddOwner.Params

  async add (params: AddOwner.Params): Promise<void> {
    this.params = params
  }
}

export class AuthenticationSpy implements Authentication {
  params: Authentication.Params
  result = {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName()
  }

  async auth (params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params
    return this.result
  }
}

export class LoadOwnerByTokenSpy implements LoadOwnerByToken {
  accessToken: string
  result = {
    id: faker.datatype.uuid()
  }

  async load (accessToken: string): Promise<LoadOwnerByToken.Result> {
    this.accessToken = accessToken
    return this.result
  }
}
