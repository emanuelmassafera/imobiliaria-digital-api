import {
  accessTokenSchema,
  addPropertyParamsSchema,
  updatePropertyParamsSchema,
  errorSchema,
  loginParamsSchema,
  propertiesSchema,
  propertySchema,
  registerParamsSchema
} from './schemas/'

export default {
  accessToken: accessTokenSchema,
  addPropertyParams: addPropertyParamsSchema,
  updatePropertyParams: updatePropertyParamsSchema,
  error: errorSchema,
  loginParams: loginParamsSchema,
  properties: propertiesSchema,
  property: propertySchema,
  registerParams: registerParamsSchema
}
