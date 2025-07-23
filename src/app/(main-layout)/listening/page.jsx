import DevMode from '@/components/underDev/DevMode';
import styles from './listening.module.css'




function Listening(){




   return(
      <>
         <div className={styles.container}>
            <DevMode />
         </div>
      </>
   )
}

export default Listening;