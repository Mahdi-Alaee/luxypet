/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import { Dispatch, SetStateAction, useContext } from "react";
import { TbDog } from "react-icons/tb";
import { MdSentimentSatisfiedAlt } from "react-icons/md";
import { MdOutlineCorporateFare } from "react-icons/md";
import { MdContacts } from "react-icons/md";
import { MdOutlineArticle } from "react-icons/md";
import { AppContext } from "@/context/app";
import { FaUser } from "react-icons/fa";

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

function MobileMenu({ isMenuOpen, setIsMenuOpen }: MobileMenuProps) {
  const context = useContext(AppContext);

  return (
    <nav
      className={`fixed z-10 right-0 top-0 bottom-0 bg-mainColor duration-200 ${
        isMenuOpen
          ? "left-0 opacity-100 visible"
          : "left-full invisible opacity-0"
      }`}
    >
      {/* top bar */}
      <div className="bg-bgColor w-full h-20"></div>
      {/* menu items */}
      <ul className="flex flex-col gap-y-6 pt-6 text-center text-textColor font-sans text-2xl">
        <li>
          <Link
            className="flex justify-center gap-x-1"
            href="/products"
            onClick={() => setIsMenuOpen(false)}
          >
            <TbDog className="text-3xl" /> توله ها
          </Link>
        </li>
        {/* <li>
          <Link
            className="flex justify-center gap-x-1"
            href="#"
            onClick={() => setIsMenuOpen(false)}
          >
            <MdSentimentSatisfiedAlt className="text-3xl" /> رضایت مشتری
          </Link>
        </li> */}
        <li>
          <Link
            className="flex justify-center gap-x-1"
            href="/aboutus"
            onClick={() => setIsMenuOpen(false)}
          >
            <MdOutlineCorporateFare className="text-3xl" /> درباره ما
          </Link>
        </li>
        <li>
          <Link
            className="flex justify-center gap-x-1"
            href="/contactus"
            onClick={() => setIsMenuOpen(false)}
          >
            <MdContacts className="text-3xl" /> ارتباط با ما
          </Link>
        </li>
        {/* <li>
          <Link
            className="flex justify-center gap-x-1"
            href="#"
            onClick={() => setIsMenuOpen(false)}
          >
            <MdOutlineArticle className="text-3xl" /> مقالات
          </Link>
        </li> */}
      </ul>
      {/* sign buttons */}
      <div className="mt-12 flex justify-center gap-x-6 px-12 text-textColor text-xl">
        {context?.user ? (
          <Link
            href="/profile"
            className="border-4 font-bold border-textColor text-textColor px-4 py-2 rounded-full duration-150 flex gap-x-2 
          text-lg hover:bg-gray-200 hover:text-mainColor"
            onClick={() => setIsMenuOpen(false)}
          >
            {context.user.name} <FaUser className="text-xl" />
          </Link>
        ) : (
          <>
            <Link
              className="border-2 border-textColor text-textColor px-8 py-2 rounded-full duration-150 
          hover:bg-gray-200 hover:text-mainColor"
              href="/login"
              onClick={() => setIsMenuOpen(false)}
            >
              ورود
            </Link>
            <Link
              className="border-2 border-textColor text-textColor px-8 py-2 rounded-full duration-150 
          hover:bg-gray-200 hover:text-mainColor"
              href="/register"
              onClick={() => setIsMenuOpen(false)}
            >
              ثبت نام
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default MobileMenu;
