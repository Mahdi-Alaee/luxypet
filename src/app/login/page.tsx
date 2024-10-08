"use client";

import TextBox from "@/components/small/TextBox";
import { AppContext } from "@/context/app";
import { login } from "@/lib/auth";
import {
  fieldCount,
  maxLength,
  minLength,
  mustNumber,
  required,
} from "@/validation/inputs/validation-rules";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaPhoneAlt } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
  const [phone, setPhone] = useState<{
    value: string;
    isValid: undefined | boolean;
  }>({ isValid: undefined, value: "" });
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [password, setPassword] = useState<{
    value: string;
    isValid: undefined | boolean;
  }>({ isValid: undefined, value: "" });
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const context = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    setIsFormValid(!!password.isValid && !!phone.isValid);
  }, [password, phone]);

  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const errorToast = (txt: string) =>
      toast.info(txt, { position: "top-center", className: "font-sans" });

    const goToHome = () => router.push("/");

    toast.promise(
      login(
        { phone: phone.value, password: password.value },
        setLoading,
        errorToast,
        goToHome,
        context?.reloadUser as () => void
      ),
      {
        pending: "در حال بارگذاری ...",
        success: "با موفقیت وارد شدید",
        error: "نام کاربری یا رمز عبور اشتباه است",
      }
    );
  };

  return (
    <main>
      <div className="flex flex-col mt-10 max-w-md px-6 mx-auto justify-center">
        <div
          className="bg-gray-100 flex flex-col items-center border 
      border-gray-200 rounded-2xl p-5 w-full mx-auto gap-y-5"
        >
          <h1
            className="relative text-4xl font-vazirMedium text-gray-600 
        before:w-1/2 before:bg-mainPurple before:bg-opacity-60 
        before:absolute before:right-0 before:bottom-0"
          >
            فرم ورود
          </h1>
          <div className="text-lg">
            <span>قبلا ثبت نام کرده‌اید؟</span>{" "}
            <a className="text-mainPurple" href="/login">
              وارد شوید
            </a>
          </div>
          <form className="w-full flex flex-col gap-y-2" onSubmit={formSubmit}>
            <TextBox
              icon={<FaPhoneAlt className="text-gray-400 md:text-2xl" />}
              placeholder="شماره تلفن"
              state={phone}
              setState={setPhone}
              validationRules={[required(), mustNumber(), fieldCount(11)]}
            />
            <TextBox
              icon={
                isPasswordHidden ? (
                  <FaEyeSlash
                    onClick={() => setIsPasswordHidden(false)}
                    className="text-gray-400 cursor-pointer md:text-2xl"
                  />
                ) : (
                  <FaEye
                    onClick={() => setIsPasswordHidden(true)}
                    className="text-gray-400 cursor-pointer md:text-2xl"
                  />
                )
              }
              placeholder="رمز عبور"
              state={password}
              setState={setPassword}
              validationRules={[required(), minLength(8), maxLength(20)]}
              type={`${isPasswordHidden ? "password" : "text"}`}
            />
            <button
              className="bg-mainPurple text-white w-full rounded-lg 
          py-3 duration-100 cursor-pointer hover:bg-opacity-80 disabled:opacity-40"
              type="submit"
              disabled={!isFormValid || loading}
            >
              ثبت
            </button>
          </form>
        </div>
        <p className="mx-auto text-center mt-4 md:text-lg">
          با عضویت در سایت، تمامی{" "}
          <a className="text-mainPurple" href="/terms-conditions">
            قوانین و شرایط
          </a>{" "}
          استفاده از خدمت فروشگاه اینترنتی لوکسی پت را پذیرفته اید.
        </p>
      </div>
      <ToastContainer />
    </main>
  );
}
