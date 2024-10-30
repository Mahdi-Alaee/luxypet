"use client";
import Loading from "@/app/loading";
import BuyProductModal from "@/components/medium/BuyProductModal";
import { calculateAge, convertGregorianToJalali } from "@/lib/utils";
import { Product } from "@/types/entities";
/* eslint-disable @next/next/no-img-element */

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const { code } = useParams();
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState(true);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const res = await (
      await fetch("http://localhost:3000/api/product?code=" + code)
    ).json();
    if (res.ok) {
      const product = res.data;
      console.log({ product });
      setProduct(product);
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  return (
    <main className="max-w-[1600px] px-6 mx-auto mt-4">
      {/* title container */}
      <section className="flex justify-between box py-8 px-4">
        {/* title */}
        <h1 className="text-2xl font-bold">
          {product?.title} - {product?.code}
        </h1>

        {/* buy button */}
        <button onClick={() => setIsOpenModal(true)} className="btn-purple">
          خرید محصول
        </button>
      </section>
      {/* main content */}
      <section className="box py-8 px-4 mt-4 grid grid-cols-2">
        {/* right image */}
        <img src="/images/products/presa-1.jpg" alt="" />

        {/* product info */}
        <div className="pr-3">
          <p className="grid grid-cols-2 py-3 pr-2 text-lg text-gray-600 odd:bg-[#e2e1e19a]">
            <span>عنوان:</span> <span>{product?.title}</span>
          </p>
          <p className="grid grid-cols-2 py-3 pr-2 text-lg text-gray-600 odd:bg-[#e2e1e19a]">
            <span>قیمت:</span>{" "}
            <span>{product?.price.toLocaleString()} تومان</span>
          </p>
          <p className="grid grid-cols-2 py-3 pr-2 text-lg text-gray-600 odd:bg-[#e2e1e19a]">
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
          <p className="grid grid-cols-2 py-3 pr-2 text-lg text-gray-600 odd:bg-[#e2e1e19a]">
            <span>جنسیت:</span>{" "}
            <span>{product?.sex === "male" ? "نر" : "ماده"}</span>
          </p>
          <p className="grid grid-cols-2 py-3 pr-2 text-lg text-gray-600 odd:bg-[#e2e1e19a]">
            <span>تاریخ تولد:</span> <span>{product?.birthDate}</span>
          </p>
          <p className="grid grid-cols-2 py-3 pr-2 text-lg text-gray-600 odd:bg-[#e2e1e19a]">
            <span>کد محصول:</span> <span>{product?.code}</span>
          </p>
          <p className="text-red-500 h-48 flex-grow content-center text-center text-2xl">
            تضمین بالاترین کیفیت و مناسب ترین قیمت ✌
          </p>
        </div>
      </section>
      <section className="flex flex-col items-center box py-8 px-4 mt-4">
        {/* title */}
        <h2 className="text-2xl mb-4">ویدئو</h2>
        {/* video */}
        <div className="h_iframe-aparat_embed_frame">
          <span style={{ display: "block", paddingTop: "57%" }}></span>
          <iframe
            src={`https://www.aparat.com/video/video/embed/videohash/${product?.video}/vt/frame`}
            allowFullScreen={true}
          ></iframe>
        </div>
      </section>
      <BuyProductModal
        code={code as string}
        isOpenModal={isOpenModal}
        setIsOpenModal={setIsOpenModal}
      />
    </main>
  );
}
