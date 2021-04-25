import { EmailValidator, IntValidator, ObjectIdValidator, PhoneNumberValidator, StrongPasswordValidator } from '@/validation/protocols'

import validator from 'validator'

export class ValidatorAdapter implements EmailValidator, PhoneNumberValidator, StrongPasswordValidator, ObjectIdValidator, IntValidator {
  isValidEmail (email: string): boolean {
    return validator.isEmail(email)
  }

  isValidPhoneNumber (phoneNumber: string): boolean {
    return validator.isMobilePhone(phoneNumber, 'pt-BR')
  }

  isStrongPassword (password: string): boolean {
    return validator.isStrongPassword(password)
  }

  isObjectId (objectId: any): boolean {
    return validator.isMongoId(String(objectId))
  }

  isInt (int: string): boolean {
    return validator.isInt(int)
  }
}
