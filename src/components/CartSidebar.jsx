"use client";

import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "@/redux/slices/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import Link from "next/link";


export default function CartSidebar({ isOpen, onClose }) {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // حساب السعر الكلي
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4 }}
            className="fixed top-0 right-0 w-80 h-full bg-white shadow-2xl z-50 p-6 flex flex-col"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Your Cart ({cartItems.length})</h2>
              <X className="w-6 h-6 cursor-pointer" onClick={onClose} />
            </div>

            {/* Items */}
            {cartItems.length === 0 ? (
              <p className="text-gray-500 mt-10 text-center">Your cart is empty.</p>
            ) : (
              <div className="flex-1 overflow-y-auto space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-semibold truncate">{item.name}</p>
                      <p className="text-gray-600">${item.price} x {item.quantity}</p>
                    </div>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="mt-4 border-t pt-4 space-y-3">
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => dispatch(clearCart())}
                  className="w-full bg-black text-white py-2 rounded-full hover:bg-gray-800"
                >
                  Clear Cart
                </button>
                <Link
  href="/checkout"
  className="block w-full bg-green-600 text-white py-2 rounded-full text-center hover:bg-green-700"
>
  Proceed to Checkout
</Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
