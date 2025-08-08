
import { prisma } from '@/lib/db'
import { setTableSession } from '@/lib/cookies'
import { Hero } from '@/components/hero'

export default async function Page({ params }:{ params:{ qrSlug:string }}){
  const table = await prisma.diningTable.findUnique({ where:{ qrSlug: params.qrSlug } })
  if(!table) return <div className="p-6">Invalid QR.</div>
  setTableSession({ tableId: table.id })
  return (
    <div>
      <div className="fixed top-4 right-4 z-20"><span className="px-3 py-1 rounded-full bg-white/10 text-white border border-white/20">Table {table.number} {table.isOccupied && <span className="ml-2 text-yellow-400">• Currently dining</span>}</span></div>
      <Hero />
    </div>
  )
}
