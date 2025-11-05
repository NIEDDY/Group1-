import React from 'react'
import { Product } from '../../pages/Marketplace'

type Props = {
  product: Product
  onView?: () => void
}

const ProductCard: React.FC<Props> = ({ product, onView }) => {
  const handleAddToCart = () => {
    try {
      const raw = localStorage.getItem('cartItems')
      const items = raw ? JSON.parse(raw) : []
      const existing = items.find((it: any) => it.id === product.id)
      if (existing) existing.quantity += 1
      else items.push({ id: product.id, title: product.title, price: product.price, quantity: 1 })
      localStorage.setItem('cartItems', JSON.stringify(items))
      // Small UX: a short visual cue could be added here
    } catch (err) {
      console.error('Failed to add to cart', err)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
      <div className="h-40 w-full bg-gray-100 rounded overflow-hidden flex items-center justify-center mb-4">
        {product.image || (product.images && product.images[0]) ? (
          <img src={product.image || product.images![0]} alt={product.title} className="object-cover h-full w-full" />
        ) : (
          <div className="text-gray-400">No image</div>
        )}
      </div>

      <div className="flex-1">
        <h3 className="text-sm font-semibold mb-1 line-clamp-2">{product.title}</h3>
        <p className="text-xs text-gray-500 mb-2">{product.cooperative || 'Unknown cooperative'}</p>
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold">₦{product.price.toLocaleString()}</div>
          <div className={`text-xs ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>Stock: {product.stock}</div>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        <button onClick={onView} className="flex-1 py-2 px-3 bg-indigo-600 text-white rounded hover:bg-indigo-700">View</button>
        <button onClick={handleAddToCart} className="py-2 px-3 border rounded">Add</button>
      </div>
    </div>
  )
}

export default ProductCard
