import { InvalidParamError } from '@/domain/errors'
import { throwError } from '@/tests/domain/mocks'
import { EmailValidatorSpy } from '@/tests/validation/mocks'
import { EmailValidation } from '@/validation/validations'

import faker from 'faker'

const field = faker.random.word()

type SutTypes = {
  sut: EmailValidation
  emailValidatorSpy: EmailValidatorSpy
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const sut = new EmailValidation(field, emailValidatorSpy)
  return {
    sut,
    emailValidatorSpy
  }
}

describe('Email Validation', () => {
  test('Should call EmailValidator with correct value', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    const email = faker.internet.email()
    await sut.validate({ [field]: email })
    expect(emailValidatorSpy.email).toBe(email)
  })

  test('Should return an InvalidParamError if EmailValidator returns false', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.result = false
    const email = faker.internet.email()
    const error = await sut.validate({ [field]: email })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should throw if EmailValidator throws', async () => {
    const { sut, emailValidatorSpy } = makeSut()
    const email = faker.internet.email()
    jest.spyOn(emailValidatorSpy, 'isValidEmail').mockImplementationOnce(throwError)
    const promise = sut.validate({ [field]: email })
    await expect(promise).rejects.toThrow()
  })
})
