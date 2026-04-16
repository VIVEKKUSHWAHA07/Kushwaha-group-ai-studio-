import { Link } from 'react-router-dom'
import { ArrowRight, Settings, CheckCircle, PenTool, LayoutTemplate, Factory, Sliders, Box } from 'lucide-react'
import { CAPABILITY_STATS, INDUSTRIES_SERVED } from '../lib/constants'
import { motion } from 'motion/react'
import { cn } from '../lib/utils'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-slate-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.05) 10px, rgba(255,255,255,0.05) 20px)' }}></div>
        
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565514020179-026b92b84bb6?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent"></div>

        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-6 py-20 md:flex-row relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1"
          >
            <h1 className="mb-6 font-display text-5xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl uppercase tracking-tight drop-shadow-lg">
              Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-300">Screws & Barrels</span><br/> For Plastics Processing
            </h1>
            <p className="mb-10 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">
              Manufacturers of high-performance components engineered for durability and maximum output. We build for Injection, Extrusion, and Blow Moulding machines.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/contact" 
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md bg-primary px-8 py-4 font-display text-lg font-bold uppercase tracking-wide text-white shadow-[0_0_40px_-10px_rgba(224,123,0,0.8)] transition-all hover:scale-105 hover:shadow-[0_0_60px_-15px_rgba(224,123,0,1)]"
              >
                <span className="relative z-10 flex items-center gap-2">Request a Quote <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" /></span>
                <div className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-500 group-hover:translate-x-0"></div>
              </Link>
              <Link 
                to="/products" 
                className="inline-flex items-center rounded-md border-2 border-white/30 bg-white/5 px-8 py-4 font-display text-lg font-bold uppercase tracking-wide text-white backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/60"
              >
                View Products
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative flex flex-1 items-center justify-center hidden md:flex"
          >
            <div className="relative w-full max-w-md aspect-square">
               {/* 3D-like glowing orb effect behind the gear */}
               <div className="absolute inset-0 rounded-full bg-primary/20 blur-[100px]"></div>
               <motion.div
                 animate={{ rotate: 360 }}
                 transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 flex items-center justify-center text-primary opacity-30 drop-shadow-[0_0_30px_rgba(224,123,0,0.5)]"
               >
                 <Settings size={320} strokeWidth={1} />
               </motion.div>
               <motion.div
                 animate={{ rotate: -360 }}
                 transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 flex items-center justify-center text-white opacity-20"
               >
                 <Settings size={180} strokeWidth={1.5} />
               </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-secondary py-12 dark:bg-slate-900/50 border-y border-border">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {CAPABILITY_STATS.map((stat, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="flex flex-col items-center justify-center text-center p-6 rounded-2xl bg-background shadow-sm border border-border/50 hover:shadow-md transition-shadow"
              >
                <div className="font-display text-4xl font-bold text-primary md:text-5xl drop-shadow-sm">{stat.value}</div>
                <div className="mt-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Overview */}
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Decorative background blob */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold uppercase text-foreground md:text-5xl">Precision Engineered Products</h2>
            <div className="mt-4 h-1 w-24 bg-primary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <ProductCard icon={<LayoutTemplate size={48} />} title="Injection Moulding" link="injection" delay={0.1} />
            <ProductCard icon={<Factory size={48} />} title="Extrusion" link="extrusion" delay={0.2} />
            <ProductCard icon={<Box size={48} />} title="Blow Moulding" link="blow_moulding" delay={0.3} />
            <ProductCard icon={<Sliders size={48} />} title="Custom Orders" link="custom" delay={0.4} />
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 relative">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold uppercase text-foreground md:text-5xl">Why Choose Kushwaha Group</h2>
            <div className="mt-4 h-1 w-24 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <FeatureCard 
              icon={<CheckCircle size={40} />} 
              title="Precision Manufacturing" 
              desc="Every component is CNC machined to exact tolerances ensuring zero-defect performance in high-pressure environments."
              delay={0.1}
            />
            <FeatureCard 
              icon={<Settings size={40} />} 
              title="All Machine Types" 
              desc="From 20mm to 300mm, we supply matched geometries for single and twin screw applications across all plastics processes."
              delay={0.2}
            />
            <FeatureCard 
              icon={<PenTool size={40} />} 
              title="Custom Orders" 
              desc="Need a complex mixing section or barrier flight? Send us your drawing and we'll deliver exactly what you specify."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Industries Preview */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <h2 className="font-display text-4xl font-bold uppercase text-foreground md:text-5xl">Industries We Serve</h2>
              <div className="mt-4 h-1 w-24 bg-primary rounded-full"></div>
            </div>
            <Link to="/industries" className="group inline-flex items-center gap-2 font-display text-lg font-bold uppercase text-primary hover:text-primary/80 transition-colors">
              View All Industries <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {INDUSTRIES_SERVED.slice(0, 3).map((ind, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group relative overflow-hidden rounded-2xl bg-background border border-border shadow-sm hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-primary transform origin-bottom scale-y-0 transition-transform duration-300 group-hover:scale-y-100"></div>
                <div className="p-8">
                  <h3 className="mb-4 font-display text-2xl font-bold uppercase text-foreground">{ind.name}</h3>
                  <p className="text-muted-foreground leading-relaxed">{ind.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="relative py-24 overflow-hidden bg-primary">
        {/* 3D-like background elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/20 blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-black/20 blur-3xl"></div>

        <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-10 font-display text-4xl font-extrabold uppercase leading-tight text-white md:text-5xl drop-shadow-md"
          >
            Have a Custom Requirement? <br/> We Build to Your Specifications.
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 rounded-md bg-white px-10 py-5 font-display text-xl font-bold uppercase tracking-wide text-primary shadow-xl transition-all hover:scale-105 hover:bg-slate-50 hover:shadow-2xl active:scale-95"
            >
              Get a Free Quote <ArrowRight size={24} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function ProductCard({ icon, title, link, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
    >
      <Link 
        to={`/products?filter=${link}`} 
        className="group flex h-full flex-col items-center rounded-2xl border border-border bg-background p-10 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-primary/50 relative overflow-hidden"
      >
        {/* Hover Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        
        <div className="mb-6 text-slate-400 transition-colors duration-300 group-hover:text-primary relative z-10">
          {icon}
        </div>
        <h3 className="mb-6 font-display text-xl font-bold uppercase text-foreground relative z-10">{title}</h3>
        <div className="mt-auto flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white relative z-10">
          <ArrowRight size={20} className="transition-transform group-hover:translate-x-0.5" />
        </div>
      </Link>
    </motion.div>
  )
}

function FeatureCard({ icon, title, desc, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="flex flex-col items-center text-center p-8 rounded-2xl bg-background shadow-sm border border-border hover:shadow-lg transition-shadow"
    >
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner">
        {icon}
      </div>
      <h3 className="mb-4 font-display text-2xl font-bold uppercase text-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{desc}</p>
    </motion.div>
  )
}
