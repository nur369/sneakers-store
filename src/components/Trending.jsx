"use client"

import { useState } from "react"
import { Toaster } from "react-hot-toast"
import { products } from "@/data/products"
import ProductCard from "@/components/ProductCard"

export default function Trending() {
  const [visibleCount, setVisibleCount] = useState(6)

  const loadMore = () => {
    setVisibleCount((prev) => prev + 3)
  }

  return (
    <section className="py-20 container mx-auto relative">
      <Toaster position="top-right" />
      <h2 className="flex items-center justify-start text-4xl font-bold mb-12 gap-4">
        Trending Now
        <span className="block w-24 h-1 bg-black"></span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.slice(0, visibleCount).map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>

      {visibleCount < products.length && (
        <div className="flex justify-center mt-12">
          <button
            className="bg-black text-white text-lg px-8 py-3 rounded-full shadow-lg"
            onClick={loadMore}
          >
            View More
          </button>
        </div>
      )}
    </section>
  )
}
