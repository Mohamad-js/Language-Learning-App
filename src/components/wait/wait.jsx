import styles from './wait.module.css'
import { useTheme } from '../context/ThemeContext';



function Wait(){
   const { lightTheme } = useTheme();
   const darkMode = !lightTheme;



   return(
      <div className={styles.holder}
         style={darkMode ? {backgroundColor: 'black'} : {}}
      >
         <div className={styles.loader}
            style={darkMode ? {borderTop: '3px solid #ffffff'} : {}}
         ></div>
         <div className={styles.text}
            style={darkMode ? {color: 'white'} : {}}
         >Loading...</div>
      </div>
   )
}

export default Wait;