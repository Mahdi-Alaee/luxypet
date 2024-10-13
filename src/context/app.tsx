'use client'

import { getMe } from "@/lib/auth";
import { User } from "@/types/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie for client-side usage

interface AppContextType {
  user: User | null;
  reloadUser: () => void;
  loading: boolean
}

export const AppContext = createContext<null | AppContextType>(null);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    reloadUser();
  }, []);

  const reloadUser = async () => {
    setLoading(true);
    const sessionToken = Cookies.get("session"); // Use js-cookie to get cookie on client-side
    if (sessionToken) {
      const data = await getMe(sessionToken);
      setUser(data);
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  return (
    <AppContext.Provider value={{ user, reloadUser,loading }}>
      {children}
    </AppContext.Provider>
  );
}
