export interface PhoneNumberValidator {
  isValidPhoneNumber: (phoneNumber: string) => Promise<boolean>
}
