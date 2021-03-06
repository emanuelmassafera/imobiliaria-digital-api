import { adaptRoute } from '@/main/adapters'
import { makeAddPropertyController, makeLoadOwnerPropertiesController, makeLoadOwnerPropertyByIdController, makeLoadPropertiesController, makeLoadPropertyByIdController, makeRemoveOwnerPropertyController, makeUpdateOwnerPropertyController } from '@/main/factories'
import { ownerAuth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/owners/properties/add', ownerAuth, adaptRoute(makeAddPropertyController()))
  router.get('/owners/properties', ownerAuth, adaptRoute(makeLoadOwnerPropertiesController()))
  router.get('/owners/properties/:propertyId', ownerAuth, adaptRoute(makeLoadOwnerPropertyByIdController()))
  router.put('/owners/properties/:propertyId', ownerAuth, adaptRoute(makeUpdateOwnerPropertyController()))
  router.delete('/owners/properties/:propertyId', ownerAuth, adaptRoute(makeRemoveOwnerPropertyController()))

  router.get('/properties', adaptRoute(makeLoadPropertiesController()))
  router.get('/properties/:propertyId', adaptRoute(makeLoadPropertyByIdController()))
}
