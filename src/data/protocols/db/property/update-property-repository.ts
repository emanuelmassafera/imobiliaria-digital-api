import { UpdateProperty } from '@/domain/usecases'

export interface UpdatePropertyRepository {
  update: (params: UpdatePropertyRepository.Params) => Promise<UpdatePropertyRepository.Result>
}

export namespace UpdatePropertyRepository {
  export type Params = UpdateProperty.Params
  export type Result = UpdateProperty.Result
}
