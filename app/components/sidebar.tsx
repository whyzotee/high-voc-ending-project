"use client";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import supabase from "@/app/supabase";
import { Button } from "@nextui-org/react";
import file_outline from "heroicons/24/outline/folder.svg";
import home_outline from "heroicons/24/outline/home.svg";

export default function Sidebar() {
  const router = useRouter();
  const pathName = usePathname();

  if (pathName === "/auth/signin" || pathName === "/stream") return;

  return (
    <div className="sidebar min-h-screen w-fit flex flex-col gap-8 bg-white  sticky p-1">
      <Image
        src="/images/elec_logo.png"
        alt="elec_logo"
        height={80}
        width={80}
      />
      <div className="w-full flex flex-col p-4 gap-4 items-center">
        <button onClick={() => router.push("/")}>
          <div
            className={
              (pathName === "/" ? "bg-[#2FA8FF] shadow-md " : "") +
              " p-3 rounded-xl transition-al"
            }
          >
            <Image
              src={home_outline}
              alt="home"
              height={30}
              width={30}
              className={pathName === "/" ? "invert" : "" + " transition-all"}
            />
          </div>
        </button>

        <button onClick={() => router.push("/file")}>
          <div
            className={
              (pathName === "/file" ? "bg-[#2FA8FF] shadow-md " : "") +
              "p-3 rounded-xl transition-all"
            }
          >
            <Image
              src={file_outline}
              alt="file_outline"
              height={30}
              width={30}
              className={
                pathName === "/file" ? "invert" : "" + " transition-all"
              }
            />
          </div>
        </button>
      </div>
    </div>
  );
}
