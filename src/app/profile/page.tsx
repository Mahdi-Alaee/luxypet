"use client";

import UserTabs from "@/components/medium/UserTabs";
import TextBox from "@/components/small/TextBox";
import { AppContext } from "@/context/app";
import { User } from "@/types/auth";
import {
  fieldCount,
  isEmail,
  maxLength,
  minLength,
  mustNumber,
  required,
  theSameAs,
} from "@/validation/inputs/validation-rules";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaPhoneAlt, FaUser } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";

export default function Profile() {
  const context = useContext(AppContext);

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

  const [currentPassword, setCurrentPassword] = useState<{
    value: string;
    isValid: undefined | boolean;
  }>({ value: "", isValid: true });
  const [isCurrentPasswordHidden, setIsCurrentPasswordHidden] = useState(true);

  const [password, setPassword] = useState<{
    value: string;
    isValid: undefined | boolean;
  }>({ value: "", isValid: true });

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [rePassword, setRePassword] = useState<{
    value: string;
    isValid: undefined | boolean;
  }>({ value: "", isValid: true });
  const [isRePasswordHidden, setIsRePasswordHidden] = useState(true);

  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsFormValid(
      !!name.isValid &&
        !!phone.isValid &&
        !!email.isValid &&
        !!currentPassword.isValid &&
        !!password.isValid &&
        !!rePassword.isValid
    );
  }, [name, phone, email, password, rePassword, currentPassword]);

  useEffect(() => {
    const user = context?.user as User | undefined;

    setName({ isValid: true, value: user?.name || "" });
    setPhone({ isValid: true, value: user?.phone || "" });
    setEmail({ isValid: true, value: user?.email || "" });
  }, [context]);

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("http://localhost:3000/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: context?.user?._id,
        name: name.value,
        email: email.value,
        phone: phone.value,
        currentPassword: currentPassword.value,
        password: password.value,
        rePassword: rePassword.value,
      }),
    });
    if (res.ok) {
      console.log({ res });
      const data = await res.json();
      if (data.ok) {
        console.log("ok");

        toast.success("اطلاعات با موفقیت ویرایش گردید");
        setPassword({ isValid: true, value: "" });
        setRePassword({ isValid: true, value: "" });
        setCurrentPassword({ isValid: true, value: "" });
        setTimeout(() => {
          context?.reloadUser();
        }, 1500);
      } else {
        toast.info(data.error);
      }
    } else {
      toast.error("خطایی رخ داد!");
    }
    setLoading(false);
  };  

  if (context?.loading) {
    return <p className="text-3xl mt-12 text-center">Loading ...</p>;
  } else if (!context?.user) router.replace("/");
  return (
    <main className="max-w-3xl mx-auto pt-12">
      {/* Panel menu */}
      <UserTabs />

      {/* content */}
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
              isCurrentPasswordHidden ? (
                <FaEyeSlash
                  onClick={() => setIsCurrentPasswordHidden(false)}
                  className="text-gray-400 cursor-pointer md:text-2xl"
                />
              ) : (
                <FaEye
                  onClick={() => setIsCurrentPasswordHidden(true)}
                  className="text-gray-400 cursor-pointer md:text-2xl"
                />
              )
            }
            placeholder="رمز فعلی"
            state={currentPassword}
            setState={setCurrentPassword}
            validationRules={[required(), minLength(8), maxLength(20)]}
            type={`${isCurrentPasswordHidden ? "password" : "text"}`}
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
            placeholder="رمز جدید"
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
            placeholder="تکرار رمز جدید"
            state={rePassword}
            setState={setRePassword}
            validationRules={[required(), theSameAs(password.value)]}
            type={`${isRePasswordHidden ? "password" : "text"}`}
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
      <ToastContainer position="top-center" bodyClassName="font-sans" />
    </main>
  );
}
