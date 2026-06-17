import styles from './audio.module.css'



function Audio(){


   return(
      <div className={styles.holder}>
         <div className={styles.loader} style={darkMode ? {color: '#ffffff'} : {}}></div>
      </div>
   )
}

export default Audio;