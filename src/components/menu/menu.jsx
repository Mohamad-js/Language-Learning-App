'use client'
import styles from './menu.module.css'
import { CiMenuFries } from "react-icons/ci";
import { useEffect, useState } from 'react';


function Menu(){
   const [menu,setMenu] = useState(false)

   function toggleMenu(){
      setMenu(!menu)
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
                  <div className={styles.item}>Restart</div>
                  <div className={styles.item}>Saved</div>
                  <div className={styles.item}>Dictionary</div>
                  <div className={styles.item}>My Errors</div>
                  <div className={styles.item}>About</div>
               </div>
            </div> : null
         } 
      </>
   )
}

export default Menu;

