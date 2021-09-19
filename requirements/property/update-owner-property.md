# Update Owner Property

## Success cases

1. ✅ Receives a **PUT** request on route **/api/owners/properties/{propertyId}**
2. ✅ Validates if the request was made by an **owner**
3. ✅ Validates that **propertyId** has been provided
4. ✅ Validates that the **propertyId** field is an ObjectId
5. ✅ Returns **200** with the updated property

## Exceptions

1. ✅ Returns error **404** if the API does not exist
2. ✅ Returns error **401** if the user is not an owner
3. ✅ Returns error **400** if propertyId is not provided
4. ✅ Returns error **400** if propertyId field is not an ObjectId
5. ✅ Returns error **403** if the owner cannot update the property
6. ✅ Returns error **500** if get an error when trying to update the property