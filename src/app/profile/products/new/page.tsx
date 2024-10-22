"use client";

import ProductFrom from "@/components/medium/ProductForm";
import {
  Breed,
  inputStateDefaultValue,
  Parent,
  InputStateType,
} from "@/types/entities";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Newproduct() {

  const [title, setTitle] = useState<InputStateType>(inputStateDefaultValue);

  const [code, setCode] = useState<InputStateType>(inputStateDefaultValue);

  const [price, setPrice] = useState<InputStateType>(inputStateDefaultValue);

  const [image, setImage] = useState<InputStateType>(inputStateDefaultValue);

  const [video, setVideo] = useState<InputStateType>(inputStateDefaultValue);

  const [birthDate, setBirthDate] = useState<InputStateType>(
    inputStateDefaultValue
  );

  const [mother, setMother] = useState<InputStateType>(inputStateDefaultValue);

  const [father, setFather] = useState<InputStateType>(inputStateDefaultValue);

  const [sex, setSex] = useState<InputStateType>(inputStateDefaultValue);

  const [breed, setBreed] = useState<InputStateType>(inputStateDefaultValue);

  const [parents, setParents] = useState<Parent[]>([]);
  const [breeds, setBreeds] = useState<Breed[]>([]);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

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
        image: image.value,
        price: price.value,
        video: video.value,
        birthDate: birthDate.value,
        father: father.value,
        mother: mother.value,
        sex: sex.value,
        code: code.value,
        breed: breed.value,
      }),
    });
    const data = await res.json();
    if (data.ok) {
      toast.success("محصول با موفقیت افزوده شد");
      setTimeout(() => {
        router.push("/profile/products");
      }, 1000);
    } else toast.error(data.error);
    setLoading(false);
  };
  
  return (
    <div className="pt-8 max-w-lg mx-auto">
      <ProductFrom
        formSubmit={formSubmit}
        loading={loading}
        // setLoading={setLoading}
        breeds={breeds}
        setBreeds={setBreeds}
        parents={parents}
        setParents={setParents}
        formTitle="افزودن محصول"
        title={title}
        image={image}
        code={code}
        price={price}
        video={video}
        birthDate={birthDate}
        mother={mother}
        father={father}
        sex={sex}
        breed={breed}
        setTitle={setTitle}
        setImage={setImage}
        setCode={setCode}
        setPrice={setPrice}
        setVideo={setVideo}
        setBirthDate={setBirthDate}
        setMother={setMother}
        setFather={setFather}
        setSex={setSex}
        setBreed={setBreed}
      />

      <ToastContainer position="top-center" bodyClassName="font-sans" />
    </div>
  );
}
