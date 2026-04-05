"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Palette } from "lucide-react";

const backgrounds = [
  {
    id: 1,
    name: "Anime",
    url: "https://4kwallpapers.com/images/walls/thumbs_2t/14938.jpg",
    gradient: "from-purple-900/30 to-cyan-900/30",
  },
  {
    id: 2,
    name: "Mountain",
    url: "https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    gradient: "from-blue-900/30 to-emerald-900/30",
  },
  {
    id: 3,
    name: "Sunset",
    url: "https://images.pexels.com/photos/189349/pexels-photo-189349.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    gradient: "from-orange-900/30 to-red-900/30",
  },
  {
    id: 4,
    name: "Ocean",
    url: "https://images.pexels.com/photos/2387873/pexels-photo-2387873.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    gradient: "from-teal-900/30 to-blue-900/30",
  },
  {
    id: 5,
    name: "Forest",
    url: "https://images.pexels.com/photos/957024/forest-trees-perspective-bright-957024.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop",
    gradient: "from-green-900/30 to-emerald-900/30",
  },
];

export default function FloatingBackgroundSwitcher({
  onBackgroundChange,
}: {
  onBackgroundChange: (url: string, gradient: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBg, setSelectedBg] = useState(backgrounds[0]);
  const [hoveredBg, setHoveredBg] = useState<number | null>(null);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 bg-white/10 backdrop-blur-sm rounded-full p-4 shadow-2xl border border-white/20 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <Palette className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
      </motion.button>

      {/* Floating Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 20 }}
              className="fixed bottom-28 right-8 z-50 w-80 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-4"
            >
              <div className="flex items-center justify-between mb-4 px-2">
                <h3 className="text-white font-semibold text-lg">
                  Background Gallery
                </h3>
              </div>

              <div className="space-y-2">
                {backgrounds.map((bg) => (
                  <motion.button
                    key={bg.id}
                    onClick={() => {
                      setSelectedBg(bg);
                      onBackgroundChange(bg.url, bg.gradient);
                      setIsOpen(false);
                    }}
                    onHoverStart={() => setHoveredBg(bg.id)}
                    onHoverEnd={() => setHoveredBg(null)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                      selectedBg.id === bg.id
                        ? "bg-white/20 border border-white/30"
                        : "bg-white/5 hover:bg-white/15"
                    }`}
                    whileHover={{ x: 5 }}
                  >
                    <span className="text-white flex-1 text-left">
                      {bg.name}
                    </span>
                    {selectedBg.id === bg.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-2 h-2 rounded-full bg-green-400"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
