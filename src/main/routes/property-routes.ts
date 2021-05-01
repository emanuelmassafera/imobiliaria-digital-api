import { adaptRoute } from '@/main/adapters'
import { makeAddPropertyController } from '@/main/factories'
import { ownerAuth } from '@/main/middlewares'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/owners/properties/add', ownerAuth, adaptRoute(makeAddPropertyController()))
}
