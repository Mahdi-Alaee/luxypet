"use client";

import Link from "next/link";
import MenuButton from "../small/MenuButton";
import { useContext, useState } from "react";
import MobileMenu from "../medium/MobileMenu";
import Image from "next/image";
import { AppContext } from "@/context/app";
import { FaUser } from "react-icons/fa";
import { TbDog } from "react-icons/tb";
import { MdContacts, MdOutlineCorporateFare } from "react-icons/md";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const context = useContext(AppContext);
  

  return (
    <header className="bg-mainColor p-4 sticky z-50">
      <div className="container mx-auto flex justify-between items-center md:flex-col-reverse md:gap-y-8">
        {/* menu button */}
        <MenuButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

        {/* sign buttons */}
        <div className="hidden md:flex gap-x-10">
          {context?.user ? (
            <Link href='/profile' className="border-4 font-bold border-textColor text-textColor px-4 py-2 rounded-full duration-150 flex gap-x-2 
          text-lg hover:bg-gray-400 hover:border-gray-400 hover:text-mainColor">
              {context.user.name} <FaUser className="text-xl" />
            </Link>
          ) : (
            <>
          <Link
            className="border-4 font-bold border-textColor text-textColor px-8 py-2 rounded-full duration-150 
          hover:bg-gray-400 hover:border-gray-400 hover:text-mainColor"
            href="/login"
          >
            ورود
          </Link>
          <Link
            className="border-4 font-bold border-textColor text-textColor px-8 py-2 rounded-full duration-150 
          hover:bg-gray-400 hover:border-gray-400 hover:text-mainColor"
            href="/register"
          >
            ثبت نام
          </Link>
            </>
          )}
        </div>
        {/* desktop menu */}
        <nav className="hidden md:block">
          <ul className="flex text-textColor gap-x-8 text-lg">
            <li>
              <Link className="flex gap-x-2" href="/products"><TbDog className="text-3xl" /> توله ها</Link>
            </li>
            {/* <li>
              <Link className="flex gap-x-2" href="#"><MdSentimentSatisfiedAlt className="text-3xl" /> رضایت مشتری</Link>
            </li> */}
            <li>
              <Link className="flex gap-x-2" href="/aboutus"><MdOutlineCorporateFare className="text-3xl" /> درباره ما</Link>
            </li>
            <li>
              <Link className="flex gap-x-2" href="/contactus"><MdContacts className="text-3xl" /> ارتباط با ما</Link>
            </li>
            {/* <li>
              <Link className="flex gap-x-2" href="#"><MdOutlineArticle className="text-3xl" /> مقالات آموزشی</Link>
            </li> */}
          </ul>
        </nav>

        {/* logo */}
        <Link
          className={` text-3xl md:text-5xl ${
            isMenuOpen ? "text-mainColor fixed z-50 left-4 top-0" : "text-textColor"
          }`}
          href="/"
          onClick={()=> setIsMenuOpen(false)}
        >
          <Image className="w-24 md:w-40" width='100' height='100' src="/images/logo.png" alt="" />
        </Link>
      </div>
      {/* mobile menu */}
      <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </header>
  );
}
