'use client'

import { getMe } from "@/lib/auth";
import { User } from "@/types/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie for client-side usage

interface AppContextType {
  user: User | false;
  reloadUser: () => void;
}

export const AppContext = createContext<null | AppContextType>(null);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | false>(false);

  useEffect(() => {
    reloadUser();
  }, []);

  const reloadUser = async () => {
    const sessionToken = Cookies.get("session"); // Use js-cookie to get cookie on client-side
    if (sessionToken) {
      const data = await getMe(sessionToken);
      setUser(data);
    } else {
      setUser(false);
    }
  };

  return (
    <AppContext.Provider value={{ user, reloadUser }}>
      {children}
    </AppContext.Provider>
  );
}
