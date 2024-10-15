import Link from "next/link";
import { ReactNode } from "react";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

interface NavigateButtonProps {
  icon: "left" | "right";
  href: string;
  children: ReactNode;
}

export default function NavigateButton({
  href,
  icon,
  children,
}: NavigateButtonProps) {
  return (
    <Link
      className="flex items-center gap-x-2 text-xl justify-center border py-3 duration-150 hover:bg-gray-200"
      href={href}
    >
      {icon === "right" && <BsArrowRightCircle className="text-2xl" />}{" "}
      {children} {icon === "left" && <BsArrowLeftCircle className="text-2xl" />}
    </Link>
  );
}
