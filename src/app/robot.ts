import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/",'/products','/product'],
      disallow: [],
    },
    sitemap: `${process.env.URL}/sitemap.xml`
  };
}
