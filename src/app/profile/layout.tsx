"use client";

import UserTabs from "@/components/medium/UserTabs";
import { AppContext } from "@/context/app";
import { redirect, usePathname } from "next/navigation";
import { useContext } from "react";
import Loading from "../loading";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const context = useContext(AppContext);
  const pathname = usePathname();

  if (context?.loading)
    return <Loading />;
  else if (!context?.user) redirect("/login");
  else if (pathname !== "/profile" && !context?.user?.isAdmin)
    redirect("/profile");
  return (
    <main className="max-w-3xl mx-auto pt-12 min-h-[40vh] mb-12 px-4">
      <UserTabs />

      {children}
    </main>
  );
}
