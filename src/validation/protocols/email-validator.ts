export interface EmailValidator {
  isValidEmail: (email: string) => Promise<boolean>
}
