"use client";

import Link from "next/link";
import MenuButton from "../small/MenuButton";
import { useState } from "react";
import MobileMenu from "../medium/MobileMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-mainPurple p-4 sticky">
      <div className="container mx-auto flex justify-between items-center md:flex-col-reverse md:gap-y-8">
        {/* menu button */}
        <MenuButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        {/* sign buttons */}
        <div className="hidden md:flex gap-x-10">
          <Link
            className="border-2 border-gray-50 text-gray-50 px-8 py-2 rounded-full duration-150 
          hover:bg-gray-200 hover:text-mainPurple"
            href="#"
          >
            ورود
          </Link>
          <Link
            className="border-2 border-gray-50 text-gray-50 px-8 py-2 rounded-full duration-150 
          hover:bg-gray-200 hover:text-mainPurple"
            href="#"
          >
            ثبت نام
          </Link>
        </div>
        {/* desktop menu */}
        <nav className="hidden md:block">
          <ul className="flex text-gray-100 gap-x-8 text-lg">
            <li>
              <Link href="#">توله ها</Link>
            </li>
            <li>
              <Link href="#">رضایت مشتری</Link>
            </li>
            <li>
              <Link href="#">درباره ما</Link>
            </li>
            <li>
              <Link href="#">ارتباط با ما</Link>
            </li>
            <li>
              <Link href="#">مقالات آموزشی</Link>
            </li>
          </ul>
        </nav>

        {/* logo */}
        <Link
          className={` text-3xl md:text-5xl ${
            isMenuOpen ? "text-mainPurple fixed z-50 left-4 top-6" : "text-white"
          }`}
          href="/"
        >
          luxypet
        </Link>
      </div>
      {/* mobile menu */}
      <MobileMenu isMenuOpen={isMenuOpen} />
    </header>
  );
}
