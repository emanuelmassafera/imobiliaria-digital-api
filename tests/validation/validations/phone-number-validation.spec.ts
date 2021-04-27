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
  test('Should call PhoneNumberValidator with correct value', async () => {
    const { sut, phoneNumberValidatorSpy } = makeSut()
    const phoneNumber = faker.phone.phoneNumber()
    await sut.validate({ [field]: phoneNumber })
    expect(phoneNumberValidatorSpy.phoneNumber).toBe(phoneNumber)
  })

  test('Should return an InvalidParamError if PhoneNumberValidator returns false', async () => {
    const { sut, phoneNumberValidatorSpy } = makeSut()
    phoneNumberValidatorSpy.result = false
    const phoneNumber = faker.phone.phoneNumber()
    const error = await sut.validate({ [field]: phoneNumber })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should throw if PhoneNumberValidator throws', async () => {
    const { sut, phoneNumberValidatorSpy } = makeSut()
    const phoneNumber = faker.phone.phoneNumber()
    jest.spyOn(phoneNumberValidatorSpy, 'isValidPhoneNumber').mockImplementationOnce(throwError)
    const promise = sut.validate({ [field]: phoneNumber })
    await expect(promise).rejects.toThrow()
  })
})
