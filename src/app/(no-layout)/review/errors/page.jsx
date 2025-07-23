import DevMode from '@/components/underDev/DevMode';
import styles from './errors.module.css'




function Errors(){




   return(
      <>
         <div className={styles.container}>
            <DevMode />
         </div>
      </>
   )
}

export default Errors;