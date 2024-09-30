import Header from "@/components/large/Header";
import 'swiper/swiper-bundle.css';
import "./globals.css";

export default function RootLayout({
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
