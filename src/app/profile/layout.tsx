import UserTabs from "@/components/medium/UserTabs";
import { getMe } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // console.log('test');
  
  // const pathname = headers().get('referer'); 
  // console.log({pathname});
  

  const user = await getMe(cookies().get("session")?.value);
  if (!user) redirect("/login");
  // else if (pathname !== "/profile" && !user.isAdmin) redirect("/");
  return (
    <main className="max-w-3xl mx-auto pt-12">
      <UserTabs />

      {children}
    </main>
  );
}
