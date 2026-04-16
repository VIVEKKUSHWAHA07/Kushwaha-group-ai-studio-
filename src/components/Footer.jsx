import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import { COMPANY, NAV_LINKS } from '../lib/constants'

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 font-sans border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 mb-10">
          {/* Company Info */}
          <div className="flex flex-col gap-4">
            <Link to="/" className="flex flex-col decoration-transparent">
              <span className="font-display text-2xl font-extrabold tracking-wide text-white">
                {COMPANY.name}
              </span>
              <span className="text-[11px] uppercase tracking-wider text-primary">
                {COMPANY.tagline}
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">{COMPANY.subTagline}</p>
            <div className="flex flex-col gap-3 mt-2">
              <div className="flex items-start gap-2.5 text-sm">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span>{COMPANY.address}</span>
              </div>
              <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-2.5 text-sm hover:text-primary transition-colors">
                <Phone size={18} className="text-primary shrink-0" />
                <span>{COMPANY.phone}</span>
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2.5 text-sm hover:text-primary transition-colors">
                <Mail size={18} className="text-primary shrink-0" />
                <span>{COMPANY.email}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-xl uppercase tracking-wide text-white mb-5">Quick Links</h3>
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map(link => (
                <Link key={link.path} to={link.path} className="text-[15px] hover:text-primary transition-colors w-fit">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-display text-xl uppercase tracking-wide text-white mb-5">Our Products</h3>
            <div className="flex flex-col gap-3">
              <Link to="/products?filter=injection" className="text-[15px] hover:text-primary transition-colors w-fit">Injection Moulding Screws</Link>
              <Link to="/products?filter=extrusion" className="text-[15px] hover:text-primary transition-colors w-fit">Extrusion Barrels</Link>
              <Link to="/products?filter=blow_moulding" className="text-[15px] hover:text-primary transition-colors w-fit">Blow Moulding Assemblies</Link>
              <Link to="/capabilities" className="text-[15px] hover:text-primary transition-colors w-fit">Custom Manufacturing</Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-[13px] text-slate-400">
          <p>&copy; {COMPANY.footerYear} {COMPANY.name}. All Rights Reserved. | {COMPANY.address}</p>
        </div>
      </div>
    </footer>
  )
}
