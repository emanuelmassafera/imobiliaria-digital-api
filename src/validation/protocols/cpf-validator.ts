export interface CpfValidator {
  isValidCpf: (document: string) => Promise<boolean>
}
