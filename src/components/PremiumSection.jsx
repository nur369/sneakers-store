"use client"

import { motion } from "framer-motion"
import { ArrowBigRight } from "lucide-react"

export default function PremiumSection() {
  return (
    <section className="relative py-20 container mx-auto px-4">
      {/* العنوان */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="relative text-center mb-16"
      >
        <h2 className="flex items-center justify-start text-4xl font-bold mb-12 gap-4">
          Step Into Comfort
          <span className="block w-24 h-1 bg-black"></span>
        </h2>
      </motion.div>

      {/* الصور والنصوص */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
        
        {/* الصور (شمال على الشاشات الكبيرة) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="relative flex justify-center lg:justify-start"
        >
          {/* لابتوب: تركيب الصور */}
          <div className="hidden lg:flex relative">
            <div className="flex flex-col gap-4">
              <div className="w-64 h-72 bg-[url('/assets/bg.jpeg')] bg-cover rounded-3xl shadow-lg"></div>
              <div className="w-64 h-72 bg-[url('/assets/bg3.jpeg')] bg-cover rounded-3xl shadow-lg"></div>
            </div>
            <div className="absolute left-[260px] top-[150px] w-64 h-72 bg-[url('/assets/bg2.jpeg')] bg-cover ms-5 rounded-3xl shadow-lg"></div>
          </div>

          {/* موبايل: اتنين فوق بعض + واحدة جمبهم */}
          <div className="grid grid-cols-2 gap-2 lg:hidden">
            <div className="w-32 h-36 md:w-40 md:h-48 bg-[url('/assets/bg.jpeg')] bg-cover rounded-2xl shadow-lg"></div>
            <div className="w-32 h-36 md:w-40 md:h-48 bg-[url('/assets/bg2.jpeg')] bg-cover rounded-2xl shadow-lg"></div>
            <div className="w-32 h-36 md:w-40 md:h-48 bg-[url('/assets/bg3.jpeg')] bg-cover rounded-2xl shadow-lg col-span-2 mx-auto"></div>
          </div>
        </motion.div>

        {/* النصوص */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="max-w-lg text-center lg:text-left lg:flex-1"
        >
          <div className="space-y-4 lg:text-3xl sm:text-xl md:text-2xl leading-snug font-medium">
            <div className="flex items-center gap-2">
              <ArrowBigRight className="w-6 h-6 text-black" />
              <span>Premium quality shoes</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowBigRight className="w-6 h-6 text-black" />
              <span>Lightweight & durable</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowBigRight className="w-6 h-6 text-black" />
              <span>Modern & stylish designs</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowBigRight className="w-6 h-6 text-black" />
              <span >Trusted by thousands</span>
            </div>
          </div>

          <div className="flex justify-center lg:justify-start mt-12">
            <button className="bg-black font-bold text-white text-lg px-8 py-3 rounded-full shadow-lg">
              Explore
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
