/* eslint-disable @next/next/no-img-element */
"use client";

import TextBox from "@/components/small/TextBox";
import { register } from "@/lib/auth";
import {
  fieldCount,
  isEmail,
  maxLength,
  minLength,
  mustNumber,
  required,
  theSameAs,
} from "@/validation/inputs/validation-rules";
import { FormEvent, useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaPhoneAlt, FaUser } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";

export default function Register() {
  const [name, setName] = useState<{
    value: string;
    isValid: undefined | boolean;
  }>({ value: "", isValid: undefined });

  const [phone, setPhone] = useState<{
    value: string;
    isValid: undefined | boolean;
  }>({ value: "", isValid: undefined });

  const [email, setEmail] = useState<{
    value: string;
    isValid: undefined | boolean;
  }>({ value: "", isValid: undefined });

  const [password, setPassword] = useState<{
    value: string;
    isValid: undefined | boolean;
  }>({ value: "", isValid: undefined });

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [rePassword, setRePassword] = useState<{
    value: string;
    isValid: undefined | boolean;
  }>({ value: "", isValid: undefined });

  const [isRePasswordHidden, setIsRePasswordHidden] = useState(true);

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(
      !!name.isValid &&
        !!phone.isValid &&
        !!email.isValid &&
        !!password.isValid &&
        !!rePassword.isValid
    );
  }, [name, phone, email, password, rePassword]);

  const formSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errorToast = (txt: string) =>
      toast.info(txt, { position: "top-center", className: "font-sans" });

    const body = {
      name: name.value,
      phone: phone.value,
      email: email.value,
      password: password.value,
    };

    toast.promise(
      register(body, errorToast),
      {
        pending: "در حال بارگذاری ...",
        success: "ثبت نام با موفقیت انجام شد",
      },
      { position: "top-center" }
    );
  };

  return (
    <main>
      <div className="flex flex-col mt-10 max-w-md px-6 mx-auto justify-center">
        {/* <img
          className="w-32 mb-2 mx-auto"
          src="/images/logo2.png"
          alt="Delpoosh logo"
        /> */}
        <div
          className="bg-gray-100 flex flex-col items-center border 
      border-gray-200 rounded-2xl p-5 w-full mx-auto gap-y-5"
        >
          <h1
            className="relative text-4xl font-vazirMedium text-gray-600 
        before:w-1/2 before:bg-mainPurple before:bg-opacity-60 
        before:absolute before:right-0 before:bottom-0"
          >
            فرم عضویت
          </h1>
          <div className="text-lg">
            <span>قبلا ثبت نام کرده‌اید؟</span>{" "}
            <a className="text-mainPurple" href="/login">
              وارد شوید
            </a>
          </div>
          <form className="w-full flex flex-col gap-y-2" onSubmit={formSubmit}>
            <TextBox
              icon={<FaUser className="text-gray-400 md:text-2xl" />}
              placeholder="نام و نام خوانوادگی"
              state={name}
              setState={setName}
              // validationRules={[required(name.value),minLength(name.value, 4), maxLength(name.value,40)]}
              validationRules={[required(), minLength(4), maxLength(25)]}
            />
            <TextBox
              icon={<FaPhoneAlt className="text-gray-400 md:text-2xl" />}
              placeholder="شماره تلفن"
              state={phone}
              setState={setPhone}
              validationRules={[required(), mustNumber(), fieldCount(11)]}
            />
            <TextBox
              icon={<MdMail className="text-gray-400 md:text-2xl" />}
              placeholder="آدرس ایمیل"
              state={email}
              setState={setEmail}
              validationRules={[required(), isEmail()]}
              type="email"
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
            <TextBox
              icon={
                isRePasswordHidden ? (
                  <FaEyeSlash
                    onClick={() => setIsRePasswordHidden(false)}
                    className="text-gray-400 cursor-pointer md:text-2xl"
                  />
                ) : (
                  <FaEye
                    onClick={() => setIsRePasswordHidden(true)}
                    className="text-gray-400 cursor-pointer md:text-2xl"
                  />
                )
              }
              placeholder="تکرار رمز عبور"
              state={rePassword}
              setState={setRePassword}
              validationRules={[required(), theSameAs(password.value)]}
              type={`${isRePasswordHidden ? "password" : "text"}`}
            />
            <button
              className="bg-mainPurple text-white w-full rounded-lg 
          py-3 duration-100 cursor-pointer hover:bg-opacity-80 disabled:opacity-40"
              type="submit"
              disabled={!isFormValid}
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
