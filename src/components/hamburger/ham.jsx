'use client'
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { GiGearStickPattern } from "react-icons/gi";
import { MdSource, MdInsertChartOutlined, MdOutlineSpellcheck, MdDeveloperMode, MdOutlineArrowBackIosNew, MdKeyboardArrowRight, MdCategory } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa";
import { RiRepeat2Fill } from "react-icons/ri";
import { GoHomeFill } from "react-icons/go";
import { VscDebugDisconnect } from "react-icons/vsc";
import { PiUserSoundFill, PiTreeStructureLight } from "react-icons/pi";
import { IoBook, IoReader, IoSettings, IoSave  } from "react-icons/io5";
import { ImHeadphones } from "react-icons/im";
import { VscWholeWord } from "react-icons/vsc";
import { LuGroup } from "react-icons/lu";
import { useLoading } from '../LoadingProvider';
import { toast } from 'sonner';
import Image from "next/image";



function Ham(){
    

   const { startLoading } = useLoading();
   const [subMenu1, setSubMenu1] = useState(false)
   const [subMenu2, setSubMenu2] = useState(false)
   const [menu, setMenu] = useState(false)

   const pathname = usePathname()

   const router = useRouter()

   const toggleMenu = () => {
      setMenu(prevState => !prevState)
      menu && closeAll()
   }

   const closeAll = () => {
      setMenu(false);
      setSubMenu1(false);
      setSubMenu2(false);
   };

   const toggleSubMenu1 = () => {
      setSubMenu1(true)
   }

   const toggleSubMenu2 = () => {
      setSubMenu2(true)
   }

   const closeSubMenu1 = () => {
      setSubMenu1(false);
   };

   const closeSubMenu2 = () => {
      setSubMenu2(false);
   };


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
         phrasal: '/phrasal',
         developerTools: '/dev'
      };

      const target = routes[msg];

      if (!target) return;

      if (target === pathname) {
         closeAll();
         return;
      }

      startLoading()
      router.push(target);
      closeAll();

   }


   const underDev = (page) => {
      toast.warning(`The ${page} section is under development.`)
   }


   return(
      <div className='absolute top-0 left-0 overflow-hidden w-full min-h-dvh'>

         <div className='fixed top-0 right-0 px-3 py-3 z-50'
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
                     className="w-[50%] h-0.5 bg-foreground rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] peer-checked:-rotate-45"
                  ></div>
                  <div
                     className="w-[50%] h-0.5 bg-foreground rounded-md transition-all duration-300 origin-center peer-checked:hidden"
                  ></div>
                  <div
                     className="w-[50%] h-0.5 bg-foreground rounded-md transition-all duration-300 origin-left translate-y-[-0.45rem] peer-checked:rotate-45"
                  ></div>
               </div>
            </label>

         </div>

         {
            menu &&
            <div className="absolute top-0 left-0 w-full min-h-dvh bg-foreground/10 z-20 backdrop-blur-sm" onClick={closeAll}></div>
         }


         <div className={`fixed w-2/3 min-h-dvh flex flex-col z-40 transition-all bg-background duration-500 ease-[cubic-bezier(0.075,0.82,0.165,1)] ${menu ? 'left-0' : '-left-full'}`}>
            <div className='w-full pl-5 flex items-center'>
               <div className='w-30 h-15 flex items-center'>
                   <Image
                       className='object-cover object-center'
                       src='/images/logos/Logo-Dark.png'
                       alt='Logo'
                       width={160}
                       height={100}
                   />
               </div>
            </div>

            <div className={`absolute w-full min-h-dvh transition-all bg-background/50 backdrop-blur-xs duration-300 ease-in-out drop-shadow-xl ${subMenu1 ? 'left-0' : '-left-full'}`}>
               <div className='absolute w-full top-0 h-full p-3 flex flex-col gap-5'>

                  <div
                      onClick={closeSubMenu1}
                      className='w-10 h-13 flex items-center'
                  >
                     <MdOutlineArrowBackIosNew className='text-foreground/30' size={22} />
                  </div>

                  <div className='w-full flex flex-col justify-between pr-5'>
                     <div className='w-full flex flex-col'>

                        <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/5 rounded-xl' onClick={()=> navFromHam('words')}>
                           <div className="rounded-lg p-2 bg-foreground/10">
                              <VscWholeWord />
                           </div>
                           <div>Vocabulary</div>
                        </div>

                        <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/5 rounded-xl' onClick={() => underDev('Grammar')}>
                           <div className="rounded-lg p-2 bg-foreground/10">
                              <MdOutlineSpellcheck />
                           </div>
                           <div>Grammar</div>
                        </div>

                        <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/5 rounded-xl' onClick={() => underDev('Stems')}>
                           <div className="rounded-lg p-2 bg-foreground/10">
                              <PiTreeStructureLight />
                           </div>
                           <div>Stems</div>
                        </div>

                        <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/5 rounded-xl' onClick={() => underDev('Patterns')}>
                           <div className="rounded-lg p-2 bg-foreground/10">
                              <GiGearStickPattern />
                           </div>
                           <div>Patterns</div>
                        </div>

                        <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/5 rounded-xl' onClick={() => underDev('Synonyms')}>
                           <div className="rounded-lg p-2 bg-foreground/10">
                              <LuGroup />
                           </div>
                           <div>Synonyms</div>
                        </div>

                        <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/5 rounded-xl' onClick={() => underDev('Phrasal')}>
                           <div className="rounded-lg p-2 bg-foreground/10">
                              <VscDebugDisconnect />
                           </div>
                           <div>Phrasal</div>
                        </div>
                     </div>
                  </div>

               </div>
            </div>

            <div className={`absolute w-full min-h-dvh transition-all bg-background/50 backdrop-blur-xs duration-300 ease-in-out drop-shadow-xl ${subMenu2 ? 'left-0' : '-left-full'}`}>
               <div className='absolute w-full top-0 h-full p-3 flex flex-col gap-5'>

                  <div
                      onClick={closeSubMenu2}
                      className='w-10 h-13 flex items-center'
                  >
                     <MdOutlineArrowBackIosNew className='text-foreground/30' size={22} />
                  </div>

                  <div className='w-full flex-1 flex flex-col justify-between pr-5'>
                     <div className='w-full flex flex-col'>
                        <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/5 rounded-xl' onClick={() => underDev('Speaking')}>
                           <div className="rounded-lg p-2 bg-foreground/10">
                              <PiUserSoundFill />
                           </div>
                           <div>Speaking</div>
                        </div>

                        <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/5 rounded-xl' onClick={() => underDev('Writing')}>
                           <div className="rounded-lg p-2 bg-foreground/10">
                              <IoReader />
                           </div>
                           <div>Writing</div>
                        </div>

                        <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/5 rounded-xl' onClick={() => underDev('Listening')}>
                           <div className="rounded-lg p-2 bg-foreground/10">
                              <ImHeadphones />
                           </div>
                           <div>Listening</div>
                        </div>

                        <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/5 rounded-xl' onClick={() => underDev('Reading')}>
                           <div className="rounded-lg p-2 bg-foreground/10">
                              <IoBook />
                           </div>
                           <div>Reading</div>
                        </div>
                     </div>
                  </div>

               </div>
            </div>

            <div className='w-full p-3 flex-1 flex flex-col'>

               <div className='w-full  flex-1 flex flex-col justify-between'>

                  <div className='w-full  flex flex-col'>

                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/5 rounded-xl' onClick={() => navFromHam('home')}>
                        <div className="rounded-lg p-2 bg-foreground/10">
                           <GoHomeFill />
                        </div>
                        <div>Home</div>
                     </div>

                     <div className='w-full flex items-center gap-3 p-2 pr-0 active:bg-foreground/5 rounded-xl' onClick={toggleSubMenu1}>
                        <div className='w-full flex items-center gap-3'>
                           <div className="rounded-lg p-2 bg-foreground/10">
                              <MdCategory />
                           </div>
                           <div>Sub-Skills</div>
                        </div>
                        <MdKeyboardArrowRight size={20} />
                     </div>

                     <div className='w-full flex items-center gap-3 p-2 pr-0 active:bg-foreground/5 rounded-xl' onClick={toggleSubMenu2}>
                        <div className='w-full flex items-center gap-3'>
                           <div className="rounded-lg p-2 bg-foreground/10">
                              <FaLayerGroup />
                           </div>
                           <div>Main Skills</div>
                        </div>
                        <MdKeyboardArrowRight size={20} />
                     </div>

                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/5 rounded-xl' onClick={() => underDev('Saved')}>
                        <div className="rounded-lg p-2 bg-foreground/10">
                           <IoSave />
                        </div>
                        <div>Saved</div>
                     </div>

                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/5 rounded-xl' onClick={() => underDev('Statistics')}>
                        <div className="rounded-lg p-2 bg-foreground/10">
                           <MdInsertChartOutlined />
                        </div>
                        <div>Statistics</div>
                     </div>

                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/5 rounded-xl' onClick={() => underDev('Review')}>
                        <div className="rounded-lg p-2 bg-foreground/10">
                           <RiRepeat2Fill />
                        </div>
                        <div>Review</div>
                     </div>

                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/5 rounded-xl' onClick={() => navFromHam('source')}>
                        <div className="rounded-lg p-2 bg-foreground/10">
                           <MdSource/>
                        </div>
                        <div>Source</div>
                     </div>

                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/5 rounded-xl' onClick={() => navFromHam('source')}>
                        <div className="rounded-lg p-2 bg-foreground/10">
                           <MdSource/>
                        </div>
                        <div>About Us</div>
                     </div>

                     <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/5 rounded-xl' onClick={() => navFromHam('developerTools')}>
                        <div className="rounded-lg p-2 bg-foreground/10">
                           <MdDeveloperMode />
                        </div>
                        <div>Developer Tools</div>
                     </div>

                  </div>


                  <div className='w-full flex items-center gap-3 p-2 active:bg-foreground/5 rounded-xl' onClick={() => navFromHam('settings')}>
                     <div className='rounded-lg p-2 bg-foreground/10'>
                        <IoSettings />
                     </div>
                     <div>Settings</div>
                  </div>
               </div>


            </div>

         </div>


      </div>
   )
}

export default Ham;