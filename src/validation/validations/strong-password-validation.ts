import { InvalidParamError } from '@/domain/errors'
import { Validation } from '@/presentation/protocols'
import { StrongPasswordValidator } from '@/validation/protocols'

export class StrongPasswordValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly strongPasswordValidator: StrongPasswordValidator
  ) {}

  async validate (input: any): Promise<Error> {
    if (input[this.fieldName]) {
      const isValid = await this.strongPasswordValidator.isStrongPassword(String(input[this.fieldName]))
      if (!isValid) {
        return new InvalidParamError(this.fieldName)
      }
    }
  }
}
