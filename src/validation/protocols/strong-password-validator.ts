export interface StrongPasswordValidator {
  isStrongPassword: (password: string) => boolean
}
