'use client'
import styles from './menu.module.css'
import { CiMenuFries } from "react-icons/ci";
import { useEffect, useState } from 'react';
import Link from 'next/link';


function Menu(){
   const [menu,setMenu] = useState(false)

   const toggleMenu = () => {
      setMenu(!menu)
   }

   const resetToggle = () => {
      localStorage.clear()
   }

   return(
      <>
         <div className={styles.holder}>
            <CiMenuFries className={styles.hamIcon} onClick={toggleMenu}/>
         </div>
         {
            menu ?
            <div className={styles.menuLayer} onClick={toggleMenu}>
               <div className={styles.menu}>
                  <Link href='/' className={styles.item} onClick={resetToggle}>Restart</Link>
                  <div className={styles.item}>Saved</div>
                  <div className={styles.item}>Statistics</div>
                  <div className={styles.item}>My Errors</div>
                  <div className={styles.item}>About</div>
               </div>
            </div> : null
         } 
      </>
   )
}

export default Menu;

