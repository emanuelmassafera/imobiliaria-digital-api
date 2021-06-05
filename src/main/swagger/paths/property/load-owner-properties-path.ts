export const loadOwnerPropertiesPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Properties'],
    summary: 'Loads the list of properties of the owner',
    description: 'This route can be performed only by owners',
    parameters: [
      {
        in: 'query',
        name: 'type',
        description: 'Type of the property',
        required: false,
        schema: {
          type: 'string'
        }
      },
      {
        in: 'query',
        name: 'availableTo',
        description: 'For rent or for sale',
        required: false,
        schema: {
          type: 'string'
        }
      },
      {
        in: 'query',
        name: 'state',
        description: 'State of the property',
        required: false,
        schema: {
          type: 'string'
        }
      },
      {
        in: 'query',
        name: 'city',
        description: 'City of the property',
        required: false,
        schema: {
          type: 'string'
        }
      },
      {
        in: 'query',
        name: 'neighborhood',
        description: 'Neighborhood of the property',
        required: false,
        schema: {
          type: 'string'
        }
      },
      {
        in: 'query',
        name: 'minimumOfBedrooms',
        description: 'Minimum number of bedrooms',
        required: false,
        schema: {
          type: 'string'
        }
      }
    ],
    responses: {
      200: {
        description: 'Ok',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/properties'
            }
          }
        }
      },
      204: {
        $ref: '#/components/noContent'
      },
      401: {
        $ref: '#/components/unauthorized'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
