import { InvalidParamError } from '@/domain/errors'
import { throwError } from '@/tests/domain/mocks'
import { StrongPasswordValidatorSpy } from '@/tests/validation/mocks'
import { StrongPasswordValidation } from '@/validation/validations'

import faker from 'faker'

const field = faker.random.word()

type SutTypes = {
  sut: StrongPasswordValidation
  strongPasswordValidatorSpy: StrongPasswordValidatorSpy
}

const makeSut = (): SutTypes => {
  const strongPasswordValidatorSpy = new StrongPasswordValidatorSpy()
  const sut = new StrongPasswordValidation(field, strongPasswordValidatorSpy)
  return {
    sut,
    strongPasswordValidatorSpy
  }
}

describe('StrongPassword Validation', () => {
  test('Should call StrongPasswordValidator with correct value', () => {
    const { sut, strongPasswordValidatorSpy } = makeSut()
    const password = faker.internet.password()
    sut.validate({ [field]: password })
    expect(strongPasswordValidatorSpy.password).toBe(password)
  })

  test('Should return an InvalidParamError if StrongPasswordValidator returns false', () => {
    const { sut, strongPasswordValidatorSpy } = makeSut()
    strongPasswordValidatorSpy.result = false
    const password = faker.internet.password()
    const error = sut.validate({ [field]: password })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should throw if StrongPasswordValidator throws', () => {
    const { sut, strongPasswordValidatorSpy } = makeSut()
    jest.spyOn(strongPasswordValidatorSpy, 'isStrongPassword').mockImplementationOnce(throwError)
    expect(sut.validate).toThrow()
  })
})
