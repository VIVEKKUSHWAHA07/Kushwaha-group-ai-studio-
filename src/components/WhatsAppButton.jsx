import { MessageCircle } from 'lucide-react'
import { COMPANY } from '../lib/constants'
import { motion } from 'motion/react'

export default function WhatsAppButton() {
  const url = `https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(COMPANY.whatsappMsg)}`

  return (
    <motion.a 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40 transition-transform hover:scale-110 active:scale-95"
      title="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </motion.a>
  )
}
