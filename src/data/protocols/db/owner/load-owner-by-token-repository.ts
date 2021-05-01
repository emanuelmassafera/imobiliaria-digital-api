export interface LoadOwnerByTokenRepository {
  loadByToken: (accessToken: string) => Promise<LoadOwnerByTokenRepository.Result>
}

export namespace LoadOwnerByTokenRepository {
  export type Result = {
    id: string
  }
}
