import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { MACHINE_TYPES } from '../lib/constants'
import { motion, AnimatePresence } from 'motion/react'

export default function QuoteModal({ onClose, defaultProduct = '' }) {
  const [formData, setFormData] = useState({
    client_name: '',
    company_name: '',
    email: '',
    phone: '',
    product_interest: defaultProduct,
    machine_type: '',
    quantity: '',
    message: '',
    website: '' // honeypot
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Honeypot check
    if (formData.website) {
      setStatus({ type: 'success', message: 'Thank you! We have received your inquiry.' })
      return
    }

    if (!formData.client_name || !formData.email) {
      setStatus({ type: 'error', message: 'Name and Email are required.' })
      return
    }

    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      const { error } = await supabase
        .from('quote_requests')
        .insert([{
          client_name: formData.client_name,
          company_name: formData.company_name,
          email: formData.email,
          phone: formData.phone,
          product_interest: formData.product_interest,
          machine_type: formData.machine_type,
          quantity: formData.quantity,
          message: formData.message,
        }])
        .select()

      if (error) throw error

      setStatus({ type: 'success', message: 'Thank you! We have received your inquiry and will contact you within 24 hours.' })
      
      // Fire Edge Function in background
      const edgeUrl = import.meta.env.VITE_EDGE_FUNCTION_URL
      if (edgeUrl && edgeUrl !== 'placeholder_for_now') {
        fetch(edgeUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clientName: formData.client_name,
            companyName: formData.company_name,
            email: formData.email,
            phone: formData.phone,
            productInterest: formData.product_interest,
            machineType: formData.machine_type,
            quantity: formData.quantity,
            message: formData.message,
          })
        }).catch(err => console.error('Edge function error:', err))
      }

    } catch (err) {
      console.error(err)
      setStatus({ type: 'error', message: 'Something went wrong. Please try WhatsApp or call us directly.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-background p-8 shadow-2xl border border-border"
          onClick={e => e.stopPropagation()}
        >
          <button 
            className="absolute right-5 top-5 text-muted-foreground hover:text-foreground transition-colors"
            onClick={onClose}
          >
            <X size={24} />
          </button>
          
          <h2 className="mb-6 border-b border-border pb-4 font-display text-3xl font-bold text-foreground">
            Request a Quote
          </h2>
          
          {status.message && (
            <div className={`mb-6 rounded-lg p-4 text-sm font-medium ${status.type === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'}`}>
              {status.message}
            </div>
          )}

          {status.type !== 'success' && (
            <form className="flex flex-col gap-5 font-sans" onSubmit={handleSubmit}>
              {/* Honeypot */}
              <input type="text" name="website" className="hidden" onChange={handleChange} value={formData.website} tabIndex={-1} autoComplete="off" />
              
              <div className="flex flex-col gap-5 sm:flex-row">
                <div className="flex flex-1 flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-muted-foreground">Full Name *</label>
                  <input type="text" name="client_name" required maxLength={100} className="rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" onChange={handleChange} value={formData.client_name} />
                </div>
                <div className="flex flex-1 flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-muted-foreground">Company/Organization</label>
                  <input type="text" name="company_name" maxLength={100} className="rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" onChange={handleChange} value={formData.company_name} />
                </div>
              </div>

              <div className="flex flex-col gap-5 sm:flex-row">
                <div className="flex flex-1 flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-muted-foreground">Email Address *</label>
                  <input type="email" name="email" required className="rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" onChange={handleChange} value={formData.email} />
                </div>
                <div className="flex flex-1 flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-muted-foreground">Phone Number</label>
                  <input type="tel" name="phone" maxLength={15} className="rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" onChange={handleChange} value={formData.phone} />
                </div>
              </div>

              <div className="flex flex-col gap-5 sm:flex-row">
                <div className="flex flex-1 flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-muted-foreground">Product Interest</label>
                  <select name="product_interest" className="rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" onChange={handleChange} value={formData.product_interest}>
                    <option value="">Select a product...</option>
                    <option value="Injection Moulding Screw">Injection Moulding Screw</option>
                    <option value="Injection Moulding Barrel">Injection Moulding Barrel</option>
                    <option value="Extrusion Screw">Extrusion Screw</option>
                    <option value="Extrusion Barrel">Extrusion Barrel</option>
                    <option value="Blow Moulding Screw">Blow Moulding Screw</option>
                    <option value="Blow Moulding Barrel">Blow Moulding Barrel</option>
                    <option value="Custom Order">Custom Order</option>
                  </select>
                </div>
                <div className="flex flex-1 flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-muted-foreground">Machine Type</label>
                  <select name="machine_type" className="rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" onChange={handleChange} value={formData.machine_type}>
                    <option value="">Select a type...</option>
                    {MACHINE_TYPES.map(m => (
                      <option key={m.id} value={m.label}>{m.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-muted-foreground">Quantity Required</label>
                <input type="text" name="quantity" maxLength={50} className="rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" onChange={handleChange} value={formData.quantity} placeholder="e.g. 2 sets" />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[13px] font-semibold text-muted-foreground">Message / Specific Requirements</label>
                <textarea name="message" rows={4} maxLength={1000} className="rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-y" onChange={handleChange} value={formData.message}></textarea>
              </div>

              <button type="submit" disabled={loading} className="mt-2 flex items-center justify-center rounded-md bg-primary px-4 py-3.5 text-base font-semibold text-white shadow-md transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-70">
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Send Quote Request'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
