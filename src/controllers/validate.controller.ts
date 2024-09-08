import z from 'zod'
import { TypedReply, TypedRequest } from '../app'
import { isGoodCardNumber } from '../helpers'

const ValidateSchema = {
  body: z.object({
    cardNumber: z.string()
  }),
  response: {
    200: {
      valid: z.boolean()
    }
  }
}

type PostValidateType = typeof ValidateSchema

const validate = async (request: TypedRequest<PostValidateType>, reply: TypedReply<PostValidateType>) => {
  const { cardNumber } = request.body
  const sanitizedNumber = cardNumber.replace(/\D/g, '')

  // Visa & Master card len is 16, American Express len is 15
  if (sanitizedNumber.length !== 15 && sanitizedNumber.length !== 16) {
    return reply.code(200).send({ valid: false })
  }
  if (isGoodCardNumber(sanitizedNumber)) {
    return reply.code(200).send({ valid: true })
  }
  reply.code(200).send({ valid: false })
}
const ValidateController = { validate }

export default ValidateController
