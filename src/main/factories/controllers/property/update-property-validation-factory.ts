import { CepPromiseAdapter, ValidatorAdapter } from '@/infra/validators'
import { Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation, CepValidation, ObjectIdValidation } from '@/validation/validations'

export const makeUpdatePropertyValidation = (): ValidationComposite => {
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
  return new ValidationComposite(validations)
}
