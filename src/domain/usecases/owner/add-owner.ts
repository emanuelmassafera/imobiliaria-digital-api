import { OwnerModel } from '@/domain/models'

export interface AddOwner {
  add: (params: AddOwner.Params) => Promise<AddOwner.Result>
}

export namespace AddOwner {
  export type Params = Omit<OwnerModel, 'id'>

  export type Result = OwnerModel
}
