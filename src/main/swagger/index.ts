import components from './components'
import paths from './paths'
import schemas from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Imobiliária Digital API',
    description: 'API of the Imobiliária Digital project',
    version: '1.0.0',
    contact: {
      name: 'Emanuel',
      email: 'emanuel301@live.com'
    }
  },
  servers: [{
    url: '/api'
  }],
  tags: [
    {
      name: 'Owners',
      description: 'APIs related to owners'
    },
    {
      name: 'Properties',
      description: 'APIs related to properties'
    }
  ],
  paths,
  schemas,
  components
}
