
import { useState, useRef, useEffect, useCallback } from "react";
import Header from "@/components/layout/Header";
import FloatingBackgroundSwitcher from "@/components/FloatingBackgroundSwitcher";
import AnimatedBackground from "@/components/AnimatedBackground";
import UserCard from "@/components/UserCard";
import { motion } from "framer-motion";
import ListProject from "./ListProject";

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

  // Mouse move optimization với RAF throttle
  const mouseRef = useRef({ x: 0, y: 0 });
  const ticking = useRef(false);

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };

      if (!ticking.current) {
        requestAnimationFrame(() => {
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

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const value = target.scrollTop;

    if (scrollRef.current !== value) {
      scrollRef.current = value;
      setScroll(value);
    }
  }, []);

  const handleBackgroundChange = useCallback(
    async (url: string, gradient: string) => {
      if (url === currentBackground.url) return;

      // Set next background để pre-render
      setNextBackground({ url, gradient });
      setIsChanging(true);

      // Đợi animation
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          setCurrentBackground({ url, gradient });
          setTimeout(() => {
            setIsChanging(false);
            setNextBackground(null);
            resolve();
          }, 300);
        }, 1200);
      });
    },
    [currentBackground.url],
  );

  return (
    <div className="relative w-full h-full" ref={containerRef}>
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
          duration: 0.7,
          delay: 0.4,
          ease: [0.76, 0, 0.24, 1],
        }}
      >
        <Header mousePosition={mousePosition} windowSize={windowSize} />
      </motion.div>
      <div className=" flex flex-col pt-30 pl-10 pr-10">

        <div className="flex  ">

          <div className="relative w-100 h-100 ">
            <motion.div
              transition={{
                duration: 0.8,
                delay: 0.4,
              }}
            >
              <UserCard />
            </motion.div>
          </div>
          <div className="relative w-full h-100 ">
            <ListProject />
          </div>
        </div>
        <div className="relative w-full h-100"></div>
        <div className="relative w-full h-100"></div>
        <div className="relative w-full h-100">
        </div>
      </div>
      <motion.div
        transition={{
          duration: 0.9,
          delay: 0.6,
        }}
        className="z-50"
      >
        <FloatingBackgroundSwitcher
          onBackgroundChange={handleBackgroundChange}
        />
      </motion.div>
    </div>
  );
}
