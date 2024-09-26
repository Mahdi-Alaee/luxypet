"use client";

import Link from "next/link";
import MenuButton from "../small/MenuButton";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-mainPurple p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link className="text-white text-3xl" href="/">
          luxypet
        </Link>

        {/* menu button */}
          <MenuButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      </div>
    </header>
  );
}
