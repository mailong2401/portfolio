
import { useRef, useEffect, useState } from "react";
import LiquidGlass from "liquid-glass-react";

interface HeaderProps {
  mousePosition: { x: number; y: number };
  windowSize: { width: number; height: number };
}

const menuItems = ["Home", "About", "Blogs", "Projects", "Tools"];

export default function Header({ mousePosition, windowSize }: HeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [headerTransform, setHeaderTransform] = useState("translate(0px, 0px)");
  const [top, setTop] = useState("10%");
  const [left, setLeft] = useState("50%");
  const [speeds] = useState(30);

  // Tính toán transform cho header (di chuyển nhẹ hơn background)
  useEffect(() => {
    if (windowSize.width === 0) return;

    const deadZoneX = windowSize.width * 0.3;
    const deadZoneY = windowSize.height * 0.3;

    const leftThreshold = deadZoneX;
    const rightThreshold = windowSize.width - deadZoneX;
    const topThreshold = deadZoneY;
    const bottomThreshold = windowSize.height - deadZoneY;

    let moveX = 0;
    let moveY = 0;

    const maxMoveX = windowSize.width * 0.03;
    const maxMoveY = windowSize.height * 0.03;

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
    setTop(`${10 - moveY / speeds}%`);
    setLeft(`${50 - moveX / speeds}%`);
  }, [mousePosition, windowSize]);

  return (
    <LiquidGlass
      displacementScale={50}
      blurAmount={0.2}
      saturation={140}
      aberrationIntensity={2}
      elasticity={0}
      cornerRadius={32}
      mouseContainer={containerRef}
      mode="standard"
      style={{
        position: "fixed",
        top: top,
        left: left,
      }}
    >
      <div className={`flex items-center justify-center gap-8 md:gap-8 text-sm`}>
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
  );
}
