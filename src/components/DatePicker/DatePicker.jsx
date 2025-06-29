"use client";
import { useStudyPlan } from "@/context/StudyPlanContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment-jalaali";
import styles from "./DatePicker.module.css"

const CustomDatePicker = () => {
   const { setStartDate } = useStudyPlan();

   const handleDateChange = (date) => {
      const selectedDate = moment(date).format("jYYYY/jMM/jDD");
      setStartDate(selectedDate);
      localStorage.setItem("startDate", selectedDate);
   };

   return (
      <div className={styles.container}>
         <p className={styles.title}>Select your start date:</p>
         <DatePicker className={styles.calendar}
            selected={new Date()}
            onChange={handleDateChange}
            dateFormat="yyyy/MM/dd"
         />
      </div>
   );
};

export default CustomDatePicker;
