import connectDB from "@/lib/database";
import { ParentModel } from "@/models/Parent";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await connectDB();
    const res = await ParentModel.create({ ...body });
    return Response.json({ ok: true, res });
  } catch (err) {
    console.log(err);
    return Response.json({ ok: false, error: "نام مولد نمیتواند تکراری باشد" });
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("_id");
    let data = null;
    await connectDB();
    if (id) {
      data = await ParentModel.findById(id);
    } else data = await ParentModel.find();
    return Response.json({ ok: true, data });
  } catch (error) {
    console.log(error);
    return Response.json({ ok: false, error });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("_id");

    await connectDB();
    const data = await ParentModel.findByIdAndDelete(id);

    return Response.json({ ok: true, data });
  } catch (error) {
    console.log(error);
    return Response.json({ ok: false, error });
  }
}
