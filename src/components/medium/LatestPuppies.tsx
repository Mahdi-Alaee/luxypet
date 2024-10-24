"use client";

import { useEffect, useState } from "react";
import ProductBox from "../small/ProductBox";
import SectionTitle from "../small/SectionTitle";
import { Product } from "@/types/entities";

// export const dynamic = "force-dynamic";

export default function LatestPuppies() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res = await (await fetch("http://localhost:3000/api/product")).json();
    if (res.ok) {
      setProducts(res.data);
    }
  };

  // let products: Product[] = [];
  // const res = await (await fetch("http://localhost:3000/api/product")).json();
  // if (res.ok) {
  //   products = res.data;
  // }
  // console.log(res);

  return (
    <section className="mt-10">
      <SectionTitle text="جدیدترین توله ها" />

      <div className="grid grid-cols-3 gap-4 mt-4 max-w-7xl mx-auto">
        {products.map((product) => (
          <ProductBox key={product._id} {...product} />
        ))}
      </div>
    </section>
  );
}
