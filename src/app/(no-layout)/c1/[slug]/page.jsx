'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './slug.module.css';
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";
import Confetti from "@/components/confetti/confetti";
import Back from '@/components/backButton/back';
import Loader from '@/components/loading/loading';




export default function Lessons({ params }) {
   const [isLoading, setIsLoading] = useState(true);
   const [loadedImages, setLoadedImages] = useState(0);
   const totalImages = 1;

   const [currentWordIndex, setCurrentWordIndex] = useState(0);
   const [learningWordIndex, setLearningWordIndex] = useState(0);
   const [stage, setStage] = useState('assessment');
   const [knownWords, setKnownWords] = useState([]);
   const [unknownWords, setUnknownWords] = useState([]);
   const [btn, setBtn] = useState(false)
   const [lessonNumber, setLessonNumber] = useState(null)
   const [savedC1Vocabs, setSavedC1Vocabs] = useState([])
   const [confirmBox, setConfirmBox] = useState(false)
   const [cancelBox, setCancelBox] = useState(false)
   const [close, setClose] = useState(false)
   const [appear, setAppear] = useState(false)
   const [fade, setFade] = useState(false)
   const [show, setShow] = useState(false)
   const [c1WordsCount, setC1WordsCount] = useState(null)
   const [lessonsC1, setLessonsC1] = useState(null)
   const [totalWordsCount, setTotalWordsCount] = useState(null)
   const [showConfetti, setShowConfetti] = useState(false)
   const [showCongrats, setShowCongrats] = useState(false)
   const [anime, setAnime] = useState(false)
   const [btnPressed, setBtnPressed] = useState(null)
   const [preview, setPreview] = useState(false)

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
         router.push('/c1')
         localStorage.setItem(`preview`, JSON.stringify(false))
         setPreview(false)
      }

      window.addEventListener('popstate', handleDefaultBack)
      
      return () => {
         window.addEventListener('popstate', handleDefaultBack)
      }
   }, [router])


// Retrieve data from localStorage on mount
   useEffect(() => {
      try {
         const savedKnowns = JSON.parse(localStorage.getItem(`knownWords-${slug}-C1`) || '[]');
         const savedUnknowns = JSON.parse(localStorage.getItem(`unknownWords-${slug}-C1`) || '[]');
         const previewState = JSON.parse(localStorage.getItem('preview') || false);
         const a1WordsLearnt = JSON.parse(localStorage.getItem(`wordsCount-A1`) || 0);
         const a2WordsLearnt = JSON.parse(localStorage.getItem(`wordsCount-A2`) || 0);
         const b1WordsLearnt = JSON.parse(localStorage.getItem(`wordsCount-B1`) || 0);
         const b2WordsLearnt = JSON.parse(localStorage.getItem(`wordsCount-B2`) || 0);
         const lessonsProgress = slug
         const totalWordsLearnt = (slug * 10) + Number(a1WordsLearnt) + Number(a2WordsLearnt) + Number(b1WordsLearnt) + Number(b2WordsLearnt)
         const c1WordsLearnt = slug * 10
         
         setC1WordsCount(c1WordsLearnt)
         setPreview(previewState)
         setTotalWordsCount(totalWordsLearnt)
         setLessonsC1(lessonsProgress)
         setKnownWords(savedKnowns);
         setUnknownWords(savedUnknowns);
      } catch (e) {
         console.error('Error parsing localStorage data:', e);
      }
   }, [slug]); // Depend on slug to reload when lesson changes
   
   const done = () => {
      try {
         save()

         if([10, 20, 30, 40, 50, 60, 70, 80].includes(lessonNumber)){
            animation()
            setBtnPressed('done')
         } else {
            router.push('/c1')
         }

      } catch (e) {
         console.error('Error saving to localStorage:', e);
      }
   }

   const nextLesson = () => {
      try {
         save()

         if([10, 20, 30, 40, 50, 60, 70, 80].includes(lessonNumber)){
            animation()
            setBtnPressed('nextLesson')
         } else {
            router.push(`/c1/${lessonNumber + 1}`)
         }

      } catch (e) {
         console.error('Error saving to localStorage:', e);
      }
   }

   const nextLevel = () => {
      try {
         save()

         if([10, 20, 30, 40, 50, 60, 70, 80].includes(lessonNumber)){
            animation()
            setBtnPressed('nextLevel')
         } else {
            router.push('/c2')
         }

      } catch (e) {
         console.error('Error saving to localStorage:', e);
      }
   }

   const closeCongrats = () => {
      setShowCongrats(false)
      setAnime(false)
      save()

      btnPressed === 'done' ? router.push('/c1') :
      btnPressed === 'nextLesson' ? router.push(`/c1/${lessonNumber + 1}`) :
      btnPressed === 'nextLevel' ? router.push('/c2') : console.log('PROBLEM')
   }

   const save = () => {
      localStorage.setItem(`knownWords-${slug}-C1`, JSON.stringify(knownWords));
      localStorage.setItem(`unknownWords-${slug}-C1`, JSON.stringify(unknownWords));
      localStorage.setItem(`wordsCount-C1`, JSON.stringify(c1WordsCount));
      localStorage.setItem(`totalWordsCount`, JSON.stringify(totalWordsCount));
   }

   const animation = () => {
      setShowCongrats(true)
      setTimeout(() => setShowConfetti(true), 500)
      setTimeout(() => setAnime(true), 500)
      setTimeout(() => setShowConfetti(false), 3000)
   }

   // Save data to localStorage when state changes
   useEffect(() => {
      try {
         localStorage.setItem(`savedC1Vocabs-${slug}-C1`, JSON.stringify(savedC1Vocabs));

      } catch (e) {
         console.error('Error saving to localStorage:', e);
      }
   }, [savedC1Vocabs, slug]);

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
         "word": "abolish",
         "role": "verb",
         "BrE": "/əˈbɒlɪʃ/",
         "AmE": "/əˈbɑːlɪʃ/",
         "definition": "to officially end something like a law or system",
         "examples": [
            "The government decided to abolish the old tax law.",
            "They want to abolish slavery in all forms.",
            "The school plans to abolish uniforms next year."
         ]
      },
      {
         "id": 1,
         "word": "abortion",
         "role": "noun",
         "BrE": "/əˈbɔːʃn/",
         "AmE": "/əˈbɔːrʃn/",
         "definition": "the ending of a pregnancy by medical means",
         "examples": [
            "She had an abortion after learning about health risks.",
            "The debate on abortion rights is ongoing.",
            "Access to safe abortion is a key issue."
         ]
      },
      {
         "id": 1,
         "word": "absence",
         "role": "noun",
         "BrE": "/ˈæbsəns/",
         "AmE": "/ˈæbsəns/",
         "definition": "the state of not being present",
         "examples": [
            "His absence from the meeting was noticed.",
            "The absence of rain caused a drought.",
            "She explained her absence due to illness."
         ]
      },
      {
         "id": 1,
         "word": "absent",
         "role": "adjective",
         "BrE": "/ˈæbsənt/",
         "AmE": "/ˈæbsənt/",
         "definition": "not present in a place",
         "examples": [
            "The teacher marked him absent today.",
            "Love was absent from their relationship.",
            "Key players were absent from the game."
         ]
      },
      {
         "id": 1,
         "word": "absurd",
         "role": "adjective",
         "BrE": "/əbˈsɜːd/",
         "AmE": "/əbˈsɝːd/",
         "definition": "very silly or ridiculous",
         "examples": [
            "The idea sounds absurd to me.",
            "His excuse was completely absurd.",
            "It's absurd to wait in this rain."
         ]
      },
      {
         "id": 1,
         "word": "abundance",
         "role": "noun",
         "BrE": "/əˈbʌndəns/",
         "AmE": "/əˈbʌndəns/",
         "definition": "a very large amount of something",
         "examples": [
            "The garden has an abundance of flowers.",
            "There is an abundance of food at the party.",
            "Nature provides an abundance of resources."
         ]
      },
      {
         "id": 1,
         "word": "abuse",
         "role": "noun, verb",
         "BrE": "/əˈbjuːs/",
         "AmE": "/əˈbjuːs/",
         "definition": "cruel treatment of someone, or to treat badly",
         "examples": [
            "Child abuse is a serious crime.",
            "He abused his power as a leader.",
            "The dog suffered from abuse by its owner."
         ]
      },
      {
         "id": 1,
         "word": "academy",
         "role": "noun",
         "BrE": "/əˈkædəmi/",
         "AmE": "/əˈkædəmi/",
         "definition": "a school for special training",
         "examples": [
            "She attends a military academy.",
            "The academy awards are famous for movies.",
            "He teaches at the art academy."
         ]
      },
      {
         "id": 1,
         "word": "accelerate",
         "role": "verb",
         "BrE": "/əkˈseləreɪt/",
         "AmE": "/əkˈseləreɪt/",
         "definition": "to make something happen faster",
         "examples": [
            "The car can accelerate quickly.",
            "We need to accelerate the process.",
            "Technology helps accelerate learning."
         ]
      },
      {
         "id": 1,
         "word": "acceptance",
         "role": "noun",
         "BrE": "/əkˈseptəns/",
         "AmE": "/əkˈseptəns/",
         "definition": "the act of agreeing to something",
         "examples": [
            "Her acceptance speech was emotional.",
            "He waited for acceptance of his offer.",
            "Social acceptance is important for kids."
         ]
      },
      {
         "id": 2,
         "word": "accessible",
         "role": "adjective",
         "BrE": "/əkˈsesəbl/",
         "AmE": "/əkˈsesəbl/",
         "definition": "easy to reach or use",
         "examples": [
            "The building is accessible for wheelchairs.",
            "Information should be accessible to all.",
            "The beach is accessible by car."
         ]
      },
      {
         "id": 2,
         "word": "accomplishment",
         "role": "noun",
         "BrE": "/əˈkʌmplɪʃmənt/",
         "AmE": "/əˈkɑːmplɪʃmənt/",
         "definition": "something successfully achieved",
         "examples": [
            "Graduating was a big accomplishment.",
            "Her accomplishments include many awards.",
            "Learning a language is an accomplishment."
         ]
      },
      {
         "id": 2,
         "word": "accordance",
         "role": "noun",
         "BrE": "/əˈkɔːdəns/",
         "AmE": "/əˈkɔːrdəns/",
         "definition": "agreement with a rule or standard",
         "examples": [
            "In accordance with the law, we must stop.",
            "Act in accordance with instructions.",
            "The plan is in accordance with policy."
         ]
      },
      {
         "id": 2,
         "word": "accordingly",
         "role": "adverb",
         "BrE": "/əˈkɔːdɪŋli/",
         "AmE": "/əˈkɔːrdɪŋli/",
         "definition": "in a way that is suitable",
         "examples": [
            "He was tired and accordingly went to bed.",
            "Adjust your plans accordingly.",
            "The weather changed, so dress accordingly."
         ]
      },
      {
         "id": 2,
         "word": "accountability",
         "role": "noun",
         "BrE": "/əˌkaʊntəˈbɪləti/",
         "AmE": "/əˌkaʊntəˈbɪləti/",
         "definition": "responsibility for actions",
         "examples": [
            "Leaders must show accountability.",
            "Accountability improves performance.",
            "The company emphasizes accountability."
         ]
      },
      {
         "id": 2,
         "word": "accountable",
         "role": "adjective",
         "BrE": "/əˈkaʊntəbl/",
         "AmE": "/əˈkaʊntəbl/",
         "definition": "responsible for actions",
         "examples": [
            "Hold people accountable for mistakes.",
            "She is accountable to her boss.",
            "Officials should be accountable."
         ]
      },
      {
         "id": 2,
         "word": "accumulate",
         "role": "verb",
         "BrE": "/əˈkjuːmjəleɪt/",
         "AmE": "/əˈkjuːmjəleɪt/",
         "definition": "to collect over time",
         "examples": [
            "Dust can accumulate on shelves.",
            "He accumulated a lot of wealth.",
            "Points accumulate with each purchase."
         ]
      },
      {
         "id": 2,
         "word": "accumulation",
         "role": "noun",
         "BrE": "/əˌkjuːmjəˈleɪʃn/",
         "AmE": "/əˌkjuːmjəˈleɪʃn/",
         "definition": "the process of collecting things",
         "examples": [
            "The accumulation of snow caused delays.",
            "Wealth accumulation takes time.",
            "Avoid accumulation of clutter."
         ]
      },
      {
         "id": 2,
         "word": "accusation",
         "role": "noun",
         "BrE": "/ˌækjuˈzeɪʃn/",
         "AmE": "/ˌækjuˈzeɪʃn/",
         "definition": "a claim that someone did wrong",
         "examples": [
            "The accusation was false.",
            "He denied the accusation of theft.",
            "Accusations can harm reputations."
         ]
      },
      {
         "id": 2,
         "word": "accused",
         "role": "noun",
         "BrE": "/əˈkjuːzd/",
         "AmE": "/əˈkjuːzd/",
         "definition": "a person charged with a crime",
         "examples": [
            "The accused stood trial.",
            "Lawyers defend the accused.",
            "The accused pleaded not guilty."
         ]
      },
      {
         "id": 3,
         "word": "acid",
         "role": "adjective",
         "BrE": "/ˈæsɪd/",
         "AmE": "/ˈæsɪd/",
         "definition": "having a sour taste",
         "examples": [
            "Lemons have an acid flavor.",
            "Acid rain damages forests.",
            "The soil is too acid for some plants."
         ]
      },
      {
         "id": 3,
         "word": "acquisition",
         "role": "noun",
         "BrE": "/ˌækwɪˈzɪʃn/",
         "AmE": "/ˌækwɪˈzɪʃn/",
         "definition": "the act of getting something",
         "examples": [
            "The acquisition of knowledge is important.",
            "Company made a new acquisition.",
            "Language acquisition starts early."
         ]
      },
      {
         "id": 3,
         "word": "acre",
         "role": "noun",
         "BrE": "/ˈeɪkə(r)/",
         "AmE": "/ˈeɪkər/",
         "definition": "a unit of land area",
         "examples": [
            "The farm is 50 acres large.",
            "They bought an acre of land.",
            "Parks cover many acres."
         ]
      },
      {
         "id": 3,
         "word": "activation",
         "role": "noun",
         "BrE": "/ˌæktɪˈveɪʃn/",
         "AmE": "/ˌæktɪˈveɪʃn/",
         "definition": "the process of making something start",
         "examples": [
            "Activation of the alarm is quick.",
            "Account activation requires email.",
            "Cell activation happens in response."
         ]
      },
      {
         "id": 3,
         "word": "activist",
         "role": "noun",
         "BrE": "/ˈæktɪvɪst/",
         "AmE": "/ˈæktɪvɪst/",
         "definition": "a person who campaigns for change",
         "examples": [
            "The activist protested for rights.",
            "Environmental activists plant trees.",
            "She is a human rights activist."
         ]
      },
      {
         "id": 3,
         "word": "acute",
         "role": "adjective",
         "BrE": "/əˈkjuːt/",
         "AmE": "/əˈkjuːt/",
         "definition": "very serious or sharp",
         "examples": [
            "He has acute pain in his back.",
            "The problem is acute in cities.",
            "Acute angles are less than 90 degrees."
         ]
      },
      {
         "id": 3,
         "word": "adaptation",
         "role": "noun",
         "BrE": "/ˌædæpˈteɪʃn/",
         "AmE": "/ˌædæpˈteɪʃn/",
         "definition": "the process of changing to fit",
         "examples": [
            "The movie is an adaptation of the book.",
            "Adaptation to climate is necessary.",
            "Animal adaptation helps survival."
         ]
      },
      {
         "id": 3,
         "word": "adhere",
         "role": "verb",
         "BrE": "/ədˈhɪə(r)/",
         "AmE": "/ədˈhɪr/",
         "definition": "to stick to something",
         "examples": [
            "Adhere to the rules strictly.",
            "The label won't adhere properly.",
            "We adhere to high standards."
         ]
      },
      {
         "id": 3,
         "word": "adjacent",
         "role": "adjective",
         "BrE": "/əˈdʒeɪsnt/",
         "AmE": "/əˈdʒeɪsnt/",
         "definition": "next to or near something",
         "examples": [
            "The park is adjacent to the school.",
            "Our rooms are adjacent.",
            "Adjacent buildings share a wall."
         ]
      },
      {
         "id": 3,
         "word": "adjustment",
         "role": "noun",
         "BrE": "/əˈdʒʌstmənt/",
         "AmE": "/əˈdʒʌstmənt/",
         "definition": "a small change to improve",
         "examples": [
            "Make an adjustment to the settings.",
            "Life requires constant adjustment.",
            "The adjustment fixed the problem."
         ]
      },
      {
         "id": 4,
         "word": "administer",
         "role": "verb",
         "BrE": "/ədˈmɪnɪstə(r)/",
         "AmE": "/ədˈmɪnɪstər/",
         "definition": "to manage or give something",
         "examples": [
            "Nurses administer medicine.",
            "He administers the company's finances.",
            "The test was administered fairly."
         ]
      },
      {
         "id": 4,
         "word": "administrative",
         "role": "adjective",
         "BrE": "/ədˈmɪnɪstrətɪv/",
         "AmE": "/ədˈmɪnɪstreɪtɪv/",
         "definition": "related to office management",
         "examples": [
            "Administrative tasks include filing.",
            "She has an administrative role.",
            "Administrative costs are high."
         ]
      },
      {
         "id": 4,
         "word": "administrator",
         "role": "noun",
         "BrE": "/ədˈmɪnɪstreɪtə(r)/",
         "AmE": "/ədˈmɪnɪstreɪtər/",
         "definition": "a person who manages operations",
         "examples": [
            "The school administrator handles issues.",
            "System administrator fixes computers.",
            "She is a hospital administrator."
         ]
      },
      {
         "id": 4,
         "word": "admission",
         "role": "noun",
         "BrE": "/ədˈmɪʃn/",
         "AmE": "/ədˈmɪʃn/",
         "definition": "permission to enter or confess",
         "examples": [
            "Admission to the museum is free.",
            "His admission of guilt surprised us.",
            "University admission is competitive."
         ]
      },
      {
         "id": 4,
         "word": "adolescent",
         "role": "noun",
         "BrE": "/ˌædəˈlesnt/",
         "AmE": "/ˌædəˈlesnt/",
         "definition": "a young person in teenage years",
         "examples": [
            "The adolescent struggled with changes.",
            "Adolescents need guidance.",
            "She teaches adolescent students."
         ]
      },
      {
         "id": 4,
         "word": "adoption",
         "role": "noun",
         "BrE": "/əˈdɒpʃn/",
         "AmE": "/əˈdɑːpʃn/",
         "definition": "taking something as your own",
         "examples": [
            "The adoption of the child was joyful.",
            "Adoption of new technology is fast.",
            "Policy adoption requires approval."
         ]
      },
      {
         "id": 4,
         "word": "adverse",
         "role": "adjective",
         "BrE": "/ˈædvɜːs/",
         "AmE": "/ˈædvɝːs/",
         "definition": "harmful or unfavorable",
         "examples": [
            "Adverse weather canceled the event.",
            "The drug has adverse effects.",
            "Adverse conditions made it hard."
         ]
      },
      {
         "id": 4,
         "word": "advocate",
         "role": "noun, verb",
         "BrE": "/ˈædvəkeɪt/",
         "AmE": "/ˈædvəkeɪt/",
         "definition": "a supporter, or to support something",
         "examples": [
            "She is an advocate for animals.",
            "Advocate for better laws.",
            "The lawyer will advocate for you."
         ]
      },
      {
         "id": 4,
         "word": "aesthetic",
         "role": "adjective",
         "BrE": "/esˈθetɪk/",
         "AmE": "/esˈθetɪk/",
         "definition": "related to beauty",
         "examples": [
            "The design has aesthetic appeal.",
            "Aesthetic choices improve art.",
            "She studies aesthetic principles."
         ]
      },
      {
         "id": 4,
         "word": "affection",
         "role": "noun",
         "BrE": "/əˈfekʃn/",
         "AmE": "/əˈfekʃn/",
         "definition": "a feeling of liking or love",
         "examples": [
            "He shows affection to his dog.",
            "Family affection is strong.",
            "She has great affection for music."
         ]
      },
      {
         "id": 5,
         "word": "aftermath",
         "role": "noun",
         "BrE": "/ˈɑːftəmæθ/",
         "AmE": "/ˈæftərmæθ/",
         "definition": "the period following an event",
         "examples": [
            "In the aftermath of the storm, cleanup began.",
            "The aftermath of the war was difficult.",
            "Deal with the aftermath carefully."
         ]
      },
      {
         "id": 5,
         "word": "aggression",
         "role": "noun",
         "BrE": "/əˈɡreʃn/",
         "AmE": "/əˈɡreʃn/",
         "definition": "hostile behavior",
         "examples": [
            "The dog's aggression scared us.",
            "Stop the aggression in sports.",
            "Nations condemn military aggression."
         ]
      },
      {
         "id": 5,
         "word": "agricultural",
         "role": "adjective",
         "BrE": "/ˌæɡrɪˈkʌltʃərəl/",
         "AmE": "/ˌæɡrɪˈkʌltʃərəl/",
         "definition": "related to farming",
         "examples": [
            "Agricultural land is fertile.",
            "He studies agricultural science.",
            "Agricultural products include crops."
         ]
      },
      {
         "id": 5,
         "word": "aide",
         "role": "noun",
         "BrE": "/eɪd/",
         "AmE": "/eɪd/",
         "definition": "a helper or assistant",
         "examples": [
            "The president's aide handled calls.",
            "Teacher's aide helps in class.",
            "She works as a medical aide."
         ]
      },
      {
         "id": 5,
         "word": "albeit",
         "role": "conjunction",
         "BrE": "/ɔːlˈbiːɪt/",
         "AmE": "/ɔːlˈbiːɪt/",
         "definition": "although",
         "examples": [
            "He was happy, albeit tired.",
            "The movie was good, albeit long.",
            "Success came, albeit slowly."
         ]
      },
      {
         "id": 5,
         "word": "alert",
         "role": "verb, noun, adjective",
         "BrE": "/əˈlɜːt/",
         "AmE": "/əˈlɝːt/",
         "definition": "to warn, or ready and watchful",
         "examples": [
            "Alert the police immediately.",
            "Stay alert while driving.",
            "The alert sounded for danger."
         ]
      },
      {
         "id": 5,
         "word": "alien",
         "role": "adjective",
         "BrE": "/ˈeɪliən/",
         "AmE": "/ˈeɪliən/",
         "definition": "strange or foreign",
         "examples": [
            "The concept is alien to me.",
            "Alien species invade ecosystems.",
            "She felt alien in the new city."
         ]
      },
      {
         "id": 5,
         "word": "align",
         "role": "verb",
         "BrE": "/əˈlaɪn/",
         "AmE": "/əˈlaɪn/",
         "definition": "to arrange in a straight line or support",
         "examples": [
            "Align the text to the left.",
            "Align your goals with the team.",
            "Wheels need to align properly."
         ]
      },
      {
         "id": 5,
         "word": "alignment",
         "role": "noun",
         "BrE": "/əˈlaɪnmənt/",
         "AmE": "/əˈlaɪnmənt/",
         "definition": "arrangement in a line or agreement",
         "examples": [
            "Check the alignment of the tires.",
            "Political alignment matters in votes.",
            "The stars are in alignment."
         ]
      },
      {
         "id": 5,
         "word": "alike",
         "role": "adverb, adjective",
         "BrE": "/əˈlaɪk/",
         "AmE": "/əˈlaɪk/",
         "definition": "similar in some way",
         "examples": [
            "The twins look alike.",
            "Treat all students alike.",
            "They think alike on issues."
         ]
      },
      {
         "id": 6,
         "word": "allegation",
         "role": "noun",
         "BrE": "/ˌæləˈɡeɪʃn/",
         "AmE": "/ˌæləˈɡeɪʃn/",
         "definition": "a claim without proof",
         "examples": [
            "The allegation was investigated.",
            "He denied the allegation.",
            "Serious allegations were made."
         ]
      },
      {
         "id": 6,
         "word": "allege",
         "role": "verb",
         "BrE": "/əˈledʒ/",
         "AmE": "/əˈledʒ/",
         "definition": "to claim without proof",
         "examples": [
            "They allege he stole money.",
            "The report alleges corruption.",
            "Witnesses allege seeing the crime."
         ]
      },
      {
         "id": 6,
         "word": "allegedly",
         "role": "adverb",
         "BrE": "/əˈledʒɪdli/",
         "AmE": "/əˈledʒɪdli/",
         "definition": "claimed but not proven",
         "examples": [
            "He allegedly committed the act.",
            "The money was allegedly stolen.",
            "Allegedly, the meeting was secret."
         ]
      },
      {
         "id": 6,
         "word": "alliance",
         "role": "noun",
         "BrE": "/əˈlaɪəns/",
         "AmE": "/əˈlaɪəns/",
         "definition": "an agreement to work together",
         "examples": [
            "The countries formed an alliance.",
            "Business alliance boosts profits.",
            "Their alliance lasted years."
         ]
      },
      {
         "id": 6,
         "word": "allocate",
         "role": "verb",
         "BrE": "/ˈæləkeɪt/",
         "AmE": "/ˈæləkeɪt/",
         "definition": "to give for a purpose",
         "examples": [
            "Allocate funds for the project.",
            "Time is allocated for breaks.",
            "Resources are allocated fairly."
         ]
      },
      {
         "id": 6,
         "word": "allocation",
         "role": "noun",
         "BrE": "/ˌæləˈkeɪʃn/",
         "AmE": "/ˌæləˈkeɪʃn/",
         "definition": "the act of giving out amounts",
         "examples": [
            "Budget allocation is planned.",
            "Resource allocation is key.",
            "The allocation was insufficient."
         ]
      },
      {
         "id": 6,
         "word": "allowance",
         "role": "noun",
         "BrE": "/əˈlaʊəns/",
         "AmE": "/əˈlaʊəns/",
         "definition": "an amount given regularly",
         "examples": [
            "Kids get a weekly allowance.",
            "Travel allowance covers expenses.",
            "Make allowance for errors."
         ]
      },
      {
         "id": 6,
         "word": "ally",
         "role": "noun",
         "BrE": "/ˈælaɪ/",
         "AmE": "/ˈælaɪ/",
         "definition": "a person or country that helps",
         "examples": [
            "He is a close ally in business.",
            "Allies joined the war effort.",
            "Find an ally for support."
         ]
      },
      {
         "id": 6,
         "word": "aluminium",
         "role": "noun",
         "BrE": "/ˌæljəˈmɪniəm/",
         "AmE": "/əˈluːmɪnəm/",
         "definition": "a light silver metal",
         "examples": [
            "Cans are made of aluminium.",
            "Aluminium foil wraps food.",
            "The frame is aluminium."
         ]
      },
      {
         "id": 6,
         "word": "amateur",
         "role": "adjective, noun",
         "BrE": "/ˈæmətə(r)/",
         "AmE": "/ˈæmətʃər/",
         "definition": "not professional, or a hobbyist",
         "examples": [
            "He is an amateur photographer.",
            "Amateur sports are fun.",
            "The play was amateur level."
         ]
      },
      {
         "id": 7,
         "word": "ambassador",
         "role": "noun",
         "BrE": "/æmˈbæsədə(r)/",
         "AmE": "/æmˈbæsədər/",
         "definition": "a diplomat representing a country",
         "examples": [
            "The ambassador met the president.",
            "She is the US ambassador.",
            "Ambassadors promote peace."
         ]
      },
      {
         "id": 7,
         "word": "amend",
         "role": "verb",
         "BrE": "/əˈmend/",
         "AmE": "/əˈmend/",
         "definition": "to change a law or document",
         "examples": [
            "Amend the contract before signing.",
            "The law was amended recently.",
            "They amend rules as needed."
         ]
      },
      {
         "id": 7,
         "word": "amendment",
         "role": "noun",
         "BrE": "/əˈmendmənt/",
         "AmE": "/əˈmendmənt/",
         "definition": "a change to a law or document",
         "examples": [
            "The first amendment protects speech.",
            "Propose an amendment to the bill.",
            "Amendments improve the constitution."
         ]
      },
      {
         "id": 7,
         "word": "amid",
         "role": "preposition",
         "BrE": "/əˈmɪd/",
         "AmE": "/əˈmɪd/",
         "definition": "in the middle of",
         "examples": [
            "He stood amid the crowd.",
            "Peace amid chaos is rare.",
            "Decisions amid uncertainty."
         ]
      },
      {
         "id": 7,
         "word": "analogy",
         "role": "noun",
         "BrE": "/əˈnælədʒi/",
         "AmE": "/əˈnælədʒi/",
         "definition": "a comparison to explain",
         "examples": [
            "Use an analogy to clarify.",
            "The analogy helped understanding.",
            "Draw an analogy between them."
         ]
      },
      {
         "id": 7,
         "word": "anchor",
         "role": "noun",
         "BrE": "/ˈæŋkə(r)/",
         "AmE": "/ˈæŋkər/",
         "definition": "a heavy object to hold a ship",
         "examples": [
            "Drop the anchor in the bay.",
            "The news anchor reported live.",
            "Anchor the tent securely."
         ]
      },
      {
         "id": 7,
         "word": "angel",
         "role": "noun",
         "BrE": "/ˈeɪndʒl/",
         "AmE": "/ˈeɪndʒl/",
         "definition": "a spiritual being or kind person",
         "examples": [
            "The angel appeared in the story.",
            "She is an angel for helping.",
            "Guardian angels protect us."
         ]
      },
      {
         "id": 7,
         "word": "anonymous",
         "role": "adjective",
         "BrE": "/əˈnɒnɪməs/",
         "AmE": "/əˈnɑːnɪməs/",
         "definition": "without a name known",
         "examples": [
            "An anonymous donor gave money.",
            "The call was anonymous.",
            "Anonymous tips help police."
         ]
      },
      {
         "id": 7,
         "word": "apparatus",
         "role": "noun",
         "BrE": "/ˌæpəˈreɪtəs/",
         "AmE": "/ˌæpəˈrætəs/",
         "definition": "equipment for a purpose",
         "examples": [
            "Lab apparatus includes beakers.",
            "The breathing apparatus saved him.",
            "Gymnastics apparatus is challenging."
         ]
      },
      {
         "id": 7,
         "word": "appealing",
         "role": "adjective",
         "BrE": "/əˈpiːlɪŋ/",
         "AmE": "/əˈpiːlɪŋ/",
         "definition": "attractive or interesting",
         "examples": [
            "The idea is very appealing.",
            "She has an appealing smile.",
            "The food looks appealing."
         ]
      },
      {
         "id": 8,
         "word": "appetite",
         "role": "noun",
         "BrE": "/ˈæpɪtaɪt/",
         "AmE": "/ˈæpɪtaɪt/",
         "definition": "desire for food or something",
         "examples": [
            "He has a big appetite.",
            "Loss of appetite is a symptom.",
            "Appetite for adventure grows."
         ]
      },
      {
         "id": 8,
         "word": "applaud",
         "role": "verb",
         "BrE": "/əˈplɔːd/",
         "AmE": "/əˈplɔːd/",
         "definition": "to clap to show approval",
         "examples": [
            "The audience will applaud the performance.",
            "We applaud your efforts.",
            "Applaud the winner loudly."
         ]
      },
      {
         "id": 8,
         "word": "applicable",
         "role": "adjective",
         "BrE": "/əˈplɪkəbl/",
         "AmE": "/əˈplɪkəbl/",
         "definition": "relevant or suitable",
         "examples": [
            "The rule is applicable here.",
            "Not applicable to children.",
            "Skills are applicable in jobs."
         ]
      },
      {
         "id": 8,
         "word": "appoint",
         "role": "verb",
         "BrE": "/əˈpɔɪnt/",
         "AmE": "/əˈpɔɪnt/",
         "definition": "to choose for a position",
         "examples": [
            "Appoint a new manager.",
            "He was appointed director.",
            "Appoint someone to the task."
         ]
      },
      {
         "id": 8,
         "word": "appreciation",
         "role": "noun",
         "BrE": "/əˌpriːʃiˈeɪʃn/",
         "AmE": "/əˌpriːʃiˈeɪʃn/",
         "definition": "gratitude or understanding of value",
         "examples": [
            "Show appreciation with thanks.",
            "Art appreciation class is fun.",
            "Price appreciation increases wealth."
         ]
      },
      {
         "id": 8,
         "word": "arbitrary",
         "role": "adjective",
         "BrE": "/ˈɑːbɪtrəri/",
         "AmE": "/ˈɑːrbɪtreri/",
         "definition": "based on chance, not reason",
         "examples": [
            "The decision seems arbitrary.",
            "Avoid arbitrary choices.",
            "Arbitrary rules confuse people."
         ]
      },
      {
         "id": 8,
         "word": "architectural",
         "role": "adjective",
         "BrE": "/ˌɑːkɪˈtektʃərəl/",
         "AmE": "/ˌɑːrkɪˈtektʃərəl/",
         "definition": "related to building design",
         "examples": [
            "Architectural features include arches.",
            "Study architectural history.",
            "The architectural style is modern."
         ]
      },
      {
         "id": 8,
         "word": "archive",
         "role": "noun",
         "BrE": "/ˈɑːkaɪv/",
         "AmE": "/ˈɑːrkaɪv/",
         "definition": "a collection of historical records",
         "examples": [
            "The archive holds old documents.",
            "Search the digital archive.",
            "Archive your emails regularly."
         ]
      },
      {
         "id": 8,
         "word": "arena",
         "role": "noun",
         "BrE": "/əˈriːnə/",
         "AmE": "/əˈriːnə/",
         "definition": "a place for sports or events",
         "examples": [
            "The concert is at the arena.",
            "Political arena is competitive.",
            "Enter the arena confidently."
         ]
      },
      {
         "id": 8,
         "word": "arguably",
         "role": "adverb",
         "BrE": "/ˈɑːɡjuəbli/",
         "AmE": "/ˈɑːrɡjuəbli/",
         "definition": "possibly or can be argued",
         "examples": [
            "He is arguably the best player.",
            "Arguably, it's the finest wine.",
            "The film is arguably a classic."
         ]
      },
      {
         "id": 9,
         "word": "arm",
         "role": "verb",
         "BrE": "/ɑːm/",
         "AmE": "/ɑːrm/",
         "definition": "to provide with weapons",
         "examples": [
            "Arm the guards for security.",
            "Soldiers arm themselves before battle.",
            "The law allows citizens to arm."
         ]
      },
      {
         "id": 9,
         "word": "array",
         "role": "noun",
         "BrE": "/əˈreɪ/",
         "AmE": "/əˈreɪ/",
         "definition": "a large group or arrangement",
         "examples": [
            "An array of colors in the sky.",
            "Wide array of choices available.",
            "The array of tools is impressive."
         ]
      },
      {
         "id": 9,
         "word": "articulate",
         "role": "verb",
         "BrE": "/ɑːˈtɪkjuleɪt/",
         "AmE": "/ɑːrˈtɪkjuleɪt/",
         "definition": "to express clearly",
         "examples": [
            "Articulate your thoughts well.",
            "She can articulate ideas effectively.",
            "Articulate the problem to solve it."
         ]
      },
      {
         "id": 9,
         "word": "ash",
         "role": "noun",
         "BrE": "/æʃ/",
         "AmE": "/æʃ/",
         "definition": "powder left after burning",
         "examples": [
            "Cigarette ash fell on the floor.",
            "Volcanic ash covered the town.",
            "Sweep the ash from the fireplace."
         ]
      },
      {
         "id": 9,
         "word": "aspiration",
         "role": "noun",
         "BrE": "/ˌæspəˈreɪʃn/",
         "AmE": "/ˌæspəˈreɪʃn/",
         "definition": "a strong desire to achieve",
         "examples": [
            "His aspiration is to be a doctor.",
            "Aspirations drive success.",
            "Meet your career aspirations."
         ]
      },
      {
         "id": 9,
         "word": "aspire",
         "role": "verb",
         "BrE": "/əˈspaɪə(r)/",
         "AmE": "/əˈspaɪər/",
         "definition": "to have a strong desire",
         "examples": [
            "She aspires to be famous.",
            "Aspire to greatness in life.",
            "Many aspire to wealth."
         ]
      },
      {
         "id": 9,
         "word": "assassination",
         "role": "noun",
         "BrE": "/əˌsæsɪˈneɪʃn/",
         "AmE": "/əˌsæsəˈneɪʃn/",
         "definition": "murder of an important person",
         "examples": [
            "The assassination shocked the world.",
            "Prevent assassination attempts.",
            "Historical assassinations change history."
         ]
      },
      {
         "id": 9,
         "word": "assault",
         "role": "noun, verb",
         "BrE": "/əˈsɔːlt/",
         "AmE": "/əˈsɔːlt/",
         "definition": "a violent attack",
         "examples": [
            "The assault left him injured.",
            "Assault is a crime.",
            "Soldiers assault the enemy position."
         ]
      },
      {
         "id": 9,
         "word": "assemble",
         "role": "verb",
         "BrE": "/əˈsembl/",
         "AmE": "/əˈsembl/",
         "definition": "to put together or gather",
         "examples": [
            "Assemble the furniture yourself.",
            "People assemble for the meeting.",
            "Assemble the team quickly."
         ]
      },
      {
         "id": 9,
         "word": "assembly",
         "role": "noun",
         "BrE": "/əˈsembli/",
         "AmE": "/əˈsembli/",
         "definition": "a group gathered or putting together",
         "examples": [
            "School assembly is in the hall.",
            "Assembly of parts is easy.",
            "The legislative assembly votes."
         ]
      },
      {
         "id": 10,
         "word": "assert",
         "role": "verb",
         "BrE": "/əˈsɜːt/",
         "AmE": "/əˈsɝːt/",
         "definition": "to state firmly",
         "examples": [
            "Assert your rights confidently.",
            "She asserts her innocence.",
            "Assert control over the situation."
         ]
      },
      {
         "id": 10,
         "word": "assertion",
         "role": "noun",
         "BrE": "/əˈsɜːʃn/",
         "AmE": "/əˈsɝːʃn/",
         "definition": "a strong statement",
         "examples": [
            "His assertion was proven wrong.",
            "Make a bold assertion.",
            "The assertion lacks evidence."
         ]
      },
      {
         "id": 10,
         "word": "assurance",
         "role": "noun",
         "BrE": "/əˈʃʊərəns/",
         "AmE": "/əˈʃʊrəns/",
         "definition": "a promise or confidence",
         "examples": [
            "Give assurance of safety.",
            "Quality assurance is important.",
            "He spoke with assurance."
         ]
      },
      {
         "id": 10,
         "word": "asylum",
         "role": "noun",
         "BrE": "/əˈsaɪləm/",
         "AmE": "/əˈsaɪləm/",
         "definition": "protection given to refugees",
         "examples": [
            "Seek asylum in another country.",
            "Political asylum was granted.",
            "The asylum houses patients."
         ]
      },
      {
         "id": 10,
         "word": "atrocity",
         "role": "noun",
         "BrE": "/əˈtrɒsəti/",
         "AmE": "/əˈtrɑːsəti/",
         "definition": "a very cruel act",
         "examples": [
            "War atrocities are horrific.",
            "Condemn the atrocity publicly.",
            "Victims remember the atrocity."
         ]
      },
      {
         "id": 10,
         "word": "attain",
         "role": "verb",
         "BrE": "/əˈteɪn/",
         "AmE": "/əˈteɪn/",
         "definition": "to achieve or reach",
         "examples": [
            "Attain your goals through hard work.",
            "She attained a high position.",
            "Attain success in business."
         ]
      },
      {
         "id": 10,
         "word": "attendance",
         "role": "noun",
         "BrE": "/əˈtendəns/",
         "AmE": "/əˈtendəns/",
         "definition": "being present at an event",
         "examples": [
            "Attendance at school is mandatory.",
            "High attendance at the concert.",
            "Take attendance in class."
         ]
      },
      {
         "id": 10,
         "word": "attorney",
         "role": "noun",
         "BrE": "/əˈtɜːni/",
         "AmE": "/əˈtɝːni/",
         "definition": "a lawyer",
         "examples": [
            "Hire an attorney for legal advice.",
            "The attorney represented her.",
            "District attorney prosecutes cases."
         ]
      },
      {
         "id": 10,
         "word": "attribute",
         "role": "verb, noun",
         "BrE": "/əˈtrɪbjuːt/",
         "AmE": "/əˈtrɪbjuːt/",
         "definition": "to believe caused by, or a quality",
         "examples": [
            "Attribute success to teamwork.",
            "Kindness is a good attribute.",
            "Attribute the quote to the author."
         ]
      },
      {
         "id": 10,
         "word": "audit",
         "role": "noun",
         "BrE": "/ˈɔːdɪt/",
         "AmE": "/ˈɔːdɪt/",
         "definition": "an official check of accounts",
         "examples": [
            "Conduct an audit of finances.",
            "The audit revealed errors.",
            "Prepare for the annual audit."
         ]
      },
      {
         "id": 11,
         "word": "authentic",
         "role": "adjective",
         "BrE": "/ɔːˈθentɪk/",
         "AmE": "/ɔːˈθentɪk/",
         "definition": "real or genuine",
         "examples": [
            "The painting is authentic.",
            "She prefers authentic food.",
            "His story sounds authentic."
         ]
      },
      {
         "id": 11,
         "word": "authorize",
         "role": "verb",
         "BrE": "/ˈɔːθəraɪz/",
         "AmE": "/ˈɔːθəraɪz/",
         "definition": "to give official permission",
         "examples": [
            "Authorize the payment now.",
            "Only managers can authorize leave.",
            "The bank authorized the loan."
         ]
      },
      {
         "id": 11,
         "word": "auto",
         "role": "noun",
         "BrE": "/ˈɔːtəʊ/",
         "AmE": "/ˈɔːtoʊ/",
         "definition": "a car",
         "examples": [
            "He bought a new auto.",
            "Auto repair is expensive.",
            "The auto industry is growing."
         ]
      },
      {
         "id": 11,
         "word": "autonomy",
         "role": "noun",
         "BrE": "/ɔːˈtɒnəmi/",
         "AmE": "/ɔːˈtɑːnəmi/",
         "definition": "the right to govern itself",
         "examples": [
            "The region seeks autonomy.",
            "Personal autonomy is important.",
            "Schools have more autonomy now."
         ]
      },
      {
         "id": 11,
         "word": "availability",
         "role": "noun",
         "BrE": "/əˌveɪləˈbɪləti/",
         "AmE": "/əˌveɪləˈbɪləti/",
         "definition": "the state of being able to be used",
         "examples": [
            "Check availability of rooms.",
            "Product availability varies.",
            "His availability for work is limited."
         ]
      },
      {
         "id": 11,
         "word": "await",
         "role": "verb",
         "BrE": "/əˈweɪt/",
         "AmE": "/əˈweɪt/",
         "definition": "to wait for something",
         "examples": [
            "We await your decision.",
            "Results await confirmation.",
            "They await the train."
         ]
      },
      {
         "id": 11,
         "word": "backdrop",
         "role": "noun",
         "BrE": "/ˈbækdrɒp/",
         "AmE": "/ˈbækdrɑːp/",
         "definition": "the background to an event",
         "examples": [
            "Mountains form a beautiful backdrop.",
            "The story has a historical backdrop.",
            "Against the backdrop of war."
         ]
      },
      {
         "id": 11,
         "word": "backing",
         "role": "noun",
         "BrE": "/ˈbækɪŋ/",
         "AmE": "/ˈbækɪŋ/",
         "definition": "support or help",
         "examples": [
            "The project has financial backing.",
            "She has the team's backing.",
            "Backing vocals enhance the song."
         ]
      },
      {
         "id": 11,
         "word": "backup",
         "role": "noun",
         "BrE": "/ˈbækʌp/",
         "AmE": "/ˈbækʌp/",
         "definition": "extra support or copy",
         "examples": [
            "Call for backup in emergencies.",
            "Make a backup of files.",
            "He is the backup player."
         ]
      },
      {
         "id": 11,
         "word": "bail",
         "role": "noun",
         "BrE": "/beɪl/",
         "AmE": "/beɪl/",
         "definition": "money paid for release from jail",
         "examples": [
            "He was released on bail.",
            "Set bail at a high amount.",
            "Post bail to get out."
         ]
      },
      {
         "id": 12,
         "word": "ballot",
         "role": "noun",
         "BrE": "/ˈbælət/",
         "AmE": "/ˈbælət/",
         "definition": "a system of secret voting",
         "examples": [
            "Cast your ballot in the election.",
            "The ballot was anonymous.",
            "Count the ballots carefully."
         ]
      },
      {
         "id": 12,
         "word": "banner",
         "role": "noun",
         "BrE": "/ˈbænə(r)/",
         "AmE": "/ˈbænər/",
         "definition": "a long strip with a message",
         "examples": [
            "Hang a banner for the party.",
            "The website has a banner ad.",
            "Protesters carried banners."
         ]
      },
      {
         "id": 12,
         "word": "bare",
         "role": "adjective",
         "BrE": "/beə(r)/",
         "AmE": "/ber/",
         "definition": "not covered or empty",
         "examples": [
            "Walk on bare feet.",
            "The room was bare.",
            "Bare essentials are needed."
         ]
      },
      {
         "id": 12,
         "word": "barrel",
         "role": "noun",
         "BrE": "/ˈbærəl/",
         "AmE": "/ˈbærəl/",
         "definition": "a large round container",
         "examples": [
            "A barrel of oil.",
            "Store wine in barrels.",
            "Roll the barrel down."
         ]
      },
      {
         "id": 12,
         "word": "bass1",
         "role": "noun",
         "BrE": "/beɪs/",
         "AmE": "/beɪs/",
         "definition": "a low sound or fish",
         "examples": [
            "Turn up the bass.",
            "Catch a bass fish.",
            "He sings bass."
         ]
      },
      {
         "id": 12,
         "word": "bat",
         "role": "verb",
         "BrE": "/bæt/",
         "AmE": "/bæt/",
         "definition": "to hit with a bat",
         "examples": [
            "Bat the ball hard.",
            "He bats left-handed.",
            "Don't bat an eye."
         ]
      },
      {
         "id": 12,
         "word": "battlefield",
         "role": "noun",
         "BrE": "/ˈbætlfiːld/",
         "AmE": "/ˈbætlfiːld/",
         "definition": "a place where a battle is fought",
         "examples": [
            "Soldiers on the battlefield.",
            "Visit historical battlefields.",
            "The battlefield was chaotic."
         ]
      },
      {
         "id": 12,
         "word": "bay",
         "role": "noun",
         "BrE": "/beɪ/",
         "AmE": "/beɪ/",
         "definition": "a part of the coast curving inward",
         "examples": [
            "Sail in the bay.",
            "The bay is calm.",
            "Keep danger at bay."
         ]
      },
      {
         "id": 12,
         "word": "beam",
         "role": "noun",
         "BrE": "/biːm/",
         "AmE": "/biːm/",
         "definition": "a long piece of wood or light ray",
         "examples": [
            "Wooden beam in the ceiling.",
            "A beam of sunlight.",
            "Smile with a beam."
         ]
      },
      {
         "id": 12,
         "word": "beast",
         "role": "noun",
         "BrE": "/biːst/",
         "AmE": "/biːst/",
         "definition": "a wild animal",
         "examples": [
            "The beast roared loudly.",
            "Tame the wild beast.",
            "Beauty and the Beast story."
         ]
      },
      {
         "id": 13,
         "word": "behalf",
         "role": "noun",
         "BrE": "/bɪˈhɑːf/",
         "AmE": "/bɪˈhæf/",
         "definition": "representing someone",
         "examples": [
            "Speak on my behalf.",
            "Act on behalf of the company.",
            "Thanks on behalf of all."
         ]
      },
      {
         "id": 13,
         "word": "beloved",
         "role": "adjective",
         "BrE": "/bɪˈlʌvd/",
         "AmE": "/bɪˈlʌvd/",
         "definition": "dearly loved",
         "examples": [
            "My beloved grandmother.",
            "The beloved pet dog.",
            "Beloved by fans worldwide."
         ]
      },
      {
         "id": 13,
         "word": "bench",
         "role": "noun",
         "BrE": "/bentʃ/",
         "AmE": "/bentʃ/",
         "definition": "a long seat",
         "examples": [
            "Sit on the park bench.",
            "Judges sit on the bench.",
            "Bench press weights."
         ]
      },
      {
         "id": 13,
         "word": "benchmark",
         "role": "noun",
         "BrE": "/ˈbentʃmɑːk/",
         "AmE": "/ˈbentʃmɑːrk/",
         "definition": "a standard to measure against",
         "examples": [
            "Set a new benchmark.",
            "Industry benchmark for quality.",
            "Use as a benchmark."
         ]
      },
      {
         "id": 13,
         "word": "beneath",
         "role": "preposition",
         "BrE": "/bɪˈniːθ/",
         "AmE": "/bɪˈniːθ/",
         "definition": "under or below",
         "examples": [
            "Hidden beneath the surface.",
            "Sit beneath the tree.",
            "Beneath his calm exterior."
         ]
      },
      {
         "id": 13,
         "word": "beneficiary",
         "role": "noun",
         "BrE": "/ˌbenɪˈfɪʃəri/",
         "AmE": "/ˌbenɪˈfɪʃieri/",
         "definition": "a person who receives benefits",
         "examples": [
            "The beneficiary of the will.",
            "Policy beneficiary is named.",
            "Charity beneficiaries are helped."
         ]
      },
      {
         "id": 13,
         "word": "betray",
         "role": "verb",
         "BrE": "/bɪˈtreɪ/",
         "AmE": "/bɪˈtreɪ/",
         "definition": "to be disloyal",
         "examples": [
            "Don't betray my trust.",
            "He betrayed his country.",
            "Expressions betray emotions."
         ]
      },
      {
         "id": 13,
         "word": "bind",
         "role": "verb",
         "BrE": "/baɪnd/",
         "AmE": "/baɪnd/",
         "definition": "to tie or attach",
         "examples": [
            "Bind the books together.",
            "Legally bind the agreement.",
            "Bind the wound."
         ]
      },
      {
         "id": 13,
         "word": "biography",
         "role": "noun",
         "BrE": "/baɪˈɒɡrəfi/",
         "AmE": "/baɪˈɑːɡrəfi/",
         "definition": "a written life story",
         "examples": [
            "Read his biography.",
            "Write a biography.",
            "Famous people's biographies."
         ]
      },
      {
         "id": 13,
         "word": "bishop",
         "role": "noun",
         "BrE": "/ˈbɪʃəp/",
         "AmE": "/ˈbɪʃəp/",
         "definition": "a high-ranking church official",
         "examples": [
            "The bishop led the service.",
            "Chess piece called bishop.",
            "Appoint a new bishop."
         ]
      },
      {
         "id": 14,
         "word": "bizarre",
         "role": "adjective",
         "BrE": "/bɪˈzɑː(r)/",
         "AmE": "/bɪˈzɑːr/",
         "definition": "very strange",
         "examples": [
            "A bizarre dream.",
            "Bizarre behavior surprised us.",
            "The story is bizarre."
         ]
      },
      {
         "id": 14,
         "word": "blade",
         "role": "noun",
         "BrE": "/bleɪd/",
         "AmE": "/bleɪd/",
         "definition": "the flat cutting part",
         "examples": [
            "Sharp knife blade.",
            "Grass blade in the field.",
            "Fan blade spins."
         ]
      },
      {
         "id": 14,
         "word": "blast",
         "role": "noun, verb",
         "BrE": "/blɑːst/",
         "AmE": "/blæst/",
         "definition": "an explosion or strong air",
         "examples": [
            "A blast of wind.",
            "Blast the music loud.",
            "Bomb blast damaged buildings."
         ]
      },
      {
         "id": 14,
         "word": "bleed",
         "role": "verb",
         "BrE": "/bliːd/",
         "AmE": "/bliːd/",
         "definition": "to lose blood",
         "examples": [
            "The cut will bleed.",
            "Colors bleed in wash.",
            "Heart bleeds for you."
         ]
      },
      {
         "id": 14,
         "word": "blend",
         "role": "verb, noun",
         "BrE": "/blend/",
         "AmE": "/blend/",
         "definition": "to mix together",
         "examples": [
            "Blend the ingredients.",
            "A blend of flavors.",
            "Colors blend nicely."
         ]
      },
      {
         "id": 14,
         "word": "bless",
         "role": "verb",
         "BrE": "/bles/",
         "AmE": "/bles/",
         "definition": "to ask for God's protection",
         "examples": [
            "Bless the food.",
            "God bless you.",
            "Bless the child."
         ]
      },
      {
         "id": 14,
         "word": "blessing",
         "role": "noun",
         "BrE": "/ˈblesɪŋ/",
         "AmE": "/ˈblesɪŋ/",
         "definition": "something good or approval",
         "examples": [
            "A blessing in disguise.",
            "Give your blessing.",
            "Count your blessings."
         ]
      },
      {
         "id": 14,
         "word": "boast",
         "role": "verb",
         "BrE": "/bəʊst/",
         "AmE": "/boʊst/",
         "definition": "to talk proudly",
         "examples": [
            "Don't boast about wins.",
            "He boasts of his skills.",
            "City boasts great museums."
         ]
      },
      {
         "id": 14,
         "word": "bonus",
         "role": "noun",
         "BrE": "/ˈbəʊnəs/",
         "AmE": "/ˈboʊnəs/",
         "definition": "an extra payment",
         "examples": [
            "Year-end bonus.",
            "Sign-up bonus offered.",
            "That's a bonus."
         ]
      },
      {
         "id": 14,
         "word": "boom",
         "role": "noun",
         "BrE": "/buːm/",
         "AmE": "/buːm/",
         "definition": "a sudden increase",
         "examples": [
            "Economic boom period.",
            "Baby boom generation.",
            "Loud boom sound."
         ]
      },
      {
         "id": 15,
         "word": "bounce",
         "role": "verb",
         "BrE": "/baʊns/",
         "AmE": "/baʊns/",
         "definition": "to spring back",
         "examples": [
            "Bounce the ball.",
            "Checks bounce if no funds.",
            "Bounce back from failure."
         ]
      },
      {
         "id": 15,
         "word": "boundary",
         "role": "noun",
         "BrE": "/ˈbaʊndri/",
         "AmE": "/ˈbaʊndri/",
         "definition": "a dividing line",
         "examples": [
            "Cross the boundary.",
            "Set personal boundaries.",
            "Property boundary marked."
         ]
      },
      {
         "id": 15,
         "word": "bow1",
         "role": "verb, noun",
         "BrE": "/baʊ/",
         "AmE": "/baʊ/",
         "definition": "to bend forward or a knot",
         "examples": [
            "Bow to the audience.",
            "Tie a bow.",
            "Bow and arrow."
         ]
      },
      {
         "id": 15,
         "word": "breach",
         "role": "noun, verb",
         "BrE": "/briːtʃ/",
         "AmE": "/briːtʃ/",
         "definition": "a break in agreement",
         "examples": [
            "Breach of contract.",
            "Breach the wall.",
            "Security breach occurred."
         ]
      },
      {
         "id": 15,
         "word": "breakdown",
         "role": "noun",
         "BrE": "/ˈbreɪkdaʊn/",
         "AmE": "/ˈbreɪkdaʊn/",
         "definition": "a failure or analysis",
         "examples": [
            "Car breakdown on road.",
            "Nervous breakdown.",
            "Cost breakdown provided."
         ]
      },
      {
         "id": 15,
         "word": "breakthrough",
         "role": "noun",
         "BrE": "/ˈbreɪkθruː/",
         "AmE": "/ˈbreɪkθruː/",
         "definition": "an important discovery",
         "examples": [
            "Scientific breakthrough.",
            "Make a breakthrough.",
            "Medical breakthrough saves lives."
         ]
      },
      {
         "id": 15,
         "word": "breed",
         "role": "verb, noun",
         "BrE": "/briːd/",
         "AmE": "/briːd/",
         "definition": "to produce offspring",
         "examples": [
            "Breed dogs for shows.",
            "A rare breed.",
            "Success breeds confidence."
         ]
      },
      {
         "id": 15,
         "word": "broadband",
         "role": "noun",
         "BrE": "/ˈbrɔːdbænd/",
         "AmE": "/ˈbrɔːdbænd/",
         "definition": "high-speed internet",
         "examples": [
            "Install broadband service.",
            "Broadband connection is fast.",
            "Upgrade to broadband."
         ]
      },
      {
         "id": 15,
         "word": "browser",
         "role": "noun",
         "BrE": "/ˈbraʊzə(r)/",
         "AmE": "/ˈbraʊzər/",
         "definition": "a program to view websites",
         "examples": [
            "Open the web browser.",
            "Update your browser.",
            "Browser history shows sites."
         ]
      },
      {
         "id": 15,
         "word": "brutal",
         "role": "adjective",
         "BrE": "/ˈbruːtl/",
         "AmE": "/ˈbruːtl/",
         "definition": "very cruel",
         "examples": [
            "A brutal attack.",
            "Brutal honesty hurts.",
            "The weather is brutal."
         ]
      },
      {
         "id": 16,
         "word": "buck",
         "role": "noun",
         "BrE": "/bʌk/",
         "AmE": "/bʌk/",
         "definition": "a dollar or male deer",
         "examples": [
            "Costs a few bucks.",
            "Hunt a buck.",
            "Pass the buck."
         ]
      },
      {
         "id": 16,
         "word": "buddy",
         "role": "noun",
         "BrE": "/ˈbʌdi/",
         "AmE": "/ˈbʌdi/",
         "definition": "a friend",
         "examples": [
            "My best buddy.",
            "Buddy system for safety.",
            "Hey, buddy!"
         ]
      },
      {
         "id": 16,
         "word": "buffer",
         "role": "noun",
         "BrE": "/ˈbʌfə(r)/",
         "AmE": "/ˈbʌfər/",
         "definition": "something that protects",
         "examples": [
            "Buffer zone between countries.",
            "Video buffers slowly.",
            "Use as a buffer."
         ]
      },
      {
         "id": 16,
         "word": "bulk",
         "role": "noun",
         "BrE": "/bʌlk/",
         "AmE": "/bʌlk/",
         "definition": "large size or main part",
         "examples": [
            "Buy in bulk.",
            "The bulk of the work.",
            "Bulk up muscles."
         ]
      },
      {
         "id": 16,
         "word": "burden",
         "role": "noun",
         "BrE": "/ˈbɜːdn/",
         "AmE": "/ˈbɝːdn/",
         "definition": "a heavy load",
         "examples": [
            "Carry the burden.",
            "Financial burden.",
            "Burden of proof."
         ]
      },
      {
         "id": 16,
         "word": "bureaucracy",
         "role": "noun",
         "BrE": "/bjʊəˈrɒkrəsi/",
         "AmE": "/bjʊˈrɑːkrəsi/",
         "definition": "system of officials and rules",
         "examples": [
            "Government bureaucracy slows things.",
            "Cut through bureaucracy.",
            "Bureaucracy manages processes."
         ]
      },
      {
         "id": 16,
         "word": "burial",
         "role": "noun",
         "BrE": "/ˈberiəl/",
         "AmE": "/ˈberiəl/",
         "definition": "putting a body in the ground",
         "examples": [
            "Attend the burial.",
            "Burial site is ancient.",
            "Sea burial for sailors."
         ]
      },
      {
         "id": 16,
         "word": "burst",
         "role": "verb",
         "BrE": "/bɜːst/",
         "AmE": "/bɝːst/",
         "definition": "to break open suddenly",
         "examples": [
            "The balloon burst.",
            "Burst into tears.",
            "Burst of energy."
         ]
      },
      {
         "id": 16,
         "word": "cabinet",
         "role": "noun",
         "BrE": "/ˈkæbɪnət/",
         "AmE": "/ˈkæbɪnət/",
         "definition": "a group of advisors or storage unit",
         "examples": [
            "Kitchen cabinet for dishes.",
            "Cabinet ministers meet.",
            "File cabinet holds papers."
         ]
      },
      {
         "id": 16,
         "word": "calculation",
         "role": "noun",
         "BrE": "/ˌkælkjuˈleɪʃn/",
         "AmE": "/ˌkælkjuˈleɪʃn/",
         "definition": "mathematical working out",
         "examples": [
            "Do the calculation.",
            "Error in calculation.",
            "Careful calculation needed."
         ]
      },
      {
         "id": 17,
         "word": "canvas",
         "role": "noun",
         "BrE": "/ˈkænvəs/",
         "AmE": "/ˈkænvəs/",
         "definition": "strong cloth for painting",
         "examples": [
            "Paint on canvas.",
            "Canvas tent material.",
            "Canvas the area."
         ]
      },
      {
         "id": 17,
         "word": "capability",
         "role": "noun",
         "BrE": "/ˌkeɪpəˈbɪləti/",
         "AmE": "/ˌkeɪpəˈbɪləti/",
         "definition": "the ability to do something",
         "examples": [
            "Machine's capability is high.",
            "Beyond my capability.",
            "Expand capability."
         ]
      },
      {
         "id": 17,
         "word": "capitalism",
         "role": "noun",
         "BrE": "/ˈkæpɪtəlɪzəm/",
         "AmE": "/ˈkæpɪtəlɪzəm/",
         "definition": "economic system with private ownership",
         "examples": [
            "Capitalism drives innovation.",
            "Study capitalism.",
            "Free market capitalism."
         ]
      },
      {
         "id": 17,
         "word": "capitalist",
         "role": "adjective",
         "BrE": "/ˈkæpɪtəlɪst/",
         "AmE": "/ˈkæpɪtəlɪst/",
         "definition": "supporting capitalism",
         "examples": [
            "Capitalist society.",
            "Capitalist economy.",
            "Capitalist investors."
         ]
      },
      {
         "id": 17,
         "word": "cargo",
         "role": "noun",
         "BrE": "/ˈkɑːɡəʊ/",
         "AmE": "/ˈkɑːrɡoʊ/",
         "definition": "goods carried by ship or plane",
         "examples": [
            "Load the cargo.",
            "Cargo ship sailing.",
            "Valuable cargo inside."
         ]
      },
      {
         "id": 17,
         "word": "carriage",
         "role": "noun",
         "BrE": "/ˈkæriɪdʒ/",
         "AmE": "/ˈkæriɪdʒ/",
         "definition": "a vehicle pulled by horses",
         "examples": [
            "Horse-drawn carriage.",
            "Train carriage full.",
            "Baby carriage pushed."
         ]
      },
      {
         "id": 17,
         "word": "carve",
         "role": "verb",
         "BrE": "/kɑːv/",
         "AmE": "/kɑːrv/",
         "definition": "to cut into shape",
         "examples": [
            "Carve the turkey.",
            "Carve wood sculptures.",
            "Carve a niche."
         ]
      },
      {
         "id": 17,
         "word": "casino",
         "role": "noun",
         "BrE": "/kəˈsiːnəʊ/",
         "AmE": "/kəˈsiːnoʊ/",
         "definition": "a place for gambling",
         "examples": [
            "Visit the casino.",
            "Win at casino games.",
            "Casino lights bright."
         ]
      },
      {
         "id": 17,
         "word": "casualty",
         "role": "noun",
         "BrE": "/ˈkæʒuəlti/",
         "AmE": "/ˈkæʒuəlti/",
         "definition": "a person killed or injured",
         "examples": [
            "War casualty reported.",
            "No casualties in accident.",
            "Treat casualties first."
         ]
      },
      {
         "id": 17,
         "word": "catalogue",
         "role": "noun",
         "BrE": "/ˈkætəlɒɡ/",
         "AmE": "/ˈkætəlɔːɡ/",
         "definition": "a list of items",
         "examples": [
            "Browse the catalogue.",
            "Product catalogue available.",
            "Catalogue errors fixed."
         ]
      },
      {
         "id": 18,
         "word": "cater",
         "role": "verb",
         "BrE": "/ˈkeɪtə(r)/",
         "AmE": "/ˈkeɪtər/",
         "definition": "to provide food or needs",
         "examples": [
            "Cater the event.",
            "Cater to tastes.",
            "Company caters parties."
         ]
      },
      {
         "id": 18,
         "word": "cattle",
         "role": "noun",
         "BrE": "/ˈkætl/",
         "AmE": "/ˈkætl/",
         "definition": "cows and bulls",
         "examples": [
            "Raise cattle on farm.",
            "Cattle graze in field.",
            "Herd the cattle."
         ]
      },
      {
         "id": 18,
         "word": "caution",
         "role": "noun",
         "BrE": "/ˈkɔːʃn/",
         "AmE": "/ˈkɔːʃn/",
         "definition": "care to avoid danger",
         "examples": [
            "Proceed with caution.",
            "Warning caution sign.",
            "Exercise caution here."
         ]
      },
      {
         "id": 18,
         "word": "cautious",
         "role": "adjective",
         "BrE": "/ˈkɔːʃəs/",
         "AmE": "/ˈkɔːʃəs/",
         "definition": "careful to avoid risks",
         "examples": [
            "Be cautious driving.",
            "Cautious approach taken.",
            "Cautious investor."
         ]
      },
      {
         "id": 18,
         "word": "cease",
         "role": "verb",
         "BrE": "/siːs/",
         "AmE": "/siːs/",
         "definition": "to stop",
         "examples": [
            "Cease fire now.",
            "Operations cease at night.",
            "Cease and desist."
         ]
      },
      {
         "id": 18,
         "word": "cemetery",
         "role": "noun",
         "BrE": "/ˈsemətri/",
         "AmE": "/ˈseməteri/",
         "definition": "a place for burying the dead",
         "examples": [
            "Visit the cemetery.",
            "Old cemetery graves.",
            "Cemetery is peaceful."
         ]
      },
      {
         "id": 18,
         "word": "chamber",
         "role": "noun",
         "BrE": "/ˈtʃeɪmbə(r)/",
         "AmE": "/ˈtʃeɪmbər/",
         "definition": "a room or enclosed space",
         "examples": [
            "Court chamber session.",
            "Gas chamber danger.",
            "Legislative chamber."
         ]
      },
      {
         "id": 18,
         "word": "chaos",
         "role": "noun",
         "BrE": "/ˈkeɪɒs/",
         "AmE": "/ˈkeɪɑːs/",
         "definition": "complete disorder",
         "examples": [
            "Traffic chaos in city.",
            "Cause chaos at home.",
            "Order from chaos."
         ]
      },
      {
         "id": 18,
         "word": "characterize",
         "role": "verb",
         "BrE": "/ˈkærəktəraɪz/",
         "AmE": "/ˈkerəktəraɪz/",
         "definition": "to describe the qualities",
         "examples": [
            "Characterize the person.",
            "Events characterize the era.",
            "Well characterized in book."
         ]
      },
      {
         "id": 18,
         "word": "charm",
         "role": "noun",
         "BrE": "/tʃɑːm/",
         "AmE": "/tʃɑːrm/",
         "definition": "attractive quality",
         "examples": [
            "Full of charm.",
            "Lucky charm carried.",
            "Charm the audience."
         ]
      },
      {
         "id": 19,
         "word": "charter",
         "role": "noun",
         "BrE": "/ˈtʃɑːtə(r)/",
         "AmE": "/ˈtʃɑːrtər/",
         "definition": "a formal document of rights",
         "examples": [
            "Sign the charter.",
            "Charter flight booked.",
            "Company charter rules."
         ]
      },
      {
         "id": 19,
         "word": "chronic",
         "role": "adjective",
         "BrE": "/ˈkrɒnɪk/",
         "AmE": "/ˈkrɑːnɪk/",
         "definition": "lasting a long time",
         "examples": [
            "Chronic pain suffers.",
            "Chronic illness treated.",
            "Chronic shortage."
         ]
      },
      {
         "id": 19,
         "word": "chunk",
         "role": "noun",
         "BrE": "/tʃʌŋk/",
         "AmE": "/tʃʌŋk/",
         "definition": "a thick piece",
         "examples": [
            "Chunk of cheese.",
            "Large chunk of time.",
            "Break into chunks."
         ]
      },
      {
         "id": 19,
         "word": "circulate",
         "role": "verb",
         "BrE": "/ˈsɜːkjəleɪt/",
         "AmE": "/ˈsɝːkjəleɪt/",
         "definition": "to move around",
         "examples": [
            "Blood circulates in body.",
            "Circulate the memo.",
            "Rumors circulate fast."
         ]
      },
      {
         "id": 19,
         "word": "circulation",
         "role": "noun",
         "BrE": "/ˌsɜːkjəˈleɪʃn/",
         "AmE": "/ˌsɝːkjəˈleɪʃn/",
         "definition": "movement in a system",
         "examples": [
            "Improve blood circulation.",
            "Newspaper circulation high.",
            "Out of circulation."
         ]
      },
      {
         "id": 19,
         "word": "citizenship",
         "role": "noun",
         "BrE": "/ˈsɪtɪzənʃɪp/",
         "AmE": "/ˈsɪtɪzənʃɪp/",
         "definition": "being a member of a country",
         "examples": [
            "Apply for citizenship.",
            "Dual citizenship allowed.",
            "Citizenship rights protected."
         ]
      },
      {
         "id": 19,
         "word": "civic",
         "role": "adjective",
         "BrE": "/ˈsɪvɪk/",
         "AmE": "/ˈsɪvɪk/",
         "definition": "related to city or citizens",
         "examples": [
            "Civic duty to vote.",
            "Civic center building.",
            "Civic pride shown."
         ]
      },
      {
         "id": 19,
         "word": "civilian",
         "role": "noun, adjective",
         "BrE": "/sɪˈvɪliən/",
         "AmE": "/sɪˈvɪliən/",
         "definition": "not military",
         "examples": [
            "Protect civilians in war.",
            "Civilian clothes worn.",
            "Civilian life after army."
         ]
      },
      {
         "id": 19,
         "word": "clarity",
         "role": "noun",
         "BrE": "/ˈklærəti/",
         "AmE": "/ˈklærəti/",
         "definition": "clearness",
         "examples": [
            "Speak with clarity.",
            "Clarity of thought.",
            "Image clarity high."
         ]
      },
      {
         "id": 19,
         "word": "clash",
         "role": "noun",
         "BrE": "/klæʃ/",
         "AmE": "/klæʃ/",
         "definition": "a fight or disagreement",
         "examples": [
            "Color clash in outfit.",
            "Clash of opinions.",
            "Teams clash in game."
         ]
      },
      {
         "id": 20,
         "word": "classification",
         "role": "noun",
         "BrE": "/ˌklæsɪfɪˈkeɪʃn/",
         "AmE": "/ˌklæsɪfɪˈkeɪʃn/",
         "definition": "putting into groups",
         "examples": [
            "Animal classification system.",
            "Security classification level.",
            "Job classification."
         ]
      },
      {
         "id": 20,
         "word": "cling",
         "role": "verb",
         "BrE": "/klɪŋ/",
         "AmE": "/klɪŋ/",
         "definition": "to hold tightly",
         "examples": [
            "Cling to the rope.",
            "Cling to hope.",
            "Clothes cling when wet."
         ]
      },
      {
         "id": 20,
         "word": "clinical",
         "role": "adjective",
         "BrE": "/ˈklɪnɪkl/",
         "AmE": "/ˈklɪnɪkl/",
         "definition": "related to medical treatment",
         "examples": [
            "Clinical trials test drugs.",
            "Clinical depression diagnosed.",
            "Clinical manner cold."
         ]
      },
      {
         "id": 20,
         "word": "closure",
         "role": "noun",
         "BrE": "/ˈkləʊʒə(r)/",
         "AmE": "/ˈkloʊʒər/",
         "definition": "the end or closing",
         "examples": [
            "Seek closure after loss.",
            "Road closure for repairs.",
            "Business closure announced."
         ]
      },
      {
         "id": 20,
         "word": "cluster",
         "role": "noun",
         "BrE": "/ˈklʌstə(r)/",
         "AmE": "/ˈklʌstər/",
         "definition": "a group close together",
         "examples": [
            "Star cluster in sky.",
            "Cluster of houses.",
            "Cluster headaches painful."
         ]
      },
      {
         "id": 20,
         "word": "coalition",
         "role": "noun",
         "BrE": "/ˌkəʊəˈlɪʃn/",
         "AmE": "/ˌkoʊəˈlɪʃn/",
         "definition": "an alliance for a purpose",
         "examples": [
            "Form a coalition government.",
            "Coalition of groups.",
            "International coalition fights."
         ]
      },
      {
         "id": 20,
         "word": "coastal",
         "role": "adjective",
         "BrE": "/ˈkəʊstl/",
         "AmE": "/ˈkoʊstl/",
         "definition": "related to the coast",
         "examples": [
            "Coastal towns visited.",
            "Coastal erosion problem.",
            "Coastal path walking."
         ]
      },
      {
         "id": 20,
         "word": "cocktail",
         "role": "noun",
         "BrE": "/ˈkɒkteɪl/",
         "AmE": "/ˈkɑːkteɪl/",
         "definition": "a mixed drink",
         "examples": [
            "Order a cocktail.",
            "Cocktail party hosted.",
            "Fruit cocktail served."
         ]
      },
      {
         "id": 20,
         "word": "cognitive",
         "role": "adjective",
         "BrE": "/ˈkɒɡnətɪv/",
         "AmE": "/ˈkɑːɡnətɪv/",
         "definition": "related to thinking",
         "examples": [
            "Cognitive skills developed.",
            "Cognitive therapy helps.",
            "Cognitive process studied."
         ]
      },
      {
         "id": 20,
         "word": "coincide",
         "role": "verb",
         "BrE": "/ˌkəʊɪnˈsaɪd/",
         "AmE": "/ˌkoʊɪnˈsaɪd/",
         "definition": "to happen at the same time",
         "examples": [
            "Events coincide often.",
            "Opinions coincide with mine.",
            "Dates coincide perfectly."
         ]
      },
      {
         "id": 21,
         "word": "collaborate",
         "role": "verb",
         "BrE": "/kəˈlæbəreɪt/",
         "AmE": "/kəˈlæbəreɪt/",
         "definition": "to work together",
         "examples": [
            "Collaborate on the project.",
            "Artists collaborate often.",
            "Teams collaborate remotely."
         ]
      },
      {
         "id": 21,
         "word": "collaboration",
         "role": "noun",
         "BrE": "/kəˌlæbəˈreɪʃn/",
         "AmE": "/kəˌlæbəˈreɪʃn/",
         "definition": "working with others",
         "examples": [
            "Successful collaboration yields results.",
            "International collaboration needed.",
            "Art collaboration exhibited."
         ]
      },
      {
         "id": 21,
         "word": "collective",
         "role": "adjective",
         "BrE": "/kəˈlektɪv/",
         "AmE": "/kəˈlektɪv/",
         "definition": "done by a group",
         "examples": [
            "Collective effort wins.",
            "Collective memory shared.",
            "Collective bargaining agreement."
         ]
      },
      {
         "id": 21,
         "word": "collision",
         "role": "noun",
         "BrE": "/kəˈlɪʒn/",
         "AmE": "/kəˈlɪʒn/",
         "definition": "when things crash together",
         "examples": [
            "Car collision happened.",
            "Avoid collision carefully.",
            "Ideas in collision."
         ]
      },
      {
         "id": 21,
         "word": "colonial",
         "role": "adjective",
         "BrE": "/kəˈləʊniəl/",
         "AmE": "/kəˈloʊniəl/",
         "definition": "related to colonies",
         "examples": [
            "Colonial history studied.",
            "Colonial architecture preserved.",
            "Colonial rule ended."
         ]
      },
      {
         "id": 21,
         "word": "columnist",
         "role": "noun",
         "BrE": "/ˈkɒləmnɪst/",
         "AmE": "/ˈkɑːləmnɪst/",
         "definition": "a writer of newspaper columns",
         "examples": [
            "Famous columnist writes.",
            "Read the columnist's opinion.",
            "Columnist critiques politics."
         ]
      },
      {
         "id": 21,
         "word": "combat",
         "role": "noun, verb",
         "BrE": "/ˈkɒmbæt/",
         "AmE": "/ˈkɑːmbæt/",
         "definition": "fighting or to fight",
         "examples": [
            "Combat training essential.",
            "Combat poverty effectively.",
            "In combat situations."
         ]
      },
      {
         "id": 21,
         "word": "commence",
         "role": "verb",
         "BrE": "/kəˈmens/",
         "AmE": "/kəˈmens/",
         "definition": "to begin",
         "examples": [
            "Commence the meeting.",
            "Work commences soon.",
            "Ceremony commences at noon."
         ]
      },
      {
         "id": 21,
         "word": "commentary",
         "role": "noun",
         "BrE": "/ˈkɒməntri/",
         "AmE": "/ˈkɑːmənteri/",
         "definition": "description of an event",
         "examples": [
            "Sports commentary live.",
            "Political commentary insightful.",
            "DVD commentary extra."
         ]
      },
      {
         "id": 21,
         "word": "commentator",
         "role": "noun",
         "BrE": "/ˈkɒmənteɪtə(r)/",
         "AmE": "/ˈkɑːmənteɪtər/",
         "definition": "a person who describes events",
         "examples": [
            "TV commentator speaks.",
            "Expert commentator analyzes.",
            "News commentator reports."
         ]
      },
      {
         "id": 22,
         "word": "commerce",
         "role": "noun",
         "BrE": "/ˈkɒmɜːs/",
         "AmE": "/ˈkɑːmɝːs/",
         "definition": "buying and selling",
         "examples": [
            "E-commerce grows.",
            "Chamber of commerce.",
            "International commerce thrives."
         ]
      },
      {
         "id": 22,
         "word": "commissioner",
         "role": "noun",
         "BrE": "/kəˈmɪʃənə(r)/",
         "AmE": "/kəˈmɪʃənər/",
         "definition": "an official in charge",
         "examples": [
            "Police commissioner leads.",
            "Appoint a commissioner.",
            "Commissioner decides policy."
         ]
      },
      {
         "id": 22,
         "word": "commodity",
         "role": "noun",
         "BrE": "/kəˈmɒdəti/",
         "AmE": "/kəˈmɑːdəti/",
         "definition": "a product traded",
         "examples": [
            "Oil is a commodity.",
            "Commodity prices fluctuate.",
            "Trade commodities globally."
         ]
      },
      {
         "id": 22,
         "word": "communist",
         "role": "adjective",
         "BrE": "/ˈkɒmjənɪst/",
         "AmE": "/ˈkɑːmjənɪst/",
         "definition": "related to communism",
         "examples": [
            "Communist party rules.",
            "Communist ideology spreads.",
            "Former communist countries."
         ]
      },
      {
         "id": 22,
         "word": "companion",
         "role": "noun",
         "BrE": "/kəmˈpæniən/",
         "AmE": "/kəmˈpæniən/",
         "definition": "a friend or partner",
         "examples": [
            "Travel companion joins.",
            "Dog is a companion.",
            "Companion book available."
         ]
      },
      {
         "id": 22,
         "word": "comparable",
         "role": "adjective",
         "BrE": "/ˈkɒmpərəbl/",
         "AmE": "/ˈkɑːmpərəbl/",
         "definition": "similar enough to compare",
         "examples": [
            "Prices are comparable.",
            "Comparable quality goods.",
            "Not comparable situations."
         ]
      },
      {
         "id": 22,
         "word": "compassion",
         "role": "noun",
         "BrE": "/kəmˈpæʃn/",
         "AmE": "/kəmˈpæʃn/",
         "definition": "sympathy for suffering",
         "examples": [
            "Show compassion to others.",
            "Compassion drives charity.",
            "Lack of compassion hurts."
         ]
      },
      {
         "id": 22,
         "word": "compel",
         "role": "verb",
         "BrE": "/kəmˈpel/",
         "AmE": "/kəmˈpel/",
         "definition": "to force someone",
         "examples": [
            "Compel him to leave.",
            "Evidence compels belief.",
            "Feel compelled to help."
         ]
      },
      {
         "id": 22,
         "word": "compelling",
         "role": "adjective",
         "BrE": "/kəmˈpelɪŋ/",
         "AmE": "/kəmˈpelɪŋ/",
         "definition": "very interesting or convincing",
         "examples": [
            "Compelling story told.",
            "Compelling argument made.",
            "Compelling evidence presented."
         ]
      },
      {
         "id": 22,
         "word": "compensate",
         "role": "verb",
         "BrE": "/ˈkɒmpenseɪt/",
         "AmE": "/ˈkɑːmpenseɪt/",
         "definition": "to pay for loss",
         "examples": [
            "Compensate for damages.",
            "Compensate employees well.",
            "Compensate for weaknesses."
         ]
      },
      {
         "id": 23,
         "word": "compensation",
         "role": "noun",
         "BrE": "/ˌkɒmpenˈseɪʃn/",
         "AmE": "/ˌkɑːmpenˈseɪʃn/",
         "definition": "payment for loss",
         "examples": [
            "Seek compensation.",
            "Workers' compensation insurance.",
            "Fair compensation given."
         ]
      },
      {
         "id": 23,
         "word": "competence",
         "role": "noun",
         "BrE": "/ˈkɒmpɪtəns/",
         "AmE": "/ˈkɑːmpɪtəns/",
         "definition": "ability to do something well",
         "examples": [
            "Demonstrate competence.",
            "Build competence through practice.",
            "Question his competence."
         ]
      },
      {
         "id": 23,
         "word": "competent",
         "role": "adjective",
         "BrE": "/ˈkɒmpɪtənt/",
         "AmE": "/ˈkɑːmpɪtənt/",
         "definition": "having enough skill",
         "examples": [
            "Competent worker hired.",
            "Feel competent in role.",
            "Competent authority decides."
         ]
      },
      {
         "id": 23,
         "word": "compile",
         "role": "verb",
         "BrE": "/kəmˈpaɪl/",
         "AmE": "/kəmˈpaɪl/",
         "definition": "to collect information",
         "examples": [
            "Compile a list.",
            "Compile data reports.",
            "Compile code software."
         ]
      },
      {
         "id": 23,
         "word": "complement",
         "role": "verb",
         "BrE": "/ˈkɒmplɪment/",
         "AmE": "/ˈkɑːmplɪment/",
         "definition": "to go well with",
         "examples": [
            "Colors complement each other.",
            "Wine complements the meal.",
            "Skills complement team."
         ]
      },
      {
         "id": 23,
         "word": "complexity",
         "role": "noun",
         "BrE": "/kəmˈpleksəti/",
         "AmE": "/kəmˈpleksəti/",
         "definition": "being complicated",
         "examples": [
            "Understand the complexity.",
            "Increase in complexity.",
            "Reduce complexity simply."
         ]
      },
      {
         "id": 23,
         "word": "compliance",
         "role": "noun",
         "BrE": "/kəmˈplaɪəns/",
         "AmE": "/kəmˈplaɪəns/",
         "definition": "following rules",
         "examples": [
            "Ensure compliance with laws.",
            "Compliance officer checks.",
            "In compliance mode."
         ]
      },
      {
         "id": 23,
         "word": "complication",
         "role": "noun",
         "BrE": "/ˌkɒmplɪˈkeɪʃn/",
         "AmE": "/ˌkɑːmplɪˈkeɪʃn/",
         "definition": "something making it harder",
         "examples": [
            "Medical complication arose.",
            "Avoid further complications.",
            "Plan without complications."
         ]
      },
      {
         "id": 23,
         "word": "comply",
         "role": "verb",
         "BrE": "/kəmˈplaɪ/",
         "AmE": "/kəmˈplaɪ/",
         "definition": "to obey a rule",
         "examples": [
            "Comply with regulations.",
            "Must comply immediately.",
            "Refuse to comply."
         ]
      },
      {
         "id": 23,
         "word": "composition",
         "role": "noun",
         "BrE": "/ˌkɒmpəˈzɪʃn/",
         "AmE": "/ˌkɑːmpəˈzɪʃn/",
         "definition": "what something is made of",
         "examples": [
            "Chemical composition analyzed.",
            "Music composition created.",
            "Essay composition written."
         ]
      },
      {
         "id": 24,
         "word": "compromise",
         "role": "noun, verb",
         "BrE": "/ˈkɒmprəmaɪz/",
         "AmE": "/ˈkɑːmprəmaɪz/",
         "definition": "agreement where both give in",
         "examples": [
            "Reach a compromise.",
            "Compromise on price.",
            "Don't compromise safety."
         ]
      },
      {
         "id": 24,
         "word": "compute",
         "role": "verb",
         "BrE": "/kəmˈpjuːt/",
         "AmE": "/kəmˈpjuːt/",
         "definition": "to calculate",
         "examples": [
            "Compute the total.",
            "Computers compute fast.",
            "Compute values accurately."
         ]
      },
      {
         "id": 24,
         "word": "conceal",
         "role": "verb",
         "BrE": "/kənˈsiːl/",
         "AmE": "/kənˈsiːl/",
         "definition": "to hide something",
         "examples": [
            "Conceal the gift.",
            "Conceal emotions well.",
            "Conceal weapons illegal."
         ]
      },
      {
         "id": 24,
         "word": "concede",
         "role": "verb",
         "BrE": "/kənˈsiːd/",
         "AmE": "/kənˈsiːd/",
         "definition": "to admit defeat",
         "examples": [
            "Concede the point.",
            "Concede in election.",
            "Reluctantly concede truth."
         ]
      },
      {
         "id": 24,
         "word": "conceive",
         "role": "verb",
         "BrE": "/kənˈsiːv/",
         "AmE": "/kənˈsiːv/",
         "definition": "to imagine or become pregnant",
         "examples": [
            "Conceive a plan.",
            "Hard to conceive.",
            "Conceive a child."
         ]
      },
      {
         "id": 24,
         "word": "conception",
         "role": "noun",
         "BrE": "/kənˈsepʃn/",
         "AmE": "/kənˈsepʃn/",
         "definition": "an idea or beginning of pregnancy",
         "examples": [
            "Misconception corrected.",
            "From conception to birth.",
            "New conception formed."
         ]
      },
      {
         "id": 24,
         "word": "concession",
         "role": "noun",
         "BrE": "/kənˈseʃn/",
         "AmE": "/kənˈseʃn/",
         "definition": "something allowed or given up",
         "examples": [
            "Make a concession.",
            "Price concession offered.",
            "Concession stand sells."
         ]
      },
      {
         "id": 24,
         "word": "condemn",
         "role": "verb",
         "BrE": "/kənˈdem/",
         "AmE": "/kənˈdem/",
         "definition": "to strongly disapprove",
         "examples": [
            "Condemn the violence.",
            "Condemn to death.",
            "Public condemns actions."
         ]
      },
      {
         "id": 24,
         "word": "confer",
         "role": "verb",
         "BrE": "/kənˈfɜː(r)/",
         "AmE": "/kənˈfɝː/",
         "definition": "to discuss or give",
         "examples": [
            "Confer with colleagues.",
            "Confer a degree.",
            "Confer benefits."
         ]
      },
      {
         "id": 24,
         "word": "confession",
         "role": "noun",
         "BrE": "/kənˈfeʃn/",
         "AmE": "/kənˈfeʃn/",
         "definition": "admitting guilt",
         "examples": [
            "Make a confession.",
            "Confession to priest.",
            "Signed confession obtained."
         ]
      },
      {
         "id": 25,
         "word": "configuration",
         "role": "noun",
         "BrE": "/kənˌfɪɡəˈreɪʃn/",
         "AmE": "/kənˌfɪɡjəˈreɪʃn/",
         "definition": "arrangement of parts",
         "examples": [
            "Change configuration settings.",
            "System configuration checked.",
            "Star configuration observed."
         ]
      },
      {
         "id": 25,
         "word": "confine",
         "role": "verb",
         "BrE": "/kənˈfaɪn/",
         "AmE": "/kənˈfaɪn/",
         "definition": "to limit or keep in",
         "examples": [
            "Confine to room.",
            "Confine discussion to topic.",
            "Confine animals safely."
         ]
      },
      {
         "id": 25,
         "word": "confirmation",
         "role": "noun",
         "BrE": "/ˌkɒnfəˈmeɪʃn/",
         "AmE": "/ˌkɑːnfərˈmeɪʃn/",
         "definition": "proof or agreement",
         "examples": [
            "Await confirmation email.",
            "Confirmation of booking.",
            "Seek confirmation now."
         ]
      },
      {
         "id": 25,
         "word": "confront",
         "role": "verb",
         "BrE": "/kənˈfrʌnt/",
         "AmE": "/kənˈfrʌnt/",
         "definition": "to face boldly",
         "examples": [
            "Confront the problem.",
            "Confront the bully.",
            "Confront fears directly."
         ]
      },
      {
         "id": 25,
         "word": "confrontation",
         "role": "noun",
         "BrE": "/ˌkɒnfrʌnˈteɪʃn/",
         "AmE": "/ˌkɑːnfrʌnˈteɪʃn/",
         "definition": "a hostile meeting",
         "examples": [
            "Avoid confrontation.",
            "Heated confrontation occurred.",
            "Political confrontation escalates."
         ]
      },
      {
         "id": 25,
         "word": "congratulate",
         "role": "verb",
         "BrE": "/kənˈɡrætʃuleɪt/",
         "AmE": "/kənˈɡrætʃuleɪt/",
         "definition": "to praise success",
         "examples": [
            "Congratulate the winner.",
            "Congratulate on promotion.",
            "Friends congratulate couple."
         ]
      },
      {
         "id": 25,
         "word": "congregation",
         "role": "noun",
         "BrE": "/ˌkɒŋɡrɪˈɡeɪʃn/",
         "AmE": "/ˌkɑːŋɡrɪˈɡeɪʃn/",
         "definition": "a group in church",
         "examples": [
            "Address the congregation.",
            "Large congregation attends.",
            "Congregation sings hymns."
         ]
      },
      {
         "id": 25,
         "word": "congressional",
         "role": "adjective",
         "BrE": "/kənˈɡreʃənl/",
         "AmE": "/kənˈɡreʃənl/",
         "definition": "related to congress",
         "examples": [
            "Congressional hearing held.",
            "Congressional district votes.",
            "Congressional approval needed."
         ]
      },
      {
         "id": 25,
         "word": "conquer",
         "role": "verb",
         "BrE": "/ˈkɒŋkə(r)/",
         "AmE": "/ˈkɑːŋkər/",
         "definition": "to defeat or overcome",
         "examples": [
            "Conquer the mountain.",
            "Conquer fears bravely.",
            "Army conquers land."
         ]
      },
      {
         "id": 25,
         "word": "conscience",
         "role": "noun",
         "BrE": "/ˈkɒnʃəns/",
         "AmE": "/ˈkɑːnʃəns/",
         "definition": "sense of right and wrong",
         "examples": [
            "Clear conscience sleeps well.",
            "Guilty conscience bothers.",
            "Act on conscience."
         ]
      },
      {
         "id": 26,
         "word": "consciousness",
         "role": "noun",
         "BrE": "/ˈkɒnʃəsnəs/",
         "AmE": "/ˈkɑːnʃəsnəs/",
         "definition": "being aware",
         "examples": [
            "Lose consciousness suddenly.",
            "Raise consciousness about issues.",
            "Stream of consciousness."
         ]
      },
      {
         "id": 26,
         "word": "consecutive",
         "role": "adjective",
         "BrE": "/kənˈsekjətɪv/",
         "AmE": "/kənˈsekjətɪv/",
         "definition": "following one after another",
         "examples": [
            "Three consecutive wins.",
            "Consecutive days off.",
            "Consecutive numbers listed."
         ]
      },
      {
         "id": 26,
         "word": "consensus",
         "role": "noun",
         "BrE": "/kənˈsensəs/",
         "AmE": "/kənˈsensəs/",
         "definition": "general agreement",
         "examples": [
            "Reach consensus quickly.",
            "No consensus yet.",
            "Build consensus in group."
         ]
      },
      {
         "id": 26,
         "word": "consent",
         "role": "noun, verb",
         "BrE": "/kənˈsent/",
         "AmE": "/kənˈsent/",
         "definition": "permission or to agree",
         "examples": [
            "Give consent freely.",
            "Consent to treatment.",
            "Age of consent."
         ]
      },
      {
         "id": 26,
         "word": "conserve",
         "role": "verb",
         "BrE": "/kənˈsɜːv/",
         "AmE": "/kənˈsɝːv/",
         "definition": "to save or protect",
         "examples": [
            "Conserve energy daily.",
            "Conserve water wisely.",
            "Conserve wildlife habitats."
         ]
      },
      {
         "id": 26,
         "word": "consistency",
         "role": "noun",
         "BrE": "/kənˈsɪstənsi/",
         "AmE": "/kənˈsɪstənsi/",
         "definition": "being the same throughout",
         "examples": [
            "Maintain consistency.",
            "Dough consistency checked.",
            "Consistency in performance."
         ]
      },
      {
         "id": 26,
         "word": "consolidate",
         "role": "verb",
         "BrE": "/kənˈsɒlɪdeɪt/",
         "AmE": "/kənˈsɑːlɪdeɪt/",
         "definition": "to combine or strengthen",
         "examples": [
            "Consolidate debts.",
            "Consolidate power.",
            "Consolidate files."
         ]
      },
      {
         "id": 26,
         "word": "constituency",
         "role": "noun",
         "BrE": "/kənˈstɪtʃuənsi/",
         "AmE": "/kənˈstɪtʃuənsi/",
         "definition": "group of voters",
         "examples": [
            "Represent constituency well.",
            "Win in constituency.",
            "Constituency demands change."
         ]
      },
      {
         "id": 26,
         "word": "constitute",
         "role": "verb",
         "BrE": "/ˈkɒnstɪtjuːt/",
         "AmE": "/ˈkɑːnstɪtuːt/",
         "definition": "to form or be",
         "examples": [
            "Constitute a team.",
            "Actions constitute crime.",
            "Parts constitute whole."
         ]
      },
      {
         "id": 26,
         "word": "constitution",
         "role": "noun",
         "BrE": "/ˌkɒnstɪˈtjuːʃn/",
         "AmE": "/ˌkɑːnstɪˈtuːʃn/",
         "definition": "basic laws of a country",
         "examples": [
            "Amend the constitution.",
            "Strong constitution health.",
            "Constitution protects rights."
         ]
      },
      {
         "id": 27,
         "word": "constitutional",
         "role": "adjective",
         "BrE": "/ˌkɒnstɪˈtjuːʃənl/",
         "AmE": "/ˌkɑːnstɪˈtuːʃənl/",
         "definition": "related to constitution",
         "examples": [
            "Constitutional rights defended.",
            "Constitutional crisis averted.",
            "Take constitutional walk."
         ]
      },
      {
         "id": 27,
         "word": "constraint",
         "role": "noun",
         "BrE": "/kənˈstreɪnt/",
         "AmE": "/kənˈstreɪnt/",
         "definition": "a limit or restriction",
         "examples": [
            "Budget constraint limits.",
            "Time constraint pressures.",
            "Work without constraints."
         ]
      },
      {
         "id": 27,
         "word": "consultation",
         "role": "noun",
         "BrE": "/ˌkɒnslˈteɪʃn/",
         "AmE": "/ˌkɑːnslˈteɪʃn/",
         "definition": "meeting for advice",
         "examples": [
            "Doctor consultation scheduled.",
            "Public consultation held.",
            "Free consultation offered."
         ]
      },
      {
         "id": 27,
         "word": "contemplate",
         "role": "verb",
         "BrE": "/ˈkɒntəmpleɪt/",
         "AmE": "/ˈkɑːntəmpleɪt/",
         "definition": "to think deeply",
         "examples": [
            "Contemplate the future.",
            "Contemplate moving house.",
            "Contemplate nature quietly."
         ]
      },
      {
         "id": 27,
         "word": "contempt",
         "role": "noun",
         "BrE": "/kənˈtempt/",
         "AmE": "/kənˈtempt/",
         "definition": "lack of respect",
         "examples": [
            "Show contempt openly.",
            "Contempt of court.",
            "Feel contempt for liars."
         ]
      },
      {
         "id": 27,
         "word": "contend",
         "role": "verb",
         "BrE": "/kənˈtend/",
         "AmE": "/kənˈtend/",
         "definition": "to argue or compete",
         "examples": [
            "Contend for title.",
            "Contend with problems.",
            "Experts contend otherwise."
         ]
      },
      {
         "id": 27,
         "word": "contender",
         "role": "noun",
         "BrE": "/kənˈtendə(r)/",
         "AmE": "/kənˈtendər/",
         "definition": "a competitor",
         "examples": [
            "Strong contender wins.",
            "Title contender trains.",
            "New contender emerges."
         ]
      },
      {
         "id": 27,
         "word": "content2",
         "role": "adjective",
         "BrE": "/kənˈtent/",
         "AmE": "/kənˈtent/",
         "definition": "happy and satisfied",
         "examples": [
            "Feel content now.",
            "Content with life.",
            "Live content simply."
         ]
      },
      {
         "id": 27,
         "word": "contention",
         "role": "noun",
         "BrE": "/kənˈtenʃn/",
         "AmE": "/kənˈtenʃn/",
         "definition": "disagreement or claim",
         "examples": [
            "Bone of contention.",
            "Contention causes debate.",
            "Main contention argued."
         ]
      },
      {
         "id": 27,
         "word": "continually",
         "role": "adverb",
         "BrE": "/kənˈtɪnjəli/",
         "AmE": "/kənˈtɪnjəli/",
         "definition": "repeatedly or without stop",
         "examples": [
            "Improve continually.",
            "Rains continually today.",
            "Check continually."
         ]
      },
      {
         "id": 28,
         "word": "contractor",
         "role": "noun",
         "BrE": "/kənˈtræktə(r)/",
         "AmE": "/ˈkɑːntræktər/",
         "definition": "person who does work under contract",
         "examples": [
            "Hire a contractor.",
            "Building contractor works.",
            "Independent contractor freelances."
         ]
      },
      {
         "id": 28,
         "word": "contradiction",
         "role": "noun",
         "BrE": "/ˌkɒntrəˈdɪkʃn/",
         "AmE": "/ˌkɑːntrəˈdɪkʃn/",
         "definition": "statement opposing another",
         "examples": [
            "Full of contradiction.",
            "Contradiction in terms.",
            "Spot the contradiction."
         ]
      },
      {
         "id": 28,
         "word": "contrary",
         "role": "adjective, noun",
         "BrE": "/ˈkɒntrəri/",
         "AmE": "/ˈkɑːntreri/",
         "definition": "opposite",
         "examples": [
            "On the contrary.",
            "Contrary to belief.",
            "Contrary winds blow."
         ]
      },
      {
         "id": 28,
         "word": "contributor",
         "role": "noun",
         "BrE": "/kənˈtrɪbjətə(r)/",
         "AmE": "/kənˈtrɪbjətər/",
         "definition": "someone who gives something",
         "examples": [
            "Major contributor donates.",
            "Article contributor writes.",
            "Key contributor succeeds."
         ]
      },
      {
         "id": 28,
         "word": "conversion",
         "role": "noun",
         "BrE": "/kənˈvɜːʃn/",
         "AmE": "/kənˈvɝːʒn/",
         "definition": "changing from one form to another",
         "examples": [
            "Currency conversion rate.",
            "Goal conversion scored.",
            "Building conversion completed."
         ]
      },
      {
         "id": 28,
         "word": "convict",
         "role": "verb",
         "BrE": "/kənˈvɪkt/",
         "AmE": "/kənˈvɪkt/",
         "definition": "to find guilty",
         "examples": [
            "Convict the criminal.",
            "Jury convicts defendant.",
            "Convict of crime."
         ]
      },
      {
         "id": 28,
         "word": "conviction",
         "role": "noun",
         "BrE": "/kənˈvɪkʃn/",
         "AmE": "/kənˈvɪkʃn/",
         "definition": "strong belief or guilty verdict",
         "examples": [
            "Speak with conviction.",
            "Criminal conviction recorded.",
            "Personal conviction guides."
         ]
      },
      {
         "id": 28,
         "word": "cooperate",
         "role": "verb",
         "BrE": "/kəʊˈɒpəreɪt/",
         "AmE": "/koʊˈɑːpəreɪt/",
         "definition": "to work together",
         "examples": [
            "Cooperate with police.",
            "Teams cooperate well.",
            "Refuse to cooperate."
         ]
      },
      {
         "id": 28,
         "word": "cooperative",
         "role": "adjective",
         "BrE": "/kəʊˈɒpərətɪv/",
         "AmE": "/koʊˈɑːpərətɪv/",
         "definition": "willing to help",
         "examples": [
            "Be cooperative please.",
            "Cooperative effort succeeds.",
            "Cooperative store owned."
         ]
      },
      {
         "id": 28,
         "word": "coordinate",
         "role": "verb",
         "BrE": "/kəʊˈɔːdɪneɪt/",
         "AmE": "/koʊˈɔːrdɪneɪt/",
         "definition": "to organize parts",
         "examples": [
            "Coordinate the event.",
            "Coordinate outfits match.",
            "Coordinate actions now."
         ]
      },
      {
         "id": 29,
         "word": "coordination",
         "role": "noun",
         "BrE": "/kəʊˌɔːdɪˈneɪʃn/",
         "AmE": "/koʊˌɔːrdɪˈneɪʃn/",
         "definition": "organizing to work together",
         "examples": [
            "Good coordination required.",
            "Hand-eye coordination tested.",
            "Improve coordination skills."
         ]
      },
      {
         "id": 29,
         "word": "coordinator",
         "role": "noun",
         "BrE": "/kəʊˈɔːdɪneɪtə(r)/",
         "AmE": "/koʊˈɔːrdɪneɪtər/",
         "definition": "person who organizes",
         "examples": [
            "Event coordinator plans.",
            "Project coordinator leads.",
            "Appoint a coordinator."
         ]
      },
      {
         "id": 29,
         "word": "cop",
         "role": "noun",
         "BrE": "/kɒp/",
         "AmE": "/kɑːp/",
         "definition": "a police officer",
         "examples": [
            "Call the cop.",
            "Cop patrols street.",
            "Traffic cop directs."
         ]
      },
      {
         "id": 29,
         "word": "copper",
         "role": "noun",
         "BrE": "/ˈkɒpə(r)/",
         "AmE": "/ˈkɑːpər/",
         "definition": "a reddish metal",
         "examples": [
            "Copper wire used.",
            "Copper coins collected.",
            "Copper pipe installed."
         ]
      },
      {
         "id": 29,
         "word": "copyright",
         "role": "noun",
         "BrE": "/ˈkɒpiraɪt/",
         "AmE": "/ˈkɑːpiraɪt/",
         "definition": "legal right to control work",
         "examples": [
            "Copyright protected.",
            "Violate copyright laws.",
            "Hold copyright ownership."
         ]
      },
      {
         "id": 29,
         "word": "correction",
         "role": "noun",
         "BrE": "/kəˈrekʃn/",
         "AmE": "/kəˈrekʃn/",
         "definition": "fixing an error",
         "examples": [
            "Make a correction.",
            "Market correction happens.",
            "Error correction needed."
         ]
      },
      {
         "id": 29,
         "word": "correlate",
         "role": "verb",
         "BrE": "/ˈkɒrəleɪt/",
         "AmE": "/ˈkɔːrəleɪt/",
         "definition": "to have a connection",
         "examples": [
            "Variables correlate strongly.",
            "Correlate data points.",
            "Factors correlate with success."
         ]
      },
      {
         "id": 29,
         "word": "correlation",
         "role": "noun",
         "BrE": "/ˌkɒrəˈleɪʃn/",
         "AmE": "/ˌkɔːrəˈleɪʃn/",
         "definition": "a mutual relationship",
         "examples": [
            "Positive correlation found.",
            "Study the correlation.",
            "No correlation exists."
         ]
      },
      {
         "id": 29,
         "word": "correspond",
         "role": "verb",
         "BrE": "/ˌkɒrɪˈspɒnd/",
         "AmE": "/ˌkɔːrɪˈspɑːnd/",
         "definition": "to match or write letters",
         "examples": [
            "Sizes correspond well.",
            "Correspond by email.",
            "Facts correspond to story."
         ]
      },
      {
         "id": 29,
         "word": "correspondence",
         "role": "noun",
         "BrE": "/ˌkɒrɪˈspɒndəns/",
         "AmE": "/ˌkɔːrɪˈspɑːndəns/",
         "definition": "letters or similarity",
         "examples": [
            "Business correspondence handled.",
            "Close correspondence between.",
            "Keep correspondence records."
         ]
      },
      {
         "id": 30,
         "word": "correspondent",
         "role": "noun",
         "BrE": "/ˌkɒrɪˈspɒndənt/",
         "AmE": "/ˌkɔːrɪˈspɑːndənt/",
         "definition": "a reporter",
         "examples": [
            "Foreign correspondent reports.",
            "News correspondent interviews.",
            "Special correspondent covers."
         ]
      },
      {
         "id": 30,
         "word": "corresponding",
         "role": "adjective",
         "BrE": "/ˌkɒrɪˈspɒndɪŋ/",
         "AmE": "/ˌkɔːrɪˈspɑːndɪŋ/",
         "definition": "matching or related",
         "examples": [
            "Corresponding figures match.",
            "Corresponding period last year.",
            "Corresponding parts fit."
         ]
      },
      {
         "id": 30,
         "word": "corrupt",
         "role": "adjective",
         "BrE": "/kəˈrʌpt/",
         "AmE": "/kəˈrʌpt/",
         "definition": "dishonest or damaged",
         "examples": [
            "Corrupt officials arrested.",
            "File is corrupt.",
            "Corrupt system reformed."
         ]
      },
      {
         "id": 30,
         "word": "corruption",
         "role": "noun",
         "BrE": "/kəˈrʌpʃn/",
         "AmE": "/kəˈrʌpʃn/",
         "definition": "dishonest behavior",
         "examples": [
            "Fight corruption hard.",
            "Political corruption exposed.",
            "Data corruption fixed."
         ]
      },
      {
         "id": 30,
         "word": "costly",
         "role": "adjective",
         "BrE": "/ˈkɒstli/",
         "AmE": "/ˈkɔːstli/",
         "definition": "expensive or causing problems",
         "examples": [
            "Costly mistake made.",
            "Costly repairs needed.",
            "Costly jewelry bought."
         ]
      },
      {
         "id": 30,
         "word": "councillor",
         "role": "noun",
         "BrE": "/ˈkaʊnsələ(r)/",
         "AmE": "/ˈkaʊnsələr/",
         "definition": "a member of a council",
         "examples": [
            "Local councillor elected.",
            "Councillor represents area.",
            "Meet the councillor."
         ]
      },
      {
         "id": 30,
         "word": "counselling",
         "role": "noun",
         "BrE": "/ˈkaʊnsəlɪŋ/",
         "AmE": "/ˈkaʊnsəlɪŋ/",
         "definition": "advice for problems",
         "examples": [
            "Seek counselling help.",
            "Marriage counselling works.",
            "Career counselling offered."
         ]
      },
      {
         "id": 30,
         "word": "counsellor",
         "role": "noun",
         "BrE": "/ˈkaʊnsələ(r)/",
         "AmE": "/ˈkaʊnsələr/",
         "definition": "a person who gives advice",
         "examples": [
            "Talk to counsellor.",
            "School counsellor helps.",
            "Legal counsellor advises."
         ]
      },
      {
         "id": 30,
         "word": "counter",
         "role": "verb",
         "BrE": "/ˈkaʊntə(r)/",
         "AmE": "/ˈkaʊntər/",
         "definition": "to oppose or respond",
         "examples": [
            "Counter the attack.",
            "Counter with argument.",
            "Kitchen counter cleaned."
         ]
      },
      {
         "id": 30,
         "word": "counterpart",
         "role": "noun",
         "BrE": "/ˈkaʊntəpɑːt/",
         "AmE": "/ˈkaʊntərpɑːrt/",
         "definition": "person with similar role",
         "examples": [
            "Meet foreign counterpart.",
            "Male counterpart exists.",
            "Counterpart in company."
         ]
      },
      {
         "id": 31,
         "word": "countless",
         "role": "adjective",
         "BrE": "/ˈkaʊntləs/",
         "AmE": "/ˈkaʊntləs/",
         "definition": "too many to count",
         "examples": [
            "Countless stars in the sky.",
            "He has countless friends.",
            "Countless hours spent studying."
         ]
      },
      {
         "id": 31,
         "word": "coup",
         "role": "noun",
         "BrE": "/kuː/",
         "AmE": "/kuː/",
         "definition": "a sudden takeover of power",
         "examples": [
            "Military coup overthrew government.",
            "The coup failed quickly.",
            "Plan a coup secretly."
         ]
      },
      {
         "id": 31,
         "word": "courtesy",
         "role": "noun",
         "BrE": "/ˈkɜːtəsi/",
         "AmE": "/ˈkɝːtəsi/",
         "definition": "polite behavior",
         "examples": [
            "Show courtesy to others.",
            "Courtesy call made.",
            "Free courtesy bus."
         ]
      },
      {
         "id": 31,
         "word": "craft",
         "role": "verb",
         "BrE": "/krɑːft/",
         "AmE": "/kræft/",
         "definition": "to make skillfully",
         "examples": [
            "Craft a wooden toy.",
            "Craft a story carefully.",
            "Craft beer brewed."
         ]
      },
      {
         "id": 31,
         "word": "crawl",
         "role": "verb",
         "BrE": "/krɔːl/",
         "AmE": "/krɔːl/",
         "definition": "to move on hands and knees",
         "examples": [
            "Baby learns to crawl.",
            "Traffic crawls slowly.",
            "Crawl under the fence."
         ]
      },
      {
         "id": 31,
         "word": "creator",
         "role": "noun",
         "BrE": "/kriˈeɪtə(r)/",
         "AmE": "/kriˈeɪtər/",
         "definition": "someone who makes something",
         "examples": [
            "The creator of the show.",
            "God as creator.",
            "Content creator online."
         ]
      },
      {
         "id": 31,
         "word": "credibility",
         "role": "noun",
         "BrE": "/ˌkredəˈbɪləti/",
         "AmE": "/ˌkredəˈbɪləti/",
         "definition": "quality of being believable",
         "examples": [
            "Lose credibility with lies.",
            "Build credibility over time.",
            "Source lacks credibility."
         ]
      },
      {
         "id": 31,
         "word": "credible",
         "role": "adjective",
         "BrE": "/ˈkredəbl/",
         "AmE": "/ˈkredəbl/",
         "definition": "able to be believed",
         "examples": [
            "Credible witness testifies.",
            "Story sounds credible.",
            "Credible threat warned."
         ]
      },
      {
         "id": 31,
         "word": "creep",
         "role": "verb",
         "BrE": "/kriːp/",
         "AmE": "/kriːp/",
         "definition": "to move slowly and quietly",
         "examples": [
            "Creep up stairs.",
            "Prices creep up.",
            "Vines creep along wall."
         ]
      },
      {
         "id": 31,
         "word": "critique",
         "role": "noun",
         "BrE": "/krɪˈtiːk/",
         "AmE": "/krɪˈtiːk/",
         "definition": "a detailed analysis",
         "examples": [
            "Write a critique.",
            "Film critique published.",
            "Offer constructive critique."
         ]
      },
      {
         "id": 32,
         "word": "crown",
         "role": "noun",
         "BrE": "/kraʊn/",
         "AmE": "/kraʊn/",
         "definition": "a headwear for royalty",
         "examples": [
            "Wear the crown.",
            "Crown jewel stolen.",
            "Crown the winner."
         ]
      },
      {
         "id": 32,
         "word": "crude",
         "role": "adjective",
         "BrE": "/kruːd/",
         "AmE": "/kruːd/",
         "definition": "simple or rude",
         "examples": [
            "Crude oil extracted.",
            "Crude joke laughed.",
            "Crude drawing sketched."
         ]
      },
      {
         "id": 32,
         "word": "crush",
         "role": "verb",
         "BrE": "/krʌʃ/",
         "AmE": "/krʌʃ/",
         "definition": "to press hard",
         "examples": [
            "Crush the garlic.",
            "Crowd crush avoided.",
            "Crush on someone."
         ]
      },
      {
         "id": 32,
         "word": "crystal",
         "role": "noun",
         "BrE": "/ˈkrɪstl/",
         "AmE": "/ˈkrɪstl/",
         "definition": "clear mineral or glass",
         "examples": [
            "Crystal clear water.",
            "Crystal vase broken.",
            "Quartz crystal used."
         ]
      },
      {
         "id": 32,
         "word": "cult",
         "role": "noun, adjective",
         "BrE": "/kʌlt/",
         "AmE": "/kʌlt/",
         "definition": "a group with extreme beliefs",
         "examples": [
            "Join a cult.",
            "Cult following gained.",
            "Cult film watched."
         ]
      },
      {
         "id": 32,
         "word": "cultivate",
         "role": "verb",
         "BrE": "/ˈkʌltɪveɪt/",
         "AmE": "/ˈkʌltɪveɪt/",
         "definition": "to grow plants or develop",
         "examples": [
            "Cultivate the land.",
            "Cultivate friendships.",
            "Cultivate skills."
         ]
      },
      {
         "id": 32,
         "word": "curiosity",
         "role": "noun",
         "BrE": "/ˌkjʊəriˈɒsəti/",
         "AmE": "/ˌkjʊriˈɑːsəti/",
         "definition": "desire to know",
         "examples": [
            "Satisfy curiosity.",
            "Out of curiosity.",
            "Spark curiosity in kids."
         ]
      },
      {
         "id": 32,
         "word": "custody",
         "role": "noun",
         "BrE": "/ˈkʌstədi/",
         "AmE": "/ˈkʌstədi/",
         "definition": "care or imprisonment",
         "examples": [
            "Child custody battle.",
            "Take into custody.",
            "Protective custody given."
         ]
      },
      {
         "id": 32,
         "word": "cutting",
         "role": "noun",
         "BrE": "/ˈkʌtɪŋ/",
         "AmE": "/ˈkʌtɪŋ/",
         "definition": "a piece cut off",
         "examples": [
            "Newspaper cutting saved.",
            "Plant cutting rooted.",
            "Cutting remark hurt."
         ]
      },
      {
         "id": 32,
         "word": "cynical",
         "role": "adjective",
         "BrE": "/ˈsɪnɪkl/",
         "AmE": "/ˈsɪnɪkl/",
         "definition": "doubting people's motives",
         "examples": [
            "Cynical view held.",
            "Become cynical over time.",
            "Cynical comment made."
         ]
      },
      {
         "id": 33,
         "word": "dam",
         "role": "noun",
         "BrE": "/dæm/",
         "AmE": "/dæm/",
         "definition": "a wall holding back water",
         "examples": [
            "Build a dam.",
            "Dam breaks flood.",
            "Hydroelectric dam generates."
         ]
      },
      {
         "id": 33,
         "word": "damaging",
         "role": "adjective",
         "BrE": "/ˈdæmɪdʒɪŋ/",
         "AmE": "/ˈdæmɪdʒɪŋ/",
         "definition": "causing harm",
         "examples": [
            "Damaging storm hits.",
            "Damaging rumors spread.",
            "Damaging effects seen."
         ]
      },
      {
         "id": 33,
         "word": "dawn",
         "role": "noun",
         "BrE": "/dɔːn/",
         "AmE": "/dɔːn/",
         "definition": "the beginning of day",
         "examples": [
            "At dawn we leave.",
            "Dawn of new era.",
            "It dawned on me."
         ]
      },
      {
         "id": 33,
         "word": "debris",
         "role": "noun",
         "BrE": "/ˈdebriː/",
         "AmE": "/dəˈbriː/",
         "definition": "scattered pieces of waste",
         "examples": [
            "Clear the debris.",
            "Space debris orbits.",
            "Debris from crash."
         ]
      },
      {
         "id": 33,
         "word": "debut",
         "role": "noun",
         "BrE": "/ˈdeɪbjuː/",
         "AmE": "/ˈdeɪbjuː/",
         "definition": "first public appearance",
         "examples": [
            "Make a debut.",
            "Film debut successful.",
            "Album debut released."
         ]
      },
      {
         "id": 33,
         "word": "decision-making",
         "role": "noun",
         "BrE": "/dɪˈsɪʒn ˌmeɪkɪŋ/",
         "AmE": "/dɪˈsɪʒn ˌmeɪkɪŋ/",
         "definition": "process of deciding",
         "examples": [
            "Improve decision-making.",
            "Involved in decision-making.",
            "Decision-making skills."
         ]
      },
      {
         "id": 33,
         "word": "decisive",
         "role": "adjective",
         "BrE": "/dɪˈsaɪsɪv/",
         "AmE": "/dɪˈsaɪsɪv/",
         "definition": "settling an issue",
         "examples": [
            "Decisive victory won.",
            "Be decisive now.",
            "Decisive moment captured."
         ]
      },
      {
         "id": 33,
         "word": "declaration",
         "role": "noun",
         "BrE": "/ˌdekləˈreɪʃn/",
         "AmE": "/ˌdekləˈreɪʃn/",
         "definition": "official statement",
         "examples": [
            "Sign the declaration.",
            "Declaration of independence.",
            "Make a declaration."
         ]
      },
      {
         "id": 33,
         "word": "dedicated",
         "role": "adjective",
         "BrE": "/ˈdedɪkeɪtɪd/",
         "AmE": "/ˈdedɪkeɪtɪd/",
         "definition": "committed to a task",
         "examples": [
            "Dedicated worker promoted.",
            "Dedicated server used.",
            "Dedicated to cause."
         ]
      },
      {
         "id": 33,
         "word": "dedication",
         "role": "noun",
         "BrE": "/ˌdedɪˈkeɪʃn/",
         "AmE": "/ˌdedɪˈkeɪʃn/",
         "definition": "commitment or opening ceremony",
         "examples": [
            "Show dedication daily.",
            "Book dedication written.",
            "Building dedication held."
         ]
      },
      {
         "id": 34,
         "word": "deed",
         "role": "noun",
         "BrE": "/diːd/",
         "AmE": "/diːd/",
         "definition": "an action or legal document",
         "examples": [
            "Good deed rewarded.",
            "Property deed signed.",
            "Deed of heroism."
         ]
      },
      {
         "id": 34,
         "word": "deem",
         "role": "verb",
         "BrE": "/diːm/",
         "AmE": "/diːm/",
         "definition": "to consider or judge",
         "examples": [
            "Deem it necessary.",
            "Deem acceptable.",
            "Officials deem safe."
         ]
      },
      {
         "id": 34,
         "word": "default",
         "role": "noun",
         "BrE": "/dɪˈfɔːlt/",
         "AmE": "/dɪˈfɔːlt/",
         "definition": "failure to pay or standard setting",
         "examples": [
            "Loan default occurred.",
            "Default settings used.",
            "Win by default."
         ]
      },
      {
         "id": 34,
         "word": "defect",
         "role": "noun",
         "BrE": "/ˈdiːfekt/",
         "AmE": "/ˈdiːfekt/",
         "definition": "a fault or imperfection",
         "examples": [
            "Product defect fixed.",
            "Birth defect treated.",
            "Defect to enemy."
         ]
      },
      {
         "id": 34,
         "word": "defensive",
         "role": "adjective",
         "BrE": "/dɪˈfensɪv/",
         "AmE": "/dɪˈfensɪv/",
         "definition": "protecting against attack",
         "examples": [
            "Defensive position taken.",
            "Play defensive game.",
            "Feel defensive about criticism."
         ]
      },
      {
         "id": 34,
         "word": "deficiency",
         "role": "noun",
         "BrE": "/dɪˈfɪʃnsi/",
         "AmE": "/dɪˈfɪʃnsi/",
         "definition": "lack of something",
         "examples": [
            "Vitamin deficiency causes illness.",
            "Address the deficiency.",
            "Nutrient deficiency tested."
         ]
      },
      {
         "id": 34,
         "word": "deficit",
         "role": "noun",
         "BrE": "/ˈdefɪsɪt/",
         "AmE": "/ˈdefɪsɪt/",
         "definition": "shortage of money",
         "examples": [
            "Budget deficit grows.",
            "Trade deficit reported.",
            "Attention deficit disorder."
         ]
      },
      {
         "id": 34,
         "word": "defy",
         "role": "verb",
         "BrE": "/dɪˈfaɪ/",
         "AmE": "/dɪˈfaɪ/",
         "definition": "to refuse to obey",
         "examples": [
            "Defy the odds.",
            "Defy authority boldly.",
            "Defy explanation easily."
         ]
      },
      {
         "id": 34,
         "word": "delegate",
         "role": "noun",
         "BrE": "/ˈdelɪɡət/",
         "AmE": "/ˈdelɪɡət/",
         "definition": "a representative",
         "examples": [
            "Send a delegate.",
            "Conference delegate attends.",
            "Delegate tasks efficiently."
         ]
      },
      {
         "id": 34,
         "word": "delegation",
         "role": "noun",
         "BrE": "/ˌdelɪˈɡeɪʃn/",
         "AmE": "/ˌdelɪˈɡeɪʃn/",
         "definition": "group of representatives",
         "examples": [
            "Meet the delegation.",
            "Delegation visits country.",
            "Task delegation done."
         ]
      },
      {
         "id": 35,
         "word": "delicate",
         "role": "adjective",
         "BrE": "/ˈdelɪkət/",
         "AmE": "/ˈdelɪkət/",
         "definition": "easily damaged or sensitive",
         "examples": [
            "Delicate fabric washed.",
            "Delicate situation handled.",
            "Delicate flavor tasted."
         ]
      },
      {
         "id": 35,
         "word": "demon",
         "role": "noun",
         "BrE": "/ˈdiːmən/",
         "AmE": "/ˈdiːmən/",
         "definition": "an evil spirit",
         "examples": [
            "Fight inner demons.",
            "Demon haunts house.",
            "Speed demon drives fast."
         ]
      },
      {
         "id": 35,
         "word": "denial",
         "role": "noun",
         "BrE": "/dɪˈnaɪəl/",
         "AmE": "/dɪˈnaɪəl/",
         "definition": "refusal to accept",
         "examples": [
            "In denial about problem.",
            "Denial of request.",
            "Access denial error."
         ]
      },
      {
         "id": 35,
         "word": "denounce",
         "role": "verb",
         "BrE": "/dɪˈnaʊns/",
         "AmE": "/dɪˈnaʊns/",
         "definition": "to criticize publicly",
         "examples": [
            "Denounce the injustice.",
            "Leaders denounce violence.",
            "Denounce as fake."
         ]
      },
      {
         "id": 35,
         "word": "dense",
         "role": "adjective",
         "BrE": "/dens/",
         "AmE": "/dens/",
         "definition": "closely packed",
         "examples": [
            "Dense forest explored.",
            "Dense population lives.",
            "Dense text read."
         ]
      },
      {
         "id": 35,
         "word": "density",
         "role": "noun",
         "BrE": "/ˈdensəti/",
         "AmE": "/ˈdensəti/",
         "definition": "amount in a space",
         "examples": [
            "Population density high.",
            "Measure density accurately.",
            "Bone density tested."
         ]
      },
      {
         "id": 35,
         "word": "dependence",
         "role": "noun",
         "BrE": "/dɪˈpendəns/",
         "AmE": "/dɪˈpendəns/",
         "definition": "need for something",
         "examples": [
            "Reduce dependence on oil.",
            "Drug dependence treated.",
            "Economic dependence shown."
         ]
      },
      {
         "id": 35,
         "word": "depict",
         "role": "verb",
         "BrE": "/dɪˈpɪkt/",
         "AmE": "/dɪˈpɪkt/",
         "definition": "to show or describe",
         "examples": [
            "Painting depicts scene.",
            "Film depicts history.",
            "Story depicts life."
         ]
      },
      {
         "id": 35,
         "word": "deploy",
         "role": "verb",
         "BrE": "/dɪˈplɔɪ/",
         "AmE": "/dɪˈplɔɪ/",
         "definition": "to position or use",
         "examples": [
            "Deploy troops overseas.",
            "Deploy software update.",
            "Deploy resources effectively."
         ]
      },
      {
         "id": 35,
         "word": "deployment",
         "role": "noun",
         "BrE": "/dɪˈplɔɪmənt/",
         "AmE": "/dɪˈplɔɪmənt/",
         "definition": "act of positioning",
         "examples": [
            "Military deployment ordered.",
            "App deployment completed.",
            "Staff deployment planned."
         ]
      },
      {
         "id": 36,
         "word": "deposit",
         "role": "verb",
         "BrE": "/dɪˈpɒzɪt/",
         "AmE": "/dɪˈpɑːzɪt/",
         "definition": "to put money in bank",
         "examples": [
            "Deposit the check.",
            "Mineral deposit found.",
            "Deposit layer formed."
         ]
      },
      {
         "id": 36,
         "word": "deprive",
         "role": "verb",
         "BrE": "/dɪˈpraɪv/",
         "AmE": "/dɪˈpraɪv/",
         "definition": "to take away from",
         "examples": [
            "Deprive of rights.",
            "Sleep deprive affects health.",
            "Deprive children of fun."
         ]
      },
      {
         "id": 36,
         "word": "deputy",
         "role": "noun",
         "BrE": "/ˈdepjuti/",
         "AmE": "/ˈdepjuti/",
         "definition": "second in command",
         "examples": [
            "Deputy manager assists.",
            "Deputy sheriff enforces.",
            "Appoint a deputy."
         ]
      },
      {
         "id": 36,
         "word": "descend",
         "role": "verb",
         "BrE": "/dɪˈsend/",
         "AmE": "/dɪˈsend/",
         "definition": "to go down",
         "examples": [
            "Descend the stairs.",
            "Plane descends slowly.",
            "Darkness descends quickly."
         ]
      },
      {
         "id": 36,
         "word": "descent",
         "role": "noun",
         "BrE": "/dɪˈsent/",
         "AmE": "/dɪˈsent/",
         "definition": "going down or ancestry",
         "examples": [
            "Steep descent ahead.",
            "Of Irish descent.",
            "Rapid descent made."
         ]
      },
      {
         "id": 36,
         "word": "designate",
         "role": "verb",
         "BrE": "/ˈdezɪɡneɪt/",
         "AmE": "/ˈdezɪɡneɪt/",
         "definition": "to appoint or mark",
         "examples": [
            "Designate a leader.",
            "Designate area restricted.",
            "Designate driver sober."
         ]
      },
      {
         "id": 36,
         "word": "desirable",
         "role": "adjective",
         "BrE": "/dɪˈzaɪərəbl/",
         "AmE": "/dɪˈzaɪərəbl/",
         "definition": "worth wanting",
         "examples": [
            "Desirable location chosen.",
            "Desirable traits listed.",
            "Highly desirable job."
         ]
      },
      {
         "id": 36,
         "word": "desktop",
         "role": "noun",
         "BrE": "/ˈdesktɒp/",
         "AmE": "/ˈdesktɑːp/",
         "definition": "computer screen background",
         "examples": [
            "Desktop computer used.",
            "Clean desktop icons.",
            "Desktop publishing software."
         ]
      },
      {
         "id": 36,
         "word": "destructive",
         "role": "adjective",
         "BrE": "/dɪˈstrʌktɪv/",
         "AmE": "/dɪˈstrʌktɪv/",
         "definition": "causing damage",
         "examples": [
            "Destructive storm passes.",
            "Destructive behavior stopped.",
            "Destructive force unleashed."
         ]
      },
      {
         "id": 36,
         "word": "detain",
         "role": "verb",
         "BrE": "/dɪˈteɪn/",
         "AmE": "/dɪˈteɪn/",
         "definition": "to hold someone",
         "examples": [
            "Detain the suspect.",
            "Detain for questioning.",
            "Authorities detain immigrants."
         ]
      },
      {
         "id": 37,
         "word": "detection",
         "role": "noun",
         "BrE": "/dɪˈtekʃn/",
         "AmE": "/dɪˈtekʃn/",
         "definition": "finding something hidden",
         "examples": [
            "Early detection saves lives.",
            "Virus detection software.",
            "Escape detection cleverly."
         ]
      },
      {
         "id": 37,
         "word": "detention",
         "role": "noun",
         "BrE": "/dɪˈtenʃn/",
         "AmE": "/dɪˈtenʃn/",
         "definition": "being held",
         "examples": [
            "Detention center visited.",
            "After-school detention given.",
            "Illegal detention protested."
         ]
      },
      {
         "id": 37,
         "word": "deteriorate",
         "role": "verb",
         "BrE": "/dɪˈtɪəriəreɪt/",
         "AmE": "/dɪˈtɪriəreɪt/",
         "definition": "to become worse",
         "examples": [
            "Health deteriorates quickly.",
            "Situation deteriorates daily.",
            "Road deteriorates over time."
         ]
      },
      {
         "id": 37,
         "word": "devastate",
         "role": "verb",
         "BrE": "/ˈdevəsteɪt/",
         "AmE": "/ˈdevəsteɪt/",
         "definition": "to destroy completely",
         "examples": [
            "Hurricane devastates area.",
            "News devastates family.",
            "Devastate the economy."
         ]
      },
      {
         "id": 37,
         "word": "devil",
         "role": "noun",
         "BrE": "/ˈdevl/",
         "AmE": "/ˈdevl/",
         "definition": "an evil being",
         "examples": [
            "The devil tempts.",
            "Devil in details.",
            "Little devil plays."
         ]
      },
      {
         "id": 37,
         "word": "devise",
         "role": "verb",
         "BrE": "/dɪˈvaɪz/",
         "AmE": "/dɪˈvaɪz/",
         "definition": "to invent a plan",
         "examples": [
            "Devise a strategy.",
            "Devise new method.",
            "Devise a solution."
         ]
      },
      {
         "id": 37,
         "word": "diagnose",
         "role": "verb",
         "BrE": "/ˈdaɪəɡnəʊz/",
         "AmE": "/ˌdaɪəɡˈnoʊz/",
         "definition": "to identify illness",
         "examples": [
            "Diagnose the disease.",
            "Doctor diagnoses patient.",
            "Diagnose problem quickly."
         ]
      },
      {
         "id": 37,
         "word": "diagnosis",
         "role": "noun",
         "BrE": "/ˌdaɪəɡˈnəʊsɪs/",
         "AmE": "/ˌdaɪəɡˈnoʊsɪs/",
         "definition": "identification of illness",
         "examples": [
            "Receive diagnosis soon.",
            "Correct diagnosis given.",
            "Medical diagnosis accurate."
         ]
      },
      {
         "id": 37,
         "word": "dictate",
         "role": "verb",
         "BrE": "/dɪkˈteɪt/",
         "AmE": "/ˈdɪkteɪt/",
         "definition": "to say for recording or command",
         "examples": [
            "Dictate a letter.",
            "Circumstances dictate action.",
            "Dictate terms strictly."
         ]
      },
      {
         "id": 37,
         "word": "dictator",
         "role": "noun",
         "BrE": "/dɪkˈteɪtə(r)/",
         "AmE": "/ˈdɪkteɪtər/",
         "definition": "ruler with total power",
         "examples": [
            "Overthrow the dictator.",
            "Dictator rules harshly.",
            "Become a dictator."
         ]
      },
      {
         "id": 38,
         "word": "differentiate",
         "role": "verb",
         "BrE": "/ˌdɪfəˈrenʃieɪt/",
         "AmE": "/ˌdɪfəˈrenʃieɪt/",
         "definition": "to see difference",
         "examples": [
            "Differentiate between twins.",
            "Differentiate products uniquely.",
            "Differentiate in math."
         ]
      },
      {
         "id": 38,
         "word": "dignity",
         "role": "noun",
         "BrE": "/ˈdɪɡnəti/",
         "AmE": "/ˈdɪɡnəti/",
         "definition": "self-respect",
         "examples": [
            "Treat with dignity.",
            "Human dignity respected.",
            "Die with dignity."
         ]
      },
      {
         "id": 38,
         "word": "dilemma",
         "role": "noun",
         "BrE": "/dɪˈlemə/",
         "AmE": "/dɪˈlemə/",
         "definition": "difficult choice",
         "examples": [
            "Face a dilemma.",
            "Moral dilemma resolved.",
            "In a dilemma."
         ]
      },
      {
         "id": 38,
         "word": "dimension",
         "role": "noun",
         "BrE": "/daɪˈmenʃn/",
         "AmE": "/daɪˈmenʃn/",
         "definition": "measurement or aspect",
         "examples": [
            "Room dimensions measured.",
            "New dimension added.",
            "Three dimensions seen."
         ]
      },
      {
         "id": 38,
         "word": "diminish",
         "role": "verb",
         "BrE": "/dɪˈmɪnɪʃ/",
         "AmE": "/dɪˈmɪnɪʃ/",
         "definition": "to make smaller",
         "examples": [
            "Resources diminish quickly.",
            "Diminish the pain.",
            "Importance diminishes over time."
         ]
      },
      {
         "id": 38,
         "word": "dip",
         "role": "verb",
         "BrE": "/dɪp/",
         "AmE": "/dɪp/",
         "definition": "to put briefly into liquid",
         "examples": [
            "Dip bread in sauce.",
            "Prices dip low.",
            "Dip in temperature."
         ]
      },
      {
         "id": 38,
         "word": "diplomat",
         "role": "noun",
         "BrE": "/ˈdɪpləmæt/",
         "AmE": "/ˈdɪpləmæt/",
         "definition": "official representing country",
         "examples": [
            "Diplomat negotiates peace.",
            "Experienced diplomat travels.",
            "Meet the diplomat."
         ]
      },
      {
         "id": 38,
         "word": "diplomatic",
         "role": "noun",
         "BrE": "/ˌdɪpləˈmætɪk/",
         "AmE": "/ˌdɪpləˈmætɪk/",
         "definition": "related to diplomacy",
         "examples": [
            "Diplomatic relations established.",
            "Diplomatic immunity granted.",
            "Be diplomatic in talks."
         ]
      },
      {
         "id": 38,
         "word": "directory",
         "role": "noun",
         "BrE": "/dɪˈrektəri/",
         "AmE": "/dəˈrektəri/",
         "definition": "list of names and numbers",
         "examples": [
            "Phone directory used.",
            "File directory organized.",
            "Business directory listed."
         ]
      },
      {
         "id": 38,
         "word": "disastrous",
         "role": "adjective",
         "BrE": "/dɪˈzɑːstrəs/",
         "AmE": "/dɪˈzæstrəs/",
         "definition": "very bad or harmful",
         "examples": [
            "Disastrous results seen.",
            "Disastrous fire destroys.",
            "Disastrous decision regretted."
         ]
      },
      {
         "id": 39,
         "word": "discard",
         "role": "verb",
         "BrE": "/dɪˈskɑːd/",
         "AmE": "/dɪˈskɑːrd/",
         "definition": "to throw away",
         "examples": [
            "Discard old clothes.",
            "Discard the idea.",
            "Discard cards in game."
         ]
      },
      {
         "id": 39,
         "word": "discharge",
         "role": "verb",
         "BrE": "/dɪsˈtʃɑːdʒ/",
         "AmE": "/dɪsˈtʃɑːrdʒ/",
         "definition": "to release or fire",
         "examples": [
            "Discharge from hospital.",
            "Discharge duties well.",
            "Discharge weapon safely."
         ]
      },
      {
         "id": 39,
         "word": "disclose",
         "role": "verb",
         "BrE": "/dɪsˈkləʊz/",
         "AmE": "/dɪsˈkloʊz/",
         "definition": "to reveal information",
         "examples": [
            "Disclose the secret.",
            "Disclose financial details.",
            "Refuse to disclose."
         ]
      },
      {
         "id": 39,
         "word": "disclosure",
         "role": "noun",
         "BrE": "/dɪsˈkləʊʒə(r)/",
         "AmE": "/dɪsˈkloʊʒər/",
         "definition": "revealing of information",
         "examples": [
            "Full disclosure required.",
            "Disclosure of facts.",
            "Non-disclosure agreement signed."
         ]
      },
      {
         "id": 39,
         "word": "discourse",
         "role": "noun",
         "BrE": "/ˈdɪskɔːs/",
         "AmE": "/ˈdɪskɔːrs/",
         "definition": "serious discussion",
         "examples": [
            "Public discourse changes.",
            "Academic discourse analyzed.",
            "Political discourse heated."
         ]
      },
      {
         "id": 39,
         "word": "discretion",
         "role": "noun",
         "BrE": "/dɪˈskreʃn/",
         "AmE": "/dɪˈskreʃn/",
         "definition": "careful judgment",
         "examples": [
            "Use discretion wisely.",
            "At your discretion.",
            "Viewer discretion advised."
         ]
      },
      {
         "id": 39,
         "word": "discrimination",
         "role": "noun",
         "BrE": "/dɪˌskrɪmɪˈneɪʃn/",
         "AmE": "/dɪˌskrɪmɪˈneɪʃn/",
         "definition": "unfair treatment",
         "examples": [
            "Fight discrimination daily.",
            "Racial discrimination banned.",
            "Price discrimination practiced."
         ]
      },
      {
         "id": 39,
         "word": "dismissal",
         "role": "noun",
         "BrE": "/dɪsˈmɪsl/",
         "AmE": "/dɪsˈmɪsl/",
         "definition": "removal from job",
         "examples": [
            "Unfair dismissal claimed.",
            "Case dismissal granted.",
            "Dismissal of idea."
         ]
      },
      {
         "id": 39,
         "word": "displace",
         "role": "verb",
         "BrE": "/dɪsˈpleɪs/",
         "AmE": "/dɪsˈpleɪs/",
         "definition": "to force out of place",
         "examples": [
            "War displaces people.",
            "Displace old technology.",
            "Displace water in tub."
         ]
      },
      {
         "id": 39,
         "word": "disposal",
         "role": "noun",
         "BrE": "/dɪˈspəʊzl/",
         "AmE": "/dɪˈspoʊzl/",
         "definition": "getting rid of",
         "examples": [
            "Waste disposal managed.",
            "At your disposal.",
            "Bomb disposal team."
         ]
      },
      {
         "id": 40,
         "word": "dispose",
         "role": "verb",
         "BrE": "/dɪˈspəʊz/",
         "AmE": "/dɪˈspoʊz/",
         "definition": "to get rid of",
         "examples": [
            "Dispose of trash.",
            "Dispose assets wisely.",
            "Well disposed towards."
         ]
      },
      {
         "id": 40,
         "word": "dispute",
         "role": "noun, verb",
         "BrE": "/dɪˈspjuːt/",
         "AmE": "/dɪˈspjuːt/",
         "definition": "an argument",
         "examples": [
            "Settle the dispute.",
            "Dispute the claim.",
            "Labor dispute strikes."
         ]
      },
      {
         "id": 40,
         "word": "disrupt",
         "role": "verb",
         "BrE": "/dɪsˈrʌpt/",
         "AmE": "/dɪsˈrʌpt/",
         "definition": "to interrupt normal activity",
         "examples": [
            "Disrupt the meeting.",
            "Weather disrupts flights.",
            "Disrupt markets suddenly."
         ]
      },
      {
         "id": 40,
         "word": "disruption",
         "role": "noun",
         "BrE": "/dɪsˈrʌpʃn/",
         "AmE": "/dɪsˈrʌpʃn/",
         "definition": "interruption of activity",
         "examples": [
            "Cause disruption.",
            "Minimal disruption aimed.",
            "Supply disruption affects."
         ]
      },
      {
         "id": 40,
         "word": "dissolve",
         "role": "verb",
         "BrE": "/dɪˈzɒlv/",
         "AmE": "/dɪˈzɑːlv/",
         "definition": "to mix into liquid",
         "examples": [
            "Dissolve sugar in water.",
            "Dissolve parliament now.",
            "Partnership dissolves."
         ]
      },
      {
         "id": 40,
         "word": "distinction",
         "role": "noun",
         "BrE": "/dɪˈstɪŋkʃn/",
         "AmE": "/dɪˈstɪŋkʃn/",
         "definition": "a difference",
         "examples": [
            "Make a distinction.",
            "Win with distinction.",
            "Clear distinction drawn."
         ]
      },
      {
         "id": 40,
         "word": "distinctive",
         "role": "adjective",
         "BrE": "/dɪˈstɪŋktɪv/",
         "AmE": "/dɪˈstɪŋktɪv/",
         "definition": "unique and recognizable",
         "examples": [
            "Distinctive voice heard.",
            "Distinctive style worn.",
            "Distinctive mark noted."
         ]
      },
      {
         "id": 40,
         "word": "distort",
         "role": "verb",
         "BrE": "/dɪˈstɔːt/",
         "AmE": "/dɪˈstɔːrt/",
         "definition": "to twist out of shape",
         "examples": [
            "Distort the facts.",
            "Mirror distorts image.",
            "Sound distorts loudly."
         ]
      },
      {
         "id": 40,
         "word": "distress",
         "role": "noun, verb",
         "BrE": "/dɪˈstres/",
         "AmE": "/dɪˈstres/",
         "definition": "great suffering",
         "examples": [
            "Cause distress to family.",
            "In distress signal.",
            "Financial distress faced."
         ]
      },
      {
         "id": 40,
         "word": "disturbing",
         "role": "adjective",
         "BrE": "/dɪˈstɜːbɪŋ/",
         "AmE": "/dɪˈstɝːbɪŋ/",
         "definition": "worrying or upsetting",
         "examples": [
            "Disturbing news reported.",
            "Disturbing trend observed.",
            "Disturbing images shown."
         ]
      },

      {
         "id": 41,
         "word": "divert",
         "role": "verb",
         "BrE": "/daɪˈvɜːt/",
         "AmE": "/daɪˈvɜːrt/",
         "definition": "to change the direction or purpose of something",
         "examples": [
            "They diverted the traffic away from the accident.",
            "He tried to divert her attention from the problem.",
            "The funds were diverted to a different project."
         ]
      },
      {
         "id": 41,
         "word": "divine",
         "role": "adjective",
         "BrE": "/dɪˈvaɪn/",
         "AmE": "/dɪˈvaɪn/",
         "definition": "related to or coming from a god",
         "examples": [
            "They believed the message was divine inspiration.",
            "The king claimed to have divine right to rule.",
            "She has a divine singing voice."
         ]
      },
      {
         "id": 41,
         "word": "doctrine",
         "role": "noun",
         "BrE": "/ˈdɒktrɪn/",
         "AmE": "/ˈdɑːktrɪn/",
         "definition": "a set of beliefs or principles held by a group",
         "examples": [
            "The church's doctrine forbids this practice.",
            "He studied the political doctrines of the 20th century.",
            "This goes against the company's core doctrines."
         ]
      },
      {
         "id": 41,
         "word": "documentation",
         "role": "noun",
         "BrE": "/ˌdɒkjumenˈteɪʃn/",
         "AmE": "/ˌdɑːkjumenˈteɪʃn/",
         "definition": "written information that provides proof or instructions",
         "examples": [
            "Please read the documentation before using the software.",
            "We need proper documentation to process your application.",
            "The project documentation was thorough and detailed."
         ]
      },
      {
         "id": 41,
         "word": "domain",
         "role": "noun",
         "BrE": "/dəˈmeɪn/",
         "AmE": "/doʊˈmeɪn/",
         "definition": "an area of knowledge or activity; a territory controlled by a ruler",
         "examples": [
            "This question is outside my domain of expertise.",
            "The castle was built in the king's domain.",
            "She registered a new website domain."
         ]
      },
      {
         "id": 41,
         "word": "dominance",
         "role": "noun",
         "BrE": "/ˈdɒmɪnəns/",
         "AmE": "/ˈdɑːmɪnəns/",
         "definition": "power and influence over others",
         "examples": [
            "The company achieved market dominance through innovation.",
            "The alpha wolf showed its dominance over the pack.",
            "Their team's dominance in the league was unquestioned."
         ]
      },
      {
         "id": 41,
         "word": "donor",
         "role": "noun",
         "BrE": "/ˈdəʊnə(r)/",
         "AmE": "/ˈdoʊnər/",
         "definition": "a person or organization that gives something, especially money or blood",
         "examples": [
            "Blood donors save lives every day.",
            "The museum was built with funds from a wealthy donor.",
            "She's a regular donor to several charities."
         ]
      },
      {
         "id": 41,
         "word": "dose",
         "role": "noun",
         "BrE": "/dəʊs/",
         "AmE": "/doʊs/",
         "definition": "a measured amount of medicine to be taken at one time",
         "examples": [
            "Take one dose of this medicine twice daily.",
            "The doctor increased his dose of antibiotics.",
            "A small dose of humor can help in difficult situations."
         ]
      },
      {
         "id": 41,
         "word": "drain",
         "role": "verb",
         "BrE": "/dreɪn/",
         "AmE": "/dreɪn/",
         "definition": "to remove liquid from something; to use up energy or resources",
         "examples": [
            "Drain the pasta before adding the sauce.",
            "The long meeting drained my energy completely.",
            "The war drained the country's economic resources."
         ]
      },
      {
         "id": 41,
         "word": "drift",
         "role": "verb",
         "BrE": "/drɪft/",
         "AmE": "/drɪft/",
         "definition": "to be carried slowly by air or water currents; to move without purpose",
         "examples": [
            "The boat began to drift toward the rocks.",
            "Snow drifted against the side of the house.",
            "He drifted from job to job for years."
         ]
      },

      {
         "id": 42,
         "word": "driving",
         "role": "adjective",
         "BrE": "/ˈdraɪvɪŋ/",
         "AmE": "/ˈdraɪvɪŋ/",
         "definition": "having great force or energy; being the main cause of something",
         "examples": [
            "He was the driving force behind the project's success.",
            "The driving rain made it difficult to see the road.",
            "She has a driving ambition to succeed."
         ]
      },
      {
         "id": 42,
         "word": "drown",
         "role": "verb",
         "BrE": "/draʊn/",
         "AmE": "/draʊn/",
         "definition": "to die from being underwater and unable to breathe; to be overwhelmed by something",
         "examples": [
            "He nearly drowned when he fell into the river.",
            "She drowned her sorrows in a pint of ice cream.",
            "The music was drowned out by the noise of the traffic."
         ]
      },
      {
         "id": 42,
         "word": "dual",
         "role": "adjective",
         "BrE": "/ˈdjuːəl/",
         "AmE": "/ˈduːəl/",
         "definition": "having two parts, functions, or aspects",
         "examples": [
            "She has dual citizenship in Canada and France.",
            "The car has a dual exhaust system.",
            "He has the dual role of manager and coach."
         ]
      },
      {
         "id": 42,
         "word": "dub",
         "role": "verb",
         "BrE": "/dʌb/",
         "AmE": "/dʌb/",
         "definition": "to give an unofficial name or title to someone or something; to add new sound to a recording",
         "examples": [
            "The media dubbed the new band 'the next big thing'.",
            "The film was dubbed into Spanish for its release in Mexico.",
            "He was dubbed a knight by the Queen."
         ]
      },
      {
         "id": 42,
         "word": "dumb",
         "role": "adjective",
         "BrE": "/dʌm/",
         "AmE": "/dʌm/",
         "definition": "temporarily unable to speak; (informal) stupid",
         "examples": [
            "She was struck dumb with amazement.",
            "That was a dumb thing to do.",
            "The accident left him deaf and dumb."
         ]
      },
      {
         "id": 42,
         "word": "duo",
         "role": "noun",
         "BrE": "/ˈdjuːəʊ/",
         "AmE": "/ˈduːoʊ/",
         "definition": "a pair of people or things, especially in music or performance",
         "examples": [
            "The comedy duo performed for over an hour.",
            "They are a famous musical duo.",
            "The cheese and wine made a perfect duo."
         ]
      },
      {
         "id": 42,
         "word": "dynamic",
         "role": "noun",
         "BrE": "/daɪˈnæmɪk/",
         "AmE": "/daɪˈnæmɪk/",
         "definition": "a force that stimulates change or progress within a system or process",
         "examples": [
            "The group dynamic changed when the new manager arrived.",
            "Understanding market dynamics is key to success.",
            "The dynamics of their relationship are very complex."
         ]
      },
      {
         "id": 42,
         "word": "eager",
         "role": "adjective",
         "BrE": "/ˈiːɡə(r)/",
         "AmE": "/ˈiːɡər/",
         "definition": "very interested and excited about something that will happen",
         "examples": [
            "The children were eager to open their presents.",
            "He's always eager to learn new things.",
            "She gave an eager nod of agreement."
         ]
      },
      {
         "id": 42,
         "word": "earnings",
         "role": "noun",
         "BrE": "/ˈɜːnɪŋz/",
         "AmE": "/ˈɜːrnɪŋz/",
         "definition": "the money a person earns from their work or a company makes as profit",
         "examples": [
            "The company reported higher earnings this quarter.",
            "Her annual earnings are above the national average.",
            "He must declare all his earnings to the tax office."
         ]
      },
      {
         "id": 42,
         "word": "ease",
         "role": "noun, verb",
         "BrE": "/iːz/",
         "AmE": "/iːz/",
         "definition": "(n) lack of difficulty; comfort. (v) to make something less severe or difficult",
         "examples": [
            "She passed the test with ease.",
            "The doctor gave him medicine to ease the pain.",
            "He eased the car into the parking space."
         ]
      },

      {
         "id": 43,
         "word": "echo",
         "role": "verb, noun",
         "BrE": "/ˈekəʊ/",
         "AmE": "/ˈekoʊ/",
         "definition": "(v) to repeat a sound by reflecting it off a surface; to express the same ideas or feelings. (n) a reflected sound",
         "examples": [
            "His shouts echoed through the empty hall.",
            "Her speech echoed the concerns of many parents.",
            "We heard an echo of our voices in the cave."
         ]
      },
      {
         "id": 43,
         "word": "ecological",
         "role": "adjective",
         "BrE": "/ˌiːkəˈlɒdʒɪkl/",
         "AmE": "/ˌiːkəˈlɑːdʒɪkl/",
         "definition": "relating to the relationship between living things and their environment",
         "examples": [
            "The factory caused an ecological disaster in the river.",
            "We need to find an ecological solution to this problem.",
            "This product is made from ecological materials."
         ]
      },
      {
         "id": 43,
         "word": "educator",
         "role": "noun",
         "BrE": "/ˈedʒukeɪtə(r)/",
         "AmE": "/ˈedʒukeɪtər/",
         "definition": "a person who teaches, especially as a profession",
         "examples": [
            "She is a respected educator with over 30 years of experience.",
            "The conference was attended by educators from around the world.",
            "Parents are a child's first educators."
         ]
      },
      {
         "id": 43,
         "word": "effectiveness",
         "role": "noun",
         "BrE": "/ɪˈfektɪvnəs/",
         "AmE": "/ɪˈfektɪvnəs/",
         "definition": "the degree to which something is successful in producing a desired result",
         "examples": [
            "We are studying the effectiveness of the new drug.",
            "The effectiveness of the advertising campaign was clear in the sales figures.",
            "He questioned the effectiveness of the new policy."
         ]
      },
      {
         "id": 43,
         "word": "efficiency",
         "role": "noun",
         "BrE": "/ɪˈfɪʃnsi/",
         "AmE": "/ɪˈfɪʃnsi/",
         "definition": "the quality of working well without wasting time or energy",
         "examples": [
            "The new system has greatly improved our efficiency.",
            "Fuel efficiency is important when buying a car.",
            "We need to find ways to increase efficiency in the office."
         ]
      },
      {
         "id": 43,
         "word": "ego",
         "role": "noun",
         "BrE": "/ˈiːɡəʊ/",
         "AmE": "/ˈiːɡoʊ/",
         "definition": "a person's sense of their own value and importance",
         "examples": [
            "He has a huge ego and is very arrogant.",
            "Her criticism was a blow to his ego.",
            "You need a strong ego to survive in this business."
         ]
      },
      {
         "id": 43,
         "word": "elaborate",
         "role": "adjective",
         "BrE": "/ɪˈlæbərət/",
         "AmE": "/ɪˈlæbərət/",
         "definition": "containing a lot of careful detail or many detailed parts",
         "examples": [
            "She made an elaborate costume for the party.",
            "They have an elaborate security system.",
            "He gave an elaborate explanation for his lateness."
         ]
      },
      {
         "id": 43,
         "word": "electoral",
         "role": "adjective",
         "BrE": "/ɪˈlektərəl/",
         "AmE": "/ɪˈlektərəl/",
         "definition": "relating to elections or voting",
         "examples": [
            "The electoral system needs reform.",
            "They are trying to win electoral support.",
            "The country is in the middle of an electoral campaign."
         ]
      },
      {
         "id": 43,
         "word": "elevate",
         "role": "verb",
         "BrE": "/ˈelɪveɪt/",
         "AmE": "/ˈelɪveɪt/",
         "definition": "to raise something to a higher position or level",
         "examples": [
            "The doctor told me to elevate my leg to reduce the swelling.",
            "The goal is to elevate the discussion above petty arguments.",
            "He was elevated to the position of manager."
         ]
      },
      {
         "id": 43,
         "word": "eligible",
         "role": "adjective",
         "BrE": "/ˈelɪdʒəbl/",
         "AmE": "/ˈelɪdʒəbl/",
         "definition": "having the right to do or obtain something; satisfying the appropriate conditions",
         "examples": [
            "You are eligible to vote once you turn 18.",
            "Is he eligible for the student discount?",
            "They are looking for an eligible candidate for the job."
         ]
      },

      {
         "id": 44,
         "word": "elite",
         "role": "noun",
         "BrE": "/eɪˈliːt/",
         "AmE": "/eɪˈliːt/",
         "definition": "a group of people considered to be the best in a particular society or field because of their power, talent, or wealth",
         "examples": [
            "The school only accepts students from the intellectual elite.",
            "The party was full of celebrities and the social elite.",
            "He joined an elite military unit."
         ]
      },
      {
         "id": 44,
         "word": "embark",
         "role": "verb",
         "BrE": "/ɪmˈbɑːk/",
         "AmE": "/ɪmˈbɑːrk/",
         "definition": "to go onto a ship or aircraft; to begin a new project or course of action",
         "examples": [
            "We embarked on our cruise at noon.",
            "She is embarking on a new career in teaching.",
            "The company is embarking on a major expansion."
         ]
      },
      {
         "id": 44,
         "word": "embarrassment",
         "role": "noun",
         "BrE": "/ɪmˈbærəsmənt/",
         "AmE": "/ɪmˈbærəsmənt/",
         "definition": "a feeling of self-consciousness, shame, or awkwardness",
         "examples": [
            "His face was red with embarrassment.",
            "She was an embarrassment to her family.",
            "The team's poor performance was a national embarrassment."
         ]
      },
      {
         "id": 44,
         "word": "embassy",
         "role": "noun",
         "BrE": "/ˈembəsi/",
         "AmE": "/ˈembəsi/",
         "definition": "the official residence or offices of an ambassador in a foreign country",
         "examples": [
            "They went to the American embassy for help.",
            "A protest was held outside the embassy.",
            "He works at the French embassy."
         ]
      },
      {
         "id": 44,
         "word": "embed",
         "role": "verb",
         "BrE": "/ɪmˈbed/",
         "AmE": "/ɪmˈbed/",
         "definition": "to fix something firmly and deeply in a surrounding mass; to insert (e.g., a video on a website)",
         "examples": [
            "The bullet was embedded in the wall.",
            "The journalist was embedded with the army unit.",
            "You can embed a YouTube video on your blog."
         ]
      },
      {
         "id": 44,
         "word": "embody",
         "role": "verb",
         "BrE": "/ɪmˈbɒdi/",
         "AmE": "/ɪmˈbɑːdi/",
         "definition": "to represent a quality or idea in a physical form; to include",
         "examples": [
            "The statue embodies the spirit of freedom.",
            "She embodies all the best qualities of a leader.",
            "The new law embodies several important principles."
         ]
      },
      {
         "id": 44,
         "word": "emergence",
         "role": "noun",
         "BrE": "/iˈmɜːdʒəns/",
         "AmE": "/iˈmɜːrdʒəns/",
         "definition": "the process of coming into view or becoming known",
         "examples": [
            "The emergence of new technology changed everything.",
            "We watched the butterfly's emergence from the cocoon.",
            "His emergence as a political leader was sudden."
         ]
      },
      {
         "id": 44,
         "word": "empirical",
         "role": "adjective",
         "BrE": "/ɪmˈpɪrɪkl/",
         "AmE": "/ɪmˈpɪrɪkl/",
         "definition": "based on, concerned with, or verifiable by observation or experience rather than theory or pure logic",
         "examples": [
            "They gathered empirical evidence to support their claim.",
            "The research needs empirical data, not just ideas.",
            "There is no empirical proof that this method works."
         ]
      },
      {
         "id": 44,
         "word": "empower",
         "role": "verb",
         "BrE": "/ɪmˈpaʊə(r)/",
         "AmE": "/ɪmˈpaʊər/",
         "definition": "to give someone the authority or power to do something; to make someone stronger and more confident",
         "examples": [
            "The new law will empower local councils.",
            "Education empowers people to improve their lives.",
            "She felt empowered to make her own decisions."
         ]
      },
      {
         "id": 44,
         "word": "enact",
         "role": "verb",
         "BrE": "/ɪˈnækt/",
         "AmE": "/ɪˈnækt/",
         "definition": "to make a proposal into a law; to perform a story or play",
         "examples": [
            "Parliament enacted a new tax bill.",
            "The group enacted a famous scene from the movie.",
            "The law was enacted to protect consumers."
         ]
      },
      {
         "id": 45,
         "word": "encompass",
         "role": "verb",
         "BrE": "/ɪnˈkʌmpəs/",
         "AmE": "/ɪnˈkʌmpəs/",
         "definition": "to include a wide range of things",
         "examples": [
            "The job encompasses many responsibilities.",
            "The festival encompasses music, art, and food."
         ]
      },
      {
         "id": 45,
         "word": "encouragement",
         "role": "noun",
         "BrE": "/ɪnˈkʌrɪdʒmənt/",
         "AmE": "/ɪnˈkɜːrɪdʒmənt/",
         "definition": "words or actions that give someone confidence",
         "examples": [
            "She gave me encouragement before the exam.",
            "The coach offered constant encouragement."
         ]
      },
      {
         "id": 45,
         "word": "encouraging",
         "role": "adjective",
         "BrE": "/ɪnˈkʌrɪdʒɪŋ/",
         "AmE": "/ɪnˈkɜːrɪdʒɪŋ/",
         "definition": "making someone feel more confident or hopeful",
         "examples": [
            "The results are encouraging.",
            "She gave him an encouraging smile."
         ]
      },
      {
         "id": 45,
         "word": "endeavour",
         "role": "noun",
         "BrE": "/ɪnˈdevə/",
         "AmE": "/ɪnˈdevər/",
         "definition": "a serious attempt to do something",
         "examples": [
            "Climbing the mountain was a difficult endeavour.",
            "They are engaged in scientific endeavours."
         ]
      },
      {
         "id": 45,
         "word": "endless",
         "role": "adjective",
         "BrE": "/ˈendləs/",
         "AmE": "/ˈendləs/",
         "definition": "having no end or seeming to last forever",
         "examples": [
            "The possibilities are endless.",
            "They talked for endless hours."
         ]
      },
      {
         "id": 45,
         "word": "endorse",
         "role": "verb",
         "BrE": "/ɪnˈdɔːs/",
         "AmE": "/ɪnˈdɔːrs/",
         "definition": "to publicly support something or approve it",
         "examples": [
            "The politician endorsed the new law.",
            "The brand is endorsed by a famous actor."
         ]
      },
      {
         "id": 45,
         "word": "endorsement",
         "role": "noun",
         "BrE": "/ɪnˈdɔːsmənt/",
         "AmE": "/ɪnˈdɔːrsmənt/",
         "definition": "public support for something or someone",
         "examples": [
            "The product received celebrity endorsement.",
            "The plan won official endorsement."
         ]
      },
      {
         "id": 45,
         "word": "endure",
         "role": "verb",
         "BrE": "/ɪnˈdjʊə/",
         "AmE": "/ɪnˈdʊr/",
         "definition": "to suffer something painful or to last for a long time",
         "examples": [
            "She had to endure many hardships.",
            "The tradition has endured for centuries."
         ]
      },
      {
         "id": 45,
         "word": "enforce",
         "role": "verb",
         "BrE": "/ɪnˈfɔːs/",
         "AmE": "/ɪnˈfɔːrs/",
         "definition": "to make sure that laws or rules are followed",
         "examples": [
            "The police enforce traffic laws.",
            "The rule must be strictly enforced."
         ]
      },
      {
         "id": 45,
         "word": "enforcement",
         "role": "noun",
         "BrE": "/ɪnˈfɔːsmənt/",
         "AmE": "/ɪnˈfɔːrsmənt/",
         "definition": "the act of making people follow a law or rule",
         "examples": [
            "Law enforcement is necessary for safety.",
            "The new policy needs strong enforcement."
         ]
      },
      {
         "id": 46,
         "word": "engagement",
         "role": "noun",
         "BrE": "/ɪnˈɡeɪdʒmənt/",
         "AmE": "/ɪnˈɡeɪdʒmənt/",
         "definition": "a formal agreement to get married; involvement or participation; an arranged meeting",
         "examples": [
            "They announced their engagement at the party.",
            "The teacher praised the student's engagement in class.",
            "I have a prior engagement that evening, so I can't come."
         ]
      },
      {
         "id": 46,
         "word": "engaging",
         "role": "adjective",
         "BrE": "/ɪnˈɡeɪdʒɪŋ/",
         "AmE": "/ɪnˈɡeɪdʒɪŋ/",
         "definition": "charming and attractive, and able to keep your interest",
         "examples": [
            "He has a very engaging personality.",
            "She gave an engaging presentation that held everyone's attention.",
            "The book's engaging story made it hard to put down."
         ]
      },
      {
         "id": 46,
         "word": "enquire",
         "role": "verb",
         "BrE": "/ɪnˈkwaɪə(r)/",
         "AmE": "/ɪnˈkwaɪər/",
         "definition": "to ask for information",
         "examples": [
            "I called to enquire about job opportunities.",
            "She enquired after your health.",
            "He enquired whether the room was available."
         ]
      },
      {
         "id": 46,
         "word": "enrich",
         "role": "verb",
         "BrE": "/ɪnˈrɪtʃ/",
         "AmE": "/ɪnˈrɪtʃ/",
         "definition": "to improve the quality of something by adding to it",
         "examples": [
            "Travel can enrich your life with new experiences.",
            "The soil was enriched with compost.",
            "Reading good books will enrich your vocabulary."
         ]
      },
      {
         "id": 46,
         "word": "enrol",
         "role": "verb",
         "BrE": "/ɪnˈrəʊl/",
         "AmE": "/ɪnˈroʊl/",
         "definition": "to officially register or sign up for something",
         "examples": [
            "I enrolled in a Spanish course.",
            "You must enrol your child in school before September.",
            "Over 200 students have enrolled so far."
         ]
      },
      {
         "id": 46,
         "word": "ensue",
         "role": "verb",
         "BrE": "/ɪnˈsjuː/",
         "AmE": "/ɪnˈsuː/",
         "definition": "to happen after something else, often as a result of it",
         "examples": [
            "A fierce debate ensued after his comments.",
            "Chaos ensued when the fire alarm went off.",
            "The problems that ensued were difficult to solve."
         ]
      },
      {
         "id": 46,
         "word": "enterprise",
         "role": "noun",
         "BrE": "/ˈentəpraɪz/",
         "AmE": "/ˈentərpraɪz/",
         "definition": "a project or business activity, especially one that is difficult or requires effort; a company or business",
         "examples": [
            "Starting a new business is a risky enterprise.",
            "He works for a large manufacturing enterprise.",
            "The festival is a community enterprise."
         ]
      },
      {
         "id": 46,
         "word": "enthusiast",
         "role": "noun",
         "BrE": "/ɪnˈθjuːziæst/",
         "AmE": "/ɪnˈθuːziæst/",
         "definition": "a person who is very interested in and involved with a particular activity or subject",
         "examples": [
            "He is a real car enthusiast and knows everything about them.",
            "The club is for photography enthusiasts.",
            "A group of wine enthusiasts toured the vineyard."
         ]
      },
      {
         "id": 46,
         "word": "entitle",
         "role": "verb",
         "BrE": "/ɪnˈtaɪtl/",
         "AmE": "/ɪnˈtaɪtl/",
         "definition": "to give someone the right to have or do something",
         "examples": [
            "This ticket entitles you to a free drink.",
            "Being over 65 entitles you to a discount.",
            "What entitles you to criticize my work?"
         ]
      },
      {
         "id": 46,
         "word": "entity",
         "role": "noun",
         "BrE": "/ˈentəti/",
         "AmE": "/ˈentəti/",
         "definition": "something that exists as a single and complete unit, separate from other things",
         "examples": [
            "The two companies will combine to form a single entity.",
            "The hospital is a separate legal entity.",
            "She regarded the mind and body as distinct entities."
         ]
      },

      {
         "id": 47,
         "word": "epidemic",
         "role": "noun",
         "BrE": "/ˌepɪˈdemɪk/",
         "AmE": "/ˌepɪˈdemɪk/",
         "definition": "a widespread occurrence of an infectious disease in a community at a particular time",
         "examples": [
            "The city struggled to contain the flu epidemic.",
            "There is an epidemic of obesity in many developed countries.",
            "The government declared a state of emergency due to the epidemic."
         ]
      },
      {
         "id": 47,
         "word": "equality",
         "role": "noun",
         "BrE": "/iˈkwɒləti/",
         "AmE": "/iˈkwɑːləti/",
         "definition": "the state of being equal, especially in status, rights, or opportunities",
         "examples": [
            "They are fighting for racial equality.",
            "The law promotes equality between men and women.",
            "We believe in the principle of equality for all."
         ]
      },
      {
         "id": 47,
         "word": "equation",
         "role": "noun",
         "BrE": "/ɪˈkweɪʒn/",
         "AmE": "/ɪˈkweɪʒn/",
         "definition": "a mathematical statement that two expressions are equal; a complex situation where different factors must be considered",
         "examples": [
            "Solve the equation for x.",
            "The cost of childcare becomes a major part of the equation for working parents.",
            "We need to consider all the variables in the equation."
         ]
      },
      {
         "id": 47,
         "word": "erect",
         "role": "verb",
         "BrE": "/ɪˈrekt/",
         "AmE": "/ɪˈrekt/",
         "definition": "to build something or put something upright",
         "examples": [
            "They plan to erect a new statue in the park.",
            "The soldiers erected a tent for the night.",
            "The bird erected its feathers to appear larger."
         ]
      },
      {
         "id": 47,
         "word": "escalate",
         "role": "verb",
         "BrE": "/ˈeskəleɪt/",
         "AmE": "/ˈeskəleɪt/",
         "definition": "to become or make something become more intense or serious",
         "examples": [
            "The argument quickly escalated into a fight.",
            "The government doesn't want to escalate the conflict.",
            "Costs have escalated far beyond our budget."
         ]
      },
      {
         "id": 47,
         "word": "essence",
         "role": "noun",
         "BrE": "/ˈesns/",
         "AmE": "/ˈesns/",
         "definition": "the most important quality or feature of something that makes it what it is",
         "examples": [
            "The essence of her argument was that we need to act now.",
            "Vanilla essence is used in baking.",
            "In essence, the two plans are the same."
         ]
      },
      {
         "id": 47,
         "word": "establishment",
         "role": "noun",
         "BrE": "/ɪˈstæblɪʃmənt/",
         "AmE": "/ɪˈstæblɪʃmənt/",
         "definition": "the action of starting or creating something that is meant to last; a business or organization",
         "examples": [
            "The establishment of the new school took three years.",
            "He runs a small catering establishment.",
            "She was a rebel who fought against the political establishment."
         ]
      },
      {
         "id": 47,
         "word": "eternal",
         "role": "adjective",
         "BrE": "/iˈtɜːnl/",
         "AmE": "/iˈtɜːrnl/",
         "definition": "lasting forever; without an end",
         "examples": [
            "They believed in eternal life after death.",
            "The mountains have an eternal beauty.",
            "We're locked in an eternal debate about this."
         ]
      },
      {
         "id": 47,
         "word": "evacuate",
         "role": "verb",
         "BrE": "/ɪˈvækjueɪt/",
         "AmE": "/ɪˈvækjueɪt/",
         "definition": "to move people from a dangerous place to a safer one",
         "examples": [
            "The building was evacuated after the bomb threat.",
            "Residents were evacuated from the path of the hurricane.",
            "The fire alarm means we must evacuate immediately."
         ]
      },
      {
         "id": 47,
         "word": "evoke",
         "role": "verb",
         "BrE": "/ɪˈvəʊk/",
         "AmE": "/ɪˈvoʊk/",
         "definition": "to bring a feeling, memory, or image into your mind",
         "examples": [
            "That song evokes memories of my childhood.",
            "The photograph evokes a sense of peace.",
            "His speech evoked a strong response from the crowd."
         ]
      },


      {
         "id": 48,
         "word": "evolutionary",
         "role": "adjective",
         "BrE": "/ˌiːvəˈluːʃənri/",
         "AmE": "/ˌevəˈluːʃəneri/",
         "definition": "relating to the gradual development of something over time",
         "examples": [
            "The evolutionary process took millions of years.",
            "There has been an evolutionary change in the company's strategy.",
            "The theory explains the evolutionary origins of human behavior."
         ]
      },
      {
         "id": 48,
         "word": "exaggerate",
         "role": "verb",
         "BrE": "/ɪɡˈzædʒəreɪt/",
         "AmE": "/ɪɡˈzædʒəreɪt/",
         "definition": "to make something seem larger, better, worse, or more important than it really is",
         "examples": [
            "Don't exaggerate – the fish wasn't that big!",
            "He tends to exaggerate his own importance.",
            "The media exaggerated the dangers of the storm."
         ]
      },
      {
         "id": 48,
         "word": "excellence",
         "role": "noun",
         "BrE": "/ˈeksələns/",
         "AmE": "/ˈeksələns/",
         "definition": "the quality of being extremely good",
         "examples": [
            "The restaurant is known for its excellence in service.",
            "The school strives for academic excellence.",
            "She was awarded a prize for excellence in design."
         ]
      },
      {
         "id": 48,
         "word": "exceptional",
         "role": "adjective",
         "BrE": "/ɪkˈsepʃənl/",
         "AmE": "/ɪkˈsepʃənl/",
         "definition": "much greater than usual, especially in skill, intelligence, quality, etc.",
         "examples": [
            "She has exceptional musical talent.",
            "The team performed exceptionally well.",
            "We've had an exceptional amount of rain this year."
         ]
      },
      {
         "id": 48,
         "word": "excess",
         "role": "noun, adjective",
         "BrE": "/ɪkˈses/",
         "AmE": "/ɪkˈses/",
         "definition": "(n) an amount that is more than necessary, allowed, or usual. (adj) more than is usual or allowed",
         "examples": [
            "Avoid eating to excess.",
            "The company made large profits in excess of expectations.",
            "You must pay for excess baggage on the flight."
         ]
      },
      {
         "id": 48,
         "word": "exclusion",
         "role": "noun",
         "BrE": "/ɪkˈskluːʒn/",
         "AmE": "/ɪkˈskluːʒn/",
         "definition": "the act of not allowing someone or something to take part in an activity or to enter a place",
         "examples": [
            "She felt a sense of exclusion from the group.",
            "The policy led to the exclusion of many talented people.",
            "His exclusion from the team was a surprise to everyone."
         ]
      },
      {
         "id": 48,
         "word": "exclusive",
         "role": "adjective",
         "BrE": "/ɪkˈskluːsɪv/",
         "AmE": "/ɪkˈskluːsɪv/",
         "definition": "limited to only one person or group of people; not shared",
         "examples": [
            "The interview was an exclusive for our magazine.",
            "The hotel has an exclusive beach for its guests.",
            "This is a members-only exclusive club."
         ]
      },
      {
         "id": 48,
         "word": "exclusively",
         "role": "adverb",
         "BrE": "/ɪkˈskluːsɪvli/",
         "AmE": "/ɪkˈskluːsɪvli/",
         "definition": "only; involving nothing else",
         "examples": [
            "This shop sells exclusively organic produce.",
            "The room is used exclusively for meetings.",
            "He works exclusively with children."
         ]
      },
      {
         "id": 48,
         "word": "execute",
         "role": "verb",
         "BrE": "/ˈeksɪkjuːt/",
         "AmE": "/ˈeksɪkjuːt/",
         "definition": "to carry out or perform a plan, order, or piece of work; to kill someone as a legal punishment",
         "examples": [
            "The team executed the plan perfectly.",
            "The prisoner was executed at dawn.",
            "The computer executes the program's commands."
         ]
      },
      {
         "id": 48,
         "word": "execution",
         "role": "noun",
         "BrE": "/ˌeksɪˈkjuːʃn/",
         "AmE": "/ˌeksɪˈkjuːʃn/",
         "definition": "the act of carrying out a plan, order, or piece of work; the act of killing someone as a legal punishment",
         "examples": [
            "The execution of the project was flawless.",
            "The execution of the prisoner was scheduled for noon.",
            "Success depends on the careful execution of the strategy."
         ]
      },

      {
         "id": 49,
         "word": "exert",
         "role": "verb",
         "BrE": "/ɪɡˈzɜːt/",
         "AmE": "/ɪɡˈzɜːrt/",
         "definition": "to use power, influence, or physical force to make something happen",
         "examples": [
            "You need to exert more pressure to open that jar.",
            "The manager exerted her authority to get the project finished.",
            "Don't exert yourself too much in this heat."
         ]
      },
      {
         "id": 49,
         "word": "exile",
         "role": "noun",
         "BrE": "/ˈeksaɪl/",
         "AmE": "/ˈeɡzaɪl/",
         "definition": "the state of being forced to live away from one's own country, often for political reasons",
         "examples": [
            "The writer lived in exile for twenty years.",
            "The king was sent into exile after the revolution.",
            "They returned from exile when the government changed."
         ]
      },
      {
         "id": 49,
         "word": "exit",
         "role": "verb",
         "BrE": "/ˈeksɪt/",
         "AmE": "/ˈeɡzɪt/",
         "definition": "to go out of or leave a place",
         "examples": [
            "Please exit the building through the rear door.",
            "The actor exited the stage to loud applause.",
            "You need to press this key to exit the program."
         ]
      },
      {
         "id": 49,
         "word": "expenditure",
         "role": "noun",
         "BrE": "/ɪkˈspendɪtʃə(r)/",
         "AmE": "/ɪkˈspendɪtʃər/",
         "definition": "the amount of money spent on something",
         "examples": [
            "The company is trying to reduce its expenditure.",
            "Government expenditure on health has increased.",
            "This is a significant expenditure for our family."
         ]
      },
      {
         "id": 49,
         "word": "experimental",
         "role": "adjective",
         "BrE": "/ɪkˌsperɪˈmentl/",
         "AmE": "/ɪkˌsperɪˈmentl/",
         "definition": "relating to or based on new ideas, forms, or methods that are used to find out what effect they have",
         "examples": [
            "The treatment is still in the experimental stage.",
            "The band is known for its experimental music.",
            "They built an experimental aircraft."
         ]
      },
      {
         "id": 49,
         "word": "expire",
         "role": "verb",
         "BrE": "/ɪkˈspaɪə(r)/",
         "AmE": "/ɪkˈspaɪər/",
         "definition": "to come to an end; to become no longer valid",
         "examples": [
            "My passport expires next month.",
            "The offer expires at midnight tonight.",
            "He expired peacefully in his sleep. (a formal way to say 'died')"
         ]
      },
      {
         "id": 49,
         "word": "explicit",
         "role": "adjective",
         "BrE": "/ɪkˈsplɪsɪt/",
         "AmE": "/ɪkˈsplɪsɪt/",
         "definition": "clear, direct, and easy to understand, leaving no doubt about the meaning",
         "examples": [
            "She gave me explicit instructions not to be disturbed.",
            "The film contains explicit language and violence.",
            "The contract must be explicit about the costs involved."
         ]
      },
      {
         "id": 49,
         "word": "explicitly",
         "role": "adverb",
         "BrE": "/ɪkˈsplɪsɪtli/",
         "AmE": "/ɪkˈsplɪsɪtli/",
         "definition": "in a clear and direct way, so that the meaning is easy to understand",
         "examples": [
            "The rules explicitly forbid smoking in this area.",
            "He was explicitly told not to contact the client.",
            "The law is stated explicitly in the document."
         ]
      },
      {
         "id": 49,
         "word": "exploitation",
         "role": "noun",
         "BrE": "/ˌeksplɔɪˈteɪʃn/",
         "AmE": "/ˌeksplɔɪˈteɪʃn/",
         "definition": "the action of treating someone unfairly in order to benefit from their work; the use of a resource",
         "examples": [
            "The factory was accused of the exploitation of child labor.",
            "The exploitation of the country's natural resources has caused environmental damage.",
            "The film deals with the theme of human exploitation."
         ]
      },
      {
         "id": 49,
         "word": "explosive",
         "role": "adjective, noun",
         "BrE": "/ɪkˈspləʊsɪv/",
         "AmE": "/ɪkˈsploʊsɪv/",
         "definition": "(adj) able or likely to explode; likely to cause violence or strong feelings. (n) a substance that can cause an explosion",
         "examples": [
            "The situation in the region is highly explosive.",
            "The police found an explosive device in the car.",
            "The chemical is a powerful explosive."
         ]
      },

      {
         "id": 50,
         "word": "extract",
         "role": "verb",
         "BrE": "/ɪkˈstrækt/",
         "AmE": "/ɪkˈstrækt/",
         "definition": "to remove or take out something, often with effort; to get information or money from someone",
         "examples": [
            "The dentist had to extract my wisdom tooth.",
            "The police finally extracted a confession from the suspect.",
            "She extracted the key points from the long report."
         ]
      },
      {
         "id": 50,
         "word": "extremist",
         "role": "noun",
         "BrE": "/ɪkˈstriːmɪst/",
         "AmE": "/ɪkˈstriːmɪst/",
         "definition": "a person who holds extreme or fanatical political or religious views",
         "examples": [
            "The government is cracking down on religious extremists.",
            "He was labeled an extremist for his radical proposals.",
            "The group was taken over by extremists."
         ]
      },
      {
         "id": 50,
         "word": "facilitate",
         "role": "verb",
         "BrE": "/fəˈsɪlɪteɪt/",
         "AmE": "/fəˈsɪlɪteɪt/",
         "definition": "to make an action or process easier or possible",
         "examples": [
            "The new software will facilitate communication between departments.",
            "The treaty was designed to facilitate trade.",
            "Her role is to facilitate the meeting, not to lead it."
         ]
      },
      {
         "id": 50,
         "word": "faction",
         "role": "noun",
         "BrE": "/ˈfækʃn/",
         "AmE": "/ˈfækʃn/",
         "definition": "a small, organized group within a larger one, often in disagreement with the main group",
         "examples": [
            "The political party was divided into several warring factions.",
            "A rebel faction took control of the northern region.",
            "The disagreement led to a split within the faction."
         ]
      },
      {
         "id": 50,
         "word": "faculty",
         "role": "noun",
         "BrE": "/ˈfæklti/",
         "AmE": "/ˈfæklti/",
         "definition": "a natural mental power or physical ability; all the teachers in a university or college",
         "examples": [
            "He has an extraordinary faculty for learning languages.",
            "The entire faculty voted on the new policy.",
            "She joined the faculty of the law school last year."
         ]
      },
      {
         "id": 50,
         "word": "fade",
         "role": "verb",
         "BrE": "/feɪd/",
         "AmE": "/feɪd/",
         "definition": "to gradually lose strength, freshness, or color; to become less clear or visible",
         "examples": [
            "The sunlight has faded the curtains.",
            "Memories of that day have faded over time.",
            "The music faded out at the end of the song."
         ]
      },
      {
         "id": 50,
         "word": "fairness",
         "role": "noun",
         "BrE": "/ˈfeənəs/",
         "AmE": "/ˈfernəs/",
         "definition": "the quality of treating people equally or in a way that is reasonable and right",
         "examples": [
            "Children have a strong sense of fairness.",
            "The judge is known for his fairness.",
            "We need to ensure fairness in the selection process."
         ]
      },
      {
         "id": 50,
         "word": "fatal",
         "role": "adjective",
         "BrE": "/ˈfeɪtl/",
         "AmE": "/ˈfeɪtl/",
         "definition": "causing or ending in death; causing disaster or failure",
         "examples": [
            "He suffered a fatal heart attack.",
            "She made the fatal mistake of trusting him.",
            "There was a fatal flaw in their plan."
         ]
      },
      {
         "id": 50,
         "word": "fate",
         "role": "noun",
         "BrE": "/feɪt/",
         "AmE": "/feɪt/",
         "definition": "a power that is believed to control what happens in the future; the things that happen to someone",
         "examples": [
            "Do you believe in fate?",
            "They met by chance, as if it was fate.",
            "He accepted his fate without complaint."
         ]
      },
      {
         "id": 50,
         "word": "favourable",
         "role": "adjective",
         "BrE": "/ˈfeɪvərəbl/",
         "AmE": "/ˈfeɪvərəbl/",
         "definition": "showing approval or agreement; advantageous or positive",
         "examples": [
            "The reviews for the film were very favourable.",
            "The weather conditions are favourable for sailing.",
            "He made a favourable impression at the interview."
         ]
      },

      {
         "id": 51,
         "word": "feat",
         "role": "noun",
         "BrE": "/fiːt/",
         "AmE": "/fiːt/",
         "definition": "an achievement that requires great courage, skill, or strength",
         "examples": [
            "Climbing the mountain was an incredible feat of endurance.",
            "The engineer's design was a remarkable feat.",
            "Completing the project on time was no small feat."
         ]
      },
      {
         "id": 51,
         "word": "feminist",
         "role": "adjective, noun",
         "BrE": "/ˈfemənɪst/",
         "AmE": "/ˈfemənɪst/",
         "definition": "(adj) relating to the belief that women should have the same rights and opportunities as men. (n) a person who supports this belief",
         "examples": [
            "She is a leading feminist writer.",
            "The movement has its roots in feminist theory.",
            "He considers himself a feminist and supports gender equality."
         ]
      },
      {
         "id": 51,
         "word": "fibre",
         "role": "noun",
         "BrE": "/ˈfaɪbə(r)/",
         "AmE": "/ˈfaɪbər/",
         "definition": "a thread-like structure forming animal or plant tissue; a substance in food that aids digestion",
         "examples": [
            "The muscle is made up of many fibres.",
            "You should eat more foods high in dietary fibre.",
            "Nylon is a synthetic fibre."
         ]
      },
      {
         "id": 51,
         "word": "fierce",
         "role": "adjective",
         "BrE": "/fɪəs/",
         "AmE": "/fɪrs/",
         "definition": "violent, intense, or aggressive in nature; strong and powerful",
         "examples": [
            "There was fierce competition for the job.",
            "The dog gave a fierce growl.",
            "She has a fierce determination to succeed."
         ]
      },
      {
         "id": 51,
         "word": "film-maker",
         "role": "noun",
         "BrE": "/ˈfɪlm meɪkə(r)/",
         "AmE": "/ˈfɪlm meɪkər/",
         "definition": "a person who directs or produces movies",
         "examples": [
            "She is an award-winning independent film-maker.",
            "Several young film-makers attended the festival.",
            "The documentary was made by a famous film-maker."
         ]
      },
      {
         "id": 51,
         "word": "filter",
         "role": "noun, verb",
         "BrE": "/ˈfɪltə(r)/",
         "AmE": "/ˈfɪltər/",
         "definition": "(n) a device that removes unwanted substances from a liquid or gas. (v) to pass through a filter; to select or remove certain things",
         "examples": [
            "We need to change the water filter.",
            "The software can filter out spam emails.",
            "Sunlight filtered through the leaves."
         ]
      },
      {
         "id": 51,
         "word": "fine",
         "role": "noun, verb",
         "BrE": "/faɪn/",
         "AmE": "/faɪn/",
         "definition": "(n) an amount of money that must be paid as a punishment for breaking a rule or law. (v) to charge someone such an amount of money",
         "examples": [
            "He got a parking fine for leaving his car there.",
            "The company was fined for polluting the river.",
            "You will be fined if you are caught littering."
         ]
      },
      {
         "id": 51,
         "word": "firearm",
         "role": "noun",
         "BrE": "/ˈfaɪərɑːm/",
         "AmE": "/ˈfaɪərɑːrm/",
         "definition": "a weapon that fires bullets, such as a rifle or pistol",
         "examples": [
            "You need a license to own a firearm.",
            "The suspect was carrying a loaded firearm.",
            "The law restricts the sale of firearms."
         ]
      },
      {
         "id": 51,
         "word": "fit",
         "role": "noun",
         "BrE": "/fɪt/",
         "AmE": "/fɪt/",
         "definition": "a sudden attack of a medical condition, such as convulsions or coughing; a sudden outburst of strong emotion",
         "examples": [
            "The child had an epileptic fit.",
            "She threw a fit when she heard the news.",
            "He burst into a fit of laughter."
         ]
      },
      {
         "id": 51,
         "word": "fixture",
         "role": "noun",
         "BrE": "/ˈfɪkstʃə(r)/",
         "AmE": "/ˈfɪkstʃər/",
         "definition": "a piece of furniture or equipment that is fixed in place in a building; a regular event or person in a particular place",
         "examples": [
            "Bathroom fixtures include the sink and toilet.",
            "The derby is a regular fixture in the football calendar.",
            "After 30 years, he's become a fixture at the local pub."
         ]
      },

      {
         "id": 52,
         "word": "flaw",
         "role": "noun",
         "BrE": "/flɔː/",
         "AmE": "/flɔː/",
         "definition": "a fault, mistake, or weakness that makes something not perfect",
         "examples": [
            "There's a flaw in your argument.",
            "The diamond was beautiful, but it had a tiny flaw.",
            "His greatest flaw is his impatience."
         ]
      },
      {
         "id": 52,
         "word": "flawed",
         "role": "adjective",
         "BrE": "/flɔːd/",
         "AmE": "/flɔːd/",
         "definition": "having a fault, mistake, or weakness",
         "examples": [
            "The plan was fundamentally flawed from the start.",
            "He is a brilliant but flawed character.",
            "The research was based on flawed data."
         ]
      },
      {
         "id": 52,
         "word": "flee",
         "role": "verb",
         "BrE": "/fliː/",
         "AmE": "/fliː/",
         "definition": "to run away from danger or a bad situation",
         "examples": [
            "The villagers had to flee their homes during the flood.",
            "The suspect fled the scene of the crime.",
            "They were forced to flee the country."
         ]
      },
      {
         "id": 52,
         "word": "fleet",
         "role": "noun",
         "BrE": "/fliːt/",
         "AmE": "/fliːt/",
         "definition": "a group of ships, or all the ships in a navy; a group of vehicles owned by a company",
         "examples": [
            "The Spanish Armada was a great fleet of ships.",
            "The company has a fleet of delivery vans.",
            "He commands the entire Pacific fleet."
         ]
      },
      {
         "id": 52,
         "word": "flesh",
         "role": "noun",
         "BrE": "/fleʃ/",
         "AmE": "/fleʃ/",
         "definition": "the soft substance consisting of muscle and fat that is found between the skin and bones of an animal or a person",
         "examples": [
            "The knife cut deep into the flesh of his arm.",
            "The flesh of the fruit is sweet and juicy.",
            "The spirit is willing, but the flesh is weak."
         ]
      },
      {
         "id": 52,
         "word": "flexibility",
         "role": "noun",
         "BrE": "/ˌfleksəˈbɪləti/",
         "AmE": "/ˌfleksəˈbɪləti/",
         "definition": "the ability to change or be changed easily to suit a different situation; the ability to bend easily without breaking",
         "examples": [
            "This job offers some flexibility in working hours.",
            "Yoga improves your strength and flexibility.",
            "We need a system with more flexibility."
         ]
      },
      {
         "id": 52,
         "word": "flourish",
         "role": "verb",
         "BrE": "/ˈflʌrɪʃ/",
         "AmE": "/ˈflɜːrɪʃ/",
         "definition": "to grow or develop in a healthy or successful way",
         "examples": [
            "The plants flourished in the sunny spot.",
            "The arts flourished under her leadership.",
            "The business began to flourish after the new investment."
         ]
      },
      {
         "id": 52,
         "word": "fluid",
         "role": "noun",
         "BrE": "/ˈfluːɪd/",
         "AmE": "/ˈfluːɪd/",
         "definition": "a substance that can flow easily, such as a liquid or gas",
         "examples": [
            "Make sure you drink plenty of fluids when you're ill.",
            "Brake fluid is essential for the car's braking system.",
            "The doctor drained the fluid from his knee."
         ]
      },
      {
         "id": 52,
         "word": "footage",
         "role": "noun",
         "BrE": "/ˈfʊtɪdʒ/",
         "AmE": "/ˈfʊtɪdʒ/",
         "definition": "a length of film that shows a particular event",
         "examples": [
            "The news showed footage of the earthquake.",
            "Security footage captured the thief entering the building.",
            "They found some amazing underwater footage."
         ]
      },
      {
         "id": 52,
         "word": "foreigner",
         "role": "noun",
         "BrE": "/ˈfɒrənə(r)/",
         "AmE": "/ˈfɔːrənər/",
         "definition": "a person who comes from a different country",
         "examples": [
            "The town gets many foreigners during the tourist season.",
            "As a foreigner, he found the customs strange at first.",
            "The law treats foreigners and citizens differently."
         ]
      },

      {
         "id": 53,
         "word": "forge",
         "role": "verb",
         "BrE": "/fɔːdʒ/",
         "AmE": "/fɔːrdʒ/",
         "definition": "to make or produce something, especially with some difficulty; to create a fake copy of something to deceive people",
         "examples": [
            "The two countries forged a strong alliance.",
            "He was arrested for forging banknotes.",
            "She forged a successful career in journalism."
         ]
      },
      {
         "id": 53,
         "word": "formula",
         "role": "noun",
         "BrE": "/ˈfɔːmjələ/",
         "AmE": "/ˈfɔːrmjələ/",
         "definition": "a plan or method for achieving something; a mathematical relationship expressed in symbols; a liquid food for babies",
         "examples": [
            "There's no magic formula for success.",
            "He couldn't remember the chemical formula for water (H₂O).",
            "The baby drinks a special milk formula."
         ]
      },
      {
         "id": 53,
         "word": "formulate",
         "role": "verb",
         "BrE": "/ˈfɔːmjuleɪt/",
         "AmE": "/ˈfɔːrmjuleɪt/",
         "definition": "to develop a plan, system, or proposal carefully, thinking about all of its details",
         "examples": [
            "The government is formulating a new education policy.",
            "She found it difficult to formulate her thoughts into words.",
            "Scientists are trying to formulate a new vaccine."
         ]
      },
      {
         "id": 53,
         "word": "forth",
         "role": "adverb",
         "BrE": "/fɔːθ/",
         "AmE": "/fɔːrθ/",
         "definition": "out from a starting point and forward or into view (old-fashioned or formal)",
         "examples": [
            "The tree put forth new leaves in spring.",
            "He went forth into the world to seek his fortune.",
            "From that day forth, they were never apart."
         ]
      },
      {
         "id": 53,
         "word": "forthcoming",
         "role": "adjective",
         "BrE": "/ˌfɔːθˈkʌmɪŋ/",
         "AmE": "/ˌfɔːrθˈkʌmɪŋ/",
         "definition": "about to happen or appear soon; willing to give information",
         "examples": [
            "Details of the forthcoming event will be announced next week.",
            "She was very forthcoming about her reasons for leaving.",
            "His new book is forthcoming this autumn."
         ]
      },
      {
         "id": 53,
         "word": "foster",
         "role": "verb",
         "BrE": "/ˈfɒstə(r)/",
         "AmE": "/ˈfɔːstər/",
         "definition": "to encourage the development or growth of something; to take care of a child as part of your family for a period of time",
         "examples": [
            "The club aims to foster a love of music.",
            "They have fostered three children over the years.",
            "The meeting fostered better relations between the two companies."
         ]
      },
      {
         "id": 53,
         "word": "fragile",
         "role": "adjective",
         "BrE": "/ˈfrædʒaɪl/",
         "AmE": "/ˈfrædʒl/",
         "definition": "easily broken or damaged; delicate",
         "examples": [
            "This vase is very fragile, so please handle it with care.",
            "The patient is still in a fragile state of health.",
            "Their agreement is based on a fragile peace."
         ]
      },
      {
         "id": 53,
         "word": "franchise",
         "role": "noun",
         "BrE": "/ˈfræntʃaɪz/",
         "AmE": "/ˈfræntʃaɪz/",
         "definition": "an authorization granted to sell a company's goods or services; the right to vote",
         "examples": [
            "He owns a fast-food franchise.",
            "The Star Wars movie franchise is hugely popular.",
            "Women fought for the franchise in the early 20th century."
         ]
      },
      {
         "id": 53,
         "word": "frankly",
         "role": "adverb",
         "BrE": "/ˈfræŋkli/",
         "AmE": "/ˈfræŋkli/",
         "definition": "in an open, honest, and direct way",
         "examples": [
            "Frankly, I don't care what they think.",
            "She spoke frankly about her struggles.",
            "To put it frankly, the plan is not going to work."
         ]
      },
      {
         "id": 53,
         "word": "frustrated",
         "role": "adjective",
         "BrE": "/frʌˈstreɪtɪd/",
         "AmE": "/ˈfrʌstreɪtɪd/",
         "definition": "feeling annoyed and impatient because you cannot achieve or do what you want",
         "examples": [
            "I'm getting frustrated with all these delays.",
            "He was frustrated by his lack of progress.",
            "A frustrated artist, she never got to paint professionally."
         ]
      },

      {
         "id": 54,
         "word": "frustrating",
         "role": "adjective",
         "BrE": "/frʌˈstreɪtɪŋ/",
         "AmE": "/ˈfrʌstreɪtɪŋ/",
         "definition": "causing feelings of annoyance and impatience because things are not happening as you want",
         "examples": [
            "It's so frustrating when the internet connection is slow.",
            "This is a frustrating problem with no easy solution.",
            "I had a frustrating day where nothing went right."
         ]
      },
      {
         "id": 54,
         "word": "frustration",
         "role": "noun",
         "BrE": "/frʌˈstreɪʃn/",
         "AmE": "/frʌˈstreɪʃn/",
         "definition": "the feeling of being annoyed and impatient because you cannot achieve or do what you want",
         "examples": [
            "She kicked the door in frustration.",
            "There is widespread frustration with the government's policies.",
            "He let out a sigh of frustration."
         ]
      },
      {
         "id": 54,
         "word": "functional",
         "role": "adjective",
         "BrE": "/ˈfʌŋkʃənl/",
         "AmE": "/ˈfʌŋkʃənl/",
         "definition": "designed to be practical and useful rather than attractive; working or operating",
         "examples": [
            "The furniture is very functional but not very stylish.",
            "The system is now fully functional.",
            "It's a functional disorder, not a structural one."
         ]
      },
      {
         "id": 54,
         "word": "fundraising",
         "role": "noun",
         "BrE": "/ˈfʌndreɪzɪŋ/",
         "AmE": "/ˈfʌndreɪzɪŋ/",
         "definition": "the activity of collecting money for a charity or organization",
         "examples": [
            "The school is holding a fundraising event for new sports equipment.",
            "She works in fundraising for a large charity.",
            "Their fundraising efforts were very successful."
         ]
      },
      {
         "id": 54,
         "word": "funeral",
         "role": "noun",
         "BrE": "/ˈfjuːnərəl/",
         "AmE": "/ˈfjuːnərəl/",
         "definition": "a ceremony held after a person's death, usually involving burying or cremating the body",
         "examples": [
            "The funeral will be held on Friday.",
            "Hundreds of people attended the president's funeral.",
            "It was a very moving funeral service."
         ]
      },
      {
         "id": 54,
         "word": "gallon",
         "role": "noun",
         "BrE": "/ˈɡælən/",
         "AmE": "/ˈɡælən/",
         "definition": "a unit for measuring liquid. In the UK it is equal to about 4.5 litres; in the US it is equal to about 3.8 litres.",
         "examples": [
            "The car does about 30 miles to the gallon.",
            "We drank a gallon of lemonade at the party.",
            "The recipe calls for half a gallon of milk."
         ]
      },
      {
         "id": 54,
         "word": "gambling",
         "role": "noun",
         "BrE": "/ˈɡæmblɪŋ/",
         "AmE": "/ˈɡæmblɪŋ/",
         "definition": "the activity of playing games of chance for money; betting",
         "examples": [
            "Gambling is illegal in some countries.",
            "He lost a lot of money through gambling.",
            "The city is famous for its gambling casinos."
         ]
      },
      {
         "id": 54,
         "word": "gathering",
         "role": "noun",
         "BrE": "/ˈɡæðərɪŋ/",
         "AmE": "/ˈɡæðərɪŋ/",
         "definition": "a meeting or coming together of people",
         "examples": [
            "There was a large family gathering at Christmas.",
            "The party was a small, informal gathering.",
            "We are having a gathering to celebrate her birthday."
         ]
      },
      {
         "id": 54,
         "word": "gaze",
         "role": "noun, verb",
         "BrE": "/ɡeɪz/",
         "AmE": "/ɡeɪz/",
         "definition": "(v) to look steadily and intently at someone or something for a long time. (n) a steady, intent look",
         "examples": [
            "She gazed out of the window at the rain.",
            "He held her gaze without looking away.",
            "The child gazed in wonder at the fireworks."
         ]
      },
      {
         "id": 54,
         "word": "gear",
         "role": "noun",
         "BrE": "/ɡɪə(r)/",
         "AmE": "/ɡɪr/",
         "definition": "a set of equipment or tools used for a particular activity; a mechanism in a vehicle that controls how power is passed to the wheels",
         "examples": [
            "We need to get our camping gear ready.",
            "Put the car into first gear.",
            "He's a photographer with all the latest gear."
         ]
      },

      {
         "id": 55,
         "word": "generic",
         "role": "adjective",
         "BrE": "/dʒəˈnerɪk/",
         "AmE": "/dʒəˈnerɪk/",
         "definition": "characteristic of or relating to a whole class or group; not specific or branded",
         "examples": [
            "He gave a generic answer that didn't really address my question.",
            "The store sells both branded medicines and cheaper generic ones.",
            "The speech was full of generic phrases about hope and change."
         ]
      },
      {
         "id": 55,
         "word": "genocide",
         "role": "noun",
         "BrE": "/ˈdʒenəsaɪd/",
         "AmE": "/ˈdʒenəsaɪd/",
         "definition": "the deliberate killing of a large number of people from a particular nation or ethnic group with the aim of destroying that nation or group",
         "examples": [
            "The country's leader was accused of genocide.",
            "The international community has promised to prevent future genocides.",
            "They were tried for crimes of genocide and war crimes."
         ]
      },
      {
         "id": 55,
         "word": "glance",
         "role": "noun, verb",
         "BrE": "/ɡlɑːns/",
         "AmE": "/ɡlæns/",
         "definition": "(v) to take a quick look at something. (n) a quick look",
         "examples": [
            "She glanced at her watch to see the time.",
            "I only had a quick glance at the newspaper this morning.",
            "He glanced nervously towards the door."
         ]
      },
      {
         "id": 55,
         "word": "glimpse",
         "role": "noun",
         "BrE": "/ɡlɪmps/",
         "AmE": "/ɡlɪmps/",
         "definition": "a momentary or partial view of something",
         "examples": [
            "I caught a glimpse of the famous actor as he left the building.",
            "The report offers a glimpse into the future of the industry.",
            "We got a brief glimpse of the sea between the houses."
         ]
      },
      {
         "id": 55,
         "word": "glorious",
         "role": "adjective",
         "BrE": "/ˈɡlɔːriəs/",
         "AmE": "/ˈɡlɔːriəs/",
         "definition": "deserving great admiration, praise, and honor; having or deserving great fame and success; beautifully bright and impressive",
         "examples": [
            "They celebrated a glorious victory.",
            "We spent a week of glorious sunshine on the beach.",
            "The building is a glorious example of Gothic architecture."
         ]
      },
      {
         "id": 55,
         "word": "glory",
         "role": "noun",
         "BrE": "/ˈɡlɔːri/",
         "AmE": "/ˈɡlɔːri/",
         "definition": "high renown or honor won by notable achievements; magnificent beauty or splendor",
         "examples": [
            "The soldiers fought for glory and for their country.",
            "The sun shone in all its glory.",
            "The castle has been restored to its former glory."
         ]
      },
      {
         "id": 55,
         "word": "governance",
         "role": "noun",
         "BrE": "/ˈɡʌvənəns/",
         "AmE": "/ˈɡʌvərnəns/",
         "definition": "the way in which a company, institution, or country is managed and controlled",
         "examples": [
            "The report criticized the corporate governance of the bank.",
            "They are calling for reforms in public governance.",
            "Good governance is essential for economic growth."
         ]
      },
      {
         "id": 55,
         "word": "grace",
         "role": "noun",
         "BrE": "/ɡreɪs/",
         "AmE": "/ɡreɪs/",
         "definition": "simple elegance or refinement of movement; courteous goodwill; a period of extra time allowed to obey a law or fulfill an obligation",
         "examples": [
            "The skater moved across the ice with effortless grace.",
            "She had the grace to apologize for her mistake.",
            "You have 10 days' grace to pay the bill."
         ]
      },
      {
         "id": 55,
         "word": "grasp",
         "role": "verb, noun",
         "BrE": "/ɡrɑːsp/",
         "AmE": "/ɡræsp/",
         "definition": "(v) to seize and hold firmly; to understand something. (n) a firm hold or understanding",
         "examples": [
            "The baby grasped my finger tightly.",
            "I think I finally grasp the main concept.",
            "The slippery rope was just beyond his grasp."
         ]
      },
      {
         "id": 55,
         "word": "grave",
         "role": "noun",
         "BrE": "/ɡreɪv/",
         "AmE": "/ɡreɪv/",
         "definition": "a hole in the ground where a dead body is buried",
         "examples": [
            "They visited their grandfather's grave on the anniversary of his death.",
            "The funeral procession made its way to the grave.",
            "He's digging his own grave with his reckless behavior. (idiom)"
         ]
      },

      {
         "id": 56,
         "word": "gravity",
         "role": "noun",
         "BrE": "/ˈɡrævəti/",
         "AmE": "/ˈɡrævəti/",
         "definition": "the force that attracts objects towards the centre of the earth; extreme importance and a cause for worry",
         "examples": [
            "The gravity of the moon affects the tides on Earth.",
            "He didn't seem to understand the gravity of the situation.",
            "The judge spoke with gravity when delivering the sentence."
         ]
      },
      {
         "id": 56,
         "word": "grid",
         "role": "noun",
         "BrE": "/ɡrɪd/",
         "AmE": "/ɡrɪd/",
         "definition": "a pattern of straight lines that cross each other to form squares; a system of wires for supplying electricity across a region",
         "examples": [
            "Draw your graph on the grid provided.",
            "The city streets are laid out in a grid pattern.",
            "A power cut left the entire grid without electricity."
         ]
      },
      {
         "id": 56,
         "word": "grief",
         "role": "noun",
         "BrE": "/ɡriːf/",
         "AmE": "/ɡriːf/",
         "definition": "intense sorrow, especially caused by someone's death",
         "examples": [
            "She was overcome with grief after her father died.",
            "The whole community shared in the family's grief.",
            "He was grieving the loss of his best friend."
         ]
      },
      {
         "id": 56,
         "word": "grin",
         "role": "verb, noun",
         "BrE": "/ɡrɪn/",
         "AmE": "/ɡrɪn/",
         "definition": "(v) to smile widely. (n) a wide smile",
         "examples": [
            "He grinned at me from across the room.",
            "She had a big grin on her face when she heard the good news.",
            "'I told you so,' he said with a grin."
         ]
      },
      {
         "id": 56,
         "word": "grind",
         "role": "verb",
         "BrE": "/ɡraɪnd/",
         "AmE": "/ɡraɪnd/",
         "definition": "to crush something into small particles or powder; to rub two hard objects together, often producing an unpleasant noise",
         "examples": [
            "The mill was used to grind wheat into flour.",
            "He grinds his teeth in his sleep.",
            "The bus ground to a halt at the traffic lights."
         ]
      },
      {
         "id": 56,
         "word": "grip",
         "role": "noun, verb",
         "BrE": "/ɡrɪp/",
         "AmE": "/ɡrɪp/",
         "definition": "(n) a firm hold; control over something or someone. (v) to hold something tightly",
         "examples": [
            "Keep a firm grip on the rope.",
            "The country is in the grip of a severe winter.",
            "She gripped the steering wheel tightly during the storm."
         ]
      },
      {
         "id": 56,
         "word": "gross",
         "role": "adjective",
         "BrE": "/ɡrəʊs/",
         "AmE": "/ɡroʊs/",
         "definition": "very rude or unpleasant; total, without deductions; very obvious and unacceptable",
         "examples": [
            "That's a gross thing to say!",
            "His gross income is £50,000, but his net income is less after tax.",
            "It was a gross injustice."
         ]
      },
      {
         "id": 56,
         "word": "guerrilla",
         "role": "noun",
         "BrE": "/ɡəˈrɪlə/",
         "AmE": "/ɡəˈrɪlə/",
         "definition": "a member of a small, independent group that fights against a larger, regular army using surprise attacks",
         "examples": [
            "The guerrilla fighters hid in the mountains.",
            "They were involved in guerrilla warfare against the government.",
            "The guerrilla group claimed responsibility for the attack."
         ]
      },
      {
         "id": 56,
         "word": "guidance",
         "role": "noun",
         "BrE": "/ˈɡaɪdns/",
         "AmE": "/ˈɡaɪdns/",
         "definition": "help and advice about how to do something or about how to deal with problems",
         "examples": [
            "I need some guidance on how to fill out this form.",
            "The teacher provided guidance to the students.",
            "She sought guidance from her parents."
         ]
      },
      {
         "id": 56,
         "word": "guilt",
         "role": "noun",
         "BrE": "/ɡɪlt/",
         "AmE": "/ɡɪlt/",
         "definition": "the fact of having committed a specified or implied offence; a feeling of having done something wrong",
         "examples": [
            "The evidence proved his guilt.",
            "She was consumed by guilt after lying to her friend.",
            "He admitted his guilt to the police."
         ]
      },

      {
         "id": 57,
         "word": "gut",
         "role": "noun",
         "BrE": "/ɡʌt/",
         "AmE": "/ɡʌt/",
         "definition": "the stomach or the lower part of the digestive system; a strong instinctive feeling",
         "examples": [
            "He had a pain in his gut after eating too much.",
            "My gut tells me that this is a bad idea.",
            "She had a gut reaction to the news."
         ]
      },
      {
         "id": 57,
         "word": "hail",
         "role": "verb",
         "BrE": "/heɪl/",
         "AmE": "/heɪl/",
         "definition": "to call out to someone to attract their attention; to describe someone or something as being very good",
         "examples": [
            "We tried to hail a taxi in the rain.",
            "The new policy was hailed as a great success.",
            "She hailed from a small town in Scotland."
         ]
      },
      {
         "id": 57,
         "word": "halfway",
         "role": "adverb",
         "BrE": "/ˌhɑːfˈweɪ/",
         "AmE": "/ˌhæfˈweɪ/",
         "definition": "at or to a point equidistant between two others; to a moderate degree",
         "examples": [
            "We are halfway through the project.",
            "The town is halfway between London and Oxford.",
            "She was halfway convinced by his argument."
         ]
      },
      {
         "id": 57,
         "word": "halt",
         "role": "verb, noun",
         "BrE": "/hɔːlt/",
         "AmE": "/hɔːlt/",
         "definition": "(v) to stop moving or happening. (n) a temporary or permanent stop",
         "examples": [
            "The train halted at the station.",
            "Production was halted due to a lack of materials.",
            "The car came to a sudden halt."
         ]
      },
      {
         "id": 57,
         "word": "handful",
         "role": "noun",
         "BrE": "/ˈhændfʊl/",
         "AmE": "/ˈhændfʊl/",
         "definition": "an amount that can be held in one hand; a small number of people or things; a person who is difficult to deal with",
         "examples": [
            "She gave the horse a handful of oats.",
            "Only a handful of people attended the meeting.",
            "That toddler is a real handful!"
         ]
      },
      {
         "id": 57,
         "word": "handling",
         "role": "noun",
         "BrE": "/ˈhændlɪŋ/",
         "AmE": "/ˈhændlɪŋ/",
         "definition": "the way in which someone deals with a situation, person, or object",
         "examples": [
            "I was impressed by her handling of the difficult customer.",
            "This car has excellent handling on winding roads.",
            "The handling of the fragile artifacts requires care."
         ]
      },
      {
         "id": 57,
         "word": "handy",
         "role": "adjective",
         "BrE": "/ˈhændi/",
         "AmE": "/ˈhændi/",
         "definition": "useful or convenient; skillful with your hands",
         "examples": [
            "Keep a flashlight handy in case the power goes out.",
            "It's a handy little tool for opening jars.",
            "He's very handy around the house and can fix anything."
         ]
      },
      {
         "id": 57,
         "word": "harassment",
         "role": "noun",
         "BrE": "/ˈhærəsmənt/",
         "AmE": "/həˈræsmənt/",
         "definition": "aggressive pressure or intimidation; unwanted behaviour that annoys or upsets someone",
         "examples": [
            "She filed a complaint for sexual harassment at work.",
            "The company has a strict policy against harassment.",
            "He faced constant harassment from the press."
         ]
      },
      {
         "id": 57,
         "word": "hardware",
         "role": "noun",
         "BrE": "/ˈhɑːdweə(r)/",
         "AmE": "/ˈhɑːrdwer/",
         "definition": "the physical parts of a computer; tools and equipment used in the house and garden",
         "examples": [
            "You need to upgrade your computer hardware to run this software.",
            "We bought some new hardware for the kitchen.",
            "He went to the hardware store to buy nails and a hammer."
         ]
      },
      {
         "id": 57,
         "word": "harmony",
         "role": "noun",
         "BrE": "/ˈhɑːməni/",
         "AmE": "/ˈhɑːrməni/",
         "definition": "a pleasing arrangement of parts; a state of peaceful existence and agreement",
         "examples": [
            "The singers sang in perfect harmony.",
            "We must learn to live in harmony with nature.",
            "The different colours work together in harmony."
         ]
      },
      {
         "id": 58,
         "word": "harsh",
         "role": "adjective",
         "BrE": "/hɑːrʃ/",
         "AmE": "/hɑːrʃ/",
         "definition": "very strict or severe; unkind or cruel",
         "examples": [
            "The teacher gave a harsh punishment for a small mistake.",
            "The weather in the desert can be very harsh.",
            "His harsh words made her cry."
         ]
      },
      {
         "id": 58,
         "word": "harvest",
         "role": "noun, verb",
         "BrE": "/ˈhɑːvɪst/",
         "AmE": "/ˈhɑːrvɪst/",
         "definition": "the time when crops are gathered; to gather crops",
            "examples": [
            "Farmers work hard during the harvest season.",
            "They harvested the wheat before the rain came.",
         "This year’s harvest was very good."
         ]
      },
      {
         "id": 58,
         "word": "hatred",
         "role": "noun",
         "BrE": "/ˈheɪtrɪd/",
         "AmE": "/ˈheɪtrəd/",
         "definition": "a strong feeling of dislike or hate",
         "examples": [
            "There is deep hatred between the two families.",
            "Hatred can lead to violence if not controlled.",
            "She spoke with hatred in her voice."
         ]
      },
      {
         "id": 58,
         "word": "haunt",
         "role": "verb",
         "BrE": "/hɔːnt/",
         "AmE": "/hɔːnt/",
         "definition": "to visit often or repeatedly; to trouble someone's mind",
         "examples": [
            "The old house is said to be haunted by a ghost.",
            "Memories of the accident still haunt him.",
            "That song keeps haunting my thoughts."
         ]
      },
      {
         "id": 58,
         "word": "hazard",
         "role": "noun",
         "BrE": "/ˈhæzəd/",
         "AmE": "/ˈhæzərd/",
         "definition": "a danger or risk",
         "examples": [
            "Smoking is a health hazard.",
            "Workers must wear safety gear to avoid any hazard.",
            "Floods are a common hazard in this area."
         ]
      },
      {
         "id": 58,
         "word": "heighten",
         "role": "verb",
         "BrE": "/ˈhaɪtn/",
         "AmE": "/ˈhaɪtn/",
         "definition": "to make something stronger or more intense",
         "examples": [
            "The music heightened the feeling of excitement.",
            "Stress can heighten anxiety.",
            "The news report heightened public fear."
         ]
      },
      {
         "id": 58,
         "word": "heritage",
         "role": "noun",
         "BrE": "/ˈherɪtɪdʒ/",
         "AmE": "/ˈherətɪdʒ/",
         "definition": "something handed down from the past, such as tradition or culture",
         "examples": [
            "The old castle is part of our national heritage.",
            "She is proud of her cultural heritage.",
            "Protecting heritage sites is important."
         ]
      },
      {
         "id": 58,
         "word": "hierarchy",
         "role": "noun",
         "BrE": "/ˈhaɪərɑːki/",
         "AmE": "/ˈhaɪərɑːrki/",
         "definition": "an organization where people are ranked one above another",
         "examples": [
            "In the company hierarchy, managers are above workers.",
            "The military has a strict hierarchy.",
            "He moved up the hierarchy quickly."
         ]
      },
      {
         "id": 58,
         "word": "high-profile",
         "role": "adjective",
         "BrE": "/ˌhaɪ ˈprəʊfaɪl/",
         "AmE": "/ˌhaɪ ˈproʊfaɪl/",
         "definition": "receiving a lot of public attention",
         "examples": [
            "It was a high-profile wedding covered by all the media.",
            "She works on high-profile cases as a lawyer.",
            "The celebrity made a high-profile visit to the school."
         ]
      },
      {
         "id": 58,
         "word": "hint",
         "role": "noun, verb",
         "BrE": "/hɪnt/",
         "AmE": "/hɪnt/",
         "definition": "a small sign or suggestion; to suggest something indirectly",
         "examples": [
            "He gave me a hint about the surprise party.",
            "There was a hint of sadness in her smile.",
            "She hinted that she might quit her job."
         ]
      },
      {
         "id": 59,
         "word": "homeland",
         "role": "noun",
         "BrE": "/ˈhəʊmlænd/",
         "AmE": "/ˈhoʊmlænd/",
         "definition": "the country where a person was born or where their family comes from",
         "examples": [
            "They moved back to their homeland after many years abroad.",
            "Immigrants often keep strong ties to their homeland.",
            "The festival celebrates the culture of our homeland."
         ]
      },
      {
         "id": 59,
         "word": "hook",
         "role": "verb",
         "BrE": "/hʊk/",
         "AmE": "/hʊk/",
         "definition": "to catch or attach something with a hook; to attract interest",
         "examples": [
            "He hooked the fish with a small rod.",
            "The song has a catchy hook that stays in your head.",
            "She hooked the bag onto the chair."
         ]
      },
      {
         "id": 59,
         "word": "hopeful",
         "role": "adjective",
         "BrE": "/ˈhəʊpfʊl/",
         "AmE": "/ˈhoʊpfəl/",
         "definition": "feeling or giving hope",
         "examples": [
            "She gave a hopeful smile before the test results came.",
            "We are hopeful that the weather will improve.",
            "Many hopefuls tried out for the acting role."
         ]
      },
      {
         "id": 59,
         "word": "horizon",
         "role": "noun",
         "BrE": "/həˈraɪzən/",
         "AmE": "/həˈraɪzn/",
         "definition": "the line where the earth seems to meet the sky",
         "examples": [
            "The sun disappeared below the horizon.",
            "A ship appeared on the horizon.",
            "We watched the sunrise from the beach, looking at the horizon."
         ]
      },
      {
         "id": 59,
         "word": "horn",
         "role": "noun",
         "BrE": "/hɔːn/",
         "AmE": "/hɔːrn/",
         "definition": "a hard, pointed growth on an animal's head; a loud sound device",
         "examples": [
            "The bull lowered its horns ready to attack.",
            "Please don’t blow the car horn late at night.",
            "The rhino has two horns on its nose."
         ]
      },
      {
         "id": 59,
         "word": "hostage",
         "role": "noun",
         "BrE": "/ˈhəʊstɪdʒ/",
         "AmE": "/ˈhoʊstɪdʒ/",
         "definition": "a person held captive to force others to do something",
         "examples": [
            "The kidnappers demanded money for the hostage’s release.",
            "Three hostages were rescued by the police.",
            "He was taken hostage during the robbery."
         ]
      },
      {
         "id": 59,
         "word": "hostile",
         "role": "adjective",
         "BrE": "/ˈhɒstaɪl/",
         "AmE": "/ˈhɑːstaɪl/",
         "definition": "unfriendly or aggressive",
         "examples": [
            "The crowd gave a hostile reaction to the politician.",
            "They were in a hostile environment with no support.",
            "She gave a hostile look when interrupted."
         ]
      },
      {
         "id": 59,
         "word": "hostility",
         "role": "noun",
         "BrE": "/hɒˈstɪləti/",
         "AmE": "/hɑːˈstɪləti/",
         "definition": "unfriendly or aggressive behavior",
         "examples": [
            "There was open hostility between the two groups.",
            "He responded with hostility when questioned.",
            "Years of hostility ended with a peace agreement."
         ]
      },
      {
         "id": 59,
         "word": "humanitarian",
         "role": "adjective",
         "BrE": "/hjuːˌmænɪˈteəriən/",
         "AmE": "/hjuːˌmænɪˈteriən/",
         "definition": "helping people in need, especially during crises",
         "examples": [
            "The organization provides humanitarian aid to refugees.",
            "She works for a humanitarian mission in Africa.",
            "They sent humanitarian supplies after the earthquake."
         ]
      },
      {
         "id": 59,
         "word": "humanity",
         "role": "noun",
         "BrE": "/hjuːˈmænəti/",
         "AmE": "/hjuːˈmænəti/",
         "definition": "the human race; kindness and compassion",
         "examples": [
            "The invention changed the course of humanity.",
            "Even in war, we must not lose our humanity.",
            "Acts of kindness show the best of humanity."
         ]
      },
      {
         "id": 60,
         "word": "humble",
         "role": "adjective",
         "BrE": "/ˈhʌmbl/",
         "AmE": "/ˈhʌmbl/",
         "definition": "not proud or arrogant; modest",
         "examples": [
            "Despite his fame, he remained humble.",
            "She gave a humble speech after winning the award.",
            "A humble beginning led to great success."
         ]
      },
      {
         "id": 60,
         "word": "hydrogen",
         "role": "noun",
         "BrE": "/ˈhaɪdrədʒən/",
         "AmE": "/ˈhaɪdrədʒən/",
         "definition": "a light, colourless gas that burns easily; the simplest chemical element",
         "examples": [
            "Water is made of hydrogen and oxygen.",
            "Hydrogen is used as fuel in some cars.",
            "The sun produces energy by combining hydrogen atoms."
         ]
      },
      {
         "id": 60,
         "word": "identification",
         "role": "noun",
         "BrE": "/aɪˌdentɪfɪˈkeɪʃən/",
         "AmE": "/aɪˌdentɪfɪˈkeɪʃən/",
         "definition": "the act of recognizing or proving who someone is",
         "examples": [
            "You need photo ID for identification at the airport.",
            "The police used fingerprints for identification.",
            "Clear identification is required to open a bank account."
         ]
      },
      {
         "id": 60,
         "word": "ideological",
         "role": "adjective",
         "BrE": "/ˌaɪdiəˈlɒdʒɪkl/",
         "AmE": "/ˌaɪdiəˈlɑːdʒɪkl/",
         "definition": "related to a system of ideas, especially about politics or society",
         "examples": [
            "The two parties have very different ideological views.",
            "Their split was caused by ideological differences.",
            "He gave an ideological speech about freedom."
         ]
      },
      {
         "id": 60,
         "word": "ideology",
         "role": "noun",
         "BrE": "/ˌaɪdiˈɒlədʒi/",
         "AmE": "/ˌaɪdiˈɑːlədʒi/",
         "definition": "a set of beliefs or ideas that shape a political or social system",
         "examples": [
            "Marxism is a well-known political ideology.",
            "Her ideology influences how she votes.",
            "The group shares a common ideology."
         ]
      },
      {
         "id": 60,
         "word": "idiot",
         "role": "noun",
         "BrE": "/ˈɪdiət/",
         "AmE": "/ˈɪdiət/",
         "definition": "a stupid or foolish person",
         "examples": [
            "Don’t be such an idiot — that’s dangerous!",
            "He acted like an idiot at the party.",
            "Calling someone an idiot is not kind."
         ]
      },
      {
         "id": 60,
         "word": "ignorance",
         "role": "noun",
         "BrE": "/ˈɪɡnərəns/",
         "AmE": "/ˈɪɡnərəns/",
         "definition": "lack of knowledge or awareness",
         "examples": [
            "Ignorance of the law is not an excuse.",
            "His ignorance about history surprised everyone.",
            "Education helps reduce ignorance."
         ]
      },
      {
         "id": 60,
         "word": "imagery",
         "role": "noun",
         "BrE": "/ˈɪmɪdʒəri/",
         "AmE": "/ˈɪmɪdʒəri/",
         "definition": "vivid descriptive language that creates pictures in the mind",
         "examples": [
            "The poem uses beautiful imagery of nature.",
            "The writer’s imagery made the scene come alive.",
            "Religious imagery was used in the painting."
         ]
      },
      {
         "id": 60,
         "word": "immense",
         "role": "adjective",
         "BrE": "/ɪˈmens/",
         "AmE": "/ɪˈmens/",
         "definition": "very large or great",
         "examples": [
            "The mountain has an immense size.",
            "She felt immense joy when she saw her family.",
            "The project requires immense effort."
         ]
      },
      {
         "id": 60,
         "word": "imminent",
         "role": "adjective",
         "BrE": "/ˈɪmɪnənt/",
         "AmE": "/ˈɪmɪnənt/",
         "definition": "about to happen very soon",
         "examples": [
            "Storm clouds showed that rain was imminent.",
            "There was fear of imminent danger.",
            "An imminent decision will be announced tomorrow."
         ]
      },

      {
         "id": 61,
         "word": "implementation",
         "role": "noun",
         "BrE": "/ˌɪmplɪmenˈteɪʃən/",
         "AmE": "/ˌɪmpləmenˈteɪʃən/",
         "definition": "the process of putting a plan or system into action",
         "examples": [
            "The implementation of the new rules took six months.",
            "Good planning is needed for successful implementation.",
            "Teachers helped with the implementation of the new curriculum."
         ]
      },
      {
         "id": 61,
         "word": "imprison",
         "role": "verb",
         "BrE": "/ɪmˈprɪzn/",
         "AmE": "/ɪmˈprɪzn/",
         "definition": "to put someone in prison",
         "examples": [
            "He was imprisoned for stealing a car.",
            "Political activists were imprisoned without trial.",
            "They imprisoned the spy until the war ended."
         ]
      },
      {
         "id": 61,
         "word": "imprisonment",
         "role": "noun",
         "BrE": "/ɪmˈprɪznmənt/",
         "AmE": "/ɪmˈprɪznmənt/",
         "definition": "the state of being in prison",
         "examples": [
            "His imprisonment lasted ten years.",
            "Life imprisonment means staying in prison forever.",
            "She spoke out against unfair imprisonment."
         ]
      },
      {
         "id": 61,
         "word": "inability",
         "role": "noun",
         "BrE": "/ˌɪnəˈbɪləti/",
         "AmE": "/ˌɪnəˈbɪləti/",
         "definition": "the lack of ability to do something",
         "examples": [
            "His inability to swim made the trip risky.",
            "The pilot’s inability to see caused the crash.",
            "She showed patience despite her son’s inability to focus."
         ]
      },
      {
         "id": 61,
         "word": "inadequate",
         "role": "adjective",
         "BrE": "/ɪnˈædɪkwət/",
         "AmE": "/ɪnˈædɪkwət/",
         "definition": "not good enough or not enough in amount",
         "examples": [
            "The shelter provided inadequate protection from the cold.",
            "Their response was inadequate to solve the problem.",
            "He received inadequate training for the job."
         ]
      },
      {
         "id": 61,
         "word": "inappropriate",
         "role": "adjective",
         "BrE": "/ˌɪnəˈprəʊpriət/",
         "AmE": "/ˌɪnəˈproʊpriət/",
         "definition": "not suitable or acceptable for a situation",
         "examples": [
            "His jokes were inappropriate for a formal meeting.",
            "Wearing sandals to a wedding is considered inappropriate.",
            "She made an inappropriate comment and apologized later."
         ]
      },
      {
         "id": 61,
         "word": "incidence",
         "role": "noun",
         "BrE": "/ˈɪnsɪdəns/",
         "AmE": "/ˈɪnsədəns/",
         "definition": "how often something happens",
         "examples": [
            "The incidence of flu has increased this winter.",
            "There is a high incidence of smoking in the area.",
            "We are tracking the incidence of cyberattacks."
         ]
      },
      {
         "id": 61,
         "word": "inclined",
         "role": "adjective",
         "BrE": "/ɪnˈklaɪnd/",
         "AmE": "/ɪnˈklaɪnd/",
         "definition": "having a tendency or preference to do something",
         "examples": [
            "I’m inclined to agree with your opinion.",
            "She is inclined to help others without being asked.",
            "He’s not inclined to take risks."
         ]
      },
      {
         "id": 61,
         "word": "inclusion",
         "role": "noun",
         "BrE": "/ɪnˈkluːʒən/",
         "AmE": "/ɪnˈkluːʒən/",
         "definition": "the act of including someone or something",
         "examples": [
            "The school promotes inclusion of all students.",
            "Diversity and inclusion are important in the workplace.",
            "Her inclusion in the team made everyone happy."
         ]
      },
      {
         "id": 61,
         "word": "incur",
         "role": "verb",
         "BrE": "/ɪnˈkɜːr/",
         "AmE": "/ɪnˈkɜːr/",
         "definition": "to become subject to something, usually something unpleasant",
         "examples": [
            "The company incurred heavy losses last year.",
            "You may incur a fine if you return the book late.",
            "He incurred the anger of his boss by being late."
         ]
      },
      {
         "id": 62,
         "word": "indicator",
         "role": "noun",
         "BrE": "/ˈɪndɪkeɪtər/",
         "AmE": "/ˈɪndɪkeɪtər/",
         "definition": "something that shows the state or level of something else",
         "examples": [
            "The temperature is a good indicator of climate change.",
            "High unemployment is an indicator of economic trouble.",
            "This number is a key indicator of success."
         ]
      },
      {
         "id": 62,
         "word": "indictment",
         "role": "noun",
         "BrE": "/ɪnˈdaɪtmənt/",
         "AmE": "/ɪnˈdaɪtmənt/",
         "definition": "a formal charge that someone has committed a crime",
         "examples": [
            "He faced an indictment for fraud.",
            "The grand jury issued an indictment against the official.",
            "The report was seen as an indictment of government policy."
         ]
      },
      {
         "id": 62,
         "word": "indigenous",
         "role": "adjective",
         "BrE": "/ɪnˈdɪdʒɪnəs/",
         "AmE": "/ɪnˈdɪdʒənəs/",
         "definition": "originally from a particular place; native",
         "examples": [
            "The Maori are indigenous people of New Zealand.",
            "This plant is indigenous to South America.",
            "The government protects the rights of indigenous communities."
         ]
      },
      {
         "id": 62,
         "word": "induce",
         "role": "verb",
         "BrE": "/ɪnˈdjuːs/",
         "AmE": "/ɪnˈduːs/",
         "definition": "to cause something to happen",
         "examples": [
            "The drug can induce sleep quickly.",
            "The teacher used games to induce interest in math.",
            "Stress can induce health problems."
         ]
      },
      {
         "id": 62,
         "word": "indulge",
         "role": "verb",
         "BrE": "/ɪnˈdʌldʒ/",
         "AmE": "/ɪnˈdʌldʒ/",
         "definition": "to allow oneself to enjoy something, especially food or pleasure",
         "examples": [
            "I indulged in a piece of chocolate cake.",
            "Parents sometimes indulge their children too much.",
            "She likes to indulge in long baths after work."
         ]
      },
      {
         "id": 62,
         "word": "inequality",
         "role": "noun",
         "BrE": "/ˌɪnɪˈkwɒləti/",
         "AmE": "/ˌɪnɪˈkwɑːləti/",
         "definition": "the state of being unequal, especially in rights or opportunities",
         "examples": [
            "Social inequality affects many parts of life.",
            "The report highlights income inequality in cities.",
            "Education can help reduce inequality."
         ]
      },
      {
         "id": 62,
         "word": "infamous",
         "role": "adjective",
         "BrE": "/ɪnˈfeɪməs/",
         "AmE": "/ɪnˈfeɪməs/",
         "definition": "famous for something bad",
         "examples": [
            "Al Capone was an infamous gangster.",
            "The building is infamous for its poor safety record.",
            "She became infamous after the scandal."
         ]
      },
      {
         "id": 62,
         "word": "infant",
         "role": "noun",
         "BrE": "/ˈɪnfənt/",
         "AmE": "/ˈɪnfənt/",
         "definition": "a very young baby, especially under one year old",
         "examples": [
            "The hospital has a special unit for newborn infants.",
            "Infants need a lot of care and attention.",
            "The law protects the rights of infants."
         ]
      },
      {
         "id": 62,
         "word": "infect",
         "role": "verb",
         "BrE": "/ɪnˈfekt/",
         "AmE": "/ɪnˈfekt/",
         "definition": "to make someone sick with a virus or bacteria",
         "examples": [
            "The virus can infect people through the air.",
            "He infected the wound by not cleaning it.",
            "Mosquitoes can infect people with malaria."
         ]
      },
      {
         "id": 62,
         "word": "inflict",
         "role": "verb",
         "BrE": "/ɪnˈflɪkt/",
         "AmE": "/ɪnˈflɪkt/",
         "definition": "to cause something painful or harmful to happen to someone",
         "examples": [
            "The attacker inflicted serious injuries.",
            "War inflicts great suffering on civilians.",
            "She didn’t mean to inflict emotional pain."
         ]
      },
      {
         "id": 63,
         "word": "influential",
         "role": "adjective",
         "BrE": "/ˌɪnfluˈenʃəl/",
         "AmE": "/ˌɪnfluˈenʃəl/",
         "definition": "having the power to affect people or events",
         "examples": [
            "She is an influential leader in the tech industry.",
            "The book was influential in changing public opinion.",
            "An influential friend helped him get the job."
         ]
      },
      {
         "id": 63,
         "word": "inherent",
         "role": "adjective",
         "BrE": "/ɪnˈhɪərənt/",
         "AmE": "/ɪnˈhɪrənt/",
         "definition": "a natural part of something; built-in",
         "examples": [
            "Risk is inherent in any new business.",
            "Honesty is an inherent quality in her personality.",
            "There are inherent problems with this design."
         ]
      },
      {
         "id": 63,
         "word": "inhibit",
         "role": "verb",
         "BrE": "/ɪnˈhɪbɪt/",
         "AmE": "/ɪnˈhɪbɪt/",
         "definition": "to prevent or slow down something",
         "examples": [
            "Fear can inhibit learning.",
            "Rules are meant to inhibit dangerous behavior.",
            "The drug inhibits the growth of bacteria."
         ]
      },
      {
         "id": 63,
         "word": "initiate",
         "role": "verb",
         "BrE": "/ɪˈnɪʃieɪt/",
         "AmE": "/ɪˈnɪʃieɪt/",
         "definition": "to begin or start something",
         "examples": [
            "They initiated a new program to help students.",
            "The company initiated changes in management.",
            "She initiated the conversation politely."
         ]
      },
      {
         "id": 63,
         "word": "inject",
         "role": "verb",
         "BrE": "/ɪnˈdʒekt/",
         "AmE": "/ɪnˈdʒekt/",
         "definition": "to put a liquid into the body using a needle",
         "examples": [
            "The nurse injected the medicine into his arm.",
            "Doctors inject vaccines to prevent disease.",
            "He was injected with a painkiller."
         ]
      },
      {
         "id": 63,
         "word": "injection",
         "role": "noun",
         "BrE": "/ɪnˈdʒekʃən/",
         "AmE": "/ɪnˈdʒekʃən/",
         "definition": "the act of putting medicine into the body with a needle",
         "examples": [
            "She got an injection to prevent the flu.",
            "The dog needs monthly injections for its condition.",
            "Some people are afraid of injections."
         ]
      },
      {
         "id": 63,
         "word": "injustice",
         "role": "noun",
         "BrE": "/ɪnˈdʒʌstɪs/",
         "AmE": "/ɪnˈdʒʌstɪs/",
         "definition": "unfair treatment",
         "examples": [
            "The protest was about racial injustice.",
            "He suffered a great injustice when wrongly jailed.",
            "Fighting injustice is a goal of many activists."
         ]
      },
      {
         "id": 63,
         "word": "inmate",
         "role": "noun",
         "BrE": "/ˈɪnmeɪt/",
         "AmE": "/ˈɪnmeɪt/",
         "definition": "a person living in a prison or institution",
         "examples": [
            "The inmate was allowed to see his family once a month.",
            "Some inmates work while in prison.",
            "The facility houses over 200 inmates."
         ]
      },
      {
         "id": 63,
         "word": "insertion",
         "role": "noun",
         "BrE": "/ɪnˈsɜːʃən/",
         "AmE": "/ɪnˈsɜːrʒən/",
         "definition": "the act of putting something into something else",
         "examples": [
            "The insertion of the tube was quick and painless.",
            "There was a small insertion in the document.",
            "Precision is needed for the insertion of the device."
         ]
      },
      {
         "id": 63,
         "word": "insider",
         "role": "noun",
         "BrE": "/ˈɪnsaɪdər/",
         "AmE": "/ˈɪnsaɪdər/",
         "definition": "a person who is part of a group and knows its secrets",
         "examples": [
            "An insider leaked the company’s plans.",
            "Only insiders knew about the surprise event.",
            "Insider trading is against the law."
         ]
      },
      {
         "id": 64,
         "word": "inspect",
         "role": "verb",
         "BrE": "/ɪnˈspekt/",
         "AmE": "/ɪnˈspekt/",
         "definition": "to examine something carefully",
         "examples": [
            "The mechanic inspected the car before the trip.",
            "Health officials inspected the restaurant.",
            "They inspected the building for damage."
         ]
      },
      {
         "id": 64,
         "word": "inspection",
         "role": "noun",
         "BrE": "/ɪnˈspekʃən/",
         "AmE": "/ɪnˈspekʃən/",
         "definition": "a careful examination",
         "examples": [
            "The house passed the safety inspection.",
            "Regular inspection of equipment is required.",
            "The teacher made a surprise inspection of the classroom."
         ]
      },
      {
         "id": 64,
         "word": "inspiration",
         "role": "noun",
         "BrE": "/ˌɪnspəˈreɪʃən/",
         "AmE": "/ˌɪnspəˈreɪʃən/",
         "definition": "a feeling that makes someone want to create or do something",
         "examples": [
            "Nature is a source of inspiration for many artists.",
            "She was an inspiration to young athletes.",
            "His speech was full of inspiration and hope."
         ]
      },
      {
         "id": 64,
         "word": "instinct",
         "role": "noun",
         "BrE": "/ˈɪnstɪŋkt/",
         "AmE": "/ˈɪnstɪŋkt/",
         "definition": "a natural feeling or reaction that makes you do something without thinking",
         "examples": [
            "A mother’s instinct is to protect her child.",
            "He had an instinct that something was wrong.",
            "Birds migrate by instinct."
         ]
      },
      {
         "id": 64,
         "word": "institutional",
         "role": "adjective",
         "BrE": "/ˌɪnstɪˈtjuːʃənəl/",
         "AmE": "/ˌɪnstəˈtuːʃənəl/",
         "definition": "related to a large organization or system",
         "examples": [
            "Institutional racism is hard to change.",
            "The report criticized the institutional failures.",
            "She works in institutional finance."
         ]
      },
      {
         "id": 64,
         "word": "instruct",
         "role": "verb",
         "BrE": "/ɪnˈstrʌkt/",
         "AmE": "/ɪnˈstrʌkt/",
         "definition": "to teach or give directions to someone",
         "examples": [
            "The teacher instructed the students to open their books.",
            "He was instructed not to leave the room.",
            "The manual instructs you how to assemble the chair."
         ]
      },
      {
         "id": 64,
         "word": "instrumental",
         "role": "adjective",
         "BrE": "/ˌɪnstrəˈmentl/",
         "AmE": "/ˌɪnstrəˈmentl/",
         "definition": "very important in making something happen",
         "examples": [
            "She was instrumental in organizing the event.",
            "His advice was instrumental in my success.",
            "Technology has been instrumental in improving healthcare."
         ]
      },
      {
         "id": 64,
         "word": "insufficient",
         "role": "adjective",
         "BrE": "/ˌɪnsəˈfɪʃənt/",
         "AmE": "/ˌɪnsəˈfɪʃənt/",
         "definition": "not enough",
         "examples": [
            "There was insufficient evidence to convict him.",
            "The food was insufficient for all the guests.",
            "They had insufficient time to finish the test."
         ]
      },
      {
         "id": 64,
         "word": "insult",
         "role": "noun, verb",
         "BrE": "/ˈɪnsʌlt/",
         "AmE": "/ˈɪnsʌlt/",
         "definition": "a rude remark; to say or do something offensive",
         "examples": [
            "Calling him lazy was a serious insult.",
            "She insulted him by laughing at his idea.",
            "He took the comment as an insult."
         ]
      },
      {
         "id": 64,
         "word": "intact",
         "role": "adjective",
         "BrE": "/ɪnˈtækt/",
         "AmE": "/ɪnˈtækt/",
         "definition": "whole and not damaged",
         "examples": [
            "The ancient pot was found intact.",
            "Despite the crash, the box remained intact.",
            "She kept her dignity intact after the criticism."
         ]
      },
      {
         "id": 65,
         "word": "intake",
         "role": "noun",
         "BrE": "/ˈɪnteɪk/",
         "AmE": "/ˈɪnteɪk/",
         "definition": "the amount of something taken in, especially food or students",
         "examples": [
            "Your daily water intake should be about two litres.",
            "The university’s student intake has increased.",
            "Doctors monitor the patient’s food intake."
         ]
      },
      {
         "id": 65,
         "word": "integral",
         "role": "adjective",
         "BrE": "/ˈɪntɪɡrəl/",
         "AmE": "/ˈɪntəɡrəl/",
         "definition": "necessary and important as part of a whole",
         "examples": [
            "Teamwork is integral to success.",
            "Trust is an integral part of any relationship.",
            "She played an integral role in the project."
         ]
      },
      {
         "id": 65,
         "word": "integrated",
         "role": "adjective",
         "BrE": "/ˈɪntɪɡreɪtɪd/",
         "AmE": "/ˈɪntəɡreɪtɪd/",
         "definition": "combined into a whole; working together",
         "examples": [
            "The school has an integrated system of teaching.",
            "The new software is fully integrated with old systems.",
            "An integrated approach solves problems better."
         ]
      },
      {
         "id": 65,
         "word": "integration",
         "role": "noun",
         "BrE": "/ˌɪntɪˈɡreɪʃən/",
         "AmE": "/ˌɪntəˈɡreɪʃən/",
         "definition": "the process of combining things into a whole",
         "examples": [
            "Racial integration improved school quality.",
            "The integration of technology changed the office.",
            "Full integration took several years."
         ]
      },
      {
         "id": 65,
         "word": "integrity",
         "role": "noun",
         "BrE": "/ɪnˈteɡrəti/",
         "AmE": "/ɪnˈteɡrəti/",
         "definition": "honesty and strong moral principles",
         "examples": [
            "He is a man of great integrity.",
            "The judge is known for her professional integrity.",
            "Integrity is more important than winning."
         ]
      },
      {
         "id": 65,
         "word": "intellectual",
         "role": "noun",
         "BrE": "/ˌɪntəˈlektʃuəl/",
         "AmE": "/ˌɪntəˈlektʃuəl/",
         "definition": "a person who thinks deeply and values knowledge",
         "examples": [
            "She is a leading intellectual in philosophy.",
            "The book is popular among intellectuals.",
            "Many intellectuals supported the new policy."
         ]
      },
      {
         "id": 65,
         "word": "intensify",
         "role": "verb",
         "BrE": "/ɪnˈtensɪfaɪ/",
         "AmE": "/ɪnˈtensɪfaɪ/",
         "definition": "to make or become stronger or more extreme",
         "examples": [
            "The storm intensified overnight.",
            "Criticism intensified after the mistake.",
            "Training intensifies before the competition."
         ]
      },
      {
         "id": 65,
         "word": "intensity",
         "role": "noun",
         "BrE": "/ɪnˈtensəti/",
         "AmE": "/ɪnˈtensəti/",
         "definition": "the degree of strength or power",
         "examples": [
            "The intensity of the light hurt my eyes.",
            "The race was run with great intensity.",
            "Emotions reached a high intensity during the argument."
         ]
      },
      {
         "id": 65,
         "word": "intensive",
         "role": "adjective",
         "BrE": "/ɪnˈtensɪv/",
         "AmE": "/ɪnˈtensɪv/",
         "definition": "needing a lot of effort or focus in a short time",
         "examples": [
            "She took an intensive English course.",
            "The patient is in intensive care.",
            "The training was intensive but effective."
         ]
      },
      {
         "id": 65,
         "word": "intent",
         "role": "noun",
         "BrE": "/ɪnˈtent/",
         "AmE": "/ɪnˈtent/",
         "definition": "the purpose or plan behind an action",
         "examples": [
            "His intent was to help, not hurt.",
            "The law looks at the criminal’s intent.",
            "She spoke with the intent of making peace."
         ]
      },
      {
         "id": 66,
         "word": "interactive",
         "role": "adjective",
         "BrE": "/ˌɪntəˈræktɪv/",
         "AmE": "/ˌɪntəˈræktɪv/",
         "definition": "involving communication between people and machines or each other",
         "examples": [
            "The museum has many interactive exhibits.",
            "Students enjoy interactive learning games.",
            "The app is designed to be interactive and fun."
         ]
      },
      {
         "id": 66,
         "word": "interface",
         "role": "noun",
         "BrE": "/ˈɪntəfeɪs/",
         "AmE": "/ˈɪntərfeɪs/",
         "definition": "a point where two systems or subjects meet and interact",
         "examples": [
            "The software has a user-friendly interface.",
            "There is a clear interface between design and engineering.",
            "The human-computer interface is key to usability."
         ]
      },
      {
         "id": 66,
         "word": "interfere",
         "role": "verb",
         "BrE": "/ˌɪntəˈfɪər/",
         "AmE": "/ˌɪntərˈfɪr/",
         "definition": "to get involved in a situation where you are not wanted",
         "examples": [
            "Don’t interfere in their private matters.",
            "Bad weather interfered with the flight.",
            "Parents should not interfere too much in schoolwork."
         ]
      },
      {
         "id": 66,
         "word": "interference",
         "role": "noun",
         "BrE": "/ˌɪntəˈfɪərəns/",
         "AmE": "/ˌɪntərˈfɪrəns/",
         "definition": "the act of getting involved in something that doesn’t concern you",
         "examples": [
            "Radio interference made the signal unclear.",
            "His interference caused the argument.",
            "No interference is allowed during the exam."
         ]
      },
      {
         "id": 66,
         "word": "interim",
         "role": "adjective",
         "BrE": "/ˈɪntərɪm/",
         "AmE": "/ˈɪntərɪm/",
         "definition": "temporary; for now until something permanent is decided",
         "examples": [
            "She was hired as the interim manager.",
            "They made interim plans while waiting for news.",
            "An interim report will be released next week."
         ]
      },
      {
         "id": 66,
         "word": "interior",
         "role": "adjective, noun",
         "BrE": "/ɪnˈtɪəriər/",
         "AmE": "/ɪnˈtɪriər/",
         "definition": "inside part of something; inner",
         "examples": [
            "The interior of the car was very clean.",
            "We painted the interior walls white.",
            "The country’s interior is mostly desert."
         ]
      },
      {
         "id": 66,
         "word": "intermediate",
         "role": "adjective",
         "BrE": "/ˌɪntəˈmiːdiət/",
         "AmE": "/ˌɪntərˈmiːdiət/",
         "definition": "in the middle between two levels; not beginner or advanced",
         "examples": [
            "She teaches intermediate French classes.",
            "This book is for intermediate learners.",
            "He has intermediate skills in coding."
         ]
      },
      {
         "id": 66,
         "word": "intervene",
         "role": "verb",
         "BrE": "/ˌɪntəˈviːn/",
         "AmE": "/ˌɪntərˈviːn/",
         "definition": "to get involved in a situation to change its outcome",
         "examples": [
            "The teacher had to intervene in the fight.",
            "Doctors intervened to save the patient’s life.",
            "The UN may intervene in the conflict."
         ]
      },
      {
         "id": 66,
         "word": "intervention",
         "role": "noun",
         "BrE": "/ˌɪntəˈvenʃən/",
         "AmE": "/ˌɪntərˈvenʃən/",
         "definition": "an action taken to improve or change a situation",
         "examples": [
            "Medical intervention saved the child.",
            "The government made an economic intervention.",
            "Family intervention helped him stop using drugs."
         ]
      },
      {
         "id": 66,
         "word": "intimate",
         "role": "adjective",
         "BrE": "/ˈɪntɪmət/",
         "AmE": "/ˈɪntəmət/",
         "definition": "very close and personal; private",
         "examples": [
            "They shared an intimate conversation.",
            "It was an intimate wedding with only close family.",
            "She keeps her feelings in intimate journals."
         ]
      },
      {
         "id": 67,
         "word": "intriguing",
         "role": "adjective",
         "BrE": "/ɪnˈtriːɡɪŋ/",
         "AmE": "/ɪnˈtriːɡɪŋ/",
         "definition": "very interesting because of being unusual or mysterious",
         "examples": [
            "The book has an intriguing plot.",
            "She gave an intriguing idea for the project.",
            "An intriguing smell came from the kitchen."
         ]
      },
      {
         "id": 67,
         "word": "investigator",
         "role": "noun",
         "BrE": "/ɪnˈvestɪɡeɪtər/",
         "AmE": "/ɪnˈvestɪɡeɪtər/",
         "definition": "a person who examines facts in a crime or problem",
         "examples": [
            "The investigator looked into the cause of the fire.",
            "Police hired a private investigator.",
            "She works as a financial investigator."
         ]
      },
      {
         "id": 67,
         "word": "invisible",
         "role": "adjective",
         "BrE": "/ɪnˈvɪzəbl/",
         "AmE": "/ɪnˈvɪzəbl/",
         "definition": "unable to be seen",
         "examples": [
            "The ink is invisible under normal light.",
            "Some gases are invisible but dangerous.",
            "She felt invisible at the party."
         ]
      },
      {
         "id": 67,
         "word": "invoke",
         "role": "verb",
         "BrE": "/ɪnˈvəʊk/",
         "AmE": "/ɪnˈvoʊk/",
         "definition": "to use a rule, law, or right; to cause a feeling or memory",
         "examples": [
            "He invoked his right to remain silent.",
            "The speech invoked strong emotions.",
            "They invoked an old law to stop the project."
         ]
      },
      {
         "id": 67,
         "word": "involvement",
         "role": "noun",
         "BrE": "/ɪnˈvɒlvmənt/",
         "AmE": "/ɪnˈvɑːlvmənt/",
         "definition": "taking part in something",
         "examples": [
            "His involvement in the project was crucial.",
            "Parental involvement helps children succeed.",
            "She denied any involvement in the crime."
         ]
      },
      {
         "id": 67,
         "word": "ironic",
         "role": "adjective",
         "BrE": "/aɪˈrɒnɪk/",
         "AmE": "/aɪˈrɑːnɪk/",
         "definition": "strange or funny because of the opposite of what was expected",
         "examples": [
            "It’s ironic that a fire station burned down.",
            "She smiled at the ironic twist in the story.",
            "He thanked me for being late — that was ironic."
         ]
      },
      {
         "id": 67,
         "word": "ironically",
         "role": "adverb",
         "BrE": "/aɪˈrɒnɪkli/",
         "AmE": "/aɪˈrɑːnɪkli/",
         "definition": "in a way that is strangely opposite to what is expected",
         "examples": [
            "Ironically, the shortest route took the longest time.",
            "He failed the test, ironically, after studying all night.",
            "Ironically, the doctor was sick."
         ]
      },
      {
         "id": 67,
         "word": "irony",
         "role": "noun",
         "BrE": "/ˈaɪrəni/",
         "AmE": "/ˈaɪrəni/",
         "definition": "a situation that is strange or funny because it is the opposite of what is expected",
         "examples": [
            "The irony is that he lost his job at a job centre.",
            "There’s a lot of irony in the movie’s ending.",
            "She laughed at the irony of it all."
         ]
      },
      {
         "id": 67,
         "word": "irrelevant",
         "role": "adjective",
         "BrE": "/ɪˈreləvənt/",
         "AmE": "/ɪˈreləvənt/",
         "definition": "not connected to the matter at hand",
         "examples": [
            "His opinion is irrelevant to our decision.",
            "The question was irrelevant to the topic.",
            "Please stick to relevant information."
         ]
      },
      {
         "id": 67,
         "word": "isolation",
         "role": "noun",
         "BrE": "/ˌaɪsəˈleɪʃən/",
         "AmE": "/ˌaɪsəˈleɪʃən/",
         "definition": "being alone or separated from others",
         "examples": [
            "Long-term isolation can affect mental health.",
            "The island lives in isolation from the mainland.",
            "He worked in isolation for weeks."
         ]
      },
      {
         "id": 68,
         "word": "judicial",
         "role": "adjective",
         "BrE": "/dʒuːˈdɪʃəl/",
         "AmE": "/dʒuːˈdɪʃəl/",
         "definition": "related to courts or judges",
         "examples": [
            "The judicial system protects people’s rights.",
            "Judicial decisions must be fair.",
            "She works in a judicial role."
         ]
      },
      {
         "id": 68,
         "word": "junction",
         "role": "noun",
         "BrE": "/ˈdʒʌŋkʃən/",
         "AmE": "/ˈdʒʌŋkʃən/",
         "definition": "a place where two or more things meet, especially roads",
         "examples": [
            "Take the next junction to the left.",
            "The accident happened at a busy junction.",
            "The railway lines meet at this junction."
         ]
      },
      {
         "id": 68,
         "word": "jurisdiction",
         "role": "noun",
         "BrE": "/ˌdʒʊərɪsˈdɪkʃən/",
         "AmE": "/ˌdʒʊrɪsˈdɪkʃən/",
         "definition": "the official power to make legal decisions and judgments",
         "examples": [
            "This court has jurisdiction over local crimes.",
            "The case falls outside our jurisdiction.",
            "Federal and state jurisdictions sometimes overlap."
         ]
      },
      {
         "id": 68,
         "word": "just",
         "role": "adjective",
         "BrE": "/dʒʌst/",
         "AmE": "/dʒʌst/",
         "definition": "fair and right; treating people equally",
         "examples": [
            "Everyone wants a just society.",
            "The judge made a just decision.",
            "It’s not just to punish the innocent."
         ]
      },
      {
         "id": 68,
         "word": "justification",
         "role": "noun",
         "BrE": "/ˌdʒʌstɪfɪˈkeɪʃən/",
         "AmE": "/ˌdʒʌstɪfɪˈkeɪʃən/",
         "definition": "a reason or explanation that shows something is right",
         "examples": [
            "There is no justification for violence.",
            "He gave a clear justification for his actions.",
            "The report questioned the justification for the war."
         ]
      },
      {
         "id": 68,
         "word": "kidnap",
         "role": "verb",
         "BrE": "/ˈkɪdnæp/",
         "AmE": "/ˈkɪdnæp/",
         "definition": "to take someone away by force",
         "examples": [
            "The criminal tried to kidnap the businessman.",
            "The child was kidnapped from outside school.",
            "Terrorists kidnapped several tourists."
         ]
      },
      {
         "id": 68,
         "word": "kidney",
         "role": "noun",
         "BrE": "/ˈkɪdni/",
         "AmE": "/ˈkɪdni/",
         "definition": "an organ in the body that removes waste from blood",
         "examples": [
            "He donated one of his kidneys to his brother.",
            "Drinking water helps your kidneys work well.",
            "Kidney disease can be serious."
         ]
      },
      {
         "id": 68,
         "word": "kingdom",
         "role": "noun",
         "BrE": "/ˈkɪŋdəm/",
         "AmE": "/ˈkɪŋdəm/",
         "definition": "a country ruled by a king or queen; a field or area",
         "examples": [
            "The United Kingdom is a kingdom.",
            "The lion is king of the animal kingdom.",
            "This topic is outside the kingdom of science."
         ]
      },
      {
         "id": 68,
         "word": "lad",
         "role": "noun",
         "BrE": "/læd/",
         "AmE": "/læd/",
         "definition": "a boy or young man",
         "examples": [
            "He’s a good lad who always helps others.",
            "The lads went to the football match.",
            "My little lad is starting school today."
         ]
      },
      {
         "id": 68,
         "word": "landlord",
         "role": "noun",
         "BrE": "/ˈlændlɔːd/",
         "AmE": "/ˈlændlɔːrd/",
         "definition": "a person who owns a property and rents it to others",
         "examples": [
            "The landlord fixed the broken heater.",
            "We pay our landlord every first of the month.",
            "Some landlords are more responsible than others."
         ]
      },
      {
         "id": 69,
         "word": "landmark",
         "role": "noun",
         "BrE": "/ˈlændmɑːk/",
         "AmE": "/ˈlændmɑːrk/",
         "definition": "an important event or achievement; a famous building",
         "examples": [
            "The treaty was a landmark in peace efforts.",
            "The Eiffel Tower is a famous landmark.",
            "Graduating was a personal landmark for her."
         ]
      },
      {
         "id": 69,
         "word": "lap",
         "role": "noun",
         "BrE": "/læp/",
         "AmE": "/læp/",
         "definition": "the top part of the legs when sitting; one round of a race",
         "examples": [
            "She put the cat on her lap.",
            "The baby fell asleep in his father’s lap.",
            "The race car completed its first lap."
         ]
      },
      {
         "id": 69,
         "word": "large-scale",
         "role": "adjective",
         "BrE": "/ˌlɑːdʒ ˈskeɪl/",
         "AmE": "/ˌlɑːrdʒ ˈskeɪl/",
         "definition": "very big in size or amount",
         "examples": [
            "The company plans a large-scale expansion.",
            "There was a large-scale protest in the city.",
            "Large-scale farming uses a lot of machines."
         ]
      },
      {
         "id": 69,
         "word": "laser",
         "role": "noun",
         "BrE": "/ˈleɪzər/",
         "AmE": "/ˈleɪzər/",
         "definition": "a narrow beam of light used in medicine, surgery, or technology",
         "examples": [
            "The doctor used a laser to fix the eye problem.",
            "Laser shows are popular at concerts.",
            "He pointed a laser at the screen to highlight the chart."
         ]
      },
      {
         "id": 69,
         "word": "latter",
         "role": "adjective, noun",
         "BrE": "/ˈlætər/",
         "AmE": "/ˈlætər/",
         "definition": "the second of two things mentioned",
         "examples": [
            "Between tea and coffee, I prefer the latter.",
            "The plan had many risks, and the latter part was the most dangerous.",
            "Of the two options, the latter seems better."
         ]
      },
      {
         "id": 69,
         "word": "lawn",
         "role": "noun",
         "BrE": "/lɔːn/",
         "AmE": "/lɔːn/",
         "definition": "an area of short, cut grass, usually near a house",
         "examples": [
            "The children played on the lawn.",
            "He mows the lawn every Saturday.",
            "The garden has a beautiful green lawn."
         ]
      },
      {
         "id": 69,
         "word": "lawsuit",
         "role": "noun",
         "BrE": "/ˈlɔːsuːt/",
         "AmE": "/ˈlɔːsuːt/",
         "definition": "a legal action brought in court",
         "examples": [
            "The company lost the lawsuit and had to pay money.",
            "She filed a lawsuit against her employer.",
            "The lawsuit lasted for two years."
         ]
      },
      {
         "id": 69,
         "word": "layout",
         "role": "noun",
         "BrE": "/ˈleɪaʊt/",
         "AmE": "/ˈleɪaʊt/",
         "definition": "the way something is arranged or organized",
         "examples": [
            "The layout of the kitchen is very efficient.",
            "They changed the layout of the website.",
            "The layout of the garden was beautifully designed."
         ]
      },
      {
         "id": 69,
         "word": "leak",
         "role": "verb, noun",
         "BrE": "/liːk/",
         "AmE": "/liːk/",
         "definition": "to let liquid or information escape; a hole that lets something out",
         "examples": [
            "The pipe started to leak water.",
            "There was a leak in the roof after the storm.",
            "A leak revealed the secret plans."
         ]
      },
      {
         "id": 69,
         "word": "leap",
         "role": "verb, noun",
         "BrE": "/liːp/",
         "AmE": "/liːp/",
         "definition": "to jump; a sudden increase or change",
         "examples": [
            "The cat leaped onto the table.",
            "He leaped over the fence.",
            "Sales showed a big leap this month."
         ]
      },
      {
         "id": 70,
         "word": "legacy",
         "role": "noun",
         "BrE": "/ˈleɡəsi/",
         "AmE": "/ˈleɡəsi/",
         "definition": "something left behind by someone, such as money or reputation",
         "examples": [
            "His legacy is the charity he started.",
            "The war left a legacy of pain.",
            "She inherited a financial legacy from her uncle."
         ]
      },
      {
         "id": 70,
         "word": "legendary",
         "role": "adjective",
         "BrE": "/ˈledʒəndəri/",
         "AmE": "/ˈledʒənderi/",
         "definition": "famous and celebrated, often in stories",
         "examples": [
            "He is a legendary football player.",
            "The restaurant is known for its legendary burgers.",
            "They told legendary tales of adventure."
         ]
      },
      {
         "id": 70,
         "word": "legislation",
         "role": "noun",
         "BrE": "/ˌledʒɪsˈleɪʃən/",
         "AmE": "/ˌledʒɪsˈleɪʃən/",
         "definition": "laws or rules made by a government",
         "examples": [
            "New legislation will ban smoking in public places.",
            "The legislation passed after much debate.",
            "Changes in legislation affect many businesses."
         ]
      },
      {
         "id": 70,
         "word": "legislative",
         "role": "adjective",
         "BrE": "/ˈledʒɪslətɪv/",
         "AmE": "/ˈledʒɪslətɪv/",
         "definition": "related to making laws",
         "examples": [
            "The president met with legislative leaders.",
            "The legislative process takes time.",
            "She works in the legislative branch of government."
         ]
      },
      {
         "id": 70,
         "word": "legislature",
         "role": "noun",
         "BrE": "/ˈledʒɪsleɪtʃər/",
         "AmE": "/ˈledʒɪsleɪtʃər/",
         "definition": "the group of people who make laws in a country or state",
         "examples": [
            "The state legislature voted on the new tax law.",
            "The national legislature meets in the capital.",
            "Members of the legislature are elected every four years."
         ]
      },
      {
         "id": 70,
         "word": "legitimate",
         "role": "adjective",
         "BrE": "/lɪˈdʒɪtɪmət/",
         "AmE": "/lɪˈdʒɪtɪmət/",
         "definition": "legal, valid, or fair",
         "examples": [
            "He is the legitimate owner of the house.",
            "The company has a legitimate reason for the delay.",
            "She raised a legitimate concern during the meeting."
         ]
      },
      {
         "id": 70,
         "word": "lengthy",
         "role": "adjective",
         "BrE": "/ˈleŋθi/",
         "AmE": "/ˈleŋθi/",
         "definition": "long in time or length",
         "examples": [
            "The movie was lengthy and boring.",
            "She gave a lengthy explanation.",
            "The process involves a lengthy application."
         ]
      },
      {
         "id": 70,
         "word": "lesbian",
         "role": "adjective",
         "BrE": "/ˈlezbiən/",
         "AmE": "/ˈlezbiən/",
         "definition": "a woman who is romantically or sexually attracted to other women",
         "examples": [
            "She is proud to be a lesbian.",
            "Lesbian rights are part of human rights.",
            "The film tells the story of a lesbian couple."
         ]
      },
      {
         "id": 70,
         "word": "lesser",
         "role": "adjective",
         "BrE": "/ˈlesər/",
         "AmE": "/ˈlesər/",
         "definition": "smaller in amount, value, or importance",
         "examples": [
            "The lesser of two evils is still bad.",
            "He suffered lesser injuries than others.",
            "This problem is of lesser concern."
         ]
      },
      {
         "id": 70,
         "word": "lethal",
         "role": "adjective",
         "BrE": "/ˈliːθəl/",
         "AmE": "/ˈliːθəl/",
         "definition": "able to cause death",
         "examples": [
            "The snake has a lethal bite.",
            "Lethal weapons are banned in many countries.",
            "The chemical proved lethal to insects."
         ]
      },

      {
         "id": 71,
         "word": "liable",
         "role": "adjective",
         "BrE": "/ˈlaɪəbl/",
         "AmE": "/ˈlaɪəbl/",
         "definition": "legally responsible for something; likely to do or experience something",
         "examples": [
            "The company is liable for the damages.",
            "He is liable to make mistakes when tired.",
            "Drivers are liable for their own insurance."
         ]
      },
      {
         "id": 71,
         "word": "liberal",
         "role": "adjective, noun",
         "BrE": "/ˈlɪbərəl/",
         "AmE": "/ˈlɪbərəl/",
         "definition": "open to new ideas; politically progressive; a person who holds such views",
         "examples": [
            "She has liberal views on education.",
            "The country adopted more liberal policies.",
            "He voted for the Liberal Party."
         ]
      },
      {
         "id": 71,
         "word": "liberation",
         "role": "noun",
         "BrE": "/ˌlɪbəˈreɪʃən/",
         "AmE": "/ˌlɪbəˈreɪʃən/",
         "definition": "the act of setting someone free from prison, oppression, or limits",
         "examples": [
            "The liberation of the city was celebrated with fireworks.",
            "Women’s liberation changed many laws.",
            "Mental liberation comes with self-awareness."
         ]
      },
      {
         "id": 71,
         "word": "liberty",
         "role": "noun",
         "BrE": "/ˈlɪbəti/",
         "AmE": "/ˈlɪbərti/",
         "definition": "freedom to live and act as you choose, within the law",
         "examples": [
            "Freedom of speech is a basic liberty.",
            "They fought for their political liberty.",
            "You have the liberty to accept or refuse."
         ]
      },
      {
         "id": 71,
         "word": "license",
         "role": "verb",
         "BrE": "/ˈlaɪsəns/",
         "AmE": "/ˈlaɪsns/",
         "definition": "to officially allow someone to do something or to have a permit",
         "examples": [
            "The state licenses doctors and lawyers.",
            "They licensed the software for public use.",
            "He was licensed to drive heavy vehicles."
         ]
      },
      {
         "id": 71,
         "word": "lifelong",
         "role": "adjective",
         "BrE": "/ˈlaɪflɒŋ/",
         "AmE": "/ˈlaɪflɔːŋ/",
         "definition": "lasting or existing all your life",
         "examples": [
            "She has a lifelong passion for music.",
            "It was a lifelong dream to visit Japan.",
            "They formed a lifelong friendship."
         ]
      },
      {
         "id": 71,
         "word": "likelihood",
         "role": "noun",
         "BrE": "/ˈlaɪklihʊd/",
         "AmE": "/ˈlaɪklihʊd/",
         "definition": "how likely something is to happen",
         "examples": [
            "There’s a high likelihood of rain tomorrow.",
            "The likelihood of success is good with practice.",
            "We assessed the likelihood of an accident."
         ]
      },
      {
         "id": 71,
         "word": "limb",
         "role": "noun",
         "BrE": "/lɪm/",
         "AmE": "/lɪm/",
         "definition": "an arm or leg of a person or animal; a large branch of a tree",
         "examples": [
            "He broke his limb during the fall.",
            "The monkey swung from limb to limb.",
            "A limb fell off the tree in the storm."
         ]
      },
      {
         "id": 71,
         "word": "linear",
         "role": "adjective",
         "BrE": "/ˈlɪniər/",
         "AmE": "/ˈlɪniər/",
         "definition": "arranged in a straight line or in a sequence",
         "examples": [
            "The story has a linear structure from start to end.",
            "Linear growth means steady increase.",
            "The path follows a linear route."
         ]
      },
      {
         "id": 71,
         "word": "line-up",
         "role": "noun",
         "BrE": "/ˈlaɪnʌp/",
         "AmE": "/ˈlaɪnʌp/",
         "definition": "a group of people or things arranged in order; a schedule of performers",
         "examples": [
            "The police showed the suspect in a line-up.",
            "The concert has an amazing line-up of bands.",
            "Our team’s line-up changed for the final match."
         ]
      },
      {
         "id": 72,
         "word": "linger",
         "role": "verb",
         "BrE": "/ˈlɪŋɡər/",
         "AmE": "/ˈlɪŋɡər/",
         "definition": "to stay in a place longer than necessary; to be slow to disappear",
         "examples": [
            "They lingered after class to ask questions.",
            "The smell of coffee lingered in the kitchen.",
            "Sadness lingered long after the event."
         ]
      },
      {
         "id": 72,
         "word": "listing",
         "role": "noun",
         "BrE": "/ˈlɪstɪŋ/",
         "AmE": "/ˈlɪstɪŋ/",
         "definition": "a record of something on a list; a description in a directory",
         "examples": [
            "Her house is on the real estate listing.",
            "Check the job listing for openings.",
            "The restaurant has an online listing with reviews."
         ]
      },
      {
         "id": 72,
         "word": "literacy",
         "role": "noun",
         "BrE": "/ˈlɪtərəsi/",
         "AmE": "/ˈlɪtərəsi/",
         "definition": "the ability to read and write",
         "examples": [
            "Adult literacy programs help many people.",
            "Digital literacy is important today.",
            "The country improved its literacy rate."
         ]
      },
      {
         "id": 72,
         "word": "liver",
         "role": "noun",
         "BrE": "/ˈlɪvər/",
         "AmE": "/ˈlɪvər/",
         "definition": "an organ in the body that cleans blood and stores energy",
         "examples": [
            "Alcohol can damage the liver.",
            "The patient needs a liver transplant.",
            "Doctors tested his liver function."
         ]
      },
      {
         "id": 72,
         "word": "lobby",
         "role": "noun, verb",
         "BrE": "/ˈlɒbi/",
         "AmE": "/ˈlɑːbi/",
         "definition": "a large entrance hall in a building; to try to influence politicians",
         "examples": [
            "We waited for her in the hotel lobby.",
            "Environmental groups lobbied for climate laws.",
            "The lobby of the theatre was crowded."
         ]
      },
      {
         "id": 72,
         "word": "log",
         "role": "noun, verb",
         "BrE": "/lɒɡ/",
         "AmE": "/lɔːɡ/",
         "definition": "a piece of wood from a tree; to record something",
         "examples": [
            "They used logs to build the cabin.",
            "He logged his daily exercise in a notebook.",
            "Please log in to your account."
         ]
      },
      {
         "id": 72,
         "word": "logic",
         "role": "noun",
         "BrE": "/ˈlɒdʒɪk/",
         "AmE": "/ˈlɑːdʒɪk/",
         "definition": "clear reasoning based on facts and rules",
         "examples": [
            "The argument made no logic at all.",
            "Mathematics teaches logical thinking.",
            "She explained her decision with solid logic."
         ]
      },
      {
         "id": 72,
         "word": "long-standing",
         "role": "adjective",
         "BrE": "/ˌlɒŋ ˈstændɪŋ/",
         "AmE": "/ˌlɔːŋ ˈstændɪŋ/",
         "definition": "existing for a very long time",
         "examples": [
            "They have a long-standing friendship.",
            "This is a long-standing rule in our family.",
            "The conflict has long-standing causes."
         ]
      },
      {
         "id": 72,
         "word": "long-time",
         "role": "adjective",
         "BrE": "/ˌlɒŋ ˈtaɪm/",
         "AmE": "/ˌlɔːŋ ˈtaɪm/",
         "definition": "having existed or continued for a long time",
         "examples": [
            "He’s a long-time supporter of the team.",
            "She’s my long-time neighbour.",
            "After a long-time wait, the results came."
         ]
      },
      {
         "id": 72,
         "word": "loom",
         "role": "verb",
         "BrE": "/luːm/",
         "AmE": "/luːm/",
         "definition": "to appear large and threatening, often suddenly",
         "examples": [
            "Storm clouds loomed on the horizon.",
            "The deadline loomed, and she hadn’t finished.",
            "A tall figure loomed in the dark doorway."
         ]
      },
      {
         "id": 73,
         "word": "loop",
         "role": "noun",
         "BrE": "/luːp/",
         "AmE": "/luːp/",
         "definition": "a shape that curves around and joins itself; a repeated cycle",
         "examples": [
            "The rollercoaster has a big loop.",
            "The video is on a continuous loop.",
            "He tied the rope in a tight loop."
         ]
      },
      {
         "id": 73,
         "word": "loyalty",
         "role": "noun",
         "BrE": "/ˈlɔɪəlti/",
         "AmE": "/ˈlɔɪəlti/",
         "definition": "strong support or faithfulness to a person, group, or cause",
         "examples": [
            "His loyalty to the team never changed.",
            "Loyalty is important in friendships.",
            "The dog showed great loyalty to its owner."
         ]
      },
      {
         "id": 73,
         "word": "machinery",
         "role": "noun",
         "BrE": "/məˈʃiːnəri/",
         "AmE": "/məˈʃiːnəri/",
         "definition": "machines used in industry or farming",
         "examples": [
            "Farmers use heavy machinery to plow fields.",
            "The factory’s machinery runs 24 hours a day.",
            "Old machinery needs regular maintenance."
         ]
      },
      {
         "id": 73,
         "word": "magical",
         "role": "adjective",
         "BrE": "/ˈmædʒɪkəl/",
         "AmE": "/ˈmædʒɪkəl/",
         "definition": "like magic; amazingly wonderful",
         "examples": [
            "The forest looked magical in the morning light.",
            "She had a magical voice that captivated everyone.",
            "It was a magical moment when they met."
         ]
      },
      {
         "id": 73,
         "word": "magistrate",
         "role": "noun",
         "BrE": "/ˈmædʒɪstreɪt/",
         "AmE": "/ˈmædʒɪstreɪt/",
         "definition": "a judge who handles minor legal cases",
         "examples": [
            "The magistrate sentenced the man to community service.",
            "Local crimes are often dealt with by a magistrate.",
            "She worked as a magistrate for ten years."
         ]
      },
      {
         "id": 73,
         "word": "magnetic",
         "role": "adjective",
         "BrE": "/mæɡˈnetɪk/",
         "AmE": "/mæɡˈnetɪk/",
         "definition": "having the power to attract; very charming",
         "examples": [
            "Magnets have a magnetic force.",
            "He has a magnetic personality.",
            "The magnetic field protects Earth from solar rays."
         ]
      },
      {
         "id": 73,
         "word": "magnitude",
         "role": "noun",
         "BrE": "/ˈmæɡnɪtjuːd/",
         "AmE": "/ˈmæɡnɪtuːd/",
         "definition": "the size or importance of something, especially a disaster or problem",
         "examples": [
            "The magnitude of the earthquake was 7.5.",
            "We didn’t understand the magnitude of the loss.",
            "The project’s magnitude required many workers."
         ]
      },
      {
         "id": 73,
         "word": "mainland",
         "role": "noun",
         "BrE": "/ˈmeɪnˌlænd/",
         "AmE": "/ˈmeɪnˌlænd/",
         "definition": "the main part of a country, not including islands",
         "examples": [
            "They took a ferry from the island to the mainland.",
            "Most people live on the mainland.",
            "The mainland climate is warmer than the coast."
         ]
      },
      {
         "id": 73,
         "word": "mainstream",
         "role": "noun, adjective",
         "BrE": "/ˈmeɪnstriːm/",
         "AmE": "/ˈmeɪnstriːm/",
         "definition": "the most common or accepted ideas, styles, or activities",
         "examples": [
            "Pop music is part of the mainstream.",
            "He prefers independent films over mainstream movies.",
            "The party moved toward mainstream politics."
         ]
      },
      {
         "id": 73,
         "word": "maintenance",
         "role": "noun",
         "BrE": "/ˈmeɪntənəns/",
         "AmE": "/ˈmeɪntənəns/",
         "definition": "the work needed to keep something in good condition",
         "examples": [
            "Car maintenance should be done regularly.",
            "The building needs urgent maintenance.",
            "Good health requires mental and physical maintenance."
         ]
      },
      {
         "id": 74,
         "word": "mandate",
         "role": "noun",
         "BrE": "/ˈmændeɪt/",
         "AmE": "/ˈmændeɪt/",
         "definition": "an official order or power to act, usually from voters or law",
         "examples": [
            "The president won a strong mandate in the election.",
            "The UN gave them a mandate to help refugees.",
            "The new policy was done without a public mandate."
         ]
      },
      {
         "id": 74,
         "word": "mandatory",
         "role": "adjective",
         "BrE": "/ˈmændətəri/",
         "AmE": "/ˈmændətɔːri/",
         "definition": "required by law or rules",
         "examples": [
            "Wearing seatbelts is mandatory.",
            "All employees must attend the mandatory training.",
            "Vaccination is mandatory in some schools."
         ]
      },
      {
         "id": 74,
         "word": "manifest",
         "role": "verb",
         "BrE": "/ˈmænɪfest/",
         "AmE": "/ˈmænɪfest/",
         "definition": "to show something clearly; to become visible",
         "examples": [
            "Symptoms of the disease began to manifest.",
            "His anger manifested in loud shouting.",
            "Hope manifested in the way they helped each other."
         ]
      },
      {
         "id": 74,
         "word": "manipulate",
         "role": "verb",
         "BrE": "/məˈnɪpjʊleɪt/",
         "AmE": "/məˈnɪpjuleɪt/",
         "definition": "to control or influence someone or something unfairly",
         "examples": [
            "He manipulated the data to support his theory.",
            "She felt he was trying to manipulate her.",
            "Puppets are manipulated by strings."
         ]
      },
      {
         "id": 74,
         "word": "manipulation",
         "role": "noun",
         "BrE": "/məˌnɪpjʊˈleɪʃən/",
         "AmE": "/məˌnɪpjuleɪʃən/",
         "definition": "the act of controlling or influencing someone unfairly",
         "examples": [
            "The manipulation of prices is illegal.",
            "Emotional manipulation harms relationships.",
            "Experts detected manipulation in the video."
         ]
      },
      {
         "id": 74,
         "word": "manuscript",
         "role": "noun",
         "BrE": "/ˈmanjʊskrɪpt/",
         "AmE": "/ˈmænjəskrɪpt/",
         "definition": "a book or text before it is published",
         "examples": [
            "The author submitted the manuscript to the publisher.",
            "The library holds ancient manuscripts.",
            "Editors reviewed the manuscript carefully."
         ]
      },
      {
         "id": 74,
         "word": "march",
         "role": "noun, verb",
         "BrE": "/mɑːtʃ/",
         "AmE": "/mɑːrtʃ/",
         "definition": "a walk with a steady, regular step; a protest walk",
         "examples": [
            "Soldiers marched in perfect order.",
            "Thousands joined the climate march.",
            "They marched through the city holding signs."
         ]
      },
      {
         "id": 74,
         "word": "marginal",
         "role": "adjective",
         "BrE": "/ˈmɑːdʒɪnəl/",
         "AmE": "/ˈmɑːrdʒɪnəl/",
         "definition": "very small or not important; on the edge",
         "examples": [
            "The improvement was marginal.",
            "He won by a marginal number of votes.",
            "The land is marginal for farming."
         ]
      },
      {
         "id": 74,
         "word": "marine",
         "role": "adjective",
         "BrE": "/məˈriːn/",
         "AmE": "/məˈriːn/",
         "definition": "related to the sea or naval forces",
         "examples": [
            "Marine life includes fish, whales, and corals.",
            "The marine biologist studied ocean creatures.",
            "Marine transport is important for trade."
         ]
      },
      {
         "id": 74,
         "word": "marketplace",
         "role": "noun",
         "BrE": "/ˈmɑːkɪtpleɪs/",
         "AmE": "/ˈmɑːrkɪtpleɪs/",
         "definition": "a place where goods are bought and sold; the world of business",
         "examples": [
            "The local marketplace sells fresh fruit and crafts.",
            "Digital platforms have changed the global marketplace.",
            "Small businesses compete in a crowded marketplace."
         ]
      },
      {
         "id": 75,
         "word": "mask",
         "role": "noun",
         "BrE": "/mɑːsk/",
         "AmE": "/mæsk/",
         "definition": "something that covers the face; to hide feelings",
         "examples": [
            "Wear a mask to protect yourself from germs.",
            "He wore a mask during the carnival.",
            "She masked her fear with a smile."
         ]
      },
      {
         "id": 75,
         "word": "massacre",
         "role": "noun",
         "BrE": "/ˈmæsəkər/",
         "AmE": "/ˈmæsəkər/",
         "definition": "the killing of many people violently and cruelly",
         "examples": [
            "The event became known as the Boston Massacre.",
            "News of the massacre shocked the world.",
            "The film shows the massacre in a respectful way."
         ]
      },
      {
         "id": 75,
         "word": "mathematical",
         "role": "adjective",
         "BrE": "/ˌmæθəˈmætɪkl/",
         "AmE": "/ˌmæθəˈmætɪkl/",
         "definition": "related to math",
         "examples": [
            "She has strong mathematical skills.",
            "The problem requires mathematical thinking.",
            "Mathematical models predict the weather."
         ]
      },
      {
         "id": 75,
         "word": "mature",
         "role": "adjective, verb",
         "BrE": "/məˈtʃʊər/",
         "AmE": "/məˈtʃʊr/",
         "definition": "fully grown; to develop fully",
         "examples": [
            "The child behaves more mature than his age.",
            "He matured quickly after college.",
            "Let the cheese mature for six months."
         ]
      },
      {
         "id": 75,
         "word": "maximize",
         "role": "verb",
         "BrE": "/ˈmæksɪmaɪz/",
         "AmE": "/ˈmæksɪmaɪz/",
         "definition": "to make something as large or effective as possible",
         "examples": [
            "We must maximize our chances of success.",
            "The app helps you maximize productivity.",
            "Farmers want to maximize crop yield."
         ]
      },
      {
         "id": 75,
         "word": "meaningful",
         "role": "adjective",
         "BrE": "/ˈmiːnɪŋfʊl/",
         "AmE": "/ˈmiːnɪŋfəl/",
         "definition": "having a clear purpose or important significance",
         "examples": [
            "She gave a meaningful look.",
            "Volunteering was a meaningful experience.",
            "They had a meaningful conversation."
         ]
      },
      {
         "id": 75,
         "word": "meantime",
         "role": "noun",
         "BrE": "/ˈmiːntaɪm/",
         "AmE": "/ˈmiːntaɪm/",
         "definition": "the time between now and a future event",
         "examples": [
            "I’ll call you tomorrow. In the meantime, relax.",
            "The repair will take days. In the meantime, use the backup.",
            "Wait for instructions. Meantime, stay calm."
         ]
      },
      {
         "id": 75,
         "word": "medieval",
         "role": "adjective",
         "BrE": "/ˌmiːdiˈiːvəl/",
         "AmE": "/ˌmiːdiˈiːvəl/",
         "definition": "related to the Middle Ages (about 500–1500 AD)",
         "examples": [
            "The castle is a medieval building.",
            "Medieval music sounds very different.",
            "They dressed in medieval costumes for the festival."
         ]
      },
      {
         "id": 75,
         "word": "meditation",
         "role": "noun",
         "BrE": "/ˌmedɪˈteɪʃən/",
         "AmE": "/ˌmedɪˈteɪʃən/",
         "definition": "the practice of focusing the mind for calm or spiritual growth",
         "examples": [
            "She starts each day with meditation.",
            "Meditation helps reduce stress.",
            "Monks spend hours in meditation."
         ]
      },
      {
         "id": 75,
         "word": "melody",
         "role": "noun",
         "BrE": "/ˈmelədi/",
         "AmE": "/ˈmelədi/",
         "definition": "a pleasant sequence of musical notes",
         "examples": [
            "The song has a beautiful melody.",
            "He hummed the melody of a childhood tune.",
            "Composers create melodies for instruments."
         ]
      },
      {
         "id": 76,
         "word": "memo",
         "role": "noun",
         "BrE": "/ˈmeməʊ/",
         "AmE": "/ˈmemoʊ/",
         "definition": "a short written message in a workplace",
         "examples": [
            "She sent a memo about the meeting change.",
            "All staff read the memo on safety rules.",
            "The memo was signed by the manager."
         ]
      },
      {
         "id": 76,
         "word": "memoir",
         "role": "noun",
         "BrE": "/ˈmemwɑːr/",
         "AmE": "/ˈmemwɑːr/",
         "definition": "a book about a person’s own life and experiences",
         "examples": [
            "The general wrote a memoir of the war.",
            "Her memoir became a bestseller.",
            "I’m reading a memoir by a famous actress."
         ]
      },
      {
         "id": 76,
         "word": "memorial",
         "role": "noun",
         "BrE": "/məˈmɔːriəl/",
         "AmE": "/məˈmɔːriəl/",
         "definition": "a statue or event to remember someone who died",
         "examples": [
            "The memorial honours soldiers who died in battle.",
            "They held a memorial for the victims.",
            "The national memorial attracts many visitors."
         ]
      },
      {
         "id": 76,
         "word": "mentor",
         "role": "noun",
         "BrE": "/ˈmentɔːr/",
         "AmE": "/ˈmentɔːr/",
         "definition": "an experienced person who advises and helps someone",
         "examples": [
            "She was a great mentor to young artists.",
            "He found a mentor at work who helped him grow.",
            "Every student is assigned a mentor."
         ]
      },
      {
         "id": 76,
         "word": "merchant",
         "role": "noun",
         "BrE": "/ˈmɜːtʃənt/",
         "AmE": "/ˈmɜːrtʃənt/",
         "definition": "a person who buys and sells goods; a businessperson",
         "examples": [
            "The merchant sold spices from distant lands.",
            "Online merchants need secure payment systems.",
            "The town was once home to many wealthy merchants."
         ]
      },
      {
         "id": 76,
         "word": "mercy",
         "role": "noun",
         "BrE": "/ˈmɜːsi/",
         "AmE": "/ˈmɜːrsi/",
         "definition": "kindness shown to someone you could punish or harm",
         "examples": [
            "The judge showed mercy and gave a light sentence.",
            "They surrendered in the hope of mercy.",
            "It was a mercy that no one was hurt."
         ]
      },
      {
         "id": 76,
         "word": "mere",
         "role": "adjective",
         "BrE": "/mɪər/",
         "AmE": "/mɪr/",
         "definition": "only just; nothing more than",
         "examples": [
            "He was a mere child when he started painting.",
            "It cost a mere five dollars.",
            "The difference was a mere second."
         ]
      },
      {
         "id": 76,
         "word": "merely",
         "role": "adverb",
         "BrE": "/ˈmɪəli/",
         "AmE": "/ˈmɪrli/",
         "definition": "only; just",
         "examples": [
            "She was merely stating a fact.",
            "He was merely late, not absent.",
            "It was merely a suggestion, not an order."
         ]
      },
      {
         "id": 76,
         "word": "merge",
         "role": "verb",
         "BrE": "/mɜːdʒ/",
         "AmE": "/mɜːrdʒ/",
         "definition": "to join together to form a single thing",
         "examples": [
            "The two companies decided to merge.",
            "The road merges with the highway ahead.",
            "Their ideas merged into one plan."
         ]
      },
      {
         "id": 76,
         "word": "merger",
         "role": "noun",
         "BrE": "/ˈmɜːdʒər/",
         "AmE": "/ˈmɜːrdʒər/",
         "definition": "the act of joining two companies or organizations",
         "examples": [
            "The merger created the largest bank in the country.",
            "Employees were worried about the merger.",
            "The merger was approved by regulators."
         ]
      },
      {
         "id": 77,
         "word": "merit",
         "role": "noun",
         "BrE": "/ˈmerɪt/",
         "AmE": "/ˈmerɪt/",
         "definition": "the quality of being good or deserving reward",
         "examples": [
            "The idea has a lot of merit.",
            "Promotion should be based on merit.",
            "The judge reviewed the case on its own merit."
         ]
      },
      {
         "id": 77,
         "word": "methodology",
         "role": "noun",
         "BrE": "/ˌmeθəˈdɒlədʒi/",
         "AmE": "/ˌmeθəˈdɑːlədʒi/",
         "definition": "a system of methods used in a particular area of study",
         "examples": [
            "The research uses a solid methodology.",
            "Scientific methodology requires testing and proof.",
            "Teachers discussed the best teaching methodology."
         ]
      },
      {
         "id": 77,
         "word": "midst",
         "role": "noun",
         "BrE": "/ˈmɪdst/",
         "AmE": "/ˈmɪdst/",
         "definition": "the middle of a situation or place",
         "examples": [
            "She stayed calm in the midst of chaos.",
            "They built a house in the midst of the forest.",
            "He found peace in the midst of trouble."
         ]
      },
      {
         "id": 77,
         "word": "migration",
         "role": "noun",
         "BrE": "/maɪˈɡreɪʃən/",
         "AmE": "/maɪˈɡreɪʃən/",
         "definition": "the movement of people or animals from one place to another",
         "examples": [
            "Bird migration happens every autumn.",
            "Economic migration affects many countries.",
            "Human migration has shaped history."
         ]
      },
      {
         "id": 77,
         "word": "militant",
         "role": "noun, adjective",
         "BrE": "/ˈmɪlɪtənt/",
         "AmE": "/ˈmɪlɪtənt/",
         "definition": "using aggressive or violent methods to support a cause",
         "examples": [
            "Militant groups attacked the border.",
            "She took a militant stance on climate change.",
            "The protest turned militant when police arrived."
         ]
      },
      {
         "id": 77,
         "word": "militia",
         "role": "noun",
         "BrE": "/mɪˈlɪʃə/",
         "AmE": "/mɪˈlɪʃə/",
         "definition": "a group of ordinary people trained as soldiers but not part of the army",
         "examples": [
            "The militia defended the village.",
            "Some countries allow local militias.",
            "The militia was accused of violence."
         ]
      },
      {
         "id": 77,
         "word": "mill",
         "role": "noun",
         "BrE": "/mɪl/",
         "AmE": "/mɪl/",
         "definition": "a building with machines for processing materials like grain or cloth",
         "examples": [
            "The old mill was turned into a museum.",
            "Cotton mills were common during the Industrial Revolution.",
            "The windmill is a type of mill."
         ]
      },
      {
         "id": 77,
         "word": "minimal",
         "role": "adjective",
         "BrE": "/ˈmɪnɪməl/",
         "AmE": "/ˈmɪnɪməl/",
         "definition": "as small or as little as possible",
         "examples": [
            "The changes were minimal.",
            "She wore minimal makeup.",
            "Only minimal effort was made."
         ]
      },
      {
         "id": 77,
         "word": "minimize",
         "role": "verb",
         "BrE": "/ˈmɪnɪmaɪz/",
         "AmE": "/ˈmɪnɪmaɪz/",
         "definition": "to make something as small or unimportant as possible",
         "examples": [
            "We must minimize waste in the factory.",
            "He tried to minimize his mistakes.",
            "Efforts to minimize risk are ongoing."
         ]
      },
      {
         "id": 77,
         "word": "mining",
         "role": "noun",
         "BrE": "/ˈmaɪnɪŋ/",
         "AmE": "/ˈmaɪnɪŋ/",
         "definition": "the process of digging minerals or coal out of the ground",
         "examples": [
            "Coal mining was a major industry here.",
            "Mining can damage the environment.",
            "The town grew because of gold mining."
         ]
      },
      {
         "id": 78,
         "word": "ministry",
         "role": "noun",
         "BrE": "/ˈmɪnɪstri/",
         "AmE": "/ˈmɪnɪstri/",
         "definition": "a government department; work related to religious leadership",
         "examples": [
            "The Ministry of Health announced new rules.",
            "He works in the foreign ministry.",
            "She devoted her life to religious ministry."
         ]
      },
      {
         "id": 78,
         "word": "minute",
         "role": "adjective",
         "BrE": "/maɪˈnjuːt/",
         "AmE": "/maɪˈnuːt/",
         "definition": "extremely small",
         "examples": [
            "There was a minute crack in the glass.",
            "Scientists studied minute particles.",
            "The difference is so minute it’s almost invisible."
         ]
      },
      {
         "id": 78,
         "word": "miracle",
         "role": "noun",
         "BrE": "/ˈmɪrəkl/",
         "AmE": "/ˈmɪrəkl/",
         "definition": "something wonderful that cannot be explained by science or nature",
         "examples": [
            "Surviving the crash was a miracle.",
            "Many believe the healing was a miracle.",
            "It’s a miracle the plant grew in that soil."
         ]
      },
      {
         "id": 78,
         "word": "misery",
         "role": "noun",
         "BrE": "/ˈmɪzəri/",
         "AmE": "/ˈmɪzəri/",
         "definition": "great unhappiness or suffering",
         "examples": [
            "War brings misery to millions.",
            "He lived in misery for years.",
            "The cold weather added to their misery."
         ]
      },
      {
         "id": 78,
         "word": "misleading",
         "role": "adjective",
         "BrE": "/ˌmɪsˈliːdɪŋ/",
         "AmE": "/ˌmɪsˈliːdɪŋ/",
         "definition": "giving the wrong idea or impression",
         "examples": [
            "The advertisement was misleading.",
            "His answer was misleading on purpose.",
            "Don’t give misleading information."
         ]
      },
      {
         "id": 78,
         "word": "missile",
         "role": "noun",
         "BrE": "/ˈmɪsaɪl/",
         "AmE": "/ˈmɪsəl/",
         "definition": "a weapon that is sent through the air to hit a target",
         "examples": [
            "The country tested a new missile.",
            "Missile defence systems protect cities.",
            "A missile was launched from the base."
         ]
      },
      {
         "id": 78,
         "word": "mob",
         "role": "noun",
         "BrE": "/mɒb/",
         "AmE": "/mɑːb/",
         "definition": "a large, disorderly crowd of people",
         "examples": [
            "A mob gathered outside the court.",
            "The mob shouted angrily at the police.",
            "Fans became a mob after the concert."
         ]
      },
      {
         "id": 78,
         "word": "mobilize",
         "role": "verb",
         "BrE": "/ˈməʊbɪlaɪz/",
         "AmE": "/ˈmoʊbəlaɪz/",
         "definition": "to prepare and organize people or resources for action",
         "examples": [
            "The country mobilized its army for war.",
            "They mobilized volunteers for the clean-up.",
            "We must mobilize support for the cause."
         ]
      },
      {
         "id": 78,
         "word": "moderate",
         "role": "adjective",
         "BrE": "/ˈmɒdərət/",
         "AmE": "/ˈmɑːdərət/",
         "definition": "not extreme; average in amount or level",
         "examples": [
            "She has moderate views on politics.",
            "The weather was moderate, not too hot or cold.",
            "He received moderate damage in the crash."
         ]
      },
      {
         "id": 78,
         "word": "modification",
         "role": "noun",
         "BrE": "/ˌmɒdɪfɪˈkeɪʃən/",
         "AmE": "/ˌmɑːdɪfɪˈkeɪʃən/",
         "definition": "a change made to something",
         "examples": [
            "The car had several modifications.",
            "No modification to the plan is allowed.",
            "The software update includes minor modifications."
         ]
      },

      {
         "id": 79,
         "word": "momentum",
         "role": "noun",
         "BrE": "/məʊˈmentəm/",
         "AmE": "/moʊˈmentəm/",
         "definition": "the force that keeps something moving forward; growing strength",
         "examples": [
            "The team gained momentum after scoring the first goal.",
            "The campaign is building momentum across the country.",
            "Once started, the project took on its own momentum."
         ]
      },
      {
         "id": 79,
         "word": "monk",
         "role": "noun",
         "BrE": "/mʌŋk/",
         "AmE": "/mʌŋk/",
         "definition": "a man who lives in a religious community and follows strict rules",
         "examples": [
            "The monk spent hours in prayer.",
            "Buddhist monks wear orange robes.",
            "He became a monk after leaving his job."
         ]
      },
      {
         "id": 79,
         "word": "monopoly",
         "role": "noun",
         "BrE": "/məˈnɒpəli/",
         "AmE": "/məˈnɑːpəli/",
         "definition": "complete control of something by one group or company",
         "examples": [
            "The company was accused of creating a market monopoly.",
            "They turned the game into a monopoly of one player.",
            "Public services should not be a private monopoly."
         ]
      },
      {
         "id": 79,
         "word": "morality",
         "role": "noun",
         "BrE": "/məˈræləti/",
         "AmE": "/məˈræləti/",
         "definition": "principles of right and wrong behaviour",
         "examples": [
            "The story raises questions about morality.",
            "She has strong personal morality.",
            "Religion often teaches morality to children."
         ]
      },
      {
         "id": 79,
         "word": "motive",
         "role": "noun",
         "BrE": "/ˈməʊtɪv/",
         "AmE": "/ˈmoʊtɪv/",
         "definition": "a reason for doing something, especially something bad",
         "examples": [
            "The police are investigating the suspect’s motive.",
            "His motive was money, not revenge.",
            "There was no clear motive for the crime."
         ]
      },
      {
         "id": 79,
         "word": "motorist",
         "role": "noun",
         "BrE": "/ˈməʊtərɪst/",
         "AmE": "/ˈmoʊtərɪst/",
         "definition": "a person who drives a car",
         "examples": [
            "Drivers and other motorists should slow down in rain.",
            "The motorist was injured in the crash.",
            "Road signs warn motorists of danger ahead."
         ]
      },
      {
         "id": 79,
         "word": "municipal",
         "role": "adjective",
         "BrE": "/mjuːˈnɪsɪpl/",
         "AmE": "/mjuːˈnɪsəpl/",
         "definition": "related to a city or town government",
         "examples": [
            "Municipal services include waste collection and street cleaning.",
            "They voted on the municipal budget.",
            "The stadium is owned by the municipal authority."
         ]
      },
      {
         "id": 79,
         "word": "mutual",
         "role": "adjective",
         "BrE": "/ˈmjuːtʃuəl/",
         "AmE": "/ˈmjuːtʃuəl/",
         "definition": "shared or felt by two or more people",
         "examples": [
            "They have mutual respect for each other.",
            "The agreement was based on mutual benefit.",
            "We share a mutual love of music."
         ]
      },
      {
         "id": 79,
         "word": "namely",
         "role": "adverb",
         "BrE": "/ˈneɪmli/",
         "AmE": "/ˈneɪmli/",
         "definition": "that is to say; specifically",
         "examples": [
            "Only two students passed, namely John and Lisa.",
            "She loves outdoor activities, namely hiking and cycling.",
            "Three subjects are required, namely math, science, and English."
         ]
      },
      {
         "id": 79,
         "word": "nationwide",
         "role": "adjective",
         "BrE": "/ˈneɪʃənwaɪd/",
         "AmE": "/ˈneɪʃənwaɪd/",
         "definition": "happening or existing throughout a whole country",
         "examples": [
            "The protest was nationwide.",
            "A nationwide survey showed rising concern.",
            "The company has a nationwide network of stores."
         ]
      },
      {
         "id": 80,
         "word": "naval",
         "role": "adjective",
         "BrE": "/ˈneɪvəl/",
         "AmE": "/ˈneɪvəl/",
         "definition": "related to a country's navy or warships",
         "examples": [
            "He served in the naval forces for 20 years.",
            "The naval base is located on the coast.",
            "Naval battles were common in the past."
         ]
      },
      {
         "id": 80,
         "word": "neglect",
         "role": "verb, noun",
         "BrE": "/nɪˈɡlekt/",
         "AmE": "/nɪˈɡlekt/",
         "definition": "to fail to care for properly; lack of care",
         "examples": [
            "The house fell into neglect.",
            "Parents who neglect their children can be punished.",
            "Years of neglect damaged the building."
         ]
      },
      {
         "id": 80,
         "word": "neighbouring",
         "role": "adjective",
         "BrE": "/ˈneɪbərɪŋ/",
         "AmE": "/ˈneɪbərɪŋ/",
         "definition": "located next to or near something",
         "examples": [
            "We visited a neighbouring village.",
            "The neighbouring countries signed a peace deal.",
            "She borrowed sugar from a neighbouring flat."
         ]
      },
      {
         "id": 80,
         "word": "nest",
         "role": "noun",
         "BrE": "/nest/",
         "AmE": "/nest/",
         "definition": "a structure birds build to lay eggs and raise young",
         "examples": [
            "A robin built a nest in the tree.",
            "Cats sometimes find bird nests in bushes.",
            "The eagle returned to its mountain nest."
         ]
      },
      {
         "id": 80,
         "word": "net",
         "role": "adjective",
         "BrE": "/net/",
         "AmE": "/net/",
         "definition": "final amount after all deductions",
         "examples": [
            "Her net income is what she earns after taxes.",
            "The company’s net profit increased.",
            "Net weight means the weight without packaging."
         ]
      },
      {
         "id": 80,
         "word": "newsletter",
         "role": "noun",
         "BrE": "/ˈnjuːzˌletər/",
         "AmE": "/ˈnuːzˌletər/",
         "definition": "a regular report or update sent to members or subscribers",
         "examples": [
            "I read the school newsletter every month.",
            "The organization sends a monthly newsletter by email.",
            "The newsletter includes news and upcoming events."
         ]
      },
      {
         "id": 80,
         "word": "niche",
         "role": "noun",
         "BrE": "/niːʃ/",
         "AmE": "/niːtʃ/",
         "definition": "a small, specialized part of a market or area",
         "examples": [
            "She found a niche selling handmade soaps.",
            "This shop serves a very niche customer base.",
            "There’s a niche for eco-friendly products."
         ]
      },
      {
         "id": 80,
         "word": "noble",
         "role": "adjective",
         "BrE": "/ˈnəʊbl/",
         "AmE": "/ˈnoʊbl/",
         "definition": "having high moral qualities; of high birth",
         "examples": [
            "It was a noble act to save the child.",
            "The noble family lived in a castle.",
            "She spoke with noble honesty."
         ]
      },
      {
         "id": 80,
         "word": "nod",
         "role": "verb",
         "BrE": "/nɒd/",
         "AmE": "/nɑːd/",
         "definition": "to move your head up and down to show agreement",
         "examples": [
            "He nodded when I asked if he agreed.",
            "She gave a quick nod and walked away.",
            "The baby nodded off to sleep."
         ]
      },
      {
         "id": 80,
         "word": "nomination",
         "role": "noun",
         "BrE": "/ˌnɒmɪˈneɪʃən/",
         "AmE": "/ˌnɑːmɪˈneɪʃən/",
         "definition": "the act of nominating or being nominated",
         "examples": [
            "Her nomination for the prize was a surprise.",
            "The nomination process takes several weeks.",
            "He accepted the nomination with pride."
         ]
      },
      {
         "id": 81,
         "word": "nominee",
         "role": "noun",
         "BrE": "/ˌnɒmɪˈniː/",
         "AmE": "/ˌnɑːmɪˈniː/",
         "definition": "a person who has been nominated for something",
         "examples": [
            "All nominees will be contacted by email.",
            "She was the only nominee for the award.",
            "The nominee gave a short speech."
         ]
      },
      {
         "id": 81,
         "word": "nonetheless",
         "role": "adverb",
         "BrE": "/ˌnʌnðəˈles/",
         "AmE": "/ˌnʌnðəˈles/",
         "definition": "in spite of that; however",
         "examples": [
            "It was raining. Nonetheless, we went hiking.",
            "He was tired, but he continued nonetheless.",
            "The task was hard. Nonetheless, she finished it."
         ]
      },
      {
         "id": 81,
         "word": "non-profit",
         "role": "adjective",
         "BrE": "/ˌnɒn ˈprɒfɪt/",
         "AmE": "/ˌnɑːn ˈprɑːfɪt/",
         "definition": "an organization that does not make money for owners or shareholders",
         "examples": [
            "She works for a non-profit that helps children.",
            "Non-profit groups rely on donations.",
            "The event raised money for a non-profit."
         ]
      },
      {
         "id": 81,
         "word": "nonsense",
         "role": "noun",
         "BrE": "/ˈnɒnsəns/",
         "AmE": "/ˈnɑːnsəns/",
         "definition": "words or ideas that have no meaning or are silly",
         "examples": [
            "That’s complete nonsense!",
            "He talked a lot of nonsense during the meeting.",
            "Don’t pay attention to such nonsense."
         ]
      },
      {
         "id": 81,
         "word": "noon",
         "role": "noun",
         "BrE": "/nuːn/",
         "AmE": "/nuːn/",
         "definition": "12 o'clock in the middle of the day",
         "examples": [
            "Let’s meet at noon for lunch.",
            "The sun is highest at noon.",
            "She arrived at exactly noon."
         ]
      },
      {
         "id": 81,
         "word": "notable",
         "role": "adjective",
         "BrE": "/ˈnəʊtəbl/",
         "AmE": "/ˈnoʊtəbl/",
         "definition": "important or worth noticing",
         "examples": [
            "A notable figure in science passed away.",
            "There was a notable improvement in her work.",
            "The event attracted many notable guests."
         ]
      },
      {
         "id": 81,
         "word": "notably",
         "role": "adverb",
         "BrE": "/ˈnəʊtəbli/",
         "AmE": "/ˈnoʊtəbli/",
         "definition": "especially; particularly",
         "examples": [
            "The team did well, notably in the second half.",
            "Several countries agreed, notably Canada and Germany.",
            "She is known for her kindness, notably to strangers."
         ]
      },
      {
         "id": 81,
         "word": "notify",
         "role": "verb",
         "BrE": "/ˈnəʊtɪfaɪ/",
         "AmE": "/ˈnoʊtɪfaɪ/",
         "definition": "to inform someone officially or formally",
         "examples": [
            "Please notify us if you are late.",
            "They were notified of the change by email.",
            "The school will notify parents of delays."
         ]
      },
      {
         "id": 81,
         "word": "notorious",
         "role": "adjective",
         "BrE": "/nəʊˈtɔːriəs/",
         "AmE": "/noʊˈtɔːriəs/",
         "definition": "famous for something bad",
         "examples": [
            "The area is notorious for crime.",
            "He is a notorious liar.",
            "The prison was notorious for its harsh conditions."
         ]
      },
      {
         "id": 81,
         "word": "novel",
         "role": "adjective",
         "BrE": "/ˈnɒvəl/",
         "AmE": "/ˈnɑːvəl/",
         "definition": "new and different; original",
         "examples": [
            "They tried a novel approach to teaching.",
            "The scientist made a novel discovery.",
            "Her novel ideas changed the project."
         ]
      },
      {
         "id": 82,
         "word": "nursery",
         "role": "noun",
         "BrE": "/ˈnɜːsəri/",
         "AmE": "/ˈnɜːrsəri/",
         "definition": "a place where young children are cared for; a place where plants are grown",
         "examples": [
            "She works in a nursery for toddlers.",
            "We bought flowers from the garden nursery.",
            "The nursery school opens at 8 a.m."
         ]
      },
      {
         "id": 82,
         "word": "objection",
         "role": "noun",
         "BrE": "/əbˈdʒekʃən/",
         "AmE": "/əbˈdʒekʃən/",
         "definition": "a reason for disagreeing with something",
         "examples": [
            "She raised an objection during the meeting.",
            "There were no objections to the plan.",
            "Legal objections delayed the decision."
         ]
      },
      {
         "id": 82,
         "word": "oblige",
         "role": "verb",
         "BrE": "/əˈblaɪdʒ/",
         "AmE": "/əˈblaɪdʒ/",
         "definition": "to do a favour or help someone",
         "examples": [
            "I’ll oblige if you need help.",
            "He felt obliged to attend the funeral.",
            "Can you oblige me with a pen?"
         ]
      },
      {
         "id": 82,
         "word": "obsess",
         "role": "verb",
         "BrE": "/əbˈses/",
         "AmE": "/əbˈses/",
         "definition": "to think about something constantly or too much",
         "examples": [
            "He’s obsessed with video games.",
            "She became obsessed with losing weight.",
            "They obsess over small details."
         ]
      },
      {
         "id": 82,
         "word": "obsession",
         "role": "noun",
         "BrE": "/əbˈseʃən/",
         "AmE": "/əbˈseʃən/",
         "definition": "being unable to stop thinking about something",
         "examples": [
            "His obsession with fame ruined his life.",
            "Cleanliness was her obsession.",
            "An unhealthy obsession can cause stress."
         ]
      },
      {
         "id": 82,
         "word": "occasional",
         "role": "adjective",
         "BrE": "/əˈkeɪʒənəl/",
         "AmE": "/əˈkeɪʒənəl/",
         "definition": "happening now and then, not regularly",
         "examples": [
            "He makes occasional visits to his hometown.",
            "We have occasional problems with the internet.",
            "She’s an occasional smoker."
         ]
      },
      {
         "id": 82,
         "word": "occurrence",
         "role": "noun",
         "BrE": "/əˈkʌrəns/",
         "AmE": "/əˈkɜːrəns/",
         "definition": "something that happens",
         "examples": [
            "Earthquakes are a common occurrence here.",
            "The event was a rare occurrence.",
            "Daily occurrences include eating and sleeping."
         ]
      },
      {
         "id": 82,
         "word": "odds",
         "role": "noun",
         "BrE": "/ɒdz/",
         "AmE": "/ɑːdz/",
         "definition": "the chances that something will happen",
         "examples": [
            "The odds of winning the lottery are very low.",
            "They beat the odds and succeeded.",
            "What are the odds of rain tomorrow?"
         ]
      },
      {
         "id": 82,
         "word": "offering",
         "role": "noun",
         "BrE": "/ˈɒfərɪŋ/",
         "AmE": "/ˈɔːfərɪŋ/",
         "definition": "something given or presented; a product or service available",
         "examples": [
            "The church collected a money offering.",
            "This store has a wide offering of shoes.",
            "Their latest offering is a new smartphone."
         ]
      },
      {
         "id": 82,
         "word": "offspring",
         "role": "noun",
         "BrE": "/ˈɒfsprɪŋ/",
         "AmE": "/ˈɔːfsprɪŋ/",
         "definition": "children or young animals",
         "examples": [
            "They are proud of their offspring.",
            "The bird feeds its offspring every hour.",
            "Genes are passed from parent to offspring."
         ]
      },
      {
         "id": 83,
         "word": "operational",
         "role": "adjective",
         "BrE": "/ˌɒpəˈreɪʃənl/",
         "AmE": "/ˌɑːpəˈreɪʃənl/",
         "definition": "ready to work or being used",
         "examples": [
            "The new hospital is now operational.",
            "The system will be operational by Monday.",
            "All operational costs are covered."
         ]
      },
      {
         "id": 83,
         "word": "opt",
         "role": "verb",
         "BrE": "/ɒpt/",
         "AmE": "/ɑːpt/",
         "definition": "to choose or decide on something",
         "examples": [
            "She opted for the vegetarian meal.",
            "Many customers opt to pay online.",
            "He opted out of the survey."
         ]
      },
      {
         "id": 83,
         "word": "optical",
         "role": "adjective",
         "BrE": "/ˈɒptɪkəl/",
         "AmE": "/ˈɑːptɪkəl/",
         "definition": "related to sight or vision; using light",
         "examples": [
            "He needs optical help to read small text.",
            "Optical fibres are used in internet cables.",
            "The optical illusion fooled everyone."
         ]
      },
      {
         "id": 83,
         "word": "optimism",
         "role": "noun",
         "BrE": "/ˌɒptɪˈmɪzəm/",
         "AmE": "/ˌɑːptɪˈmɪzəm/",
         "definition": "hopefulness and confidence about the future",
         "examples": [
            "Her optimism lifted everyone’s mood.",
            "Despite problems, he kept his optimism.",
            "Optimism helps in tough times."
         ]
      },
      {
         "id": 83,
         "word": "oral",
         "role": "adjective",
         "BrE": "/ˈɔːrəl/",
         "AmE": "/ˈɔːrəl/",
         "definition": "spoken, not written",
         "examples": [
            "The test includes a written and an oral part.",
            "Oral traditions pass stories through speech.",
            "She gave an oral presentation."
         ]
      },
      {
         "id": 83,
         "word": "organizational",
         "role": "adjective",
         "BrE": "/ˌɔːɡənaɪˈzeɪʃənl/",
         "AmE": "/ˌɔːrɡənəˈzeɪʃənl/",
         "definition": "related to the structure or management of an organization",
         "examples": [
            "Good organizational skills are important at work.",
            "The organizational chart shows who reports to whom.",
            "They improved organizational efficiency."
         ]
      },
      {
         "id": 83,
         "word": "orientation",
         "role": "noun",
         "BrE": "/ˌɔːriənˈteɪʃən/",
         "AmE": "/ˌɔːriənˈteɪʃən/",
         "definition": "training for new people; direction or position",
         "examples": [
            "New employees attend an orientation session.",
            "The map shows the orientation of the building.",
            "Her political orientation is liberal."
         ]
      },
      {
         "id": 83,
         "word": "originate",
         "role": "verb",
         "BrE": "/əˈrɪdʒɪneɪt/",
         "AmE": "/əˈrɪdʒəneɪt/",
         "definition": "to begin or start somewhere",
         "examples": [
            "The word originates from Latin.",
            "The problem originated from poor communication.",
            "This tradition originated centuries ago."
         ]
      },
      {
         "id": 83,
         "word": "outbreak",
         "role": "noun",
         "BrE": "/ˈaʊtbreɪk/",
         "AmE": "/ˈaʊtbreɪk/",
         "definition": "a sudden start of something bad, like war or disease",
         "examples": [
            "There was an outbreak of flu in the school.",
            "The outbreak of war surprised everyone.",
            "Health workers contained the outbreak quickly."
         ]
      },
      {
         "id": 83,
         "word": "outing",
         "role": "noun",
         "BrE": "/ˈaʊtɪŋ/",
         "AmE": "/ˈaʊtɪŋ/",
         "definition": "a short trip or visit for pleasure",
         "examples": [
            "We went on a family outing to the zoo.",
            "The school organized an outing to the museum.",
            "It was a fun outing with friends."
         ]
      },
      {
         "id": 84,
         "word": "outlet",
         "role": "noun",
         "BrE": "/ˈaʊtlet/",
         "AmE": "/ˈaʊtlet/",
         "definition": "a shop that sells goods directly from a factory; a place to release emotion",
         "examples": [
            "We bought clothes at the brand’s outlet.",
            "Exercise is a good outlet for stress.",
            "The river found an outlet to the sea."
         ]
      },
      {
         "id": 84,
         "word": "outlook",
         "role": "noun",
         "BrE": "/ˈaʊtlʊk/",
         "AmE": "/ˈaʊtlʊk/",
         "definition": "a person’s opinion or attitude toward the future",
         "examples": [
            "He has a positive outlook on life.",
            "The economic outlook is improving.",
            "Her outlook changed after the trip."
         ]
      },
      {
         "id": 84,
         "word": "outrage",
         "role": "noun, verb",
         "BrE": "/ˈaʊtreɪdʒ/",
         "AmE": "/ˈaʊtreɪdʒ/",
         "definition": "a strong feeling of shock and anger; to shock or anger greatly",
         "examples": [
            "The decision caused public outrage.",
            "She was outraged by the unfair treatment.",
            "It’s outrageous that no one helped!"
         ]
      },
      {
         "id": 84,
         "word": "outsider",
         "role": "noun",
         "BrE": "/ˌaʊtˈsaɪdər/",
         "AmE": "/ˌaʊtˈsaɪdər/",
         "definition": "someone not part of a group or organization",
         "examples": [
            "He felt like an outsider at the party.",
            "The company hired an outsider as CEO.",
            "Local people saw the tourists as outsiders."
         ]
      },
      {
         "id": 84,
         "word": "overlook",
         "role": "verb",
         "BrE": "/ˌəʊvəˈlʊk/",
         "AmE": "/ˌoʊvərˈlʊk/",
         "definition": "to fail to notice; to forgive",
         "examples": [
            "I overlooked the spelling mistake.",
            "The hotel overlooks the sea.",
            "She chose to overlook his rude comment."
         ]
      },
      {
         "id": 84,
         "word": "overly",
         "role": "adverb",
         "BrE": "/ˈəʊvəli/",
         "AmE": "/ˈoʊvərli/",
         "definition": "too much; to an excessive degree",
         "examples": [
            "He was overly excited about the trip.",
            "Don’t be overly strict with children.",
            "The movie was overly long."
         ]
      },
      {
         "id": 84,
         "word": "oversee",
         "role": "verb",
         "BrE": "/ˌəʊvəˈsiː/",
         "AmE": "/ˌoʊvərˈsiː/",
         "definition": "to watch and manage a process or group",
         "examples": [
            "She oversees the work of ten staff members.",
            "The teacher oversaw the exam carefully.",
            "He oversees all international operations."
         ]
      },
      {
         "id": 84,
         "word": "overturn",
         "role": "verb",
         "BrE": "/ˌəʊvəˈtɜːn/",
         "AmE": "/ˌoʊvərˈtɜːrn/",
         "definition": "to reverse a decision; to tip over",
         "examples": [
            "The court overturned the earlier ruling.",
            "The boat overturned in the storm.",
            "They overturned the old policy."
         ]
      },
      {
         "id": 84,
         "word": "overwhelm",
         "role": "verb",
         "BrE": "/ˌəʊvəˈwelm/",
         "AmE": "/ˌoʊvərˈwelm/",
         "definition": "to affect someone strongly; to defeat completely",
         "examples": [
            "She was overwhelmed by the support.",
            "The small team was overwhelmed by work.",
            "The army overwhelmed the enemy."
         ]
      },
      {
         "id": 84,
         "word": "overwhelming",
         "role": "adjective",
         "BrE": "/ˌəʊvəˈwelmɪŋ/",
         "AmE": "/ˌoʊvərˈwelmɪŋ/",
         "definition": "very strong or great; impossible to resist",
         "examples": [
            "They received overwhelming support.",
            "The evidence was overwhelming.",
            "It was an overwhelming feeling of joy."
         ]
      },
      {
         "id": 85,
         "word": "pad",
         "role": "noun",
         "BrE": "/pæd/",
         "AmE": "/pæd/",
         "definition": "a soft, thick piece of material; a writing pad",
         "examples": [
            "Put a pad under the glass to protect the table.",
            "She wrote notes on a notepad.",
            "The cat likes to sleep on the soft pad."
         ]
      },
      {
         "id": 85,
         "word": "parameter",
         "role": "noun",
         "BrE": "/pəˈræmɪtər/",
         "AmE": "/pəˈræmɪtər/",
         "definition": "a limit or rule that controls what can happen",
         "examples": [
            "The project must stay within budget parameters.",
            "Set clear parameters for the experiment.",
            "There are legal parameters for data use."
         ]
      },
      {
         "id": 85,
         "word": "parental",
         "role": "adjective",
         "BrE": "/pəˈrentl/",
         "AmE": "/pəˈrentl/",
         "definition": "related to a parent or parents",
         "examples": [
            "Parental guidance is advised for young viewers.",
            "She gave her child strong parental support.",
            "Parental leave allows time off after a baby is born."
         ]
      },
      {
         "id": 85,
         "word": "parish",
         "role": "noun",
         "BrE": "/ˈpærɪʃ/",
         "AmE": "/ˈpærɪʃ/",
         "definition": "an area served by a local church; a local government area in some countries",
         "examples": [
            "He is the priest of the local parish.",
            "The event was organized by the parish council.",
            "Louisiana is divided into parishes instead of counties."
         ]
      },
      {
         "id": 85,
         "word": "parliamentary",
         "role": "adjective",
         "BrE": "/ˌpɑːləˈmentəri/",
         "AmE": "/ˌpɑːrləˈmentəri/",
         "definition": "related to a parliament",
         "examples": [
            "The country has a parliamentary system.",
            "She works in a parliamentary office.",
            "Parliamentary debates are open to the public."
         ]
      },
      {
         "id": 85,
         "word": "partial",
         "role": "adjective",
         "BrE": "/ˈpɑːʃəl/",
         "AmE": "/ˈpɑːrʃəl/",
         "definition": "not complete; biased in favour of someone",
         "examples": [
            "Only partial information was available.",
            "He gave a partial answer.",
            "The judge was accused of being partial."
         ]
      },
      {
         "id": 85,
         "word": "partially",
         "role": "adverb",
         "BrE": "/ˈpɑːʃəli/",
         "AmE": "/ˈpɑːrʃəli/",
         "definition": "not completely; partly",
         "examples": [
            "The building was partially damaged.",
            "I partially agree with your point.",
            "The screen is partially blocked."
         ]
      },
      {
         "id": 85,
         "word": "passing",
         "role": "noun",
         "BrE": "/ˈpɑːsɪŋ/",
         "AmE": "/ˈpæsɪŋ/",
         "definition": "the act of going past; death (formal)",
         "examples": [
            "The passing of the law took months.",
            "We mourn the passing of a great leader.",
            "The passing of time changes everything."
         ]
      },
      {
         "id": 85,
         "word": "passive",
         "role": "adjective",
         "BrE": "/ˈpæsɪv/",
         "AmE": "/ˈpæsɪv/",
         "definition": "not active or involved; accepting without protest",
         "examples": [
            "He took a passive role in the discussion.",
            "Passive smoking is dangerous.",
            "She was too passive during the argument."
         ]
      },
      {
         "id": 85,
         "word": "pastor",
         "role": "noun",
         "BrE": "/ˈpɑːstər/",
         "AmE": "/ˈpæstər/",
         "definition": "a minister or leader of a Christian church",
         "examples": [
            "The pastor gave a moving sermon.",
            "We met with the pastor to plan the wedding.",
            "She became a pastor after years of study."
         ]
      },
      {
         "id": 86,
         "word": "patch",
         "role": "noun",
         "BrE": "/pætʃ/",
         "AmE": "/pætʃ/",
         "definition": "a small piece of material used to fix something; a small area",
         "examples": [
            "He put a patch on the hole in his jeans.",
            "There’s a patch of ice on the road.",
            "The garden has a patch of wildflowers."
         ]
      },
      {
         "id": 86,
         "word": "patent",
         "role": "noun",
         "BrE": "/ˈpeɪtənt/",
         "AmE": "/ˈpeɪtənt/",
         "definition": "a legal right to an invention; preventing others from copying it",
         "examples": [
            "He filed a patent for his new device.",
            "The medicine is under patent for ten more years.",
            "They bought the patent from the inventor."
         ]
      },
      {
         "id": 86,
         "word": "pathway",
         "role": "noun",
         "BrE": "/ˈpɑːθweɪ/",
         "AmE": "/ˈpæθweɪ/",
         "definition": "a path or way; a route to achieving something",
         "examples": [
            "The garden has a stone pathway.",
            "Education is a pathway to success.",
            "They cleared the pathway through the forest."
         ]
      },
      {
         "id": 86,
         "word": "patrol",
         "role": "noun, verb",
         "BrE": "/pəˈtrəʊl/",
         "AmE": "/pəˈtroʊl/",
         "definition": "a group that moves around an area to protect it; to do this",
         "examples": [
            "The police patrol the streets at night.",
            "A patrol found the missing hiker.",
            "Soldiers patrolled the border."
         ]
      },
      {
         "id": 86,
         "word": "patron",
         "role": "noun",
         "BrE": "/ˈpeɪtrən/",
         "AmE": "/ˈpeɪtrən/",
         "definition": "a person who supports a group, artist, or organization",
         "examples": [
            "The gallery has many wealthy patrons.",
            "She is a regular patron of the café.",
            "Artists need patrons to survive."
         ]
      },
      {
         "id": 86,
         "word": "peak",
         "role": "noun",
         "BrE": "/piːk/",
         "AmE": "/piːk/",
         "definition": "the top point of a mountain; the highest level",
         "examples": [
            "They reached the peak of the mountain at sunrise.",
            "This is the peak of tourist season.",
            "Demand peaks during the holidays."
         ]
      },
      {
         "id": 86,
         "word": "peasant",
         "role": "noun",
         "BrE": "/ˈpezənt/",
         "AmE": "/ˈpezənt/",
         "definition": "a poor farmer of low social class, especially in the past",
         "examples": [
            "In medieval times, peasants worked the land.",
            "The story is about a peasant who became a king.",
            "Peasants often paid taxes to the lord."
         ]
      },
      {
         "id": 86,
         "word": "peculiar",
         "role": "adjective",
         "BrE": "/pɪˈkjuːliər/",
         "AmE": "/pɪˈkjuːliər/",
         "definition": "strange or unusual",
            "examples": [
            "There was a peculiar smell in the room.",
            "He has a peculiar way of speaking.",
         "It’s peculiar that no one answered."
         ]
      },
      {
         "id": 86,
         "word": "persistent",
         "role": "adjective",
         "BrE": "/pəˈsɪstənt/",
         "AmE": "/pərˈsɪstənt/",
         "definition": "continuing firmly; hard to stop",
         "examples": [
            "He made persistent efforts to improve.",
            "She faced persistent health problems.",
            "Persistent rain caused flooding."
         ]
      },
      {
         "id": 86,
         "word": "personnel",
         "role": "noun",
         "BrE": "/ˌpɜːsəˈnel/",
         "AmE": "/ˌpɜːrsəˈnel/",
         "definition": "people employed in an organization, especially in the military",
         "examples": [
            "All personnel must wear ID badges.",
            "The company has over 500 personnel.",
            "Military personnel were deployed quickly."
         ]
      },
      {
         "id": 87,
         "word": "petition",
         "role": "noun",
         "BrE": "/pəˈtɪʃən/",
         "AmE": "/pəˈtɪʃən/",
         "definition": "a formal request signed by many people",
         "examples": [
            "They started a petition to save the park.",
            "The petition had over 10,000 signatures.",
            "We submitted a petition to the government."
         ]
      },
      {
         "id": 87,
         "word": "philosophical",
         "role": "adjective",
         "BrE": "/ˌfɪləˈsɒfɪkl/",
         "AmE": "/ˌfɪləˈsɑːfɪkl/",
         "definition": "related to philosophy; calm and thoughtful",
         "examples": [
            "They had a philosophical discussion about life.",
            "He took a philosophical view of his loss.",
            "Her writing has a philosophical tone."
         ]
      },
      {
         "id": 87,
         "word": "physician",
         "role": "noun",
         "BrE": "/fɪˈzɪʃən/",
         "AmE": "/fɪˈzɪʃən/",
         "definition": "a medical doctor",
         "examples": [
            "She visited her physician for a check-up.",
            "The physician prescribed medicine.",
            "He trained for years to become a physician."
         ]
      },
      {
         "id": 87,
         "word": "pioneer",
         "role": "noun, verb",
         "BrE": "/ˌpaɪəˈnɪər/",
         "AmE": "/ˌpaɪəˈnɪr/",
         "definition": "a person who is among the first to explore or develop something",
         "examples": [
            "She was a pioneer in women’s rights.",
            "They pioneered a new teaching method.",
            "The team are pioneers in solar energy."
         ]
      },
      {
         "id": 87,
         "word": "pipeline",
         "role": "noun",
         "BrE": "/ˈpaɪplaɪn/",
         "AmE": "/ˈpaɪplaɪn/",
         "definition": "a long pipe that carries oil or gas; a system for developing future talent",
         "examples": [
            "The oil flows through a pipeline across the desert.",
            "The company is building a new gas pipeline.",
            "The school is a pipeline for future athletes."
         ]
      },
      {
         "id": 87,
         "word": "pirate",
         "role": "noun",
         "BrE": "/ˈpaɪrət/",
         "AmE": "/ˈpaɪrət/",
         "definition": "a person who attacks ships at sea; someone who copies things illegally",
         "examples": [
            "Pirates once sailed the Caribbean.",
            "He downloaded pirated movies.",
            "The company fights against software piracy."
         ]
      },
      {
         "id": 87,
         "word": "pit",
         "role": "noun",
         "BrE": "/pɪt/",
         "AmE": "/pɪt/",
         "definition": "a hole in the ground; a place where something is dug out",
         "examples": [
            "The workers dug a deep pit.",
            "Coal is taken from a mine pit.",
            "There’s a fruit pit inside the cherry."
         ]
      },
      {
         "id": 87,
         "word": "plea",
         "role": "noun",
         "BrE": "/pliː/",
         "AmE": "/pliː/",
         "definition": "an urgent request; a statement in court about being guilty or not",
         "examples": [
            "He made a plea for help.",
            "The charity began with a plea for donations.",
            "She entered a plea of not guilty."
         ]
      },
      {
         "id": 87,
         "word": "plead",
         "role": "verb",
         "BrE": "/pliːd/",
         "AmE": "/pliːd/",
         "definition": "to beg or ask urgently; to declare in court",
         "examples": [
            "She pleaded with him to stay.",
            "He pleaded guilty to the charges.",
            "They pleaded for mercy."
         ]
      },
      {
         "id": 87,
         "word": "pledge",
         "role": "verb, noun",
         "BrE": "/pledʒ/",
         "AmE": "/pledʒ/",
         "definition": "to promise solemnly; a formal promise",
         "examples": [
            "He pledged to tell the truth.",
            "She made a pledge to donate monthly.",
            "The soldiers recited the loyalty pledge."
         ]
      },
      {
         "id": 88,
         "word": "plug",
         "role": "verb, noun",
         "BrE": "/plʌɡ/",
         "AmE": "/plʌɡ/",
         "definition": "to promote something; a device that connects to electricity",
         "examples": [
            "The singer plugged her new album on TV.",
            "He plugged the lamp into the socket.",
            "The marketing team is always plugging the product."
         ]
      },
      {
         "id": 88,
         "word": "plunge",
         "role": "verb",
         "BrE": "/plʌndʒ/",
         "AmE": "/plʌndʒ/",
         "definition": "to jump or fall quickly and suddenly",
         "examples": [
            "The temperature plunged overnight.",
            "He plunged into the cold water.",
            "Sales plunged after the scandal."
         ]
      },
      {
         "id": 88,
         "word": "pole",
         "role": "noun",
         "BrE": "/pəʊl/",
         "AmE": "/poʊl/",
         "definition": "a long, thin piece of wood or metal; one of two opposite ends",
         "examples": [
            "The flag is on a tall pole.",
            "The North Pole is covered in ice.",
            "They used a pole to measure the depth."
         ]
      },
      {
         "id": 88,
         "word": "poll",
         "role": "noun",
         "BrE": "/pəʊl/",
         "AmE": "/poʊl/",
         "definition": "a survey of people's opinions; the act of voting",
         "examples": [
            "The latest poll shows a close race.",
            "Public opinion polls help politicians.",
            "The election poll opens at 8 a.m."
         ]
      },
      {
         "id": 88,
         "word": "pond",
         "role": "noun",
         "BrE": "/pɒnd/",
         "AmE": "/pɑːnd/",
         "definition": "a small body of still water",
         "examples": [
            "There are frogs in the garden pond.",
            "The ducks swim in the park pond.",
            "They stocked the pond with fish."
         ]
      },
      {
         "id": 88,
         "word": "pop",
         "role": "verb",
         "BrE": "/pɒp/",
         "AmE": "/pɑːp/",
         "definition": "to make a short, sharp sound; to move quickly",
         "examples": [
            "The balloon popped.",
            "She popped into the shop for milk.",
            "The cork popped when he opened the bottle."
         ]
      },
      {
         "id": 88,
         "word": "portfolio",
         "role": "noun",
         "BrE": "/pɔːtˈfəʊliəʊ/",
         "AmE": "/pɔːrtˈfoʊlio/",
         "definition": "a collection of someone’s work; a range of investments",
         "examples": [
            "She showed her art portfolio to the gallery.",
            "He manages a large investment portfolio.",
            "Job seekers often prepare a professional portfolio."
         ]
      },
      {
         "id": 88,
         "word": "portray",
         "role": "verb",
         "BrE": "/pɔːˈtreɪ/",
         "AmE": "/pɔːrˈtreɪ/",
         "definition": "to describe or show someone or something in a particular way",
         "examples": [
            "The movie portrays life in the 1920s.",
            "He was portrayed as a hero.",
            "The painting portrays a peaceful scene."
         ]
      },
      {
         "id": 88,
         "word": "postpone",
         "role": "verb",
         "BrE": "/pəʊstˈpəʊn/",
         "AmE": "/poʊstˈpoʊn/",
         "definition": "to delay or put off to a later time",
         "examples": [
            "They postponed the meeting until Friday.",
            "The concert was postponed due to rain.",
            "Don’t postpone doing your homework."
         ]
      },
      {
         "id": 88,
         "word": "practitioner",
         "role": "noun",
         "BrE": "/prækˈtɪʃənər/",
         "AmE": "/prækˈtɪʃənər/",
         "definition": "a person who works in a profession, especially medicine or law",
         "examples": [
            "She is a skilled medical practitioner.",
            "Legal practitioners attended the conference.",
            "The practitioner explained the treatment."
         ]
      },
      {
         "id": 89,
         "word": "preach",
         "role": "verb",
         "BrE": "/priːtʃ/",
         "AmE": "/priːtʃ/",
         "definition": "to speak about religious ideas; to give strong advice",
         "examples": [
            "He preaches at the church every Sunday.",
            "She preaches the value of honesty.",
            "Stop preaching to me — I know what to do!"
         ]
      },
      {
         "id": 89,
         "word": "precedent",
         "role": "noun",
         "BrE": "/ˈpresɪdənt/",
         "AmE": "/ˈpresɪdənt/",
         "definition": "a past event that is used as an example for future cases",
         "examples": [
            "The court decision sets a legal precedent.",
            "There is no precedent for this action.",
            "Breaking this precedent could cause problems."
         ]
      },
      {
         "id": 89,
         "word": "precision",
         "role": "noun",
         "BrE": "/prɪˈsɪʒən/",
         "AmE": "/prɪˈsɪʒən/",
         "definition": "exactness and accuracy",
         "examples": [
            "Surgery requires great precision.",
            "The clock runs with mechanical precision.",
            "He spoke with precision and clarity."
         ]
      },
      {
         "id": 89,
         "word": "predator",
         "role": "noun",
         "BrE": "/ˈpredətər/",
         "AmE": "/ˈpredətər/",
         "definition": "an animal that hunts and eats other animals",
         "examples": [
            "The lion is a top predator.",
            "Birds of prey are natural predators.",
            "Some fish are predators in the ocean."
         ]
      },
      {
         "id": 89,
         "word": "predecessor",
         "role": "noun",
         "BrE": "/ˈpriːdɪsesər/",
         "AmE": "/ˈpriːdəsesər/",
         "definition": "a person who held a position before the current holder",
         "examples": [
            "The new manager improved on her predecessor’s work.",
            "This model replaces its predecessor.",
            "He learned a lot from his predecessor."
         ]
      },
      {
         "id": 89,
         "word": "predominantly",
         "role": "adverb",
         "BrE": "/prɪˈdɒmɪnəntli/",
         "AmE": "/prɪˈdɑːmɪnəntli/",
         "definition": "mainly or mostly",
         "examples": [
            "The area is predominantly rural.",
            "The audience was predominantly young.",
            "The team uses predominantly defensive tactics."
         ]
      },
      {
         "id": 89,
         "word": "pregnancy",
         "role": "noun",
         "BrE": "/ˈpreɡnənsi/",
         "AmE": "/ˈpreɡnənsi/",
         "definition": "the condition of being pregnant",
         "examples": [
            "She had a healthy pregnancy.",
            "Morning sickness is common during pregnancy.",
            "Pregnancy lasts about nine months."
         ]
      },
      {
         "id": 89,
         "word": "prejudice",
         "role": "noun",
         "BrE": "/ˈpredʒʊdɪs/",
         "AmE": "/ˈpredʒədɪs/",
         "definition": "unfair dislike based on race, gender, or other traits",
         "examples": [
            "The book teaches children about prejudice.",
            "He faced prejudice at work.",
            "Society must fight against all forms of prejudice."
         ]
      },
      {
         "id": 89,
         "word": "preliminary",
         "role": "adjective",
         "BrE": "/prɪˈlɪmɪnəri/",
         "AmE": "/prɪˈlɪməneri/",
         "definition": "happening before the main event; introductory",
         "examples": [
            "They held a preliminary meeting.",
            "Preliminary results show a close race.",
            "A preliminary test is required."
         ]
      },
      {
         "id": 89,
         "word": "premier",
         "role": "noun",
         "BrE": "/ˈpremɪər/",
         "AmE": "/prɪˈmɪr/",
         "definition": "the head of government in some countries",
         "examples": [
            "The premier gave a speech on education.",
            "The Canadian premier attended the summit.",
            "The premier announced new health measures."
         ]
      },
      {
         "id": 90,
         "word": "premise",
         "role": "noun",
         "BrE": "/ˈpremɪs/",
         "AmE": "/ˈpremɪs/",
         "definition": "a statement or idea on which reasoning is based",
         "examples": [
            "The whole argument is based on a false premise.",
            "The film’s premise is simple but effective.",
            "We must question the premise of the study."
         ]
      },
      {
         "id": 90,
         "word": "premium",
         "role": "noun",
         "BrE": "/ˈprimiəm/",
         "AmE": "/ˈprimiəm/",
         "definition": "a sum paid for insurance; a high price for quality",
         "examples": [
            "He pays a high premium for car insurance.",
            "The store sells premium chocolate.",
            "They charge a premium for fast delivery."
         ]
      },
      {
         "id": 90,
         "word": "prescribe",
         "role": "verb",
         "BrE": "/prɪˈskraɪb/",
         "AmE": "/prɪˈskraɪb/",
         "definition": "to give medical instructions; to order something as necessary",
         "examples": [
            "The doctor prescribed antibiotics.",
            "The rules prescribe strict safety measures.",
            "She was prescribed rest after the operation."
         ]
      },
      {
         "id": 90,
         "word": "prescription",
         "role": "noun",
         "BrE": "/prɪˈskrɪpʃən/",
         "AmE": "/prɪˈskrɪpʃən/",
         "definition": "a doctor’s written instruction for medicine",
         "examples": [
            "Take this prescription to the pharmacy.",
            "The medicine requires a prescription.",
            "He filled his prescription on time."
         ]
      },
      {
         "id": 90,
         "word": "presently",
         "role": "adverb",
         "BrE": "/ˈprezəntli/",
         "AmE": "/ˈprezəntli/",
         "definition": "soon; currently",
         "examples": [
            "I’ll be with you presently.",
            "Presently, we have no more tickets.",
            "The situation is presently under control."
         ]
      },
      {
         "id": 90,
         "word": "preservation",
         "role": "noun",
         "BrE": "/ˌprezəˈveɪʃən/",
         "AmE": "/ˌprezərˈveɪʃən/",
         "definition": "the act of keeping something safe from harm or decay",
         "examples": [
            "The group works for the preservation of forests.",
            "Historical preservation protects old buildings.",
            "Food preservation methods include freezing and canning."
         ]
      },
      {
         "id": 90,
         "word": "preside",
         "role": "verb",
         "BrE": "/prɪˈzaɪd/",
         "AmE": "/prɪˈzaɪd/",
         "definition": "to be in charge of a meeting or event",
         "examples": [
            "The judge presided over the trial.",
            "She presided at the annual conference.",
            "He presided over many important decisions."
         ]
      },
      {
         "id": 90,
         "word": "presidency",
         "role": "noun",
         "BrE": "/ˈprezɪdənsi/",
         "AmE": "/ˈprezɪdənsi/",
         "definition": "the office or term of a president",
         "examples": [
            "The presidency lasts four years.",
            "He ran for the presidency.",
            "The presidency changed hands peacefully."
         ]
      },
      {
         "id": 90,
         "word": "presidential",
         "role": "adjective",
         "BrE": "/ˌprezɪˈdenʃəl/",
         "AmE": "/ˌprezəˈdenʃəl/",
         "definition": "related to a president",
         "examples": [
            "The presidential election is next year.",
            "He lives in the presidential palace.",
            "Presidential duties include signing laws."
         ]
      },
      {
         "id": 90,
         "word": "prestigious",
         "role": "adjective",
         "BrE": "/presˈtiːdʒəs/",
         "AmE": "/presˈtiːdʒəs/",
         "definition": "respected and admired; having high status",
         "examples": [
            "She got a job at a prestigious company.",
            "Harvard is a prestigious university.",
            "Winning the award is a prestigious honour."
         ]
      },

      {
         "id": 91,
         "word": "presumably",
         "role": "adverb",
         "BrE": "/prɪˈzjuːməbli/",
         "AmE": "/prɪˈzjuːməbli/",
         "definition": "used when you believe something is likely true",
         "examples": [
            "He’s not here yet, but he’s presumably on his way.",
            "The files are presumably stored on the server.",
            "Presumably, she didn’t get the message."
         ]
      },
      {
         "id": 91,
         "word": "presume",
         "role": "verb",
         "BrE": "/prɪˈzjuːm/",
         "AmE": "/prɪˈzjuːm/",
         "definition": "to suppose something is true without proof",
         "examples": [
            "I presume you’ve already eaten.",
            "They presumed he was guilty without evidence.",
            "Don’t presume to know what I think."
         ]
      },
      {
         "id": 91,
         "word": "prevail",
         "role": "verb",
         "BrE": "/prɪˈveɪl/",
         "AmE": "/prɪˈveɪl/",
         "definition": "to be successful or dominant; to win",
         "examples": [
            "Justice will prevail in the end.",
            "Despite difficulties, peace prevailed.",
            "The stronger team prevailed in the final."
         ]
      },
      {
         "id": 91,
         "word": "prevalence",
         "role": "noun",
         "BrE": "/ˈprevələns/",
         "AmE": "/ˈprevələns/",
         "definition": "how common something is",
         "examples": [
            "The prevalence of smoking has decreased.",
            "There is a high prevalence of flu this season.",
            "The study measured the prevalence of anxiety."
         ]
      },
      {
         "id": 91,
         "word": "prevention",
         "role": "noun",
         "BrE": "/prɪˈvenʃən/",
         "AmE": "/prɪˈvenʃən/",
         "definition": "the act of stopping something before it happens",
         "examples": [
            "Prevention is better than cure.",
            "Fire prevention is important in schools.",
            "Regular exercise helps in disease prevention."
         ]
      },
      {
         "id": 91,
         "word": "prey",
         "role": "noun",
         "BrE": "/preɪ/",
         "AmE": "/preɪ/",
         "definition": "an animal that is hunted and eaten by another",
         "examples": [
            "The lion caught its prey quickly.",
            "Small fish are prey for sharks.",
            "Birds of prey hunt mice and insects."
         ]
      },
      {
         "id": 91,
         "word": "principal",
         "role": "noun",
         "BrE": "/ˈprɪnsəpəl/",
         "AmE": "/ˈprɪnsəpəl/",
         "definition": "the head of a school; a main or most important person",
         "examples": [
            "The students met with the principal.",
            "She is the principal dancer in the company.",
            "He’s the principal reason for our success."
         ]
      },
      {
         "id": 91,
         "word": "privatization",
         "role": "noun",
         "BrE": "/ˌpraɪvətaɪˈzeɪʃən/",
         "AmE": "/ˌpraɪvətəˈzeɪʃən/",
         "definition": "the process of selling state-owned businesses to private companies",
         "examples": [
            "The privatization of railways caused debate.",
            "Privatization can lead to higher prices.",
            "The government announced plans for privatization."
         ]
      },
      {
         "id": 91,
         "word": "privilege",
         "role": "noun",
         "BrE": "/ˈprɪvəlɪdʒ/",
         "AmE": "/ˈprɪvəlɪdʒ/",
         "definition": "a special right or advantage",
         "examples": [
            "Access to education is a privilege.",
            "He grew up with the privilege of wealth.",
            "It’s a privilege to work with such experts."
         ]
      },
      {
         "id": 91,
         "word": "probe",
         "role": "noun, verb",
         "BrE": "/prəʊb/",
         "AmE": "/proʊb/",
         "definition": "a detailed investigation; to investigate closely",
         "examples": [
            "Police launched a probe into the corruption case.",
            "The journalist probed for the truth.",
            "A space probe sent back images of Mars."
         ]
      },
      {
         "id": 92,
         "word": "problematic",
         "role": "adjective",
         "BrE": "/ˌprɒbləˈmætɪk/",
         "AmE": "/ˌprɑːbləˈmætɪk/",
         "definition": "causing difficulties; not easy to deal with",
         "examples": [
            "The plan is problematic because it’s too expensive.",
            "His behaviour was seen as problematic.",
            "This is a problematic area of research."
         ]
      },
      {
         "id": 92,
         "word": "proceedings",
         "role": "noun",
         "BrE": "/ˈprəʊsiːdɪŋz/",
         "AmE": "/ˈproʊsiːdɪŋz/",
         "definition": "the events or actions in a formal process, like a trial or meeting",
         "examples": [
            "The court proceedings were open to the public.",
            "Minutes record the proceedings of the meeting.",
            "The scientific proceedings were published yearly."
         ]
      },
      {
         "id": 92,
         "word": "proceeds",
         "role": "noun",
         "BrE": "/ˈprəʊsiːdz/",
         "AmE": "/ˈproʊsiːdz/",
         "definition": "money gained from an activity or sale",
         "examples": [
            "The proceeds from the concert went to charity.",
            "All proceeds will support the school.",
            "The auction raised significant proceeds."
         ]
      },
      {
         "id": 92,
         "word": "processing",
         "role": "noun",
         "BrE": "/ˈprəʊsesɪŋ/",
         "AmE": "/ˈproʊsesɪŋ/",
         "definition": "the action of treating or preparing something",
         "examples": [
            "Data processing is done by computers.",
            "Food processing can reduce nutrients.",
            "Image processing improves photo quality."
         ]
      },
      {
         "id": 92,
         "word": "processor",
         "role": "noun",
         "BrE": "/ˈprəʊsesər/",
         "AmE": "/ˈproʊsesər/",
         "definition": "a machine or person that processes something; a computer chip",
         "examples": [
            "The food processor makes chopping easy.",
            "Her computer has a fast processor.",
            "A loan processor handles mortgage applications."
         ]
      },
      {
         "id": 92,
         "word": "proclaim",
         "role": "verb",
         "BrE": "/prəˈkleɪm/",
         "AmE": "/prəˈkleɪm/",
         "definition": "to announce something publicly or officially",
         "examples": [
            "The king proclaimed a national holiday.",
            "They proclaimed their independence.",
            "The results were proclaimed at midnight."
         ]
      },
      {
         "id": 92,
         "word": "productive",
         "role": "adjective",
         "BrE": "/prəˈdʌktɪv/",
         "AmE": "/prəˈdʌktɪv/",
         "definition": "producing a lot; effective",
         "examples": [
            "It was a productive meeting.",
            "The farm is highly productive.",
            "She had a productive day at work."
         ]
      },
      {
         "id": 92,
         "word": "productivity",
         "role": "noun",
         "BrE": "/ˌprɒdʌkˈtɪvəti/",
         "AmE": "/ˌprɑːdʌkˈtɪvəti/",
         "definition": "the rate at which something is produced",
         "examples": [
            "Technology improves productivity.",
            "The team’s productivity increased.",
            "High productivity leads to more profits."
         ]
      },
      {
         "id": 92,
         "word": "profitable",
         "role": "adjective",
         "BrE": "/ˈprɒfɪtəbl/",
         "AmE": "/ˈprɑːfɪtəbl/",
         "definition": "making money; worth doing",
         "examples": [
            "The business became profitable in year two.",
            "Investing in education is profitable long-term.",
            "It was a profitable deal for both sides."
         ]
      },
      {
         "id": 92,
         "word": "profound",
         "role": "adjective",
         "BrE": "/prəˈfaʊnd/",
         "AmE": "/prəˈfaʊnd/",
         "definition": "very deep or strong; intellectually deep",
         "examples": [
            "She felt a profound sadness.",
            "The book made a profound impact on him.",
            "His understanding of physics is profound."
         ]
      },
      {
         "id": 93,
         "word": "projection",
         "role": "noun",
         "BrE": "/prəˈdʒekʃən/",
         "AmE": "/prəˈdʒekʃən/",
         "definition": "a forecast; the act of showing an image on a screen",
         "examples": [
            "Economic projections show growth next year.",
            "The teacher used a projector for the lesson.",
            "The movie’s projection was clear and bright."
         ]
      },
      {
         "id": 93,
         "word": "prominent",
         "role": "adjective",
         "BrE": "/ˈprɒmɪnənt/",
         "AmE": "/ˈprɑːmɪnənt/",
         "definition": "important or famous; easily seen",
         "examples": [
            "A prominent scientist spoke at the event.",
            "She played a prominent role in the project.",
            "The mountain is a prominent landmark."
         ]
      },
      {
         "id": 93,
         "word": "pronounced",
         "role": "adjective",
         "BrE": "/prəˈnaʊnst/",
         "AmE": "/prəˈnaʊnst/",
         "definition": "very noticeable or strong",
         "examples": [
            "There’s a pronounced difference between them.",
            "He has a pronounced accent.",
            "The effect was pronounced after the treatment."
         ]
      },
      {
         "id": 93,
         "word": "propaganda",
         "role": "noun",
         "BrE": "/ˌprɒpəˈɡændə/",
         "AmE": "/ˌprɑːpəˈɡændə/",
         "definition": "information used to promote a political cause, often biased",
         "examples": [
            "The film was used as war propaganda.",
            "Be careful — that news might be propaganda.",
            "The regime spread propaganda through TV."
         ]
      },
      {
         "id": 93,
         "word": "proposition",
         "role": "noun",
         "BrE": "/ˌprɒpəˈzɪʃən/",
         "AmE": "/ˌprɑːpəˈzɪʃən/",
         "definition": "a suggestion or idea; a statement that can be true or false",
         "examples": [
            "He made a business proposition.",
            "The proposition was debated in parliament.",
            "That’s an interesting proposition — let me think."
         ]
      },
      {
         "id": 93,
         "word": "prosecute",
         "role": "verb",
         "BrE": "/ˈprɒsɪkjuːt/",
         "AmE": "/ˈprɑːsɪkjuːt/",
         "definition": "to charge someone with a crime in court",
         "examples": [
            "The state will prosecute the suspect.",
            "They decided not to prosecute due to lack of evidence.",
            "He was prosecuted for tax fraud."
         ]
      },
      {
         "id": 93,
         "word": "prosecution",
         "role": "noun",
         "BrE": "/ˌprɒsɪˈkjuːʃən/",
         "AmE": "/ˌprɑːsɪˈkjuːʃən/",
         "definition": "the legal process of charging someone with a crime",
         "examples": [
            "The prosecution presented strong evidence.",
            "She worked in criminal prosecution.",
            "The prosecution lasted three weeks."
         ]
      },
      {
         "id": 93,
         "word": "prosecutor",
         "role": "noun",
         "BrE": "/ˈprɒsɪkjuːtər/",
         "AmE": "/ˈprɑːsɪkjuːtər/",
         "definition": "a lawyer who brings a case against someone in court",
         "examples": [
            "The prosecutor argued the defendant was guilty.",
            "The prosecutor questioned the witness.",
            "A skilled prosecutor can win tough cases."
         ]
      },
      {
         "id": 93,
         "word": "prospective",
         "role": "adjective",
         "BrE": "/prɒˈspektɪv/",
         "AmE": "/prɑːˈspektɪv/",
         "definition": "possible or expected in the future",
         "examples": [
            "We interviewed several prospective employees.",
            "Prospective students must apply by June.",
            "He’s a prospective buyer of the house."
         ]
      },
      {
         "id": 93,
         "word": "prosperity",
         "role": "noun",
         "BrE": "/prɒˈsperəti/",
         "AmE": "/prɑːˈsperəti/",
         "definition": "economic success and wealth",
         "examples": [
            "The country enjoyed years of prosperity.",
            "Education leads to greater prosperity.",
            "Peace is needed for national prosperity."
         ]
      },
      {
         "id": 94,
         "word": "protective",
         "role": "adjective",
         "BrE": "/prəˈtektɪv/",
         "AmE": "/prəˈtektɪv/",
         "definition": "meant to keep someone or something safe",
         "examples": [
            "Wear protective gear when working.",
            "Parents are naturally protective of their children.",
            "The coating provides a protective layer."
         ]
      },
      {
         "id": 94,
         "word": "protocol",
         "role": "noun",
         "BrE": "/ˈprəʊtəkɒl/",
         "AmE": "/ˈproʊtəkɑːl/",
         "definition": "official rules for behavior, especially in diplomacy or computing",
         "examples": [
            "Diplomatic protocol requires respect.",
            "Follow the safety protocol at all times.",
            "Internet communication uses TCP/IP protocol."
         ]
      },
      {
         "id": 94,
         "word": "province",
         "role": "noun",
         "BrE": "/ˈprɒvɪns/",
         "AmE": "/ˈprɑːvɪns/",
         "definition": "an area of a country with its own government; a field of knowledge",
         "examples": [
            "Quebec is a province of Canada.",
            "This matter is outside my province.",
            "The discovery opened a new province of science."
         ]
      },
      {
         "id": 94,
         "word": "provincial",
         "role": "adjective",
         "BrE": "/prəˈvɪnʃəl/",
         "AmE": "/prəˈvɪnʃəl/",
         "definition": "related to a province; narrow-minded or unsophisticated",
         "examples": [
            "She works for the provincial government.",
            "The town has a very provincial feel.",
            "His views are a bit too provincial."
         ]
      },
      {
         "id": 94,
         "word": "provision",
         "role": "noun",
         "BrE": "/prəˈvɪʒən/",
         "AmE": "/prəˈvɪʒən/",
         "definition": "a condition in a law or agreement; supply of something",
         "examples": [
            "The contract includes a provision for early termination.",
            "There is a provision of food and water.",
            "Legal provisions protect workers’ rights."
         ]
      },
      {
         "id": 94,
         "word": "provoke",
         "role": "verb",
         "BrE": "/prəˈvəʊk/",
         "AmE": "/prəˈvoʊk/",
         "definition": "to cause a reaction, often anger or emotion",
         "examples": [
            "His comment provoked a strong response.",
            "The film was designed to provoke thought.",
            "Don’t provoke the dog — it might bite."
         ]
      },
      {
         "id": 94,
         "word": "psychiatric",
         "role": "adjective",
         "BrE": "/ˌsaɪkiˈætrɪk/",
         "AmE": "/ˌsaɪkiˈætrɪk/",
         "definition": "related to mental health and illness",
         "examples": [
            "He was sent to a psychiatric hospital.",
            "Psychiatric care should be more available.",
            "She consulted a psychiatric expert."
         ]
      },
      {
         "id": 94,
         "word": "pulse",
         "role": "noun",
         "BrE": "/pʌls/",
         "AmE": "/pʌls/",
         "definition": "the beat of the heart; a sudden burst of energy",
         "examples": [
            "The doctor checked her pulse.",
            "The city has a fast pulse of activity.",
            "A pulse of electricity powered the light."
         ]
      },
      {
         "id": 94,
         "word": "pump",
         "role": "verb, noun",
         "BrE": "/pʌmp/",
         "AmE": "/pʌmp/",
         "definition": "to move liquid or air using a device; the device itself",
         "examples": [
            "He pumped air into the bicycle tire.",
            "She pumped water from the well.",
            "The heart is a natural pump."
         ]
      },
      {
         "id": 94,
         "word": "punch",
         "role": "noun, verb",
         "BrE": "/pʌntʃ/",
         "AmE": "/pʌntʃ/",
         "definition": "a hit with the fist; to hit with the fist",
         "examples": [
            "He threw a punch at the man.",
            "She got a punch in the arm.",
            "Don’t punch the wall — you’ll hurt your hand."
         ]
      },
      {
         "id": 95,
         "word": "query",
         "role": "noun",
         "BrE": "/ˈkwɪəri/",
         "AmE": "/ˈkwɪri/",
         "definition": "a question, especially one made formally",
         "examples": [
            "Please send your queries to support@example.com.",
            "He raised a query about the schedule.",
            "The database processes user queries."
         ]
      },
      {
         "id": 95,
         "word": "quest",
         "role": "noun",
         "BrE": "/kwest/",
         "AmE": "/kwest/",
         "definition": "a long search for something important",
         "examples": [
            "They went on a quest for treasure.",
            "Her quest for knowledge never ended.",
            "The knight began a quest to save the princess."
         ]
      },
      {
         "id": 95,
         "word": "quota",
         "role": "noun",
         "BrE": "/ˈkwəʊtə/",
         "AmE": "/ˈkwoʊtə/",
         "definition": "a fixed amount or number that is required or allowed",
         "examples": [
            "Each worker has a daily quota.",
            "The country has a fishing quota.",
            "They filled the student quota quickly."
         ]
      },
      {
         "id": 95,
         "word": "radar",
         "role": "noun",
         "BrE": "/ˈreɪdɑːr/",
         "AmE": "/ˈreɪdɑːr/",
         "definition": "a system that uses radio waves to detect objects",
         "examples": [
            "The plane appeared on radar.",
            "Police use radar to catch speeding cars.",
            "Birds can sometimes be seen on weather radar."
         ]
      },
      {
         "id": 95,
         "word": "radical",
         "role": "adjective",
         "BrE": "/ˈrædɪkəl/",
         "AmE": "/ˈrædɪkəl/",
         "definition": "very different from the usual; extreme",
         "examples": [
            "They proposed radical changes to the system.",
            "Her ideas were too radical for the committee.",
            "A radical treatment saved his life."
         ]
      },
      {
         "id": 95,
         "word": "rage",
         "role": "noun",
         "BrE": "/reɪdʒ/",
         "AmE": "/reɪdʒ/",
         "definition": "extreme anger; a strong, widespread emotion",
         "examples": [
            "He flew into a rage when he heard the news.",
            "Environmental rage is growing.",
            "The virus was raging across the country."
         ]
      },
      {
         "id": 95,
         "word": "raid",
         "role": "noun, verb",
         "BrE": "/reɪd/",
         "AmE": "/reɪd/",
         "definition": "a surprise attack; to attack suddenly",
         "examples": [
            "Police conducted a raid on the drug house.",
            "Soldiers raided the enemy camp.",
            "They went on a midnight raid."
         ]
      },
      {
         "id": 95,
         "word": "rally",
         "role": "noun, verb",
         "BrE": "/ˈræli/",
         "AmE": "/ˈræli/",
         "definition": "a large public meeting to support a cause; to gather for support",
         "examples": [
            "Thousands attended the political rally.",
            "The team rallied in the second half.",
            "Activists rallied for climate action."
         ]
      },
      {
         "id": 95,
         "word": "ranking",
         "role": "noun",
         "BrE": "/ˈræŋkɪŋ/",
         "AmE": "/ˈræŋkɪŋ/",
         "definition": "a position in a list; the act of ordering by level",
         "examples": [
            "Her ranking improved after the tournament.",
            "The university has a high global ranking.",
            "Employees are given a performance ranking."
         ]
      },
      {
         "id": 95,
         "word": "rape",
         "role": "noun, verb",
         "BrE": "/reɪp/",
         "AmE": "/reɪp/",
         "definition": "forced sexual intercourse; to force someone into sex",
         "examples": [
            "Rape is a serious crime.",
            "She was raped and reported it to police.",
            "The law punishes rape with long imprisonment."
         ]
      },
      {
         "id": 96,
         "word": "ratio",
         "role": "noun",
         "BrE": "/ˈreɪʃiəʊ/",
         "AmE": "/ˈreɪʃioʊ/",
         "definition": "the relationship between two amounts",
         "examples": [
            "The student-to-teacher ratio is 20:1.",
            "The ratio of boys to girls is nearly equal.",
            "This mixture has a 3:1 ratio of water to juice."
         ]
      },
      {
         "id": 96,
         "word": "rational",
         "role": "adjective",
         "BrE": "/ˈræʃənəl/",
         "AmE": "/ˈræʃənəl/",
         "definition": "logical; able to think clearly",
         "examples": [
            "Make a rational decision, not an emotional one.",
            "He gave a rational explanation.",
            "It’s not rational to fear everything."
         ]
      },
      {
         "id": 96,
         "word": "ray",
         "role": "noun",
         "BrE": "/reɪ/",
         "AmE": "/reɪ/",
         "definition": "a beam of light or energy",
         "examples": [
            "Sunlight came through in golden rays.",
            "X-rays help doctors see bones.",
            "A ray of hope appeared."
         ]
      },
      {
         "id": 96,
         "word": "readily",
         "role": "adverb",
         "BrE": "/ˈredɪli/",
         "AmE": "/ˈredɪli/",
         "definition": "easily or without delay",
         "examples": [
            "She readily agreed to help.",
            "The information is readily available online.",
            "He was readily accepted into the program."
         ]
      },
      {
         "id": 96,
         "word": "realization",
         "role": "noun",
         "BrE": "/ˌrɪəlaɪˈzeɪʃən/",
         "AmE": "/ˌriːələˈzeɪʃən/",
         "definition": "the moment you understand something clearly",
         "examples": [
            "The realization hit her suddenly.",
            "His realization that he was wrong changed everything.",
            "With realization, she saw the truth."
         ]
      },
      {
         "id": 96,
         "word": "realm",
         "role": "noun",
         "BrE": "/relm/",
         "AmE": "/relm/",
         "definition": "a field of activity or interest; a kingdom",
         "examples": [
            "This topic is outside my realm of knowledge.",
            "Fantasy stories are set in magical realms.",
            "Science and art are different realms."
         ]
      },
      {
         "id": 96,
         "word": "rear",
         "role": "adjective, noun",
         "BrE": "/rɪər/",
         "AmE": "/rɪr/",
         "definition": "back part of something; to raise a child",
         "examples": [
            "They sat in the rear of the car.",
            "The house has a large rear garden.",
            "She reared three children alone."
         ]
      },
      {
         "id": 96,
         "word": "reasoning",
         "role": "noun",
         "BrE": "/ˈriːzənɪŋ/",
         "AmE": "/ˈriːzənɪŋ/",
         "definition": "the process of thinking logically to form conclusions",
         "examples": [
            "His reasoning was sound and clear.",
            "Good reasoning is key in debates.",
            "Children develop reasoning skills over time."
         ]
      },
      {
         "id": 96,
         "word": "reassure",
         "role": "verb",
         "BrE": "/ˌriːəˈʃʊər/",
         "AmE": "/ˌriːəˈʃʊr/",
         "definition": "to make someone feel less worried",
         "examples": [
            "The doctor reassured her about the test results.",
            "He reassured the child it was safe.",
            "We need to reassure investors."
         ]
      },
      {
         "id": 96,
         "word": "rebellion",
         "role": "noun",
         "BrE": "/rɪˈbeljən/",
         "AmE": "/rɪˈbeljən/",
         "definition": "an organized attempt to resist or overthrow authority",
         "examples": [
            "The rebellion was crushed by the army.",
            "History has many examples of rebellion.",
            "There was rebellion against the new rules."
         ]
      },
      {
         "id": 97,
         "word": "recipient",
         "role": "noun",
         "BrE": "/rɪˈsɪpiənt/",
         "AmE": "/rɪˈsɪpiənt/",
         "definition": "a person who receives something",
         "examples": [
            "She was the recipient of a scholarship.",
            "The recipients of the awards were announced.",
            "He is the main recipient of the messages."
         ]
      },
      {
         "id": 97,
         "word": "reconstruction",
         "role": "noun",
         "BrE": "/ˌriːkənˈstrʌkʃən/",
         "AmE": "/ˌriːkənˈstrʌkʃən/",
         "definition": "the act of rebuilding something",
         "examples": [
            "Reconstruction after the war took years.",
            "The museum is undergoing reconstruction.",
            "Historical reconstruction helps us understand the past."
         ]
      },
      {
         "id": 97,
         "word": "recount1",
         "role": "verb",
         "BrE": "/rɪˈkaʊnt/",
         "AmE": "/rɪˈkaʊnt/",
         "definition": "to count again; to tell a story",
         "examples": [
            "They had to recount the votes.",
            "She recounted her travel experiences.",
            "He recounted every detail of the accident."
         ]
      },
      {
         "id": 97,
         "word": "referendum",
         "role": "noun",
         "BrE": "/ˌrefəˈrendəm/",
         "AmE": "/ˌrefəˈrendəm/",
         "definition": "a public vote on an important issue",
         "examples": [
            "The country held a referendum on independence.",
            "The referendum passed with 52% voting yes.",
            "A referendum will decide the future of the law."
         ]
      },
      {
         "id": 97,
         "word": "reflection",
         "role": "noun",
         "BrE": "/rɪˈflekʃən/",
         "AmE": "/rɪˈflekʃən/",
         "definition": "an image in a mirror; serious thought",
         "examples": [
            "Her face was a reflection in the window.",
            "After reflection, he changed his mind.",
            "The essay shows deep personal reflection."
         ]
      },
      {
         "id": 97,
         "word": "reform",
         "role": "noun, verb",
         "BrE": "/rɪˈfɔːm/",
         "AmE": "/rɪˈfɔːrm/",
         "definition": "a change made to improve something",
         "examples": [
            "The government introduced education reform.",
            "They are trying to reform the justice system.",
            "Prison reform is long overdue."
         ]
      },
      {
         "id": 97,
         "word": "refuge",
         "role": "noun",
         "BrE": "/ˈrefjuːdʒ/",
         "AmE": "/ˈrefjuːdʒ/",
         "definition": "a safe place; protection from danger",
         "examples": [
            "The church offered refuge to the homeless.",
            "They fled to another country in search of refuge.",
            "The forest provided refuge from the storm."
         ]
      },
      {
         "id": 97,
         "word": "refusal",
         "role": "noun",
         "BrE": "/rɪˈfjuːzəl/",
         "AmE": "/rɪˈfjuːzəl/",
         "definition": "the act of saying no",
         "examples": [
            "His refusal to help upset everyone.",
            "She faced refusal after every job application.",
            "The refusal was polite but firm."
         ]
      },
      {
         "id": 97,
         "word": "regain",
         "role": "verb",
         "BrE": "/rɪˈɡeɪn/",
         "AmE": "/rɪˈɡeɪn/",
         "definition": "to get back something lost",
         "examples": [
            "He regained consciousness after the fall.",
            "They worked hard to regain trust.",
            "The team regained the lead in the second half."
         ]
      },
      {
         "id": 97,
         "word": "regardless",
         "role": "adverb",
         "BrE": "/rɪˈɡɑːdləs/",
         "AmE": "/rɪˈɡɑːrdləs/",
         "definition": "without being affected by something; anyway",
         "examples": [
            "I’m going regardless of the weather.",
            "He continued regardless of the risks.",
            "She was promoted regardless of her age."
         ]
      },
      {
         "id": 98,
         "word": "regime",
         "role": "noun",
         "BrE": "/reɪˈʒiːm/",
         "AmE": "/reɪˈʒiːm/",
         "definition": "a government, especially an authoritarian one",
         "examples": [
            "The old regime was overthrown in 1989.",
            "The regime censored the press.",
            "Life under the regime was hard."
         ]
      },
      {
         "id": 98,
         "word": "regulator",
         "role": "noun",
         "BrE": "/ˈreɡjuleɪtər/",
         "AmE": "/ˈreɡjəleɪtər/",
         "definition": "a person or organization that controls an industry",
         "examples": [
            "The financial regulator fined the bank.",
            "Safety regulators inspected the factory.",
            "Independent regulators ensure fair play."
         ]
      },
      {
         "id": 98,
         "word": "regulatory",
         "role": "adjective",
         "BrE": "/ˈreɡjələtəri/",
         "AmE": "/ˈreɡjələtɔːri/",
         "definition": "related to rules or control",
         "examples": [
            "Regulatory standards must be followed.",
            "The agency has regulatory power.",
            "Regulatory changes affect many businesses."
         ]
      },
      {
         "id": 98,
         "word": "rehabilitation",
         "role": "noun",
         "BrE": "/ˌriːhəˌbɪlɪˈteɪʃən/",
         "AmE": "/ˌriːhəˌbɪləˈteɪʃən/",
         "definition": "the process of helping someone return to normal life after illness or crime",
         "examples": [
            "He went through physical rehabilitation.",
            "Prison rehabilitation programs help reduce crime.",
            "The aim is social and emotional rehabilitation."
         ]
      },
      {
         "id": 98,
         "word": "reign",
         "role": "noun, verb",
         "BrE": "/reɪn/",
         "AmE": "/reɪn/",
         "definition": "the period when a king or queen rules; to rule",
         "examples": [
            "Queen Victoria’s reign lasted 63 years.",
            "He reigned over the kingdom for decades.",
            "Terror reigned during the dictatorship."
         ]
      },
      {
         "id": 98,
         "word": "rejection",
         "role": "noun",
         "BrE": "/rɪˈdʒekʃən/",
         "AmE": "/rɪˈdʒekʃən/",
         "definition": "the act of refusing or not accepting",
         "examples": [
            "She faced rejection from all universities.",
            "The rejection hurt his confidence.",
            "Organ rejection is a risk in transplants."
         ]
      },
      {
         "id": 98,
         "word": "relevance",
         "role": "noun",
         "BrE": "/ˈreləvəns/",
         "AmE": "/ˈreləvəns/",
         "definition": "the importance or connection to the matter at hand",
         "examples": [
            "The evidence has no relevance to the case.",
            "Check the relevance of the information.",
            "Cultural relevance matters in education."
         ]
      },
      {
         "id": 98,
         "word": "reliability",
         "role": "noun",
         "BrE": "/rɪˌlaɪəˈbɪləti/",
         "AmE": "/rɪˌlaɪəˈbɪləti/",
         "definition": "the quality of being trustworthy or consistent",
         "examples": [
            "The car is known for its reliability.",
            "We depend on the reliability of the data.",
            "Reliability is key in engineering."
         ]
      },
      {
         "id": 98,
         "word": "reluctant",
         "role": "adjective",
         "BrE": "/rɪˈlʌktənt/",
         "AmE": "/rɪˈlʌktənt/",
         "definition": "unwilling or hesitant",
         "examples": [
            "He was reluctant to speak.",
            "She gave a reluctant yes.",
            "They were reluctant to change the rules."
         ]
      },
      {
         "id": 98,
         "word": "remainder",
         "role": "noun",
         "BrE": "/rɪˈmeɪndər/",
         "AmE": "/rɪˈmeɪndər/",
         "definition": "what is left after the rest has been used or taken",
         "examples": [
            "I ate the remainder of the pizza.",
            "The remainder of the money was donated.",
            "Only a small remainder of the forest remains."
         ]
      },
      {
         "id": 99,
         "word": "remains",
         "role": "noun",
         "BrE": "/rɪˈmeɪnz/",
         "AmE": "/rɪˈmeɪnz/",
         "definition": "dead body; what is left of something",
         "examples": [
            "Archaeologists found human remains.",
            "The remains of the meal were still on the table.",
            "Ancient remains were discovered in the cave."
         ]
      },
      {
         "id": 99,
         "word": "remedy",
         "role": "noun",
         "BrE": "/ˈremədi/",
         "AmE": "/ˈremədi/",
         "definition": "a solution to a problem; medicine for illness",
         "examples": [
            "The best remedy for a cold is rest.",
            "There is no easy remedy for poverty.",
            "She used a herbal remedy for pain."
         ]
      },
      {
         "id": 99,
         "word": "reminder",
         "role": "noun",
         "BrE": "/rɪˈmaɪndər/",
         "AmE": "/rɪˈmaɪndər/",
         "definition": "something that helps you remember",
         "examples": [
            "Set a reminder for the meeting.",
            "The photo is a reminder of happy times.",
            "This is a sad reminder of the accident."
         ]
      },
      {
         "id": 99,
         "word": "removal",
         "role": "noun",
         "BrE": "/rɪˈmuːvl/",
         "AmE": "/rɪˈmuːvl/",
         "definition": "the act of taking something away",
         "examples": [
            "The removal of the statue caused debate.",
            "Tooth removal requires a dentist.",
            "The removal of weeds is important for gardening."
         ]
      },
      {
         "id": 99,
         "word": "render",
         "role": "verb",
         "BrE": "/ˈrendər/",
         "AmE": "/ˈrendər/",
         "definition": "to cause to be; to give or provide",
         "examples": [
            "The accident rendered him unconscious.",
            "The judge will render a decision tomorrow.",
            "They rendered great service to the community."
         ]
      },
      {
         "id": 99,
         "word": "renew",
         "role": "verb",
         "BrE": "/rɪˈnjuː/",
         "AmE": "/rɪˈnuː/",
         "definition": "to make something active again; to extend",
         "examples": [
            "She renewed her passport.",
            "They renewed their wedding vows.",
            "Let’s renew our efforts."
         ]
      },
      {
         "id": 99,
         "word": "renowned",
         "role": "adjective",
         "BrE": "/rɪˈnaʊnd/",
         "AmE": "/rɪˈnaʊnd/",
         "definition": "famous and respected",
         "examples": [
            "He is a renowned scientist.",
            "The city is renowned for its art.",
            "A renowned chef cooked the meal."
         ]
      },
      {
         "id": 99,
         "word": "rental",
         "role": "noun",
         "BrE": "/ˈrentəl/",
         "AmE": "/ˈrentəl/",
         "definition": "something rented; the cost of renting",
         "examples": [
            "The car rental includes insurance.",
            "Monthly rental for the apartment is $1,200.",
            "They offer bike rentals near the park."
         ]
      },
      {
         "id": 99,
         "word": "replacement",
         "role": "noun",
         "BrE": "/rɪˈpleɪsmənt/",
         "AmE": "/rɪˈpleɪsmənt/",
         "definition": "a person or thing that takes the place of another",
         "examples": [
            "The replacement player scored a goal.",
            "We need a replacement for the broken window.",
            "Natural teeth are better than replacements."
         ]
      },
      {
         "id": 99,
         "word": "reportedly",
         "role": "adverb",
         "BrE": "/rɪˈpɔːtɪdli/",
         "AmE": "/rɪˈpɔːrtɪdli/",
         "definition": "according to what has been reported",
         "examples": [
            "He was reportedly seen in Paris.",
            "The event was reportedly attended by thousands.",
            "The company is reportedly planning a merger."
         ]
      },
      {
         "id": 100,
         "word": "representation",
         "role": "noun",
         "BrE": "/ˌreprɪzenˈteɪʃən/",
         "AmE": "/ˌreprɪzenˈteɪʃən/",
         "definition": "the act of standing for or showing something",
         "examples": [
            "The painting is a representation of war.",
            "Fair representation in government is important.",
            "She gave a full representation of the facts."
         ]
      },
      {
         "id": 100,
         "word": "reproduce",
         "role": "verb",
         "BrE": "/ˌriːprəˈdjuːs/",
         "AmE": "/ˌriːprəˈduːs/",
         "definition": "to make a copy; to produce offspring",
         "examples": [
            "The machine can reproduce images.",
            "Humans reproduce sexually.",
            "Some plants reproduce from cuttings."
         ]
      },
      {
         "id": 100,
         "word": "reproduction",
         "role": "noun",
         "BrE": "/ˌriːprəˈdʌkʃən/",
         "AmE": "/ˌriːprəˈdʌkʃən/",
         "definition": "the process of making copies; producing offspring",
         "examples": [
            "The reproduction of art must be approved.",
            "Sexual reproduction involves two parents.",
            "Digital reproduction of music is common."
         ]
      },
      {
         "id": 100,
         "word": "republic",
         "role": "noun",
         "BrE": "/rɪˈpʌblɪk/",
         "AmE": "/rɪˈpʌblɪk/",
         "definition": "a country where people elect their leaders",
         "examples": [
            "France is a republic.",
            "The United States is a federal republic.",
            "The republic was founded in 1776."
         ]
      },
      {
         "id": 100,
         "word": "resemble",
         "role": "verb",
         "BrE": "/rɪˈzembl/",
         "AmE": "/rɪˈzembl/",
         "definition": "to look or seem like someone or something",
         "examples": [
            "She resembles her mother.",
            "The painting resembles a photograph.",
            "The new phone doesn’t resemble the old model."
         ]
      },
      {
         "id": 100,
         "word": "reside",
         "role": "verb",
         "BrE": "/rɪˈzaɪd/",
         "AmE": "/rɪˈzaɪd/",
         "definition": "to live in a place",
         "examples": [
            "He resides in London.",
            "Where do you reside?",
            "The president resides in the White House."
         ]
      },
      {
         "id": 100,
         "word": "residence",
         "role": "noun",
         "BrE": "/ˈrezɪdəns/",
         "AmE": "/ˈrezɪdəns/",
         "definition": "the place where someone lives",
         "examples": [
            "Their residence is in the countryside.",
            "The official residence of the prime minister is guarded.",
            "She changed her legal residence."
         ]
      },
      {
         "id": 100,
         "word": "residential",
         "role": "adjective",
         "BrE": "/rɪˈzɪdənʃəl/",
         "AmE": "/rɪˈzɪdənʃəl/",
         "definition": "relating to housing or where people live",
         "examples": [
            "This is a quiet residential area.",
            "Residential buildings must follow safety codes.",
            "They are developing a new residential complex."
         ]
      },
      {
         "id": 100,
         "word": "residue",
         "role": "noun",
         "BrE": "/ˈrezɪdjuː/",
         "AmE": "/ˈrezɪduː/",
         "definition": "a small amount that remains after most has gone",
         "examples": [
            "There was a residue of soap in the sink.",
            "Chemical residue was found on the fruit.",
            "Ash is the residue after burning."
         ]
      },
      {
         "id": 100,
         "word": "resignation",
         "role": "noun",
         "BrE": "/ˌrezɪɡˈneɪʃən/",
         "AmE": "/ˌrezɪɡˈneɪʃən/",
         "definition": "the act of leaving a job; acceptance of fate",
         "examples": [
            "He submitted his resignation yesterday.",
            "Her resignation was unexpected.",
            "There was a sense of resignation about the loss."
         ]
      },
      {
         "id": 101,
         "word": "resistance",
         "role": "noun",
         "BrE": "/rɪˈzɪstəns/",
         "AmE": "/rɪˈzɪstəns/",
         "definition": "the act of opposing or refusing something",
         "examples": [
            "There was strong resistance to the new law.",
            "The body’s resistance to disease is important.",
            "Passive resistance can be powerful."
         ]
      },
      {
         "id": 101,
         "word": "respective",
         "role": "adjective",
         "BrE": "/rɪˈspektɪv/",
         "AmE": "/rɪˈspektɪv/",
         "definition": "belonging to each one of two or more people or things",
         "examples": [
            "They returned to their respective homes.",
            "Students sat with their respective teachers.",
            "The teams kept their respective positions."
         ]
      },
      {
         "id": 101,
         "word": "respectively",
         "role": "adverb",
         "BrE": "/rɪˈspektɪvli/",
         "AmE": "/rɪˈspektɪvli/",
         "definition": "in the same order as the things just mentioned",
         "examples": [
            "John and Mary are 25 and 28, respectively.",
            "The scores were 80, 85, and 90, respectively.",
            "Anna and Tom finished first and second, respectively."
         ]
      },
      {
         "id": 101,
         "word": "restoration",
         "role": "noun",
         "BrE": "/ˌrestəˈreɪʃən/",
         "AmE": "/ˌrestəˈreɪʃən/",
         "definition": "the act of bringing something back to its original condition",
         "examples": [
            "The restoration of the old building took years.",
            "Art restoration requires great skill.",
            "The forest is undergoing ecological restoration."
         ]
      },
      {
         "id": 101,
         "word": "restraint",
         "role": "noun",
         "BrE": "/rɪˈstreɪnt/",
         "AmE": "/rɪˈstreɪnt/",
         "definition": "the act of holding back; self-control",
         "examples": [
            "He showed great restraint during the argument.",
            "Physical restraint may be used in emergencies.",
            "Financial restraint helps avoid debt."
         ]
      },
      {
         "id": 101,
         "word": "resume",
         "role": "verb",
         "BrE": "/rɪˈzjuːm/",
         "AmE": "/rɪˈzuːm/",
         "definition": "to start again after a pause",
         "examples": [
            "The meeting will resume at 2 p.m.",
            "She resumed her studies after the break.",
            "Work resumed after the strike ended."
         ]
      },
      {
         "id": 101,
         "word": "retreat",
         "role": "noun, verb",
         "BrE": "/rɪˈtriːt/",
         "AmE": "/rɪˈtriːt/",
         "definition": "a place for quiet reflection; to move back or withdraw",
         "examples": [
            "They went on a meditation retreat.",
            "The army was forced to retreat.",
            "She retreated from the conversation."
         ]
      },
      {
         "id": 101,
         "word": "retrieve",
         "role": "verb",
         "BrE": "/rɪˈtriːv/",
         "AmE": "/rɪˈtriːv/",
         "definition": "to get something back; to recover",
         "examples": [
            "He retrieved his keys from the sofa.",
            "The dog can retrieve a ball from water.",
            "Scientists retrieved data from the old computer."
         ]
      },
      {
         "id": 101,
         "word": "revelation",
         "role": "noun",
         "BrE": "/ˌrevəˈleɪʃən/",
         "AmE": "/ˌrevəˈleɪʃən/",
         "definition": "a surprising or important discovery",
         "examples": [
            "The report was a revelation to the public.",
            "It was a personal revelation that changed her life.",
            "The test results brought a shocking revelation."
         ]
      },
      {
         "id": 101,
         "word": "revenge",
         "role": "noun",
         "BrE": "/rɪˈvendʒ/",
         "AmE": "/rɪˈvendʒ/",
         "definition": "hurting someone because they hurt you",
         "examples": [
            "He sought revenge for the betrayal.",
            "Revenge only leads to more pain.",
            "The movie is about love and revenge."
         ]
      },
      {
         "id": 102,
         "word": "reverse",
         "role": "verb, noun, adjective",
         "BrE": "/rɪˈvɜːs/",
         "AmE": "/rɪˈvɜːrs/",
         "definition": "to change direction; to go or make something go backwards",
         "examples": [
            "He reversed the car into the driveway.",
            "The court reversed the decision.",
            "The situation took a reverse turn."
         ]
      },
      {
         "id": 102,
         "word": "revival",
         "role": "noun",
         "BrE": "/rɪˈvaɪvl/",
         "AmE": "/rɪˈvaɪvl/",
         "definition": "a renewal of interest or activity",
         "examples": [
            "There’s been a revival of traditional music.",
            "The play had a successful revival.",
            "Economic revival began after the crisis."
         ]
      },
      {
         "id": 102,
         "word": "revive",
         "role": "verb",
         "BrE": "/rɪˈvaɪv/",
         "AmE": "/rɪˈvaɪv/",
         "definition": "to bring back to life or use; to become active again",
         "examples": [
            "They revived the old tradition.",
            "Doctors tried to revive the patient.",
            "Interest in the project revived last year."
         ]
      },
      {
         "id": 102,
         "word": "revolutionary",
         "role": "adjective",
         "BrE": "/ˌrevəˈluːʃənəri/",
         "AmE": "/ˌrevəˈluːʃəneri/",
         "definition": "involving extreme change; radically new",
         "examples": [
            "The invention was revolutionary for medicine.",
            "She supports revolutionary political change.",
            "This phone has a revolutionary design."
         ]
      },
      {
         "id": 102,
         "word": "rhetoric",
         "role": "noun",
         "BrE": "/ˈretərɪk/",
         "AmE": "/ˈretərɪk/",
         "definition": "speech or writing intended to persuade, often with style over truth",
         "examples": [
            "His speech was full of political rhetoric.",
            "Don’t believe the empty rhetoric.",
            "Powerful rhetoric won the crowd’s support."
         ]
      },
      {
         "id": 102,
         "word": "rifle",
         "role": "noun",
         "BrE": "/ˈraɪfl/",
         "AmE": "/ˈraɪfl/",
         "definition": "a type of long gun with a barrel that makes bullets spin",
         "examples": [
            "The soldier carried a rifle.",
            "Hunters use rifles for long-distance shooting.",
            "The museum has an old military rifle."
         ]
      },
      {
         "id": 102,
         "word": "riot",
         "role": "noun",
         "BrE": "/ˈraɪət/",
         "AmE": "/ˈraɪət/",
         "definition": "a violent disturbance by a crowd",
         "examples": [
            "The protest turned into a riot.",
            "Police controlled the riot with difficulty.",
            "The city had not seen a riot in decades."
         ]
      },
      {
         "id": 102,
         "word": "rip",
         "role": "verb",
         "BrE": "/rɪp/",
         "AmE": "/rɪp/",
         "definition": "to tear something quickly or roughly",
         "examples": [
            "He ripped the paper in half.",
            "Be careful not to rip the fabric.",
            "The dog ripped the toy apart."
         ]
      },
      {
         "id": 102,
         "word": "ritual",
         "role": "noun",
         "BrE": "/ˈrɪtʃuəl/",
         "AmE": "/ˈrɪtʃuəl/",
         "definition": "a religious or formal ceremony; a fixed routine",
         "examples": [
            "The wedding followed a traditional ritual.",
            "Brushing teeth is a daily ritual.",
            "The tribe performs a ritual dance."
         ]
      },
      {
         "id": 102,
         "word": "robust",
         "role": "adjective",
         "BrE": "/rəʊˈbʌst/",
         "AmE": "/roʊˈbʌst/",
         "definition": "strong and healthy; able to survive difficult conditions",
         "examples": [
            "He has a robust sense of humour.",
            "The economy showed robust growth.",
            "The device is built to be robust."
         ]
      },
      {
         "id": 103,
         "word": "rock",
         "role": "verb",
         "BrE": "/rɒk/",
         "AmE": "/rɑːk/",
         "definition": "to move gently back and forth; to shock",
         "examples": [
            "She rocked the baby to sleep.",
            "The scandal rocked the government.",
            "The boat rocked in the waves."
         ]
      },
      {
         "id": 103,
         "word": "rod",
         "role": "noun",
         "BrE": "/rɒd/",
         "AmE": "/rɑːd/",
         "definition": "a long, thin stick or metal bar",
         "examples": [
            "The fisherman used a fishing rod.",
            "The lightning rod protected the house.",
            "They used a metal rod to support the structure."
         ]
      },
      {
         "id": 103,
         "word": "rotate",
         "role": "verb",
         "BrE": "/rəʊˈteɪt/",
         "AmE": "/roʊˈteɪt/",
         "definition": "to turn around a centre point; to take turns",
         "examples": [
            "The Earth rotates every 24 hours.",
            "Doctors rotate through different departments.",
            "We rotate chores at home."
         ]
      },
      {
         "id": 103,
         "word": "rotation",
         "role": "noun",
         "BrE": "/rəʊˈteɪʃən/",
         "AmE": "/roʊˈteɪʃən/",
         "definition": "the act of rotating; a regular sequence of turns",
         "examples": [
            "Crop rotation improves soil health.",
            "The Earth’s rotation causes day and night.",
            "Nurses work in daily rotation."
         ]
      },
      {
         "id": 103,
         "word": "ruling",
         "role": "noun",
         "BrE": "/ˈruːlɪŋ/",
         "AmE": "/ˈruːlɪŋ/",
         "definition": "a decision made by a judge or authority",
         "examples": [
            "The court issued a new ruling.",
            "The judge’s ruling favoured the plaintiff.",
            "The ruling changed school policy."
         ]
      },
      {
         "id": 103,
         "word": "rumour",
         "role": "noun",
         "BrE": "/ˈruːmər/",
         "AmE": "/ˈruːmər/",
         "definition": "a story or report that may not be true",
         "examples": [
            "There’s a rumour he’s leaving the company.",
            "The rumour spread quickly.",
            "Don’t believe every rumour you hear."
         ]
      },
      {
         "id": 103,
         "word": "sack",
         "role": "verb",
         "BrE": "/sæk/",
         "AmE": "/sæk/",
         "definition": "to dismiss someone from a job",
         "examples": [
            "He was sacked for being late too often.",
            "The manager sacked two employees.",
            "You’ll be sacked if you steal again."
         ]
      },
      {
         "id": 103,
         "word": "sacred",
         "role": "adjective",
         "BrE": "/ˈseɪkrɪd/",
         "AmE": "/ˈseɪkrɪd/",
         "definition": "holy; deserving great respect",
         "examples": [
            "The temple is a sacred place.",
            "Life is sacred, they believe.",
            "Sacred texts are read in church."
         ]
      },
      {
         "id": 103,
         "word": "sacrifice",
         "role": "noun, verb",
         "BrE": "/ˈsækrɪfaɪs/",
         "AmE": "/ˈsækrɪfaɪs/",
         "definition": "giving up something valuable; an offering to a god",
         "examples": [
            "She made sacrifices to support her family.",
            "He sacrificed his career for love.",
            "Ancient cultures made animal sacrifices."
         ]
      },
      {
         "id": 103,
         "word": "saint",
         "role": "noun",
         "BrE": "/seɪnt/",
         "AmE": "/seɪnt/",
         "definition": "a holy person, especially in religion",
         "examples": [
            "Saint Patrick is celebrated in Ireland.",
            "The church is named after a saint.",
            "He’s kind — he’s like a saint!"
         ]
      },
      {
         "id": 104,
         "word": "sake",
         "role": "noun",
         "BrE": "/seɪk/",
         "AmE": "/seɪk/",
         "definition": "reason or purpose; for the benefit of",
         "examples": [
            "I’m doing this for your sake.",
            "For the sake of peace, let’s compromise.",
            "He quit smoking for health’s sake."
         ]
      },
      {
         "id": 104,
         "word": "sanction",
         "role": "noun",
         "BrE": "/ˈsæŋkʃən/",
         "AmE": "/ˈsæŋkʃən/",
         "definition": "an official penalty; official approval",
         "examples": [
            "The country faced trade sanctions.",
            "The project has full management sanction.",
            "Economic sanctions aim to change behaviour."
         ]
      },
      {
         "id": 104,
         "word": "say",
         "role": "noun",
         "BrE": "/seɪ/",
         "AmE": "/seɪ/",
         "definition": "the power to express an opinion",
         "examples": [
            "She has no say in the decision.",
            "Let me have a say in the matter.",
            "The people should have a say in laws."
         ]
      },
      {
         "id": 104,
         "word": "scattered",
         "role": "adjective",
         "BrE": "/ˈskætəd/",
         "AmE": "/ˈskætərd/",
         "definition": "spread over a wide area; disorganised",
         "examples": [
            "There were scattered showers all day.",
            "Scattered papers covered the desk.",
            "The village has scattered houses."
         ]
      },
      {
         "id": 104,
         "word": "sceptical",
         "role": "adjective",
         "BrE": "/ˈskeptɪkəl/",
         "AmE": "/ˈskeptɪkəl/",
         "definition": "doubtful or unconvinced",
         "examples": [
            "She was sceptical about the claim.",
            "I’m sceptical that it will work.",
            "His story seemed too strange to be true — I was sceptical."
         ]
      },
      {
         "id": 104,
         "word": "scope",
         "role": "noun",
         "BrE": "/skəʊp/",
         "AmE": "/skoʊp/",
         "definition": "the range or extent of something",
         "examples": [
            "The project has a wide scope.",
            "This topic is beyond the scope of the course.",
            "The investigation widened in scope."
         ]
      },
      {
         "id": 104,
         "word": "screw",
         "role": "verb, noun",
         "BrE": "/skruː/",
         "AmE": "/skruː/",
         "definition": "to twist into place; a small metal fastener",
         "examples": [
            "Screw the lid on tightly.",
            "He dropped the screw while fixing the shelf.",
            "Don’t screw up the plan!"
         ]
      },
      {
         "id": 104,
         "word": "scrutiny",
         "role": "noun",
         "BrE": "/ˈskruːtɪni/",
         "AmE": "/ˈskruːtəni/",
         "definition": "close and careful examination",
         "examples": [
            "The report was under public scrutiny.",
            "Every expense is subject to scrutiny.",
            "Her actions came under intense scrutiny."
         ]
      },
      {
         "id": 104,
         "word": "seal",
         "role": "verb, noun",
         "BrE": "/siːl/",
         "AmE": "/siːl/",
         "definition": "to close tightly; a stamp or animal",
         "examples": [
            "Seal the envelope carefully.",
            "The document has an official seal.",
            "We saw seals on the beach."
         ]
      },
      {
         "id": 104,
         "word": "secular",
         "role": "adjective",
         "BrE": "/ˈsekjʊlər/",
         "AmE": "/ˈsekjələr/",
         "definition": "not religious; based on worldly things",
         "examples": [
            "The school is secular and welcomes all faiths.",
            "Secular music includes pop and rock.",
            "The country has a secular government."
         ]
      },
      {
         "id": 105,
         "word": "seemingly",
         "role": "adverb",
         "BrE": "/ˈsiːmɪŋli/",
         "AmE": "/ˈsiːmɪŋli/",
         "definition": "appearing to be true, but possibly not",
         "examples": [
            "He was seemingly calm, but very nervous inside.",
            "The solution is simple, seemingly.",
            "Seemingly minor mistakes can cause big problems."
         ]
      },
      {
         "id": 105,
         "word": "segment",
         "role": "noun",
         "BrE": "/ˈseɡmənt/",
         "AmE": "/ˈseɡmənt/",
         "definition": "a part of a larger whole",
         "examples": [
            "The market is divided into segments.",
            "Each segment of the pie chart shows a category.",
            "A segment of the road was closed."
         ]
      },
      {
         "id": 105,
         "word": "seize",
         "role": "verb",
         "BrE": "/siːz/",
         "AmE": "/siːz/",
         "definition": "to take hold of suddenly; to capture",
         "examples": [
            "Police seized the drugs.",
            "He seized the opportunity to speak.",
            "The rebels seized control of the town."
         ]
      },
      {
         "id": 105,
         "word": "seldom",
         "role": "adverb",
         "BrE": "/ˈseldəm/",
         "AmE": "/ˈseldəm/",
         "definition": "not often; rarely",
         "examples": [
            "She seldom eats meat.",
            "He seldom arrives late.",
            "Seldom does he complain."
         ]
      },
      {
         "id": 105,
         "word": "selective",
         "role": "adjective",
         "BrE": "/sɪˈlektɪv/",
         "AmE": "/sɪˈlektɪv/",
         "definition": "choosing only certain parts; not random",
         "examples": [
            "She’s very selective about her friends.",
            "The school is selective in admissions.",
            "Selective breeding improves crops."
         ]
      },
      {
         "id": 105,
         "word": "senator",
         "role": "noun",
         "BrE": "/ˈsenətər/",
         "AmE": "/ˈsenətər/",
         "definition": "a member of the upper house of a legislature",
         "examples": [
            "The senator gave a speech on climate change.",
            "She was elected as a state senator.",
            "Senators debate national laws."
         ]
      },
      {
         "id": 105,
         "word": "sensation",
         "role": "noun",
         "BrE": "/senˈseɪʃən/",
         "AmE": "/senˈseɪʃən/",
         "definition": "a physical feeling; a strong public reaction",
         "examples": [
            "A tingling sensation ran down his spine.",
            "The movie caused a sensation when released.",
            "The singer became a sensation overnight."
         ]
      },
      {
         "id": 105,
         "word": "sensitivity",
         "role": "noun",
         "BrE": "/ˌsensəˈtɪvəti/",
         "AmE": "/ˌsensəˈtɪvəti/",
         "definition": "being aware of others' feelings; the quality of being easily affected",
         "examples": [
            "He showed great sensitivity to her pain.",
            "Cultural sensitivity is important in global business.",
            "The camera has high light sensitivity."
         ]
      },
      {
         "id": 105,
         "word": "sentiment",
         "role": "noun",
         "BrE": "/ˈsentɪmənt/",
         "AmE": "/ˈsentɪmənt/",
         "definition": "a feeling or opinion",
         "examples": [
            "Public sentiment turned against the war.",
            "The letter expressed deep sentiment.",
            "Nostalgic sentiment filled the room."
         ]
      },
      {
         "id": 105,
         "word": "separation",
         "role": "noun",
         "BrE": "/ˌsepəˈreɪʃən/",
         "AmE": "/ˌsepəˈreɪʃən/",
         "definition": "the act of moving apart; division",
         "examples": [
            "Their separation was peaceful.",
            "The separation of powers is key in democracy.",
            "There’s a clear separation between work and home."
         ]
      },
      {
         "id": 106,
         "word": "serial",
         "role": "adjective",
         "BrE": "/ˈsɪəriəl/",
         "AmE": "/ˈsɪriəl/",
         "definition": "happening in a series; one after another",
         "examples": [
            "He’s a serial entrepreneur.",
            "The TV show is a serial drama.",
            "Serial killings shocked the city."
         ]
      },
      {
         "id": 106,
         "word": "settlement",
         "role": "noun",
         "BrE": "/ˈsetlmənt/",
         "AmE": "/ˈsetlmənt/",
         "definition": "a place where people live; an agreement to end a dispute",
         "examples": [
            "The ancient settlement was discovered by archaeologists.",
            "They reached a legal settlement.",
            "The new settlement grew into a town."
         ]
      },
      {
         "id": 106,
         "word": "set-up",
         "role": "noun",
         "BrE": "/ˈset ʌp/",
         "AmE": "/ˈset ʌp/",
         "definition": "the way something is arranged; a situation designed to trap someone",
         "examples": [
            "The office set-up allows for teamwork.",
            "He claimed it was a police set-up.",
            "The lab has a complex technical set-up."
         ]
      },
      {
         "id": 106,
         "word": "sexuality",
         "role": "noun",
         "BrE": "/ˌseksjʊˈæləti/",
         "AmE": "/ˌseksjəˈæləti/",
         "definition": "a person’s sexual identity and orientation",
         "examples": [
            "Sexuality is a personal and complex topic.",
            "The book explores human sexuality.",
            "Schools should teach about sexuality responsibly."
         ]
      },
      {
         "id": 106,
         "word": "shareholder",
         "role": "noun",
         "BrE": "/ˈʃeəhəʊldər/",
         "AmE": "/ˈʃerhoʊldər/",
         "definition": "a person who owns part of a company",
         "examples": [
            "The shareholder meeting is next week.",
            "Shareholders voted on the new policy.",
            "As a shareholder, she gets dividends."
         ]
      },
      {
         "id": 106,
         "word": "shatter",
         "role": "verb",
         "BrE": "/ˈʃætər/",
         "AmE": "/ˈʃætər/",
         "definition": "to break into many pieces; to destroy suddenly",
         "examples": [
            "The glass shattered when it hit the floor.",
            "The news shattered her hopes.",
            "The explosion shattered windows nearby."
         ]
      },
      {
         "id": 106,
         "word": "shed",
         "role": "verb",
         "BrE": "/ʃed/",
         "AmE": "/ʃed/",
         "definition": "to lose or get rid of something; to emit light",
         "examples": [
            "Dogs shed fur in summer.",
            "The lamp shed a soft light.",
            "He finally shed his fears."
         ]
      },
      {
         "id": 106,
         "word": "sheer",
         "role": "adjective",
         "BrE": "/ʃɪər/",
         "AmE": "/ʃɪr/",
         "definition": "complete; very steep; thin and transparent",
         "examples": [
            "It was sheer luck that we found it.",
            "The mountain has sheer cliffs.",
            "She wore sheer curtains in the living room."
         ]
      },
      {
         "id": 106,
         "word": "shipping",
         "role": "noun",
         "BrE": "/ˈʃɪpɪŋ/",
         "AmE": "/ˈʃɪpɪŋ/",
         "definition": "the transport of goods by ship; delivery service",
         "examples": [
            "International shipping takes two weeks.",
            "The company offers free shipping.",
            "Shipping costs have increased."
         ]
      },
      {
         "id": 106,
         "word": "shoot",
         "role": "noun",
         "BrE": "/ʃuːt/",
         "AmE": "/ʃuːt/",
         "definition": "a photography session; a new growth in a plant",
         "examples": [
            "They went on a photo shoot in Paris.",
            "The model had a fashion shoot.",
            "New green shoots appeared in spring."
         ]
      },
      {
         "id": 107,
         "word": "shrink",
         "role": "verb",
         "BrE": "/ʃrɪŋk/",
         "AmE": "/ʃrɪŋk/",
         "definition": "to become smaller; to reduce",
         "examples": [
            "The fabric will shrink in the wash.",
            "The company plans to shrink its workforce.",
            "His heart shrank with sadness."
         ]
      },
      {
         "id": 107,
         "word": "shrug",
         "role": "verb",
         "BrE": "/ʃrʌɡ/",
         "AmE": "/ʃrʌɡ/",
         "definition": "to raise your shoulders to show you don’t know or care",
         "examples": [
            "He shrugged and walked away.",
            "She shrugged her shoulders when asked.",
            "‘I don’t know,’ he said with a shrug."
         ]
      },
      {
         "id": 107,
         "word": "sigh",
         "role": "verb, noun",
         "BrE": "/saɪ/",
         "AmE": "/saɪ/",
         "definition": "to breathe out deeply, often showing emotion",
         "examples": [
            "She sighed with relief.",
            "He gave a heavy sigh.",
            "A sigh of disappointment spread through the room."
         ]
      },
      {
         "id": 107,
         "word": "simulate",
         "role": "verb",
         "BrE": "/ˈsɪmjuleɪt/",
         "AmE": "/ˈsɪmjuleɪt/",
         "definition": "to imitate or pretend; to create a model of",
         "examples": [
            "Pilots train in a flight simulator.",
            "The game simulates real-life driving.",
            "They simulated an emergency drill."
         ]
      },
      {
         "id": 107,
         "word": "simulation",
         "role": "noun",
         "BrE": "/ˌsɪmjʊˈleɪʃən/",
         "AmE": "/ˌsɪmjəˈleɪʃən/",
         "definition": "the act of pretending or modelling something",
         "examples": [
            "The simulation felt very real.",
            "Classroom simulations help students learn.",
            "The software runs weather simulations."
         ]
      },
      {
         "id": 107,
         "word": "simultaneously",
         "role": "adverb",
         "BrE": "/ˌsɪmlˈteɪniəsli/",
         "AmE": "/ˌsɪməlˈteɪniəsli/",
         "definition": "at the same time",
         "examples": [
            "They both spoke simultaneously.",
            "The events occurred simultaneously.",
            "You can't do two tasks simultaneously."
         ]
      },
      {
         "id": 107,
         "word": "sin",
         "role": "noun",
         "BrE": "/sɪn/",
         "AmE": "/sɪn/",
         "definition": "a moral or religious wrongdoing",
         "examples": [
            "Lying is considered a sin in many religions.",
            "He confessed his sins to the priest.",
            "Pride is one of the seven deadly sins."
         ]
      },
      {
         "id": 107,
         "word": "situated",
         "role": "adjective",
         "BrE": "/ˈsɪtjueɪtɪd/",
         "AmE": "/ˈsɪtʃueɪtɪd/",
         "definition": "located in a particular place",
         "examples": [
            "The hotel is situated near the beach.",
            "The town is situated on a hill.",
            "The office is well situated for public transport."
         ]
      },
      {
         "id": 107,
         "word": "sketch",
         "role": "noun",
         "BrE": "/sketʃ/",
         "AmE": "/sketʃ/",
         "definition": "a quick drawing; a brief description",
         "examples": [
            "She made a sketch of the landscape.",
            "He gave a rough sketch of his idea.",
            "The artist filled a notebook with sketches."
         ]
      },
      {
         "id": 107,
         "word": "skip",
         "role": "verb",
         "BrE": "/skɪp/",
         "AmE": "/skɪp/",
         "definition": "to jump; to miss out on something",
         "examples": [
            "The children skip rope at school.",
            "She skipped breakfast this morning.",
            "You can skip this section if you're in a hurry."
         ]
      },
      {
         "id": 108,
         "word": "slam",
         "role": "verb",
         "BrE": "/slæm/",
         "AmE": "/slæm/",
         "definition": "to shut something forcefully; to criticise harshly",
         "examples": [
            "He slammed the door in anger.",
            "The critic slammed the movie.",
            "She slammed her hand on the table."
         ]
      },
      {
         "id": 108,
         "word": "slap",
         "role": "verb, noun",
         "BrE": "/slæp/",
         "AmE": "/slæp/",
         "definition": "to hit with an open hand",
         "examples": [
            "He slapped the table to get attention.",
            "She gave him a slap for being rude.",
            "The sound of a slap echoed in the room."
         ]
      },
      {
         "id": 108,
         "word": "slash",
         "role": "verb",
         "BrE": "/slæʃ/",
         "AmE": "/slæʃ/",
         "definition": "to cut with a quick, hard movement; to reduce sharply",
         "examples": [
            "He slashed the box open with a knife.",
            "The company slashed prices by 50%.",
            "Budget cuts slashed funding for schools."
         ]
      },
      {
         "id": 108,
         "word": "slavery",
         "role": "noun",
         "BrE": "/ˈsleɪvəri/",
         "AmE": "/ˈsleɪvəri/",
         "definition": "the system of owning people and forcing them to work",
         "examples": [
            "Slavery was abolished in the 19th century.",
            "Millions suffered under slavery.",
            "Modern slavery still exists in some places."
         ]
      },
      {
         "id": 108,
         "word": "slot",
         "role": "noun",
         "BrE": "/slɒt/",
         "AmE": "/slɑːt/",
         "definition": "a narrow opening; a scheduled time",
         "examples": [
            "Insert the card into the slot.",
            "We got a morning slot for the interview.",
            "There’s a slot for each team in the tournament."
         ]
      },
      {
         "id": 108,
         "word": "smash",
         "role": "verb",
         "BrE": "/smæʃ/",
         "AmE": "/smæʃ/",
         "definition": "to break violently; to defeat completely",
         "examples": [
            "He smashed the cup by accident.",
            "The team smashed their opponents 5–0.",
            "The movie smashed box office records."
         ]
      },
      {
         "id": 108,
         "word": "snap",
         "role": "verb",
         "BrE": "/snæp/",
         "AmE": "/snæp/",
         "definition": "to break suddenly; to take a photo quickly",
         "examples": [
            "The branch snapped in the wind.",
            "She snapped a photo of the sunset.",
            "He snapped at her for no reason."
         ]
      },
      {
         "id": 108,
         "word": "soak",
         "role": "verb",
         "BrE": "/səʊk/",
         "AmE": "/soʊk/",
         "definition": "to make something completely wet; to absorb",
         "examples": [
            "Soak the clothes in water before washing.",
            "The ground soaked up the rain.",
            "She soaked in the bath for an hour."
         ]
      },
      {
         "id": 108,
         "word": "soar",
         "role": "verb",
         "BrE": "/sɔːr/",
         "AmE": "/sɔːr/",
         "definition": "to fly high; to rise quickly",
         "examples": [
            "Birds soar above the mountains.",
            "Prices soared after the shortage.",
            "Her confidence began to soar."
         ]
      },
      {
         "id": 108,
         "word": "socialist",
         "role": "adjective",
         "BrE": "/ˈsəʊʃəlɪst/",
         "AmE": "/ˈsoʊʃəlɪst/",
         "definition": "believing in public ownership of industry; supporting equality",
         "examples": [
            "She supports socialist policies.",
            "The country has a socialist government.",
            "Socialist ideas focus on fair wealth distribution."
         ]
      },
      {
         "id": 109,
         "word": "sole",
         "role": "adjective",
         "BrE": "/səʊl/",
         "AmE": "/soʊl/",
         "definition": "only; single",
         "examples": [
            "He was the sole survivor.",
            "Profit is not the sole aim of the project.",
            "She has sole responsibility for the team."
         ]
      },
      {
         "id": 109,
         "word": "solicitor",
         "role": "noun",
         "BrE": "/səˈlɪsɪtər/",
         "AmE": "/səˈlɪsɪtər/",
         "definition": "a type of lawyer in the UK who gives advice and prepares cases",
         "examples": [
            "She consulted a solicitor about the contract.",
            "The solicitor helped with the property sale.",
            "He works as a criminal solicitor."
         ]
      },
      {
         "id": 109,
         "word": "solidarity",
         "role": "noun",
         "BrE": "/ˌsɒlɪˈdærəti/",
         "AmE": "/ˌsɑːlɪˈdærəti/",
         "definition": "unity among people with a common interest",
         "examples": [
            "Workers showed solidarity during the strike.",
            "The community stood in solidarity with the victims.",
            "Global solidarity is needed in crises."
         ]
      },
      {
         "id": 109,
         "word": "solo",
         "role": "adjective, noun",
         "BrE": "/ˈsəʊləʊ/",
         "AmE": "/ˈsoʊloʊ/",
         "definition": "done alone; a performance by one person",
         "examples": [
            "She played a solo on the violin.",
            "He made a solo climb of the mountain.",
            "The singer performed a jazz solo."
         ]
      },
      {
         "id": 109,
         "word": "sound",
         "role": "adjective",
         "BrE": "/saʊnd/",
         "AmE": "/saʊnd/",
         "definition": "solid, reliable, or in good condition",
         "examples": [
            "The house is sound and safe.",
            "She gave sound advice.",
            "The plan is sound and well-thought-out."
         ]
      },
      {
         "id": 109,
         "word": "sovereignty",
         "role": "noun",
         "BrE": "/ˈsɒvrənti/",
         "AmE": "/ˈsɑːvrənti/",
         "definition": "the right to govern yourself; full power",
         "examples": [
            "The country declared its sovereignty.",
            "National sovereignty is often debated.",
            "Indigenous groups demand sovereignty."
         ]
      },
      {
         "id": 109,
         "word": "spam",
         "role": "noun",
         "BrE": "/spæm/",
         "AmE": "/spæm/",
         "definition": "unsolicited or fake messages, usually online",
         "examples": [
            "My inbox is full of spam.",
            "Don’t click on spam links.",
            "The website filters out spam automatically."
         ]
      },
      {
         "id": 109,
         "word": "span",
         "role": "verb, noun",
         "BrE": "/spæn/",
         "AmE": "/spæn/",
         "definition": "to cover a period of time or space; the full length",
         "examples": [
            "The bridge spans the river.",
            "His career spanned 40 years.",
            "The project covers a wide time span."
         ]
      },
      {
         "id": 109,
         "word": "spare",
         "role": "verb",
         "BrE": "/speər/",
         "AmE": "/sper/",
         "definition": "to save someone from something unpleasant; to give something extra",
         "examples": [
            "Can you spare a few minutes?",
            "Please spare me the details.",
            "He spared the prisoner’s life."
         ]
      },
      {
         "id": 109,
         "word": "spark",
         "role": "verb",
         "BrE": "/spɑːk/",
         "AmE": "/spɑːrk/",
         "definition": "to cause something to start; to ignite",
         "examples": [
            "The comment sparked a heated debate.",
            "The idea sparked a new invention.",
            "A spark can start a forest fire."
         ]
      },
      {
         "id": 110,
         "word": "specification",
         "role": "noun",
         "BrE": "/ˌspɛsɪfɪˈkeɪʃən/",
         "AmE": "/ˌspesɪfɪˈkeɪʃən/",
         "definition": "a detailed description of requirements",
         "examples": [
            "The product meets all specifications.",
            "Read the technical specifications before buying.",
            "The engineer wrote full specifications."
         ]
      },
      {
         "id": 110,
         "word": "specimen",
         "role": "noun",
         "BrE": "/ˈspesɪmən/",
         "AmE": "/ˈspesəmən/",
         "definition": "a sample used for study or testing",
         "examples": [
            "The doctor took a blood specimen.",
            "The museum has a rare butterfly specimen.",
            "Each specimen was carefully labelled."
         ]
      },
      {
         "id": 110,
         "word": "spectacle",
         "role": "noun",
         "BrE": "/ˈspektəkl/",
         "AmE": "/ˈspektəkl/",
         "definition": "an impressive or unusual sight; eyeglasses",
         "examples": [
            "The fireworks were a magnificent spectacle.",
            "He wore spectacles to read.",
            "The protest became a public spectacle."
         ]
      },
      {
         "id": 110,
         "word": "spectrum",
         "role": "noun",
         "BrE": "/ˈspektrəm/",
         "AmE": "/ˈspektrəm/",
         "definition": "a range of related qualities or ideas",
         "examples": [
            "Autism exists on a spectrum.",
            "The report covers the full political spectrum.",
            "Light can be split into a colour spectrum."
         ]
      },
      {
         "id": 110,
         "word": "spell",
         "role": "noun",
         "BrE": "/spel/",
         "AmE": "/spel/",
         "definition": "a short period of time; a magical charm",
         "examples": [
            "She had a bad spell of flu.",
            "He’s on a lucky spell right now.",
            "The witch cast a spell on the prince."
         ]
      },
      {
         "id": 110,
         "word": "sphere",
         "role": "noun",
         "BrE": "/sfɪər/",
         "AmE": "/sfɪr/",
         "definition": "a round ball; an area of activity or influence",
         "examples": [
            "The Earth is almost a perfect sphere.",
            "Politics is not my sphere of interest.",
            "She works in the public sphere."
         ]
      },
      {
         "id": 110,
         "word": "spin",
         "role": "verb, noun",
         "BrE": "/spɪn/",
         "AmE": "/spɪn/",
         "definition": "to turn around quickly; a way of presenting information",
         "examples": [
            "The Earth spins on its axis.",
            "The media gave the story a positive spin.",
            "She spun around in her chair."
         ]
      },
      {
         "id": 110,
         "word": "spine",
         "role": "noun",
         "BrE": "/spaɪn/",
         "AmE": "/spaɪn/",
         "definition": "the row of bones down the back; courage",
         "examples": [
            "He injured his spine in the accident.",
            "The book’s spine was broken.",
            "She faced it with great spine."
         ]
      },
      {
         "id": 110,
         "word": "spotlight",
         "role": "noun",
         "BrE": "/ˈspɒtlaɪt/",
         "AmE": "/ˈspɑːtlaɪt/",
         "definition": "a bright light on a stage; public attention",
         "examples": [
            "The actor stood in the spotlight.",
            "The scandal put her in the spotlight.",
            "Avoid the spotlight if you dislike fame."
         ]
      },
      {
         "id": 110,
         "word": "spouse",
         "role": "noun",
         "BrE": "/spaʊs/",
         "AmE": "/spaʊs/",
         "definition": "a husband or wife",
         "examples": [
            "She travelled with her spouse.",
            "The law protects the rights of a spouse.",
            "He introduced his spouse at the event."
         ]
      },

      {
         "id": 111,
         "word": "spy",
         "role": "noun, verb",
         "BrE": "/spaɪ/",
         "AmE": "/spaɪ/",
         "definition": "a person who secretly collects information; to secretly watch",
         "examples": [
            "The spy stole secret government documents.",
            "He was accused of spying for another country.",
            "She spied on her neighbour through the window."
         ]
      },
      {
         "id": 111,
         "word": "squad",
         "role": "noun",
         "BrE": "/skwɒd/",
         "AmE": "/skwɑːd/",
         "definition": "a small group of people working together, often in sports or the military",
         "examples": [
            "The football squad has 20 players.",
            "A police squad arrived at the scene.",
            "They trained as a special rescue squad."
         ]
      },
      {
         "id": 111,
         "word": "squeeze",
         "role": "verb",
         "BrE": "/skwiːz/",
         "AmE": "/skwiːz/",
         "definition": "to press tightly; to make space in a tight situation",
         "examples": [
            "She squeezed the lemon to get juice.",
            "They squeezed into the small car.",
            "Budget cuts squeezed public services."
         ]
      },
      {
         "id": 111,
         "word": "stab",
         "role": "verb",
         "BrE": "/stæb/",
         "AmE": "/stæb/",
         "definition": "to pierce with a sharp object; to attack with a knife",
         "examples": [
            "He was stabbed in the arm during the fight.",
            "She stabbed the fork into the potato.",
            "The suspect was arrested for attempted stabbing."
         ]
      },
      {
         "id": 111,
         "word": "stability",
         "role": "noun",
         "BrE": "/stəˈbɪləti/",
         "AmE": "/stəˈbɪləti/",
         "definition": "the state of being steady and not changing",
         "examples": [
            "The country needs political stability.",
            "Emotional stability helps in tough times.",
            "The bridge was built for maximum stability."
         ]
      },
      {
         "id": 111,
         "word": "stabilize",
         "role": "verb",
         "BrE": "/ˈsteɪbɪlaɪz/",
         "AmE": "/ˈsteɪbəlaɪz/",
         "definition": "to make or become steady or stable",
         "examples": [
            "The doctor gave medicine to stabilize the patient.",
            "The economy began to stabilize after the crisis.",
            "We need to stabilize the shelves."
         ]
      },
      {
         "id": 111,
         "word": "stake",
         "role": "noun",
         "BrE": "/steɪk/",
         "AmE": "/steɪk/",
         "definition": "a share or interest in something; something that can be won or lost",
         "examples": [
            "She has a financial stake in the company.",
            "There’s too much at stake to fail.",
            "He lost his stake in the bet."
         ]
      },
      {
         "id": 111,
         "word": "standing",
         "role": "adjective",
         "BrE": "/ˈstændɪŋ/",
         "AmE": "/ˈstændɪŋ/",
         "definition": "existing now; long-lasting",
         "examples": [
            "The standing offer is still valid.",
            "He has a high standing in the scientific community.",
            "The rules are part of standing policy."
         ]
      },
      {
         "id": 111,
         "word": "stark",
         "role": "adjective",
         "BrE": "/stɑːk/",
         "AmE": "/stɑːrk/",
         "definition": "very clear and plain; harsh or severe",
         "examples": [
            "The contrast between rich and poor is stark.",
            "She faced the stark reality of the situation.",
            "The room had a stark, empty look."
         ]
      },
      {
         "id": 111,
         "word": "statistical",
         "role": "adjective",
         "BrE": "/stəˈtɪstɪkəl/",
         "AmE": "/stəˈtɪstɪkəl/",
         "definition": "related to statistics or data analysis",
         "examples": [
            "The report includes statistical evidence.",
            "Statistical errors weakened the study.",
            "We need more statistical information."
         ]
      },
      {
         "id": 112,
         "word": "steer",
         "role": "verb",
         "BrE": "/stɪər/",
         "AmE": "/stɪr/",
         "definition": "to guide or control the direction of something",
         "examples": [
            "He steered the boat through the waves.",
            "She steered the conversation away from politics.",
            "Good leadership helps steer a company."
         ]
      },
      {
         "id": 112,
         "word": "stem",
         "role": "noun, verb",
         "BrE": "/stem/",
         "AmE": "/stem/",
         "definition": "the main supporting part of a plant; to stop or block something",
         "examples": [
            "The flower has a long green stem.",
            "The flood was stemmed by the new dam.",
            "Violence stems from deeper social problems."
         ]
      },
      {
         "id": 112,
         "word": "stereotype",
         "role": "noun",
         "BrE": "/ˈsteriəʊtaɪp/",
         "AmE": "/ˈsteriətaɪp/",
         "definition": "a fixed, oversimplified idea about a group",
         "examples": [
            "The movie breaks the stereotype of heroes.",
            "Gender stereotypes limit opportunities.",
            "Don’t judge people by stereotypes."
         ]
      },
      {
         "id": 112,
         "word": "stimulus",
         "role": "noun",
         "BrE": "/ˈstɪmjʊləs/",
         "AmE": "/ˈstɪmjələs/",
         "definition": "something that causes activity or growth",
         "examples": [
            "The tax cut was an economic stimulus.",
            "Bright colours are a visual stimulus for babies.",
            "The speech provided a strong stimulus for change."
         ]
      },
      {
         "id": 112,
         "word": "stir",
         "role": "verb",
         "BrE": "/stɜːr/",
         "AmE": "/stɜːr/",
         "definition": "to mix; to cause excitement or emotion",
         "examples": [
            "Stir the soup gently.",
            "The news stirred public anger.",
            "His speech stirred the audience to action."
         ]
      },
      {
         "id": 112,
         "word": "storage",
         "role": "noun",
         "BrE": "/ˈstɔːrɪdʒ/",
         "AmE": "/ˈstɔːrɪdʒ/",
         "definition": "the act of keeping things; a place where things are kept",
         "examples": [
            "We need more storage for files.",
            "The shed is used for garden tool storage.",
            "Cloud storage saves your data online."
         ]
      },
      {
         "id": 112,
         "word": "straightforward",
         "role": "adjective",
         "BrE": "/ˌstreɪtˈfɔːwəd/",
         "AmE": "/ˌstreɪtˈfɔːrwərd/",
         "definition": "easy to understand or do; honest",
         "examples": [
            "The instructions are straightforward.",
            "She gave a straightforward answer.",
            "It’s a straightforward process with no hidden steps."
         ]
      },
      {
         "id": 112,
         "word": "strain",
         "role": "noun",
         "BrE": "/streɪn/",
         "AmE": "/streɪn/",
         "definition": "a stretch or pressure; a version of something",
         "examples": [
            "The injury was a muscle strain.",
            "Work can put a strain on relationships.",
            "This flu strain is highly contagious."
         ]
      },
      {
         "id": 112,
         "word": "strand",
         "role": "noun",
         "BrE": "/strænd/",
         "AmE": "/strænd/",
         "definition": "a single thread; a line of thought or story",
         "examples": [
            "A strand of hair fell on the table.",
            "One strand of the argument was weak.",
            "The film weaves several story strands."
         ]
      },
      {
         "id": 112,
         "word": "strategic",
         "role": "adjective",
         "BrE": "/strəˈtiːdʒɪk/",
         "AmE": "/strəˈtiːdʒɪk/",
         "definition": "carefully planned for long-term success",
         "examples": [
            "The company made a strategic move into Asia.",
            "They formed a strategic alliance.",
            "Strategic thinking is key in chess."
         ]
      },
      {
         "id": 113,
         "word": "striking",
         "role": "adjective",
         "BrE": "/ˈstraɪkɪŋ/",
         "AmE": "/ˈstraɪkɪŋ/",
         "definition": "very noticeable or impressive",
         "examples": [
            "She has a striking appearance.",
            "There’s a striking difference between them.",
            "The painting has a striking use of colour."
         ]
      },
      {
         "id": 113,
         "word": "strip (long narrow piece)",
         "role": "noun",
         "BrE": "/strɪp/",
         "AmE": "/strɪp/",
         "definition": "a long, thin piece of material",
         "examples": [
            "Cut the paper into thin strips.",
            "The garden has flower strips between paths.",
            "He ate a strip of bacon."
         ]
      },
      {
         "id": 113,
         "word": "strip (remove clothes/a layer)",
         "role": "verb",
         "BrE": "/strɪp/",
         "AmE": "/strɪp/",
         "definition": "to remove clothes or a covering",
         "examples": [
            "He stripped off his wet jacket.",
            "Workers stripped the paint from the wall.",
            "She was forced to strip during the search."
         ]
      },
      {
         "id": 113,
         "word": "strive",
         "role": "verb",
         "BrE": "/straɪv/",
         "AmE": "/straɪv/",
         "definition": "to try very hard to achieve something",
         "examples": [
            "They strive for excellence.",
            "He strives to be a better person.",
            "Countries strive for peace."
         ]
      },
      {
         "id": 113,
         "word": "structural",
         "role": "adjective",
         "BrE": "/ˈstrʌktʃərəl/",
         "AmE": "/ˈstrʌktʃərəl/",
         "definition": "related to the structure or framework of something",
         "examples": [
            "The building has serious structural damage.",
            "They made structural changes to the company.",
            "Structural problems weakened the bridge."
         ]
      },
      {
         "id": 113,
         "word": "stumble",
         "role": "verb",
         "BrE": "/ˈstʌmbl/",
         "AmE": "/ˈstʌmbl/",
         "definition": "to trip or fall; to make a mistake",
         "examples": [
            "He stumbled on the step.",
            "She stumbled over her words during the speech.",
            "The project stumbled due to poor planning."
         ]
      },
      {
         "id": 113,
         "word": "stun",
         "role": "verb",
         "BrE": "/stʌn/",
         "AmE": "/stʌn/",
         "definition": "to shock or surprise greatly; to make unconscious",
         "examples": [
            "The news stunned everyone.",
            "The blow stunned the boxer.",
            "Her beauty stunned the audience."
         ]
      },
      {
         "id": 113,
         "word": "submission",
         "role": "noun",
         "BrE": "/səbˈmɪʃən/",
         "AmE": "/səbˈmɪʃən/",
         "definition": "the act of sending something; surrender",
         "examples": [
            "The essay submission is due Friday.",
            "His submission to authority was complete.",
            "All submissions will be reviewed."
         ]
      },
      {
         "id": 113,
         "word": "subscriber",
         "role": "noun",
         "BrE": "/səbˈskraɪbər/",
         "AmE": "/səbˈskraɪbər/",
         "definition": "a person who pays to receive a service or publication",
         "examples": [
            "New subscribers get a free trial.",
            "The magazine has 10,000 subscribers.",
            "As a subscriber, you get early access."
         ]
      },
      {
         "id": 113,
         "word": "subscription",
         "role": "noun",
         "BrE": "/səbˈskrɪpʃən/",
         "AmE": "/səbˈskrɪpʃən/",
         "definition": "a payment for regular access to a service",
         "examples": [
            "The subscription includes unlimited videos.",
            "I cancelled my magazine subscription.",
            "Annual subscription saves money."
         ]
      },
      {
         "id": 114,
         "word": "subsidy",
         "role": "noun",
         "BrE": "/ˈsʌbsɪdi/",
         "AmE": "/ˈsʌbsədi/",
         "definition": "money given by the government to help an industry",
         "examples": [
            "Farmers receive a subsidy from the government.",
            "Renewable energy gets a large subsidy.",
            "The airline collapsed after subsidy cuts."
         ]
      },
      {
         "id": 114,
         "word": "substantial",
         "role": "adjective",
         "BrE": "/səbˈstænʃəl/",
         "AmE": "/səbˈstænʃəl/",
         "definition": "large in amount, value, or importance",
         "examples": [
            "She inherited a substantial sum of money.",
            "There was a substantial improvement in health.",
            "The project requires substantial effort."
         ]
      },
      {
         "id": 114,
         "word": "substantially",
         "role": "adverb",
         "BrE": "/səbˈstænʃəli/",
         "AmE": "/səbˈstænʃəli/",
         "definition": "by a large amount or degree",
         "examples": [
            "Prices have increased substantially.",
            "Her skills improved substantially.",
            "The plan was substantially changed."
         ]
      },
      {
         "id": 114,
         "word": "substitute",
         "role": "noun, verb",
         "BrE": "/ˈsʌbstɪtjuːt/",
         "AmE": "/ˈsʌbstɪtuːt/",
         "definition": "a person or thing that replaces another",
         "examples": [
            "Milk is a substitute for cream.",
            "The teacher used a substitute today.",
            "You can substitute apples for pears."
         ]
      },
      {
         "id": 114,
         "word": "substitution",
         "role": "noun",
         "BrE": "/ˌsʌbstɪˈtjuːʃən/",
         "AmE": "/ˌsʌbstɪˈtuːʃən/",
         "definition": "the act of replacing one thing with another",
         "examples": [
            "The substitution of sugar with honey worked well.",
            "There were two substitutions during the match.",
            "Substitution is common in cooking."
         ]
      },
      {
         "id": 114,
         "word": "subtle",
         "role": "adjective",
         "BrE": "/ˈsʌtl/",
         "AmE": "/ˈsʌtl/",
         "definition": "not obvious; delicate or hard to notice",
         "examples": [
            "There’s a subtle difference in their accents.",
            "The painting uses subtle shades of grey.",
            "She made a subtle hint about leaving."
         ]
      },
      {
         "id": 114,
         "word": "suburban",
         "role": "adjective",
         "BrE": "/ˈsʌbɜːbən/",
         "AmE": "/ˈsʌbɜːrbən/",
         "definition": "relating to the suburbs, outside the city centre",
         "examples": [
            "They live in a quiet suburban area.",
            "Suburban life is often family-focused.",
            "The train connects the city and suburban stations."
         ]
      },
      {
         "id": 114,
         "word": "succession",
         "role": "noun",
         "BrE": "/səkˈseʃən/",
         "AmE": "/səkˈseʃən/",
         "definition": "a series of things or people in order",
         "examples": [
            "A succession of storms hit the coast.",
            "The king’s death led to a succession of rulers.",
            "She completed the tasks in quick succession."
         ]
      },
      {
         "id": 114,
         "word": "successive",
         "role": "adjective",
         "BrE": "/səkˈsesɪv/",
         "AmE": "/səkˈsesɪv/",
         "definition": "following one after another without a break",
         "examples": [
            "He missed three successive classes.",
            "The team won five successive matches.",
            "Successive governments failed to solve the problem."
         ]
      },
      {
         "id": 114,
         "word": "successor",
         "role": "noun",
         "BrE": "/səkˈsesər/",
         "AmE": "/səkˈsesər/",
         "definition": "a person who takes over a position after someone",
         "examples": [
            "She is the successor to the CEO.",
            "The new phone is the successor to last year’s model.",
            "No clear successor has been named."
         ]
      },
      {
         "id": 115,
         "word": "suck",
         "role": "verb",
         "BrE": "/sʌk/",
         "AmE": "/sʌk/",
         "definition": "to pull liquid or air into the mouth; to be very bad",
         "examples": [
            "The baby sucks milk from the bottle.",
            "Don’t suck air through a straw.",
            "That movie really sucks!"
         ]
      },
      {
         "id": 115,
         "word": "sue",
         "role": "verb",
         "BrE": "/sjuː/",
         "AmE": "/suː/",
         "definition": "to take legal action against someone",
         "examples": [
            "She sued the company for unfair treatment.",
            "They sued for damages after the accident.",
            "You can sue if your rights are violated."
         ]
      },
      {
         "id": 115,
         "word": "suicide",
         "role": "noun",
         "BrE": "/ˈsjuːɪsaɪd/",
         "AmE": "/ˈsuːɪsaɪd/",
         "definition": "the act of killing oneself",
         "examples": [
            "Suicide is a serious public health issue.",
            "The novel deals with themes of depression and suicide.",
            "Prevention programs aim to reduce suicide rates."
         ]
      },
      {
         "id": 115,
         "word": "suite",
         "role": "noun",
         "BrE": "/swiːt/",
         "AmE": "/swiːt/",
         "definition": "a set of connected rooms; a set of related software",
         "examples": [
            "They booked a hotel suite for the wedding.",
            "The business suite includes word processor and email.",
            "She played a beautiful piano suite."
         ]
      },
      {
         "id": 115,
         "word": "summit",
         "role": "noun",
         "BrE": "/ˈsʌmɪt/",
         "AmE": "/ˈsʌmɪt/",
         "definition": "the highest point; a high-level meeting",
         "examples": [
            "They reached the summit of Everest.",
            "The climate summit had world leaders.",
            "Peace talks will be held at the summit."
         ]
      },
      {
         "id": 115,
         "word": "superb",
         "role": "adjective",
         "BrE": "/suːˈpɜːb/",
         "AmE": "/suːˈpɜːrb/",
         "definition": "excellent; of the highest quality",
         "examples": [
            "She gave a superb performance.",
            "The meal was superb.",
            "They showed superb teamwork."
         ]
      },
      {
         "id": 115,
         "word": "superior",
         "role": "adjective",
         "BrE": "/suːˈpɪəriər/",
         "AmE": "/suːˈpɪriər/",
         "definition": "better than others; higher in rank",
         "examples": [
            "His skills are superior to mine.",
            "She has a superior attitude.",
            "He reported to a superior officer."
         ]
      },
      {
         "id": 115,
         "word": "supervise",
         "role": "verb",
         "BrE": "/ˈsjuːpəvaɪz/",
         "AmE": "/ˈsuːpərvaɪz/",
         "definition": "to watch and manage a person or activity",
         "examples": [
            "She supervises a team of ten workers.",
            "The teacher supervised the exam.",
            "An engineer will supervise the construction."
         ]
      },
      {
         "id": 115,
         "word": "supervision",
         "role": "noun",
         "BrE": "/ˌsjuːpəˈvɪʒən/",
         "AmE": "/ˌsuːpərˈvɪʒən/",
         "definition": "the act of supervising",
         "examples": [
            "Children must play under adult supervision.",
            "The project is under close supervision.",
            "He works without direct supervision."
         ]
      },
      {
         "id": 115,
         "word": "supplement",
         "role": "noun, verb",
         "BrE": "/ˈsʌplɪmənt/",
         "AmE": "/ˈsʌpləmənt/",
         "definition": "something added to complete or improve",
         "examples": [
            "She takes a vitamin supplement.",
            "The book includes a useful supplement.",
            "They supplemented their income with freelance work."
         ]
      },
      {
         "id": 116,
         "word": "supportive",
         "role": "adjective",
         "BrE": "/səˈpɔːtɪv/",
         "AmE": "/səˈpɔːrtɪv/",
         "definition": "giving help or encouragement",
         "examples": [
            "Her family is very supportive.",
            "Teachers should be supportive of students.",
            "He made supportive comments during the meeting."
         ]
      },
      {
         "id": 116,
         "word": "supposedly",
         "role": "adverb",
         "BrE": "/səˈpəʊzɪdli/",
         "AmE": "/səˈpoʊzɪdli/",
         "definition": "believed or claimed to be true, but possibly not",
         "examples": [
            "He’s supposedly the best doctor in town.",
            "The event was supposedly secret, but many knew.",
            "Supposedly, the treasure is buried here."
         ]
      },
      {
         "id": 116,
         "word": "suppress",
         "role": "verb",
         "BrE": "/səˈpres/",
         "AmE": "/səˈpres/",
         "definition": "to stop or prevent something from being expressed",
         "examples": [
            "The government suppressed the news.",
            "She suppressed a laugh.",
            "Painkillers suppress symptoms."
         ]
      },
      {
         "id": 116,
         "word": "supreme",
         "role": "adjective",
         "BrE": "/sjuːˈpriːm/",
         "AmE": "/suːˈpriːm/",
         "definition": "highest in rank or importance; greatest",
         "examples": [
            "The Supreme Court made the final decision.",
            "He has supreme confidence in his team.",
            "They aim for supreme quality."
         ]
      },
      {
         "id": 116,
         "word": "surge",
         "role": "noun, verb",
         "BrE": "/sɜːdʒ/",
         "AmE": "/sɜːrdʒ/",
         "definition": "a sudden increase; to rise suddenly",
         "examples": [
            "There was a surge in electricity demand.",
            "Popularity surged after the interview.",
            "Waves surged against the shore."
         ]
      },
      {
         "id": 116,
         "word": "surgical",
         "role": "adjective",
         "BrE": "/ˈsɜːdʒɪkəl/",
         "AmE": "/ˈsɜːrdʒɪkəl/",
         "definition": "related to surgery; very precise",
         "examples": [
            "He underwent surgical treatment.",
            "Surgical instruments must be sterile.",
            "The strike was surgical and precise."
         ]
      },
      {
         "id": 116,
         "word": "surplus",
         "role": "noun",
         "BrE": "/ˈsɜːpləs/",
         "AmE": "/ˈsɜːrpləs/",
         "definition": "an amount that is more than needed",
         "examples": [
            "The farm produced a food surplus.",
            "The budget shows a small surplus.",
            "They sold the surplus equipment."
         ]
      },
      {
         "id": 116,
         "word": "surrender",
         "role": "verb",
         "BrE": "/səˈrendər/",
         "AmE": "/səˈrendər/",
         "definition": "to give up or stop resisting",
         "examples": [
            "The army surrendered after days of fighting.",
            "He surrendered his licence to the police.",
            "Don’t surrender your dreams."
         ]
      },
      {
         "id": 116,
         "word": "surveillance",
         "role": "noun",
         "BrE": "/sɜːˈveɪləns/",
         "AmE": "/sɜːrˈveɪləns/",
         "definition": "careful watching, especially by authorities",
         "examples": [
            "The suspect is under surveillance.",
            "CCTV provides constant surveillance.",
            "Mass surveillance raises privacy concerns."
         ]
      },
      {
         "id": 116,
         "word": "suspension",
         "role": "noun",
         "BrE": "/səˈspenʃən/",
         "AmE": "/səˈspenʃən/",
         "definition": "the act of temporarily stopping something",
         "examples": [
            "He received a one-week suspension from school.",
            "The project is under suspension.",
            "Car suspension makes the ride smoother."
         ]
      },
      {
         "id": 117,
         "word": "suspicion",
         "role": "noun",
         "BrE": "/səˈspɪʃən/",
         "AmE": "/səˈspɪʃən/",
         "definition": "a feeling that something is wrong or someone is guilty",
         "examples": [
            "She looked at him with suspicion.",
            "There was no suspicion of fraud.",
            "He was arrested on suspicion of theft."
         ]
      },
      {
         "id": 117,
         "word": "sustain",
         "role": "verb",
         "BrE": "/səˈsteɪn/",
         "AmE": "/səˈsteɪn/",
         "definition": "to support or keep going; to suffer",
         "examples": [
            "The bridge can sustain heavy loads.",
            "They sustained their efforts for years.",
            "He sustained injuries in the crash."
         ]
      },
      {
         "id": 117,
         "word": "swing",
         "role": "verb, noun",
         "BrE": "/swɪŋ/",
         "AmE": "/swɪŋ/",
         "definition": "to move back and forth; a change in opinion",
         "examples": [
            "The child swings on the playground.",
            "Public opinion swung in favour of the policy.",
            "He took a swing at the ball."
         ]
      },
      {
         "id": 117,
         "word": "sword",
         "role": "noun",
         "BrE": "/sɔːd/",
         "AmE": "/sɔːrd/",
         "definition": "a weapon with a long metal blade",
         "examples": [
            "The knight carried a sword.",
            "The sword was passed down through generations.",
            "He symbolically broke the sword of war."
         ]
      },
      {
         "id": 117,
         "word": "symbolic",
         "role": "adjective",
         "BrE": "/sɪmˈbɒlɪk/",
         "AmE": "/sɪmˈbɑːlɪk/",
         "definition": "representing an idea; not literal",
         "examples": [
            "The dove is symbolic of peace.",
            "The gesture was symbolic of unity.",
            "It was a symbolic act, not a practical one."
         ]
      },
      {
         "id": 117,
         "word": "syndrome",
         "role": "noun",
         "BrE": "/ˈsɪndrəm/",
         "AmE": "/ˈsɪndroʊm/",
         "definition": "a group of symptoms that together indicate a condition",
         "examples": [
            "Down syndrome is a genetic condition.",
            "He showed signs of burnout syndrome.",
            "The doctor identified the rare syndrome."
         ]
      },
      {
         "id": 117,
         "word": "synthesis",
         "role": "noun",
         "BrE": "/ˈsɪnθəsɪs/",
         "AmE": "/ˈsɪnθəsɪs/",
         "definition": "the combination of ideas to form a theory; making something from parts",
         "examples": [
            "The report is a synthesis of many studies.",
            "Photosynthesis makes food in plants.",
            "A new theory emerged from the synthesis of old ideas."
         ]
      },
      {
         "id": 117,
         "word": "systematic",
         "role": "adjective",
         "BrE": "/ˌsɪstəˈmætɪk/",
         "AmE": "/ˌsɪstəˈmætɪk/",
         "definition": "done in a methodical, organised way",
         "examples": [
            "They used a systematic approach to solve the problem.",
            "Systematic errors affected the results.",
            "Systematic training improves performance."
         ]
      },
      {
         "id": 117,
         "word": "tackle",
         "role": "noun",
         "BrE": "/ˈtækl/",
         "AmE": "/ˈtækl/",
         "definition": "equipment for a sport; a strong attempt to deal with something",
         "examples": [
            "The fisherman checked his tackle box.",
            "They need to tackle the pollution problem.",
            "He made a hard tackle during the game."
         ]
      },
      {
         "id": 117,
         "word": "tactical",
         "role": "adjective",
         "BrE": "/ˈtæktɪkəl/",
         "AmE": "/ˈtæktɪkəl/",
         "definition": "carefully planned to gain an advantage",
         "examples": [
            "A tactical move won the game.",
            "Tactical decisions are crucial in war.",
            "She used tactical silence to win the argument."
         ]
      },
      {
         "id": 118,
         "word": "taxpayer",
         "role": "noun",
         "BrE": "/ˈtæksˌpeɪər/",
         "AmE": "/ˈtæksˌpeɪər/",
         "definition": "a person who pays taxes",
         "examples": [
            "The new policy will affect every taxpayer.",
            "Taxpayers fund public services.",
            "Politicians must listen to taxpayers."
         ]
      },
      {
         "id": 118,
         "word": "tempt",
         "role": "verb",
         "BrE": "/tempt/",
         "AmE": "/tempt/",
         "definition": "to attract or persuade someone to do something, often bad",
         "examples": [
            "The cake tempted him to break his diet.",
            "Don’t tempt fate by driving too fast.",
            "She was tempted to quit her job."
         ]
      },
      {
         "id": 118,
         "word": "tenant",
         "role": "noun",
         "BrE": "/ˈtenənt/",
         "AmE": "/ˈtenənt/",
         "definition": "a person who rents a property",
         "examples": [
            "The tenant paid rent on time.",
            "The landlord met with the new tenant.",
            "Tenants have rights under the law."
         ]
      },
      {
         "id": 118,
         "word": "tender",
         "role": "adjective",
         "BrE": "/ˈtendər/",
         "AmE": "/ˈtendər/",
         "definition": "gentle; easily hurt; a formal offer to do work",
         "examples": [
            "He gave her a tender smile.",
            "The fruit is tender and sweet.",
            "The company submitted a tender for the project."
         ]
      },
      {
         "id": 118,
         "word": "tenure",
         "role": "noun",
         "BrE": "/ˈtenjʊər/",
         "AmE": "/ˈtenjər/",
         "definition": "the length of time in a job or position",
         "examples": [
            "He left after a short tenure as director.",
            "Academic tenure provides job security.",
            "Her tenure at the company was marked by success."
         ]
      },
      {
         "id": 118,
         "word": "terminal",
         "role": "adjective",
         "BrE": "/ˈtɜːmɪnl/",
         "AmE": "/ˈtɜːrmɪnl/",
         "definition": "deadly; at the end; a computer input point",
         "examples": [
            "The illness is terminal.",
            "The flight leaves from Terminal 3.",
            "He logged in using a remote terminal."
         ]
      },
      {
         "id": 118,
         "word": "terminate",
         "role": "verb",
         "BrE": "/ˈtɜːmɪneɪt/",
         "AmE": "/ˈtɜːrmɪneɪt/",
         "definition": "to end or stop something",
         "examples": [
            "The contract will terminate next month.",
            "They terminated his employment.",
            "The program terminates after 30 minutes."
         ]
      },
      {
         "id": 118,
         "word": "terrain",
         "role": "noun",
         "BrE": "/teˈreɪn/",
         "AmE": "/təˈreɪn/",
         "definition": "land in a particular area; type of ground",
         "examples": [
            "The mountain terrain is difficult to cross.",
            "Military training includes rough terrain.",
            "The bike is designed for all types of terrain."
         ]
      },
      {
         "id": 118,
         "word": "terrific",
         "role": "adjective",
         "BrE": "/təˈrɪfɪk/",
         "AmE": "/təˈrɪfɪk/",
         "definition": "excellent; very great",
         "examples": [
            "You did a terrific job!",
            "There was a terrific explosion.",
            "She has a terrific sense of humour."
         ]
      },
      {
         "id": 118,
         "word": "testify",
         "role": "verb",
         "BrE": "/ˈtestɪfaɪ/",
         "AmE": "/ˈtestɪfaɪ/",
         "definition": "to give evidence in court",
         "examples": [
            "She testified in the trial.",
            "He refused to testify against his friend.",
            "Witnesses will testify tomorrow."
         ]
      },
      {
         "id": 119,
         "word": "testimony",
         "role": "noun",
         "BrE": "/ˈtestɪməni/",
         "AmE": "/ˈtestɪməni/",
         "definition": "a formal statement of fact, especially in court",
         "examples": [
            "Her testimony helped convict the criminal.",
            "He gave testimony under oath.",
            "The book is a powerful testimony to survival."
         ]
      },
      {
         "id": 119,
         "word": "texture",
         "role": "noun",
         "BrE": "/ˈtekstʃər/",
         "AmE": "/ˈtekstʃər/",
         "definition": "the way something feels or looks to the touch",
         "examples": [
            "The fabric has a soft texture.",
            "The painting has a rough texture.",
            "Food texture affects taste."
         ]
      },
      {
         "id": 119,
         "word": "thankfully",
         "role": "adverb",
         "BrE": "/ˈθæŋkfəli/",
         "AmE": "/ˈθæŋkfəli/",
         "definition": "with gratitude; luckily",
         "examples": [
            "Thankfully, no one was hurt.",
            "She passed the exam — thankfully!",
            "Thankfully, the rain stopped before the event."
         ]
      },
      {
         "id": 119,
         "word": "theatrical",
         "role": "adjective",
         "BrE": "/θiːˈætrɪkl/",
         "AmE": "/θiːˈætrɪkl/",
         "definition": "related to theatre; exaggerated",
         "examples": [
            "He has a theatrical way of speaking.",
            "The performance was highly theatrical.",
            "Her reaction was a bit too theatrical."
         ]
      },
      {
         "id": 119,
         "word": "theology",
         "role": "noun",
         "BrE": "/θiːˈɒlədʒi/",
         "AmE": "/θiːˈɑːlədʒi/",
         "definition": "the study of religion and God",
         "examples": [
            "He studied theology at university.",
            "Theology explores questions about life and death.",
            "She teaches Christian theology."
         ]
      },
      {
         "id": 119,
         "word": "theoretical",
         "role": "adjective",
         "BrE": "/ˌθɪəˈretɪkl/",
         "AmE": "/ˌθiːəˈretɪkl/",
         "definition": "based on ideas, not practice",
         "examples": [
            "The idea is good in theory, but not in practice.",
            "She gave a theoretical explanation.",
            "Theoretical physics is very complex."
         ]
      },
      {
         "id": 119,
         "word": "thereafter",
         "role": "adverb",
         "BrE": "/ˌðeərˈɑːftər/",
         "AmE": "/ˌðerˈæftər/",
         "definition": "after that time",
         "examples": [
            "He left the company and retired thereafter.",
            "The meeting ended; thereafter, everyone went home.",
            "She graduated and thereafter found a job."
         ]
      },
      {
         "id": 119,
         "word": "thereby",
         "role": "adverb",
         "BrE": "/ˌðeərˈbaɪ/",
         "AmE": "/ˌðerˈbaɪ/",
         "definition": "by that means; as a result of that",
         "examples": [
            "He broke the rules and thereby lost his job.",
            "She explained clearly, thereby avoiding confusion.",
            "They signed the deal, thereby becoming partners."
         ]
      },
      {
         "id": 119,
         "word": "thoughtful",
         "role": "adjective",
         "BrE": "/ˈθɔːtfəl/",
         "AmE": "/ˈθɔːftəl/",
         "definition": "showing care and consideration",
         "examples": [
            "He made a thoughtful comment.",
            "It was a thoughtful gift.",
            "She’s always thoughtful of others."
         ]
      },
      {
         "id": 119,
         "word": "thread",
         "role": "noun",
         "BrE": "/θred/",
         "AmE": "/θred/",
         "definition": "a thin string; a line of discussion",
         "examples": [
            "The fabric is made from cotton thread.",
            "Follow the thread of the argument.",
            "She lost the thread of her story."
         ]
      },
      {
         "id": 120,
         "word": "threshold",
         "role": "noun",
         "BrE": "/ˈθreʃhəʊld/",
         "AmE": "/ˈθreʃhoʊld/",
         "definition": "the entrance to a place; the point at which something starts",
         "examples": [
            "He stood at the threshold of the door.",
            "The noise level crossed the danger threshold.",
            "We’re on the threshold of a new era."
         ]
      },
      {
         "id": 120,
         "word": "thrilled",
         "role": "adjective",
         "BrE": "/θrɪld/",
         "AmE": "/θrɪld/",
         "definition": "very excited or pleased",
         "examples": [
            "She was thrilled to get the job.",
            "We were thrilled with the results.",
            "He gave a thrilled smile."
         ]
      },
      {
         "id": 120,
         "word": "thrive",
         "role": "verb",
         "BrE": "/θraɪv/",
         "AmE": "/θraɪv/",
         "definition": "to grow or develop well; to succeed",
         "examples": [
            "Plants thrive in sunlight.",
            "She thrives under pressure.",
            "The business began to thrive after the investment."
         ]
      },
      {
         "id": 120,
         "word": "tide",
         "role": "noun",
         "BrE": "/taɪd/",
         "AmE": "/taɪd/",
         "definition": "the regular rise and fall of the sea",
         "examples": [
            "The boat was carried in by the tide.",
            "We walked along the beach at low tide.",
            "The tide turns twice a day."
         ]
      },
      {
         "id": 120,
         "word": "tighten",
         "role": "verb",
         "BrE": "/ˈtaɪtn/",
         "AmE": "/ˈtaɪtn/",
         "definition": "to make tighter; to become stricter",
         "examples": [
            "Tighten the screw with a wrench.",
            "Security was tightened after the attack.",
            "The belt needs tightening."
         ]
      },
      {
         "id": 120,
         "word": "timber",
         "role": "noun",
         "BrE": "/ˈtɪmbər/",
         "AmE": "/ˈtɪmbər/",
         "definition": "wood used for building or fuel",
         "examples": [
            "The house is made of solid timber.",
            "Illegal logging reduces timber supplies.",
            "They used timber to build the frame."
         ]
      },
      {
         "id": 120,
         "word": "timely",
         "role": "adjective",
         "BrE": "/ˈtaɪmli/",
         "AmE": "/ˈtaɪmli/",
         "definition": "happening at the right time",
         "examples": [
            "A timely warning prevented the accident.",
            "She gave a timely reminder before the meeting.",
            "The report was delivered in a timely manner."
         ]
      },
      {
         "id": 120,
         "word": "tolerate",
         "role": "verb",
         "BrE": "/ˈtɒləreɪt/",
         "AmE": "/ˈtɑːləreɪt/",
         "definition": "to accept or allow something unpleasant",
         "examples": [
            "I can’t tolerate loud noise.",
            "She tolerates his bad habits.",
            "The plant doesn’t tolerate cold weather."
         ]
      },
      {
         "id": 120,
         "word": "toll",
         "role": "noun",
         "BrE": "/təʊl/",
         "AmE": "/toʊl/",
         "definition": "a charge for using a road or bridge; the number of people affected",
         "examples": [
            "We paid a toll to cross the bridge.",
            "The human toll of the war was huge.",
            "The accident took a heavy toll."
         ]
      },
      {
         "id": 120,
         "word": "top",
         "role": "verb",
         "BrE": "/tɒp/",
         "AmE": "/tɑːp/",
         "definition": "to be greater than; to reach the highest point",
         "examples": [
            "She topped the class in exams.",
            "The mountain is topped with snow.",
            "Their score topped 100 points."
         ]
      },
      {
         "id": 121,
         "word": "torture",
         "role": "noun, verb",
         "BrE": "/ˈtɔːtʃər/",
         "AmE": "/ˈtɔːrtʃər/",
         "definition": "extreme pain or suffering; to cause such pain",
         "examples": [
            "Torture is against international law.",
            "He was tortured during captivity.",
            "The injury caused her constant torture."
         ]
      },
      {
         "id": 121,
         "word": "toss",
         "role": "verb",
         "BrE": "/tɒs/",
         "AmE": "/tɑːs/",
         "definition": "to throw something lightly; to flip",
         "examples": [
            "She tossed the ball to her dog.",
            "They tossed a coin to decide.",
            "He tossed his keys onto the table."
         ]
      },
      {
         "id": 121,
         "word": "total",
         "role": "verb",
         "BrE": "/ˈtəʊtl/",
         "AmE": "/ˈtoʊtl/",
         "definition": "to add up to a sum; complete",
         "examples": [
            "The bill totals $150.",
            "Their losses totalled over a thousand.",
            "The damage totally destroyed the car."
         ]
      },
      {
         "id": 121,
         "word": "toxic",
         "role": "adjective",
         "BrE": "/ˈtɒksɪk/",
         "AmE": "/ˈtɑːksɪk/",
         "definition": "poisonous; harmful to mental health",
         "examples": [
            "The waste contains toxic chemicals.",
            "Toxic relationships damage self-esteem.",
            "Avoid breathing in toxic fumes."
         ]
      },
      {
         "id": 121,
         "word": "trace",
         "role": "noun",
         "BrE": "/treɪs/",
         "AmE": "/treɪs/",
         "definition": "a very small amount; a sign of something",
         "examples": [
            "There’s a trace of sugar in the drink.",
            "Investigators found traces of fire accelerant.",
            "No trace of the missing files was found."
         ]
      },
      {
         "id": 121,
         "word": "trademark",
         "role": "noun",
         "BrE": "/ˈtreɪdmɑːk/",
         "AmE": "/ˈtreɪdmɑːrk/",
         "definition": "a symbol or name used by a company; a distinctive feature",
         "examples": [
            "The logo is a registered trademark.",
            "Her sense of humour is her trademark.",
            "Apple’s design is a key trademark."
         ]
      },
      {
         "id": 121,
         "word": "trail",
         "role": "noun, verb",
         "BrE": "/treɪl/",
         "AmE": "/treɪl/",
         "definition": "a path through wilderness; to follow or be behind",
         "examples": [
            "We hiked along the mountain trail.",
            "The dog trailed behind us.",
            "Suspicious activity left a digital trail."
         ]
      },
      {
         "id": 121,
         "word": "trailer",
         "role": "noun",
         "BrE": "/ˈtreɪlər/",
         "AmE": "/ˈtreɪlər/",
         "definition": "a short preview of a film; a mobile home or vehicle",
         "examples": [
            "We watched the movie trailer online.",
            "They live in a caravan trailer.",
            "The truck pulled a large trailer."
         ]
      },
      {
         "id": 121,
         "word": "transaction",
         "role": "noun",
         "BrE": "/trænˈzækʃən/",
         "AmE": "/trænˈzækʃən/",
         "definition": "an act of buying or selling; a business exchange",
         "examples": [
            "The bank recorded the transaction.",
            "All online transactions are secure.",
            "It was a simple financial transaction."
         ]
      },
      {
         "id": 121,
         "word": "transcript",
         "role": "noun",
         "BrE": "/ˈtrænskrɪpt/",
         "AmE": "/ˈtrænskrɪpt/",
         "definition": "a written record of spoken words; a student’s academic record",
         "examples": [
            "The interview was published with a full transcript.",
            "She requested her university transcript.",
            "The court keeps a transcript of all proceedings."
         ]
      },
      {
         "id": 122,
         "word": "transformation",
         "role": "noun",
         "BrE": "/ˌtrænsfəˈmeɪʃən/",
         "AmE": "/ˌtrænsfərˈmeɪʃən/",
         "definition": "a major change in form or appearance",
         "examples": [
            "The city underwent a dramatic transformation.",
            "Personal transformation takes time.",
            "The caterpillar’s transformation into a butterfly is amazing."
         ]
      },
      {
         "id": 122,
         "word": "transit",
         "role": "noun",
         "BrE": "/ˈtrænzɪt/",
         "AmE": "/ˈtrænzɪt/",
         "definition": "the act of passing through; public transportation",
         "examples": [
            "The goods are in transit to Europe.",
            "We rely on public transit every day.",
            "The Mars transit took six months."
         ]
      },
      {
         "id": 122,
         "word": "transmission",
         "role": "noun",
         "BrE": "/trænzˈmɪʃən/",
         "AmE": "/trænzˈmɪʃən/",
         "definition": "the act of sending something; how power moves in a car",
         "examples": [
            "The radio transmission came through clearly.",
            "Virus transmission slowed after the vaccine.",
            "The car has an automatic transmission."
         ]
      },
      {
         "id": 122,
         "word": "transparency",
         "role": "noun",
         "BrE": "/trænsˈpærənsi/",
         "AmE": "/trænsˈperənsi/",
         "definition": "openness and honesty; the quality of being see-through",
         "examples": [
            "The government promised greater transparency.",
            "Financial transparency builds trust.",
            "The glass has perfect transparency."
         ]
      },
      {
         "id": 122,
         "word": "transparent",
         "role": "adjective",
         "BrE": "/trænsˈpærənt/",
         "AmE": "/trænsˈperənt/",
         "definition": "see-through; open and honest",
         "examples": [
            "The container is made of transparent plastic.",
            "Her intentions were completely transparent.",
            "We demand transparent decision-making."
         ]
      },
      {
         "id": 122,
         "word": "trauma",
         "role": "noun",
         "BrE": "/ˈtrɔːmə/",
         "AmE": "/ˈtroʊmə/",
         "definition": "a deeply distressing experience; serious injury",
         "examples": [
            "War can cause lasting psychological trauma.",
            "He survived the accident with minor trauma.",
            "Childhood trauma affects adult life."
         ]
      },
      {
         "id": 122,
         "word": "treaty",
         "role": "noun",
         "BrE": "/ˈtriːti/",
         "AmE": "/ˈtriːti/",
         "definition": "a formal agreement between countries",
         "examples": [
            "The peace treaty ended the war.",
            "They signed a trade treaty.",
            "The treaty was ratified by parliament."
         ]
      },
      {
         "id": 122,
         "word": "tremendous",
         "role": "adjective",
         "BrE": "/trɪˈmendəs/",
         "AmE": "/trɪˈmendəs/",
         "definition": "very great in amount or degree",
         "examples": [
            "She received tremendous support.",
            "The explosion caused a tremendous noise.",
            "He made a tremendous effort to succeed."
         ]
      },
      {
         "id": 122,
         "word": "tribal",
         "role": "adjective",
         "BrE": "/ˈtraɪbəl/",
         "AmE": "/ˈtraɪbəl/",
         "definition": "related to a tribe; based on group loyalty",
         "examples": [
            "Tribal traditions are still strong here.",
            "The conflict has tribal roots.",
            "Tribal art is displayed in the museum."
         ]
      },
      {
         "id": 122,
         "word": "tribunal",
         "role": "noun",
         "BrE": "/traɪˈbjuːnl/",
         "AmE": "/traɪˈbjuːnl/",
         "definition": "a court of justice, especially for specific cases",
         "examples": [
            "The war crimes tribunal sentenced the general.",
            "He appealed to an employment tribunal.",
            "The tribunal reviewed the evidence fairly."
         ]
      },
      {
         "id": 123,
         "word": "tribute",
         "role": "noun",
         "BrE": "/ˈtrɪbjuːt/",
         "AmE": "/ˈtrɪbjuːt/",
         "definition": "something said or done to show respect or admiration",
         "examples": [
            "The concert was a tribute to the late singer.",
            "They paid tribute to the fallen soldiers.",
            "This book is a tribute to her mother."
         ]
      },
      {
         "id": 123,
         "word": "trigger",
         "role": "noun",
         "BrE": "/ˈtrɪɡər/",
         "AmE": "/ˈtrɪɡər/",
         "definition": "a cause of an event; the part of a gun that fires it",
         "examples": [
            "Stress can trigger a panic attack.",
            "The comment was the trigger for the argument.",
            "He pulled the trigger too soon."
         ]
      },
      {
         "id": 123,
         "word": "trio",
         "role": "noun",
         "BrE": "/ˈtriːəʊ/",
         "AmE": "/ˈtriːoʊ/",
         "definition": "a group of three people or things",
         "examples": [
            "The music trio played jazz all night.",
            "They formed a successful business trio.",
            "A trio of birds landed on the wire."
         ]
      },
      {
         "id": 123,
         "word": "triumph",
         "role": "noun",
         "BrE": "/ˈtraɪʌmf/",
         "AmE": "/ˈtraɪʌmf/",
         "definition": "a great victory or achievement",
         "examples": [
            "Winning the championship was a triumph.",
            "The launch was a scientific triumph.",
            "Her recovery was a personal triumph."
         ]
      },
      {
         "id": 123,
         "word": "trophy",
         "role": "noun",
         "BrE": "/ˈtrəʊfi/",
         "AmE": "/ˈtroʊfi/",
         "definition": "a prize given for winning, usually a cup",
         "examples": [
            "He lifted the trophy after the final.",
            "The shelf holds all her competition trophies.",
            "The hunter displayed a deer trophy."
         ]
      },
      {
         "id": 123,
         "word": "troubled",
         "role": "adjective",
         "BrE": "/ˈtrʌbld/",
         "AmE": "/ˈtrʌbld/",
         "definition": "having problems or difficulties; worried",
         "examples": [
            "He had a troubled childhood.",
            "The company is in troubled waters.",
            "She gave a troubled look."
         ]
      },
      {
         "id": 123,
         "word": "trustee",
         "role": "noun",
         "BrE": "/ˌtrʌsˈtiː/",
         "AmE": "/ˌtrʌsˈtiː/",
         "definition": "a person who manages property or funds for another",
         "examples": [
            "She is a trustee of the charity.",
            "The board of trustees made the decision.",
            "He was appointed a legal trustee."
         ]
      },
      {
         "id": 123,
         "word": "tuition",
         "role": "noun",
         "BrE": "/tjuːˈɪʃən/",
         "AmE": "/tuːˈɪʃən/",
         "definition": "the cost of teaching; instruction",
         "examples": [
            "University tuition fees are rising.",
            "She receives private tuition in piano.",
            "Tuition at the college is paid per semester."
         ]
      },
      {
         "id": 123,
         "word": "turnout",
         "role": "noun",
         "BrE": "/ˈtɜːnaʊt/",
         "AmE": "/ˈtɜːrnaʊt/",
         "definition": "the number of people who participate, especially in voting",
         "examples": [
            "Election turnout was higher than expected.",
            "The event had a great turnout.",
            "Low voter turnout raised concerns."
         ]
      },
      {
         "id": 123,
         "word": "turnover",
         "role": "noun",
         "BrE": "/ˈtɜːnəʊvər/",
         "AmE": "/ˈtɜːrnoʊvər/",
         "definition": "the rate at which employees leave; total business income",
         "examples": [
            "The company has a high staff turnover.",
            "Annual turnover reached $5 million.",
            "Product turnover is very fast."
         ]
      },
      {
         "id": 124,
         "word": "twist",
         "role": "verb, noun",
         "BrE": "/twɪst/",
         "AmE": "/twɪst/",
         "definition": "to turn or bend; a sudden unexpected change",
         "examples": [
            "Twist the cap to open the bottle.",
            "The story has a surprising twist.",
            "He twisted his ankle while running."
         ]
      },
      {
         "id": 124,
         "word": "undergraduate",
         "role": "noun",
         "BrE": "/ˌʌndəˈɡrædʒuət/",
         "AmE": "/ˌʌndərˈɡrædʒuət/",
         "definition": "a student at a college or university who has not yet earned a degree",
         "examples": [
            "She is an undergraduate studying biology.",
            "Undergraduates must complete core courses.",
            "He worked as a teaching assistant for undergraduates."
         ]
      },
      {
         "id": 124,
         "word": "underlying",
         "role": "adjective",
         "BrE": "/ˌʌndəˈlaɪɪŋ/",
         "AmE": "/ˌʌndərˈlaɪɪŋ/",
         "definition": "lying beneath; basic but not obvious",
         "examples": [
            "The underlying cause was stress.",
            "There is an underlying tension in the team.",
            "Address the underlying problem, not just the symptoms."
         ]
      },
      {
         "id": 124,
         "word": "undermine",
         "role": "verb",
         "BrE": "/ˌʌndəˈmaɪn/",
         "AmE": "/ˌʌndərˈmaɪn/",
         "definition": "to weaken something gradually",
         "examples": [
            "Secret leaks undermine trust.",
            "His comments undermined her authority.",
            "Poor sleep can undermine your health."
         ]
      },
      {
         "id": 124,
         "word": "undoubtedly",
         "role": "adverb",
         "BrE": "/ʌnˈdaʊtɪdli/",
         "AmE": "/ʌnˈdaʊtɪdli/",
         "definition": "without doubt; certainly",
         "examples": [
            "She is undoubtedly the best candidate.",
            "It will undoubtedly rain tomorrow.",
            "Undoubtedly, this is a turning point."
         ]
      },
      {
         "id": 124,
         "word": "unify",
         "role": "verb",
         "BrE": "/ˈjuːnɪfaɪ/",
         "AmE": "/ˈjuːnɪfaɪ/",
         "definition": "to bring together as one",
         "examples": [
            "The leader tried to unify the divided nation.",
            "The project unifies design and function.",
            "Common goals help unify a team."
         ]
      },
      {
         "id": 124,
         "word": "unprecedented",
         "role": "adjective",
         "BrE": "/ʌnˈpresɪdentɪd/",
         "AmE": "/ʌnˈpresɪdentɪd/",
         "definition": "never done or known before",
         "examples": [
            "The pandemic caused unprecedented disruption.",
            "They achieved unprecedented success.",
            "Climate change is causing unprecedented weather."
         ]
      },
      {
         "id": 124,
         "word": "unveil",
         "role": "verb",
         "BrE": "/ˌʌnˈveɪl/",
         "AmE": "/ˌʌnˈveɪl/",
         "definition": "to reveal something publicly for the first time",
         "examples": [
            "The company unveiled a new smartphone.",
            "They unveiled the statue in a public ceremony.",
            "The plan was unveiled at the press conference."
         ]
      },
      {
         "id": 124,
         "word": "upcoming",
         "role": "adjective",
         "BrE": "/ˈʌpˌkʌmɪŋ/",
         "AmE": "/ˈʌpˌkʌmɪŋ/",
         "definition": "happening soon",
         "examples": [
            "The upcoming election is highly competitive.",
            "Check the calendar for upcoming events.",
            "An upcoming trip requires planning."
         ]
      },
      {
         "id": 124,
         "word": "uphold",
         "role": "verb",
         "BrE": "/ʌpˈhəʊld/",
         "AmE": "/ʌpˈhoʊld/",
         "definition": "to support or maintain a law or decision",
         "examples": [
            "The court upheld the lower court’s ruling.",
            "He upheld his principles under pressure.",
            "Officers uphold the law."
         ]
      },
      {
         "id": 125,
         "word": "utility",
         "role": "noun",
         "BrE": "/juːˈtɪləti/",
         "AmE": "/juːˈtɪləti/",
         "definition": "usefulness; a company that provides services like water or electricity",
         "examples": [
            "The tool has many practical utilities.",
            "Gas and water are essential utilities.",
            "The app increases productivity and utility."
         ]
      },
      {
         "id": 125,
         "word": "utilize",
         "role": "verb",
         "BrE": "/ˈjuːtɪlaɪz/",
         "AmE": "/ˈjuːtəlaɪz/",
         "definition": "to make use of something",
         "examples": [
            "They utilized all available resources.",
            "The system utilizes solar energy.",
            "We can utilize this space better."
         ]
      },
      {
         "id": 125,
         "word": "utterly",
         "role": "adverb",
         "BrE": "/ˈʌtəli/",
         "AmE": "/ˈʌtərli/",
         "definition": "completely; totally",
         "examples": [
            "She was utterly exhausted.",
            "The plan was utterly foolish.",
            "He was utterly convinced of her innocence."
         ]
      },
      {
         "id": 125,
         "word": "vacuum",
         "role": "noun",
         "BrE": "/ˈvækjuːm/",
         "AmE": "/ˈvækjuːm/",
         "definition": "a space with no matter; a cleaning machine",
         "examples": [
            "Sound cannot travel in a vacuum.",
            "She cleaned the carpet with a vacuum.",
            "The political vacuum led to chaos."
         ]
      },
      {
         "id": 125,
         "word": "vague",
         "role": "adjective",
         "BrE": "/veɪɡ/",
         "AmE": "/veɪɡ/",
         "definition": "not clear or definite",
         "examples": [
            "His answer was too vague.",
            "She had a vague idea of what to do.",
            "The instructions were vague and confusing."
         ]
      },
      {
         "id": 125,
         "word": "validity",
         "role": "noun",
         "BrE": "/vəˈlɪdəti/",
         "AmE": "/vəˈlɪdəti/",
         "definition": "the quality of being logically or legally sound",
         "examples": [
            "The validity of the test results was questioned.",
            "They checked the validity of the passport.",
            "There is no validity to that claim."
         ]
      },
      {
         "id": 125,
         "word": "vanish",
         "role": "verb",
         "BrE": "/ˈvænɪʃ/",
         "AmE": "/ˈvænɪʃ/",
         "definition": "to disappear suddenly",
         "examples": [
            "The magician made the coin vanish.",
            "Hope seemed to vanish overnight.",
            "The fog vanished by noon."
         ]
      },
      {
         "id": 125,
         "word": "variable",
         "role": "adjective",
         "BrE": "/ˈveəriəbl/",
         "AmE": "/ˈveriəbl/",
         "definition": "likely to change; not constant",
         "examples": [
            "Weather is a variable factor.",
            "Prices are variable depending on demand.",
            "The results were too variable to conclude."
         ]
      },
      {
         "id": 125,
         "word": "varied",
         "role": "adjective",
         "BrE": "/ˈveərid/",
         "AmE": "/ˈverid/",
         "definition": "diverse; showing variety",
         "examples": [
            "The group has varied interests.",
            "She has a varied career background.",
            "The landscape is varied and beautiful."
         ]
      },
      {
         "id": 125,
         "word": "vein",
         "role": "noun",
         "BrE": "/veɪn/",
         "AmE": "/veɪn/",
         "definition": "a blood vessel; a line of mineral in rock",
         "examples": [
            "The doctor injected medicine into a vein.",
            "Gold was found in a mountain vein.",
            "She spoke in a sarcastic vein."
         ]
      },
      {
         "id": 126,
         "word": "venture",
         "role": "noun, verb",
         "BrE": "/ˈventʃər/",
         "AmE": "/ˈventʃər/",
         "definition": "a risky project or journey; to go somewhere dangerous",
         "examples": [
            "The business venture succeeded against odds.",
            "They ventured into the dark forest.",
            "He ventured a guess at the answer."
         ]
      },
      {
         "id": 126,
         "word": "verbal",
         "role": "adjective",
         "BrE": "/ˈvɜːbəl/",
         "AmE": "/ˈvɜːrbəl/",
         "definition": "spoken, not written",
         "examples": [
            "The agreement was only verbal.",
            "Verbal abuse is not tolerated.",
            "She has strong verbal skills."
         ]
      },
      {
         "id": 126,
         "word": "verdict",
         "role": "noun",
         "BrE": "/ˈvɜːdɪkt/",
         "AmE": "/ˈvɜːrdɪkt/",
         "definition": "a decision in a court case",
         "examples": [
            "The jury gave a guilty verdict.",
            "The verdict was announced at noon.",
            "Public verdict on the policy was mixed."
         ]
      },
      {
         "id": 126,
         "word": "verify",
         "role": "verb",
         "BrE": "/ˈverɪfaɪ/",
         "AmE": "/ˈverɪfaɪ/",
         "definition": "to confirm that something is true",
         "examples": [
            "Please verify your email address.",
            "They verified the results with a second test.",
            "The facts were independently verified."
         ]
      },
      {
         "id": 126,
         "word": "verse",
         "role": "noun",
         "BrE": "/vɜːs/",
         "AmE": "/vɜːrs/",
         "definition": "a line or group of lines in a poem or song",
         "examples": [
            "She memorized one verse of the poem.",
            "The song has four verses and a chorus.",
            "Each verse rhymes with the next."
         ]
      },
      {
         "id": 126,
         "word": "versus",
         "role": "preposition",
         "BrE": "/ˈvɜːsəs/",
         "AmE": "/ˈvɜːrsəs/",
         "definition": "against, used in comparisons or competitions",
         "examples": [
            "The match is Team A versus Team B.",
            "It’s human effort versus machine power.",
            "The case is Smith versus Jones."
         ]
      },
      {
         "id": 126,
         "word": "vessel",
         "role": "noun",
         "BrE": "/ˈvesəl/",
         "AmE": "/ˈvesəl/",
         "definition": "a ship or large boat; a container; a blood vessel",
         "examples": [
            "The cargo vessel arrived late.",
            "Wine was served in a glass vessel.",
            "Arteries are blood vessels."
         ]
      },
      {
         "id": 126,
         "word": "veteran",
         "role": "noun",
         "BrE": "/ˈvetərən/",
         "AmE": "/ˈvetərən/",
         "definition": "a person with long experience; a former soldier",
         "examples": [
            "He is a veteran of three wars.",
            "She’s a veteran teacher with 30 years’ experience.",
            "Veterans receive special healthcare benefits."
         ]
      },
      {
         "id": 126,
         "word": "viable",
         "role": "adjective",
         "BrE": "/ˈvaɪəbl/",
         "AmE": "/ˈvaɪəbl/",
         "definition": "capable of working successfully; feasible",
         "examples": [
            "The plan is not viable without funding.",
            "Solar energy is a viable alternative.",
            "They sought a viable solution."
         ]
      },
      {
         "id": 126,
         "word": "vibrant",
         "role": "adjective",
         "BrE": "/ˈvaɪbrənt/",
         "AmE": "/ˈvaɪbrənt/",
         "definition": "full of energy and life; bright in colour",
         "examples": [
            "The city has a vibrant culture.",
            "She wore a vibrant red dress.",
            "The painting uses vibrant colours."
         ]
      },
      {
         "id": 127,
         "word": "vice",
         "role": "noun",
         "BrE": "/vaɪs/",
         "AmE": "/vaɪs/",
         "definition": "an immoral or bad habit; the second-in-command",
         "examples": [
            "Pride is considered a vice.",
            "The vice president gave the speech.",
            "Gambling is his secret vice."
         ]
      },
      {
         "id": 127,
         "word": "vicious",
         "role": "adjective",
         "BrE": "/ˈvɪʃəs/",
         "AmE": "/ˈvɪtʃəs/",
         "definition": "cruel and violent; severe",
         "examples": [
            "The dog made a vicious attack.",
            "It was a vicious storm.",
            "He faced vicious criticism online."
         ]
      },
      {
         "id": 127,
         "word": "villager",
         "role": "noun",
         "BrE": "/ˈvɪlɪdʒər/",
         "AmE": "/ˈvɪlədʒər/",
         "definition": "a person who lives in a village",
         "examples": [
            "The villagers helped repair the road.",
            "She grew up as a villager in a remote area.",
            "The old villager told traditional stories."
         ]
      },
      {
         "id": 127,
         "word": "violate",
         "role": "verb",
         "BrE": "/ˈvaɪəleɪt/",
         "AmE": "/ˈvaɪəleɪt/",
         "definition": "to break a law or rule; to harm someone’s rights",
         "examples": [
            "He violated the terms of his contract.",
            "The action violated human rights.",
            "Do not violate school rules."
         ]
      },
      {
         "id": 127,
         "word": "virtue",
         "role": "noun",
         "BrE": "/ˈvɜːtjuː/",
         "AmE": "/ˈvɜːrtʃuː/",
         "definition": "a good moral quality; a benefit",
         "examples": [
            "Honesty is a great virtue.",
            "Patience is one of her many virtues.",
            "The virtue of the plan is its simplicity."
         ]
      },
      {
         "id": 127,
         "word": "vocal",
         "role": "adjective",
         "BrE": "/ˈvəʊkəl/",
         "AmE": "/ˈvoʊkəl/",
         "definition": "expressing opinions loudly; related to voice",
         "examples": [
            "She was vocal in her support.",
            "The opposition was vocal against the bill.",
            "He has a strong vocal range."
         ]
      },
      {
         "id": 127,
         "word": "vow",
         "role": "verb",
         "BrE": "/vaʊ/",
         "AmE": "/vaʊ/",
         "definition": "to make a serious promise",
         "examples": [
            "He vowed to tell the truth.",
            "She vowed never to return.",
            "They vowed to protect each other."
         ]
      },
      {
         "id": 127,
         "word": "vulnerability",
         "role": "noun",
         "BrE": "/ˌvʌlnərəˈbɪləti/",
         "AmE": "/ˌvʌlnərəˈbɪləti/",
         "definition": "the state of being easily harmed; a weakness",
         "examples": [
            "Emotional vulnerability can build trust.",
            "The system has a security vulnerability.",
            "Old people face health vulnerability."
         ]
      },
      {
         "id": 127,
         "word": "vulnerable",
         "role": "adjective",
         "BrE": "/ˈvʌlnərəbl/",
         "AmE": "/ˈvʌlnərəbl/",
         "definition": "easily hurt or attacked",
         "examples": [
            "Children are especially vulnerable.",
            "She felt vulnerable after the argument.",
            "The species is vulnerable to extinction."
         ]
      },
      {
         "id": 127,
         "word": "ward",
         "role": "noun",
         "BrE": "/wɔːd/",
         "AmE": "/wɔːrd/",
         "definition": "a division of a hospital or prison; a person under protection",
         "examples": [
            "She works on the children’s ward.",
            "He is the legal ward of his uncle.",
            "The prisoner was taken to a secure ward."
         ]
      },
      {
         "id": 128,
         "word": "warehouse",
         "role": "noun",
         "BrE": "/ˈweəhaʊs/",
         "AmE": "/ˈwerhaʊs/",
         "definition": "a large building where goods are stored",
         "examples": [
            "The company has a warehouse outside the city.",
            "They moved the stock to the new warehouse.",
            "The warehouse was full of boxes."
         ]
      },
      {
         "id": 128,
         "word": "warfare",
         "role": "noun",
         "BrE": "/ˈwɔːfeər/",
         "AmE": "/ˈwɔːrfer/",
         "definition": "the methods and activities of war",
         "examples": [
            "Cyber warfare is a modern threat.",
            "Ancient warfare used swords and shields.",
            "Psychological warfare affects morale."
         ]
      },
      {
         "id": 128,
         "word": "warrant",
         "role": "noun, verb",
         "BrE": "/ˈwɒrənt/",
         "AmE": "/ˈwɔːrənt/",
         "definition": "a document giving official permission; to justify",
         "examples": [
            "Police need a warrant to search a house.",
            "The situation warrants immediate action.",
            "His behaviour warranted a warning."
         ]
      },
      {
         "id": 128,
         "word": "warrior",
         "role": "noun",
         "BrE": "/ˈwɒriər/",
         "AmE": "/ˈwɔːriər/",
         "definition": "a brave fighter, especially in the past",
         "examples": [
            "The tribe honoured its warriors.",
            "She is a warrior in the fight against cancer.",
            "Samurai were skilled Japanese warriors."
         ]
      },
      {
         "id": 128,
         "word": "weaken",
         "role": "verb",
         "BrE": "/ˈwiːkən/",
         "AmE": "/ˈwiːkən/",
         "definition": "to make or become weaker",
         "examples": [
            "Illness weakened his body.",
            "The argument weakened her position.",
            "Support for the plan weakened over time."
         ]
      },
      {
         "id": 128,
         "word": "weave",
         "role": "verb",
         "BrE": "/wiːv/",
         "AmE": "/wiːv/",
         "definition": "to make cloth by interlacing threads; to move in and out",
         "examples": [
            "She learned to weave baskets.",
            "The rabbit wove through the trees.",
            "They wove a pattern into the fabric."
         ]
      },
      {
         "id": 128,
         "word": "weed",
         "role": "noun",
         "BrE": "/wiːd/",
         "AmE": "/wiːd/",
         "definition": "a wild plant growing where it is not wanted; cannabis",
         "examples": [
            "Pull the weeds from the garden.",
            "Farmers use herbicides to kill weeds.",
            "He was caught smoking weed."
         ]
      },
      {
         "id": 128,
         "word": "well",
         "role": "noun",
         "BrE": "/wel/",
         "AmE": "/wel/",
         "definition": "a hole in the ground from which water or oil is drawn",
         "examples": [
            "They drew water from the village well.",
            "The oil well was drilled deep underground.",
            "The old well dried up in summer."
         ]
      },
      {
         "id": 128,
         "word": "whatsoever",
         "role": "adverb",
         "BrE": "/ˌwɒtsəʊˈevər/",
         "AmE": "/ˌwɑːtsəʊˈevər/",
         "definition": "at all (used for emphasis)",
         "examples": [
            "I have no interest whatsoever in gossip.",
            "There was nothing whatsoever to eat.",
            "He didn’t show concern whatsoever."
         ]
      },
      {
         "id": 128,
         "word": "whereby",
         "role": "adverb",
         "BrE": "/ˌweərˈbaɪ/",
         "AmE": "/ˌwerˈbaɪ/",
         "definition": "by which method or means",
         "examples": [
            "A system whereby everyone contributes equally.",
            "A contract whereby rights are protected.",
            "They created a plan whereby costs are reduced."
         ]
      },
      {
         "id": 129,
         "word": "whilst",
         "role": "conjunction",
         "BrE": "/waɪlst/",
         "AmE": "/waɪlst/",
         "definition": "while; during the time that",
         "examples": [
            "He listened to music whilst working.",
            "She stayed calm whilst under pressure.",
            "Whilst rare, the error can occur."
         ]
      },
      {
         "id": 129,
         "word": "whip",
         "role": "verb",
         "BrE": "/wɪp/",
         "AmE": "/wɪp/",
         "definition": "to hit with a thin stick; to defeat easily; to move quickly",
         "examples": [
            "The rider whipped the horse.",
            "They whipped the opposition 5–0.",
            "Time was whipped up in the final minutes."
         ]
      },
      {
         "id": 129,
         "word": "wholly",
         "role": "adverb",
         "BrE": "/ˈhəʊlli/",
         "AmE": "/ˈhoʊlli/",
         "definition": "completely; entirely",
         "examples": [
            "I am wholly in agreement.",
            "The project was wholly successful.",
            "She was wholly dedicated to her work."
         ]
      },
      {
         "id": 129,
         "word": "widen",
         "role": "verb",
         "BrE": "/ˈwaɪdn/",
         "AmE": "/ˈwaɪdn/",
         "definition": "to make or become wider",
         "examples": [
            "They widened the road to reduce traffic.",
            "His smile widened.",
            "Efforts to widen access to education continue."
         ]
      },
      {
         "id": 129,
         "word": "widow",
         "role": "noun",
         "BrE": "/ˈwɪdəʊ/",
         "AmE": "/ˈwɪdoʊ/",
         "definition": "a woman whose husband has died",
         "examples": [
            "She became a widow after 40 years of marriage.",
            "The charity helps war widows.",
            "The widow received a pension."
         ]
      },
      {
         "id": 129,
         "word": "willingness",
         "role": "noun",
         "BrE": "/ˈwɪlɪŋnəs/",
         "AmE": "/ˈwɪlɪŋnəs/",
         "definition": "the quality of being ready to do something",
         "examples": [
            "Her willingness to help was appreciated.",
            "Success requires willingness to learn.",
            "They showed willingness to compromise."
         ]
      },
      {
         "id": 129,
         "word": "wipe",
         "role": "verb",
         "BrE": "/waɪp/",
         "AmE": "/waɪp/",
         "definition": "to clean with a cloth; to remove completely",
         "examples": [
            "She wiped the table with a cloth.",
            "The virus wiped all files from the drive.",
            "He wiped his feet before entering."
         ]
      },
      {
         "id": 129,
         "word": "wit",
         "role": "noun",
         "BrE": "/wɪt/",
         "AmE": "/wɪt/",
         "definition": "mental sharpness; the ability to make others laugh",
         "examples": [
            "He won the argument with quick wit.",
            "The play is full of witty dialogue.",
            "She has a sharp wit and a kind heart."
         ]
      },
      {
         "id": 129,
         "word": "withdrawal",
         "role": "noun",
         "BrE": "/wɪðˈdrɔːəl/",
         "AmE": "/wɪðˈdrɔːəl/",
         "definition": "the act of removing or pulling back; stopping use of something",
         "examples": [
            "The withdrawal of troops began Monday.",
            "He suffered withdrawal symptoms after quitting.",
            "Cash withdrawal fees apply."
         ]
      },
      {
         "id": 129,
         "word": "workout",
         "role": "noun",
         "BrE": "/ˈwɜːkaʊt/",
         "AmE": "/ˈwɜːrkaʊt/",
         "definition": "a session of physical exercise",
         "examples": [
            "She does a 30-minute workout every morning.",
            "The gym offers free trial workouts.",
            "His workout includes weights and running."
         ]
      },
      {
         "id": 130,
         "word": "worship",
         "role": "noun, verb",
         "BrE": "/ˈwɜːʃɪp/",
         "AmE": "/ˈwɜːrʃɪp/",
         "definition": "to show deep respect to a god; a religious ceremony",
         "examples": [
            "They worship together every Sunday.",
            "The temple is a place of worship.",
            "She worships nature and the seasons."
         ]
      },
      {
         "id": 130,
         "word": "worthwhile",
         "role": "adjective",
         "BrE": "/ˌwɜːθˈwaɪl/",
         "AmE": "/ˌwɜːrθˈwaɪl/",
         "definition": "worth the time, effort, or money",
         "examples": [
            "The documentary was both interesting and worthwhile.",
            "Is this project really worthwhile?",
            "Volunteering can be very worthwhile."
         ]
      },
      {
         "id": 130,
         "word": "worthy",
         "role": "adjective",
         "BrE": "/ˈwɜːði/",
         "AmE": "/ˈwɜːrði/",
         "definition": "deserving respect or attention",
         "examples": [
            "She is a worthy opponent.",
            "The cause is worthy of support.",
            "He proved himself worthy of the award."
         ]
      },
      {
         "id": 130,
         "word": "yell",
         "role": "verb",
         "BrE": "/jel/",
         "AmE": "/jel/",
         "definition": "to shout loudly",
         "examples": [
            "She yelled for help.",
            "He yelled at the driver who cut him off.",
            "The fans yelled when the goal was scored."
         ]
      },
      {
         "id": 130,
         "word": "yield",
         "role": "noun, verb",
         "BrE": "/jiːld/",
         "AmE": "/jiːld/",
         "definition": "to produce or give in return; to give way",
         "examples": [
            "The farm yields a large harvest.",
            "The tree yields fruit every summer.",
            "He yielded to pressure and resigned."
         ]
      },
      {
         "id": 130,
         "word": "youngster",
         "role": "noun",
         "BrE": "/ˈjʌŋstər/",
         "AmE": "/ˈjʌŋstər/",
         "definition": "a young person or child",
         "examples": [
            "The youngster played football with joy.",
            "She teaches dance to youngsters.",
            "The youngster showed great talent."
         ]
      },
      {
         "id": 130,
         "word": "about",
         "role": "adverb",
         "BrE": "/əˈbaʊt/",
         "AmE": "/əˈbaʊt/",
         "definition": "a little more or less than; approximately",
         "examples": [
            "The movie is about two hours long.",
            "She is about 20 years old.",
            "The project will take about a week to finish."
         ]
      },
      {
         "id": 130,
         "word": "above",
         "role": "preposition",
         "BrE": "/əˈbʌv/",
         "AmE": "/əˈbʌv/",
         "definition": "at a higher level than something else",
         "examples": [
            "The picture hangs above the sofa.",
            "Temperatures rose above 30°C.",
            "He is above the law in his own mind."
         ]
      },
      {
         "id": 130,
         "word": "across",
         "role": "preposition",
         "BrE": "/əˈkrɒs/",
         "AmE": "/əˈkrɔːs/",
         "definition": "from one side to the other",
         "examples": [
            "They walked across the bridge.",
            "The school is across the street.",
            "The idea spread across the country."
         ]
      },
      {
         "id": 130,
         "word": "act",
         "role": "verb",
         "BrE": "/ækt/",
         "AmE": "/ækt/",
         "definition": "to do something; to perform in a play",
         "examples": [
            "He acted quickly in the emergency.",
            "She acts in films and TV shows.",
            "You must act now before it’s too late."
         ]
      }
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
      
      if(savedC1Vocabs.some(item => item.word == ws.word.word) && savedC1Vocabs.some(item => item.role == ws.word.role)){
         setSavedC1Vocabs(savedC1Vocabs.filter((item) => {
            return !(item.word === ws.word.word && item.role === ws.word.role)
         }))

         setCancelBox(true)

         setTimeout(() => {
            setCancelBox(false);
         }, 3000);

      } else {
         setSavedC1Vocabs((prev) => [
            ...prev,
            foundWord[0]
         ])

         setConfirmBox(true)

         setTimeout(() => {
            setConfirmBox(false);
         }, 3000);
      }
   }

   const handleAnswer = (status) => {
      const currentWord = specificLessonWords[currentWordIndex];

      // Update known or unknown words based on status
      if (status === 'known') {
         setKnownWords([...knownWords, { word: currentWord, type: status, lesson: lessonNumber, level: 'C1' }]);
      } else if (status === 'unknown') {
         setUnknownWords([...unknownWords, { word: currentWord, type: status, lesson: lessonNumber, level: 'C1' }]);
      }

      // Check if there are more words to process
      if (currentWordIndex + 1 < specificLessonWords.length) {
         setCurrentWordIndex(currentWordIndex + 1);
      } else {
         // Use the current status to determine the next stage
         const willHaveUnknownWords = status === 'unknown' ? true : unknownWords.length > 0;

         setClose(true);
         if (willHaveUnknownWords) {
               setTimeout(() => {
               setStage('shiftMsg');
            }, 1000);

            setTimeout(() => {
               setAppear(true);
            }, 1500);

         } else {
            setTimeout(() => {
               setStage('excellent');
            }, 1000);

            setTimeout(() => {
               setShow(true);
            }, 2000);
         }
      }
   };
   
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

   if(preview){
      const cancelPreview = () => {
         localStorage.setItem(`preview`, JSON.stringify(false));
         setPreview(false)
      }

      const handleImageLoad = () => {
         setLoadedImages((prev) => {
            const newCount = prev + 1;
            if (newCount >= totalImages) {
               setIsLoading(false);
            }
            return newCount;
         });
      };

      return (
         <div className={styles.previewContainer}>

            <Image className={styles.imgPreview}
               src= '/images/back/previewC1.jpg'
               alt= 'background image'
               fill
               onLoad={handleImageLoad}
            />

            <Back preview = {true} />

            <h2 className={styles.preTitle}> The Words in This Lesson</h2>

            <div className={styles.vocabCards}>
            {
               specificLessonWords?.map((item, index) => (
                  <div className={styles.eachCard} key={index}>
                     <div className={styles.vocab}>{item.word}</div>
                  </div>
               ))
            }
            </div>

            <div className={styles.actionsHolder}>
               <button className={styles.actions} onClick={cancelPreview}>Start this Lesson</button>
            </div>

            {isLoading && (
               <div className={styles.bottomLayer}>
                  <Loader />
               </div>
            )}
         
         </div>
      )
   }

   return (
      <div className={styles.container}>

         <Image className={styles.img}
            src= '/images/back/C1Slug.jpg'
            alt= 'background image'
            fill
         />

         <div className={styles.lessonTitle}>Lesson {lessonNumber}</div>
         <div className={styles.lessonLevel}>C1</div>

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
                     <button className={styles.back} onClick={done}>Save</button>
                     {
                        lessonNumber < wholeLessons ?
                        <button className={styles.back} onClick={nextLesson}>Next Lesson</button>
                        :
                        <button className={styles.back} onClick={nextLevel}>Start C1</button>
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
                           (savedC1Vocabs.some(item => item.word == ws.word.word) && savedC1Vocabs.some(item => item.role == ws.word.role)) ? <FaBookmark className={styles.save}/> : <FaRegBookmark className={styles.save}/>  
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
                                 <button className={styles.button} onClick={nextLevel}>Start C1</button>  
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
                  <button className={styles.button} onClick={nextLevel}>Start C1</button>
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

      {
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
                     <div className={styles.count}>{totalWordsCount}</div>
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













