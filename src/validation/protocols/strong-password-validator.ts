export interface StrongPasswordValidator {
  isStrongPassword: (password: string) => Promise<boolean>
}
