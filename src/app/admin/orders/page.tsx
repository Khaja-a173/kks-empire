
'use client'
import { useState } from 'react'
const columns = ['NEW','CONFIRMED','IN_PROGRESS','READY','SERVED','PAID','REJECTED'] as const
type Order = { id:string, tableNumber:number, status: typeof columns[number], eta?:number }
export default function Page(){
  const [orders] = useState<Order[]>([])
  return (
    <div className="p-6 grid grid-cols-7 gap-3">
      {columns.map(col => (
        <div key={col} className="bg-gray-50 rounded-xl p-3 min-h-[60vh]">
          <div className="font-semibold mb-2">{col}</div>
          <div className="grid gap-2">
            {orders.filter(o=>o.status===col).map(o => (
              <div key={o.id} className="rounded-lg border bg-white p-3">
                <div className="text-sm">Table {o.tableNumber}</div>
                <div className="text-xs text-gray-500">Order #{o.id.slice(-6)}</div>
                <div className="mt-2 flex gap-2">
                  <button className="px-2 py-1 text-xs rounded bg-black text-white">Set ETA</button>
                  <button className="px-2 py-1 text-xs rounded border">Print KOT</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
