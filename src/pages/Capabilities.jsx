import { motion } from 'motion/react'

export default function Capabilities() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="bg-slate-900 py-16 text-center text-white border-b-4 border-primary">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="font-display text-4xl font-extrabold uppercase md:text-5xl">Manufacturing Capabilities</h1>
          <p className="mt-4 text-lg text-primary">State-of-the-art machinery for precision components.</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-20">
        <div className="flex flex-col gap-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border bg-background p-8 shadow-sm"
          >
            <h2 className="mb-4 font-display text-2xl font-bold uppercase text-foreground">CNC Machining</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our facility is equipped with advanced CNC turning and milling centers capable of handling complex geometries and tight tolerances. We can process screws up to 300mm in diameter and 4000mm in length with exceptional accuracy.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-border bg-background p-8 shadow-sm"
          >
            <h2 className="mb-4 font-display text-2xl font-bold uppercase text-foreground">Heat Treatment & Nitriding</h2>
            <p className="text-muted-foreground leading-relaxed">
              To ensure maximum wear resistance, we utilize specialized gas nitriding and bimetallic coating processes. Our EN41B material achieves a surface hardness of 900-1000 HV, significantly extending the lifespan of the components.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl border border-border bg-background p-8 shadow-sm"
          >
            <h2 className="mb-4 font-display text-2xl font-bold uppercase text-foreground">Custom Design & Engineering</h2>
            <p className="text-muted-foreground leading-relaxed">
              We don't just manufacture; we engineer solutions. Our team can design custom screw profiles (barrier, mixing, vented) tailored to your specific polymer and processing requirements to improve melt quality and output.
            </p>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
