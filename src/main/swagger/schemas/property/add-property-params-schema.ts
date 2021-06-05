export const addPropertyParamsSchema = {
  type: 'object',
  properties: {
    type: {
      type: 'string'
    },
    availableTo: {
      type: 'string'
    },
    price: {
      type: 'number'
    },
    condominium: {
      type: 'number'
    },
    iptu: {
      type: 'number'
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
    },
    description: {
      type: 'string'
    },
    dimensions: {
      type: 'number'
    },
    numberOfBedrooms: {
      type: 'number'
    },
    numberOfBathrooms: {
      type: 'number'
    },
    numberOfParkingSpaces: {
      type: 'number'
    },
    images: {
      type: 'array',
      items: {
        type: 'string'
      }
    },
    additionalInformation: {
      type: 'string'
    }
  },
  required: [
    'type',
    'availableTo',
    'price',
    'cep',
    'state',
    'city',
    'neighborhood',
    'street',
    'number',
    'description',
    'dimensions',
    'numberOfBedrooms',
    'numberOfBathrooms',
    'numberOfParkingSpaces',
    'images'
  ]
}
