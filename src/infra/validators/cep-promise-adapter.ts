/* eslint-disable @typescript-eslint/no-var-requires */
import { CepValidator } from '@/validation/protocols'

const cep = require('cep-promise')

export class CepPromiseAdapter implements CepValidator {
  async isValidCep (cepCode: string): Promise<boolean> {
    try {
      await cep(cepCode, { timeout: 3000 })
      return true
    } catch (error) {
      return false
    }
  }
}
