import { InvalidParamError } from '@/domain/errors'
import { Validation } from '@/presentation/protocols'
import { EmailValidator } from '@/validation/protocols'

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) {}

  async validate (input: any): Promise<Error> {
    if (input[this.fieldName]) {
      const isValid = this.emailValidator.isValidEmail(String(input[this.fieldName]))
      if (!isValid) {
        return new InvalidParamError(this.fieldName)
      }
    }
  }
}
