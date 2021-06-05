import {
  addPropertyPath,
  loadOwnerPropertiesPath,
  loadOwnerPropertyByIdPath,
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
  '/owners/properties/{propertyId}': loadOwnerPropertyByIdPath,
  '/properties': loadPropertiesPath,
  '/properties/{propertyId}': loadPropertyByIdPath
}
