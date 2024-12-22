/* eslint-disable @next/next/no-img-element */
import { Product } from "@/types/entities";
import Image from "next/image";
import Link from "next/link";

export default function ProductBox({
  title,
  image,
  price,
  code,
  soldOut,
}: Product) {
  return (
    <div className="group relative bg-mainColor text-textColor shadow-sm overflow-hidden rounded-lg">
      {/* image */}
      <Link
        className={`${soldOut ? "pointer-events-none" : ""}`}
        href={"/product/" + code}
      >
        <Image
          className={`duration-200 max-h-52 object-cover group-hover:scale-105`}
          src={"/images/products/" + image}
          alt={title}
          width="1000"
          height="1000"
        />
      </Link>
      {/* title */}
      <Link
        href={"/product/" + code}
        className={`block text-textColor/80 text-xl my-3 mx-3 font-bold cursor-pointer duration-200 group-hover:text-textColor ${
          soldOut ? "pointer-events-none" : ""
        }`}
      >
        {title}
      </Link>
      {/* price */}
      <p className={`text-lg mb-3 mx-3 ${soldOut ? "line-through" : ""}`}>
        {price.toLocaleString()} تومان
      </p>

      {/* soldout fidget */}
      {soldOut ? (
        <span className="absolute top-3 -right-9 text-white bg-red-800 px-8 py-2 text-xl rotate-45">
          فروخته شد
        </span>
      ) : (
        <span className="absolute top-4 -right-10 text-white bg-green-800 px-8 py-2 text-xl rotate-45">
          آماده تحویل
        </span>
      )}
    </div>
  );
}
