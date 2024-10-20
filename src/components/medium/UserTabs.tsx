import UserTab from "../small/UserTab";

const usertabs = [
  { id: 1, href: "/profile", title: "پروفایل" },
  { id: 2, href: "/profile/users", title: "کاربران" },
  { id: 3, href: "/profile/breeds", title: "نژاد ها" },
  { id: 4, href: "/profile/parents", title: "مولد ها" },
  { id: 5, href: "/profile/products", title: "محصولات" }, 
];

export default function UserTabs() {
  return (
    <div className="flex gap-x-3 justify-center">
      {usertabs.map(({ id, href, title }) => (
        <UserTab key={id} href={href} title={title} />
      ))}
    </div>
  );
}
