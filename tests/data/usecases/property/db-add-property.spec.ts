import { DbAddProperty } from '@/data/usecases'
import { AddPropertyRepositorySpy } from '@/tests/data/mocks'
import { mockAddPropertyParams, throwError } from '@/tests/domain/mocks'

import MockDate from 'mockdate'

type SutTypes = {
  sut: DbAddProperty
  addPropertyRepositorySpy: AddPropertyRepositorySpy
}

const makeSut = (): SutTypes => {
  const addPropertyRepositorySpy = new AddPropertyRepositorySpy()
  const sut = new DbAddProperty(addPropertyRepositorySpy)
  return {
    sut,
    addPropertyRepositorySpy
  }
}

describe('DbAddProperty Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call AddPropertyRepository with correct values', async () => {
    const { sut, addPropertyRepositorySpy } = makeSut()
    const addPropertyParams = mockAddPropertyParams()
    await sut.add(addPropertyParams)
    expect(addPropertyRepositorySpy.params).toEqual(addPropertyParams)
  })

  test('Should throw if AddPropertyRepository throws', async () => {
    const { sut, addPropertyRepositorySpy } = makeSut()
    jest.spyOn(addPropertyRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddPropertyParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a property on success', async () => {
    const { sut, addPropertyRepositorySpy } = makeSut()
    const property = await sut.add(mockAddPropertyParams())
    expect(property).toEqual(addPropertyRepositorySpy.result)
  })
})
