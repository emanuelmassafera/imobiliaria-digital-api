import { MissingParamError } from '@/domain/errors'
import { AddPropertyController } from '@/presentation/controllers'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { AddPropertySpy, ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'
import MockDate from 'mockdate'

const mockRequest = (): AddPropertyController.Request => {
  return {
    ownerId: faker.datatype.uuid(),
    type: faker.random.word(),
    availableTo: faker.random.word(),
    price: faker.datatype.number(),
    condominium: faker.datatype.number(),
    iptu: faker.datatype.number(),
    cep: faker.datatype.uuid(),
    state: faker.address.state(),
    city: faker.address.city(),
    neighborhood: faker.random.word(),
    number: faker.datatype.number().toString(),
    street: faker.address.streetName(),
    complement: faker.random.word(),
    description: faker.random.words(),
    dimensions: faker.datatype.number(),
    numberOfBedrooms: faker.datatype.number(),
    numberOfBathrooms: faker.datatype.number(),
    numberOfParkingSpaces: faker.datatype.number(),
    images: [faker.internet.url()],
    additionalInformation: faker.random.words()
  }
}

type SutTypes = {
  sut: AddPropertyController
  validationSpy: ValidationSpy
  addPropertySpy: AddPropertySpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addPropertySpy = new AddPropertySpy()
  const sut = new AddPropertyController(validationSpy, addPropertySpy)
  return {
    sut,
    validationSpy,
    addPropertySpy
  }
}

describe('AddProperty Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.random.word())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should return 500 if Validation throws', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call AddProperty with correct values', async () => {
    const { sut, addPropertySpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addPropertySpy.params).toEqual({
      ownerId: request.ownerId,
      type: request.type,
      availableTo: request.availableTo,
      price: request.price,
      condominium: request.condominium,
      iptu: request.iptu,
      address: {
        cep: request.cep,
        state: request.state,
        city: request.city,
        neighborhood: request.neighborhood,
        street: request.street,
        number: request.number,
        complement: request.complement
      },
      description: request.description,
      dimensions: request.dimensions,
      numberOfBedrooms: request.numberOfBedrooms,
      numberOfBathrooms: request.numberOfBathrooms,
      numberOfParkingSpaces: request.numberOfParkingSpaces,
      images: request.images,
      additionalInformation: request.additionalInformation,
      status: 'active',
      createdAt: new Date()
    })
  })

  test('Should return 500 if AddProperty throws', async () => {
    const { sut, addPropertySpy } = makeSut()
    jest.spyOn(addPropertySpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 with the added property', async () => {
    const { sut, addPropertySpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(addPropertySpy.result))
  })
})
