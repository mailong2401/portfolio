import LiquidGlass from "liquid-glass-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const menuItems = ["Home", "About", "Blogs", "Projects", "Tools"];

export default function Header() {
  const [show, setShow] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
        setTimeout(() => setShow(false), 300);
      } else {
        setShow(true);
        setTimeout(() => setIsVisible(true), 50);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Variants cho container
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      }
    }
  };

  // Variants cho từng menu item
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -20,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      }
    },
    exit: {
      opacity: 0,
      y: 20,
      scale: 0.8,
      transition: {
        duration: 0.2,
      }
    }
  };

  // Variants cho hover effect
  const hoverVariants: Variants = {
    rest: {
      scale: 1,
      y: 0,
    },
    hover: {
      scale: 1.1,
      y: -2,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      }
    }
  };

  // Variants cho underline effect
  const underlineVariants: Variants = {
    rest: {
      scaleX: 0,
      opacity: 0,
    },
    hover: {
      scaleX: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      }
    }
  };

  return (
    <>
      {!show && (
        <LiquidGlass
          displacementScale={150}
          blurAmount={0.4}
          saturation={140}
          aberrationIntensity={2}
          elasticity={0.2}
          cornerRadius={32}
          mode="standard"
          padding="12px 24px"
          style={{
            position: "fixed",
            top: "1%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <div className="w-50 h-1"></div>
        </LiquidGlass>
      )}

      {show && (

        <LiquidGlass
          displacementScale={100}
          blurAmount={0.2}
          saturation={140}
          aberrationIntensity={2}
          elasticity={0.2}
          cornerRadius={32}
          mode="standard"
          padding="12px 24px"
          style={{
            position: "fixed",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <motion.div
            className="flex items-center justify-center gap-8 text-sm"
            variants={containerVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "exit"}
          >
            {menuItems.map((item, idx) => (
              <motion.a
                key={idx}
                href="#"
                variants={itemVariants}
                initial="rest"
                whileHover="hover"
                animate="rest"
                style={{
                  textDecoration: 'none',
                  fontWeight: 500,
                  letterSpacing: '0.5px',
                  position: 'relative',
                  cursor: 'pointer',
                }}
              >
                <motion.span
                  variants={hoverVariants}
                  style={{
                    display: 'inline-block',
                    color: 'white',
                    textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                  }}
                  className="px-3 py-1.5"
                >
                  {item}
                </motion.span>

                {/* Underline effect */}
                <motion.div
                  variants={underlineVariants}
                  style={{
                    position: 'absolute',
                    bottom: -4,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: 'linear-gradient(90deg, transparent, white, transparent)',
                    borderRadius: 2,
                    transformOrigin: 'center',
                  }}
                />

                {/* Glow effect on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.15 }}
                  style={{
                    position: 'absolute',
                    inset: -8,
                    background: 'radial-gradient(circle at center, white, transparent)',
                    borderRadius: 20,
                    filter: 'blur(8px)',
                    zIndex: -1,
                  }}
                />
              </motion.a>
            ))}
          </motion.div>
        </LiquidGlass>
      )}
    </>
  );
}
