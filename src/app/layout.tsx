import Header from "@/components/large/Header";
import "react-toastify/dist/ReactToastify.css";
import "swiper/swiper-bundle.css";
import "./globals.css";
import Providers from "@/components/large/Providers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-bgColor">
        <Providers>
          <Header />
          {children}
        </Providers>
        <br />
        <br />
        <br />
        <br />
      </body>
    </html>
  );
}
