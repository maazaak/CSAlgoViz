"use client";
import React from "react";
import styles from "./navbar.module.css";
import Link from "next/link";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = React.useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="flex justify-around items-center w-full bg-[#f0916c] text-[#f7f8d7] font-semibold h-24 text-lg">
      <Link href={"/"} className="flex justify-center items-center">
        <img style={{ width: "80px", alignSelf: "center" }} src={"logo.png"} />
      </Link>
      <div className="flex justify-between items-center gap-10">
        <div className={styles.underlineAnimation}>
          <button
            id="dropdownDefaultButton"
            data-dropdown-toggle="dropdown"
            className="text-center inline-flex items-center"
            type="button"
            onClick={toggleDropdown}
          >
            Courses{" "}
            <svg
              className={`w-2.5 h-2.5 ml-2.5 rotate-[${
                showDropdown ? "0deg" : "270deg"
              }] transition-all duration-200`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {showDropdown && (
            <div
              onMouseLeave={toggleDropdown}
              id="dropdown"
              className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 "
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <Link href={"/"} className="flex items-center">
                    <div
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Artificial Intelligence
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href={"/"} className="flex items-center">
                    <div
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Computer Architecture
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href={"/"} className="flex items-center">
                    <div
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Software Engineering
                    </div>
                  </Link>

                  <Link href={"/"} className="flex items-center">
                    <div
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Databases
                    </div>
                  </Link>

                  <Link href={"/"} className="flex items-center">
                    <div
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Operating Systems
                    </div>
                  </Link>
                  <Link href={"/"} className="flex items-center">
                    <div
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Theory of Automata
                    </div>
                  </Link>
                  <Link href={"/"} className="flex items-center">
                    <div
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Data Structures
                    </div>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div class="relative">
          <input
            type="text"
            id="default-search"
            className="block w-full p-1 ps-2 placeholder-[#f0916c]  text-lg text-[#f0916c]  border-transparent focus:outline-none focus:border-transparent focus:ring-0 rounded-sm bg-[#f7f8d7] hover:bg-gray-200 transition-all duration-75  "
            placeholder="Search"
            required
          />
          <div class="absolute inset-y-0 end-0 flex items-center pe-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-10">
        <a>Login</a>
        <a>
          <div>Sign up</div>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
