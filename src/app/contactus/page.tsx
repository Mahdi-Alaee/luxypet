/* eslint-disable @next/next/no-img-element */
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BsTelephone } from "react-icons/bs";

export const metadata: Metadata = {
  title: 'تماس باما',
};

export default function ContactUs() {
  return (
    <main className="max-w-7xl mx-auto flex text-textColor flex-col gap-y-2 my-2 min-h-[50vh] px-4">
      <h1 className="box bg-bgColor2 p-4 text-center text-4xl font-bold">ارتباط باما</h1>
      {/* content */}
      <div className="box bg-bgColor2 p-4 text-center text-xl flex flex-col gap-y-3">
        <h2 className="text-3xl text-center font-bold">
          جهت خرید کد محصول را به واتساپ یا تلگرام ارسال کنید و یا تماس بگیرید
        </h2>
        <Link
          href="tel:+989923847856"
          className="flex gap-x-2 items-center bg-black text-textColor font-bold rounded-md px-4 py-2 text-lg w-max mx-auto mt-6 duration-150 hover:bg-blue-600"
          target="_blank"
        >
          09936585545 <BsTelephone className="text-2xl" />
        </Link>
        <div className="flex gap-x-10 justify-center pt-6 flex-wrap gap-4">
          <Link
            href={"https://api.whatsapp.com/send?phone=09936585545"}
            className="w-32 flex flex-col items-center"
            target="_blank"
          >
            <Image src="/images/WhatsApp.png" alt="WhatsApp icon"
            width='1000'
            height='1000' />
            <p className="mt-2">WhatsApp</p>
          </Link>
          <Link
            href="https://t.me/mahdiXXX"
            className="w-32 flex flex-col items-center"
            target="_blank"
          >
            <Image src="/images/telegram.png" alt="telegram icon"
            width='1000'
            height='1000' />
            <p className="mt-2">Telegram</p>
          </Link>
          <Link
            href="https://www.instagram.com/luxypet.ir/"
            className="w-32 flex flex-col items-center"
            target="_blank"
          >
            <Image
              className="scale-90"
              src="/images/instagram.png"
              alt="instagram icon"
              width='1000'
              height='1000'
            />
            <p className="mt-2">Instagram</p>
          </Link>
        </div>
      </div>
    </main>
  );
}
