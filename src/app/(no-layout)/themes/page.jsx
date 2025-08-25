import DevMode from '@/components/underDev/DevMode';
import styles from './themes.module.sass'




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