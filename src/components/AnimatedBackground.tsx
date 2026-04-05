"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface Background {
  url: string;
  gradient: string;
}

interface AnimatedBackgroundProps {
  currentBackground: Background;
  nextBackground: Background | null;
  isChanging: boolean;
  mousePosition: { x: number; y: number };
  windowSize: { width: number; height: number };
}

export default function AnimatedBackground({
  currentBackground,
  nextBackground,
  isChanging,
  mousePosition,
  windowSize,
}: AnimatedBackgroundProps) {
  const getBackgroundTransform = () => {
    if (windowSize.width === 0) return "translate(0px, 0px)";

    const deadZoneX = windowSize.width * 0.25;
    const deadZoneY = windowSize.height * 0.25;

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

  return (
    <>
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
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute -inset-[10%] z-0 transition-transform duration-500 ease-out will-change-transform"
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
    </>
  );
}
