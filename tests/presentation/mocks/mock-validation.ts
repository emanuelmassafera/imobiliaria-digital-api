import { Validation } from '@/presentation/protocols'

export class ValidationSpy implements Validation {
  input: any
  error: Error = null

  async validate (input: any): Promise<Error> {
    this.input = input
    return this.error
  }
}
