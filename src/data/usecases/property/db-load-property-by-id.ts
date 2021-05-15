import { LoadPropertyByIdRepository } from '@/data/protocols'
import { LoadPropertyById } from '@/domain/usecases'

export class DbLoadPropertyById implements LoadPropertyById {
  constructor (
    private readonly loadPropertyByIdRepository: LoadPropertyByIdRepository
  ) {}

  async loadPropertyById (params: LoadPropertyById.Params): Promise<LoadPropertyById.Result> {
    const property = await this.loadPropertyByIdRepository.loadPropertyById(params)
    return property
  }
}
