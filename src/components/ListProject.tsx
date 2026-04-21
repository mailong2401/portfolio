import LiquidGlass from "liquid-glass-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ListProject() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
    };

    check(); // chạy lần đầu
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
  return (<LiquidGlass
    displacementScale={50}
    blurAmount={0.2}
    saturation={140}
    aberrationIntensity={2}
    elasticity={0}
    cornerRadius={32}
    mode="standard"
    style={{
      position: "absolute",
      top: isMobile ? "100%" : "50%",
      left: "50%",
    }}
  >
    <div className="flex flex-col">
      <h1 className="text-4xl font-bold text-center pb-6 pt-2">My Recent Works</h1>
      <div className="flex flex-col md:flex-row gap-10">
        {projects.map((project) => (
          <div
            key={project.id}
            className="relative flex flex-col gap-5 bg-white/10 p-10 rounded-2xl w-96 border border-transparent transition-all duration-300 hover:border-white hover:shadow-[0_0_20px_rgba(59,130,246,0.6)]"
          >
            <h1 className="text-xl text-center">{project.title}</h1>
            <div className="relative w-full h-[150px] overflow-hidden rounded-2xl">
              <Image
                src={project.image}
                alt="project image"
                fill
                className="object-cover cursor-pointer"
              />
            </div>

            <p className="font-medium text-sm">{project.desc}</p>

            <div className="flex gap-5">
              {project.tech.map((t) => (
                <div key={t} className="bg-white/20 rounded-2xl p-2">
                  <p className="text-xs">{t}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </LiquidGlass>)
}
