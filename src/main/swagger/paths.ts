import {
  addPropertyPath,
  loadOwnerPropertiesPath,
  ownerPropertyByIdPath,
  loadPropertiesPath,
  loadPropertyByIdPath,
  ownerLoginPath,
  registerOwnerPath
} from './paths/'

export default {
  '/owners/register': registerOwnerPath,
  '/owners/login': ownerLoginPath,

  '/owners/properties/add': addPropertyPath,
  '/owners/properties': loadOwnerPropertiesPath,
  '/owners/properties/{propertyId}': ownerPropertyByIdPath,
  '/properties': loadPropertiesPath,
  '/properties/{propertyId}': loadPropertyByIdPath
}
