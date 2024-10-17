"use client";

import GlobalForm from "@/components/medium/GlobalForm";
import TextBox from "@/components/small/TextBox";
import { AppContext } from "@/context/app";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

// ! @todo GlobalForm component

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
    setIsFormValid(!!title.isValid);
  }, [title]);

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
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
        <TextBox state={title} setState={setTitle} placeholder="نام نژاد" />
        <TextBox state={image} setState={setImage} placeholder="(test.jpg) نام تصویر + پسوند" inputDir="ltr" />
      </GlobalForm>

      <ToastContainer position="top-center" bodyClassName="font-sans" />
    </div>
  );
}
