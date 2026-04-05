"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Header from "@/components/layout/Header";
import FloatingBackgroundSwitcher from "@/components/FloatingBackgroundSwitcher";
import AnimatedBackground from "@/components/AnimatedBackground";
import { motion } from "framer-motion";

interface Background {
  url: string;
  gradient: string;
}

export default function ClientComponent() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [currentBackground, setCurrentBackground] = useState<Background>({
    url: "https://images2.alphacoders.com/687/thumb-1920-687703.png",
    gradient: "from-purple-900/30 via-transparent to-cyan-900/30",
  });
  const [nextBackground, setNextBackground] = useState<Background | null>(null);
  const [isChanging, setIsChanging] = useState(false);

  // Scroll optimization
  const scrollRef = useRef(0);

  // Mouse move optimization với RAF throttle (cách của game engine)
  const mouseRef = useRef({ x: 0, y: 0 });
  const ticking = useRef(false);

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Mouse move handler với RAF throttle - tối ưu như game engine
    const handleMouseMove = (e: MouseEvent) => {
      // Lưu giá trị mới nhất vào ref
      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Chỉ request animation frame nếu chưa có tick nào đang chạy
      if (!ticking.current) {
        requestAnimationFrame(() => {
          // Cập nhật state với giá trị mới nhất từ ref
          setMousePosition(mouseRef.current);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Scroll handler tối ưu - chỉ setState khi giá trị thay đổi
  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const value = target.scrollTop;

    // Chỉ setState khi giá trị scroll thực sự thay đổi
    if (scrollRef.current !== value) {
      scrollRef.current = value;
      setScroll(value);
    }
  }, []);

  const handleBackgroundChange = useCallback(
    (url: string, gradient: string) => {
      if (url === currentBackground.url) return;

      setNextBackground({ url, gradient });
      setIsChanging(true);

      setTimeout(() => {
        setCurrentBackground({ url, gradient });
        setTimeout(() => {
          setIsChanging(false);
          setNextBackground(null);
        }, 300);
      }, 1800);
    },
    [currentBackground.url],
  );

  return (
    <div className="relative w-full h-full " ref={containerRef}>
      <AnimatedBackground
        currentBackground={currentBackground}
        nextBackground={nextBackground}
        isChanging={isChanging}
        mousePosition={mousePosition}
        windowSize={windowSize}
      />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.4,
          ease: [0.76, 0, 0.24, 1],
        }}
      >
        <Header mousePosition={mousePosition} windowSize={windowSize} />
      </motion.div>
      <FloatingBackgroundSwitcher onBackgroundChange={handleBackgroundChange} />
    </div>
  );
}
