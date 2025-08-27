'use client'
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from './menu.module.css'
import { CiMenuFries, CiSaveDown1 } from "react-icons/ci";
import { MdOutlineRestartAlt, MdInsertChartOutlined } from "react-icons/md";
import { BiErrorCircle } from "react-icons/bi";
import { IoIosOptions } from "react-icons/io";
import { RiRepeat2Fill } from "react-icons/ri";
import Link from 'next/link';


function Menu(){
   const [menu,setMenu] = useState(false)
   const [warning,setWarning] = useState(false)

   const pathname = usePathname()

   const whiteColor =
   pathname == '/grammar/noun' ? styles.newStyle :
   pathname == '/a2' ? styles.newStyle :
   pathname == '/b2' ? styles.newStyle :
   pathname == '/statistics' ? styles.newStyle : null

   const router = useRouter()

   const resetWarning = () => {
      setMenu(!menu)
   }
   const closeMenu = () => {
      setMenu(!menu)
   }

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

   return(
      <>
         <div className={styles.holder}>
            <CiMenuFries className={`${styles.hamIcon} ${whiteColor}`} onClick={resetWarning}/>
         </div>
         {
            menu ?
            <div className={styles.menuLayer} onClick={closeMenu}>
               <div className={styles.menu}>
                  <div className={styles.option}>
                     <MdOutlineRestartAlt className={styles.icon} />
                     <div className={styles.item} onClick={showWarning}>Restart App</div>
                  </div>
                  <Link href='/saved' className={styles.option}>
                     <CiSaveDown1 className={styles.icon} />
                     <div className={styles.item}>Saved</div>
                  </Link>
                  <Link href='/statistics' className={styles.option}>
                     <MdInsertChartOutlined className={styles.icon} />
                     <div className={styles.item}>Statistics</div>
                  </Link>
                  <div className={styles.option}>
                     <BiErrorCircle className={styles.icon} />
                     <div className={styles.item}>My Errors</div>
                  </div>
                  <Link href='/themes' className={styles.option}>
                     <IoIosOptions className={styles.icon} />
                     <div className={styles.item}>Theme</div>
                  </Link>
                  <Link href='/review' className={styles.option}>
                     <RiRepeat2Fill className={styles.icon} />
                     <div className={styles.item}>Review</div>
                  </Link>
               </div>
            </div> : null
         } 
         {
            warning ?
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
            </div> : null
         }
      </>
   )
}

export default Menu;

