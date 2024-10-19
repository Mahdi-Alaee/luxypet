import connectDB from "@/lib/database";
import { UserModel } from "@/models/User";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("_id");
    await connectDB();
    if (!id) {
      const users = await UserModel.find();
      console.log({ users });
      return Response.json(users);
    } else {
      const user = await UserModel.findById(id);
      console.log({ user });
      return Response.json(user);
    }
  } catch (error) {
    return Response.json({ ok: false, error });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("_id");

    await connectDB();
    const data = await UserModel.findByIdAndDelete(id);

    return Response.json({ ok: true, data });
  } catch (error) {
    console.log(error);
    return Response.json({ ok: false, error });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const userBody = await req.json();
    const body = { ...userBody };
    body.password = await bcrypt.hash(body.password, 10);

    await connectDB();
    const res = await UserModel.updateOne(body);
    console.log({ res });

    return Response.json({ ok: res.acknowledged });
  } catch (error) {
    return Response.json({ ok: false, error });
  }
}
