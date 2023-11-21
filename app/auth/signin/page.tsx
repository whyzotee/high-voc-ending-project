"use client";
import Image from "next/image";
import Swal from "sweetalert2";
import supabase from "@/app/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (email.length == 0 || password.length == 0) {
      return Swal.fire({
        title: "ล้มเหลว",
        text: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้องโปรดลองใหม่อีกครั้ง",
        icon: "error",
        confirmButtonText: "ตลลง",
        confirmButtonColor: "#5CD1FF",
      });
    }

    let _auth = await supabase.auth;

    _auth.signInWithPassword({ email, password }).then((res) => {
      if (res.error != null) {
        return Swal.fire({
          title: "ล้มเหลว",
          text: res.error.message,
          icon: "error",
          confirmButtonText: "ตลลง",
          confirmButtonColor: "#5CD1FF",
        });
      }

      Swal.fire({
        title: "สำเร็จ",
        text: "เข้าสู่ระบบเสร็จสิ้น กด ตลลง เพื่อดำเนินการต่อ",
        icon: "success",
        confirmButtonText: "ตลลง",
        confirmButtonColor: "#5CD1FF",
      }).then((result) => {
        router.replace("/");
      });

      router.refresh();
    });
  };

  return (
    <main className="relative h-screen w-full flex">
      <div className="h-full w-1/2 flex flex-col gap-4 justify-center items-center bg-white text-center border-[2.5px] border-black rounded-md z-50">
        <Image
          src="/images/elec_logo.png"
          alt="elec_logo"
          height={150}
          width={150}
        />
        <div>
          <h1 className="text-6xl ">ยินดีต้อนรับ</h1>
          <p className="text-3xl  text-[#7E7E7E]">
            โปรดเข้าสู่ระบบเพื่อใช้บริการของเรา
          </p>
        </div>
        <div className="text-left w-[80%]">
          <form action="" method="GET">
            <div className="mb-4">
              <label className="text-2xl text-gray-700 font-bold mb-4">
                Email
              </label>
              <input
                className="text-2xl border-black border-[2.5px] rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="mb-4">
              <label className="text-2xl text-gray-700 font-bold mb-4">
                Password
              </label>
              <input
                className="text-2xl border-black border-[2.5px] rounded-md w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
          </form>
        </div>
        <button
          className="w-[80%] border-black border-[2.5px] rounded-md text-xl p-2 bg-[#5CD1FF] text-white"
          onClick={handleSignIn}
        >
          Continue
        </button>
      </div>
      <div className="absolute h-full w-[51%] right-0">
        <div className="relative h-full w-full">
          <Image
            src="/images/login_banner.jpg"
            alt="elec_logo"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </main>
  );
}
