import { OwnerModel } from '@/domain/models'

export interface AddOwner {
  add: (params: AddOwner.Params) => Promise<void>
}

export namespace AddOwner {
  export type Params = Omit<OwnerModel, 'id'>
}
