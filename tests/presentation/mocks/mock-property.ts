import { AddProperty, LoadProperties, LoadPropertyById, RemoveProperty, UpdateProperty } from '@/domain/usecases'
import { mockPropertyModel, mockPropertyModels } from '@/tests/domain/mocks'

export class AddPropertySpy implements AddProperty {
  params: AddProperty.Params
  result: AddProperty.Result = mockPropertyModel()

  async add (params: AddProperty.Params): Promise<AddProperty.Result> {
    this.params = params
    return this.result
  }
}

export class LoadPropertiesSpy implements LoadProperties {
  params: LoadProperties.Params
  result: LoadProperties.Result = mockPropertyModels()

  async loadProperties (params: LoadProperties.Params): Promise<LoadProperties.Result> {
    this.params = params
    return this.result
  }
}

export class LoadPropertyByIdSpy implements LoadPropertyById {
  params: LoadPropertyById.Params
  result: LoadPropertyById.Result = mockPropertyModel()

  async loadPropertyById (params: LoadPropertyById.Params): Promise<LoadPropertyById.Result> {
    this.params = params
    return this.result
  }
}

export class RemovePropertySpy implements RemoveProperty {
  params: RemoveProperty.Params

  async remove (params: RemoveProperty.Params): Promise<RemoveProperty.Result> {
    this.params = params
  }
}

export class UpdatePropertySpy implements UpdateProperty {
  params: UpdateProperty.Params
  result: UpdateProperty.Result = mockPropertyModel()

  async update (params: UpdateProperty.Params): Promise<UpdateProperty.Result> {
    this.params = params
    return this.result
  }
}
