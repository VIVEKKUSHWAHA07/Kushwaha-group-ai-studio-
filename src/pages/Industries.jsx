import { INDUSTRIES_SERVED } from '../lib/constants'
import { motion } from 'motion/react'

export default function Industries() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="bg-slate-900 py-16 text-center text-white border-b-4 border-primary">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="font-display text-4xl font-extrabold uppercase md:text-5xl">Industries We Serve</h1>
          <p className="mt-4 text-lg text-primary">Powering diverse plastics manufacturing sectors.</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES_SERVED.map((ind, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-background p-8 shadow-sm transition-all hover:shadow-xl hover:border-primary/50"
            >
              <div className="absolute top-0 left-0 h-1.5 w-full bg-primary transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></div>
              <h3 className="mb-4 font-display text-2xl font-bold uppercase text-foreground">{ind.name}</h3>
              <p className="text-muted-foreground leading-relaxed">{ind.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
