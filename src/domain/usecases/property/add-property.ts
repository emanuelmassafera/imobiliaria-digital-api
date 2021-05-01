import { PropertyModel } from '@/domain/models'

export interface AddProperty {
  add: (params: AddProperty.Params) => Promise<AddProperty.Result>
}

export namespace AddProperty {
  export type Params = Omit<PropertyModel, 'id'>

  export type Result = PropertyModel
}
