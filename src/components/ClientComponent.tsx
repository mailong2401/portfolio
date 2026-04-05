"use client";

import { useState, useRef, useEffect } from "react";
import Header from "@/components/layout/Header";
import { motion } from "framer-motion";
import FloatingBackgroundSwitcher from "@/components/FloatingBackgroundSwitcher";

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

  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
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

  const getBackgroundTransform = () => {
    if (windowSize.width === 0) return "translate(0px, 0px)";

    const deadZoneX = windowSize.width * 0.3;
    const deadZoneY = windowSize.height * 0.3;

    const leftThreshold = deadZoneX;
    const rightThreshold = windowSize.width - deadZoneX;
    const topThreshold = deadZoneY;
    const bottomThreshold = windowSize.height - deadZoneY;

    let moveX = 0;
    let moveY = 0;

    const maxMoveX = windowSize.width * 0.1;
    const maxMoveY = windowSize.height * 0.1;

    if (mousePosition.x < leftThreshold) {
      const percent = 1 - mousePosition.x / leftThreshold;
      moveX = maxMoveX * percent;
    } else if (mousePosition.x > rightThreshold) {
      const percent = (mousePosition.x - rightThreshold) / deadZoneX;
      moveX = -maxMoveX * percent;
    }

    if (mousePosition.y < topThreshold) {
      const percent = 1 - mousePosition.y / topThreshold;
      moveY = maxMoveY * percent;
    } else if (mousePosition.y > bottomThreshold) {
      const percent = (mousePosition.y - bottomThreshold) / deadZoneY;
      moveY = -maxMoveY * percent;
    }

    return `translate(${moveX}px, ${moveY}px)`;
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    requestAnimationFrame(() => {
      setScroll((event?.target as any)?.scrollTop);
    });
  };

  const handleBackgroundChange = (url: string, gradient: string) => {
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
  };

  return (
    <div
      className="relative w-full h-full overflow-auto"
      ref={containerRef}
      onScroll={handleScroll}
    >
      {/* Main Background */}
      <motion.div
        className="absolute inset-0 z-0 w-full h-full"
        initial={{ clipPath: "circle(0% at center)" }}
        animate={{ clipPath: "circle(100% at center)" }}
        transition={{
          duration: 1.8,
          ease: [0.76, 0, 0.24, 1],
          delay: 0.2,
        }}
      >
        <div
          className="absolute -inset-[10%] z-0 transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform: getBackgroundTransform(),
            transitionTimingFunction: "cubic-bezier(0.2, 0.9, 0.3, 1.1)",
          }}
        >
          <img
            src={currentBackground.url}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Background"
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <div
            className={`absolute inset-0 bg-gradient-to-br ${currentBackground.gradient}`}
          ></div>
        </div>

        {/* Next Background (for smooth transition) */}
        {nextBackground && (
          <motion.div
            initial={{ clipPath: "circle(0% at center)" }}
            animate={{ clipPath: "circle(100% at center)" }}
            transition={{
              duration: 1.8,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.2,
            }}
            className="absolute inset-0 z-10"
          >
            <div
              className="absolute -inset-[10%] transition-transform duration-500 ease-out will-change-transform"
              style={{
                transform: getBackgroundTransform(),
                transitionTimingFunction: "cubic-bezier(0.2, 0.9, 0.3, 1.1)",
              }}
            >
              <img
                src={nextBackground.url}
                className="absolute inset-0 w-full h-full object-cover"
                alt="Next Background"
              />
              <div className="absolute inset-0 bg-black/30"></div>
              <div
                className={`absolute inset-0 bg-gradient-to-br ${nextBackground.gradient}`}
              ></div>
            </div>
          </motion.div>
        )}

        {/* Grid Overlay */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none z-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`,
          }}
        />
      </motion.div>

      <Header
        scrollPosition={scroll}
        mousePosition={mousePosition}
        windowSize={windowSize}
      />
      <FloatingBackgroundSwitcher onBackgroundChange={handleBackgroundChange} />
    </div>
  );
}
