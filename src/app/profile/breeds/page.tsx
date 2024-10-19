"use client";

import DeleteButton from "@/components/small/DeleteButton";
/* eslint-disable @next/next/no-img-element */
import NavigateButton from "@/components/small/NavigateButton";
import { Breed } from "@/types/entities";
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
    const res = await (await fetch("http://localhost:3000/api/breed")).json();
    if (res.ok) {
      setBreeds(res.data);
    }
    setLoading(false);
  };

  const deleteBreed = async (_id: string) => {
    const res = await (
      await fetch("http://localhost:3000/api/breed?_id=" + _id, {
        method: "DELETE",
      })
    ).json();
    console.log(res);
    if (res.ok) {
      toast.success("نژاد با موفقیت حذف شد");
      getBreeds();
    } else {
      toast.error(res.error);
    }
  };

  if (loading) return <p className="text-center text-2xl mt-12">loading ...</p>;
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
              className="flex justify-between bg-gray-100 h-20"
              key={breed._id}
            >
              <span className="my-auto mr-4 text-lg">{breed.title}</span>
              <DeleteButton
                _id={breed._id}
                onDelete={deleteBreed}
                className="my-4"
              >
                حذف
              </DeleteButton>
              <img className="h-full" src={breed.image} alt={breed.title} />
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
