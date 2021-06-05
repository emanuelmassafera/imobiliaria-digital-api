# Load Owner Property By Id

## Success cases

1. ✅ Receives a **GET** request on route **/api/owners/properties/{propertyId}**
2. ✅ Validates if the request was made by an **owner**
3. ✅ Validates that **propertyId** has been provided
4. ✅ Validates that the **propertyId** field is an ObjectId
5. ✅ Returns **204** if there is no property with the provided id
6. ✅ Returns **200** with the property

## Exceptions

1. ✅ Returns error **404** if the API does not exist
2. ✅ Returns error **401** if the user is not an owner
3. ✅ Returns error **400** if propertyId is not provided
4. ✅ Returns error **400** if propertyId fields is not an ObjectId
5. ✅ Returns error **500** if get an error when trying to load the property