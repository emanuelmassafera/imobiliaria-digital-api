export interface CepValidator {
  isValidCep: (cep: string) => Promise<boolean>
}
