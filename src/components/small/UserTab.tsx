"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface UserTabProps {
  href: string;
  title: string;
}

export default function UserTab({ href, title }: UserTabProps) {
  const pathname = usePathname();
  
  return (
    <Link
      className={`text-xl rounded-full px-5 py-3 duration-150 hover:text-textColor/80 bg-bgColor2 text-textColor ${
        pathname === href && "bg-mainColor"
      }`}
      href={href}
    >
      {title}
    </Link>
  );
}
