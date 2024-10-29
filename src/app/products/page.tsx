"use client";

import ProductBox from "@/components/small/ProductBox";
import { Product as productType } from "@/types/entities";
import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState<productType[]>([]);

  useEffect(() => {
    getProducts()
  }, []);

  const getProducts = async () => {
    const res = await (await fetch("http://localhost:3000/api/product")).json();
    console.log(res);
    
    if (res.ok) {
      setProducts(res.data);
    }
  };

  return (
    <main>
      <h1 className="text-mainPurple text-3xl mt-10 mb-6 font-bold text-center">تمام محصولات</h1>
      <div className="grid grid-cols-1 gap-4 mt-4 max-w-7xl px-6 mx-auto sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductBox key={product._id} {...product} />
        ))}
      </div>
    </main>
  );
}
