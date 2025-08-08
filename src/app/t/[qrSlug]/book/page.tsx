
import { prisma } from '@/lib/db'
import { bookingSchema } from '@/lib/validations'
import { setTableSession } from '@/lib/cookies'
import { redirect } from 'next/navigation'

export default async function Page({ params }:{ params:{ qrSlug:string }}){
  const table = await prisma.diningTable.findUnique({ where:{ qrSlug: params.qrSlug } })
  if(!table) return <div className="p-6">Invalid table.</div>

  async function action(formData: FormData){
    'use server'
    const parsed = bookingSchema.safeParse(Object.fromEntries(formData as any))
    if(!parsed.success) throw new Error('Invalid form')
    const { name, phone, partySize, notes } = parsed.data
    await prisma.booking.create({ data:{ tableId: table.id, name, phone, partySize, notes } })
    await prisma.diningTable.update({ where:{ id: table.id }, data:{ isOccupied: true } })
    setTableSession({ tableId: table.id })
    redirect(`/t/${params.qrSlug}/menu?toast=booking`)
  }

  return (
    <form action={action} className="relative min-h-[70vh] grid place-items-center">
      <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
        <source src="/video/steak.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur rounded-2xl p-6 border border-white/10">
        <h2 className="text-white text-2xl font-semibold">Book a Table</h2>
        <div className="grid gap-3 mt-4">
          <input name="name" placeholder="Your name" className="px-3 py-2 rounded bg-black/40 text-white border border-white/20" required />
          <input name="phone" inputMode="tel" placeholder="Phone (+61...)" className="px-3 py-2 rounded bg-black/40 text-white border border-white/20" required />
          <input name="partySize" type="number" min={1} max={20} placeholder="Party size" className="px-3 py-2 rounded bg-black/40 text-white border border-white/20" required />
          <textarea name="notes" placeholder="Notes (optional)" className="px-3 py-2 rounded bg-black/40 text-white border border-white/20" />
          <label className="text-white/80 text-sm"><input type="checkbox" name="consent" value="true" required className="mr-2"/> I agree to be contacted about my booking.</label>
          <button className="mt-2 px-4 py-2 rounded-xl bg-yellow-600 hover:bg-yellow-500 text-black font-medium">Confirm</button>
        </div>
      </div>
    </form>
  )
}
