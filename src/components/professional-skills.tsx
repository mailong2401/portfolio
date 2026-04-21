import LiquidGlass from "liquid-glass-react";

export default function ProfessionalSkills() {
  return (<LiquidGlass
    displacementScale={50}
    blurAmount={0.2}
    saturation={140}
    aberrationIntensity={2}
    elasticity={0.2}
    cornerRadius={32}
    mode="standard"
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
    }}
  >
    <div className="flex flex-col items-center gap-4">
      <div className="px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 "
      >
        <p className="text-sm font-medium text-cyan-300 text-center">
          Tech Stack
        </p>
      </div >
      <h1 className="text-4xl font-bold">Professional Skills</h1>

    </div>
  </LiquidGlass >)
}
