
import { prisma } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest){
  const form = await req.formData()
  const menuItemId = String(form.get('menuItemId'))
  const qrSlug = String(form.get('qrSlug'))
  const table = await prisma.diningTable.findUnique({ where:{ qrSlug } })
  if(!table) return NextResponse.json({ error:'invalid' },{ status:400 })
  // TODO: persist to session cart; simplified redirect to checkout
  return NextResponse.redirect(`/t/${qrSlug}/checkout`)
}
