"use client";

import { useState, useEffect } from "react";
import { Geist } from "next/font/google";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const ClientComponent = dynamic(() => import("../components/ClientComponent"), {
  ssr: false,
});

const words = ["Hello!", "Xin chào!", "안년하세요!"];


export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [index, setIndex] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev === words.length - 1) {
          clearInterval(interval);
          setShowWelcome(false);
          return prev;
        }
        return prev + 1;
      });
    }, 900);

    return () => clearInterval(interval);
  }, []);


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
              <div className="flex justify-center items-center h-40">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{
                      duration: 0.5,
                    }}
                    className="text-4xl md:text-7xl lg:text-6xl font-bold text-white"
                    style={{
                      textShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
                    }}
                  >
                    {words[index]}
                  </motion.div>
                </AnimatePresence>
              </div>
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
