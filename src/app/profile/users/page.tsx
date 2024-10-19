"use client";

import DeleteButton from "@/components/small/DeleteButton";
import { User } from "@/types/auth";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

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

  const deleteUser = (_id: string) => {
    console.log({_id});
  };

  if (loading) return <p className="text-center text-2xl mt-12">loading ...</p>;
  return (
    <div className="mt-8">
      {/* list of users */}
      {users.length > 0 ? (
        <ul className="flex flex-col gap-y-2 mt-6">
          {users.map((user: User) => (
            <li
              className="flex justify-between bg-gray-100 h-20"
              key={user._id}
            >
              <span className="my-auto mr-4 text-lg">{user.name}</span>
              <span className="my-auto mr-4 text-lg">{user.email}</span>
              <div className="flex items-center gap-x-4 ml-4">
                <DeleteButton
                  _id={user._id!}
                  onDelete={deleteUser}
                  className="py-2"
                >
                  حذف
                </DeleteButton>
                <button className="bg-blue-500 text-lg text-white px-4 rounded-md py-2">ویرایش</button>
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
