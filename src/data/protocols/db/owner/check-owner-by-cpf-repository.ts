export interface CheckOwnerByCpfRepository {
  checkByCpf: (cpf: string) => Promise<boolean>
}
