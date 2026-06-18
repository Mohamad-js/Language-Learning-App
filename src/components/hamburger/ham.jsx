'use client'
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { CiSaveDown1 } from "react-icons/ci";
import { MdOutlineRestartAlt, MdSource, MdInsertChartOutlined, MdOutlineSpellcheck } from "react-icons/md";
import { BiErrorCircle } from "react-icons/bi";
import { RiRepeat2Fill } from "react-icons/ri";
import { GoHomeFill, GoQuestion } from "react-icons/go";
import { PiUserSoundFill  } from "react-icons/pi";
import { IoBook, IoReader, IoSettings, IoSave  } from "react-icons/io5";
import { ImHeadphones } from "react-icons/im";
import { VscWholeWord } from "react-icons/vsc";
import { LuGroup } from "react-icons/lu";
import { HiMiniRectangleGroup } from "react-icons/hi2";
import { TbComponentsOff } from "react-icons/tb";
import ThemeToggle from '../themeSwitch/themeToggle';
import { resetAllProgress } from '@/lib/db';
import { useLoading } from '../LoadingProvider';



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
         quiz: '/quiz',
         words: '/words',
         grammar: '/grammar',
         prepositions: '/prepositions',
         synonyms: '/synonyms',
         speaking: '/speaking',
         writing: '/writing',
         listening: '/listening',
         reading: '/reading',
         source: '/source',
         settings: '/settings',
         wordFamily: '/word_family',
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

                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/10 rounded-xl' onClick={() => navFromHam('grammar')}>
                        <MdOutlineSpellcheck />
                        <div>Grammar</div>
                     </div>

                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/10 rounded-xl' onClick={() => navFromHam('wordFamily')}>
                        <MdOutlineSpellcheck />
                        <div>Word Family</div>
                     </div>

                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/10 rounded-xl' onClick={() => navFromHam('prepositions')}>
                        <TbComponentsOff />
                        <div>Prepositions</div>
                     </div>

                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/10 rounded-xl' onClick={() => navFromHam('speaking')}>
                        <PiUserSoundFill />
                        <div>Speaking</div>
                     </div>

                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/10 rounded-xl' onClick={() => navFromHam('writing')}>
                        <IoReader />
                        <div>Writing</div>
                     </div>

                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/10 rounded-xl' onClick={() => navFromHam('listening')}>
                        <ImHeadphones />
                        <div>Listening</div>
                     </div>

                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/10 rounded-xl' onClick={() => navFromHam('reading')}>
                        <IoBook />
                        <div>Reading</div>
                     </div>

                     {/* <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/10 rounded-xl' onClick={showWarning}>
                        <MdOutlineRestartAlt />
                        <div>Restart App</div>
                     </div> */}

                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/10 rounded-xl' onClick={() => navFromHam('saved')}>
                        <IoSave />
                        <div>Saved</div>
                     </div>

                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/10 rounded-xl' onClick={() => navFromHam('statistics')}>
                        <MdInsertChartOutlined />
                        <div>Statistics</div>
                     </div>

                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/10 rounded-xl' onClick={() => navFromHam('quiz')}>
                        <GoQuestion />
                        <div>Quiz</div>
                     </div>

                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/10 rounded-xl' onClick={() => navFromHam('review')}>
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