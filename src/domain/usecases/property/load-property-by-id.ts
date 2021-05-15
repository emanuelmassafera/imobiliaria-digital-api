import { PropertyModel } from '@/domain/models'

export interface LoadPropertyById {
  loadPropertyById: (params: LoadPropertyById.Params) => Promise<LoadPropertyById.Result>
}

export namespace LoadPropertyById {
  export type Params = {
    propertyId: string
    ownerId?: string
    active?: boolean
  }

  export type Result = PropertyModel
}
