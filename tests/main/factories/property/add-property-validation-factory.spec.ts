import { CepPromiseAdapter } from '@/infra/validators'
import { makeAddPropertyValidation } from '@/main/factories'
import { Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation, CepValidation } from '@/validation/validations'

jest.mock('@/validation/validations/validation-composite')

describe('AddPropertyValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddPropertyValidation()
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
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
