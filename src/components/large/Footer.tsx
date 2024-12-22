import Image from "next/image";
import Link from "next/link";
import { BsTelephone } from "react-icons/bs";
import { FaInstagram, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { MdMail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="bg-mainColor">
      {/* container */}
      <div className="max-w-7xl mx-auto py-16 px-8">
        {/* footer top */}
        <div className="flex flex-col gap-y-8 justify-between items-center md:flex-row">
          {/* right icon */}
          <Link className="text-3xl md:text-5xl" href="/">
            <Image
              className="w-40"
              width="100"
              height="100"
              src="/images/logo.png"
              alt=""
            />
          </Link>
          {/* left socials */}
          <div className="flex gap-x-2">
            {/* WhatsApp */}
            <Link
              className="group bg-bgColor rounded-full p-3 duration-75 hover:bg-gray-300"
              href="https://api.whatsapp.com/send?phone=+989936585545&text=سلام"
              target="_blank"
            >
              <FaWhatsapp className="text-3xl text-textColor/80 group-hover:text-blue-700" />
            </Link>
            {/* Telegram */}
            <Link
              className="group bg-bgColor rounded-full p-3 duration-75 hover:bg-gray-300"
              href="https://t.me/luxypet_ir"
              target="_blank"
            >
              <FaTelegramPlane className="text-3xl text-textColor/80 group-hover:text-blue-700" />
            </Link>
            {/* Instagram */}
            <Link
              className="group bg-bgColor rounded-full p-3 duration-75 hover:bg-gray-300"
              href="https://www.instagram.com/luxypet.ir/"
              target="_blank"
            >
              <FaInstagram className="text-3xl text-textColor/80 group-hover:text-blue-700" />
            </Link>
          </div>
        </div>
        <div className="mt-8 flex gap-x-8 justify-center flex-wrap">
          <Link
            className="text-textColor/80 flex items-center gap-x-2 duration-75 hover:text-blue-200"
            href="tel:+989936585546"
            target="_blank"
          >
            <BsTelephone className="text-3xl" />
            <span className="text-xl pt-2">09936585545</span>
          </Link>
          <Link
            className="text-textColor/80 flex items-center gap-x-2 duration-75 hover:text-blue-200"
            href="mailto:luxypet.iran@gmail.com"
            target="_blank"
          >
            <MdMail className="text-3xl" />
            <span className="text-xl pt-2">luxypet.iran@gmail.com</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
