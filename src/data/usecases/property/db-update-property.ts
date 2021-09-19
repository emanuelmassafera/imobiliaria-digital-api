import { UpdatePropertyRepository } from '@/data/protocols'
import { UpdateProperty } from '@/domain/usecases'

export class DbUpdateProperty implements UpdateProperty {
  constructor (
    private readonly updatePropertyRepository: UpdatePropertyRepository
  ) {}

  async update (params: UpdateProperty.Params): Promise<UpdateProperty.Result> {
    const property = await this.updatePropertyRepository.update(params)
    return property
  }
}
