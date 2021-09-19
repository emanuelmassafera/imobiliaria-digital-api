import { DbUpdateProperty } from '@/data/usecases'
import { UpdatePropertyRepositorySpy } from '@/tests/data/mocks'
import { mockUpdatePropertyParams, throwError } from '@/tests/domain/mocks'

import MockDate from 'mockdate'

type SutTypes = {
  sut: DbUpdateProperty
  updatePropertyRepositorySpy: UpdatePropertyRepositorySpy
}

const makeSut = (): SutTypes => {
  const updatePropertyRepositorySpy = new UpdatePropertyRepositorySpy()
  const sut = new DbUpdateProperty(updatePropertyRepositorySpy)
  return {
    sut,
    updatePropertyRepositorySpy
  }
}

describe('DbUpdateProperty Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call UpdatePropertyRepository with correct values', async () => {
    const { sut, updatePropertyRepositorySpy } = makeSut()
    const updatePropertyParams = mockUpdatePropertyParams()
    await sut.update(updatePropertyParams)
    expect(updatePropertyRepositorySpy.params).toEqual(updatePropertyParams)
  })

  test('Should throw if UpdatePropertyRepository throws', async () => {
    const { sut, updatePropertyRepositorySpy } = makeSut()
    jest.spyOn(updatePropertyRepositorySpy, 'update').mockImplementationOnce(throwError)
    const promise = sut.update(mockUpdatePropertyParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a property on success', async () => {
    const { sut, updatePropertyRepositorySpy } = makeSut()
    const property = await sut.update(mockUpdatePropertyParams())
    expect(property).toEqual(updatePropertyRepositorySpy.result)
  })
})
