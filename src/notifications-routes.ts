import WebPush from 'web-push'
import { FastifyInstance } from 'fastify'

console.log(WebPush.generateVAPIDKeys())

export async function notificationRoutes(app: FastifyInstance){
  
}
