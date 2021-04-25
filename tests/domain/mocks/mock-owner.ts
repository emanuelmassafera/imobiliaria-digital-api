import { OwnerModel } from '@/domain/models'
import { AddOwner, Authentication } from '@/domain/usecases'

import faker from 'faker'

export const mockAddOwnerParams = (): AddOwner.Params => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  cpf: faker.datatype.uuid(),
  phoneNumber: faker.phone.phoneNumber(),
  address: {
    cep: faker.datatype.uuid(),
    state: faker.address.state(),
    city: faker.address.city(),
    neighborhood: faker.random.word(),
    number: faker.datatype.number().toString(),
    street: faker.address.streetName(),
    complement: faker.random.word()
  },
  createdAt: faker.date.recent()
})

export const mockOwnerModel = (): OwnerModel => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  cpf: faker.datatype.uuid(),
  phoneNumber: faker.phone.phoneNumber(),
  address: {
    cep: faker.datatype.uuid(),
    state: faker.address.state(),
    city: faker.address.city(),
    neighborhood: faker.random.word(),
    number: faker.datatype.number().toString(),
    street: faker.address.streetName(),
    complement: faker.random.word()
  },
  createdAt: faker.date.recent()
})

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
