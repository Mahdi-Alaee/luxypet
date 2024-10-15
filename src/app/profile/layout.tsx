import UserTabs from "@/components/medium/UserTabs";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="max-w-3xl mx-auto pt-12">
        <UserTabs />

        {children}
    </main>
  );
}
