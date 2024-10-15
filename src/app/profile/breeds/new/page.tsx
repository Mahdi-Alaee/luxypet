"use client";

import TextBox from "@/components/small/TextBox";
import { AppContext } from "@/context/app";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function NewBreed() {
  const context = useContext(AppContext);

  const [title, setTitle] = useState<{
    value: string;
    isValid: undefined | boolean;
  }>({ value: "", isValid: undefined });

  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsFormValid(
      !!title.isValid
    );
  }, [title]);

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
  };

  if (context?.loading) {
    return <p className="text-3xl mt-12 text-center">Loading ...</p>;
  } else if (!context?.user) router.replace("/");
  return (
    <div
      className="bg-gray-100 max-w-xl mt-8 flex flex-col items-center border 
      border-gray-200 rounded-2xl p-5 w-full mx-auto gap-y-5"
    >
      <h1
        className="relative text-4xl font-vazirMedium text-gray-600 
        before:w-1/2 before:bg-mainPurple before:bg-opacity-60 
        before:absolute before:right-0 before:bottom-0"
      >
        ویرایش اطلاعات
      </h1>
      <form
        className="w-full flex flex-col gap-y-2 rounded-md"
        onSubmit={formSubmit}
      >
        <TextBox state={title} setState={setTitle} placeholder="نام نژاد" />
        <button
          className="bg-mainPurple text-white w-full rounded-lg 
          py-3 duration-100 cursor-pointer hover:bg-opacity-80 disabled:opacity-40"
          type="submit"
          disabled={!isFormValid || loading}
        >
          ثبت
        </button>
      </form>
      <ToastContainer position="top-center" bodyClassName="font-sans" />
    </div>
  );
}
