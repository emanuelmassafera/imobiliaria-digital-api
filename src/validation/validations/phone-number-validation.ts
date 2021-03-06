import { InvalidParamError } from '@/domain/errors'
import { Validation } from '@/presentation/protocols'
import { PhoneNumberValidator } from '@/validation/protocols'

export class PhoneNumberValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly phoneNumberValidator: PhoneNumberValidator
  ) {}

  async validate (input: any): Promise<Error> {
    if (input[this.fieldName]) {
      const isValid = await this.phoneNumberValidator.isValidPhoneNumber(String(input[this.fieldName]))
      if (!isValid) {
        return new InvalidParamError(this.fieldName)
      }
    }
  }
}
