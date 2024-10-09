import Header from "@/components/large/Header";
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/swiper-bundle.css';
import "./globals.css";
import { cookies } from "next/headers";
import { getMe } from "@/lib/auth";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = cookies().get('session');
  console.log({session: session?.value});
  const me = await getMe(session?.value);
  console.log({me});
  

  return (
    <html lang="en">
      <body className="bg-bgColor">
        <Header />
        {children}
      </body>
    </html>
  );
}
