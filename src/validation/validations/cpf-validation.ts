import { InvalidParamError } from '@/domain/errors'
import { Validation } from '@/presentation/protocols'
import { CpfValidator } from '@/validation/protocols'

export class CpfValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly cpfValidator: CpfValidator
  ) {}

  validate (input: any): Error {
    if (input[this.fieldName]) {
      const isValid = this.cpfValidator.isValidCpf(input[this.fieldName])
      if (!isValid) {
        return new InvalidParamError(this.fieldName)
      }
    }
  }
}
