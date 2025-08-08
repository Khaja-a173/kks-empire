
import twilio from 'twilio'
import { prisma } from './db'
const client = twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!)
export async function smartNotify({ to, body, channel='SMS', orderId }:{ to:string, body:string, channel?:'SMS'|'WHATSAPP', orderId:string }){
  try{
    if(channel === 'WHATSAPP'){
      await client.messages.create({ from: process.env.TWILIO_WHATSAPP_FROM!, to:`whatsapp:${to}`, body })
    } else {
      await client.messages.create({ from: process.env.TWILIO_SMS_FROM!, to, body })
    }
    await prisma.notification.create({ data:{ orderId, channel, status:'SENT', to, body } })
  }catch(e){
    await prisma.notification.create({ data:{ orderId, channel, status:'FAILED', to, body } })
  }
}
