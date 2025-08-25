import DevMode from '@/components/underDev/DevMode';
import styles from './errors.module.sass'




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