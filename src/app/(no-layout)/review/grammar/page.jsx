import DevMode from '@/components/underDev/DevMode';
import styles from './grammar.module.css'




function Grammar(){




   return(
      <>
         <div className={styles.container}>
            <DevMode />
         </div>
      </>
   )
}

export default Grammar;