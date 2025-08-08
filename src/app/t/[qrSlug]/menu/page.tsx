
import { prisma } from '@/lib/db'
import Image from 'next/image'
import Link from 'next/link'

export default async function Page({ params, searchParams }:{ params:{ qrSlug:string }, searchParams:{ toast?:string } }){
  const cats = await prisma.menuCategory.findMany({ include:{ items:{ where:{ isAvailable:true } } }, orderBy:{ sortOrder:'asc' } })
  const showToast = searchParams.toast === 'booking'
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {showToast && <div className="mb-4 rounded-xl bg-green-600 text-white px-4 py-3">Booking received — welcome!</div>}
      <div className="flex gap-6">
        <aside className="hidden md:block w-56 sticky top-6 self-start">
          <nav className="grid gap-2">
            {cats.map(c=> <a key={c.id} href={`#c-${c.id}`} className="px-3 py-2 rounded hover:bg-black/5">{c.name}</a>)}
          </nav>
        </aside>
        <main className="flex-1">
          {cats.map(c => (
            <section id={`c-${c.id}`} key={c.id} className="mb-10">
              <h2 className="text-2xl font-serif mb-4">{c.name}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {c.items.map(item => (
                  <div key={item.id} className="rounded-xl overflow-hidden border">
                    <div className="relative h-40">
                      <Image src={item.imageUrl || '/images/placeholder.jpg'} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{item.name}</div>
                          {item.description && <div className="text-sm text-black/60">{item.description}</div>}
                        </div>
                        <div className="font-semibold">${(item.priceCents/100).toFixed(2)}</div>
                      </div>
                      <form action={`/api/order/add-items`} method="post" className="mt-3 flex items-center gap-2">
                        <input type="hidden" name="menuItemId" value={item.id} />
                        <input type="hidden" name="qrSlug" value={params.qrSlug} />
                        <button className="px-3 py-1 rounded bg-black text-white text-sm">+</button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>
      </div>
      <Link href={`/t/${params.qrSlug}/checkout`} className="fixed bottom-4 right-4 px-5 py-3 rounded-2xl bg-black text-white shadow-2xl">View Cart / Checkout</Link>
    </div>
  )
}
