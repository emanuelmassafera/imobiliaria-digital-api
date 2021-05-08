/* eslint-disable @typescript-eslint/no-var-requires */
import { CepPromiseAdapter } from '@/infra/validators'
import { throwError } from '@/tests/domain/mocks'

import faker from 'faker'
const cep = require('cep-promise')

jest.mock('cep-promise')

const makeSut = (): CepPromiseAdapter => {
  return new CepPromiseAdapter()
}

let cepCode: string

describe('CepPromiseAdapter', () => {
  describe('cep', () => {
    beforeEach(() => {
      cepCode = faker.datatype.uuid()
    })

    test('Should call cep with correct values', async () => {
      const sut = makeSut()
      await sut.isValidCep(cepCode)
      expect(cep).toHaveBeenCalledWith(cepCode, { timeout: 3000 })
    })

    test('Should return false if cep throws', async () => {
      const sut = makeSut()
      cep.mockImplementationOnce(throwError)
      const isValid = await sut.isValidCep(cepCode)
      expect(isValid).toBe(false)
    })

    test('Should return true if cep returns an address', async () => {
      const sut = makeSut()
      cep.mockImplementationOnce(() => {
        return {
          cep: 'any_cep',
          state: 'any_state',
          city: 'any_city',
          street: 'any_street',
          neighborhood: 'any_neighborhood',
          service: 'any_service'
        }
      })
      const isValid = await sut.isValidCep(cepCode)
      expect(isValid).toBe(true)
    })
  })
})
