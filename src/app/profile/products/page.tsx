"use client";

import Loading from "@/app/loading";
import DeleteButton from "@/components/small/DeleteButton";
/* eslint-disable @next/next/no-img-element */
import NavigateButton from "@/components/small/NavigateButton";
import { Product } from "@/types/entities";
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
    const res = await (await fetch("http://localhost:3000/api/product")).json();
    if (res.ok) {
      setProducts(res.data);
    }
    setLoading(false);
  };

  const deleteProduct = async (_id: string) => {
    const res = await (
      await fetch("http://localhost:3000/api/product?_id=" + _id, {
        method: "DELETE",
      })
    ).json();
    console.log(res);
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
              className="grid grid-cols-3 grid-rows-1 bg-gray-100 h-20"
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
                  className="bg-blue-500 text-lg text-white px-4 rounded-md py-2"
                >
                  ویرایش
                </Link>
              </div>
              <img
                className="h-full mr-auto"
                src={'/images/products/'+product.image}
                alt={product.title}
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
