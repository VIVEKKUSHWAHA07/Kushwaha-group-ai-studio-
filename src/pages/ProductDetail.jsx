import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Settings, Info, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import QuoteModal from '../components/QuoteModal'
import { motion } from 'motion/react'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single()
        
        if (error || !data) throw error
        setProduct(data)
      } catch (err) {
        console.error(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-background"><Loader2 className="animate-spin text-primary" size={40} /></div>
  if (error || !product) return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
      <h2 className="font-display text-2xl font-bold uppercase text-foreground">Product not found</h2>
      <Link to="/products" className="flex items-center gap-2 font-semibold text-primary hover:underline"><ArrowLeft size={16}/> Back to Products</Link>
    </div>
  )

  const hasImage = Boolean(product.image_url)
  const specs = typeof product.specifications === 'string' 
    ? JSON.parse(product.specifications || '{}') 
    : (product.specifications || {})

  return (
    <div className="min-h-screen bg-background font-sans">
      
      {/* Breadcrumb & Top Bar */}
      <div className="border-b border-border bg-background py-4">
        <div className="mx-auto max-w-7xl px-6">
          <Link to="/products" className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors">
            <ArrowLeft size={18} /> Back to Products
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start">
          
          {/* Main Visual */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-[1.2] rounded-2xl border border-border bg-background p-6 shadow-sm lg:sticky lg:top-24"
          >
            {hasImage ? (
              <img src={product.image_url} alt={product.name} loading="lazy" className="w-full rounded-xl object-cover shadow-inner" />
            ) : (
              <div className="flex h-[400px] w-full flex-col items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                <Settings size={120} className="text-slate-300 dark:text-slate-600" />
                <p className="mt-4 text-slate-400 dark:text-slate-500">No image available</p>
              </div>
            )}
          </motion.div>

          {/* Details & Specs */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 flex flex-col"
          >
            <div className="mb-4 flex gap-3">
              <span className="rounded-md bg-secondary px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {product.machine_type.replace('_', ' ')}
              </span>
              <span className="rounded-md border border-border px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {product.product_type}
              </span>
            </div>
            
            <h1 className="mb-6 font-display text-4xl font-bold uppercase leading-tight text-foreground md:text-5xl">{product.name}</h1>
            
            <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
              {product.description || "High-performance components engineered for precise tolerances and extended wear life."}
            </p>

            <div className="mb-10 overflow-hidden rounded-xl border border-border bg-background shadow-sm">
              <div className="flex items-center gap-3 border-b border-border bg-secondary p-5">
                <Info size={20} className="text-primary" />
                <h3 className="font-display text-xl font-bold uppercase text-foreground">Key Specifications</h3>
              </div>
              <table className="w-full text-left text-sm">
                <tbody className="divide-y divide-border">
                  {product.material && <tr><td className="w-2/5 bg-slate-50 p-4 font-semibold text-muted-foreground dark:bg-slate-900/50">Material</td><td className="p-4 font-medium text-foreground">{product.material}</td></tr>}
                  {product.diameter_range && <tr><td className="w-2/5 bg-slate-50 p-4 font-semibold text-muted-foreground dark:bg-slate-900/50">Diameter Range</td><td className="p-4 font-medium text-foreground">{product.diameter_range}</td></tr>}
                  {product.ld_ratio && <tr><td className="w-2/5 bg-slate-50 p-4 font-semibold text-muted-foreground dark:bg-slate-900/50">L/D Ratio</td><td className="p-4 font-medium text-foreground">{product.ld_ratio}</td></tr>}
                  {Object.entries(specs).map(([k, v]) => (
                    <tr key={k}><td className="w-2/5 bg-slate-50 p-4 font-semibold text-muted-foreground dark:bg-slate-900/50">{k}</td><td className="p-4 font-medium text-foreground">{v}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-xl bg-slate-900 p-8 text-white shadow-xl relative overflow-hidden">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/20 blur-3xl"></div>
              <h3 className="mb-3 font-display text-2xl font-bold uppercase text-primary relative z-10">Request Quote for This Product</h3>
              <p className="mb-8 text-slate-300 relative z-10">
                Need pricing or custom modifications for {product.name}? Submit a request directly.
              </p>
              <button 
                onClick={() => setQuoteOpen(true)}
                className="w-full rounded-md bg-primary px-6 py-4 font-display text-lg font-bold uppercase text-white shadow-md transition-transform hover:scale-105 active:scale-95 relative z-10"
              >
                Get a Quote
              </button>
            </div>
          </motion.div>

        </div>
      </div>

      {quoteOpen && (
        <QuoteModal 
          onClose={() => setQuoteOpen(false)} 
          defaultProduct={product.name} 
        />
      )}
    </div>
  )
}
