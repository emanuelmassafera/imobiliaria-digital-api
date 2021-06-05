import { apiKeyAuthSchema } from './schemas/'

import {
  badRequest,
  forbidden,
  noContent,
  notFound,
  serverError,
  unauthorized
} from './components/'

export default {
  securitySchemes: {
    apiKeyAuth: apiKeyAuthSchema
  },
  badRequest,
  forbidden,
  noContent,
  notFound,
  unauthorized,
  serverError
}
