'use client'
import styles from './navigation.module.css'
import Link from "next/link";
import { IoBookOutline, IoBook, IoReaderOutline, IoReader  } from "react-icons/io5";
import { ImHeadphones } from "react-icons/im";
import { usePathname } from 'next/navigation';
import { PiUserSound, PiUserSoundFill  } from "react-icons/pi";
import { GoHome, GoHomeFill } from "react-icons/go";
import { useState } from 'react';


function Navigation(){
   const pages = usePathname()
   const [readSelected,setReadSelected] = useState(false)
   const [homeSelected,setHomeSelected] = useState(true)
   const [writeSelected,setWriteSelected] = useState(false)
   const [speakSelected,setSpeakSelected] = useState(false)
   const [listenSelected,setListenSelected] = useState(false)

   const readClicked = () => {
      setReadSelected(true)
      setWriteSelected(false)
      setSpeakSelected(false)
      setHomeSelected(false)
      setListenSelected(false)
   }

   const speakClicked = () => {
      setReadSelected(false)
      setWriteSelected(false)
      setSpeakSelected(true)
      setHomeSelected(false)
      setListenSelected(false)
   }

   const writeClicked = () => {
      setReadSelected(false)
      setWriteSelected(true)
      setSpeakSelected(false)
      setHomeSelected(false)
      setListenSelected(false)
   }

   const listenClicked = () => {
      setReadSelected(false)
      setWriteSelected(false)
      setSpeakSelected(false)
      setHomeSelected(false)
      setListenSelected(true)
   }

   const homeClicked = () => {
      setReadSelected(false)
      setWriteSelected(false)
      setSpeakSelected(false)
      setHomeSelected(true)
      setListenSelected(false)
   }


   return(
      <div className={styles.container}>
      
         <div className={styles.navigation}>
            <Link href='/reading' className={styles.iconHolder} onClick={readClicked}>
               {
                  readSelected ?
                  <IoBook className={`${styles.navIcons} ${pages === '/reading' && styles.selected}`} />
                  :
                  <IoBookOutline className={`${styles.navIcons} ${pages === '/reading' && styles.selected}`} />
               }
            </Link>

            <Link href='/speaking' className={styles.iconHolder} onClick={speakClicked}>
               {
                  speakSelected ?
                  <PiUserSoundFill   className={`${styles.navIcons} ${pages === '/speaking' && styles.selected}`} />
                  :
                  <PiUserSound  className={`${styles.navIcons} ${pages === '/speaking' && styles.selected}`} />
               }
            </Link>
            
            <Link href='/' className={styles.iconHolder} onClick={homeClicked}>
               {
                  homeSelected ?
                  <>
                     <GoHomeFill   className={`${styles.navIcons} ${pages === '/' && styles.selected}`} />
                     <div className={styles.subtitle}>Home</div>
                  </>
                  :
                  <GoHome  className={`${styles.navIcons} ${pages === '/' && styles.selected}`} />
               }
            </Link>

            <Link href='/writing' className={styles.iconHolder} onClick={writeClicked}>
               {
                  writeSelected ?
                  <IoReader   className={`${styles.navIcons} ${pages === '/writing' && styles.selected}`} />
                  :
                  <IoReaderOutline  className={`${styles.navIcons} ${pages === '/writing' && styles.selected}`} />
               }
            </Link>

            <Link href='/listening' className={styles.iconHolder} onClick={listenClicked}>
               {
                  listenSelected ?
                  <ImHeadphones  className={`${styles.navIcons} ${pages === '/listening' && styles.selected}`} />
                  :
                  <ImHeadphones  className={`${styles.navIcons} ${pages === '/listening' && styles.selected}`} />
               }
            </Link>
         </div>
         
      </div>
   )
}

export default Navigation;