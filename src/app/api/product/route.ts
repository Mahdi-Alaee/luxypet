import connectDB from "@/lib/database";
import { ProductModel } from "@/models/Product";

export async function GET() {
  await connectDB();
  const data = await ProductModel.find();
  return Response.json(data);
}
