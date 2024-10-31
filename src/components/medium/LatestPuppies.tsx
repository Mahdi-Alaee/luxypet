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
    const res = await (await fetch("http://localhost:3000/api/product")).json();
    if (res.ok) {
      setProducts(res.data);
    }
    setLoading(false);
  };

  if (loading) return <Loading />;
  return (
    <section className="mb-12">
      <SectionTitle text="جدیدترین توله ها" />

      <div className="grid grid-cols-3 gap-4 mt-4 max-w-7xl mx-auto">
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
