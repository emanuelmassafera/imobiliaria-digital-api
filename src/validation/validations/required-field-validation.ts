import { MissingParamError } from '@/domain/errors'
import { Validation } from '@/presentation/protocols'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  validate (input: any): Error {
    if (input[this.fieldName] !== 0) {
      if (!input[this.fieldName]) {
        return new MissingParamError(this.fieldName)
      }
    }
  }
}
