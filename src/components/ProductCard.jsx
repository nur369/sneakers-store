"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import toast from "react-hot-toast"
import { Heart, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useDispatch } from "react-redux"
import { addToCart } from "@/redux/slices/cartSlice"

export default function ProductCard({ item }) {
  const [liked, setLiked] = useState(false)
  const [added, setAdded] = useState(false)
  const dispatch = useDispatch()

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="relative bg-white/50 shadow-xl rounded-2xl p-4 flex flex-col items-center"
    >
      {item.hot && (
        <div className="absolute top-4 left-4 bg-black text-white text-sm px-3 py-1 rounded-lg shadow-md">
          HOT
        </div>
      )}

      <Link href={`/product/${item.id}`}>
        <img
          src={item.image}
          alt={item.name}
          className="w-60 h-60 object-contain rounded-xl mb-4 cursor-pointer"
        />
      </Link>

      <h3 className="text-lg font-semibold">{item.name}</h3>
      <div className="flex flex-col gap-2 items-center">
        <div className="line-through text-red-600">${item.oldPrice}</div>
        <div className="text-2xl font-bold">${item.price}</div>
      </div>

      <div className="flex justify-between w-full mt-4 px-4">
        <Heart
          className={`w-6 h-6 cursor-pointer ${liked ? "text-red-600" : ""}`}
          onClick={() => setLiked(!liked)}
        />
        <ShoppingCart
          className={`w-6 h-6 cursor-pointer ${added ? "text-green-600" : ""}`}
          onClick={() => {
            dispatch(addToCart({ ...item, quantity: 1 }))
            setAdded(true)
            toast.success(`${item.name} added to cart!`)
          }}
        />
      </div>
    </motion.div>
  )
}
