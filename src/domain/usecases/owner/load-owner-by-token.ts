export interface LoadOwnerByToken {
  load: (accessToken: string) => Promise<LoadOwnerByToken.Result>
}

export namespace LoadOwnerByToken {
  export type Result = {
    id: string
  }
}
