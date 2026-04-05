"use client";

import { useState, useRef, useEffect } from "react";
import LiquidGlass from "liquid-glass-react";

export default function ClientComponent() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [scroll, setScroll] = useState(0);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  const menuItems = ["Home", "Features", "Technology", "Pricing", "Contact"];

  // Chỉ chạy ở client
  useEffect(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const getBackgroundTransform = () => {
    // Kiểm tra windowSize đã được set hay chưa
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

  const scrollingOverBrightSection = scroll > 230 && scroll < 500;

  return (
    <div
      className="relative w-full h-full overflow-auto"
      ref={containerRef}
      onScroll={handleScroll}
    >
      {/* Phần còn lại giữ nguyên code cũ của bạn */}
      <div className="absolute inset-0 z-0 w-full h-full">
        <div
          className="absolute -inset-[10%] z-0 transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform: getBackgroundTransform(),
            transitionTimingFunction: "cubic-bezier(0.2, 0.9, 0.3, 1.1)",
          }}
        >
          <img
            src="https://images2.alphacoders.com/687/thumb-1920-687703.png"
            className="absolute inset-0 w-full h-full object-cover"
            alt="Background"
          />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-transparent to-cyan-900/30"></div>
        </div>

        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(255,255,255,0.1)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <LiquidGlass
        displacementScale={100}
        blurAmount={0.2}
        saturation={140}
        aberrationIntensity={2}
        elasticity={0.2}
        cornerRadius={32}
        mouseContainer={containerRef}
        overLight={scrollingOverBrightSection}
        mode="standard"
        style={{
          position: "fixed",
          top: "25%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 20,
        }}
      >
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item, idx) => (
            <a
              key={idx}
              href="#"
              className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
      </LiquidGlass>
    </div>
  );
}
