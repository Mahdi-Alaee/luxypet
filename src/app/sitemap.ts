import { Product } from "@/types/entities";

export default async function sitemap() {
  const baseUrl = "https://luxypet.ir";

  const res = await (
    await fetch((process?.env?.URL || '')+"/api/product", {
      cache: "no-store",
    })
  ).json();
  let products: { url: string; lastModified: string | undefined }[] = [];
  if (res.ok) {
    const productsData = res.data as Product[];
    products = productsData.map((product) => ({
      url: `${baseUrl}/product/${product.code}`,
      lastModified: product.createdAt,
    }));
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: baseUrl + "/products",
      lastModified: new Date(),
    },
    ...products,
  ];
}
