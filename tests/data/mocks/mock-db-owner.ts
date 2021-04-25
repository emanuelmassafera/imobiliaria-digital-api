import { AddOwnerRepository, CheckOwnerByCpfRepository, CheckOwnerByEmailRepository } from '@/data/protocols'

export class AddOwnerRepositorySpy implements AddOwnerRepository {
  params: AddOwnerRepository.Params

  async add (params: AddOwnerRepository.Params): Promise<void> {
    this.params = params
  }
}

export class CheckOwnerByEmailRepositorySpy implements CheckOwnerByEmailRepository {
  email: string
  result = false

  async checkByEmail (email: string): Promise<boolean> {
    this.email = email
    return this.result
  }
}

export class CheckOwnerByCpfRepositorySpy implements CheckOwnerByCpfRepository {
  cpf: string
  result = false

  async checkByCpf (cpf: string): Promise<boolean> {
    this.cpf = cpf
    return this.result
  }
}
