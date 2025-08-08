
'use client'
import { useEffect, useState } from 'react'
import Pusher from 'pusher-js'

export default function Page({ params }:{ params:{ orderId:string }}){
  const [status,setStatus] = useState('NEW')
  const [eta,setEta] = useState<number|null>(null)
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_PUSHER_KEY || ''
    const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'ap1'
    if(!key) return
    const p = new Pusher(key, { cluster })
    const channel = p.subscribe(`order:${params.orderId}`)
    channel.bind('order.status', (data:{ status:string, etaMinutes?:number }) => { setStatus(data.status); setEta(data.etaMinutes ?? null) })
    return () => { p.unsubscribe(`order:${params.orderId}`) }
  }, [params.orderId])
  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold">Order Status</h2>
      <div className="mt-6 grid gap-2">
        <div>Current: <b>{status}</b></div>
        {eta!=null && <div>ETA: {eta} min</div>}
      </div>
      <ol className="mt-8 grid gap-2">
        {['NEW','CONFIRMED','IN_PROGRESS','READY'].map(s => (
          <li key={s} className={`px-4 py-2 rounded border ${status===s? 'bg-green-100 border-green-300':'bg-white'}`}>{s}</li>
        ))}
      </ol>
    </div>
  )
}
