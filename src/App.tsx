import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import About from './pages/About'
import Industries from './pages/Industries'
import Capabilities from './pages/Capabilities'
import Quality from './pages/Quality'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'
import { ThemeProvider } from './components/ThemeProvider'

const pageTitles: Record<string, string> = {
  '/': 'Kushwaha Group — Screw & Barrel Manufacturers',
  '/products': 'Products — Kushwaha Group',
  '/about': 'About Us — Kushwaha Group',
  '/industries': 'Industries We Serve — Kushwaha Group',
  '/capabilities': 'Manufacturing Capabilities — Kushwaha Group',
  '/quality': 'Quality & Process — Kushwaha Group',
  '/contact': 'Contact Us — Kushwaha Group',
  '/admin': 'Admin — Kushwaha Group',
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = pageTitles[pathname] || 'Kushwaha Group'
  }, [pathname])
  return null
}

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/capabilities" element={<Capabilities />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="kushwaha-theme">
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </ThemeProvider>
  )
}
