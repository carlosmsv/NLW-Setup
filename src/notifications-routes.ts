import WebPush from 'web-push'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

// console.log(WebPush.generateVAPIDKeys())
const publicKey = 'BCu-czWHTheXtYBio1dVwvSm56-JcDX7VtZ_aYHWMsI2qb6Yo44V3wfWfIHcT86JmmIZV3yZpje8nFkkgM5bsSg'
const privateKey = 'U6l2IvYT5XTnhIV_URdcJWrsvbZbvHDEzOkoeB1HdPo'

WebPush.setVapidDetails('http://localhost:3333', publicKey, privateKey)

export async function notificationRoutes(app: FastifyInstance){
  app.get('/push/public_key', () => {
    return {
      publicKey,
    }
  })

  app.post('/push/register', (request, reply) => {
    console.log(request.body)
    //prisma, criar tabela no banco, ex.: UserNotificationSubscriptions e anotar ali para cada usuário, cada subscription

    return reply.status(201).send()
  })

  app.post('/push/send', async (request, reply) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          p256dh: z.string(),
          auth: z.string()
        })
      })
    })

    const { subscription } = sendPushBody.parse(request.body)

    setTimeout(() => {
      WebPush.sendNotification(subscription, 'HELLO DO BACKEND')
    }, 5000)

    return reply.status(201).send()
  })
}
