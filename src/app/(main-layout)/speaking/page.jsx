import DevMode from '@/components/underDev/DevMode';
import styles from './speaking.module.css'




function Speaking(){




   return(
      <>
         <div className={styles.container}>
            <DevMode />
         </div>
      </>
   )
}

export default Speaking;