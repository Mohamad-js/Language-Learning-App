'use client'
import { MyContextProvider } from "@/components/context/MyContext"


export function Providers({children}){
   return <MyContextProvider>{children}</MyContextProvider>
}