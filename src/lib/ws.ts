
import Pusher from 'pusher'
export const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID!,
  key: process.env.PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: process.env.PUSHER_CLUSTER!,
  useTLS: true
})
export function channel(orderId:string){ return `order:${orderId}` }
export function triggerOrder(event:string, orderId:string, data:any){
  return pusher.trigger(channel(orderId), event, data)
}
