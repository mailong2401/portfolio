
import { useState, useRef, useEffect, useCallback } from "react";
import Header from "@/components/layout/Header";
import FloatingBackgroundSwitcher from "@/components/FloatingBackgroundSwitcher";
import AnimatedBackground from "@/components/AnimatedBackground";
import UserCard from "@/components/UserCard";
import { motion } from "framer-motion";
import ListProject from "./ListProject";
import ToggleTranslate from "./layout/toggle-translate";

interface Background {
  url: string;
  gradient: string;
}

export default function ClientComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [currentBackground, setCurrentBackground] = useState<Background>({
    url: "/images/wallpapers/lamborghini.jpeg",
    gradient: "from-purple-900/30 to-cyan-900/30",
  });
  const [nextBackground, setNextBackground] = useState<Background | null>(null);
  const [isChanging, setIsChanging] = useState(false);

  // Scroll optimization

  // Mouse move optimization với RAF throttle
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
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
        mouseRef={mouseRef}
        windowSize={windowSize}
      />


      <div className=" flex flex-col pt-100 pl-10 pr-10 md:pt-30">

        <div className="flex flex-col md:flex-row   h-[1000px] md:h-[600px] gap-200 md:gap-10">

          <div className="relative   w-full h-[500px] md:w-[400px] md:h-full">
            <motion.div
              transition={{
                duration: 0.8,
                delay: 0.4,
              }}
            >
              <UserCard />
            </motion.div>
          </div>
          <div className="relative   w-full h-[600px]">
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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          delay: 0.4,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="z-100"
      >
        <Header />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.7,
          delay: 0.4,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="z-100"
      >
        <ToggleTranslate />
      </motion.div>
    </div >
  );
}
