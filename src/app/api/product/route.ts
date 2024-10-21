import connectDB from "@/lib/database";
import { ProductModel } from "@/models/Product";
import { NextRequest } from "next/server";

export async function GET() {
  await connectDB();
  const data = await ProductModel.find();
  return Response.json(data);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log({ body });
    await connectDB();
    const res = await ProductModel.create({ ...body });
    return Response.json({ ok: true, res });
  } catch (err) {
    console.log(err);
    return Response.json({ ok: false, error: "!مشکلی وجود دارد" });
  }
}