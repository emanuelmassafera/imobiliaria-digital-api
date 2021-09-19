import { RemoveProperty } from '@/domain/usecases'

export interface RemovePropertyRepository {
  removeProperty: (params: RemovePropertyRepository.Params) => Promise<RemovePropertyRepository.Result>
}

export namespace RemovePropertyRepository {
  export type Params = RemoveProperty.Params
  export type Result = RemoveProperty.Result
}
