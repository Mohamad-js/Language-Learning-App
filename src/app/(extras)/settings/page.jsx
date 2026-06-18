'use client'
import Switch from "@/components/switch/switch";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { resetAllProgress } from "@/lib/db";
import ThemeToggle from "@/components/themeSwitch/themeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



function Settings(){
   const [darkTheme, setDarkTheme] = useState(false);
   const [warning, setWarning] = useState(false)
   const [part, setPart] = useState('')



   const showWarning = (label) => {
      setWarning(true)
      setPart(label)
   }

   const cancelReset = () => {
      setWarning(false)
   }

      const resetAction = async () => {
         try {
            await resetAllProgress()
            setWarning(false)
            localStorage.clear()
            window.location.href = '/';
   
         } catch (error){
            console.error('Error Restarting:', error)
         }
      }




   return(
      <div className='w-full min-h-dvh flex flex-col p-5'>
         <div className="text-lg">Settings</div>

         <div className="w-full flex flex-col pt-5 gap-1">
            <button className="font-bold text-start text-gray-500 text-xs border-0 border-b-2 border-gray-300">THEME</button>

            <div
               className="w-full flex justify-between items-center active:bg-foreground/3 rounded-lg z-1 p-2"
            >
               <div className="flex flex-col">
                  <button className="w-full text-bold text-start text-md">Switch Mode</button>
                  <div className="text-xs">Switch between dark and light modes</div>
               </div>

               <ThemeToggle />
            </div>

            <div
               onClick={() => setDarkTheme(!darkTheme)}
               className="w-full flex justify-between items-center active:bg-black/3 rounded-lg z-1 p-2"
            >
               <div className="flex flex-col">
                  <button className="w-full text-bold text-start text-md">Vocabs Old Version</button>
                  <div className="text-xs">Activate the old version for vocabs</div>
               </div>

               <Switch darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
            </div>

         </div>

         <div className="w-full flex flex-col pt-5 gap-1">
            <button className="font-bold text-start text-gray-500 text-xs border-0 border-b-2 border-gray-300">RESET</button>

            <button className="w-full text-bold text-start text-md p-2 active:bg-black/3 rounded-lg z-1">Reset App</button>

            <div
               className="w-full flex justify-between items-center active:bg-black/3 rounded-lg z-1 pr-2"
            >
               <button className="w-full text-bold text-start text-md p-2 active:bg-black/3 rounded-lg z-1">Reset Progress</button>


               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="outline">select</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                  <DropdownMenuGroup>
                     <DropdownMenuLabel>Vocabulary</DropdownMenuLabel>
                     <DropdownMenuItem onClick={() => showWarning('A1')}>A1</DropdownMenuItem>
                     <DropdownMenuItem disabled onClick={() => showWarning('A2')}>A2</DropdownMenuItem>
                     <DropdownMenuItem disabled onClick={() => showWarning('B1')}>B1</DropdownMenuItem>
                     <DropdownMenuItem disabled onClick={() => showWarning('B2')}>B2</DropdownMenuItem>
                     <DropdownMenuItem disabled onClick={() => showWarning('C1')}>C1</DropdownMenuItem>
                     <DropdownMenuItem disabled onClick={() => showWarning('C2')}>C2</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem disabled>Grammar</DropdownMenuItem>
                  <DropdownMenuItem disabled>Prepositions</DropdownMenuItem>
                  <DropdownMenuItem disabled>Word Family</DropdownMenuItem>
                  <DropdownMenuItem disabled>Speaking</DropdownMenuItem>
                  <DropdownMenuItem disabled>Writing</DropdownMenuItem>
                  <DropdownMenuItem disabled>Reading</DropdownMenuItem>
                  <DropdownMenuItem disabled>Writing</DropdownMenuItem>
                  <DropdownMenuItem disabled>Quiz</DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>

            <button className="w-full text-bold text-start text-md p-2 active:bg-black/3 rounded-lg z-1">Reset Settings</button>
         </div>

         {
            warning &&
            <div className='absolute top-0 left-0 w-full min-h-dvh bg-black/50 flex items-center justify-center p-10' onClick={cancelReset}>
               <div className='w-full h-40 p-6 text-center bg-white rounded-2xl flex flex-col justify-between items-center'>
                  <div className='w-full flex flex-col justify-center items-center'>
                     <div className='text-lg'>All progress will be lost.</div>
                     <div className='text-sm'>Are you sure to reset {part} level?</div>
                  </div>
                  <div className='w-full flex justify-center gap-5'>
                     <button className='w-20 py-2 rounded-2xl border border-gray-400 active:bg-black/10' onClick={cancelReset}>No</button>
                     <button className='w-20 py-2 rounded-2xl border border-gray-400 active:bg-black/10' onClick={resetAction}>Yes</button>
                  </div>
               </div>
            </div>
         }

      </div>
   )
}

export default Settings;