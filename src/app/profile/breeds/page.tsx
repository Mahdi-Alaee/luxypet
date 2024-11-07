"use client";

import Loading from "@/app/loading";
import DeleteButton from "@/components/small/DeleteButton";
/* eslint-disable @next/next/no-img-element */
import NavigateButton from "@/components/small/NavigateButton";
import { Breed } from "@/types/entities";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export const dynamic = "force-dynamic";

export default function Breeds() {
  const [breeds, setBreeds] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getBreeds();
  }, []);

  const getBreeds = async () => {
    const res = await (await fetch((process?.env?.URL || '')+"/api/breed")).json();
    if (res.ok) {
      setBreeds(res.data);
    }
    setLoading(false);
  };

  const deleteBreed = async (_id: string) => {
    const res = await (
      await fetch((process?.env?.URL || '')+"/api/breed?_id=" + _id, {
        method: "DELETE",
      })
    ).json();
    if (res.ok) {
      toast.success("نژاد با موفقیت حذف شد");
      getBreeds();
    } else {
      toast.error(res.error);
    }
  };

  if (loading) return <Loading />;
  return (
    <div className="mt-8">
      <NavigateButton href="/profile/breeds/new" icon="left">
        افزودن نژاد
      </NavigateButton>

      {/* list of breeds */}
      {breeds.length > 0 ? (
        <ul className="flex flex-col gap-y-2 mt-6">
          {breeds.map((breed: Breed) => (
            <li
              className="grid grid-cols-3 grid-rows-1 bg-gray-100 h-24"
              key={breed._id}
            >
              <span className="my-auto mr-4 text-lg">{breed.title}</span>
              <div className="flex items-center justify-center">
                <DeleteButton
                  _id={breed._id}
                  onDelete={deleteBreed}
                  className="py-2"
                >
                  حذف
                </DeleteButton>
              </div>
              <Image
                className="h-full w-auto mr-auto"
                src={breed.image}
                alt={breed.title}
                width='1000'
                height='1000'
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="bg-red-600 text-red-200 text-center text-xl mt-6">
          نژادی وجود ندارد
        </p>
      )}

      <ToastContainer position="top-center" bodyClassName="font-sans" />
    </div>
  );
}
