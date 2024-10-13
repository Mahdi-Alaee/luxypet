import connectDB from "@/lib/database";
import { UserModel } from "@/models/User";
import { User } from "@/types/auth";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

export async function PUT(req: NextRequest) {
  const userBody = await req.json();
  const body = { ...userBody, password: undefined };
  console.log({ body });

  await connectDB();
  const currentUser = (await UserModel.findById(userBody._id)) as User;
  if (
    userBody.currentPassword &&
    (await bcrypt.compare(userBody.currentPassword, currentUser.password!))
  ) {
    body.password = await bcrypt.hash(userBody.password, 10);
  } else {
    return Response.json({ ok: false, error: "پسوورد را به درستی وارد کنید" });
  }

  const res = await UserModel.updateOne(body);
  console.log({ res });

  return Response.json({ ok: res.acknowledged });
}
