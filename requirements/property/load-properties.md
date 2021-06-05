# Load Properties

## Success cases

1. ✅ Receives a **GET** request on route **/api/properties?type=&availableTo=&state=&city=&neighborhood=&minimumOfBedrooms=**
2. ✅ Returns **204** if there are no active properties
3. ✅ Returns **200** with the list of active properties

## Exceptions

1. ✅ Returns error **404** if the API does not exist
2. ✅ Returns error **500** if get an error when trying to load the list of active properties