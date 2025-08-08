
import { prisma } from '@/lib/db'
import { triggerOrder } from '@/lib/ws'
import { smartNotify } from '@/lib/notify'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest, { params }:{ params:{ id:string }}){
  const { status, etaMinutes, notifyTo, reason } = await req.json()
  const order = await prisma.order.update({ where:{ id: params.id }, data:{ status, estimatedWaitMinutes: etaMinutes ?? null } })
  await triggerOrder('order.status', order.id, { status, etaMinutes })

  if (notifyTo && (status === 'CONFIRMED' || status === 'IN_PROGRESS' || status === 'READY')) {
    const msg = status === 'CONFIRMED'
      ? `Your order for Table ${order.tableId} is confirmed. ETA ${etaMinutes || 15} min.`
      : status === 'READY'
      ? `Your order for Table ${order.tableId} is ready.`
      : `Your order for Table ${order.tableId} is in progress.`
    await smartNotify({ to: notifyTo, body: msg, orderId: order.id })
  }
  if (status === 'REJECTED' && notifyTo){
    await smartNotify({ to: notifyTo, body: `Sorry, we couldn’t process your order${reason?`: ${reason}`:''}.`, orderId: order.id })
  }
  return NextResponse.json({ ok:true })
}
