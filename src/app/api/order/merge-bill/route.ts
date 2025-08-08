
import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest){
  const { groupId } = await req.json()
  const orders = await prisma.order.findMany({ where:{ groupId, status: { in:['READY','SERVED'] as any } }, include:{ items:true } })
  const totalCents = orders.flatMap(o=>o.items).reduce((sum,i)=> sum + (i.priceCentsAtSale * i.qty), 0)
  await prisma.orderGroup.update({ where:{ id: groupId }, data:{ status:'MERGED' }})
  return NextResponse.json({ totalCents, currency:'AUD' })
}
