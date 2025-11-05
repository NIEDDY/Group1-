import React, { useEffect, useMemo, useState } from 'react'
import Header from '../components/Header'
import ProductCard from '../components/marketplace/ProductCard'
import SearchBar from '../components/marketplace/SearchBar'
import CartButton from '../components/marketplace/CartButton'
import ProductModal from '../components/marketplace/ProductModal'
import { toast } from '../components/ui/use-toast'
import { Toaster } from '../components/ui/toaster'

type FilterDropdownProps = {
  options: string[]
  value: string | null
  onChange: (val: string | null) => void
  placeholder?: string
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({ options, value, onChange, placeholder }) => {
  return (
    <select
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value === '' ? null : e.target.value)}
      className="border border-gray-300 text-gray-700 rounded-xl px-4 py-2 shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 hover:border-primary"
      aria-label={placeholder}
    >
      <option value="">{placeholder ?? 'All'}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  )
}

export interface Product {
  id: string
  title: string
  description?: string
  price: number
  stock: number
  cooperative?: string
  images?: string[]
  image?: string
}

const Marketplace: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true) // Start with loading state
  const [error, setError] = useState<string | null>(null)

  const [search, setSearch] = useState('')
  const [selectedCoop, setSelectedCoop] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cart, setCart] = useState<{ [key: string]: number }>({}) // Track cart items

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: '1',
        title: 'Organic Coffee Beans',
        description: 'Premium organic coffee beans from local farmers',
        price: 14.99,
        stock: 50,
        cooperative: 'Mountain Coffee Co-op',
        image: 'src/assets/sch-logo.png'
      },
      {
        id: '2',
        title: 'Handwoven Basket',
        description: 'Traditional handwoven basket made from sustainable materials',
        price: 29.99,
        stock: 15,
        cooperative: 'Artisan Crafts Coalition',
        image: 'https://via.placeholder.com/400x400?text=Handwoven+Basket'
      },
      {
        id: '3',
        title: 'Organic Honey',
        description: 'Pure, raw honey from local beekeepers',
        price: 9.99,
        stock: 30,
        cooperative: 'Beekeepers United',
        image: 'https://via.placeholder.com/400x400?text=Organic+Honey'
      },
      {
        id: '4',
        title: 'Handmade Soap',
        description: 'Natural handmade soap with essential oils',
        price: 6.99,
        stock: 40,
        cooperative: 'Natural Care Co-op',
        image: 'https://via.placeholder.com/400x400?text=Handmade+Soap'
      },
      {
        id: '5',
        title: 'Farm Fresh Vegetables Box',
        description: 'Weekly selection of seasonal organic vegetables',
        price: 24.99,
        stock: 20,
        cooperative: 'Local Farmers Alliance',
        image: 'https://via.placeholder.com/400x400?text=Vegetable+Box'
      },
      {
        id: '6',
        title: 'Artisan Cheese',
        description: 'Locally produced artisan cheese selection',
        price: 19.99,
        stock: 25,
        cooperative: 'Dairy Farmers Co-op',
        image: 'https://via.placeholder.com/400x400?text=Artisan+Cheese'
      }
    ];

    setProducts(mockProducts);
    setLoading(false);
  }, [])

  const coopOptions = useMemo(() => {
    const setCoops = new Set<string>()
    products.forEach((p) => p.cooperative && setCoops.add(p.cooperative))
    return Array.from(setCoops)
  }, [products])

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase()
    return products.filter((p) => {
      const matchesSearch =
        !term || p.title.toLowerCase().includes(term) || (p.description || '').toLowerCase().includes(term)
      const matchesCoop = !selectedCoop || p.cooperative === selectedCoop
      return matchesSearch && matchesCoop
    })
  }, [products, search, selectedCoop])

  return (
    <>
      <Header />
      <div style={{ paddingTop: 'var(--header-height)' }} className="min-h-screen bg-gradient-to-br from-[hsl(217,91%,95%)] via-white to-[hsl(142,76%,95%)] py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[hsl(217,91%,40%)] to-[hsl(142,76%,36%)] bg-clip-text text-transparent tracking-tight">
                Marketplace
              </h1>
              <p className="text-gray-600">Discover unique products from local cooperatives</p>
            </div>
            <CartButton />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-white/50 p-4 rounded-2xl backdrop-blur-sm border border-indigo-100/50 shadow-sm">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search for products, keywords..."
            />
            <FilterDropdown
              options={coopOptions}
              value={selectedCoop}
              onChange={setSelectedCoop}
              placeholder="Filter by cooperative"
            />
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="border rounded-xl p-6 animate-pulse bg-white shadow-sm" />
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-600">{error}</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-sm">
              <p className="text-gray-600 text-lg">No products found. Try another search or clear filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filtered.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onView={() => setSelectedProduct(p)}
                />
              ))}
            </div>
          )}

          {selectedProduct && (
            <ProductModal
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default Marketplace
