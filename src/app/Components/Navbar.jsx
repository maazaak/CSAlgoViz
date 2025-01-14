"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession, signIn } from "next-auth/react";
import axios from "axios";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = React.useState(false);
  const session = useSession();
  const pathname = usePathname(); // Hook to get the current route

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const loginWithGoogle = async () => {
    try {
      await signIn("google");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("username"); // Clear username from localStorage
      console.log("User logged out");
      await signOut(); // Clear session and redirect
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const saveUsernameToDatabase = async (username) => {
    try {
      console.log("Saving username to database:", username); // Debug output
      const response = await axios.post("http://localhost:5000/user", { username });
      console.log(response.data.message);
    } catch (error) {
      console.error("Error saving user to database:", error);
    }
  };

  // Save username to the database when authenticated
  useEffect(() => {
    if (session.status === "authenticated" && session?.data?.user?.name) {
      const username = session.data.user.name;
      localStorage.setItem("username", username); // Save username to localStorage
      saveUsernameToDatabase(username); // Save username to the backend
    }
  }, [session]);

  return (
    <div className="flex items-center justify-between w-full bg-primary text-secondary font-semibold h-20 px-8 shadow-md">
      {/* Logo */}
      <Link href={"/"} className="flex items-center">
        <img src={"/logo.png"} alt="Logo" className="w-12 h-12" />
      </Link>

      {/* Dropdown Menu */}
      <div className="relative">
        <button
          id="dropdownDefaultButton"
          className="text-secondary text-lg px-4 py-2 bg-transparent hover:bg-gray-800 rounded-md transition-all"
          type="button"
          onClick={toggleDropdown}
        >
          Courses{" "}
          <svg
            className={`w-4 h-4 ml-1 transform transition-transform ${
              showDropdown ? "rotate-180" : "rotate-0"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        {showDropdown && (
          <div
            onMouseLeave={toggleDropdown}
            className="absolute left-0 mt-2 w-48 bg-gray-800 text-secondary rounded-md shadow-lg"
          >
            <ul className="py-2">
              <li>
                <Link
                  href={"/Dashboard"}
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Artificial Intelligence
                </Link>
              </li>
              <li>
                <Link
                  href={"/Dashboard"}
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Computer Architecture
                </Link>
              </li>
              <li>
                <Link
                  href={"/Dashboard"}
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Software Engineering
                </Link>
              </li>
              <li>
                <Link
                  href={"/Dashboard"}
                  className="block px-4 py-2 hover:bg-gray-700"
                >
                  Data Structures
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="flex items-center relative">
        <input
          type="text"
          placeholder="Search"
          className="w-64 px-4 py-2 text-primary bg-[#f7f8d7] rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700"
        />
        <svg
          className="absolute right-3 w-5 h-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16l-4-4m0 0l4-4m-4 4h16"
          />
        </svg>
      </div>

      {/* User Info and Navigation */}
      <div className="flex items-center gap-4">
        {session.status === "authenticated" ? (
          <span className="text-lg">{session?.data?.user?.name}</span>
        ) : (
          <button
            onClick={loginWithGoogle}
            className="px-4 py-2 bg-secondary text-primary rounded-md hover:bg-gray-700 transition-all"
          >
            Login
          </button>
        )}

        {session.status === "authenticated" && (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-800 text-secondary rounded-md hover:bg-gray-700 transition-all"
          >
            Sign Out
          </button>
        )}

     

        {pathname === "/leaderboard" ? (
            <Link href="/Course/Data%20Structures">
              <button className="px-4 py-2 bg-gray-800 text-secondary rounded-md hover:bg-gray-700 transition-all">
                Go to Visualizations
              </button>
          </Link>
        ) : (
          <Link href="/leaderboard">
            <button className="px-4 py-2 bg-gray-800 text-secondary rounded-md hover:bg-gray-700 transition-all">
              Go to Leaderboard
            </button>
          </Link>
        )}


        {/* Navigation Button */}
        {pathname === "/code-editor" ? (
          <Link href="/Course/Data%20Structures">
            <button className="px-4 py-2 bg-gray-800 text-secondary rounded-md hover:bg-gray-700 transition-all">
              Go to Visualizations
            </button>
          </Link>
        ) : (
          <Link href="/code-editor">
            <button className="px-4 py-2 bg-gray-800 text-secondary rounded-md hover:bg-gray-700 transition-all">
              Go to Code Editor
            </button>
          </Link>
        )}
      </div>

    </div>
  );
};

export default Navbar;
