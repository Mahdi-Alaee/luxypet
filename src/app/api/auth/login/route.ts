import { createToken, LoginData } from "@/lib/auth";
import connectDB from "@/lib/database";
import { UserModel } from "@/models/User";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as LoginData;
  await connectDB();
  const user = await UserModel.findOne({ phone: body.phone });
  if (!user || !(await bcrypt.compare(body.password, user.password)))
    return Response.json({ accessToken: null, ok: false });
  const accessToken = createToken(user);

  return Response.json({ accessToken, ok: !!user });
}
