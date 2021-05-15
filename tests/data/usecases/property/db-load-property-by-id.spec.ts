import { DbLoadPropertyById } from '@/data/usecases'
import { LoadPropertyByIdRepositorySpy } from '@/tests/data/mocks'
import { mockLoadPropertyByIdParams, throwError } from '@/tests/domain/mocks'

import MockDate from 'mockdate'

type SutTypes = {
  sut: DbLoadPropertyById
  loadPropertyByIdRepositorySpy: LoadPropertyByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadPropertyByIdRepositorySpy = new LoadPropertyByIdRepositorySpy()
  const sut = new DbLoadPropertyById(loadPropertyByIdRepositorySpy)
  return {
    sut,
    loadPropertyByIdRepositorySpy
  }
}

describe('DbLoadPropertyById Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadPropertyByIdRepository with correct values', async () => {
    const { sut, loadPropertyByIdRepositorySpy } = makeSut()
    const loadPropertyByIdParams = mockLoadPropertyByIdParams()
    await sut.loadPropertyById(loadPropertyByIdParams)
    expect(loadPropertyByIdRepositorySpy.params).toEqual(loadPropertyByIdParams)
  })

  test('Should throw if LoadPropertyByIdRepository throws', async () => {
    const { sut, loadPropertyByIdRepositorySpy } = makeSut()
    jest.spyOn(loadPropertyByIdRepositorySpy, 'loadPropertyById').mockImplementationOnce(throwError)
    const promise = sut.loadPropertyById(mockLoadPropertyByIdParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a property on success', async () => {
    const { sut, loadPropertyByIdRepositorySpy } = makeSut()
    const property = await sut.loadPropertyById(mockLoadPropertyByIdParams())
    expect(property).toEqual(loadPropertyByIdRepositorySpy.result)
  })
})
