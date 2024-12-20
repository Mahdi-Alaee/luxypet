"use client";
import Loading from "@/app/loading";
import BuyProductModal from "@/components/medium/BuyProductModal";
import { calculateAge, convertGregorianToJalali } from "@/lib/utils";
import { Parent, Product } from "@/types/entities";
import Image from "next/image";
import Link from "next/link";
/* eslint-disable @next/next/no-img-element */

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HiHome } from "react-icons/hi";
import { LuDog } from "react-icons/lu";

export default function ProductPage() {
  const { code } = useParams();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [mother, setMother] = useState<Parent>();
  const [father, setFather] = useState<Parent>();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const res = await (
      await fetch((process?.env?.URL || "") + "/api/product?code=" + code)
    ).json();
    if (res.ok) {
      const productData = res.data as Product;
      setProduct(productData);
      const motherRes = await (
        await fetch(
          (process?.env?.URL || "") + "/api/parent?_id=" + productData.mother
        )
      ).json();
      const fatherRes = await (
        await fetch(
          (process?.env?.URL || "") + "/api/parent?_id=" + productData.father
        )
      ).json();
      setMother(motherRes.data);
      setFather(fatherRes.data);
    }
    setLoading(false);
  };

  if (loading) return <Loading />;
  return (
    <main className="max-w-[1600px] px-6 mx-auto mt-4">
      {/* title container */}
      <section className="flex flex-col gap-y-8 text-center justify-between box bg-mainColor py-8 px-4 md:flex-row">
        {/* title */}
        <h1 className="text-2xl text-textColor font-bold">
          {product?.title} - {product?.code}
        </h1>

        {/* buy button */}
        <button onClick={() => setIsOpenModal(true)} className="btn-purple bg-bgColor">
          خرید محصول
        </button>
      </section>
      {/* main content */}
      <section className="grid grid-cols-1 box bg-mainColor py-8 px-4 mt-4 md:grid-cols-2">
        {/* right image */}
        <Image
          width="1000"
          height="1000"
          src={"/images/products/"+product?.image}
          alt=""
        />

        {/* product info */}
        <div className="md:pr-3">
          <p className="grid grid-cols-2 py-3 pr-2 text-lg text-textColor even:text-mainColor even:bg-[#e2e1e19a]/50">
            <span>عنوان:</span> <span>{product?.title}</span>
          </p>
          <p className="grid grid-cols-2 py-3 pr-2 text-lg text-textColor even:text-mainColor even:bg-[#e2e1e19a]/50">
            <span>قیمت:</span>{" "}
            <span>{product?.price.toLocaleString()} تومان</span>
          </p>
          <p className="grid grid-cols-2 py-3 pr-2 text-lg text-textColor even:text-mainColor even:bg-[#e2e1e19a]/50">
            <span>سن:</span>{" "}
            <span>
              {product
                ? calculateAge(
                    convertGregorianToJalali(
                      product?.createdAt?.slice(0, 10) as string
                    ),
                    product?.birthDate
                  )
                : null}
            </span>
          </p>
          <p className="grid grid-cols-2 py-3 pr-2 text-lg text-textColor even:text-mainColor even:bg-[#e2e1e19a]/50">
            <span>جنسیت:</span>{" "}
            <span>{product?.sex === "male" ? "نر" : "ماده"}</span>
          </p>
          <p className="grid grid-cols-2 py-3 pr-2 text-lg text-textColor even:text-mainColor even:bg-[#e2e1e19a]/50">
            <span>تاریخ تولد:</span> <span>{product?.birthDate}</span>
          </p>
          <p className="grid grid-cols-2 py-3 pr-2 text-lg text-textColor even:text-mainColor even:bg-[#e2e1e19a]/50">
            <span>کد محصول:</span> <span>{product?.code}</span>
          </p>
          <p className="text-red-600 h-48 flex-grow content-center text-center text-2xl">
            تضمین بالاترین کیفیت و مناسب ترین قیمت ✌
          </p>
        </div>
      </section>
      <section className="flex flex-col items-center box bg-mainColor py-8 sm:px-4 mt-4">
        {/* title */}
        <h2 className="text-2xl mb-4 text-textColor">ویدئو</h2>
        {/* video */}
        <div className="h_iframe-aparat_embed_frame">
          <span style={{ display: "block", paddingTop: "57%" }}></span>
          <iframe
            src={`https://www.aparat.com/video/video/embed/videohash/${product?.video}/vt/frame`}
            allowFullScreen={true}
          ></iframe>
        </div>
          {/* <video controls src="https://www.irandogsland.com/images/video/20231204_9_new.mp4"></video> */}
      </section>
      <section className="box bg-mainColor py-8 px-4 mt-4">
        {/* title */}
        {/* <h2 className="text-2xl mb-4 text-center">مولدین</h2> */}
        {/* parents */}
        <div className="grid grid-cols-1 gap-y-8 w-full md:max-h-[600px] md:grid-cols-2">
          {/* پدر */}
          <div className="">
            <h3 className="text-center mb-8 text-4xl text-textColor">پدر</h3>
            <Image
              width="1000"
              height="1000"
              className="mx-auto max-h-96 object-contain"
              src={`/images/parents/${father?.image}`}
              alt=""
            />
          </div>
          {/* مادر */}
          <div className="">
            <h3 className="text-center mb-8 text-4xl text-textColor">مادر</h3>
            <Image
              width="1000"
              height="1000"
              className="mx-auto max-h-96 object-contain"
              src={`/images/parents/${mother?.image}`}
              alt=""
            />
          </div>
        </div>
      </section>
      <div className="flex justify-center py-8 gap-x-8">
        <Link className="btn-purple bg-mainColor flex flex-col-reverse gap-2 items-center sm:flex-row" href="/">
          بازگشت به خانه <HiHome className="text-2xl" />
        </Link>
        <Link className="btn-purple bg-mainColor flex flex-col-reverse gap-2 items-center sm:flex-row" href="/products">
          تمام توله ها <LuDog className="text-2xl" />
        </Link>
      </div>
      <BuyProductModal
        code={code as string}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
    </main>
  );
}
