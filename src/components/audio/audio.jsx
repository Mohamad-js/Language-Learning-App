import styles from './audio.module.css'
import { useTheme } from '../context/ThemeContext';



function Audio(){
   const { lightTheme } = useTheme();
   const darkMode = !lightTheme;



   return(
      <div className={styles.holder}>
         <div className={styles.loader} style={darkMode ? {color: '#ffffff'} : {}}></div>
      </div>
   )
}

export default Audio;