import { User } from "@/types/auth";

export async function register(body: User) {
  console.log({ body });
  const res = await fetch("http://localhost:3000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  console.log({ data });
}

