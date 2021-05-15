import { ValidatorAdapter } from '@/infra/validators'
import { Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation, ObjectIdValidation } from '@/validation/validations'

export const makeLoadPropertyByIdValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of [
    'propertyId'
  ]) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new ObjectIdValidation('propertyId', new ValidatorAdapter()))
  return new ValidationComposite(validations)
}
