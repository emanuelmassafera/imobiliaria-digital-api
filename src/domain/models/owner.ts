export type OwnerModel = {
  id: string
  name: string
  email: string
  cpf: string
  phoneNumber: string
  address: {
    cep: string
    state: string
    city: string
    neighborhood: string
    street: string
    number: string
    complement?: string
  }
  createdAt: Date
}
