import { InvalidParamError } from '@/domain/errors'
import { throwError } from '@/tests/domain/mocks'
import { CpfValidatorSpy } from '@/tests/validation/mocks'
import { CpfValidation } from '@/validation/validations'

import faker from 'faker'

const field = faker.random.word()

type SutTypes = {
  sut: CpfValidation
  cpfValidatorSpy: CpfValidatorSpy
}

const makeSut = (): SutTypes => {
  const cpfValidatorSpy = new CpfValidatorSpy()
  const sut = new CpfValidation(field, cpfValidatorSpy)
  return {
    sut,
    cpfValidatorSpy
  }
}

describe('Cpf Validation', () => {
  test('Should call CpfValidator with correct value', () => {
    const { sut, cpfValidatorSpy } = makeSut()
    const document = faker.datatype.uuid()
    sut.validate({ [field]: document })
    expect(cpfValidatorSpy.document).toBe(document)
  })

  test('Should return an InvalidParamError if CpfValidator returns false', () => {
    const { sut, cpfValidatorSpy } = makeSut()
    cpfValidatorSpy.result = false
    const document = faker.datatype.uuid()
    const error = sut.validate({ [field]: document })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should throw if CpfValidator throws', () => {
    const { sut, cpfValidatorSpy } = makeSut()
    jest.spyOn(cpfValidatorSpy, 'isValidCpf').mockImplementationOnce(throwError)
    expect(sut.validate).toThrow()
  })
})
