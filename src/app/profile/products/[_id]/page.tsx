"use client";

import Loading from "@/app/loading";
import ProductFrom from "@/components/medium/ProductForm";
import {
  Breed,
  inputStateDefaultValue,
  Parent,
  InputStateType,
} from "@/types/entities";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Newproduct() {
  const { _id } = useParams();

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
  const [productLoading, setProductLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    loadProduct();
  }, []);

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("http://localhost:3000/api/product", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
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
      toast.success("محصول با موفقیت ویرایش شد");
      setTimeout(() => {
        router.push("/profile/products");
      }, 1000);
    } else {
      setLoading(false);
      toast.error(data.error);
    }
  };

  const loadProduct = async () => {
    const res = await (
      await fetch("http://localhost:3000/api/product?_id=" + _id)
    ).json();
    if (res.ok) {
      const product = res.data;
      setTitle({ isValid: true, value: product.title });
      setCode({ isValid: true, value: product.code });
      setPrice({ isValid: true, value: product.price });
      setImage({ isValid: true, value: product.image });
      setVideo({ isValid: true, value: product.video });
      setBirthDate({ isValid: true, value: product.birthDate });
      setMother({ isValid: true, value: product.mother });
      setFather({ isValid: true, value: product.father });
      setSex({ isValid: true, value: product.sex });
      setBreed({ isValid: true, value: product.breed });
    }
    setProductLoading(false);
  };
  if (productLoading) return <Loading />;
  return (
    <div className="pt-8 max-w-lg mx-auto">
      <ProductFrom
        formSubmit={formSubmit}
        loading={loading}
        breeds={breeds}
        setBreeds={setBreeds}
        parents={parents}
        setParents={setParents}
        formTitle="ویرایش محصول"
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
