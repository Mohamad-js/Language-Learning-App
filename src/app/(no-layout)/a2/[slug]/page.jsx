'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './slug.module.css';
import Link from 'next/link';
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import Confetti from "@/components/confetti/confetti"; // NEW



export default function Lessons({ params }) {
   const [currentWordIndex, setCurrentWordIndex] = useState(0);
   const [learningWordIndex, setLearningWordIndex] = useState(0);
   const [stage, setStage] = useState('assessment');
   const [knownWords, setKnownWords] = useState([]);
   const [unknownWords, setUnknownWords] = useState([]);
   const [btn, setBtn] = useState(false)
   const [lessonNumber, setLessonNumber] = useState(null)
   const [savedA2Vocabs, setSavedA2Vocabs] = useState([])
   const [confirmBox, setConfirmBox] = useState(false)
   const [cancelBox, setCancelBox] = useState(false)
   const [close, setClose] = useState(false)
   const [appear, setAppear] = useState(false)
   const [fade, setFade] = useState(false)
   const [show, setShow] = useState(false)
   const [totalA2, setTotalA2] = useState(null)
   const [lessonsA2, setLessonsA2] = useState(null)
   const [wordsCount, setWordsCount] = useState(null) // NEW
   const [showConfetti, setShowConfetti] = useState(false) // NEW
   const [showCongrats, setShowCongrats] = useState(false) // NEW
   const [anime, setAnime] = useState(false) // NEW
   const [btnPressed, setBtnPressed] = useState(null) // NEW

   const [currentCardIndex, setCurrentCardIndex] = useState(0);
   const [counter, setCounter] = useState(0);
   const [isSwiping, setIsSwiping] = useState(false);
   const [isSwiped, setIsSwiped] = useState(false);
   const [startX, setStartX] = useState(0);
   const [translateX, setTranslateX] = useState(0);
   const [swipeDirection, setSwipeDirection] = useState(null);
   const cardRef = useRef(null);


   const { slug } = params;
   
   useEffect(() => {
      setLessonNumber(Number(slug))
   }, [slug])
   
   const router = useRouter()
   useEffect(() => {
      const handleDefaultBack = (event) => {
         event.preventDefault()
         router.push('/a2')
      }

      window.addEventListener('popstate', handleDefaultBack)
      
      return () => {
         window.addEventListener('popstate', handleDefaultBack)
      }
   }, [router])


// Retrieve data from localStorage on mount
   useEffect(() => {
      try {
         const savedKnowns = JSON.parse(localStorage.getItem(`knownWords-${slug}-A2`) || '[]');
         const savedUnknowns = JSON.parse(localStorage.getItem(`unknownWords-${slug}-A2`) || '[]');
         const totalProgress = slug * 0.0403225806
         const lessonsProgress = slug
         const wordsLearnt = slug * 10 // NEW
         
         setWordsCount(wordsLearnt) // NEW
         setTotalA2(totalProgress)
         setLessonsA2(lessonsProgress)
         setKnownWords(savedKnowns);
         setUnknownWords(savedUnknowns);
      } catch (e) {
         console.error('Error parsing localStorage data:', e);
      }
   }, [slug]); // Depend on slug to reload when lesson changes
   
   const done = () => { // NEW
      try {
         save()

         if([10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 117].includes(lessonNumber)){
            animation()
            setBtnPressed('done')
         } else {
            router.push('/a2')
         }

      } catch (e) {
         console.error('Error saving to localStorage:', e);
      }
   }

   const nextLesson = () => { // NEW
      try {
         save()

         if([10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 117].includes(lessonNumber)){
            animation()
            setBtnPressed('nextLesson')
         } else {
            router.push(`/a2/${lessonNumber + 1}`)
         }

      } catch (e) {
         console.error('Error saving to localStorage:', e);
      }
   }

   const nextLevel = () => { // NEW
      try {
         save()

         if([10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 117].includes(lessonNumber)){
            animation()
            setBtnPressed('nextLevel')
         } else {
            router.push('/b1')
         }

      } catch (e) {
         console.error('Error saving to localStorage:', e);
      }
   }

   const closeCongrats = () => { // NEW
      setShowCongrats(false)
      setAnime(false)
      save()

      btnPressed === 'done' ? router.push('/a2') :
      btnPressed === 'nextLesson' ? router.push(`/a2/${lessonNumber + 1}`) :
      btnPressed === 'nextLevel' ? router.push('/b1') : console.log('PROBLEM')
   }

   const save = () => { // NEW
      localStorage.setItem(`knownWords-${slug}-A2`, JSON.stringify(knownWords));
      localStorage.setItem(`unknownWords-${slug}-A2`, JSON.stringify(unknownWords));
      localStorage.setItem(`total-A2`, JSON.stringify(totalA2));
      localStorage.setItem(`wordsCount-A2`, JSON.stringify(wordsCount)); // NEW
   }

   const animation = () => { // NEW
      setShowCongrats(true)
      setTimeout(() => setShowConfetti(true), 500)
      setTimeout(() => setAnime(true), 500)
      setTimeout(() => setShowConfetti(false), 3000)
   }

   // Save data to localStorage when state changes
   useEffect(() => {
      try {
         localStorage.setItem(`savedA2Vocabs-${slug}-A2`, JSON.stringify(savedA2Vocabs));

      } catch (e) {
         console.error('Error saving to localStorage:', e);
      }
   }, [savedA2Vocabs, slug]);

   const handleAnswer = (status) => {
      const currentWord = specificLessonWords[currentWordIndex];
      if (status === 'known') {
         setKnownWords([...knownWords, { word: currentWord, type: status, lesson: lessonNumber, level: 'A2' }]);

      } else if (status === 'unknown') {
         setUnknownWords([...unknownWords, { word: currentWord, type: status, lesson: lessonNumber, level: 'A2' }]);
      }
      
      if (currentWordIndex + 1 < specificLessonWords.length) {
         setCurrentWordIndex(currentWordIndex + 1);

      } else if (unknownWords.length > 0) { // partialWords.length WAS DELETED
         
         setClose(true);
         setTimeout(() => {
            setStage('shiftMsg')
         }, 1000);
         
         setTimeout(() => {
            setAppear(true)
         }, 1500);
         
      } else {
         setClose(true);
         setTimeout(() => {
            setStage('excellent')
         }, 1000);
         
         setTimeout(() => {
            setShow(true)
         }, 2000);
      }
   };

   const handleNextLearningWord = () => {
      const learningWords = [...unknownWords];
      if (learningWordIndex + 1 < learningWords.length) {
         setLearningWordIndex(learningWordIndex + 1);
      } else if(learningWordIndex + 1 == learningWords.length) {
         setBtn(true)
      } 
   };
   
   const handleBackLearningWord = () => {
      if (learningWordIndex - 1 >= 0) {
         setLearningWordIndex(learningWordIndex - 1);
         setBtn(false)
      } else {
         alert('This is the first word');
      }
   };


   // Access the slug from the URL
   const data = {
      slug,
      wordList: [
         {
            "id": 1,
            "word": "ability",
            "role": "noun",
            "BrE": "/əˈbɪləti/",
            "AmE": "/əˈbɪləti/",
            "definition": "the mental or physical capacity, power or skill required to do something",
            "examples": [
               "She has the ability to sing.",
               "His ability to solve puzzles is great.",
               "Her ability to speak two languages helps at work."
            ]
         },
         {
            "id": 1,
            "word": "able",
            "role": "adjective",
            "BrE": "/ˈeɪbl/",
            "AmE": "/ˈeɪbl/",
            "definition": "having the skill, strength, time, etc. to do something",
            "examples": [
               "I am able to read.",
               "She is able to cook well.",
               "He was able to finish the project early."
            ]
         },
         {
            "id": 1,
            "word": "abroad",
            "role": "adverb",
            "BrE": "/əˈbrɔːd/",
            "AmE": "/əˈbrɔːd/",
            "definition": "in or to a foreign country",
            "examples": [
               "She lives abroad.",
               "He travels abroad every year.",
               "Studying abroad improved her language skills."
            ]
         },
         {
            "id": 1,
            "word": "accept",
            "role": "verb",
            "BrE": "/əkˈsept/",
            "AmE": "/əkˈsept/",
            "definition": "to agree to take something that is offered",
            "examples": [
               "I accept your gift.",
               "She accepted the job offer.",
               "He accepted the invitation to the party."
            ]
         },
         {
            "id": 1,
            "word": "accident",
            "role": "noun",
            "BrE": "/ˈæksɪdənt/",
            "AmE": "/ˈæksɪdənt/",
            "definition": "a sudden event that is not planned and causes damage or injury",
            "examples": [
               "The car had an accident.",
               "She saw an accident on the road.",
               "The accident caused a traffic jam."
            ]
         },
         {
            "id": 1,
            "word": "according to",
            "role": "preposition",
            "BrE": "/əˈkɔːdɪŋ tə/",
            "AmE": "/əˈkɔːrdɪŋ tə/",
            "definition": "as stated by someone or something",
            "examples": [
               "According to her, it’s true.",
               "According to the news, it will rain.",
               "According to the teacher, we must study."
            ]
         },
         {
            "id": 1,
            "word": "achieve",
            "role": "verb",
            "BrE": "/əˈtʃiːv/",
            "AmE": "/əˈtʃiːv/",
            "definition": "to succeed in doing something by effort",
            "examples": [
               "I want to achieve my goal.",
               "She achieved high marks in the test.",
               "He achieved his dream of becoming a doctor."
            ]
         },
         {
            "id": 1,
            "word": "act",
            "role": "verb",
            "BrE": "/ækt/",
            "AmE": "/ækt/",
            "definition": "to do something for a particular purpose",
            "examples": [
               "You must act now.",
               "She acted quickly to help.",
               "He acted bravely during the emergency."
            ]
         },
         {
            "id": 1,
            "word": "active",
            "role": "adjective",
            "BrE": "/ˈæktɪv/",
            "AmE": "/ˈæktɪv/",
            "definition": "always doing things or moving",
            "examples": [
               "The dog is active.",
               "She is an active student in class.",
               "He stays active by running daily."
            ]
         },
         {
            "id": 1,
            "word": "actually",
            "role": "adverb",
            "BrE": "/ˈæktʃuəli/",
            "AmE": "/ˈæktʃuəli/",
            "definition": "used to give surprising information or to correct someone",
            "examples": [
               "It’s actually quite easy.",
               "She actually lives next door.",
               "Actually, he finished the work early."
            ]
         },
         {
            "id": 2,
            "word": "adult",
            "role": "adjective",
            "BrE": "/ˈædʌlt/",
            "AmE": "/əˈdʌlt/",
            "definition": "fully grown or developed",
            "examples": [
               "This is an adult class.",
               "Adult tickets cost more.",
               "The adult section is for older readers."
            ]
         },
         {
            "id": 2,
            "word": "advantage",
            "role": "noun",
            "BrE": "/ədˈvɑːntɪdʒ/",
            "AmE": "/ədˈvæntɪdʒ/",
            "definition": "something that helps you or is useful",
            "examples": [
               "It’s an advantage to know English.",
               "Her height is an advantage in basketball.",
               "The advantage of living here is the park."
            ]
         },
         {
            "id": 2,
            "word": "adventure",
            "role": "noun",
            "BrE": "/ədˈventʃə(r)/",
            "AmE": "/ədˈventʃər/",
            "definition": "an exciting or unusual experience",
            "examples": [
               "I want an adventure.",
               "She went on an adventure in the forest.",
               "His adventure in the mountains was thrilling."
            ]
         },
         {
            "id": 2,
            "word": "advertise",
            "role": "verb",
            "BrE": "/ˈædvətaɪz/",
            "AmE": "/ˈædvərtaɪz/",
            "definition": "to tell people about a product or service",
            "examples": [
               "They advertise new cars.",
               "She advertises her shop online.",
               "The company advertised the sale on TV."
            ]
         },
         {
            "id": 2,
            "word": "advertisement",
            "role": "noun",
            "BrE": "/ədˈvɜːtɪsmənt/",
            "AmE": "/ˌædvərˈtaɪzmənt/",
            "definition": "a notice or announcement about a product or service",
            "examples": [
               "I saw an advertisement.",
               "The advertisement was in the newspaper.",
               "An advertisement for shoes is on the wall."
            ]
         },
         {
            "id": 2,
            "word": "advertising",
            "role": "noun",
            "BrE": "/ˈædvətaɪzɪŋ/",
            "AmE": "/ˈædvərtaɪzɪŋ/",
            "definition": "the activity of making advertisements",
            "examples": [
               "Advertising is expensive.",
               "She works in advertising.",
               "Advertising helps sell products."
            ]
         },
         {
            "id": 2,
            "word": "affect",
            "role": "verb",
            "BrE": "/əˈfekt/",
            "AmE": "/əˈfekt/",
            "definition": "to produce a change in someone or something",
            "examples": [
               "Rain can affect plans.",
               "The news affected her deeply.",
               "His decision affected the whole team."
            ]
         },
         {
            "id": 2,
            "word": "after",
            "role": "adverb",
            "BrE": "/ˈɑːftə(r)/",
            "AmE": "/ˈæftər/",
            "definition": "later than something",
            "examples": [
               "I’ll call you after.",
               "She arrived after lunch.",
               "They met after the meeting ended."
            ]
         },
         {
            "id": 2,
            "word": "after",
            "role": "conjunction",
            "BrE": "/ˈɑːftə(r)/",
            "AmE": "/ˈæftər/",
            "definition": "at a time later than something else happens",
            "examples": [
               "After school, I play.",
               "She left after we talked.",
               "After finishing work, he went home."
            ]
         },
         {
            "id": 2,
            "word": "against",
            "role": "preposition",
            "BrE": "/əˈɡenst/",
            "AmE": "/əˈɡenst/",
            "definition": "opposing or not supporting something",
            "examples": [
               "I’m against the idea.",
               "She voted against the plan.",
               "They played against a strong team."
            ]
         },
         {
            "id": 3,
            "word": "ah",
            "role": "exclamation",
            "BrE": "/ɑː/",
            "AmE": "/ɑː/",
            "definition": "used to express surprise, pleasure, or understanding",
            "examples": [
               "Ah, I understand!",
               "Ah, that’s a nice view!",
               "Ah, you solved the problem!"
            ]
         },
         {
            "id": 3,
            "word": "airline",
            "role": "noun",
            "BrE": "/ˈeəlaɪn/",
            "AmE": "/ˈerlaɪn/",
            "definition": "a company that provides air transport",
            "examples": [
               "The airline is good.",
               "She works for an airline.",
               "This airline flies to many countries."
            ]
         },
         {
            "id": 3,
            "word": "alive",
            "role": "adjective",
            "BrE": "/əˈlaɪv/",
            "AmE": "/əˈlaɪv/",
            "definition": "living, not dead",
            "examples": [
               "The fish is alive.",
               "She felt alive after the run.",
               "The plants stayed alive in winter."
            ]
         },
         {
            "id": 3,
            "word": "all",
            "role": "adverb",
            "BrE": "/ɔːl/",
            "AmE": "/ɔːl/",
            "definition": "completely or entirely",
            "examples": [
               "I’m all tired.",
               "She ate all the cake.",
               "They were all excited about the trip."
            ]
         },
         {
            "id": 3,
            "word": "all right",
            "role": "adjective",
            "BrE": "/ˌɔːl ˈraɪt/",
            "AmE": "/ˌɔːl ˈraɪt/",
            "definition": "satisfactory, but not very good",
            "examples": [
               "The food is all right.",
               "Her work is all right.",
               "The film was all right, not great."
            ]
         },
         {
            "id": 3,
            "word": "all right",
            "role": "adverb",
            "BrE": "/ˌɔːl ˈraɪt/",
            "AmE": "/ˌɔːl ˈraɪt/",
            "definition": "in a way that is satisfactory",
            "examples": [
               "It works all right.",
               "She did all right in the test.",
               "The plan went all right."
            ]
         },
         {
            "id": 3,
            "word": "all right",
            "role": "exclamation",
            "BrE": "/ˌɔːl ˈraɪt/",
            "AmE": "/ˌɔːl ˈraɪt/",
            "definition": "used to agree or check if someone is okay",
            "examples": [
               "All right, let’s go!",
               "All right, I’ll help you.",
               "All right, are you ready?"
            ]
         },
         {
            "id": 3,
            "word": "allow",
            "role": "verb",
            "BrE": "/əˈlaʊ/",
            "AmE": "/əˈlaʊ/",
            "definition": "to let someone do or have something",
            "examples": [
               "They allow pets.",
               "She allows us to play here.",
               "The teacher allowed extra time."
            ]
         },
         {
            "id": 3,
            "word": "almost",
            "role": "adverb",
            "BrE": "/ˈɔːlməʊst/",
            "AmE": "/ˈɔːlmoʊst/",
            "definition": "nearly, but not completely",
            "examples": [
               "I’m almost finished.",
               "She almost missed the bus.",
               "He almost won the race."
            ]
         },
         {
            "id": 3,
            "word": "alone",
            "role": "adjective",
            "BrE": "/əˈləʊn/",
            "AmE": "/əˈloʊn/",
            "definition": "without other people",
            "examples": [
               "I am alone now.",
               "She feels alone at home.",
               "He was alone during the trip."
            ]
         },
         {
            "id": 4,
            "word": "alone",
            "role": "adverb",
            "BrE": "/əˈləʊn/",
            "AmE": "/əˈloʊn/",
            "definition": "without anyone else",
            "examples": [
               "I live alone.",
               "She travels alone often.",
               "He completed the project alone."
            ]
         },
         {
            "id": 4,
            "word": "along",
            "role": "adverb",
            "BrE": "/əˈlɒŋ/",
            "AmE": "/əˈlɔːŋ/",
            "definition": "forward or continuing in a direction",
            "examples": [
               "Move along, please.",
               "She walked along the path.",
               "They drove along the coast."
            ]
         },
         {
            "id": 4,
            "word": "along",
            "role": "preposition",
            "BrE": "/əˈlɒŋ/",
            "AmE": "/əˈlɔːŋ/",
            "definition": "by the side of something long",
            "examples": [
               "Trees are along the road.",
               "She runs along the river.",
               "Shops are along the main street."
            ]
         },
         {
            "id": 4,
            "word": "already",
            "role": "adverb",
            "BrE": "/ɔːlˈredi/",
            "AmE": "/ɔːlˈredi/",
            "definition": "before now or earlier than expected",
            "examples": [
               "I’m already here.",
               "She has already finished.",
               "They already booked the tickets."
            ]
         },
         {
            "id": 4,
            "word": "alternative",
            "role": "noun",
            "BrE": "/ɔːlˈtɜːnətɪv/",
            "AmE": "/ɔːlˈtɜːrnətɪv/",
            "definition": "something you can choose instead",
            "examples": [
               "I need an alternative.",
               "She chose an alternative plan.",
               "This is a good alternative to meat."
            ]
         },
         {
            "id": 4,
            "word": "although",
            "role": "conjunction",
            "BrE": "/ɔːlˈðəʊ/",
            "AmE": "/ɔːlˈðoʊ/",
            "definition": "despite the fact that",
            "examples": [
               "Although it’s cold, I’ll go.",
               "She smiled, although she was tired.",
               "Although he studied, he failed."
            ]
         },
         {
            "id": 4,
            "word": "among",
            "role": "preposition",
            "BrE": "/əˈmʌŋ/",
            "AmE": "/əˈmʌŋ/",
            "definition": "in the middle of or surrounded by",
            "examples": [
               "She’s among friends.",
               "The book is among the papers.",
               "He stood among the tall trees."
            ]
         },
         {
            "id": 4,
            "word": "amount",
            "role": "noun",
            "BrE": "/əˈmaʊnt/",
            "AmE": "/əˈmaʊnt/",
            "definition": "a quantity of something",
            "examples": [
               "I have a small amount.",
               "The amount of work is big.",
               "A large amount of money was spent."
            ]
         },
         {
            "id": 4,
            "word": "ancient",
            "role": "adjective",
            "BrE": "/ˈeɪnʃənt/",
            "AmE": "/ˈeɪnʃənt/",
            "definition": "very old or from a long time ago",
            "examples": [
               "This is an ancient book.",
               "She visited an ancient temple.",
               "The ancient ruins are famous."
            ]
         },
         {
            "id": 4,
            "word": "ankle",
            "role": "noun",
            "BrE": "/ˈæŋkl/",
            "AmE": "/ˈæŋkl/",
            "definition": "the joint connecting the foot to the leg",
            "examples": [
               "My ankle hurts.",
               "She twisted her ankle.",
               "His ankle swelled after the game."
            ]
         },
         {
            "id": 5,
            "word": "any",
            "role": "adverb",
            "BrE": "/ˈeni/",
            "AmE": "/ˈeni/",
            "definition": "used to emphasize how small an amount is",
            "examples": [
               "Is there any water?",
               "She didn’t eat any cake.",
               "He hasn’t got any time today."
            ]
         },
         {
            "id": 5,
            "word": "any more",
            "role": "adverb",
            "BrE": "/ˌeni ˈmɔː(r)/",
            "AmE": "/ˌeni ˈmɔːr/",
            "definition": "no longer or not now",
            "examples": [
               "I don’t go any more.",
               "She doesn’t live here any more.",
               "They don’t talk any more."
            ]
         },
         {
            "id": 5,
            "word": "anybody",
            "role": "pronoun",
            "BrE": "/ˈenibɒdi/",
            "AmE": "/ˈenibɑːdi/",
            "definition": "any person",
            "examples": [
               "Is anybody home?",
               "Anybody can join the club.",
               "Did anybody see my phone?"
            ]
         },
         {
            "id": 5,
            "word": "anyway",
            "role": "adverb",
            "BrE": "/ˈeniweɪ/",
            "AmE": "/ˈeniweɪ/",
            "definition": "used to change topic or return to an idea",
            "examples": [
               "Anyway, let’s go.",
               "I’m tired, but anyway, I’ll finish.",
               "Anyway, we decided to stay."
            ]
         },
         {
            "id": 5,
            "word": "anywhere",
            "role": "adverb",
            "BrE": "/ˈeniweə(r)/",
            "AmE": "/ˈeniwer/",
            "definition": "in or to any place",
            "examples": [
               "I can’t find it anywhere.",
               "She goes anywhere she wants.",
               "Is there a shop anywhere near?"
            ]
         },
         {
            "id": 5,
            "word": "anywhere",
            "role": "pronoun",
            "BrE": "/ˈeniweə(r)/",
            "AmE": "/ˈeniwer/",
            "definition": "any place",
            "examples": [
               "Anywhere is fine.",
               "Choose anywhere for the picnic.",
               "We can meet anywhere you like."
            ]
         },
         {
            "id": 5,
            "word": "app",
            "role": "noun",
            "BrE": "/æp/",
            "AmE": "/æp/",
            "definition": "a program for a computer or phone",
            "examples": [
               "I use a map app.",
               "She downloaded a new app.",
               "This app helps with learning."
            ]
         },
         {
            "id": 5,
            "word": "appear",
            "role": "verb",
            "BrE": "/əˈpɪə(r)/",
            "AmE": "/əˈpɪr/",
            "definition": "to seem or to become visible",
            "examples": [
               "You appear tired.",
               "She appeared happy at the party.",
               "The sun appeared after the rain."
            ]
         },
         {
            "id": 5,
            "word": "appearance",
            "role": "noun",
            "BrE": "/əˈpɪərəns/",
            "AmE": "/əˈpɪrəns/",
            "definition": "the way someone or something looks",
            "examples": [
               "Her appearance is nice.",
               "His appearance changed a lot.",
               "The appearance of the house is modern."
            ]
         },
         {
            "id": 5,
            "word": "apply",
            "role": "verb",
            "BrE": "/əˈplaɪ/",
            "AmE": "/əˈplaɪ/",
            "definition": "to ask formally for something, like a job",
            "examples": [
               "I apply for a job.",
               "She applied to a university.",
               "He applied for a new position."
            ]
         },
         {
            "id": 6,
            "word": "architect",
            "role": "noun",
            "BrE": "/ˈɑːkɪtekt/",
            "AmE": "/ˈɑːrkɪtekt/",
            "definition": "a person who designs buildings",
            "examples": [
               "The architect is busy.",
               "She is a famous architect.",
               "The architect drew the house plans."
            ]
         },
         {
            "id": 6,
            "word": "architecture",
            "role": "noun",
            "BrE": "/ˈɑːkɪtektʃə(r)/",
            "AmE": "/ˈɑːrkɪtektʃər/",
            "definition": "the art or practice of designing buildings",
            "examples": [
               "I like architecture.",
               "She studies architecture.",
               "The city’s architecture is beautiful."
            ]
         },
         {
            "id": 6,
            "word": "argue",
            "role": "verb",
            "BrE": "/ˈɑːɡjuː/",
            "AmE": "/ˈɑːrɡjuː/",
            "definition": "to speak angrily to someone because you disagree",
            "examples": [
               "They argue a lot.",
               "She argued with her friend.",
               "He argued about the project."
            ]
         },
         {
            "id": 6,
            "word": "argument",
            "role": "noun",
            "BrE": "/ˈɑːɡjumənt/",
            "AmE": "/ˈɑːrɡjumənt/",
            "definition": "a discussion in which people disagree, often angrily",
            "examples": [
               "They had an argument.",
               "The argument was about money.",
               "An argument started in the meeting."
            ]
         },
         {
            "id": 6,
            "word": "army",
            "role": "noun",
            "BrE": "/ˈɑːmi/",
            "AmE": "/ˈɑːrmi/",
            "definition": "a large group of soldiers who fight on land",
            "examples": [
               "The army is strong.",
               "He joined the army last year.",
               "The army trained in the mountains."
            ]
         },
         {
            "id": 6,
            "word": "arrange",
            "role": "verb",
            "BrE": "/əˈreɪndʒ/",
            "AmE": "/əˈreɪndʒ/",
            "definition": "to plan or organize something",
            "examples": [
               "I arrange a meeting.",
               "She arranged a party.",
               "They arranged the books neatly."
            ]
         },
         {
            "id": 6,
            "word": "arrangement",
            "role": "noun",
            "BrE": "/əˈreɪndʒmənt/",
            "AmE": "/əˈreɪndʒmənt/",
            "definition": "a plan or preparation for something",
            "examples": [
               "The arrangement is ready.",
               "She made an arrangement for dinner.",
               "The arrangement of the trip was easy."
            ]
         },
         {
            "id": 6,
            "word": "as",
            "role": "adverb",
            "BrE": "/əz/",
            "AmE": "/əz/",
            "definition": "used to compare or describe something",
            "examples": [
               "She sings as well.",
               "He runs as fast as me.",
               "It’s not as easy as it looks."
            ]
         },
         {
            "id": 6,
            "word": "as",
            "role": "conjunction",
            "BrE": "/əz/",
            "AmE": "/əz/",
            "definition": "used to show the reason or time of something",
            "examples": [
               "As it’s late, I’ll go.",
               "She smiled as he spoke.",
               "As it was raining, we stayed home."
            ]
         },
         {
            "id": 6,
            "word": "asleep",
            "role": "adjective",
            "BrE": "/əˈsliːp/",
            "AmE": "/əˈsliːp/",
            "definition": "sleeping",
            "examples": [
               "The baby is asleep.",
               "She was asleep during the film.",
               "He fell asleep in the car."
            ]
         },
         {
            "id": 7,
            "word": "assistant",
            "role": "adjective",
            "BrE": "/əˈsɪstənt/",
            "AmE": "/əˈsɪstənt/",
            "definition": "helping or supporting someone in a job",
            "examples": [
               "She is an assistant teacher.",
               "He works as an assistant manager.",
               "The assistant coach helped the team."
            ]
         },
         {
            "id": 7,
            "word": "assistant",
            "role": "noun",
            "BrE": "/əˈsɪstənt/",
            "AmE": "/əˈsɪstənt/",
            "definition": "a person who helps someone in a job",
            "examples": [
               "The assistant is kind.",
               "She is a shop assistant.",
               "The assistant helped with the project."
            ]
         },
         {
            "id": 7,
            "word": "athlete",
            "role": "noun",
            "BrE": "/ˈæθliːt/",
            "AmE": "/ˈæθliːt/",
            "definition": "a person who is good at sports",
            "examples": [
               "He is an athlete.",
               "The athlete won a medal.",
               "She trains as an athlete every day."
            ]
         },
         {
            "id": 7,
            "word": "attack",
            "role": "noun",
            "BrE": "/əˈtæk/",
            "AmE": "/əˈtæk/",
            "definition": "a sudden act of violence",
            "examples": [
               "The attack was quick.",
               "An attack happened in the city.",
               "The attack caused a lot of fear."
            ]
         },
         {
            "id": 7,
            "word": "attack",
            "role": "verb",
            "BrE": "/əˈtæk/",
            "AmE": "/əˈtæk/",
            "definition": "to use violence to try to hurt someone",
            "examples": [
               "The dog didn’t attack.",
               "They attacked the enemy.",
               "He was attacked while walking home."
            ]
         },
         {
            "id": 7,
            "word": "attend",
            "role": "verb",
            "BrE": "/əˈtend/",
            "AmE": "/əˈtend/",
            "definition": "to go to an event or place",
            "examples": [
               "I attend school.",
               "She attended a concert.",
               "He attends meetings every week."
            ]
         },
         {
            "id": 7,
            "word": "attention",
            "role": "exclamation",
            "BrE": "/əˈtenʃn/",
            "AmE": "/əˈtenʃn/",
            "definition": "used to ask people to listen or focus",
            "examples": [
               "Attention, please!",
               "Attention, the class starts now!",
               "Attention, we need your help!"
            ]
         },
         {
            "id": 7,
            "word": "attention",
            "role": "noun",
            "BrE": "/əˈtenʃn/",
            "AmE": "/əˈtenʃn/",
            "definition": "the act of watching or listening carefully",
            "examples": [
               "Pay attention in class.",
               "She gave him her full attention.",
               "The speech got everyone’s attention."
            ]
         },
         {
            "id": 7,
            "word": "attractive",
            "role": "adjective",
            "BrE": "/əˈtræktɪv/",
            "AmE": "/əˈtræktɪv/",
            "definition": "pleasant to look at",
            "examples": [
               "The house is attractive.",
               "She wore an attractive dress.",
               "The park is attractive in spring."
            ]
         },
         {
            "id": 7,
            "word": "audience",
            "role": "noun",
            "BrE": "/ˈɔːdiəns/",
            "AmE": "/ˈɔːdiəns/",
            "definition": "the people watching or listening to something",
            "examples": [
               "The audience clapped.",
               "She spoke to a large audience.",
               "The audience enjoyed the show."
            ]
         },
         {
            "id": 8,
            "word": "author",
            "role": "noun",
            "BrE": "/ˈɔːθə(r)/",
            "AmE": "/ˈɔːθər/",
            "definition": "a person who writes a book, article, etc.",
            "examples": [
               "The author is famous.",
               "She is the author of this book.",
               "The author signed my copy."
            ]
         },
         {
            "id": 8,
            "word": "available",
            "role": "adjective",
            "BrE": "/əˈveɪləbl/",
            "AmE": "/əˈveɪləbl/",
            "definition": "able to be used or obtained",
            "examples": [
               "Tickets are available.",
               "Is the doctor available now?",
               "The book is available in shops."
            ]
         },
         {
            "id": 8,
            "word": "average",
            "role": "adjective",
            "BrE": "/ˈævərɪdʒ/",
            "AmE": "/ˈævərɪdʒ/",
            "definition": "typical or normal",
            "examples": [
               "He is an average student.",
               "The weather is average today.",
               "Her height is average for her age."
            ]
         },
         {
            "id": 8,
            "word": "average",
            "role": "noun",
            "BrE": "/ˈævərɪdʒ/",
            "AmE": "/ˈævərɪdʒ/",
            "definition": "the result of adding amounts and dividing",
            "examples": [
               "The average is ten.",
               "Her test average was high.",
               "The average of the scores was 80."
            ]
         },
         {
            "id": 8,
            "word": "avoid",
            "role": "verb",
            "BrE": "/əˈvɔɪd/",
            "AmE": "/əˈvɔɪd/",
            "definition": "to prevent something or stay away from it",
            "examples": [
               "Avoid the busy road.",
               "She avoids eating sugar.",
               "He avoided answering the question."
            ]
         },
         {
            "id": 8,
            "word": "award",
            "role": "noun",
            "BrE": "/əˈwɔːd/",
            "AmE": "/əˈwɔːrd/",
            "definition": "a prize given for achievement",
            "examples": [
               "She won an award.",
               "The award was for best student.",
               "He received an award for his work."
            ]
         },
         {
            "id": 8,
            "word": "awful",
            "role": "adjective",
            "BrE": "/ˈɔːfl/",
            "AmE": "/ˈɔːfl/",
            "definition": "very bad or unpleasant",
            "examples": [
               "The weather is awful.",
               "She had an awful day.",
               "The awful smell made us leave."
            ]
         },
         {
            "id": 8,
            "word": "back",
            "role": "adjective",
            "BrE": "/bæk/",
            "AmE": "/bæk/",
            "definition": "at the rear of something",
            "examples": [
               "The back door is open.",
               "She sat in the back seat.",
               "The back garden is beautiful."
            ]
         },
         {
            "id": 8,
            "word": "background",
            "role": "noun",
            "BrE": "/ˈbækɡraʊnd/",
            "AmE": "/ˈbækɡraʊnd/",
            "definition": "the part behind the main thing",
            "examples": [
               "The background is blue.",
               "She stood against a green background.",
               "The background of the photo is nice."
            ]
         },
         {
            "id": 8,
            "word": "badly",
            "role": "adverb",
            "BrE": "/ˈbædli/",
            "AmE": "/ˈbædli/",
            "definition": "in a poor or unsatisfactory way",
            "examples": [
               "He sings badly.",
               "She played badly in the game.",
               "The car was badly damaged."
            ]
         },
         {
            "id": 9,
            "word": "bar",
            "role": "noun",
            "BrE": "/bɑː(r)/",
            "AmE": "/bɑːr/",
            "definition": "a place where drinks are served",
            "examples": [
               "The bar is open.",
               "She works in a bar.",
               "They met at the bar last night."
            ]
         },
         {
            "id": 9,
            "word": "baseball",
            "role": "noun",
            "BrE": "/ˈbeɪsbɔːl/",
            "AmE": "/ˈbeɪsbɔːl/",
            "definition": "a game played with a bat and ball",
            "examples": [
               "I like baseball.",
               "He plays baseball every weekend.",
               "The baseball match was exciting."
            ]
         },
         {
            "id": 9,
            "word": "based",
            "role": "adjective",
            "BrE": "/beɪst/",
            "AmE": "/beɪst/",
            "definition": "using something as the foundation",
            "examples": [
               "The story is based on a book.",
               "Her film is based on a true story.",
               "The game is based on history."
            ]
         },
         {
            "id": 9,
            "word": "basketball",
            "role": "noun",
            "BrE": "/ˈbɑːskɪtbɔːl/",
            "AmE": "/ˈbæskɪtbɔːl/",
            "definition": "a game where players throw a ball into a net",
            "examples": [
               "I play basketball.",
               "She joined a basketball team.",
               "The basketball game was close."
            ]
         },
         {
            "id": 9,
            "word": "bean",
            "role": "noun",
            "BrE": "/biːn/",
            "AmE": "/biːn/",
            "definition": "a seed or pod used as food",
            "examples": [
               "I eat beans.",
               "She cooked beans for dinner.",
               "The beans in the soup were tasty."
            ]
         },
         {
            "id": 9,
            "word": "bear",
            "role": "noun",
            "BrE": "/beə(r)/",
            "AmE": "/ber/",
            "definition": "a large, heavy animal with thick fur",
            "examples": [
               "I saw a bear.",
               "The bear lives in the forest.",
               "A bear was near the river."
            ]
         },
         {
            "id": 9,
            "word": "beat",
            "role": "verb",
            "BrE": "/biːt/",
            "AmE": "/biːt/",
            "definition": "to defeat someone in a game or competition",
            "examples": [
               "We beat the team.",
               "She beat him at chess.",
               "They beat the record time."
            ]
         },
         {
            "id": 9,
            "word": "beef",
            "role": "noun",
            "BrE": "/biːf/",
            "AmE": "/biːf/",
            "definition": "meat from a cow",
            "examples": [
               "I like beef.",
               "She cooked beef for dinner.",
               "The beef was tender and juicy."
            ]
         },
         {
            "id": 9,
            "word": "before",
            "role": "adverb",
            "BrE": "/bɪˈfɔː(r)/",
            "AmE": "/bɪˈfɔːr/",
            "definition": "at an earlier time",
            "examples": [
               "I saw him before.",
               "She called me before lunch.",
               "They met before the meeting."
            ]
         },
         {
            "id": 9,
            "word": "before",
            "role": "conjunction",
            "BrE": "/bɪˈfɔː(r)/",
            "AmE": "/bɪˈfɔːr/",
            "definition": "earlier than the time when something happens",
            "examples": [
               "I’ll finish before you go.",
               "She left before it rained.",
               "He ate before the class started."
            ]
         },
         {
            "id": 10,
            "word": "behave",
            "role": "verb",
            "BrE": "/bɪˈheɪv/",
            "AmE": "/bɪˈheɪv/",
            "definition": "to act in a particular way",
            "examples": [
               "You must behave well.",
               "She behaves politely in class.",
               "He didn’t behave during the lesson."
            ]
         },
         {
            "id": 10,
            "word": "behaviour",
            "role": "noun",
            "BrE": "/bɪˈheɪvjə(r)/",
            "AmE": "/bɪˈheɪvjər/",
            "definition": "the way someone acts",
            "examples": [
               "Her behaviour is good.",
               "His behaviour upset the teacher.",
               "The behaviour of the dog was strange."
            ]
         },
         {
            "id": 10,
            "word": "belong",
            "role": "verb",
            "BrE": "/bɪˈlɒŋ/",
            "AmE": "/bɪˈlɔːŋ/",
            "definition": "to be owned by someone or be in the right place",
            "examples": [
               "This book belongs to me.",
               "She belongs to the club.",
               "The bag belongs in the closet."
            ]
         },
         {
            "id": 10,
            "word": "belt",
            "role": "noun",
            "BrE": "/belt/",
            "AmE": "/belt/",
            "definition": "a strip of material worn around the waist",
            "examples": [
               "I wear a belt.",
               "Her belt is black.",
               "The belt matches his shoes."
            ]
         },
         {
            "id": 10,
            "word": "benefit",
            "role": "noun",
            "BrE": "/ˈbenɪfɪt/",
            "AmE": "/ˈbenɪfɪt/",
            "definition": "an advantage or good effect",
            "examples": [
               "Exercise has benefits.",
               "The job has good benefits.",
               "The benefit of studying is success."
            ]
         },
         {
            "id": 10,
            "word": "best",
            "role": "adverb",
            "BrE": "/best/",
            "AmE": "/best/",
            "definition": "in the most excellent way",
            "examples": [
               "She sings best.",
               "He runs best in the team.",
               "They work best under pressure."
            ]
         },
         {
            "id": 10,
            "word": "best",
            "role": "noun",
            "BrE": "/best/",
            "AmE": "/best/",
            "definition": "the most excellent person or thing",
            "examples": [
               "She is the best.",
               "This is the best book.",
               "He did his best in the exam."
            ]
         },
         {
            "id": 10,
            "word": "better",
            "role": "adverb",
            "BrE": "/ˈbetə(r)/",
            "AmE": "/ˈbetər/",
            "definition": "in a more excellent way",
            "examples": [
               "She sings better now.",
               "He plays better than me.",
               "They work better as a team."
            ]
         },
         {
            "id": 10,
            "word": "between",
            "role": "adverb",
            "BrE": "/bɪˈtwiːn/",
            "AmE": "/bɪˈtwiːn/",
            "definition": "in or into the space separating things",
            "examples": [
               "The book is between them.",
               "She sat between her friends.",
               "The ball rolled between the chairs."
            ]
         },
         {
            "id": 10,
            "word": "billion",
            "role": "number",
            "BrE": "/ˈbɪljən/",
            "AmE": "/ˈbɪljən/",
            "definition": "the number 1,000,000,000",
            "examples": [
               "A billion is big.",
               "The company earned a billion.",
               "A billion stars shone at night."
            ]
         },
         {
            "id": 11,
            "word": "bin",
            "role": "noun",
            "BrE": "/bɪn/",
            "AmE": "/bɪn/",
            "definition": "a container for rubbish or storage",
            "examples": [
               "Throw it in the bin.",
               "She put paper in the bin.",
               "The bin is full of rubbish."
            ]
         },
         {
            "id": 11,
            "word": "biology",
            "role": "noun",
            "BrE": "/baɪˈɒlədʒi/",
            "AmE": "/baɪˈɑːlədʒi/",
            "definition": "the scientific study of living things",
            "examples": [
               "I study biology.",
               "She loves biology class.",
               "Biology teaches us about plants."
            ]
         },
         {
            "id": 11,
            "word": "birth",
            "role": "noun",
            "BrE": "/bɜːθ/",
            "AmE": "/bɜːrθ/",
            "definition": "the time when a baby is born",
            "examples": [
               "Her birth was in June.",
               "The birth of the baby was quick.",
               "His birth certificate is here."
            ]
         },
         {
            "id": 11,
            "word": "biscuit",
            "role": "noun",
            "BrE": "/ˈbɪskɪt/",
            "AmE": "/ˈbɪskɪt/",
            "definition": "a small, flat, sweet baked food",
            "examples": [
               "I eat a biscuit.",
               "She gave me a biscuit.",
               "The biscuit was chocolate-flavoured."
            ]
         },
         {
            "id": 11,
            "word": "bit",
            "role": "noun",
            "BrE": "/bɪt/",
            "AmE": "/bɪt/",
            "definition": "a small piece or amount of something",
            "examples": [
               "I want a bit of cake.",
               "She ate a bit of bread.",
               "He gave me a bit of advice."
            ]
         },
         {
            "id": 11,
            "word": "blank",
            "role": "adjective",
            "BrE": "/blæŋk/",
            "AmE": "/blæŋk/",
            "definition": "empty or with no writing or marks",
            "examples": [
               "The page is blank.",
               "She gave a blank look.",
               "The blank paper is on the desk."
            ]
         },
         {
            "id": 11,
            "word": "blank",
            "role": "noun",
            "BrE": "/blæŋk/",
            "AmE": "/blæŋk/",
            "definition": "an empty space",
            "examples": [
               "Fill in the blank.",
               "The form has a blank.",
               "She left a blank in her answer."
            ]
         },
         {
            "id": 11,
            "word": "blood",
            "role": "noun",
            "BrE": "/blʌd/",
            "AmE": "/blʌd/",
            "definition": "the red liquid in the body",
            "examples": [
               "Blood is red.",
               "He lost some blood.",
               "The doctor checked her blood."
            ]
         },
         {
            "id": 11,
            "word": "blow",
            "role": "verb",
            "BrE": "/bləʊ/",
            "AmE": "/bloʊ/",
            "definition": "to send out air from the mouth",
            "examples": [
               "Blow the candle out.",
               "She blew on her soup.",
               "He blew air into the balloon."
            ]
         },
         {
            "id": 11,
            "word": "board",
            "role": "noun",
            "BrE": "/bɔːd/",
            "AmE": "/bɔːrd/",
            "definition": "a flat piece of wood or other material",
            "examples": [
               "The board is strong.",
               "She wrote on the board.",
               "The board was used for the sign."
            ]
         },
         {
            "id": 12,
            "word": "boil",
            "role": "verb",
            "BrE": "/bɔɪl/",
            "AmE": "/bɔɪl/",
            "definition": "to heat a liquid until it bubbles",
            "examples": [
               "Boil the water.",
               "She boiled some eggs.",
               "He boiled the soup for dinner."
            ]
         },
         {
            "id": 12,
            "word": "bone",
            "role": "noun",
            "BrE": "/bəʊn/",
            "AmE": "/boʊn/",
            "definition": "a hard part inside the body",
            "examples": [
               "The dog ate a bone.",
               "She broke a bone.",
               "The bone was found in the park."
            ]
         },
         {
            "id": 12,
            "word": "book",
            "role": "verb",
            "BrE": "/bʊk/",
            "AmE": "/bʊk/",
            "definition": "to arrange to have or use something",
            "examples": [
               "I book a ticket.",
               "She booked a hotel room.",
               "He booked a table for dinner."
            ]
         },
         {
            "id": 12,
            "word": "borrow",
            "role": "verb",
            "BrE": "/ˈbɒrəʊ/",
            "AmE": "/ˈbɑːroʊ/",
            "definition": "to take something from someone, planning to return it",
            "examples": [
               "I borrow a book.",
               "She borrowed my pen.",
               "He borrowed money from his friend."
            ]
         },
         {
            "id": 12,
            "word": "boss",
            "role": "noun",
            "BrE": "/bɒs/",
            "AmE": "/bɔːs/",
            "definition": "a person who is in charge of others",
            "examples": [
               "My boss is kind.",
               "She spoke to her boss.",
               "The boss gave us a task."
            ]
         },
         {
            "id": 12,
            "word": "bottom",
            "role": "adjective",
            "BrE": "/ˈbɒtəm/",
            "AmE": "/ˈbɑːtəm/",
            "definition": "in the lowest position",
            "examples": [
               "The bottom shelf is full.",
               "She sat on the bottom step.",
               "The bottom drawer is empty."
            ]
         },
         {
            "id": 12,
            "word": "bottom",
            "role": "noun",
            "BrE": "/ˈbɒtəm/",
            "AmE": "/ˈbɑːtəm/",
            "definition": "the lowest part of something",
            "examples": [
               "The bottom is wet.",
               "The book is at the bottom.",
               "She reached the bottom of the hill."
            ]
         },
         {
            "id": 12,
            "word": "bowl",
            "role": "noun",
            "BrE": "/bəʊl/",
            "AmE": "/boʊl/",
            "definition": "a deep, round container for food",
            "examples": [
               "I eat from a bowl.",
               "She filled the bowl with soup.",
               "The bowl of fruit is on the table."
            ]
         },
         {
            "id": 12,
            "word": "brain",
            "role": "noun",
            "BrE": "/breɪn/",
            "AmE": "/breɪn/",
            "definition": "the organ in the head used for thinking",
            "examples": [
               "The brain is important.",
               "Her brain works fast.",
               "The doctor studied the brain."
            ]
         },
         {
            "id": 12,
            "word": "bridge",
            "role": "noun",
            "BrE": "/brɪdʒ/",
            "AmE": "/brɪdʒ/",
            "definition": "a structure built over a river or road",
            "examples": [
               "The bridge is old.",
               "She crossed the bridge.",
               "The bridge connects two towns."
            ]
         },
         {
            "id": 13,
            "word": "bright",
            "role": "adjective",
            "BrE": "/braɪt/",
            "AmE": "/braɪt/",
            "definition": "full of light or shining",
            "examples": [
               "The room is bright.",
               "Her bright smile cheered me.",
               "The bright sun warmed the day."
            ]
         },
         {
            "id": 13,
            "word": "brilliant",
            "role": "adjective",
            "BrE": "/ˈbrɪliənt/",
            "AmE": "/ˈbrɪliənt/",
            "definition": "extremely clever or impressive",
            "examples": [
               "Her idea is brilliant.",
               "He wrote a brilliant essay.",
               "The brilliant plan worked perfectly."
            ]
         },
         {
            "id": 13,
            "word": "broken",
            "role": "adjective",
            "BrE": "/ˈbrəʊkən/",
            "AmE": "/ˈbroʊkən/",
            "definition": "damaged or in pieces",
            "examples": [
               "The glass is broken.",
               "She fixed the broken chair.",
               "His broken phone needs repair."
            ]
         },
         {
            "id": 13,
            "word": "brush",
            "role": "noun",
            "BrE": "/brʌʃ/",
            "AmE": "/brʌʃ/",
            "definition": "a tool with hairs used for cleaning or painting",
            "examples": [
               "I need a brush.",
               "She used a brush for painting.",
               "The brush cleaned the shoes."
            ]
         },
         {
            "id": 13,
            "word": "brush",
            "role": "verb",
            "BrE": "/brʌʃ/",
            "AmE": "/brʌʃ/",
            "definition": "to clean or tidy with a brush",
            "examples": [
               "I brush my hair.",
               "She brushed her teeth.",
               "He brushed the dirt off his coat."
            ]
         },
         {
            "id": 13,
            "word": "burn",
            "role": "verb",
            "BrE": "/bɜːn/",
            "AmE": "/bɜːrn/",
            "definition": "to destroy or damage by fire",
            "examples": [
               "The fire burns wood.",
               "She burned the old papers.",
               "He burned his hand on the stove."
            ]
         },
         {
            "id": 13,
            "word": "businessman",
            "role": "noun",
            "BrE": "/ˈbɪznəsmæn/",
            "AmE": "/ˈbɪznəsmæn/",
            "definition": "a man who works in business",
            "examples": [
               "He is a businessman.",
               "The businessman travels often.",
               "A businessman started the company."
            ]
         },
         {
            "id": 13,
            "word": "button",
            "role": "noun",
            "BrE": "/ˈbʌtn/",
            "AmE": "/ˈbʌtn/",
            "definition": "a small object used to fasten clothes",
            "examples": [
               "My button is loose.",
               "She sewed a button on.",
               "The button fell off his shirt."
            ]
         },
         {
            "id": 13,
            "word": "camp",
            "role": "noun",
            "BrE": "/kæmp/",
            "AmE": "/kæmp/",
            "definition": "a place where people stay in tents",
            "examples": [
               "We stayed at a camp.",
               "The camp is near the lake.",
               "The summer camp was fun."
            ]
         },
         {
            "id": 13,
            "word": "camp",
            "role": "verb",
            "BrE": "/kæmp/",
            "AmE": "/kæmp/",
            "definition": "to stay in a tent or temporary shelter",
            "examples": [
               "We camp in summer.",
               "She camped by the river.",
               "They camped in the mountains."
            ]
         },
         {
            "id": 14,
            "word": "camping",
            "role": "noun",
            "BrE": "/ˈkæmpɪŋ/",
            "AmE": "/ˈkæmpɪŋ/",
            "definition": "the activity of staying in a tent",
            "examples": [
               "Camping is fun.",
               "She loves camping with friends.",
               "Camping in the forest was exciting."
            ]
         },
         {
            "id": 14,
            "word": "can",
            "role": "noun",
            "BrE": "/kæn/",
            "AmE": "/kæn/",
            "definition": "a metal container for food or drink",
            "examples": [
               "I opened a can.",
               "She bought a can of soda.",
               "The can of soup is in the kitchen."
            ]
         },
         {
            "id": 14,
            "word": "care",
            "role": "noun",
            "BrE": "/keə(r)/",
            "AmE": "/ker/",
            "definition": "the process of looking after someone or something",
            "examples": [
               "She needs care.",
               "He takes care of his dog.",
               "The care of the garden is hard."
            ]
         },
         {
            "id": 14,
            "word": "care",
            "role": "verb",
            "BrE": "/keə(r)/",
            "AmE": "/ker/",
            "definition": "to feel concerned about someone or something",
            "examples": [
               "I care about you.",
               "She cares for her family.",
               "He cares about the environment."
            ]
         },
         {
            "id": 14,
            "word": "careful",
            "role": "adjective",
            "BrE": "/ˈkeəfl/",
            "AmE": "/ˈkerfl/",
            "definition": "taking care to avoid problems",
            "examples": [
               "Be careful with knives.",
               "She is careful when driving.",
               "He was careful with his homework."
            ]
         },
         {
            "id": 14,
            "word": "carefully",
            "role": "adverb",
            "BrE": "/ˈkeəfəli/",
            "AmE": "/ˈkerfəli/",
            "definition": "in a way that avoids problems",
            "examples": [
               "Drive carefully.",
               "She writes carefully.",
               "He carefully checked his work."
            ]
         },
         {
            "id": 14,
            "word": "carpet",
            "role": "noun",
            "BrE": "/ˈkɑːpɪt/",
            "AmE": "/ˈkɑːrpɪt/",
            "definition": "a thick woven material covering a floor",
            "examples": [
               "The carpet is soft.",
               "She bought a red carpet.",
               "The carpet in the room is new."
            ]
         },
         {
            "id": 14,
            "word": "cartoon",
            "role": "noun",
            "BrE": "/kɑːˈtuːn/",
            "AmE": "/kɑːrˈtuːn/",
            "definition": "a funny drawing or animated film",
            "examples": [
               "I watch a cartoon.",
               "She loves cartoon shows.",
               "The cartoon made us laugh."
            ]
         },
         {
            "id": 14,
            "word": "case",
            "role": "noun",
            "BrE": "/keɪs/",
            "AmE": "/keɪs/",
            "definition": "a particular situation or example",
            "examples": [
               "This is a bad case.",
               "In her case, she was late.",
               "The case of missing keys was solved."
            ]
         },
         {
            "id": 14,
            "word": "cash",
            "role": "noun",
            "BrE": "/kæʃ/",
            "AmE": "/kæʃ/",
            "definition": "money in coins or notes",
            "examples": [
               "I need cash.",
               "She paid with cash.",
               "The shop only accepts cash."
            ]
         },
         {
            "id": 15,
            "word": "castle",
            "role": "noun",
            "BrE": "/ˈkɑːsl/",
            "AmE": "/ˈkæsl/",
            "definition": "a large, strong building, often from the past",
            "examples": [
               "The castle is old.",
               "She visited a castle.",
               "The castle has a big tower."
            ]
         },
         {
            "id": 15,
            "word": "catch",
            "role": "verb",
            "BrE": "/kætʃ/",
            "AmE": "/kætʃ/",
            "definition": "to take and hold something moving",
            "examples": [
               "Catch the ball!",
               "She caught the bus.",
               "He caught a fish in the river."
            ]
         },
         {
            "id": 15,
            "word": "cause",
            "role": "noun",
            "BrE": "/kɔːz/",
            "AmE": "/kɔːz/",
            "definition": "the reason why something happens",
            "examples": [
               "What’s the cause?",
               "The cause of the fire was unknown.",
               "Rain was the cause of the delay."
            ]
         },
         {
            "id": 15,
            "word": "cause",
            "role": "verb",
            "BrE": "/kɔːz/",
            "AmE": "/kɔːz/",
            "definition": "to make something happen",
            "examples": [
               "Rain causes floods.",
               "She caused a big problem.",
               "His mistake caused the accident."
            ]
         },
         {
            "id": 15,
            "word": "celebrate",
            "role": "verb",
            "BrE": "/ˈselɪbreɪt/",
            "AmE": "/ˈselɪbreɪt/",
            "definition": "to do something special for an event",
            "examples": [
               "We celebrate birthdays.",
               "She celebrated her new job.",
               "They celebrated with a big party."
            ]
         },
         {
            "id": 15,
            "word": "celebrity",
            "role": "noun",
            "BrE": "/səˈlebrəti/",
            "AmE": "/səˈlebrəti/",
            "definition": "a famous person",
            "examples": [
               "He’s a celebrity.",
               "She met a celebrity at the event.",
               "The celebrity signed autographs."
            ]
         },
         {
            "id": 15,
            "word": "certain",
            "role": "adjective",
            "BrE": "/ˈsɜːtn/",
            "AmE": "/ˈsɜːrtn/",
            "definition": "sure or definite",
            "examples": [
               "I’m certain it’s true.",
               "She’s certain about the answer.",
               "He’s certain of his success."
            ]
         },
         {
            "id": 15,
            "word": "certainly",
            "role": "adverb",
            "BrE": "/ˈsɜːtnli/",
            "AmE": "/ˈsɜːrtnli/",
            "definition": "without doubt",
            "examples": [
               "I’ll certainly come.",
               "She certainly knows a lot.",
               "He certainly passed the test."
            ]
         },
         {
            "id": 15,
            "word": "chance",
            "role": "noun",
            "BrE": "/tʃɑːns/",
            "AmE": "/tʃæns/",
            "definition": "an opportunity or possibility",
            "examples": [
               "Give me a chance.",
               "She got a chance to sing.",
               "There’s a chance it will rain."
            ]
         },
         {
            "id": 15,
            "word": "character",
            "role": "noun",
            "BrE": "/ˈkærəktə(r)/",
            "AmE": "/ˈkærəktər/",
            "definition": "a person in a story or film",
            "examples": [
               "The character is funny.",
               "She plays a character in the film.",
               "The main character solves the mystery."
            ]
         },
         {
            "id": 16,
            "word": "charity",
            "role": "noun",
            "BrE": "/ˈtʃærəti/",
            "AmE": "/ˈtʃærəti/",
            "definition": "an organization that helps people in need",
            "examples": [
               "I give to charity.",
               "She works for a charity.",
               "The charity helps poor children."
            ]
         },
         {
            "id": 16,
            "word": "chat",
            "role": "noun",
            "BrE": "/tʃæt/",
            "AmE": "/tʃæt/",
            "definition": "a friendly, informal conversation",
            "examples": [
               "Let’s have a chat.",
               "She had a chat with her friend.",
               "The chat was about the holiday."
            ]
         },
         {
            "id": 16,
            "word": "chat",
            "role": "verb",
            "BrE": "/tʃæt/",
            "AmE": "/tʃæt/",
            "definition": "to talk in a friendly, informal way",
            "examples": [
               "We chat every day.",
               "She chatted with her teacher.",
               "They chatted about the news."
            ]
         },
         {
            "id": 16,
            "word": "check",
            "role": "noun",
            "BrE": "/tʃek/",
            "AmE": "/tʃek/",
            "definition": "an examination to see if something is correct",
            "examples": [
               "Do a quick check.",
               "She did a check of her work.",
               "The teacher gave a spelling check."
            ]
         },
         {
            "id": 16,
            "word": "chef",
            "role": "noun",
            "BrE": "/ʃef/",
            "AmE": "/ʃef/",
            "definition": "a professional cook",
            "examples": [
               "The chef is cooking.",
               "She is a famous chef.",
               "The chef made a delicious meal."
            ]
         },
         {
            "id": 16,
            "word": "chemistry",
            "role": "noun",
            "BrE": "/ˈkemɪstri/",
            "AmE": "/ˈkemɪstri/",
            "definition": "the scientific study of substances",
            "examples": [
               "I study chemistry.",
               "She likes chemistry lessons.",
               "Chemistry explains how things mix."
            ]
         },
         {
            "id": 16,
            "word": "chip",
            "role": "noun",
            "BrE": "/tʃɪp/",
            "AmE": "/tʃɪp/",
            "definition": "a thin piece of fried potato",
            "examples": [
               "I eat chips.",
               "She bought a bag of chips.",
               "The chips were salty and crispy."
            ]
         },
         {
            "id": 16,
            "word": "choice",
            "role": "noun",
            "BrE": "/tʃɔɪs/",
            "AmE": "/tʃɔɪs/",
            "definition": "the act of choosing or an option",
            "examples": [
               "Make a choice.",
               "She made a good choice.",
               "His choice of clothes was nice."
            ]
         },
         {
            "id": 16,
            "word": "church",
            "role": "noun",
            "BrE": "/tʃɜːtʃ/",
            "AmE": "/tʃɜːrtʃ/",
            "definition": "a building for Christian religious activities",
            "examples": [
               "The church is old.",
               "She goes to church on Sunday.",
               "The church has a tall tower."
            ]
         },
         {
            "id": 16,
            "word": "cigarette",
            "role": "noun",
            "BrE": "/ˌsɪɡəˈret/",
            "AmE": "/ˈsɪɡəret/",
            "definition": "a small roll of tobacco smoked",
            "examples": [
               "He smokes a cigarette.",
               "She bought a pack of cigarettes.",
               "Cigarettes are bad for health."
            ]
         },
         {
            "id": 17,
            "word": "circle",
            "role": "noun",
            "BrE": "/ˈsɜːkl/",
            "AmE": "/ˈsɜːrkl/",
            "definition": "a round shape",
            "examples": [
               "Draw a circle.",
               "She stood in a circle.",
               "The circle on the paper is red."
            ]
         },
         {
            "id": 17,
            "word": "circle",
            "role": "verb",
            "BrE": "/ˈsɜːkl/",
            "AmE": "/ˈsɜːrkl/",
            "definition": "to move in a circle around something",
            "examples": [
               "Birds circle the sky.",
               "She circled the correct answer.",
               "The plane circled the airport."
            ]
         },
         {
            "id": 17,
            "word": "classical",
            "role": "adjective",
            "BrE": "/ˈklæsɪkl/",
            "AmE": "/ˈklæsɪkl/",
            "definition": "relating to traditional or serious music",
            "examples": [
               "I like classical music.",
               "She plays classical piano.",
               "The classical concert was amazing."
            ]
         },
         {
            "id": 17,
            "word": "clear",
            "role": "adjective",
            "BrE": "/klɪə(r)/",
            "AmE": "/klɪr/",
            "definition": "easy to see, hear, or understand",
            "examples": [
               "The water is clear.",
               "Her voice is clear.",
               "The instructions were very clear."
            ]
         },
         {
            "id": 17,
            "word": "clearly",
            "role": "adverb",
            "BrE": "/ˈklɪəli/",
            "AmE": "/ˈklɪrli/",
            "definition": "in a way that is easy to understand",
            "examples": [
               "Speak clearly, please.",
               "She explained it clearly.",
               "He clearly understood the task."
            ]
         },
         {
            "id": 17,
            "word": "clever",
            "role": "adjective",
            "BrE": "/ˈklevə(r)/",
            "AmE": "/ˈklevər/",
            "definition": "quick at learning or understanding things",
            "examples": [
               "She is a clever girl.",
               "His clever idea worked.",
               "The clever student solved the puzzle."
            ]
         },
         {
            "id": 17,
            "word": "climate",
            "role": "noun",
            "BrE": "/ˈklaɪmət/",
            "AmE": "/ˈklaɪmət/",
            "definition": "the typical weather conditions in an area",
            "examples": [
               "The climate is warm.",
               "She likes a sunny climate.",
               "The climate here is good for plants."
            ]
         },
         {
            "id": 17,
            "word": "close",
            "role": "adjective",
            "BrE": "/kləʊs/",
            "AmE": "/kloʊs/",
            "definition": "near in distance or time",
            "examples": [
               "The shop is close.",
               "She lives close to me.",
               "The close distance made it easy."
            ]
         },
         {
            "id": 17,
            "word": "closed",
            "role": "adjective",
            "BrE": "/kləʊzd/",
            "AmE": "/kloʊzd/",
            "definition": "not open",
            "examples": [
               "The door is closed.",
               "The shop is closed now.",
               "Her eyes were closed during sleep."
            ]
         },
         {
            "id": 17,
            "word": "comfortable",
            "role": "adjective",
            "BrE": "/ˈkʌmftəbl/",
            "AmE": "/ˈkʌmfərtəbl/",
            "definition": "feeling relaxed and at ease",
            "examples": [
               "The chair is comfortable.",
               "She felt comfortable in bed.",
               "This jacket is very comfortable."
            ]
         },
         {
            "id": 18,
            "word": "comment",
            "role": "noun",
            "BrE": "/ˈkɒment/",
            "AmE": "/ˈkɑːment/",
            "definition": "something you say or write giving an opinion",
            "examples": [
               "He made a comment.",
               "Her comment was helpful.",
               "The teacher’s comment was kind."
            ]
         },
         {
            "id": 18,
            "word": "communicate",
            "role": "verb",
            "BrE": "/kəˈmjuːnɪkeɪt/",
            "AmE": "/kəˈmjuːnɪkeɪt/",
            "definition": "to share information with others",
            "examples": [
               "We communicate daily.",
               "She communicates by email.",
               "He communicated his ideas clearly."
            ]
         },
         {
            "id": 18,
            "word": "community",
            "role": "noun",
            "BrE": "/kəˈmjuːnəti/",
            "AmE": "/kəˈmjuːnəti/",
            "definition": "a group of people living in the same area",
            "examples": [
               "Our community is small.",
               "She helps the community.",
               "The community built a park."
            ]
         },
         {
            "id": 18,
            "word": "compete",
            "role": "verb",
            "BrE": "/kəmˈpiːt/",
            "AmE": "/kəmˈpiːt/",
            "definition": "to try to win against others",
            "examples": [
               "I compete in races.",
               "She competed in the quiz.",
               "He competes in swimming events."
            ]
         },
         {
            "id": 18,
            "word": "competition",
            "role": "noun",
            "BrE": "/ˌkɒmpəˈtɪʃn/",
            "AmE": "/ˌkɑːmpəˈtɪʃn/",
            "definition": "an event where people try to win",
            "examples": [
               "The competition was fun.",
               "She won the competition.",
               "The competition had many players."
            ]
         },
         {
            "id": 18,
            "word": "complain",
            "role": "verb",
            "BrE": "/kəmˈpleɪn/",
            "AmE": "/kəmˈpleɪn/",
            "definition": "to say you are not happy about something",
            "examples": [
               "Don’t complain!",
               "She complained about the food.",
               "He complained to the manager."
            ]
         },
         {
            "id": 18,
            "word": "completely",
            "role": "adverb",
            "BrE": "/kəmˈpliːtli/",
            "AmE": "/kəmˈpliːtli/",
            "definition": "totally or in every way",
            "examples": [
               "I’m completely tired.",
               "She completely forgot the time.",
               "The room was completely dark."
            ]
         },
         {
            "id": 18,
            "word": "condition",
            "role": "noun",
            "BrE": "/kənˈdɪʃn/",
            "AmE": "/kənˈdɪʃn/",
            "definition": "the state something or someone is in",
            "examples": [
               "The car’s condition is good.",
               "Her health condition is better.",
               "The house is in bad condition."
            ]
         },
         {
            "id": 18,
            "word": "conference",
            "role": "noun",
            "BrE": "/ˈkɒnfərəns/",
            "AmE": "/ˈkɑːnfərəns/",
            "definition": "a large meeting for discussion",
            "examples": [
               "I attended a conference.",
               "She spoke at the conference.",
               "The conference was about science."
            ]
         },
         {
            "id": 18,
            "word": "connect",
            "role": "verb",
            "BrE": "/kəˈnekt/",
            "AmE": "/kəˈnekt/",
            "definition": "to join things together",
            "examples": [
               "Connect the wires.",
               "She connected the printer.",
               "He connected the phone to Wi-Fi."
            ]
         },
         {
            "id": 19,
            "word": "connected",
            "role": "adjective",
            "BrE": "/kəˈnektɪd/",
            "AmE": "/kəˈnektɪd/",
            "definition": "joined together or related",
            "examples": [
               "The rooms are connected.",
               "She is connected to the team.",
               "The cities are connected by train."
            ]
         },
         {
            "id": 19,
            "word": "consider",
            "role": "verb",
            "BrE": "/kənˈsɪdə(r)/",
            "AmE": "/kənˈsɪdər/",
            "definition": "to think carefully about something",
            "examples": [
               "I’ll consider it.",
               "She considered the offer.",
               "He considered moving to London."
            ]
         },
         {
            "id": 19,
            "word": "contain",
            "role": "verb",
            "BrE": "/kənˈteɪn/",
            "AmE": "/kənˈteɪn/",
            "definition": "to have something inside",
            "examples": [
               "The box contains toys.",
               "This drink contains sugar.",
               "The bag contains her books."
            ]
         },
         {
            "id": 19,
            "word": "context",
            "role": "noun",
            "BrE": "/ˈkɒntekst/",
            "AmE": "/ˈkɑːntekst/",
            "definition": "the situation in which something happens",
            "examples": [
               "The context is important.",
               "She explained the context.",
               "The context of the story was clear."
            ]
         },
         {
            "id": 19,
            "word": "continent",
            "role": "noun",
            "BrE": "/ˈkɒntɪnənt/",
            "AmE": "/ˈkɑːntɪnənt/",
            "definition": "a large land mass, like Europe or Asia",
            "examples": [
               "Africa is a continent.",
               "She visited another continent.",
               "The continent has many countries."
            ]
         },
         {
            "id": 19,
            "word": "continue",
            "role": "verb",
            "BrE": "/kənˈtɪnjuː/",
            "AmE": "/kənˈtɪnjuː/",
            "definition": "to keep doing something",
            "examples": [
               "Continue your work.",
               "She continued studying late.",
               "He continued to play after the rain."
            ]
         },
         {
            "id": 19,
            "word": "control",
            "role": "noun",
            "BrE": "/kənˈtrəʊl/",
            "AmE": "/kənˈtroʊl/",
            "definition": "the power to make decisions",
            "examples": [
               "She has control.",
               "He lost control of the car.",
               "The teacher has control of the class."
            ]
         },
         {
            "id": 19,
            "word": "control",
            "role": "verb",
            "BrE": "/kənˈtrəʊl/",
            "AmE": "/kənˈtroʊl/",
            "definition": "to have power over something",
            "examples": [
               "Control the dog.",
               "She controls her emotions.",
               "He controlled the meeting well."
            ]
         },
         {
            "id": 19,
            "word": "cook",
            "role": "noun",
            "BrE": "/kʊk/",
            "AmE": "/kʊk/",
            "definition": "a person who prepares food",
            "examples": [
               "The cook is busy.",
               "She is a great cook.",
               "The cook made a tasty meal."
            ]
         },
         {
            "id": 19,
            "word": "cooker",
            "role": "noun",
            "BrE": "/ˈkʊkə(r)/",
            "AmE": "/ˈkʊkər/",
            "definition": "a device used for cooking food",
            "examples": [
               "The cooker is new.",
               "She used the cooker for soup.",
               "The cooker broke yesterday."
            ]
         },
         {
            "id": 20,
            "word": "copy",
            "role": "noun",
            "BrE": "/ˈkɒpi/",
            "AmE": "/ˈkɑːpi/",
            "definition": "something made to be like another thing",
            "examples": [
               "I need a copy.",
               "She made a copy of the letter.",
               "The copy of the book is cheap."
            ]
         },
         {
            "id": 20,
            "word": "copy",
            "role": "verb",
            "BrE": "/ˈkɒpi/",
            "AmE": "/ˈkɑːpi/",
            "definition": "to make something exactly like another thing",
            "examples": [
               "Copy this picture.",
               "She copied the homework.",
               "He copied the design perfectly."
            ]
         },
         {
            "id": 20,
            "word": "corner",
            "role": "noun",
            "BrE": "/ˈkɔːnə(r)/",
            "AmE": "/ˈkɔːrnər/",
            "definition": "the point where two lines or surfaces meet",
            "examples": [
               "The shop is on the corner.",
               "She stood in the corner.",
               "The ball rolled to the corner."
            ]
         },
         {
            "id": 20,
            "word": "correctly",
            "role": "adverb",
            "BrE": "/kəˈrektli/",
            "AmE": "/kəˈrektli/",
            "definition": "in a way that is right",
            "examples": [
               "Answer correctly.",
               "She spelled it correctly.",
               "He correctly solved the puzzle."
            ]
         },
         {
            "id": 20,
            "word": "count",
            "role": "verb",
            "BrE": "/kaʊnt/",
            "AmE": "/kaʊnt/",
            "definition": "to calculate the number of something",
            "examples": [
               "Count the books.",
               "She counted her money.",
               "He counted the people in the room."
            ]
         },
         {
            "id": 20,
            "word": "couple",
            "role": "noun",
            "BrE": "/ˈkʌpl/",
            "AmE": "/ˈkʌpl/",
            "definition": "two people who are together",
            "examples": [
               "The couple is happy.",
               "A couple danced at the party.",
               "The couple bought a new house."
            ]
         },
         {
            "id": 20,
            "word": "cover",
            "role": "verb",
            "BrE": "/ˈkʌvə(r)/",
            "AmE": "/ˈkʌvər/",
            "definition": "to put something over another thing",
            "examples": [
               "Cover the food.",
               "She covered the book with paper.",
               "He covered his face with a scarf."
            ]
         },
         {
            "id": 20,
            "word": "crazy",
            "role": "adjective",
            "BrE": "/ˈkreɪzi/",
            "AmE": "/ˈkreɪzi/",
            "definition": "very strange or not sensible",
            "examples": [
               "That’s a crazy idea.",
               "She wore a crazy hat.",
               "His crazy plan actually worked."
            ]
         },
         {
            "id": 20,
            "word": "creative",
            "role": "adjective",
            "BrE": "/kriˈeɪtɪv/",
            "AmE": "/kriˈeɪtɪv/",
            "definition": "able to create new ideas or things",
            "examples": [
               "She is very creative.",
               "His creative story was fun.",
               "The creative design won a prize."
            ]
         },
         {
            "id": 20,
            "word": "credit",
            "role": "noun",
            "BrE": "/ˈkredɪt/",
            "AmE": "/ˈkredɪt/",
            "definition": "a way to buy now and pay later",
            "examples": [
               "I use credit to pay.",
               "She bought it on credit.",
               "The shop accepts credit cards."
            ]
         },
         {
            "id": 21,
            "word": "crime",
            "role": "noun",
            "BrE": "/kraɪm/",
            "AmE": "/kraɪm/",
            "definition": "an illegal act",
            "examples": [
               "Crime is bad.",
               "She reported a crime.",
               "The crime happened at night."
            ]
         },
         {
            "id": 21,
            "word": "criminal",
            "role": "noun",
            "BrE": "/ˈkrɪmɪnl/",
            "AmE": "/ˈkrɪmɪnl/",
            "definition": "a person who commits a crime",
            "examples": [
               "The criminal was caught.",
               "She saw the criminal run.",
               "The criminal stole her bag."
            ]
         },
         {
            "id": 21,
            "word": "cross",
            "role": "noun",
            "BrE": "/krɒs/",
            "AmE": "/krɔːs/",
            "definition": "a mark like an X or +",
            "examples": [
               "Mark a cross here.",
               "She drew a cross on the map.",
               "The cross shows the wrong answer."
            ]
         },
         {
            "id": 21,
            "word": "cross",
            "role": "verb",
            "BrE": "/krɒs/",
            "AmE": "/krɔːs/",
            "definition": "to go from one side to the other",
            "examples": [
               "Cross the road.",
               "She crossed the bridge.",
               "He crossed the river by boat."
            ]
         },
         {
            "id": 21,
            "word": "crowd",
            "role": "noun",
            "BrE": "/kraʊd/",
            "AmE": "/kraʊd/",
            "definition": "a large group of people",
            "examples": [
               "The crowd is big.",
               "She joined the crowd.",
               "The crowd cheered for the team."
            ]
         },
         {
            "id": 21,
            "word": "crowded",
            "role": "adjective",
            "BrE": "/ˈkraʊdɪd/",
            "AmE": "/ˈkraʊdɪd/",
            "definition": "full of people",
            "examples": [
               "The bus is crowded.",
               "The shop was crowded today.",
               "The crowded room was noisy."
            ]
         },
         {
            "id": 21,
            "word": "cry",
            "role": "verb",
            "BrE": "/kraɪ/",
            "AmE": "/kraɪ/",
            "definition": "to produce tears when sad or hurt",
            "examples": [
               "The baby cries.",
               "She cried during the film.",
               "He cried when he heard the news."
            ]
         },
         {
            "id": 21,
            "word": "cupboard",
            "role": "noun",
            "BrE": "/ˈkʌbəd/",
            "AmE": "/ˈkʌbərd/",
            "definition": "a piece of furniture for storage",
            "examples": [
               "The cupboard is full.",
               "She opened the cupboard.",
               "The cupboard holds all the plates."
            ]
         },
         {
            "id": 21,
            "word": "curly",
            "role": "adjective",
            "BrE": "/ˈkɜːli/",
            "AmE": "/ˈkɜːrli/",
            "definition": "having curls or waves",
            "examples": [
               "Her hair is curly.",
               "He likes her curly hair.",
               "The curly ribbon looked nice."
            ]
         },
         {
            "id": 21,
            "word": "cycle",
            "role": "noun",
            "BrE": "/ˈsaɪkl/",
            "AmE": "/ˈsaɪkl/",
            "definition": "a bicycle",
            "examples": [
               "I have a cycle.",
               "She rides her cycle to school.",
               "The cycle has a new tire."
            ]
         },
         {
            "id": 22,
            "word": "cycle",
            "role": "verb",
            "BrE": "/ˈsaɪkl/",
            "AmE": "/ˈsaɪkl/",
            "definition": "to ride a bicycle",
            "examples": [
               "I cycle to work.",
               "She cycles every morning.",
               "He cycled across the park."
            ]
         },
         {
            "id": 22,
            "word": "daily",
            "role": "adjective",
            "BrE": "/ˈdeɪli/",
            "AmE": "/ˈdeɪli/",
            "definition": "happening every day",
            "examples": [
               "I read the daily news.",
               "She has a daily routine.",
               "Daily exercise is good for you."
            ]
         },
         {
            "id": 22,
            "word": "danger",
            "role": "noun",
            "BrE": "/ˈdeɪndʒə(r)/",
            "AmE": "/ˈdeɪndʒər/",
            "definition": "the possibility of harm",
            "examples": [
               "There’s danger here.",
               "The danger was the storm.",
               "He escaped the danger quickly."
            ]
         },
         {
            "id": 22,
            "word": "dark",
            "role": "noun",
            "BrE": "/dɑːk/",
            "AmE": "/dɑːrk/",
            "definition": "the absence of light",
            "examples": [
               "I’m scared of the dark.",
               "The dark made it hard to see.",
               "She waited until the dark was gone."
            ]
         },
         {
            "id": 22,
            "word": "data",
            "role": "noun",
            "BrE": "/ˈdeɪtə/",
            "AmE": "/ˈdeɪtə/",
            "definition": "facts or information",
            "examples": [
               "We need data.",
               "She collects data for school.",
               "The data shows the results."
            ]
         },
         {
            "id": 22,
            "word": "dead",
            "role": "adjective",
            "BrE": "/ded/",
            "AmE": "/ded/",
            "definition": "no longer alive",
            "examples": [
               "The plant is dead.",
               "She found a dead bird.",
               "The dead tree fell over."
            ]
         },
         {
            "id": 22,
            "word": "deal",
            "role": "verb",
            "BrE": "/diːl/",
            "AmE": "/diːl/",
            "definition": "to give out or handle something",
            "examples": [
               "Deal the cards.",
               "She dealt with the problem.",
               "He deals with customers daily."
            ]
         },
         {
            "id": 22,
            "word": "dear",
            "role": "exclamation",
            "BrE": "/dɪə(r)/",
            "AmE": "/dɪr/",
            "definition": "used to express surprise or worry",
            "examples": [
               "Dear, it’s late!",
               "Oh dear, I forgot my keys!",
               "Dear, what happened to your shirt?"
            ]
         },
         {
            "id": 22,
            "word": "death",
            "role": "noun",
            "BrE": "/deθ/",
            "AmE": "/deθ/",
            "definition": "the end of life",
            "examples": [
               "Death is sad.",
               "The death was unexpected.",
               "Her death shocked the town."
            ]
         },
         {
            "id": 22,
            "word": "decision",
            "role": "noun",
            "BrE": "/dɪˈsɪʒn/",
            "AmE": "/dɪˈsɪʒn/",
            "definition": "a choice made after thinking",
            "examples": [
               "I made a decision.",
               "Her decision was to stay.",
               "The decision to move was hard."
            ]
         },
         {
            "id": 23,
            "word": "deep",
            "role": "adjective",
            "BrE": "/diːp/",
            "AmE": "/diːp/",
            "definition": "going far down from the surface",
            "examples": [
               "The water is deep.",
               "She took a deep breath.",
               "The deep pool was cold."
            ]
         },
         {
            "id": 23,
            "word": "definitely",
            "role": "adverb",
            "BrE": "/ˈdefɪnətli/",
            "AmE": "/ˈdefɪnətli/",
            "definition": "without any doubt",
            "examples": [
               "I’ll definitely come.",
               "She definitely knows the answer.",
               "He definitely won the game."
            ]
         },
         {
            "id": 23,
            "word": "degree",
            "role": "noun",
            "BrE": "/dɪˈɡriː/",
            "AmE": "/dɪˈɡriː/",
            "definition": "a qualification from a university",
            "examples": [
               "She has a degree.",
               "He earned a degree in science.",
               "Her degree helped her get a job."
            ]
         },
         {
            "id": 23,
            "word": "dentist",
            "role": "noun",
            "BrE": "/ˈdentɪst/",
            "AmE": "/ˈdentɪst/",
            "definition": "a person who treats teeth",
            "examples": [
               "I visit the dentist.",
               "The dentist checked my teeth.",
               "She went to the dentist today."
            ]
         },
         {
            "id": 23,
            "word": "department",
            "role": "noun",
            "BrE": "/dɪˈpɑːtmənt/",
            "AmE": "/dɪˈpɑːrtmənt/",
            "definition": "a section of an organization",
            "examples": [
               "I work in the department.",
               "She leads the sales department.",
               "The department handles complaints."
            ]
         },
         {
            "id": 23,
            "word": "depend",
            "role": "verb",
            "BrE": "/dɪˈpend/",
            "AmE": "/dɪˈpend/",
            "definition": "to rely on someone or something",
            "examples": [
               "I depend on you.",
               "She depends on her phone.",
               "He depends on his parents for money."
            ]
         },
         {
            "id": 23,
            "word": "desert",
            "role": "noun",
            "BrE": "/ˈdezət/",
            "AmE": "/ˈdezərt/",
            "definition": "a large area with little rain",
            "examples": [
               "The desert is hot.",
               "She crossed the desert.",
               "The desert has little water."
            ]
         },
         {
            "id": 23,
            "word": "designer",
            "role": "noun",
            "BrE": "/dɪˈzaɪnə(r)/",
            "AmE": "/dɪˈzaɪnər/",
            "definition": "a person who creates plans for things",
            "examples": [
               "He’s a designer.",
               "She’s a fashion designer.",
               "The designer made a new dress."
            ]
         },
         {
            "id": 23,
            "word": "destroy",
            "role": "verb",
            "BrE": "/dɪˈstrɔɪ/",
            "AmE": "/dɪˈstrɔɪ/",
            "definition": "to damage something completely",
            "examples": [
               "Fire destroyed the house.",
               "She destroyed the old photo.",
               "The storm destroyed the garden."
            ]
         },
         {
            "id": 23,
            "word": "detective",
            "role": "noun",
            "BrE": "/dɪˈtektɪv/",
            "AmE": "/dɪˈtektɪv/",
            "definition": "a person who investigates crimes",
            "examples": [
               "The detective is smart.",
               "She’s a famous detective.",
               "The detective solved the case."
            ]
         },
         {
            "id": 24,
            "word": "develop",
            "role": "verb",
            "BrE": "/dɪˈveləp/",
            "AmE": "/dɪˈveləp/",
            "definition": "to grow or improve",
            "examples": [
               "The town will develop.",
               "She developed her skills.",
               "He developed a new app."
            ]
         },
         {
            "id": 24,
            "word": "device",
            "role": "noun",
            "BrE": "/dɪˈvaɪs/",
            "AmE": "/dɪˈvaɪs/",
            "definition": "a tool or piece of equipment",
            "examples": [
               "This device is new.",
               "She uses a device to count steps.",
               "The device helps with cooking."
            ]
         },
         {
            "id": 24,
            "word": "diary",
            "role": "noun",
            "BrE": "/ˈdaɪəri/",
            "AmE": "/ˈdaɪəri/",
            "definition": "a book for recording daily events",
            "examples": [
               "I write in my diary.",
               "She keeps a daily diary.",
               "Her diary is full of stories."
            ]
         },
         {
            "id": 24,
            "word": "differently",
            "role": "adverb",
            "BrE": "/ˈdɪfrəntli/",
            "AmE": "/ˈdɪfrəntli/",
            "definition": "in a way that is not the same",
            "examples": [
               "She thinks differently.",
               "He acts differently now.",
               "They solved it differently."
            ]
         },
         {
            "id": 24,
            "word": "digital",
            "role": "adjective",
            "BrE": "/ˈdɪdʒɪtl/",
            "AmE": "/ˈdɪdʒɪtl/",
            "definition": "using electronic signals",
            "examples": [
               "I have a digital watch.",
               "She uses a digital camera.",
               "The digital clock is accurate."
            ]
         },
         {
            "id": 24,
            "word": "direct",
            "role": "adjective",
            "BrE": "/dəˈrekt/",
            "AmE": "/dəˈrekt/",
            "definition": "going straight to a place",
            "examples": [
               "Take the direct route.",
               "She took a direct flight.",
               "The direct path is shorter."
            ]
         },
         {
            "id": 24,
            "word": "direction",
            "role": "noun",
            "BrE": "/dəˈrekʃn/",
            "AmE": "/dəˈrekʃn/",
            "definition": "the way something or someone moves",
            "examples": [
               "Which direction is it?",
               "She walked in that direction.",
               "The direction of the wind changed."
            ]
         },
         {
            "id": 24,
            "word": "director",
            "role": "noun",
            "BrE": "/dəˈrektə(r)/",
            "AmE": "/dəˈrektər/",
            "definition": "a person who manages or directs",
            "examples": [
               "He’s the director.",
               "She’s a film director.",
               "The director led the meeting."
            ]
         },
         {
            "id": 24,
            "word": "disagree",
            "role": "verb",
            "BrE": "/ˌdɪsəˈɡriː/",
            "AmE": "/ˌdɪsəˈɡriː/",
            "definition": "to have a different opinion",
            "examples": [
               "I disagree with you.",
               "She disagrees with her boss.",
               "They disagreed about the plan."
            ]
         },
         {
            "id": 24,
            "word": "disappear",
            "role": "verb",
            "BrE": "/ˌdɪsəˈpɪə(r)/",
            "AmE": "/ˌdɪsəˈpɪr/",
            "definition": "to become impossible to see or find",
            "examples": [
               "The cat disappeared.",
               "Her keys disappeared again.",
               "The sun disappeared behind clouds."
            ]
         },
         {
            "id": 25,
            "word": "disaster",
            "role": "noun",
            "BrE": "/dɪˈzɑːstə(r)/",
            "AmE": "/dɪˈzæstər/",
            "definition": "a sudden event causing great damage",
            "examples": [
               "The flood was a disaster.",
               "She described the fire as a disaster.",
               "The disaster destroyed the village."
            ]
         },
         {
            "id": 25,
            "word": "discover",
            "role": "verb",
            "BrE": "/dɪˈskʌvə(r)/",
            "AmE": "/dɪˈskʌvər/",
            "definition": "to find something for the first time",
            "examples": [
               "I discovered a book.",
               "She discovered a new park.",
               "He discovered an old letter."
            ]
         },
         {
            "id": 25,
            "word": "discovery",
            "role": "noun",
            "BrE": "/dɪˈskʌvəri/",
            "AmE": "/dɪˈskʌvəri/",
            "definition": "the act of finding something new",
            "examples": [
               "It’s a great discovery.",
               "Her discovery was a treasure.",
               "The discovery changed science."
            ]
         },
         {
            "id": 25,
            "word": "discussion",
            "role": "noun",
            "BrE": "/dɪˈskʌʃn/",
            "AmE": "/dɪˈskʌʃn/",
            "definition": "a conversation about something",
            "examples": [
               "We had a discussion.",
               "The discussion was about school.",
               "Their discussion lasted an hour."
            ]
         },
         {
            "id": 25,
            "word": "disease",
            "role": "noun",
            "BrE": "/dɪˈziːz/",
            "AmE": "/dɪˈziːz/",
            "definition": "an illness caused by infection or poor health",
            "examples": [
               "The disease is serious.",
               "She caught a disease abroad.",
               "The disease spread quickly."
            ]
         },
         {
            "id": 25,
            "word": "distance",
            "role": "noun",
            "BrE": "/ˈdɪstəns/",
            "AmE": "/ˈdɪstəns/",
            "definition": "the amount of space between two places",
            "examples": [
               "The distance is short.",
               "She ran a long distance.",
               "The distance to the city is 10 miles."
            ]
         },
         {
            "id": 25,
            "word": "divorced",
            "role": "adjective",
            "BrE": "/dɪˈvɔːst/",
            "AmE": "/dɪˈvɔːrst/",
            "definition": "no longer married",
            "examples": [
               "He is divorced.",
               "Her parents are divorced.",
               "The divorced couple remained friends."
            ]
         },
         {
            "id": 25,
            "word": "document",
            "role": "noun",
            "BrE": "/ˈdɒkjumənt/",
            "AmE": "/ˈdɑːkjumənt/",
            "definition": "an official paper or record",
            "examples": [
               "I need a document.",
               "She signed the document.",
               "The document proves ownership."
            ]
         },
         {
            "id": 25,
            "word": "double",
            "role": "adjective",
            "BrE": "/ˈdʌbl/",
            "AmE": "/ˈdʌbl/",
            "definition": "twice as much or as many",
            "examples": [
               "I want a double coffee.",
               "She has a double room.",
               "The double portion was too much."
            ]
         },
         {
            "id": 25,
            "word": "double",
            "role": "determiner",
            "BrE": "/ˈdʌbl/",
            "AmE": "/ˈdʌbl/",
            "definition": "twice the amount",
            "examples": [
               "Double the money.",
               "She ate double the cake.",
               "He paid double the price."
            ]
         },
         {
            "id": 26,
            "word": "double",
            "role": "pronoun",
            "BrE": "/ˈdʌbl/",
            "AmE": "/ˈdʌbl/",
            "definition": "twice as much",
            "examples": [
               "Double is enough.",
               "She took double of it.",
               "Double the amount was needed."
            ]
         },
         {
            "id": 26,
            "word": "double",
            "role": "verb",
            "BrE": "/ˈdʌbl/",
            "AmE": "/ˈdʌbl/",
            "definition": "to make something twice as big",
            "examples": [
               "Double the recipe.",
               "She doubled her score.",
               "He doubled his efforts."
            ]
         },
         {
            "id": 26,
            "word": "download",
            "role": "noun",
            "BrE": "/ˈdaʊnləʊd/",
            "AmE": "/ˈdaʊnloʊd/",
            "definition": "a file transferred from the internet",
            "examples": [
               "I got a download.",
               "She saved the download.",
               "The download took ten minutes."
            ]
         },
         {
            "id": 26,
            "word": "download",
            "role": "verb",
            "BrE": "/ˈdaʊnləʊd/",
            "AmE": "/ˈdaʊnloʊd/",
            "definition": "to transfer a file from the internet",
            "examples": [
               "Download this song.",
               "She downloaded an app.",
               "He downloaded a new game."
            ]
         },
         {
            "id": 26,
            "word": "downstairs",
            "role": "adjective",
            "BrE": "/ˌdaʊnˈsteəz/",
            "AmE": "/ˌdaʊnˈsterz/",
            "definition": "on a lower floor",
            "examples": [
               "The downstairs room is big.",
               "She left her bag downstairs.",
               "The downstairs kitchen is clean."
            ]
         },
         {
            "id": 26,
            "word": "drama",
            "role": "noun",
            "BrE": "/ˈdrɑːmə/",
            "AmE": "/ˈdræmə/",
            "definition": "a play or serious story",
            "examples": [
               "I like drama.",
               "She watched a drama on TV.",
               "The drama was about a family."
            ]
         },
         {
            "id": 26,
            "word": "drawing",
            "role": "noun",
            "BrE": "/ˈdrɔːɪŋ/",
            "AmE": "/ˈdrɔːɪŋ/",
            "definition": "a picture made with a pencil or pen",
            "examples": [
               "Her drawing is nice.",
               "He made a drawing of a tree.",
               "The drawing won a prize."
            ]
         },
         {
            "id": 26,
            "word": "dream",
            "role": "noun",
            "BrE": "/driːm/",
            "AmE": "/driːm/",
            "definition": "thoughts or images during sleep",
            "examples": [
               "I had a dream.",
               "Her dream was strange.",
               "The dream felt very real."
            ]
         },
         {
            "id": 26,
            "word": "dream",
            "role": "verb",
            "BrE": "/driːm/",
            "AmE": "/driːm/",
            "definition": "to see images or thoughts while sleeping",
            "examples": [
               "I dream at night.",
               "She dreamt of flying.",
               "He dreamt about his old home."
            ]
         },
         {
            "id": 26,
            "word": "drive",
            "role": "noun",
            "BrE": "/draɪv/",
            "AmE": "/draɪv/",
            "definition": "a trip in a car",
            "examples": [
               "Let’s go for a drive.",
               "She enjoyed the long drive.",
               "The drive to the beach was fun."
            ]
         },
         {
            "id": 27,
            "word": "driving",
            "role": "noun",
            "BrE": "/ˈdraɪvɪŋ/",
            "AmE": "/ˈdraɪvɪŋ/",
            "definition": "the act of operating a vehicle",
            "examples": [
               "Driving is fun.",
               "She passed her driving test.",
               "Driving in the rain is hard."
            ]
         },
         {
            "id": 27,
            "word": "drop",
            "role": "verb",
            "BrE": "/drɒp/",
            "AmE": "/drɑːp/",
            "definition": "to let something fall",
            "examples": [
               "Don’t drop the glass.",
               "She dropped her book.",
               "He dropped his phone on the floor."
            ]
         },
         {
            "id": 27,
            "word": "drug",
            "role": "noun",
            "BrE": "/drʌɡ/",
            "AmE": "/drʌɡ/",
            "definition": "a medicine or illegal substance",
            "examples": [
               "I need a drug.",
               "The drug helped her pain.",
               "Some drugs are dangerous."
            ]
         },
         {
            "id": 27,
            "word": "dry",
            "role": "adjective",
            "BrE": "/draɪ/",
            "AmE": "/draɪ/",
            "definition": "having no water or liquid",
            "examples": [
               "The towel is dry.",
               "Her clothes are dry now.",
               "The dry desert has no rain."
            ]
         },
         {
            "id": 27,
            "word": "dry",
            "role": "verb",
            "BrE": "/draɪ/",
            "AmE": "/draɪ/",
            "definition": "to remove water or liquid",
            "examples": [
               "Dry your hands.",
               "She dried the dishes.",
               "He dried his hair with a towel."
            ]
         },
         {
            "id": 27,
            "word": "earn",
            "role": "verb",
            "BrE": "/ɜːn/",
            "AmE": "/ɜːrn/",
            "definition": "to get money for work",
            "examples": [
               "I earn money.",
               "She earns a good salary.",
               "He earned extra cash last week."
            ]
         },
         {
            "id": 27,
            "word": "earth",
            "role": "noun",
            "BrE": "/ɜːθ/",
            "AmE": "/ɜːrθ/",
            "definition": "the planet we live on",
            "examples": [
               "The earth is big.",
               "She studies the earth.",
               "The earth orbits the sun."
            ]
         },
         {
            "id": 27,
            "word": "easily",
            "role": "adverb",
            "BrE": "/ˈiːzɪli/",
            "AmE": "/ˈiːzɪli/",
            "definition": "without difficulty",
            "examples": [
               "I can do it easily.",
               "She learns languages easily.",
               "He easily won the race."
            ]
         },
         {
            "id": 27,
            "word": "education",
            "role": "noun",
            "BrE": "/ˌedʒuˈkeɪʃn/",
            "AmE": "/ˌedʒuˈkeɪʃn/",
            "definition": "the process of teaching and learning",
            "examples": [
               "Education is important.",
               "She got a good education.",
               "His education helped his career."
            ]
         },
         {
            "id": 27,
            "word": "effect",
            "role": "noun",
            "BrE": "/ɪˈfekt/",
            "AmE": "/ɪˈfekt/",
            "definition": "the result of something",
            "examples": [
               "The effect was good.",
               "The medicine had an effect.",
               "Her words had a big effect."
            ]
         },
         {
            "id": 28,
            "word": "either",
            "role": "adverb",
            "BrE": "/ˈaɪðə(r)/",
            "AmE": "/ˈiːðər/",
            "definition": "used after a negative to mean both",
            "examples": [
               "I don’t like either.",
               "She didn’t choose either option.",
               "He didn’t call either of us."
            ]
         },
         {
            "id": 28,
            "word": "either",
            "role": "determiner",
            "BrE": "/ˈaɪðə(r)/",
            "AmE": "/ˈiːðər/",
            "definition": "one or the other of two",
            "examples": [
               "Either book is fine.",
               "Choose either one.",
               "Either path leads to the park."
            ]
         },
         {
            "id": 28,
            "word": "either",
            "role": "pronoun",
            "BrE": "/ˈaɪðə(r)/",
            "AmE": "/ˈiːðər/",
            "definition": "one or the other",
            "examples": [
               "Either is okay.",
               "She can take either.",
               "Either of them can help."
            ]
         },
         {
            "id": 28,
            "word": "electric",
            "role": "adjective",
            "BrE": "/ɪˈlektrɪk/",
            "AmE": "/ɪˈlektrɪk/",
            "definition": "using or producing electricity",
            "examples": [
               "It’s an electric car.",
               "She bought an electric fan.",
               "The electric light is bright."
            ]
         },
         {
            "id": 28,
            "word": "electrical",
            "role": "adjective",
            "BrE": "/ɪˈlektrɪkl/",
            "AmE": "/ɪˈlektrɪkl/",
            "definition": "related to electricity",
            "examples": [
               "The electrical system failed.",
               "She fixed the electrical wire.",
               "The electrical fault was repaired."
            ]
         },
         {
            "id": 28,
            "word": "electricity",
            "role": "noun",
            "BrE": "/ɪˌlekˈtrɪsəti/",
            "AmE": "/ɪˌlekˈtrɪsəti/",
            "definition": "a form of energy used for power",
            "examples": [
               "We need electricity.",
               "The electricity went out.",
               "Electricity powers the house."
            ]
         },
         {
            "id": 28,
            "word": "electronic",
            "role": "adjective",
            "BrE": "/ɪˌlekˈtrɒnɪk/",
            "AmE": "/ɪˌlekˈtrɑːnɪk/",
            "definition": "using electronic technology",
            "examples": [
               "It’s an electronic device.",
               "She uses an electronic book.",
               "The electronic game is fun."
            ]
         },
         {
            "id": 28,
            "word": "employ",
            "role": "verb",
            "BrE": "/ɪmˈplɔɪ/",
            "AmE": "/ɪmˈplɔɪ/",
            "definition": "to give work to someone",
            "examples": [
               "They employ me.",
               "She was employed as a teacher.",
               "The company employs many people."
            ]
         },
         {
            "id": 28,
            "word": "employee",
            "role": "noun",
            "BrE": "/ɪmˈplɔɪiː/",
            "AmE": "/ɪmˈplɔɪiː/",
            "definition": "a person who works for someone",
            "examples": [
               "I’m an employee.",
               "She’s a new employee.",
               "The employee works in sales."
            ]
         },
         {
            "id": 28,
            "word": "employer",
            "role": "noun",
            "BrE": "/ɪmˈplɔɪə(r)/",
            "AmE": "/ɪmˈplɔɪər/",
            "definition": "a person or company that employs people",
            "examples": [
               "My employer is nice.",
               "Her employer gave a bonus.",
               "The employer hired new staff."
            ]
         },
         {
            "id": 29,
            "word": "empty",
            "role": "adjective",
            "BrE": "/ˈempti/",
            "AmE": "/ˈempti/",
            "definition": "having nothing inside",
            "examples": [
               "The box is empty.",
               "Her glass was empty.",
               "The empty room felt cold."
            ]
         },
         {
            "id": 29,
            "word": "ending",
            "role": "noun",
            "BrE": "/ˈendɪŋ/",
            "AmE": "/ˈendɪŋ/",
            "definition": "the way something finishes",
            "examples": [
               "The film’s ending was sad.",
               "She liked the book’s ending.",
               "The ending of the story was happy."
            ]
         },
         {
            "id": 29,
            "word": "energy",
            "role": "noun",
            "BrE": "/ˈenədʒi/",
            "AmE": "/ˈenərdʒi/",
            "definition": "the ability to do work or be active",
            "examples": [
               "I have no energy.",
               "She’s full of energy today.",
               "The energy in the room was high."
            ]
         },
         {
            "id": 29,
            "word": "engine",
            "role": "noun",
            "BrE": "/ˈendʒɪn/",
            "AmE": "/ˈendʒɪn/",
            "definition": "a machine that powers something",
            "examples": [
               "The car’s engine is loud.",
               "She fixed the engine.",
               "The engine stopped working."
            ]
         },
         {
            "id": 29,
            "word": "engineer",
            "role": "noun",
            "BrE": "/ˌendʒɪˈnɪə(r)/",
            "AmE": "/ˌendʒɪˈnɪr/",
            "definition": "a person who designs or builds machines",
            "examples": [
               "He’s an engineer.",
               "She’s a skilled engineer.",
               "The engineer built a bridge."
            ]
         },
         {
            "id": 29,
            "word": "enormous",
            "role": "adjective",
            "BrE": "/ɪˈnɔːməs/",
            "AmE": "/ɪˈnɔːrməs/",
            "definition": "extremely large",
            "examples": [
               "The house is enormous.",
               "She saw an enormous dog.",
               "The enormous tree fell over."
            ]
         },
         {
            "id": 29,
            "word": "enter",
            "role": "verb",
            "BrE": "/ˈentə(r)/",
            "AmE": "/ˈentər/",
            "definition": "to go or come into a place",
            "examples": [
               "Enter the room.",
               "She entered the building.",
               "He entered the shop quietly."
            ]
         },
         {
            "id": 29,
            "word": "environment",
            "role": "noun",
            "BrE": "/ɪnˈvaɪrənmənt/",
            "AmE": "/ɪnˈvaɪrənmənt/",
            "definition": "the natural world around us",
            "examples": [
               "Protect the environment.",
               "She cares about the environment.",
               "The environment needs clean air."
            ]
         },
         {
            "id": 29,
            "word": "equipment",
            "role": "noun",
            "BrE": "/ɪˈkwɪpmənt/",
            "AmE": "/ɪˈkwɪpmənt/",
            "definition": "things needed for an activity",
            "examples": [
               "We need equipment.",
               "She bought sports equipment.",
               "The equipment for camping is ready."
            ]
         },
         {
            "id": 29,
            "word": "error",
            "role": "noun",
            "BrE": "/ˈerə(r)/",
            "AmE": "/ˈerər/",
            "definition": "a mistake",
            "examples": [
               "I made an error.",
               "She found an error in the book.",
               "The error caused a delay."
            ]
         },
         {
            "id": 30,
            "word": "especially",
            "role": "adverb",
            "BrE": "/ɪˈspeʃəli/",
            "AmE": "/ɪˈspeʃəli/",
            "definition": "more than usual or more than others",
            "examples": [
               "I like it, especially today.",
               "She loves dogs, especially small ones.",
               "He’s tired, especially after work."
            ]
         },
         {
            "id": 30,
            "word": "essay",
            "role": "noun",
            "BrE": "/ˈeseɪ/",
            "AmE": "/ˈeseɪ/",
            "definition": "a short piece of writing on a topic",
            "examples": [
               "I wrote an essay.",
               "Her essay was very good.",
               "The essay was about history."
            ]
         },
         {
            "id": 30,
            "word": "everyday",
            "role": "adjective",
            "BrE": "/ˈevrideɪ/",
            "AmE": "/ˈevrideɪ/",
            "definition": "normal or happening every day",
            "examples": [
               "It’s an everyday task.",
               "She wears everyday clothes.",
               "Everyday life can be boring."
            ]
         },
         {
            "id": 30,
            "word": "everywhere",
            "role": "adverb",
            "BrE": "/ˈevriweə(r)/",
            "AmE": "/ˈevriwer/",
            "definition": "in all places",
            "examples": [
               "Books are everywhere.",
               "She looked everywhere for her keys.",
               "Flowers grow everywhere in spring."
            ]
         },
         {
            "id": 30,
            "word": "evidence",
            "role": "noun",
            "BrE": "/ˈevɪdəns/",
            "AmE": "/ˈevɪdəns/",
            "definition": "facts that show something is true",
            "examples": [
               "We need evidence.",
               "She found evidence of a crime.",
               "The evidence proved he was right."
            ]
         },
         {
            "id": 30,
            "word": "exact",
            "role": "adjective",
            "BrE": "/ɪɡˈzækt/",
            "AmE": "/ɪɡˈzækt/",
            "definition": "completely correct",
            "examples": [
               "The exact time is 3 PM.",
               "She gave the exact answer.",
               "His exact words were clear."
            ]
         },
         {
            "id": 30,
            "word": "exactly",
            "role": "adverb",
            "BrE": "/ɪɡˈzæktli/",
            "AmE": "/ɪɡˈzæktli/",
            "definition": "in a completely correct way",
            "examples": [
               "Do it exactly like this.",
               "She followed the rules exactly.",
               "He explained it exactly right."
            ]
         },
         {
            "id": 30,
            "word": "excellent",
            "role": "adjective",
            "BrE": "/ˈeksələnt/",
            "AmE": "/ˈeksələnt/",
            "definition": "extremely good",
            "examples": [
               "The food is excellent.",
               "She did an excellent job.",
               "His excellent work was praised."
            ]
         },
         {
            "id": 30,
            "word": "except",
            "role": "preposition",
            "BrE": "/ɪkˈsept/",
            "AmE": "/ɪkˈsept/",
            "definition": "not including",
            "examples": [
               "All came except him.",
               "Everyone except her agreed.",
               "The shop is open except Sundays."
            ]
         },
         {
            "id": 30,
            "word": "exist",
            "role": "verb",
            "BrE": "/ɪɡˈzɪst/",
            "AmE": "/ɪɡˈzɪst/",
            "definition": "to be real or alive",
            "examples": [
               "Ghosts don’t exist.",
               "This plant exists in Asia.",
               "The problem still exists."
            ]
         },
         {
            "id": 31,
            "word": "expensive",
            "role": "adjective",
            "BrE": "/ɪkˈspensɪv/",
            "AmE": "/ɪkˈspensɪv/",
            "definition": "costing a lot of money",
            "examples": [
               "This bag is expensive.",
               "She bought an expensive dress.",
               "The expensive car broke down."
            ]
         },
         {
            "id": 31,
            "word": "experience",
            "role": "noun",
            "BrE": "/ɪkˈspɪəriəns/",
            "AmE": "/ɪkˈspɪriəns/",
            "definition": "something that happens to you",
            "examples": [
               "It was a good experience.",
               "She shared her travel experience.",
               "The experience taught him a lot."
            ]
         },
         {
            "id": 31,
            "word": "experiment",
            "role": "noun",
            "BrE": "/ɪkˈsperɪmənt/",
            "AmE": "/ɪkˈsperɪmənt/",
            "definition": "a scientific test to learn something",
            "examples": [
               "We did an experiment.",
               "The experiment was in class.",
               "Her experiment showed new results."
            ]
         },
         {
            "id": 31,
            "word": "explain",
            "role": "verb",
            "BrE": "/ɪkˈspleɪn/",
            "AmE": "/ɪkˈspleɪn/",
            "definition": "to make something clear or understandable",
            "examples": [
               "Explain the rule.",
               "She explained the game to us.",
               "He explained his idea carefully."
            ]
         },
         {
            "id": 31,
            "word": "explanation",
            "role": "noun",
            "BrE": "/ˌekspləˈneɪʃn/",
            "AmE": "/ˌekspləˈneɪʃn/",
            "definition": "a statement that makes something clear",
            "examples": [
               "I need an explanation.",
               "Her explanation was simple.",
               "The explanation helped us understand."
            ]
         },
         {
            "id": 31,
            "word": "express",
            "role": "verb",
            "BrE": "/ɪkˈspres/",
            "AmE": "/ɪkˈspres/",
            "definition": "to show a feeling or opinion",
            "examples": [
               "Express your thoughts.",
               "She expressed her happiness.",
               "He expressed concern about the plan."
            ]
         },
         {
            "id": 31,
            "word": "extra",
            "role": "adjective",
            "BrE": "/ˈekstrə/",
            "AmE": "/ˈekstrə/",
            "definition": "more than what is usual",
            "examples": [
               "I need extra time.",
               "She bought extra food.",
               "He carried an extra bag."
            ]
         },
         {
            "id": 31,
            "word": "extreme",
            "role": "adjective",
            "BrE": "/ɪkˈstriːm/",
            "AmE": "/ɪkˈstriːm/",
            "definition": "very great in degree",
            "examples": [
               "The weather is extreme.",
               "She loves extreme sports.",
               "The extreme cold stopped the game."
            ]
         },
         {
            "id": 31,
            "word": "extremely",
            "role": "adverb",
            "BrE": "/ɪkˈstriːmli/",
            "AmE": "/ɪkˈstriːmli/",
            "definition": "to a very great degree",
            "examples": [
               "It’s extremely hot.",
               "She was extremely tired.",
               "He worked extremely hard."
            ]
         },
         {
            "id": 31,
            "word": "fact",
            "role": "noun",
            "BrE": "/fækt/",
            "AmE": "/fækt/",
            "definition": "something known to be true",
            "examples": [
               "It’s a fact.",
               "She told me a fact.",
               "The fact about stars is interesting."
            ]
         },
         {
            "id": 32,
            "word": "fail",
            "role": "verb",
            "BrE": "/feɪl/",
            "AmE": "/feɪl/",
            "definition": "to not succeed",
            "examples": [
               "I failed the test.",
               "She failed to arrive on time.",
               "He failed in his first attempt."
            ]
         },
         {
            "id": 32,
            "word": "famous",
            "role": "adjective",
            "BrE": "/ˈfeɪməs/",
            "AmE": "/ˈfeɪməs/",
            "definition": "known by many people",
            "examples": [
               "He’s a famous singer.",
               "She visited a famous city.",
               "The famous actor signed my book."
            ]
         },
         {
            "id": 32,
            "word": "far",
            "role": "adverb",
            "BrE": "/fɑː(r)/",
            "AmE": "/fɑːr/",
            "definition": "at or to a great distance",
            "examples": [
               "I live far away.",
               "She walked far from home.",
               "He didn’t go far yesterday."
            ]
         },
         {
            "id": 32,
            "word": "fashion",
            "role": "noun",
            "BrE": "/ˈfæʃn/",
            "AmE": "/ˈfæʃn/",
            "definition": "a popular style of clothes",
            "examples": [
               "Fashion changes fast.",
               "She loves fashion magazines.",
               "The fashion show was exciting."
            ]
         },
         {
            "id": 32,
            "word": "fault",
            "role": "noun",
            "BrE": "/fɔːlt/",
            "AmE": "/fɔːlt/",
            "definition": "a mistake or something wrong",
            "examples": [
               "It’s my fault.",
               "The fault was in the machine.",
               "She found a fault in the plan."
            ]
         },
         {
            "id": 32,
            "word": "fear",
            "role": "noun",
            "BrE": "/fɪə(r)/",
            "AmE": "/fɪr/",
            "definition": "a feeling of being afraid",
            "examples": [
               "I have a fear.",
               "Her fear was of spiders.",
               "The fear stopped him from trying."
            ]
         },
         {
            "id": 32,
            "word": "feature",
            "role": "noun",
            "BrE": "/ˈfiːtʃə(r)/",
            "AmE": "/ˈfiːtʃər/",
            "definition": "an important or interesting part",
            "examples": [
               "The phone has new features.",
               "She likes the car’s features.",
               "The main feature is the camera."
            ]
         },
         {
            "id": 32,
            "word": "female",
            "role": "adjective",
            "BrE": "/ˈfiːmeɪl/",
            "AmE": "/ˈfiːmeɪl/",
            "definition": "relating to women or girls",
            "examples": [
               "She’s a female student.",
               "The female team won.",
               "The female doctor was kind."
            ]
         },
         {
            "id": 32,
            "word": "fence",
            "role": "noun",
            "BrE": "/fens/",
            "AmE": "/fens/",
            "definition": "a structure around a garden or area",
            "examples": [
               "The fence is tall.",
               "She painted the fence.",
               "The fence keeps the dog in."
            ]
         },
         {
            "id": 32,
            "word": "fever",
            "role": "noun",
            "BrE": "/ˈfiːvə(r)/",
            "AmE": "/ˈfiːvər/",
            "definition": "a high body temperature",
            "examples": [
               "He has a fever.",
               "Her fever lasted two days.",
               "The fever made her feel weak."
            ]
         },
         {
            "id": 33,
            "word": "field",
            "role": "noun",
            "BrE": "/fiːld/",
            "AmE": "/fiːld/",
            "definition": "an open area of land",
            "examples": [
               "The field is green.",
               "She ran across the field.",
               "The field is full of flowers."
            ]
         },
         {
            "id": 33,
            "word": "fight",
            "role": "noun",
            "BrE": "/faɪt/",
            "AmE": "/faɪt/",
            "definition": "a physical struggle",
            "examples": [
               "The fight was quick.",
               "They saw a fight at school.",
               "The fight caused a big noise."
            ]
         },
         {
            "id": 33,
            "word": "fight",
            "role": "verb",
            "BrE": "/faɪt/",
            "AmE": "/faɪt/",
            "definition": "to use physical force",
            "examples": [
               "Don’t fight with him.",
               "She fought for her team.",
               "They fought over the toy."
            ]
         },
         {
            "id": 33,
            "word": "figure",
            "role": "noun",
            "BrE": "/ˈfɪɡə(r)/",
            "AmE": "/ˈfɪɡjər/",
            "definition": "a number or shape",
            "examples": [
               "Write the figure down.",
               "The figure was a circle.",
               "She checked the sales figure."
            ]
         },
         {
            "id": 33,
            "word": "final",
            "role": "adjective",
            "BrE": "/ˈfaɪnl/",
            "AmE": "/ˈfaɪnl/",
            "definition": "the last in a series",
            "examples": [
               "It’s the final game.",
               "She passed the final test.",
               "The final chapter was exciting."
            ]
         },
         {
            "id": 33,
            "word": "finally",
            "role": "adverb",
            "BrE": "/ˈfaɪnəli/",
            "AmE": "/ˈfaɪnəli/",
            "definition": "after a long time",
            "examples": [
               "I’m finally here.",
               "She finally finished her work.",
               "He finally found his keys."
            ]
         },
         {
            "id": 33,
            "word": "finger",
            "role": "noun",
            "BrE": "/ˈfɪŋɡə(r)/",
            "AmE": "/ˈfɪŋɡər/",
            "definition": "a part of the hand",
            "examples": [
               "My finger hurts.",
               "She pointed with her finger.",
               "The ring is on her finger."
            ]
         },
         {
            "id": 33,
            "word": "finish",
            "role": "noun",
            "BrE": "/ˈfɪnɪʃ/",
            "AmE": "/ˈfɪnɪʃ/",
            "definition": "the end of something",
            "examples": [
               "The race has a finish.",
               "She saw the finish of the game.",
               "The finish was very close."
            ]
         },
         {
            "id": 33,
            "word": "fire",
            "role": "verb",
            "BrE": "/ˈfaɪə(r)/",
            "AmE": "/ˈfaɪr/",
            "definition": "to shoot a gun",
            "examples": [
               "Don’t fire the gun.",
               "He fired at the target.",
               "She fired a warning shot."
            ]
         },
         {
            "id": 33,
            "word": "firm",
            "role": "noun",
            "BrE": "/fɜːm/",
            "AmE": "/fɜːrm/",
            "definition": "a business or company",
            "examples": [
               "She works for a firm.",
               "The firm sells cars.",
               "He joined a law firm."
            ]
         },
         {
            "id": 34,
            "word": "firstly",
            "role": "adverb",
            "BrE": "/ˈfɜːstli/",
            "AmE": "/ˈfɜːrstli/",
            "definition": "used to introduce the first point",
            "examples": [
               "Firstly, we need food.",
               "Firstly, she checked her bag.",
               "Firstly, let’s discuss the plan."
            ]
         },
         {
            "id": 34,
            "word": "fit",
            "role": "adjective",
            "BrE": "/fɪt/",
            "AmE": "/fɪt/",
            "definition": "healthy and strong",
            "examples": [
               "He is very fit.",
               "She stays fit by running.",
               "The fit athlete won the race."
            ]
         },
         {
            "id": 34,
            "word": "fit",
            "role": "verb",
            "BrE": "/fɪt/",
            "AmE": "/fɪt/",
            "definition": "to be the right size or shape",
            "examples": [
               "This shirt fits me.",
               "The key fits the lock.",
               "Her shoes fit perfectly."
            ]
         },
         {
            "id": 34,
            "word": "fix",
            "role": "verb",
            "BrE": "/fɪks/",
            "AmE": "/fɪks/",
            "definition": "to repair something",
            "examples": [
               "Fix the broken chair.",
               "She fixed her bike.",
               "He fixed the leaky pipe."
            ]
         },
         {
            "id": 34,
            "word": "flat",
            "role": "adjective",
            "BrE": "/flæt/",
            "AmE": "/flæt/",
            "definition": "smooth and level",
            "examples": [
               "The table is flat.",
               "She walked on flat ground.",
               "The flat surface was clean."
            ]
         },
         {
            "id": 34,
            "word": "flight",
            "role": "noun",
            "BrE": "/flaɪt/",
            "AmE": "/flaɪt/",
            "definition": "a journey in an aircraft",
            "examples": [
               "I booked a flight.",
               "Her flight was delayed.",
               "The flight to London was long."
            ]
         },
         {
            "id": 34,
            "word": "float",
            "role": "verb",
            "BrE": "/fləʊt/",
            "AmE": "/floʊt/",
            "definition": "to stay on the surface of water",
            "examples": [
               "The boat floats.",
               "She floated in the pool.",
               "The leaf floated on the river."
            ]
         },
         {
            "id": 34,
            "word": "flood",
            "role": "noun",
            "BrE": "/flʌd/",
            "AmE": "/flʌd/",
            "definition": "a large amount of water covering an area",
            "examples": [
               "The flood was bad.",
               "The flood damaged the town.",
               "She escaped the flood."
            ]
         },
         {
            "id": 34,
            "word": "flow",
            "role": "verb",
            "BrE": "/fləʊ/",
            "AmE": "/floʊ/",
            "definition": "to move smoothly, like water",
            "examples": [
               "The river flows fast.",
               "Water flowed into the room.",
               "Traffic flows well today."
            ]
         },
         {
            "id": 34,
            "word": "flower",
            "role": "noun",
            "BrE": "/ˈflaʊə(r)/",
            "AmE": "/ˈflaʊər/",
            "definition": "the colorful part of a plant",
            "examples": [
               "The flower is red.",
               "She picked a flower.",
               "The flower smells nice."
            ]
         },
         {
            "id": 35,
            "word": "fly",
            "role": "noun",
            "BrE": "/flaɪ/",
            "AmE": "/flaɪ/",
            "definition": "an insect with wings",
            "examples": [
               "A fly is on the wall.",
               "She swatted the fly.",
               "The fly buzzed around the room."
            ]
         },
         {
            "id": 35,
            "word": "focus",
            "role": "noun",
            "BrE": "/ˈfəʊkəs/",
            "AmE": "/ˈfoʊkəs/",
            "definition": "the main thing you pay attention to",
            "examples": [
               "The focus is study.",
               "Her focus was on work.",
               "The focus of the talk was health."
            ]
         },
         {
            "id": 35,
            "word": "focus",
            "role": "verb",
            "BrE": "/ˈfəʊkəs/",
            "AmE": "/ˈfoʊkəs/",
            "definition": "to give attention to one thing",
            "examples": [
               "Focus on the book.",
               "She focused on her studies.",
               "He focused the camera on her."
            ]
         },
         {
            "id": 35,
            "word": "fog",
            "role": "noun",
            "BrE": "/fɒɡ/",
            "AmE": "/fɑːɡ/",
            "definition": "thick cloud near the ground",
            "examples": [
               "The fog is thick.",
               "She drove in the fog.",
               "The fog made it hard to see."
            ]
         },
         {
            "id": 35,
            "word": "fold",
            "role": "verb",
            "BrE": "/fəʊld/",
            "AmE": "/foʊld/",
            "definition": "to bend something like paper or cloth",
            "examples": [
               "Fold the paper.",
               "She folded her clothes.",
               "He folded the letter neatly."
            ]
         },
         {
            "id": 35,
            "word": "folk",
            "role": "noun",
            "BrE": "/fəʊk/",
            "AmE": "/foʊk/",
            "definition": "people in general",
            "examples": [
               "Folk like to dance.",
               "She met some folk at the party.",
               "The folk in the village are kind."
            ]
         },
         {
            "id": 35,
            "word": "follow",
            "role": "verb",
            "BrE": "/ˈfɒləʊ/",
            "AmE": "/ˈfɑːloʊ/",
            "definition": "to go after someone or something",
            "examples": [
               "Follow me.",
               "She followed the path.",
               "He followed the teacher’s advice."
            ]
         },
         {
            "id": 35,
            "word": "following",
            "role": "adjective",
            "BrE": "/ˈfɒləʊɪŋ/",
            "AmE": "/ˈfɑːloʊɪŋ/",
            "definition": "coming next or after",
            "examples": [
               "The following day was sunny.",
               "She read the following page.",
               "The following steps are easy."
            ]
         },
         {
            "id": 35,
            "word": "foreign",
            "role": "adjective",
            "BrE": "/ˈfɒrən/",
            "AmE": "/ˈfɔːrən/",
            "definition": "from another country",
            "examples": [
               "He speaks a foreign language.",
               "She met a foreign student.",
               "The foreign film was good."
            ]
         },
         {
            "id": 35,
            "word": "forest",
            "role": "noun",
            "BrE": "/ˈfɒrɪst/",
            "AmE": "/ˈfɔːrɪst/",
            "definition": "a large area with many trees",
            "examples": [
               "The forest is big.",
               "She walked in the forest.",
               "The forest is home to animals."
            ]
         },
         {
            "id": 36,
            "word": "forever",
            "role": "adverb",
            "BrE": "/fəˈrevə(r)/",
            "AmE": "/fəˈrevər/",
            "definition": "for all time",
            "examples": [
               "I’ll love you forever.",
               "She waited forever for the bus.",
               "The memory will last forever."
            ]
         },
         {
            "id": 36,
            "word": "forgive",
            "role": "verb",
            "BrE": "/fəˈɡɪv/",
            "AmE": "/fərˈɡɪv/",
            "definition": "to stop being angry with someone",
            "examples": [
               "Please forgive me.",
               "She forgave her friend.",
               "He forgave her for the mistake."
            ]
         },
         {
            "id": 36,
            "word": "fork",
            "role": "noun",
            "BrE": "/fɔːk/",
            "AmE": "/fɔːrk/",
            "definition": "a tool with points used for eating",
            "examples": [
               "I need a fork.",
               "She dropped her fork.",
               "The fork is next to the plate."
            ]
         },
         {
            "id": 36,
            "word": "formal",
            "role": "adjective",
            "BrE": "/ˈfɔːml/",
            "AmE": "/ˈfɔːrml/",
            "definition": "serious or official in style",
            "examples": [
               "Wear formal clothes.",
               "She wrote a formal letter.",
               "The formal meeting was long."
            ]
         },
         {
            "id": 36,
            "word": "fortunately",
            "role": "adverb",
            "BrE": "/ˈfɔːtʃənətli/",
            "AmE": "/ˈfɔːrtʃənətli/",
            "definition": "luckily",
            "examples": [
               "Fortunately, I found it.",
               "She arrived, fortunately, on time.",
               "Fortunately, the rain stopped."
            ]
         },
         {
            "id": 36,
            "word": "forward",
            "role": "adverb",
            "BrE": "/ˈfɔːwəd/",
            "AmE": "/ˈfɔːrwərd/",
            "definition": "towards the front or future",
            "examples": [
               "Move forward.",
               "She stepped forward to speak.",
               "He looks forward to the holiday."
            ]
         },
         {
            "id": 36,
            "word": "free",
            "role": "adverb",
            "BrE": "/friː/",
            "AmE": "/friː/",
            "definition": "without cost",
            "examples": [
               "It’s free to enter.",
               "She got a free ticket.",
               "The app is free to download."
            ]
         },
         {
            "id": 36,
            "word": "freeze",
            "role": "verb",
            "BrE": "/friːz/",
            "AmE": "/friːz/",
            "definition": "to become very cold or turn to ice",
            "examples": [
               "Water can freeze.",
               "She froze in the cold.",
               "The lake froze last night."
            ]
         },
         {
            "id": 36,
            "word": "frequent",
            "role": "adjective",
            "BrE": "/ˈfriːkwənt/",
            "AmE": "/ˈfriːkwənt/",
            "definition": "happening often",
            "examples": [
               "Frequent rain is normal.",
               "She makes frequent visits.",
               "His frequent calls annoyed her."
            ]
         },
         {
            "id": 36,
            "word": "fresh",
            "role": "adjective",
            "BrE": "/freʃ/",
            "AmE": "/freʃ/",
            "definition": "new or not spoiled",
            "examples": [
               "The fruit is fresh.",
               "She bought fresh bread.",
               "The fresh air felt good."
            ]
         },
         {
            "id": 37,
            "word": "fridge",
            "role": "noun",
            "BrE": "/frɪdʒ/",
            "AmE": "/frɪdʒ/",
            "definition": "a machine for keeping food cold",
            "examples": [
               "The fridge is full.",
               "She opened the fridge.",
               "The milk is in the fridge."
            ]
         },
         {
            "id": 37,
            "word": "fry",
            "role": "verb",
            "BrE": "/fraɪ/",
            "AmE": "/fraɪ/",
            "definition": "to cook in hot oil",
            "examples": [
               "Fry the eggs.",
               "She fried some potatoes.",
               "He fried fish for dinner."
            ]
         },
         {
            "id": 37,
            "word": "fuel",
            "role": "noun",
            "BrE": "/fjuːəl/",
            "AmE": "/fjuːəl/",
            "definition": "material used to produce energy",
            "examples": [
               "The car needs fuel.",
               "She bought fuel for the trip.",
               "Fuel prices are high now."
            ]
         },
         {
            "id": 37,
            "word": "funny",
            "role": "adjective",
            "BrE": "/ˈfʌni/",
            "AmE": "/ˈfʌni/",
            "definition": "making you laugh",
            "examples": [
               "The joke is funny.",
               "She told a funny story.",
               "His funny face made us laugh."
            ]
         },
         {
            "id": 37,
            "word": "future",
            "role": "adjective",
            "BrE": "/ˈfjuːtʃə(r)/",
            "AmE": "/ˈfjuːtʃər/",
            "definition": "happening later",
            "examples": [
               "My future plan is ready.",
               "She dreams of her future job.",
               "Future events are exciting."
            ]
         },
         {
            "id": 37,
            "word": "future",
            "role": "noun",
            "BrE": "/ˈfjuːtʃə(r)/",
            "AmE": "/ˈfjuːtʃər/",
            "definition": "the time that will come",
            "examples": [
               "The future is bright.",
               "She plans for the future.",
               "The future of the town is good."
            ]
         },
         {
            "id": 37,
            "word": "gallery",
            "role": "noun",
            "BrE": "/ˈɡæləri/",
            "AmE": "/ˈɡæləri/",
            "definition": "a place for showing art",
            "examples": [
               "The gallery is open.",
               "She visited an art gallery.",
               "The gallery has new paintings."
            ]
         },
         {
            "id": 37,
            "word": "gap",
            "role": "noun",
            "BrE": "/ɡæp/",
            "AmE": "/ɡæp/",
            "definition": "an empty space between things",
            "examples": [
               "There’s a gap here.",
               "She filled the gap.",
               "The gap between the trees is wide."
            ]
         },
         {
            "id": 37,
            "word": "gate",
            "role": "noun",
            "BrE": "/ɡeɪt/",
            "AmE": "/ɡeɪt/",
            "definition": "a door in a fence or wall",
            "examples": [
               "Open the gate.",
               "She closed the gate.",
               "The gate to the garden is green."
            ]
         },
         {
            "id": 37,
            "word": "general",
            "role": "adjective",
            "BrE": "/ˈdʒenrəl/",
            "AmE": "/ˈdʒenrəl/",
            "definition": "affecting most people or things",
            "examples": [
               "It’s a general rule.",
               "She has general knowledge.",
               "The general idea is clear."
            ]
         },
         {
            "id": 38,
            "word": "gentle",
            "role": "adjective",
            "BrE": "/ˈdʒentl/",
            "AmE": "/ˈdʒentl/",
            "definition": "kind or soft",
            "examples": [
               "Be gentle with the cat.",
               "She has a gentle voice.",
               "The gentle wind felt nice."
            ]
         },
         {
            "id": 38,
            "word": "gift",
            "role": "noun",
            "BrE": "/ɡɪft/",
            "AmE": "/ɡɪft/",
            "definition": "something given to someone",
            "examples": [
               "I got a gift.",
               "She gave him a gift.",
               "The gift was a book."
            ]
         },
         {
            "id": 38,
            "word": "glad",
            "role": "adjective",
            "BrE": "/ɡlæd/",
            "AmE": "/ɡlæd/",
            "definition": "happy or pleased",
            "examples": [
               "I’m glad you came.",
               "She’s glad about the news.",
               "He was glad to see her."
            ]
         },
         {
            "id": 38,
            "word": "global",
            "role": "adjective",
            "BrE": "/ˈɡləʊbl/",
            "AmE": "/ˈɡloʊbl/",
            "definition": "relating to the whole world",
            "examples": [
               "It’s a global problem.",
               "She works for a global company.",
               "Global warming affects everyone."
            ]
         },
         {
            "id": 38,
            "word": "goal",
            "role": "noun",
            "BrE": "/ɡəʊl/",
            "AmE": "/ɡoʊl/",
            "definition": "something you want to achieve",
            "examples": [
               "My goal is to learn.",
               "She scored a goal in football.",
               "His goal is to travel abroad."
            ]
         },
         {
            "id": 38,
            "word": "god",
            "role": "noun",
            "BrE": "/ɡɒd/",
            "AmE": "/ɡɑːd/",
            "definition": "a being believed to have power over the world",
            "examples": [
               "They pray to God.",
               "She believes in God.",
               "The statue of a god is old."
            ]
         },
         {
            "id": 38,
            "word": "gold",
            "role": "noun",
            "BrE": "/ɡəʊld/",
            "AmE": "/ɡoʊld/",
            "definition": "a valuable yellow metal",
            "examples": [
               "Gold is expensive.",
               "She wore a gold ring.",
               "The gold necklace was shiny."
            ]
         },
         {
            "id": 38,
            "word": "golf",
            "role": "noun",
            "BrE": "/ɡɒlf/",
            "AmE": "/ɡɑːlf/",
            "definition": "a game played with a small ball and clubs",
            "examples": [
               "I play golf.",
               "She watched a golf match.",
               "Golf is popular in the town."
            ]
         },
         {
            "id": 38,
            "word": "goodness",
            "role": "exclamation",
            "BrE": "/ˈɡʊdnəs/",
            "AmE": "/ˈɡʊdnəs/",
            "definition": "used to express surprise or relief",
            "examples": [
               "Goodness, it’s late!",
               "Goodness, you scared me!",
               "Goodness, that was close!"
            ]
         },
         {
            "id": 38,
            "word": "government",
            "role": "noun",
            "BrE": "/ˈɡʌvənmənt/",
            "AmE": "/ˈɡʌvərnmənt/",
            "definition": "the group of people who rule a country",
            "examples": [
               "The government is new.",
               "She works for the government.",
               "The government made a new law."
            ]
         },
         {
            "id": 39,
            "word": "grade",
            "role": "noun",
            "BrE": "/ɡreɪd/",
            "AmE": "/ɡreɪd/",
            "definition": "a mark given for schoolwork",
            "examples": [
               "I got a good grade.",
               "Her grade was excellent.",
               "The grade on the test was high."
            ]
         },
         {
            "id": 39,
            "word": "gradually",
            "role": "adverb",
            "BrE": "/ˈɡrædʒuəli/",
            "AmE": "/ˈɡrædʒuəli/",
            "definition": "slowly over time",
            "examples": [
               "It got dark gradually.",
               "She improved gradually.",
               "The noise grew gradually louder."
            ]
         },
         {
            "id": 39,
            "word": "grammar",
            "role": "noun",
            "BrE": "/ˈɡræmə(r)/",
            "AmE": "/ˈɡræmər/",
            "definition": "the rules of a language",
            "examples": [
               "I study grammar.",
               "Her grammar is very good.",
               "The grammar lesson was hard."
            ]
         },
         {
            "id": 39,
            "word": "grand",
            "role": "adjective",
            "BrE": "/ɡrænd/",
            "AmE": "/ɡrænd/",
            "definition": "large and impressive",
            "examples": [
               "The house is grand.",
               "She saw a grand castle.",
               "The grand party was fun."
            ]
         },
         {
            "id": 39,
            "word": "grass",
            "role": "noun",
            "BrE": "/ɡrɑːs/",
            "AmE": "/ɡræs/",
            "definition": "a common green plant",
            "examples": [
               "The grass is green.",
               "She sat on the grass.",
               "The grass needs cutting."
            ]
         },
         {
            "id": 39,
            "word": "greatly",
            "role": "adverb",
            "BrE": "/ˈɡreɪtli/",
            "AmE": "/ˈɡreɪtli/",
            "definition": "to a large degree",
            "examples": [
               "I greatly enjoyed it.",
               "She greatly improved her work.",
               "He greatly admired her courage."
            ]
         },
         {
            "id": 39,
            "word": "grey",
            "role": "adjective",
            "BrE": "/ɡreɪ/",
            "AmE": "/ɡreɪ/",
            "definition": "the color between black and white",
            "examples": [
               "Her hair is grey.",
               "He wore a grey jacket.",
               "The grey clouds brought rain."
            ]
         },
         {
            "id": 39,
            "word": "ground",
            "role": "noun",
            "BrE": "/ɡraʊnd/",
            "AmE": "/ɡraʊnd/",
            "definition": "the surface of the earth",
            "examples": [
               "The ground is wet.",
               "She fell to the ground.",
               "The ground was covered in snow."
            ]
         },
         {
            "id": 39,
            "word": "grow",
            "role": "verb",
            "BrE": "/ɡrəʊ/",
            "AmE": "/ɡroʊ/",
            "definition": "to become bigger or taller",
            "examples": [
               "Plants grow fast.",
               "She grew taller this year.",
               "The tree grew in the garden."
            ]
         },
         {
            "id": 39,
            "word": "guard",
            "role": "noun",
            "BrE": "/ɡɑːd/",
            "AmE": "/ɡɑːrd/",
            "definition": "a person who protects something",
            "examples": [
               "The guard is at the gate.",
               "She saw a security guard.",
               "The guard watched the building."
            ]
         },
         {
            "id": 40,
            "word": "guess",
            "role": "noun",
            "BrE": "/ɡes/",
            "AmE": "/ɡes/",
            "definition": "an attempt to give the right answer",
            "examples": [
               "Make a guess.",
               "Her guess was correct.",
               "My guess is it will rain."
            ]
         },
         {
            "id": 40,
            "word": "guest",
            "role": "noun",
            "BrE": "/ɡest/",
            "AmE": "/ɡest/",
            "definition": "a person invited to a place",
            "examples": [
               "We have a guest.",
               "She was a guest at the party.",
               "The guest stayed for dinner."
            ]
         },
         {
            "id": 40,
            "word": "guide",
            "role": "noun",
            "BrE": "/ɡaɪd/",
            "AmE": "/ɡaɪd/",
            "definition": "a person who shows the way",
            "examples": [
               "The guide was helpful.",
               "She followed the tour guide.",
               "The guide explained the history."
            ]
         },
         {
            "id": 40,
            "word": "gun",
            "role": "noun",
            "BrE": "/ɡʌn/",
            "AmE": "/ɡʌn/",
            "definition": "a weapon that shoots bullets",
            "examples": [
               "He held a gun.",
               "The gun was not loaded.",
               "She saw a gun in the movie."
            ]
         },
         {
            "id": 40,
            "word": "guy",
            "role": "noun",
            "BrE": "/ɡaɪ/",
            "AmE": "/ɡaɪ/",
            "definition": "a man or person (informal)",
            "examples": [
               "He’s a nice guy.",
               "She met a guy at school.",
               "That guy helped me yesterday."
            ]
         },
         {
            "id": 40,
            "word": "habit",
            "role": "noun",
            "BrE": "/ˈhæbɪt/",
            "AmE": "/ˈhæbɪt/",
            "definition": "something you do regularly",
            "examples": [
               "I have a bad habit.",
               "She broke her habit of smoking.",
               "His habit is to wake up early."
            ]
         },
         {
            "id": 40,
            "word": "haircut",
            "role": "noun",
            "BrE": "/ˈheəkʌt/",
            "AmE": "/ˈherkʌt/",
            "definition": "the act of cutting hair",
            "examples": [
               "I need a haircut.",
               "She got a new haircut.",
               "The haircut made her look different."
            ]
         },
         {
            "id": 40,
            "word": "hall",
            "role": "noun",
            "BrE": "/hɔːl/",
            "AmE": "/hɔːl/",
            "definition": "a large room or building for events",
            "examples": [
               "The hall is big.",
               "She danced in the hall.",
               "The meeting was in the hall."
            ]
         },
         {
            "id": 40,
            "word": "hand",
            "role": "verb",
            "BrE": "/hænd/",
            "AmE": "/hænd/",
            "definition": "to give something to someone",
            "examples": [
               "Hand me the book.",
               "She handed him a pen.",
               "He handed out the papers."
            ]
         },
         {
            "id": 40,
            "word": "hang",
            "role": "verb",
            "BrE": "/hæŋ/",
            "AmE": "/hæŋ/",
            "definition": "to attach something so it stays up",
            "examples": [
               "Hang the picture.",
               "She hung her coat on the hook.",
               "He hung the lights on the tree."
            ]
         },
         {
            "id": 41,
            "word": "happen",
            "role": "verb",
            "BrE": "/ˈhæpən/",
            "AmE": "/ˈhæpən/",
            "definition": "to take place or occur",
            "examples": [
               "What happened here?",
               "She saw it happen.",
               "The accident happened yesterday."
            ]
         },
         {
            "id": 41,
            "word": "hardly",
            "role": "adverb",
            "BrE": "/ˈhɑːdli/",
            "AmE": "/ˈhɑːrdli/",
            "definition": "almost not",
            "examples": [
               "I hardly know her.",
               "She hardly ate anything.",
               "He hardly speaks in class."
            ]
         },
         {
            "id": 41,
            "word": "hate",
            "role": "noun",
            "BrE": "/heɪt/",
            "AmE": "/heɪt/",
            "definition": "a strong feeling of dislike",
            "examples": [
               "Hate is not good.",
               "She felt hate for the bully.",
               "His hate caused problems."
            ]
         },
         {
            "id": 41,
            "word": "headache",
            "role": "noun",
            "BrE": "/ˈhedeɪk/",
            "AmE": "/ˈhedeɪk/",
            "definition": "a pain in the head",
            "examples": [
               "I have a headache.",
               "She took medicine for her headache.",
               "The headache lasted all day."
            ]
         },
         {
            "id": 41,
            "word": "health",
            "role": "noun",
            "BrE": "/helθ/",
            "AmE": "/helθ/",
            "definition": "the condition of the body or mind",
            "examples": [
               "Health is important.",
               "She cares about her health.",
               "Good health helps you work."
            ]
         },
         {
            "id": 41,
            "word": "healthy",
            "role": "adjective",
            "BrE": "/ˈhelθi/",
            "AmE": "/ˈhelθi/",
            "definition": "good for your health",
            "examples": [
               "Eat healthy food.",
               "She feels healthy now.",
               "A healthy diet includes fruit."
            ]
         },
         {
            "id": 41,
            "word": "heart",
            "role": "noun",
            "BrE": "/hɑːt/",
            "AmE": "/hɑːrt/",
            "definition": "the organ that pumps blood",
            "examples": [
               "The heart beats fast.",
               "Her heart was checked.",
               "A strong heart helps athletes."
            ]
         },
         {
            "id": 41,
            "word": "heat",
            "role": "noun",
            "BrE": "/hiːt/",
            "AmE": "/hiːt/",
            "definition": "the quality of being hot",
            "examples": [
               "The heat is strong.",
               "She felt the heat outside.",
               "The heat of the fire warmed us."
            ]
         },
         {
            "id": 41,
            "word": "heat",
            "role": "verb",
            "BrE": "/hiːt/",
            "AmE": "/hiːt/",
            "definition": "to make something hot",
            "examples": [
               "Heat the water.",
               "She heated the soup.",
               "He heated his coffee again."
            ]
         },
         {
            "id": 41,
            "word": "heaven",
            "role": "noun",
            "BrE": "/ˈhevn/",
            "AmE": "/ˈhevn/",
            "definition": "a place believed to be perfect",
            "examples": [
               "Heaven sounds nice.",
               "She believes in heaven.",
               "The view was like heaven."
            ]
         },
         {
            "id": 42,
            "word": "height",
            "role": "noun",
            "BrE": "/haɪt/",
            "AmE": "/haɪt/",
            "definition": "how tall or high something is",
            "examples": [
               "Her height is tall.",
               "The height of the tree is big.",
               "He measured the height of the wall."
            ]
         },
         {
            "id": 42,
            "word": "hide",
            "role": "verb",
            "BrE": "/haɪd/",
            "AmE": "/haɪd/",
            "definition": "to put or keep out of sight",
            "examples": [
               "Hide the gift.",
               "She hid behind the door.",
               "He hid his keys in the bag."
            ]
         },
         {
            "id": 42,
            "word": "high",
            "role": "adverb",
            "BrE": "/haɪ/",
            "AmE": "/haɪ/",
            "definition": "at or to a great height",
            "examples": [
               "The bird flew high.",
               "She climbed high up the hill.",
               "He jumped high in the air."
            ]
         },
         {
            "id": 42,
            "word": "hill",
            "role": "noun",
            "BrE": "/hɪl/",
            "AmE": "/hɪl/",
            "definition": "a raised area of land",
            "examples": [
               "The hill is steep.",
               "She ran down the hill.",
               "The hill has a great view."
            ]
         },
         {
            "id": 42,
            "word": "hire",
            "role": "verb",
            "BrE": "/ˈhaɪə(r)/",
            "AmE": "/ˈhaɪr/",
            "definition": "to give someone a job",
            "examples": [
               "They hired me.",
               "She hired a new assistant.",
               "He was hired for the project."
            ]
         },
         {
            "id": 42,
            "word": "hit",
            "role": "noun",
            "BrE": "/hɪt/",
            "AmE": "/hɪt/",
            "definition": "a successful song or film",
            "examples": [
               "The song is a hit.",
               "Her movie was a big hit.",
               "The hit song played on the radio."
            ]
         },
         {
            "id": 42,
            "word": "hobby",
            "role": "noun",
            "BrE": "/ˈhɒbi/",
            "AmE": "/ˈhɑːbi/",
            "definition": "an activity done for pleasure",
            "examples": [
               "My hobby is reading.",
               "She has a hobby of painting.",
               "His hobby is collecting coins."
            ]
         },
         {
            "id": 42,
            "word": "hold",
            "role": "verb",
            "BrE": "/həʊld/",
            "AmE": "/hoʊld/",
            "definition": "to keep something in your hand",
            "examples": [
               "Hold the book.",
               "She held her baby tightly.",
               "He held the bag for her."
            ]
         },
         {
            "id": 42,
            "word": "hole",
            "role": "noun",
            "BrE": "/həʊl/",
            "AmE": "/hoʊl/",
            "definition": "an empty space in something",
            "examples": [
               "There’s a hole in my shoe.",
               "She fell into a hole.",
               "The hole was full of water."
            ]
         },
         {
            "id": 42,
            "word": "holiday",
            "role": "noun",
            "BrE": "/ˈhɒlədeɪ/",
            "AmE": "/ˈhɑːlədeɪ/",
            "definition": "a time of rest or travel",
            "examples": [
               "I love holidays.",
               "She went on holiday to Spain.",
               "The holiday was very relaxing."
            ]
         },
         {
            "id": 43,
            "word": "homework",
            "role": "noun",
            "BrE": "/ˈhəʊmwɜːk/",
            "AmE": "/ˈhoʊmwɜːrk/",
            "definition": "schoolwork done at home",
            "examples": [
               "I have homework.",
               "She finished her homework early.",
               "The homework was about math."
            ]
         },
         {
            "id": 43,
            "word": "hope",
            "role": "noun",
            "BrE": "/həʊp/",
            "AmE": "/hoʊp/",
            "definition": "a feeling that something good will happen",
            "examples": [
               "I have hope.",
               "She gave me hope.",
               "His hope is to win the race."
            ]
         },
         {
            "id": 43,
            "word": "horrible",
            "role": "adjective",
            "BrE": "/ˈhɒrəbl/",
            "AmE": "/ˈhɔːrəbl/",
            "definition": "very bad or unpleasant",
            "examples": [
               "The smell was horrible.",
               "She had a horrible day.",
               "The horrible noise woke him."
            ]
         },
         {
            "id": 43,
            "word": "horse",
            "role": "noun",
            "BrE": "/hɔːs/",
            "AmE": "/hɔːrs/",
            "definition": "a large animal used for riding",
            "examples": [
               "The horse is fast.",
               "She rode a horse.",
               "The horse ran in the field."
            ]
         },
         {
            "id": 43,
            "word": "hospital",
            "role": "noun",
            "BrE": "/ˈhɒspɪtl/",
            "AmE": "/ˈhɑːspɪtl/",
            "definition": "a place where sick people are treated",
            "examples": [
               "The hospital is near.",
               "She visited the hospital.",
               "He stayed in the hospital overnight."
            ]
         },
         {
            "id": 43,
            "word": "hot",
            "role": "adjective",
            "BrE": "/hɒt/",
            "AmE": "/hɑːt/",
            "definition": "having a high temperature",
            "examples": [
               "The soup is hot.",
               "She felt hot in the sun.",
               "The hot weather lasted all week."
            ]
         },
         {
            "id": 43,
            "word": "hotel",
            "role": "noun",
            "BrE": "/həʊˈtel/",
            "AmE": "/hoʊˈtel/",
            "definition": "a place where people stay and pay",
            "examples": [
               "The hotel is nice.",
               "She booked a hotel room.",
               "The hotel has a big pool."
            ]
         },
         {
            "id": 43,
            "word": "hourly",
            "role": "adjective",
            "BrE": "/ˈaʊəli/",
            "AmE": "/ˈaʊrli/",
            "definition": "happening every hour",
            "examples": [
               "The bus is hourly.",
               "She checks her phone hourly.",
               "Hourly updates were given."
            ]
         },
         {
            "id": 43,
            "word": "huge",
            "role": "adjective",
            "BrE": "/hjuːdʒ/",
            "AmE": "/hjuːdʒ/",
            "definition": "very large",
            "examples": [
               "The house is huge.",
               "She saw a huge dog.",
               "The huge tree blocked the sun."
            ]
         },
         {
            "id": 43,
            "word": "human",
            "role": "noun",
            "BrE": "/ˈhjuːmən/",
            "AmE": "/ˈhjuːmən/",
            "definition": "a person",
            "examples": [
               "Humans live here.",
               "She studies human behavior.",
               "The human helped the animal."
            ]
         },
         {
            "id": 44,
            "word": "humid",
            "role": "adjective",
            "BrE": "/ˈhjuːmɪd/",
            "AmE": "/ˈhjuːmɪd/",
            "definition": "wet and warm, like the air",
            "examples": [
               "The weather is humid.",
               "She felt humid in the forest.",
               "The humid air was heavy."
            ]
         },
         {
            "id": 44,
            "word": "hunger",
            "role": "noun",
            "BrE": "/ˈhʌŋɡə(r)/",
            "AmE": "/ˈhʌŋɡər/",
            "definition": "the feeling of needing food",
            "examples": [
               "Hunger makes me tired.",
               "She felt hunger after work.",
               "The hunger was hard to ignore."
            ]
         },
         {
            "id": 44,
            "word": "hungry",
            "role": "adjective",
            "BrE": "/ˈhʌŋɡri/",
            "AmE": "/ˈhʌŋɡri/",
            "definition": "wanting or needing food",
            "examples": [
               "I’m hungry now.",
               "She felt hungry after school.",
               "The hungry child ate quickly."
            ]
         },
         {
            "id": 44,
            "word": "hunt",
            "role": "verb",
            "BrE": "/hʌnt/",
            "AmE": "/hʌnt/",
            "definition": "to chase animals to catch them",
            "examples": [
               "They hunt in the forest.",
               "She hunted for food.",
               "He hunts with his dog."
            ]
         },
         {
            "id": 44,
            "word": "hurry",
            "role": "noun",
            "BrE": "/ˈhʌri/",
            "AmE": "/ˈhɜːri/",
            "definition": "the need to move quickly",
            "examples": [
               "I’m in a hurry.",
               "She left in a hurry.",
               "There’s no hurry to finish."
            ]
         },
         {
            "id": 44,
            "word": "hurry",
            "role": "verb",
            "BrE": "/ˈhʌri/",
            "AmE": "/ˈhɜːri/",
            "definition": "to move or act quickly",
            "examples": [
               "Hurry, we’re late!",
               "She hurried to the bus.",
               "He hurried to finish his work."
            ]
         },
         {
            "id": 44,
            "word": "hurt",
            "role": "verb",
            "BrE": "/hɜːt/",
            "AmE": "/hɜːrt/",
            "definition": "to cause pain or injury",
            "examples": [
               "My leg hurts.",
               "She hurt her arm.",
               "He didn’t mean to hurt her."
            ]
         },
         {
            "id": 44,
            "word": "ideal",
            "role": "adjective",
            "BrE": "/aɪˈdiːəl/",
            "AmE": "/aɪˈdiːəl/",
            "definition": "perfect or the best possible",
            "examples": [
               "It’s an ideal place.",
               "She found the ideal job.",
               "The weather was ideal for a picnic."
            ]
         },
         {
            "id": 44,
            "word": "identify",
            "role": "verb",
            "BrE": "/aɪˈdentɪfaɪ/",
            "AmE": "/aɪˈdentɪfaɪ/",
            "definition": "to recognize or name something",
            "examples": [
               "Identify the picture.",
               "She identified the bird.",
               "He identified the correct answer."
            ]
         },
         {
            "id": 44,
            "word": "ill",
            "role": "adjective",
            "BrE": "/ɪl/",
            "AmE": "/ɪl/",
            "definition": "not healthy or sick",
            "examples": [
               "She is ill today.",
               "He felt ill after lunch.",
               "The ill child stayed home."
            ]
         },
         {
            "id": 45,
            "word": "illegal",
            "role": "adjective",
            "BrE": "/ɪˈliːɡl/",
            "AmE": "/ɪˈliːɡl/",
            "definition": "against the law",
            "examples": [
               "It’s an illegal act.",
               "She saw an illegal sign.",
               "The illegal parking caused a fine."
            ]
         },
         {
            "id": 45,
            "word": "illness",
            "role": "noun",
            "BrE": "/ˈɪlnəs/",
            "AmE": "/ˈɪlnəs/",
            "definition": "the state of being ill",
            "examples": [
               "She has an illness.",
               "His illness was short.",
               "The illness kept her in bed."
            ]
         },
         {
            "id": 45,
            "word": "image",
            "role": "noun",
            "BrE": "/ˈɪmɪdʒ/",
            "AmE": "/ˈɪmɪdʒ/",
            "definition": "a picture or photograph",
            "examples": [
               "I saw an image.",
               "She took an image of the tree.",
               "The image on the wall is nice."
            ]
         },
         {
            "id": 45,
            "word": "imagine",
            "role": "verb",
            "BrE": "/ɪˈmædʒɪn/",
            "AmE": "/ɪˈmædʒɪn/",
            "definition": "to form a picture in your mind",
            "examples": [
               "Imagine a big house.",
               "She imagined a fun holiday.",
               "He imagined living in a city."
            ]
         },
         {
            "id": 45,
            "word": "immediately",
            "role": "adverb",
            "BrE": "/ɪˈmiːdiətli/",
            "AmE": "/ɪˈmiːdiətli/",
            "definition": "at once or without delay",
            "examples": [
               "Come immediately!",
               "She answered immediately.",
               "He left immediately after class."
            ]
         },
         {
            "id": 45,
            "word": "impossible",
            "role": "adjective",
            "BrE": "/ɪmˈpɒsəbl/",
            "AmE": "/ɪmˈpɑːsəbl/",
            "definition": "not able to happen",
            "examples": [
               "It’s impossible to fly.",
               "She found it impossible to sleep.",
               "The task was impossible for him."
            ]
         },
         {
            "id": 45,
            "word": "improve",
            "role": "verb",
            "BrE": "/ɪmˈpruːv/",
            "AmE": "/ɪmˈpruːv/",
            "definition": "to make or become better",
            "examples": [
               "Improve your work.",
               "She improved her English.",
               "He improved the design."
            ]
         },
         {
            "id": 45,
            "word": "improvement",
            "role": "noun",
            "BrE": "/ɪmˈpruːvmənt/",
            "AmE": "/ɪmˈpruːvmənt/",
            "definition": "the act of making something better",
            "examples": [
               "I see improvement.",
               "Her improvement was clear.",
               "The improvement in sales was big."
            ]
         },
         {
            "id": 45,
            "word": "include",
            "role": "verb",
            "BrE": "/ɪnˈkluːd/",
            "AmE": "/ɪnˈkluːd/",
            "definition": "to have something as a part",
            "examples": [
               "Include me in the plan.",
               "She included a photo.",
               "The price includes food."
            ]
         },
         {
            "id": 45,
            "word": "including",
            "role": "preposition",
            "BrE": "/ɪnˈkluːdɪŋ/",
            "AmE": "/ɪnˈkluːdɪŋ/",
            "definition": "having something as part of a group",
            "examples": [
               "Everyone, including me, came.",
               "She invited friends, including him.",
               "The team, including her, won."
            ]
         },
         {
            "id": 46,
            "word": "increase",
            "role": "noun",
            "BrE": "/ˈɪnkriːs/",
            "AmE": "/ˈɪnkriːs/",
            "definition": "a rise in amount or size",
            "examples": [
               "There’s an increase in price.",
               "She noticed an increase in sales.",
               "The increase in traffic was big."
            ]
         },
         {
            "id": 46,
            "word": "increase",
            "role": "verb",
            "BrE": "/ɪnˈkriːs/",
            "AmE": "/ɪnˈkriːs/",
            "definition": "to make or become larger",
            "examples": [
               "Increase the heat.",
               "She increased her speed.",
               "He increased his study time."
            ]
         },
         {
            "id": 46,
            "word": "independent",
            "role": "adjective",
            "BrE": "/ˌɪndɪˈpendənt/",
            "AmE": "/ˌɪndɪˈpendənt/",
            "definition": "not needing other people’s help",
            "examples": [
               "She is independent.",
               "He lives an independent life.",
               "The independent shop is small."
            ]
         },
         {
            "id": 46,
            "word": "individual",
            "role": "adjective",
            "BrE": "/ˌɪndɪˈvɪdʒuəl/",
            "AmE": "/ˌɪndɪˈvɪdʒuəl/",
            "definition": "relating to one person or thing",
            "examples": [
               "Each individual task is easy.",
               "She has individual style.",
               "The individual books were numbered."
            ]
         },
         {
            "id": 46,
            "word": "individual",
            "role": "noun",
            "BrE": "/ˌɪndɪˈvɪdʒuəl/",
            "AmE": "/ˌɪndɪˈvɪdʒuəl/",
            "definition": "a single person",
            "examples": [
               "Each individual must try.",
               "She helped every individual.",
               "The individual won a prize."
            ]
         },
         {
            "id": 46,
            "word": "industry",
            "role": "noun",
            "BrE": "/ˈɪndəstri/",
            "AmE": "/ˈɪndəstri/",
            "definition": "the production of goods",
            "examples": [
               "Industry is growing.",
               "She works in the car industry.",
               "The industry needs new workers."
            ]
         },
         {
            "id": 46,
            "word": "inform",
            "role": "verb",
            "BrE": "/ɪnˈfɔːm/",
            "AmE": "/ɪnˈfɔːrm/",
            "definition": "to tell someone something",
            "examples": [
               "Inform me later.",
               "She informed the team.",
               "He informed her about the plan."
            ]
         },
         {
            "id": 46,
            "word": "information",
            "role": "noun",
            "BrE": "/ˌɪnfəˈmeɪʃn/",
            "AmE": "/ˌɪnfərˈmeɪʃn/",
            "definition": "facts about something",
            "examples": [
               "I need information.",
               "She gave me information.",
               "The information was helpful."
            ]
         },
         {
            "id": 46,
            "word": "ingredient",
            "role": "noun",
            "BrE": "/ɪnˈɡriːdiənt/",
            "AmE": "/ɪnˈɡriːdiənt/",
            "definition": "a part of a mixture, especially in cooking",
            "examples": [
               "Sugar is an ingredient.",
               "She added ingredients to the cake.",
               "The recipe needs five ingredients."
            ]
         },
         {
            "id": 46,
            "word": "injury",
            "role": "noun",
            "BrE": "/ˈɪndʒəri/",
            "AmE": "/ˈɪndʒəri/",
            "definition": "harm or damage to the body",
            "examples": [
               "He has an injury.",
               "Her injury was from sports.",
               "The injury healed quickly."
            ]
         },
         {
            "id": 47,
            "word": "inside",
            "role": "adverb",
            "BrE": "/ɪnˈsaɪd/",
            "AmE": "/ɪnˈsaɪd/",
            "definition": "into or within a place",
            "examples": [
               "Go inside now.",
               "She waited inside the house.",
               "He left his bag inside."
            ]
         },
         {
            "id": 47,
            "word": "inside",
            "role": "noun",
            "BrE": "/ˈɪnsaɪd/",
            "AmE": "/ˈɪnsaɪd/",
            "definition": "the inner part of something",
            "examples": [
               "The inside is clean.",
               "She checked the inside of the box.",
               "The inside of the car was warm."
            ]
         },
         {
            "id": 47,
            "word": "inside",
            "role": "preposition",
            "BrE": "/ɪnˈsaɪd/",
            "AmE": "/ɪnˈsaɪd/",
            "definition": "within something",
            "examples": [
               "It’s inside the bag.",
               "She put it inside the box.",
               "He found it inside the drawer."
            ]
         },
         {
            "id": 47,
            "word": "install",
            "role": "verb",
            "BrE": "/ɪnˈstɔːl/",
            "AmE": "/ɪnˈstɔːl/",
            "definition": "to put equipment in place",
            "examples": [
               "Install the app.",
               "She installed a new light.",
               "He installed the software."
            ]
         },
         {
            "id": 47,
            "word": "instead",
            "role": "adverb",
            "BrE": "/ɪnˈsted/",
            "AmE": "/ɪnˈsted/",
            "definition": "in place of something else",
            "examples": [
               "I’ll go instead.",
               "She chose tea instead of coffee.",
               "He stayed home instead of going out."
            ]
         },
         {
            "id": 47,
            "word": "instruction",
            "role": "noun",
            "BrE": "/ɪnˈstrʌkʃn/",
            "AmE": "/ɪnˈstrʌkʃn/",
            "definition": "information on how to do something",
            "examples": [
               "Follow the instruction.",
               "She read the instructions.",
               "The instruction was clear."
            ]
         },
         {
            "id": 47,
            "word": "instrument",
            "role": "noun",
            "BrE": "/ˈɪnstrəmənt/",
            "AmE": "/ˈɪnstrəmənt/",
            "definition": "a tool or device for a purpose",
            "examples": [
               "The instrument is sharp.",
               "She plays a musical instrument.",
               "The instrument helped in surgery."
            ]
         },
         {
            "id": 47,
            "word": "intelligent",
            "role": "adjective",
            "BrE": "/ɪnˈtelɪdʒənt/",
            "AmE": "/ɪnˈtelɪdʒənt/",
            "definition": "able to learn and understand quickly",
            "examples": [
               "She is intelligent.",
               "He gave an intelligent answer.",
               "The intelligent student won."
            ]
         },
         {
            "id": 47,
            "word": "international",
            "role": "adjective",
            "BrE": "/ˌɪntəˈnæʃnəl/",
            "AmE": "/ˌɪntərˈnæʃnəl/",
            "definition": "involving more than one country",
            "examples": [
               "It’s an international event.",
               "She works for an international firm.",
               "The international team won."
            ]
         },
         {
            "id": 47,
            "word": "internet",
            "role": "noun",
            "BrE": "/ˈɪntənet/",
            "AmE": "/ˈɪntərnet/",
            "definition": "a global computer network",
            "examples": [
               "I use the internet.",
               "She found it on the internet.",
               "The internet is very useful."
            ]
         },
         {
            "id": 48,
            "word": "interview",
            "role": "noun",
            "BrE": "/ˈɪntəvjuː/",
            "AmE": "/ˈɪntərvjuː/",
            "definition": "a formal meeting to ask questions",
            "examples": [
               "I have an interview.",
               "She prepared for the interview.",
               "The job interview went well."
            ]
         },
         {
            "id": 48,
            "word": "interview",
            "role": "verb",
            "BrE": "/ˈɪntəvjuː/",
            "AmE": "/ˈɪntərvjuː/",
            "definition": "to ask someone questions formally",
            "examples": [
               "They will interview me.",
               "She interviewed the singer.",
               "He was interviewed for the job."
            ]
         },
         {
            "id": 48,
            "word": "introduce",
            "role": "verb",
            "BrE": "/ˌɪntrəˈdjuːs/",
            "AmE": "/ˌɪntrəˈduːs/",
            "definition": "to present someone or something",
            "examples": [
               "Introduce your friend.",
               "She introduced her brother.",
               "He introduced a new idea."
            ]
         },
         {
            "id": 48,
            "word": "introduction",
            "role": "noun",
            "BrE": "/ˌɪntrəˈdʌkʃn/",
            "AmE": "/ˌɪntrəˈdʌkʃn/",
            "definition": "the act of presenting something or someone",
            "examples": [
               "The introduction was short.",
               "She gave an introduction to the book.",
               "His introduction of the guest was kind."
            ]
         },
         {
            "id": 48,
            "word": "invent",
            "role": "verb",
            "BrE": "/ɪnˈvent/",
            "AmE": "/ɪnˈvent/",
            "definition": "to create something new",
            "examples": [
               "He invented a game.",
               "She invented a new tool.",
               "They invented a faster machine."
            ]
         },
         {
            "id": 48,
            "word": "invention",
            "role": "noun",
            "BrE": "/ɪnˈvenʃn/",
            "AmE": "/ɪnˈvenʃn/",
            "definition": "something created for the first time",
            "examples": [
               "The invention is useful.",
               "Her invention won a prize.",
               "The invention changed our lives."
            ]
         },
         {
            "id": 48,
            "word": "invitation",
            "role": "noun",
            "BrE": "/ˌɪnvɪˈteɪʃn/",
            "AmE": "/ˌɪnvɪˈteɪʃn/",
            "definition": "a request to join an event",
            "examples": [
               "I got an invitation.",
               "She sent an invitation to the party.",
               "The invitation was for dinner."
            ]
         },
         {
            "id": 48,
            "word": "invite",
            "role": "verb",
            "BrE": "/ɪnˈvaɪt/",
            "AmE": "/ɪnˈvaɪt/",
            "definition": "to ask someone to come to an event",
            "examples": [
               "Invite your friend.",
               "She invited me to her house.",
               "He invited them to the wedding."
            ]
         },
         {
            "id": 48,
            "word": "involve",
            "role": "verb",
            "BrE": "/ɪnˈvɒlv/",
            "AmE": "/ɪnˈvɑːlv/",
            "definition": "to include someone or something",
            "examples": [
               "Involve me in the plan.",
               "She involved her team in the project.",
               "The game involves two players."
            ]
         },
         {
            "id": 48,
            "word": "island",
            "role": "noun",
            "BrE": "/ˈaɪlənd/",
            "AmE": "/ˈaɪlənd/",
            "definition": "a piece of land surrounded by water",
            "examples": [
               "The island is small.",
               "She visited a tropical island.",
               "The island has beautiful beaches."
            ]
         },
         {
            "id": 48,
            "word": "item",
            "role": "noun",
            "BrE": "/ˈaɪtəm/",
            "AmE": "/ˈaɪtəm/",
            "definition": "a single thing in a list or group",
            "examples": [
               "I bought an item.",
               "She checked each item on the list.",
               "The item was missing from the bag."
            ]
         },
         {
            "id": 48,
            "word": "jacket",
            "role": "noun",
            "BrE": "/ˈdʒækɪt/",
            "AmE": "/ˈdʒækɪt/",
            "definition": "a short coat",
            "examples": [
               "My jacket is blue.",
               "She wore a warm jacket.",
               "The jacket has a big pocket."
            ]
         },
         {
            "id": 48,
            "word": "jeans",
            "role": "noun",
            "BrE": "/dʒiːnz/",
            "AmE": "/dʒiːnz/",
            "definition": "casual trousers made of denim",
            "examples": [
               "I wear jeans.",
               "She bought new jeans.",
               "The jeans are comfortable."
            ]
         },
         {
            "id": 49,
            "word": "jewellery",
            "role": "noun",
            "BrE": "/ˈdʒuːəlri/",
            "AmE": "/ˈdʒuːəlri/",
            "definition": "decorative objects like rings or necklaces",
            "examples": [
               "Her jewellery is shiny.",
               "She wears jewellery every day.",
               "The jewellery was a gift."
            ]
         },
         {
            "id": 49,
            "word": "job",
            "role": "noun",
            "BrE": "/dʒɒb/",
            "AmE": "/dʒɑːb/",
            "definition": "work that you are paid for",
            "examples": [
               "I have a job.",
               "She found a new job.",
               "His job is at the bank."
            ]
         },
         {
            "id": 49,
            "word": "join",
            "role": "verb",
            "BrE": "/dʒɔɪn/",
            "AmE": "/dʒɔɪn/",
            "definition": "to become part of a group",
            "examples": [
               "Join the team.",
               "She joined the club.",
               "He joined the class late."
            ]
         },
         {
            "id": 49,
            "word": "joke",
            "role": "noun",
            "BrE": "/dʒəʊk/",
            "AmE": "/dʒoʊk/",
            "definition": "something said to make people laugh",
            "examples": [
               "Tell me a joke.",
               "His joke was funny.",
               "She laughed at the joke."
            ]
         },
         {
            "id": 49,
            "word": "journey",
            "role": "noun",
            "BrE": "/ˈdʒɜːni/",
            "AmE": "/ˈdʒɜːrni/",
            "definition": "a trip from one place to another",
            "examples": [
               "The journey was long.",
               "She enjoyed her journey.",
               "The journey took three hours."
            ]
         },
         {
            "id": 49,
            "word": "jump",
            "role": "noun",
            "BrE": "/dʒʌmp/",
            "AmE": "/dʒʌmp/",
            "definition": "an act of moving off the ground",
            "examples": [
               "His jump was high.",
               "She made a big jump.",
               "The jump over the wall was hard."
            ]
         },
         {
            "id": 49,
            "word": "jump",
            "role": "verb",
            "BrE": "/dʒʌmp/",
            "AmE": "/dʒʌmp/",
            "definition": "to move quickly off the ground",
            "examples": [
               "Jump over the rope.",
               "She jumped into the pool.",
               "He jumped to catch the ball."
            ]
         },
         {
            "id": 49,
            "word": "key",
            "role": "noun",
            "BrE": "/kiː/",
            "AmE": "/kiː/",
            "definition": "a metal object used to open a lock",
            "examples": [
               "I lost my key.",
               "She found the car key.",
               "The key opened the door."
            ]
         },
         {
            "id": 49,
            "word": "keyboard",
            "role": "noun",
            "BrE": "/ˈkiːbɔːd/",
            "AmE": "/ˈkiːbɔːrd/",
            "definition": "the part of a computer for typing",
            "examples": [
               "The keyboard is new.",
               "She typed on the keyboard.",
               "The keyboard has many buttons."
            ]
         },
         {
            "id": 49,
            "word": "kick",
            "role": "noun",
            "BrE": "/kɪk/",
            "AmE": "/kɪk/",
            "definition": "an act of hitting with the foot",
            "examples": [
               "His kick was strong.",
               "She gave the ball a kick.",
               "The kick scored a goal."
            ]
         },
         {
            "id": 50,
            "word": "kick",
            "role": "verb",
            "BrE": "/kɪk/",
            "AmE": "/kɪk/",
            "definition": "to hit something with your foot",
            "examples": [
               "Kick the ball.",
               "She kicked the door open.",
               "He kicked the stone away."
            ]
         },
         {
            "id": 50,
            "word": "kid",
            "role": "noun",
            "BrE": "/kɪd/",
            "AmE": "/kɪd/",
            "definition": "a child (informal)",
            "examples": [
               "The kid is playing.",
               "She helped the kid with homework.",
               "The kid laughed at the joke."
            ]
         },
         {
            "id": 50,
            "word": "kill",
            "role": "verb",
            "BrE": "/kɪl/",
            "AmE": "/kɪl/",
            "definition": "to cause something to die",
            "examples": [
               "Don’t kill the plant.",
               "She killed a spider.",
               "He killed the bug on the wall."
            ]
         },
         {
            "id": 50,
            "word": "kind",
            "role": "adjective",
            "BrE": "/kaɪnd/",
            "AmE": "/kaɪnd/",
            "definition": "friendly and helpful",
            "examples": [
               "She is very kind.",
               "He was kind to the dog.",
               "Her kind words helped me."
            ]
         },
         {
            "id": 50,
            "word": "kind",
            "role": "noun",
            "BrE": "/kaɪnd/",
            "AmE": "/kaɪnd/",
            "definition": "a type or sort of something",
            "examples": [
               "What kind of food?",
               "She likes this kind of music.",
               "He bought a new kind of phone."
            ]
         },
         {
            "id": 50,
            "word": "king",
            "role": "noun",
            "BrE": "/kɪŋ/",
            "AmE": "/kɪŋ/",
            "definition": "a male ruler of a country",
            "examples": [
               "The king is old.",
               "She read about a king.",
               "The king lived in a castle."
            ]
         },
         {
            "id": 50,
            "word": "kiss",
            "role": "noun",
            "BrE": "/kɪs/",
            "AmE": "/kɪs/",
            "definition": "a touch with the lips",
            "examples": [
               "She gave a kiss.",
               "He got a kiss from her.",
               "The kiss was a surprise."
            ]
         },
         {
            "id": 50,
            "word": "kiss",
            "role": "verb",
            "BrE": "/kɪs/",
            "AmE": "/kɪs/",
            "definition": "to touch someone with your lips",
            "examples": [
               "Kiss your mom.",
               "She kissed her friend goodbye.",
               "He kissed her on the cheek."
            ]
         },
         {
            "id": 50,
            "word": "kitchen",
            "role": "noun",
            "BrE": "/ˈkɪtʃɪn/",
            "AmE": "/ˈkɪtʃɪn/",
            "definition": "a room for cooking",
            "examples": [
               "The kitchen is clean.",
               "She cooked in the kitchen.",
               "The kitchen has a big table."
            ]
         },
         {
            "id": 50,
            "word": "knee",
            "role": "noun",
            "BrE": "/niː/",
            "AmE": "/niː/",
            "definition": "the joint in the middle of the leg",
            "examples": [
               "My knee hurts.",
               "She fell on her knee.",
               "The knee was swollen after running."
            ]
         },
         {
            "id": 51,
            "word": "knife",
            "role": "noun",
            "BrE": "/naɪf/",
            "AmE": "/naɪf/",
            "definition": "a sharp tool for cutting",
            "examples": [
               "I need a knife.",
               "She cut bread with a knife.",
               "The knife is in the kitchen."
            ]
         },
         {
            "id": 51,
            "word": "knock",
            "role": "noun",
            "BrE": "/nɒk/",
            "AmE": "/nɑːk/",
            "definition": "the sound of hitting a door",
            "examples": [
               "I heard a knock.",
               "She gave a loud knock.",
               "The knock woke him up."
            ]
         },
         {
            "id": 51,
            "word": "knock",
            "role": "verb",
            "BrE": "/nɒk/",
            "AmE": "/nɑːk/",
            "definition": "to hit something to make a sound",
            "examples": [
               "Knock on the door.",
               "She knocked on the wall.",
               "He knocked before entering."
            ]
         },
         {
            "id": 51,
            "word": "knowledge",
            "role": "noun",
            "BrE": "/ˈnɒlɪdʒ/",
            "AmE": "/ˈnɑːlɪdʒ/",
            "definition": "information or understanding",
            "examples": [
               "I have some knowledge.",
               "She has knowledge of history.",
               "His knowledge helped the team."
            ]
         },
         {
            "id": 51,
            "word": "lake",
            "role": "noun",
            "BrE": "/leɪk/",
            "AmE": "/leɪk/",
            "definition": "a large area of water surrounded by land",
            "examples": [
               "The lake is big.",
               "She swam in the lake.",
               "The lake has many fish."
            ]
         },
         {
            "id": 51,
            "word": "lamp",
            "role": "noun",
            "BrE": "/læmp/",
            "AmE": "/læmp/",
            "definition": "a device that produces light",
            "examples": [
               "The lamp is bright.",
               "She turned on the lamp.",
               "The lamp is on the table."
            ]
         },
         {
            "id": 51,
            "word": "land",
            "role": "noun",
            "BrE": "/lænd/",
            "AmE": "/lænd/",
            "definition": "the surface of the earth not covered by water",
            "examples": [
               "The land is green.",
               "She bought some land.",
               "The land is good for farming."
            ]
         },
         {
            "id": 51,
            "word": "land",
            "role": "verb",
            "BrE": "/lænd/",
            "AmE": "/lænd/",
            "definition": "to arrive on the ground",
            "examples": [
               "The plane will land.",
               "She landed safely.",
               "He landed the helicopter."
            ]
         },
         {
            "id": 51,
            "word": "language",
            "role": "noun",
            "BrE": "/ˈlæŋɡwɪdʒ/",
            "AmE": "/ˈlæŋɡwɪdʒ/",
            "definition": "a system of communication using words",
            "examples": [
               "I learn a language.",
               "She speaks two languages.",
               "The language class is fun."
            ]
         },
         {
            "id": 51,
            "word": "large",
            "role": "adjective",
            "BrE": "/lɑːdʒ/",
            "AmE": "/lɑːrdʒ/",
            "definition": "big in size or amount",
            "examples": [
               "The room is large.",
               "She has a large bag.",
               "The large dog ran fast."
            ]
         },
         {
            "id": 52,
            "word": "last",
            "role": "determiner",
            "BrE": "/lɑːst/",
            "AmE": "/læst/",
            "definition": "the most recent or final",
            "examples": [
               "Last week was busy.",
               "She saw him last night.",
               "The last bus left early."
            ]
         },
         {
            "id": 52,
            "word": "late",
            "role": "adverb",
            "BrE": "/leɪt/",
            "AmE": "/leɪt/",
            "definition": "after the expected time",
            "examples": [
               "I arrived late.",
               "She stayed late at school.",
               "He worked late yesterday."
            ]
         },
         {
            "id": 52,
            "word": "laugh",
            "role": "noun",
            "BrE": "/lɑːf/",
            "AmE": "/læf/",
            "definition": "the sound of laughing",
            "examples": [
               "Her laugh is loud.",
               "I heard a funny laugh.",
               "The laugh came from the room."
            ]
         },
         {
            "id": 52,
            "word": "law",
            "role": "noun",
            "BrE": "/lɔː/",
            "AmE": "/lɔː/",
            "definition": "a rule made by a government",
            "examples": [
               "The law is strict.",
               "She follows the law.",
               "The new law helps people."
            ]
         },
         {
            "id": 52,
            "word": "lawyer",
            "role": "noun",
            "BrE": "/ˈlɔɪə(r)/",
            "AmE": "/ˈlɔɪər/",
            "definition": "a person who works with laws",
            "examples": [
               "The lawyer is busy.",
               "She hired a lawyer.",
               "The lawyer helped with the case."
            ]
         },
         {
            "id": 52,
            "word": "lazy",
            "role": "adjective",
            "BrE": "/ˈleɪzi/",
            "AmE": "/ˈleɪzi/",
            "definition": "not wanting to work hard",
            "examples": [
               "He is very lazy.",
               "She felt lazy today.",
               "The lazy student didn’t study."
            ]
         },
         {
            "id": 52,
            "word": "lead",
            "role": "noun",
            "BrE": "/liːd/",
            "AmE": "/liːd/",
            "definition": "the position of being in front",
            "examples": [
               "She took the lead.",
               "He has the lead in the race.",
               "The lead in the game was hers."
            ]
         },
         {
            "id": 52,
            "word": "lead",
            "role": "verb",
            "BrE": "/liːd/",
            "AmE": "/liːd/",
            "definition": "to guide or show the way",
            "examples": [
               "Lead the way.",
               "She led the team to victory.",
               "He leads the group every day."
            ]
         },
         {
            "id": 52,
            "word": "leader",
            "role": "noun",
            "BrE": "/ˈliːdə(r)/",
            "AmE": "/ˈliːdər/",
            "definition": "a person who leads",
            "examples": [
               "She is a leader.",
               "The leader spoke clearly.",
               "He’s the leader of the club."
            ]
         },
         {
            "id": 52,
            "word": "leaf",
            "role": "noun",
            "BrE": "/liːf/",
            "AmE": "/liːf/",
            "definition": "a flat green part of a plant",
            "examples": [
               "The leaf is green.",
               "She picked a leaf from the tree.",
               "The leaf fell in autumn."
            ]
         },
         {
            "id": 53,
            "word": "learn",
            "role": "verb",
            "BrE": "/lɜːn/",
            "AmE": "/lɜːrn/",
            "definition": "to gain knowledge or a skill",
            "examples": [
               "I learn English.",
               "She learned to swim.",
               "He learned about animals."
            ]
         },
         {
            "id": 53,
            "word": "least",
            "role": "adverb",
            "BrE": "/liːst/",
            "AmE": "/liːst/",
            "definition": "to the smallest degree",
            "examples": [
               "I like it least.",
               "She talks the least in class.",
               "He was the least tired."
            ]
         },
         {
            "id": 53,
            "word": "leather",
            "role": "noun",
            "BrE": "/ˈleðə(r)/",
            "AmE": "/ˈleðər/",
            "definition": "material made from animal skin",
            "examples": [
               "The bag is leather.",
               "She wore a leather jacket.",
               "The leather shoes are new."
            ]
         },
         {
            "id": 53,
            "word": "leave",
            "role": "noun",
            "BrE": "/liːv/",
            "AmE": "/liːv/",
            "definition": "time away from work",
            "examples": [
               "She’s on leave.",
               "He took leave for a week.",
               "Her leave starts tomorrow."
            ]
         },
         {
            "id": 53,
            "word": "lecture",
            "role": "noun",
            "BrE": "/ˈlektʃə(r)/",
            "AmE": "/ˈlektʃər/",
            "definition": "a talk to teach something",
            "examples": [
               "The lecture was long.",
               "She attended a lecture.",
               "The lecture was about science."
            ]
         },
         {
            "id": 53,
            "word": "left",
            "role": "noun",
            "BrE": "/left/",
            "AmE": "/left/",
            "definition": "the side opposite to right",
            "examples": [
               "Turn to the left.",
               "She held it in her left hand.",
               "The left side is blocked."
            ]
         },
         {
            "id": 53,
            "word": "leg",
            "role": "noun",
            "BrE": "/leɡ/",
            "AmE": "/leɡ/",
            "definition": "a part of the body used for walking",
            "examples": [
               "My leg hurts.",
               "She broke her leg.",
               "The dog’s leg is strong."
            ]
         },
         {
            "id": 53,
            "word": "legal",
            "role": "adjective",
            "BrE": "/ˈliːɡl/",
            "AmE": "/ˈliːɡl/",
            "definition": "allowed by the law",
            "examples": [
               "It’s a legal rule.",
               "She has a legal document.",
               "The legal age to drive is 17."
            ]
         },
         {
            "id": 53,
            "word": "leisure",
            "role": "noun",
            "BrE": "/ˈleʒə(r)/",
            "AmE": "/ˈliːʒər/",
            "definition": "free time for enjoyment",
            "examples": [
               "I enjoy leisure.",
               "She reads in her leisure time.",
               "Leisure activities are fun."
            ]
         },
         {
            "id": 53,
            "word": "lend",
            "role": "verb",
            "BrE": "/lend/",
            "AmE": "/lend/",
            "definition": "to give something temporarily",
            "examples": [
               "Lend me a pen.",
               "She lent her book to him.",
               "He lends money to friends."
            ]
         },
         {
            "id": 54,
            "word": "length",
            "role": "noun",
            "BrE": "/leŋθ/",
            "AmE": "/leŋθ/",
            "definition": "the measurement of something long",
            "examples": [
               "The length is short.",
               "She measured the length of the table.",
               "The length of the road is 5 miles."
            ]
         },
         {
            "id": 54,
            "word": "less",
            "role": "adverb",
            "BrE": "/les/",
            "AmE": "/les/",
            "definition": "to a smaller degree",
            "examples": [
               "I eat less now.",
               "She talks less than him.",
               "He works less on weekends."
            ]
         },
         {
            "id": 54,
            "word": "lesson",
            "role": "noun",
            "BrE": "/ˈlesn/",
            "AmE": "/ˈlesn/",
            "definition": "a period of learning or teaching",
            "examples": [
               "The lesson was fun.",
               "She had a piano lesson.",
               "The lesson helped her learn."
            ]
         },
         {
            "id": 54,
            "word": "letter",
            "role": "noun",
            "BrE": "/ˈletə(r)/",
            "AmE": "/ˈletər/",
            "definition": "a written message",
            "examples": [
               "I wrote a letter.",
               "She sent a letter to her friend.",
               "The letter arrived yesterday."
            ]
         },
         {
            "id": 54,
            "word": "level",
            "role": "noun",
            "BrE": "/ˈlevl/",
            "AmE": "/ˈlevl/",
            "definition": "a position or stage",
            "examples": [
               "The level is high.",
               "She reached a new level.",
               "The game has many levels."
            ]
         },
         {
            "id": 54,
            "word": "library",
            "role": "noun",
            "BrE": "/ˈlaɪbrəri/",
            "AmE": "/ˈlaɪbreri/",
            "definition": "a place with books to read or borrow",
            "examples": [
               "The library is quiet.",
               "She studies in the library.",
               "The library has many books."
            ]
         },
         {
            "id": 54,
            "word": "lie",
            "role": "noun",
            "BrE": "/laɪ/",
            "AmE": "/laɪ/",
            "definition": "a statement that is not true",
            "examples": [
               "Don’t tell a lie.",
               "She knew it was a lie.",
               "The lie caused problems."
            ]
         },
         {
            "id": 54,
            "word": "lie",
            "role": "verb",
            "BrE": "/laɪ/",
            "AmE": "/laɪ/",
            "definition": "to say something not true",
            "examples": [
               "Don’t lie to me.",
               "She lied about her age.",
               "He lied to his teacher."
            ]
         },
         {
            "id": 54,
            "word": "lift",
            "role": "noun",
            "BrE": "/lɪft/",
            "AmE": "/lɪft/",
            "definition": "a machine that carries people up or down",
            "examples": [
               "Take the lift.",
               "She used the lift to go up.",
               "The lift is out of order."
            ]
         },
         {
            "id": 54,
            "word": "lift",
            "role": "verb",
            "BrE": "/lɪft/",
            "AmE": "/lɪft/",
            "definition": "to raise something",
            "examples": [
               "Lift the box.",
               "She lifted her bag.",
               "He lifted the heavy chair."
            ]
         },
         {
            "id": 55,
            "word": "light",
            "role": "adjective",
            "BrE": "/laɪt/",
            "AmE": "/laɪt/",
            "definition": "not heavy",
            "examples": [
               "The bag is light.",
               "She carried a light box.",
               "The light jacket is comfortable."
            ]
         },
         {
            "id": 55,
            "word": "light",
            "role": "verb",
            "BrE": "/laɪt/",
            "AmE": "/laɪt/",
            "definition": "to start something burning",
            "examples": [
               "Light the candle.",
               "She lit the fire.",
               "He lit the lamp at night."
            ]
         },
         {
            "id": 55,
            "word": "likely",
            "role": "adjective",
            "BrE": "/ˈlaɪkli/",
            "AmE": "/ˈlaɪkli/",
            "definition": "probably going to happen",
            "examples": [
               "It’s likely to rain.",
               "She’s likely to win.",
               "He’s likely to come late."
            ]
         },
         {
            "id": 55,
            "word": "limit",
            "role": "noun",
            "BrE": "/ˈlɪmɪt/",
            "AmE": "/ˈlɪmɪt/",
            "definition": "a point that cannot be passed",
            "examples": [
               "There’s a speed limit.",
               "She reached her limit.",
               "The limit of the class is 20."
            ]
         },
         {
            "id": 55,
            "word": "line",
            "role": "noun",
            "BrE": "/laɪn/",
            "AmE": "/laɪn/",
            "definition": "a long, thin mark",
            "examples": [
               "Draw a line.",
               "She stood in a line.",
               "The line on the paper is straight."
            ]
         },
         {
            "id": 55,
            "word": "link",
            "role": "noun",
            "BrE": "/lɪŋk/",
            "AmE": "/lɪŋk/",
            "definition": "a connection between things",
            "examples": [
               "There’s a link.",
               "She found a link to the site.",
               "The link between them is strong."
            ]
         },
         {
            "id": 55,
            "word": "link",
            "role": "verb",
            "BrE": "/lɪŋk/",
            "AmE": "/lɪŋk/",
            "definition": "to connect things",
            "examples": [
               "Link the pages.",
               "She linked the ideas.",
               "He linked the computer to the printer."
            ]
         },
         {
            "id": 55,
            "word": "liquid",
            "role": "noun",
            "BrE": "/ˈlɪkwɪd/",
            "AmE": "/ˈlɪkwɪd/",
            "definition": "a substance that flows, like water",
            "examples": [
               "Water is a liquid.",
               "She spilled the liquid.",
               "The liquid in the bottle is juice."
            ]
         },
         {
            "id": 55,
            "word": "list",
            "role": "noun",
            "BrE": "/lɪst/",
            "AmE": "/lɪst/",
            "definition": "a series of items written down",
            "examples": [
               "I made a list.",
               "She checked her shopping list.",
               "The list has ten names."
            ]
         },
         {
            "id": 55,
            "word": "list",
            "role": "verb",
            "BrE": "/lɪst/",
            "AmE": "/lɪst/",
            "definition": "to write items in order",
            "examples": [
               "List the names.",
               "She listed her favorite books.",
               "He listed the things to buy."
            ]
         },
         {
            "id": 56,
            "word": "listen",
            "role": "verb",
            "BrE": "/ˈlɪsn/",
            "AmE": "/ˈlɪsn/",
            "definition": "to pay attention to sounds",
            "examples": [
               "Listen to the music.",
               "She listened to the teacher.",
               "He listens to the radio daily."
            ]
         },
         {
            "id": 56,
            "word": "literature",
            "role": "noun",
            "BrE": "/ˈlɪtrətʃə(r)/",
            "AmE": "/ˈlɪtərətʃər/",
            "definition": "books and writings, especially of high quality",
            "examples": [
               "I study literature.",
               "She loves reading literature.",
               "The literature class was interesting."
            ]
         },
         {
            "id": 56,
            "word": "live",
            "role": "adjective",
            "BrE": "/laɪv/",
            "AmE": "/laɪv/",
            "definition": "happening now, not recorded",
            "examples": [
               "It’s a live show.",
               "She watched a live concert.",
               "The live broadcast was exciting."
            ]
         },
         {
            "id": 56,
            "word": "local",
            "role": "adjective",
            "BrE": "/ˈləʊkl/",
            "AmE": "/ˈloʊkl/",
            "definition": "relating to a nearby area",
            "examples": [
               "The local shop is open.",
               "She reads the local news.",
               "He joined the local team."
            ]
         },
         {
            "id": 56,
            "word": "lock",
            "role": "noun",
            "BrE": "/lɒk/",
            "AmE": "/lɑːk/",
            "definition": "a device to keep something closed",
            "examples": [
               "The lock is strong.",
               "She broke the lock.",
               "The lock on the door is new."
            ]
         },
         {
            "id": 56,
            "word": "lock",
            "role": "verb",
            "BrE": "/lɒk/",
            "AmE": "/lɑːk/",
            "definition": "to close something with a key",
            "examples": [
               "Lock the door.",
               "She locked her bike.",
               "He locked the box safely."
            ]
         },
         {
            "id": 56,
            "word": "lonely",
            "role": "adjective",
            "BrE": "/ˈləʊnli/",
            "AmE": "/ˈloʊnli/",
            "definition": "sad because alone",
            "examples": [
               "She feels lonely.",
               "He was lonely without friends.",
               "The lonely dog waited for her."
            ]
         },
         {
            "id": 56,
            "word": "long",
            "role": "adverb",
            "BrE": "/lɒŋ/",
            "AmE": "/lɔːŋ/",
            "definition": "for a large amount of time",
            "examples": [
               "I waited long.",
               "She studied for long hours.",
               "He hasn’t been here long."
            ]
         },
         {
            "id": 56,
            "word": "look",
            "role": "noun",
            "BrE": "/lʊk/",
            "AmE": "/lʊk/",
            "definition": "an act of looking",
            "examples": [
               "Take a look.",
               "She gave him a quick look.",
               "The look on her face was sad."
            ]
         },
         {
            "id": 56,
            "word": "loose",
            "role": "adjective",
            "BrE": "/luːs/",
            "AmE": "/luːs/",
            "definition": "not tight or fixed",
            "examples": [
               "The shirt is loose.",
               "She wore loose clothes.",
               "The loose screw fell out."
            ]
         },
         {
            "id": 57,
            "word": "lorry",
            "role": "noun",
            "BrE": "/ˈlɒri/",
            "AmE": "/ˈlɔːri/",
            "definition": "a large vehicle for carrying goods",
            "examples": [
               "The lorry is big.",
               "She saw a lorry on the road.",
               "The lorry carried heavy boxes."
            ]
         },
         {
            "id": 57,
            "word": "lose",
            "role": "verb",
            "BrE": "/luːz/",
            "AmE": "/luːz/",
            "definition": "to not be able to find something",
            "examples": [
               "I lost my keys.",
               "She lost her phone.",
               "He lost his bag at school."
            ]
         },
         {
            "id": 57,
            "word": "loss",
            "role": "noun",
            "BrE": "/lɒs/",
            "AmE": "/lɔːs/",
            "definition": "the act of losing something",
            "examples": [
               "The loss was sad.",
               "She felt the loss of her pet.",
               "The loss of money hurt him."
            ]
         },
         {
            "id": 57,
            "word": "lot",
            "role": "noun",
            "BrE": "/lɒt/",
            "AmE": "/lɑːt/",
            "definition": "a large number or amount",
            "examples": [
               "I have a lot.",
               "She bought a lot of books.",
               "A lot of people came."
            ]
         },
         {
            "id": 57,
            "word": "loud",
            "role": "adjective",
            "BrE": "/laʊd/",
            "AmE": "/laʊd/",
            "definition": "making a lot of noise",
            "examples": [
               "The music is loud.",
               "She has a loud voice.",
               "The loud noise woke him."
            ]
         },
         {
            "id": 57,
            "word": "love",
            "role": "noun",
            "BrE": "/lʌv/",
            "AmE": "/lʌv/",
            "definition": "a strong feeling of affection",
            "examples": [
               "Love is important.",
               "She feels love for her family.",
               "His love for music is strong."
            ]
         },
         {
            "id": 57,
            "word": "lovely",
            "role": "adjective",
            "BrE": "/ˈlʌvli/",
            "AmE": "/ˈlʌvli/",
            "definition": "beautiful or attractive",
            "examples": [
               "It’s a lovely day.",
               "She has a lovely smile.",
               "The lovely flowers bloomed."
            ]
         },
         {
            "id": 57,
            "word": "low",
            "role": "adjective",
            "BrE": "/ləʊ/",
            "AmE": "/loʊ/",
            "definition": "not high or tall",
            "examples": [
               "The wall is low.",
               "She spoke in a low voice.",
               "The low table was small."
            ]
         },
         {
            "id": 57,
            "word": "luck",
            "role": "noun",
            "BrE": "/lʌk/",
            "AmE": "/lʌk/",
            "definition": "good or bad things that happen by chance",
            "examples": [
               "I had good luck.",
               "She wished him luck.",
               "His luck changed yesterday."
            ]
         },
         {
            "id": 57,
            "word": "lucky",
            "role": "adjective",
            "BrE": "/ˈlʌki/",
            "AmE": "/ˈlʌki/",
            "definition": "having good luck",
            "examples": [
               "I’m lucky today.",
               "She was lucky to win.",
               "The lucky ticket got a prize."
            ]
         },
         {
            "id": 58,
            "word": "luggage",
            "role": "noun",
            "BrE": "/ˈlʌɡɪdʒ/",
            "AmE": "/ˈlʌɡɪdʒ/",
            "definition": "bags used for travelling",
            "examples": [
               "My luggage is heavy.",
               "She lost her luggage.",
               "The luggage is in the car."
            ]
         },
         {
            "id": 58,
            "word": "lunch",
            "role": "noun",
            "BrE": "/lʌntʃ/",
            "AmE": "/lʌntʃ/",
            "definition": "a meal eaten in the middle of the day",
            "examples": [
               "I ate lunch.",
               "She packed a lunch for school.",
               "Lunch was a sandwich and juice."
            ]
         },
         {
            "id": 58,
            "word": "machine",
            "role": "noun",
            "BrE": "/məˈʃiːn/",
            "AmE": "/məˈʃiːn/",
            "definition": "a device with moving parts",
            "examples": [
               "The machine is loud.",
               "She used a washing machine.",
               "The machine broke down."
            ]
         },
         {
            "id": 58,
            "word": "magazine",
            "role": "noun",
            "BrE": "/ˌmæɡəˈziːn/",
            "AmE": "/ˌmæɡəˈziːn/",
            "definition": "a publication with articles and pictures",
            "examples": [
               "I read a magazine.",
               "She bought a fashion magazine.",
               "The magazine has new stories."
            ]
         },
         {
            "id": 58,
            "word": "mail",
            "role": "noun",
            "BrE": "/meɪl/",
            "AmE": "/meɪl/",
            "definition": "letters and packages sent by post",
            "examples": [
               "I got mail today.",
               "She checked her mail.",
               "The mail arrived late."
            ]
         },
         {
            "id": 58,
            "word": "mail",
            "role": "verb",
            "BrE": "/meɪl/",
            "AmE": "/meɪl/",
            "definition": "to send something by post",
            "examples": [
               "Mail the letter.",
               "She mailed a package.",
               "He mailed the card yesterday."
            ]
         },
         {
            "id": 58,
            "word": "main",
            "role": "adjective",
            "BrE": "/meɪn/",
            "AmE": "/meɪn/",
            "definition": "most important",
            "examples": [
               "The main road is busy.",
               "She explained the main idea.",
               "The main dish was chicken."
            ]
         },
         {
            "id": 58,
            "word": "mainly",
            "role": "adverb",
            "BrE": "/ˈmeɪnli/",
            "AmE": "/ˈmeɪnli/",
            "definition": "mostly or primarily",
            "examples": [
               "It’s mainly sunny.",
               "She works mainly at home.",
               "The book is mainly about animals."
            ]
         },
         {
            "id": 58,
            "word": "major",
            "role": "adjective",
            "BrE": "/ˈmeɪdʒə(r)/",
            "AmE": "/ˈmeɪdʒər/",
            "definition": "very important",
            "examples": [
               "It’s a major problem.",
               "She made a major decision.",
               "The major event was fun."
            ]
         },
         {
            "id": 58,
            "word": "make",
            "role": "noun",
            "BrE": "/meɪk/",
            "AmE": "/meɪk/",
            "definition": "a brand or type of product",
            "examples": [
               "What make is your car?",
               "She likes that make of phone.",
               "The make of the watch is famous."
            ]
         },
         {
            "id": 59,
            "word": "male",
            "role": "adjective",
            "BrE": "/meɪl/",
            "AmE": "/meɪl/",
            "definition": "relating to men or boys",
            "examples": [
               "He’s a male student.",
               "The male team played well.",
               "The male doctor was kind."
            ]
         },
         {
            "id": 59,
            "word": "man",
            "role": "noun",
            "BrE": "/mæn/",
            "AmE": "/mæn/",
            "definition": "an adult male person",
            "examples": [
               "The man is tall.",
               "She saw a man in the park.",
               "The man helped with the bags."
            ]
         },
         {
            "id": 59,
            "word": "manage",
            "role": "verb",
            "BrE": "/ˈmænɪdʒ/",
            "AmE": "/ˈmænɪdʒ/",
            "definition": "to control or be in charge of",
            "examples": [
               "She manages the shop.",
               "He managed the project well.",
               "They manage a small team."
            ]
         },
         {
            "id": 59,
            "word": "manager",
            "role": "noun",
            "BrE": "/ˈmænɪdʒə(r)/",
            "AmE": "/ˈmænɪdʒər/",
            "definition": "a person who controls an organization",
            "examples": [
               "The manager is busy.",
               "She spoke to the manager.",
               "The manager hired new staff."
            ]
         },
         {
            "id": 59,
            "word": "manner",
            "role": "noun",
            "BrE": "/ˈmænə(r)/",
            "AmE": "/ˈmænər/",
            "definition": "the way something is done",
            "examples": [
               "Her manner is polite.",
               "He spoke in a kind manner.",
               "The manner of teaching was clear."
            ]
         },
         {
            "id": 59,
            "word": "many",
            "role": "determiner",
            "BrE": "/ˈmeni/",
            "AmE": "/ˈmeni/",
            "definition": "a large number of",
            "examples": [
               "I have many books.",
               "She met many people.",
               "Many students joined the club."
            ]
         },
         {
            "id": 59,
            "word": "map",
            "role": "noun",
            "BrE": "/mæp/",
            "AmE": "/mæp/",
            "definition": "a drawing of an area",
            "examples": [
               "I need a map.",
               "She looked at the map.",
               "The map shows the city."
            ]
         },
         {
            "id": 59,
            "word": "mark",
            "role": "noun",
            "BrE": "/mɑːk/",
            "AmE": "/mɑːrk/",
            "definition": "a score or grade",
            "examples": [
               "I got a high mark.",
               "Her mark was excellent.",
               "The mark on the test was good."
            ]
         },
         {
            "id": 59,
            "word": "mark",
            "role": "verb",
            "BrE": "/mɑːk/",
            "AmE": "/mɑːrk/",
            "definition": "to write or draw on something",
            "examples": [
               "Mark the page.",
               "She marked the map.",
               "He marked his name on the book."
            ]
         },
         {
            "id": 59,
            "word": "market",
            "role": "noun",
            "BrE": "/ˈmɑːkɪt/",
            "AmE": "/ˈmɑːrkɪt/",
            "definition": "a place to buy and sell things",
            "examples": [
               "The market is busy.",
               "She went to the market.",
               "The market sells fresh fruit."
            ]
         },
         {
            "id": 60,
            "word": "marriage",
            "role": "noun",
            "BrE": "/ˈmærɪdʒ/",
            "AmE": "/ˈmærɪdʒ/",
            "definition": "the relationship between married people",
            "examples": [
               "Their marriage is happy.",
               "She celebrated her marriage.",
               "The marriage lasted many years."
            ]
         },
         {
            "id": 60,
            "word": "married",
            "role": "adjective",
            "BrE": "/ˈmærid/",
            "AmE": "/ˈmærid/",
            "definition": "having a husband or wife",
            "examples": [
               "She is married.",
               "He’s a married man.",
               "The married couple moved."
            ]
         },
         {
            "id": 60,
            "word": "match",
            "role": "noun",
            "BrE": "/mætʃ/",
            "AmE": "/mætʃ/",
            "definition": "a sports competition",
            "examples": [
               "The match was exciting.",
               "She watched a football match.",
               "The match ended in a draw."
            ]
         },
         {
            "id": 60,
            "word": "match",
            "role": "verb",
            "BrE": "/mætʃ/",
            "AmE": "/mætʃ/",
            "definition": "to go well with something",
            "examples": [
               "The shoes match the dress.",
               "She matched the colors.",
               "His socks don’t match."
            ]
         },
         {
            "id": 60,
            "word": "material",
            "role": "noun",
            "BrE": "/məˈtɪəriəl/",
            "AmE": "/məˈtɪriəl/",
            "definition": "substance used to make things",
            "examples": [
               "The material is soft.",
               "She chose cotton material.",
               "The material for the dress is silk."
            ]
         },
         {
            "id": 60,
            "word": "matter",
            "role": "noun",
            "BrE": "/ˈmætə(r)/",
            "AmE": "/ˈmætər/",
            "definition": "a subject or situation",
            "examples": [
               "It’s a serious matter.",
               "She discussed the matter.",
               "The matter needs attention."
            ]
         },
         {
            "id": 60,
            "word": "matter",
            "role": "verb",
            "BrE": "/ˈmætə(r)/",
            "AmE": "/ˈmætər/",
            "definition": "to be important",
            "examples": [
               "It doesn’t matter.",
               "She said it matters to her.",
               "His opinion matters a lot."
            ]
         },
         {
            "id": 60,
            "word": "meal",
            "role": "noun",
            "BrE": "/miːl/",
            "AmE": "/miːl/",
            "definition": "food eaten at a specific time",
            "examples": [
               "I ate a meal.",
               "She cooked a big meal.",
               "The meal was delicious."
            ]
         },
         {
            "id": 60,
            "word": "mean",
            "role": "verb",
            "BrE": "/miːn/",
            "AmE": "/miːn/",
            "definition": "to have a particular meaning",
            "examples": [
               "What does it mean?",
               "She explained what it means.",
               "His words meant a lot."
            ]
         },
         {
            "id": 60,
            "word": "meaning",
            "role": "noun",
            "BrE": "/ˈmiːnɪŋ/",
            "AmE": "/ˈmiːnɪŋ/",
            "definition": "what something expresses",
            "examples": [
               "The word has a meaning.",
               "She asked for the meaning.",
               "The meaning of the story was clear."
            ]
         },
         {
            "id": 61,
            "word": "meat",
            "role": "noun",
            "BrE": "/miːt/",
            "AmE": "/miːt/",
            "definition": "the flesh of animals used as food",
            "examples": [
               "I eat meat.",
               "She cooked meat for dinner.",
               "The meat was fresh and tasty."
            ]
         },
         {
            "id": 61,
            "word": "media",
            "role": "noun",
            "BrE": "/ˈmiːdiə/",
            "AmE": "/ˈmiːdiə/",
            "definition": "means of communication, like TV or newspapers",
            "examples": [
               "The media is loud.",
               "She reads media stories.",
               "The media reported the news."
            ]
         },
         {
            "id": 61,
            "word": "medicine",
            "role": "noun",
            "BrE": "/ˈmedɪsn/",
            "AmE": "/ˈmedɪsn/",
            "definition": "a substance used to treat illness",
            "examples": [
               "Take your medicine.",
               "She bought medicine at the shop.",
               "The medicine helped her feel better."
            ]
         },
         {
            "id": 61,
            "word": "meet",
            "role": "verb",
            "BrE": "/miːt/",
            "AmE": "/miːt/",
            "definition": "to come together with someone",
            "examples": [
               "Meet me at school.",
               "She met her friend at the park.",
               "He meets his team every week."
            ]
         },
         {
            "id": 61,
            "word": "meeting",
            "role": "noun",
            "BrE": "/ˈmiːtɪŋ/",
            "AmE": "/ˈmiːtɪŋ/",
            "definition": "an event where people discuss things",
            "examples": [
               "The meeting is today.",
               "She went to a work meeting.",
               "The meeting lasted two hours."
            ]
         },
         {
            "id": 61,
            "word": "member",
            "role": "noun",
            "BrE": "/ˈmembə(r)/",
            "AmE": "/ˈmembər/",
            "definition": "a person who belongs to a group",
            "examples": [
               "I’m a club member.",
               "She is a new team member.",
               "The member helped with the project."
            ]
         },
         {
            "id": 61,
            "word": "memory",
            "role": "noun",
            "BrE": "/ˈmeməri/",
            "AmE": "/ˈmeməri/",
            "definition": "something you remember",
            "examples": [
               "I have a good memory.",
               "She shared a happy memory.",
               "The memory of the trip was fun."
            ]
         },
         {
            "id": 61,
            "word": "menu",
            "role": "noun",
            "BrE": "/ˈmenjuː/",
            "AmE": "/ˈmenjuː/",
            "definition": "a list of food in a restaurant",
            "examples": [
               "Look at the menu.",
               "She chose from the menu.",
               "The menu has pizza and pasta."
            ]
         },
         {
            "id": 61,
            "word": "message",
            "role": "noun",
            "BrE": "/ˈmesɪdʒ/",
            "AmE": "/ˈmesɪdʒ/",
            "definition": "a piece of information sent to someone",
            "examples": [
               "I got a message.",
               "She sent a text message.",
               "The message was about the party."
            ]
         },
         {
            "id": 61,
            "word": "metal",
            "role": "noun",
            "BrE": "/ˈmetl/",
            "AmE": "/ˈmetl/",
            "definition": "a hard, shiny material like iron",
            "examples": [
               "The spoon is metal.",
               "She bought a metal chair.",
               "The metal gate was strong."
            ]
         },
         {
            "id": 62,
            "word": "method",
            "role": "noun",
            "BrE": "/ˈmeθəd/",
            "AmE": "/ˈmeθəd/",
            "definition": "a way of doing something",
            "examples": [
               "This method is easy.",
               "She used a new method.",
               "The method worked well."
            ]
         },
         {
            "id": 62,
            "word": "middle",
            "role": "noun",
            "BrE": "/ˈmɪdl/",
            "AmE": "/ˈmɪdl/",
            "definition": "the central part of something",
            "examples": [
               "Stand in the middle.",
               "She sat in the middle of the room.",
               "The middle of the book is exciting."
            ]
         },
         {
            "id": 62,
            "word": "mile",
            "role": "noun",
            "BrE": "/maɪl/",
            "AmE": "/maɪl/",
            "definition": "a unit of distance",
            "examples": [
               "It’s one mile away.",
               "She ran five miles.",
               "The mile was hard to walk."
            ]
         },
         {
            "id": 62,
            "word": "milk",
            "role": "noun",
            "BrE": "/mɪlk/",
            "AmE": "/mɪlk/",
            "definition": "a white liquid from cows or plants",
            "examples": [
               "I drink milk.",
               "She bought milk at the shop.",
               "The milk is in the fridge."
            ]
         },
         {
            "id": 62,
            "word": "mind",
            "role": "noun",
            "BrE": "/maɪnd/",
            "AmE": "/maɪnd/",
            "definition": "the part of a person that thinks",
            "examples": [
               "My mind is tired.",
               "She changed her mind.",
               "His mind was full of ideas."
            ]
         },
         {
            "id": 62,
            "word": "mind",
            "role": "verb",
            "BrE": "/maɪnd/",
            "AmE": "/maɪnd/",
            "definition": "to care about or object to something",
            "examples": [
               "I don’t mind.",
               "She minds the noise.",
               "He minded waiting for her."
            ]
         },
         {
            "id": 62,
            "word": "minute",
            "role": "noun",
            "BrE": "/ˈmɪnɪt/",
            "AmE": "/ˈmɪnɪt/",
            "definition": "a unit of time, 60 seconds",
            "examples": [
               "Wait a minute.",
               "She was late by a minute.",
               "The meeting lasted ten minutes."
            ]
         },
         {
            "id": 62,
            "word": "mirror",
            "role": "noun",
            "BrE": "/ˈmɪrə(r)/",
            "AmE": "/ˈmɪrər/",
            "definition": "a piece of glass that shows your reflection",
            "examples": [
               "Look in the mirror.",
               "She bought a big mirror.",
               "The mirror is on the wall."
            ]
         },
         {
            "id": 62,
            "word": "miss",
            "role": "noun",
            "BrE": "/mɪs/",
            "AmE": "/mɪs/",
            "definition": "a failure to hit or catch something",
            "examples": [
               "It was a miss.",
               "She had a miss in the game.",
               "The miss cost them a point."
            ]
         },
         {
            "id": 62,
            "word": "miss",
            "role": "verb",
            "BrE": "/mɪs/",
            "AmE": "/mɪs/",
            "definition": "to not see or experience something",
            "examples": [
               "I miss my friend.",
               "She missed the bus.",
               "He missed the last show."
            ]
         },
         {
            "id": 63,
            "word": "mistake",
            "role": "noun",
            "BrE": "/mɪˈsteɪk/",
            "AmE": "/mɪˈsteɪk/",
            "definition": "something done wrong",
            "examples": [
               "I made a mistake.",
               "She found a mistake in the book.",
               "The mistake was easy to fix."
            ]
         },
         {
            "id": 63,
            "word": "mix",
            "role": "verb",
            "BrE": "/mɪks/",
            "AmE": "/mɪks/",
            "definition": "to combine things together",
            "examples": [
               "Mix the colours.",
               "She mixed the cake ingredients.",
               "He mixed water with juice."
            ]
         },
         {
            "id": 63,
            "word": "mixture",
            "role": "noun",
            "BrE": "/ˈmɪkstʃə(r)/",
            "AmE": "/ˈmɪkstʃər/",
            "definition": "a combination of different things",
            "examples": [
               "The mixture is thick.",
               "She made a mixture of fruits.",
               "The mixture tastes good."
            ]
         },
         {
            "id": 63,
            "word": "model",
            "role": "noun",
            "BrE": "/ˈmɒdl/",
            "AmE": "/ˈmɑːdl/",
            "definition": "a small copy or example of something",
            "examples": [
               "The model is a car.",
               "She built a model plane.",
               "The model of the house was small."
            ]
         },
         {
            "id": 63,
            "word": "modern",
            "role": "adjective",
            "BrE": "/ˈmɒdn/",
            "AmE": "/ˈmɑːdərn/",
            "definition": "new and using recent ideas",
            "examples": [
               "The phone is modern.",
               "She lives in a modern house.",
               "The modern design is popular."
            ]
         },
         {
            "id": 63,
            "word": "moment",
            "role": "noun",
            "BrE": "/ˈməʊmənt/",
            "AmE": "/ˈmoʊmənt/",
            "definition": "a very short period of time",
            "examples": [
               "Wait a moment.",
               "She was quiet for a moment.",
               "The moment was special."
            ]
         },
         {
            "id": 63,
            "word": "money",
            "role": "noun",
            "BrE": "/ˈmʌni/",
            "AmE": "/ˈmʌni/",
            "definition": "what you use to buy things",
            "examples": [
               "I need money.",
               "She saved her money.",
               "The money was in her bag."
            ]
         },
         {
            "id": 63,
            "word": "month",
            "role": "noun",
            "BrE": "/mʌnθ/",
            "AmE": "/mʌnθ/",
            "definition": "a period of about four weeks",
            "examples": [
               "This month is busy.",
               "She travels every month.",
               "The month of June is warm."
            ]
         },
         {
            "id": 63,
            "word": "mood",
            "role": "noun",
            "BrE": "/muːd/",
            "AmE": "/muːd/",
            "definition": "the way you feel at a time",
            "examples": [
               "I’m in a good mood.",
               "She was in a bad mood.",
               "His mood changed quickly."
            ]
         },
         {
            "id": 63,
            "word": "moon",
            "role": "noun",
            "BrE": "/muːn/",
            "AmE": "/muːn/",
            "definition": "the large object in the night sky",
            "examples": [
               "The moon is bright.",
               "She saw the full moon.",
               "The moon was high last night."
            ]
         },
         {
            "id": 64,
            "word": "more",
            "role": "adverb",
            "BrE": "/mɔː(r)/",
            "AmE": "/mɔːr/",
            "definition": "a greater amount or degree",
            "examples": [
               "I want more food.",
               "She needs to study more.",
               "He runs more than his friend."
            ]
         },
         {
            "id": 64,
            "word": "morning",
            "role": "noun",
            "BrE": "/ˈmɔːnɪŋ/",
            "AmE": "/ˈmɔːrnɪŋ/",
            "definition": "the early part of the day",
            "examples": [
               "Good morning!",
               "She woke up this morning.",
               "The morning was cold and rainy."
            ]
         },
         {
            "id": 64,
            "word": "most",
            "role": "adverb",
            "BrE": "/məʊst/",
            "AmE": "/moʊst/",
            "definition": "the greatest amount or degree",
            "examples": [
               "She ate the most.",
               "He works most of the time.",
               "Most people like the show."
            ]
         },
         {
            "id": 64,
            "word": "mother",
            "role": "noun",
            "BrE": "/ˈmʌðə(r)/",
            "AmE": "/ˈmʌðər/",
            "definition": "a female parent",
            "examples": [
               "My mother is kind.",
               "She helped her mother cook.",
               "The mother hugged her child."
            ]
         },
         {
            "id": 64,
            "word": "motion",
            "role": "noun",
            "BrE": "/ˈməʊʃn/",
            "AmE": "/ˈmoʊʃn/",
            "definition": "the act of moving",
            "examples": [
               "The motion was fast.",
               "She saw motion in the water.",
               "The motion of the car was smooth."
            ]
         },
         {
            "id": 64,
            "word": "motor",
            "role": "noun",
            "BrE": "/ˈməʊtə(r)/",
            "AmE": "/ˈmoʊtər/",
            "definition": "a machine that produces power",
            "examples": [
               "The motor is loud.",
               "She fixed the motor.",
               "The motor in the car stopped."
            ]
         },
         {
            "id": 64,
            "word": "mountain",
            "role": "noun",
            "BrE": "/ˈmaʊntən/",
            "AmE": "/ˈmaʊntən/",
            "definition": "a very high hill",
            "examples": [
               "The mountain is tall.",
               "She climbed a mountain.",
               "The mountain has snow on top."
            ]
         },
         {
            "id": 64,
            "word": "mouse",
            "role": "noun",
            "BrE": "/maʊs/",
            "AmE": "/maʊs/",
            "definition": "a small animal or a computer device",
            "examples": [
               "The mouse is small.",
               "She saw a mouse in the house.",
               "The computer mouse is broken."
            ]
         },
         {
            "id": 64,
            "word": "mouth",
            "role": "noun",
            "BrE": "/maʊθ/",
            "AmE": "/maʊθ/",
            "definition": "the part of the face for eating and speaking",
            "examples": [
               "Open your mouth.",
               "She covered her mouth.",
               "The mouth of the river is wide."
            ]
         },
         {
            "id": 64,
            "word": "move",
            "role": "noun",
            "BrE": "/muːv/",
            "AmE": "/muːv/",
            "definition": "an act of changing position",
            "examples": [
               "It was a quick move.",
               "She made a move in the game.",
               "The move to the new house was hard."
            ]
         },
         {
            "id": 65,
            "word": "move",
            "role": "verb",
            "BrE": "/muːv/",
            "AmE": "/muːv/",
            "definition": "to change position or place",
            "examples": [
               "Move the chair.",
               "She moved to a new city.",
               "He moved the box to the room."
            ]
         },
         {
            "id": 65,
            "word": "movie",
            "role": "noun",
            "BrE": "/ˈmuːvi/",
            "AmE": "/ˈmuːvi/",
            "definition": "a story shown on a screen",
            "examples": [
               "I watched a movie.",
               "She likes funny movies.",
               "The movie starts at eight."
            ]
         },
         {
            "id": 65,
            "word": "much",
            "role": "adverb",
            "BrE": "/mʌtʃ/",
            "AmE": "/mʌtʃ/",
            "definition": "a large amount",
            "examples": [
               "I don’t eat much.",
               "She talks too much.",
               "He doesn’t have much time."
            ]
         },
         {
            "id": 65,
            "word": "mud",
            "role": "noun",
            "BrE": "/mʌd/",
            "AmE": "/mʌd/",
            "definition": "wet, soft earth",
            "examples": [
               "The mud is sticky.",
               "She stepped in the mud.",
               "The mud covered his shoes."
            ]
         },
         {
            "id": 65,
            "word": "murder",
            "role": "noun",
            "BrE": "/ˈmɜːdə(r)/",
            "AmE": "/ˈmɜːrdər/",
            "definition": "the crime of killing someone",
            "examples": [
               "Murder is a crime.",
               "She read about a murder.",
               "The murder was in the news."
            ]
         },
         {
            "id": 65,
            "word": "museum",
            "role": "noun",
            "BrE": "/mjuˈziːəm/",
            "AmE": "/mjuˈziːəm/",
            "definition": "a place to show historical objects",
            "examples": [
               "The museum is big.",
               "She visited a museum.",
               "The museum has old paintings."
            ]
         },
         {
            "id": 65,
            "word": "music",
            "role": "noun",
            "BrE": "/ˈmjuːzɪk/",
            "AmE": "/ˈmjuːzɪk/",
            "definition": "sounds arranged in a pleasant way",
            "examples": [
               "I love music.",
               "She plays music every day.",
               "The music was loud and fun."
            ]
         },
         {
            "id": 65,
            "word": "musical",
            "role": "adjective",
            "BrE": "/ˈmjuːzɪkl/",
            "AmE": "/ˈmjuːzɪkl/",
            "definition": "relating to music",
            "examples": [
               "It’s a musical show.",
               "She has a musical voice.",
               "The musical event was great."
            ]
         },
         {
            "id": 65,
            "word": "musician",
            "role": "noun",
            "BrE": "/mjuˈzɪʃn/",
            "AmE": "/mjuˈzɪʃn/",
            "definition": "a person who plays or writes music",
            "examples": [
               "The musician is talented.",
               "She met a famous musician.",
               "The musician played the guitar."
            ]
         },
         {
            "id": 65,
            "word": "nail",
            "role": "noun",
            "BrE": "/neɪl/",
            "AmE": "/neɪl/",
            "definition": "a thin piece of metal or part of a finger",
            "examples": [
               "I broke a nail.",
               "She hammered a nail into the wood.",
               "The nail on her finger is long."
            ]
         },
         {
            "id": 66,
            "word": "name",
            "role": "noun",
            "BrE": "/neɪm/",
            "AmE": "/neɪm/",
            "definition": "the word used to call a person or thing",
            "examples": [
               "My name is Anna.",
               "She forgot his name.",
               "The name of the book is fun."
            ]
         },
         {
            "id": 66,
            "word": "narrow",
            "role": "adjective",
            "BrE": "/ˈnærəʊ/",
            "AmE": "/ˈnæroʊ/",
            "definition": "not wide",
            "examples": [
               "The road is narrow.",
               "She walked down a narrow path.",
               "The narrow bridge was old."
            ]
         },
         {
            "id": 66,
            "word": "nation",
            "role": "noun",
            "BrE": "/ˈneɪʃn/",
            "AmE": "/ˈneɪʃn/",
            "definition": "a country and its people",
            "examples": [
               "The nation is big.",
               "She loves her nation.",
               "The nation voted yesterday."
            ]
         },
         {
            "id": 66,
            "word": "national",
            "role": "adjective",
            "BrE": "/ˈnæʃnəl/",
            "AmE": "/ˈnæʃnəl/",
            "definition": "relating to a whole country",
            "examples": [
               "It’s a national holiday.",
               "She watches national news.",
               "The national team won."
            ]
         },
         {
            "id": 66,
            "word": "natural",
            "role": "adjective",
            "BrE": "/ˈnætʃrəl/",
            "AmE": "/ˈnætʃrəl/",
            "definition": "coming from nature",
            "examples": [
               "The lake is natural.",
               "She likes natural food.",
               "The natural beauty was amazing."
            ]
         },
         {
            "id": 66,
            "word": "nature",
            "role": "noun",
            "BrE": "/ˈneɪtʃə(r)/",
            "AmE": "/ˈneɪtʃər/",
            "definition": "the physical world, like plants and animals",
            "examples": [
               "I love nature.",
               "She walked in nature.",
               "Nature is full of animals."
            ]
         },
         {
            "id": 66,
            "word": "near",
            "role": "adverb",
            "BrE": "/nɪə(r)/",
            "AmE": "/nɪr/",
            "definition": "not far away",
            "examples": [
               "I live near.",
               "She sat near the window.",
               "He parked near the shop."
            ]
         },
         {
            "id": 66,
            "word": "nearly",
            "role": "adverb",
            "BrE": "/ˈnɪəli/",
            "AmE": "/ˈnɪrli/",
            "definition": "almost",
            "examples": [
               "I’m nearly finished.",
               "She was nearly late.",
               "He nearly won the race."
            ]
         },
         {
            "id": 66,
            "word": "neat",
            "role": "adjective",
            "BrE": "/niːt/",
            "AmE": "/niːt/",
            "definition": "tidy and organized",
            "examples": [
               "The room is neat.",
               "She keeps her desk neat.",
               "His neat handwriting is clear."
            ]
         },
         {
            "id": 66,
            "word": "necessary",
            "role": "adjective",
            "BrE": "/ˈnesəsəri/",
            "AmE": "/ˈnesəseri/",
            "definition": "needed or required",
            "examples": [
               "It’s necessary to study.",
               "She brought necessary tools.",
               "The necessary steps were taken."
            ]
         },
         {
            "id": 67,
            "word": "neck",
            "role": "noun",
            "BrE": "/nek/",
            "AmE": "/nek/",
            "definition": "the part of the body between head and shoulders",
            "examples": [
               "My neck hurts.",
               "She wore a neck scarf.",
               "The neck of the shirt is tight."
            ]
         },
         {
            "id": 67,
            "word": "need",
            "role": "noun",
            "BrE": "/niːd/",
            "AmE": "/niːd/",
            "definition": "something you must have",
            "examples": [
               "I have a need.",
               "She has a need for food.",
               "The need for water is urgent."
            ]
         },
         {
            "id": 67,
            "word": "need",
            "role": "verb",
            "BrE": "/niːd/",
            "AmE": "/niːd/",
            "definition": "to require something",
            "examples": [
               "I need help.",
               "She needs a new pen.",
               "He needs to finish his work."
            ]
         },
         {
            "id": 67,
            "word": "needle",
            "role": "noun",
            "BrE": "/ˈniːdl/",
            "AmE": "/ˈniːdl/",
            "definition": "a thin, pointed tool for sewing or medical use",
            "examples": [
               "The needle is sharp.",
               "She used a needle to sew.",
               "The doctor used a needle."
            ]
         },
         {
            "id": 67,
            "word": "neighbour",
            "role": "noun",
            "BrE": "/ˈneɪbə(r)/",
            "AmE": "/ˈneɪbər/",
            "definition": "a person living near you",
            "examples": [
               "My neighbour is kind.",
               "She visited her neighbour.",
               "The neighbour helped with the garden."
            ]
         },
         {
            "id": 67,
            "word": "nerve",
            "role": "noun",
            "BrE": "/nɜːv/",
            "AmE": "/nɜːrv/",
            "definition": "a part of the body that carries signals",
            "examples": [
               "The nerve was hurt.",
               "She felt a nerve pain.",
               "The nerve in his arm was sore."
            ]
         },
         {
            "id": 67,
            "word": "nervous",
            "role": "adjective",
            "BrE": "/ˈnɜːvəs/",
            "AmE": "/ˈnɜːrvəs/",
            "definition": "afraid or worried",
            "examples": [
               "I feel nervous.",
               "She was nervous before the test.",
               "The nervous speaker paused."
            ]
         },
         {
            "id": 67,
            "word": "net",
            "role": "noun",
            "BrE": "/net/",
            "AmE": "/net/",
            "definition": "a material made of strings with holes",
            "examples": [
               "The net is strong.",
               "She caught fish in a net.",
               "The net in the goal was torn."
            ]
         },
         {
            "id": 67,
            "word": "network",
            "role": "noun",
            "BrE": "/ˈnetwɜːk/",
            "AmE": "/ˈnetwɜːrk/",
            "definition": "a system of connected things",
            "examples": [
               "The network is fast.",
               "She joined a social network.",
               "The network connects computers."
            ]
         },
         {
            "id": 67,
            "word": "never",
            "role": "adverb",
            "BrE": "/ˈnevə(r)/",
            "AmE": "/ˈnevər/",
            "definition": "not at any time",
            "examples": [
               "I never eat meat.",
               "She never forgets her keys.",
               "He never visited that city."
            ]
         },
         {
            "id": 68,
            "word": "newspaper",
            "role": "noun",
            "BrE": "/ˈnjuːzpeɪpə(r)/",
            "AmE": "/ˈnuːzpeɪpər/",
            "definition": "a paper with news and stories",
            "examples": [
               "I read the newspaper.",
               "She bought a newspaper.",
               "The newspaper has sports news."
            ]
         },
         {
            "id": 68,
            "word": "next",
            "role": "adverb",
            "BrE": "/nekst/",
            "AmE": "/nekst/",
            "definition": "coming immediately after",
            "examples": [
               "Who’s next?",
               "She’s next in line.",
               "The next bus comes soon."
            ]
         },
         {
            "id": 68,
            "word": "nice",
            "role": "adjective",
            "BrE": "/naɪs/",
            "AmE": "/naɪs/",
            "definition": "pleasant or enjoyable",
            "examples": [
               "It’s a nice day.",
               "She has a nice smile.",
               "The nice weather helped the picnic."
            ]
         },
         {
            "id": 68,
            "word": "night",
            "role": "noun",
            "BrE": "/naɪt/",
            "AmE": "/naɪt/",
            "definition": "the time when it is dark",
            "examples": [
               "The night is quiet.",
               "She slept well last night.",
               "The stars shone at night."
            ]
         },
         {
            "id": 68,
            "word": "nobody",
            "role": "pronoun",
            "BrE": "/ˈnəʊbədi/",
            "AmE": "/ˈnoʊbədi/",
            "definition": "no person",
            "examples": [
               "Nobody is here.",
               "She saw nobody in the room.",
               "Nobody answered the phone."
            ]
         },
         {
            "id": 68,
            "word": "noise",
            "role": "noun",
            "BrE": "/nɔɪz/",
            "AmE": "/nɔɪz/",
            "definition": "a loud or unpleasant sound",
            "examples": [
               "The noise is loud.",
               "She heard a strange noise.",
               "The noise woke the baby."
            ]
         },
         {
            "id": 68,
            "word": "noisy",
            "role": "adjective",
            "BrE": "/ˈnɔɪzi/",
            "AmE": "/ˈnɔɪzi/",
            "definition": "making a lot of noise",
            "examples": [
               "The room is noisy.",
               "She lives on a noisy street.",
               "The noisy dog barked a lot."
            ]
         },
         {
            "id": 68,
            "word": "none",
            "role": "pronoun",
            "BrE": "/nʌn/",
            "AmE": "/nʌn/",
            "definition": "not any",
            "examples": [
               "None are left.",
               "She ate none of the cake.",
               "None of the books were good."
            ]
         },
         {
            "id": 68,
            "word": "normal",
            "role": "adjective",
            "BrE": "/ˈnɔːml/",
            "AmE": "/ˈnɔːrml/",
            "definition": "usual or typical",
            "examples": [
               "It’s a normal day.",
               "She felt normal again.",
               "The normal price is low."
            ]
         },
         {
            "id": 68,
            "word": "north",
            "role": "noun",
            "BrE": "/nɔːθ/",
            "AmE": "/nɔːrθ/",
            "definition": "the direction towards the top of a map",
            "examples": [
               "Go north.",
               "She lives in the north.",
               "The north is cold in winter."
            ]
         },
         {
            "id": 69,
            "word": "nose",
            "role": "noun",
            "BrE": "/nəʊz/",
            "AmE": "/noʊz/",
            "definition": "the part of the face for smelling",
            "examples": [
               "My nose is cold.",
               "She touched her nose.",
               "The nose of the dog is wet."
            ]
         },
         {
            "id": 69,
            "word": "note",
            "role": "noun",
            "BrE": "/nəʊt/",
            "AmE": "/noʊt/",
            "definition": "a short written message",
            "examples": [
               "I wrote a note.",
               "She left a note on the table.",
               "The note was for her friend."
            ]
         },
         {
            "id": 69,
            "word": "note",
            "role": "verb",
            "BrE": "/nəʊt/",
            "AmE": "/noʊt/",
            "definition": "to write down or notice something",
            "examples": [
               "Note the time.",
               "She noted his name.",
               "He noted the teacher’s advice."
            ]
         },
         {
            "id": 69,
            "word": "nothing",
            "role": "pronoun",
            "BrE": "/ˈnʌθɪŋ/",
            "AmE": "/ˈnʌθɪŋ/",
            "definition": "not anything",
            "examples": [
               "I have nothing.",
               "She found nothing in the bag.",
               "Nothing was left to eat."
            ]
         },
         {
            "id": 69,
            "word": "notice",
            "role": "noun",
            "BrE": "/ˈnəʊtɪs/",
            "AmE": "/ˈnoʊtɪs/",
            "definition": "a written or printed announcement",
            "examples": [
               "Read the notice.",
               "She saw a notice on the wall.",
               "The notice was about the event."
            ]
         },
         {
            "id": 69,
            "word": "notice",
            "role": "verb",
            "BrE": "/ˈnəʊtɪs/",
            "AmE": "/ˈnoʊtɪs/",
            "definition": "to see or become aware of something",
            "examples": [
               "I didn’t notice.",
               "She noticed the new sign.",
               "He noticed her smile."
            ]
         },
         {
            "id": 69,
            "word": "nowhere",
            "role": "adverb",
            "BrE": "/ˈnəʊweə(r)/",
            "AmE": "/ˈnoʊwer/",
            "definition": "not in or to any place",
            "examples": [
               "It’s nowhere near.",
               "She went nowhere yesterday.",
               "The keys were nowhere to be found."
            ]
         },
         {
            "id": 69,
            "word": "number",
            "role": "noun",
            "BrE": "/ˈnʌmbə(r)/",
            "AmE": "/ˈnʌmbər/",
            "definition": "a word or symbol that shows amount",
            "examples": [
               "Write the number.",
               "She called his number.",
               "The number of students is ten."
            ]
         },
         {
            "id": 69,
            "word": "nurse",
            "role": "noun",
            "BrE": "/nɜːs/",
            "AmE": "/nɜːrs/",
            "definition": "a person who cares for sick people",
            "examples": [
               "The nurse is kind.",
               "She saw a nurse at the hospital.",
               "The nurse checked her temperature."
            ]
         },
         {
            "id": 69,
            "word": "object",
            "role": "noun",
            "BrE": "/ˈɒbdʒɪkt/",
            "AmE": "/ˈɑːbdʒɪkt/",
            "definition": "a thing that can be seen or touched",
            "examples": [
               "The object is small.",
               "She picked up an object.",
               "The object was on the table."
            ]
         },
         {
            "id": 70,
            "word": "obvious",
            "role": "adjective",
            "BrE": "/ˈɒbviəs/",
            "AmE": "/ˈɑːbviəs/",
            "definition": "easy to see or understand",
            "examples": [
               "It’s obvious he’s tired.",
               "She made an obvious mistake.",
               "The answer was obvious to her."
            ]
         },
         {
            "id": 70,
            "word": "occasion",
            "role": "noun",
            "BrE": "/əˈkeɪʒn/",
            "AmE": "/əˈkeɪʒn/",
            "definition": "a special event or time",
            "examples": [
               "It’s a special occasion.",
               "She dressed up for the occasion.",
               "The occasion was her birthday."
            ]
         },
         {
            "id": 70,
            "word": "offer",
            "role": "noun",
            "BrE": "/ˈɒfə(r)/",
            "AmE": "/ˈɔːfər/",
            "definition": "something you give or suggest",
            "examples": [
               "I got an offer.",
               "She accepted the job offer.",
               "The offer was for a free ticket."
            ]
         },
         {
            "id": 70,
            "word": "offer",
            "role": "verb",
            "BrE": "/ˈɒfə(r)/",
            "AmE": "/ˈɔːfər/",
            "definition": "to give or suggest something",
            "examples": [
               "Offer her a drink.",
               "She offered to help him.",
               "He offered a seat to her."
            ]
         },
         {
            "id": 70,
            "word": "office",
            "role": "noun",
            "BrE": "/ˈɒfɪs/",
            "AmE": "/ˈɔːfɪs/",
            "definition": "a place where people work",
            "examples": [
               "The office is big.",
               "She works in an office.",
               "The office has many desks."
            ]
         },
         {
            "id": 70,
            "word": "official",
            "role": "adjective",
            "BrE": "/əˈfɪʃl/",
            "AmE": "/əˈfɪʃl/",
            "definition": "approved by authority",
            "examples": [
               "It’s an official letter.",
               "She got an official invitation.",
               "The official rules are clear."
            ]
         },
         {
            "id": 70,
            "word": "often",
            "role": "adverb",
            "BrE": "/ˈɒfn/",
            "AmE": "/ˈɔːfn/",
            "definition": "many times",
            "examples": [
               "I often read.",
               "She often visits her friend.",
               "He often walks to school."
            ]
         },
         {
            "id": 70,
            "word": "oil",
            "role": "noun",
            "BrE": "/ɔɪl/",
            "AmE": "/ɔɪl/",
            "definition": "a liquid used for cooking or fuel",
            "examples": [
               "I need oil to cook.",
               "She used olive oil.",
               "The car needs more oil."
            ]
         },
         {
            "id": 70,
            "word": "old",
            "role": "adjective",
            "BrE": "/əʊld/",
            "AmE": "/oʊld/",
            "definition": "having lived for a long time",
            "examples": [
               "The house is old.",
               "She has an old book.",
               "The old tree is tall."
            ]
         },
         {
            "id": 70,
            "word": "once",
            "role": "adverb",
            "BrE": "/wʌns/",
            "AmE": "/wʌns/",
            "definition": "one time only",
            "examples": [
               "I went once.",
               "She called once yesterday.",
               "He visited once last year."
            ]
         },
         {
            "id": 71,
            "word": "open",
            "role": "adjective",
            "BrE": "/ˈəʊpən/",
            "AmE": "/ˈoʊpən/",
            "definition": "not closed",
            "examples": [
               "The door is open.",
               "She left the window open.",
               "The open book was on the table."
            ]
         },
         {
            "id": 71,
            "word": "open",
            "role": "verb",
            "BrE": "/ˈəʊpən/",
            "AmE": "/ˈoʊpən/",
            "definition": "to make something not closed",
            "examples": [
               "Open the box.",
               "She opened the shop early.",
               "He opened the letter quickly."
            ]
         },
         {
            "id": 71,
            "word": "opinion",
            "role": "noun",
            "BrE": "/əˈpɪnjən/",
            "AmE": "/əˈpɪnjən/",
            "definition": "what you think about something",
            "examples": [
               "I have an opinion.",
               "She shared her opinion.",
               "His opinion was different."
            ]
         },
         {
            "id": 71,
            "word": "opportunity",
            "role": "noun",
            "BrE": "/ˌɒpəˈtjuːnəti/",
            "AmE": "/ˌɑːpərˈtuːnəti/",
            "definition": "a chance to do something",
            "examples": [
               "It’s a good opportunity.",
               "She took the opportunity to learn.",
               "The opportunity came suddenly."
            ]
         },
         {
            "id": 71,
            "word": "opposite",
            "role": "adjective",
            "BrE": "/ˈɒpəzɪt/",
            "AmE": "/ˈɑːpəzɪt/",
            "definition": "completely different",
            "examples": [
               "They have opposite ideas.",
               "She sat on the opposite side.",
               "The opposite team played well."
            ]
         },
         {
            "id": 71,
            "word": "opposite",
            "role": "noun",
            "BrE": "/ˈɒpəzɪt/",
            "AmE": "/ˈɑːpəzɪt/",
            "definition": "something completely different",
            "examples": [
               "Big is the opposite.",
               "She said the opposite of him.",
               "The opposite of hot is cold."
            ]
         },
         {
            "id": 71,
            "word": "option",
            "role": "noun",
            "BrE": "/ˈɒpʃn/",
            "AmE": "/ˈɑːpʃn/",
            "definition": "a choice you can make",
            "examples": [
               "I have an option.",
               "She chose the best option.",
               "The option was to stay or go."
            ]
         },
         {
            "id": 71,
            "word": "orange",
            "role": "adjective",
            "BrE": "/ˈɒrɪndʒ/",
            "AmE": "/ˈɔːrɪndʒ/",
            "definition": "a colour between red and yellow",
            "examples": [
               "The shirt is orange.",
               "She painted the wall orange.",
               "The orange light was bright."
            ]
         },
         {
            "id": 71,
            "word": "order",
            "role": "noun",
            "BrE": "/ˈɔːdə(r)/",
            "AmE": "/ˈɔːrdər/",
            "definition": "a request for something to be made or delivered",
            "examples": [
               "I made an order.",
               "She placed a food order.",
               "The order arrived quickly."
            ]
         },
         {
            "id": 71,
            "word": "order",
            "role": "verb",
            "BrE": "/ˈɔːdə(r)/",
            "AmE": "/ˈɔːrdər/",
            "definition": "to ask for something to be made or delivered",
            "examples": [
               "Order a pizza.",
               "She ordered a new book.",
               "He ordered coffee at the café."
            ]
         },
         {
            "id": 72,
            "word": "ordinary",
            "role": "adjective",
            "BrE": "/ˈɔːdnri/",
            "AmE": "/ˈɔːrdneri/",
            "definition": "normal or not special",
            "examples": [
               "It’s an ordinary day.",
               "She wore ordinary clothes.",
               "The ordinary book was boring."
            ]
         },
         {
            "id": 72,
            "word": "organize",
            "role": "verb",
            "BrE": "/ˈɔːɡənaɪz/",
            "AmE": "/ˈɔːrɡənaɪz/",
            "definition": "to plan or arrange something",
            "examples": [
               "Organize the books.",
               "She organized a party.",
               "He organized his desk neatly."
            ]
         },
         {
            "id": 72,
            "word": "original",
            "role": "adjective",
            "BrE": "/əˈrɪdʒənl/",
            "AmE": "/əˈrɪdʒənl/",
            "definition": "new and not copied",
            "examples": [
               "It’s an original idea.",
               "She wrote an original story.",
               "The original painting is old."
            ]
         },
         {
            "id": 72,
            "word": "other",
            "role": "adjective",
            "BrE": "/ˈʌðə(r)/",
            "AmE": "/ˈʌðər/",
            "definition": "different or additional",
            "examples": [
               "Try the other book.",
               "She met other students.",
               "The other side is green."
            ]
         },
         {
            "id": 72,
            "word": "ought",
            "role": "verb",
            "BrE": "/ɔːt/",
            "AmE": "/ɔːt/",
            "definition": "used to say what is right to do",
            "examples": [
               "You ought to help.",
               "She ought to study more.",
               "He ought to call his mom."
            ]
         },
         {
            "id": 72,
            "word": "out",
            "role": "adverb",
            "BrE": "/aʊt/",
            "AmE": "/aʊt/",
            "definition": "away from the inside",
            "examples": [
               "Go out now.",
               "She went out with friends.",
               "He took the trash out."
            ]
         },
         {
            "id": 72,
            "word": "outside",
            "role": "adverb",
            "BrE": "/ˌaʊtˈsaɪd/",
            "AmE": "/ˌaʊtˈsaɪd/",
            "definition": "not inside a building",
            "examples": [
               "Play outside.",
               "She waited outside the shop.",
               "He left his bag outside."
            ]
         },
         {
            "id": 72,
            "word": "outside",
            "role": "noun",
            "BrE": "/ˈaʊtsaɪd/",
            "AmE": "/ˈaʊtsaɪd/",
            "definition": "the outer part of something",
            "examples": [
               "The outside is wet.",
               "She painted the outside of the house.",
               "The outside of the box is blue."
            ]
         },
         {
            "id": 72,
            "word": "oven",
            "role": "noun",
            "BrE": "/ˈʌvn/",
            "AmE": "/ˈʌvn/",
            "definition": "a machine for baking or cooking",
            "examples": [
               "The oven is hot.",
               "She baked a cake in the oven.",
               "The oven needs cleaning."
            ]
         },
         {
            "id": 72,
            "word": "own",
            "role": "adjective",
            "BrE": "/əʊn/",
            "AmE": "/oʊn/",
            "definition": "belonging to a person",
            "examples": [
               "It’s my own book.",
               "She has her own room.",
               "He built his own house."
            ]
         },
         {
            "id": 73,
            "word": "owner",
            "role": "noun",
            "BrE": "/ˈəʊnə(r)/",
            "AmE": "/ˈoʊnər/",
            "definition": "a person who owns something",
            "examples": [
               "The owner is kind.",
               "She is the shop owner.",
               "The owner of the car arrived."
            ]
         },
         {
            "id": 73,
            "word": "pack",
            "role": "verb",
            "BrE": "/pæk/",
            "AmE": "/pæk/",
            "definition": "to put things into a bag or box",
            "examples": [
               "Pack your bag.",
               "She packed her clothes.",
               "He packed for the trip."
            ]
         },
         {
            "id": 73,
            "word": "package",
            "role": "noun",
            "BrE": "/ˈpækɪdʒ/",
            "AmE": "/ˈpækɪdʒ/",
            "definition": "something wrapped for sending",
            "examples": [
               "I got a package.",
               "She sent a package home.",
               "The package was heavy."
            ]
         },
         {
            "id": 73,
            "word": "page",
            "role": "noun",
            "BrE": "/peɪdʒ/",
            "AmE": "/peɪdʒ/",
            "definition": "one side of a sheet of paper in a book",
            "examples": [
               "Turn the page.",
               "She read page ten.",
               "The page was full of pictures."
            ]
         },
         {
            "id": 73,
            "word": "pain",
            "role": "noun",
            "BrE": "/peɪn/",
            "AmE": "/peɪn/",
            "definition": "a feeling of hurt in the body",
            "examples": [
               "I feel pain.",
               "She had pain in her leg.",
               "The pain was gone after rest."
            ]
         },
         {
            "id": 73,
            "word": "paint",
            "role": "noun",
            "BrE": "/peɪnt/",
            "AmE": "/peɪnt/",
            "definition": "a liquid used to colour surfaces",
            "examples": [
               "I need paint.",
               "She bought red paint.",
               "The paint on the wall is new."
            ]
         },
         {
            "id": 73,
            "word": "paint",
            "role": "verb",
            "BrE": "/peɪnt/",
            "AmE": "/peɪnt/",
            "definition": "to cover a surface with paint",
            "examples": [
               "Paint the wall.",
               "She painted her room blue.",
               "He painted the house last week."
            ]
         },
         {
            "id": 73,
            "word": "painting",
            "role": "noun",
            "BrE": "/ˈpeɪntɪŋ/",
            "AmE": "/ˈpeɪntɪŋ/",
            "definition": "a picture made with paint",
            "examples": [
               "The painting is beautiful.",
               "She saw a painting in the museum.",
               "The painting was on the wall."
            ]
         },
         {
            "id": 73,
            "word": "pair",
            "role": "noun",
            "BrE": "/peə(r)/",
            "AmE": "/per/",
            "definition": "two things of the same type",
            "examples": [
               "I need a pair.",
               "She bought a pair of shoes.",
               "The pair of gloves was warm."
            ]
         },
         {
            "id": 73,
            "word": "palace",
            "role": "noun",
            "BrE": "/ˈpæləs/",
            "AmE": "/ˈpæləs/",
            "definition": "a large house for a king or queen",
            "examples": [
               "The palace is big.",
               "She visited a palace.",
               "The palace has many rooms."
            ]
         },
         {
            "id": 74,
            "word": "pale",
            "role": "adjective",
            "BrE": "/peɪl/",
            "AmE": "/peɪl/",
            "definition": "having a light colour or little colour",
            "examples": [
               "Her face is pale.",
               "She wore a pale blue dress.",
               "The pale light came through."
            ]
         },
         {
            "id": 74,
            "word": "pan",
            "role": "noun",
            "BrE": "/pæn/",
            "AmE": "/pæn/",
            "definition": "a metal container for cooking",
            "examples": [
               "The pan is hot.",
               "She cooked eggs in a pan.",
               "The pan was on the stove."
            ]
         },
         {
            "id": 74,
            "word": "paper",
            "role": "noun",
            "BrE": "/ˈpeɪpə(r)/",
            "AmE": "/ˈpeɪpər/",
            "definition": "material used for writing or printing",
            "examples": [
               "I need paper.",
               "She wrote on the paper.",
               "The paper was full of notes."
            ]
         },
         {
            "id": 74,
            "word": "parent",
            "role": "noun",
            "BrE": "/ˈpeərənt/",
            "AmE": "/ˈperənt/",
            "definition": "a mother or father",
            "examples": [
               "My parent is here.",
               "She called her parents.",
               "The parent helped with homework."
            ]
         },
         {
            "id": 74,
            "word": "park",
            "role": "noun",
            "BrE": "/pɑːk/",
            "AmE": "/pɑːrk/",
            "definition": "a public area with grass and trees",
            "examples": [
               "The park is nice.",
               "She walked in the park.",
               "The park has a playground."
            ]
         },
         {
            "id": 74,
            "word": "park",
            "role": "verb",
            "BrE": "/pɑːk/",
            "AmE": "/pɑːrk/",
            "definition": "to stop a vehicle in a place",
            "examples": [
               "Park the car.",
               "She parked near the shop.",
               "He parked the bike outside."
            ]
         },
         {
            "id": 74,
            "word": "part",
            "role": "noun",
            "BrE": "/pɑːt/",
            "AmE": "/pɑːrt/",
            "definition": "a piece of something",
            "examples": [
               "I need a part.",
               "She ate part of the cake.",
               "The part of the book was good."
            ]
         },
         {
            "id": 74,
            "word": "particular",
            "role": "adjective",
            "BrE": "/pəˈtɪkjələ(r)/",
            "AmE": "/pərˈtɪkjələr/",
            "definition": "specific or special",
            "examples": [
               "I want a particular book.",
               "She has a particular style.",
               "The particular day was sunny."
            ]
         },
         {
            "id": 74,
            "word": "partner",
            "role": "noun",
            "BrE": "/ˈpɑːtnə(r)/",
            "AmE": "/ˈpɑːrtnər/",
            "definition": "a person you work or do something with",
            "examples": [
               "He’s my partner.",
               "She chose a dance partner.",
               "The partner helped with the project."
            ]
         },
         {
            "id": 74,
            "word": "party",
            "role": "noun",
            "BrE": "/ˈpɑːti/",
            "AmE": "/ˈpɑːrti/",
            "definition": "a social event with people",
            "examples": [
               "I love a party.",
               "She went to a birthday party.",
               "The party was loud and fun."
            ]
         },
         {
            "id": 75,
            "word": "pass",
            "role": "verb",
            "BrE": "/pɑːs/",
            "AmE": "/pæs/",
            "definition": "to go past or through something",
            "examples": [
               "Pass the ball.",
               "She passed the shop.",
               "He passed the test easily."
            ]
         },
         {
            "id": 75,
            "word": "passenger",
            "role": "noun",
            "BrE": "/ˈpæsɪndʒə(r)/",
            "AmE": "/ˈpæsɪndʒər/",
            "definition": "a person travelling in a vehicle",
            "examples": [
               "The passenger is waiting.",
               "She was a bus passenger.",
               "The passenger carried a bag."
            ]
         },
         {
            "id": 75,
            "word": "passport",
            "role": "noun",
            "BrE": "/ˈpɑːspɔːt/",
            "AmE": "/ˈpæspɔːrt/",
            "definition": "a document for international travel",
            "examples": [
               "I need my passport.",
               "She lost her passport.",
               "The passport is in her bag."
            ]
         },
         {
            "id": 75,
            "word": "past",
            "role": "noun",
            "BrE": "/pɑːst/",
            "AmE": "/pæst/",
            "definition": "the time before now",
            "examples": [
               "The past was different.",
               "She talked about the past.",
               "The past of the town is old."
            ]
         },
         {
            "id": 75,
            "word": "past",
            "role": "preposition",
            "BrE": "/pɑːst/",
            "AmE": "/pæst/",
            "definition": "beyond a time or place",
            "examples": [
               "It’s past midnight.",
               "She walked past the house.",
               "He drove past the school."
            ]
         },
         {
            "id": 75,
            "word": "path",
            "role": "noun",
            "BrE": "/pɑːθ/",
            "AmE": "/pæθ/",
            "definition": "a way or track to walk on",
            "examples": [
               "The path is narrow.",
               "She followed the path.",
               "The path leads to the park."
            ]
         },
         {
            "id": 75,
            "word": "patient",
            "role": "adjective",
            "BrE": "/ˈpeɪʃnt/",
            "AmE": "/ˈpeɪʃnt/",
            "definition": "able to wait without getting upset",
            "examples": [
               "Be patient, please.",
               "She is patient with kids.",
               "The patient teacher helped him."
            ]
         },
         {
            "id": 75,
            "word": "patient",
            "role": "noun",
            "BrE": "/ˈpeɪʃnt/",
            "AmE": "/ˈpeɪʃnt/",
            "definition": "a person receiving medical treatment",
            "examples": [
               "The patient is better.",
               "She visited the patient.",
               "The patient was in the hospital."
            ]
         },
         {
            "id": 75,
            "word": "pattern",
            "role": "noun",
            "BrE": "/ˈpætn/",
            "AmE": "/ˈpætərn/",
            "definition": "a design or way things are arranged",
            "examples": [
               "The pattern is nice.",
               "She chose a pattern for the dress.",
               "The pattern on the wall is blue."
            ]
         },
         {
            "id": 75,
            "word": "pay",
            "role": "noun",
            "BrE": "/peɪ/",
            "AmE": "/peɪ/",
            "definition": "money given for work",
            "examples": [
               "Her pay is good.",
               "She got her pay today.",
               "The pay for the job is high."
            ]
         },
         {
            "id": 76,
            "word": "pay",
            "role": "verb",
            "BrE": "/peɪ/",
            "AmE": "/peɪ/",
            "definition": "to give money for something",
            "examples": [
               "Pay the bill.",
               "She paid for the book.",
               "He pays his rent every month."
            ]
         },
         {
            "id": 76,
            "word": "peace",
            "role": "noun",
            "BrE": "/piːs/",
            "AmE": "/piːs/",
            "definition": "a state of calm or no war",
            "examples": [
               "I want peace.",
               "She found peace in the park.",
               "The peace in the room was nice."
            ]
         },
         {
            "id": 76,
            "word": "pen",
            "role": "noun",
            "BrE": "/pen/",
            "AmE": "/pen/",
            "definition": "a tool for writing with ink",
            "examples": [
               "I need a pen.",
               "She wrote with a blue pen.",
               "The pen is on the table."
            ]
         },
         {
            "id": 76,
            "word": "pencil",
            "role": "noun",
            "BrE": "/ˈpensl/",
            "AmE": "/ˈpensl/",
            "definition": "a tool for writing or drawing with lead",
            "examples": [
               "The pencil is sharp.",
               "She drew with a pencil.",
               "He lost his pencil at school."
            ]
         },
         {
            "id": 76,
            "word": "people",
            "role": "noun",
            "BrE": "/ˈpiːpl/",
            "AmE": "/ˈpiːpl/",
            "definition": "more than one person",
            "examples": [
               "People are here.",
               "She met new people.",
               "Many people like the movie."
            ]
         },
         {
            "id": 76,
            "word": "perfect",
            "role": "adjective",
            "BrE": "/ˈpɜːfɪkt/",
            "AmE": "/ˈpɜːrfɪkt/",
            "definition": "having no mistakes",
            "examples": [
               "The day is perfect.",
               "She did a perfect job.",
               "The perfect plan worked well."
            ]
         },
         {
            "id": 76,
            "word": "perform",
            "role": "verb",
            "BrE": "/pəˈfɔːm/",
            "AmE": "/pərˈfɔːrm/",
            "definition": "to do something like acting or playing music",
            "examples": [
               "They perform on stage.",
               "She performed a song.",
               "He performs in a band."
            ]
         },
         {
            "id": 76,
            "word": "performance",
            "role": "noun",
            "BrE": "/pəˈfɔːməns/",
            "AmE": "/pərˈfɔːrməns/",
            "definition": "an act of performing, like a play or concert",
            "examples": [
               "The performance was great.",
               "She watched a dance performance.",
               "His performance was the best."
            ]
         },
         {
            "id": 76,
            "word": "period",
            "role": "noun",
            "BrE": "/ˈpɪəriəd/",
            "AmE": "/ˈpɪriəd/",
            "definition": "a length of time",
            "examples": [
               "The period was short.",
               "She waited for a period.",
               "The period of the class is one hour."
            ]
         },
         {
            "id": 76,
            "word": "permanent",
            "role": "adjective",
            "BrE": "/ˈpɜːmənənt/",
            "AmE": "/ˈpɜːrmənənt/",
            "definition": "lasting for a long time",
            "examples": [
               "It’s a permanent job.",
               "She got a permanent mark.",
               "The permanent change was good."
            ]
         },
         {
            "id": 77,
            "word": "person",
            "role": "noun",
            "BrE": "/ˈpɜːsn/",
            "AmE": "/ˈpɜːrsn/",
            "definition": "a human being",
            "examples": [
               "He’s a nice person.",
               "She met a person at the park.",
               "The person helped her."
            ]
         },
         {
            "id": 77,
            "word": "personal",
            "role": "adjective",
            "BrE": "/ˈpɜːsənl/",
            "AmE": "/ˈpɜːrsənl/",
            "definition": "relating to one person",
            "examples": [
               "It’s a personal choice.",
               "She keeps her personal diary.",
               "His personal items were lost."
            ]
         },
         {
            "id": 77,
            "word": "phone",
            "role": "noun",
            "BrE": "/fəʊn/",
            "AmE": "/foʊn/",
            "definition": "a device for calling people",
            "examples": [
               "My phone is new.",
               "She used her phone to call.",
               "The phone rang all day."
            ]
         },
         {
            "id": 77,
            "word": "phone",
            "role": "verb",
            "BrE": "/fəʊn/",
            "AmE": "/foʊn/",
            "definition": "to call someone using a phone",
            "examples": [
               "Phone your friend.",
               "She phoned her mom.",
               "He phones his boss every day."
            ]
         },
         {
            "id": 77,
            "word": "photo",
            "role": "noun",
            "BrE": "/ˈfəʊtəʊ/",
            "AmE": "/ˈfoʊtoʊ/",
            "definition": "a picture taken with a camera",
            "examples": [
               "I took a photo.",
               "She showed me a photo.",
               "The photo of the beach is nice."
            ]
         },
         {
            "id": 77,
            "word": "photograph",
            "role": "noun",
            "BrE": "/ˈfəʊtəɡrɑːf/",
            "AmE": "/ˈfoʊtəɡræf/",
            "definition": "a picture taken with a camera",
            "examples": [
               "The photograph is old.",
               "She has a photograph of her family.",
               "The photograph was in a book."
            ]
         },
         {
            "id": 77,
            "word": "phrase",
            "role": "noun",
            "BrE": "/freɪz/",
            "AmE": "/freɪz/",
            "definition": "a group of words with meaning",
            "examples": [
               "Learn this phrase.",
               "She used a new phrase.",
               "The phrase was easy to say."
            ]
         },
         {
            "id": 77,
            "word": "physical",
            "role": "adjective",
            "BrE": "/ˈfɪzɪkl/",
            "AmE": "/ˈfɪzɪkl/",
            "definition": "relating to the body or things",
            "examples": [
               "It’s a physical game.",
               "She does physical exercise.",
               "The physical book is heavy."
            ]
         },
         {
            "id": 77,
            "word": "piano",
            "role": "noun",
            "BrE": "/piˈænəʊ/",
            "AmE": "/piˈænoʊ/",
            "definition": "a musical instrument with keys",
            "examples": [
               "The piano is big.",
               "She plays the piano well.",
               "The piano is in the room."
            ]
         },
         {
            "id": 77,
            "word": "pick",
            "role": "verb",
            "BrE": "/pɪk/",
            "AmE": "/pɪk/",
            "definition": "to choose or take something",
            "examples": [
               "Pick a colour.",
               "She picked a red apple.",
               "He picked the best book."
            ]
         },
         {
            "id": 78,
            "word": "picture",
            "role": "noun",
            "BrE": "/ˈpɪktʃə(r)/",
            "AmE": "/ˈpɪktʃər/",
            "definition": "an image or drawing",
            "examples": [
               "I drew a picture.",
               "She saw a picture on the wall.",
               "The picture shows a dog."
            ]
         },
         {
            "id": 78,
            "word": "piece",
            "role": "noun",
            "BrE": "/piːs/",
            "AmE": "/piːs/",
            "definition": "a part of something",
            "examples": [
               "I ate a piece.",
               "She cut a piece of cake.",
               "The piece of paper is small."
            ]
         },
         {
            "id": 78,
            "word": "pig",
            "role": "noun",
            "BrE": "/pɪɡ/",
            "AmE": "/pɪɡ/",
            "definition": "a farm animal with a flat nose",
            "examples": [
               "The pig is fat.",
               "She saw a pig on the farm.",
               "The pig ate a lot of food."
            ]
         },
         {
            "id": 78,
            "word": "pile",
            "role": "noun",
            "BrE": "/paɪl/",
            "AmE": "/paɪl/",
            "definition": "a number of things on top of each other",
            "examples": [
               "The pile is high.",
               "She made a pile of books.",
               "The pile of clothes fell."
            ]
         },
         {
            "id": 78,
            "word": "pilot",
            "role": "noun",
            "BrE": "/ˈpaɪlət/",
            "AmE": "/ˈpaɪlət/",
            "definition": "a person who flies a plane",
            "examples": [
               "The pilot is ready.",
               "She met the pilot.",
               "The pilot flew the plane."
            ]
         },
         {
            "id": 78,
            "word": "pink",
            "role": "adjective",
            "BrE": "/pɪŋk/",
            "AmE": "/pɪŋk/",
            "definition": "a light red colour",
            "examples": [
               "The shirt is pink.",
               "She wore a pink dress.",
               "The pink flower is pretty."
            ]
         },
         {
            "id": 78,
            "word": "pipe",
            "role": "noun",
            "BrE": "/paɪp/",
            "AmE": "/paɪp/",
            "definition": "a tube for carrying liquid or gas",
            "examples": [
               "The pipe is long.",
               "She fixed a water pipe.",
               "The pipe in the house broke."
            ]
         },
         {
            "id": 78,
            "word": "place",
            "role": "noun",
            "BrE": "/pleɪs/",
            "AmE": "/pleɪs/",
            "definition": "a particular area or position",
            "examples": [
               "This place is nice.",
               "She found a place to sit.",
               "The place was full of people."
            ]
         },
         {
            "id": 78,
            "word": "place",
            "role": "verb",
            "BrE": "/pleɪs/",
            "AmE": "/pleɪs/",
            "definition": "to put something somewhere",
            "examples": [
               "Place the book here.",
               "She placed her bag on the table.",
               "He placed the cup on the shelf."
            ]
         },
         {
            "id": 78,
            "word": "plain",
            "role": "adjective",
            "BrE": "/pleɪn/",
            "AmE": "/pleɪn/",
            "definition": "simple or not decorated",
            "examples": [
               "The shirt is plain.",
               "She likes plain food.",
               "The plain wall needs paint."
            ]
         },
         {
            "id": 79,
            "word": "plan",
            "role": "noun",
            "BrE": "/plæn/",
            "AmE": "/plæn/",
            "definition": "an idea for doing something",
            "examples": [
               "I have a plan.",
               "She made a plan for the trip.",
               "The plan was to meet at six."
            ]
         },
         {
            "id": 79,
            "word": "plan",
            "role": "verb",
            "BrE": "/plæn/",
            "AmE": "/plæn/",
            "definition": "to decide what to do",
            "examples": [
               "Plan the party.",
               "She planned her day.",
               "He plans to visit soon."
            ]
         },
         {
            "id": 79,
            "word": "plane",
            "role": "noun",
            "BrE": "/pleɪn/",
            "AmE": "/pleɪn/",
            "definition": "a vehicle that flies",
            "examples": [
               "The plane is big.",
               "She took a plane to London.",
               "The plane landed safely."
            ]
         },
         {
            "id": 79,
            "word": "plant",
            "role": "noun",
            "BrE": "/plɑːnt/",
            "AmE": "/plænt/",
            "definition": "a living thing that grows in soil",
            "examples": [
               "The plant is green.",
               "She watered her plant.",
               "The plant grew tall."
            ]
         },
         {
            "id": 79,
            "word": "plastic",
            "role": "noun",
            "BrE": "/ˈplæstɪk/",
            "AmE": "/ˈplæstɪk/",
            "definition": "a man-made material that can be shaped",
            "examples": [
               "The bottle is plastic.",
               "She used a plastic cup.",
               "The plastic chair is light."
            ]
         },
         {
            "id": 79,
            "word": "plate",
            "role": "noun",
            "BrE": "/pleɪt/",
            "AmE": "/pleɪt/",
            "definition": "a flat dish for food",
            "examples": [
               "The plate is clean.",
               "She put food on the plate.",
               "The plate broke on the floor."
            ]
         },
         {
            "id": 79,
            "word": "play",
            "role": "noun",
            "BrE": "/pleɪ/",
            "AmE": "/pleɪ/",
            "definition": "an activity for fun or a performance",
            "examples": [
               "Let’s have a play.",
               "She watched a school play.",
               "The play was about a king."
            ]
         },
         {
            "id": 79,
            "word": "play",
            "role": "verb",
            "BrE": "/pleɪ/",
            "AmE": "/pleɪ/",
            "definition": "to do something for fun or perform",
            "examples": [
               "Play a game.",
               "She plays football.",
               "He played music all night."
            ]
         },
         {
            "id": 79,
            "word": "player",
            "role": "noun",
            "BrE": "/ˈpleɪə(r)/",
            "AmE": "/ˈpleɪər/",
            "definition": "a person who plays a game or music",
            "examples": [
               "The player is fast.",
               "She is a good piano player.",
               "The player scored a goal."
            ]
         },
         {
            "id": 79,
            "word": "pleasant",
            "role": "adjective",
            "BrE": "/ˈpleznt/",
            "AmE": "/ˈpleznt/",
            "definition": "nice or enjoyable",
            "examples": [
               "The day is pleasant.",
               "She had a pleasant trip.",
               "The pleasant smell was flowers."
            ]
         },
         {
            "id": 80,
            "word": "please",
            "role": "adverb",
            "BrE": "/pliːz/",
            "AmE": "/pliːz/",
            "definition": "used to make a polite request",
            "examples": [
               "Sit down, please.",
               "Please help me with this.",
               "Can you please open the door?"
            ]
         },
         {
            "id": 80,
            "word": "pleasure",
            "role": "noun",
            "BrE": "/ˈpleʒə(r)/",
            "AmE": "/ˈpleʒər/",
            "definition": "a feeling of happiness or enjoyment",
            "examples": [
               "It’s a pleasure to meet.",
               "She reads for pleasure.",
               "The pleasure of the trip was great."
            ]
         },
         {
            "id": 80,
            "word": "plenty",
            "role": "pronoun",
            "BrE": "/ˈplenti/",
            "AmE": "/ˈplenti/",
            "definition": "a lot or enough of something",
            "examples": [
               "We have plenty.",
               "She has plenty of time.",
               "There’s plenty of food left."
            ]
         },
         {
            "id": 80,
            "word": "pocket",
            "role": "noun",
            "BrE": "/ˈpɒkɪt/",
            "AmE": "/ˈpɑːkɪt/",
            "definition": "a small bag in clothes for carrying things",
            "examples": [
               "My pocket is full.",
               "She put money in her pocket.",
               "The pocket of the jacket is big."
            ]
         },
         {
            "id": 80,
            "word": "poem",
            "role": "noun",
            "BrE": "/ˈpəʊɪm/",
            "AmE": "/ˈpoʊəm/",
            "definition": "a piece of writing with rhythm",
            "examples": [
               "I read a poem.",
               "She wrote a short poem.",
               "The poem was about love."
            ]
         },
         {
            "id": 80,
            "word": "point",
            "role": "noun",
            "BrE": "/pɔɪnt/",
            "AmE": "/pɔɪnt/",
            "definition": "a particular detail or idea",
            "examples": [
               "Make a point.",
               "She explained her point.",
               "The point of the story was clear."
            ]
         },
         {
            "id": 80,
            "word": "point",
            "role": "verb",
            "BrE": "/pɔɪnt/",
            "AmE": "/pɔɪnt/",
            "definition": "to show direction with a finger",
            "examples": [
               "Point to the door.",
               "She pointed at the sky.",
               "He pointed to the map."
            ]
         },
         {
            "id": 80,
            "word": "police",
            "role": "noun",
            "BrE": "/pəˈliːs/",
            "AmE": "/pəˈliːs/",
            "definition": "people who keep law and order",
            "examples": [
               "The police are here.",
               "She called the police for help.",
               "The police caught the thief."
            ]
         },
         {
            "id": 80,
            "word": "polite",
            "role": "adjective",
            "BrE": "/pəˈlaɪt/",
            "AmE": "/pəˈlaɪt/",
            "definition": "having good manners",
            "examples": [
               "He is very polite.",
               "She gave a polite smile.",
               "The polite boy said thank you."
            ]
         },
         {
            "id": 80,
            "word": "political",
            "role": "adjective",
            "BrE": "/pəˈlɪtɪkl/",
            "AmE": "/pəˈlɪtɪkl/",
            "definition": "relating to government or politics",
            "examples": [
               "It’s a political book.",
               "She watches political news.",
               "The political talk was long."
            ]
         },
         {
            "id": 81,
            "word": "poor",
            "role": "adjective",
            "BrE": "/pɔː(r)/",
            "AmE": "/pʊr/",
            "definition": "having little money or being of low quality",
            "examples": [
               "He is poor.",
               "She helped a poor family.",
               "The poor road was dangerous."
            ]
         },
         {
            "id": 81,
            "word": "pop",
            "role": "noun",
            "BrE": "/pɒp/",
            "AmE": "/pɑːp/",
            "definition": "modern popular music",
            "examples": [
               "I like pop music.",
               "She listens to pop songs.",
               "The pop concert was fun."
            ]
         },
         {
            "id": 81,
            "word": "popular",
            "role": "adjective",
            "BrE": "/ˈpɒpjələ(r)/",
            "AmE": "/ˈpɑːpjələr/",
            "definition": "liked by many people",
            "examples": [
               "The song is popular.",
               "She is a popular student.",
               "The popular game is new."
            ]
         },
         {
            "id": 81,
            "word": "population",
            "role": "noun",
            "BrE": "/ˌpɒpjuˈleɪʃn/",
            "AmE": "/ˌpɑːpjuˈleɪʃn/",
            "definition": "all the people living in an area",
            "examples": [
               "The population is big.",
               "She studied the city’s population.",
               "The population grew last year."
            ]
         },
         {
            "id": 81,
            "word": "position",
            "role": "noun",
            "BrE": "/pəˈzɪʃn/",
            "AmE": "/pəˈzɪʃn/",
            "definition": "the place where something is",
            "examples": [
               "The position is good.",
               "She changed the chair’s position.",
               "The position of the house is nice."
            ]
         },
         {
            "id": 81,
            "word": "positive",
            "role": "adjective",
            "BrE": "/ˈpɒzətɪv/",
            "AmE": "/ˈpɑːzətɪv/",
            "definition": "hopeful or confident",
            "examples": [
               "Be positive!",
               "She has a positive idea.",
               "His positive attitude helped."
            ]
         },
         {
            "id": 81,
            "word": "possible",
            "role": "adjective",
            "BrE": "/ˈpɒsəbl/",
            "AmE": "/ˈpɑːsəbl/",
            "definition": "able to happen or be done",
            "examples": [
               "It’s possible to win.",
               "She found a possible answer.",
               "The possible time is tomorrow."
            ]
         },
         {
            "id": 81,
            "word": "post",
            "role": "noun",
            "BrE": "/pəʊst/",
            "AmE": "/poʊst/",
            "definition": "letters or packages sent by mail",
            "examples": [
               "I got post today.",
               "She sent a post to her friend.",
               "The post arrived this morning."
            ]
         },
         {
            "id": 81,
            "word": "post",
            "role": "verb",
            "BrE": "/pəʊst/",
            "AmE": "/poʊst/",
            "definition": "to send something by mail",
            "examples": [
               "Post the letter.",
               "She posted a card.",
               "He posts packages every week."
            ]
         },
         {
            "id": 81,
            "word": "pot",
            "role": "noun",
            "BrE": "/pɒt/",
            "AmE": "/pɑːt/",
            "definition": "a container for cooking or plants",
            "examples": [
               "The pot is hot.",
               "She put a plant in the pot.",
               "The pot of soup is ready."
            ]
         },
         {
            "id": 82,
            "word": "potato",
            "role": "noun",
            "BrE": "/pəˈteɪtəʊ/",
            "AmE": "/pəˈteɪtoʊ/",
            "definition": "a vegetable that grows underground",
            "examples": [
               "I like potatoes.",
               "She cooked a potato.",
               "The potato was soft and tasty."
            ]
         },
         {
            "id": 82,
            "word": "pound",
            "role": "noun",
            "BrE": "/paʊnd/",
            "AmE": "/paʊnd/",
            "definition": "a unit of weight or money",
            "examples": [
               "It costs one pound.",
               "She bought a pound of apples.",
               "The pound of sugar is heavy."
            ]
         },
         {
            "id": 82,
            "word": "pour",
            "role": "verb",
            "BrE": "/pɔː(r)/",
            "AmE": "/pɔːr/",
            "definition": "to make a liquid flow",
            "examples": [
               "Pour the water.",
               "She poured juice into a glass.",
               "He poured milk into the cup."
            ]
         },
         {
            "id": 82,
            "word": "power",
            "role": "noun",
            "BrE": "/ˈpaʊə(r)/",
            "AmE": "/ˈpaʊər/",
            "definition": "energy or strength",
            "examples": [
               "The power is off.",
               "She has a lot of power.",
               "The power of the car is strong."
            ]
         },
         {
            "id": 82,
            "word": "practice",
            "role": "noun",
            "BrE": "/ˈpræktɪs/",
            "AmE": "/ˈpræktɪs/",
            "definition": "doing something regularly to improve",
            "examples": [
               "Practice is important.",
               "She does piano practice.",
               "The practice helped her win."
            ]
         },
         {
            "id": 82,
            "word": "practise",
            "role": "verb",
            "BrE": "/ˈpræktɪs/",
            "AmE": "/ˈpræktɪs/",
            "definition": "to do something regularly to improve",
            "examples": [
               "Practise English.",
               "She practises dancing.",
               "He practised for the game."
            ]
         },
         {
            "id": 82,
            "word": "prefer",
            "role": "verb",
            "BrE": "/prɪˈfɜː(r)/",
            "AmE": "/prɪˈfɜːr/",
            "definition": "to like one thing more than another",
            "examples": [
               "I prefer tea.",
               "She prefers books to movies.",
               "He prefers walking to driving."
            ]
         },
         {
            "id": 82,
            "word": "prepare",
            "role": "verb",
            "BrE": "/prɪˈpeə(r)/",
            "AmE": "/prɪˈper/",
            "definition": "to get ready for something",
            "examples": [
               "Prepare your bag.",
               "She prepared food for the party.",
               "He prepared for the test."
            ]
         },
         {
            "id": 82,
            "word": "present",
            "role": "adjective",
            "BrE": "/ˈpreznt/",
            "AmE": "/ˈpreznt/",
            "definition": "existing or happening now",
            "examples": [
               "She is present today.",
               "He was present at the meeting.",
               "The present time is busy."
            ]
         },
         {
            "id": 82,
            "word": "present",
            "role": "noun",
            "BrE": "/ˈpreznt/",
            "AmE": "/ˈpreznt/",
            "definition": "a gift",
            "examples": [
               "I got a present.",
               "She gave him a present.",
               "The present was a book."
            ]
         },
         {
            "id": 83,
            "word": "president",
            "role": "noun",
            "BrE": "/ˈprezɪdənt/",
            "AmE": "/ˈprezɪdənt/",
            "definition": "the leader of a country or group",
            "examples": [
               "The president spoke.",
               "She met the president.",
               "The president lives in a big house."
            ]
         },
         {
            "id": 83,
            "word": "press",
            "role": "verb",
            "BrE": "/pres/",
            "AmE": "/pres/",
            "definition": "to push something firmly",
            "examples": [
               "Press the button.",
               "She pressed the doorbell.",
               "He pressed the paper flat."
            ]
         },
         {
            "id": 83,
            "word": "pretty",
            "role": "adjective",
            "BrE": "/ˈprɪti/",
            "AmE": "/ˈprɪti/",
            "definition": "attractive in a pleasant way",
            "examples": [
               "The flower is pretty.",
               "She wore a pretty dress.",
               "The pretty park was quiet."
            ]
         },
         {
            "id": 83,
            "word": "price",
            "role": "noun",
            "BrE": "/praɪs/",
            "AmE": "/praɪs/",
            "definition": "the amount of money needed to buy something",
            "examples": [
               "The price is high.",
               "She checked the price of the book.",
               "The price of the ticket was low."
            ]
         },
         {
            "id": 83,
            "word": "print",
            "role": "verb",
            "BrE": "/prɪnt/",
            "AmE": "/prɪnt/",
            "definition": "to produce text or pictures on paper",
            "examples": [
               "Print the page.",
               "She printed her name.",
               "He printed a photo at home."
            ]
         },
         {
            "id": 83,
            "word": "prison",
            "role": "noun",
            "BrE": "/ˈprɪzn/",
            "AmE": "/ˈprɪzn/",
            "definition": "a place where people are kept as punishment",
            "examples": [
               "The prison is old.",
               "She visited the prison.",
               "The prison is near the city."
            ]
         },
         {
            "id": 83,
            "word": "private",
            "role": "adjective",
            "BrE": "/ˈpraɪvət/",
            "AmE": "/ˈpraɪvət/",
            "definition": "for one person or group, not public",
            "examples": [
               "It’s a private room.",
               "She has a private office.",
               "The private garden is small."
            ]
         },
         {
            "id": 83,
            "word": "prize",
            "role": "noun",
            "BrE": "/praɪz/",
            "AmE": "/praɪz/",
            "definition": "something given for winning",
            "examples": [
               "I won a prize.",
               "She got a prize at school.",
               "The prize was a big book."
            ]
         },
         {
            "id": 83,
            "word": "probably",
            "role": "adverb",
            "BrE": "/ˈprɒbəbli/",
            "AmE": "/ˈprɑːbəbli/",
            "definition": "almost certainly",
            "examples": [
               "I’ll probably come.",
               "She will probably win.",
               "He probably forgot the time."
            ]
         },
         {
            "id": 83,
            "word": "problem",
            "role": "noun",
            "BrE": "/ˈprɒbləm/",
            "AmE": "/ˈprɑːbləm/",
            "definition": "something difficult that needs solving",
            "examples": [
               "I have a problem.",
               "She solved the problem.",
               "The problem was with the car."
            ]
         },
         {
            "id": 84,
            "word": "produce",
            "role": "verb",
            "BrE": "/prəˈdjuːs/",
            "AmE": "/prəˈduːs/",
            "definition": "to make or grow something",
            "examples": [
               "Produce good work.",
               "She produces vegetables.",
               "He produced a new song."
            ]
         },
         {
            "id": 84,
            "word": "product",
            "role": "noun",
            "BrE": "/ˈprɒdʌkt/",
            "AmE": "/ˈprɑːdʌkt/",
            "definition": "something made to be sold",
            "examples": [
               "The product is new.",
               "She bought a product online.",
               "The product was in a box."
            ]
         },
         {
            "id": 84,
            "word": "program",
            "role": "noun",
            "BrE": "/ˈprəʊɡræm/",
            "AmE": "/ˈproʊɡræm/",
            "definition": "a plan or a show on TV or computer",
            "examples": [
               "I watched a program.",
               "She likes this TV program.",
               "The program starts at seven."
            ]
         },
         {
            "id": 84,
            "word": "programme",
            "role": "noun",
            "BrE": "/ˈprəʊɡræm/",
            "AmE": "/ˈproʊɡræm/",
            "definition": "a plan or a show on TV (British spelling)",
            "examples": [
               "The programme is good.",
               "She followed the programme.",
               "The programme was about animals."
            ]
         },
         {
            "id": 84,
            "word": "progress",
            "role": "noun",
            "BrE": "/ˈprəʊɡres/",
            "AmE": "/ˈprɑːɡres/",
            "definition": "improvement or development",
            "examples": [
               "I made progress.",
               "She saw progress in her work.",
               "The progress was slow but good."
            ]
         },
         {
            "id": 84,
            "word": "project",
            "role": "noun",
            "BrE": "/ˈprɒdʒekt/",
            "AmE": "/ˈprɑːdʒekt/",
            "definition": "a planned piece of work",
            "examples": [
               "The project is big.",
               "She worked on a school project.",
               "The project took three weeks."
            ]
         },
         {
            "id": 84,
            "word": "promise",
            "role": "noun",
            "BrE": "/ˈprɒmɪs/",
            "AmE": "/ˈprɑːmɪs/",
            "definition": "a statement that you will do something",
            "examples": [
               "I made a promise.",
               "She kept her promise.",
               "The promise was to help him."
            ]
         },
         {
            "id": 84,
            "word": "promise",
            "role": "verb",
            "BrE": "/ˈprɒmɪs/",
            "AmE": "/ˈprɑːmɪs/",
            "definition": "to say you will definitely do something",
            "examples": [
               "Promise to call.",
               "She promised to come early.",
               "He promised to finish the work."
            ]
         },
         {
            "id": 84,
            "word": "proper",
            "role": "adjective",
            "BrE": "/ˈprɒpə(r)/",
            "AmE": "/ˈprɑːpər/",
            "definition": "correct or suitable",
            "examples": [
               "Wear proper shoes.",
               "She used the proper tool.",
               "The proper answer was easy."
            ]
         },
         {
            "id": 84,
            "word": "protect",
            "role": "verb",
            "BrE": "/prəˈtekt/",
            "AmE": "/prəˈtekt/",
            "definition": "to keep something safe",
            "examples": [
               "Protect your eyes.",
               "She protects her phone.",
               "He protected the child from danger."
            ]
         },
         {
            "id": 85,
            "word": "protection",
            "role": "noun",
            "BrE": "/prəˈtekʃn/",
            "AmE": "/prəˈtekʃn/",
            "definition": "the act of keeping something safe",
            "examples": [
               "I need protection.",
               "She wore protection in the sun.",
               "The protection of the house was good."
            ]
         },
         {
            "id": 85,
            "word": "proud",
            "role": "adjective",
            "BrE": "/praʊd/",
            "AmE": "/praʊd/",
            "definition": "feeling pleased about something",
            "examples": [
               "I’m proud of you.",
               "She is proud of her work.",
               "He was proud of his new car."
            ]
         },
         {
            "id": 85,
            "word": "prove",
            "role": "verb",
            "BrE": "/pruːv/",
            "AmE": "/pruːv/",
            "definition": "to show something is true",
            "examples": [
               "Prove it!",
               "She proved her answer.",
               "He proved he was right."
            ]
         },
         {
            "id": 85,
            "word": "provide",
            "role": "verb",
            "BrE": "/prəˈvaɪd/",
            "AmE": "/prəˈvaɪd/",
            "definition": "to give something to someone",
            "examples": [
               "Provide some water.",
               "She provided food for all.",
               "He provides books for the class."
            ]
         },
         {
            "id": 85,
            "word": "public",
            "role": "adjective",
            "BrE": "/ˈpʌblɪk/",
            "AmE": "/ˈpʌblɪk/",
            "definition": "for everyone to use",
            "examples": [
               "The park is public.",
               "She used a public phone.",
               "The public library is free."
            ]
         },
         {
            "id": 85,
            "word": "pull",
            "role": "verb",
            "BrE": "/pʊl/",
            "AmE": "/pʊl/",
            "definition": "to move something towards you",
            "examples": [
               "Pull the rope.",
               "She pulled the door open.",
               "He pulled the box closer."
            ]
         },
         {
            "id": 85,
            "word": "punish",
            "role": "verb",
            "BrE": "/ˈpʌnɪʃ/",
            "AmE": "/ˈpʌnɪʃ/",
            "definition": "to make someone suffer for doing wrong",
            "examples": [
               "Don’t punish him.",
               "She punished the bad behaviour.",
               "He was punished for being late."
            ]
         },
         {
            "id": 85,
            "word": "pupil",
            "role": "noun",
            "BrE": "/ˈpjuːpl/",
            "AmE": "/ˈpjuːpl/",
            "definition": "a student in school",
            "examples": [
               "The pupil is young.",
               "She is a good pupil.",
               "The pupil answered the question."
            ]
         },
         {
            "id": 85,
            "word": "purpose",
            "role": "noun",
            "BrE": "/ˈpɜːpəs/",
            "AmE": "/ˈpɜːrpəs/",
            "definition": "the reason for doing something",
            "examples": [
               "What’s the purpose?",
               "She explained the purpose.",
               "The purpose of the meeting was clear."
            ]
         },
         {
            "id": 85,
            "word": "push",
            "role": "verb",
            "BrE": "/pʊʃ/",
            "AmE": "/pʊʃ/",
            "definition": "to move something away from you",
            "examples": [
               "Push the door.",
               "She pushed the cart.",
               "He pushed the chair to the wall."
            ]
         },
         {
            "id": 86,
            "word": "put",
            "role": "verb",
            "BrE": "/pʊt/",
            "AmE": "/pʊt/",
            "definition": "to place something somewhere",
            "examples": [
               "Put the book here.",
               "She put her bag on the table.",
               "He put the keys in his pocket."
            ]
         },
         {
            "id": 86,
            "word": "quality",
            "role": "noun",
            "BrE": "/ˈkwɒləti/",
            "AmE": "/ˈkwɑːləti/",
            "definition": "how good or bad something is",
            "examples": [
               "The quality is good.",
               "She bought a quality shirt.",
               "The quality of the food was high."
            ]
         },
         {
            "id": 86,
            "word": "quantity",
            "role": "noun",
            "BrE": "/ˈkwɒntəti/",
            "AmE": "/ˈkwɑːntəti/",
            "definition": "the amount of something",
            "examples": [
               "I need a quantity.",
               "She bought a quantity of apples.",
               "The quantity of books was large."
            ]
         },
         {
            "id": 86,
            "word": "quarter",
            "role": "noun",
            "BrE": "/ˈkwɔːtə(r)/",
            "AmE": "/ˈkwɔːrtər/",
            "definition": "one of four equal parts",
            "examples": [
               "It’s a quarter past.",
               "She ate a quarter of the cake.",
               "The quarter of the book was short."
            ]
         },
         {
            "id": 86,
            "word": "queen",
            "role": "noun",
            "BrE": "/kwiːn/",
            "AmE": "/kwiːn/",
            "definition": "a female ruler or a chess piece",
            "examples": [
               "The queen is kind.",
               "She read about a queen.",
               "The queen moved in the game."
            ]
         },
         {
            "id": 86,
            "word": "question",
            "role": "noun",
            "BrE": "/ˈkwestʃən/",
            "AmE": "/ˈkwestʃən/",
            "definition": "something you ask",
            "examples": [
               "I have a question.",
               "She asked a question in class.",
               "The question was hard to answer."
            ]
         },
         {
            "id": 86,
            "word": "quick",
            "role": "adjective",
            "BrE": "/kwɪk/",
            "AmE": "/kwɪk/",
            "definition": "fast or not taking much time",
            "examples": [
               "Be quick!",
               "She took a quick shower.",
               "The quick walk was fun."
            ]
         },
         {
            "id": 86,
            "word": "quiet",
            "role": "adjective",
            "BrE": "/ˈkwaɪət/",
            "AmE": "/ˈkwaɪət/",
            "definition": "making little or no noise",
            "examples": [
               "The room is quiet.",
               "She likes a quiet place.",
               "The quiet night helped her sleep."
            ]
         },
         {
            "id": 86,
            "word": "quite",
            "role": "adverb",
            "BrE": "/kwaɪt/",
            "AmE": "/kwaɪt/",
            "definition": "fairly or to some degree",
            "examples": [
               "It’s quite cold.",
               "She was quite happy today.",
               "The book is quite interesting."
            ]
         },
         {
            "id": 86,
            "word": "radio",
            "role": "noun",
            "BrE": "/ˈreɪdiəʊ/",
            "AmE": "/ˈreɪdioʊ/",
            "definition": "a device for listening to sound broadcasts",
            "examples": [
               "The radio is on.",
               "She listens to the radio.",
               "The radio played a song."
            ]
         },
         {
            "id": 87,
            "word": "railway",
            "role": "noun",
            "BrE": "/ˈreɪlweɪ/",
            "AmE": "/ˈreɪlweɪ/",
            "definition": "a system of tracks for trains",
            "examples": [
               "The railway is long.",
               "She took the railway to town.",
               "The railway station is busy."
            ]
         },
         {
            "id": 87,
            "word": "rain",
            "role": "noun",
            "BrE": "/reɪn/",
            "AmE": "/reɪn/",
            "definition": "water falling from the sky",
            "examples": [
               "The rain is heavy.",
               "She got wet in the rain.",
               "The rain stopped this morning."
            ]
         },
         {
            "id": 87,
            "word": "rain",
            "role": "verb",
            "BrE": "/reɪn/",
            "AmE": "/reɪn/",
            "definition": "when water falls from the sky",
            "examples": [
               "It will rain soon.",
               "It rained all day.",
               "It’s raining outside now."
            ]
         },
         {
            "id": 87,
            "word": "raise",
            "role": "verb",
            "BrE": "/reɪz/",
            "AmE": "/reɪz/",
            "definition": "to lift or increase something",
            "examples": [
               "Raise your hand.",
               "She raised the flag.",
               "He raised his voice to speak."
            ]
         },
         {
            "id": 87,
            "word": "range",
            "role": "noun",
            "BrE": "/reɪndʒ/",
            "AmE": "/reɪndʒ/",
            "definition": "a variety of things",
            "examples": [
               "A range of books.",
               "She saw a range of colours.",
               "The range of food was good."
            ]
         },
         {
            "id": 87,
            "word": "rare",
            "role": "adjective",
            "BrE": "/reə(r)/",
            "AmE": "/rer/",
            "definition": "not common or happening often",
            "examples": [
               "It’s a rare bird.",
               "She found a rare coin.",
               "The rare flower was beautiful."
            ]
         },
         {
            "id": 87,
            "word": "rather",
            "role": "adverb",
            "BrE": "/ˈrɑːðə(r)/",
            "AmE": "/ˈræðər/",
            "definition": "to some degree or instead",
            "examples": [
               "It’s rather cold.",
               "She rather likes tea.",
               "He’d rather stay home."
            ]
         },
         {
            "id": 87,
            "word": "reach",
            "role": "verb",
            "BrE": "/riːtʃ/",
            "AmE": "/riːtʃ/",
            "definition": "to arrive at or get to something",
            "examples": [
               "Reach the top.",
               "She reached the station.",
               "He reached for the book."
            ]
         },
         {
            "id": 87,
            "word": "read",
            "role": "verb",
            "BrE": "/riːd/",
            "AmE": "/riːd/",
            "definition": "to look at and understand words",
            "examples": [
               "Read this book.",
               "She read a story.",
               "He reads the news every day."
            ]
         },
         {
            "id": 87,
            "word": "ready",
            "role": "adjective",
            "BrE": "/ˈredi/",
            "AmE": "/ˈredi/",
            "definition": "prepared for something",
            "examples": [
               "I’m ready now.",
               "She is ready for school.",
               "The ready meal was quick."
            ]
         },
         {
            "id": 88,
            "word": "real",
            "role": "adjective",
            "BrE": "/rɪəl/",
            "AmE": "/rɪəl/",
            "definition": "true or not imaginary",
            "examples": [
               "It’s a real story.",
               "She saw a real lion.",
               "The real problem was money."
            ]
         },
         {
            "id": 88,
            "word": "realize",
            "role": "verb",
            "BrE": "/ˈrɪəlaɪz/",
            "AmE": "/ˈriːəlaɪz/",
            "definition": "to understand or become aware of something",
            "examples": [
               "I didn’t realize.",
               "She realized it was late.",
               "He realized his mistake."
            ]
         },
         {
            "id": 88,
            "word": "really",
            "role": "adverb",
            "BrE": "/ˈrɪəli/",
            "AmE": "/ˈriːəli/",
            "definition": "truly or very much",
            "examples": [
               "It’s really cold.",
               "She really likes him.",
               "He really wanted to win."
            ]
         },
         {
            "id": 88,
            "word": "reason",
            "role": "noun",
            "BrE": "/ˈriːzn/",
            "AmE": "/ˈriːzn/",
            "definition": "why something happens",
            "examples": [
               "I have a reason.",
               "She gave a reason for being late.",
               "The reason was the rain."
            ]
         },
         {
            "id": 88,
            "word": "receive",
            "role": "verb",
            "BrE": "/rɪˈsiːv/",
            "AmE": "/rɪˈsiːv/",
            "definition": "to get something",
            "examples": [
               "I received a letter.",
               "She received a gift.",
               "He received the news today."
            ]
         },
         {
            "id": 88,
            "word": "recent",
            "role": "adjective",
            "BrE": "/ˈriːsnt/",
            "AmE": "/ˈriːsnt/",
            "definition": "happening not long ago",
            "examples": [
               "It’s a recent book.",
               "She saw a recent movie.",
               "The recent news was good."
            ]
         },
         {
            "id": 88,
            "word": "record",
            "role": "noun",
            "BrE": "/ˈrekɔːd/",
            "AmE": "/ˈrekərd/",
            "definition": "a written account or best performance",
            "examples": [
               "Keep a record.",
               "She broke a running record.",
               "The record of the game was saved."
            ]
         },
         {
            "id": 88,
            "word": "record",
            "role": "verb",
            "BrE": "/rɪˈkɔːd/",
            "AmE": "/rɪˈkɔːrd/",
            "definition": "to store information or sounds",
            "examples": [
               "Record the song.",
               "She recorded the talk.",
               "He records his ideas daily."
            ]
         },
         {
            "id": 88,
            "word": "red",
            "role": "adjective",
            "BrE": "/red/",
            "AmE": "/red/",
            "definition": "the colour of blood",
            "examples": [
               "The apple is red.",
               "She wore a red hat.",
               "The red car is fast."
            ]
         },
         {
            "id": 88,
            "word": "reduce",
            "role": "verb",
            "BrE": "/rɪˈdjuːs/",
            "AmE": "/rɪˈduːs/",
            "definition": "to make something less",
            "examples": [
               "Reduce the price.",
               "She reduced her work hours.",
               "He reduced the noise."
            ]
         },
         {
            "id": 89,
            "word": "refer",
            "role": "verb",
            "BrE": "/rɪˈfɜː(r)/",
            "AmE": "/rɪˈfɜːr/",
            "definition": "to mention or talk about something",
            "examples": [
               "Refer to the book.",
               "She referred to her notes.",
               "He referred to the rules."
            ]
         },
         {
            "id": 89,
            "word": "refuse",
            "role": "verb",
            "BrE": "/rɪˈfjuːz/",
            "AmE": "/rɪˈfjuːz/",
            "definition": "to say no to something",
            "examples": [
               "I refuse to go.",
               "She refused the offer.",
               "He refused to eat the food."
            ]
         },
         {
            "id": 89,
            "word": "regard",
            "role": "verb",
            "BrE": "/rɪˈɡɑːd/",
            "AmE": "/rɪˈɡɑːrd/",
            "definition": "to think of someone or something in a particular way",
            "examples": [
               "I regard him highly.",
               "She regards the book as good.",
               "He regarded the plan as risky."
            ]
         },
         {
            "id": 89,
            "word": "region",
            "role": "noun",
            "BrE": "/ˈriːdʒən/",
            "AmE": "/ˈriːdʒən/",
            "definition": "a large area of land",
            "examples": [
               "The region is warm.",
               "She lives in a cold region.",
               "The region has many forests."
            ]
         },
         {
            "id": 89,
            "word": "regular",
            "role": "adjective",
            "BrE": "/ˈreɡjələ(r)/",
            "AmE": "/ˈreɡjələr/",
            "definition": "happening at fixed times",
            "examples": [
               "It’s a regular event.",
               "She has regular classes.",
               "The regular bus comes at six."
            ]
         },
         {
            "id": 89,
            "word": "relationship",
            "role": "noun",
            "BrE": "/rɪˈleɪʃnʃɪp/",
            "AmE": "/rɪˈleɪʃnʃɪp/",
            "definition": "the way people or things are connected",
            "examples": [
               "They have a relationship.",
               "She has a good relationship with him.",
               "The relationship between them is strong."
            ]
         },
         {
            "id": 89,
            "word": "relative",
            "role": "noun",
            "BrE": "/ˈrelətɪv/",
            "AmE": "/ˈrelətɪv/",
            "definition": "a member of your family",
            "examples": [
               "My relative is here.",
               "She visited her relative.",
               "The relative came for dinner."
            ]
         },
         {
            "id": 89,
            "word": "relax",
            "role": "verb",
            "BrE": "/rɪˈlæks/",
            "AmE": "/rɪˈlæks/",
            "definition": "to rest or become calm",
            "examples": [
               "Relax after work.",
               "She relaxed on the sofa.",
               "He relaxes by reading books."
            ]
         },
         {
            "id": 89,
            "word": "remain",
            "role": "verb",
            "BrE": "/rɪˈmeɪn/",
            "AmE": "/rɪˈmeɪn/",
            "definition": "to stay or continue",
            "examples": [
               "Remain here.",
               "She remained at home.",
               "He remained calm during the test."
            ]
         },
         {
            "id": 89,
            "word": "remember",
            "role": "verb",
            "BrE": "/rɪˈmembə(r)/",
            "AmE": "/rɪˈmembər/",
            "definition": "to keep something in your mind",
            "examples": [
               "Remember my name.",
               "She remembered the story.",
               "He remembers his old school."
            ]
         },
         {
            "id": 90,
            "word": "remove",
            "role": "verb",
            "BrE": "/rɪˈmuːv/",
            "AmE": "/rɪˈmuːv/",
            "definition": "to take something away",
            "examples": [
               "Remove the book.",
               "She removed her shoes.",
               "He removed the old paint."
            ]
         },
         {
            "id": 90,
            "word": "rent",
            "role": "noun",
            "BrE": "/rent/",
            "AmE": "/rent/",
            "definition": "money paid to use something",
            "examples": [
               "The rent is high.",
               "She paid the rent today.",
               "The rent for the house is low."
            ]
         },
         {
            "id": 90,
            "word": "rent",
            "role": "verb",
            "BrE": "/rent/",
            "AmE": "/rent/",
            "definition": "to pay to use something",
            "examples": [
               "Rent a car.",
               "She rented a flat.",
               "He rents a room monthly."
            ]
         },
         {
            "id": 90,
            "word": "repair",
            "role": "verb",
            "BrE": "/rɪˈpeə(r)/",
            "AmE": "/rɪˈper/",
            "definition": "to fix something broken",
            "examples": [
               "Repair the bike.",
               "She repaired the chair.",
               "He repaired the broken window."
            ]
         },
         {
            "id": 90,
            "word": "repeat",
            "role": "verb",
            "BrE": "/rɪˈpiːt/",
            "AmE": "/rɪˈpiːt/",
            "definition": "to say or do something again",
            "examples": [
               "Repeat the word.",
               "She repeated the question.",
               "He repeated the story twice."
            ]
         },
         {
            "id": 90,
            "word": "replace",
            "role": "verb",
            "BrE": "/rɪˈpleɪs/",
            "AmE": "/rɪˈpleɪs/",
            "definition": "to put something new in place of another",
            "examples": [
               "Replace the bulb.",
               "She replaced her old phone.",
               "He replaced the broken cup."
            ]
         },
         {
            "id": 90,
            "word": "reply",
            "role": "noun",
            "BrE": "/rɪˈplaɪ/",
            "AmE": "/rɪˈplaɪ/",
            "definition": "an answer",
            "examples": [
               "I got a reply.",
               "She sent a quick reply.",
               "The reply to her email was short."
            ]
         },
         {
            "id": 90,
            "word": "reply",
            "role": "verb",
            "BrE": "/rɪˈplaɪ/",
            "AmE": "/rɪˈplaɪ/",
            "definition": "to answer someone",
            "examples": [
               "Reply to her.",
               "She replied to the message.",
               "He replied with a smile."
            ]
         },
         {
            "id": 90,
            "word": "report",
            "role": "noun",
            "BrE": "/rɪˈpɔːt/",
            "AmE": "/rɪˈpɔːrt/",
            "definition": "a written or spoken description of something",
            "examples": [
               "I wrote a report.",
               "She read the news report.",
               "The report was about the weather."
            ]
         },
         {
            "id": 90,
            "word": "report",
            "role": "verb",
            "BrE": "/rɪˈpɔːt/",
            "AmE": "/rɪˈpɔːrt/",
            "definition": "to tell about something",
            "examples": [
               "Report the problem.",
               "She reported the news.",
               "He reported the accident."
            ]
         },
         {
            "id": 91,
            "word": "request",
            "role": "noun",
            "BrE": "/rɪˈkwest/",
            "AmE": "/rɪˈkwest/",
            "definition": "the act of asking for something",
            "examples": [
               "I have a request.",
               "She made a request for help.",
               "The request was for more time."
            ]
         },
         {
            "id": 91,
            "word": "request",
            "role": "verb",
            "BrE": "/rɪˈkwest/",
            "AmE": "/rɪˈkwest/",
            "definition": "to ask for something politely",
            "examples": [
               "Request a ticket.",
               "She requested a book.",
               "He requested to leave early."
            ]
         },
         {
            "id": 91,
            "word": "require",
            "role": "verb",
            "BrE": "/rɪˈkwaɪə(r)/",
            "AmE": "/rɪˈkwaɪr/",
            "definition": "to need something",
            "examples": [
               "I require water.",
               "She requires a pen.",
               "The job requires hard work."
            ]
         },
         {
            "id": 91,
            "word": "research",
            "role": "noun",
            "BrE": "/rɪˈsɜːtʃ/",
            "AmE": "/ˈriːsɜːrtʃ/",
            "definition": "study to learn new information",
            "examples": [
               "Research is important.",
               "She did research for school.",
               "The research was about animals."
            ]
         },
         {
            "id": 91,
            "word": "respect",
            "role": "noun",
            "BrE": "/rɪˈspekt/",
            "AmE": "/rɪˈspekt/",
            "definition": "admiration or politeness",
            "examples": [
               "Show respect.",
               "She has respect for him.",
               "Respect for teachers is key."
            ]
         },
         {
            "id": 91,
            "word": "respect",
            "role": "verb",
            "BrE": "/rɪˈspekt/",
            "AmE": "/rɪˈspekt/",
            "definition": "to admire or be polite to someone",
            "examples": [
               "Respect your parents.",
               "She respects her boss.",
               "He respects older people."
            ]
         },
         {
            "id": 91,
            "word": "rest",
            "role": "noun",
            "BrE": "/rest/",
            "AmE": "/rest/",
            "definition": "a time of relaxing or what remains",
            "examples": [
               "I need rest.",
               "She took the rest of the food.",
               "The rest of the day was free."
            ]
         },
         {
            "id": 91,
            "word": "rest",
            "role": "verb",
            "BrE": "/rest/",
            "AmE": "/rest/",
            "definition": "to relax or stop working",
            "examples": [
               "Rest now.",
               "She rested on the sofa.",
               "He rests after work every day."
            ]
         },
         {
            "id": 91,
            "word": "restaurant",
            "role": "noun",
            "BrE": "/ˈrestərɒnt/",
            "AmE": "/ˈrestərɑːnt/",
            "definition": "a place where people eat meals",
            "examples": [
               "The restaurant is nice.",
               "She went to a restaurant.",
               "The restaurant serves pizza."
            ]
         },
         {
            "id": 91,
            "word": "result",
            "role": "noun",
            "BrE": "/rɪˈzʌlt/",
            "AmE": "/rɪˈzʌlt/",
            "definition": "what happens because of something",
            "examples": [
               "The result was good.",
               "She saw the test result.",
               "The result of the game was a tie."
            ]
         },
         {
            "id": 92,
            "word": "return",
            "role": "verb",
            "BrE": "/rɪˈtɜːn/",
            "AmE": "/rɪˈtɜːrn/",
            "definition": "to go back or give back",
            "examples": [
               "Return the book.",
               "She returned home late.",
               "He returned the borrowed pen."
            ]
         },
         {
            "id": 92,
            "word": "rice",
            "role": "noun",
            "BrE": "/raɪs/",
            "AmE": "/raɪs/",
            "definition": "a grain used as food",
            "examples": [
               "I eat rice.",
               "She cooked rice for dinner.",
               "The rice was soft and tasty."
            ]
         },
         {
            "id": 92,
            "word": "rich",
            "role": "adjective",
            "BrE": "/rɪtʃ/",
            "AmE": "/rɪtʃ/",
            "definition": "having a lot of money or value",
            "examples": [
               "He is rich.",
               "She ate rich food.",
               "The rich man helped the town."
            ]
         },
         {
            "id": 92,
            "word": "ride",
            "role": "verb",
            "BrE": "/raɪd/",
            "AmE": "/raɪd/",
            "definition": "to travel on a bike or horse",
            "examples": [
               "Ride a bike.",
               "She rode a horse.",
               "He rides to school every day."
            ]
         },
         {
            "id": 92,
            "word": "right",
            "role": "adjective",
            "BrE": "/raɪt/",
            "AmE": "/raɪt/",
            "definition": "correct or on the right side",
            "examples": [
               "It’s the right answer.",
               "She turned to the right side.",
               "The right choice was easy."
            ]
         },
         {
            "id": 92,
            "word": "right",
            "role": "noun",
            "BrE": "/raɪt/",
            "AmE": "/raɪt/",
            "definition": "the right side or a legal claim",
            "examples": [
               "Turn to the right.",
               "She has the right to speak.",
               "The right of the road is clear."
            ]
         },
         {
            "id": 92,
            "word": "ring",
            "role": "noun",
            "BrE": "/rɪŋ/",
            "AmE": "/rɪŋ/",
            "definition": "a piece of jewellery or a sound",
            "examples": [
               "She has a ring.",
               "The phone made a ring.",
               "The ring on her finger is gold."
            ]
         },
         {
            "id": 92,
            "word": "ring",
            "role": "verb",
            "BrE": "/rɪŋ/",
            "AmE": "/rɪŋ/",
            "definition": "to make a bell sound or call",
            "examples": [
               "Ring the bell.",
               "She rang her friend.",
               "He rings the office daily."
            ]
         },
         {
            "id": 92,
            "word": "rise",
            "role": "verb",
            "BrE": "/raɪz/",
            "AmE": "/raɪz/",
            "definition": "to go up",
            "examples": [
               "The sun rises.",
               "She rose from her chair.",
               "Prices rise every year."
            ]
         },
         {
            "id": 92,
            "word": "risk",
            "role": "noun",
            "BrE": "/rɪsk/",
            "AmE": "/rɪsk/",
            "definition": "the chance of something bad happening",
            "examples": [
               "It’s a risk.",
               "She took a big risk.",
               "The risk of rain is high."
            ]
         },
         {
            "id": 93,
            "word": "river",
            "role": "noun",
            "BrE": "/ˈrɪvə(r)/",
            "AmE": "/ˈrɪvər/",
            "definition": "a large flow of water",
            "examples": [
               "The river is wide.",
               "She swam in the river.",
               "The river flows to the sea."
            ]
         },
         {
            "id": 93,
            "word": "road",
            "role": "noun",
            "BrE": "/rəʊd/",
            "AmE": "/roʊd/",
            "definition": "a way for vehicles or people to travel",
            "examples": [
               "The road is long.",
               "She walked down the road.",
               "The road to the city is busy."
            ]
         },
         {
            "id": 93,
            "word": "rock",
            "role": "noun",
            "BrE": "/rɒk/",
            "AmE": "/rɑːk/",
            "definition": "a hard, natural material or music type",
            "examples": [
               "The rock is heavy.",
               "She likes rock music.",
               "The rock on the hill is big."
            ]
         },
         {
            "id": 93,
            "word": "role",
            "role": "noun",
            "BrE": "/rəʊl/",
            "AmE": "/roʊl/",
            "definition": "a part or job someone has",
            "examples": [
               "Her role is teacher.",
               "She played a role in the play.",
               "His role in the team is leader."
            ]
         },
         {
            "id": 93,
            "word": "roll",
            "role": "verb",
            "BrE": "/rəʊl/",
            "AmE": "/roʊl/",
            "definition": "to move by turning over",
            "examples": [
               "Roll the ball.",
               "She rolled the dice.",
               "The car rolled down the hill."
            ]
         },
         {
            "id": 93,
            "word": "roof",
            "role": "noun",
            "BrE": "/ruːf/",
            "AmE": "/ruːf/",
            "definition": "the top covering of a building",
            "examples": [
               "The roof is red.",
               "She fixed the roof.",
               "The roof of the house is new."
            ]
         },
         {
            "id": 93,
            "word": "room",
            "role": "noun",
            "BrE": "/ruːm/",
            "AmE": "/ruːm/",
            "definition": "a part of a building or space",
            "examples": [
               "The room is big.",
               "She cleaned her room.",
               "There’s room for more chairs."
            ]
         },
         {
            "id": 93,
            "word": "rope",
            "role": "noun",
            "BrE": "/rəʊp/",
            "AmE": "/roʊp/",
            "definition": "a strong, thick string",
            "examples": [
               "The rope is strong.",
               "She tied the rope.",
               "The rope held the boat."
            ]
         },
         {
            "id": 93,
            "word": "rough",
            "role": "adjective",
            "BrE": "/rʌf/",
            "AmE": "/rʌf/",
            "definition": "not smooth or gentle",
            "examples": [
               "The road is rough.",
               "She touched the rough wall.",
               "The rough sea was dangerous."
            ]
         },
         {
            "id": 93,
            "word": "round",
            "role": "adjective",
            "BrE": "/raʊnd/",
            "AmE": "/raʊnd/",
            "definition": "shaped like a circle",
            "examples": [
               "The table is round.",
               "She bought a round mirror.",
               "The round clock is old."
            ]
         },
         {
            "id": 94,
            "word": "route",
            "role": "noun",
            "BrE": "/ruːt/",
            "AmE": "/ruːt/",
            "definition": "a way to go from one place to another",
            "examples": [
               "The route is short.",
               "She took a new route.",
               "The route to school is safe."
            ]
         },
         {
            "id": 94,
            "word": "row",
            "role": "noun",
            "BrE": "/rəʊ/",
            "AmE": "/roʊ/",
            "definition": "a line of things or people",
            "examples": [
               "Sit in a row.",
               "She saw a row of trees.",
               "The row of chairs was neat."
            ]
         },
         {
            "id": 94,
            "word": "rule",
            "role": "noun",
            "BrE": "/ruːl/",
            "AmE": "/ruːl/",
            "definition": "an instruction about what is allowed",
            "examples": [
               "Follow the rule.",
               "She broke a school rule.",
               "The rule says no running."
            ]
         },
         {
            "id": 94,
            "word": "run",
            "role": "verb",
            "BrE": "/rʌn/",
            "AmE": "/rʌn/",
            "definition": "to move quickly on foot",
            "examples": [
               "Run to school.",
               "She runs every morning.",
               "He ran to catch the bus."
            ]
         },
         {
            "id": 94,
            "word": "safe",
            "role": "adjective",
            "BrE": "/seɪf/",
            "AmE": "/seɪf/",
            "definition": "not dangerous",
            "examples": [
               "The place is safe.",
               "She feels safe at home.",
               "The safe road was quiet."
            ]
         },
         {
            "id": 94,
            "word": "sail",
            "role": "verb",
            "BrE": "/seɪl/",
            "AmE": "/seɪl/",
            "definition": "to travel on water using a boat",
            "examples": [
               "Sail the boat.",
               "She sailed across the lake.",
               "He sails with his friends."
            ]
         },
         {
            "id": 94,
            "word": "salad",
            "role": "noun",
            "BrE": "/ˈsæləd/",
            "AmE": "/ˈsæləd/",
            "definition": "a dish of mixed vegetables",
            "examples": [
               "I ate a salad.",
               "She made a salad for lunch.",
               "The salad has tomatoes."
            ]
         },
         {
            "id": 94,
            "word": "sale",
            "role": "noun",
            "BrE": "/seɪl/",
            "AmE": "/seɪl/",
            "definition": "the act of selling something",
            "examples": [
               "The sale is today.",
               "She went to a big sale.",
               "The sale of the car was quick."
            ]
         },
         {
            "id": 94,
            "word": "salt",
            "role": "noun",
            "BrE": "/sɒlt/",
            "AmE": "/sɔːlt/",
            "definition": "a white substance used in cooking",
            "examples": [
               "Add some salt.",
               "She used salt in the soup.",
               "The salt is on the table."
            ]
         },
         {
            "id": 94,
            "word": "same",
            "role": "adjective",
            "BrE": "/seɪm/",
            "AmE": "/seɪm/",
            "definition": "not different",
            "examples": [
               "We have the same book.",
               "She wore the same dress.",
               "The same time works for me."
            ]
         },
         {
            "id": 95,
            "word": "sand",
            "role": "noun",
            "BrE": "/sænd/",
            "AmE": "/sænd/",
            "definition": "tiny grains on beaches or deserts",
            "examples": [
               "The sand is hot.",
               "She played in the sand.",
               "The sand on the beach is soft."
            ]
         },
         {
            "id": 95,
            "word": "sandwich",
            "role": "noun",
            "BrE": "/ˈsænwɪtʃ/",
            "AmE": "/ˈsændwɪtʃ/",
            "definition": "food between two slices of bread",
            "examples": [
               "I ate a sandwich.",
               "She made a cheese sandwich.",
               "The sandwich was for lunch."
            ]
         },
         {
            "id": 95,
            "word": "save",
            "role": "verb",
            "BrE": "/seɪv/",
            "AmE": "/seɪv/",
            "definition": "to keep safe or store for later",
            "examples": [
               "Save your money.",
               "She saved her work.",
               "He saved the child from danger."
            ]
         },
         {
            "id": 95,
            "word": "say",
            "role": "verb",
            "BrE": "/seɪ/",
            "AmE": "/seɪ/",
            "definition": "to speak or express something",
            "examples": [
               "Say your name.",
               "She said she was tired.",
               "He says the same thing daily."
            ]
         },
         {
            "id": 95,
            "word": "scene",
            "role": "noun",
            "BrE": "/siːn/",
            "AmE": "/siːn/",
            "definition": "a part of a play or a view",
            "examples": [
               "The scene was funny.",
               "She saw a beautiful scene.",
               "The scene in the movie was sad."
            ]
         },
         {
            "id": 95,
            "word": "school",
            "role": "noun",
            "BrE": "/skuːl/",
            "AmE": "/skuːl/",
            "definition": "a place where children learn",
            "examples": [
               "School starts soon.",
               "She goes to a big school.",
               "The school has a library."
            ]
         },
         {
            "id": 95,
            "word": "science",
            "role": "noun",
            "BrE": "/ˈsaɪəns/",
            "AmE": "/ˈsaɪəns/",
            "definition": "the study of the natural world",
            "examples": [
               "I like science.",
               "She studies science at school.",
               "Science helps us understand life."
            ]
         },
         {
            "id": 95,
            "word": "scientist",
            "role": "noun",
            "BrE": "/ˈsaɪəntɪst/",
            "AmE": "/ˈsaɪəntɪst/",
            "definition": "a person who studies science",
            "examples": [
               "The scientist is smart.",
               "She met a scientist.",
               "The scientist works in a lab."
            ]
         },
         {
            "id": 95,
            "word": "score",
            "role": "noun",
            "BrE": "/skɔː(r)/",
            "AmE": "/skɔːr/",
            "definition": "points in a game or test",
            "examples": [
               "The score was high.",
               "She got a good score.",
               "The score in the game was close."
            ]
         },
         {
            "id": 95,
            "word": "score",
            "role": "verb",
            "BrE": "/skɔː(r)/",
            "AmE": "/skɔːr/",
            "definition": "to get points in a game",
            "examples": [
               "Score a goal.",
               "She scored in the match.",
               "He scored three points."
            ]
         },
         {
            "id": 96,
            "word": "screen",
            "role": "noun",
            "BrE": "/skriːn/",
            "AmE": "/skriːn/",
            "definition": "a flat surface for showing images",
            "examples": [
               "The screen is big.",
               "She watched a movie on the screen.",
               "The phone screen is bright."
            ]
         },
         {
            "id": 96,
            "word": "sea",
            "role": "noun",
            "BrE": "/siː/",
            "AmE": "/siː/",
            "definition": "a large area of salt water",
            "examples": [
               "The sea is blue.",
               "She swam in the sea.",
               "The sea was calm today."
            ]
         },
         {
            "id": 96,
            "word": "search",
            "role": "verb",
            "BrE": "/sɜːtʃ/",
            "AmE": "/sɜːrtʃ/",
            "definition": "to look for something",
            "examples": [
               "Search for the key.",
               "She searched her bag.",
               "He searched for his phone."
            ]
         },
         {
            "id": 96,
            "word": "season",
            "role": "noun",
            "BrE": "/ˈsiːzn/",
            "AmE": "/ˈsiːzn/",
            "definition": "a time of year with specific weather",
            "examples": [
               "Winter is a season.",
               "She likes the spring season.",
               "The season for rain is here."
            ]
         },
         {
            "id": 96,
            "word": "seat",
            "role": "noun",
            "BrE": "/siːt/",
            "AmE": "/siːt/",
            "definition": "a place to sit",
            "examples": [
               "Take a seat.",
               "She found a seat on the bus.",
               "The seat in the car is soft."
            ]
         },
         {
            "id": 96,
            "word": "second",
            "role": "adjective",
            "BrE": "/ˈsekənd/",
            "AmE": "/ˈsekənd/",
            "definition": "coming after the first",
            "examples": [
               "The second book.",
               "She was the second winner.",
               "The second day was sunny."
            ]
         },
         {
            "id": 96,
            "word": "second",
            "role": "noun",
            "BrE": "/ˈsekənd/",
            "AmE": "/ˈsekənd/",
            "definition": "a unit of time",
            "examples": [
               "Wait a second.",
               "She ran in ten seconds.",
               "The second passed quickly."
            ]
         },
         {
            "id": 96,
            "word": "secret",
            "role": "noun",
            "BrE": "/ˈsiːkrət/",
            "AmE": "/ˈsiːkrət/",
            "definition": "something not told to others",
            "examples": [
               "It’s a secret.",
               "She told me a secret.",
               "The secret was about her plan."
            ]
         },
         {
            "id": 96,
            "word": "section",
            "role": "noun",
            "BrE": "/ˈsekʃn/",
            "AmE": "/ˈsekʃn/",
            "definition": "a part of something",
            "examples": [
               "Read this section.",
               "She found a section in the book.",
               "The section of the store is big."
            ]
         },
         {
            "id": 96,
            "word": "see",
            "role": "verb",
            "BrE": "/siː/",
            "AmE": "/siː/",
            "definition": "to look at or notice something",
            "examples": [
               "See the bird.",
               "She saw a movie yesterday.",
               "He sees his friend every week."
            ]
         },
         {
            "id": 97,
            "word": "seem",
            "role": "verb",
            "BrE": "/siːm/",
            "AmE": "/siːm/",
            "definition": "to appear to be something",
            "examples": [
               "It seems easy.",
               "She seems happy today.",
               "He seemed tired after work."
            ]
         },
         {
            "id": 97,
            "word": "sell",
            "role": "verb",
            "BrE": "/sel/",
            "AmE": "/sel/",
            "definition": "to give something for money",
            "examples": [
               "Sell the car.",
               "She sold her old bike.",
               "He sells fruit at the market."
            ]
         },
         {
            "id": 97,
            "word": "send",
            "role": "verb",
            "BrE": "/send/",
            "AmE": "/send/",
            "definition": "to make something go somewhere",
            "examples": [
               "Send a letter.",
               "She sent a text message.",
               "He sends emails every day."
            ]
         },
         {
            "id": 97,
            "word": "sense",
            "role": "noun",
            "BrE": "/sens/",
            "AmE": "/sens/",
            "definition": "a feeling or ability to understand",
            "examples": [
               "I have a sense.",
               "She has a sense of humour.",
               "His sense of direction is good."
            ]
         },
         {
            "id": 97,
            "word": "sentence",
            "role": "noun",
            "BrE": "/ˈsentəns/",
            "AmE": "/ˈsentəns/",
            "definition": "a group of words expressing an idea",
            "examples": [
               "Write a sentence.",
               "She read a long sentence.",
               "The sentence was about a dog."
            ]
         },
         {
            "id": 97,
            "word": "separate",
            "role": "adjective",
            "BrE": "/ˈsepərət/",
            "AmE": "/ˈsepərət/",
            "definition": "not together or different",
            "examples": [
               "Use separate rooms.",
               "She has a separate bag.",
               "The separate groups worked alone."
            ]
         },
         {
            "id": 97,
            "word": "serious",
            "role": "adjective",
            "BrE": "/ˈsɪəriəs/",
            "AmE": "/ˈsɪriəs/",
            "definition": "important or not joking",
            "examples": [
               "It’s a serious problem.",
               "She was serious about work.",
               "He has a serious face."
            ]
         },
         {
            "id": 97,
            "word": "serve",
            "role": "verb",
            "BrE": "/sɜːv/",
            "AmE": "/sɜːrv/",
            "definition": "to give food or help",
            "examples": [
               "Serve the food.",
               "She served tea to guests.",
               "He serves at the restaurant."
            ]
         },
         {
            "id": 97,
            "word": "service",
            "role": "noun",
            "BrE": "/ˈsɜːvɪs/",
            "AmE": "/ˈsɜːrvɪs/",
            "definition": "work done for others",
            "examples": [
               "The service is good.",
               "She used a taxi service.",
               "The service at the shop was fast."
            ]
         },
         {
            "id": 97,
            "word": "set",
            "role": "verb",
            "BrE": "/set/",
            "AmE": "/set/",
            "definition": "to put or arrange something",
            "examples": [
               "Set the table.",
               "She set the clock to six.",
               "He set the bag on the floor."
            ]
         },
         {
            "id": 98,
            "word": "several",
            "role": "adjective",
            "BrE": "/ˈsevrəl/",
            "AmE": "/ˈsevrəl/",
            "definition": "more than two but not many",
            "examples": [
               "I have several books.",
               "She met several friends.",
               "Several people came to the party."
            ]
         },
         {
            "id": 98,
            "word": "shake",
            "role": "verb",
            "BrE": "/ʃeɪk/",
            "AmE": "/ʃeɪk/",
            "definition": "to move quickly up and down or side to side",
            "examples": [
               "Shake the bottle.",
               "She shook her head.",
               "He shook the rug to clean it."
            ]
         },
         {
            "id": 98,
            "word": "shape",
            "role": "noun",
            "BrE": "/ʃeɪp/",
            "AmE": "/ʃeɪp/",
            "definition": "the form of something",
            "examples": [
               "The shape is round.",
               "She drew a heart shape.",
               "The shape of the box is square."
            ]
         },
         {
            "id": 98,
            "word": "share",
            "role": "verb",
            "BrE": "/ʃeə(r)/",
            "AmE": "/ʃer/",
            "definition": "to give a part to someone else",
            "examples": [
               "Share the cake.",
               "She shared her book.",
               "He shares his room with a friend."
            ]
         },
         {
            "id": 98,
            "word": "sharp",
            "role": "adjective",
            "BrE": "/ʃɑːp/",
            "AmE": "/ʃɑːrp/",
            "definition": "having a thin edge or point",
            "examples": [
               "The knife is sharp.",
               "She used a sharp pencil.",
               "The sharp needle was small."
            ]
         },
         {
            "id": 98,
            "word": "sheep",
            "role": "noun",
            "BrE": "/ʃiːp/",
            "AmE": "/ʃiːp/",
            "definition": "an animal with wool",
            "examples": [
               "The sheep is white.",
               "She saw sheep on the farm.",
               "The sheep eat grass."
            ]
         },
         {
            "id": 98,
            "word": "sheet",
            "role": "noun",
            "BrE": "/ʃiːt/",
            "AmE": "/ʃiːt/",
            "definition": "a large piece of cloth or paper",
            "examples": [
               "The sheet is clean.",
               "She wrote on a sheet of paper.",
               "The sheet on the bed is blue."
            ]
         },
         {
            "id": 98,
            "word": "shelf",
            "role": "noun",
            "BrE": "/ʃelf/",
            "AmE": "/ʃelf/",
            "definition": "a flat surface for storing things",
            "examples": [
               "The shelf is high.",
               "She put books on the shelf.",
               "The shelf in the room is full."
            ]
         },
         {
            "id": 98,
            "word": "shine",
            "role": "verb",
            "BrE": "/ʃaɪn/",
            "AmE": "/ʃaɪn/",
            "definition": "to give out or reflect light",
            "examples": [
               "The sun shines.",
               "She shined her shoes.",
               "The light shines brightly."
            ]
         },
         {
            "id": 98,
            "word": "ship",
            "role": "noun",
            "BrE": "/ʃɪp/",
            "AmE": "/ʃɪp/",
            "definition": "a large boat for travelling on water",
            "examples": [
               "The ship is big.",
               "She saw a ship at sea.",
               "The ship sailed to the island."
            ]
         },
         {
            "id": 99,
            "word": "shirt",
            "role": "noun",
            "BrE": "/ʃɜːt/",
            "AmE": "/ʃɜːrt/",
            "definition": "a piece of clothing for the upper body",
            "examples": [
               "The shirt is blue.",
               "She wore a clean shirt.",
               "The shirt fits him well."
            ]
         },
         {
            "id": 99,
            "word": "shoe",
            "role": "noun",
            "BrE": "/ʃuː/",
            "AmE": "/ʃuː/",
            "definition": "a covering for the foot",
            "examples": [
               "My shoe is new.",
               "She bought black shoes.",
               "The shoe was too small."
            ]
         },
         {
            "id": 99,
            "word": "shop",
            "role": "noun",
            "BrE": "/ʃɒp/",
            "AmE": "/ʃɑːp/",
            "definition": "a place where things are sold",
            "examples": [
               "The shop is open.",
               "She went to the clothes shop.",
               "The shop sells food."
            ]
         },
         {
            "id": 99,
            "word": "shop",
            "role": "verb",
            "BrE": "/ʃɒp/",
            "AmE": "/ʃɑːp/",
            "definition": "to buy things in a shop",
            "examples": [
               "I shop for food.",
               "She shops every weekend.",
               "He shopped for a new shirt."
            ]
         },
         {
            "id": 99,
            "word": "short",
            "role": "adjective",
            "BrE": "/ʃɔːt/",
            "AmE": "/ʃɔːrt/",
            "definition": "not long or tall",
            "examples": [
               "The story is short.",
               "She has short hair.",
               "The short path was easy."
            ]
         },
         {
            "id": 99,
            "word": "shoulder",
            "role": "noun",
            "BrE": "/ˈʃəʊldə(r)/",
            "AmE": "/ˈʃoʊldər/",
            "definition": "the part of the body between the neck and arm",
            "examples": [
               "My shoulder hurts.",
               "She carried a bag on her shoulder.",
               "The shoulder of the shirt is torn."
            ]
         },
         {
            "id": 99,
            "word": "shout",
            "role": "verb",
            "BrE": "/ʃaʊt/",
            "AmE": "/ʃaʊt/",
            "definition": "to speak loudly",
            "examples": [
               "Don’t shout!",
               "She shouted his name.",
               "He shouted for help."
            ]
         },
         {
            "id": 99,
            "word": "show",
            "role": "noun",
            "BrE": "/ʃəʊ/",
            "AmE": "/ʃoʊ/",
            "definition": "a performance or event",
            "examples": [
               "The show is fun.",
               "She watched a TV show.",
               "The show starts at seven."
            ]
         },
         {
            "id": 99,
            "word": "show",
            "role": "verb",
            "BrE": "/ʃəʊ/",
            "AmE": "/ʃoʊ/",
            "definition": "to let someone see something",
            "examples": [
               "Show me the book.",
               "She showed her picture.",
               "He shows his work to the class."
            ]
         },
         {
            "id": 99,
            "word": "shower",
            "role": "noun",
            "BrE": "/ˈʃaʊə(r)/",
            "AmE": "/ˈʃaʊər/",
            "definition": "a device for washing or a short rain",
            "examples": [
               "I took a shower.",
               "She used the shower.",
               "The shower of rain was quick."
            ]
         },
         {
            "id": 100,
            "word": "shut",
            "role": "verb",
            "BrE": "/ʃʌt/",
            "AmE": "/ʃʌt/",
            "definition": "to close something",
            "examples": [
               "Shut the door.",
               "She shut the window.",
               "He shut the book quickly."
            ]
         },
         {
            "id": 100,
            "word": "sick",
            "role": "adjective",
            "BrE": "/sɪk/",
            "AmE": "/sɪk/",
            "definition": "not well or ill",
            "examples": [
               "I feel sick.",
               "She was sick yesterday.",
               "The sick child stayed home."
            ]
         },
         {
            "id": 100,
            "word": "side",
            "role": "noun",
            "BrE": "/saɪd/",
            "AmE": "/saɪd/",
            "definition": "one part or edge of something",
            "examples": [
               "The side is green.",
               "She sat on the side of the bed.",
               "The side of the house is big."
            ]
         },
         {
            "id": 100,
            "word": "sight",
            "role": "noun",
            "BrE": "/saɪt/",
            "AmE": "/saɪt/",
            "definition": "the ability to see or something seen",
            "examples": [
               "My sight is good.",
               "She saw a beautiful sight.",
               "The sight of the sea was amazing."
            ]
         },
         {
            "id": 100,
            "word": "sign",
            "role": "noun",
            "BrE": "/saɪn/",
            "AmE": "/saɪn/",
            "definition": "a symbol or notice with information",
            "examples": [
               "See the sign.",
               "She read the road sign.",
               "The sign says no parking."
            ]
         },
         {
            "id": 100,
            "word": "sign",
            "role": "verb",
            "BrE": "/saɪn/",
            "AmE": "/saɪn/",
            "definition": "to write your name",
            "examples": [
               "Sign the paper.",
               "She signed the letter.",
               "He signed the book for her."
            ]
         },
         {
            "id": 100,
            "word": "silent",
            "role": "adjective",
            "BrE": "/ˈsaɪlənt/",
            "AmE": "/ˈsaɪlənt/",
            "definition": "without sound",
            "examples": [
               "The room is silent.",
               "She stayed silent in class.",
               "The silent night was calm."
            ]
         },
         {
            "id": 100,
            "word": "silver",
            "role": "noun",
            "BrE": "/ˈsɪlvə(r)/",
            "AmE": "/ˈsɪlvər/",
            "definition": "a shiny, grey-white metal",
            "examples": [
               "The ring is silver.",
               "She bought a silver spoon.",
               "The silver necklace is pretty."
            ]
         },
         {
            "id": 100,
            "word": "similar",
            "role": "adjective",
            "BrE": "/ˈsɪmɪlə(r)/",
            "AmE": "/ˈsɪmɪlər/",
            "definition": "almost the same",
            "examples": [
               "The bags are similar.",
               "She has a similar dress.",
               "Their houses look similar."
            ]
         },
         {
            "id": 100,
            "word": "simple",
            "role": "adjective",
            "BrE": "/ˈsɪmpl/",
            "AmE": "/ˈsɪmpl/",
            "definition": "easy or not complicated",
            "examples": [
               "The task is simple.",
               "She made a simple meal.",
               "The simple plan worked well."
            ]
         },
         {
            "id": 101,
            "word": "since",
            "role": "preposition",
            "BrE": "/sɪns/",
            "AmE": "/sɪns/",
            "definition": "from a time in the past until now",
            "examples": [
               "Since last week.",
               "She’s been here since Monday.",
               "He’s worked since last year."
            ]
         },
         {
            "id": 101,
            "word": "sing",
            "role": "verb",
            "BrE": "/sɪŋ/",
            "AmE": "/sɪŋ/",
            "definition": "to make musical sounds with your voice",
            "examples": [
               "Sing a song.",
               "She sang in the choir.",
               "He sings every morning."
            ]
         },
         {
            "id": 101,
            "word": "single",
            "role": "adjective",
            "BrE": "/ˈsɪŋɡl/",
            "AmE": "/ˈsɪŋɡl/",
            "definition": "only one",
            "examples": [
               "A single ticket.",
               "She bought a single apple.",
               "The single chair was small."
            ]
         },
         {
            "id": 101,
            "word": "sink",
            "role": "noun",
            "BrE": "/sɪŋk/",
            "AmE": "/sɪŋk/",
            "definition": "a basin for washing dishes",
            "examples": [
               "The sink is full.",
               "She cleaned the sink.",
               "The sink in the kitchen is new."
            ]
         },
         {
            "id": 101,
            "word": "sister",
            "role": "noun",
            "BrE": "/ˈsɪstə(r)/",
            "AmE": "/ˈsɪstər/",
            "definition": "a female sibling",
            "examples": [
               "My sister is kind.",
               "She helped her sister.",
               "The sister lives next door."
            ]
         },
         {
            "id": 101,
            "word": "sit",
            "role": "verb",
            "BrE": "/sɪt/",
            "AmE": "/sɪt/",
            "definition": "to rest on a chair or seat",
            "examples": [
               "Sit here.",
               "She sat on the bench.",
               "He sits in class every day."
            ]
         },
         {
            "id": 101,
            "word": "site",
            "role": "noun",
            "BrE": "/saɪt/",
            "AmE": "/saɪt/",
            "definition": "a place where something happens",
            "examples": [
               "The site is old.",
               "She visited a building site.",
               "The site of the school is big."
            ]
         },
         {
            "id": 101,
            "word": "situation",
            "role": "noun",
            "BrE": "/ˌsɪtʃuˈeɪʃn/",
            "AmE": "/ˌsɪtʃuˈeɪʃn/",
            "definition": "the conditions at a particular time",
            "examples": [
               "The situation is good.",
               "She fixed the situation.",
               "The situation at work was hard."
            ]
         },
         {
            "id": 101,
            "word": "size",
            "role": "noun",
            "BrE": "/saɪz/",
            "AmE": "/saɪz/",
            "definition": "how big or small something is",
            "examples": [
               "The size is small.",
               "She checked the shirt size.",
               "The size of the box is large."
            ]
         },
         {
            "id": 101,
            "word": "skill",
            "role": "noun",
            "BrE": "/skɪl/",
            "AmE": "/skɪl/",
            "definition": "the ability to do something well",
            "examples": [
               "She has skill.",
               "He learned a new skill.",
               "Her skill in drawing is great."
            ]
         },
         {
            "id": 102,
            "word": "skin",
            "role": "noun",
            "BrE": "/skɪn/",
            "AmE": "/skɪn/",
            "definition": "the outer covering of the body",
            "examples": [
               "Her skin is soft.",
               "She cut the skin of the apple.",
               "The skin on his arm is red."
            ]
         },
         {
            "id": 102,
            "word": "sky",
            "role": "noun",
            "BrE": "/skaɪ/",
            "AmE": "/skaɪ/",
            "definition": "the space above the earth",
            "examples": [
               "The sky is blue.",
               "She looked at the sky.",
               "The sky was full of stars."
            ]
         },
         {
            "id": 102,
            "word": "sleep",
            "role": "verb",
            "BrE": "/sliːp/",
            "AmE": "/sliːp/",
            "definition": "to rest with eyes closed",
            "examples": [
               "I sleep at night.",
               "She slept for eight hours.",
               "He sleeps in a big bed."
            ]
         },
         {
            "id": 102,
            "word": "slow",
            "role": "adjective",
            "BrE": "/sləʊ/",
            "AmE": "/sloʊ/",
            "definition": "not fast",
            "examples": [
               "The car is slow.",
               "She walks at a slow pace.",
               "The slow train was late."
            ]
         },
         {
            "id": 102,
            "word": "small",
            "role": "adjective",
            "BrE": "/smɔːl/",
            "AmE": "/smɔːl/",
            "definition": "not big",
            "examples": [
               "The dog is small.",
               "She has a small bag.",
               "The small room was cozy."
            ]
         },
         {
            "id": 102,
            "word": "smile",
            "role": "noun",
            "BrE": "/smaɪl/",
            "AmE": "/smaɪl/",
            "definition": "a happy expression on the face",
            "examples": [
               "Her smile is nice.",
               "She gave a big smile.",
               "The smile made him happy."
            ]
         },
         {
            "id": 102,
            "word": "smile",
            "role": "verb",
            "BrE": "/smaɪl/",
            "AmE": "/smaɪl/",
            "definition": "to make a happy expression",
            "examples": [
               "Smile for the photo.",
               "She smiled at her friend.",
               "He smiles when he’s happy."
            ]
         },
         {
            "id": 102,
            "word": "smoke",
            "role": "noun",
            "BrE": "/sməʊk/",
            "AmE": "/smoʊk/",
            "definition": "the cloud from burning",
            "examples": [
               "The smoke is thick.",
               "She saw smoke from the fire.",
               "The smoke filled the room."
            ]
         },
         {
            "id": 102,
            "word": "smooth",
            "role": "adjective",
            "BrE": "/smuːð/",
            "AmE": "/smuːð/",
            "definition": "flat or even, not rough",
            "examples": [
               "The road is smooth.",
               "She touched the smooth stone.",
               "The smooth paper was nice."
            ]
         },
         {
            "id": 102,
            "word": "snake",
            "role": "noun",
            "BrE": "/sneɪk/",
            "AmE": "/sneɪk/",
            "definition": "a long, thin animal with no legs",
            "examples": [
               "The snake is long.",
               "She saw a snake in the grass.",
               "The snake moved quietly."
            ]
         },
         {
            "id": 103,
            "word": "snow",
            "role": "noun",
            "BrE": "/snəʊ/",
            "AmE": "/snoʊ/",
            "definition": "soft, white pieces of frozen water",
            "examples": [
               "The snow is cold.",
               "She played in the snow.",
               "The snow covered the ground."
            ]
         },
         {
            "id": 103,
            "word": "snow",
            "role": "verb",
            "BrE": "/snəʊ/",
            "AmE": "/snoʊ/",
            "definition": "when snow falls from the sky",
            "examples": [
               "It will snow soon.",
               "It snowed all day.",
               "It’s snowing outside now."
            ]
         },
         {
            "id": 103,
            "word": "soap",
            "role": "noun",
            "BrE": "/səʊp/",
            "AmE": "/soʊp/",
            "definition": "a substance used for cleaning",
            "examples": [
               "I need soap.",
               "She used soap to wash.",
               "The soap smells nice."
            ]
         },
         {
            "id": 103,
            "word": "social",
            "role": "adjective",
            "BrE": "/ˈsəʊʃl/",
            "AmE": "/ˈsoʊʃl/",
            "definition": "relating to people or society",
            "examples": [
               "It’s a social event.",
               "She likes social media.",
               "The social club is fun."
            ]
         },
         {
            "id": 103,
            "word": "society",
            "role": "noun",
            "BrE": "/səˈsaɪəti/",
            "AmE": "/səˈsaɪəti/",
            "definition": "people living together in a group",
            "examples": [
               "Society is changing.",
               "She works for society.",
               "The society in the city is big."
            ]
         },
         {
            "id": 103,
            "word": "sock",
            "role": "noun",
            "BrE": "/sɒk/",
            "AmE": "/sɑːk/",
            "definition": "a piece of clothing for the foot",
            "examples": [
               "The sock is warm.",
               "She wore a blue sock.",
               "The sock has a hole."
            ]
         },
         {
            "id": 103,
            "word": "soft",
            "role": "adjective",
            "BrE": "/sɒft/",
            "AmE": "/sɔːft/",
            "definition": "not hard or rough",
            "examples": [
               "The bed is soft.",
               "She touched a soft pillow.",
               "The soft blanket was warm."
            ]
         },
         {
            "id": 103,
            "word": "soil",
            "role": "noun",
            "BrE": "/sɔɪl/",
            "AmE": "/sɔɪl/",
            "definition": "the ground where plants grow",
            "examples": [
               "The soil is wet.",
               "She planted in the soil.",
               "The soil in the garden is good."
            ]
         },
         {
            "id": 103,
            "word": "soldier",
            "role": "noun",
            "BrE": "/ˈsəʊldʒə(r)/",
            "AmE": "/ˈsoʊldʒər/",
            "definition": "a person in an army",
            "examples": [
               "The soldier is brave.",
               "She met a soldier.",
               "The soldier marched in the parade."
            ]
         },
         {
            "id": 103,
            "word": "solution",
            "role": "noun",
            "BrE": "/səˈluːʃn/",
            "AmE": "/səˈluːʃn/",
            "definition": "a way to solve a problem",
            "examples": [
               "Find a solution.",
               "She found a solution to the puzzle.",
               "The solution was simple."
            ]
         },
         {
            "id": 104,
            "word": "solve",
            "role": "verb",
            "BrE": "/sɒlv/",
            "AmE": "/sɑːlv/",
            "definition": "to find an answer to a problem",
            "examples": [
               "Solve the puzzle.",
               "She solved the math problem.",
               "He solved the issue quickly."
            ]
         },
         {
            "id": 104,
            "word": "somebody",
            "role": "pronoun",
            "BrE": "/ˈsʌmbədi/",
            "AmE": "/ˈsʌmbɑːdi/",
            "definition": "an unknown person",
            "examples": [
               "Somebody is here.",
               "She saw somebody outside.",
               "Somebody left a bag."
            ]
         },
         {
            "id": 104,
            "word": "someone",
            "role": "pronoun",
            "BrE": "/ˈsʌmwʌn/",
            "AmE": "/ˈsʌmwʌn/",
            "definition": "an unknown person",
            "examples": [
               "Someone called me.",
               "She helped someone in need.",
               "Someone took my pen."
            ]
         },
         {
            "id": 104,
            "word": "something",
            "role": "pronoun",
            "BrE": "/ˈsʌmθɪŋ/",
            "AmE": "/ˈsʌmθɪŋ/",
            "definition": "an unknown thing",
            "examples": [
               "I need something.",
               "She found something in the box.",
               "Something fell on the floor."
            ]
         },
         {
            "id": 104,
            "word": "sometimes",
            "role": "adverb",
            "BrE": "/ˈsʌmtaɪmz/",
            "AmE": "/ˈsʌmtaɪmz/",
            "definition": "on some occasions",
            "examples": [
               "I sometimes read.",
               "She sometimes walks to school.",
               "He sometimes forgets his keys."
            ]
         },
         {
            "id": 104,
            "word": "somewhere",
            "role": "adverb",
            "BrE": "/ˈsʌmweə(r)/",
            "AmE": "/ˈsʌmwer/",
            "definition": "in or to an unknown place",
            "examples": [
               "Go somewhere fun.",
               "She lost her bag somewhere.",
               "He’s somewhere in the park."
            ]
         },
         {
            "id": 104,
            "word": "son",
            "role": "noun",
            "BrE": "/sʌn/",
            "AmE": "/sʌn/",
            "definition": "a male child",
            "examples": [
               "My son is young.",
               "She loves her son.",
               "The son plays football."
            ]
         },
         {
            "id": 104,
            "word": "song",
            "role": "noun",
            "BrE": "/sɒŋ/",
            "AmE": "/sɔːŋ/",
            "definition": "a piece of music with words",
            "examples": [
               "The song is nice.",
               "She sang a pop song.",
               "The song was on the radio."
            ]
         },
         {
            "id": 104,
            "word": "soon",
            "role": "adverb",
            "BrE": "/suːn/",
            "AmE": "/suːn/",
            "definition": "in a short time",
            "examples": [
               "Come back soon.",
               "She will finish soon.",
               "The bus arrives soon."
            ]
         },
         {
            "id": 104,
            "word": "sorry",
            "role": "adjective",
            "BrE": "/ˈsɒri/",
            "AmE": "/ˈsɑːri/",
            "definition": "feeling regret or sadness",
            "examples": [
               "I’m sorry.",
               "She was sorry for being late.",
               "He felt sorry for his friend."
            ]
         },
         {
            "id": 105,
            "word": "sort",
            "role": "noun",
            "BrE": "/sɔːt/",
            "AmE": "/sɔːrt/",
            "definition": "a type or kind",
            "examples": [
               "What sort is it?",
               "She likes this sort of book.",
               "The sort of food was spicy."
            ]
         },
         {
            "id": 105,
            "word": "sort",
            "role": "verb",
            "BrE": "/sɔːt/",
            "AmE": "/sɔːrt/",
            "definition": "to put things in order",
            "examples": [
               "Sort the clothes.",
               "She sorted her books.",
               "He sorted the papers by date."
            ]
         },
         {
            "id": 105,
            "word": "sound",
            "role": "noun",
            "BrE": "/saʊnd/",
            "AmE": "/saʊnd/",
            "definition": "something you hear",
            "examples": [
               "The sound is loud.",
               "She heard a strange sound.",
               "The sound of the bell was clear."
            ]
         },
         {
            "id": 105,
            "word": "soup",
            "role": "noun",
            "BrE": "/suːp/",
            "AmE": "/suːp/",
            "definition": "a liquid food made by cooking",
            "examples": [
               "The soup is hot.",
               "She made vegetable soup.",
               "The soup tastes good."
            ]
         },
         {
            "id": 105,
            "word": "south",
            "role": "noun",
            "BrE": "/saʊθ/",
            "AmE": "/saʊθ/",
            "definition": "the direction towards the bottom of a map",
            "examples": [
               "Go south.",
               "She lives in the south.",
               "The south is warm in summer."
            ]
         },
         {
            "id": 105,
            "word": "space",
            "role": "noun",
            "BrE": "/speɪs/",
            "AmE": "/speɪs/",
            "definition": "an empty area or outer space",
            "examples": [
               "The space is big.",
               "She needs space for her books.",
               "The space in the room is small."
            ]
         },
         {
            "id": 105,
            "word": "speak",
            "role": "verb",
            "BrE": "/spiːk/",
            "AmE": "/spiːk/",
            "definition": "to say words or talk",
            "examples": [
               "Speak loudly.",
               "She speaks English well.",
               "He spoke to the class."
            ]
         },
         {
            "id": 105,
            "word": "special",
            "role": "adjective",
            "BrE": "/ˈspeʃl/",
            "AmE": "/ˈspeʃl/",
            "definition": "unusual or important",
            "examples": [
               "It’s a special day.",
               "She got a special gift.",
               "The special event was fun."
            ]
         },
         {
            "id": 105,
            "word": "speech",
            "role": "noun",
            "BrE": "/spiːtʃ/",
            "AmE": "/spiːtʃ/",
            "definition": "a formal talk or the ability to speak",
            "examples": [
               "Her speech was good.",
               "She gave a speech at school.",
               "The speech was about peace."
            ]
         },
         {
            "id": 105,
            "word": "speed",
            "role": "noun",
            "BrE": "/spiːd/",
            "AmE": "/spiːd/",
            "definition": "how fast something moves",
            "examples": [
               "The speed is high.",
               "She checked the car’s speed.",
               "The speed of the train was fast."
            ]
         },
         {
            "id": 106,
            "word": "spend",
            "role": "verb",
            "BrE": "/spend/",
            "AmE": "/spend/",
            "definition": "to use money or time",
            "examples": [
               "Spend your money.",
               "She spent time with friends.",
               "He spends hours on his phone."
            ]
         },
         {
            "id": 106,
            "word": "sport",
            "role": "noun",
            "BrE": "/spɔːt/",
            "AmE": "/spɔːrt/",
            "definition": "a physical activity or game",
            "examples": [
               "I like sport.",
               "She plays sport at school.",
               "The sport of tennis is fun."
            ]
         },
         {
            "id": 106,
            "word": "spread",
            "role": "verb",
            "BrE": "/spred/",
            "AmE": "/spred/",
            "definition": "to cover or move over an area",
            "examples": [
               "Spread the butter.",
               "She spread the map on the table.",
               "The news spread quickly."
            ]
         },
         {
            "id": 106,
            "word": "spring",
            "role": "noun",
            "BrE": "/sprɪŋ/",
            "AmE": "/sprɪŋ/",
            "definition": "the season after winter",
            "examples": [
               "Spring is warm.",
               "She loves spring flowers.",
               "The spring season starts soon."
            ]
         },
         {
            "id": 106,
            "word": "square",
            "role": "noun",
            "BrE": "/skweə(r)/",
            "AmE": "/skwer/",
            "definition": "a shape with four equal sides or a public area",
            "examples": [
               "Draw a square.",
               "She sat in the town square.",
               "The square in the city is big."
            ]
         },
         {
            "id": 106,
            "word": "stage",
            "role": "noun",
            "BrE": "/steɪdʒ/",
            "AmE": "/steɪdʒ/",
            "definition": "a raised area for performances or a step in a process",
            "examples": [
               "The stage is ready.",
               "She stood on the stage.",
               "The stage of the project is new."
            ]
         },
         {
            "id": 106,
            "word": "stand",
            "role": "verb",
            "BrE": "/stænd/",
            "AmE": "/stænd/",
            "definition": "to be on your feet",
            "examples": [
               "Stand up now.",
               "She stood by the door.",
               "He stands in line every day."
            ]
         },
         {
            "id": 106,
            "word": "star",
            "role": "noun",
            "BrE": "/stɑː(r)/",
            "AmE": "/stɑːr/",
            "definition": "a bright object in the sky or a famous person",
            "examples": [
               "The star is bright.",
               "She saw a movie star.",
               "The star in the sky was big."
            ]
         },
         {
            "id": 106,
            "word": "start",
            "role": "verb",
            "BrE": "/stɑːt/",
            "AmE": "/stɑːrt/",
            "definition": "to begin something",
            "examples": [
               "Start the game.",
               "She started her homework.",
               "He starts work at eight."
            ]
         },
         {
            "id": 106,
            "word": "state",
            "role": "noun",
            "BrE": "/steɪt/",
            "AmE": "/steɪt/",
            "definition": "a condition or a part of a country",
            "examples": [
               "The state is good.",
               "She lives in a big state.",
               "The state of the house is clean."
            ]
         },
         {
            "id": 107,
            "word": "station",
            "role": "noun",
            "BrE": "/ˈsteɪʃn/",
            "AmE": "/ˈsteɪʃn/",
            "definition": "a place for trains or buses",
            "examples": [
               "The station is near.",
               "She waited at the train station.",
               "The bus station was busy."
            ]
         },
         {
            "id": 107,
            "word": "stay",
            "role": "verb",
            "BrE": "/steɪ/",
            "AmE": "/steɪ/",
            "definition": "to remain in a place",
            "examples": [
               "Stay here.",
               "She stayed at home.",
               "He stays with his friend."
            ]
         },
         {
            "id": 107,
            "word": "step",
            "role": "noun",
            "BrE": "/step/",
            "AmE": "/step/",
            "definition": "a movement or part of a process",
            "examples": [
               "Take a step.",
               "She took a step forward.",
               "The first step is easy."
            ]
         },
         {
            "id": 107,
            "word": "stick",
            "role": "noun",
            "BrE": "/stɪk/",
            "AmE": "/stɪk/",
            "definition": "a thin piece of wood",
            "examples": [
               "Pick up the stick.",
               "She found a stick in the park.",
               "The stick was on the ground."
            ]
         },
         {
            "id": 107,
            "word": "stick",
            "role": "verb",
            "BrE": "/stɪk/",
            "AmE": "/stɪk/",
            "definition": "to attach or stay in place",
            "examples": [
               "Stick the paper.",
               "She stuck a note on the door.",
               "The tape sticks well."
            ]
         },
         {
            "id": 107,
            "word": "still",
            "role": "adverb",
            "BrE": "/stɪl/",
            "AmE": "/stɪl/",
            "definition": "continuing to happen now",
            "examples": [
               "It’s still raining.",
               "She is still at school.",
               "He still likes to read."
            ]
         },
         {
            "id": 107,
            "word": "stone",
            "role": "noun",
            "BrE": "/stəʊn/",
            "AmE": "/stoʊn/",
            "definition": "a hard, solid material",
            "examples": [
               "The stone is heavy.",
               "She picked up a stone.",
               "The stone wall is old."
            ]
         },
         {
            "id": 107,
            "word": "stop",
            "role": "verb",
            "BrE": "/stɒp/",
            "AmE": "/stɑːp/",
            "definition": "to end or pause something",
            "examples": [
               "Stop the car.",
               "She stopped talking.",
               "He stopped to rest."
            ]
         },
         {
            "id": 107,
            "word": "store",
            "role": "noun",
            "BrE": "/stɔː(r)/",
            "AmE": "/stɔːr/",
            "definition": "a shop or place to keep things",
            "examples": [
               "The store is open.",
               "She went to a big store.",
               "The store has new books."
            ]
         },
         {
            "id": 107,
            "word": "store",
            "role": "verb",
            "BrE": "/stɔː(r)/",
            "AmE": "/stɔːr/",
            "definition": "to keep something for later",
            "examples": [
               "Store the food.",
               "She stored her clothes.",
               "He stores boxes in the room."
            ]
         },
         {
            "id": 108,
            "word": "storm",
            "role": "noun",
            "BrE": "/stɔːm/",
            "AmE": "/stɔːrm/",
            "definition": "very bad weather with rain or wind",
            "examples": [
               "The storm is loud.",
               "She saw a storm coming.",
               "The storm broke the tree."
            ]
         },
         {
            "id": 108,
            "word": "story",
            "role": "noun",
            "BrE": "/ˈstɔːri/",
            "AmE": "/ˈstɔːri/",
            "definition": "a description of events, real or imaginary",
            "examples": [
               "I read a story.",
               "She told a funny story.",
               "The story was about a king."
            ]
         },
         {
            "id": 108,
            "word": "straight",
            "role": "adjective",
            "BrE": "/streɪt/",
            "AmE": "/streɪt/",
            "definition": "not bent or curved",
            "examples": [
               "The line is straight.",
               "She has straight hair.",
               "The straight road was long."
            ]
         },
         {
            "id": 108,
            "word": "strange",
            "role": "adjective",
            "BrE": "/streɪndʒ/",
            "AmE": "/streɪndʒ/",
            "definition": "unusual or surprising",
            "examples": [
               "It’s a strange noise.",
               "She saw a strange man.",
               "The strange book was old."
            ]
         },
         {
            "id": 108,
            "word": "street",
            "role": "noun",
            "BrE": "/striːt/",
            "AmE": "/striːt/",
            "definition": "a road in a city or town",
            "examples": [
               "The street is busy.",
               "She lives on Main Street.",
               "The street has many shops."
            ]
         },
         {
            "id": 108,
            "word": "strong",
            "role": "adjective",
            "BrE": "/strɒŋ/",
            "AmE": "/strɔːŋ/",
            "definition": "having power or not easily broken",
            "examples": [
               "He is strong.",
               "She bought a strong bag.",
               "The strong wind broke the tree."
            ]
         },
         {
            "id": 108,
            "word": "student",
            "role": "noun",
            "BrE": "/ˈstjuːdnt/",
            "AmE": "/ˈstuːdnt/",
            "definition": "a person who studies at school or college",
            "examples": [
               "The student is smart.",
               "She is a good student.",
               "The student read a book."
            ]
         },
         {
            "id": 108,
            "word": "study",
            "role": "noun",
            "BrE": "/ˈstʌdi/",
            "AmE": "/ˈstʌdi/",
            "definition": "the act of learning",
            "examples": [
               "Study is important.",
               "She does study every day.",
               "The study of math is fun."
            ]
         },
         {
            "id": 108,
            "word": "study",
            "role": "verb",
            "BrE": "/ˈstʌdi/",
            "AmE": "/ˈstʌdi/",
            "definition": "to learn about something",
            "examples": [
               "Study English.",
               "She studies at home.",
               "He studied for the test."
            ]
         },
         {
            "id": 108,
            "word": "subject",
            "role": "noun",
            "BrE": "/ˈsʌbdʒɪkt/",
            "AmE": "/ˈsʌbdʒɪkt/",
            "definition": "something studied or talked about",
            "examples": [
               "Math is a subject.",
               "She likes the subject of art.",
               "The subject of the talk was peace."
            ]
         },
         {
            "id": 109,
            "word": "success",
            "role": "noun",
            "BrE": "/səkˈses/",
            "AmE": "/səkˈses/",
            "definition": "achieving something you wanted",
            "examples": [
               "Success feels good.",
               "She had success in school.",
               "The success of the plan was great."
            ]
         },
         {
            "id": 109,
            "word": "such",
            "role": "determiner",
            "BrE": "/sʌtʃ/",
            "AmE": "/sʌtʃ/",
            "definition": "of a particular kind",
            "examples": [
               "Such a nice day.",
               "She likes such books.",
               "Such a car is expensive."
            ]
         },
         {
            "id": 109,
            "word": "sudden",
            "role": "adjective",
            "BrE": "/ˈsʌdn/",
            "AmE": "/ˈsʌdn/",
            "definition": "happening quickly or unexpectedly",
            "examples": [
               "A sudden noise.",
               "She made a sudden move.",
               "The sudden rain was heavy."
            ]
         },
         {
            "id": 109,
            "word": "sugar",
            "role": "noun",
            "BrE": "/ˈʃʊɡə(r)/",
            "AmE": "/ˈʃʊɡər/",
            "definition": "a sweet substance used in food",
            "examples": [
               "I need sugar.",
               "She added sugar to her tea.",
               "The sugar is in the jar."
            ]
         },
         {
            "id": 109,
            "word": "suggest",
            "role": "verb",
            "BrE": "/səˈdʒest/",
            "AmE": "/səˈdʒest/",
            "definition": "to offer an idea",
            "examples": [
               "Suggest a place.",
               "She suggested a movie.",
               "He suggests going to the park."
            ]
         },
         {
            "id": 109,
            "word": "suit",
            "role": "noun",
            "BrE": "/suːt/",
            "AmE": "/suːt/",
            "definition": "a set of clothes or something suitable",
            "examples": [
               "The suit is black.",
               "She wore a suit to work.",
               "The suit fits him well."
            ]
         },
         {
            "id": 109,
            "word": "summer",
            "role": "noun",
            "BrE": "/ˈsʌmə(r)/",
            "AmE": "/ˈsʌmər/",
            "definition": "the season after spring",
            "examples": [
               "Summer is hot.",
               "She loves summer holidays.",
               "The summer was very sunny."
            ]
         },
         {
            "id": 109,
            "word": "sun",
            "role": "noun",
            "BrE": "/sʌn/",
            "AmE": "/sʌn/",
            "definition": "the star that gives light and heat",
            "examples": [
               "The sun is bright.",
               "She sat in the sun.",
               "The sun rises in the morning."
            ]
         },
         {
            "id": 109,
            "word": "supermarket",
            "role": "noun",
            "BrE": "/ˈsuːpəmɑːkɪt/",
            "AmE": "/ˈsuːpərmɑːrkɪt/",
            "definition": "a large shop selling food and other items",
            "examples": [
               "The supermarket is big.",
               "She shops at the supermarket.",
               "The supermarket has fresh fruit."
            ]
         },
         {
            "id": 109,
            "word": "support",
            "role": "verb",
            "BrE": "/səˈpɔːt/",
            "AmE": "/səˈpɔːrt/",
            "definition": "to help or agree with something",
            "examples": [
               "Support your team.",
               "She supported her friend.",
               "He supports the new plan."
            ]
         },
         {
            "id": 110,
            "word": "sure",
            "role": "adjective",
            "BrE": "/ʃʊə(r)/",
            "AmE": "/ʃʊr/",
            "definition": "certain or confident",
            "examples": [
               "I’m sure it’s right.",
               "She is sure of her answer.",
               "He’s sure about the time."
            ]
         },
         {
            "id": 110,
            "word": "surface",
            "role": "noun",
            "BrE": "/ˈsɜːfɪs/",
            "AmE": "/ˈsɜːrfɪs/",
            "definition": "the outside or top of something",
            "examples": [
               "The surface is smooth.",
               "She cleaned the table’s surface.",
               "The surface of the lake is calm."
            ]
         },
         {
            "id": 110,
            "word": "surprise",
            "role": "noun",
            "BrE": "/səˈpraɪz/",
            "AmE": "/sərˈpraɪz/",
            "definition": "something unexpected",
            "examples": [
               "It’s a surprise!",
               "She got a surprise gift.",
               "The surprise party was fun."
            ]
         },
         {
            "id": 110,
            "word": "surprise",
            "role": "verb",
            "BrE": "/səˈpraɪz/",
            "AmE": "/sərˈpraɪz/",
            "definition": "to cause someone to feel unexpected",
            "examples": [
               "Surprise her!",
               "She surprised her friend.",
               "He was surprised by the news."
            ]
         },
         {
            "id": 110,
            "word": "swim",
            "role": "verb",
            "BrE": "/swɪm/",
            "AmE": "/swɪm/",
            "definition": "to move through water",
            "examples": [
               "Swim in the pool.",
               "She swam in the sea.",
               "He swims every weekend."
            ]
         },
         {
            "id": 110,
            "word": "system",
            "role": "noun",
            "BrE": "/ˈsɪstɪm/",
            "AmE": "/ˈsɪstɪm/",
            "definition": "a set of things working together",
            "examples": [
               "The system works.",
               "She used a computer system.",
               "The system in the school is new."
            ]
         },
         {
            "id": 110,
            "word": "table",
            "role": "noun",
            "BrE": "/ˈteɪbl/",
            "AmE": "/ˈteɪbl/",
            "definition": "a piece of furniture with a flat top",
            "examples": [
               "The table is big.",
               "She put her book on the table.",
               "The table in the kitchen is new."
            ]
         },
         {
            "id": 110,
            "word": "take",
            "role": "verb",
            "BrE": "/teɪk/",
            "AmE": "/teɪk/",
            "definition": "to get or carry something",
            "examples": [
               "Take the pen.",
               "She took her bag to school.",
               "He takes the bus every day."
            ]
         },
         {
            "id": 110,
            "word": "talk",
            "role": "verb",
            "BrE": "/tɔːk/",
            "AmE": "/tɔːk/",
            "definition": "to speak or discuss",
            "examples": [
               "Talk to me.",
               "She talked to her friend.",
               "He talks about his day."
            ]
         },
         {
            "id": 110,
            "word": "tall",
            "role": "adjective",
            "BrE": "/tɔːl/",
            "AmE": "/tɔːl/",
            "definition": "having a great height",
            "examples": [
               "The tree is tall.",
               "She is a tall girl.",
               "The tall building is new."
            ]
         },
         {
            "id": 111,
            "word": "taste",
            "role": "noun",
            "BrE": "/teɪst/",
            "AmE": "/teɪst/",
            "definition": "the flavour of food or drink",
            "examples": [
               "The taste is good.",
               "She likes the taste of apples.",
               "The taste of the soup was nice."
            ]
         },
         {
            "id": 111,
            "word": "taste",
            "role": "verb",
            "BrE": "/teɪst/",
            "AmE": "/teɪst/",
            "definition": "to experience the flavour of something",
            "examples": [
               "Taste the cake.",
               "She tasted the new drink.",
               "He tasted the spicy food."
            ]
         },
         {
            "id": 111,
            "word": "tax",
            "role": "noun",
            "BrE": "/tæks/",
            "AmE": "/tæks/",
            "definition": "money paid to the government",
            "examples": [
               "Tax is high.",
               "She paid her tax.",
               "The tax on food is low."
            ]
         },
         {
            "id": 111,
            "word": "taxi",
            "role": "noun",
            "BrE": "/ˈtæksi/",
            "AmE": "/ˈtæksi/",
            "definition": "a car you pay to take you somewhere",
            "examples": [
               "Take a taxi.",
               "She called a taxi home.",
               "The taxi was yellow."
            ]
         },
         {
            "id": 111,
            "word": "tea",
            "role": "noun",
            "BrE": "/tiː/",
            "AmE": "/tiː/",
            "definition": "a hot drink made from leaves",
            "examples": [
               "I drink tea.",
               "She made tea for us.",
               "The tea was hot and sweet."
            ]
         },
         {
            "id": 111,
            "word": "teach",
            "role": "verb",
            "BrE": "/tiːtʃ/",
            "AmE": "/tiːtʃ/",
            "definition": "to give knowledge or skills",
            "examples": [
               "Teach me English.",
               "She teaches math at school.",
               "He taught his sister to read."
            ]
         },
         {
            "id": 111,
            "word": "teacher",
            "role": "noun",
            "BrE": "/ˈtiːtʃə(r)/",
            "AmE": "/ˈtiːtʃər/",
            "definition": "a person who teaches",
            "examples": [
               "The teacher is kind.",
               "She met her teacher today.",
               "The teacher helps the students."
            ]
         },
         {
            "id": 111,
            "word": "team",
            "role": "noun",
            "BrE": "/tiːm/",
            "AmE": "/tiːm/",
            "definition": "a group of people who work or play together",
            "examples": [
               "The team is good.",
               "She joined a football team.",
               "The team won the game."
            ]
         },
         {
            "id": 111,
            "word": "technology",
            "role": "noun",
            "BrE": "/tekˈnɒlədʒi/",
            "AmE": "/tekˈnɑːlədʒi/",
            "definition": "tools and machines to do tasks",
            "examples": [
               "Technology is new.",
               "She uses technology at work.",
               "The technology in the phone is great."
            ]
         },
         {
            "id": 111,
            "word": "teenager",
            "role": "noun",
            "BrE": "/ˈtiːneɪdʒə(r)/",
            "AmE": "/ˈtiːneɪdʒər/",
            "definition": "a person aged 13 to 19",
            "examples": [
               "The teenager is tall.",
               "She is a happy teenager.",
               "The teenager likes music."
            ]
         },
         {
            "id": 112,
            "word": "telephone",
            "role": "noun",
            "BrE": "/ˈtelɪfəʊn/",
            "AmE": "/ˈtelɪfoʊn/",
            "definition": "a device for talking to people far away",
            "examples": [
               "The telephone rang.",
               "She used the telephone.",
               "The telephone is in the office."
            ]
         },
         {
            "id": 112,
            "word": "television",
            "role": "noun",
            "BrE": "/ˈtelɪvɪʒn/",
            "AmE": "/ˈtelɪvɪʒn/",
            "definition": "a device for watching programmes",
            "examples": [
               "The television is on.",
               "She watched television.",
               "The television shows news."
            ]
         },
         {
            "id": 112,
            "word": "tell",
            "role": "verb",
            "BrE": "/tel/",
            "AmE": "/tel/",
            "definition": "to give information to someone",
            "examples": [
               "Tell me now.",
               "She told a story.",
               "He tells his friend everything."
            ]
         },
         {
            "id": 112,
            "word": "temperature",
            "role": "noun",
            "BrE": "/ˈtemprətʃə(r)/",
            "AmE": "/ˈtemprətʃər/",
            "definition": "how hot or cold something is",
            "examples": [
               "The temperature is high.",
               "She checked the temperature.",
               "The temperature was cold today."
            ]
         },
         {
            "id": 112,
            "word": "tennis",
            "role": "noun",
            "BrE": "/ˈtenɪs/",
            "AmE": "/ˈtenɪs/",
            "definition": "a game played with rackets and a ball",
            "examples": [
               "I play tennis.",
               "She likes tennis a lot.",
               "The tennis match was exciting."
            ]
         },
         {
            "id": 112,
            "word": "term",
            "role": "noun",
            "BrE": "/tɜːm/",
            "AmE": "/tɜːrm/",
            "definition": "a period of time or a word",
            "examples": [
               "The term is long.",
               "She used a new term.",
               "The school term starts soon."
            ]
         },
         {
            "id": 112,
            "word": "test",
            "role": "noun",
            "BrE": "/test/",
            "AmE": "/test/",
            "definition": "an exam or way to check something",
            "examples": [
               "The test was easy.",
               "She passed her math test.",
               "The test of the car was good."
            ]
         },
         {
            "id": 112,
            "word": "test",
            "role": "verb",
            "BrE": "/test/",
            "AmE": "/test/",
            "definition": "to check or examine something",
            "examples": [
               "Test the water.",
               "She tested her new pen.",
               "He tests the machine daily."
            ]
         },
         {
            "id": 112,
            "word": "text",
            "role": "noun",
            "BrE": "/tekst/",
            "AmE": "/tekst/",
            "definition": "written words or a message",
            "examples": [
               "Read the text.",
               "She sent a text message.",
               "The text in the book is clear."
            ]
         },
         {
            "id": 112,
            "word": "than",
            "role": "conjunction",
            "BrE": "/ðæn/",
            "AmE": "/ðæn/",
            "definition": "used to compare things",
            "examples": [
               "She is taller than me.",
               "He runs faster than her.",
               "The book is better than the movie."
            ]
         },
         {
            "id": 113,
            "word": "thank",
            "role": "verb",
            "BrE": "/θæŋk/",
            "AmE": "/θæŋk/",
            "definition": "to express gratitude",
            "examples": [
               "Thank your friend.",
               "She thanked him for the gift.",
               "He thanks his teacher daily."
            ]
         },
         {
            "id": 113,
            "word": "that",
            "role": "determiner",
            "BrE": "/ðæt/",
            "AmE": "/ðæt/",
            "definition": "used to point to a specific thing",
            "examples": [
               "That book is mine.",
               "She likes that dress.",
               "That car is very fast."
            ]
         },
         {
            "id": 113,
            "word": "theatre",
            "role": "noun",
            "BrE": "/ˈθɪətə(r)/",
            "AmE": "/ˈθiːətər/",
            "definition": "a place for plays or performances",
            "examples": [
               "The theatre is big.",
               "She went to the theatre.",
               "The theatre show was funny."
            ]
         },
         {
            "id": 113,
            "word": "their",
            "role": "determiner",
            "BrE": "/ðeə(r)/",
            "AmE": "/ðer/",
            "definition": "belonging to them",
            "examples": [
               "Their house is nice.",
               "She saw their dog.",
               "Their books are on the table."
            ]
         },
         {
            "id": 113,
            "word": "them",
            "role": "pronoun",
            "BrE": "/ðem/",
            "AmE": "/ðem/",
            "definition": "used to refer to people or things",
            "examples": [
               "I saw them.",
               "She gave them a gift.",
               "He helped them with homework."
            ]
         },
         {
            "id": 113,
            "word": "then",
            "role": "adverb",
            "BrE": "/ðen/",
            "AmE": "/ðen/",
            "definition": "at that time or next",
            "examples": [
               "Come back then.",
               "She was happy then.",
               "He finished and then left."
            ]
         },
         {
            "id": 113,
            "word": "there",
            "role": "adverb",
            "BrE": "/ðeə(r)/",
            "AmE": "/ðer/",
            "definition": "in or to that place",
            "examples": [
               "Look over there.",
               "She went there yesterday.",
               "The book is there on the shelf."
            ]
         },
         {
            "id": 113,
            "word": "these",
            "role": "determiner",
            "BrE": "/ðiːz/",
            "AmE": "/ðiːz/",
            "definition": "used to point to specific things",
            "examples": [
               "These books are new.",
               "She likes these flowers.",
               "These apples are sweet."
            ]
         },
         {
            "id": 113,
            "word": "they",
            "role": "pronoun",
            "BrE": "/ðeɪ/",
            "AmE": "/ðeɪ/",
            "definition": "used to refer to people or things",
            "examples": [
               "They are here.",
               "She saw them play.",
               "They have two cats."
            ]
         },
         {
            "id": 113,
            "word": "thick",
            "role": "adjective",
            "BrE": "/θɪk/",
            "AmE": "/θɪk/",
            "definition": "wide or not thin",
            "examples": [
               "The book is thick.",
               "She wore a thick jacket.",
               "The thick rope was strong."
            ]
         },
         {
            "id": 114,
            "word": "thin",
            "role": "adjective",
            "BrE": "/θɪn/",
            "AmE": "/θɪn/",
            "definition": "not thick or wide",
            "examples": [
               "The paper is thin.",
               "She has thin hair.",
               "The thin book was short."
            ]
         },
         {
            "id": 114,
            "word": "thing",
            "role": "noun",
            "BrE": "/θɪŋ/",
            "AmE": "/θɪŋ/",
            "definition": "an object or item",
            "examples": [
               "What’s that thing?",
               "She lost her favourite thing.",
               "The thing on the table is mine."
            ]
         },
         {
            "id": 114,
            "word": "think",
            "role": "verb",
            "BrE": "/θɪŋk/",
            "AmE": "/θɪŋk/",
            "definition": "to use your mind or believe",
            "examples": [
               "Think about it.",
               "She thinks he’s nice.",
               "He thought of a new idea."
            ]
         },
         {
            "id": 114,
            "word": "third",
            "role": "adjective",
            "BrE": "/θɜːd/",
            "AmE": "/θɜːrd/",
            "definition": "coming after the second",
            "examples": [
               "The third book.",
               "She was the third winner.",
               "The third day was rainy."
            ]
         },
         {
            "id": 114,
            "word": "this",
            "role": "determiner",
            "BrE": "/ðɪs/",
            "AmE": "/ðɪs/",
            "definition": "used to point to a specific thing",
            "examples": [
               "This is my bag.",
               "She likes this song.",
               "This house is very old."
            ]
         },
         {
            "id": 114,
            "word": "those",
            "role": "determiner",
            "BrE": "/ðəʊz/",
            "AmE": "/ðoʊz/",
            "definition": "used to point to specific things",
            "examples": [
               "Those books are hers.",
               "She saw those birds.",
               "Those chairs are new."
            ]
         },
         {
            "id": 114,
            "word": "though",
            "role": "conjunction",
            "BrE": "/ðəʊ/",
            "AmE": "/ðoʊ/",
            "definition": "despite something",
            "examples": [
               "It’s cold, though nice.",
               "She went, though she was tired.",
               "He smiled, though he was sad."
            ]
         },
         {
            "id": 114,
            "word": "thought",
            "role": "noun",
            "BrE": "/θɔːt/",
            "AmE": "/θɔːt/",
            "definition": "an idea or opinion",
            "examples": [
               "I had a thought.",
               "She shared her thought.",
               "The thought of food was nice."
            ]
         },
         {
            "id": 114,
            "word": "through",
            "role": "preposition",
            "BrE": "/θruː/",
            "AmE": "/θruː/",
            "definition": "from one side to another",
            "examples": [
               "Go through the door.",
               "She walked through the park.",
               "He read through the book."
            ]
         },
         {
            "id": 114,
            "word": "throw",
            "role": "verb",
            "BrE": "/θrəʊ/",
            "AmE": "/θroʊ/",
            "definition": "to send something through the air",
            "examples": [
               "Throw the ball.",
               "She threw a stone.",
               "He throws well in the game."
            ]
         },
         {
            "id": 115,
            "word": "ticket",
            "role": "noun",
            "BrE": "/ˈtɪkɪt/",
            "AmE": "/ˈtɪkɪt/",
            "definition": "a piece of paper for entry or travel",
            "examples": [
               "Buy a ticket.",
               "She lost her train ticket.",
               "The ticket was for the show."
            ]
         },
         {
            "id": 115,
            "word": "tidy",
            "role": "adjective",
            "BrE": "/ˈtaɪdi/",
            "AmE": "/ˈtaɪdi/",
            "definition": "neat and organized",
            "examples": [
               "The room is tidy.",
               "She keeps her desk tidy.",
               "The tidy house looks nice."
            ]
         },
         {
            "id": 115,
            "word": "tie",
            "role": "noun",
            "BrE": "/taɪ/",
            "AmE": "/taɪ/",
            "definition": "a piece of clothing or a draw in a game",
            "examples": [
               "He wore a tie.",
               "The game was a tie.",
               "The tie was blue and red."
            ]
         },
         {
            "id": 115,
            "word": "tie",
            "role": "verb",
            "BrE": "/taɪ/",
            "AmE": "/taɪ/",
            "definition": "to fasten with string or rope",
            "examples": [
               "Tie your shoes.",
               "She tied the rope.",
               "He tied the bag closed."
            ]
         },
         {
            "id": 115,
            "word": "tight",
            "role": "adjective",
            "BrE": "/taɪt/",
            "AmE": "/taɪt/",
            "definition": "fitting closely or firmly",
            "examples": [
               "The shirt is tight.",
               "She wore tight jeans.",
               "The tight knot was hard to open."
            ]
         },
         {
            "id": 115,
            "word": "time",
            "role": "noun",
            "BrE": "/taɪm/",
            "AmE": "/taɪm/",
            "definition": "a moment or period",
            "examples": [
               "What time is it?",
               "She has time to read.",
               "The time for the meeting is now."
            ]
         },
         {
            "id": 115,
            "word": "tired",
            "role": "adjective",
            "BrE": "/ˈtaɪəd/",
            "AmE": "/ˈtaɪərd/",
            "definition": "needing rest",
            "examples": [
               "I’m tired.",
               "She was tired after work.",
               "The tired dog slept all day."
            ]
         },
         {
            "id": 115,
            "word": "title",
            "role": "noun",
            "BrE": "/ˈtaɪtl/",
            "AmE": "/ˈtaɪtl/",
            "definition": "the name of something",
            "examples": [
               "The title is good.",
               "She read the book’s title.",
               "The title of the movie is short."
            ]
         },
         {
            "id": 115,
            "word": "to",
            "role": "preposition",
            "BrE": "/tə/",
            "AmE": "/tə/",
            "definition": "showing direction or purpose",
            "examples": [
               "Go to school.",
               "She gave a book to him.",
               "He walked to the park."
            ]
         },
         {
            "id": 115,
            "word": "today",
            "role": "adverb",
            "BrE": "/təˈdeɪ/",
            "AmE": "/təˈdeɪ/",
            "definition": "on this day",
            "examples": [
               "Come today.",
               "She is busy today.",
               "He starts work today."
            ]
         },
         {
            "id": 116,
            "word": "together",
            "role": "adverb",
            "BrE": "/təˈɡeðə(r)/",
            "AmE": "/təˈɡeðər/",
            "definition": "with another person or thing",
            "examples": [
               "Work together.",
               "She walked with him together.",
               "They live together in a house."
            ]
         },
         {
            "id": 116,
            "word": "tomorrow",
            "role": "adverb",
            "BrE": "/təˈmɒrəʊ/",
            "AmE": "/təˈmɑːroʊ/",
            "definition": "the day after today",
            "examples": [
               "See you tomorrow.",
               "She will go tomorrow.",
               "Tomorrow is a holiday."
            ]
         },
         {
            "id": 116,
            "word": "tone",
            "role": "noun",
            "BrE": "/təʊn/",
            "AmE": "/toʊn/",
            "definition": "the sound or manner of speaking",
            "examples": [
               "The tone is soft.",
               "She used a kind tone.",
               "His tone was serious."
            ]
         },
         {
            "id": 116,
            "word": "tongue",
            "role": "noun",
            "BrE": "/tʌŋ/",
            "AmE": "/tʌŋ/",
            "definition": "the soft part in the mouth",
            "examples": [
               "My tongue hurts.",
               "She stuck out her tongue.",
               "The tongue helps us taste."
            ]
         },
         {
            "id": 116,
            "word": "tonight",
            "role": "adverb",
            "BrE": "/təˈnaɪt/",
            "AmE": "/təˈnaɪt/",
            "definition": "this evening or night",
            "examples": [
               "Come tonight.",
               "She watches TV tonight.",
               "Tonight is a quiet evening."
            ]
         },
         {
            "id": 116,
            "word": "too",
            "role": "adverb",
            "BrE": "/tuː/",
            "AmE": "/tuː/",
            "definition": "more than is wanted",
            "examples": [
               "It’s too hot.",
               "She ate too much.",
               "The bag is too heavy."
            ]
         },
         {
            "id": 116,
            "word": "tool",
            "role": "noun",
            "BrE": "/tuːl/",
            "AmE": "/tuːl/",
            "definition": "an object used to do work",
            "examples": [
               "I need a tool.",
               "She used a tool to fix it.",
               "The tool is in the box."
            ]
         },
         {
            "id": 116,
            "word": "tooth",
            "role": "noun",
            "BrE": "/tuːθ/",
            "AmE": "/tuːθ/",
            "definition": "a hard part in the mouth",
            "examples": [
               "My tooth hurts.",
               "She brushed her teeth.",
               "The tooth was very white."
            ]
         },
         {
            "id": 116,
            "word": "top",
            "role": "noun",
            "BrE": "/tɒp/",
            "AmE": "/tɑːp/",
            "definition": "the highest part of something",
            "examples": [
               "The top is high.",
               "She climbed to the top.",
               "The top of the hill is flat."
            ]
         },
         {
            "id": 116,
            "word": "total",
            "role": "adjective",
            "BrE": "/ˈtəʊtl/",
            "AmE": "/ˈtoʊtl/",
            "definition": "complete or full",
            "examples": [
               "The total cost is high.",
               "She made a total change.",
               "The total number was ten."
            ]
         },
         {
            "id": 117,
            "word": "touch",
            "role": "verb",
            "BrE": "/tʌtʃ/",
            "AmE": "/tʌtʃ/",
            "definition": "to put your hand on something",
            "examples": [
               "Touch the table.",
               "She touched the soft blanket.",
               "He touched the hot pan carefully."
            ]
         },
         {
            "id": 117,
            "word": "tour",
            "role": "noun",
            "BrE": "/tʊə(r)/",
            "AmE": "/tʊr/",
            "definition": "a trip to visit places",
            "examples": [
               "The tour was fun.",
               "She went on a city tour.",
               "The tour of the museum was short."
            ]
         },
         {
            "id": 117,
            "word": "tourist",
            "role": "noun",
            "BrE": "/ˈtʊərɪst/",
            "AmE": "/ˈtʊrɪst/",
            "definition": "a person who travels for pleasure",
            "examples": [
               "The tourist took photos.",
               "She met a tourist at the park.",
               "The tourist visited the castle."
            ]
         },
         {
            "id": 117,
            "word": "towel",
            "role": "noun",
            "BrE": "/ˈtaʊəl/",
            "AmE": "/ˈtaʊəl/",
            "definition": "a piece of cloth for drying",
            "examples": [
               "I need a towel.",
               "She used a clean towel.",
               "The towel is in the bathroom."
            ]
         },
         {
            "id": 117,
            "word": "tower",
            "role": "noun",
            "BrE": "/ˈtaʊə(r)/",
            "AmE": "/ˈtaʊər/",
            "definition": "a tall, narrow building or structure",
            "examples": [
               "The tower is high.",
               "She saw a tall tower.",
               "The tower in the city is old."
            ]
         },
         {
            "id": 117,
            "word": "town",
            "role": "noun",
            "BrE": "/taʊn/",
            "AmE": "/taʊn/",
            "definition": "a place with many houses and shops",
            "examples": [
               "The town is small.",
               "She lives in a quiet town.",
               "The town has a big market."
            ]
         },
         {
            "id": 117,
            "word": "toy",
            "role": "noun",
            "BrE": "/tɔɪ/",
            "AmE": "/tɔɪ/",
            "definition": "an object for children to play with",
            "examples": [
               "The toy is fun.",
               "She bought a new toy.",
               "The toy car is red."
            ]
         },
         {
            "id": 117,
            "word": "traffic",
            "role": "noun",
            "BrE": "/ˈtræfɪk/",
            "AmE": "/ˈtræfɪk/",
            "definition": "vehicles moving on roads",
            "examples": [
               "Traffic is heavy.",
               "She was late because of traffic.",
               "The traffic stopped at the light."
            ]
         },
         {
            "id": 117,
            "word": "train",
            "role": "noun",
            "BrE": "/treɪn/",
            "AmE": "/treɪn/",
            "definition": "a vehicle that runs on rails",
            "examples": [
               "The train is fast.",
               "She took a train to work.",
               "The train leaves at six."
            ]
         },
         {
            "id": 117,
            "word": "travel",
            "role": "verb",
            "BrE": "/ˈtrævl/",
            "AmE": "/ˈtrævl/",
            "definition": "to go from one place to another",
            "examples": [
               "I love to travel.",
               "She travels by bus.",
               "He travelled to a new city."
            ]
         },
         {
            "id": 118,
            "word": "tree",
            "role": "noun",
            "BrE": "/triː/",
            "AmE": "/triː/",
            "definition": "a tall plant with a trunk and leaves",
            "examples": [
               "The tree is tall.",
               "She climbed a tree.",
               "The tree has green leaves."
            ]
         },
         {
            "id": 118,
            "word": "trip",
            "role": "noun",
            "BrE": "/trɪp/",
            "AmE": "/trɪp/",
            "definition": "a journey to a place",
            "examples": [
               "The trip was fun.",
               "She went on a school trip.",
               "The trip to the beach was long."
            ]
         },
         {
            "id": 118,
            "word": "trouble",
            "role": "noun",
            "BrE": "/ˈtrʌbl/",
            "AmE": "/ˈtrʌbl/",
            "definition": "a problem or difficulty",
            "examples": [
               "I have trouble.",
               "She had trouble with her car.",
               "The trouble was easy to fix."
            ]
         },
         {
            "id": 118,
            "word": "true",
            "role": "adjective",
            "BrE": "/truː/",
            "AmE": "/truː/",
            "definition": "correct or real",
            "examples": [
               "The story is true.",
               "She told a true fact.",
               "His true name is John."
            ]
         },
         {
            "id": 118,
            "word": "try",
            "role": "verb",
            "BrE": "/traɪ/",
            "AmE": "/traɪ/",
            "definition": "to attempt to do something",
            "examples": [
               "Try again.",
               "She tried to open the door.",
               "He tries to learn English."
            ]
         },
         {
            "id": 118,
            "word": "turn",
            "role": "verb",
            "BrE": "/tɜːn/",
            "AmE": "/tɜːrn/",
            "definition": "to move or change direction",
            "examples": [
               "Turn left.",
               "She turned the page.",
               "He turned to see the dog."
            ]
         },
         {
            "id": 118,
            "word": "type",
            "role": "noun",
            "BrE": "/taɪp/",
            "AmE": "/taɪp/",
            "definition": "a kind or group of things",
            "examples": [
               "What type is it?",
               "She likes this type of music.",
               "The type of food was spicy."
            ]
         },
         {
            "id": 118,
            "word": "umbrella",
            "role": "noun",
            "BrE": "/ʌmˈbrelə/",
            "AmE": "/ʌmˈbrelə/",
            "definition": "an object to protect from rain",
            "examples": [
               "I need an umbrella.",
               "She used her umbrella.",
               "The umbrella was black."
            ]
         },
         {
            "id": 118,
            "word": "uncle",
            "role": "noun",
            "BrE": "/ˈʌŋkl/",
            "AmE": "/ˈʌŋkl/",
            "definition": "the brother of a parent",
            "examples": [
               "My uncle is kind.",
               "She visited her uncle.",
               "The uncle gave her a gift."
            ]
         },
         {
            "id": 118,
            "word": "under",
            "role": "preposition",
            "BrE": "/ˈʌndə(r)/",
            "AmE": "/ˈʌndər/",
            "definition": "below something",
            "examples": [
               "Look under the table.",
               "She hid under the bed.",
               "The cat is under the chair."
            ]
         },
         {
            "id": 119,
            "word": "understand",
            "role": "verb",
            "BrE": "/ˌʌndəˈstænd/",
            "AmE": "/ˌʌndərˈstænd/",
            "definition": "to know the meaning of something",
            "examples": [
               "I understand you.",
               "She understands English.",
               "He understood the lesson."
            ]
         },
         {
            "id": 119,
            "word": "uniform",
            "role": "noun",
            "BrE": "/ˈjuːnɪfɔːm/",
            "AmE": "/ˈjuːnɪfɔːrm/",
            "definition": "special clothes worn by a group",
            "examples": [
               "The uniform is blue.",
               "She wore a school uniform.",
               "The uniform fits well."
            ]
         },
         {
            "id": 119,
            "word": "until",
            "role": "preposition",
            "BrE": "/ʌnˈtɪl/",
            "AmE": "/ʌnˈtɪl/",
            "definition": "up to a certain time",
            "examples": [
               "Wait until five.",
               "She stayed until evening.",
               "He worked until the job was done."
            ]
         },
         {
            "id": 119,
            "word": "up",
            "role": "preposition",
            "BrE": "/ʌp/",
            "AmE": "/ʌp/",
            "definition": "to a higher place",
            "examples": [
               "Go up the stairs.",
               "She climbed up the hill.",
               "The bird flew up to the tree."
            ]
         },
         {
            "id": 119,
            "word": "use",
            "role": "verb",
            "BrE": "/juːz/",
            "AmE": "/juːz/",
            "definition": "to do something with an object",
            "examples": [
               "Use a pen.",
               "She used her phone.",
               "He uses the car every day."
            ]
         },
         {
            "id": 119,
            "word": "usual",
            "role": "adjective",
            "BrE": "/ˈjuːʒuəl/",
            "AmE": "/ˈjuːʒuəl/",
            "definition": "normal or common",
            "examples": [
               "It’s the usual time.",
               "She wore her usual dress.",
               "The usual shop was closed."
            ]
         },
         {
            "id": 119,
            "word": "vegetable",
            "role": "noun",
            "BrE": "/ˈvedʒtəbl/",
            "AmE": "/ˈvedʒtəbl/",
            "definition": "a plant used as food",
            "examples": [
               "I eat vegetables.",
               "She cooked a vegetable soup.",
               "The vegetable was fresh."
            ]
         },
         {
            "id": 119,
            "word": "very",
            "role": "adverb",
            "BrE": "/ˈveri/",
            "AmE": "/ˈveri/",
            "definition": "to a great degree",
            "examples": [
               "It’s very cold.",
               "She is very happy today.",
               "He runs very fast."
            ]
         },
         {
            "id": 119,
            "word": "view",
            "role": "noun",
            "BrE": "/vjuː/",
            "AmE": "/vjuː/",
            "definition": "what you can see or an opinion",
            "examples": [
               "The view is nice.",
               "She saw a great view.",
               "His view on the topic is clear."
            ]
         },
         {
            "id": 119,
            "word": "village",
            "role": "noun",
            "BrE": "/ˈvɪlɪdʒ/",
            "AmE": "/ˈvɪlɪdʒ/",
            "definition": "a small group of houses",
            "examples": [
               "The village is quiet.",
               "She lives in a small village.",
               "The village has a shop."
            ]
         },
         {
            "id": 120,
            "word": "visit",
            "role": "verb",
            "BrE": "/ˈvɪzɪt/",
            "AmE": "/ˈvɪzɪt/",
            "definition": "to go to see a place or person",
            "examples": [
               "Visit your friend.",
               "She visited her grandma.",
               "He visits the park often."
            ]
         },
         {
            "id": 120,
            "word": "voice",
            "role": "noun",
            "BrE": "/vɔɪs/",
            "AmE": "/vɔɪs/",
            "definition": "the sound made when speaking",
            "examples": [
               "Her voice is loud.",
               "She has a soft voice.",
               "The voice on the phone was clear."
            ]
         },
         {
            "id": 120,
            "word": "wait",
            "role": "verb",
            "BrE": "/weɪt/",
            "AmE": "/weɪt/",
            "definition": "to stay until something happens",
            "examples": [
               "Wait here.",
               "She waited for the bus.",
               "He waits at the station."
            ]
         },
         {
            "id": 120,
            "word": "wake",
            "role": "verb",
            "BrE": "/weɪk/",
            "AmE": "/weɪk/",
            "definition": "to stop sleeping",
            "examples": [
               "Wake up early.",
               "She woke at seven.",
               "He wakes when the sun rises."
            ]
         },
         {
            "id": 120,
            "word": "walk",
            "role": "verb",
            "BrE": "/wɔːk/",
            "AmE": "/wɔːk/",
            "definition": "to move on foot",
            "examples": [
               "Walk to school.",
               "She walks in the park.",
               "He walked home yesterday."
            ]
         },
         {
            "id": 120,
            "word": "wall",
            "role": "noun",
            "BrE": "/wɔːl/",
            "AmE": "/wɔːl/",
            "definition": "a structure around or in a building",
            "examples": [
               "The wall is high.",
               "She painted the wall.",
               "The wall of the house is white."
            ]
         },
         {
            "id": 120,
            "word": "want",
            "role": "verb",
            "BrE": "/wɒnt/",
            "AmE": "/wɑːnt/",
            "definition": "to wish for something",
            "examples": [
               "I want a book.",
               "She wants a new dress.",
               "He wanted to go home."
            ]
         },
         {
            "id": 120,
            "word": "warm",
            "role": "adjective",
            "BrE": "/wɔːm/",
            "AmE": "/wɔːrm/",
            "definition": "slightly hot",
            "examples": [
               "The room is warm.",
               "She wore a warm coat.",
               "The warm water felt nice."
            ]
         },
         {
            "id": 120,
            "word": "wash",
            "role": "verb",
            "BrE": "/wɒʃ/",
            "AmE": "/wɑːʃ/",
            "definition": "to clean with water",
            "examples": [
               "Wash your hands.",
               "She washed the dishes.",
               "He washes his car weekly."
            ]
         },
         {
            "id": 120,
            "word": "watch",
            "role": "verb",
            "BrE": "/wɒtʃ/",
            "AmE": "/wɑːtʃ/",
            "definition": "to look at something",
            "examples": [
               "Watch the movie.",
               "She watched the game.",
               "He watches TV every night."
            ]
         },
         {
            "id": 121,
            "word": "water",
            "role": "noun",
            "BrE": "/ˈwɔːtə(r)/",
            "AmE": "/ˈwɔːtər/",
            "definition": "a clear liquid for drinking or washing",
            "examples": [
               "I drink water.",
               "She filled a glass with water.",
               "The water in the lake is clean."
            ]
         },
         {
            "id": 121,
            "word": "way",
            "role": "noun",
            "BrE": "/weɪ/",
            "AmE": "/weɪ/",
            "definition": "a method or path",
            "examples": [
               "Find a way.",
               "She knows the way home.",
               "The way to the shop is short."
            ]
         },
         {
            "id": 121,
            "word": "wear",
            "role": "verb",
            "BrE": "/weə(r)/",
            "AmE": "/wer/",
            "definition": "to have clothes on your body",
            "examples": [
               "Wear a hat.",
               "She wore a red dress.",
               "He wears glasses every day."
            ]
         },
         {
            "id": 121,
            "word": "weather",
            "role": "noun",
            "BrE": "/ˈweðə(r)/",
            "AmE": "/ˈweðər/",
            "definition": "the condition of the air",
            "examples": [
               "The weather is nice.",
               "She checked the weather.",
               "The weather today is sunny."
            ]
         },
         {
            "id": 121,
            "word": "week",
            "role": "noun",
            "BrE": "/wiːk/",
            "AmE": "/wiːk/",
            "definition": "a period of seven days",
            "examples": [
               "This week is busy.",
               "She works every week.",
               "The week starts on Monday."
            ]
         },
         {
            "id": 121,
            "word": "weekend",
            "role": "noun",
            "BrE": "/ˌwiːkˈend/",
            "AmE": "/ˈwiːkend/",
            "definition": "Saturday and Sunday",
            "examples": [
               "The weekend is fun.",
               "She went out this weekend.",
               "The weekend was very relaxing."
            ]
         },
         {
            "id": 121,
            "word": "welcome",
            "role": "verb",
            "BrE": "/ˈwelkəm/",
            "AmE": "/ˈwelkəm/",
            "definition": "to greet someone kindly",
            "examples": [
               "Welcome your guest.",
               "She welcomed her friend.",
               "He welcomes new students."
            ]
         },
         {
            "id": 121,
            "word": "well",
            "role": "adverb",
            "BrE": "/wel/",
            "AmE": "/wel/",
            "definition": "in a good way",
            "examples": [
               "She sings well.",
               "He did the test well.",
               "They work well together."
            ]
         },
         {
            "id": 121,
            "word": "west",
            "role": "noun",
            "BrE": "/west/",
            "AmE": "/west/",
            "definition": "the direction where the sun sets",
            "examples": [
               "Go west.",
               "She lives in the west.",
               "The west is sunny today."
            ]
         },
         {
            "id": 121,
            "word": "wet",
            "role": "adjective",
            "BrE": "/wet/",
            "AmE": "/wet/",
            "definition": "covered with water",
            "examples": [
               "The clothes are wet.",
               "She got wet in the rain.",
               "The wet floor was slippery."
            ]
         },
         {
            "id": 122,
            "word": "what",
            "role": "pronoun",
            "BrE": "/wɒt/",
            "AmE": "/wɑːt/",
            "definition": "used to ask about something",
            "examples": [
               "What is this?",
               "She asked what time it was.",
               "What did he say?"
            ]
         },
         {
            "id": 122,
            "word": "when",
            "role": "adverb",
            "BrE": "/wen/",
            "AmE": "/wen/",
            "definition": "at what time",
            "examples": [
               "When is it?",
               "She asked when he arrived.",
               "When does the shop open?"
            ]
         },
         {
            "id": 122,
            "word": "where",
            "role": "adverb",
            "BrE": "/weə(r)/",
            "AmE": "/wer/",
            "definition": "in or to what place",
            "examples": [
               "Where is my bag?",
               "She asked where he was.",
               "Where are you going?"
            ]
         },
         {
            "id": 122,
            "word": "which",
            "role": "pronoun",
            "BrE": "/wɪtʃ/",
            "AmE": "/wɪtʃ/",
            "definition": "used to ask about a choice",
            "examples": [
               "Which book?",
               "She asked which one is hers.",
               "Which colour do you like?"
            ]
         },
         {
            "id": 122,
            "word": "while",
            "role": "conjunction",
            "BrE": "/waɪl/",
            "AmE": "/waɪl/",
            "definition": "during the time that",
            "examples": [
               "Read while waiting.",
               "She sang while cooking.",
               "He worked while she slept."
            ]
         },
         {
            "id": 122,
            "word": "white",
            "role": "adjective",
            "BrE": "/waɪt/",
            "AmE": "/waɪt/",
            "definition": "the colour of snow",
            "examples": [
               "The shirt is white.",
               "She has a white car.",
               "The white wall is clean."
            ]
         },
         {
            "id": 122,
            "word": "who",
            "role": "pronoun",
            "BrE": "/huː/",
            "AmE": "/huː/",
            "definition": "used to ask about a person",
            "examples": [
               "Who is there?",
               "She asked who called.",
               "Who is your teacher?"
            ]
         },
         {
            "id": 122,
            "word": "whole",
            "role": "adjective",
            "BrE": "/həʊl/",
            "AmE": "/hoʊl/",
            "definition": "complete or all of something",
            "examples": [
               "Eat the whole apple.",
               "She read the whole book.",
               "The whole class was here."
            ]
         },
         {
            "id": 122,
            "word": "why",
            "role": "adverb",
            "BrE": "/waɪ/",
            "AmE": "/waɪ/",
            "definition": "for what reason",
            "examples": [
               "Why are you late?",
               "She asked why he left.",
               "Why is the sky blue?"
            ]
         },
         {
            "id": 122,
            "word": "wide",
            "role": "adjective",
            "BrE": "/waɪd/",
            "AmE": "/waɪd/",
            "definition": "having a large distance across",
            "examples": [
               "The road is wide.",
               "She opened the door wide.",
               "The wide river was deep."
            ]
         },
         {
            "id": 123,
            "word": "wife",
            "role": "noun",
            "BrE": "/waɪf/",
            "AmE": "/waɪf/",
            "definition": "a married woman",
            "examples": [
               "His wife is kind.",
               "She met his wife yesterday.",
               "The wife works at a school."
            ]
         },
         {
            "id": 123,
            "word": "wild",
            "role": "adjective",
            "BrE": "/waɪld/",
            "AmE": "/waɪld/",
            "definition": "living naturally, not controlled",
            "examples": [
               "The animal is wild.",
               "She saw a wild bird.",
               "The wild forest is big."
            ]
         },
         {
            "id": 123,
            "word": "win",
            "role": "verb",
            "BrE": "/wɪn/",
            "AmE": "/wɪn/",
            "definition": "to get first place in a competition",
            "examples": [
               "Win the game.",
               "She won a prize.",
               "He won the race easily."
            ]
         },
         {
            "id": 123,
            "word": "wind",
            "role": "noun",
            "BrE": "/wɪnd/",
            "AmE": "/wɪnd/",
            "definition": "moving air",
            "examples": [
               "The wind is strong.",
               "She felt the wind outside.",
               "The wind blew the leaves."
            ]
         },
         {
            "id": 123,
            "word": "window",
            "role": "noun",
            "BrE": "/ˈwɪndəʊ/",
            "AmE": "/ˈwɪndoʊ/",
            "definition": "an opening in a wall for light or air",
            "examples": [
               "The window is open.",
               "She looked through the window.",
               "The window in the room is big."
            ]
         },
         {
            "id": 123,
            "word": "winter",
            "role": "noun",
            "BrE": "/ˈwɪntə(r)/",
            "AmE": "/ˈwɪntər/",
            "definition": "the season after autumn",
            "examples": [
               "Winter is cold.",
               "She likes winter sports.",
               "The winter was very snowy."
            ]
         },
         {
            "id": 123,
            "word": "wish",
            "role": "verb",
            "BrE": "/wɪʃ/",
            "AmE": "/wɪʃ/",
            "definition": "to want something to happen",
            "examples": [
               "Wish for luck.",
               "She wished for a new phone.",
               "He wishes to travel soon."
            ]
         },
         {
            "id": 123,
            "word": "woman",
            "role": "noun",
            "BrE": "/ˈwʊmən/",
            "AmE": "/ˈwʊmən/",
            "definition": "an adult female person",
            "examples": [
               "The woman is kind.",
               "She met a woman at work.",
               "The woman helped her friend."
            ]
         },
         {
            "id": 123,
            "word": "work",
            "role": "noun",
            "BrE": "/wɜːk/",
            "AmE": "/wɜːrk/",
            "definition": "a job or task",
            "examples": [
               "Work is hard.",
               "She has a lot of work.",
               "The work at school is fun."
            ]
         },
         {
            "id": 123,
            "word": "work",
            "role": "verb",
            "BrE": "/wɜːk/",
            "AmE": "/wɜːrk/",
            "definition": "to do a job or task",
            "examples": [
               "I work every day.",
               "She works at a shop.",
               "He worked late yesterday."
            ]
         },
         {
            "id": 124,
            "word": "world",
            "role": "noun",
            "BrE": "/wɜːld/",
            "AmE": "/wɜːrld/",
            "definition": "the earth or all people",
            "examples": [
               "The world is big.",
               "She wants to see the world.",
               "The world needs peace."
            ]
         },
         {
            "id": 124,
            "word": "write",
            "role": "verb",
            "BrE": "/raɪt/",
            "AmE": "/raɪt/",
            "definition": "to make words on paper or a screen",
            "examples": [
               "Write your name.",
               "She wrote a letter.",
               "He writes in his notebook."
            ]
         },
         {
            "id": 124,
            "word": "wrong",
            "role": "adjective",
            "BrE": "/rɒŋ/",
            "AmE": "/rɔːŋ/",
            "definition": "not correct",
            "examples": [
               "The answer is wrong.",
               "She took the wrong bus.",
               "The wrong book was on the table."
            ]
         },
         {
            "id": 124,
            "word": "yard",
            "role": "noun",
            "BrE": "/jɑːd/",
            "AmE": "/jɑːrd/",
            "definition": "an area outside a house",
            "examples": [
               "The yard is green.",
               "She played in the yard.",
               "The yard has a big tree."
            ]
         },
         {
            "id": 124,
            "word": "year",
            "role": "noun",
            "BrE": "/jɪə(r)/",
            "AmE": "/jɪr/",
            "definition": "a period of twelve months",
            "examples": [
               "This year is new.",
               "She was born last year.",
               "The year was very busy."
            ]
         },
         {
            "id": 124,
            "word": "yellow",
            "role": "adjective",
            "BrE": "/ˈjeləʊ/",
            "AmE": "/ˈjeloʊ/",
            "definition": "the colour of a lemon",
            "examples": [
               "The flower is yellow.",
               "She wore a yellow dress.",
               "The yellow car is fast."
            ]
         },
         {
            "id": 124,
            "word": "yes",
            "role": "exclamation",
            "BrE": "/jes/",
            "AmE": "/jes/",
            "definition": "used to agree or say something is true",
            "examples": [
               "Yes, I agree.",
               "She said yes to the plan.",
               "Yes, the shop is open."
            ]
         },
         {
            "id": 124,
            "word": "yesterday",
            "role": "adverb",
            "BrE": "/ˈjestədeɪ/",
            "AmE": "/ˈjestərdeɪ/",
            "definition": "the day before today",
            "examples": [
               "I was busy yesterday.",
               "She called me yesterday.",
               "Yesterday was a sunny day."
            ]
         },
         {
            "id": 124,
            "word": "young",
            "role": "adjective",
            "BrE": "/jʌŋ/",
            "AmE": "/jʌŋ/",
            "definition": "not old",
            "examples": [
               "The boy is young.",
               "She has a young sister.",
               "The young dog is playful."
            ]
         },
         {
            "id": 124,
            "word": "your",
            "role": "determiner",
            "BrE": "/jɔː(r)/",
            "AmE": "/jʊr/",
            "definition": "belonging to you",
            "examples": [
               "Your book is here.",
               "She took your bag.",
               "Your house looks nice."
            ]
         },
      ]
   }

   const saveHandle = (ws) => {
      const savedVocab = ws.word.word
      const savedVocabRole = ws.word.role

      const foundWord = data.wordList.filter((item, index) => {
         if(item.word === savedVocab && item.role === savedVocabRole) {
            data.wordList[index].saved = !data.wordList[index].saved
            return item
         }
      })
      
      if(savedA2Vocabs.some(item => item.word == ws.word.word) && savedA2Vocabs.some(item => item.role == ws.word.role)){
         setSavedA2Vocabs(savedA2Vocabs.filter((item) => {
            return !(item.word === ws.word.word && item.role === ws.word.role)
         }))

         setCancelBox(true)

         setTimeout(() => {
            setCancelBox(false);
         }, 3000);

      } else {
         setSavedA2Vocabs((prev) => [
            ...prev,
            foundWord[0]
         ])

         setConfirmBox(true)

         setTimeout(() => {
            setConfirmBox(false);
         }, 3000);
      }
   }
   
   const specificLessonWords = data.wordList.filter((item) => {
      return item.id == slug
   })

   const wholeLessons = data.wordList[data.wordList.length - 1].id

   const startLearning = () => {
      setAppear(false);

      setTimeout(() => {
         setStage('learning');
      }, 1000);

      setTimeout(() => {
         setFade(true);
      }, 1500);
   }

   // logics for the assesment card
   const handleTouchStart = (e) => {
      if (isSwiped) return; // Prevent interaction during swipe animation
      setStartX(e.touches[0].clientX);
      setIsSwiping(true);
   };

   const handleTouchMove = (e) => {
      if (!isSwiping || isSwiped) return;
      const currentX = e.touches[0].clientX;
      const diffX = currentX - startX;
      setTranslateX(diffX);
      setSwipeDirection(diffX > 0 ? 'right' : 'left');
   };

   const handleTouchEnd = () => {
      if (!isSwiping || isSwiped) return;
      setIsSwiping(false);

      const threshold = 30; // pixels
      if (translateX > threshold || translateX < -threshold) {
         setIsSwiped(true);
         const direction = translateX > threshold ? 'right' : 'left';
         console.log(`Initiating swipe ${direction} for card: ${specificLessonWords[currentCardIndex].word}`);
         handleSwipe(direction);
      } else {
         setTranslateX(0);
         setSwipeDirection(null);
      }
   };

   const handleSwipe = (direction) => {
      setCounter(prev => prev + 10)
      if(direction === 'right'){
         setTranslateX(1000)
         handleAnswer('known')
      } else {
         setTranslateX(-1000)
         handleAnswer('unknown')
      }

      setTimeout(() => {
         setTranslateX(0);
         setSwipeDirection(null);
         setIsSwiped(false);
         setCurrentCardIndex((prev) => (prev + 1 < specificLessonWords.length ? prev + 1 : 0));
      }, 400); // Match CSS transition duration
   };

   if (!specificLessonWords || specificLessonWords.length === 0) {
      return <div className={styles.noCards}>No flashcards available</div>;
   }

   const visibleCards = [];
   for (let i = 0; i < Math.min(3, specificLessonWords.length - currentCardIndex); i++) {
      visibleCards.push(specificLessonWords[(currentCardIndex + i) % specificLessonWords.length]);
   }

   const startOver = () => {
      location.reload()
   }

   return (
      <div className={styles.container}>

         <Image className={styles.img}
            src= '/images/back/A2Back.jpg'
            alt= 'background image'
            fill
         />

         <div className={styles.lessonTitle}>Lesson {lessonNumber}</div>
         <div className={styles.lessonLevel}>A2</div>

         {stage === 'assessment' && (

         <div className={`${styles.assessCard} ${close && styles.shiftMsg}`}>
            <div className={styles.titleHolder}>
               <h2 className={styles.check}>Knowledge Check</h2>
               <p className={styles.prompt}>Swipe right if you know the word.</p>
               <p className={styles.prompt}>Swipe left if you need to learn the word.</p>
            </div>
           <div className={styles.cardStack}>
               {visibleCards.map((card, index) => (
                  <div
                     key={`${card.word}-${(currentCardIndex + index) % specificLessonWords.length}`}
                     ref={index === 0 ? cardRef : null}
                     className={`${styles.card} ${
                     index === 0 && isSwiping ? styles.swiping : ''
                     } ${index === 0 && swipeDirection && isSwiped ? styles[swipeDirection] : ''} ${
                     styles[`card${index}`]
                     }`}
                     style={
                     index === 0
                        ? {
                           transform: `translateX(${translateX}px)`,
                           backgroundColor:
                              isSwiping || isSwiped
                                 ? swipeDirection === 'right'
                                 ? 'green'
                                 : swipeDirection === 'left'
                                 ? 'red'
                                 : 'white'
                                 : 'white',
                           }
                        : {}
                     }
                     onTouchStart={index === 0 ? handleTouchStart : undefined}
                     onTouchMove={index === 0 ? handleTouchMove : undefined}
                     onTouchEnd={index === 0 ? handleTouchEnd : undefined}
                  >
                     <div className={styles.cardContent}>
                        <h2
                        style={
                        index === 0
                        ? {
                           color:
                              isSwiping || isSwiped
                                 ? swipeDirection === 'right'
                                 ? 'white'
                                 : swipeDirection === 'left'
                                 ? 'white'
                                 : 'black'
                                 : 'black',
                           }
                        : {}}
                        >{card.word}</h2>

                        <h3
                        style={
                        index === 0
                        ? {
                           color:
                              isSwiping || isSwiped
                                 ? swipeDirection === 'right'
                                 ? 'white'
                                 : swipeDirection === 'left'
                                 ? 'white'
                                 : 'black'
                                 : 'black',
                           }
                        : {}}
                        >{card.role}</h3>

                        <p
                        style={
                        index === 0
                        ? {
                           color:
                              isSwiping || isSwiped
                                 ? swipeDirection === 'right'
                                 ? 'white'
                                 : swipeDirection === 'left'
                                 ? 'white'
                                 : 'rgb(156, 156, 156)'
                                 : 'rgb(156, 156, 156)',
                           }
                        : {}}
                        >{card.definition}</p>

                     </div>
                  </div>
               ))}

            </div>
            <div className={styles.counterHolder}>
               <div className={styles.number}>{counter} %</div>
               <div className={styles.counterCourse}>
                  <div className={styles.counter}
                     style={{width: counter + '%'}}
                  ></div>
               </div>
            </div>

            <button className={styles.restart} onClick={startOver}>Start Again</button>

         </div>
            
         )}

         {
            stage === 'shiftMsg' && (
               <div className={`${styles.shiftCard} ${appear && styles.appear}`}>
                  <div>Time to Learn the New Words</div>
                  <button className={styles.start}
                     onClick={startLearning}
                  >START</button>
               </div>
            )
         }

         {
            stage === 'excellent' && (
               <div className={`${styles.done} ${show && styles.show}`}>
                  <div className={styles.doneTitle}>All done. Brilliant :)</div>
                  <div className={styles.btnHolder}>
                     <button className={styles.back} onClick={done}>Done</button>
                     {
                        lessonNumber < wholeLessons ?
                        <button className={styles.back} onClick={nextLesson}>Next Lesson</button>
                        :
                        <button className={styles.back} onClick={nextLevel}>Start B1</button>
                     }
                  </div>
               </div>
            )
         }
   
         {stage === 'learning' && (
         <div className={`${styles.learnCard} ${fade && styles.fadeIn}`}>
            {(() => {
               const learningWords = [...unknownWords]; // ...partialWords WAS DELETED
               const ws = learningWords[learningWordIndex];
               return (
               <>
                  <div className={styles.actionsHolder}>
                     <p className={styles.title}>The words you need to learn</p>
                     <p className={styles.actions} onClick={() => saveHandle(ws)}>
                        {  
                           (savedA2Vocabs.some(item => item.word == ws.word.word) && savedA2Vocabs.some(item => item.role == ws.word.role)) ? <FaBookmark className={styles.save}/> : <FaRegBookmark className={styles.save}/>  
                        }
                     </p>
                  </div>
                  <div className={styles.wordBlock}>
                     <div className={styles.wordHolder}>
                        <p className={styles.wordTitle}>{ws.word.word}</p>
                        <div className={styles.infoHolder}>
                           <p className={styles.phonetics}>{ws.word.AmE}</p>
                           <p className={styles.phonetics}>{ws.word.BrE}</p>
                           <div className={styles.role}>{ws.word.role}</div>
                        </div>
                     </div>
                     <div className={styles.definition}>{ws.word.definition}</div>
                     <div className={styles.examplesHolder}>
                        <p><strong>Examples:</strong></p>
                        <ul className={styles.examplesList}>
                           {ws.word.examples.map((example, i) => (
                           <li key={i}>{example}</li>
                           ))}
                        </ul>
                     </div>
                     {
                        btn ? 
                           <div className={styles.btnHolder}>
                              <button
                                 className={styles.button}
                                 onClick={() => setStage('revision')}
                              >
                                 Review
                              </button>

                              {
                              lessonNumber < wholeLessons ?
                                 <button className={styles.button} onClick={nextLesson}>Lesson {lessonNumber + 1}</button>
                                 :
                                 <button className={styles.button} onClick={nextLevel}>Start B1</button>  
                              }
                              
                              <button className={styles.button} onClick={done}>Save</button>
                           </div>

                           : 

                           <div className={styles.btnHolder}>
                              <button
                                 className={styles.button}
                                 onClick={handleBackLearningWord}
                              >
                                 Back
                              </button>
                              <button
                                 className={styles.button}
                                 onClick={handleNextLearningWord}
                              >
                                 Next
                              </button>
                           </div>
                     }
                  </div>
               </>
               );
            })()}
         </div>
         )}
   
         {stage === 'revision' && (
         <div className={styles.revisionCard}>
            <p className={styles.title}>What you learnt in this lesson:</p>
            {(() => {
               const revisionWords = [...unknownWords];
               return revisionWords.map((ws, index) => (
               <div key={index} className={styles.wordBlock}>
                  <div className={styles.wordHolder}>
                     <p className={styles.wordTitle}>{ws.word.word}</p>
                     <div className={styles.infoHolder}>
                        <p className={styles.phonetics}>{ws.word.AmE}</p>
                        <p className={styles.phonetics}>{ws.word.BrE}</p>
                        <div className={styles.role}>{ws.word.role}</div>
                     </div>
                  </div>
                  <div className={styles.definition}>{ws.word.definition}</div>
                  <div className={styles.examplesHolder}>
                     <p><strong>Examples:</strong></p>
                     <ul className={styles.examplesList}>
                        {ws.word.examples.map((example, i) => (
                        <li key={i}>{example}</li>
                        ))}
                     </ul>
                  </div>
               </div>
               ));
            })()}
            <div className={styles.btnHolder}>
               {
                  lessonNumber < wholeLessons ?
                  <button className={styles.button} onClick={nextLesson}>Next Lesson</button>
                  :
                  <button className={styles.button} onClick={nextLevel}>Start B1</button>
               }

               <button className={styles.button} onClick={done}>Save</button>
            </div>
         </div>
      )}

      {
         confirmBox ? <div className={styles.confirm}>Saved Successfully</div>
         :
         cancelBox ? <div  className={styles.cancel}>Removed Successfully</div> : null
      }

      { // NEW
         showCongrats &&
         <>
            showConfetti ? <Confetti /> : null
            <div className={styles.congratsHolder}>

               <div className={`${styles.msgHolder} ${anime && styles.showCongrats}`}>
                  <Image
                     className={styles.background}
                     src="/images/back/congrats.jpg"
                     alt=""
                     fill
                  />
                  
                  <div className={styles.congrats}>Congrats!</div>

                  <div className={styles.textHolder}>
                     <div className={styles.text}>You have learned</div>
                     <div className={styles.count}>{wordsCount}</div>
                     <div className={styles.text}>words successfully.</div>
                  </div>

                  <div className={styles.continue} onClick={closeCongrats}>Continue</div>
               </div>
            </div>
         </> 
      }
      </div>
   );
}













