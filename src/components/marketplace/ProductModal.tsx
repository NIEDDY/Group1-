import React, { useState } from 'react'
import { Product } from '../../pages/Marketplace'

type Props = {
  product: Product
  onClose: () => void
}

const ProductModal: React.FC<Props> = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1)
  const handleAddToCart = () => {
    try {
      const raw = localStorage.getItem('cartItems')
      const items = raw ? JSON.parse(raw) : []
      const existing = items.find((it: any) => it.id === product.id)
      if (existing) existing.quantity += quantity
      else items.push({ id: product.id, title: product.title, price: product.price, quantity })
      localStorage.setItem('cartItems', JSON.stringify(items))
      // optional: emit storage event for other tabs/components
      window.dispatchEvent(new StorageEvent('storage', { key: 'cartItems', newValue: JSON.stringify(items) }))
      onClose()
    } catch (err) {
      console.error(err)
    }
  }

  const handleBuyNow = async () => {
    try {
      const body = { items: [{ productId: product.id, quantity }], paymentMethod: 'paypack' }
      const res = await fetch('/api/v1/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error('Failed to create order')
      const data = await res.json()
      // Expecting backend to return a payment URL or similar
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl
      } else {
        // fallback: navigate to a checkout page
        window.location.href = '/checkout'
      }
    } catch (err) {
      console.error(err)
      alert('Failed to initiate purchase. Please try again later.')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
      <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full z-10 p-6 overflow-auto max-h-[90vh]">
        <div className="flex gap-6">
          <div className="w-1/3">
            {product.images && product.images.length > 0 ? (
              <img src={product.images[0]} alt={product.title} className="w-full h-56 object-cover rounded" />
            ) : product.image ? (
              <img src={product.image} alt={product.title} className="w-full h-56 object-cover rounded" />
            ) : (
              <div className="w-full h-56 bg-gray-100 rounded flex items-center justify-center">No image</div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-bold">{product.title}</h2>
                <p className="text-sm text-gray-500">{product.cooperative || 'Unknown cooperative'}</p>
              </div>
              <div className="text-lg font-semibold">₦{product.price.toLocaleString()}</div>
            </div>

            <p className="mt-4 text-gray-700">{product.description}</p>

            <div className="mt-4 flex items-center gap-4">
              <label className="text-sm">Qty</label>
              <input type="number" min={1} value={quantity} onChange={(e) => setQuantity(Math.max(1, Number(e.target.value || 1)))} className="w-20 border rounded px-2 py-1" />
              <div className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>Stock: {product.stock}</div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={handleAddToCart} className="bg-indigo-600 text-white px-4 py-2 rounded">Add to Cart</button>
              <button onClick={handleBuyNow} className="border px-4 py-2 rounded">Buy Now</button>
              <button onClick={onClose} className="ml-auto text-gray-500">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
