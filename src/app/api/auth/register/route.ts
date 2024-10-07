/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/database";
import { UserModel } from "@/models/User";
import { User } from "@/types/auth";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    await connectDB();
    const res = (await UserModel.create(body)) as User;

    const accessToken = jwt.sign(
      { _id: res._id, name: res.name },
      process.env.JWT_SALT!
    );

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
    } else return Response.json({error:err});

    return Response.json({ error: `کاربر گرامی "${str}" شما در پایگاه داده ما وجود دارد "${str}" دیگری انتخاب کنید` });
  }
}
