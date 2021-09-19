export const updatePropertyParamsSchema = {
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
    },
    status: {
      type: 'string'
    }
  }
}
