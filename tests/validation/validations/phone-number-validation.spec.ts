import { InvalidParamError } from '@/domain/errors'
import { throwError } from '@/tests/domain/mocks'
import { PhoneNumberValidatorSpy } from '@/tests/validation/mocks'
import { PhoneNumberValidation } from '@/validation/validations'

import faker from 'faker'

const field = faker.random.word()

type SutTypes = {
  sut: PhoneNumberValidation
  phoneNumberValidatorSpy: PhoneNumberValidatorSpy
}

const makeSut = (): SutTypes => {
  const phoneNumberValidatorSpy = new PhoneNumberValidatorSpy()
  const sut = new PhoneNumberValidation(field, phoneNumberValidatorSpy)
  return {
    sut,
    phoneNumberValidatorSpy
  }
}

describe('PhoneNumber Validation', () => {
  test('Should call PhoneNumberValidator with correct value', () => {
    const { sut, phoneNumberValidatorSpy } = makeSut()
    const phoneNumber = faker.phone.phoneNumber()
    sut.validate({ [field]: phoneNumber })
    expect(phoneNumberValidatorSpy.phoneNumber).toBe(phoneNumber)
  })

  test('Should return an InvalidParamError if PhoneNumberValidator returns false', () => {
    const { sut, phoneNumberValidatorSpy } = makeSut()
    phoneNumberValidatorSpy.result = false
    const phoneNumber = faker.phone.phoneNumber()
    const error = sut.validate({ [field]: phoneNumber })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should throw if PhoneNumberValidator throws', () => {
    const { sut, phoneNumberValidatorSpy } = makeSut()
    jest.spyOn(phoneNumberValidatorSpy, 'isValidPhoneNumber').mockImplementationOnce(throwError)
    expect(sut.validate).toThrow()
  })
})
