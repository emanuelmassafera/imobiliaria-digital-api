export const addPropertyPath = {
  post: {
    security: [{
      apiKeyAuth: []
    }],
    tags: ['Properties'],
    summary: 'Adds a new property',
    description: 'This route can be performed only by owners',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addPropertyParams'
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
      404: {
        $ref: '#/components/notFound'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
