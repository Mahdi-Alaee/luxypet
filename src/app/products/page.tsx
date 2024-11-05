"use client";

import ProductBox from "@/components/small/ProductBox";
import { Product as productType } from "@/types/entities";
import { useEffect, useState } from "react";
import Loading from "../loading";
import Link from "next/link";



export default function Products() {
  const [products, setProducts] = useState<productType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res = await (await fetch("http://localhost:3000/api/product")).json();
    console.log(res);

    if (res.ok) {
      setProducts(res.data);
    }
    setLoading(false);
  };

  if (loading) return <Loading />;
  return (
    <main>
      {/* container */}
      <div className="max-w-7xl mx-auto">
        <section className="box py-6 px-4">
          <h1 className="text-mainPurple text-3xl font-bold text-center">
            تمام محصولات
          </h1>
        </section>
        <section className="box py-4 mt-4 px-6">
          <div className="grid grid-cols-1 gap-4 mx-auto sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductBox key={product._id} {...product} />
            ))}
          </div>
        </section>
        <section className="box py-4 mt-4 px-6 text-lg">
          <p className="flex gap-x-4">
            خرید توله سگ گارد و نگهبان نژاد های مختلف با قیمت مناسب و تضمین
            اصالت کامل.
            <span className="underline text-mainPurple flex gap-x-4">
              <Link href="/aboutus">درباره ما</Link>
              <Link href="/contactus">تماس باما</Link>
            </span>
          </p>
        </section>
      </div>
    </main>
  );
}
