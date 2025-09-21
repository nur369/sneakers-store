"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";


const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 1,
    minutes: 59,
    seconds: 45,
  });

  // Countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-start pt-10 overflow-hidden bg-black">
      {/* خلفية */}
      <div className="absolute inset-0 bg-[url('/assets/hero.jpg')] bg-cover opacity-40"></div>

      {/* النص */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 0.1, y: 0 }}
        transition={{ duration: 1 }}
        className="absolute top-50 text-[60px] md:text-[120px] font-bold text-white text-center z-0 select-none leading-tight"
      >
        <div>Nike Air  Just Do It</div>
        <div>Nike Air   Just Do It</div>
      </motion.h1>

      {/* صورة الكوتشي */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-10 mt-20"
      >
        <Image
          src="/assets/shoe.png"
          alt="Nike Shoe"
          width={500}
          height={500}
          className="drop-shadow-2xl"
        />
      </motion.div>

      {/* الكاونتر */}
      <div className="absolute bottom-10 right-20  z-20 text-white">
        <p className="text-lg font-semibold mb-3"> Flash Sale Ends In</p>
        <div className="flex gap-2">
          {/* ساعات */}
          <div className="w-16 h-16 flex flex-col items-center justify-center bg-white/20 rounded-lg shadow-md">
            <span className="text-2xl font-bold">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="text-xs">Hrs</span>
          </div>
          {/* دقايق */}
          <div className="w-16 h-16 flex flex-col items-center justify-center bg-white/20 rounded-lg shadow-md">
            <span className="text-2xl font-bold">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="text-xs">Min</span>
          </div>
          {/* ثواني */}
          <div className="w-16 h-16 flex flex-col items-center justify-center bg-white/20 rounded-lg shadow-md">
            <span className="text-2xl font-bold">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
            <span className="text-xs">Sec</span>
          </div>
            </div>
      </div>


    </section>
  );
};

export default Hero;
