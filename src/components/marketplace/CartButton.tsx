import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const CartButton: React.FC = () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const load = () => {
      try {
        const raw = localStorage.getItem('cartItems')
        const items = raw ? JSON.parse(raw) : []
        const cnt = items.reduce((s: number, it: any) => s + (it.quantity || 0), 0)
        setCount(cnt)
      } catch (err) {
        console.error(err)
      }
    }
    load()
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'cartItems') load()
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return (
    <Link to="/cart" className="relative bg-white border rounded px-3 py-2 flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" viewBox="0 0 20 20" fill="currentColor">
        <path d="M16 11V3H4v8H2v2h2a2 2 0 104 0h4a2 2 0 104 0h2v-2h-2zM6 17a1 1 0 110-2 1 1 0 010 2zm8 0a1 1 0 110-2 1 1 0 010 2z" />
      </svg>
      <span className="text-sm">Cart</span>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{count}</span>
      )}
    </Link>
  )
}

export default CartButton
