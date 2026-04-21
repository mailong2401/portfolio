
import { useRef, } from "react";
import LiquidGlass from "liquid-glass-react";
import { motion } from "framer-motion";


export default function UserCard() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Thông tin user
  const userInfo = {
    name: "Mai Dương Long",
    country: "Việt Nam",
    role: "Developer",
    avatar: "https://avatars.githubusercontent.com/u/111423869?v=4",
    birthday: "24/01/2005",
    socials: {
      github: "https://github.com/mailong2401",
      facebook: "https://facebook.com/mai.duong.long",
      reddit: "https://reddit.com/user/username",
      tiktok: "https://tiktok.com/@mailong2401",
    },
  };

  // Social icons component
  const SocialIcon = ({
    platform,
    href,
    color,
  }: {
    platform: string;
    href: string;
    color: string;
  }) => (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative group"
    >
      <div
        className={`absolute inset-0 rounded-full blur-xl opacity-0  transition-opacity duration-300 ${color}`}
      />
      <div className="relative w-10 h-10 rounded-full bg-white/10  transition-all duration-300 flex items-center justify-center backdrop-blur-sm border border-white/10">
        {platform === "github" && (
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026.8-.223 1.65-.334 2.5-.334.85 0 1.7.111 2.5.334 1.91-1.296 2.75-1.026 2.75-1.026.544 1.378.201 2.397.098 2.65.64.7 1.029 1.595 1.029 2.688 0 3.846-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              clipRule="evenodd"
            />
          </svg>
        )}
        {platform === "facebook" && (
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.9h3.4l-.406 3.667h-2.994v7.98h-3.87z" />
          </svg>
        )}
        {platform === "reddit" && (
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.26.82-.58 0-.287-.01-1.05-.015-2.06-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.085 1.838 1.237 1.838 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.303 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
        )}
        {platform === "tiktok" && (
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v3.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.76-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
          </svg>
        )}
      </div>
    </motion.a>
  );

  return (
    <LiquidGlass
      displacementScale={100}
      blurAmount={0.2}
      saturation={140}
      aberrationIntensity={2}
      elasticity={0}
      cornerRadius={32}
      mouseContainer={containerRef}
      mode="standard"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
      }}
    >
      <div className="flex flex-col items-center gap-4">
        {/* Avatar với hiệu ứng glow */}
        <motion.div
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="relative"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 blur-xl opacity-60 animate-pulse" />
          <img
            src={userInfo.avatar}
            alt={userInfo.name}
            className="w-28 h-28 rounded-full object-cover border-2 border-white/30 relative z-10"
          />
        </motion.div>

        {/* Tên */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-white tracking-tight"
        >
          {userInfo.name}
        </motion.h2>

        {/* Role với badge gradient */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30"
        >
          <span className="text-sm font-medium text-cyan-300">
            {userInfo.role}
          </span>
        </motion.div>

        {/* Thông tin chi tiết */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full space-y-2 mt-2"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300">Quốc gia</span>
            <span className="text-white font-medium">{userInfo.country}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300">Ngày sinh</span>
            <span className="text-white font-medium">{userInfo.birthday}</span>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-1" />

        {/* Social Media Icons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4 justify-center w-full"
        >
          <SocialIcon
            platform="github"
            href={userInfo.socials.github}
            color="bg-gray-500"
          />
          <SocialIcon
            platform="facebook"
            href={userInfo.socials.facebook}
            color="bg-blue-600"
          />
          <SocialIcon
            platform="reddit"
            href={userInfo.socials.reddit}
            color="bg-orange-600"
          />
          <SocialIcon
            platform="tiktok"
            href={userInfo.socials.tiktok}
            color="bg-black"
          />
        </motion.div>
      </div>
    </LiquidGlass>
  );
}
