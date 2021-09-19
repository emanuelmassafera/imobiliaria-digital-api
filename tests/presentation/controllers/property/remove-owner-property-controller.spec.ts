import { MissingParamError } from '@/domain/errors'
import { RemoveOwnerPropertyController } from '@/presentation/controllers'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { RemovePropertySpy, ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'

const mockRequest = (): RemoveOwnerPropertyController.Request => {
  return {
    propertyId: faker.datatype.uuid(),
    ownerId: faker.datatype.uuid()
  }
}

type SutTypes = {
  sut: RemoveOwnerPropertyController
  validationSpy: ValidationSpy
  removePropertySpy: RemovePropertySpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const removePropertySpy = new RemovePropertySpy()
  const sut = new RemoveOwnerPropertyController(validationSpy, removePropertySpy)
  return {
    sut,
    validationSpy,
    removePropertySpy
  }
}

describe('RemoveOwnerProperty Controller', () => {
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

  test('Should call RemoveOwnerProperty with correct values', async () => {
    const { sut, removePropertySpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(removePropertySpy.params).toEqual({
      propertyId: request.propertyId,
      ownerId: request.ownerId
    })
  })

  test('Should return 500 if RemoveOwnerProperty throws', async () => {
    const { sut, removePropertySpy } = makeSut()
    jest.spyOn(removePropertySpy, 'remove').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })
})
