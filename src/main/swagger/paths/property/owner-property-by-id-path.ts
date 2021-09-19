export const ownerPropertyByIdPath = {
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
  },

  put: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Properties'],
    summary: 'Updates the owner property with the provided id',
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
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/updatePropertyParams'
          }
        }
      }
    },
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
      400: {
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/unauthorized'
      },
      403: {
        $ref: '#/components/forbidden'
      },
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },

  delete: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Properties'],
    summary: 'Removes the owner property with the provided id',
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
