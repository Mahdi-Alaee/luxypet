"use client";

import GlobalForm from "@/components/medium/GlobalForm";
import TextBox from "@/components/small/TextBox";
import { AppContext } from "@/context/app";
import {
  isImage,
  maxLength,
  minLength,
  required,
} from "@/validation/inputs/validation-rules";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function NewBreed() {
  const context = useContext(AppContext);

  const [title, setTitle] = useState<{
    value: string;
    isValid: undefined | boolean;
  }>({ value: "", isValid: undefined });

  const [image, setImage] = useState<{
    value: string;
    isValid: undefined | boolean;
  }>({ value: "", isValid: undefined });

  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsFormValid(!!title.isValid && !!image.isValid);
  }, [title, image]);

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("http://localhost:3000/api/breed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.value,
        image: "/images/breeds/" + image.value,
      }),
    });
    const data = await res.json();
    if (data.ok) {
      toast.success("نژاد با موفقیت افزوده شد");
      setTitle({ isValid: undefined, value: "" });
      setImage({ isValid: undefined, value: "" });
      setTimeout(() => {
        router.push('/profile/breeds')
      }, 1000);
    } else toast.error(data.error);
    setLoading(false);
  };

  if (context?.loading) {
    return <p className="text-3xl mt-12 text-center">Loading ...</p>;
  } else if (!context?.user) router.replace("/");
  return (
    <div className="pt-8 max-w-lg mx-auto">
      <GlobalForm
        formSubmit={formSubmit}
        isFormValid={isFormValid}
        loading={loading}
        title="افزودن نژاد"
      >
        <TextBox
          state={title}
          setState={setTitle}
          placeholder="نام نژاد"
          validationRules={[required(), minLength(4), maxLength(25)]}
        />
        <TextBox
          state={image}
          setState={setImage}
          placeholder="(test.jpg) نام تصویر + پسوند"
          inputDir="ltr"
          validationRules={[required(), isImage()]}
        />
      </GlobalForm>

      <ToastContainer position="top-center" bodyClassName="font-sans" />
    </div>
  );
}
