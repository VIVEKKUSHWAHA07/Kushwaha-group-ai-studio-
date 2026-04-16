import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-background px-6 text-center font-sans">
      <h1 className="mb-4 font-display text-7xl font-extrabold text-primary md:text-9xl">404</h1>
      <h2 className="mb-6 font-display text-2xl font-bold uppercase text-foreground md:text-3xl">Page Not Found</h2>
      <p className="mb-8 max-w-md text-lg text-muted-foreground">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 rounded-md bg-primary px-8 py-4 font-display text-lg font-bold uppercase text-white shadow-md transition-transform hover:scale-105 active:scale-95"
      >
        <ArrowLeft size={20} /> Back to Home
      </Link>
    </div>
  )
}
