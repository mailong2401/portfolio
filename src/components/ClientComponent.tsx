
import { useState, useRef, useEffect, useCallback } from "react";
import Header from "@/components/layout/Header";
import FloatingBackgroundSwitcher from "@/components/FloatingBackgroundSwitcher";
import AnimatedBackground from "@/components/AnimatedBackground";
import UserCard from "@/components/UserCard";
import { motion } from "framer-motion";
import ListProject from "./ListProject";
import ToggleTranslate from "./layout/toggle-translate";
import ProfessionalSkills from "./professional-skills";
import ProgrammingLanguage from "./skills/programming-language";
import Frameworks from "./skills/frameworks";
import ToolsDB from "./skills/tools-db";

interface Background {
  url: string;
  gradient: string;
}

export default function ClientComponent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isBgLoaded, setIsBgLoaded] = useState(false);
  const [currentBackground, setCurrentBackground] = useState<Background>({
    url: "/images/wallpapers/wall_1.jpg",
    gradient: "from-green-900/30 to-cyan-900/30",
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
        onLoadComplete={() => setIsBgLoaded(true)}
        windowSize={windowSize}
      />


      <div className=" flex flex-col pt-100 pl-10 pr-10 md:pt-30">

        <div className="flex flex-col md:flex-row   h-500 md:h-150 gap-200 md:gap-10">

          <div className="relative   w-full h-[500px] md:w-[400px] md:h-full p-20">
            {isBgLoaded && <UserCard />}

          </div>
          <div className="relative w-full h-[600px] ">
            {isBgLoaded && <ListProject />}

          </div>
        </div>
        <div className="h-30" />
        <div className=" relative w-full h-90 md:h-50">
          {isBgLoaded && <ProfessionalSkills />}
        </div>
        <div className="flex flex-col md:flex-row w-full h-380 md:h-100 gap-50 justify-center">
          <div className="relative h-full w-full ">
            {isBgLoaded && <ProgrammingLanguage />}
          </div>
          <div className="relative h-full w-full ">
            {isBgLoaded && <Frameworks />}
          </div>
          <div className="relative h-full w-full ">
            {isBgLoaded && <ToolsDB />}
          </div>

        </div>
        <div className="relative w-full h-100">
        </div>
      </div>

      {isBgLoaded &&
        <FloatingBackgroundSwitcher
          onBackgroundChange={handleBackgroundChange}
        />
      }
      {isBgLoaded && <Header />}
      {isBgLoaded && <ToggleTranslate />}
    </div >
  );
}
