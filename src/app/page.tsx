"use client";

import { useState, useEffect } from "react";
import { Geist } from "next/font/google";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, Variants } from "framer-motion";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const ClientComponent = dynamic(() => import("../components/ClientComponent"), {
  ssr: false,
});

const words = [
  ,        // English
  "Xin chào!",     // Vietnamese
  "안녕하세요!",     // Korean
  "こんにちは!",     // Japanese
  "你好!",         // Chinese (Simplified)
  "Hola!",        // Spanish
  "Bonjour!",     // French
  "Hallo!",       // German
  "Ciao!",        // Italian
  "Olá!",         // Portuguese
  "Привет!",      // Russian
  "สวัสดี!",      // Thai
  "مرحبا!",       // Arabic
  "नमस्ते!",      // Hindi
  "Hello!"
];

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev === words.length - 1) {
          clearInterval(interval);
          // Delay trước khi ẩn welcome screen
          setTimeout(() => {
            setShowWelcome(false);
          }, 200);
          return prev;
        }
        return prev + 1;
      });
    }, 200); // Giảm từ 900ms xuống 200ms cho nhanh hơn

    return () => clearInterval(interval);
  }, []);

  // Animation variants cho chữ
  const textVariants: Variants = {
    initial: {
      opacity: 0,
      y: 30,
      scale: 0.8,
      filter: "blur(10px)",
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.5,
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 0.8,
      filter: "blur(10px)",
      transition: {
        duration: 0.15,
        ease: "easeIn",
      }
    }
  };

  // Container animation
  const containerVariants: Variants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div
      className={`${geistSans.className} w-full h-screen font-[family-name:var(--font-geist-sans)] relative `}
    >
      <AnimatePresence mode="wait">
        {showWelcome && (
          <motion.div
            key="welcome"
            className="fixed inset-0 z-0 flex items-center justify-center bg-black"
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                background: "radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
              }}
            />

            <div className="text-center px-4 relative z-10">
              <div className="flex justify-center items-center h-40 md:h-48">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={index}
                    variants={textVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="relative"
                  >
                    {/* Glow effect behind text */}
                    <motion.div
                      className="absolute inset-0 blur-3xl"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      style={{
                        background: "radial-gradient(circle at center, rgba(168, 85, 247, 0.4), transparent)",
                      }}
                    />

                    {/* Main text */}
                    <motion.h1
                      className="text-5xl md:text-7xl lg:text-8xl font-bold text-white relative"
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      {words[index]}
                    </motion.h1>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!showWelcome && (
          <motion.div
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className="w-full h-full relative z-10"
          >
            <ClientComponent />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
