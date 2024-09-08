import type { TypedFastifyInstance } from '../app'
import ValidateController from '../controllers/validate.controller'

const routes = async (fastify: TypedFastifyInstance) => {
  fastify.post('/validate', ValidateController.validate)
}

export default routes
