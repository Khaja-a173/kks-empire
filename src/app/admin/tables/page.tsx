
'use client'
import { useState } from 'react'
export default function Page(){
  const [selectedGroup,setSelectedGroup] = useState<string|null>(null)
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Tables</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-4">
        {Array.from({length:20}).map((_,i)=> (
          <div key={i} className="rounded-xl border p-4">
            <div className="font-medium">Table {i+1}</div>
            <div className="text-sm text-gray-500">Occupied</div>
            <button onClick={()=>setSelectedGroup('demo')} className="mt-2 px-3 py-1 rounded bg-black text-white text-sm">Merge Bill</button>
          </div>
        ))}
      </div>
      {selectedGroup && (
        <div className="fixed inset-0 bg-black/40 grid place-items-center">
          <div className="bg-white rounded-xl p-4 w-full max-w-md">
            <h3 className="font-semibold">Merge Bill</h3>
            <div className="text-sm text-gray-600 mt-1">Combine multiple orders in the dining session.</div>
            <button className="mt-3 px-4 py-2 rounded bg-black text-white">Confirm Merge</button>
          </div>
        </div>
      )}
    </div>
  )
}
