'use client'
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { GiGearStickPattern } from "react-icons/gi";
import { MdSource, MdInsertChartOutlined, MdOutlineSpellcheck } from "react-icons/md";
import { RiRepeat2Fill } from "react-icons/ri";
import { GoHomeFill } from "react-icons/go";
import { VscDebugDisconnect } from "react-icons/vsc";
import { PiUserSoundFill, PiTreeStructureLight } from "react-icons/pi";
import { IoBook, IoReader, IoSettings, IoSave  } from "react-icons/io5";
import { ImHeadphones } from "react-icons/im";
import { VscWholeWord } from "react-icons/vsc";
import { LuGroup } from "react-icons/lu";
import { resetAllProgress } from '@/lib/db';
import { useLoading } from '../LoadingProvider';
import { toast } from 'sonner';



function Ham(){
   const { startLoading } = useLoading();
   const [page, setPage] = useState('learn')

   const [menu, setMenu] = useState(false)
   const [warning, setWarning] = useState(false)

   const pathname = usePathname()

   const router = useRouter()

   const toggleMenu = () => {
      setMenu(prev => !prev)
   }

   const closeMenu = () => {
      setMenu(false);
   };

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



   const navFromHam = (msg) => {

      
      const routes = {
         home: '/',
         saved: '/saved',
         statistics: '/statistics',
         review: '/review',
         words: '/words',
         grammar: '/grammar',
         stems: '/stems',
         synonyms: '/synonyms',
         speaking: '/speaking',
         writing: '/writing',
         listening: '/listening',
         reading: '/reading',
         source: '/source',
         settings: '/settings',
         patterns: '/patterns',
         phrasals: '/phrasals'
      };

      const target = routes[msg];
   
      if (!target) return;
   
      if (target === pathname) {
         closeMenu();
         return;
      }
      
      startLoading()
      router.push(target);
      closeMenu();
      
   }


   const underDev = (page) => {
      toast.warning(`The ${page} section is under development.`)
   }


   return(
      <div className='absolute top-0 left-0 overflow-hidden w-full min-h-dvh'>
         
         <div className='fixed top-0 right-0 px-3 py-3 z-5'
            onClick={toggleMenu}>
            <label className='z-2'>
               <div
                  className="w-9 h-10 cursor-pointer flex flex-col items-center justify-center"
                  >
                  <input
                     className="hidden peer"
                     type="checkbox"
                     checked={menu}
                     onChange={() => {}}
                     onClick={(e) => e.stopPropagation()}
                     aria-hidden="true"
                  />
                  <div
                     className="w-[50%] h-[2px] bg-foreground rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] peer-checked:-rotate-45"
                  ></div>
                  <div
                     className="w-[50%] h-[2px] bg-foreground rounded-md transition-all duration-300 origin-center peer-checked:hidden"
                  ></div>
                  <div
                     className="w-[50%] h-[2px] bg-foreground rounded-md transition-all duration-300 origin-left translate-y-[-0.45rem] peer-checked:rotate-45"
                  ></div>
               </div>
            </label>

         </div>

         {
            menu &&
            <div className="absolute top-0 left-0 w-full min-h-dvh bg-foreground/10 z-4 backdrop-blur-sm" onClick={() => setMenu(false)}></div>

         }


         <div className={`w-full fixed z-4 transition-all bg-background duration-500 ease-[cubic-bezier(0.075,0.82,0.165,1)] ${menu ? 'left-[50vw]' : 'left-full'}`}>
            
            <div className='w-full min-h-dvh pt-15 p-3 flex flex-col'>
               {/* <ThemeToggle /> */}

               <div className='w-[50vw] flex-1 flex flex-col justify-between pr-5'>
                  
                  <div className='w-full flex flex-col'>
                     
                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/10 rounded-xl' onClick={() => navFromHam('home')}>
                        <GoHomeFill />
                        <div>Home</div>
                     </div>

                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/10 rounded-xl' onClick={() => navFromHam('words')}>
                        <VscWholeWord />
                        <div>Vocabulary</div>
                     </div>

                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/10 rounded-xl' onClick={() => underDev('Grammar')}>
                        <MdOutlineSpellcheck />
                        <div>Grammar</div>
                     </div>

                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/10 rounded-xl' onClick={() => underDev('Stems')}>
                        <PiTreeStructureLight />
                        <div>Stems</div>
                     </div>

                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/10 rounded-xl' onClick={() => underDev('Patterns')}>
                        <GiGearStickPattern />
                        <div>Patterns</div>
                     </div>

                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/10 rounded-xl' onClick={() => underDev('Synonyms')}>
                        <LuGroup />
                        <div>Synonyms</div>
                     </div>

                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/10 rounded-xl' onClick={() => underDev('Synonyms')}>
                        <VscDebugDisconnect />
                        <div>Phrasals</div>
                     </div>

                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/10 rounded-xl' onClick={() => underDev('Speaking')}>
                        <PiUserSoundFill />
                        <div>Speaking</div>
                     </div>

                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/10 rounded-xl' onClick={() => underDev('Writing')}>
                        <IoReader />
                        <div>Writing</div>
                     </div>

                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/10 rounded-xl' onClick={() => underDev('Listening')}>
                        <ImHeadphones />
                        <div>Listening</div>
                     </div>

                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/10 rounded-xl' onClick={() => underDev('Reading')}>
                        <IoBook />
                        <div>Reading</div>
                     </div>

                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/10 rounded-xl' onClick={() => underDev('Saved')}>
                        <IoSave />
                        <div>Saved</div>
                     </div>

                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/10 rounded-xl' onClick={() => underDev('Statistics')}>
                        <MdInsertChartOutlined />
                        <div>Statistics</div>
                     </div>


                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/10 rounded-xl' onClick={() => underDev('Review')}>
                        <RiRepeat2Fill />
                        <div>Review</div>
                     </div>

                     <div className='w-full flex items-start gap-3 p-2 active:bg-foreground/10 rounded-xl' onClick={() => navFromHam('source')}>
                        <MdSource/>
                        <div>Source</div>
                     </div>

                  </div>
               

                  <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/10 rounded-xl' onClick={() => navFromHam('settings')}>
                     <IoSettings />
                     <div>Settings</div>
                  </div>
               </div>


            </div>

         </div>
         

      </div>
   )
}

export default Ham;