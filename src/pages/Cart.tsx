import React, { useEffect, useMemo, useState } from 'react'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom'

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

// Local mock products (kept in sync with Marketplace mock)
const MOCK_PRODUCTS: Product[] = [
  { id: '1', title: 'Organic Coffee Beans', description: 'Premium organic coffee beans from local farmers', price: 14.99, stock: 50, cooperative: 'Mountain Coffee Co-op', image: 'https://via.placeholder.com/400x400?text=Coffee+Beans' },
  { id: '2', title: 'Handwoven Basket', description: 'Traditional handwoven basket made from sustainable materials', price: 29.99, stock: 15, cooperative: 'Artisan Crafts Coalition', image: 'https://via.placeholder.com/400x400?text=Handwoven+Basket' },
  { id: '3', title: 'Organic Honey', description: 'Pure, raw honey from local beekeepers', price: 9.99, stock: 30, cooperative: 'Beekeepers United', image: 'https://via.placeholder.com/400x400?text=Organic+Honey' },
  { id: '4', title: 'Handmade Soap', description: 'Natural handmade soap with essential oils', price: 6.99, stock: 40, cooperative: 'Natural Care Co-op', image: 'https://via.placeholder.com/400x400?text=Handmade+Soap' },
  { id: '5', title: 'Farm Fresh Vegetables Box', description: 'Weekly selection of seasonal organic vegetables', price: 24.99, stock: 20, cooperative: 'Local Farmers Alliance', image: 'https://via.placeholder.com/400x400?text=Vegetable+Box' },
  { id: '6', title: 'Artisan Cheese', description: 'Locally produced artisan cheese selection', price: 19.99, stock: 25, cooperative: 'Dairy Farmers Co-op', image: 'https://via.placeholder.com/400x400?text=Artisan+Cheese' }
]

type CartItem = { id: string; title: string; price: number; quantity: number }

const readCartFromStorage = (): CartItem[] => {
  try {
    const rawItems = localStorage.getItem('cartItems')
    if (rawItems) return JSON.parse(rawItems)

    // fallback: 'cart' format was used as { [id]: qty }
    const raw = localStorage.getItem('cart')
    if (raw) {
      const map: { [key: string]: number } = JSON.parse(raw)
      return Object.keys(map).map((id) => {
        const product = MOCK_PRODUCTS.find((p) => p.id === id)
        return {
          id,
          title: product?.title ?? id,
          price: product?.price ?? 0,
          quantity: map[id]
        }
      })
    }

    return []
  } catch (err) {
    console.error('Failed to read cart from storage', err)
    return []
  }
}

const saveCartToStorage = (items: CartItem[]) => {
  try {
    localStorage.setItem('cartItems', JSON.stringify(items))
    // Also keep 'cart' mapping for compatibility
    const map: { [key: string]: number } = {}
    items.forEach((it) => (map[it.id] = it.quantity))
    localStorage.setItem('cart', JSON.stringify(map))
  } catch (err) {
    console.error('Failed to save cart', err)
  }
}

const Cart: React.FC = () => {
  const [items, setItems] = useState<CartItem[]>(() => readCartFromStorage())
  const navigate = useNavigate()

  useEffect(() => {
    saveCartToStorage(items)
  }, [items])

  const total = useMemo(() => items.reduce((s, it) => s + it.price * it.quantity, 0), [items])

  const updateQty = (id: string, qty: number) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, quantity: Math.max(1, qty) } : it)))
  }

  const removeItem = (id: string) => setItems((prev) => prev.filter((it) => it.id !== id))

  const handleCheckout = () => {
    // Simple placeholder checkout flow
    if (items.length === 0) return alert('Cart is empty')
    // In a real app, you'd send items to a backend to create an order and redirect to payment
    alert(`Proceeding to checkout — total: $${total.toFixed(2)}`)
    // clear cart and navigate to confirmation (placeholder)
    setItems([])
    navigate('/')
  }

  return (
    <>
      <Header />
      <main style={{ paddingTop: 'var(--header-height)' }} className="max-w-5xl mx-auto py-10 px-6">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <p className="mb-4">Your cart is empty.</p>
            <Link to="/marketplace" className="text-[hsl(217,91%,40%)] underline">Browse the marketplace</Link>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow p-6">
            <ul className="space-y-4">
              {items.map((it) => (
                <li key={it.id} className="flex items-center gap-4">
                  <img src={MOCK_PRODUCTS.find((p) => p.id === it.id)?.image} alt={it.title} className="w-20 h-20 object-cover rounded" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{it.title}</h3>
                      <div className="font-medium">₦{it.price.toFixed(2)}</div>
                    </div>
                    <p className="text-sm text-gray-500">{MOCK_PRODUCTS.find((p) => p.id === it.id)?.cooperative}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <label className="text-sm">Qty</label>
                      <input type="number" min={1} value={it.quantity} onChange={(e) => updateQty(it.id, Number(e.target.value || 1))} className="w-20 border rounded px-2 py-1" />
                      <button onClick={() => removeItem(it.id)} className="ml-4 text-sm text-red-600">Remove</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <div className="text-2xl font-bold">₦{total.toFixed(2)}</div>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => navigate('/marketplace')} className="px-4 py-2 border rounded">Continue Shopping</button>
                <button onClick={handleCheckout} className="px-4 py-2 bg-[hsl(217,91%,40%)] text-white rounded">Proceed to Checkout</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  )
}

export default Cart
