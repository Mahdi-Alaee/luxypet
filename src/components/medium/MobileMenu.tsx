/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";
import { TbDog } from "react-icons/tb";
import { MdSentimentSatisfiedAlt } from "react-icons/md";
import { MdOutlineCorporateFare } from "react-icons/md";
import { MdContacts } from "react-icons/md";
import { MdOutlineArticle } from "react-icons/md";

interface MobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen?: Dispatch<SetStateAction<boolean>>;
}

function MobileMenu({ isMenuOpen }: MobileMenuProps) {
  return (
    <nav
      className={`fixed right-0 top-0 bottom-0 bg-mainPurple duration-200 ${
        isMenuOpen
          ? "left-0 opacity-100 visible"
          : "left-full invisible opacity-0"
      }`}
    >
      {/* top bar */}
      <div className="bg-gray-100 w-full h-20"></div>
      {/* menu items */}
      <ul className="flex flex-col gap-y-6 pt-6 text-center text-gray-100 font-sans text-2xl">
        <li>
          <Link className="flex justify-center gap-x-1" href="#">
            <TbDog className="text-3xl" /> توله ها
          </Link>
        </li>
        <li>
          <Link className="flex justify-center gap-x-1" href="#">
            <MdSentimentSatisfiedAlt className="text-3xl" /> رضایت مشتری
          </Link>
        </li>
        <li>
          <Link className="flex justify-center gap-x-1" href="#">
            <MdOutlineCorporateFare className="text-3xl" /> درباره ما
          </Link>
        </li>
        <li>
          <Link className="flex justify-center gap-x-1" href="#">
            <MdContacts className="text-3xl" /> ارتباط با ما
          </Link>
        </li>
        <li>
          <Link className="flex justify-center gap-x-1" href="#">
            <MdOutlineArticle className="text-3xl" /> مقالات
          </Link>
        </li>
      </ul>
      {/* sign buttons */}
      <div className="mt-12 flex justify-between px-12 text-gray-50 text-xl">
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
    </nav>
  );
}

export default MobileMenu;
