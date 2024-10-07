import connectDB from "@/lib/database";
import { UserModel } from "@/models/User";
import { User } from "@/types/auth";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const body = await req.json();
  
  await connectDB();
  const res = (await UserModel.create(body)) as User;

  const accessToken = jwt.sign(
    { _id: res._id, name: res.name },
    process.env.JWT_SALT!
  );

  console.log(res);
  return Response.json({ res, accessToken });
}
