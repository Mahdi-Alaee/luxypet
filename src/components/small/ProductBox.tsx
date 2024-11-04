/* eslint-disable @next/next/no-img-element */
import { Product } from "@/types/entities";
import Image from "next/image";
import Link from "next/link";

export default function ProductBox({ title, image, price, code }: Product) {
  return (
    <div className="group bg-gray-100 shadow-sm overflow-hidden rounded-lg">
      {/* image */}
      <Link href={"/product/" + code}>
        <Image
          className="duration-200 group-hover:scale-105"
          src={"/images/products/" + image}
          alt={title}
          width="1000"
          height="1000"
        />
      </Link>
      {/* title */}
      <Link
        href={"/product/" + code}
        className="block text-xl my-3 mx-3 font-bold cursor-pointer duration-200 group-hover:text-mainPurple"
      >
        {title}
      </Link>
      {/* price */}
      <p className="text-lg mb-3 mx-3">{price.toLocaleString()} تومان</p>
    </div>
  );
}
