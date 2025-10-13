import styles from './loading.module.css'




function Loader(){




   return(
      <div className={styles.loaderHolder}>
         <div className={styles.container}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
         </div>
         <div className={styles.loaderText}>LOADING</div>
      </div>
   )
}

export default Loader;