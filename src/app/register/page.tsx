/* eslint-disable @next/next/no-img-element */
"use client";

import GlobalForm from "@/components/medium/GlobalForm";
import TextBox from "@/components/small/TextBox";
import { AppContext } from "@/context/app";
import { register } from "@/lib/auth";
import { inputStateDefaultValue, InputStateType } from "@/types/entities";
import {
  fieldCount,
  isEmail,
  maxLength,
  minLength,
  mustNumber,
  required,
  theSameAs,
} from "@/validation/inputs/validation-rules";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaPhoneAlt, FaUser } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";

export default function Register() {
  const [name, setName] = useState<InputStateType>(inputStateDefaultValue);

  const [phone, setPhone] = useState<InputStateType>(inputStateDefaultValue);

  const [email, setEmail] = useState<InputStateType>(inputStateDefaultValue);

  const [password, setPassword] = useState<InputStateType>(inputStateDefaultValue);

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [rePassword, setRePassword] = useState<InputStateType>(inputStateDefaultValue);

  const [isRePasswordHidden, setIsRePasswordHidden] = useState(true);

  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const context = useContext(AppContext);

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

    const goToHome = () => router.push("/");

    const body = {
      name: name.value,
      phone: phone.value,
      email: email.value,
      password: password.value,
      isAdmin: false,
    };

    toast.promise(
      register(
        body,
        errorToast,
        setLoading,
        goToHome,
        context?.reloadUser as () => void
      ),
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
        <GlobalForm
          formSubmit={formSubmit}
          isFormValid={isFormValid}
          loading={loading}
          title="فرم ثبت نام"
          topOfFormChildren={
            <div className="text-lg">
              <span>قبلا ثبت نام کرده‌اید؟</span>{" "}
              <Link className="text-mainColor" href="/login">
                وارد شوید
              </Link>
            </div>
          }
        >
          <TextBox
            icon={<FaUser className="text-bgColor md:text-2xl" />}
            placeholder="نام و نام خوانوادگی"
            state={name}
            setState={setName}
            // validationRules={[required(name.value),minLength(name.value, 4), maxLength(name.value,40)]}
            validationRules={[required(), minLength(4), maxLength(25)]}
          />
          <TextBox
            icon={<FaPhoneAlt className="text-bgColor md:text-2xl" />}
            placeholder="شماره تلفن"
            state={phone}
            setState={setPhone}
            validationRules={[required(), mustNumber(), fieldCount(11)]}
          />
          <TextBox
            icon={<MdMail className="text-bgColor md:text-2xl" />}
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
                  className="text-bgColor cursor-pointer md:text-2xl"
                />
              ) : (
                <FaEye
                  onClick={() => setIsPasswordHidden(true)}
                  className="text-bgColor cursor-pointer md:text-2xl"
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
                  className="text-bgColor cursor-pointer md:text-2xl"
                />
              ) : (
                <FaEye
                  onClick={() => setIsRePasswordHidden(true)}
                  className="text-bgColor cursor-pointer md:text-2xl"
                />
              )
            }
            placeholder="تکرار رمز عبور"
            state={rePassword}
            setState={setRePassword}
            validationRules={[required(), theSameAs(password.value)]}
            type={`${isRePasswordHidden ? "password" : "text"}`}
          />
        </GlobalForm>
        <p className="mx-auto text-center mt-4 md:text-lg">
          با عضویت در سایت، تمامی{" "}
          <a className="text-mainColor" href="/terms-conditions">
            قوانین و شرایط
          </a>{" "}
          استفاده از خدمت فروشگاه اینترنتی لوکسی پت را پذیرفته اید.
        </p>
      </div>
      <ToastContainer />
    </main>
  );
}
