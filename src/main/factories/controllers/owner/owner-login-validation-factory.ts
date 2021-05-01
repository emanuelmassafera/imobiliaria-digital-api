import { ValidatorAdapter } from '@/infra/validators'
import { Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation, EmailValidation, StrongPasswordValidation } from '@/validation/validations'

export const makeOwnerLoginValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of [
    'email',
    'password'
  ]) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new ValidatorAdapter()))
  validations.push(new StrongPasswordValidation('password', new ValidatorAdapter()))
  return new ValidationComposite(validations)
}
