import {
  accessTokenSchema,
  addPropertyParamsSchema,
  errorSchema,
  loginParamsSchema,
  propertiesSchema,
  propertySchema,
  registerParamsSchema
} from './schemas/'

export default {
  accessToken: accessTokenSchema,
  addPropertyParams: addPropertyParamsSchema,
  error: errorSchema,
  loginParams: loginParamsSchema,
  properties: propertiesSchema,
  property: propertySchema,
  registerParams: registerParamsSchema
}
