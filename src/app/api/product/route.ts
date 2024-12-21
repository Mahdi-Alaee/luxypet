import connectDB from "@/lib/database";
import { ProductModel } from "@/models/Product";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("_id");
    const code = url.searchParams.get("code");
    await connectDB();
    let res = null;
    if (id) {
      res = await ProductModel.findById(id);
    } else if (code) {
      res = await ProductModel.findOne({ code });
    } else {
      res = await ProductModel.find();
    }
    return Response.json({ ok: !!res, data: res });
  } catch (error) {
    return Response.json({ ok: false, error });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
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
    console.log({ body });

    await connectDB();
    const res = await ProductModel.updateOne(
      { _id: body._id },
      { ...body, _id: undefined }
    );
    console.log({ res });

    return Response.json({ ok: res.acknowledged });
  } catch (error) {
    return Response.json({ ok: false, error });
  }
}
