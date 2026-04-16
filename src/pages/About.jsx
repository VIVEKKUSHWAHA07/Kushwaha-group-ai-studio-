import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'

export default function About() {
  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Hero Section */}
      <section className="bg-slate-900 py-20 text-center text-white border-b-4 border-primary">
        <div className="mx-auto max-w-7xl px-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 font-display text-4xl font-extrabold uppercase md:text-5xl"
          >
            About Kushwaha Group
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl font-medium text-primary"
          >
            Precision Engineering. Proven Performance.
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 bg-background">
        <div className="mx-auto flex max-w-3xl flex-col gap-16 px-6">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="border-l-4 border-primary pl-6"
          >
            <h2 className="mb-4 font-display text-3xl font-bold uppercase text-foreground">Our Story</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Kushwaha Group was founded with a singular mission — to deliver precision-engineered screw and barrel solutions to India's plastics processing industry. Based in Ahmedabad, Gujarat, we combine traditional metallurgical expertise with modern manufacturing to produce components that outlast and outperform.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="border-l-4 border-primary pl-6"
          >
            <h2 className="mb-4 font-display text-3xl font-bold uppercase text-foreground">Our Vision</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              To become India's most trusted manufacturer of screw and barrel assemblies, serving both domestic and international plastics processors with unmatched quality and reliability.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="border-l-4 border-primary pl-6"
          >
            <h2 className="mb-4 font-display text-3xl font-bold uppercase text-foreground">Why Ahmedabad?</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Located in the heart of Gujarat's booming plastics manufacturing cluster, we are strategically positioned to access top-tier raw materials, world-class heat treatment facilities, and seamless logistics channels to deliver our products pan-India.
            </p>
          </motion.div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-secondary py-24 text-center dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-8 font-display text-4xl font-bold uppercase text-foreground">Let's Build Together</h2>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 rounded-md bg-primary px-10 py-4 font-display text-xl font-bold uppercase text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            Request a Quote <ArrowRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  )
}
