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
            <Link href='/reading'>
               <div className={`${styles.iconHolder} ${pages === '/reading' && styles.selected3}`}>
                  <IoBook className={`${styles.navIcons} ${pages === '/reading' && styles.selected}`} />
                  <div className={`${styles.subTitle} ${pages === '/reading' && styles.selected2}`}>Reading</div>
               </div>
            </Link>
            <Link href='/speaking'>
               <div className={`${styles.iconHolder} ${pages === '/speaking' && styles.selected3}`}>
                  <PiUserSoundFill className={`${styles.navIcons} ${pages === '/speaking' && styles.selected}`} />
                  <div className={`${styles.subTitle} ${pages === '/speaking' && styles.selected2}`}>Speaking</div>
               </div>
            </Link>
            <Link href='/'>
               <div className={`${styles.iconHolder} ${pages === '/' && styles.selected3}`}>
                  <GoHomeFill className={`${styles.navIcons} ${pages === '/' && styles.selected}`} />
                  <div className={`${styles.subTitle} ${pages === '/' && styles.selected2}`}>Home</div>
               </div>
            </Link>
            <Link href='/writing'>
               <div className={`${styles.iconHolder} ${pages === '/writing' && styles.selected3}`}>
                  <IoReader className={`${styles.navIcons} ${pages === '/writing' && styles.selected}`} />
                  <div className={`${styles.subTitle} ${pages === '/writing' && styles.selected2}`}>Writing</div>
               </div>
            </Link>
            <Link href='/listening'>
               <div className={`${styles.iconHolder} ${pages === '/listening' && styles.selected3}`}>
                  <ImHeadphones className={`${styles.navIcons} ${pages === '/listening' && styles.selected}`} />
                  <div className={`${styles.subTitle} ${pages === '/listening' && styles.selected2}`}>Listening</div>
               </div>
            </Link>
            

            {/* <Link href='/speaking' className={styles.iconHolder} onClick={speakClicked}>
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
                  <div className={styles.selectedHolder}>
                     <GoHomeFill   className={`${styles.navIcons} ${pages === '/' && styles.selected}`} />
                     <div className={styles.subtitle}>Home</div>
                  </div>
                  :
                  <div className={`${styles.selectedHolder} ${pages === '/' && styles.holderSelected}`}>
                     <GoHome  className={`${styles.navIcons} ${pages === '/' && styles.selected}`} />
                  </div>
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
            </Link> */}
         </div>
         
      </div>
   )
}

export default Navigation;