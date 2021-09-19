import { ValidatorAdapter } from '@/infra/validators'
import { makeRemovePropertyValidation } from '@/main/factories'
import { Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation, ObjectIdValidation } from '@/validation/validations'

jest.mock('@/validation/validations/validation-composite')

describe('RemovePropertyValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeRemovePropertyValidation()
    const validations: Validation[] = []
    for (const field of [
      'propertyId',
      'ownerId'
    ]) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new ObjectIdValidation('propertyId', new ValidatorAdapter()))
    validations.push(new ObjectIdValidation('ownerId', new ValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
