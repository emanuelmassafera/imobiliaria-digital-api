import { adaptRoute } from '@/main/adapters'
import { makeRegisterOwnerController } from '@/main/factories'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/owners/register', adaptRoute(makeRegisterOwnerController()))
}
