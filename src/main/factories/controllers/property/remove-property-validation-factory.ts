import { ValidatorAdapter } from '@/infra/validators'
import { Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation, ObjectIdValidation } from '@/validation/validations'

export const makeRemovePropertyValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of [
    'propertyId',
    'ownerId'
  ]) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new ObjectIdValidation('propertyId', new ValidatorAdapter()))
  validations.push(new ObjectIdValidation('ownerId', new ValidatorAdapter()))
  return new ValidationComposite(validations)
}
