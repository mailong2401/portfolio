
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Palette,
  ChevronLeft,
  ChevronRight,
  Loader2,
  X
} from "lucide-react";
import LiquidGlass from "liquid-glass-react";

const backgrounds = [
  {
    id: 1,
    name: "anime",
    url: "/images/wallpapers/lamborghini.jpeg",
    gradient: "from-purple-900/30 to-cyan-900/30",
    preview: "/images/wallpapers/lamborghini.jpeg",
  },
  {
    id: 2,
    name: "Mountain Lake",
    url: "https://4kwallpapers.com/images/walls/thumbs_2t/14938.jpg",
    gradient: "from-purple-900/30 to-cyan-900/30",
    preview: "https://4kwallpapers.com/images/walls/thumbs_2t/14938.jpg",
  },
  {
    id: 3,
    name: "Forest Path",
    url: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    gradient: "from-blue-900/30 to-emerald-900/30",
    preview:
      "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Sunset Beach",
    url: "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    gradient: "from-orange-900/30 to-red-900/30",
    preview:
      "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
  },
  {
    id: 5,
    name: "City Lights",
    url: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    gradient: "from-teal-900/30 to-blue-900/30",
    preview:
      "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
  },
  {
    id: 6,
    name: "Green Forest",
    url: "https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    gradient: "from-green-900/30 to-emerald-900/30",
    preview:
      "https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
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

  const handleBackgroundClick = async (bg: (typeof backgrounds)[0]) => {
    if (loadingBgId !== null) return; // Đang load ảnh khác thì không cho click

    setLoadingBgId(bg.id);

    try {
      // Preload ảnh chất lượng cao trước khi chuyển
      await preloadImage(bg.url);

      // Sau khi load xong mới gọi callback
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

  return (
    <>
      {!openSwitcher && (
        <motion.button
          onClick={() => setOpenSwitcher(true)}
          className="flex items-center duration-300 transition-all cursor-pointer">
          <LiquidGlass
            displacementScale={50}
            blurAmount={0.2}
            saturation={140}
            aberrationIntensity={2}
            elasticity={0}
            cornerRadius={32}
            mode="standard"
            style={{
              position: "fixed",
              top: isMobile ? "95%" : "90%",
              left: isMobile ? "15%" : "6%",
            }}
          >

            <Palette className=" h-6 w-6" />
          </LiquidGlass >
        </motion.button>
      )
      }
      {
        openSwitcher && (
          <LiquidGlass
            displacementScale={100}
            blurAmount={0.2}
            saturation={140}
            aberrationIntensity={2}
            elasticity={0.2}
            cornerRadius={32}
            mode="standard"
            style={{
              position: "fixed",
              top: isMobile ? "95%" : "90%",
              left: isMobile ? "50%" : "23%",
            }
            }
          >
            <div className="flex items-center gap-4 px-4 py-2">
              {/* Title with icon */}
              <div className="flex items-center gap-2 pr-4 border-r border-white/20">
                <Palette className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-medium">Backgrounds</span>
              </div>

              {/* Navigation Buttons */}
              <motion.button
                onClick={prevSlide}
                disabled={scrollIndex === 0 || loadingBgId !== null}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-1 rounded-full transition-all duration-300 ${scrollIndex === 0 || loadingBgId !== null
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-white/20 cursor-pointer"
                  }`}
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </motion.button>

              {/* Horizontal Gallery */}
              <div className="flex gap-3 overflow-visible w-10 md:w-auto">
                {visibleBackgrounds.map((bg) => (
                  <motion.button
                    key={bg.id}
                    onClick={() => handleBackgroundClick(bg)}
                    whileHover={{
                      scale: loadingBgId === null ? 1.05 : 1,
                      y: loadingBgId === null ? -5 : 0,
                    }}
                    whileTap={{ scale: loadingBgId === null ? 0.98 : 1 }}
                    className="relative group"
                    disabled={loadingBgId !== null}
                  >
                    <div
                      className={`relative rounded-xl overflow-hidden transition-all duration-300 ${selectedBg.id === bg.id
                        ? "ring-2 ring-cyan-400 ring-offset-2 ring-offset-black/20"
                        : ""
                        } ${loadingBgId === bg.id ? "opacity-50" : ""}`}
                    >
                      {/* Image Preview */}
                      <img
                        src={bg.preview}
                        alt={bg.name}
                        className="w-15 h-8 md:w-24 md:h-16 object-cover"
                      />

                      {/* Gradient Overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${bg.gradient} opacity-60`}
                      />

                      {/* Loading Overlay */}
                      {loadingBgId === bg.id && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <Loader2 className="w-6 h-6 text-white animate-spin" />
                        </div>
                      )}

                      {/* Hover Glow Effect */}
                      {loadingBgId === null && (
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/20 group-hover:via-purple-500/20 group-hover:to-cyan-500/20 transition-all duration-500" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Navigation Buttons */}
              <motion.button
                onClick={nextSlide}
                disabled={
                  scrollIndex + itemsPerPage >= backgrounds.length ||
                  loadingBgId !== null
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-1 rounded-full transition-all duration-300 ${scrollIndex + itemsPerPage >= backgrounds.length ||
                  loadingBgId !== null
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-white/20 cursor-pointer"
                  }`}
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </motion.button>
              <button onClick={() => setOpenSwitcher(false)}
              ><X className="w-5 h-5" /></button>
            </div>
          </LiquidGlass >
        )
      }
    </>
  );
}
