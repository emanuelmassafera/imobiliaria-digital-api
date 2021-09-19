import { DbRemoveProperty } from '@/data/usecases'
import { RemovePropertyRepositorySpy } from '@/tests/data/mocks'
import { mockRemovePropertyParams, throwError } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbRemoveProperty
  removePropertyRepositorySpy: RemovePropertyRepositorySpy
}

const makeSut = (): SutTypes => {
  const removePropertyRepositorySpy = new RemovePropertyRepositorySpy()
  const sut = new DbRemoveProperty(removePropertyRepositorySpy)
  return {
    sut,
    removePropertyRepositorySpy
  }
}

describe('DbRemoveProperty Usecase', () => {
  test('Should call RemovePropertyRepository with correct values', async () => {
    const { sut, removePropertyRepositorySpy } = makeSut()
    const params = mockRemovePropertyParams()
    await sut.remove(params)
    expect(removePropertyRepositorySpy.params).toEqual(params)
  })

  test('Should throw if RemovePropertyRepository throws', async () => {
    const { sut, removePropertyRepositorySpy } = makeSut()
    jest.spyOn(removePropertyRepositorySpy, 'removeProperty').mockImplementationOnce(throwError)
    const promise = sut.remove(mockRemovePropertyParams())
    await expect(promise).rejects.toThrow()
  })
})
