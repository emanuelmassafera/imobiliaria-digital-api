import { PropertyModel } from '@/domain/models'

export interface LoadProperties {
  loadProperties: (params: LoadProperties.Params) => Promise<LoadProperties.Result>
}

export namespace LoadProperties {
  export type Params = {
    ownerId?: string
    type?: string
    availableTo?: string
    state?: string
    city?: string
    neighborhood?: string
    minimumOfBedrooms?: number
    active?: boolean
  }

  export type Result = PropertyModel[]
}
