"use client";

import Loading from "@/app/loading";
import DeleteButton from "@/components/small/DeleteButton";
/* eslint-disable @next/next/no-img-element */
import NavigateButton from "@/components/small/NavigateButton";
import { Product } from "@/types/entities";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export const dynamic = "force-dynamic";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res = await (await fetch((process?.env?.URL || '')+"/api/product")).json();
    if (res.ok) {
      setProducts(res.data);
    }
    setLoading(false);
  };

  const deleteProduct = async (_id: string) => {
    const res = await (
      await fetch((process?.env?.URL || '')+"/api/product?_id=" + _id, {
        method: "DELETE",
      })
    ).json();
    if (res.ok) {
      toast.success("محصول با موفقیت حذف شد");
      getProducts();
    } else {
      toast.error(res.error);
    }
  };

  if (loading) return <Loading />;
  return (
    <div className="mt-8">
      <NavigateButton href="/profile/products/new" icon="left">
        افزودن محصول
      </NavigateButton>

      {/* list of Products */}
      {products.length > 0 ? (
        <ul className="flex flex-col gap-y-2 mt-6">
          {products.map((product: Product) => (
            <li
              className="flex flex-col-reverse items-center py-4 gap-y-4 bg-mainColor text-textColor sm:grid sm:h-28 sm:grid-cols-3 sm:grid-rows-1 sm:py-0"
              key={product._id}
            >
              <span className="my-auto mr-4 text-lg">{product.code}</span>
              <div className="flex items-center justify-center gap-x-4">
                <DeleteButton
                  _id={product._id}
                  onDelete={deleteProduct}
                  className="py-2"
                >
                  حذف
                </DeleteButton>
                <Link
                  href={"/profile/products/" + product._id}
                  className="bg-blue-600 text-lg text-textColor px-4 rounded-md py-2"
                >
                  ویرایش
                </Link>
              </div>
              <Image
                className="w-64 mx-auto sm:w-auto sm:h-full sm:mr-auto sm:mx-0"
                src={'/images/products/'+product.image}
                alt={product.title}
                                width='1000'
                height='1000'
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="bg-red-600 text-red-200 text-center text-xl mt-6">
          محصولی وجود ندارد
        </p>
      )}

      <ToastContainer position="top-center" bodyClassName="font-sans" />
    </div>
  );
}
