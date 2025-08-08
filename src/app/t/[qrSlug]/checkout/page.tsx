
import { prisma } from '@/lib/db'
import { createOrderSchema } from '@/lib/validations'
import { redirect } from 'next/navigation'

export default async function Page({ params }:{ params:{ qrSlug:string }}){
  const table = await prisma.diningTable.findUnique({ where:{ qrSlug: params.qrSlug } })
  if(!table) return <div className="p-6">Invalid table.</div>

  async function action(formData: FormData){
    'use server'
    const firstItem = await prisma.menuItem.findFirst()
    if(!firstItem) throw new Error('No menu items')
    const parsed = createOrderSchema.safeParse({ items:[{ menuItemId: firstItem.id, qty:1 }], phone: formData.get('phone') as string })
    if(!parsed.success) throw new Error('Invalid order')
    const group = await prisma.orderGroup.create({ data:{ tableId: table.id, guestPhone: parsed.data.phone ?? null } })
    const order = await prisma.order.create({ data:{ groupId: group.id, tableId: table.id } })
    await prisma.orderItem.create({ data:{ orderId: order.id, menuItemId: firstItem.id, qty: 1, priceCentsAtSale: firstItem.priceCents } })
    await prisma.diningTable.update({ where:{ id: table.id }, data:{ isOccupied:true } })
    redirect(`/t/${params.qrSlug}/order/${order.id}`)
  }

  return (
    <form action={action} className="max-w-lg mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold">Checkout</h2>
      <label className="block mt-4 text-sm">Phone for updates</label>
      <input name="phone" required placeholder="+61..." className="mt-1 px-3 py-2 rounded border w-full" />
      <button className="mt-6 px-5 py-2 rounded bg-black text-white">Place Order</button>
    </form>
  )
}
