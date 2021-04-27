import { InvalidParamError } from '@/domain/errors'
import { throwError } from '@/tests/domain/mocks'
import { CepValidatorSpy } from '@/tests/validation/mocks'
import { CepValidation } from '@/validation/validations'

import faker from 'faker'

const field = faker.random.word()

type SutTypes = {
  sut: CepValidation
  cepValidatorSpy: CepValidatorSpy
}

const makeSut = (): SutTypes => {
  const cepValidatorSpy = new CepValidatorSpy()
  const sut = new CepValidation(field, cepValidatorSpy)
  return {
    sut,
    cepValidatorSpy
  }
}

describe('Cep Validation', () => {
  test('Should call CepValidator with correct value', async () => {
    const { sut, cepValidatorSpy } = makeSut()
    const cep = faker.datatype.uuid()
    await sut.validate({ [field]: cep })
    expect(cepValidatorSpy.cep).toBe(cep)
  })

  test('Should return an InvalidParamError if CepValidator returns false', async () => {
    const { sut, cepValidatorSpy } = makeSut()
    cepValidatorSpy.result = false
    const cep = faker.datatype.uuid()
    const error = await sut.validate({ [field]: cep })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should throw if CepValidator throws', async () => {
    const { sut, cepValidatorSpy } = makeSut()
    const cep = faker.datatype.uuid()
    jest.spyOn(cepValidatorSpy, 'isValidCep').mockImplementationOnce(throwError)
    const promise = sut.validate({ [field]: cep })
    await expect(promise).rejects.toThrow()
  })
})
