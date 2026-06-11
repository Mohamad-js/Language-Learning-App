import styles from './wait.module.css'
import { useTheme } from '../context/ThemeContext';



function Wait(){
   const { lightTheme } = useTheme();



   return(
      <div className="flex items-center justify-center p-10">
         <div className="size-10 animate-spin rounded-full border-2 border-gray-200 border-t-blue-700"></div>
      </div>
   )
}

export default Wait;