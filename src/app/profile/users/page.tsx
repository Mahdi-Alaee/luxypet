"use client";

import Loading from "@/app/loading";
import DeleteButton from "@/components/small/DeleteButton";
import { User } from "@/types/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const res = await fetch("http://localhost:3000/api/user");
    const data = await res.json();
    console.log({ data });
    setUsers(data);
    setLoading(false);
  };

  const deleteUser = async (_id: string) => {
    const res = await (
      await fetch("http://localhost:3000/api/user?_id=" + _id, {
        method: "DELETE",
      })
    ).json();
    console.log(res);
    if (res.ok) {
      toast.success("کاربر با موفقیت حذف شد");
      getUsers();
    } else {
      toast.error(res.error);
    }
  };

  if (loading) return <Loading />;
  return (
    <div className="mt-8">
      {/* list of users */}
      {users.length > 0 ? (
        <ul className="flex flex-col gap-y-2 mt-6">
          {users.map((user: User) => (
            <li
              className="flex flex-col gap-y-4 justify-center bg-gray-100 p-2 sm:h-20 sm:justify-between sm:flex-row"
              key={user._id}
            >
              <span className="my-auto mr-4 text-lg text-center">{user.name}</span>
              <span className="my-auto mr-4 text-lg text-center">{user.email}</span>
              <div className="flex items-center justify-center gap-x-4 ml-4">
                <DeleteButton
                  _id={user._id!}
                  onDelete={deleteUser}
                  className="py-2"
                >
                  حذف
                </DeleteButton>
                <Link
                  href={"/profile/users/" + user._id}
                  className="bg-blue-500 text-lg text-white px-4 rounded-md py-2"
                >
                  ویرایش
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="bg-red-600 text-red-200 text-center text-xl mt-6">
          کاربری وجود ندارد
        </p>
      )}

      <ToastContainer position="top-center" bodyClassName="font-sans" />
    </div>
  );
}
