'use client'
import Switch from "@/components/switch/switch";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { resetAllProgress, resetLevelProgress } from "@/lib/db";
import { toast } from "sonner";
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
import { useSettings } from "@/app/context/SettingsProvider";



function Settings(){
   const { setSettings, settings } = useSettings()
   const [warning, setWarning] = useState(false)
   const [part, setPart] = useState('')



   const showWarning = (label) => {
      setWarning(true)
      setPart(label)
   }

   const cancelReset = () => {
      setWarning(false)
   }

   const resetApp = async () => {
      try {
         await resetAllProgress()
         toast.info('The App Restarted')
         setWarning(false)
         localStorage.clear()
         window.location.href = '/';
         
      } catch (error){
         console.error('Error Restarting:', error)
      }
   }

   const resetAction = async () => {
      try {
         await resetLevelProgress(part)
         setWarning(false)
         toast.info(`The ${part} Section Restarted`)
         
      } catch (error){
         console.error('Error Restarting:', error)
      }
   }
   
   const resetSettings = () => {
      localStorage.clear()
      
      setSettings({
         discoveryMode: false,
         activatePractice: true,
         showIdiom: false
      })

      toast.info(`All the settings are reset to default`)
   }


   const changeSettings = (msg) => {

      if(msg === 'idiomBox') {
         setSettings(prev => ({
            ...prev,
            showIdiom: !prev.showIdiom
         }))
      }

      if(msg === 'discoveryMode') {
         setSettings(prev => ({
            ...prev,
            discoveryMode: !prev.discoveryMode
         }))
      }

      if(msg === 'activatePractice') {
         setSettings(prev => ({
            ...prev,
            activatePractice: !prev.activatePractice
         }))
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
                  <button className="w-full text-bold text-start text-md">App Theme</button>
                  <div className="text-xs">Switch between dark and light modes</div>
               </div>

               <ThemeToggle />
            </div>

            <div
               onClick={() => changeSettings('idiomBox')}
               className="w-full flex justify-between items-center active:bg-foreground/3 rounded-lg z-1 p-2"
            >
               <div className="flex flex-col">
                  <button className="w-full text-bold text-start text-md">Idiom Box</button>
                  <div className="text-xs">Display the idiom box in home screen</div>
               </div>

               <label 
                  onClick={(e) => e.stopPropagation()}
                  className="relative inline-block text-[17px] w-13 h-[1.5em]">
                  <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.showIdiom}
                  onChange={() => changeSettings('idiomBox')}
               />

                  <span
                     className="absolute inset-0 cursor-pointer rounded-full bg-gray-300 transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] peer-checked:bg-green-400 peer-focus:shadow-[0_0_1px_#0974f1] before:content-[''] before:absolute before:inset-0 before:flex before:h-[1.5em] before:w-[1.5em] before:items-center before:justify-center before:rounded-[50px] before:bg-white before:transition-all before:duration-400 before:ease-[cubic-bezier(0.175,0.885,0.32,1.275)] peer-checked:before:translate-x-[1.52em]"
                  />
               </label>
            </div>


         </div>

         <div className="w-full flex flex-col pt-5 gap-1">
            <button className="font-bold text-start text-gray-500 text-xs border-0 border-b-2 border-gray-300">LEARNING</button>

            <div
               onClick={() => changeSettings('discoveryMode')}
               className="w-full flex justify-between items-center active:bg-foreground/3 rounded-lg z-1 p-2"
            >
               <div className="flex flex-col">
                  <button className="w-full text-bold text-start text-md">Discovery Mode</button>
                  <div className="text-xs">Activate learning through discovering</div>
               </div>

               <label 
                  onClick={(e) => e.stopPropagation()}
                  className="relative inline-block text-[17px] w-13 h-[1.5em]">
                  <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.discoveryMode}
                  onChange={() => changeSettings('discoveryMode')}
               />

                  <span
                     className="absolute inset-0 cursor-pointer rounded-full bg-gray-300 transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] peer-checked:bg-green-400 peer-focus:shadow-[0_0_1px_#0974f1] before:content-[''] before:absolute before:inset-0 before:flex before:h-[1.5em] before:w-[1.5em] before:items-center before:justify-center before:rounded-[50px] before:bg-white before:transition-all before:duration-400 before:ease-[cubic-bezier(0.175,0.885,0.32,1.275)] peer-checked:before:translate-x-[1.52em]"
                  />
               </label>
            </div>

            <div
               onClick={() => changeSettings('activatePractice')}
               className="w-full flex justify-between items-center active:bg-foreground/3 rounded-lg z-1 p-2"
            >
               <div className="flex flex-col">
                  <button className="w-full text-bold text-start text-md">Lesson Practice</button>
                  <div className="text-xs">Practice after each lesson</div>
               </div>

               <label 
                  onClick={(e) => e.stopPropagation()}
                  className="relative inline-block text-[17px] w-13 h-[1.5em]">
                  <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={settings.activatePractice}
                  onChange={() => changeSettings('activatePractice')}
               />

                  <span
                     className="absolute inset-0 cursor-pointer rounded-full bg-gray-300 transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] peer-checked:bg-green-400 peer-focus:shadow-[0_0_1px_#0974f1] before:content-[''] before:absolute before:inset-0 before:flex before:h-[1.5em] before:w-[1.5em] before:items-center before:justify-center before:rounded-[50px] before:bg-white before:transition-all before:duration-400 before:ease-[cubic-bezier(0.175,0.885,0.32,1.275)] peer-checked:before:translate-x-[1.52em]"
                  />
               </label>
            </div>

         </div>

         <div className="w-full flex flex-col pt-5 gap-1">
            <button className="font-bold text-start text-gray-500 text-xs border-0 border-b-2 border-gray-300">RESET</button>

            <button onClick={() => showWarning('the app')}
               className="w-full text-bold text-start text-md p-2 active:bg-foreground/3 rounded-lg z-1"
            
            >Reset the App</button>

            <div
               className="w-full flex justify-between items-center active:bg-foreground/3 rounded-lg z-1 pr-2"
            >
               <button className="w-full text-bold text-start text-md p-2 active:bg-foreground/3 rounded-lg z-1">Reset the Progress</button>


               <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                     <Button variant="outline">select</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                  <DropdownMenuGroup>
                     <DropdownMenuLabel>Vocabulary</DropdownMenuLabel>
                     <DropdownMenuItem onClick={() => showWarning('A1')}>A1</DropdownMenuItem>
                     <DropdownMenuItem>A2</DropdownMenuItem>
                     <DropdownMenuItem>B1</DropdownMenuItem>
                     <DropdownMenuItem>B2</DropdownMenuItem>
                     <DropdownMenuItem>C1</DropdownMenuItem>
                     <DropdownMenuItem>C2</DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Grammar</DropdownMenuItem>
                  <DropdownMenuItem>Prepositions</DropdownMenuItem>
                  <DropdownMenuItem>Word Family</DropdownMenuItem>
                  <DropdownMenuItem>Speaking</DropdownMenuItem>
                  <DropdownMenuItem>Writing</DropdownMenuItem>
                  <DropdownMenuItem>Reading</DropdownMenuItem>
                  <DropdownMenuItem>Writing</DropdownMenuItem>
                  <DropdownMenuItem>Quiz</DropdownMenuItem>
                  </DropdownMenuContent>
               </DropdownMenu>
            </div>

            <button
               onClick={() => showWarning('settings')}
               className="w-full text-bold text-start text-md p-2 active:bg-foreground/3 rounded-lg z-1"
            >Reset the Settings</button>
         </div>

         {
            warning &&
            <div className='absolute top-0 left-0 w-full min-h-dvh bg-background/20 backdrop-blur-sm flex items-center justify-center p-10 z-1' onClick={cancelReset}>
               <div className='w-full h-40 p-6 text-center bg-background border rounded-2xl flex flex-col justify-between items-center'>
                  <div className='w-full flex flex-col justify-center items-center'>
                     <div className='text-lg'>All progress will be lost.</div>
                     <div className='text-sm'>Are you sure to reset {part}?</div>
                  </div>
                  <div className='w-full flex justify-center gap-5'>
                     <button className='w-20 py-2 rounded-2xl border border-gray-400 active:bg-black/10' onClick={cancelReset}>No</button>
                     {
                        <button className='w-20 py-2 rounded-2xl border border-gray-400 active:bg-black/10' onClick={resetAction}>Yes</button>
                     }
                  </div>
               </div>
            </div>
         }

         {
            warning &&
            <div className='absolute top-0 left-0 w-full min-h-dvh bg-background/20 backdrop-blur-sm flex items-center justify-center p-10 z-1' onClick={cancelReset}>
               <div className='w-full h-40 p-6 text-center bg-background border rounded-2xl flex flex-col justify-between items-center'>
                  <div className='w-full flex flex-col justify-center items-center'>
                     <div className='text-lg'>All progress will be lost.</div>
                     <div className='text-sm'>Are you sure to reset {part}?</div>
                  </div>
                  
                  <div className='w-full flex justify-center gap-5'>
                     <button className='w-20 py-2 rounded-2xl border border-gray-400 active:bg-black/10' onClick={cancelReset}>No</button>
                     {
                        part === 'the app' ?

                        <button className='w-20 py-2 rounded-2xl border border-gray-400 active:bg-black/10' onClick={resetApp}>Yes</button>

                     :  part === 'settings' ?

                        <button className='w-20 py-2 rounded-2xl border border-gray-400 active:bg-black/10' onClick={resetSettings}>Yes</button>
                     :
                        <button className='w-20 py-2 rounded-2xl border border-gray-400 active:bg-black/10' onClick={resetAction}>Yes</button>
                     }
                  </div>
               </div>
            </div>
         }

      </div>
   )
}

export default Settings;