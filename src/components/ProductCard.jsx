import { Link } from 'react-router-dom'
import { ArrowRight, Image as ImageIcon } from 'lucide-react'

export default function ProductCard({ product }) {
  const isFeatured = product.is_featured

  return (
    <Link 
      to={`/products/${product.id}`} 
      className="group flex h-full flex-col overflow-hidden rounded-xl bg-background border border-border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/50 relative"
    >
      {isFeatured && (
        <div className="absolute right-0 top-0 z-10 rounded-bl-xl bg-primary px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-wider text-white shadow-md">
          Featured
        </div>
      )}
      
      <div className="relative h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        {product.image_url ? (
          <img 
            src={product.image_url} 
            alt={product.name} 
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-slate-300 dark:text-slate-600">
            <ImageIcon size={48} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </div>
      
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="rounded-md bg-secondary px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
            {product.machine_type.replace('_', ' ')}
          </span>
          <span className="rounded-md bg-primary/10 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
            {product.product_type}
          </span>
        </div>
        
        <h3 className="mb-3 font-display text-2xl font-bold uppercase text-foreground leading-tight group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        
        <p className="mb-6 line-clamp-2 text-sm text-muted-foreground">
          {product.description || 'High performance precision engineered component for plastics processing.'}
        </p>
        
        <div className="mt-auto flex items-center font-sans text-sm font-semibold text-primary">
          View Specifications <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  )
}
