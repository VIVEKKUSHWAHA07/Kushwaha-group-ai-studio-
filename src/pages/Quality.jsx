import { motion } from 'motion/react'
import { CheckCircle } from 'lucide-react'

export default function Quality() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="bg-slate-900 py-16 text-center text-white border-b-4 border-primary">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="font-display text-4xl font-extrabold uppercase md:text-5xl">Quality Assurance</h1>
          <p className="mt-4 text-lg text-primary">Zero defects. Maximum performance.</p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <p className="text-xl leading-relaxed text-muted-foreground">
            At Kushwaha Group, quality is not an afterthought; it is built into every stage of our manufacturing process. From raw material selection to final dispatch, strict quality control measures ensure that every component meets international standards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {[
            "Raw Material Inspection (Chemical & Physical)",
            "Dimensional Accuracy Checks at Every Stage",
            "Hardness Testing (Pre and Post Nitriding)",
            "Straightness & Concentricity Verification",
            "Surface Finish & Polishing Inspection",
            "Final Assembly Fitment Testing"
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-4 rounded-xl border border-border bg-background p-6 shadow-sm"
            >
              <CheckCircle className="text-primary shrink-0" size={24} />
              <span className="font-medium text-foreground">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
