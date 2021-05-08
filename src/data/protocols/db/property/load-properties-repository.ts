import { LoadProperties } from '@/domain/usecases'

export interface LoadPropertiesRepository {
  loadProperties: (params: LoadPropertiesRepository.Params) => Promise<LoadPropertiesRepository.Result>
}

export namespace LoadPropertiesRepository {
  export type Params = LoadProperties.Params

  export type Result = LoadProperties.Result
}
