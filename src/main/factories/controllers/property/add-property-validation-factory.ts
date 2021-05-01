import { CepPromiseAdapter } from '@/infra/validators'
import { Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation, CepValidation } from '@/validation/validations'

export const makeAddPropertyValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of [
    'type',
    'availableTo',
    'price',
    'cep',
    'state',
    'city',
    'neighborhood',
    'street',
    'number',
    'description',
    'dimensions',
    'numberOfBedrooms',
    'numberOfBathrooms',
    'numberOfParkingSpaces',
    'images'
  ]) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CepValidation('cep', new CepPromiseAdapter()))
  return new ValidationComposite(validations)
}
