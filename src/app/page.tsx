// app/page.tsx (Server Component)
import dynamic from "next/dynamic";
import { Geist } from "next/font/google";
import ClientComponent from "@/components/ClientComponent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} w-full h-screen overflow-hidden font-[family-name:var(--font-geist-sans)] bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900`}
    >
      <ClientComponent />
    </div>
  );
}
