import { LoadPropertyByIdController } from '@/presentation/controllers'
import { noContent, ok, serverError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { LoadPropertyByIdSpy } from '@/tests/presentation/mocks'

import faker from 'faker'
import MockDate from 'mockdate'

const mockRequest = (): LoadPropertyByIdController.Request => {
  return {
    propertyId: faker.datatype.uuid()
  }
}

type SutTypes = {
  sut: LoadPropertyByIdController
  loadPropertyByIdSpy: LoadPropertyByIdSpy
}

const makeSut = (): SutTypes => {
  const loadPropertyByIdSpy = new LoadPropertyByIdSpy()
  const sut = new LoadPropertyByIdController(loadPropertyByIdSpy)
  return {
    sut,
    loadPropertyByIdSpy
  }
}

describe('LoadPropertyById Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadPropertyById with correct values', async () => {
    const { sut, loadPropertyByIdSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadPropertyByIdSpy.params).toEqual({
      propertyId: request.propertyId,
      active: true
    })
  })

  test('Should return 500 if LoadPropertyById throws', async () => {
    const { sut, loadPropertyByIdSpy } = makeSut()
    jest.spyOn(loadPropertyByIdSpy, 'loadPropertyById').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 if LoadPropertyById returns null', async () => {
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
