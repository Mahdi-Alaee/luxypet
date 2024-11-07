import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/database";
import { UserModel } from "@/models/User";
import { User } from "@/types/auth";

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("Authorization") as string;
    const user = jwt.verify(token, process.env.JWT_SALT!) as User;
    await connectDB();
    const findedUser = await UserModel.findById(user._id);
    if (!findedUser.name) throw "error in finding me";
    return Response.json(findedUser);
  } catch (err) {
    console.log(err);
    return Response.json(false);
  }
}
