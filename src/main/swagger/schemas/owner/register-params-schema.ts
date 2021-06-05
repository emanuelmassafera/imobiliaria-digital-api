export const registerParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    emailConfirmation: {
      type: 'string'
    },
    cpf: {
      type: 'string'
    },
    phoneNumber: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    passwordConfirmation: {
      type: 'string'
    },
    cep: {
      type: 'string'
    },
    state: {
      type: 'string'
    },
    city: {
      type: 'string'
    },
    neighborhood: {
      type: 'string'
    },
    street: {
      type: 'string'
    },
    number: {
      type: 'string'
    },
    complement: {
      type: 'string'
    }
  },
  required: [
    'name',
    'email',
    'emailConfirmation',
    'cpf',
    'phoneNumber',
    'password',
    'passwordConfirmation',
    'cep',
    'state',
    'city',
    'neighborhood',
    'street',
    'number'
  ]
}
