import styles from './confirmDialogue.module.css'




function ConfirmDialogue({ open, onConfirm, onCancel }){
   if (!open) {
      return null;
   } else if (open) {

      return(
         <div className={styles.warning}>
            <div className={styles.warningHolder}>
               <div className={styles.warningMsg}>Are you sure to exit?</div>
               <div className={styles.warningMsg}>All progress will be lost.</div>
               <div className={styles.warningBtnHolder}>
                  <div className={styles.btn} onClick={onCancel}>No</div>
                  <div className={styles.btn} onClick={onConfirm}>Yes</div>
               </div>
            </div>
         </div>
      )
   }

}

export default ConfirmDialogue;