import { AppContextProvider } from "@/context/app";
import { ReactNode } from "react";

export default function Providers({children}:{children:ReactNode}) {
    return (
        <AppContextProvider>
            {children}
        </AppContextProvider>
    )
}