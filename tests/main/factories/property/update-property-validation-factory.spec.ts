import { CepPromiseAdapter, ValidatorAdapter } from '@/infra/validators'
import { makeUpdatePropertyValidation } from '@/main/factories'
import { Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation, ObjectIdValidation, CepValidation } from '@/validation/validations'

jest.mock('@/validation/validations/validation-composite')

describe('UpdatePropertyValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeUpdatePropertyValidation()
    const validations: Validation[] = []
    for (const field of [
      'propertyId',
      'ownerId'
    ]) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new ObjectIdValidation('propertyId', new ValidatorAdapter()))
    validations.push(new ObjectIdValidation('ownerId', new ValidatorAdapter()))
    validations.push(new CepValidation('cep', new CepPromiseAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
