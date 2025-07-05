'use client'
import styles from './a1.module.css'
import { IoIosArrowBack } from "react-icons/io";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Loader from '@/components/loading/loading';


function A1(){
    const [isLoading, setIsLoading] = useState(true);
   const [loadedImages, setLoadedImages] = useState(0);
   const totalImages = 1;

   const handleImageLoad = () => {
      setLoadedImages((prev) => {
      const newCount = prev + 1;
      if (newCount >= totalImages) {
         setIsLoading(false);
      }
      return newCount;
      });
   };

   useEffect(() => {
      if (loadedImages >= totalImages) {
         setIsLoading(false);
      }
   }, [loadedImages]);


   return(
      <>
         <div className={styles.container}>
            <Image className={styles.background}
               src='../images/illustrations/act1.jpg'
               alt=''
               fill
               onLoad={handleImageLoad}
            />

            <Link href='/words' className={styles.backHolder}>
               <IoIosArrowBack className={styles.backSign}/>
               <div className={styles.backText}>Back</div>
            </Link>

            <div className={styles.top}>
               <div className={styles.mainTitle}>A1 Vocabulary</div>
               <div className={styles.subtitle}>Read and Practice the Words</div>
            </div>

            <div className={styles.bottom}>
               <div className={styles.lessonsTitle}>Lessons:</div>

               <div className={styles.learningHolder}>
                  <Link href='/a1/1' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 1</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/2' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 2</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/3' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 3</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/4' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 4</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/5' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 5</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/6' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 6</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/7' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 7</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/8' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 8</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/9' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 9</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/10' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 10</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/11' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 11</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/12' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 12</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/13' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 13</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/14' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 14</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/15' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 15</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/16' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 16</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/17' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 17</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/18' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 18</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/19' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 19</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/20' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 20</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/21' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 21</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/22' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 22</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/23' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 23</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/24' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 24</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/25' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 25</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/26' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 26</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/27' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 27</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/28' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 28</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/29' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 29</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/30' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 30</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/31' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 31</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/32' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 32</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/33' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 33</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/34' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 34</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/35' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 35</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/36' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 36</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/37' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 37</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/38' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 38</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/39' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 39</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/40' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 40</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/41' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 41</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/42' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 42</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/43' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 43</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/44' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 44</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/45' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 45</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/46' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 46</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/47' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 47</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/48' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 48</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/49' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 49</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/50' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 50</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/50' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 51</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

                  <Link href='/a1/50' className={styles.lessonsHolder}>
                     <div className={styles.lesson}>Lesson 52</div>
                     <div className={styles.lessonStatus}>Status: Waiting</div>
                  </Link>

               </div>
            </div>

            {
               isLoading ?
               <div className={styles.bottomLayer}>
                  <Loader /> 
               </div>
               : ''
            }

         </div>
      </>
   )
}

export default A1;