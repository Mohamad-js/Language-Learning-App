'use client'
import { getReviewByNumber, updateReviewStatus } from "@/lib/db";
import { useEffect, useState } from "react";
import SemanticOrbit from "@/components/SemanticOrbit";
import DictationExercise from "@/components/DictationExercise";
import { useParams } from "next/navigation";
import { useNavigation } from "@/app/context/NavigationProvider";
import { motion } from "framer-motion";
import { fadeIn, expand, lessonCompleteAnimation } from "@/lib/animations/entrance";
import { useAnimate } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";




function Review(){
   const [currentLevel, setCurrentLevel] = useState('A1');
   const [stage, setStage] = useState('spelling');
   const [finalWindow, setFinalWindow] = useState(false);
   const [spelling, setSpelling] = useState(null);
   const [dictation, setDictation] = useState(null);
   const [reviewNum, setReviewNum] = useState(null);
   const [nextLesson, setNextLesson] = useState(null);
   const { slug } = useParams()
   const { active } = useNavigation();
   const [scope, animate] = useAnimate()
   const router = useRouter()
   


   useEffect(() => {
      active === 0 && setCurrentLevel('A1');
      active === 1 && setCurrentLevel('A2');
      active === 2 && setCurrentLevel('B1');
      active === 3 && setCurrentLevel('B2');
      active === 4 && setCurrentLevel('C1');
      active === 5 && setCurrentLevel('C2');
   }, [active]);


   useEffect(() => {
      const loadReview = async () => {
         try {
            const revData = await getReviewByNumber(currentLevel, slug);     
            setSpelling(revData.content.spelling)
            setDictation(revData.content.dictation)
            setReviewNum(revData.review)
            setNextLesson(revData.nextLesson)
            
         } catch (error) {
            console.error("Failed to load vocabs:", error);
         }
      };
      
      loadReview();
   }, [currentLevel])




   const saveProgress = async (msg) => {

      const requestedLevel = 
         active === 0 ? 'A1' : 
         active === 1 ? 'A2' :
         active === 2 ? 'B1' :
         active === 3 ? 'B2' :
         active === 4 ? 'C1' :
         active === 5 ? 'C2' : ''

      try {
         await toast.promise(
            updateReviewStatus({
               level: requestedLevel,
               review: reviewNum,
            }),
            {
               loading: 'Saving progress...',

               success: () => {
                  return 'Progress saved!';
               },

               error: (error) => error.message
            }
         )


         // startLoading()

         if (msg === 'save'){
            router.push('/words')
            
         } else if(msg === 'nextLesson'){
            router.push(`/words/${nextLesson}`)
            
         } else {
            router.push('/words')
         }

      } catch (error){
         console.error('Error in updating the bd status:', error)
      }
   }



   const restartLearning = () => {
      setFinalWindow(false)
      setStage('spelling')
   }




   return(
      <div className='w-full min-h-dvh bg-background flex items-center justify-center'>
         {
            stage === 'spelling' ? 
            
               spelling ?
                  < SemanticOrbit
                     lessonData={spelling}
                     onStepOneFinished={setStage}
                  />
               :
                  'LOADING'
            :

            stage === 'practice2' ?

               dictation ?

                  <DictationExercise
                     dictationData = {dictation}
                     onStepTwoFinished = {setFinalWindow}
                  />
               :
                  'LOADING'
            :
            'ISSUE IN STAGE'
         }

         {

            finalWindow &&

               <motion.div 
                  {...fadeIn}
                  onAnimationComplete={() => {
                     lessonCompleteAnimation(animate);
                  }}
                  className='absolute top-0 w-full h-dvh bg-background/40 backdrop-blur-lg flex flex-col items-center justify-center left-0 p-5 gap-1 z-40'
               >
                  <div
                     ref={scope}
                     className="text-bold text-2xl mb-5 flex gap-3"
                  >
                     <div className="text-2xl sentence left opacity-0">REVIEW</div>
                     <div
                        className="text-2xl sentence number opacity-0"
                     >{reviewNum}</div>

                     <div className="text-2xl sentence right opacity-0">FINISHED</div>
                  </div>

                  <div className="w-full flex gap-2 justify-center">

                     <motion.button
                        {...expand({delay: 1.5})}
                        className='py-2 w-25 bg-background rounded-xl active:scale-95'
                        onClick={restartLearning}
                     >
                        Review
                     </motion.button>

                     {
                        nextLesson < 45 &&
                           <motion.button
                              {...expand({delay: 1.6})}
                              className='py-2 w-25 bg-background rounded-xl active:scale-95'
                              onClick={() => saveProgress('nextLesson')}
                           >Lesson {nextLesson}</motion.button>
                     }

                     <motion.button
                        {...expand({delay: 1.7})}
                        className='py-2 w-25 bg-background rounded-xl active:scale-95'
                        onClick={() => saveProgress('save')}
                     >Save</motion.button>

                  </div>

                        

               </motion.div>

         }
      </div>
   )
}

export default Review;