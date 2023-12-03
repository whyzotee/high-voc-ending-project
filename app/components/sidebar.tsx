"use client";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import supabase from "@/app/supabase";
import { Button } from "@nextui-org/react";

export default function Sidebar() {
  const router = useRouter();
  const pathName = usePathname();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <div className="sidebar h-screen min-w-fit flex flex-col bg-white border-[2.5px] border-black rounded-md">
      <div className="flex p-2 items-center border-b-[2.5px] border-black">
        <Image
          src="/images/elec_logo.png"
          alt="elec_logo"
          height={80}
          width={80}
        />
        <div className="ml-2 text-xl text-black">
          <h1>ระบบประชาสัมพันธ์</h1>
          <h1>แผนกอิเล็กทรอนิกส์</h1>
        </div>
      </div>
      <div className="w-full flex flex-col p-4 gap-4 items-center">
        <button className="w-[80%]" onClick={() => router.push("/")}>
          <div
            className={
              (pathName === "/" ? "bg-[#5CD1FF] " : "") +
              "flex gap-2 items-center p-2 border-2 border-black rounded-md"
            }
          >
            {pathName === "/" ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8 text-white"
                >
                  <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                  <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                </svg>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              </>
            )}

            <h1 className={(pathName === "/" ? "text-white" : "") + " text-xl"}>
              หน้าหลัก
            </h1>
          </div>
        </button>

        <button className="w-[80%]" onClick={() => router.push("/file")}>
          <div
            className={
              (pathName === "/file" ? "bg-[#5CD1FF] " : "") +
              "flex gap-2 items-center p-2 border-2 border-black rounded-md"
            }
          >
            {pathName === "/file" ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8 text-white"
                >
                  <path d="M19.5 21a3 3 0 003-3v-4.5a3 3 0 00-3-3h-15a3 3 0 00-3 3V18a3 3 0 003 3h15zM1.5 10.146V6a3 3 0 013-3h5.379a2.25 2.25 0 011.59.659l2.122 2.121c.14.141.331.22.53.22H19.5a3 3 0 013 3v1.146A4.483 4.483 0 0019.5 9h-15a4.483 4.483 0 00-3 1.146z" />
                </svg>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"
                  />
                </svg>
              </>
            )}

            <h1
              className={
                (pathName === "/file" ? "text-white" : "") + " text-xl"
              }
            >
              จัดการไฟล์
            </h1>
          </div>
        </button>

        <Button
          className="absolute bottom-6"
          color="danger"
          variant="light"
          radius="sm"
          onClick={handleSignOut}
        >
          ออกจากระบบ
        </Button>
      </div>
    </div>
  );
}
