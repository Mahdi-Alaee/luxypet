/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/database";
import { UserModel } from "@/models/User";
import { User } from "@/types/auth";
import { NextRequest } from "next/server";
import { createToken } from "@/lib/auth";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as User;
    const password = await bcrypt.hash(body.password!, 10);

    await connectDB();
    const res = (await UserModel.create({ ...body, password })) as User;

    const accessToken = createToken(res);

    console.log(res);
    return Response.json({ res, accessToken });
  } catch (err: any) {
    const errObj = err.keyValue as object;
    const keys = Object.keys(errObj);
    let str = "";
    if (keys[0] === "name") {
      str = "نام";
    } else if (keys[0] === "email") {
      str = "ایمیل";
    } else if (keys[0] === "phone") {
      str = "شماره تلفن";
    } else return Response.json({ error: err });

    return Response.json({
      error: `کاربر گرامی "${str}" شما در پایگاه داده ما وجود دارد "${str}" دیگری انتخاب کنید`,
    });
  }
}
