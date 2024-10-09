import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/database";
import { UserModel } from "@/models/User";
import { User } from "@/types/auth";

export async function GET(req:NextRequest) {
    const token = req.headers.get('Authorization') as string;
    const user = jwt.verify(token,process.env.JWT_SALT!) as User;
    await connectDB();
    const findedUser = await UserModel.findById(user._id);
    console.log({findedUser});
    
    
    return Response.json(user);
}
