export interface CheckOwnerByEmailRepository {
  checkByEmail: (email: string) => Promise<boolean>
}
