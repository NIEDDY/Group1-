import React from 'react'
import { Card, CardContent, CardFooter } from "../ui/card"
import { Button } from "../ui/button"
import { Product } from '../../pages/Marketplace'
import { Badge } from "../ui/badge"
import { motion } from "framer-motion"
import { ShoppingCart, Eye } from "lucide-react"

interface ProductCardProps {
  product: Product
  onView: () => void
  onAddToCart?: () => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onView, onAddToCart }) => {
  // Stock info intentionally hidden (no numeric or status shown)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group overflow-hidden bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
        <div className="relative overflow-hidden aspect-square">
          <img
            src={product.image || 'https://via.placeholder.com/400x400?text=Product+Image'}
            alt={product.title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
          {/* Overlay with buttons on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button
              onClick={onView}
              variant="secondary"
              className="bg-white/90 text-gray-800 hover:bg-white shadow-lg backdrop-blur-sm"
              size="sm"
            >
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Button>
          </div>
          {/* Stock badges intentionally hidden to avoid showing counts or status */}
        </div>
        <CardContent className="p-4">
          <div className="mb-3">
            <Badge variant="outline" className="text-xs font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-none">
              {product.cooperative}
            </Badge>
          </div>
          <h3 className="font-semibold text-lg mb-2 text-gray-800 group-hover:text-indigo-700 transition-colors">{product.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">{product.description}</p>
          <p className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">${product.price.toFixed(2)}</p>
        </CardContent>
        <CardFooter className="px-4 py-3 border-t bg-gray-50">
          <div className="flex items-center justify-end w-full text-sm text-gray-600">
            <span>{product.cooperative}</span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

export default ProductCard
