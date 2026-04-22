import LiquidGlass from "liquid-glass-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function ListProject() {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
    };

    check();
    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Cartton Shell",
      image: "/images/projects/cartoon-shell_1.png",
      desc: "Cartoon Shell is a modern Wayland panel built entirely with QuickShell (QML) specifically for Hyprland window manager.",
      tech: ["Qml", "Python"],
    },
    {
      id: 2,
      title: "Billard Manager",
      image: "/images/projects/billiard_1.png",
      desc: "Website quản lí bida hiện đại realtime dành cho doanh nghiệp lớn",
      tech: ["Nestjs", "Nodejs", "Postgres"],
    },
    {
      id: 3,
      title: "Flycam Hitek",
      image: "/images/projects/hitek_flycam.png",
      desc: "Website giới thiệu Hitek Flycam",
      tech: ["React", "Nodejs", "supabase"],
    },
  ];

  // Container variants cho stagger effect
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  // Card variants cho từng project
  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
      rotateX: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      }
    }
  };

  // Title variants
  const titleVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 15,
        delay: 0.2,
      }
    }
  };

  // Tech tag variants
  const tagVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
        delay: 0.5 + (i * 0.1),
      }
    })
  };

  // Image hover variants
  const imageVariants: Variants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  return (
    <LiquidGlass
      displacementScale={50}
      blurAmount={0.2}
      saturation={140}
      aberrationIntensity={2}
      elasticity={0.2}
      cornerRadius={32}
      mode="standard"
      style={{
        position: "absolute",
        top: isMobile ? "5%" : "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="flex flex-col">
        <motion.h1
          className="text-4xl font-bold text-center pb-6 pt-2"
          variants={titleVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            initial={{ backgroundSize: "0% 100%" }}
            animate={{ backgroundSize: "100% 100%" }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              background: "linear-gradient(90deg, white 0%, white 100%)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "0% 100%",
              backgroundPosition: "0 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            My Recent Works
          </motion.span>
        </motion.h1>

        <motion.div
          className="flex flex-col md:flex-row gap-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{
                y: -10,
                transition: { type: "spring", stiffness: 300 }
              }}
              onHoverStart={() => setHoveredId(project.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="relative flex flex-col gap-5 bg-white/10 p-10 rounded-2xl w-96 border border-transparent transition-all duration-300"
              style={{
                backdropFilter: "blur(10px)",
              }}
            >
              {/* Animated border gradient on hover */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: hoveredId === project.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "absolute",
                  inset: -2,
                  borderRadius: 18,
                  padding: 2,
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)",
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  WebkitMaskComposite: "xor",
                  pointerEvents: "none",
                }}
              />

              {/* Glow effect */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: hoveredId === project.id ? 0.15 : 0,
                }}
                style={{
                  position: "absolute",
                  inset: -20,
                  background: "radial-gradient(circle at center, #3b82f6, transparent)",
                  filter: "blur(20px)",
                  pointerEvents: "none",
                }}
              />

              <motion.h1
                className="text-xl text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {project.title}
              </motion.h1>

              <motion.div
                className="relative w-full h-[150px] overflow-hidden rounded-2xl"
                whileHover="hover"
                initial="rest"
                animate="rest"
              >
                <motion.div
                  variants={imageVariants}
                  style={{ width: "100%", height: "100%" }}
                >
                  <Image
                    src={project.image}
                    alt="project image"
                    fill
                    className="object-cover cursor-pointer"
                  />
                </motion.div>

                {/* Overlay on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    padding: "1rem",
                  }}
                >
                  <motion.span
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    style={{
                      color: "white",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                    }}
                  >
                    View Project →
                  </motion.span>
                </motion.div>
              </motion.div>

              <motion.p
                className="font-medium text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 + (index * 0.15) }}
              >
                {project.desc}
              </motion.p>

              <motion.div className="flex gap-5">
                {project.tech.map((t, i) => (
                  <motion.div
                    key={t}
                    className="bg-white/20 rounded-2xl p-2"
                    custom={i}
                    variants={tagVariants}
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "rgba(255,255,255,0.3)",
                      transition: { type: "spring", stiffness: 400 }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <p className="text-xs">{t}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </LiquidGlass>
  );
}
