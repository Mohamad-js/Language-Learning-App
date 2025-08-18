import styles from './confirmDialogue.module.css'




function ConfirmDialogue({ warning, confirm, cancel }){
   if (!warning) {
      return null;

   } else if (warning) {

      return(
         <div className={styles.warning}>
            <div className={styles.warningHolder}>
               <div className={styles.warningMsg}>Are you sure to exit?</div>
               <div className={styles.warningMsg}>All progress will be lost.</div>
               <div className={styles.warningBtnHolder}>
                  <div className={styles.btn} onClick={cancel}>No</div>
                  <div className={styles.btn} onClick={confirm}>Yes</div>
               </div>
            </div>
         </div>
      )
   }

}

export default ConfirmDialogue;