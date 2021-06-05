export const loadPropertyByIdPath = {
  get: {
    tags: ['Properties'],
    summary: 'Loads the property with the provided id',
    description: 'This route can be performed by any user',
    parameters: [{
      in: 'path',
      name: 'propertyId',
      description: 'Unique identifier of the property',
      required: true,
      schema: {
        type: 'string'
      }
    }],
    responses: {
      200: {
        description: 'Ok',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/property'
            }
          }
        }
      },
      204: {
        $ref: '#/components/noContent'
      },
      400: {
        $ref: '#/components/badRequest'
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
