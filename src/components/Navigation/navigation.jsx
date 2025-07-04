'use client'
import styles from './navigation.module.css'
import Link from "next/link";
import { IoBookOutline, IoReaderOutline  } from "react-icons/io5";
import { BiConversation } from "react-icons/bi";
import { FaAssistiveListeningSystems } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { usePathname } from 'next/navigation';


function Navigation(){
   const pages = usePathname()



   return(
      <>
      
         <div className={styles.navigation}>
            <Link href='/reading' className={styles.iconHolder}>
               <IoBookOutline className={`${styles.navIcons} ${pages === '/reading' && styles.selected}`} />
               <div className={`${styles.savesTitle} ${pages === '/reading' && styles.selected}`}>Read</div>
            </Link>

            <Link href='/speaking' className={styles.iconHolder}>
               <BiConversation className={`${styles.navIcons} ${pages === '/speaking' && styles.selected}`} />
               <div className={`${styles.savesTitle} ${pages === '/speaking' && styles.selected}`}>Speak</div>
            </Link>
            
            <Link href='/' className={styles.iconHolder}>
               <GoHome  className={`${styles.navIcons} ${pages === '/' && styles.selected}`} />
               <div className={`${styles.savesTitle} ${pages === '/' && styles.selected}`}>Home</div>
            </Link>

            <Link href='/writing' className={styles.iconHolder}>
               <IoReaderOutline  className={`${styles.navIcons} ${pages === '/writing' && styles.selected}`} />
               <div className={`${styles.savesTitle} ${pages === '/writing' && styles.selected}`}>Write</div>
            </Link>

            <Link href='/listening' className={styles.iconHolder}>
               <FaAssistiveListeningSystems  className={`${styles.navIcons} ${pages === '/listening' && styles.selected}`} />
               <div className={`${styles.savesTitle} ${pages === '/listening' && styles.selected}`}>Listen</div>
            </Link>
         </div>
         
      </>
   )
}

export default Navigation;