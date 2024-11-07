import { User } from "@/types/auth";
import jwt from "jsonwebtoken";
import { Dispatch, SetStateAction } from "react";

export interface LoginData {
  phone: string;
  password: string;
}

export async function login(
  body: LoginData,
  setLoading: Dispatch<SetStateAction<boolean>>,
  errorToast: (txt: string) => void,
  goToHome: () => void,
  reloadUser: () => void
) {
  const res = await fetch((process?.env?.URL || '') + "/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();

  setLoading(false);
  if (data.ok) {
    saveCookie("session", data.accessToken, 10);
    reloadUser();
    setTimeout(() => {
      goToHome();
    }, 1000);
    return true;
  } else {
    throw new Error("Credentials error");
  }
}

export async function register(
  body: User,
  errorToast: (txt: string) => void,
  setLoading: Dispatch<SetStateAction<boolean>>,
  goToHome: () => void,
  reloadUser: () => void
) {
  setLoading(true);
  const res = await fetch((process?.env?.URL || '') + "/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  if (data.error) {
    setLoading(false);
    errorToast(data.error);
    throw data.error;
  }
  saveCookie("session", data.accessToken, 10);
  reloadUser();
  setTimeout(() => {
    goToHome();
  }, 1000);
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

export async function getMe(token: string | undefined) {
  if (!token) {
    return null;
  }

  const res = await fetch((process?.env?.URL || '') + "/api/auth/me", {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as User;
  return data;
}

export function createToken(user: User) {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      emailVerified: user.emailVerified,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SALT!
  );
}
