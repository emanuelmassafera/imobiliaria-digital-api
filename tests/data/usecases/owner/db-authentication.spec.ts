import { DbAuthentication } from '@/data/usecases'
import { UserNotFoundError, WrongPasswordError } from '@/domain/errors'
import { EncrypterSpy, HashComparerSpy, LoadOwnerByEmailRepositorySpy, UpdateAccessTokenRepositorySpy } from '@/tests/data/mocks'
import { throwError, mockAuthenticationParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbAuthentication
  loadOwnerByEmailRepositorySpy: LoadOwnerByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
  encrypterSpy: EncrypterSpy
  updateAccessTokenRepositorySpy: UpdateAccessTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadOwnerByEmailRepositorySpy = new LoadOwnerByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const encrypterSpy = new EncrypterSpy()
  const updateAccessTokenRepositorySpy = new UpdateAccessTokenRepositorySpy()
  const sut = new DbAuthentication(loadOwnerByEmailRepositorySpy, hashComparerSpy, encrypterSpy, updateAccessTokenRepositorySpy)
  return {
    sut,
    loadOwnerByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateAccessTokenRepositorySpy
  }
}

describe('DbAuthentication UseCase', () => {
  test('Should call LoadOwnerByEmailRepository with correct value', async () => {
    const { sut, loadOwnerByEmailRepositorySpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(loadOwnerByEmailRepositorySpy.email).toBe(authenticationParams.email)
  })

  test('Should throw an UserNotFoundError if LoadOwnerByEmailRepository returns null', async () => {
    const { sut, loadOwnerByEmailRepositorySpy } = makeSut()
    loadOwnerByEmailRepositorySpy.result = null
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow(new UserNotFoundError())
  })

  test('Should throw if LoadOwnerByEmailRepository throws', async () => {
    const { sut, loadOwnerByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadOwnerByEmailRepositorySpy, 'loadByEmail').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call HashComparer with correct values', async () => {
    const { sut, hashComparerSpy, loadOwnerByEmailRepositorySpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(hashComparerSpy.plaintext).toBe(authenticationParams.password)
    expect(hashComparerSpy.digest).toBe(loadOwnerByEmailRepositorySpy.result.password)
  })

  test('Should throw a WrongPasswordError if HashComparer returns false', async () => {
    const { sut, hashComparerSpy } = makeSut()
    hashComparerSpy.isValid = false
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow(new WrongPasswordError())
  })

  test('Should throw if HashComparer throws', async () => {
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call Encrypter with correct value', async () => {
    const { sut, encrypterSpy, loadOwnerByEmailRepositorySpy } = makeSut()
    await sut.auth(mockAuthenticationParams())
    expect(encrypterSpy.plaintext).toBe(loadOwnerByEmailRepositorySpy.result.id)
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterSpy } = makeSut()
    jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositorySpy, loadOwnerByEmailRepositorySpy, encrypterSpy } = makeSut()
    await sut.auth(mockAuthenticationParams())
    expect(updateAccessTokenRepositorySpy.id).toBe(loadOwnerByEmailRepositorySpy.result.id)
    expect(updateAccessTokenRepositorySpy.token).toBe(encrypterSpy.ciphertext)
  })

  test('Should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositorySpy } = makeSut()
    jest.spyOn(updateAccessTokenRepositorySpy, 'updateAccessToken').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return authentication data on success', async () => {
    const { sut, encrypterSpy, loadOwnerByEmailRepositorySpy } = makeSut()
    const { accessToken, name } = await sut.auth(mockAuthenticationParams())
    expect(accessToken).toBe(encrypterSpy.ciphertext)
    expect(name).toBe(loadOwnerByEmailRepositorySpy.result.name)
  })
})
