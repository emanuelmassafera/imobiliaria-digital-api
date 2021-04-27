import { Validation } from '@/presentation/protocols'

export class ValidationComposite implements Validation {
  constructor (private readonly validations: Validation[]) {}

  async validate (input: any): Promise<Error> {
    for (const validation of this.validations) {
      const error = await validation.validate(input)
      if (error) {
        return error
      }
    }
  }
}
