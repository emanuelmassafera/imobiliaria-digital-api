# Register Owner

## Success cases

1. ✅ Receives a **POST** request on route **/api/owners/register**
2. ✅ Validates that **name**, **email**, **emailConfirmation**, **cpf**, **phoneNumber**, **password**, **passwordConfirmation**, **cep**, **state**, **city**, **neighborhood**, **street** and **number** have been provided
3. ✅ Validates that the **email** field is a valid email
4. ✅ Validates that **email** and **emailConfirmation** are the same
5. ✅ Validates that the **cpf** field is a valid cpf
6. ✅ Validates that the **phoneNumber** field is a valid phone number
7. ✅ Validates that the **password** field is a strong password, that is, with 8 or more characters, at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol
8. ✅ Validates that **password** and **passwordConfirmation** are the same
9. ✅ **Validates** if an owner already exists with the provided email 
10. ✅ **Validates** if an owner already exists with the provided cpf
11. ✅ Generates an **encrypted password** (this password cannot be decrypted)
12. ✅ **Create** an account for the owner with the provided data, **replacing** the password with the encrypted password
13. ✅ Generates an **access token** from the owner id
14. ✅ **Updates** owner data with the generated access token
15. ✅ Returns **200** with the access token and name

## Exceptions

1. ✅ Returns error **404** if the API does not exist
2. ✅ Returns error **400** if name, email, emailConfirmation, cpf, phoneNumber, password, passwordConfirmation, cep, state, city, neighborhood, street or number are not provided by the client
3. ✅ Returns error **400** if the email field is an invalid email
4. ✅ Returns error **400** if email and emailConfirmation are not the same
5. ✅ Returns error **400** if the cpf field is an invalid cpf
6. ✅ Returns error **400** if the phoneNumber field is an invalid phone number
7. ✅ Returns error **400** if the password field is not a strong password
8. ✅ Returns error **400** if password and passwordConfirmation are not the same
9. ✅ Returns error **403** if the email provided is already in use
10. ✅ Returns error **403** if the cpf provided is already in use
11. ✅ Returns error **500** if get an error when trying to generate an encrypted password
12. ✅ Returns error **500** if get an error when trying to create a new owner account
13. ✅ Returns error **500** if get an error when trying to generate the access token
14. ✅ Returns error **500** if get an error when trying to update the owner account with the generated access token