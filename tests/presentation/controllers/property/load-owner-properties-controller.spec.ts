import { LoadOwnerPropertiesController } from '@/presentation/controllers'
import { noContent, ok, serverError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { LoadPropertiesSpy } from '@/tests/presentation/mocks'

import faker from 'faker'
import MockDate from 'mockdate'

const mockRequest = (): LoadOwnerPropertiesController.Request => {
  return {
    ownerId: faker.datatype.uuid(),
    type: faker.random.word(),
    availableTo: faker.random.word(),
    state: faker.address.state(),
    city: faker.address.city(),
    neighborhood: faker.random.word(),
    minimumOfBedrooms: faker.datatype.number().toString()
  }
}

type SutTypes = {
  sut: LoadOwnerPropertiesController
  loadPropertiesSpy: LoadPropertiesSpy
}

const makeSut = (): SutTypes => {
  const loadPropertiesSpy = new LoadPropertiesSpy()
  const sut = new LoadOwnerPropertiesController(loadPropertiesSpy)
  return {
    sut,
    loadPropertiesSpy
  }
}

describe('LoadOwnerProperties Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadOwnerProperties with correct values', async () => {
    const { sut, loadPropertiesSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadPropertiesSpy.params).toEqual({
      ownerId: request.ownerId,
      type: request.type,
      availableTo: request.availableTo,
      state: request.state,
      city: request.city,
      neighborhood: request.neighborhood,
      minimumOfBedrooms: Number(request.minimumOfBedrooms),
      active: false
    })
  })

  test('Should return 500 if LoadOwnerProperties throws', async () => {
    const { sut, loadPropertiesSpy } = makeSut()
    jest.spyOn(loadPropertiesSpy, 'loadProperties').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 if LoadOwnerProperties returns an empty array', async () => {
    const { sut, loadPropertiesSpy } = makeSut()
    loadPropertiesSpy.result = []
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('Should return 200 with the array of properties', async () => {
    const { sut, loadPropertiesSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadPropertiesSpy.result))
  })
})
