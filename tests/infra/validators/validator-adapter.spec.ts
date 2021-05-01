import { ValidatorAdapter } from '@/infra/validators'

import faker from 'faker'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  },

  isMobilePhone (): boolean {
    return true
  },

  isStrongPassword (): boolean {
    return true
  },

  isMongoId (): boolean {
    return true
  },

  isInt (): boolean {
    return true
  }
}))

const makeSut = (): ValidatorAdapter => {
  return new ValidatorAdapter()
}

let email: string
let phoneNumber: string
let password: string
let objectId: string
let int: string

describe('Validator Adapter', () => {
  describe('isValidEmail()', () => {
    beforeEach(() => {
      email = faker.internet.email()
    })

    test('Should call isEmail with correct value', async () => {
      const sut = makeSut()
      const isEmailSpy = jest.spyOn(validator, 'isEmail')
      await sut.isValidEmail(email)
      expect(isEmailSpy).toHaveBeenCalledWith(email)
    })

    test('Should return false if isEmail returns false', async () => {
      const sut = makeSut()
      jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
      const isValid = await sut.isValidEmail(email)
      expect(isValid).toBe(false)
    })

    test('Should return true if isEmail returns true', async () => {
      const sut = makeSut()
      const isValid = await sut.isValidEmail(email)
      expect(isValid).toBe(true)
    })
  })

  describe('isValidPhoneNumber()', () => {
    beforeEach(() => {
      phoneNumber = faker.phone.phoneNumber()
    })

    test('Should call isMobilePhone with correct value', async () => {
      const sut = makeSut()
      const isMobilePhoneSpy = jest.spyOn(validator, 'isMobilePhone')
      await sut.isValidPhoneNumber(phoneNumber)
      expect(isMobilePhoneSpy).toHaveBeenCalledWith(phoneNumber, 'pt-BR')
    })

    test('Should return false if isMobilePhone returns false', async () => {
      const sut = makeSut()
      jest.spyOn(validator, 'isMobilePhone').mockReturnValueOnce(false)
      const isValid = await sut.isValidPhoneNumber(phoneNumber)
      expect(isValid).toBe(false)
    })

    test('Should return true if isMobilePhone returns true', async () => {
      const sut = makeSut()
      const isValid = await sut.isValidPhoneNumber(phoneNumber)
      expect(isValid).toBe(true)
    })
  })

  describe('isStrongPassword()', () => {
    beforeEach(() => {
      password = faker.internet.password()
    })

    test('Should call isStrongPassword with correct value', async () => {
      const sut = makeSut()
      const isStrongPasswordSpy = jest.spyOn(validator, 'isStrongPassword')
      await sut.isStrongPassword(password)
      expect(isStrongPasswordSpy).toHaveBeenCalledWith(password)
    })

    test('Should return false if isStrongPassword returns false', async () => {
      const sut = makeSut()
      jest.spyOn(validator, 'isStrongPassword').mockReturnValueOnce(false)
      const isValid = await sut.isStrongPassword(password)
      expect(isValid).toBe(false)
    })

    test('Should return true if isStrongPassword returns true', async () => {
      const sut = makeSut()
      const isValid = await sut.isStrongPassword(password)
      expect(isValid).toBe(true)
    })
  })

  describe('isValidObjectId()', () => {
    beforeEach(() => {
      objectId = faker.datatype.uuid()
    })

    test('Should call isMongoId with correct value', async () => {
      const sut = makeSut()
      const isValidObjectIdSpy = jest.spyOn(validator, 'isMongoId')
      await sut.isObjectId(objectId)
      expect(isValidObjectIdSpy).toHaveBeenCalledWith(objectId)
    })

    test('Should return false if isMongoId returns false', async () => {
      const sut = makeSut()
      jest.spyOn(validator, 'isMongoId').mockReturnValueOnce(false)
      const isValid = await sut.isObjectId(objectId)
      expect(isValid).toBe(false)
    })

    test('Should return true if isMongoId returns true', async () => {
      const sut = makeSut()
      const isValid = await sut.isObjectId(objectId)
      expect(isValid).toBe(true)
    })
  })

  describe('isInt()', () => {
    beforeEach(() => {
      int = String(faker.datatype.number())
    })

    test('Should call isInt with correct value', async () => {
      const sut = makeSut()
      const isIntSpy = jest.spyOn(validator, 'isInt')
      await sut.isInt(int)
      expect(isIntSpy).toHaveBeenCalledWith(int)
    })

    test('Should return false if isInt returns false', async () => {
      const sut = makeSut()
      jest.spyOn(validator, 'isInt').mockReturnValueOnce(false)
      const isValid = await sut.isInt(int)
      expect(isValid).toBe(false)
    })

    test('Should return true if isInt returns true', async () => {
      const sut = makeSut()
      const isValid = await sut.isInt(int)
      expect(isValid).toBe(true)
    })
  })
})
