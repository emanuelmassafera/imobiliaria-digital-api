import { AddProperty } from '@/domain/usecases'

export interface AddPropertyRepository {
  add: (params: AddPropertyRepository.Params) => Promise<AddPropertyRepository.Result>
}

export namespace AddPropertyRepository {
  export type Params = AddProperty.Params

  export type Result = AddProperty.Result
}
