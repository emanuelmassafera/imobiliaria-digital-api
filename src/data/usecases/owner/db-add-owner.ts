import { CheckOwnerByEmailRepository, CheckOwnerByCpfRepository, Hasher, AddOwnerRepository } from '@/data/protocols'
import { CpfInUseError, EmailInUseError } from '@/domain/errors'
import { AddOwner } from '@/domain/usecases'

export class DbAddOwner implements AddOwner {
  constructor (
    private readonly checkOwnerByEmailRepository: CheckOwnerByEmailRepository,
    private readonly checkOwnerByCpfRepository: CheckOwnerByCpfRepository,
    private readonly hasher: Hasher,
    private readonly addOwnerRepository: AddOwnerRepository
  ) {}

  async add (params: AddOwner.Params): Promise<void> {
    const emailInUse = await this.checkOwnerByEmailRepository.checkByEmail(params.email)
    if (emailInUse) {
      throw new EmailInUseError()
    }

    const cpfInUse = await this.checkOwnerByCpfRepository.checkByCpf(params.cpf)
    if (cpfInUse) {
      throw new CpfInUseError()
    }

    const hashedPassword = await this.hasher.hash(params.password)

    await this.addOwnerRepository.add({ ...params, password: hashedPassword })
  }
}
