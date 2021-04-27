import { InvalidParamError } from '@/domain/errors'
import { Validation } from '@/presentation/protocols'
import { CepValidator } from '@/validation/protocols'

export class CepValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly cpfValidator: CepValidator
  ) {}

  async validate (input: any): Promise<Error> {
    if (input[this.fieldName]) {
      const isValid = await this.cpfValidator.isValidCep(String(input[this.fieldName]))
      if (!isValid) {
        return new InvalidParamError(this.fieldName)
      }
    }
  }
}
