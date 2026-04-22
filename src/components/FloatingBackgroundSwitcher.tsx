import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Palette,
  ChevronLeft,
  ChevronRight,
  Loader2,
  X,
  Sparkles,
  ImageIcon
} from "lucide-react";
import LiquidGlass from "liquid-glass-react";

const backgrounds = [
  {
    id: 1,
    name: "anime",
    url: "/images/wallpapers/wall_1.jpg",
    gradient: "from-green-900/30 to-emerald-900/30",
    preview: "/images/wallpapers/wall_1.jpg",
  },
  {
    id: 2,
    name: "Mountain Lake",
    url: "/images/wallpapers/wall_2.jpg",
    gradient: "from-green-900/30 to-emerald-900/30",
    preview: "/images/wallpapers/wall_2.jpg",
  },
  {
    id: 3,
    name: "Forest Path",
    url: "/images/wallpapers/wall_3.jpeg",
    gradient: "from-blue-900/30 to-emerald-900/30",
    preview: "/images/wallpapers/wall_3.jpeg"
  },
  {
    id: 4,
    name: "Sunset Beach",
    url: "/images/wallpapers/wall_4.jpg",
    gradient: "from-orange-900/30 to-red-900/30",
    preview: "/images/wallpapers/wall_4.jpg"
  },
  {
    id: 5,
    name: "City Lights",
    url: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    gradient: "from-teal-900/30 to-blue-900/30",
    preview: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
  },
  {
    id: 6,
    name: "Green Forest",
    url: "https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    gradient: "from-green-900/30 to-emerald-900/30",
    preview: "https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
  },
];

export default function FloatingBackgroundSwitcher({
  onBackgroundChange,
}: {
  onBackgroundChange: (url: string, gradient: string) => Promise<void> | void;
}) {
  const [selectedBg, setSelectedBg] = useState(backgrounds[0]);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [loadingBgId, setLoadingBgId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [openSwitcher, setOpenSwitcher] = useState(false);
  const [hoveredBgId, setHoveredBgId] = useState<number | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const itemsPerPage = isMobile ? 1 : 4;

  const preloadImage = (url: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      img.src = url;
    });
  };

  const handleBackgroundClick = async (bg: typeof backgrounds[0]) => {
    if (loadingBgId !== null) return;

    setLoadingBgId(bg.id);

    try {
      await preloadImage(bg.url);
      await onBackgroundChange(bg.url, bg.gradient);
      setSelectedBg(bg);
    } catch (error) {
      console.error("Failed to load background:", error);
    } finally {
      setLoadingBgId(null);
    }
  };

  const nextSlide = () => {
    if (scrollIndex + itemsPerPage < backgrounds.length) {
      setScrollIndex(scrollIndex + 1);
    }
  };

  const prevSlide = () => {
    if (scrollIndex > 0) {
      setScrollIndex(scrollIndex - 1);
    }
  };

  const visibleBackgrounds = backgrounds.slice(
    scrollIndex,
    scrollIndex + itemsPerPage,
  );

  const childVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  const imageCardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        type: "spring",
        stiffness: 300,
        damping: 20,
      }
    }),
    exit: { opacity: 0, scale: 0.8, y: -20 }
  };

  return (
    <>
      {!openSwitcher && (
        <LiquidGlass
          displacementScale={50}
          blurAmount={0.2}
          saturation={140}
          aberrationIntensity={2}
          elasticity={0}
          onClick={() => setOpenSwitcher(true)}
          cornerRadius={32}
          mode="standard"
          style={{
            position: "fixed",
            top: isMobile ? "92%" : "88%",
            left: isMobile ? "12%" : "5%",
          }}
        >
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatDelay: 3,
              ease: "easeInOut"
            }}
          >
            <Palette className="h-6 w-6 text-white" />
          </motion.div>


          {/* Sparkle icon on hover */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileHover={{ opacity: 1, scale: 1 }}
            style={{
              position: "absolute",
              top: -5,
              right: -5,
            }}
          >
            <Sparkles className="w-4 h-4 text-yellow-300" />
          </motion.div>
        </LiquidGlass>
      )}

      {openSwitcher && (

        <LiquidGlass
          displacementScale={100}
          blurAmount={0.3}
          saturation={140}
          aberrationIntensity={2}
          elasticity={0.2}
          cornerRadius={isMobile ? 24 : 40}
          mode="standard"
          style={{
            position: "fixed",
            top: isMobile ? "92%" : "88%",
            left: isMobile ? "50%" : "25%",
          }}
        >
          <div className="flex items-center gap-2 md:gap-6">
            {/* Title with icon */}
            <motion.div
              variants={childVariants}
              className="flex items-center gap-2 md:gap-3 pr-2 md:pr-6 border-r border-white/20"
            >
              <motion.div
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <ImageIcon className="w-4 h-4 md:w-5 md:h-5 text-white" />
              </motion.div>
              <span className="text-white text-xs md:text-sm font-medium hidden md:block">
                Wallpapers
              </span>
            </motion.div>

            {/* Previous Button */}
            <motion.button
              variants={childVariants}
              onClick={prevSlide}
              disabled={scrollIndex === 0 || loadingBgId !== null}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-1 md:p-2 rounded-full transition-all duration-300 ${scrollIndex === 0 || loadingBgId !== null
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-white/20 cursor-pointer"
                }`}
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </motion.button>

            {/* Image Gallery */}
            <div className="flex gap-2 md:gap-4">
              <AnimatePresence mode="popLayout">
                {visibleBackgrounds.map((bg, index) => (
                  <motion.button
                    key={bg.id}
                    layoutId={`bg-${bg.id}`}
                    variants={imageCardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    custom={index}
                    onClick={() => handleBackgroundClick(bg)}
                    onHoverStart={() => setHoveredBgId(bg.id)}
                    onHoverEnd={() => setHoveredBgId(null)}
                    whileHover={{
                      scale: loadingBgId === null ? 1.1 : 1,
                      y: loadingBgId === null ? -8 : 0,
                    }}
                    whileTap={{ scale: loadingBgId === null ? 0.95 : 1 }}
                    className="relative group"
                    disabled={loadingBgId !== null}
                  >
                    <motion.div
                      className={`relative rounded-xl overflow-hidden transition-all duration-300 ${selectedBg.id === bg.id
                        ? "ring-2 ring-cyan-400 ring-offset-2 ring-offset-black/20"
                        : ""
                        } ${loadingBgId === bg.id ? "opacity-50" : ""}`}
                      animate={{
                        boxShadow: hoveredBgId === bg.id
                          ? "0 0 20px rgba(6, 182, 212, 0.5)"
                          : "0 0 0px rgba(6, 182, 212, 0)"
                      }}
                    >
                      {/* Image */}
                      <div className="relative w-12 h-8 md:w-20 md:h-14">
                        <img
                          src={bg.preview}
                          alt={bg.name}
                          className="w-full h-full object-cover"
                        />

                        {/* Gradient Overlay */}
                        <div className={`absolute inset-0 bg-gradient-to-t ${bg.gradient} opacity-60`} />

                        {/* Selected indicator */}
                      </div>

                      {/* Loading Overlay */}
                      {loadingBgId === bg.id && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 bg-black/50 flex items-center justify-center"
                        >
                          <Loader2 className="w-4 h-4 md:w-6 md:h-6 text-white animate-spin" />
                        </motion.div>
                      )}

                      {/* Hover Effects */}
                      {loadingBgId === null && (
                        <>
                          {/* Shine effect */}
                          <motion.div
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.5 }}
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              width: "100%",
                              height: "100%",
                              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                              transform: "skewX(-20deg)",
                            }}
                          />

                          {/* Name tooltip on hover */}
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{
                              opacity: hoveredBgId === bg.id ? 1 : 0,
                              y: hoveredBgId === bg.id ? 0 : 10,
                            }}
                            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                          >
                            <span className="text-white text-xs bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm">
                              {bg.name}
                            </span>
                          </motion.div>
                        </>
                      )}
                    </motion.div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>

            {/* Next Button */}
            <motion.button
              variants={childVariants}
              onClick={nextSlide}
              disabled={
                scrollIndex + itemsPerPage >= backgrounds.length ||
                loadingBgId !== null
              }
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-1 md:p-2 rounded-full transition-all duration-300 ${scrollIndex + itemsPerPage >= backgrounds.length ||
                loadingBgId !== null
                ? "opacity-30 cursor-not-allowed"
                : "hover:bg-white/20 cursor-pointer"
                }`}
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </motion.button>

            {/* Close Button */}
            <motion.button
              variants={childVariants}
              onClick={() => setOpenSwitcher(false)}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="p-1 md:p-2 rounded-full hover:bg-white/20 transition-all duration-300 ml-1 md:ml-2"
            >
              <X className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </motion.button>
          </div>

          {/* Progress indicator */}
          <motion.div
            className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1"
            variants={childVariants}
          >
            {Array.from({ length: Math.ceil(backgrounds.length / itemsPerPage) }).map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 rounded-full bg-white/30"
                animate={{
                  scale: Math.floor(scrollIndex / itemsPerPage) === i ? 1.5 : 1,
                  opacity: Math.floor(scrollIndex / itemsPerPage) === i ? 1 : 0.3,
                }}
              />
            ))}
          </motion.div>
        </LiquidGlass>
      )}
    </>
  );
}
