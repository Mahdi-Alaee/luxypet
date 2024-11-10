import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'درباره ما',
};

export default function AboutUs() {
  return (
    <main className="max-w-7xl mx-auto flex flex-col gap-y-2 my-2 min-h-[50vh] px-4">
      <h1 className="box p-4 text-center text-4xl font-bold">درباره ما</h1>
      {/* content */}
      <div className="box p-4 text-center text-xl flex flex-col gap-y-3">
        <p>لوکسی پت مجموعه ای واقع در شهریار هست.</p>
        <p>
          هدف ما  ارائه انواع نژاد سگ در بالاترین کیفیت و مناسب ترین قیمت
          میباشد.
        </p>
        <p>
          لوکسی پت همواره تلاش میکند با رعایت انصاف و پایین نگه داشتن حاشیه سود و نگهداری عالی از مولدین و توله های خود به هدف مذکور دست یابد.
        </p>
        <h2 className="text-mainColor text-3xl pt-10 pb-4">خرید از ما به 2 روش قابل انجام میباشد</h2>
        <p className="text-justify md:text-right">1. بازدید حضوری: شما میتوانید باهماهنگی قبلی تشریف بیارید و از نزدیک توله مدنظر خود را ببینید و در صورت تمایل اقدام به خرید نمایید.</p>
        <p className="text-justify md:text-right">2. خرید آنلاین: همچنین میتوانید با دیدن ویدئو ها توله مدنظر خود را انتخاب کرده و اقدام به خرید کنید و در سریع ترین زمان ممکن درب منزل تحویل بگیرید.</p>

      </div>
    </main>
  );
}
