'use client'
import styles from './ham.module.css'
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { CiSaveDown1 } from "react-icons/ci";
import { MdOutlineRestartAlt, MdInsertChartOutlined, MdOutlineSpellcheck } from "react-icons/md";
import { BiErrorCircle } from "react-icons/bi";
import { RiRepeat2Fill } from "react-icons/ri";
import { GoHomeFill, GoQuestion } from "react-icons/go";
import { PiUserSoundFill  } from "react-icons/pi";
import { IoBook, IoReader, IoSettings  } from "react-icons/io5";
import { ImHeadphones } from "react-icons/im";
import { VscWholeWord } from "react-icons/vsc";
import { LuGroup } from "react-icons/lu";
import { HiMiniRectangleGroup } from "react-icons/hi2";
import { TbComponentsOff } from "react-icons/tb";
import ThemeToggle from '../themeSwitch/themeToggle';
import { useTheme } from "../context/ThemeContext";



function Ham(){
   const { lightTheme } = useTheme();
   const darkMode = !lightTheme;
   const [page, setPage] = useState('learn')

   const [menu, setMenu] = useState(false)
   const [warning, setWarning] = useState(false)

   const pathname = usePathname()

   const whiteColor =
   pathname == '/grammar/noun' ? styles.newStyle :
   pathname == '/a2' ? styles.newStyle :
   pathname == '/b2' ? styles.newStyle :
   pathname == '/c2' ? styles.newStyle :
   pathname == '/statistics' ? styles.newStyle : null

   const router = useRouter()

   const resetWarning = () => {
      setMenu(prev => !prev)
   }

   const closeMenu = () => {
      setMenu(false);
   };

   const resetAction = () => {
      setWarning(false)
      localStorage.clear()
      router.push('/')
      location.reload()
   }

   const showWarning = () => {
      setWarning(true)
   }

   const cancelReset = () => {
      setWarning(false)
   }

   const navFromHam = (msg) => {
      const routes = {
         home: '/',
         saved: '/saved',
         statistics: '/statistics',
         collocations: '/collocations',
         errors: '/errors',
         themes: '/themes',
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
      };

      if (routes[msg]) {
         router.push(routes[msg]);
         closeMenu();
      }
   }

   const darkColor = darkMode ? { color: 'white' } : {};
   const darkStroke = darkMode ? { stroke: 'white' } : {};
   const darkBack = darkMode ? { backgroundColor: 'black' } : {};

   return(
      <div className={styles.hamHolder}>
         
         <div className={styles.container} onClick={resetWarning}>
            <label className={styles.hamburger}>
               <input
                  type="checkbox"
                  checked={menu} // 👈 Controlled by state
                  onChange={() => {}} // This is silence warning; we handle click on parent
                  onClick={(e) => e.stopPropagation()}
                  aria-hidden="true"
               />
               <svg viewBox="0 0 32 32">
                  <path style={darkStroke} className={`${styles.line} ${styles.lineTopBottom} ${whiteColor}`} d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                  <path style={darkStroke} className={`${styles.line} ${whiteColor}`} d="M7 16 27 16"></path>
               </svg>
            </label>
         </div>

         <div className={`${styles.menuLayer} ${menu && styles.appear}`} style={darkBack}>
            
            <div className={styles.menu}>
               <ThemeToggle />

               <div className={styles.tabsHolder}>
                  <div className={`${(page === 'learn' && lightTheme) ? styles.optionsTitle : (page === 'learn' && darkMode) ? styles.optionsDark : styles.default}`} onClick = {() => setPage('learn')}
                  >Learning Resources</div>

                  <div className={`${(page === 'more' && lightTheme) ? styles.optionsTitle : (page === 'more' && darkMode) ? styles.optionsDark : styles.default}`} onClick = {() => setPage('more')}
                  >More Pages</div>
               </div>

               <div className={styles.optionsMom}>
                  {
                     page === 'learn' ?
                     <div className={styles.optionsHolder} style={darkColor}>
                        
                        <div className={`${styles.option} ${darkMode && styles.darkStyles}`} onClick={() => navFromHam('home')}>
                           <GoHomeFill className={styles.icon} style={darkColor}/>
                           <div className={styles.item}>Home</div>
                        </div>

                        <div className={`${styles.option} ${darkMode && styles.darkStyles}`} onClick={() => navFromHam('words')}>
                           <VscWholeWord className={styles.icon} style={darkColor}/>
                           <div className={styles.item}>Vocabulary</div>
                        </div>

                        <div className={`${styles.option} ${darkMode && styles.darkStyles}`} onClick={() => navFromHam('grammar')}>
                           <MdOutlineSpellcheck className={styles.icon} style={darkColor}/>
                           <div className={styles.item}>Grammar</div>
                        </div>

                        <div className={`${styles.option} ${darkMode && styles.darkStyles}`} onClick={() => navFromHam('prepositions')}>
                           <TbComponentsOff className={styles.icon} style={darkColor}/>
                           <div className={styles.item}>Prepositions</div>
                        </div>

                        <div className={`${styles.option} ${darkMode && styles.darkStyles}`} onClick={() => navFromHam('collocations')}>
                           <HiMiniRectangleGroup className={styles.icon} style={darkColor}/>
                           <div className={styles.item}>Collocations</div>
                        </div>

                        <div className={`${styles.option} ${darkMode && styles.darkStyles}`} onClick={() => navFromHam('synonyms')}>
                           <LuGroup className={styles.icon} style={darkColor}/>
                           <div className={styles.item}>Synonyms</div>
                        </div>

                        <div className={`${styles.option} ${darkMode && styles.darkStyles}`} onClick={() => navFromHam('speaking')}>
                           <PiUserSoundFill className={styles.icon} style={darkColor}/>
                           <div className={styles.item}>Speaking</div>
                        </div>

                        <div className={`${styles.option} ${darkMode && styles.darkStyles}`} onClick={() => navFromHam('writing')}>
                           <IoReader className={styles.icon} style={darkColor}/>
                           <div className={styles.item}>Writing</div>
                        </div>

                        <div className={`${styles.option} ${darkMode && styles.darkStyles}`} onClick={() => navFromHam('listening')}>
                           <ImHeadphones className={styles.icon} style={darkColor}/>
                           <div className={styles.item}>Listening</div>
                        </div>

                        <div className={`${styles.option} ${darkMode && styles.darkStyles}`} onClick={() => navFromHam('reading')}>
                           <IoBook className={styles.icon} style={darkColor}/>
                           <div className={styles.item}>Reading</div>
                        </div>
                     </div>

                     : page === 'more' ?

                     <div className={styles.optionsHolder} style={darkColor}>

                        <div className={`${styles.option} ${darkMode && styles.darkStyles}`}>
                           <MdOutlineRestartAlt className={styles.icon} style={darkColor}/>
                           <div className={styles.item} onClick={showWarning}>Restart App</div>
                        </div>

                        <div className={`${styles.option} ${darkMode && styles.darkStyles}`} onClick={() => navFromHam('saved')}>
                           <CiSaveDown1 className={styles.icon} style={darkColor}/>
                           <div className={styles.item}>Saved</div>
                        </div>

                        <div className={`${styles.option} ${darkMode && styles.darkStyles}`} onClick={() => navFromHam('statistics')}>
                           <MdInsertChartOutlined className={styles.icon} style={darkColor}/>
                           <div className={styles.item}>Statistics</div>
                        </div>

                        <div className={`${styles.option} ${darkMode && styles.darkStyles}`} onClick={() => navFromHam('errors')}>
                           <BiErrorCircle className={styles.icon} style={darkColor}/>
                           <div className={styles.item}>My Errors</div>
                        </div>

                        <div className={`${styles.option} ${darkMode && styles.darkStyles}`} onClick={() => navFromHam('quiz')}>
                           <GoQuestion className={styles.icon} style={darkColor}/>
                           <div className={styles.item}>Quiz</div>
                        </div>

                        <div className={`${styles.option} ${darkMode && styles.darkStyles}`} onClick={() => navFromHam('review')}>
                           <RiRepeat2Fill className={styles.icon} style={darkColor}/>
                           <div className={styles.item}>Review</div>
                        </div>

                     </div>
                     : null
                  }

                  <div className={`${styles.option2} ${darkMode && styles.darkStyles}`} onClick={() => navFromHam('settings')}>
                     <IoSettings className={styles.icon} style={darkColor}/>
                     <div className={styles.item}>Settings</div>
                  </div>
               </div>


            </div>

         </div>
         
         {
            warning &&
            <div className={styles.warningHolder} onClick={cancelReset}>
               <div className={styles.warning}>
                  <div className={styles.titleHolder}>
                     <div className={styles.title}>All progress in the app will be lost.</div>
                     <div className={styles.title}>Are you sure to restart the app?</div>
                  </div>
                  <div className={styles.btnHolder}>
                     <button className={styles.btn} onClick={cancelReset}>No</button>
                     <button className={styles.btn} onClick={resetAction}>Yes</button>
                  </div>
               </div>
            </div>
         }
      </div>
   )
}

export default Ham;