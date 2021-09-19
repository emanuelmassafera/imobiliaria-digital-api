export interface RemoveProperty {
  remove: (params: RemoveProperty.Params) => Promise<RemoveProperty.Result>
}

export namespace RemoveProperty {
  export type Params = {
    propertyId: string
    ownerId: string
  }
  export type Result = void
}
