import { CpfInUseError, EmailInUseError, MissingParamError, UserNotFoundError, WrongPasswordError } from '@/domain/errors'
import { RegisterOwnerController } from '@/presentation/controllers'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { AddOwnerSpy, AuthenticationSpy, ValidationSpy } from '@/tests/presentation/mocks'

import faker from 'faker'
import MockDate from 'mockdate'

const mockRequest = (): RegisterOwnerController.Request => {
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    emailConfirmation: faker.internet.email(),
    phoneNumber: faker.phone.phoneNumber(),
    cpf: faker.datatype.uuid(),
    password: faker.internet.password(),
    passwordConfirmation: faker.internet.password(),
    cep: faker.datatype.uuid(),
    state: faker.address.state(),
    city: faker.address.city(),
    neighborhood: faker.random.word(),
    street: faker.address.streetName(),
    number: faker.datatype.number().toString(),
    complement: faker.random.word()
  }
}

type SutTypes = {
  sut: RegisterOwnerController
  validationSpy: ValidationSpy
  addOwnerSpy: AddOwnerSpy
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addOwnerSpy = new AddOwnerSpy()
  const authenticationSpy = new AuthenticationSpy()
  const sut = new RegisterOwnerController(validationSpy, addOwnerSpy, authenticationSpy)
  return {
    sut,
    validationSpy,
    addOwnerSpy,
    authenticationSpy
  }
}

describe('RegisterOwner Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.random.word())
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should return 500 if Validation throws', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call AddOwner with correct values', async () => {
    const { sut, addOwnerSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addOwnerSpy.params).toEqual({
      name: request.name,
      email: request.email,
      password: request.password,
      cpf: request.cpf,
      phoneNumber: request.phoneNumber,
      address: {
        cep: request.cep,
        state: request.state,
        city: request.city,
        neighborhood: request.neighborhood,
        street: request.street,
        number: request.number,
        complement: request.complement
      },
      createdAt: new Date()
    })
  })

  test('Should return 403 if AddOwner throws an EmailInUseError', async () => {
    const { sut, addOwnerSpy } = makeSut()
    jest.spyOn(addOwnerSpy, 'add').mockImplementationOnce((): never => {
      throw new EmailInUseError()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('Should return 403 if AddOwner throws a CpfInUseError', async () => {
    const { sut, addOwnerSpy } = makeSut()
    jest.spyOn(addOwnerSpy, 'add').mockImplementationOnce((): never => {
      throw new CpfInUseError()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new CpfInUseError()))
  })

  test('Should return 500 if AddOwner throws an unknown error', async () => {
    const { sut, addOwnerSpy } = makeSut()
    jest.spyOn(addOwnerSpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(authenticationSpy.params).toEqual({
      email: request.email,
      password: request.password
    })
  })

  test('Should return 403 if Authentication throws an UserNotFoundError', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce((): never => {
      throw new UserNotFoundError()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new UserNotFoundError()))
  })

  test('Should return 403 if Authentication throws an WrongPasswordError', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce((): never => {
      throw new WrongPasswordError()
    })
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new WrongPasswordError()))
  })

  test('Should return 500 if Authentication throws an unknown error', async () => {
    const { sut, authenticationSpy } = makeSut()
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 200 with authentication result', async () => {
    const { sut, authenticationSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(authenticationSpy.result))
  })
})
