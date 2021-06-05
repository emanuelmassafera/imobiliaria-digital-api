export const loadOwnerPropertyByIdPath = {
  get: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Properties'],
    summary: 'Loads the owner property with the provided id',
    description: 'This route can be performed only by owners',
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
