import DevMode from '@/components/underDev/DevMode';
import styles from './expressions.module.css'




function Expressions(){




   return(
      <>
         <div className={styles.container}>
            <DevMode />
         </div>
      </>
   )
}

export default Expressions;