"use client";

import GlobalForm from "@/components/medium/GlobalForm";
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
import { inputStateDefaultValue, InputStateType } from "@/types/entities";
import Link from "next/link";

export default function Login() {
  const [phone, setPhone] = useState<InputStateType>(inputStateDefaultValue);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [password, setPassword] = useState<InputStateType>(
    inputStateDefaultValue
  );
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
    <main className="my-20">
      <div className="flex flex-col mt-10 max-w-md px-6 mx-auto justify-center">
        <GlobalForm
          formSubmit={formSubmit}
          isFormValid={isFormValid}
          loading={loading}
          title="فرم ورود"
          topOfFormChildren={
            <div className="text-lg">
              <span>قبلا ثبت نام کرده‌اید؟</span>{" "}
              <Link className="text-mainPurple" href="/register">
                ثبت نام کنید
              </Link>
            </div>
          }
        >
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
        </GlobalForm>
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
