import { DbAddOwner } from '@/data/usecases'
import { CpfInUseError, EmailInUseError } from '@/domain/errors'
import { AddOwnerRepositorySpy, CheckOwnerByCpfRepositorySpy, CheckOwnerByEmailRepositorySpy, HasherSpy } from '@/tests/data/mocks'
import { mockAddOwnerParams, throwError } from '@/tests/domain/mocks'

import MockDate from 'mockdate'

type SutTypes = {
  sut: DbAddOwner
  checkOwnerByEmailRepositorySpy: CheckOwnerByEmailRepositorySpy
  checkOwnerByCpfRepositorySpy: CheckOwnerByCpfRepositorySpy
  hasherSpy: HasherSpy
  addOwnerRepositorySpy: AddOwnerRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkOwnerByEmailRepositorySpy = new CheckOwnerByEmailRepositorySpy()
  const checkOwnerByCpfRepositorySpy = new CheckOwnerByCpfRepositorySpy()
  const hasherSpy = new HasherSpy()
  const addOwnerRepositorySpy = new AddOwnerRepositorySpy()
  const sut = new DbAddOwner(checkOwnerByEmailRepositorySpy, checkOwnerByCpfRepositorySpy, hasherSpy, addOwnerRepositorySpy)
  return {
    sut,
    checkOwnerByEmailRepositorySpy,
    checkOwnerByCpfRepositorySpy,
    hasherSpy,
    addOwnerRepositorySpy
  }
}

describe('DbAddOwner Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call CheckOwnerByEmailRepository with correct value', async () => {
    const { sut, checkOwnerByEmailRepositorySpy } = makeSut()
    const addOwnerParams = mockAddOwnerParams()
    await sut.add(addOwnerParams)
    expect(checkOwnerByEmailRepositorySpy.email).toBe(addOwnerParams.email)
  })

  test('Should throw an EmailInUseError if CheckOwnerByEmailRepository returns true', async () => {
    const { sut, checkOwnerByEmailRepositorySpy } = makeSut()
    checkOwnerByEmailRepositorySpy.result = true
    const promise = sut.add(mockAddOwnerParams())
    await expect(promise).rejects.toThrow(new EmailInUseError())
  })

  test('Should throw if CheckOwnerByEmailRepository throws', async () => {
    const { sut, checkOwnerByEmailRepositorySpy } = makeSut()
    jest.spyOn(checkOwnerByEmailRepositorySpy, 'checkByEmail').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddOwnerParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call CheckOwnerByCpfRepositorySpy with correct value', async () => {
    const { sut, checkOwnerByCpfRepositorySpy } = makeSut()
    const addOwnerParams = mockAddOwnerParams()
    await sut.add(addOwnerParams)
    expect(checkOwnerByCpfRepositorySpy.cpf).toBe(addOwnerParams.cpf)
  })

  test('Should throw a CpfInUseError if CheckOwnerByCpfRepositorySpy returns true', async () => {
    const { sut, checkOwnerByCpfRepositorySpy } = makeSut()
    checkOwnerByCpfRepositorySpy.result = true
    const promise = sut.add(mockAddOwnerParams())
    await expect(promise).rejects.toThrow(new CpfInUseError())
  })

  test('Should throw if CheckOwnerByCpfRepositorySpy throws', async () => {
    const { sut, checkOwnerByCpfRepositorySpy } = makeSut()
    jest.spyOn(checkOwnerByCpfRepositorySpy, 'checkByCpf').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddOwnerParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call Hasher with correct value', async () => {
    const { sut, hasherSpy } = makeSut()
    const addOwnerParams = mockAddOwnerParams()
    await sut.add(addOwnerParams)
    expect(hasherSpy.plaintext).toBe(addOwnerParams.password)
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut()
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddOwnerParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddOwnerRepository with correct values', async () => {
    const { sut, addOwnerRepositorySpy, hasherSpy } = makeSut()
    const addOwnerParams = mockAddOwnerParams()
    await sut.add(addOwnerParams)
    expect(addOwnerRepositorySpy.params).toEqual({
      ...addOwnerParams,
      password: hasherSpy.digest
    })
  })

  test('Should throw if AddOwnerRepository throws', async () => {
    const { sut, addOwnerRepositorySpy } = makeSut()
    jest.spyOn(addOwnerRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddOwnerParams())
    await expect(promise).rejects.toThrow()
  })
})
