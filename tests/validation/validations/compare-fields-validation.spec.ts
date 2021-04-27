import { InvalidParamError } from '@/domain/errors'
import { CompareFieldsValidation } from '@/validation/validations'

import faker from 'faker'

const field = faker.random.word()
const fieldToCompare = faker.random.word()

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation(field, fieldToCompare)
}

describe('CompareFields Validation', () => {
  test('Should return an InvalidParamError if validation fails', async () => {
    const sut = makeSut()
    const error = await sut.validate({
      [field]: faker.random.word(),
      [fieldToCompare]: faker.random.word()
    })
    expect(error).toEqual(new InvalidParamError(fieldToCompare))
  })

  test('Should not return if validation succeeds', async () => {
    const sut = makeSut()
    const value = faker.random.word()
    const error = await sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })
    expect(error).toBeFalsy()
  })
})
