import { EmailValidator, IntValidator, ObjectIdValidator, PhoneNumberValidator, StrongPasswordValidator } from '@/validation/protocols'

import validator from 'validator'

export class ValidatorAdapter implements EmailValidator, PhoneNumberValidator, StrongPasswordValidator, ObjectIdValidator, IntValidator {
  async isValidEmail (email: string): Promise<boolean> {
    return validator.isEmail(email)
  }

  async isValidPhoneNumber (phoneNumber: string): Promise<boolean> {
    return validator.isMobilePhone(phoneNumber, 'pt-BR')
  }

  async isStrongPassword (password: string): Promise<boolean> {
    return validator.isStrongPassword(password)
  }

  async isObjectId (objectId: any): Promise<boolean> {
    return validator.isMongoId(String(objectId))
  }

  async isInt (int: string): Promise<boolean> {
    return validator.isInt(int)
  }
}
