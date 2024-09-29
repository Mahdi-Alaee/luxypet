"use client";

import Link from "next/link";
import MenuButton from "../small/MenuButton";
import { useState } from "react";
import MobileMenu from "../medium/MobileMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-mainPurple p-4 sticky">
      <div className="container mx-auto flex justify-between items-center">
        {/* menu button */}
        <MenuButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        {/* logo */}
        <Link className={`text-white text-3xl ${isMenuOpen ? 'text-mainPurple fixed z-50 left-4 top-6' : ''}`} href="/">
          luxypet
        </Link>

      </div>
        {/* mobile menu */}
        <MobileMenu isMenuOpen={isMenuOpen} />
    </header>
  );
}
