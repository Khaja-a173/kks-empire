
'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export function Hero(){
  return (
    <div className="relative min-h-[90vh] bg-black text-white">
      <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
        <source src="/video/steak.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-10 items-center">
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}}>
          <h1 className="text-4xl md:text-6xl font-serif">A Premium and Authentic Steakhouse</h1>
          <p className="mt-4 text-lg text-white/80 max-w-prose">Refined dining, fire‑kissed flavors, and indulgent pairings.</p>
          <div className="mt-8 flex gap-4">
            <Link href="/t/t01/book" className="px-6 py-3 rounded-2xl bg-yellow-600 hover:bg-yellow-500 transition shadow">Book a Table</Link>
            <Link href="/t/t01/menu" className="px-6 py-3 rounded-2xl border border-white/30 hover:bg-white/10">View Menu</Link>
          </div>
        </motion.div>
        <motion.div initial={{opacity:0,scale:0.98}} animate={{opacity:1,scale:1}} transition={{duration:0.6}} className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
          <Image src="/images/hero-dish.jpg" alt="Steak" fill className="object-cover"/>
        </motion.div>
      </div>
    </div>
  )
}
