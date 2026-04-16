import { useState } from 'react'
import { MapPin, Phone, Mail, Loader2, MessageCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { COMPANY, MACHINE_TYPES } from '../lib/constants'
import { motion } from 'motion/react'

export default function Contact() {
  const [formData, setFormData] = useState({
    client_name: '',
    company_name: '',
    email: '',
    phone: '',
    product_interest: '',
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
      const { error } = await supabase.from('quote_requests').insert([{
        client_name: formData.client_name,
        company_name: formData.company_name,
        email: formData.email,
        phone: formData.phone,
        product_interest: formData.product_interest,
        machine_type: formData.machine_type,
        quantity: formData.quantity,
        message: formData.message,
      }]).select()

      if (error) throw error

      setStatus({ type: 'success', message: 'Thank you! We have received your inquiry and will contact you within 24 hours.' })
      
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
    <div className="min-h-screen bg-background font-sans">
      <div className="bg-slate-900 py-16 text-center text-white border-b-4 border-primary">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="font-display text-4xl font-extrabold uppercase md:text-5xl">Contact Us</h1>
          <p className="mt-4 text-lg text-primary">Get in touch for requirements.</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col-reverse gap-12 lg:flex-row">
          
          {/* Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-[1.5] rounded-2xl bg-background border border-border p-8 shadow-xl sm:p-10"
          >
            <h2 className="mb-8 font-display text-3xl font-bold uppercase text-foreground">Request a Quote</h2>
            {status.message && (
              <div className={`mb-6 rounded-lg p-4 text-sm font-medium ${status.type === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'}`}>
                {status.message}
              </div>
            )}
            
            {status.type !== 'success' && (
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                <input type="text" name="website" className="hidden" autoComplete="off" tabIndex={-1} onChange={handleChange} value={formData.website} />
                
                <div className="flex flex-col gap-5 sm:flex-row">
                  <div className="flex flex-1 flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-muted-foreground">Full Name *</label>
                    <input type="text" name="client_name" required className="rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" onChange={handleChange} value={formData.client_name} />
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-muted-foreground">Company/Organization</label>
                    <input type="text" name="company_name" className="rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" onChange={handleChange} value={formData.company_name} />
                  </div>
                </div>

                <div className="flex flex-col gap-5 sm:flex-row">
                  <div className="flex flex-1 flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-muted-foreground">Email Address *</label>
                    <input type="email" name="email" required className="rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" onChange={handleChange} value={formData.email} />
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-muted-foreground">Phone Number</label>
                    <input type="tel" name="phone" className="rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" onChange={handleChange} value={formData.phone} />
                  </div>
                </div>

                <div className="flex flex-col gap-5 sm:flex-row">
                  <div className="flex flex-1 flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-muted-foreground">Product Interest</label>
                    <select name="product_interest" className="rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" onChange={handleChange} value={formData.product_interest}>
                      <option value="">Select...</option>
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
                    <select name="machine_type" className="rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" onChange={handleChange} value={formData.machine_type}>
                      <option value="">Select...</option>
                      {MACHINE_TYPES.map(m => (
                        <option key={m.id} value={m.label}>{m.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-muted-foreground">Quantity Required</label>
                  <input type="text" name="quantity" className="rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" onChange={handleChange} value={formData.quantity} placeholder="e.g. 2 sets" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-muted-foreground">Message / Specs</label>
                  <textarea name="message" rows={4} className="rounded-md border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-y" onChange={handleChange} value={formData.message}></textarea>
                </div>

                <button type="submit" disabled={loading} className="mt-4 flex items-center justify-center rounded-md bg-primary px-6 py-4 font-display text-lg font-bold uppercase text-white shadow-md transition-all hover:bg-primary/90 active:scale-95 disabled:opacity-70">
                  {loading ? <Loader2 className="animate-spin" size={24} /> : 'Send Quote Request'}
                </button>
              </form>
            )}
          </motion.div>

          {/* Left Side Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 flex flex-col"
          >
            <h2 className="mb-8 font-display text-3xl font-bold uppercase text-foreground">Connect With Us</h2>
            <div className="mb-10 flex flex-col gap-8">
              <div className="flex items-start gap-5">
                <MapPin size={28} className="text-primary mt-1" />
                <div>
                  <h4 className="mb-1 font-display text-xl uppercase text-foreground">Address</h4>
                  <p className="text-lg text-muted-foreground leading-relaxed">{COMPANY.address}</p>
                </div>
              </div>
              <a href={`tel:${COMPANY.phone}`} className="group flex items-start gap-5 transition-colors">
                <Phone size={28} className="text-primary mt-1" />
                <div>
                  <h4 className="mb-1 font-display text-xl uppercase text-foreground group-hover:text-primary transition-colors">Phone</h4>
                  <p className="text-lg text-muted-foreground">{COMPANY.phone}</p>
                </div>
              </a>
              <a href={`mailto:${COMPANY.email}`} className="group flex items-start gap-5 transition-colors">
                <Mail size={28} className="text-primary mt-1" />
                <div>
                  <h4 className="mb-1 font-display text-xl uppercase text-foreground group-hover:text-primary transition-colors">Email</h4>
                  <p className="text-lg text-muted-foreground">{COMPANY.email}</p>
                </div>
              </a>
            </div>

            <a 
              href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(COMPANY.whatsappMsg)}`} 
              target="_blank" rel="noreferrer"
              className="inline-flex w-fit items-center justify-center gap-3 rounded-md bg-[#25D366] px-8 py-4 font-display text-xl font-bold uppercase text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-105 active:scale-95"
            >
              <MessageCircle size={28} /> Chat on WhatsApp
            </a>
          </motion.div>

        </div>

        <div className="mt-16 overflow-hidden rounded-2xl border border-border shadow-xl">
          <iframe 
            src={COMPANY.googleMapsEmbed}
            width="100%" 
            height="400" 
            className="border-0"
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  )
}
