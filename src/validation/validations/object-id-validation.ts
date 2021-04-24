import { InvalidParamError } from '@/domain/errors'
import { Validation } from '@/presentation/protocols'
import { ObjectIdValidator } from '@/validation/protocols'

export class ObjectIdValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly objectIdValidator: ObjectIdValidator
  ) {}

  validate (input: any): Error {
    if (input[this.fieldName]) {
      const isValid = this.objectIdValidator.isObjectId(input[this.fieldName])
      if (!isValid) {
        return new InvalidParamError(this.fieldName)
      }
    }
  }
}
