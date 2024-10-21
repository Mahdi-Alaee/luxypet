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

export default function NewParent() {
  const context = useContext(AppContext);

  const [name, setName] = useState<{
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
    setIsFormValid(!!name.isValid && !!image.isValid);
  }, [name, image]);

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("http://localhost:3000/api/parent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.value,
        image: "/images/parents/" + image.value,
      }),
    });
    const data = await res.json();
    if (data.ok) {
      toast.success("مولد با موفقیت افزوده شد");
      setName({ isValid: undefined, value: "" });
      setImage({ isValid: undefined, value: "" });
      setTimeout(() => {
        router.push('/profile/parents')
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
        title="افزودن مولد"
      >
        <TextBox
          state={name}
          setState={setName}
          placeholder="نام مولد"
          validationRules={[required(), minLength(2), maxLength(25)]}
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