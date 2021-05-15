import { LoadPropertyById } from '@/domain/usecases'

export interface LoadPropertyByIdRepository {
  loadPropertyById: (params: LoadPropertyByIdRepository.Params) => Promise<LoadPropertyByIdRepository.Result>
}

export namespace LoadPropertyByIdRepository {
  export type Params = LoadPropertyById.Params

  export type Result = LoadPropertyById.Result
}
