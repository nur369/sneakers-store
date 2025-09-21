"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6"; // ✅ أيقونة البيت من FA6

import Image from "next/image";
import CartSidebar from "./CartSidebar";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // ✅ استدعاء الروتر

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.items || []);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const router = useRouter(); 
  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed z-50 transition-all duration-500
    ${
      isScrolled
        ? "w-full top-0 left-0 translate-x-0 bg-white/50 backdrop-blur-xs shadow-md rounded-none"
        : "w-3/4 top-5 left-1/2 -translate-x-1/2 bg-white/50 backdrop-blur-xs shadow-md rounded-full"
    }`}
      >
        <div className="flex items-center justify-between px-6 py-1">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/assets/nike-logo.png"
              alt="Nike"
              width={60}
              height={30}
              priority
            />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6 relative">
            {/* Search */}
            <div className="relative flex items-center">
              <FaSearch
                className="text-xl cursor-pointer"
                onClick={() => setShowSearch(!showSearch)}
              />
              <AnimatePresence>
                {showSearch && (
                  <motion.input
                    key="search-box"
                    initial={{ x: -100, opacity: 0, width: 0 }}
                    animate={{ x: 0, opacity: 1, width: 180 }}
                    exit={{ x: -100, opacity: 0, width: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    type="text"
                    placeholder="Search..."
                    className="ml-2 px-3 py-1 text-sm rounded-md border bg-white/50 border-gray-300 outline-none"
                  />
                )}
              </AnimatePresence>
            </div>

            {/* Cart */}
            <div className="relative">
              <FaShoppingCart
                className="cursor-pointer text-black text-xl"
                onClick={() => setCartOpen(true)}
              />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>

            {/* Home */}
            <FaHouse
              className="text-black text-xl cursor-pointer"
              onClick={() => router.push("/")} 
            />
          </div>
        </div>
      </nav>

      {/* Cart Sidebar */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Navbar;
