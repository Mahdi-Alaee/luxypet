import UserTab from "../small/UserTab";
import { useContext } from "react";
import { AppContext } from "@/context/app";

const usertabs = [
  { id: 1, href: "/profile", title: "پروفایل", isProtected: false },
  { id: 2, href: "/profile/users", title: "کاربران", isProtected: true },
  { id: 3, href: "/profile/breeds", title: "نژاد ها", isProtected: true },
  { id: 4, href: "/profile/parents", title: "مولد ها", isProtected: true },
  { id: 5, href: "/profile/products", title: "محصولات", isProtected: true },
];

export default function UserTabs() {
  const context = useContext(AppContext);


  return (
    <div className="flex gap-x-3 justify-center">
      {usertabs.map(({ id, href, title, isProtected }) => {
        if (isProtected) {
          return context?.user?.isAdmin ? (
            <UserTab key={id} href={href} title={title} />
          ) : null;
        } else {
          return <UserTab key={id} href={href} title={title} />;
        }
      })}
    </div>
  );
}
