export const propertySchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    },
    ownerId: {
      type: 'string'
    },
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
    address: {
      type: 'object',
      properties: {
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
        'cep',
        'state',
        'city',
        'neighborhood',
        'street',
        'number'
      ]
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
    },
    createdAt: {
      type: 'string'
    }
  },
  required: [
    'id',
    'ownerId',
    'type',
    'availableTo',
    'price',
    'address',
    'description',
    'dimensions',
    'numberOfBedrooms',
    'numberOfBathrooms',
    'numberOfParkingSpaces',
    'images',
    'status',
    'createdAt'
  ]
}

export const propertiesSchema = {
  type: 'array',
  items: {
    $ref: '#/schemas/property'
  }
}
