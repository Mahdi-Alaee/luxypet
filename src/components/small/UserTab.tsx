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
      className={`text-xl rounded-full px-4 py-2 duration-150 hover:text-mainPurple bg-gray-300 ${
        pathname === href && "text-mainPurple"
      }`}
      href={href}
    >
      {title}
    </Link>
  );
}
