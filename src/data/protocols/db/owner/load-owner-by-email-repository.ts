export interface LoadOwnerByEmailRepository {
  loadByEmail: (email: string) => Promise<LoadOwnerByEmailRepository.Result>
}

export namespace LoadOwnerByEmailRepository {
  export type Result = {
    id: string
    name: string
    password: string
  }
}
