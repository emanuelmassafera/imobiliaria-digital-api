import { LoadPropertiesRepository } from '@/data/protocols'
import { LoadProperties } from '@/domain/usecases'

export class DbLoadProperties implements LoadProperties {
  constructor (
    private readonly loadPropertiesRepository: LoadPropertiesRepository
  ) {}

  async loadProperties (params: LoadProperties.Params): Promise<LoadProperties.Result> {
    const properties = await this.loadPropertiesRepository.loadProperties(params)
    return properties
  }
}
