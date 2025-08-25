import DevMode from '@/components/underDev/DevMode';
import styles from './themes.module.css'




function Themes(){




   return(
      <>
         <div className={styles.container}>
            <DevMode />
         </div>
      </>
   )
}

export default Themes;