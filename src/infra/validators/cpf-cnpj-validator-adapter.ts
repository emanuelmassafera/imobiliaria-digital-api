import { CpfValidator } from '@/validation/protocols'

import { cpf } from 'cpf-cnpj-validator'

export class CpfCnpjValidatorAdapter implements CpfValidator {
  isValidCpf (document: string): boolean {
    return cpf.isValid(document)
  }
}
