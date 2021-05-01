import { InvalidParamError } from '@/domain/errors'
import { Validation } from '@/presentation/protocols'
import { CpfValidator } from '@/validation/protocols'

export class CpfValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly cpfValidator: CpfValidator
  ) {}

  async validate (input: any): Promise<Error> {
    if (input[this.fieldName]) {
      const isValid = await this.cpfValidator.isValidCpf(String(input[this.fieldName]))
      if (!isValid) {
        return new InvalidParamError(this.fieldName)
      }
    }
  }
}
