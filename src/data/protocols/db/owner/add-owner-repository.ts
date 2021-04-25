import { AddOwner } from '@/domain/usecases'

export interface AddOwnerRepository {
  add: (params: AddOwnerRepository.Params) => Promise<void>
}

export namespace AddOwnerRepository {
  export type Params = AddOwner.Params
}
