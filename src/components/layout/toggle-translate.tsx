import LiquidGlass from "liquid-glass-react";
import { Languages, X } from "lucide-react";
import { useState } from "react";

const languages = [
  { id: 1, name: "Tiếng Việt" },
  { id: 2, name: "English" },
  { id: 3, name: "한국어" },
];

export default function ToggleTranslate() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      {!opened && (
        <LiquidGlass
          displacementScale={100}
          blurAmount={0.2}
          saturation={140}
          aberrationIntensity={2}
          elasticity={0.2}
          mode="standard"
          padding="8px 16px"
          style={{
            position: "fixed",
            top: "10%",
            left: "90%",
          }}
        >
          <div
            className="flex gap-2 w-auto h-auto p-2 cursor-pointer hover:bg-white/10 rounded-2xl"
            onClick={() => setOpened(true)}
          >
            <Languages className="w-6 h-6" />
            <p className="font-bold text-lg">VI</p>
          </div>
        </LiquidGlass>
      )}

      {/* 🔹 PANEL */}
      {opened && (
        <LiquidGlass
          displacementScale={80}
          blurAmount={0.2}
          saturation={140}
          aberrationIntensity={1}
          elasticity={0}
          cornerRadius={32}
          mode="standard"
          style={{
            position: "fixed",
            top: "15%",
            left: "90%",
          }}
        >
          <div className="flex flex-col gap-3 min-w-[150px]">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <Languages className="w-5 h-5" />
                <span>Language</span>
              </div>

              <button onClick={() => setOpened(false)}>
                <X className="w-5 h-5 cursor-pointer" />
              </button>
            </div>

            <div className="w-full h-[1px] bg-white/30" />

            {/* List */}
            <ul className="space-y-2">
              {languages.map((lang) => (
                <li
                  key={lang.id}
                  className="hover:bg-white/10 cursor-pointer rounded-xl p-2 text-center transition"
                >
                  {lang.name}
                </li>
              ))}
            </ul>
          </div>
        </LiquidGlass>
      )}
    </>
  );
}
