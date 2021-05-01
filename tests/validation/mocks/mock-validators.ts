import { CepValidator, CpfValidator, EmailValidator, IntValidator, ObjectIdValidator, PhoneNumberValidator, StrongPasswordValidator } from '@/validation/protocols'

export class CpfValidatorSpy implements CpfValidator {
  document: string
  result = true

  async isValidCpf (document: string): Promise<boolean> {
    this.document = document
    return this.result
  }
}

export class EmailValidatorSpy implements EmailValidator {
  email: string
  result = true

  async isValidEmail (email: string): Promise<boolean> {
    this.email = email
    return this.result
  }
}

export class IntValidatorSpy implements IntValidator {
  number: string
  result = true

  async isInt (number: string): Promise<boolean> {
    this.number = number
    return this.result
  }
}

export class ObjectIdValidatorSpy implements ObjectIdValidator {
  objectId: string
  result = true

  async isObjectId (objectId: any): Promise<boolean> {
    this.objectId = objectId
    return this.result
  }
}

export class PhoneNumberValidatorSpy implements PhoneNumberValidator {
  phoneNumber: string
  result = true

  async isValidPhoneNumber (phoneNumber: string): Promise<boolean> {
    this.phoneNumber = phoneNumber
    return this.result
  }
}

export class StrongPasswordValidatorSpy implements StrongPasswordValidator {
  password: string
  result = true

  async isStrongPassword (password: string): Promise<boolean> {
    this.password = password
    return this.result
  }
}

export class CepValidatorSpy implements CepValidator {
  cep: string
  result = true

  async isValidCep (cep: string): Promise<boolean> {
    this.cep = cep
    return this.result
  }
}
