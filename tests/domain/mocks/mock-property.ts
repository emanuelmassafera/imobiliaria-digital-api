import { PropertyModel } from '@/domain/models'
import { AddProperty, LoadProperties, LoadPropertyById, RemoveProperty } from '@/domain/usecases'

import faker from 'faker'

export const mockPropertyModel = (): PropertyModel => ({
  id: faker.datatype.uuid(),
  ownerId: faker.datatype.uuid(),
  type: faker.random.word(),
  availableTo: faker.random.word(),
  price: faker.datatype.number(),
  condominium: faker.datatype.number(),
  iptu: faker.datatype.number(),
  address: {
    cep: faker.datatype.uuid(),
    state: faker.address.state(),
    city: faker.address.city(),
    neighborhood: faker.random.word(),
    number: faker.datatype.number().toString(),
    street: faker.address.streetName(),
    complement: faker.random.word()
  },
  description: faker.random.words(),
  dimensions: faker.datatype.number(),
  numberOfBedrooms: faker.datatype.number(),
  numberOfBathrooms: faker.datatype.number(),
  numberOfParkingSpaces: faker.datatype.number(),
  images: [faker.internet.url()],
  additionalInformation: faker.random.words(),
  status: faker.random.word(),
  createdAt: faker.date.recent()
})

export const mockAddPropertyParams = (): AddProperty.Params => ({
  ownerId: faker.datatype.uuid(),
  type: faker.random.word(),
  availableTo: faker.random.word(),
  price: faker.datatype.number(),
  condominium: faker.datatype.number(),
  iptu: faker.datatype.number(),
  address: {
    cep: faker.datatype.uuid(),
    state: faker.address.state(),
    city: faker.address.city(),
    neighborhood: faker.random.word(),
    number: faker.datatype.number().toString(),
    street: faker.address.streetName(),
    complement: faker.random.word()
  },
  description: faker.random.words(),
  dimensions: faker.datatype.number(),
  numberOfBedrooms: faker.datatype.number(),
  numberOfBathrooms: faker.datatype.number(),
  numberOfParkingSpaces: faker.datatype.number(),
  images: [faker.internet.url()],
  additionalInformation: faker.random.words(),
  status: faker.random.word(),
  createdAt: faker.date.recent()
})

export const mockPropertyModels = (): PropertyModel[] => [
  mockPropertyModel(),
  mockPropertyModel()
]

export const mockLoadPropertiesParams = (): LoadProperties.Params => ({
  ownerId: faker.datatype.uuid(),
  type: faker.random.word(),
  availableTo: faker.random.word(),
  state: faker.address.state(),
  city: faker.address.city(),
  neighborhood: faker.random.word(),
  minimumOfBedrooms: faker.datatype.number(),
  active: faker.datatype.boolean()
})

export const mockLoadPropertyByIdParams = (): LoadPropertyById.Params => ({
  propertyId: faker.datatype.uuid(),
  ownerId: faker.datatype.uuid(),
  active: faker.datatype.boolean()
})

export const mockRemovePropertyParams = (): RemoveProperty.Params => ({
  propertyId: faker.datatype.uuid(),
  ownerId: faker.datatype.uuid()
})
