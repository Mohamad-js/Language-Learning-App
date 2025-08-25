import DevMode from '@/components/underDev/DevMode';
import styles from './family.module.sass'




function Family(){




   return(
      <>
         <div className={styles.container}>

            <DevMode />
         </div>
      </>
   )
}

export default Family;