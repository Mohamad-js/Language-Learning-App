'use client'
import { getReviewByNumber } from "@/lib/db";
import { useEffect, useState } from "react";
import SemanticOrbit from "@/components/SemanticOrbit";
import { useParams } from "next/navigation";
import { useNavigation } from "@/app/context/NavigationProvider";


function Review(){
   const [currentLevel, setCurrentLevel] = useState('A1');
   const [data, setData] = useState(null);
   const { slug } = useParams()
   const { active } = useNavigation();


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
            console.log('data:', revData);      
            setData(revData)
            
         } catch (error) {
            console.error("Failed to load vocabs:", error);
         }
      };
      
      loadReview();
   }, [currentLevel]);
   


   return(
      <div className='w-full min-h-dvh bg-background flex items-center justify-center'>
         {/* < SemanticOrbit
            lessonData={data}
            onStepOneFinished={}
            skipPractice={}
            saveProgress={}
         /> */}

         TESTTTTTTTT
      </div>
   )
}

export default Review;