import ProductPage from "./ProductPage";

export async function generateMetadata({
  params: { code },
}: {
  params: { code: string };
}) {
  console.log({ code });

  const res = await (
    await fetch("http://localhost:3000/api/product?code=" + code)
  ).json();

  return {
    title: `${res.data.title}`,
    description: `خرید و قیمت ${res.data.title}`,
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
}

export default function ProductPageWrapper() {
  return <ProductPage />;
}
