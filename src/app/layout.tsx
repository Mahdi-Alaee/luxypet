import Header from "@/components/large/Header";
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/swiper-bundle.css';
import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="bg-bgColor">
        <Header />
        {children}
      </body>
    </html>
  );
}
