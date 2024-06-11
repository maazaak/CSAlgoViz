"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
const layout = ({ children }) => {
  const pathname = usePathname();
  const session = useSession();

  if (session.status === "loading") return <div>Loading...</div>;

  if (session.status === "unauthenticated") return <div>Unauthenticated</div>;

  return (
    <section className="text-secondary">
      <div>
        <section className="pl-20 h-32 bg-gray-300 flex justify-start items-center text-secondary text-3xl font-semibold">
          {session?.data?.user?.name}
        </section>
        <section className="h-screen  grid grid-cols-12 py-10 px-24">
          <div className="col-span-3 pt-10 flex flex-col justify-start gap-10 items-end border-r border-gray-800">
            <h1 className="text-xl text-start w-2/3 font-semibold">My Stuff</h1>
            <Link
              href={"/Dashboard"}
              className={`text-lg w-2/3 p-2 rounded-sm  text-start font-semibold ${
                pathname == "/Dashboard" && "bg-primary"
              } `}
            >
              Courses
            </Link>
            <Link
              href={"/Dashboard/Account"}
              className={`text-lg w-2/3 p-2  text-start font-semibold ${
                pathname == "/Dashboard/Account" && "bg-primary"
              } `}
            >
              Account
            </Link>
            <Link
              href={"/Dashboard/Progress"}
              className={`text-lg w-2/3 p-2  text-start font-semibold ${
                pathname == "/Dashboard/Progress" && "bg-primary"
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
