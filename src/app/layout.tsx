import Header from "@/components/large/Header";
import "react-toastify/dist/ReactToastify.css";
import "swiper/swiper-bundle.css";
import "./globals.css";
import Providers from "@/components/large/Providers";
import Footer from "@/components/large/Footer";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-bgColor min-h-screen">
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
