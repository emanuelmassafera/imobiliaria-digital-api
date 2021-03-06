import { InvalidParamError } from '@/domain/errors'
import { throwError } from '@/tests/domain/mocks'
import { IntValidatorSpy } from '@/tests/validation/mocks'
import { IntValidation } from '@/validation/validations'

import faker from 'faker'

const field = faker.random.word()

type SutTypes = {
  sut: IntValidation
  intValidatorSpy: IntValidatorSpy
}

const makeSut = (): SutTypes => {
  const intValidatorSpy = new IntValidatorSpy()
  const sut = new IntValidation(field, intValidatorSpy)
  return {
    sut,
    intValidatorSpy
  }
}

describe('Int Validation', () => {
  test('Should call IntValidator with correct value', async () => {
    const { sut, intValidatorSpy } = makeSut()
    const number = faker.datatype.number()
    await sut.validate({ [field]: number })
    expect(Number(intValidatorSpy.number)).toBe(number)
  })

  test('Should return an InvalidParamError if IntValidator returns false', async () => {
    const { sut, intValidatorSpy } = makeSut()
    intValidatorSpy.result = false
    const number = faker.datatype.number()
    const error = await sut.validate({ [field]: number })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should throw if IntValidator throws', async () => {
    const { sut, intValidatorSpy } = makeSut()
    const number = faker.datatype.number()
    jest.spyOn(intValidatorSpy, 'isInt').mockImplementationOnce(throwError)
    const promise = sut.validate({ [field]: number })
    await expect(promise).rejects.toThrow()
  })
})
