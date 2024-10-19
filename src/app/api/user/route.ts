import connectDB from "@/lib/database";
import { UserModel } from "@/models/User";

export async function GET() {
  await connectDB();
  const users = await UserModel.find();
  console.log({ users });
  return Response.json(users);
}
