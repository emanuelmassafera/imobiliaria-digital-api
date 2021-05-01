import { CpfCnpjValidatorAdapter } from '@/infra/validators'

import { cpf } from 'cpf-cnpj-validator'
import faker from 'faker'

const makeSut = (): CpfCnpjValidatorAdapter => {
  return new CpfCnpjValidatorAdapter()
}

let document: string

describe('CpnjValidator Adapter', () => {
  describe('isValidCpf()', () => {
    beforeEach(() => {
      document = faker.datatype.uuid()
    })

    test('Should call isValid with correct value', async () => {
      const sut = makeSut()
      const isValidSpy = jest.spyOn(cpf, 'isValid')
      await sut.isValidCpf(document)
      expect(isValidSpy).toHaveBeenCalledWith(document)
    })

    test('Should return false if isValid returns false', async () => {
      const sut = makeSut()
      jest.spyOn(cpf, 'isValid').mockReturnValueOnce(false)
      const isValid = await sut.isValidCpf(document)
      expect(isValid).toBe(false)
    })

    test('Should return true if isValid returns true', async () => {
      const sut = makeSut()
      jest.spyOn(cpf, 'isValid').mockReturnValueOnce(true)
      const isValid = await sut.isValidCpf(document)
      expect(isValid).toBe(true)
    })
  })
})
