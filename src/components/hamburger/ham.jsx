'use client'
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { GiGearStickPattern } from "react-icons/gi";
import { MdSource, MdInsertChartOutlined, MdOutlineSpellcheck, MdDeveloperMode, MdOutlineArrowBackIosNew, MdKeyboardArrowRight, MdCategory } from "react-icons/md";
import { BsQuestionCircleFill } from "react-icons/bs";
import { TbDeviceMobileQuestion } from "react-icons/tb";
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
         about: '/about',
         quiz: '/quiz'
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


   const activeTab = (path) => {
      return pathname === path ? 'border' : ''
   }

   const activeSubTabs = (path) => {
      return path.includes(pathname) ? 'border' : ''
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
               <div className='w-30 h-25 flex items-center'>
                   <Image
                       className='object-cover object-center dark:hidden'
                       src='/images/logos/Logo-Light.png'
                       alt='Logo'
                       width={160}
                       height={100}
                   />
                   <Image
                       className='object-cover object-center hidden dark:block'
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

                  <div className='w-full flex flex-col justify-between'>
                     <div className='w-full flex flex-col'>

                        <div className={`ham-styles ${activeTab('/words')}`} onClick={()=> navFromHam('words')}>
                           <div className="ham-icons">
                              <VscWholeWord />
                           </div>
                           <div>Vocabulary</div>
                        </div>

                        <div className={`ham-styles ${activeTab('/grammar')}`} onClick={() => underDev('Grammar')}>
                           <div className="ham-icons">
                              <MdOutlineSpellcheck />
                           </div>
                           <div>Grammar</div>
                        </div>

                        <div className={`ham-styles ${activeTab('/stems')}`} onClick={() => underDev('Stems')}>
                           <div className="ham-icons">
                              <PiTreeStructureLight />
                           </div>
                           <div>Stems</div>
                        </div>

                        <div className={`ham-styles ${activeTab('/patterns')}`} onClick={() => underDev('Patterns')}>
                           <div className="ham-icons">
                              <GiGearStickPattern />
                           </div>
                           <div>Patterns</div>
                        </div>

                        <div className={`ham-styles ${activeTab('/synonyms')}`} onClick={() => underDev('Synonyms')}>
                           <div className="ham-icons">
                              <LuGroup />
                           </div>
                           <div>Synonyms</div>
                        </div>

                        <div className={`ham-styles ${activeTab('/phrasal')}`} onClick={() => underDev('Phrasal')}>
                           <div className="ham-icons">
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

                  <div className='w-full flex-1 flex flex-col justify-between'>
                     <div className='w-full flex flex-col'>

                        <div className={`ham-styles ${activeTab('/speaking')}`} onClick={() => underDev('Speaking')}>
                           <div className="ham-icons">
                              <PiUserSoundFill />
                           </div>
                           <div>Speaking</div>
                        </div>

                        <div className={`ham-styles ${activeTab('/writing')}`} onClick={() => underDev('Writing')}>
                           <div className="ham-icons">
                              <IoReader />
                           </div>
                           <div>Writing</div>
                        </div>

                        <div className={`ham-styles ${activeTab('/listening')}`} onClick={() => underDev('Listening')}>
                           <div className="ham-icons">
                              <ImHeadphones />
                           </div>
                           <div>Listening</div>
                        </div>

                        <div className={`ham-styles ${activeTab('/reading')}`} onClick={() => underDev('Reading')}>
                           <div className="ham-icons">
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

                     <div className={`ham-styles ${activeTab('/')}`} onClick={() => navFromHam('home')}>
                        <div className="ham-icons">
                           <GoHomeFill />
                        </div>
                        <div>Home</div>
                     </div>

                     <div className={`w-full flex items-center gap-3 p-2 pr-0 active:bg-foreground/5 rounded-xl ${activeSubTabs(['/words', '/grammar', '/stems', '/patterns', '/synonyms', '/phrasal'])}`} onClick={toggleSubMenu1}>
                        <div className='w-full flex items-center gap-3'>
                           <div className="ham-icons">
                              <MdCategory />
                           </div>
                           <div>Sub-Skills</div>
                        </div>
                        <MdKeyboardArrowRight size={20} />
                     </div>

                     <div className={`w-full flex items-center gap-3 p-2 pr-0 active:bg-foreground/5 rounded-xl1 ${activeSubTabs(['/speaking', '/writing', '/reading', '/listening'])}`} onClick={toggleSubMenu2}>
                        <div className='w-full flex items-center gap-3'>
                           <div className="ham-icons">
                              <FaLayerGroup />
                           </div>
                           <div>Main Skills</div>
                        </div>
                        <MdKeyboardArrowRight size={20} />
                     </div>

                     <div className={`ham-styles ${activeTab('/saved')}`} onClick={() => underDev('Saved')}>
                        <div className="ham-icons">
                           <IoSave />
                        </div>
                        <div>Saved</div>
                     </div>

                     <div className={`ham-styles ${activeTab('/statistics')}`} onClick={() => underDev('Statistics')}>
                        <div className="ham-icons">
                           <MdInsertChartOutlined />
                        </div>
                        <div>Statistics</div>
                     </div>

                     <div className={`ham-styles ${activeTab('/review')}`} onClick={() => underDev('Review')}>
                        <div className="ham-icons">
                           <RiRepeat2Fill />
                        </div>
                        <div>Review</div>
                     </div>

                     <div className={`ham-styles ${activeTab('/source')}`} onClick={() => navFromHam('source')}>
                        <div className="ham-icons">
                           <MdSource/>
                        </div>
                        <div>Source</div>
                     </div>

                     <div className={`ham-styles ${activeTab('/about')}`} onClick={() => navFromHam('about')}>
                        <div className="ham-icons">
                           <BsQuestionCircleFill />
                        </div>
                        <div>About Us</div>
                     </div>

                     <div className={`ham-styles ${activeTab ('/dev')}`} onClick={() => navFromHam('quiz')}>
                        <div className="ham-icons">
                           <TbDeviceMobileQuestion />
                        </div>
                        <div>Quiz</div>
                     </div>

                  </div>


                  <div className={`ham-styles ${activeTab('/settings')}`} onClick={() => navFromHam('settings')}>
                     <div className='ham-icons'>
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