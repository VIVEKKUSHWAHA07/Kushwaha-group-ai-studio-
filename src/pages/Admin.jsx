import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { LogOut, Plus, Trash2, Edit2, Image as ImageIcon, Loader2, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Admin() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-background"><Loader2 className="animate-spin text-primary" size={40} /></div>

  if (!session) {
    return <Login />
  }

  return <Dashboard session={session} />
}

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError('Invalid credentials. Please try again.')
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4">
      <form onSubmit={handleLogin} className="flex w-full max-w-md flex-col gap-5 rounded-xl bg-white p-8 shadow-2xl dark:bg-slate-800">
        <h1 className="mb-2 text-center font-display text-3xl font-bold uppercase text-slate-900 dark:text-white">Admin Login</h1>
        {error && <div className="rounded-md bg-red-100 p-3 text-center text-sm text-red-800 dark:bg-red-900/30 dark:text-red-400">{error}</div>}
        <input 
          type="email" placeholder="Email" required className="rounded-md border border-slate-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-slate-600 dark:text-white"
          value={email} onChange={e => setEmail(e.target.value)}
        />
        <input 
          type="password" placeholder="Password" required className="rounded-md border border-slate-300 bg-transparent px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary dark:border-slate-600 dark:text-white"
          value={password} onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading} className="flex items-center justify-center rounded-md bg-primary px-4 py-3 font-bold uppercase text-white transition-colors hover:bg-primary/90 disabled:opacity-70">
          {loading ? <Loader2 className="animate-spin" size={20} /> : 'Login as Admin'}
        </button>
      </form>
    </div>
  )
}

function Dashboard() {
  const [activeTab, setActiveTab] = useState('products')

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="bg-slate-900 p-5 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="font-display text-2xl font-bold uppercase tracking-wide">Kushwaha Group — Admin</h1>
          <button onClick={handleLogout} className="flex items-center gap-2 rounded-md border border-white/20 px-4 py-2 text-sm transition-colors hover:bg-white/10">
            <LogOut size={16}/> Logout
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl border-b border-border pt-6 px-6">
        <div className="flex gap-2">
          <button 
            className={`border-b-2 px-6 py-3 text-sm font-semibold transition-colors ${activeTab === 'products' ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`} 
            onClick={() => setActiveTab('products')}
          >
            Products
          </button>
          <button 
            className={`border-b-2 px-6 py-3 text-sm font-semibold transition-colors ${activeTab === 'quotes' ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`} 
            onClick={() => setActiveTab('quotes')}
          >
            Quote Requests
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl p-6">
        {activeTab === 'products' ? <ProductsManager /> : <QuoteRequestsManager />}
      </div>
    </div>
  )
}

// --- PRODUCTS MANAGER ---
function ProductsManager() {
  const [products, setProducts] = useState([])
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  
  // Form state
  const [formData, setFormData] = useState({
    name: '', product_type: 'screw', machine_type: 'injection',
    material: '', diameter_range: '', ld_ratio: '', description: '', is_featured: false
  })
  const [specKeys, setSpecKeys] = useState('')
  const [specVals, setSpecVals] = useState('')
  const [file, setFile] = useState(null)
  const [existingImage, setExistingImage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => { fetchProducts() }, [])

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    if (data) setProducts(data)
  }

  const handleEdit = (p) => {
    setEditingId(p.id)
    setFormData({
      name: p.name, product_type: p.product_type, machine_type: p.machine_type,
      material: p.material || '', diameter_range: p.diameter_range || '', 
      ld_ratio: p.ld_ratio || '', description: p.description || '', is_featured: p.is_featured
    })
    setExistingImage(p.image_url || '')
    setFile(null)
    
    if (p.specifications) {
      const parsed = typeof p.specifications === 'string' ? JSON.parse(p.specifications) : p.specifications
      setSpecKeys(Object.keys(parsed).join(','))
      setSpecVals(Object.values(parsed).join(','))
    } else {
      setSpecKeys('')
      setSpecVals('')
    }
    setFormOpen(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure? This cannot be undone.')) return
    await supabase.from('products').delete().eq('id', id)
    fetchProducts()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      let finalImageUrl = existingImage

      if (file) {
        if (file.size > 2 * 1024 * 1024) throw new Error('Image must be under 2MB.')
        if (!['image/jpeg','image/png','image/webp'].includes(file.type)) throw new Error('Only JPG, PNG or WEBP allowed.')

        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const { error: uploadError } = await supabase.storage.from('product-images').upload(fileName, file)
        if (uploadError) throw uploadError
        
        const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(fileName)
        finalImageUrl = publicUrl
      }

      // Parse specs
      let specs = {}
      const keys = specKeys.split(',').map(k => k.trim()).filter(Boolean)
      const vals = specVals.split(',').map(v => v.trim())
      keys.forEach((k, i) => { if (vals[i]) specs[k] = vals[i] })

      const payload = {
        ...formData,
        specifications: specs,
        image_url: finalImageUrl
      }

      if (editingId) {
        const { error: updateError } = await supabase.from('products').update(payload).eq('id', editingId)
        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase.from('products').insert([payload])
        if (insertError) throw insertError
      }

      setFormOpen(false)
      fetchProducts()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {!formOpen && (
        <div className="mb-6">
          <button className="flex items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-bold uppercase text-white shadow-sm hover:bg-primary/90" onClick={() => {
            setEditingId(null); setFile(null); setExistingImage(''); setSpecKeys(''); setSpecVals('');
            setFormData({ name: '', product_type: 'screw', machine_type: 'injection', material: '', diameter_range: '', ld_ratio: '', description: '', is_featured: false })
            setFormOpen(true)
          }}>
            <Plus size={16}/> Add New Product
          </button>
        </div>
      )}

      {formOpen && (
        <div className="mb-8 rounded-xl border border-border bg-background p-6 shadow-md">
          <h2 className="mb-6 font-display text-2xl font-bold uppercase text-foreground">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
          {error && <div className="mb-6 rounded-md bg-red-100 p-3 text-sm text-red-800 dark:bg-red-900/30 dark:text-red-400">{error}</div>}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            <input placeholder="Product Name *" required className="rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus:border-primary" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <select className="rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus:border-primary" value={formData.product_type} onChange={e => setFormData({...formData, product_type: e.target.value})}>
              <option value="screw">Screw</option><option value="barrel">Barrel</option>
            </select>
            <select className="rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus:border-primary" value={formData.machine_type} onChange={e => setFormData({...formData, machine_type: e.target.value})}>
              <option value="injection">Injection</option><option value="extrusion">Extrusion</option>
              <option value="blow_moulding">Blow Moulding</option><option value="custom">Custom</option>
            </select>
            <input placeholder="Material (e.g. EN41B)" className="rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus:border-primary" value={formData.material} onChange={e => setFormData({...formData, material: e.target.value})} />
            <input placeholder="Diameter Range (e.g. 20-300mm)" className="rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus:border-primary" value={formData.diameter_range} onChange={e => setFormData({...formData, diameter_range: e.target.value})} />
            <input placeholder="L/D Ratio (e.g. Up to 36:1)" className="rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus:border-primary" value={formData.ld_ratio} onChange={e => setFormData({...formData, ld_ratio: e.target.value})} />
            <textarea placeholder="Description" className="col-span-full rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus:border-primary" rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            
            <div className="col-span-full">
              <label className="mb-2 block text-xs font-semibold text-muted-foreground">Specifications (Comma separated keys and values mapping)</label>
              <div className="flex gap-3">
                <input placeholder="Keys: Flight Depth, Root Dia, RPM" className="flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus:border-primary" value={specKeys} onChange={e => setSpecKeys(e.target.value)} />
                <input placeholder="Values: 4mm, 50mm, 300" className="flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus:border-primary" value={specVals} onChange={e => setSpecVals(e.target.value)} />
              </div>
            </div>

            <div className="col-span-full">
              <label className="mb-2 block text-xs font-semibold text-muted-foreground">Image Upload (Max 2MB, JPG/PNG/WEBP)</label>
              {existingImage && <div className="mb-3"><img src={existingImage} className="h-16 rounded-md object-cover" alt="Current"/></div>}
              <input type="file" accept="image/jpeg, image/png, image/webp" onChange={e => setFile(e.target.files[0])} className="w-full text-sm"/>
            </div>

            <label className="col-span-full flex items-center gap-2 text-sm font-medium">
              <input type="checkbox" checked={formData.is_featured} onChange={e => setFormData({...formData, is_featured: e.target.checked})} className="rounded border-input text-primary focus:ring-primary" />
              Is Featured Product
            </label>

            <div className="col-span-full flex gap-3 mt-4">
              <button type="submit" disabled={loading} className="rounded-md bg-primary px-5 py-2 text-sm font-bold uppercase text-white hover:bg-primary/90 disabled:opacity-70">{loading ? 'Saving...' : 'Save Product'}</button>
              <button type="button" onClick={() => setFormOpen(false)} className="rounded-md border border-border px-5 py-2 text-sm font-bold uppercase text-foreground hover:bg-muted">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-border bg-background shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="p-4 font-semibold">Image</th>
              <th className="p-4 font-semibold">Name</th>
              <th className="p-4 font-semibold">Machine / Type</th>
              <th className="p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-muted/50 transition-colors">
                <td className="p-4">
                  {p.image_url ? <img src={p.image_url} className="h-10 w-10 rounded-md object-cover" /> : <ImageIcon className="text-muted-foreground"/>}
                </td>
                <td className="p-4 font-medium text-foreground">{p.name}</td>
                <td className="p-4 text-muted-foreground capitalize">{p.machine_type.replace('_', ' ')} {p.product_type}</td>
                <td className="p-4">
                  <button onClick={() => handleEdit(p)} className="mr-3 text-slate-500 hover:text-primary"><Edit2 size={18}/></button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
            {products.length === 0 && <tr><td colSpan="4" className="p-8 text-center text-muted-foreground">No products found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// --- QUOTE REQUESTS MANAGER ---
function QuoteRequestsManager() {
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Pagination & Search
  const [page, setPage] = useState(0)
  const LIMIT = 20
  const [search, setSearch] = useState('')
  const [expandedRow, setExpandedRow] = useState(null)

  useEffect(() => {
    fetchQuotes()
  }, [page, search])

  const fetchQuotes = async () => {
    setLoading(true)
    let query = supabase
      .from('quote_requests')
      .select('*')
      .order('created_at', { ascending: false })
      .range(page * LIMIT, (page + 1) * LIMIT - 1)

    if (search) {
      query = query.or(`client_name.ilike.%${search}%,email.ilike.%${search}%`)
    }

    const { data } = await query
    if (data) setQuotes(data)
    setLoading(false)
  }

  const handleStatusChange = async (id, newStatus) => {
    await supabase.from('quote_requests').update({ status: newStatus }).eq('id', id)
    fetchQuotes()
  }

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <input 
          type="text" 
          placeholder="Search name or email..." 
          className="w-full max-w-xs rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(0); }}
        />
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <button disabled={page === 0} onClick={() => setPage(page - 1)} className="rounded-md border border-border p-1.5 hover:bg-muted disabled:opacity-50"><ChevronLeft size={16}/></button>
          <span>Page {page + 1}</span>
          <button disabled={quotes.length < LIMIT} onClick={() => setPage(page + 1)} className="rounded-md border border-border p-1.5 hover:bg-muted disabled:opacity-50"><ChevronRight size={16}/></button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-background shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900 text-white">
            <tr>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Client</th>
              <th className="p-4 font-semibold">Contact</th>
              <th className="p-4 font-semibold">Product / Machine</th>
              <th className="p-4 font-semibold">Message</th>
              <th className="p-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading ? <tr><td colSpan="6" className="p-8 text-center text-muted-foreground">Loading...</td></tr> : null}
            {!loading && quotes.length === 0 && <tr><td colSpan="6" className="p-8 text-center text-muted-foreground">No quote requests yet.</td></tr>}
            {!loading && quotes.map(q => (
              <tr key={q.id} className="hover:bg-muted/50 transition-colors">
                <td className="p-4 text-muted-foreground">{new Date(q.created_at).toLocaleDateString()}</td>
                <td className="p-4">
                  <strong className="block text-foreground">{q.client_name}</strong>
                  <span className="text-xs text-muted-foreground">{q.company_name}</span>
                </td>
                <td className="p-4">
                  <a href={`mailto:${q.email}`} className="block text-primary hover:underline">{q.email}</a>
                  <a href={`tel:${q.phone}`} className="text-xs text-muted-foreground hover:text-foreground">{q.phone}</a>
                </td>
                <td className="p-4">
                  <span className="block font-medium text-foreground">{q.product_interest}</span>
                  <span className="text-xs text-muted-foreground">{q.machine_type} | Qty: {q.quantity}</span>
                </td>
                <td className="p-4 max-w-xs">
                  {q.message && q.message.length > 50 && expandedRow !== q.id ? (
                    <span className="text-muted-foreground">{q.message.substring(0, 50)}... <button onClick={() => setExpandedRow(q.id)} className="text-primary hover:underline">Read more</button></span>
                  ) : (
                    <span className="text-muted-foreground">{q.message} {expandedRow === q.id && <button onClick={() => setExpandedRow(null)} className="text-primary hover:underline">Less</button>}</span>
                  )}
                </td>
                <td className="p-4">
                  <select 
                    value={q.status || 'new'} 
                    onChange={e => handleStatusChange(q.id, e.target.value)}
                    className={`rounded-md border px-2 py-1 text-xs font-semibold outline-none ${q.status === 'closed' ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-900/30 dark:text-emerald-400' : q.status === 'contacted' ? 'border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-900/30 dark:text-blue-400' : 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-900/30 dark:text-amber-400'}`}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
