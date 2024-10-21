"use client";

import GlobalForm from "@/components/medium/GlobalForm";
import SelectBox from "@/components/small/SelectBox";
import TextBox from "@/components/small/TextBox";
import { AppContext } from "@/context/app";
import { Breed, Parent } from "@/types/entities";
import {
  isDate,
  isImage,
  maxLength,
  minLength,
  mustNumber,
  required,
} from "@/validation/inputs/validation-rules";
import { useRouter } from "next/navigation";
import { FormEvent, useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Newproduct() {
  const context = useContext(AppContext);

  const [title, setTitle] = useState<{
    value: string;
    isValid: undefined | boolean;
  }>({ value: "", isValid: undefined });

  const [code, setCode] = useState<{
    value: string;
    isValid: undefined | boolean;
  }>({ value: "", isValid: undefined });

  const [price, setPrice] = useState<{
    value: string;
    isValid: undefined | boolean;
  }>({ value: "", isValid: undefined });

  const [image, setImage] = useState<{
    value: string;
    isValid: undefined | boolean;
  }>({ value: "", isValid: undefined });

  const [video, setVideo] = useState<{
    value: string;
    isValid: undefined | boolean;
  }>({ value: "", isValid: undefined });

  const [birthDate, setBirthDate] = useState<{
    value: string;
    isValid: undefined | boolean;
  }>({ value: "", isValid: undefined });

  const [mother, setMother] = useState<{
    value: string;
    isValid: undefined | boolean;
  }>({ value: "", isValid: undefined });

  const [father, setFather] = useState<{
    value: string;
    isValid: undefined | boolean;
  }>({ value: "", isValid: undefined });

  const [sex, setSex] = useState<{
    value: string;
    isValid: undefined | boolean;
  }>({ value: "", isValid: undefined });

  const [breed, setBreed] = useState<{
    value: string;
    isValid: undefined | boolean;
  }>({ value: "", isValid: undefined });

  const [parents, setParents] = useState<Parent[]>([]);
  const [breeds, setBreeds] = useState<Breed[]>([]);

  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsFormValid(
      !!title.isValid &&
        !!image.isValid &&
        !!code.isValid &&
        !!price.isValid &&
        !!video.isValid &&
        !!birthDate.isValid &&
        !!mother.isValid &&
        !!father.isValid &&
        !!sex.isValid &&
        !!breed.isValid
    );
  }, [title, image, code, price, video, birthDate, mother, father, sex, breed]);

  useEffect(() => {
    getParents();
    getBreeds();
  }, []);

  const getParents = async () => {
    const res = await (await fetch("http://localhost:3000/api/parent")).json();
    if (res.ok) setParents(res.data);
  };

  const getBreeds = async () => {
    const res = await (await fetch("http://localhost:3000/api/breed")).json();
    if (res.ok) setBreeds(res.data);
  };

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("http://localhost:3000/api/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.value,
        image: "/images/products/" + image.value,
      }),
    });
    const data = await res.json();
    if (data.ok) {
      toast.success("محصول با موفقیت افزوده شد");
      setTitle({ isValid: undefined, value: "" });
      setImage({ isValid: undefined, value: "" });
      setTimeout(() => {
        router.push("/profile/products");
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
        title="افزودن محصول"
      >
        <TextBox
          state={title}
          setState={setTitle}
          placeholder="عنوان محصول"
          validationRules={[required(), minLength(4), maxLength(50)]}
        />
        <SelectBox
          defaultItemText="نژاد را انتخاب کنید ..."
          items={breeds}
          state={breed}
          setState={setBreed}
          optionPropName="title"
        />
        <TextBox
          state={code}
          setState={setCode}
          placeholder="کد"
          validationRules={[required(), minLength(4), maxLength(25)]}
        />
        <TextBox
          state={price}
          setState={setPrice}
          placeholder="قیمت"
          validationRules={[required(), mustNumber()]}
          inputDir="ltr"
        />
        <TextBox
          state={image}
          setState={setImage}
          placeholder="(test.jpg) نام تصویر + پسوند"
          inputDir="ltr"
          validationRules={[required(), isImage()]}
        />
        <TextBox
          state={video}
          setState={setVideo}
          placeholder="لینک ویدئو"
          inputDir="ltr"
          validationRules={[required()]}
        />
        <TextBox
          state={birthDate}
          setState={setBirthDate}
          placeholder="تاریخ تولد (1402/02/16)"
          inputDir="ltr"
          validationRules={[required(), isDate()]}
        />
        <SelectBox
          items={parents}
          defaultItemText="مادر توله را انتخاب کن ..."
          optionPropName="name"
          state={mother}
          setState={setMother}
        />
        <SelectBox
          items={parents}
          defaultItemText="پدر توله را انتخاب کن ..."
          optionPropName="name"
          state={father}
          setState={setFather}
        />
        <SelectBox
          items={[
            { _id: "male", name: "نر" },
            { _id: "female", name: "ماده" },
          ]}
          defaultItemText="جنسیت توله را انتخاب کن ..."
          optionPropName="name"
          state={sex}
          setState={setSex}
        />
      </GlobalForm>

      <ToastContainer position="top-center" bodyClassName="font-sans" />
    </div>
  );
}
