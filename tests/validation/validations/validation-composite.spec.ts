import { MissingParamError } from '@/domain/errors'
import { ValidationSpy } from '@/tests/presentation/mocks'
import { ValidationComposite } from '@/validation/validations'

import faker from 'faker'

const field = faker.random.word()

type SutTypes = {
  sut: ValidationComposite
  validationSpies: ValidationSpy[]
}

const makeSut = (): SutTypes => {
  const validationSpies = [
    new ValidationSpy(),
    new ValidationSpy()
  ]
  const sut = new ValidationComposite(validationSpies)
  return {
    sut,
    validationSpies
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', async () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[1].error = new MissingParamError(field)
    const error = await sut.validate({ [field]: faker.random.word() })
    expect(error).toEqual(validationSpies[1].error)
  })

  test('Should return the first error if more than one validation fails', async () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[0].error = new Error()
    validationSpies[1].error = new MissingParamError(field)
    const error = await sut.validate({ [field]: faker.random.word() })
    expect(error).toEqual(validationSpies[0].error)
  })

  test('Should not return if validation succeeds', async () => {
    const { sut } = makeSut()
    const error = await sut.validate({ [field]: faker.random.word() })
    expect(error).toBeFalsy()
  })
})
