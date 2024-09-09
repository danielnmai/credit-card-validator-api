import cors from '@fastify/cors'
import Fastify, {
  ContextConfigDefault,
  FastifyReply,
  FastifyRequest,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault
} from 'fastify'
import { RouteGenericInterface } from 'fastify/types/route'
import { FastifySchema } from 'fastify/types/schema'

import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'
import routes from './routes/validate.route'

export type TypedRequest<TSchema extends FastifySchema> = FastifyRequest<
  RouteGenericInterface,
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  TSchema,
  ZodTypeProvider
>

export type TypedReply<TSchema extends FastifySchema> = FastifyReply<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  RouteGenericInterface,
  ContextConfigDefault,
  TSchema,
  ZodTypeProvider
>

export const getApp = () => {
  const app = Fastify({
    logger: true,
    ignoreTrailingSlash: true,
    trustProxy: true
  }).withTypeProvider<ZodTypeProvider>()

  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  app.register(cors, {})
  app.register(routes)

  return app
}

const app = getApp()

export type TypedFastifyInstance = typeof app

export default app
