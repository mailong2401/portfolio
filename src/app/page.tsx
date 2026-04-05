"use client";

import { Geist } from "next/font/google";
import dynamic from "next/dynamic";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Import component có sử dụng window mà không SSR
const ClientComponent = dynamic(() => import("../components/ClientComponent"), {
  ssr: false,
});

export default function Home() {
  return (
    <div
      className={`${geistSans.className} w-full h-screen overflow-hidden font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900`}
    >
      <ClientComponent />
    </div>
  );
}
