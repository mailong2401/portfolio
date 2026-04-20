"use client";

import { useState, useEffect } from "react";
import { Geist } from "next/font/google";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const ClientComponent = dynamic(() => import("../components/ClientComponent"), {
  ssr: false,
});

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [imageError, setImageError] = useState(false);

  // Tự tắt sau 2s
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 2300);

    return () => clearTimeout(timer);
  }, []);

  const text = "Hello welcome to Mai Duong Long portfolio";
  const words = text.split(" ");

  const letterVariants = {
    initial: { y: 50, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.03,
        duration: 0.5,
      },
    }),
  };

  return (
    <div
      className={`${geistSans.className} w-full h-screen  font-[family-name:var(--font-geist-sans)] relative`}
    >
      <AnimatePresence>
        {showWelcome && (
          <motion.div
            className="fixed inset-0 z-0 flex items-center justify-center bg-gradient-to-br from-black via-gray-950 to-black backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <div className="text-center px-4 relative z-10">
              {/* Avatar với hiệu ứng đẹp */}
              <motion.div
                initial={{ scale: 1.2, opacity: 0, rotate: -10 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.76, 0, 0.24, 1],
                  delay: 0.2,
                }}
                className="mb-8 relative"
              >
                <div className="relative w-28 h-28 mx-auto">
                  {/* Hiệu ứng glow xung quanh avatar */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full blur-xl opacity-50 animate-pulse"></div>

                  {/* Khung viền gradient */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 p-[2px]">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-900">
                      <Image
                        src="https://avatars.githubusercontent.com/u/111423869?v=4"
                        alt="Mai Dương Long"
                        width={112}
                        height={112}
                        className="w-full h-full object-cover rounded-full"
                        onError={() => setImageError(true)}
                        priority
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Welcome Text with proper spacing */}
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 max-w-4xl mx-auto">
                {words.map((word, wordIndex) => (
                  <div key={wordIndex} className="flex gap-x-1">
                    {word.split("").map((letter, letterIndex) => (
                      <motion.span
                        key={`${wordIndex}-${letterIndex}`}
                        custom={wordIndex * 10 + letterIndex}
                        variants={letterVariants}
                        initial="initial"
                        animate="animate"
                        className="text-3xl md:text-5xl lg:text-6xl font-bold text-white inline-block"
                        style={{
                          textShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
                        }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </div>
                ))}
              </div>

              {/* 3 chấm tròn màu xanh, đỏ, vàng nhấp nháy */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="mt-12"
              >
                <div className="flex justify-center items-center space-x-3">
                  <motion.div
                    className="w-3 h-3 bg-[#e06c75] rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: 0,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Chấm tròn vàng */}
                  <motion.div
                    className="w-3 h-3 bg-[#e5c07b] rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: 0.2,
                      ease: "easeInOut",
                    }}
                  />

                  {/* Chấm tròn xanh */}
                  <motion.div
                    className="w-3 h-3 bg-[#98c379] rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      delay: 0.4,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {!showWelcome && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full relative z-10"
        >
          <ClientComponent />
        </motion.div>
      )}
    </div>
  );
}
