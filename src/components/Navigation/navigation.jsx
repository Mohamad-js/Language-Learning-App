'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigation } from "@/app/context/NavigationProvider";




function Navigation(){
   const { active, setActive } = useNavigation()

   const tabs = ['A1', 'A2', 'B1', 'B1', 'C1', 'C2'];


   return(
      <div className='fixed bottom-0 left-0 w-full grid grid-cols-6 bg-background/40 backdrop-blur-xs h-15 border-t border-gray-50 z-1 px-5'>
         {tabs.map((level, index) => (
            <button
               onClick={() => setActive(index)}
               key={index}
               className="relative flex items-center justify-center text-foreground"
            >
                  <motion.div
                     className="relative z-1 text-foreground"
                     animate={{
                        y: active === index ? -23 : 0,
                        scale: active === index ? 1.3 : 1
                     }}
                     transition={{
                        type: 'spring',
                        stiffness: 600,
                        damping: 50
                     }}
                  >
                     {level}
                  </motion.div>

               {
                  active === index && (
                     <motion.div 
                        className="absolute -top-5 size-12 rounded-2xl bg-background shadow-lg"
                        layoutId="bubble"
                        transition={{
                           type: 'spring',
                           stiffness: 900,
                           damping: 70
                        }}
                     />
                  )
               }
            </button>
         ))}
      </div>
   )
}

export default Navigation;