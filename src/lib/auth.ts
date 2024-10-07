import { User } from "@/types/auth";

export async function register(body: User, errorToast: (txt:string) => void) {
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
  if (data.error) {
    errorToast(data.error);
    throw data.error;
  }
  saveCookie("session", data.accessToken, 10);
  return true;
}

export function saveCookie(
  cookieName: string,
  cookieValue: string,
  exDay: number = 10
) {
  const expiredDay = new Date();
  expiredDay.setTime(expiredDay.getTime() + exDay * 24 * 60 * 60 * 1000); // {exDay} rooz bad
  document.cookie = `${cookieName}=${cookieValue};path=/;expires=${expiredDay}`;
}
