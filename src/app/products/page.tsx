import { Metadata } from "next";
import ProductsPage from "./ProductsPage";

export const metadata: Metadata = {
  title: 'محصولات',
};

export default function ProductPageWrapper() {
  return <ProductsPage />;
}
