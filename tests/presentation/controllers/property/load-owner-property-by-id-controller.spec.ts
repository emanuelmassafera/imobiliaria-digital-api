import { MissingParamError } from '@/domain/errors'
import { LoadOwnerPropertyByIdController } from '@/presentation/controllers'
import { badRequest, noContent, ok, serverError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { LoadPropertyByIdSpy, ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'
import MockDate from 'mockdate'

const mockRequest = (): LoadOwnerPropertyByIdController.Request => {
  return {
    propertyId: faker.datatype.uuid(),
    ownerId: faker.datatype.uuid()
  }
}

type SutTypes = {
  sut: LoadOwnerPropertyByIdController
  validationSpy: ValidationSpy
  loadPropertyByIdSpy: LoadPropertyByIdSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const loadPropertyByIdSpy = new LoadPropertyByIdSpy()
  const sut = new LoadOwnerPropertyByIdController(validationSpy, loadPropertyByIdSpy)
  return {
    sut,
    validationSpy,
    loadPropertyByIdSpy
  }
}

describe('LoadOwnerPropertyById Controller', () => {
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

  test('Should call LoadOwnerPropertyById with correct values', async () => {
    const { sut, loadPropertyByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadPropertyByIdSpy.params).toEqual({
      propertyId: request.propertyId,
      ownerId: request.ownerId,
      active: false
    })
  })

  test('Should return 500 if LoadOwnerPropertyById throws', async () => {
    const { sut, loadPropertyByIdSpy } = makeSut()
    jest.spyOn(loadPropertyByIdSpy, 'loadPropertyById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 if LoadOwnerPropertyById returns null', async () => {
    const { sut, loadPropertyByIdSpy } = makeSut()
    loadPropertyByIdSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 200 with the property', async () => {
    const { sut, loadPropertyByIdSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadPropertyByIdSpy.result))
  })
})
