'use client'
import styles from './b2.module.css'
import { IoIosArrowBack } from "react-icons/io";
import Link from 'next/link';
import DevMode from '@/components/underDev/DevMode';




function B2(){




   return(
      <>
         <div className={styles.container}>
            <Link href='/words' className={styles.backHolder}>
               <IoIosArrowBack className={styles.backSign}/>
               <div className={styles.backText}>Back</div>
            </Link>

            <DevMode />

            {/* <div className={styles.learningHolder}>

            </div> */}
         </div>
      </>
   )
}

export default B2;