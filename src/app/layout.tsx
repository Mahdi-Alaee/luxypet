import Header from "@/components/large/Header";
import "react-toastify/dist/ReactToastify.css";
import "swiper/swiper-bundle.css";
import "./globals.css";
import Providers from "@/components/large/Providers";
import Footer from "@/components/large/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process?.env?.URL as string),
  title: {
    template: "لوکسی پت | %s",
    default: "لوکسی پت",
  },
  description:
    "لوکسی پت خرید و قیمت سگ نگهبان و گارد نژاد پرسا کاناریو، کنکورسو، پیتبول، پیت بول",
  keywords: [
    "سگ",
    "خرید سگ",
    "سگ سرابی",
    "سگ نگهبان",
    "سگ وحشی",
    "خرید توله سگ",
    "خرید توله پرسا کاناریو",
    "خرید پرسا کاناریو",
    "نژاد پرسا کاناریو",
    "پرسا کاناریو",
    "کین کورسو",
    "پیتبول",
    "خرید سگ",
    "خرید سگ نگهبان",
    "خرید سگ پیتبول",
    "پیت بول",
    "قیمت سگ نگهبان",
    "قیمت سگ",
    "قیمت توله سگ نژاد پرسا کاناریو",
    "سگ سرابی",
    "خرید پرسا کاناریو",
    "قیمت پرسا کاناریو",
    "قیمت توله پرسا کاناریو",
    "قیمت سگ پرسا کاناریو",
  ],
};

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
