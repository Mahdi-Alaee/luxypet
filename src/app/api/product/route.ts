import connectDB from "@/lib/database";
import { ProductModel } from "@/models/Product";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("_id");
    await connectDB();
    if (!id) {
      const products = await ProductModel.find();
      console.log({ products });
      return Response.json({ ok: true, data: products });
    } else {
      const product = await ProductModel.findById(id);
      console.log({ product });
      return Response.json({ ok: true, data: product });
    }
  } catch (error) {
    return Response.json({ ok: false, error });
  }
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

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("_id");

    await connectDB();
    const data = await ProductModel.findByIdAndDelete(id);

    return Response.json({ ok: true, data });
  } catch (error) {
    console.log(error);
    return Response.json({ ok: false, error });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    await connectDB();
    const res = await ProductModel.updateOne(body);
    console.log({ res });

    return Response.json({ ok: res.acknowledged });
  } catch (error) {
    return Response.json({ ok: false, error });
  }
}