import fastify from 'fastify'

const app = fastify({
  logger: true,
  ignoreTrailingSlash: true,
  trustProxy: true
})

app.post('/validate', async (request, reply) => {
  return 'pong\n'
})

export default app
