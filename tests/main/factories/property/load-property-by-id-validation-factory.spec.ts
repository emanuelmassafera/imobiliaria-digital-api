import { ValidatorAdapter } from '@/infra/validators'
import { makeLoadPropertyByIdValidation } from '@/main/factories'
import { Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation, ObjectIdValidation } from '@/validation/validations'

jest.mock('@/validation/validations/validation-composite')

describe('LoadPropertyByIdValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoadPropertyByIdValidation()
    const validations: Validation[] = []
    for (const field of [
      'propertyId'
    ]) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new ObjectIdValidation('propertyId', new ValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
