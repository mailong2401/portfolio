
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, } from "react";

import { RefObject } from "react";

interface Background {
  url: string;
  gradient: string;
}

interface AnimatedBackgroundProps {
  currentBackground: Background;
  nextBackground: Background | null;
  isChanging: boolean;
  mouseRef: RefObject<{ x: number; y: number }>;
  onLoadComplete?: () => void;
  windowSize: { width: number; height: number };
}

export default function AnimatedBackground({
  currentBackground,
  nextBackground,
  mouseRef,
  windowSize,
  onLoadComplete
}: AnimatedBackgroundProps) {
  const currentBgRef = useRef<HTMLDivElement>(null);
  const nextBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rafId: number;

    const animate = () => {
      if (!mouseRef.current) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      const { x, y } = mouseRef.current;

      const deadZoneX = windowSize.width * 0.25;
      const deadZoneY = windowSize.height * 0.25;

      let moveX = 0;
      let moveY = 0;

      const maxMoveX = windowSize.width * 0.1;
      const maxMoveY = windowSize.height * 0.1;

      if (x < deadZoneX) {
        moveX = maxMoveX * (1 - x / deadZoneX);
      } else if (x > windowSize.width - deadZoneX) {
        moveX =
          -maxMoveX *
          ((x - (windowSize.width - deadZoneX)) / deadZoneX);
      }

      if (y < deadZoneY) {
        moveY = maxMoveY * (1 - y / deadZoneY);
      } else if (y > windowSize.height - deadZoneY) {
        moveY =
          -maxMoveY *
          ((y - (windowSize.height - deadZoneY)) / deadZoneY);
      }

      // apply cho cả 2 background
      if (currentBgRef.current) {
        currentBgRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }

      if (nextBgRef.current) {
        nextBgRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [windowSize]);

  return (
    <>
      {/* Main Background */}
      <motion.div
        className="fixed inset-0 z-0 w-full h-full pointer-events-none"
        initial={{ clipPath: "circle(0% at center)" }}
        animate={{ clipPath: "circle(100% at center)" }}
        transition={{
          duration: 1.8,
          ease: [0.76, 0, 0.24, 1],
          delay: 0.2,
        }}
        onAnimationComplete={() => {
          onLoadComplete?.();
        }}
      >
        <div
          className="fixed -inset-[10%] z-0 pointer-events-none  transition-transform duration-500 ease-out will-change-transform"
          ref={currentBgRef}
        >
          <Image
            src={currentBackground.url}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Background"
            fill
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <div
            className={`absolute inset-0 bg-gradient-to-br ${currentBackground.gradient}`}
          ></div>
        </div>
      </motion.div>

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
          className="fixed inset-0 z-0 pointer-events-none"
        >
          <div
            className="fixed -inset-[10%] z-0 pointer-events-none  transition-transform duration-500 ease-out will-change-transform"
            ref={nextBgRef}
          >
            <Image
              src={nextBackground.url}
              className="absolute inset-0 w-full h-full object-cover"
              alt="Next Background"
              fill
            />
            <div className="absolute inset-0 bg-black/30"></div>
            <div
              className={`absolute inset-0 bg-gradient-to-br ${nextBackground.gradient}`}
            ></div>
          </div>
        </motion.div>
      )}
    </>
  );
}
