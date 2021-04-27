import { InvalidParamError } from '@/domain/errors'
import { Validation } from '@/presentation/protocols'
import { IntValidator } from '@/validation/protocols'

export class IntValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly intValidator: IntValidator
  ) {}

  async validate (input: any): Promise<Error> {
    if (input[this.fieldName]) {
      const isValid = this.intValidator.isInt(String(input[this.fieldName]))
      if (!isValid) {
        return new InvalidParamError(this.fieldName)
      }
    }
  }
}
