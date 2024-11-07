"use client";

import { useEffect, useState } from "react";
import ProductBox from "../small/ProductBox";
import SectionTitle from "../small/SectionTitle";
import { Product } from "@/types/entities";
import Link from "next/link";
import Loading from "@/app/loading";

export default function LatestPuppies() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    console.log({ url: process?.env?.URL });

    const res = await (
      await fetch((process?.env?.URL || "") + "/api/product")
    ).json();
    console.log({ res });

    if (res.ok) {
      setProducts(res.data);
    }
    setLoading(false);
  };

  if (loading) return <Loading />;
  return (
    <section className="mb-12 mt-20 md:mt-0">
      <SectionTitle text="جدیدترین توله ها" />

      <div className="grid grid-cols-1 gap-4 mt-4 max-w-7xl mx-auto px-8 sm:px-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductBox key={product._id} {...product} />
        ))}
      </div>

      <Link
        href="/products"
        className="text-mainPurple bg-gray-200 p-4 font-bold text-lg rounded-md duration-150 hover:text-gray-200 hover:bg-mainPurple w-max mx-auto mt-12 block"
      >
        مشاهده تمام محصولات
      </Link>
    </section>
  );
}
