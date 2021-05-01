import { DbLoadOwnerByToken } from '@/data/usecases'
import { DecrypterSpy, LoadOwnerByTokenRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'

type SutTypes = {
  sut: DbLoadOwnerByToken
  decrypterSpy: DecrypterSpy
  loadOwnerByTokenRepositorySpy: LoadOwnerByTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const loadOwnerByTokenRepositorySpy = new LoadOwnerByTokenRepositorySpy()
  const sut = new DbLoadOwnerByToken(decrypterSpy, loadOwnerByTokenRepositorySpy)
  return {
    sut,
    decrypterSpy,
    loadOwnerByTokenRepositorySpy
  }
}

let token: string

describe('DbLoadOwnerByToken Usecase', () => {
  beforeEach(() => {
    token = faker.datatype.uuid()
  })

  test('Should call Decrypter with correct value', async () => {
    const { sut, decrypterSpy } = makeSut()
    await sut.load(token)
    expect(decrypterSpy.ciphertext).toBe(token)
  })

  test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterSpy } = makeSut()
    decrypterSpy.plaintext = null
    const owner = await sut.load(token)
    expect(owner).toBeNull()
  })

  test('Should return null if Decrypter throws', async () => {
    const { sut, decrypterSpy } = makeSut()
    jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError)
    const owner = await sut.load(token)
    expect(owner).toBeNull()
  })

  test('Should call LoadOwnerByTokenRepository with correct value', async () => {
    const { sut, loadOwnerByTokenRepositorySpy } = makeSut()
    await sut.load(token)
    expect(loadOwnerByTokenRepositorySpy.accessToken).toBe(token)
  })

  test('Should return null if LoadOwnerByTokenRepository returns null', async () => {
    const { sut, loadOwnerByTokenRepositorySpy } = makeSut()
    loadOwnerByTokenRepositorySpy.result = null
    const owner = await sut.load(token)
    expect(owner).toBeNull()
  })

  test('Should throw if LoadOwnerByTokenRepository throws', async () => {
    const { sut, loadOwnerByTokenRepositorySpy } = makeSut()
    jest.spyOn(loadOwnerByTokenRepositorySpy, 'loadByToken').mockImplementationOnce(throwError)
    const promise = sut.load(token)
    await expect(promise).rejects.toThrow()
  })

  test('Should return an owner on success', async () => {
    const { sut, loadOwnerByTokenRepositorySpy } = makeSut()
    const owner = await sut.load(token)
    expect(owner).toEqual(loadOwnerByTokenRepositorySpy.result)
  })
})
