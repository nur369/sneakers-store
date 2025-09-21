"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { products } from "@/data/products"
import { useDispatch } from "react-redux"
import { addToCart } from "@/redux/slices/cartSlice"
import toast, { Toaster } from "react-hot-toast"

export default function ProductDetailsPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const product = products.find((p) => String(p.id) === id)

  const [selectedSize, setSelectedSize] = useState("")
  const sizes = ["40", "41", "42", "43", "44", "45"] 

  if (!product) return <div className="p-20">Product not found</div>

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size before adding to cart!", { duration: 1000 })
      return
    }

    dispatch(addToCart({ ...product, size: selectedSize, quantity: 1 }))
    toast.success(`${product.name} (Size ${selectedSize}) added to cart!`, { duration: 1000 })
  }

  return (
    <section className="container mx-auto px-4 py-20">
      <Toaster position="top-right" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* صورة المنتج */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-96 h-auto rounded-2xl mx-auto"
          />
        </div>

        {/* تفاصيل المنتج */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="mb-6 text-gray-600">{product.description}</p>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-2xl font-bold">${product.price}</span>
            {product.oldPrice && (
              <span className="line-through text-red-600">${product.oldPrice}</span>
            )}
          </div>

          {/* اختيار المقاس */}
          <div className="mb-6">
            <p className="font-semibold mb-2">Select Size:</p>
            <div className="flex gap-3">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-full ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-white text-black hover:bg-gray-200"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="bg-black w-40 text-white px-6 py-3 rounded-full hover:bg-gray-800"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  )
}
