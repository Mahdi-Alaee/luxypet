"use client";

import GlobalForm from "@/components/medium/GlobalForm";
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
import { redirect, useParams, useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaPhoneAlt, FaUser } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";

export default function EditUser() {
  const context = useContext(AppContext);

  const { _id } = useParams();

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
  }>({ value: "", isValid: true });

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [rePassword, setRePassword] = useState<{
    value: string;
    isValid: undefined | boolean;
  }>({ value: "", isValid: true });
  const [isRePasswordHidden, setIsRePasswordHidden] = useState(true);

  const [isAdmin, setIsAdmin] = useState(false);

  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsFormValid(
      !!name.isValid &&
        !!phone.isValid &&
        !!email.isValid &&
        !!password.isValid &&
        !!rePassword.isValid
    );
  }, [name, phone, email, password, rePassword]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const user = (await (
      await fetch("http://localhost:3000/api/user?_id=" + _id)
    ).json()) as User;

    setName({ isValid: true, value: user.name });
    setEmail({ isValid: true, value: user.email });
    setPhone({ isValid: true, value: user.phone });
    setIsAdmin(!!user.isAdmin);
  };

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("http://localhost:3000/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        name: name.value,
        email: email.value,
        phone: phone.value,
        password: password.value,
        rePassword: rePassword.value,
        isAdmin,
      }),
    });
    if (res.ok) {
      console.log({ res });
      const data = await res.json();
      if (data.ok) {
        console.log("ok");

        toast.success("اطلاعات با موفقیت ویرایش گردید");
        setTimeout(() => {
          context?.reloadUser();
          router.push("/profile/users");
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
  } else if (!context?.user?.isAdmin) redirect("/");
  return (
    <div className="pt-8 max-w-lg mx-auto">
      <GlobalForm
        formSubmit={formSubmit}
        isFormValid={isFormValid}
        loading={loading}
        title="ویرایش اطلاعات"
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
        <label className="flex items-center gap-x-1">
          ادمین{" "}
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
        </label>
      </GlobalForm>
      <ToastContainer position="top-center" bodyClassName="font-sans" />
    </div>
  );
}
