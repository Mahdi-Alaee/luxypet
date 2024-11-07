import connectDB from "@/lib/database";
import { UserModel } from "@/models/User";
import { User } from "@/types/auth";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

export async function PUT(req: NextRequest) {
  const userBody = await req.json();
  try {
    const body = { ...userBody, password: undefined };
    await connectDB();
    const currentUser = (await UserModel.findById(userBody._id)) as User;
    if (
      !!userBody.currentPassword &&
      !!userBody.password &&
      !!userBody.rePassword
    ) {
      if (
        await bcrypt.compare(userBody.currentPassword, currentUser.password!)
      ) {
        body.password = await bcrypt.hash(userBody.password, 10);
      } else {
        return Response.json({
          ok: false,
          error: "رمز فعلی را به درستی وارد کنید",
        });
      }
    }
    console.log({ body });

    const res = await UserModel.findByIdAndUpdate(body._id, {
      ...body,
      _id: undefined,
    });
    console.log({ res });

    return Response.json({ ok: true });
  } catch (err) {
    console.log(err);

    return Response.json({ ok: false, error: "خطا!" });
  }
}
