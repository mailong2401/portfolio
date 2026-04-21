import LiquidGlass from "liquid-glass-react";

const menuItems = ["Home", "About", "Blogs", "Projects", "Tools"];

export default function Header() {


  return (
    <div
    >
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
        }}
      >
        <div className="flex items-center justify-center gap-8 text-sm">
          {menuItems.map((item, idx) => (
            <a
              key={idx}
              href="#"
              className="text-white hover:text-gray-200 transition-colors duration-200 px-2 py-1"
              style={{
                textDecoration: 'none',
                fontWeight: 500,
                letterSpacing: '0.5px'
              }}
            >
              {item}
            </a>
          ))}
        </div>
      </LiquidGlass>
    </div>
  );
}
