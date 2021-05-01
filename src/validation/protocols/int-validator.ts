export interface IntValidator {
  isInt: (number: string) => Promise<boolean>
}
