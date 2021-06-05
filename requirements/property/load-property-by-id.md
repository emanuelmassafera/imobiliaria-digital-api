# Load Property By Id

## Success cases

1. ✅ Receives a **GET** request on route **/api/properties/{propertyId}**
2. ✅ Validates that **propertyId** has been provided
3. ✅ Validates that the **propertyId** field is an ObjectId
4. ✅ Returns **204** if there is no active property with the provided id
5. ✅ Returns **200** with the property

## Exceptions

1. ✅ Returns error **404** if the API does not exist
2. ✅ Returns error **400** if propertyId is not provided
3. ✅ Returns error **400** if propertyId field is not an ObjectId
4. ✅ Returns error **500** if get an error when trying to load the property