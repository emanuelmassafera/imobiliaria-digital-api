import { ValidatorAdapter } from '@/infra/validators'
import { makeOwnerLoginValidation } from '@/main/factories'
import { Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation, EmailValidation, StrongPasswordValidation } from '@/validation/validations'

jest.mock('@/validation/validations/validation-composite')

describe('OwnerLoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeOwnerLoginValidation()
    const validations: Validation[] = []
    for (const field of [
      'email',
      'password'
    ]) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', new ValidatorAdapter()))
    validations.push(new StrongPasswordValidation('password', new ValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
