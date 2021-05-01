import { adaptRoute } from '@/main/adapters'
import { makeOwnerLoginController, makeRegisterOwnerController } from '@/main/factories'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/owners/register', adaptRoute(makeRegisterOwnerController()))
  router.post('/owners/login', adaptRoute(makeOwnerLoginController()))
}
