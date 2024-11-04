"use client";

import Loading from "@/app/loading";
import DeleteButton from "@/components/small/DeleteButton";
/* eslint-disable @next/next/no-img-element */
import NavigateButton from "@/components/small/NavigateButton";
import { Parent } from "@/types/entities";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export const dynamic = "force-dynamic";

export default function Parents() {
  const [parents, setParents] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getParents();
  }, []);

  const getParents = async () => {
    const res = await (await fetch("http://localhost:3000/api/parent")).json();
    if (res.ok) {
      setParents(res.data);
    }
    setLoading(false);
  };

  const deleteParent = async (_id: string) => {
    const res = await (
      await fetch("http://localhost:3000/api/parent?_id=" + _id, {
        method: "DELETE",
      })
    ).json();
    console.log(res);
    if (res.ok) {
      toast.success("مولد با موفقیت حذف شد");
      getParents();
    } else {
      toast.error(res.error);
    }
  };

  if (loading) return <Loading />;
  return (
    <div className="mt-8">
      <NavigateButton href="/profile/parents/new" icon="left">
        افزودن مولد
      </NavigateButton>

      {/* list of parents */}
      {parents.length > 0 ? (
        <ul className="flex flex-col gap-y-2 mt-6">
          {parents.map((parent: Parent) => (
            <li
              className="grid grid-cols-3 grid-rows-1 bg-gray-100 h-24"
              key={parent._id}
            >
              <span className="my-auto mr-4 text-lg">{parent.name}</span>
              <div className="flex items-center justify-center">
                <DeleteButton
                  _id={parent._id}
                  onDelete={deleteParent}
                  className="py-2"
                >
                  حذف
                </DeleteButton>
              </div>
              <Image
                className="h-full w-auto mr-auto"
                src={"/images/parents/" + parent.image}
                alt={parent.name}
                width="1000"
                height="1000"
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="bg-red-600 text-red-200 text-center text-xl mt-6">
          مولدی وجود ندارد
        </p>
      )}

      <ToastContainer position="top-center" bodyClassName="font-sans" />
    </div>
  );
}
