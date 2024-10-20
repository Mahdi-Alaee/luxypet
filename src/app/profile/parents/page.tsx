"use client";

import DeleteButton from "@/components/small/DeleteButton";
/* eslint-disable @next/next/no-img-element */
import NavigateButton from "@/components/small/NavigateButton";
import { Parent } from "@/types/entities";
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

  if (loading) return <p className="text-center text-2xl mt-12">loading ...</p>;
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
              className="flex justify-between bg-gray-100 h-20"
              key={parent._id}
            >
              <span className="my-auto mr-4 text-lg">{parent.name}</span>
              <DeleteButton
                _id={parent._id}
                onDelete={deleteParent}
                className="my-4"
              >
                حذف
              </DeleteButton>
              <img className="h-full" src={parent.image} alt={parent.name} />
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
