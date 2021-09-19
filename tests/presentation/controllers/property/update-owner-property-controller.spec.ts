import { MissingParamError } from '@/domain/errors'
import { UpdateOwnerPropertyController } from '@/presentation/controllers'
import { badRequest, ok, serverError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { UpdatePropertySpy, ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'
import MockDate from 'mockdate'

const mockRequest = (): UpdateOwnerPropertyController.Request => {
  return {
    propertyId: faker.datatype.uuid(),
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
    additionalInformation: faker.random.words(),
    status: faker.random.word()
  }
}

type SutTypes = {
  sut: UpdateOwnerPropertyController
  validationSpy: ValidationSpy
  updatePropertySpy: UpdatePropertySpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const updatePropertySpy = new UpdatePropertySpy()
  const sut = new UpdateOwnerPropertyController(validationSpy, updatePropertySpy)
  return {
    sut,
    validationSpy,
    updatePropertySpy
  }
}

describe('UpdateOwnerProperty Controller', () => {
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

  test('Should call UpdateOwnerProperty with correct values', async () => {
    const { sut, updatePropertySpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(updatePropertySpy.params).toEqual({
      propertyId: request.propertyId,
      ownerId: request.ownerId,
      type: request.type,
      availableTo: request.availableTo,
      price: request.price,
      condominium: request.condominium,
      iptu: request.iptu,
      address: (
        request.cep &&
          request.state &&
          request.city &&
          request.neighborhood &&
          request.street &&
          request.number
      )
        ? {
            cep: request.cep,
            state: request.state,
            city: request.city,
            neighborhood: request.neighborhood,
            street: request.street,
            number: request.number,
            complement: request.complement
          }
        : null,
      description: request.description,
      dimensions: request.dimensions,
      numberOfBedrooms: request.numberOfBedrooms,
      numberOfBathrooms: request.numberOfBathrooms,
      numberOfParkingSpaces: request.numberOfParkingSpaces,
      images: request.images,
      additionalInformation: request.additionalInformation,
      status: request.status
    })
  })

  test('Should return 500 if UpdateOwnerProperty throws', async () => {
    const { sut, updatePropertySpy } = makeSut()
    jest.spyOn(updatePropertySpy, 'update').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 with the updated property', async () => {
    const { sut, updatePropertySpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(updatePropertySpy.result))
  })
})
