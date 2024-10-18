'use client'

/* eslint-disable @next/next/no-img-element */
import NavigateButton from "@/components/small/NavigateButton";
import { Breed } from "@/types/entities";
import { useEffect, useState } from "react";

export const dynamic = 'force-dynamic';

export default function Breeds() {
  const [breeds,setBreeds] = useState([]);
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const res = await (await fetch("http://localhost:3000/api/breed")).json();
      console.log({ breeds: res.data });
      if(res.ok){
        setBreeds(res.data)
      }
      setLoading(false);
    })()
  },[])
  if(loading) return <p className="text-center text-2xl mt-12">loading ...</p>
  return (
    <div className="mt-8">
      <NavigateButton href="/profile/breeds/new" icon="left">
        افزودن نژاد
      </NavigateButton>

      {/* list of breeds */}
      {breeds.length > 0 ? (
        <ul className="flex flex-col gap-y-2 mt-6">
          {breeds.map((breed: Breed) => (
            <li className="flex justify-between bg-gray-100 h-20" key={breed._id}>
              <span className="my-auto mr-4 text-lg">{breed.title}</span>
              <img className="h-full" src={breed.image} alt={breed.title} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="bg-red-600 text-red-200 text-center text-xl mt-6">نژادی وجود ندارد</p>
      )}
    </div>
  );
}
