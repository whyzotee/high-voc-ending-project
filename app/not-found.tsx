"use client";
import Link from "next/link";
import ParticlesEffect from "./components/particles_effect";

export default function NotFound() {
  return (
    <main className="relative h-screen w-full flex flex-col justify-center items-center text-white bg-[#252525]">
      <ParticlesEffect />
      <h1 className="text-3xl font-semibold">404 Not Found</h1>
      <p>ไม่พบหน้าที่คุณค้นหา</p>
      <br />

      <Link href="/">
        <button className="px-4 py-2 rounded-md text-[#252525] bg-[#FFDAB9] hover:bg-[#ffc99d] transition-colors">
          กลับหน้าหลัก
        </button>
      </Link>

      <p className="absolute w-fit text-black bg-white rounded-lg py-2 px-4 mx-auto my-8 bottom-0">
        เย็นนี้กินอะไรดี? , © 2023 All Rights Reserved
      </p>
    </main>
  );
}
