/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

interface BuyProductModalProps {
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
  code: string;
}

export default function BuyProductModal({
  isOpenModal,
  setIsOpenModal,
  code,
}: BuyProductModalProps) {
  return (
    <div
      className={`fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black/80 transition-opacity duration-75 ${
        isOpenModal ? "z-50 opacity-100" : "-z-50 opacity-0"
      }`}
      onClick={() => setIsOpenModal(false)}
    >
      <div className="bg-white p-6" onClick={(e) => e.stopPropagation()}>
        {/* modal box */}
        <h2 className="text-3xl text-center font-bold">
          جهت خرید کد محصول ({code}) را به واتساپ یا تلگرام ارسال کنید و یا تماس
          بگیرید
        </h2>
        <Link
          href="tel:+989334318411"
          className="block bg-black text-white font-bold rounded-md px-4 py-2 text-lg w-max mx-auto mt-6 duration-150 hover:bg-blue-500"
          target="_blank"
        >
          09334318411
        </Link>
        <div className="flex gap-x-10 justify-center pt-6">
          <Link
            href={
              "https://api.whatsapp.com/send?phone=09334318411&text=" + code
            }
            className="w-32 flex flex-col items-center"
            target="_blank"
          >
            <img src="/images/WhatsApp.png" alt="WhatsApp icon" />
            <p className="mt-2 text-blue-500">WhatsApp</p>
          </Link>
          <Link
            href="https://t.me/mahdiXXX"
            className="w-32 flex flex-col items-center"
            target="_blank"
          >
            <img src="/images/telegram.png" alt="telegram icon" />
            <p className="mt-2 text-blue-500">Telegram</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
