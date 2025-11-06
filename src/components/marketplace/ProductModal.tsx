import React, { useState } from 'react'
import { Product } from '../../pages/Marketplace'
import { ShoppingCart, X } from 'lucide-react'

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
      window.dispatchEvent(
        new StorageEvent('storage', { key: 'cartItems', newValue: JSON.stringify(items) })
      )
      onClose()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/50 px-4">
      <div className="relative bg-gradient-to-br from-white/95 to-green-50/95 backdrop-blur-xl border border-green-100 rounded-3xl shadow-2xl w-full max-w-3xl h-[85vh] overflow-hidden transition-all duration-300 flex flex-col">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-green-700 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
          
          {/* Left: Product Image */}
          <div className="md:w-1/2 w-full flex items-center justify-center bg-gradient-to-br from-green-100 to-green-50 p-4 md:p-6">
            {product.images && product.images.length > 0 ? (
              <img
                src={product.images[0]}
                alt={product.title}
                className="rounded-2xl shadow-md object-cover w-full h-[65vh]"
              />
            ) : product.image ? (
              <img
                src={product.image}
                alt={product.title}
                className="rounded-2xl shadow-md object-cover w-full h-[65vh]"
              />
            ) : (
              <div className="w-full h-[65vh] bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 text-sm">
                No Image Available
              </div>
            )}
          </div>

          {/* Right: Product Details */}
          <div className="flex-1 flex flex-col justify-between p-6 md:p-8 overflow-y-auto">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {product.title}
              </h2>
              <p className="text-sm text-gray-500 font-medium mb-4">
                {product.cooperative || 'Unknown cooperative'}
              </p>

              <p className="text-2xl font-extrabold bg-gradient-to-r from-green-600 to-teal-500 bg-clip-text text-transparent mb-5">
                ₦{product.price.toLocaleString()}
              </p>

              <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="flex items-center gap-3 mb-8">
                <label className="text-sm text-gray-700 font-medium">Qty:</label>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, Number(e.target.value || 1)))
                  }
                  className="w-20 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-teal-500 text-white px-6 py-3 rounded-xl shadow-md hover:opacity-90 transition-all font-semibold"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={onClose}
                className="text-gray-700 border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-100 transition-all font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal
