import { createToken, LoginData } from "@/lib/auth";
import connectDB from "@/lib/database";
import { UserModel } from "@/models/User";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as LoginData;
  await connectDB();
  const user = await UserModel.findOne(body);
  if(!user) return Response.json({ accessToken: null, ok: !!user })
  const accessToken = createToken(user);

  return Response.json({ accessToken, ok: !!user });
}
