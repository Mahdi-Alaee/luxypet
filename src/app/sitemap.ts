import { Product } from "@/types/entities";

export default async function sitemap() {
  let products: { url: string; lastModified: string | undefined }[] = [];
  try {
    const res = await (
      await fetch((process?.env?.URL || "") + "/api/product", {
        cache: "no-store",
      })
    ).json();
    if (res.ok) {
      const productsData = res.data as Product[];
      products = productsData.map((product) => ({
        url: `${process.env.URL}/product/${product.code}`,
        lastModified: product.createdAt,
      }));
    }
  } catch (err) {
    console.log(err);
  }

  return [
    {
      url: process.env.URL,
      lastModified: new Date(),
    },
    {
      url: process.env.URL + "/products",
      lastModified: new Date(),
    },
    ...products,
  ];
}
