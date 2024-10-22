"use client";

import UserTabs from "@/components/medium/UserTabs";
import { AppContext } from "@/context/app";
import { redirect, usePathname } from "next/navigation";
import { useContext } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const context = useContext(AppContext);
  const pathname = usePathname();

  if (context?.loading)
    return <p className="text-center text-2xl mt-12">loading ...</p>;
  else if (!context?.user) redirect("/login");
  else if (pathname !== "/profile" && !context?.user?.isAdmin)
    redirect("/profile");
  return (
    <main className="max-w-3xl mx-auto pt-12">
      <UserTabs />

      {children}
    </main>
  );
}
