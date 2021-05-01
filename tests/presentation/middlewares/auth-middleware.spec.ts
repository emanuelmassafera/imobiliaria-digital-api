import { ok, serverError, unauthorized } from '@/presentation/helpers'
import { AuthMiddleware } from '@/presentation/middlewares'
import { throwError } from '@/tests/domain/mocks'
import { LoadOwnerByTokenSpy } from '@/tests/presentation/mocks'

const mockRequest = (): AuthMiddleware.Request => ({
  accessToken: 'any_token'
})

type SutTypes = {
  sut: AuthMiddleware
  loadOwnerByTokenSpy: LoadOwnerByTokenSpy
}

const makeSut = (): SutTypes => {
  const loadOwnerByTokenSpy = new LoadOwnerByTokenSpy()
  const sut = new AuthMiddleware(loadOwnerByTokenSpy)
  return {
    sut,
    loadOwnerByTokenSpy
  }
}

describe('Auth Middleware', () => {
  test('Should return 401 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should call LoadOwnerByToken with correct accessToken', async () => {
    const { sut, loadOwnerByTokenSpy } = makeSut()
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadOwnerByTokenSpy.accessToken).toBe(httpRequest.accessToken)
  })

  test('Should return 401 if LoadOwnerByToken returns null', async () => {
    const { sut, loadOwnerByTokenSpy } = makeSut()
    loadOwnerByTokenSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(unauthorized())
  })

  test('Should return 500 if LoadOwnerByToken throws', async () => {
    const { sut, loadOwnerByTokenSpy } = makeSut()
    jest.spyOn(loadOwnerByTokenSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 if LoadOwnerByToken returns an owner', async () => {
    const { sut, loadOwnerByTokenSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok({
      ownerId: loadOwnerByTokenSpy.result.id
    }))
  })
})
