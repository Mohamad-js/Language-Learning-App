import styles from './wait.module.css'




function Wait(){




   return(
      <div className={styles.holder}>
         <div className={styles.loader}></div>
      </div>
   )
}

export default Wait;