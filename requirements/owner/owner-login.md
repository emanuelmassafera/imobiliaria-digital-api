# Owner Login

## Success cases

1. ✅ Receives a **POST** request on route **/api/owners/login**
2. ✅ Validates that **email** and **password** have been provided
3. ✅ Validates that the **email** field is a valid email
4. ✅ Validates that the **password** field is a strong password, that is, with 8 or more characters, at least 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol
5. ✅ **Search** the user with the provided params
6. ✅ Generates an **access token** from the owner id
7. ✅ **Updates** owner data with the generated access token
8. ✅ Returns **200** with the access token and name

## Exceptions

1. ✅ Returns error **404** if the API does not exist
2. ✅ Returns error **400** if email or password are not provided by the client
3. ✅ Returns error **400** if the email field is an invalid email
4. ✅ Returns error **400** if the password field is not a strong password
5. ✅ Returns error **403** if cannot find an user with the provided params
6. ✅ Returns error **500** if get an error when trying to generate the access token
7. ✅ Returns error **500** if get an error when trying to update the owner account with the generated access token