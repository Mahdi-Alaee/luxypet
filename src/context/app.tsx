import { getMe } from "@/lib/auth";
import { User } from "@/types/auth";
import { cookies } from "next/headers";
import { createContext, ReactNode, useEffect, useState } from "react";

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
    const data = await getMe(cookies().get("session")?.value);
    setUser(data);
  };

  return (
    <AppContext.Provider value={{ user, reloadUser }}>
      {children}
    </AppContext.Provider>
  );
}
