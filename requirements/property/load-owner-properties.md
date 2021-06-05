# Load Owner Properties

## Success cases

1. ✅ Receives a **GET** request on route **/api/owners/properties?type=&availableTo=&state=&city=&neighborhood=&minimumOfBedrooms=**
2. ✅ Validates if the request was made by an **owner**
3. ✅ Returns **204** if there are no properties
4. ✅ Returns **200** with the list of properties

## Exceptions

1. ✅ Returns error **404** if the API does not exist
2. ✅ Returns error **401** if the user is not an owner
3. ✅ Returns error **500** if get an error when trying to load the list of properties