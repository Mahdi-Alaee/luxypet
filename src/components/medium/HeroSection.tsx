import MySwiper from "./MySwiper";

const deskImages = [
  "/images/slider/1.jpg",
  "/images/slider/2.jpg",
  "/images/slider/3.jpg",
  "/images/slider/4.jpg",
  "/images/slider/5.jpg",
];
const mobileImages = ["/images/slider/6.jpg"];

export default function HeroSection() {
  return (
    <section className="relative z-0">
      <div className="hidden md:block">
        <MySwiper images={deskImages} className="w-full max-w-6xl" />
      </div>
      <div className="md:hidden">
        <MySwiper images={mobileImages} className="" />
      </div>
      <div className="absolute top-0 left-0 right-0 mx-auto z-10 flex justify-center">
        <h1 className="text-gray-100 bg-darkestPurple/80 p-4 text-2xl text-center">لوکسی پت مرجع تخصصی خرید و فروش سگ نژاد پرسا کاناریو</h1>
      </div>
    </section>
  );
}
