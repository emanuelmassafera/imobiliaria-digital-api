import { ValidatorAdapter, CpfCnpjValidatorAdapter } from '@/infra/validators'
import { Validation } from '@/presentation/protocols'
import { ValidationComposite, RequiredFieldValidation, CompareFieldsValidation, EmailValidation, PhoneNumberValidation, StrongPasswordValidation, CpfValidation } from '@/validation/validations'

export const makeRegisterOwnerValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of [
    'name',
    'email',
    'emailConfirmation',
    'cpf',
    'phoneNumber',
    'password',
    'passwordConfirmation',
    'cep',
    'state',
    'city',
    'neighborhood',
    'street',
    'number'
  ]) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new ValidatorAdapter()))
  validations.push(new CompareFieldsValidation('email', 'emailConfirmation'))
  validations.push(new CpfValidation('cpf', new CpfCnpjValidatorAdapter()))
  validations.push(new PhoneNumberValidation('phoneNumber', new ValidatorAdapter()))
  validations.push(new StrongPasswordValidation('password', new ValidatorAdapter()))
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  return new ValidationComposite(validations)
}
