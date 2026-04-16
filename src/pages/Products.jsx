import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import ProductCard from '../components/ProductCard'
import { motion } from 'motion/react'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialFilter = searchParams.get('filter') || 'all'
  
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [machineFilter, setMachineFilter] = useState(initialFilter)
  const [typeFilter, setTypeFilter] = useState('all')

  useEffect(() => {
    fetchProducts()
    if (machineFilter !== initialFilter) {
      setSearchParams({ filter: machineFilter })
    }
  }, [machineFilter, typeFilter])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      let query = supabase.from('products').select('*').order('created_at', { ascending: false })
      
      if (machineFilter !== 'all') {
        query = query.eq('machine_type', machineFilter)
      }
      if (typeFilter !== 'all') {
        query = query.eq('product_type', typeFilter)
      }

      const { data, error } = await query
      if (error) throw error
      setProducts(data || [])
    } catch (err) {
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  const machineTabs = [
    { id: 'all', label: 'All Machines' },
    { id: 'injection', label: 'Injection Moulding' },
    { id: 'extrusion', label: 'Extrusion' },
    { id: 'blow_moulding', label: 'Blow Moulding' },
    { id: 'custom', label: 'Custom' }
  ]

  const typeTabs = [
    { id: 'all', label: 'All Types' },
    { id: 'screw', label: 'Screws Only' },
    { id: 'barrel', label: 'Barrels Only' }
  ]

  return (
    <div className="min-h-screen bg-background font-sans">
      <div className="bg-slate-900 py-16 text-center text-white border-b-4 border-primary">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="font-display text-4xl font-extrabold uppercase md:text-5xl">Our Products</h1>
          <p className="mt-4 text-lg text-primary">Browse our high-performance manufacturing catalogue.</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        
        {/* Filters */}
        <div className="mb-12 flex flex-col items-center gap-6">
          <div className="flex flex-wrap justify-center gap-3">
            {machineTabs.map(tab => (
              <button 
                key={tab.id}
                onClick={() => setMachineFilter(tab.id)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${machineFilter === tab.id ? 'bg-primary text-white shadow-md' : 'bg-background border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {typeTabs.map(tab => (
              <button 
                key={tab.id}
                onClick={() => setTypeFilter(tab.id)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${typeFilter === tab.id ? 'bg-primary text-white shadow-md' : 'bg-background border border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content grid */}
        {loading ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[1,2,3,4,5,6].map(n => (
              <div key={n} className="overflow-hidden rounded-xl bg-background border border-border shadow-sm animate-pulse">
                <div className="h-56 w-full bg-slate-200 dark:bg-slate-800"></div>
                <div className="p-6">
                  <div className="mb-4 h-6 w-3/4 rounded-md bg-slate-200 dark:bg-slate-800"></div>
                  <div className="mb-2 h-4 w-full rounded-md bg-slate-200 dark:bg-slate-800"></div>
                  <div className="h-4 w-full rounded-md bg-slate-200 dark:bg-slate-800"></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-2xl rounded-xl border border-dashed border-border bg-background p-12 text-center shadow-sm">
            <h2 className="mb-4 font-display text-3xl font-bold text-foreground">Catalogue Updating</h2>
            <p className="mb-8 text-muted-foreground leading-relaxed">Our product catalogue is being updated for this category. Contact us for full specifications and availability.</p>
            <Link to="/contact" className="inline-block rounded-md bg-primary px-8 py-4 font-display text-lg font-bold uppercase text-white shadow-md transition-transform hover:scale-105 active:scale-95">Get a Quote</Link>
          </div>
        )}
      </div>
    </div>
  )
}
