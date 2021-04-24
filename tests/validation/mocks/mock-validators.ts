import { CpfValidator, EmailValidator, IntValidator, ObjectIdValidator, PhoneNumberValidator, StrongPasswordValidator } from '@/validation/protocols'

export class CpfValidatorSpy implements CpfValidator {
  document: string
  result = true

  isValidCpf (document: string): boolean {
    this.document = document
    return this.result
  }
}

export class EmailValidatorSpy implements EmailValidator {
  email: string
  result = true

  isValidEmail (email: string): boolean {
    this.email = email
    return this.result
  }
}

export class IntValidatorSpy implements IntValidator {
  number: string
  result = true

  isInt (number: string): boolean {
    this.number = number
    return this.result
  }
}

export class ObjectIdValidatorSpy implements ObjectIdValidator {
  objectId: string
  result = true

  isObjectId (objectId: any): boolean {
    this.objectId = objectId
    return this.result
  }
}

export class PhoneNumberValidatorSpy implements PhoneNumberValidator {
  phoneNumber: string
  result = true

  isValidPhoneNumber (phoneNumber: string): boolean {
    this.phoneNumber = phoneNumber
    return this.result
  }
}

export class StrongPasswordValidatorSpy implements StrongPasswordValidator {
  password: string
  result = true

  isStrongPassword (password: string): boolean {
    this.password = password
    return this.result
  }
}
