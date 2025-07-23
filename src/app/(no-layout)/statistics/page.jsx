import DevMode from '@/components/underDev/DevMode';
import styles from './statistics.module.css'




function Statistics(){




   return(
      <>
         <div className={styles.container}>
            <DevMode />
         </div>
      </>
   )
}

export default Statistics;