'use client'
import { createContext, useContext, useState } from "react"



const MyContext = createContext()

export function MyContextProvider({ children }){
   const [vocabData, setVocabData] = useState({})



   return(
      <MyContext.Provider value={{vocabData, setVocabData}}>
         {children}
      </MyContext.Provider>
   )
}

export function useData() {
   const context = useContext(MyContext)
   if(context === undefined){
      throw new Error('useData must be inside MyContextProvider')
   }
   return context
}

