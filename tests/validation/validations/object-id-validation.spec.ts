import { InvalidParamError } from '@/domain/errors'
import { throwError } from '@/tests/domain/mocks'
import { ObjectIdValidatorSpy } from '@/tests/validation/mocks'
import { ObjectIdValidation } from '@/validation/validations'

import faker from 'faker'

const field = faker.random.word()

type SutTypes = {
  sut: ObjectIdValidation
  objectIdValidatorSpy: ObjectIdValidatorSpy
}

const makeSut = (): SutTypes => {
  const objectIdValidatorSpy = new ObjectIdValidatorSpy()
  const sut = new ObjectIdValidation(field, objectIdValidatorSpy)
  return {
    sut,
    objectIdValidatorSpy
  }
}

describe('ObjectId Validation', () => {
  test('Should call ObjectIdValidator with correct value', async () => {
    const { sut, objectIdValidatorSpy } = makeSut()
    const objectId = faker.datatype.uuid()
    await sut.validate({ [field]: objectId })
    expect(objectIdValidatorSpy.objectId).toBe(objectId)
  })

  test('Should return an InvalidParamError if ObjectIdValidator returns false', async () => {
    const { sut, objectIdValidatorSpy } = makeSut()
    objectIdValidatorSpy.result = false
    const objectId = faker.datatype.uuid()
    const error = await sut.validate({ [field]: objectId })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('Should throw if ObjectIdValidator throws', async () => {
    const { sut, objectIdValidatorSpy } = makeSut()
    const objectId = faker.datatype.uuid()
    jest.spyOn(objectIdValidatorSpy, 'isObjectId').mockImplementationOnce(throwError)
    const promise = sut.validate({ [field]: objectId })
    await expect(promise).rejects.toThrow()
  })
})
