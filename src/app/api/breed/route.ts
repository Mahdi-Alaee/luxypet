import connectDB from "@/lib/database";
import { BreedModel } from "@/models/Breed";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log({ body });
    await connectDB();
    const res = await BreedModel.create({ ...body });
    return Response.json({ ok: true, res });
  } catch (err) {
    console.log(err);
    return Response.json({ ok: false, error: "نام نژاد نمیتواند تکراری باشد" });
  }
}

export async function GET() {
  try {
    await connectDB();
    const data = await BreedModel.find();
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
    const data = await BreedModel.findByIdAndDelete(id);

    return Response.json({ ok: true, data });
  } catch (error) {
    console.log(error);
    return Response.json({ ok: false, error });
  }
}
