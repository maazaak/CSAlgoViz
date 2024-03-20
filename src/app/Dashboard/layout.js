"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
const layout = ({ children }) => {
  const pathname = usePathname();

  return (
    <section className="text-[#f7f8d7]">
      <div>
        <section className="pl-20 h-32 bg-gray-300 flex justify-start items-center text-black text-3xl font-semibold">
          Ranamaaz2001
        </section>
        <section className="h-screen  grid grid-cols-12 py-10 px-24">
          <div className="col-span-3 pt-10 flex flex-col justify-start gap-10 items-end border-r border-gray-800">
            <h1 className="text-xl text-start w-2/3 font-semibold">My Stuff</h1>
            <Link
              href={"/Dashboard"}
              className={`text-lg w-2/3 p-2 rounded-sm  text-start font-semibold ${
                pathname == "/Dashboard" && "bg-[#f0916c]"
              } `}
            >
              Courses
            </Link>
            <Link
              href={"/Dashboard/Account"}
              className={`text-lg w-2/3 p-2  text-start font-semibold ${
                pathname == "/Dashboard/Account" && "bg-[#f0916c]"
              } `}
            >
              Account
            </Link>
            <Link
              href={"/Dashboard/Progress"}
              className={`text-lg w-2/3 p-2  text-start font-semibold ${
                pathname == "/Dashboard/Progress" && "bg-[#f0916c]"
              } `}
            >
              Progress
            </Link>
          </div>
          <div className="col-span-9">{children}</div>
        </section>
      </div>
    </section>
  );
};

export default layout;
