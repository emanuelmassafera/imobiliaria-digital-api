# Add Property

## Success cases

1. ✅ Receives a **POST** request on route **/api/owners/properties/add**
2. ✅ Validates if the request was made by an **owner**
3. ✅ Validates that **type**, **availableTo**, **price**, **cep**, **state**, **city**, **neighborhood**, **street**, **number**, **description**, **dimensions**, **numberOfBedrooms**, **numberOfBathrooms**, **numberOfParkingSpaces** and **images** have been provided
4. ✅ Validates that the **cep** field is a valid cep
5. ✅ Returns **200** with the added property

## Exceptions

1. ✅ Returns error **404** if the API does not exist
2. ✅ Returns error **401** if the user is not an owner
3. ✅ Returns error **400** if type, availableTo, price, cep, state, city, neighborhood, street, number, description, dimensions, numberOfBedrooms, numberOfBathrooms, numberOfParkingSpaces or images are not provided
4. ✅ Returns error **400** if cep field is an invalid cep
5. ✅ Returns error **500** if get an error when trying to add the property