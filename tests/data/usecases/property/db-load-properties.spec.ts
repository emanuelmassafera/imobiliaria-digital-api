import { DbLoadProperties } from '@/data/usecases'
import { LoadPropertiesRepositorySpy } from '@/tests/data/mocks'
import { mockLoadPropertiesParams, throwError } from '@/tests/domain/mocks'

import MockDate from 'mockdate'

type SutTypes = {
  sut: DbLoadProperties
  loadPropertiesRepositorySpy: LoadPropertiesRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadPropertiesRepositorySpy = new LoadPropertiesRepositorySpy()
  const sut = new DbLoadProperties(loadPropertiesRepositorySpy)
  return {
    sut,
    loadPropertiesRepositorySpy
  }
}

describe('DbLoadProperties Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadPropertiesRepository with correct values', async () => {
    const { sut, loadPropertiesRepositorySpy } = makeSut()
    const loadPropertiesParams = mockLoadPropertiesParams()
    await sut.loadProperties(loadPropertiesParams)
    expect(loadPropertiesRepositorySpy.params).toEqual(loadPropertiesParams)
  })

  test('Should throw if LoadPropertiesRepository throws', async () => {
    const { sut, loadPropertiesRepositorySpy } = makeSut()
    jest.spyOn(loadPropertiesRepositorySpy, 'loadProperties').mockImplementationOnce(throwError)
    const promise = sut.loadProperties(mockLoadPropertiesParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an array of properties on success', async () => {
    const { sut, loadPropertiesRepositorySpy } = makeSut()
    const properties = await sut.loadProperties(mockLoadPropertiesParams())
    expect(properties).toEqual(loadPropertiesRepositorySpy.result)
  })
})
