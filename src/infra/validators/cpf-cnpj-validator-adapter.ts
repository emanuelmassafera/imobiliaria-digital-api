import { CpfValidator } from '@/validation/protocols'

import { cpf } from 'cpf-cnpj-validator'

export class CpfCnpjValidatorAdapter implements CpfValidator {
  async isValidCpf (document: string): Promise<boolean> {
    return cpf.isValid(document)
  }
}
