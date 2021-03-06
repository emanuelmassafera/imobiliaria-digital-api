import { MissingParamError } from '@/domain/errors'
import { RequiredFieldValidation } from '@/validation/validations'

import faker from 'faker'

const field = faker.random.word()

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation(field)
}

describe('RequiredField Validation', () => {
  test('Should not return if field contains 0', async () => {
    const sut = makeSut()
    const error = await sut.validate({ [field]: 0 })
    expect(error).toBeFalsy()
  })

  test('Should not return if field is not null ', async () => {
    const sut = makeSut()
    const error = await sut.validate({ [field]: faker.random.word() })
    expect(error).toBeFalsy()
  })

  test('Should return a MissingParamError if validation fails', async () => {
    const sut = makeSut()
    const error = await sut.validate({ invalidField: faker.random.word() })
    expect(error).toEqual(new MissingParamError(field))
  })
})
