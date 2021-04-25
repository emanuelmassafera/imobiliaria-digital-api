import { AddOwner } from '@/domain/usecases'

export interface AddOwnerRepository {
  add: (params: AddOwnerRepository.Params) => Promise<AddOwnerRepository.Result>
}

export namespace AddOwnerRepository {
  export type Params = AddOwner.Params

  export type Result = AddOwner.Result
}
