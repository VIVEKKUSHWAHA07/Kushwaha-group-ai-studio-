import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, Phone, Moon, Sun } from 'lucide-react'
import { COMPANY } from '../lib/constants'
import QuoteModal from './QuoteModal'
import { useTheme } from './ThemeProvider'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '../lib/utils'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/about', label: 'About' },
  { to: '/industries', label: 'Industries' },
  { to: '/capabilities', label: 'Capabilities' },
  { to: '/quality', label: 'Quality' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b-2 border-primary bg-slate-900 shadow-md transition-colors duration-300">
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-6 px-6">
          
          {/* Brand */}
          <NavLink to="/" className="flex shrink-0 flex-col leading-tight decoration-transparent">
            <span className="font-display text-[22px] font-extrabold tracking-wide text-white">
              {COMPANY.name}
            </span>
            <span className="font-sans text-[10px] tracking-wider text-primary">
              {COMPANY.tagline}
            </span>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => cn(
                  "rounded-md px-3 py-1.5 font-sans text-[13px] font-medium transition-colors duration-200",
                  isActive 
                    ? "text-primary font-semibold bg-primary/10" 
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex shrink-0 items-center gap-4">
            <a 
              href={`tel:${COMPANY.phone}`} 
              className="hidden lg:flex items-center gap-1.5 font-sans text-xs text-slate-300 hover:text-white transition-colors"
            >
              <Phone size={14} />
              {COMPANY.phone}
            </a>
            
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-full p-2 text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button 
              onClick={() => setQuoteOpen(true)}
              className="hidden sm:block rounded-md bg-primary px-5 py-2 font-sans text-[13px] font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/40 active:scale-95"
            >
              Get a Quote
            </button>

            <button 
              className="block md:hidden p-1 text-white" 
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-slate-800 bg-slate-900 md:hidden"
            >
              <div className="flex flex-col gap-1 px-6 py-4">
                {navLinks.map(link => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) => cn(
                      "border-b border-slate-800 py-2.5 font-sans text-[15px] font-medium transition-colors",
                      isActive ? "text-primary font-semibold" : "text-slate-300"
                    )}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                ))}
                <button 
                  className="mt-4 w-full rounded-md bg-primary p-3 font-sans text-[15px] font-semibold text-white shadow-md active:scale-95"
                  onClick={() => { setQuoteOpen(true); setMenuOpen(false) }}
                >
                  Get a Quote
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {quoteOpen && <QuoteModal onClose={() => setQuoteOpen(false)} />}
    </>
  )
}
