import React, { useEffect, useMemo, useState } from 'react'
import Header from '../components/Header'
import ProductCard from '../components/marketplace/ProductCard'
import SearchBar from '../components/marketplace/SearchBar'
import CartButton from '../components/marketplace/CartButton'
import ProductModal from '../components/marketplace/ProductModal'
import { toast } from '../components/ui/use-toast'
import { Toaster } from '../components/ui/toaster'

// Filter Dropdown Component
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
      className="border border-[#a8d5b2] text-gray-700 rounded-xl px-4 py-2 shadow-sm bg-white/70 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-[#43a047] transition-all duration-300 hover:border-[#43a047]"
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

// Product Interface
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

// Main Marketplace Component
const Marketplace: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [selectedCoop, setSelectedCoop] = useState<string | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [cart, setCart] = useState<{ [key: string]: number }>({})

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

  // Mock products (replace image paths with actual local assets)
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: '1',
        title: 'Organic Coffee Beans',
        description: 'Premium organic coffee beans from local farmers',
        price: 14.99,
        stock: 50,
        cooperative: 'Mountain Coffee Co-op',
        image: 'src/assets/coffee-beans.png'
      },
      {
        id: '2',
        title: 'Handwoven Basket',
        description: 'A beautifully handwoven basket crafted by skilled local artisans using natural, sustainable fibers. Ideal for storing household items, adding a touch of rustic charm to your home, or gifting to loved ones. Each basket is unique, reflecting the artisan’s care and traditional weaving techniques passed down through generations.',
        price: 29.99,
        stock: 15,
        cooperative: 'Artisan Crafts Coalition',
        image: 'https://www.azizilife.com/wp-content/uploads/2020/02/20191230-Traditional-Grass-Peace-Basket-White-and-Black-450x450.jpg'
      
      },
      {
        id: '3',
        title: 'Organic Honey',
        description: 'Raw, unprocessed honey collected from local beekeepers who nurture their hives sustainably. Naturally sweet with delicate floral notes, rich in nutrients and antioxidants. Perfect for drizzling over toast, sweetening tea, or using in healthy recipes. Every jar supports the local beekeeping community.',
        price: 9.99,
        stock: 30,
        cooperative: 'Beekeepers United',
        image: 'src/assets/Honey-.jpg'
      },
      {
        id: '4',
        title: 'Handmade Soap',
        description: 'Natural handmade soap with essential oils',
        price: 6.99,
        stock: 40,
        cooperative: 'Natural Care Co-op',
        image: 'src/assets/Soap.jpg'
      },
      {
        id: '5',
        title: 'Farm Fresh Vegetables Box',
        description: 'Weekly selection of seasonal organic vegetables',
        price: 24.99,
        stock: 20,
        cooperative: 'Local Farmers Alliance',
        image: 'src/assets/Vegetable-box.jpg'
      },
      {
        id: '6',
        title: 'Artisan Cheese',
        description: 'Creamy, rich, and full of flavor, perfectly aged to enhance its taste and texture. Ideal for cheese boards, cooking, or gifting. Each piece supports small-scale dairy farmers and sustainable practices',
        price: 19.99,
        stock: 25,
        cooperative: 'Dairy Farmers Co-op',
        image: 'src/assets/products/cheese.jpg'
      }
    ]

    setProducts(mockProducts)
    setLoading(false)
  }, [])

  // Generate cooperative filter options
  const coopOptions = useMemo(() => {
    const setCoops = new Set<string>()
    products.forEach((p) => p.cooperative && setCoops.add(p.cooperative))
    return Array.from(setCoops)
  }, [products])

  // Filter products
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
      {/* 🌱 Modern Organic Gradient + Soft Glass Effect */}
      <div
        style={{
          paddingTop: 'var(--header-height)',
          backgroundImage: `
            radial-gradient(circle at 10% 20%, rgba(173, 232, 190, 0.35), transparent 40%),
            radial-gradient(circle at 90% 80%, rgba(173, 216, 230, 0.35), transparent 40%),
            linear-gradient(to bottom right, #f8fbf9, #eafaf1, #d7f3e3)
          `
        }}
        className="min-h-screen py-12 px-6 bg-fixed bg-cover bg-no-repeat"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          {/* Title centered at top */}
          <div className="w-full text-center mb-6">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#2e7d32] to-[#43a047] bg-clip-text text-transparent tracking-tight">
              Marketplace
            </h1>
            <p className="text-gray-700 font-semibold mt-2">Discover unique products from local cooperatives</p>
          </div>

          {/* Cart button aligned to the right on its own row */}
          <div className="flex justify-end items-center mb-6">
            <CartButton />
          </div>

          {/* Search and Filter Section */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 bg-white/40 p-4 rounded-2xl backdrop-blur-md border border-[#bde5b8] shadow-md">
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

          {/* Product Grid or Loader */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="border border-[#a8d5b2] rounded-xl p-6 animate-pulse bg-white/60 shadow-md"
                />
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-600">{error}</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 bg-white/60 rounded-xl shadow-md">
              <p className="text-gray-600 text-lg">
                No products found. Try another search or clear filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} onView={() => setSelectedProduct(p)} />
              ))}
            </div>
          )}

          {/* Product Modal */}
          {selectedProduct && (
            <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
          )}
        </div>
      </div>
    </>
  )
}

export default Marketplace
