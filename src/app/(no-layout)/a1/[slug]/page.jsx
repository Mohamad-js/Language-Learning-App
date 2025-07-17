'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from './slug.module.css';
import Link from 'next/link';
import { FaRegBookmark, FaBookmark } from "react-icons/fa6";


export default function Lessons({ params }) {
   const [currentWordIndex, setCurrentWordIndex] = useState(0);
   const [learningWordIndex, setLearningWordIndex] = useState(0);
   const [stage, setStage] = useState('assessment');
   const [knownWords, setKnownWords] = useState([]);
   const [partialWords, setPartialWords] = useState([]);
   const [unknownWords, setUnknownWords] = useState([]);
   const [btn, setBtn] = useState(false)
   const [lessonNumber, setLessonNumber] = useState(null)
   const [savedA1Vocabs, setSavedA1Vocabs] = useState([])
   const [confirmBox, setConfirmBox] = useState(false)
   const [cancelBox, setCancelBox] = useState(false)
   const [close, setClose] = useState(false)
   const [appear, setAppear] = useState(false)
   const [fade, setFade] = useState(false)
   const [progressA1, setProgressA1] = useState(null)

   const { slug } = params;
   
   useEffect(() => {
      setLessonNumber(Number(slug))
   }, [slug])
   
   const router = useRouter()
   useEffect(() => {
      const handleDefaultBack = (event) => {
         event.preventDefault()
         router.replace('/a1')
      }

      window.addEventListener('popstate', handleDefaultBack)
      
      return () => {
         window.addEventListener('popstate', handleDefaultBack)
      }
   }, [router])


// Retrieve data from localStorage on mount
   useEffect(() => {
      try {
         const savedKnowns = JSON.parse(localStorage.getItem(`knownWords-${slug}-A1`) || '[]');
         const savedUnknowns = JSON.parse(localStorage.getItem(`unknownWords-${slug}-A1`) || '[]');
         const savedPartials = JSON.parse(localStorage.getItem(`partialWords-${slug}-A1`) || '[]');
         const currentProgress = slug * 0.0427350427350427
         
         setProgressA1(currentProgress)
         setKnownWords(savedKnowns);
         setUnknownWords(savedUnknowns);
         setPartialWords(savedPartials);
      } catch (e) {
         console.error('Error parsing localStorage data:', e);
      }
   }, [slug]); // Depend on slug to reload when lesson changes
   
   const saveProgress = () => {
      try {
         localStorage.setItem(`knownWords-${slug}-A1`, JSON.stringify(knownWords));
         localStorage.setItem(`partialWords-${slug}-A1`, JSON.stringify(partialWords));
         localStorage.setItem(`unknownWords-${slug}-A1`, JSON.stringify(unknownWords));
         localStorage.setItem(`progress-A1`, JSON.stringify(progressA1));
      
      } catch (e) {
         console.error('Error saving to localStorage:', e);
      }
      
   }

   // Save data to localStorage when state changes
   useEffect(() => {
      try {
         localStorage.setItem(`savedA1Vocabs-${slug}-A1`, JSON.stringify(savedA1Vocabs));

      } catch (e) {
         console.error('Error saving to localStorage:', e);
      }
   }, [savedA1Vocabs, slug]);

   const handleAnswer = (status) => {
      const currentWord = specificLessonWords[currentWordIndex];
      if (status === 'known') {
         setKnownWords([...knownWords, { word: currentWord, type: status, lesson: lessonNumber }]);

      } else if (status === 'partial') {
         setPartialWords([...partialWords, { word: currentWord, type: status, lesson: lessonNumber }]);

      } else {
         setUnknownWords([...unknownWords, { word: currentWord, type: status, lesson: lessonNumber }]);
      }

      if (currentWordIndex + 1 < specificLessonWords.length) {
         setCurrentWordIndex(currentWordIndex + 1);
      } else {
         setClose(true);

         setTimeout(() => {
            setStage('shiftMsg')
         }, 1000);

         setTimeout(() => {
            setAppear(true)
         }, 1500);
      }
   };

   const handleNextLearningWord = () => {
      const learningWords = [...partialWords, ...unknownWords];
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
            "saved": false,
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
            
            "id": 1,
            "saved": false,
            "word": "about",
            "role": "preposition",
            "BrE": "/əˈbaʊt/",
            "AmE": "/əˈbaʊt/",
            "definition": "on the subject of something",
            "examples": [
               "This book is about animals.",
               "We talked about our holiday plans.",
               "She gave a presentation about climate change."
            ]
         },
         {
            
            "id": 1,
            "saved": false,
            "word": "above",
            "role": "adverb",
            "BrE": "/əˈbʌv/",
            "AmE": "/əˈbʌv/",
            "definition": "at a higher level or position",
            "examples": [
               "The bird is flying above.",
               "The picture hangs above the sofa.",
               "The temperature is above normal today."
            ]
         },
         {
            
            "id": 1,
            "saved": false,
            "word": "above",
            "role": "preposition",
            "BrE": "/əˈbʌv/",
            "AmE": "/əˈbʌv/",
            "definition": "in a higher position than something",
            "examples": [
               "The lamp is above the table.",
               "The plane flew above the clouds.",
               "Her score was above the class average."
            ]
         },
         {
            
            "id": 1,
            "saved": false,
            "word": "across",
            "role": "adverb",
            "BrE": "/əˈkrɒs/",
            "AmE": "/əˈkrɔːs/",
            "definition": "from one side to the other",
            "examples": [
               "He walked across.",
               "She swam across the river.",
               "The news spread across the town quickly."
            ]
         },
         {
            
            "id": 1,
            "saved": false,
            "word": "across",
            "role": "preposition",
            "BrE": "/əˈkrɒs/",
            "AmE": "/əˈkrɔːs/",
            "definition": "from one side to the other of something",
            "examples": [
               "The bridge is across the river.",
               "They walked across the park to school.",
               "She sent a letter across the country."
            ]
         },
         {
            
            "id": 1,
            "saved": false,
            "word": "action",
            "role": "noun",
            "BrE": "/ˈækʃn/",
            "AmE": "/ˈækʃn/",
            "definition": "something that you do",
            "examples": [
               "His action was very kind.",
               "The action of helping others is good.",
               "Quick action saved the burning house."
            ]
         },
         {
            
            "id": 1,
            "saved": false,
            "word": "activity",
            "role": "noun",
            "BrE": "/ækˈtɪvəti/",
            "AmE": "/ækˈtɪvəti/",
            "definition": "something that you do for interest or pleasure",
            "examples": [
               "Drawing is a fun activity.",
               "The school offers many activities.",
               "Outdoor activities improve our health."
            ]
         },
         {
            
            "id": 1,
            "saved": false,
            "word": "actor",
            "role": "noun",
            "BrE": "/ˈæktə(r)/",
            "AmE": "/ˈæktər/",
            "definition": "a person who acts in plays or films",
            "examples": [
               "He is a famous actor.",
               "The actor played a king in the movie.",
               "She met an actor at the film festival."
            ]
         },
         {
            
            "id": 1,
            "saved": false,
            "word": "actress",
            "role": "noun",
            "BrE": "/ˈæktrəs/",
            "AmE": "/ˈæktrəs/",
            "definition": "a woman who acts in plays or films",
            "examples": [
               "She is a great actress.",
               "The actress won an award for her role.",
               "A young actress starred in the new film."
            ]
         },
         {
            
            "id": 2,
            "saved": false,
            "word": "add",
            "role": "verb",
            "BrE": "/æd/",
            "AmE": "/æd/",
            "definition": "to put something with something else",
            "examples": [
               "Add sugar to the tea.",
               "She added milk to her coffee.",
               "He added his name to the list."
            ]
         },
         {
            
            "id": 2,
            "saved": false,
            "word": "address",
            "role": "noun",
            "BrE": "/əˈdres/",
            "AmE": "/əˈdres/",
            "definition": "details of where somebody lives or works",
            "examples": [
               "My address is 123 Main Street.",
               "She wrote her address on the envelope.",
               "The address on the package was wrong."
            ]
         },
         {
            
            "id": 2,
            "saved": false,
            "word": "adult",
            "role": "noun",
            "BrE": "/ˈædʌlt/",
            "AmE": "/əˈdʌlt/",
            "definition": "a person who is fully grown",
            "examples": [
               "This movie is for adults.",
               "Adults must buy a ticket.",
               "The event is open to adults only."
            ]
         },
         {
            
            "id": 2,
            "saved": false,
            "word": "advice",
            "role": "noun",
            "BrE": "/ədˈvaɪs/",
            "AmE": "/ədˈvaɪs/",
            "definition": "an opinion you give someone about what they should do",
            "examples": [
               "She gave me good advice.",
               "His advice helped me choose a job.",
               "I need advice about my homework."
            ]
         },
         {
            
            "id": 2,
            "saved": false,
            "word": "afraid",
            "role": "adjective",
            "BrE": "/əˈfreɪd/",
            "AmE": "/əˈfreɪd/",
            "definition": "feeling fear or worry",
            "examples": [
               "I am afraid of dogs.",
               "She was afraid to go outside.",
               "He is afraid of failing the exam."
            ]
         },
         {
            
            "id": 2,
            "saved": false,
            "word": "after",
            "role": "preposition",
            "BrE": "/ˈɑːftə(r)/",
            "AmE": "/ˈæftər/",
            "definition": "later than something",
            "examples": [
               "We eat dinner after six.",
               "She called after the meeting.",
               "He arrived after everyone left."
            ]
         },
         {
            
            "id": 2,
            "saved": false,
            "word": "afternoon",
            "role": "noun",
            "BrE": "/ˌɑːftəˈnuːn/",
            "AmE": "/ˌæftərˈnuːn/",
            "definition": "the time from 12 noon until evening",
            "examples": [
               "See you this afternoon!",
               "We play football in the afternoon.",
               "The meeting is scheduled for the afternoon."
            ]
         },
         {
            
            "id": 2,
            "saved": false,
            "word": "again",
            "role": "adverb",
            "BrE": "/əˈɡen/",
            "AmE": "/əˈɡen/",
            "definition": "one more time; another time",
            "examples": [
               "Say it again, please.",
               "She visited the park again.",
               "He forgot his lines and started again."
            ]
         },
         {
            
            "id": 2,
            "saved": false,
            "word": "age",
            "role": "noun",
            "BrE": "/eɪdʒ/",
            "AmE": "/eɪdʒ/",
            "definition": "how old someone or something is",
            "examples": [
               "What is your age?",
               "Her age is 15 years old.",
               "The age of the building is 100 years."
            ]
         },
         {
            
            "id": 2,
            "saved": false,
            "word": "ago",
            "role": "adverb",
            "BrE": "/əˈɡəʊ/",
            "AmE": "/əˈɡoʊ/",
            "definition": "in the past; back in time from now",
            "examples": [
               "I saw her two days ago.",
               "He moved here a year ago.",
               "The movie came out a long time ago."
            ]
         },
         {
            
            "id": 3,
            "saved": false,
            "word": "agree",
            "role": "verb",
            "BrE": "/əˈɡriː/",
            "AmE": "/əˈɡriː/",
            "definition": "to have the same opinion as someone",
            "examples": [
               "I agree with you.",
               "They agree on the plan.",
               "She agreed to help with the project."
            ]
         },
         {
            
            "id": 3,
            "saved": false,
            "word": "air",
            "role": "noun",
            "BrE": "/eə(r)/",
            "AmE": "/er/",
            "definition": "the mixture of gases that we breathe",
            "examples": [
               "The air is fresh today.",
               "We need clean air to breathe.",
               "Polluted air is bad for health."
            ]
         },
         {
            
            "id": 3,
            "saved": false,
            "word": "airport",
            "role": "noun",
            "BrE": "/ˈeəpɔːt/",
            "AmE": "/ˈerpɔːrt/",
            "definition": "a place where planes land and take off",
            "examples": [
               "The airport is big.",
               "We arrived at the airport early.",
               "The airport was crowded with travelers."
            ]
         },
         {
            
            "id": 3,
            "saved": false,
            "word": "all",
            "role": "determiner",
            "BrE": "/ɔːl/",
            "AmE": "/ɔːl/",
            "definition": "every one of a group",
            "examples": [
               "All students are here.",
               "She ate all the cake.",
               "All the books are on the shelf."
            ]
         },
         {
            
            "id": 3,
            "saved": false,
            "word": "all",
            "role": "pronoun",
            "BrE": "/ɔːl/",
            "AmE": "/ɔːl/",
            "definition": "everything or everyone",
            "examples": [
               "All is ready now.",
               "All of us are going.",
               "All she wants is a new phone."
            ]
         },
         {
            
            "id": 3,
            "saved": false,
            "word": "also",
            "role": "adverb",
            "BrE": "/ˈɔːlsəʊ/",
            "AmE": "/ˈɔːlsoʊ/",
            "definition": "in addition; too",
            "examples": [
               "I like tea and also coffee.",
               "She sings and also dances.",
               "He is smart and also very kind."
            ]
         },
         {
            
            "id": 3,
            "saved": false,
            "word": "always",
            "role": "adverb",
            "BrE": "/ˈɔːlweɪz/",
            "AmE": "/ˈɔːlweɪz/",
            "definition": "at all times; every time",
            "examples": [
               "She is always happy.",
               "He always arrives on time.",
               "They always eat dinner together."
            ]
         },
         {
            
            "id": 3,
            "saved": false,
            "word": "amazing",
            "role": "adjective",
            "BrE": "/əˈmeɪzɪŋ/",
            "AmE": "/əˈmeɪzɪŋ/",
            "definition": "very surprising, wonderful, or impressive",
            "examples": [
               "The view is amazing.",
               "Her dance was truly amazing.",
               "The amazing story made us cry."
            ]
         },
         {
            
            "id": 3,
            "saved": false,
            "word": "and",
            "role": "conjunction",
            "BrE": "/ænd/",
            "AmE": "/ænd/",
            "definition": "used to connect words or parts of sentences",
            "examples": [
               "I like tea and coffee.",
               "She sings and plays the piano.",
               "He bought a book and a pen."
            ]
         },
         {
            
            "id": 3,
            "saved": false,
            "word": "angry",
            "role": "adjective",
            "BrE": "/ˈæŋɡri/",
            "AmE": "/ˈæŋɡri/",
            "definition": "having strong feelings because something is unfair or bad",
            "examples": [
               "He is angry with me.",
               "She was angry about the mistake.",
               "The teacher got angry when we were late."
            ]
         },
         {
            
            "id": 4,
            "saved": false,
            "word": "animal",
            "role": "noun",
            "BrE": "/ˈænɪml/",
            "AmE": "/ˈænɪml/",
            "definition": "a living creature such as a dog or cat",
            "examples": [
               "I have a pet animal.",
               "The zoo has many animals.",
               "This animal lives in the forest."
            ]
         },
         {
            
            "id": 4,
            "saved": false,
            "word": "another",
            "role": "determiner",
            "BrE": "/əˈnʌðə(r)/",
            "AmE": "/əˈnʌðər/",
            "definition": "one more; an additional one",
            "examples": [
               "I want another apple.",
               "She bought another pair of shoes.",
               "He asked for another chance to try."
            ]
         },
         {
            
            "id": 4,
            "saved": false,
            "word": "another",
            "role": "pronoun",
            "BrE": "/əˈnʌðə(r)/",
            "AmE": "/əˈnʌðər/",
            "definition": "an additional person or thing",
            "examples": [
               "Can you give me another?",
               "I ate one cookie, then took another.",
               "One left, so she chose another."
            ]
         },
         {
            
            "id": 4,
            "saved": false,
            "word": "answer",
            "role": "noun",
            "BrE": "/ˈɑːnsə(r)/",
            "AmE": "/ˈænsər/",
            "definition": "something you say or write when someone asks you a question",
            "examples": [
               "His answer was yes.",
               "She gave a correct answer.",
               "The answer to the question was clear."
            ]
         },
         {
            
            "id": 4,
            "saved": false,
            "word": "answer",
            "role": "verb",
            "BrE": "/ˈɑːnsə(r)/",
            "AmE": "/ˈænsər/",
            "definition": "to say or write something as a reply",
            "examples": [
               "Please answer the question.",
               "He answered the phone quickly.",
               "She answered with a smile."
            ]
         },
         {
            
            "id": 4,
            "saved": false,
            "word": "any",
            "role": "determiner",
            "BrE": "/ˈeni/",
            "AmE": "/ˈeni/",
            "definition": "used to refer to one, some, or all things or people",
            "examples": [
               "Do you have any pens?",
               "Any student can join the club.",
               "I don’t have any time today."
            ]
         },
         {
            "id": 4,
            "word": "reply",
            "role": "noun",
            "BrE": "/rɪˈplaɪ/",
            "AmE": "/rɪˈplaɪ/",
            "definition": "an answer or response",
            "examples": [
               "His reply was short.",
               "She waited for a reply.",
               "The reply clarified the situation."
            ]
         },
         {
            
            "id": 4,
            "saved": false,
            "word": "anyone",
            "role": "pronoun",
            "BrE": "/ˈeniwʌn/",
            "AmE": "/ˈeniwʌn/",
            "definition": "any person",
            "examples": [
               "Can anyone help me?",
               "Anyone can join the party.",
               "Is anyone coming to the meeting?"
            ]
         },
         {
            
            "id": 4,
            "saved": false,
            "word": "anything",
            "role": "pronoun",
            "BrE": "/ˈeniθɪŋ/",
            "AmE": "/ˈeniθɪŋ/",
            "definition": "any thing, no matter what",
            "examples": [
               "I don’t want anything.",
               "Did you buy anything at the shop?",
               "Anything you need, just ask me."
            ]
         },
         {
            
            "id": 4,
            "saved": false,
            "word": "apartment",
            "role": "noun",
            "BrE": "/əˈpɑːtmənt/",
            "AmE": "/əˈpɑːrtmənt/",
            "definition": "a set of rooms for living in, usually on one floor",
            "examples": [
               "I live in an apartment.",
               "Her apartment is on the third floor.",
               "The apartment has a big kitchen."
            ]
         },
         {
            
            "id": 5,
            "saved": false,
            "word": "apple",
            "role": "noun",
            "BrE": "/ˈæpl/",
            "AmE": "/ˈæpl/",
            "definition": "a round fruit with red or green skin",
            "examples": [
               "I ate an apple.",
               "She bought red apples at the market.",
               "An apple a day keeps you healthy."
            ]
         },
         {
            
            "id": 5,
            "saved": false,
            "word": "April",
            "role": "noun",
            "BrE": "/ˈeɪprəl/",
            "AmE": "/ˈeɪprəl/",
            "definition": "the fourth month of the year",
            "examples": [
               "My birthday is in April.",
               "April is a spring month.",
               "We have a holiday in April."
            ]
         },
         {
            
            "id": 5,
            "saved": false,
            "word": "area",
            "role": "noun",
            "BrE": "/ˈeəriə/",
            "AmE": "/ˈeriə/",
            "definition": "a part of a place or space",
            "examples": [
               "This is a quiet area.",
               "The park is a green area.",
               "The area near the school is safe."
            ]
         },
         {
            
            "id": 5,
            "saved": false,
            "word": "arm",
            "role": "noun",
            "BrE": "/ɑːm/",
            "AmE": "/ɑːrm/",
            "definition": "the part of the body between the shoulder and the hand",
            "examples": [
               "My arm hurts.",
               "She broke her arm playing football.",
               "He carried the bag in his arms."
            ]
         },
         {
            
            "id": 5,
            "saved": false,
            "word": "around",
            "role": "adverb",
            "BrE": "/əˈraʊnd/",
            "AmE": "/əˈraʊnd/",
            "definition": "in a circle or in different places",
            "examples": [
               "We walked around.",
               "She looked around the room.",
               "They traveled around the city."
            ]
         },
         {
            
            "id": 5,
            "saved": false,
            "word": "around",
            "role": "preposition",
            "BrE": "/əˈraʊnd/",
            "AmE": "/əˈraʊnd/",
            "definition": "in a circle or surrounding something",
            "examples": [
               "Trees are around the house.",
               "We sat around the table.",
               "A fence is around the garden."
            ]
         },
         {
            
            "id": 5,
            "saved": false,
            "word": "arrive",
            "role": "verb",
            "BrE": "/əˈraɪv/",
            "AmE": "/əˈraɪv/",
            "definition": "to get to a place",
            "examples": [
               "We arrive at six.",
               "The train arrived at the station.",
               "She arrived late for the meeting."
            ]
         },
         {
            
            "id": 5,
            "saved": false,
            "word": "art",
            "role": "noun",
            "BrE": "/ɑːt/",
            "AmE": "/ɑːrt/",
            "definition": "the activity of creating paintings, drawings, or other objects",
            "examples": [
               "I like art.",
               "Her art is in the museum.",
               "He studies art at school."
            ]
         },
         {
            
            "id": 5,
            "saved": false,
            "word": "article",
            "role": "noun",
            "BrE": "/ˈɑːtɪkl/",
            "AmE": "/ˈɑːrtɪkl/",
            "definition": "a piece of writing in a newspaper or magazine",
            "examples": [
               "I read an article.",
               "The article was about animals.",
               "She wrote an article for the school paper."
            ]
         },
         {
            
            "id": 5,
            "saved": false,
            "word": "artist",
            "role": "noun",
            "BrE": "/ˈɑːtɪst/",
            "AmE": "/ˈɑːrtɪst/",
            "definition": "a person who creates art, such as paintings",
            "examples": [
               "She is an artist.",
               "The artist painted a big picture.",
               "This artist is famous for landscapes."
            ]
         },
         {
            
            "id": 6,
            "saved": false,
            "word": "as",
            "role": "preposition",
            "BrE": "/æz/",
            "AmE": "/æz/",
            "definition": "used to describe the job or role of someone",
            "examples": [
               "He works as a teacher.",
               "She is employed as a nurse.",
               "I started as a waiter last year."
            ]
         },
         {
            
            "id": 6,
            "saved": false,
            "word": "ask",
            "role": "verb",
            "BrE": "/ɑːsk/",
            "AmE": "/æsk/",
            "definition": "to say or write something to get an answer",
            "examples": [
               "Ask me a question.",
               "She asked for help with homework.",
               "He asked about the new project."
            ]
         },
         {
            
            "id": 6,
            "saved": false,
            "word": "at",
            "role": "preposition",
            "BrE": "/æt/",
            "AmE": "/æt/",
            "definition": "used to show a place or time",
            "examples": [
               "I am at school.",
               "Meet me at the park at six.",
               "She works at the library."
            ]
         },
         {
            
            "id": 6,
            "saved": false,
            "word": "August",
            "role": "noun",
            "BrE": "/ˈɔːɡəst/",
            "AmE": "/ˈɔːɡəst/",
            "definition": "the eighth month of the year",
            "examples": [
               "August is hot.",
               "We go on holiday in August.",
               "Her birthday is on August 10th."
            ]
         },
         {
            
            "id": 6,
            "saved": false,
            "word": "aunt",
            "role": "noun",
            "BrE": "/ɑːnt/",
            "AmE": "/ænt/",
            "definition": "the sister of your mother or father",
            "examples": [
               "My aunt is kind.",
               "Her aunt lives in London.",
               "I visit my aunt every weekend."
            ]
         },
         {
            
            "id": 6,
            "saved": false,
            "word": "autumn",
            "role": "noun",
            "BrE": "/ˈɔːtəm/",
            "AmE": "/ˈɔːtəm/",
            "definition": "the season between summer and winter",
            "examples": [
               "Autumn is cool.",
               "Leaves fall in autumn.",
               "We love walking in autumn."
            ]
         },
         {
            
            "id": 6,
            "saved": false,
            "word": "away",
            "role": "adverb",
            "BrE": "/əˈweɪ/",
            "AmE": "/əˈweɪ/",
            "definition": "to or at a distance from a place",
            "examples": [
               "Go away!",
               "The beach is far away.",
               "She moved away from her hometown."
            ]
         },
         {
            
            "id": 6,
            "saved": false,
            "word": "baby",
            "role": "noun",
            "BrE": "/ˈbeɪbi/",
            "AmE": "/ˈbeɪbi/",
            "definition": "a very young child",
            "examples": [
               "The baby is sleeping.",
               "She has a new baby.",
               "The baby cried all night."
            ]
         },
         {
            
            "id": 6,
            "saved": false,
            "word": "back",
            "role": "adverb",
            "BrE": "/bæk/",
            "AmE": "/bæk/",
            "definition": "to the place where something was before",
            "examples": [
               "Come back soon!",
               "He went back to his room.",
               "She looked back at the house."
            ]
         },
         {
            
            "id": 6,
            "saved": false,
            "word": "back",
            "role": "noun",
            "BrE": "/bæk/",
            "AmE": "/bæk/",
            "definition": "the part of the body from the neck to the bottom",
            "examples": [
               "My back hurts.",
               "He carried a bag on his back.",
               "She fell and hurt her back."
            ]
         },
         {
            
            "id": 7,
            "saved": false,
            "word": "bad",
            "role": "adjective",
            "BrE": "/bæd/",
            "AmE": "/bæd/",
            "definition": "not good or pleasant",
            "examples": [
               "The weather is bad.",
               "He had a bad day at school.",
               "This is a bad time to call."
            ]
         },
         {
            
            "id": 7,
            "saved": false,
            "word": "bag",
            "role": "noun",
            "BrE": "/bæɡ/",
            "AmE": "/bæɡ/",
            "definition": "a container made of paper or plastic for carrying things",
            "examples": [
               "I have a school bag.",
               "She put apples in the bag.",
               "His bag is full of books."
            ]
         },
         {
            
            "id": 7,
            "saved": false,
            "word": "ball",
            "role": "noun",
            "BrE": "/bɔːl/",
            "AmE": "/bɔːl/",
            "definition": "a round object used in games and sports",
            "examples": [
               "Kick the ball!",
               "We played with a red ball.",
               "The ball went over the fence."
            ]
         },
         {
            
            "id": 7,
            "saved": false,
            "word": "banana",
            "role": "noun",
            "BrE": "/bəˈnɑːnə/",
            "AmE": "/bəˈnænə/",
            "definition": "a long, curved fruit with yellow skin",
            "examples": [
               "I ate a banana.",
               "She likes bananas for breakfast.",
               "He bought a bunch of bananas."
            ]
         },
         {
            
            "id": 7,
            "saved": false,
            "word": "band",
            "role": "noun",
            "BrE": "/bænd/",
            "AmE": "/bænd/",
            "definition": "a group of people who play music together",
            "examples": [
               "The band is playing.",
               "I like this rock band.",
               "The band performed at the festival."
            ]
         },
         {
            
            "id": 7,
            "saved": false,
            "word": "bank",
            "role": "noun",
            "BrE": "/bæŋk/",
            "AmE": "/bæŋk/",
            "definition": "a place where people keep money",
            "examples": [
               "I go to the bank.",
               "She saves money in the bank.",
               "The bank is open until five."
            ]
         },
         {
            
            "id": 7,
            "saved": false,
            "word": "bath",
            "role": "noun",
            "BrE": "/bɑːθ/",
            "AmE": "/bæθ/",
            "definition": "a large container you fill with water to wash your body",
            "examples": [
               "I take a bath.",
               "The baby likes a warm bath.",
               "She takes a bath every evening."
            ]
         },
         {
            
            "id": 7,
            "saved": false,
            "word": "bathroom",
            "role": "noun",
            "BrE": "/ˈbɑːθruːm/",
            "AmE": "/ˈbæθruːm/",
            "definition": "a room with a toilet, a bath, or a shower",
            "examples": [
               "The bathroom is upstairs.",
               "I cleaned the bathroom today.",
               "The house has two bathrooms."
            ]
         },
         {
            
            "id": 7,
            "saved": false,
            "word": "be",
            "role": "verb",
            "BrE": "/biː/",
            "AmE": "/biː/",
            "definition": "used to show existence or describe someone or something",
            "examples": [
               "I am happy.",
               "She is a teacher.",
               "They are at the park now."
            ]
         },
         {
            
            "id": 7,
            "saved": false,
            "word": "be",
            "role": "auxiliary verb",
            "BrE": "/biː/",
            "AmE": "/biː/",
            "definition": "used to form continuous tenses or the passive",
            "examples": [
               "She is reading.",
               "They are playing football.",
               "The room is being cleaned."
            ]
         },
         {
            
            "id": 8,
            "saved": false,
            "word": "beach",
            "role": "noun",
            "BrE": "/biːtʃ/",
            "AmE": "/biːtʃ/",
            "definition": "an area of sand or stones by the sea",
            "examples": [
               "I love the beach.",
               "We walked on the beach.",
               "The beach was crowded today."
            ]
         },
         {
            
            "id": 8,
            "saved": false,
            "word": "beautiful",
            "role": "adjective",
            "BrE": "/ˈbjuːtɪfl/",
            "AmE": "/ˈbjuːtɪfl/",
            "definition": "very attractive or pleasing",
            "examples": [
               "She is beautiful.",
               "The flower is very beautiful.",
               "The sunset was beautiful tonight."
            ]
         },
         {
            
            "id": 8,
            "saved": false,
            "word": "because",
            "role": "conjunction",
            "BrE": "/bɪˈkɒz/",
            "AmE": "/bɪˈkɔːz/",
            "definition": "for the reason that",
            "examples": [
               "I’m late because of traffic.",
               "She cried because she was sad.",
               "He stayed home because it rained."
            ]
         },
         {
            
            "id": 8,
            "saved": false,
            "word": "become",
            "role": "verb",
            "BrE": "/bɪˈkʌm/",
            "AmE": "/bɪˈkʌm/",
            "definition": "to start to be something",
            "examples": [
               "She became a doctor.",
               "The weather became cold.",
               "He became famous after the movie."
            ]
         },
         {
            
            "id": 8,
            "saved": false,
            "word": "bed",
            "role": "noun",
            "BrE": "/bed/",
            "AmE": "/bed/",
            "definition": "a piece of furniture for sleeping on",
            "examples": [
               "I sleep in a bed.",
               "The bed is very comfortable.",
               "She made the bed this morning."
            ]
         },
         {
            
            "id": 8,
            "saved": false,
            "word": "bedroom",
            "role": "noun",
            "BrE": "/ˈbedruːm/",
            "AmE": "/ˈbedruːm/",
            "definition": "a room for sleeping in",
            "examples": [
               "My bedroom is big.",
               "She painted her bedroom blue.",
               "The bedroom has a large window."
            ]
         },
         {
            
            "id": 8,
            "saved": false,
            "word": "beer",
            "role": "noun",
            "BrE": "/bɪə(r)/",
            "AmE": "/bɪr/",
            "definition": "an alcoholic drink made from grain",
            "examples": [
               "He drinks beer.",
               "They ordered a cold beer.",
               "The bar serves many types of beer."
            ]
         },
         {
            
            "id": 8,
            "saved": false,
            "word": "before",
            "role": "preposition",
            "BrE": "/bɪˈfɔː(r)/",
            "AmE": "/bɪˈfɔːr/",
            "definition": "earlier than something or someone",
            "examples": [
               "Come before seven.",
               "I ate breakfast before school.",
               "She finished her work before lunch."
            ]
         },
         {
            
            "id": 8,
            "saved": false,
            "word": "begin",
            "role": "verb",
            "BrE": "/bɪˈɡɪn/",
            "AmE": "/bɪˈɡɪn/",
            "definition": "to start something",
            "examples": [
               "Let’s begin the game.",
               "The movie begins at eight.",
               "She began writing a book."
            ]
         },
         {
            
            "id": 8,
            "saved": false,
            "word": "beginning",
            "role": "noun",
            "BrE": "/bɪˈɡɪnɪŋ/",
            "AmE": "/bɪˈɡɪnɪŋ/",
            "definition": "the start of something",
            "examples": [
               "The beginning is easy.",
               "The book has a good beginning.",
               "At the beginning of the year, we plan."
            ]
         },
         {
            
            "id": 9,
            "saved": false,
            "word": "behind",
            "role": "adverb",
            "BrE": "/bɪˈhaɪnd/",
            "AmE": "/bɪˈhaɪnd/",
            "definition": "at or to the back of something",
            "examples": [
               "Look behind you!",
               "She stood behind the door.",
               "He was behind in his homework."
            ]
         },
         {
            
            "id": 9,
            "saved": false,
            "word": "behind",
            "role": "preposition",
            "BrE": "/bɪˈhaɪnd/",
            "AmE": "/bɪˈhaɪnd/",
            "definition": "at the back of something",
            "examples": [
               "The cat is behind the sofa.",
               "He hid behind a tree.",
               "The shop is behind the station."
            ]
         },
         {
            
            "id": 9,
            "saved": false,
            "word": "believe",
            "role": "verb",
            "BrE": "/bɪˈliːv/",
            "AmE": "/bɪˈliːv/",
            "definition": "to think that something is true",
            "examples": [
               "I believe you.",
               "She believes in hard work.",
               "He believes the story is true."
            ]
         },
         {
            
            "id": 9,
            "saved": false,
            "word": "below",
            "role": "adverb",
            "BrE": "/bɪˈləʊ/",
            "AmE": "/bɪˈloʊ/",
            "definition": "at a lower level",
            "examples": [
               "The fish swim below.",
               "See the note below.",
               "The temperature fell below zero."
            ]
         },
         {
            
            "id": 9,
            "saved": false,
            "word": "below",
            "role": "preposition",
            "BrE": "/bɪˈləʊ/",
            "AmE": "/bɪˈloʊ/",
            "definition": "in a lower position than something",
            "examples": [
               "The shelf is below the window.",
               "Her score was below average.",
               "The village is below the mountain."
            ]
         },
         {
            
            "id": 9,
            "saved": false,
            "word": "best",
            "role": "adjective",
            "BrE": "/best/",
            "AmE": "/best/",
            "definition": "better than all others",
            "examples": [
               "This is the best cake.",
               "She is my best friend.",
               "He did his best in the exam."
            ]
         },
         {
            
            "id": 9,
            "saved": false,
            "word": "better",
            "role": "adjective",
            "BrE": "/ˈbetə(r)/",
            "AmE": "/ˈbetər/",
            "definition": "comparative of good; of a higher quality",
            "examples": [
               "This book is better.",
               "Her grades are better now.",
               "This is a better choice for us."
            ]
         },
         {
            
            "id": 9,
            "saved": false,
            "word": "between",
            "role": "preposition",
            "BrE": "/bɪˈtwiːn/",
            "AmE": "/bɪˈtwiːn/",
            "definition": "in the space or time separating two things",
            "examples": [
               "The house is between two trees.",
               "We meet between 3 and 4 p.m.",
               "She stood between her friends."
            ]
         },
         {
            
            "id": 9,
            "saved": false,
            "word": "bicycle",
            "role": "noun",
            "BrE": "/ˈbaɪsɪkl/",
            "AmE": "/ˈbaɪsɪkl/",
            "definition": "a vehicle with two wheels that you ride",
            "examples": [
               "I ride a bicycle.",
               "He bought a new bicycle.",
               "She rides her bicycle to school."
            ]
         },
         {
            
            "id": 9,
            "saved": false,
            "word": "big",
            "role": "adjective",
            "BrE": "/bɪɡ/",
            "AmE": "/bɪɡ/",
            "definition": "large in size or amount",
            "examples": [
               "The dog is big.",
               "They live in a big house.",
               "He has a big problem to solve."
            ]
         },
         {
            
            "id": 10,
            "saved": false,
            "word": "bike",
            "role": "noun",
            "BrE": "/baɪk/",
            "AmE": "/baɪk/",
            "definition": "a bicycle or motorcycle",
            "examples": [
               "I have a bike.",
               "She rides her bike every day.",
               "His bike is parked outside."
            ]
         },
         {
            
            "id": 10,
            "saved": false,
            "word": "bill",
            "role": "noun",
            "BrE": "/bɪl/",
            "AmE": "/bɪl/",
            "definition": "a document showing the amount you must pay",
            "examples": [
               "I paid the bill.",
               "The restaurant gave us the bill.",
               "The electricity bill was high."
            ]
         },
         {
            
            "id": 10,
            "saved": false,
            "word": "bird",
            "role": "noun",
            "BrE": "/bɜːd/",
            "AmE": "/bɜːrd/",
            "definition": "an animal with wings and feathers",
            "examples": [
               "I see a bird.",
               "The bird is in the tree.",
               "A small bird flew into the garden."
            ]
         },
         {
            
            "id": 10,
            "saved": false,
            "word": "birthday",
            "role": "noun",
            "BrE": "/ˈbɜːθdeɪ/",
            "AmE": "/ˈbɜːrθdeɪ/",
            "definition": "the day each year when someone was born",
            "examples": [
               "Today is my birthday.",
               "Her birthday is in June.",
               "We had a party for his birthday."
            ]
         },
         {
            
            "id": 10,
            "saved": false,
            "word": "black",
            "role": "adjective",
            "BrE": "/blæk/",
            "AmE": "/blæk/",
            "definition": "having the darkest colour, like the night",
            "examples": [
               "I have a black cat.",
               "She wears a black dress.",
               "The sky was black at night."
            ]
         },
         {
            
            "id": 10,
            "saved": false,
            "word": "black",
            "role": "noun",
            "BrE": "/blæk/",
            "AmE": "/blæk/",
            "definition": "the colour of the night",
            "examples": [
               "Black is my favourite colour.",
               "The room was painted in black.",
               "She chose black for her new car."
            ]
         },
         {
            
            "id": 10,
            "saved": false,
            "word": "blog",
            "role": "noun",
            "BrE": "/blɒɡ/",
            "AmE": "/blɑːɡ/",
            "definition": "a website with regular writing about a topic",
            "examples": [
               "I read a blog.",
               "She writes a travel blog.",
               "His blog is about healthy food."
            ]
         },
         {
            
            "id": 10,
            "saved": false,
            "word": "blonde",
            "role": "adjective",
            "BrE": "/blɒnd/",
            "AmE": "/blɑːnd/",
            "definition": "having light yellow hair",
            "examples": [
               "She has blonde hair.",
               "The girl with blonde hair smiled.",
               "Her blonde curls look beautiful."
            ]
         },
         {
            
            "id": 10,
            "saved": false,
            "word": "blue",
            "role": "adjective",
            "BrE": "/bluː/",
            "AmE": "/bluː/",
            "definition": "having the colour of the sky or sea",
            "examples": [
               "The sky is blue.",
               "He wears a blue shirt.",
               "Her blue eyes are very pretty."
            ]
         },
         {
            
            "id": 10,
            "saved": false,
            "word": "blue",
            "role": "noun",
            "BrE": "/bluː/",
            "AmE": "/bluː/",
            "definition": "the colour of the sky or sea",
            "examples": [
               "Blue is a nice colour.",
               "She painted the room blue.",
               "The car is a bright shade of blue."
            ]
         },
         
         {
            
            "id": 11,
            "saved": false,
            "word": "boat",
            "role": "noun",
            "BrE": "/bəʊt/",
            "AmE": "/boʊt/",
            "definition": "a small vehicle used for travelling on water",
            "examples": [
               "We saw a boat.",
               "They rowed a boat on the lake.",
               "The boat sailed across the river."
            ]
         },
         {
            
            "id": 11,
            "saved": false,
            "word": "body",
            "role": "noun",
            "BrE": "/ˈbɒdi/",
            "AmE": "/ˈbɑːdi/",
            "definition": "all the physical parts of a person or animal",
            "examples": [
               "My body is tired.",
               "She exercises to keep her body fit.",
               "The body needs water every day."
            ]
         },
         {
            
            "id": 11,
            "saved": false,
            "word": "book",
            "role": "noun",
            "BrE": "/bʊk/",
            "AmE": "/bʊk/",
            "definition": "a set of printed pages with a cover",
            "examples": [
               "I read a book.",
               "This book is about history.",
               "She bought a book for school."
            ]
         },
         {
            
            "id": 11,
            "saved": false,
            "word": "boot",
            "role": "noun",
            "BrE": "/buːt/",
            "AmE": "/buːt/",
            "definition": "a type of shoe that covers the foot and ankle",
            "examples": [
               "I wear boots.",
               "Her boots are black and shiny.",
               "He put on boots for the hike."
            ]
         },
         {
            
            "id": 11,
            "saved": false,
            "word": "bored",
            "role": "adjective",
            "BrE": "/bɔːd/",
            "AmE": "/bɔːrd/",
            "definition": "feeling tired and unhappy because something is not interesting",
            "examples": [
               "I am bored.",
               "She was bored in class.",
               "He felt bored without his phone."
            ]
         },
         {
            
            "id": 11,
            "saved": false,
            "word": "boring",
            "role": "adjective",
            "BrE": "/ˈbɔːrɪŋ/",
            "AmE": "/ˈbɔːrɪŋ/",
            "definition": "not interesting or exciting",
            "examples": [
               "The movie was boring.",
               "This book is so boring.",
               "The lesson felt boring to her."
            ]
         },
         {
            
            "id": 11,
            "saved": false,
            "word": "born",
            "role": "verb",
            "BrE": "/bɔːn/",
            "AmE": "/bɔːrn/",
            "definition": "to come out of a mother’s body and start to exist",
            "examples": [
               "She was born in May.",
               "He was born in a small village.",
               "The baby was born last night."
            ]
         },
         {
            
            "id": 11,
            "saved": false,
            "word": "both",
            "role": "determiner",
            "BrE": "/bəʊθ/",
            "AmE": "/boʊθ/",
            "definition": "used to refer to two people or things together",
            "examples": [
               "Both cats are cute.",
               "Both of my brothers are tall.",
               "Both teams played very well."
            ]
         },
         {
            
            "id": 11,
            "saved": false,
            "word": "both",
            "role": "pronoun",
            "BrE": "/bəʊθ/",
            "AmE": "/boʊθ/",
            "definition": "two people or things together",
            "examples": [
               "Both are here.",
               "I like both of these books.",
               "Both of them arrived on time."
            ]
         },
         {
            
            "id": 11,
            "saved": false,
            "word": "bottle",
            "role": "noun",
            "BrE": "/ˈbɒtl/",
            "AmE": "/ˈbɑːtl/",
            "definition": "a container with a narrow neck, usually for liquids",
            "examples": [
               "I drank a bottle of water.",
               "She bought a bottle of juice.",
               "The bottle of milk is in the fridge."
            ]
         },
         {
            
            "id": 12,
            "saved": false,
            "word": "box",
            "role": "noun",
            "BrE": "/bɒks/",
            "AmE": "/bɑːks/",
            "definition": "a container with a flat base and sides",
            "examples": [
               "I have a box.",
               "The shoes are in a box.",
               "She packed her books in a box."
            ]
         },
         {
            
            "id": 12,
            "saved": false,
            "word": "boy",
            "role": "noun",
            "BrE": "/bɔɪ/",
            "AmE": "/bɔɪ/",
            "definition": "a young male person",
            "examples": [
               "The boy is running.",
               "That boy plays football well.",
               "The boy helped his mother at home."
            ]
         },
         {
            
            "id": 12,
            "saved": false,
            "word": "boyfriend",
            "role": "noun",
            "BrE": "/ˈbɔɪfrend/",
            "AmE": "/ˈbɔɪfrend/",
            "definition": "a man or boy that someone is having a romantic relationship with",
            "examples": [
               "Her boyfriend is nice.",
               "She met her boyfriend at school.",
               "My boyfriend gave me a gift."
            ]
         },
         {
            
            "id": 12,
            "saved": false,
            "word": "bread",
            "role": "noun",
            "BrE": "/bred/",
            "AmE": "/bred/",
            "definition": "a food made from flour, water, and yeast",
            "examples": [
               "I eat bread.",
               "She made fresh bread today.",
               "We bought bread from the bakery."
            ]
         },
         {
            
            "id": 12,
            "saved": false,
            "word": "break",
            "role": "noun",
            "BrE": "/breɪk/",
            "AmE": "/breɪk/",
            "definition": "a short period of rest or pause",
            "examples": [
               "We have a break.",
               "The break is at ten o’clock.",
               "She took a break from studying."
            ]
         },
         {
            
            "id": 12,
            "saved": false,
            "word": "break",
            "role": "verb",
            "BrE": "/breɪk/",
            "AmE": "/breɪk/",
            "definition": "to make something split or become damaged",
            "examples": [
               "Don’t break the glass.",
               "He broke his pencil in class.",
               "The plate broke when it fell."
            ]
         },
         {
            
            "id": 12,
            "saved": false,
            "word": "breakfast",
            "role": "noun",
            "BrE": "/ˈbrekfəst/",
            "AmE": "/ˈbrekfəst/",
            "definition": "the meal you eat in the morning",
            "examples": [
               "I eat breakfast.",
               "Breakfast is cereal and milk.",
               "She had breakfast at seven."
            ]
         },
         {
            
            "id": 12,
            "saved": false,
            "word": "bring",
            "role": "verb",
            "BrE": "/brɪŋ/",
            "AmE": "/brɪŋ/",
            "definition": "to carry or take something with you",
            "examples": [
               "Bring your book.",
               "She brought her lunch to school.",
               "He brought a gift for the party."
            ]
         },
         {
            
            "id": 12,
            "saved": false,
            "word": "brother",
            "role": "noun",
            "BrE": "/ˈbrʌðə(r)/",
            "AmE": "/ˈbrʌðər/",
            "definition": "a male person with the same parents as you",
            "examples": [
               "My brother is tall.",
               "Her brother plays football.",
               "I help my brother with homework."
            ]
         },
         {
            
            "id": 12,
            "saved": false,
            "word": "brown",
            "role": "adjective",
            "BrE": "/braʊn/",
            "AmE": "/braʊn/",
            "definition": "having the colour of earth or wood",
            "examples": [
               "I have a brown dog.",
               "She wears a brown jacket.",
               "The brown leaves fell from the tree."
            ]
         },
         {
            
            "id": 13,
            "saved": false,
            "word": "brown",
            "role": "noun",
            "BrE": "/braʊn/",
            "AmE": "/braʊn/",
            "definition": "the colour of earth or wood",
            "examples": [
               "Brown is a warm colour.",
               "The walls are painted brown.",
               "She chose brown for her bag."
            ]
         },
         {
            
            "id": 13,
            "saved": false,
            "word": "build",
            "role": "verb",
            "BrE": "/bɪld/",
            "AmE": "/bɪld/",
            "definition": "to make something by putting parts together",
            "examples": [
               "They build a house.",
               "He built a small table.",
               "We are building a new school."
            ]
         },
         {
            
            "id": 13,
            "saved": false,
            "word": "building",
            "role": "noun",
            "BrE": "/ˈbɪldɪŋ/",
            "AmE": "/ˈbɪldɪŋ/",
            "definition": "a structure such as a house or school",
            "examples": [
               "The building is tall.",
               "Our school is a big building.",
               "The new building has many rooms."
            ]
         },
         {
            
            "id": 13,
            "saved": false,
            "word": "bus",
            "role": "noun",
            "BrE": "/bʌs/",
            "AmE": "/bʌs/",
            "definition": "a large vehicle that carries passengers",
            "examples": [
               "I take the bus.",
               "The bus stops at the station.",
               "She rides the bus to work."
            ]
         },
         {
            
            "id": 13,
            "saved": false,
            "word": "business",
            "role": "noun",
            "BrE": "/ˈbɪznəs/",
            "AmE": "/ˈbɪznəs/",
            "definition": "the activity of buying and selling goods or services",
            "examples": [
               "He has a business.",
               "Her business is growing fast.",
               "The shop is a family business."
            ]
         },
         {
            
            "id": 13,
            "saved": false,
            "word": "busy",
            "role": "adjective",
            "BrE": "/ˈbɪzi/",
            "AmE": "/ˈbɪzi/",
            "definition": "having a lot to do",
            "examples": [
               "I am busy today.",
               "She is busy with homework.",
               "The shop is busy on weekends."
            ]
         },
         {
            
            "id": 13,
            "saved": false,
            "word": "but",
            "role": "conjunction",
            "BrE": "/bət/",
            "AmE": "/bət/",
            "definition": "used to introduce a statement that contrasts with something",
            "examples": [
               "I tried, but failed.",
               "She’s nice but very shy.",
               "He wanted to go, but he was tired."
            ]
         },
         {
            
            "id": 13,
            "saved": false,
            "word": "butter",
            "role": "noun",
            "BrE": "/ˈbʌtə(r)/",
            "AmE": "/ˈbʌtər/",
            "definition": "a soft yellow food made from cream",
            "examples": [
               "I put butter on bread.",
               "She bought butter at the store.",
               "The recipe needs a lot of butter."
            ]
         },
         {
            
            "id": 13,
            "saved": false,
            "word": "buy",
            "role": "verb",
            "BrE": "/baɪ/",
            "AmE": "/baɪ/",
            "definition": "to get something by paying money for it",
            "examples": [
               "I buy milk.",
               "She bought a new dress.",
               "He buys books every month."
            ]
         },
         {
            
            "id": 13,
            "saved": false,
            "word": "by",
            "role": "preposition",
            "BrE": "/baɪ/",
            "AmE": "/baɪ/",
            "definition": "near or beside something; through the means of",
            "examples": [
               "The park is by the river.",
               "She travels by bus.",
               "The book was written by her."
            ]
         },
         {
            
            "id": 14,
            "saved": false,
            "word": "bye",
            "role": "exclamation",
            "BrE": "/baɪ/",
            "AmE": "/baɪ/",
            "definition": "used to say goodbye",
            "examples": [
               "Bye, see you!",
               "She said bye and left.",
               "He waved and shouted, ‘Bye!’"
            ]
         },
         {
            
            "id": 14,
            "saved": false,
            "word": "cafe",
            "role": "noun",
            "BrE": "/ˈkæfeɪ/",
            "AmE": "/kæˈfeɪ/",
            "definition": "a small restaurant where you can buy drinks and snacks",
            "examples": [
               "We met at a cafe.",
               "The cafe serves good coffee.",
               "She works in a cafe downtown."
            ]
         },
         {
            
            "id": 14,
            "saved": false,
            "word": "cake",
            "role": "noun",
            "BrE": "/keɪk/",
            "AmE": "/keɪk/",
            "definition": "a sweet food made from flour, eggs, and sugar",
            "examples": [
               "I ate a cake.",
               "She baked a chocolate cake.",
               "The cake was for her birthday."
            ]
         },
         {
            
            "id": 14,
            "saved": false,
            "word": "call",
            "role": "noun",
            "BrE": "/kɔːl/",
            "AmE": "/kɔːl/",
            "definition": "a telephone conversation",
            "examples": [
               "I got a call.",
               "She made a call to her friend.",
               "The call lasted ten minutes."
            ]
         },
         {
            
            "id": 14,
            "saved": false,
            "word": "call",
            "role": "verb",
            "BrE": "/kɔːl/",
            "AmE": "/kɔːl/",
            "definition": "to telephone someone or give something a name",
            "examples": [
               "Call me later.",
               "She called her dog Max.",
               "He called his friend yesterday."
            ]
         },
         {
            
            "id": 14,
            "saved": false,
            "word": "camera",
            "role": "noun",
            "BrE": "/ˈkæmərə/",
            "AmE": "/ˈkæmərə/",
            "definition": "a piece of equipment for taking photographs or filming",
            "examples": [
               "I have a camera.",
               "She took a photo with her camera.",
               "The camera is new and expensive."
            ]
         },
         {
            
            "id": 14,
            "saved": false,
            "word": "can",
            "role": "modal verb",
            "BrE": "/kæn/",
            "AmE": "/kæn/",
            "definition": "to be able to do something",
            "examples": [
               "I can swim.",
               "She can speak English well.",
               "Can you come to the party?"
            ]
         },
         {
            
            "id": 14,
            "saved": false,
            "word": "cannot",
            "role": "modal verb",
            "BrE": "/ˈkænɒt/",
            "AmE": "/ˈkænɑːt/",
            "definition": "the negative form of can, meaning not able to",
            "examples": [
               "I cannot run fast.",
               "She cannot come today.",
               "He cannot solve this problem."
            ]
         },
         {
            
            "id": 14,
            "saved": false,
            "word": "capital",
            "role": "adjective",
            "BrE": "/ˈkæpɪtl/",
            "AmE": "/ˈkæpɪtl/",
            "definition": "relating to the most important city of a country",
            "examples": [
               "The capital city is big.",
               "We visited the capital museum.",
               "The capital region has many jobs."
            ]
         },
         {
            
            "id": 14,
            "saved": false,
            "word": "capital",
            "role": "noun",
            "BrE": "/ˈkæpɪtl/",
            "AmE": "/ˈkæpɪtl/",
            "definition": "the most important city in a country",
            "examples": [
               "Paris is a capital.",
               "The capital of France is Paris.",
               "We flew to the capital last week."
            ]
         },
         {
            
            "id": 15,
            "saved": false,
            "word": "car",
            "role": "noun",
            "BrE": "/kɑː(r)/",
            "AmE": "/kɑːr/",
            "definition": "a vehicle with four wheels for travelling on roads",
            "examples": [
               "I have a car.",
               "She drives a red car.",
               "The car is parked outside."
            ]
         },
         {
            
            "id": 15,
            "saved": false,
            "word": "card",
            "role": "noun",
            "BrE": "/kɑːd/",
            "AmE": "/kɑːrd/",
            "definition": "a piece of paper or plastic used for payment or identification",
            "examples": [
               "I use a card.",
               "She paid with a credit card.",
               "He lost his library card."
            ]
         },
         {
            
            "id": 15,
            "saved": false,
            "word": "career",
            "role": "noun",
            "BrE": "/kəˈrɪə(r)/",
            "AmE": "/kəˈrɪr/",
            "definition": "a job or profession that someone does for a long time",
            "examples": [
               "She has a good career.",
               "His career is in teaching.",
               "She wants a career in music."
            ]
         },
         {
            
            "id": 15,
            "saved": false,
            "word": "carrot",
            "role": "noun",
            "BrE": "/ˈkærət/",
            "AmE": "/ˈkærət/",
            "definition": "a long orange vegetable",
            "examples": [
               "I ate a carrot.",
               "She cooked carrots for dinner.",
               "The carrot soup was delicious."
            ]
         },
         {
            
            "id": 15,
            "saved": false,
            "word": "carry",
            "role": "verb",
            "BrE": "/ˈkæri/",
            "AmE": "/ˈkæri/",
            "definition": "to hold something and take it somewhere",
            "examples": [
               "I carry a bag.",
               "He carried the box upstairs.",
               "She carries her phone everywhere."
            ]
         },
         {
            
            "id": 15,
            "saved": false,
            "word": "cat",
            "role": "noun",
            "BrE": "/kæt/",
            "AmE": "/kæt/",
            "definition": "a small animal with fur, often kept as a pet",
            "examples": [
               "My cat is black.",
               "The cat sleeps on the sofa.",
               "Her cat likes to chase birds."
            ]
         },
         {
            
            "id": 15,
            "saved": false,
            "word": "CD",
            "role": "noun",
            "BrE": "/ˌsiː ˈdiː/",
            "AmE": "/ˌsiː ˈdiː/",
            "definition": "a small disc used to store music or data",
            "examples": [
               "I bought a CD.",
               "She plays her music CD.",
               "The CD has all her favorite songs."
            ]
         },
         {
            
            "id": 15,
            "saved": false,
            "word": "cent",
            "role": "noun",
            "BrE": "/sent/",
            "AmE": "/sent/",
            "definition": "a small unit of money in some countries",
            "examples": [
               "It costs one cent.",
               "I found a cent on the ground.",
               "The candy is fifty cents."
            ]
         },
         {
            
            "id": 15,
            "saved": false,
            "word": "centre",
            "role": "noun",
            "BrE": "/ˈsentə(r)/",
            "AmE": "/ˈsentər/",
            "definition": "the middle point or part of something",
            "examples": [
               "The city centre is busy.",
               "We met in the town centre.",
               "The centre of the park has a fountain."
            ]
         },
         {
            
            "id": 15,
            "saved": false,
            "word": "century",
            "role": "noun",
            "BrE": "/ˈsentʃəri/",
            "AmE": "/ˈsentʃəri/",
            "definition": "a period of 100 years",
            "examples": [
               "This is the 21st century.",
               "The building is from the 19th century.",
               "A century ago, life was different."
            ]
         },
         {
            
            "id": 16,
            "saved": false,
            "word": "chair",
            "role": "noun",
            "BrE": "/tʃeə(r)/",
            "AmE": "/tʃer/",
            "definition": "a piece of furniture for one person to sit on",
            "examples": [
               "I sit on a chair.",
               "The chair is by the table.",
               "She bought a new chair for her room."
            ]
         },
         {
            
            "id": 16,
            "saved": false,
            "word": "change",
            "role": "noun",
            "BrE": "/tʃeɪndʒ/",
            "AmE": "/tʃeɪndʒ/",
            "definition": "the act of becoming different",
            "examples": [
               "I need change for the bus.",
               "The change in weather was sudden.",
               "She made a change to her plan."
            ]
         },
         {
            
            "id": 16,
            "saved": false,
            "word": "change",
            "role": "verb",
            "BrE": "/tʃeɪndʒ/",
            "AmE": "/tʃeɪndʒ/",
            "definition": "to make or become different",
            "examples": [
               "I change my clothes.",
               "She changed her hairstyle.",
               "He wants to change his job."
            ]
         },
         {
            
            "id": 16,
            "saved": false,
            "word": "chart",
            "role": "noun",
            "BrE": "/tʃɑːt/",
            "AmE": "/tʃɑːrt/",
            "definition": "a picture or diagram showing information",
            "examples": [
               "Look at the chart.",
               "The chart shows our progress.",
               "She made a chart for the project."
            ]
         },
         {
            
            "id": 16,
            "saved": false,
            "word": "cheap",
            "role": "adjective",
            "BrE": "/tʃiːp/",
            "AmE": "/tʃiːp/",
            "definition": "not expensive; low in price",
            "examples": [
               "This shirt is cheap.",
               "She bought a cheap phone.",
               "The shop sells cheap clothes."
            ]
         },
         {
            
            "id": 16,
            "saved": false,
            "word": "check",
            "role": "verb",
            "BrE": "/tʃek/",
            "AmE": "/tʃek/",
            "definition": "to look at something to make sure it is correct",
            "examples": [
               "Check your bag.",
               "He checked his homework.",
               "She checked the time on her phone."
            ]
         },
         {
            
            "id": 16,
            "saved": false,
            "word": "cheese",
            "role": "noun",
            "BrE": "/tʃiːz/",
            "AmE": "/tʃiːz/",
            "definition": "a food made from milk",
            "examples": [
               "I like cheese.",
               "She put cheese on the pizza.",
               "The shop sells many types of cheese."
            ]
         },
         {
            
            "id": 16,
            "saved": false,
            "word": "chicken",
            "role": "noun",
            "BrE": "/ˈtʃɪkɪn/",
            "AmE": "/ˈtʃɪkɪn/",
            "definition": "a bird kept for its eggs and meat",
            "examples": [
               "We ate chicken.",
               "She cooked chicken for dinner.",
               "The farm has many chickens."
            ]
         },
         {
            
            "id": 16,
            "saved": false,
            "word": "child",
            "role": "noun",
            "BrE": "/tʃaɪld/",
            "AmE": "/tʃaɪld/",
            "definition": "a young person who is not yet an adult",
            "examples": [
               "The child is playing.",
               "She has one child.",
               "The child drew a picture."
            ]
         },
         {
            
            "id": 16,
            "saved": false,
            "word": "chocolate",
            "role": "noun",
            "BrE": "/ˈtʃɒklət/",
            "AmE": "/ˈtʃɑːklət/",
            "definition": "a sweet brown food or drink made from cocoa",
            "examples": [
               "I love chocolate.",
               "She bought a chocolate bar.",
               "The cake is made of chocolate."
            ]
         },
         {
            
            "id": 17,
            "saved": false,
            "word": "choose",
            "role": "verb",
            "BrE": "/tʃuːz/",
            "AmE": "/tʃuːz/",
            "definition": "to decide which thing or person you want",
            "examples": [
               "I choose a book.",
               "She chose a blue dress.",
               "He chose to stay at home."
            ]
         },
         {
            
            "id": 17,
            "saved": false,
            "word": "cinema",
            "role": "noun",
            "BrE": "/ˈsɪnəmə/",
            "AmE": "/ˈsɪnəmə/",
            "definition": "a place where people watch films",
            "examples": [
               "We went to the cinema.",
               "The cinema is near the park.",
               "She loves watching movies at the cinema."
            ]
         },
         {
            
            "id": 17,
            "saved": false,
            "word": "city",
            "role": "noun",
            "BrE": "/ˈsɪti/",
            "AmE": "/ˈsɪti/",
            "definition": "a large and important town",
            "examples": [
               "I live in a city.",
               "The city is very busy.",
               "She visited a big city."
            ]
         },
         {
            
            "id": 17,
            "saved": false,
            "word": "class",
            "role": "noun",
            "BrE": "/klɑːs/",
            "AmE": "/klæs/",
            "definition": "a group of students who learn together",
            "examples": [
               "I have a class today.",
               "The class is learning English.",
               "Our class has twenty students."
            ]
         },
         {
            
            "id": 17,
            "saved": false,
            "word": "classroom",
            "role": "noun",
            "BrE": "/ˈklɑːsruːm/",
            "AmE": "/ˈklæsruːm/",
            "definition": "a room where students learn",
            "examples": [
               "The classroom is big.",
               "We study in the classroom.",
               "The classroom has new desks."
            ]
         },
         {
            
            "id": 17,
            "saved": false,
            "word": "clean",
            "role": "adjective",
            "BrE": "/kliːn/",
            "AmE": "/kliːn/",
            "definition": "not dirty",
            "examples": [
               "The room is clean.",
               "Her clothes are always clean.",
               "The kitchen was clean after work."
            ]
         },
         {
            
            "id": 17,
            "saved": false,
            "word": "clean",
            "role": "verb",
            "BrE": "/kliːn/",
            "AmE": "/kliːn/",
            "definition": "to make something not dirty",
            "examples": [
               "I clean the house.",
               "She cleaned the windows.",
               "He cleans his room every week."
            ]
         },
         {
            
            "id": 17,
            "saved": false,
            "word": "climb",
            "role": "verb",
            "BrE": "/klaɪm/",
            "AmE": "/klaɪm/",
            "definition": "to go up something, like a hill or tree",
            "examples": [
               "I climb the tree.",
               "He climbed the mountain.",
               "She loves to climb steep hills."
            ]
         },
         {
            
            "id": 17,
            "saved": false,
            "word": "clock",
            "role": "noun",
            "BrE": "/klɒk/",
            "AmE": "/klɑːk/",
            "definition": "a device that shows the time",
            "examples": [
               "The clock is ticking.",
               "I looked at the clock.",
               "The clock on the wall is old."
            ]
         },
         {
            
            "id": 17,
            "saved": false,
            "word": "close",
            "role": "verb",
            "BrE": "/kləʊz/",
            "AmE": "/kloʊz/",
            "definition": "to shut something",
            "examples": [
               "Close the door.",
               "She closed her book.",
               "He closed the shop early."
            ]
         },
         {
            
            "id": 18,
            "saved": false,
            "word": "clothes",
            "role": "noun",
            "BrE": "/kləʊðz/",
            "AmE": "/kloʊðz/",
            "definition": "things you wear, like shirts and trousers",
            "examples": [
               "I wear clothes.",
               "Her clothes are new.",
               "He washed his clothes yesterday."
            ]
         },
         {
            
            "id": 18,
            "saved": false,
            "word": "club",
            "role": "noun",
            "BrE": "/klʌb/",
            "AmE": "/klʌb/",
            "definition": "a group of people who meet for an activity",
            "examples": [
               "I joined a club.",
               "The club meets every week.",
               "She is in the school chess club."
            ]
         },
         {
            
            "id": 18,
            "saved": false,
            "word": "coat",
            "role": "noun",
            "BrE": "/kəʊt/",
            "AmE": "/koʊt/",
            "definition": "a piece of clothing worn over other clothes",
            "examples": [
               "I wear a coat.",
               "Her coat is warm and red.",
               "He forgot his coat at home."
            ]
         },
         {
            
            "id": 18,
            "saved": false,
            "word": "coffee",
            "role": "noun",
            "BrE": "/ˈkɒfi/",
            "AmE": "/ˈkɔːfi/",
            "definition": "a hot drink made from roasted beans",
            "examples": [
               "I drink coffee.",
               "She likes black coffee.",
               "We had coffee after lunch."
            ]
         },
         {
            
            "id": 18,
            "saved": false,
            "word": "cold",
            "role": "adjective",
            "BrE": "/kəʊld/",
            "AmE": "/koʊld/",
            "definition": "having a low temperature",
            "examples": [
               "The water is cold.",
               "It’s cold outside today.",
               "She felt cold in the morning."
            ]
         },
         {
            
            "id": 18,
            "saved": false,
            "word": "cold",
            "role": "noun",
            "BrE": "/kəʊld/",
            "AmE": "/koʊld/",
            "definition": "an illness with a blocked nose and sore throat",
            "examples": [
               "I have a cold.",
               "Her cold lasted a week.",
               "He caught a cold from the rain."
            ]
         },
         {
            
            "id": 18,
            "saved": false,
            "word": "college",
            "role": "noun",
            "BrE": "/ˈkɒlɪdʒ/",
            "AmE": "/ˈkɑːlɪdʒ/",
            "definition": "a place where people study after high school",
            "examples": [
               "I go to college.",
               "She studies at a big college.",
               "The college offers many courses."
            ]
         },
         {
            
            "id": 18,
            "saved": false,
            "word": "colour",
            "role": "noun",
            "BrE": "/ˈkʌlə(r)/",
            "AmE": "/ˈkʌlər/",
            "definition": "something like red, blue, or yellow",
            "examples": [
               "My favourite colour is blue.",
               "She painted the wall a bright colour.",
               "The dress comes in many colours."
            ]
         },
         {
            
            "id": 18,
            "saved": false,
            "word": "come",
            "role": "verb",
            "BrE": "/kʌm/",
            "AmE": "/kʌm/",
            "definition": "to move or travel towards a place",
            "examples": [
               "Come here, please.",
               "She comes to school by bus.",
               "He came to the party late."
            ]
         },
         {
            
            "id": 18,
            "saved": false,
            "word": "common",
            "role": "adjective",
            "BrE": "/ˈkɒmən/",
            "AmE": "/ˈkɑːmən/",
            "definition": "happening or found often",
            "examples": [
               "This is a common name.",
               "Colds are common in winter.",
               "It’s common to eat rice here."
            ]
         },
         {
            
            "id": 19,
            "saved": false,
            "word": "company",
            "role": "noun",
            "BrE": "/ˈkʌmpəni/",
            "AmE": "/ˈkʌmpəni/",
            "definition": "a business that sells goods or services",
            "examples": [
               "She works for a company.",
               "The company makes cars.",
               "He started a new company."
            ]
         },
         {
            
            "id": 19,
            "saved": false,
            "word": "compare",
            "role": "verb",
            "BrE": "/kəmˈpeə(r)/",
            "AmE": "/kəmˈper/",
            "definition": "to look at things to see how they are different or similar",
            "examples": [
               "Compare the two books.",
               "She compared prices at the shop.",
               "He compared his work to hers."
            ]
         },
         {
            
            "id": 19,
            "saved": false,
            "word": "complete",
            "role": "adjective",
            "BrE": "/kəmˈpliːt/",
            "AmE": "/kəmˈpliːt/",
            "definition": "having all parts; finished",
            "examples": [
               "The set is complete.",
               "Her homework is complete.",
               "The project is now complete."
            ]
         },
         {
            
            "id": 19,
            "saved": false,
            "word": "complete",
            "role": "verb",
            "BrE": "/kəmˈpliːt/",
            "AmE": "/kəmˈpliːt/",
            "definition": "to finish something",
            "examples": [
               "I complete my work.",
               "She completed the puzzle.",
               "He completed the course early."
            ]
         },
         {
            
            "id": 19,
            "saved": false,
            "word": "computer",
            "role": "noun",
            "BrE": "/kəmˈpjuːtə(r)/",
            "AmE": "/kəmˈpjuːtər/",
            "definition": "an electronic machine for storing and organizing information",
            "examples": [
               "I use a computer.",
               "The computer is on the desk.",
               "She bought a new computer."
            ]
         },
         {
            
            "id": 19,
            "saved": false,
            "word": "concert",
            "role": "noun",
            "BrE": "/ˈkɒnsət/",
            "AmE": "/ˈkɑːnsərt/",
            "definition": "a performance of music",
            "examples": [
               "We went to a concert.",
               "The concert was amazing.",
               "She sings at the concert tonight."
            ]
         },
         {
            
            "id": 19,
            "saved": false,
            "word": "conversation",
            "role": "noun",
            "BrE": "/ˌkɒnvəˈseɪʃn/",
            "AmE": "/ˌkɑːnvərˈseɪʃn/",
            "definition": "talking between people",
            "examples": [
               "We had a conversation.",
               "The conversation was about school.",
               "He enjoyed their long conversation."
            ]
         },
         {
            
            "id": 19,
            "saved": false,
            "word": "cook",
            "role": "verb",
            "BrE": "/kʊk/",
            "AmE": "/kʊk/",
            "definition": "to prepare food by heating it",
            "examples": [
               "I cook dinner.",
               "She cooked pasta for us.",
               "He is cooking a big meal."
            ]
         },
         {
            
            "id": 19,
            "saved": false,
            "word": "cooking",
            "role": "noun",
            "BrE": "/ˈkʊkɪŋ/",
            "AmE": "/ˈkʊkɪŋ/",
            "definition": "the activity of preparing food",
            "examples": [
               "Cooking is fun.",
               "She loves cooking Italian food.",
               "His cooking is always delicious."
            ]
         },
         {
            
            "id": 19,
            "saved": false,
            "word": "cool",
            "role": "adjective",
            "BrE": "/kuːl/",
            "AmE": "/kuːl/",
            "definition": "slightly cold; fashionable or attractive",
            "examples": [
               "The water is cool.",
               "His new shoes are cool.",
               "The weather is cool today."
            ]
         },
         {
            
            "id": 20,
            "saved": false,
            "word": "correct",
            "role": "adjective",
            "BrE": "/kəˈrekt/",
            "AmE": "/kəˈrekt/",
            "definition": "right; without mistakes",
            "examples": [
               "Your answer is correct.",
               "She gave the correct time.",
               "His spelling is always correct."
            ]
         },
         {
            
            "id": 20,
            "saved": false,
            "word": "correct",
            "role": "verb",
            "BrE": "/kəˈrekt/",
            "AmE": "/kəˈrekt/",
            "definition": "to make something right",
            "examples": [
               "I correct my work.",
               "She corrected her mistake.",
               "He corrected the student’s test."
            ]
         },
         {
            
            "id": 20,
            "saved": false,
            "word": "cost",
            "role": "noun",
            "BrE": "/kɒst/",
            "AmE": "/kɑːst/",
            "definition": "the amount of money you need to buy something",
            "examples": [
               "The cost is low.",
               "The cost of the book is ten dollars.",
               "The cost of living is high."
            ]
         },
         {
            
            "id": 20,
            "saved": false,
            "word": "cost",
            "role": "verb",
            "BrE": "/kɒst/",
            "AmE": "/kɑːst/",
            "definition": "to have a price",
            "examples": [
               "This costs five dollars.",
               "The ticket costs too much.",
               "Her new phone cost a lot."
            ]
         },
         {
            
            "id": 20,
            "saved": false,
            "word": "could",
            "role": "modal verb",
            "BrE": "/kəd/",
            "AmE": "/kəd/",
            "definition": "used to show possibility or past ability",
            "examples": [
               "I could run fast.",
               "She could come to the party.",
               "Could you help me with this?"
            ]
         },
         {
            
            "id": 20,
            "saved": false,
            "word": "country",
            "role": "noun",
            "BrE": "/ˈkʌntri/",
            "AmE": "/ˈkʌntri/",
            "definition": "an area of land with its own government",
            "examples": [
               "I love my country.",
               "She visited a new country.",
               "This country has many mountains."
            ]
         },
         {
            
            "id": 20,
            "saved": false,
            "word": "course",
            "role": "noun",
            "BrE": "/kɔːs/",
            "AmE": "/kɔːrs/",
            "definition": "a series of lessons on a subject",
            "examples": [
               "I take a course.",
               "She joined an English course.",
               "The course lasts three months."
            ]
         },
         {
            
            "id": 20,
            "saved": false,
            "word": "cousin",
            "role": "noun",
            "BrE": "/ˈkʌzn/",
            "AmE": "/ˈkʌzn/",
            "definition": "a child of your aunt or uncle",
            "examples": [
               "My cousin is funny.",
               "She visited her cousin.",
               "His cousin lives in another city."
            ]
         },
         {
            
            "id": 20,
            "saved": false,
            "word": "cow",
            "role": "noun",
            "BrE": "/kaʊ/",
            "AmE": "/kaʊ/",
            "definition": "a large animal kept for milk or meat",
            "examples": [
               "The cow is in the field.",
               "Farmers have many cows.",
               "The cow gives milk every day."
            ]
         },
         {
            
            "id": 20,
            "saved": false,
            "word": "cream",
            "role": "noun",
            "BrE": "/kriːm/",
            "AmE": "/kriːm/",
            "definition": "a thick liquid made from milk",
            "examples": [
               "I like cream in coffee.",
               "She used cream for the cake.",
               "The dessert has whipped cream."
            ]
         }, 
         
         {
            
            "id": 21,
            "saved": false,
            "word": "create",
            "role": "verb",
            "BrE": "/kriˈeɪt/",
            "AmE": "/kriˈeɪt/",
            "definition": "to make something new",
            "examples": [
               "I create a picture.",
               "She created a new game.",
               "He created a website for his class."
            ]
         },
         {
            
            "id": 21,
            "saved": false,
            "word": "culture",
            "role": "noun",
            "BrE": "/ˈkʌltʃə(r)/",
            "AmE": "/ˈkʌltʃər/",
            "definition": "the customs and beliefs of a group of people",
            "examples": [
               "I like her culture.",
               "We learned about Japanese culture.",
               "The festival celebrates local culture."
            ]
         },
         {
            
            "id": 21,
            "saved": false,
            "word": "cup",
            "role": "noun",
            "BrE": "/kʌp/",
            "AmE": "/kʌp/",
            "definition": "a small container for drinking tea, coffee, etc.",
            "examples": [
               "I drink from a cup.",
               "She bought a new cup.",
               "The cup is full of tea."
            ]
         },
         {
            
            "id": 21,
            "saved": false,
            "word": "customer",
            "role": "noun",
            "BrE": "/ˈkʌstəmə(r)/",
            "AmE": "/ˈkʌstəmər/",
            "definition": "a person who buys goods or services",
            "examples": [
               "The customer is happy.",
               "He helped a customer in the shop.",
               "The customer ordered food online."
            ]
         },
         {
            
            "id": 21,
            "saved": false,
            "word": "cut",
            "role": "verb",
            "BrE": "/kʌt/",
            "AmE": "/kʌt/",
            "definition": "to use a knife to divide something",
            "examples": [
               "I cut the paper.",
               "She cut the cake into pieces.",
               "He cut his finger by accident."
            ]
         },
         {
            
            "id": 21,
            "saved": false,
            "word": "dad",
            "role": "noun",
            "BrE": "/dæd/",
            "AmE": "/dæd/",
            "definition": "a father",
            "examples": [
               "My dad is at home.",
               "Her dad drives a car.",
               "Dad helped me with my homework."
            ]
         },
         {
            
            "id": 21,
            "saved": false,
            "word": "dance",
            "role": "noun",
            "BrE": "/dɑːns/",
            "AmE": "/dæns/",
            "definition": "a series of movements to music",
            "examples": [
               "I like to dance.",
               "The dance was fun to watch.",
               "She learned a new dance at school."
            ]
         },
         {
            
            "id": 21,
            "saved": false,
            "word": "dance",
            "role": "verb",
            "BrE": "/dɑːns/",
            "AmE": "/dæns/",
            "definition": "to move your body to music",
            "examples": [
               "I dance with friends.",
               "She dances very well.",
               "They danced at the party."
            ]
         },
         {
            
            "id": 21,
            "saved": false,
            "word": "dancer",
            "role": "noun",
            "BrE": "/ˈdɑːnsə(r)/",
            "AmE": "/ˈdænsər/",
            "definition": "a person who dances",
            "examples": [
               "She is a dancer.",
               "The dancer was amazing.",
               "He became a professional dancer."
            ]
         },
         {
            
            "id": 21,
            "saved": false,
            "word": "dancing",
            "role": "noun",
            "BrE": "/ˈdɑːnsɪŋ/",
            "AmE": "/ˈdænsɪŋ/",
            "definition": "the activity of moving to music",
            "examples": [
               "Dancing is fun.",
               "She loves dancing to music.",
               "Dancing helps her stay active."
            ]
         },
         {
            
            "id": 22,
            "saved": false,
            "word": "dangerous",
            "role": "adjective",
            "BrE": "/ˈdeɪndʒərəs/",
            "AmE": "/ˈdeɪndʒərəs/",
            "definition": "able to cause harm",
            "examples": [
               "The road is dangerous.",
               "That dog can be dangerous.",
               "It’s dangerous to swim here."
            ]
         },
         {
            
            "id": 22,
            "saved": false,
            "word": "dark",
            "role": "adjective",
            "BrE": "/dɑːk/",
            "AmE": "/dɑːrk/",
            "definition": "with little or no light; closer to black",
            "examples": [
               "The room is dark.",
               "She has dark hair.",
               "The sky is dark at night."
            ]
         },
         {
            
            "id": 22,
            "saved": false,
            "word": "date",
            "role": "noun",
            "BrE": "/deɪt/",
            "AmE": "/deɪt/",
            "definition": "a particular day or time",
            "examples": [
               "What’s the date today?",
               "The date of the party is Friday.",
               "Her birth date is in July."
            ]
         },
         {
            
            "id": 22,
            "saved": false,
            "word": "daughter",
            "role": "noun",
            "BrE": "/ˈdɔːtə(r)/",
            "AmE": "/ˈdɔːtər/",
            "definition": "a female child",
            "examples": [
               "My daughter is six.",
               "Her daughter plays football.",
               "The daughter helped her mother."
            ]
         },
         {
            
            "id": 22,
            "saved": false,
            "word": "day",
            "role": "noun",
            "BrE": "/deɪ/",
            "AmE": "/deɪ/",
            "definition": "a period of 24 hours",
            "examples": [
               "Today is a sunny day.",
               "We meet every day.",
               "She works five days a week."
            ]
         },
         {
            
            "id": 22,
            "saved": false,
            "word": "dear",
            "role": "adjective",
            "BrE": "/dɪə(r)/",
            "AmE": "/dɪr/",
            "definition": "loved or valued very much",
            "examples": [
               "She is my dear friend.",
               "This book is very dear to me.",
               "Her dear dog is always with her."
            ]
         },
         {
            
            "id": 22,
            "saved": false,
            "word": "December",
            "role": "noun",
            "BrE": "/dɪˈsembə(r)/",
            "AmE": "/dɪˈsembər/",
            "definition": "the twelfth month of the year",
            "examples": [
               "December is cold.",
               "We have a holiday in December.",
               "Her birthday is on December 25th."
            ]
         },
         {
            
            "id": 22,
            "saved": false,
            "word": "decide",
            "role": "verb",
            "BrE": "/dɪˈsaɪd/",
            "AmE": "/dɪˈsaɪd/",
            "definition": "to choose something after thinking",
            "examples": [
               "I decide to stay.",
               "She decided to buy a car.",
               "He decided where to go on holiday."
            ]
         },
         {
            
            "id": 22,
            "saved": false,
            "word": "delicious",
            "role": "adjective",
            "BrE": "/dɪˈlɪʃəs/",
            "AmE": "/dɪˈlɪʃəs/",
            "definition": "tasting or smelling very good",
            "examples": [
               "The cake is delicious.",
               "She cooked a delicious meal.",
               "This fruit is absolutely delicious."
            ]
         },
         {
            
            "id": 22,
            "saved": false,
            "word": "describe",
            "role": "verb",
            "BrE": "/dɪˈskraɪb/",
            "AmE": "/dɪˈskraɪb/",
            "definition": "to say what something or someone is like",
            "examples": [
               "Describe your house.",
               "She described her holiday.",
               "He described the painting in detail."
            ]
         },
         {
            
            "id": 23,
            "saved": false,
            "word": "description",
            "role": "noun",
            "BrE": "/dɪˈskrɪpʃn/",
            "AmE": "/dɪˈskrɪpʃn/",
            "definition": "words that tell what something is like",
            "examples": [
               "Give a description.",
               "Her description of the place was clear.",
               "The book has a good description."
            ]
         },
         {
            
            "id": 23,
            "saved": false,
            "word": "design",
            "role": "noun",
            "BrE": "/dɪˈzaɪn/",
            "AmE": "/dɪˈzaɪn/",
            "definition": "a plan or drawing of something",
            "examples": [
               "I like the design.",
               "The dress has a nice design.",
               "He made a design for the house."
            ]
         },
         {
            
            "id": 23,
            "saved": false,
            "word": "design",
            "role": "verb",
            "BrE": "/dɪˈzaɪn/",
            "AmE": "/dɪˈzaɪn/",
            "definition": "to plan or create something",
            "examples": [
               "She designs clothes.",
               "He designed a new chair.",
               "They design apps for phones."
            ]
         },
         {
            
            "id": 23,
            "saved": false,
            "word": "desk",
            "role": "noun",
            "BrE": "/desk/",
            "AmE": "/desk/",
            "definition": "a table for writing or working",
            "examples": [
               "I sit at a desk.",
               "Her desk is in the classroom.",
               "The desk has books and pens."
            ]
         },
         {
            
            "id": 23,
            "saved": false,
            "word": "detail",
            "role": "noun",
            "BrE": "/ˈdiːteɪl/",
            "AmE": "/ˈdiːteɪl/",
            "definition": "a small piece of information",
            "examples": [
               "Give me one detail.",
               "She wrote every detail.",
               "The detail in the story was clear."
            ]
         },
         {
            
            "id": 23,
            "saved": false,
            "word": "dialogue",
            "role": "noun",
            "BrE": "/ˈdaɪəlɒɡ/",
            "AmE": "/ˈdaɪəlɑːɡ/",
            "definition": "a conversation in a book, play, or film",
            "examples": [
               "The dialogue was funny.",
               "The film has great dialogue.",
               "She wrote dialogue for the play."
            ]
         },
         {
            
            "id": 23,
            "saved": false,
            "word": "dictionary",
            "role": "noun",
            "BrE": "/ˈdɪkʃənri/",
            "AmE": "/ˈdɪkʃəneri/",
            "definition": "a book that explains the meanings of words",
            "examples": [
               "I use a dictionary.",
               "She checked the word in a dictionary.",
               "The dictionary is on the desk."
            ]
         },
         {
            
            "id": 23,
            "saved": false,
            "word": "die",
            "role": "verb",
            "BrE": "/daɪ/",
            "AmE": "/daɪ/",
            "definition": "to stop living",
            "examples": [
               "The plant may die.",
               "Her fish died last week.",
               "Some trees die in winter."
            ]
         },
         {
            
            "id": 23,
            "saved": false,
            "word": "diet",
            "role": "noun",
            "BrE": "/ˈdaɪət/",
            "AmE": "/ˈdaɪət/",
            "definition": "the food you eat regularly",
            "examples": [
               "My diet is healthy.",
               "She is on a vegetable diet.",
               "His diet includes fruit every day."
            ]
         },
         {
            
            "id": 23,
            "saved": false,
            "word": "difference",
            "role": "noun",
            "BrE": "/ˈdɪfrəns/",
            "AmE": "/ˈdɪfrəns/",
            "definition": "the way in which things are not the same",
            "examples": [
               "There is a difference.",
               "The difference between them is clear.",
               "She noticed a difference in price."
            ]
         },
         {
            
            "id": 24,
            "saved": false,
            "word": "different",
            "role": "adjective",
            "BrE": "/ˈdɪfrənt/",
            "AmE": "/ˈdɪfrənt/",
            "definition": "not the same",
            "examples": [
               "This book is different.",
               "Her dress is different from mine.",
               "They have different ideas."
            ]
         },
         {
            
            "id": 24,
            "saved": false,
            "word": "difficult",
            "role": "adjective",
            "BrE": "/ˈdɪfɪkəlt/",
            "AmE": "/ˈdɪfɪkəlt/",
            "definition": "not easy to do or understand",
            "examples": [
               "The test is difficult.",
               "Math is difficult for her.",
               "It’s difficult to learn a language."
            ]
         },
         {
            
            "id": 24,
            "saved": false,
            "word": "dinner",
            "role": "noun",
            "BrE": "/ˈdɪnə(r)/",
            "AmE": "/ˈdɪnər/",
            "definition": "the main meal of the day, usually in the evening",
            "examples": [
               "I eat dinner.",
               "Dinner is at seven o’clock.",
               "She cooked dinner for her family."
            ]
         },
         {
            
            "id": 24,
            "saved": false,
            "word": "dirty",
            "role": "adjective",
            "BrE": "/ˈdɜːti/",
            "AmE": "/ˈdɜːrti/",
            "definition": "not clean",
            "examples": [
               "My shoes are dirty.",
               "The room was very dirty.",
               "His clothes got dirty playing."
            ]
         },
         {
            
            "id": 24,
            "saved": false,
            "word": "discuss",
            "role": "verb",
            "BrE": "/dɪˈskʌs/",
            "AmE": "/dɪˈskʌs/",
            "definition": "to talk about something with others",
            "examples": [
               "We discuss the plan.",
               "She discussed the book with friends.",
               "They discussed their holiday ideas."
            ]
         },
         {
            
            "id": 24,
            "saved": false,
            "word": "dish",
            "role": "noun",
            "BrE": "/dɪʃ/",
            "AmE": "/dɪʃ/",
            "definition": "a plate or bowl for food",
            "examples": [
               "I washed a dish.",
               "The dish is full of food.",
               "She served soup in a big dish."
            ]
         },
         {
            
            "id": 24,
            "saved": false,
            "word": "do",
            "role": "verb",
            "BrE": "/duː/",
            "AmE": "/duː/",
            "definition": "to perform an action or activity",
            "examples": [
               "I do my homework.",
               "She does yoga every day.",
               "He did the dishes after dinner."
            ]
         },
         {
            
            "id": 24,
            "saved": false,
            "word": "do",
            "role": "auxiliary verb",
            "BrE": "/duː/",
            "AmE": "/duː/",
            "definition": "used to form questions and negatives",
            "examples": [
               "Do you like tea?",
               "She doesn’t want to go.",
               "Do they play football?"
            ]
         },
         {
            
            "id": 24,
            "saved": false,
            "word": "doctor",
            "role": "noun",
            "BrE": "/ˈdɒktə(r)/",
            "AmE": "/ˈdɑːktər/",
            "definition": "a person who helps sick people",
            "examples": [
               "I saw a doctor.",
               "The doctor is very kind.",
               "She visited the doctor yesterday."
            ]
         },
         {
            
            "id": 24,
            "saved": false,
            "word": "dog",
            "role": "noun",
            "BrE": "/dɒɡ/",
            "AmE": "/dɔːɡ/",
            "definition": "an animal often kept as a pet",
            "examples": [
               "My dog is big.",
               "The dog barked at night.",
               "She walks her dog every morning."
            ]
         },
         {
            
            "id": 25,
            "saved": false,
            "word": "dollar",
            "role": "noun",
            "BrE": "/ˈdɒlə(r)/",
            "AmE": "/ˈdɑːlər/",
            "definition": "a unit of money in some countries",
            "examples": [
               "It costs one dollar.",
               "She has ten dollars.",
               "The book is worth five dollars."
            ]
         },
         {
            
            "id": 25,
            "saved": false,
            "word": "door",
            "role": "noun",
            "BrE": "/dɔː(r)/",
            "AmE": "/dɔːr/",
            "definition": "a piece of wood or glass you open to enter a room",
            "examples": [
               "Open the door.",
               "The door is painted red.",
               "She knocked on the door."
            ]
         },
         {
            
            "id": 25,
            "saved": false,
            "word": "down",
            "role": "adverb",
            "BrE": "/daʊn/",
            "AmE": "/daʊn/",
            "definition": "to or at a lower place",
            "examples": [
               "Sit down, please.",
               "The cat jumped down.",
               "She walked down the stairs."
            ]
         },
         {
            
            "id": 25,
            "saved": false,
            "word": "down",
            "role": "preposition",
            "BrE": "/daʊn/",
            "AmE": "/daʊn/",
            "definition": "from a higher to a lower place",
            "examples": [
               "We go down the hill.",
               "The ball rolled down the street.",
               "She looked down from the window."
            ]
         },
         {
            
            "id": 25,
            "saved": false,
            "word": "downstairs",
            "role": "adverb",
            "BrE": "/ˌdaʊnˈsteəz/",
            "AmE": "/ˌdaʊnˈsterz/",
            "definition": "to or on a lower floor of a building",
            "examples": [
               "Go downstairs now.",
               "She ran downstairs to eat.",
               "The kitchen is downstairs."
            ]
         },
         {
            
            "id": 25,
            "saved": false,
            "word": "draw",
            "role": "verb",
            "BrE": "/drɔː/",
            "AmE": "/drɔː/",
            "definition": "to make a picture with a pencil or pen",
            "examples": [
               "I draw a house.",
               "She drew a cat on paper.",
               "He draws pictures every day."
            ]
         },
         {
            
            "id": 25,
            "saved": false,
            "word": "dress",
            "role": "noun",
            "BrE": "/dres/",
            "AmE": "/dres/",
            "definition": "a piece of clothing worn by women or girls",
            "examples": [
               "She wears a dress.",
               "The dress is blue and long.",
               "Her new dress looks beautiful."
            ]
         },
         {
            
            "id": 25,
            "saved": false,
            "word": "dress",
            "role": "verb",
            "BrE": "/dres/",
            "AmE": "/dres/",
            "definition": "to put on clothes",
            "examples": [
               "I dress quickly.",
               "She dressed for the party.",
               "He dressed in a suit for work."
            ]
         },
         {
            
            "id": 25,
            "saved": false,
            "word": "drink",
            "role": "noun",
            "BrE": "/drɪŋk/",
            "AmE": "/drɪŋk/",
            "definition": "a liquid you swallow",
            "examples": [
               "I need a drink.",
               "She bought a cold drink.",
               "The drink was sweet and tasty."
            ]
         },
         {
            
            "id": 25,
            "saved": false,
            "word": "drink",
            "role": "verb",
            "BrE": "/drɪŋk/",
            "AmE": "/drɪŋk/",
            "definition": "to take liquid into your mouth",
            "examples": [
               "I drink water.",
               "He drinks coffee every morning.",
               "She drank juice at lunch."
            ]
         },
         {
            
            "id": 26,
            "saved": false,
            "word": "drive",
            "role": "verb",
            "BrE": "/draɪv/",
            "AmE": "/draɪv/",
            "definition": "to control a vehicle like a car",
            "examples": [
               "I drive a car.",
               "She drives to school.",
               "He drove to the city yesterday."
            ]
         },
         {
            
            "id": 26,
            "saved": false,
            "word": "driver",
            "role": "noun",
            "BrE": "/ˈdraɪvə(r)/",
            "AmE": "/ˈdraɪvər/",
            "definition": "a person who drives a vehicle",
            "examples": [
               "The driver is careful.",
               "She is a good driver.",
               "The bus driver stopped at the station."
            ]
         },
         {
            
            "id": 26,
            "saved": false,
            "word": "during",
            "role": "preposition",
            "BrE": "/ˈdjʊərɪŋ/",
            "AmE": "/ˈdʊrɪŋ/",
            "definition": "throughout or at some time in a period",
            "examples": [
               "I read during lunch.",
               "She slept during the film.",
               "He worked during the summer."
            ]
         },
         {
            
            "id": 26,
            "saved": false,
            "word": "DVD",
            "role": "noun",
            "BrE": "/ˌdiː viː ˈdiː/",
            "AmE": "/ˌdiː viː ˈdiː/",
            "definition": "a disc used to store films or data",
            "examples": [
               "I watched a DVD.",
               "She bought a new DVD.",
               "The DVD has a funny movie."
            ]
         },
         {
            
            "id": 26,
            "saved": false,
            "word": "each",
            "role": "adverb",
            "BrE": "/iːtʃ/",
            "AmE": "/iːtʃ/",
            "definition": "every one of two or more things or people",
            "examples": [
               "Each student got a book.",
               "They each have a pen.",
               "Each of us chose a colour."
            ]
         },
         {
            
            "id": 26,
            "saved": false,
            "word": "each",
            "role": "determiner",
            "BrE": "/iːtʃ/",
            "AmE": "/iːtʃ/",
            "definition": "every one of two or more things or people",
            "examples": [
               "Each child is happy.",
               "Each book is different.",
               "Each student needs a pencil."
            ]
         },
         {
            
            "id": 26,
            "saved": false,
            "word": "each",
            "role": "pronoun",
            "BrE": "/iːtʃ/",
            "AmE": "/iːtʃ/",
            "definition": "every one of two or more people or things",
            "examples": [
               "Each is unique.",
               "Each of them sang a song.",
               "Each was given a gift."
            ]
         },
         {
            
            "id": 26,
            "saved": false,
            "word": "ear",
            "role": "noun",
            "BrE": "/ɪə(r)/",
            "AmE": "/ɪr/",
            "definition": "the part of the body used for hearing",
            "examples": [
               "My ear hurts.",
               "She whispered in his ear.",
               "He cleaned his ears carefully."
            ]
         },
         {
            
            "id": 26,
            "saved": false,
            "word": "early",
            "role": "adjective",
            "BrE": "/ˈɜːli/",
            "AmE": "/ˈɜːrli/",
            "definition": "near the beginning of a time period",
            "examples": [
               "I wake up early.",
               "The early bus is at six.",
               "She arrived early for the meeting."
            ]
         },
         {
            
            "id": 26,
            "saved": false,
            "word": "early",
            "role": "adverb",
            "BrE": "/ˈɜːli/",
            "AmE": "/ˈɜːrli/",
            "definition": "before the expected time",
            "examples": [
               "I came early.",
               "She finished her work early.",
               "He arrived early at school."
            ]
         },
         {
            
            "id": 27,
            "saved": false,
            "word": "east",
            "role": "adjective",
            "BrE": "/iːst/",
            "AmE": "/iːst/",
            "definition": "in or towards the direction where the sun rises",
            "examples": [
               "The east window is open.",
               "The east side is sunny.",
               "Her house faces east."
            ]
         },
         {
            
            "id": 27,
            "saved": false,
            "word": "east",
            "role": "adverb",
            "BrE": "/iːst/",
            "AmE": "/iːst/",
            "definition": "towards the direction where the sun rises",
            "examples": [
               "We traveled east.",
               "The wind blows east.",
               "She looked east to see the sunrise."
            ]
         },
         {
            
            "id": 27,
            "saved": false,
            "word": "east",
            "role": "noun",
            "BrE": "/iːst/",
            "AmE": "/iːst/",
            "definition": "the direction where the sun rises",
            "examples": [
               "The east is beautiful.",
               "The sun rises in the east.",
               "Their farm is in the east."
            ]
         },
         {
            
            "id": 27,
            "saved": false,
            "word": "easy",
            "role": "adjective",
            "BrE": "/ˈiːzi/",
            "AmE": "/ˈiːzi/",
            "definition": "not difficult",
            "examples": [
               "This game is easy.",
               "The test was very easy.",
               "Her job is easy to learn."
            ]
         },
         {
            
            "id": 27,
            "saved": false,
            "word": "eat",
            "role": "verb",
            "BrE": "/iːt/",
            "AmE": "/iːt/",
            "definition": "to put food in your mouth and swallow it",
            "examples": [
               "I eat an apple.",
               "She eats breakfast daily.",
               "He ate pizza for dinner."
            ]
         },
         {
            
            "id": 27,
            "saved": false,
            "word": "egg",
            "role": "noun",
            "BrE": "/eɡ/",
            "AmE": "/eɡ/",
            "definition": "a food with a hard shell, produced by birds",
            "examples": [
               "I ate an egg.",
               "She cooked two eggs.",
               "The recipe needs three eggs."
            ]
         },
         {
            
            "id": 27,
            "saved": false,
            "word": "eight",
            "role": "number",
            "BrE": "/eɪt/",
            "AmE": "/eɪt/",
            "definition": "the number 8",
            "examples": [
               "I have eight books.",
               "She is eight years old.",
               "Eight students are in the class."
            ]
         },
         {
            
            "id": 27,
            "saved": false,
            "word": "eighteen",
            "role": "number",
            "BrE": "/ˌeɪˈtiːn/",
            "AmE": "/ˌeɪˈtiːn/",
            "definition": "the number 18",
            "examples": [
               "He is eighteen.",
               "I bought eighteen apples.",
               "Eighteen people came to the party."
            ]
         },
         {
            
            "id": 27,
            "saved": false,
            "word": "eighty",
            "role": "number",
            "BrE": "/ˈeɪti/",
            "AmE": "/ˈeɪti/",
            "definition": "the number 80",
            "examples": [
               "She is eighty years old.",
               "The shop has eighty items.",
               "Eighty students joined the club."
            ]
         },
         {
            
            "id": 27,
            "saved": false,
            "word": "elephant",
            "role": "noun",
            "BrE": "/ˈelɪfənt/",
            "AmE": "/ˈelɪfənt/",
            "definition": "a large animal with a long trunk",
            "examples": [
               "I saw an elephant.",
               "The elephant is at the zoo.",
               "An elephant has big ears."
            ]
         },
         {
            
            "id": 28,
            "saved": false,
            "word": "eleven",
            "role": "number",
            "BrE": "/ɪˈlevn/",
            "AmE": "/ɪˈlevn/",
            "definition": "the number 11",
            "examples": [
               "I have eleven pens.",
               "She is eleven years old.",
               "Eleven players are on the team."
            ]
         },
         {
            
            "id": 28,
            "saved": false,
            "word": "else",
            "role": "adverb",
            "BrE": "/els/",
            "AmE": "/els/",
            "definition": "in addition or different",
            "examples": [
               "What else is there?",
               "I don’t want anything else.",
               "Who else was at the party?"
            ]
         },
         {
            
            "id": 28,
            "saved": false,
            "word": "email",
            "role": "noun",
            "BrE": "/ˈiːmeɪl/",
            "AmE": "/ˈiːmeɪl/",
            "definition": "a message sent using a computer",
            "examples": [
               "I sent an email.",
               "She got an email from a friend.",
               "The email was about the meeting."
            ]
         },
         {
            
            "id": 28,
            "saved": false,
            "word": "email",
            "role": "verb",
            "BrE": "/ˈiːmeɪl/",
            "AmE": "/ˈiːmeɪl/",
            "definition": "to send a message using a computer",
            "examples": [
               "I email my teacher.",
               "She emailed her homework.",
               "He emails his friends daily."
            ]
         },
         {
            
            "id": 28,
            "saved": false,
            "word": "end",
            "role": "noun",
            "BrE": "/end/",
            "AmE": "/end/",
            "definition": "the final part of something",
            "examples": [
               "The film has an end.",
               "The book’s end was sad.",
               "We reached the end of the road."
            ]
         },
         {
            
            "id": 28,
            "saved": false,
            "word": "end",
            "role": "verb",
            "BrE": "/end/",
            "AmE": "/end/",
            "definition": "to finish something",
            "examples": [
               "The class ends soon.",
               "She ended the call.",
               "The game ended with a tie."
            ]
         },
         {
            
            "id": 28,
            "saved": false,
            "word": "enjoy",
            "role": "verb",
            "BrE": "/ɪnˈdʒɔɪ/",
            "AmE": "/ɪnˈdʒɔɪ/",
            "definition": "to like doing something",
            "examples": [
               "I enjoy music.",
               "She enjoys reading books.",
               "He enjoyed the party last night."
            ]
         },
         {
            
            "id": 28,
            "saved": false,
            "word": "enough",
            "role": "adverb",
            "BrE": "/ɪˈnʌf/",
            "AmE": "/ɪˈnʌf/",
            "definition": "as much or as many as needed",
            "examples": [
               "I ate enough.",
               "She studied enough for the test.",
               "We have enough chairs for everyone."
            ]
         },
         {
            
            "id": 28,
            "saved": false,
            "word": "enough",
            "role": "determiner",
            "BrE": "/ɪˈnʌf/",
            "AmE": "/ɪˈnʌf/",
            "definition": "as much or as many as needed",
            "examples": [
               "I have enough food.",
               "She has enough money.",
               "Enough people came to the party."
            ]
         },
         {
            
            "id": 28,
            "saved": false,
            "word": "enough",
            "role": "pronoun",
            "BrE": "/ɪˈnʌf/",
            "AmE": "/ɪˈnʌf/",
            "definition": "as much or as many as needed",
            "examples": [
               "Enough is here.",
               "I bought enough for everyone.",
               "Is there enough for the class?"
            ]
         },
         {
            
            "id": 29,
            "saved": false,
            "word": "euro",
            "role": "noun",
            "BrE": "/ˈjʊərəʊ/",
            "AmE": "/ˈjʊroʊ/",
            "definition": "the unit of money in some European countries",
            "examples": [
               "It costs one euro.",
               "She paid ten euros for the book.",
               "The shirt is twenty euros."
            ]
         },
         {
            
            "id": 29,
            "saved": false,
            "word": "even",
            "role": "adverb",
            "BrE": "/ˈiːvn/",
            "AmE": "/ˈiːvn/",
            "definition": "used to emphasize something surprising",
            "examples": [
               "Even I can do it.",
               "She didn’t even call me.",
               "Even the teacher made a mistake."
            ]
         },
         {
            
            "id": 29,
            "saved": false,
            "word": "evening",
            "role": "noun",
            "BrE": "/ˈiːvnɪŋ/",
            "AmE": "/ˈiːvnɪŋ/",
            "definition": "the time of day between afternoon and night",
            "examples": [
               "Good evening!",
               "We meet in the evening.",
               "She studies every evening."
            ]
         },
         {
            
            "id": 29,
            "saved": false,
            "word": "event",
            "role": "noun",
            "BrE": "/ɪˈvent/",
            "AmE": "/ɪˈvent/",
            "definition": "something that happens, especially something important",
            "examples": [
               "The event was fun.",
               "A big event is tomorrow.",
               "She planned the school event."
            ]
         },
         {
            
            "id": 29,
            "saved": false,
            "word": "ever",
            "role": "adverb",
            "BrE": "/ˈevə(r)/",
            "AmE": "/ˈevər/",
            "definition": "at any time",
            "examples": [
               "Have you ever seen it?",
               "She has never been there.",
               "Do you ever go to the park?"
            ]
         },
         {
            
            "id": 29,
            "saved": false,
            "word": "every",
            "role": "determiner",
            "BrE": "/ˈevri/",
            "AmE": "/ˈevri/",
            "definition": "all the people or things in a group",
            "examples": [
               "Every student is here.",
               "I read every book.",
               "Every child got a gift."
            ]
         },
         {
            
            "id": 29,
            "saved": false,
            "word": "everybody",
            "role": "pronoun",
            "BrE": "/ˈevribɒdi/",
            "AmE": "/ˈevribɑːdi/",
            "definition": "every person",
            "examples": [
               "Everybody is happy.",
               "Everybody likes the teacher.",
               "Everybody came to the party."
            ]
         },
         {
            
            "id": 29,
            "saved": false,
            "word": "everyone",
            "role": "pronoun",
            "BrE": "/ˈevriwʌn/",
            "AmE": "/ˈevriwʌn/",
            "definition": "every person",
            "examples": [
               "Everyone is here.",
               "Everyone enjoyed the film.",
               "Everyone helped with the work."
            ]
         },
         {
            
            "id": 29,
            "saved": false,
            "word": "everything",
            "role": "pronoun",
            "BrE": "/ˈevriθɪŋ/",
            "AmE": "/ˈevriθɪŋ/",
            "definition": "all things",
            "examples": [
               "Everything is ready.",
               "She packed everything in a bag.",
               "Everything in the shop is new."
            ]
         },
         {
            
            "id": 29,
            "saved": false,
            "word": "exam",
            "role": "noun",
            "BrE": "/ɪɡˈzæm/",
            "AmE": "/ɪɡˈzæm/",
            "definition": "a test of what you know or can do",
            "examples": [
               "I have an exam.",
               "The exam was very hard.",
               "She studied for the math exam."
            ]
         },
         {
            
            "id": 30,
            "saved": false,
            "word": "example",
            "role": "noun",
            "BrE": "/ɪɡˈzɑːmpl/",
            "AmE": "/ɪɡˈzæmpl/",
            "definition": "something that shows what others are like",
            "examples": [
               "Give me an example.",
               "This is a good example.",
               "Her work is an example for us."
            ]
         },
         {
            
            "id": 30,
            "saved": false,
            "word": "excited",
            "role": "adjective",
            "BrE": "/ɪkˈsaɪtɪd/",
            "AmE": "/ɪkˈsaɪtɪd/",
            "definition": "feeling happy and enthusiastic",
            "examples": [
               "I am excited.",
               "She’s excited about the trip.",
               "He was excited to see his friend."
            ]
         },
         {
            
            "id": 30,
            "saved": false,
            "word": "exciting",
            "role": "adjective",
            "BrE": "/ɪkˈsaɪtɪŋ/",
            "AmE": "/ɪkˈsaɪtɪŋ/",
            "definition": "making you feel excited",
            "examples": [
               "The game is exciting.",
               "It was an exciting movie.",
               "Her story is really exciting."
            ]
         },
         {
            
            "id": 30,
            "saved": false,
            "word": "exercise",
            "role": "noun",
            "BrE": "/ˈeksəsaɪz/",
            "AmE": "/ˈeksərsaɪz/",
            "definition": "physical activity to stay healthy",
            "examples": [
               "I do exercise daily.",
               "Running is good exercise.",
               "She does exercise at the gym."
            ]
         },
         {
            
            "id": 30,
            "saved": false,
            "word": "exercise",
            "role": "verb",
            "BrE": "/ˈeksəsaɪz/",
            "AmE": "/ˈeksərsaɪz/",
            "definition": "to do physical activity to stay healthy",
            "examples": [
               "I exercise every day.",
               "She exercises in the park.",
               "He exercises to stay strong."
            ]
         },
         {
            
            "id": 30,
            "saved": false,
            "word": "expensive",
            "role": "adjective",
            "BrE": "/ɪkˈspensɪv/",
            "AmE": "/ɪkˈspensɪv/",
            "definition": "costing a lot of money",
            "examples": [
               "This bag is expensive.",
               "Her phone was very expensive.",
               "The restaurant is too expensive."
            ]
         },
         {
            
            "id": 30,
            "saved": false,
            "word": "explain",
            "role": "verb",
            "BrE": "/ɪkˈspleɪn/",
            "AmE": "/ɪkˈspleɪn/",
            "definition": "to make something clear or easy to understand",
            "examples": [
               "Explain the word.",
               "She explained the rules.",
               "He explained his idea clearly."
            ]
         },
         {
            
            "id": 30,
            "saved": false,
            "word": "extra",
            "role": "adjective",
            "BrE": "/ˈekstrə/",
            "AmE": "/ˈekstrə/",
            "definition": "more than what is usual",
            "examples": [
               "I need extra time.",
               "She bought extra food.",
               "He took an extra pen to school."
            ]
         },
         {
            
            "id": 30,
            "saved": false,
            "word": "eye",
            "role": "noun",
            "BrE": "/aɪ/",
            "AmE": "/aɪ/",
            "definition": "the part of the body used for seeing",
            "examples": [
               "My eye is blue.",
               "She closed her eyes.",
               "He has a problem with one eye."
            ]
         },
         {
            
            "id": 30,
            "saved": false,
            "word": "face",
            "role": "noun",
            "BrE": "/feɪs/",
            "AmE": "/feɪs/",
            "definition": "the front part of the head",
            "examples": [
               "Her face is happy.",
               "He washed his face.",
               "A smile appeared on her face."
            ]
         },
         
         {
            
            "id": 31,
            "saved": false,
            "word": "fact",
            "role": "noun",
            "BrE": "/fækt/",
            "AmE": "/fækt/",
            "definition": "something that is true",
            "examples": [
               "This is a fact.",
               "She told me a fact about birds.",
               "The fact is that he was late."
            ]
         },
         {
            
            "id": 31,
            "saved": false,
            "word": "fall",
            "role": "verb",
            "BrE": "/fɔːl/",
            "AmE": "/fɔːl/",
            "definition": "to go down quickly to the ground",
            "examples": [
               "I fall sometimes.",
               "The book fell off the table.",
               "She fell while running in the park."
            ]
         },
         {
            
            "id": 31,
            "saved": false,
            "word": "family",
            "role": "noun",
            "BrE": "/ˈfæməli/",
            "AmE": "/ˈfæməli/",
            "definition": "a group of people related to each other",
            "examples": [
               "My family is big.",
               "Her family lives in a village.",
               "The family had dinner together."
            ]
         },
         {
            
            "id": 31,
            "saved": false,
            "word": "famous",
            "role": "adjective",
            "BrE": "/ˈfeɪməs/",
            "AmE": "/ˈfeɪməs/",
            "definition": "known by many people",
            "examples": [
               "He is a famous singer.",
               "The city is famous for art.",
               "She met a famous actor yesterday."
            ]
         },
         {
            
            "id": 31,
            "saved": false,
            "word": "far",
            "role": "adverb",
            "BrE": "/fɑː(r)/",
            "AmE": "/fɑːr/",
            "definition": "at or to a great distance",
            "examples": [
               "The shop is far.",
               "He walked far from home.",
               "She traveled far to see her friend."
            ]
         },
         {
            
            "id": 31,
            "saved": false,
            "word": "fast",
            "role": "adjective",
            "BrE": "/fɑːst/",
            "AmE": "/fæst/",
            "definition": "moving or happening quickly",
            "examples": [
               "The car is fast.",
               "She runs very fast.",
               "A fast train arrived early."
            ]
         },
         {
            
            "id": 31,
            "saved": false,
            "word": "fast",
            "role": "adverb",
            "BrE": "/fɑːst/",
            "AmE": "/fæst/",
            "definition": "quickly",
            "examples": [
               "He runs fast.",
               "The bus goes fast.",
               "She finished her work fast."
            ]
         },
         {
            
            "id": 31,
            "saved": false,
            "word": "father",
            "role": "noun",
            "BrE": "/ˈfɑːðə(r)/",
            "AmE": "/ˈfɑːðər/",
            "definition": "a male parent",
            "examples": [
               "My father is kind.",
               "Her father works in a bank.",
               "The father read a story to his son."
            ]
         },
         {
            
            "id": 31,
            "saved": false,
            "word": "favourite",
            "role": "adjective",
            "BrE": "/ˈfeɪvərɪt/",
            "AmE": "/ˈfeɪvərɪt/",
            "definition": "liked more than others",
            "examples": [
               "Blue is my favourite colour.",
               "Her favourite book is short.",
               "This is his favourite restaurant."
            ]
         },
         {
            
            "id": 31,
            "saved": false,
            "word": "February",
            "role": "noun",
            "BrE": "/ˈfebruəri/",
            "AmE": "/ˈfebruˌeri/",
            "definition": "the second month of the year",
            "examples": [
               "February is cold.",
               "My birthday is in February.",
               "We have a holiday in February."
            ]
         },
         {
            
            "id": 32,
            "saved": false,
            "word": "feel",
            "role": "verb",
            "BrE": "/fiːl/",
            "AmE": "/fiːl/",
            "definition": "to experience an emotion or sensation",
            "examples": [
               "I feel happy.",
               "She feels tired after work.",
               "He felt cold in the morning."
            ]
         },
         {
            
            "id": 32,
            "saved": false,
            "word": "feeling",
            "role": "noun",
            "BrE": "/ˈfiːlɪŋ/",
            "AmE": "/ˈfiːlɪŋ/",
            "definition": "an emotion or sensation",
            "examples": [
               "I have a good feeling.",
               "Her feeling was one of joy.",
               "He shared his feelings with her."
            ]
         },
         {
            
            "id": 32,
            "saved": false,
            "word": "festival",
            "role": "noun",
            "BrE": "/ˈfestɪvl/",
            "AmE": "/ˈfestɪvl/",
            "definition": "a special event with music, food, or activities",
            "examples": [
               "The festival was fun.",
               "We went to a music festival.",
               "The town holds a festival yearly."
            ]
         },
         {
            
            "id": 32,
            "saved": false,
            "word": "few",
            "role": "determiner",
            "BrE": "/fjuː/",
            "AmE": "/fjuː/",
            "definition": "a small number of",
            "examples": [
               "I have few books.",
               "She has few friends here.",
               "Few people came to the event."
            ]
         },
         {
            
            "id": 32,
            "saved": false,
            "word": "few",
            "role": "pronoun",
            "BrE": "/fjuː/",
            "AmE": "/fjuː/",
            "definition": "a small number of people or things",
            "examples": [
               "Few are here.",
               "Few of them stayed late.",
               "Few of the cakes were eaten."
            ]
         },
         {
            
            "id": 32,
            "saved": false,
            "word": "film",
            "role": "noun",
            "BrE": "/fɪlm/",
            "AmE": "/fɪlm/",
            "definition": "a movie shown in a cinema or on television",
            "examples": [
               "I watched a film.",
               "The film was very funny.",
               "She saw a new film yesterday."
            ]
         },
         {
            
            "id": 32,
            "saved": false,
            "word": "find",
            "role": "verb",
            "BrE": "/faɪnd/",
            "AmE": "/faɪnd/",
            "definition": "to discover something or someone",
            "examples": [
               "I find my keys.",
               "She found a new book.",
               "He found his phone under the bed."
            ]
         },
         {
            
            "id": 32,
            "saved": false,
            "word": "fine",
            "role": "adjective",
            "BrE": "/faɪn/",
            "AmE": "/faɪn/",
            "definition": "good or acceptable",
            "examples": [
               "I feel fine.",
               "The weather is fine today.",
               "Her work is absolutely fine."
            ]
         },
         {
            
            "id": 32,
            "saved": false,
            "word": "finish",
            "role": "verb",
            "BrE": "/ˈfɪnɪʃ/",
            "AmE": "/ˈfɪnɪʃ/",
            "definition": "to complete something",
            "examples": [
               "I finish my homework.",
               "She finished the book.",
               "He finished his work early."
            ]
         },
         {
            
            "id": 32,
            "saved": false,
            "word": "fire",
            "role": "noun",
            "BrE": "/faɪə(r)/",
            "AmE": "/faɪr/",
            "definition": "burning that produces heat and light",
            "examples": [
               "The fire is warm.",
               "We sat by the fire.",
               "The fire burned all night."
            ]
         },
         {
            
            "id": 33,
            "saved": false,
            "word": "first",
            "role": "adjective",
            "BrE": "/fɜːst/",
            "AmE": "/fɜːrst/",
            "definition": "coming before all others",
            "examples": [
               "She was the first student.",
               "The first book is short.",
               "He won first place in the race."
            ]
         },
         {
            
            "id": 33,
            "saved": false,
            "word": "first",
            "role": "adverb",
            "BrE": "/fɜːst/",
            "AmE": "/fɜːrst/",
            "definition": "before anyone or anything else",
            "examples": [
               "I arrived first.",
               "She spoke first in class.",
               "He finished the race first."
            ]
         },
         {
            
            "id": 33,
            "saved": false,
            "word": "fish",
            "role": "noun",
            "BrE": "/fɪʃ/",
            "AmE": "/fɪʃ/",
            "definition": "an animal that lives in water",
            "examples": [
               "I see a fish.",
               "She has a pet fish.",
               "The fish swim in the tank."
            ]
         },
         {
            
            "id": 33,
            "saved": false,
            "word": "five",
            "role": "number",
            "BrE": "/faɪv/",
            "AmE": "/faɪv/",
            "definition": "the number 5",
            "examples": [
               "I have five books.",
               "She is five years old.",
               "Five students are in the room."
            ]
         },
         {
            
            "id": 33,
            "saved": false,
            "word": "flat",
            "role": "noun",
            "BrE": "/flæt/",
            "AmE": "/flæt/",
            "definition": "a set of rooms for living in, usually on one floor",
            "examples": [
               "I live in a flat.",
               "Her flat is small but nice.",
               "The flat has two bedrooms."
            ]
         },
         {
            
            "id": 33,
            "saved": false,
            "word": "floor",
            "role": "noun",
            "BrE": "/flɔː(r)/",
            "AmE": "/flɔːr/",
            "definition": "the part of a room you walk on",
            "examples": [
               "The floor is clean.",
               "She sat on the floor.",
               "The floor in the house is wood."
            ]
         },
         {
            
            "id": 33,
            "saved": false,
            "word": "flower",
            "role": "noun",
            "BrE": "/ˈflaʊə(r)/",
            "AmE": "/ˈflaʊər/",
            "definition": "the colourful part of a plant",
            "examples": [
               "I picked a flower.",
               "The garden has many flowers.",
               "She gave her mum a flower."
            ]
         },
         {
            
            "id": 33,
            "saved": false,
            "word": "fly",
            "role": "verb",
            "BrE": "/flaɪ/",
            "AmE": "/flaɪ/",
            "definition": "to move through the air",
            "examples": [
               "Birds fly in the sky.",
               "She flew to Paris.",
               "The plane flies at night."
            ]
         },
         {
            
            "id": 33,
            "saved": false,
            "word": "follow",
            "role": "verb",
            "BrE": "/ˈfɒləʊ/",
            "AmE": "/ˈfɑːloʊ/",
            "definition": "to go after someone or something",
            "examples": [
               "Follow me, please.",
               "He followed the teacher.",
               "She follows the path to school."
            ]
         },
         {
            
            "id": 33,
            "saved": false,
            "word": "food",
            "role": "noun",
            "BrE": "/fuːd/",
            "AmE": "/fuːd/",
            "definition": "things that people or animals eat",
            "examples": [
               "I like food.",
               "The food is delicious.",
               "She cooked Italian food."
            ]
         },
         {
            
            "id": 34,
            "saved": false,
            "word": "foot",
            "role": "noun",
            "BrE": "/fʊt/",
            "AmE": "/fʊt/",
            "definition": "the part of the body you walk on",
            "examples": [
               "My foot hurts.",
               "He kicked the ball with his foot.",
               "She stood on one foot."
            ]
         },
         {
            
            "id": 34,
            "saved": false,
            "word": "football",
            "role": "noun",
            "BrE": "/ˈfʊtbɔːl/",
            "AmE": "/ˈfʊtbɔːl/",
            "definition": "a game played with a ball by two teams",
            "examples": [
               "I play football.",
               "The football match was exciting.",
               "He watches football every weekend."
            ]
         },
         {
            
            "id": 34,
            "saved": false,
            "word": "for",
            "role": "preposition",
            "BrE": "/fə(r)/",
            "AmE": "/fər/",
            "definition": "used to show purpose, time, or who something is intended for",
            "examples": [
               "This is for you.",
               "I waited for an hour.",
               "She bought a gift for her friend."
            ]
         },
         {
            
            "id": 34,
            "saved": false,
            "word": "foreign",
            "role": "adjective",
            "BrE": "/ˈfɒrən/",
            "AmE": "/ˈfɔːrən/",
            "definition": "from or connected to another country",
            "examples": [
               "I learn a foreign language.",
               "She met a foreign student.",
               "He likes foreign films."
            ]
         },
         {
            
            "id": 34,
            "saved": false,
            "word": "forest",
            "role": "noun",
            "BrE": "/ˈfɒrɪst/",
            "AmE": "/ˈfɔːrɪst/",
            "definition": "a large area with many trees",
            "examples": [
               "The forest is green.",
               "We walked in the forest.",
               "Animals live in the forest."
            ]
         },
         {
            
            "id": 34,
            "saved": false,
            "word": "forget",
            "role": "verb",
            "BrE": "/fəˈɡet/",
            "AmE": "/fərˈɡet/",
            "definition": "to not remember something",
            "examples": [
               "I forget my keys.",
               "She forgot her homework.",
               "He forgot to call his mum."
            ]
         },
         {
            
            "id": 34,
            "saved": false,
            "word": "fork",
            "role": "noun",
            "BrE": "/fɔːk/",
            "AmE": "/fɔːrk/",
            "definition": "a tool with points used for eating",
            "examples": [
               "I use a fork.",
               "The fork is on the table.",
               "She ate her food with a fork."
            ]
         },
         {
            
            "id": 34,
            "saved": false,
            "word": "four",
            "role": "number",
            "BrE": "/fɔː(r)/",
            "AmE": "/fɔːr/",
            "definition": "the number 4",
            "examples": [
               "I have four cats.",
               "She is four years old.",
               "Four books are on the desk."
            ]
         },
         {
            
            "id": 34,
            "saved": false,
            "word": "fourteen",
            "role": "number",
            "BrE": "/ˌfɔːˈtiːn/",
            "AmE": "/ˌfɔːrˈtiːn/",
            "definition": "the number 14",
            "examples": [
               "He is fourteen.",
               "I bought fourteen apples.",
               "Fourteen students joined the club."
            ]
         },
         {
            
            "id": 34,
            "saved": false,
            "word": "fourth",
            "role": "adjective",
            "BrE": "/fɔːθ/",
            "AmE": "/fɔːrθ/",
            "definition": "coming after three others",
            "examples": [
               "This is the fourth book.",
               "She came in fourth place.",
               "The fourth day was sunny."
            ]
         },
         {
            
            "id": 35,
            "saved": false,
            "word": "free",
            "role": "adjective",
            "BrE": "/friː/",
            "AmE": "/friː/",
            "definition": "costing no money; not busy",
            "examples": [
               "The ticket is free.",
               "She is free this afternoon.",
               "The museum has free entry."
            ]
         },
         {
            
            "id": 35,
            "saved": false,
            "word": "Friday",
            "role": "noun",
            "BrE": "/ˈfraɪdeɪ/",
            "AmE": "/ˈfraɪdeɪ/",
            "definition": "the fifth day of the week",
            "examples": [
               "Friday is tomorrow.",
               "We meet on Friday.",
               "She has a test on Friday."
            ]
         },
         {
            
            "id": 35,
            "saved": false,
            "word": "friend",
            "role": "noun",
            "BrE": "/frend/",
            "AmE": "/frend/",
            "definition": "a person you like and know well",
            "examples": [
               "My friend is nice.",
               "She met her friend at school.",
               "He has many friends in the city."
            ]
         },
         {
            
            "id": 35,
            "saved": false,
            "word": "friendly",
            "role": "adjective",
            "BrE": "/ˈfrendli/",
            "AmE": "/ˈfrendli/",
            "definition": "kind and pleasant",
            "examples": [
               "She is friendly.",
               "The dog is very friendly.",
               "He gave a friendly smile."
            ]
         },
         {
            
            "id": 35,
            "saved": false,
            "word": "from",
            "role": "preposition",
            "BrE": "/frɒm/",
            "AmE": "/frəm/",
            "definition": "used to show where something starts",
            "examples": [
               "I am from London.",
               "She got a letter from him.",
               "The train is from Paris."
            ]
         },
         {
            
            "id": 35,
            "saved": false,
            "word": "front",
            "role": "noun",
            "BrE": "/frʌnt/",
            "AmE": "/frʌnt/",
            "definition": "the part of something that faces forward",
            "examples": [
               "The front of the house is red.",
               "Sit in the front of the bus.",
               "The front of the book has a picture."
            ]
         },
         {
            
            "id": 35,
            "saved": false,
            "word": "fruit",
            "role": "noun",
            "BrE": "/fruːt/",
            "AmE": "/fruːt/",
            "definition": "food that grows on trees or plants, like apples",
            "examples": [
               "I eat fruit.",
               "She bought some fruit.",
               "The fruit is fresh and sweet."
            ]
         },
         {
            
            "id": 35,
            "saved": false,
            "word": "full",
            "role": "adjective",
            "BrE": "/fʊl/",
            "AmE": "/fʊl/",
            "definition": "containing as much as possible",
            "examples": [
               "The glass is full.",
               "Her bag is full of books.",
               "The room was full of people."
            ]
         },
         {
            
            "id": 35,
            "saved": false,
            "word": "fun",
            "role": "adjective",
            "BrE": "/fʌn/",
            "AmE": "/fʌn/",
            "definition": "enjoyable or entertaining",
            "examples": [
               "The game is fun.",
               "It was a fun party.",
               "Her class is always fun."
            ]
         },
         {
            
            "id": 35,
            "saved": false,
            "word": "fun",
            "role": "noun",
            "BrE": "/fʌn/",
            "AmE": "/fʌn/",
            "definition": "enjoyment or pleasure",
            "examples": [
               "We had fun.",
               "The trip was full of fun.",
               "Playing games is great fun."
            ]
         },
         {
            
            "id": 36,
            "saved": false,
            "word": "funny",
            "role": "adjective",
            "BrE": "/ˈfʌni/",
            "AmE": "/ˈfʌni/",
            "definition": "making you laugh",
            "examples": [
               "The joke is funny.",
               "She told a funny story.",
               "The film was really funny."
            ]
         },
         {
            
            "id": 36,
            "saved": false,
            "word": "future",
            "role": "noun",
            "BrE": "/ˈfjuːtʃə(r)/",
            "AmE": "/ˈfjuːtʃər/",
            "definition": "the time that will come",
            "examples": [
               "The future is bright.",
               "She plans for her future.",
               "In the future, I want to travel."
            ]
         },
         {
            
            "id": 36,
            "saved": false,
            "word": "game",
            "role": "noun",
            "BrE": "/ɡeɪm/",
            "AmE": "/ɡeɪm/",
            "definition": "an activity or sport with rules",
            "examples": [
               "I play a game.",
               "The game was exciting.",
               "She won the card game."
            ]
         },
         {
            
            "id": 36,
            "saved": false,
            "word": "garden",
            "role": "noun",
            "BrE": "/ˈɡɑːdn/",
            "AmE": "/ˈɡɑːrdn/",
            "definition": "a place where plants or flowers are grown",
            "examples": [
               "The garden is pretty.",
               "She works in the garden.",
               "The garden has roses and trees."
            ]
         },
         {
            
            "id": 36,
            "saved": false,
            "word": "get",
            "role": "verb",
            "BrE": "/ɡet/",
            "AmE": "/ɡet/",
            "definition": "to receive or obtain something",
            "examples": [
               "I get a gift.",
               "She got a new phone.",
               "He gets good grades at school."
            ]
         },
         {
            
            "id": 36,
            "saved": false,
            "word": "girl",
            "role": "noun",
            "BrE": "/ɡɜːl/",
            "AmE": "/ɡɜːrl/",
            "definition": "a young female person",
            "examples": [
               "The girl is happy.",
               "She is a kind girl.",
               "The girl sang at the concert."
            ]
         },
         {
            
            "id": 36,
            "saved": false,
            "word": "girlfriend",
            "role": "noun",
            "BrE": "/ˈɡɜːlfrend/",
            "AmE": "/ˈɡɜːrlfrend/",
            "definition": "a woman or girl someone has a romantic relationship with",
            "examples": [
               "My girlfriend is nice.",
               "His girlfriend is a dancer.",
               "She met her girlfriend at school."
            ]
         },
         {
            
            "id": 36,
            "saved": false,
            "word": "give",
            "role": "verb",
            "BrE": "/ɡɪv/",
            "AmE": "/ɡɪv/",
            "definition": "to hand something to someone",
            "examples": [
               "Give me the book.",
               "She gave him a present.",
               "He gives money to charity."
            ]
         },
         {
            
            "id": 36,
            "saved": false,
            "word": "glass",
            "role": "noun",
            "BrE": "/ɡlɑːs/",
            "AmE": "/ɡlæs/",
            "definition": "a container for drinking, made of glass",
            "examples": [
               "I drink from a glass.",
               "The glass is full of water.",
               "She broke a glass in the kitchen."
            ]
         },
         {
            
            "id": 36,
            "saved": false,
            "word": "go",
            "role": "verb",
            "BrE": "/ɡəʊ/",
            "AmE": "/ɡoʊ/",
            "definition": "to move or travel to a place",
            "examples": [
               "I go to school.",
               "She went to the park.",
               "He goes to work by car."
            ]
         },
         {
            
            "id": 37,
            "saved": false,
            "word": "good",
            "role": "adjective",
            "BrE": "/ɡʊd/",
            "AmE": "/ɡʊd/",
            "definition": "of high quality or pleasant",
            "examples": [
               "This is a good book.",
               "She is a good student.",
               "The food tastes really good."
            ]
         },
         {
            
            "id": 37,
            "saved": false,
            "word": "goodbye",
            "role": "exclamation",
            "BrE": "/ˌɡʊdˈbaɪ/",
            "AmE": "/ˌɡʊdˈbaɪ/",
            "definition": "used when you leave someone",
            "examples": [
               "Goodbye, see you!",
               "She said goodbye to her friend.",
               "He waved goodbye at the station."
            ]
         },
         {
            
            "id": 37,
            "saved": false,
            "word": "grandfather",
            "role": "noun",
            "BrE": "/ˈɡrænfɑːðə(r)/",
            "AmE": "/ˈɡrænfɑːðər/",
            "definition": "the father of your mother or father",
            "examples": [
               "My grandfather is old.",
               "Her grandfather tells stories.",
               "He visits his grandfather weekly."
            ]
         },
         {
            
            "id": 37,
            "saved": false,
            "word": "grandmother",
            "role": "noun",
            "BrE": "/ˈɡrænmʌðə(r)/",
            "AmE": "/ˈɡrænmʌðər/",
            "definition": "the mother of your mother or father",
            "examples": [
               "My grandmother is kind.",
               "Her grandmother bakes cakes.",
               "She lives with her grandmother."
            ]
         },
         {
            
            "id": 37,
            "saved": false,
            "word": "great",
            "role": "adjective",
            "BrE": "/ɡreɪt/",
            "AmE": "/ɡreɪt/",
            "definition": "very good or large",
            "examples": [
               "This is a great day.",
               "She had a great time.",
               "The party was really great."
            ]
         },
         {
            
            "id": 37,
            "saved": false,
            "word": "green",
            "role": "adjective",
            "BrE": "/ɡriːn/",
            "AmE": "/ɡriːn/",
            "definition": "having the colour of grass",
            "examples": [
               "The grass is green.",
               "She wears a green dress.",
               "The green trees are tall."
            ]
         },
         {
            
            "id": 37,
            "saved": false,
            "word": "green",
            "role": "noun",
            "BrE": "/ɡriːn/",
            "AmE": "/ɡriːn/",
            "definition": "the colour of grass",
            "examples": [
               "Green is my favourite colour.",
               "The wall is painted green.",
               "She chose green for her room."
            ]
         },
         {
            
            "id": 37,
            "saved": false,
            "word": "grey",
            "role": "adjective",
            "BrE": "/ɡreɪ/",
            "AmE": "/ɡreɪ/",
            "definition": "having the colour between black and white",
            "examples": [
               "Her hair is grey.",
               "The sky is grey today.",
               "He wears a grey jacket."
            ]
         },
         {
            
            "id": 37,
            "saved": false,
            "word": "grey",
            "role": "noun",
            "BrE": "/ɡreɪ/",
            "AmE": "/ɡreɪ/",
            "definition": "the colour between black and white",
            "examples": [
               "Grey is a calm colour.",
               "The car is painted grey.",
               "She likes grey for her clothes."
            ]
         },
         {
            
            "id": 37,
            "saved": false,
            "word": "group",
            "role": "noun",
            "BrE": "/ɡruːp/",
            "AmE": "/ɡruːp/",
            "definition": "a number of people or things together",
            "examples": [
               "We are a group.",
               "The group meets every week.",
               "She joined a study group."
            ]
         },
         {
            
            "id": 38,
            "saved": false,
            "word": "guitar",
            "role": "noun",
            "BrE": "/ɡɪˈtɑː(r)/",
            "AmE": "/ɡɪˈtɑːr/",
            "definition": "a musical instrument with strings",
            "examples": [
               "I play the guitar.",
               "He bought a new guitar.",
               "She plays the guitar in a band."
            ]
         },
         {
            
            "id": 38,
            "saved": false,
            "word": "hair",
            "role": "noun",
            "BrE": "/heə(r)/",
            "AmE": "/her/",
            "definition": "the thin strands that grow on your head",
            "examples": [
               "Her hair is long.",
               "He cut his hair short.",
               "The hair on the brush is black."
            ]
         },
         {
            
            "id": 38,
            "saved": false,
            "word": "half",
            "role": "noun",
            "BrE": "/hɑːf/",
            "AmE": "/hæf/",
            "definition": "one of two equal parts of something",
            "examples": [
               "I ate half the cake.",
               "She gave me half her sandwich.",
               "Half of the class is here."
            ]
         },
         {
            
            "id": 38,
            "saved": false,
            "word": "hand",
            "role": "noun",
            "BrE": "/hænd/",
            "AmE": "/hænd/",
            "definition": "the part of the body at the end of the arm",
            "examples": [
               "My hand is clean.",
               "She held the book in her hand.",
               "He raised his hand to answer."
            ]
         },
         {
            
            "id": 38,
            "saved": false,
            "word": "happy",
            "role": "adjective",
            "BrE": "/ˈhæpi/",
            "AmE": "/ˈhæpi/",
            "definition": "feeling or showing pleasure",
            "examples": [
               "I am happy today.",
               "She looks happy with her gift.",
               "The happy children played outside."
            ]
         },
         {
            
            "id": 38,
            "saved": false,
            "word": "hard",
            "role": "adjective",
            "BrE": "/hɑːd/",
            "AmE": "/hɑːrd/",
            "definition": "difficult or not soft",
            "examples": [
               "This test is hard.",
               "The ground is hard and dry.",
               "Her job is very hard."
            ]
         },
         {
            
            "id": 38,
            "saved": false,
            "word": "hard",
            "role": "adverb",
            "BrE": "/hɑːd/",
            "AmE": "/hɑːrd/",
            "definition": "with a lot of effort",
            "examples": [
               "She works hard.",
               "He studied hard for the exam.",
               "They played hard in the game."
            ]
         },
         {
            
            "id": 38,
            "saved": false,
            "word": "hat",
            "role": "noun",
            "BrE": "/hæt/",
            "AmE": "/hæt/",
            "definition": "a covering for the head",
            "examples": [
               "I wear a hat.",
               "Her hat is red and big.",
               "He lost his hat in the park."
            ]
         },
         {
            
            "id": 38,
            "saved": false,
            "word": "have",
            "role": "verb",
            "BrE": "/hæv/",
            "AmE": "/hæv/",
            "definition": "to own or hold something",
            "examples": [
               "I have a dog.",
               "She has a new phone.",
               "He has two cats at home."
            ]
         },
         {
            
            "id": 38,
            "saved": false,
            "word": "he",
            "role": "pronoun",
            "BrE": "/hiː/",
            "AmE": "/hiː/",
            "definition": "a male person or animal",
            "examples": [
               "He is my friend.",
               "He plays football well.",
               "He went to the shop."
            ]
         },
         {
            
            "id": 39,
            "saved": false,
            "word": "head",
            "role": "noun",
            "BrE": "/hed/",
            "AmE": "/hed/",
            "definition": "the part of the body above the neck",
            "examples": [
               "My head hurts.",
               "She has a hat on her head.",
               "He nodded his head to agree."
            ]
         },
         {
            
            "id": 39,
            "saved": false,
            "word": "health",
            "role": "noun",
            "BrE": "/helθ/",
            "AmE": "/helθ/",
            "definition": "the condition of your body",
            "examples": [
               "My health is good.",
               "She cares about her health.",
               "Exercise is good for health."
            ]
         },
         {
            
            "id": 39,
            "saved": false,
            "word": "healthy",
            "role": "adjective",
            "BrE": "/ˈhelθi/",
            "AmE": "/ˈhelθi/",
            "definition": "having good health",
            "examples": [
               "She is healthy.",
               "He eats healthy food.",
               "A healthy diet helps you grow."
            ]
         },
         {
            
            "id": 39,
            "saved": false,
            "word": "hear",
            "role": "verb",
            "BrE": "/hɪə(r)/",
            "AmE": "/hɪr/",
            "definition": "to notice sounds with your ears",
            "examples": [
               "I hear a bird.",
               "She heard the music.",
               "He can hear the dog barking."
            ]
         },
         {
            
            "id": 39,
            "saved": false,
            "word": "hello",
            "role": "exclamation",
            "BrE": "/həˈləʊ/",
            "AmE": "/həˈloʊ/",
            "definition": "used to greet someone",
            "examples": [
               "Hello, how are you?",
               "She said hello to her teacher.",
               "He shouted hello from the door."
            ]
         },
         {
            
            "id": 39,
            "saved": false,
            "word": "help",
            "role": "noun",
            "BrE": "/help/",
            "AmE": "/help/",
            "definition": "the act of helping someone",
            "examples": [
               "I need help.",
               "She asked for help with math.",
               "His help made the work easier."
            ]
         },
         {
            
            "id": 39,
            "saved": false,
            "word": "help",
            "role": "verb",
            "BrE": "/help/",
            "AmE": "/help/",
            "definition": "to do something to make things easier for someone",
            "examples": [
               "I help my mum.",
               "She helped him with homework.",
               "He helps at the shop."
            ]
         },
         {
            
            "id": 39,
            "saved": false,
            "word": "her",
            "role": "pronoun",
            "BrE": "/hə(r)/",
            "AmE": "/hər/",
            "definition": "a female person or animal",
            "examples": [
               "Her bag is red.",
               "I gave her a book.",
               "Her cat is very cute."
            ]
         },
         {
            
            "id": 39,
            "saved": false,
            "word": "here",
            "role": "adverb",
            "BrE": "/hɪə(r)/",
            "AmE": "/hɪr/",
            "definition": "in or to this place",
            "examples": [
               "Come here, please.",
               "She lives here in the city.",
               "The book is here on the table."
            ]
         },
         {
            
            "id": 39,
            "saved": false,
            "word": "hi",
            "role": "exclamation",
            "BrE": "/haɪ/",
            "AmE": "/haɪ/",
            "definition": "used to greet someone in an informal way",
            "examples": [
               "Hi, how are you?",
               "She said hi to her friend.",
               "He waved and said hi."
            ]
         },
         {
            
            "id": 40,
            "saved": false,
            "word": "high",
            "role": "adjective",
            "BrE": "/haɪ/",
            "AmE": "/haɪ/",
            "definition": "having a large distance from bottom to top",
            "examples": [
               "The mountain is high.",
               "She jumped from a high wall.",
               "The high building is new."
            ]
         },
         {
            
            "id": 40,
            "saved": false,
            "word": "him",
            "role": "pronoun",
            "BrE": "/hɪm/",
            "AmE": "/hɪm/",
            "definition": "a male person or animal",
            "examples": [
               "I saw him.",
               "She gave him a gift.",
               "The dog followed him home."
            ]
         },
         {
            
            "id": 40,
            "saved": false,
            "word": "his",
            "role": "determiner",
            "BrE": "/hɪz/",
            "AmE": "/hɪz/",
            "definition": "belonging to a male person or animal",
            "examples": [
               "His book is here.",
               "I like his new car.",
               "His dog is very friendly."
            ]
         },
         {
            
            "id": 40,
            "saved": false,
            "word": "history",
            "role": "noun",
            "BrE": "/ˈhɪstri/",
            "AmE": "/ˈhɪstri/",
            "definition": "the study of past events",
            "examples": [
               "I like history.",
               "She studies history at school.",
               "The book is about world history."
            ]
         },
         {
            
            "id": 40,
            "saved": false,
            "word": "hobby",
            "role": "noun",
            "BrE": "/ˈhɒbi/",
            "AmE": "/ˈhɑːbi/",
            "definition": "an activity you enjoy doing in your free time",
            "examples": [
               "My hobby is reading.",
               "Her hobby is painting.",
               "He has a hobby of collecting coins."
            ]
         },
         {
            
            "id": 40,
            "saved": false,
            "word": "holiday",
            "role": "noun",
            "BrE": "/ˈhɒlədeɪ/",
            "AmE": "/ˈhɑːlədeɪ/",
            "definition": "a time when you do not go to work or school",
            "examples": [
               "We went on holiday.",
               "The holiday is in July.",
               "She planned a holiday by the sea."
            ]
         },
         {
            
            "id": 40,
            "saved": false,
            "word": "home",
            "role": "noun",
            "BrE": "/həʊm/",
            "AmE": "/hoʊm/",
            "definition": "the place where you live",
            "examples": [
               "I am at home.",
               "Her home is in the city.",
               "He goes home after school."
            ]
         },
         {
            
            "id": 40,
            "saved": false,
            "word": "homework",
            "role": "noun",
            "BrE": "/ˈhəʊmwɜːk/",
            "AmE": "/ˈhoʊmwɜːrk/",
            "definition": "school work you do at home",
            "examples": [
               "I do my homework.",
               "She finished her homework.",
               "The homework was difficult."
            ]
         },
         {
            
            "id": 40,
            "saved": false,
            "word": "horse",
            "role": "noun",
            "BrE": "/hɔːs/",
            "AmE": "/hɔːrs/",
            "definition": "a large animal used for riding or pulling things",
            "examples": [
               "I saw a horse.",
               "She rides a horse.",
               "The horse ran in the field."
            ]
         },
         {
            
            "id": 40,
            "saved": false,
            "word": "hospital",
            "role": "noun",
            "BrE": "/ˈhɒspɪtl/",
            "AmE": "/ˈhɑːspɪtl/",
            "definition": "a place where sick people are treated",
            "examples": [
               "The hospital is big.",
               "She visited her dad in hospital.",
               "He works at the hospital."
            ]
         },
         
         {
            
            "id": 41,
            "saved": false,
            "word": "hot",
            "role": "adjective",
            "BrE": "/hɒt/",
            "AmE": "/hɑːt/",
            "definition": "having a high temperature",
            "examples": [
               "The soup is hot.",
               "It’s hot outside today.",
               "She drank hot tea slowly."
            ]
         },
         {
            
            "id": 41,
            "saved": false,
            "word": "hotel",
            "role": "noun",
            "BrE": "/həʊˈtel/",
            "AmE": "/hoʊˈtel/",
            "definition": "a place where people stay and pay for a room",
            "examples": [
               "We stayed at a hotel.",
               "The hotel is near the beach.",
               "She booked a room in the hotel."
            ]
         },
         {
            
            "id": 41,
            "saved": false,
            "word": "hour",
            "role": "noun",
            "BrE": "/aʊə(r)/",
            "AmE": "/aʊr/",
            "definition": "a period of 60 minutes",
            "examples": [
               "The class is one hour.",
               "He waited for an hour.",
               "The film lasted two hours."
            ]
         },
         {
            
            "id": 41,
            "saved": false,
            "word": "house",
            "role": "noun",
            "BrE": "/haʊs/",
            "AmE": "/haʊs/",
            "definition": "a building where people live",
            "examples": [
               "My house is big.",
               "She lives in a small house.",
               "The house has a red door."
            ]
         },
         {
            
            "id": 41,
            "saved": false,
            "word": "how",
            "role": "adverb",
            "BrE": "/haʊ/",
            "AmE": "/haʊ/",
            "definition": "in what way or to what extent",
            "examples": [
               "How are you?",
               "How do you make this?",
               "How far is the school from here?"
            ]
         },
         {
            
            "id": 41,
            "saved": false,
            "word": "however",
            "role": "adverb",
            "BrE": "/haʊˈevə(r)/",
            "AmE": "/haʊˈevər/",
            "definition": "used to introduce a statement that contrasts with something",
            "examples": [
               "I tried; however, I failed.",
               "She was tired; however, she worked.",
               "It’s cold; however, he went out."
            ]
         },
         {
            
            "id": 41,
            "saved": false,
            "word": "hundred",
            "role": "number",
            "BrE": "/ˈhʌndrəd/",
            "AmE": "/ˈhʌndrəd/",
            "definition": "the number 100",
            "examples": [
               "I have a hundred books.",
               "She walked a hundred steps.",
               "A hundred people were at the event."
            ]
         },
         {
            
            "id": 41,
            "saved": false,
            "word": "hungry",
            "role": "adjective",
            "BrE": "/ˈhʌŋɡri/",
            "AmE": "/ˈhʌŋɡri/",
            "definition": "wanting or needing food",
            "examples": [
               "I am hungry.",
               "The dog looks hungry.",
               "She felt hungry after the walk."
            ]
         },
         {
            
            "id": 41,
            "saved": false,
            "word": "husband",
            "role": "noun",
            "BrE": "/ˈhʌzbənd/",
            "AmE": "/ˈhʌzbənd/",
            "definition": "the man a woman is married to",
            "examples": [
               "Her husband is kind.",
               "My husband cooks well.",
               "She met her husband at work."
            ]
         },
         {
            
            "id": 41,
            "saved": false,
            "word": "I",
            "role": "pronoun",
            "BrE": "/aɪ/",
            "AmE": "/aɪ/",
            "definition": "the person speaking",
            "examples": [
               "I am happy.",
               "I go to school daily.",
               "I bought a new book yesterday."
            ]
         },
         {
            
            "id": 42,
            "saved": false,
            "word": "ice",
            "role": "noun",
            "BrE": "/aɪs/",
            "AmE": "/aɪs/",
            "definition": "frozen water",
            "examples": [
               "I want ice in my drink.",
               "The ice is cold and hard.",
               "She slipped on the ice."
            ]
         },
         {
            
            "id": 42,
            "saved": false,
            "word": "idea",
            "role": "noun",
            "BrE": "/aɪˈdɪə/",
            "AmE": "/aɪˈdiːə/",
            "definition": "a plan or suggestion",
            "examples": [
               "I have an idea.",
               "Her idea was great.",
               "He shared his idea with the class."
            ]
         },
         {
            
            "id": 42,
            "saved": false,
            "word": "if",
            "role": "conjunction",
            "BrE": "/ɪf/",
            "AmE": "/ɪf/",
            "definition": "used to talk about possible situations",
            "examples": [
               "If it rains, stay home.",
               "I’ll come if I’m free.",
               "She studies if she has time."
            ]
         },
         {
            
            "id": 42,
            "saved": false,
            "word": "important",
            "role": "adjective",
            "BrE": "/ɪmˈpɔːtnt/",
            "AmE": "/ɪmˈpɔːrtnt/",
            "definition": "having a lot of value or influence",
            "examples": [
               "This is important.",
               "Her job is very important.",
               "The meeting is important for us."
            ]
         },
         {
            
            "id": 42,
            "saved": false,
            "word": "in",
            "role": "preposition",
            "BrE": "/ɪn/",
            "AmE": "/ɪn/",
            "definition": "inside a place or thing",
            "examples": [
               "I am in the room.",
               "She lives in a city.",
               "The book is in my bag."
            ]
         },
         {
            
            "id": 42,
            "saved": false,
            "word": "information",
            "role": "noun",
            "BrE": "/ˌɪnfəˈmeɪʃn/",
            "AmE": "/ˌɪnfərˈmeɪʃn/",
            "definition": "facts or details about something",
            "examples": [
               "I need information.",
               "She gave me information about the school.",
               "The book has useful information."
            ]
         },
         {
            
            "id": 42,
            "saved": false,
            "word": "interest",
            "role": "noun",
            "BrE": "/ˈɪntrəst/",
            "AmE": "/ˈɪntrəst/",
            "definition": "something you enjoy doing or learning about",
            "examples": [
               "My interest is music.",
               "He has an interest in art.",
               "Her interests include sports."
            ]
         },
         {
            
            "id": 42,
            "saved": false,
            "word": "interested",
            "role": "adjective",
            "BrE": "/ˈɪntrəstɪd/",
            "AmE": "/ˈɪntrəstɪd/",
            "definition": "wanting to know or learn about something",
            "examples": [
               "I am interested in books.",
               "She is interested in history.",
               "He was interested in the film."
            ]
         },
         {
            
            "id": 42,
            "saved": false,
            "word": "interesting",
            "role": "adjective",
            "BrE": "/ˈɪntrəstɪŋ/",
            "AmE": "/ˈɪntrəstɪŋ/",
            "definition": "making you want to know more",
            "examples": [
               "The book is interesting.",
               "Her story was very interesting.",
               "This class is really interesting."
            ]
         },
         {
            
            "id": 42,
            "saved": false,
            "word": "internet",
            "role": "noun",
            "BrE": "/ˈɪntənet/",
            "AmE": "/ˈɪntərnet/",
            "definition": "a global computer network for sharing information",
            "examples": [
               "I use the internet.",
               "She found it on the internet.",
               "The internet helps with homework."
            ]
         },
         {
            
            "id": 43,
            "saved": false,
            "word": "into",
            "role": "preposition",
            "BrE": "/ˈɪntə/",
            "AmE": "/ˈɪntə/",
            "definition": "moving towards the inside of something",
            "examples": [
               "I went into the house.",
               "She jumped into the pool.",
               "He put the book into his bag."
            ]
         },
         {
            
            "id": 43,
            "saved": false,
            "word": "it",
            "role": "pronoun",
            "BrE": "/ɪt/",
            "AmE": "/ɪt/",
            "definition": "used to refer to a thing or situation",
            "examples": [
               "It is a nice day.",
               "I found it on the table.",
               "It was raining this morning."
            ]
         },
         {
            
            "id": 43,
            "saved": false,
            "word": "January",
            "role": "noun",
            "BrE": "/ˈdʒænjuəri/",
            "AmE": "/ˈdʒænjuˌeri/",
            "definition": "the first month of the year",
            "examples": [
               "January is cold.",
               "My birthday is in January.",
               "We start school in January."
            ]
         },
         {
            
            "id": 43,
            "saved": false,
            "word": "jeans",
            "role": "noun",
            "BrE": "/dʒiːnz/",
            "AmE": "/dʒiːnz/",
            "definition": "trousers made of strong cotton",
            "examples": [
               "I wear jeans.",
               "Her jeans are blue.",
               "He bought new jeans yesterday."
            ]
         },
         {
            
            "id": 43,
            "saved": false,
            "word": "job",
            "role": "noun",
            "BrE": "/dʒɒb/",
            "AmE": "/dʒɑːb/",
            "definition": "work that you do for money",
            "examples": [
               "I have a job.",
               "She got a new job.",
               "His job is at the bank."
            ]
         },
         {
            
            "id": 43,
            "saved": false,
            "word": "join",
            "role": "verb",
            "BrE": "/dʒɔɪn/",
            "AmE": "/dʒɔɪn/",
            "definition": "to become a member of a group",
            "examples": [
               "I join the club.",
               "She joined the team.",
               "He wants to join the class."
            ]
         },
         {
            
            "id": 43,
            "saved": false,
            "word": "journey",
            "role": "noun",
            "BrE": "/ˈdʒɜːni/",
            "AmE": "/ˈdʒɜːrni/",
            "definition": "a trip from one place to another",
            "examples": [
               "The journey was long.",
               "We enjoyed the train journey.",
               "Her journey to school is short."
            ]
         },
         {
            
            "id": 43,
            "saved": false,
            "word": "July",
            "role": "noun",
            "BrE": "/dʒuˈlaɪ/",
            "AmE": "/dʒuˈlaɪ/",
            "definition": "the seventh month of the year",
            "examples": [
               "July is warm.",
               "We go on holiday in July.",
               "Her birthday is on July 10th."
            ]
         },
         {
            
            "id": 43,
            "saved": false,
            "word": "June",
            "role": "noun",
            "BrE": "/dʒuːn/",
            "AmE": "/dʒuːn/",
            "definition": "the sixth month of the year",
            "examples": [
               "June is sunny.",
               "School ends in June.",
               "We visited the beach in June."
            ]
         },
         {
            
            "id": 43,
            "saved": false,
            "word": "just",
            "role": "adverb",
            "BrE": "/dʒʌst/",
            "AmE": "/dʒʌst/",
            "definition": "exactly or only a moment ago",
            "examples": [
               "I just arrived.",
               "She just finished her work.",
               "It’s just a small problem."
            ]
         },
         {
            
            "id": 44,
            "saved": false,
            "word": "key",
            "role": "noun",
            "BrE": "/kiː/",
            "AmE": "/kiː/",
            "definition": "a piece of metal used to lock or unlock something",
            "examples": [
               "I lost my key.",
               "She found the house key.",
               "The key is on the table."
            ]
         },
         {
            
            "id": 44,
            "saved": false,
            "word": "kind",
            "role": "adjective",
            "BrE": "/kaɪnd/",
            "AmE": "/kaɪnd/",
            "definition": "friendly and helpful",
            "examples": [
               "He is kind.",
               "She was kind to the child.",
               "The kind teacher helped me."
            ]
         },
         {
            
            "id": 44,
            "saved": false,
            "word": "kind",
            "role": "noun",
            "BrE": "/kaɪnd/",
            "AmE": "/kaɪnd/",
            "definition": "a type or sort of something",
            "examples": [
               "What kind of food?",
               "I like this kind of music.",
               "She bought a kind of fruit."
            ]
         },
         {
            
            "id": 44,
            "saved": false,
            "word": "kitchen",
            "role": "noun",
            "BrE": "/ˈkɪtʃɪn/",
            "AmE": "/ˈkɪtʃɪn/",
            "definition": "a room where food is prepared",
            "examples": [
               "I cook in the kitchen.",
               "The kitchen is clean.",
               "She made dinner in the kitchen."
            ]
         },
         {
            
            "id": 44,
            "saved": false,
            "word": "know",
            "role": "verb",
            "BrE": "/nəʊ/",
            "AmE": "/noʊ/",
            "definition": "to have information in your mind",
            "examples": [
               "I know her name.",
               "She knows the answer.",
               "He knows how to drive."
            ]
         },
         {
            
            "id": 44,
            "saved": false,
            "word": "language",
            "role": "noun",
            "BrE": "/ˈlæŋɡwɪdʒ/",
            "AmE": "/ˈlæŋɡwɪdʒ/",
            "definition": "a system of communication using words",
            "examples": [
               "I learn a language.",
               "She speaks two languages.",
               "English is a global language."
            ]
         },
         {
            
            "id": 44,
            "saved": false,
            "word": "large",
            "role": "adjective",
            "BrE": "/lɑːdʒ/",
            "AmE": "/lɑːrdʒ/",
            "definition": "big in size",
            "examples": [
               "The house is large.",
               "He has a large dog.",
               "She bought a large pizza."
            ]
         },
         {
            
            "id": 44,
            "saved": false,
            "word": "last",
            "role": "adjective",
            "BrE": "/lɑːst/",
            "AmE": "/læst/",
            "definition": "most recent or final",
            "examples": [
               "This is my last book.",
               "She was here last week.",
               "The last bus leaves soon."
            ]
         },
         {
            
            "id": 44,
            "saved": false,
            "word": "late",
            "role": "adjective",
            "BrE": "/leɪt/",
            "AmE": "/leɪt/",
            "definition": "happening or arriving after the expected time",
            "examples": [
               "I was late today.",
               "The train is late again.",
               "She arrived late for class."
            ]
         },
         {
            
            "id": 44,
            "saved": false,
            "word": "later",
            "role": "adverb",
            "BrE": "/ˈleɪtə(r)/",
            "AmE": "/ˈleɪtər/",
            "definition": "after the present time",
            "examples": [
               "See you later.",
               "She called me later.",
               "We can talk later today."
            ]
         },
         {
            
            "id": 45,
            "saved": false,
            "word": "learn",
            "role": "verb",
            "BrE": "/lɜːn/",
            "AmE": "/lɜːrn/",
            "definition": "to get knowledge or a skill",
            "examples": [
               "I learn English.",
               "She learned to swim.",
               "He is learning to cook."
            ]
         },
         {
            
            "id": 45,
            "saved": false,
            "word": "leave",
            "role": "verb",
            "BrE": "/liːv/",
            "AmE": "/liːv/",
            "definition": "to go away from a place",
            "examples": [
               "I leave home early.",
               "She left the room quickly.",
               "He leaves for school at seven."
            ]
         },
         {
            
            "id": 45,
            "saved": false,
            "word": "left",
            "role": "adjective",
            "BrE": "/left/",
            "AmE": "/left/",
            "definition": "on or towards the side of the body where the heart is",
            "examples": [
               "My left hand hurts.",
               "Turn left at the corner.",
               "She writes with her left hand."
            ]
         },
         {
            
            "id": 45,
            "saved": false,
            "word": "leg",
            "role": "noun",
            "BrE": "/leɡ/",
            "AmE": "/leɡ/",
            "definition": "the part of the body used for walking",
            "examples": [
               "My leg is strong.",
               "He hurt his leg playing.",
               "The dog has a short leg."
            ]
         },
         {
            
            "id": 45,
            "saved": false,
            "word": "lesson",
            "role": "noun",
            "BrE": "/ˈlesn/",
            "AmE": "/ˈlesn/",
            "definition": "a period of learning or teaching",
            "examples": [
               "I have a lesson.",
               "The lesson was about history.",
               "She attends a piano lesson."
            ]
         },
         {
            
            "id": 45,
            "saved": false,
            "word": "let",
            "role": "verb",
            "BrE": "/let/",
            "AmE": "/let/",
            "definition": "to allow something",
            "examples": [
               "Let me help.",
               "She let him borrow her book.",
               "He lets the dog sleep inside."
            ]
         },
         {
            
            "id": 45,
            "saved": false,
            "word": "letter",
            "role": "noun",
            "BrE": "/ˈletə(r)/",
            "AmE": "/ˈletər/",
            "definition": "a written message sent to someone",
            "examples": [
               "I wrote a letter.",
               "She got a letter from him.",
               "The letter arrived yesterday."
            ]
         },
         {
            
            "id": 45,
            "saved": false,
            "word": "life",
            "role": "noun",
            "BrE": "/laɪf/",
            "AmE": "/laɪf/",
            "definition": "the state of being alive",
            "examples": [
               "Life is beautiful.",
               "She loves her busy life.",
               "His life changed after the trip."
            ]
         },
         {
            
            "id": 45,
            "saved": false,
            "word": "light",
            "role": "adjective",
            "BrE": "/laɪt/",
            "AmE": "/laɪt/",
            "definition": "not heavy; bright",
            "examples": [
               "The bag is light.",
               "The room is light and airy.",
               "She wears light colours."
            ]
         },
         {
            
            "id": 45,
            "saved": false,
            "word": "light",
            "role": "noun",
            "BrE": "/laɪt/",
            "AmE": "/laɪt/",
            "definition": "something that makes things bright",
            "examples": [
               "Turn on the light.",
               "The light is too bright.",
               "She needs a light to read."
            ]
         },
         {
            
            "id": 46,
            "saved": false,
            "word": "like",
            "role": "preposition",
            "BrE": "/laɪk/",
            "AmE": "/laɪk/",
            "definition": "similar to something",
            "examples": [
               "It’s like a game.",
               "She sings like a bird.",
               "This tastes like chocolate."
            ]
         },
         {
            
            "id": 46,
            "saved": false,
            "word": "like",
            "role": "verb",
            "BrE": "/laɪk/",
            "AmE": "/laɪk/",
            "definition": "to enjoy something",
            "examples": [
               "I like to read.",
               "She likes ice cream.",
               "He likes playing football."
            ]
         },
         {
            
            "id": 46,
            "saved": false,
            "word": "listen",
            "role": "verb",
            "BrE": "/ˈlɪsn/",
            "AmE": "/ˈlɪsn/",
            "definition": "to pay attention to sounds",
            "examples": [
               "I listen to music.",
               "She listened to the teacher.",
               "He listens to the radio daily."
            ]
         },
         {
            
            "id": 46,
            "saved": false,
            "word": "little",
            "role": "adjective",
            "BrE": "/ˈlɪtl/",
            "AmE": "/ˈlɪtl/",
            "definition": "small in size or amount",
            "examples": [
               "I have a little dog.",
               "She ate a little cake.",
               "The little boy is happy."
            ]
         },
         {
            
            "id": 46,
            "saved": false,
            "word": "live",
            "role": "verb",
            "BrE": "/lɪv/",
            "AmE": "/lɪv/",
            "definition": "to have your home in a place",
            "examples": [
               "I live in a city.",
               "She lives with her family.",
               "He lived there for two years."
            ]
         },
         {
            
            "id": 46,
            "saved": false,
            "word": "long",
            "role": "adjective",
            "BrE": "/lɒŋ/",
            "AmE": "/lɔːŋ/",
            "definition": "having a great length or time",
            "examples": [
               "The road is long.",
               "Her hair is very long.",
               "The film was too long."
            ]
         },
         {
            
            "id": 46,
            "saved": false,
            "word": "look",
            "role": "verb",
            "BrE": "/lʊk/",
            "AmE": "/lʊk/",
            "definition": "to use your eyes to see",
            "examples": [
               "Look at the bird.",
               "She looked at the book.",
               "He looked out the window."
            ]
         },
         {
            
            "id": 46,
            "saved": false,
            "word": "lose",
            "role": "verb",
            "BrE": "/luːz/",
            "AmE": "/luːz/",
            "definition": "to not be able to find something",
            "examples": [
               "I lose my pen.",
               "She lost her keys again.",
               "He lost his phone at school."
            ]
         },
         {
            
            "id": 46,
            "saved": false,
            "word": "lot",
            "role": "noun",
            "BrE": "/lɒt/",
            "AmE": "/lɑːt/",
            "definition": "a large number or amount",
            "examples": [
               "I have a lot of books.",
               "She eats a lot of fruit.",
               "A lot of people were there."
            ]
         },
         {
            
            "id": 46,
            "saved": false,
            "word": "love",
            "role": "noun",
            "BrE": "/lʌv/",
            "AmE": "/lʌv/",
            "definition": "a strong feeling of affection",
            "examples": [
               "Love is important.",
               "She has love for her family.",
               "His love for music is strong."
            ]
         },
         {
            
            "id": 47,
            "saved": false,
            "word": "love",
            "role": "verb",
            "BrE": "/lʌv/",
            "AmE": "/lʌv/",
            "definition": "to have strong feelings of affection",
            "examples": [
               "I love my dog.",
               "She loves to read books.",
               "He loves his new school."
            ]
         },
         {
            
            "id": 47,
            "saved": false,
            "word": "lunch",
            "role": "noun",
            "BrE": "/lʌntʃ/",
            "AmE": "/lʌntʃ/",
            "definition": "a meal eaten in the middle of the day",
            "examples": [
               "I eat lunch at noon.",
               "Her lunch is a sandwich.",
               "We had lunch at the cafe."
            ]
         },
         {
            
            "id": 47,
            "saved": false,
            "word": "make",
            "role": "verb",
            "BrE": "/meɪk/",
            "AmE": "/meɪk/",
            "definition": "to create or produce something",
            "examples": [
               "I make a cake.",
               "She made a new dress.",
               "He makes toys for kids."
            ]
         },
         {
            
            "id": 47,
            "saved": false,
            "word": "man",
            "role": "noun",
            "BrE": "/mæn/",
            "AmE": "/mæn/",
            "definition": "an adult male person",
            "examples": [
               "The man is tall.",
               "A man helped me today.",
               "She saw a man at the shop."
            ]
         },
         {
            
            "id": 47,
            "saved": false,
            "word": "many",
            "role": "determiner",
            "BrE": "/ˈmeni/",
            "AmE": "/ˈmeni/",
            "definition": "a large number of",
            "examples": [
               "I have many books.",
               "Many people like music.",
               "She has many friends at school."
            ]
         },
         {
            
            "id": 47,
            "saved": false,
            "word": "March",
            "role": "noun",
            "BrE": "/mɑːtʃ/",
            "AmE": "/mɑːrtʃ/",
            "definition": "the third month of the year",
            "examples": [
               "March is rainy.",
               "My birthday is in March.",
               "We have a holiday in March."
            ]
         },
         {
            
            "id": 47,
            "saved": false,
            "word": "market",
            "role": "noun",
            "BrE": "/ˈmɑːkɪt/",
            "AmE": "/ˈmɑːrkɪt/",
            "definition": "a place where people buy and sell things",
            "examples": [
               "I go to the market.",
               "The market sells fruit.",
               "She bought fish at the market."
            ]
         },
         {
            
            "id": 47,
            "saved": false,
            "word": "married",
            "role": "adjective",
            "BrE": "/ˈmærid/",
            "AmE": "/ˈmærid/",
            "definition": "having a husband or wife",
            "examples": [
               "She is married.",
               "They are a married couple.",
               "He got married last year."
            ]
         },
         {
            
            "id": 47,
            "saved": false,
            "word": "May",
            "role": "noun",
            "BrE": "/meɪ/",
            "AmE": "/meɪ/",
            "definition": "the fifth month of the year",
            "examples": [
               "May is warm.",
               "We have a party in May.",
               "Her birthday is on May 15th."
            ]
         },
         {
            
            "id": 47,
            "saved": false,
            "word": "me",
            "role": "pronoun",
            "BrE": "/miː/",
            "AmE": "/miː/",
            "definition": "the person speaking",
            "examples": [
               "Give it to me.",
               "She helped me with homework.",
               "He called me yesterday."
            ]
         },
         {
            
            "id": 48,
            "saved": false,
            "word": "meal",
            "role": "noun",
            "BrE": "/miːl/",
            "AmE": "/miːl/",
            "definition": "food eaten at a particular time",
            "examples": [
               "I eat a meal.",
               "She cooked a big meal.",
               "The meal was delicious."
            ]
         },
         {
            
            "id": 48,
            "saved": false,
            "word": "meat",
            "role": "noun",
            "BrE": "/miːt/",
            "AmE": "/miːt/",
            "definition": "food from the body of an animal",
            "examples": [
               "I eat meat.",
               "She cooked meat for dinner.",
               "The shop sells fresh meat."
            ]
         },
         {
            
            "id": 48,
            "saved": false,
            "word": "meet",
            "role": "verb",
            "BrE": "/miːt/",
            "AmE": "/miːt/",
            "definition": "to see and talk to someone for the first time",
            "examples": [
               "I meet my friend.",
               "She met him at school.",
               "They meet every weekend."
            ]
         },
         {
            
            "id": 48,
            "saved": false,
            "word": "milk",
            "role": "noun",
            "BrE": "/mɪlk/",
            "AmE": "/mɪlk/",
            "definition": "a white liquid from cows or other animals",
            "examples": [
               "I drink milk.",
               "She bought milk at the shop.",
               "The milk is in the fridge."
            ]
         },
         {
            
            "id": 48,
            "saved": false,
            "word": "minute",
            "role": "noun",
            "BrE": "/ˈmɪnɪt/",
            "AmE": "/ˈmɪnɪt/",
            "definition": "a period of 60 seconds",
            "examples": [
               "Wait a minute.",
               "The class is ten minutes long.",
               "She was late by five minutes."
            ]
         },
         {
            
            "id": 48,
            "saved": false,
            "word": "Miss",
            "role": "noun",
            "BrE": "/mɪs/",
            "AmE": "/mɪs/",
            "definition": "a title for an unmarried woman",
            "examples": [
               "Miss Smith is my teacher.",
               "She is called Miss Jones.",
               "Miss Brown teaches English."
            ]
         },
         {
            
            "id": 48,
            "saved": false,
            "word": "mistake",
            "role": "noun",
            "BrE": "/mɪˈsteɪk/",
            "AmE": "/mɪˈsteɪk/",
            "definition": "something that is not correct",
            "examples": [
               "I made a mistake.",
               "Her mistake was small.",
               "He corrected his mistake."
            ]
         },
         {
            
            "id": 48,
            "saved": false,
            "word": "modern",
            "role": "adjective",
            "BrE": "/ˈmɒdn/",
            "AmE": "/ˈmɑːdərn/",
            "definition": "new and using the latest ideas or technology",
            "examples": [
               "The phone is modern.",
               "She lives in a modern house.",
               "The school has modern computers."
            ]
         },
         {
            
            "id": 48,
            "saved": false,
            "word": "Monday",
            "role": "noun",
            "BrE": "/ˈmʌndeɪ/",
            "AmE": "/ˈmʌndeɪ/",
            "definition": "the first day of the week",
            "examples": [
               "Monday is busy.",
               "We start school on Monday.",
               "She has a meeting on Monday."
            ]
         },
         {
            
            "id": 48,
            "saved": false,
            "word": "money",
            "role": "noun",
            "BrE": "/ˈmʌni/",
            "AmE": "/ˈmʌni/",
            "definition": "what you use to buy things",
            "examples": [
               "I have some money.",
               "She spent money on books.",
               "He saved money for a car."
            ]
         },
         {
            
            "id": 49,
            "saved": false,
            "word": "month",
            "role": "noun",
            "BrE": "/mʌnθ/",
            "AmE": "/mʌnθ/",
            "definition": "one of the twelve parts of a year",
            "examples": [
               "This month is July.",
               "She works every month.",
               "The trip is next month."
            ]
         },
         {
            
            "id": 49,
            "saved": false,
            "word": "more",
            "role": "adverb",
            "BrE": "/mɔː(r)/",
            "AmE": "/mɔːr/",
            "definition": "a greater amount or number",
            "examples": [
               "I want more cake.",
               "She needs more time.",
               "He has more books than me."
            ]
         },
         {
            
            "id": 49,
            "saved": false,
            "word": "morning",
            "role": "noun",
            "BrE": "/ˈmɔːnɪŋ/",
            "AmE": "/ˈmɔːrnɪŋ/",
            "definition": "the time of day from midnight to noon",
            "examples": [
               "Good morning!",
               "I run in the morning.",
               "She studies every morning."
            ]
         },
         {
            
            "id": 49,
            "saved": false,
            "word": "mother",
            "role": "noun",
            "BrE": "/ˈmʌðə(r)/",
            "AmE": "/ˈmʌðər/",
            "definition": "a female parent",
            "examples": [
               "My mother is kind.",
               "Her mother cooks well.",
               "The mother helped her child."
            ]
         },
         {
            
            "id": 49,
            "saved": false,
            "word": "mountain",
            "role": "noun",
            "BrE": "/ˈmaʊntən/",
            "AmE": "/ˈmaʊntən/",
            "definition": "a very high hill",
            "examples": [
               "The mountain is tall.",
               "We climbed a mountain.",
               "She saw snow on the mountain."
            ]
         },
         {
            
            "id": 49,
            "saved": false,
            "word": "mouse",
            "role": "noun",
            "BrE": "/maʊs/",
            "AmE": "/maʊs/",
            "definition": "a small animal with a long tail",
            "examples": [
               "I saw a mouse.",
               "The mouse ran fast.",
               "She found a mouse in the house."
            ]
         },
         {
            
            "id": 49,
            "saved": false,
            "word": "mouth",
            "role": "noun",
            "BrE": "/maʊθ/",
            "AmE": "/maʊθ/",
            "definition": "the part of the face used for eating and speaking",
            "examples": [
               "My mouth is dry.",
               "He opened his mouth wide.",
               "She smiled with her mouth."
            ]
         },
         {
            
            "id": 49,
            "saved": false,
            "word": "move",
            "role": "verb",
            "BrE": "/muːv/",
            "AmE": "/muːv/",
            "definition": "to change position or place",
            "examples": [
               "I move the chair.",
               "She moved to a new city.",
               "He moved the table outside."
            ]
         },
         {
            
            "id": 49,
            "saved": false,
            "word": "movie",
            "role": "noun",
            "BrE": "/ˈmuːvi/",
            "AmE": "/ˈmuːvi/",
            "definition": "a story shown on a screen",
            "examples": [
               "I watch a movie.",
               "The movie was funny.",
               "She saw a movie at the cinema."
            ]
         },
         {
            
            "id": 49,
            "saved": false,
            "word": "Mr",
            "role": "noun",
            "BrE": "/ˈmɪstə(r)/",
            "AmE": "/ˈmɪstər/",
            "definition": "a title used before a man’s name",
            "examples": [
               "Mr Smith is my teacher.",
               "She spoke to Mr Brown.",
               "Mr Jones lives next door."
            ]
         },
         {
            
            "id": 50,
            "saved": false,
            "word": "Mrs",
            "role": "noun",
            "BrE": "/ˈmɪsɪz/",
            "AmE": "/ˈmɪsɪz/",
            "definition": "a title used before a married woman’s name",
            "examples": [
               "Mrs Brown is kind.",
               "She is called Mrs Wilson.",
               "Mrs Lee teaches math."
            ]
         },
         {
            
            "id": 50,
            "saved": false,
            "word": "much",
            "role": "adverb",
            "BrE": "/mʌtʃ/",
            "AmE": "/mʌtʃ/",
            "definition": "a large amount",
            "examples": [
               "I don’t eat much.",
               "She likes him very much.",
               "He doesn’t talk much."
            ]
         },
         {
            
            "id": 50,
            "saved": false,
            "word": "mum",
            "role": "noun",
            "BrE": "/mʌm/",
            "AmE": "/mʌm/",
            "definition": "a mother",
            "examples": [
               "My mum is at home.",
               "Her mum bakes cakes.",
               "Mum helped me with my project."
            ]
         },
         {
            
            "id": 50,
            "saved": false,
            "word": "museum",
            "role": "noun",
            "BrE": "/mjuˈziːəm/",
            "AmE": "/mjuˈziːəm/",
            "definition": "a place where old or important things are shown",
            "examples": [
               "We visited a museum.",
               "The museum has old art.",
               "She works in the city museum."
            ]
         },
         {
            
            "id": 50,
            "saved": false,
            "word": "music",
            "role": "noun",
            "BrE": "/ˈmjuːzɪk/",
            "AmE": "/ˈmjuːzɪk/",
            "definition": "sounds arranged in a way that is pleasant to hear",
            "examples": [
               "I like music.",
               "She plays music at home.",
               "The music at the party was loud."
            ]
         },
         {
            
            "id": 50,
            "saved": false,
            "word": "my",
            "role": "determiner",
            "BrE": "/maɪ/",
            "AmE": "/maɪ/",
            "definition": "belonging to the person speaking",
            "examples": [
               "My book is new.",
               "This is my favourite song.",
               "My house is near the park."
            ]
         },
         {
            
            "id": 50,
            "saved": false,
            "word": "name",
            "role": "noun",
            "BrE": "/neɪm/",
            "AmE": "/neɪm/",
            "definition": "the word or words that a person or thing is called",
            "examples": [
               "My name is Anna.",
               "What’s the name of the dog?",
               "She wrote her name on the book."
            ]
         },
         {
            
            "id": 50,
            "saved": false,
            "word": "near",
            "role": "preposition",
            "BrE": "/nɪə(r)/",
            "AmE": "/nɪr/",
            "definition": "not far from something",
            "examples": [
               "I live near the school.",
               "The shop is near my house.",
               "She sat near the window."
            ]
         },
         {
            
            "id": 50,
            "saved": false,
            "word": "need",
            "role": "verb",
            "BrE": "/niːd/",
            "AmE": "/niːd/",
            "definition": "to want something because it is necessary",
            "examples": [
               "I need water.",
               "She needs a new pen.",
               "He needs to finish his work."
            ]
         },
         {
            
            "id": 50,
            "saved": false,
            "word": "never",
            "role": "adverb",
            "BrE": "/ˈnevə(r)/",
            "AmE": "/ˈnevər/",
            "definition": "not at any time",
            "examples": [
               "I never eat meat.",
               "She never goes to bed late.",
               "He has never seen snow."
            ]
         },
         
         {
            
            "id": 51,
            "saved": false,
            "word": "new",
            "role": "adjective",
            "BrE": "/njuː/",
            "AmE": "/nuː/",
            "definition": "not old or used",
            "examples": [
               "I have a new book.",
               "She bought a new dress.",
               "His new phone is very fast."
            ]
         },
         {
            
            "id": 51,
            "saved": false,
            "word": "news",
            "role": "noun",
            "BrE": "/njuːz/",
            "AmE": "/nuːz/",
            "definition": "information about recent events",
            "examples": [
               "I watch the news.",
               "The news was interesting.",
               "She heard good news today."
            ]
         },
         {
            
            "id": 51,
            "saved": false,
            "word": "next",
            "role": "adjective",
            "BrE": "/nekst/",
            "AmE": "/nekst/",
            "definition": "coming after this one",
            "examples": [
               "The next day is Tuesday.",
               "She’s in the next room.",
               "The next bus arrives soon."
            ]
         },
         {
            
            "id": 51,
            "saved": false,
            "word": "nice",
            "role": "adjective",
            "BrE": "/naɪs/",
            "AmE": "/naɪs/",
            "definition": "pleasant or kind",
            "examples": [
               "She is nice.",
               "The weather is nice today.",
               "He gave me a nice gift."
            ]
         },
         {
            
            "id": 51,
            "saved": false,
            "word": "night",
            "role": "noun",
            "BrE": "/naɪt/",
            "AmE": "/naɪt/",
            "definition": "the time when it is dark outside",
            "examples": [
               "I sleep at night.",
               "The stars shine at night.",
               "She stayed up late last night."
            ]
         },
         {
            
            "id": 51,
            "saved": false,
            "word": "nine",
            "role": "number",
            "BrE": "/naɪn/",
            "AmE": "/naɪn/",
            "definition": "the number 9",
            "examples": [
               "I have nine pens.",
               "She is nine years old.",
               "Nine students are in the class."
            ]
         },
         {
            
            "id": 51,
            "saved": false,
            "word": "nineteen",
            "role": "number",
            "BrE": "/ˌnaɪnˈtiːn/",
            "AmE": "/ˌnaɪnˈtiːn/",
            "definition": "the number 19",
            "examples": [
               "He is nineteen.",
               "I bought nineteen apples.",
               "Nineteen people came to the party."
            ]
         },
         {
            
            "id": 51,
            "saved": false,
            "word": "ninety",
            "role": "number",
            "BrE": "/ˈnaɪnti/",
            "AmE": "/ˈnaɪnti/",
            "definition": "the number 90",
            "examples": [
               "She is ninety years old.",
               "The shop has ninety items.",
               "Ninety students joined the club."
            ]
         },
         {
            
            "id": 51,
            "saved": false,
            "word": "no",
            "role": "exclamation",
            "BrE": "/nəʊ/",
            "AmE": "/noʊ/",
            "definition": "used to give a negative answer",
            "examples": [
               "No, I don’t want it.",
               "She said no to the question.",
               "No, he can’t come today."
            ]
         },
         {
            
            "id": 51,
            "saved": false,
            "word": "nobody",
            "role": "pronoun",
            "BrE": "/ˈnəʊbədi/",
            "AmE": "/ˈnoʊbədi/",
            "definition": "no person",
            "examples": [
               "Nobody is here.",
               "Nobody saw the cat.",
               "Nobody answered the phone."
            ]
         },
         {
            
            "id": 52,
            "saved": false,
            "word": "north",
            "role": "noun",
            "BrE": "/nɔːθ/",
            "AmE": "/nɔːrθ/",
            "definition": "the direction towards the top of a map",
            "examples": [
               "The north is cold.",
               "We live in the north.",
               "The sun rises far from the north."
            ]
         },
         {
            
            "id": 52,
            "saved": false,
            "word": "north",
            "role": "adjective",
            "BrE": "/nɔːθ/",
            "AmE": "/nɔːrθ/",
            "definition": "in or towards the north",
            "examples": [
               "The north wind is cold.",
               "She lives in north London.",
               "The north side of the house is cool."
            ]
         },
         {
            
            "id": 52,
            "saved": false,
            "word": "north",
            "role": "adverb",
            "BrE": "/nɔːθ/",
            "AmE": "/nɔːrθ/",
            "definition": "towards the north",
            "examples": [
               "We traveled north.",
               "The birds fly north.",
               "She looked north to see the mountains."
            ]
         },
         {
            
            "id": 52,
            "saved": false,
            "word": "nose",
            "role": "noun",
            "BrE": "/nəʊz/",
            "AmE": "/noʊz/",
            "definition": "the part of the face used for smelling",
            "examples": [
               "My nose is cold.",
               "She touched her nose.",
               "The dog’s nose is wet."
            ]
         },
         {
            
            "id": 52,
            "saved": false,
            "word": "not",
            "role": "adverb",
            "BrE": "/nɒt/",
            "AmE": "/nɑːt/",
            "definition": "used to make a sentence negative",
            "examples": [
               "I am not tired.",
               "She does not like tea.",
               "He’s not coming to the party."
            ]
         },
         {
            
            "id": 52,
            "saved": false,
            "word": "nothing",
            "role": "pronoun",
            "BrE": "/ˈnʌθɪŋ/",
            "AmE": "/ˈnʌθɪŋ/",
            "definition": "not anything",
            "examples": [
               "Nothing is here.",
               "I found nothing in the box.",
               "She said nothing about it."
            ]
         },
         {
            
            "id": 52,
            "saved": false,
            "word": "November",
            "role": "noun",
            "BrE": "/nəʊˈvembə(r)/",
            "AmE": "/noʊˈvembər/",
            "definition": "the eleventh month of the year",
            "examples": [
               "November is cool.",
               "My birthday is in November.",
               "We have a holiday in November."
            ]
         },
         {
            
            "id": 52,
            "saved": false,
            "word": "now",
            "role": "adverb",
            "BrE": "/naʊ/",
            "AmE": "/naʊ/",
            "definition": "at the present time",
            "examples": [
               "I am busy now.",
               "She is here now.",
               "Let’s start the game now."
            ]
         },
         {
            
            "id": 52,
            "saved": false,
            "word": "number",
            "role": "noun",
            "BrE": "/ˈnʌmbə(r)/",
            "AmE": "/ˈnʌmbər/",
            "definition": "a word or symbol that shows amount or position",
            "examples": [
               "My number is ten.",
               "Her phone number is new.",
               "The number of students is twenty."
            ]
         },
         {
            
            "id": 52,
            "saved": false,
            "word": "October",
            "role": "noun",
            "BrE": "/ɒkˈtəʊbə(r)/",
            "AmE": "/ɑːkˈtoʊbər/",
            "definition": "the tenth month of the year",
            "examples": [
               "October is autumn.",
               "We have a party in October.",
               "Her birthday is on October 5th."
            ]
         },
         {
            
            "id": 53,
            "saved": false,
            "word": "of",
            "role": "preposition",
            "BrE": "/əv/",
            "AmE": "/əv/",
            "definition": "used to show possession or connection",
            "examples": [
               "The book of mine.",
               "She is a friend of his.",
               "The colour of the car is red."
            ]
         },
         {
            
            "id": 53,
            "saved": false,
            "word": "off",
            "role": "adverb",
            "BrE": "/ɒf/",
            "AmE": "/ɔːf/",
            "definition": "away from a place or thing",
            "examples": [
               "The light is off.",
               "She took her hat off.",
               "He fell off the chair."
            ]
         },
         {
            
            "id": 53,
            "saved": false,
            "word": "often",
            "role": "adverb",
            "BrE": "/ˈɒfn/",
            "AmE": "/ˈɔːfn/",
            "definition": "many times",
            "examples": [
               "I often read.",
               "She often visits her friend.",
               "He often plays football."
            ]
         },
         {
            
            "id": 53,
            "saved": false,
            "word": "old",
            "role": "adjective",
            "BrE": "/əʊld/",
            "AmE": "/oʊld/",
            "definition": "having lived or existed for a long time",
            "examples": [
               "The house is old.",
               "He has an old car.",
               "She found an old book."
            ]
         },
         {
            
            "id": 53,
            "saved": false,
            "word": "on",
            "role": "preposition",
            "BrE": "/ɒn/",
            "AmE": "/ɑːn/",
            "definition": "touching the surface of something",
            "examples": [
               "The book is on the table.",
               "She has a hat on her head.",
               "The picture is on the wall."
            ]
         },
         {
            
            "id": 53,
            "saved": false,
            "word": "once",
            "role": "adverb",
            "BrE": "/wʌns/",
            "AmE": "/wʌns/",
            "definition": "one time only",
            "examples": [
               "I went once.",
               "She called me once.",
               "He visited once last year."
            ]
         },
         {
            
            "id": 53,
            "saved": false,
            "word": "one",
            "role": "number",
            "BrE": "/wʌn/",
            "AmE": "/wʌn/",
            "definition": "the number 1",
            "examples": [
               "I have one book.",
               "She bought one apple.",
               "One student is absent."
            ]
         },
         {
            
            "id": 53,
            "saved": false,
            "word": "only",
            "role": "adverb",
            "BrE": "/ˈəʊnli/",
            "AmE": "/ˈoʊnli/",
            "definition": "no one or nothing else",
            "examples": [
               "Only I am here.",
               "She only likes tea.",
               "He only has one pen."
            ]
         },
         {
            
            "id": 53,
            "saved": false,
            "word": "open",
            "role": "adjective",
            "BrE": "/ˈəʊpən/",
            "AmE": "/ˈoʊpən/",
            "definition": "not closed",
            "examples": [
               "The door is open.",
               "The shop is open now.",
               "She left the window open."
            ]
         },
         {
            
            "id": 53,
            "saved": false,
            "word": "open",
            "role": "verb",
            "BrE": "/ˈəʊpən/",
            "AmE": "/ˈoʊpən/",
            "definition": "to make something not closed",
            "examples": [
               "I open the door.",
               "She opened her book.",
               "He opens the shop every morning."
            ]
         },
         {
            
            "id": 54,
            "saved": false,
            "word": "or",
            "role": "conjunction",
            "BrE": "/ɔː(r)/",
            "AmE": "/ɔːr/",
            "definition": "used to show a choice between things",
            "examples": [
               "Tea or coffee?",
               "Do you want this or that?",
               "She can come or stay home."
            ]
         },
         {
            
            "id": 54,
            "saved": false,
            "word": "orange",
            "role": "noun",
            "BrE": "/ˈɒrɪndʒ/",
            "AmE": "/ˈɔːrɪndʒ/",
            "definition": "a fruit or the colour of that fruit",
            "examples": [
               "I eat an orange.",
               "Her dress is orange.",
               "The orange is sweet."
            ]
         },
         {
            
            "id": 54,
            "saved": false,
            "word": "our",
            "role": "determiner",
            "BrE": "/aʊə(r)/",
            "AmE": "/aʊr/",
            "definition": "belonging to us",
            "examples": [
               "This is our house.",
               "Our dog is playful.",
               "Our teacher is kind."
            ]
         },
         {
            
            "id": 54,
            "saved": false,
            "word": "out",
            "role": "adverb",
            "BrE": "/aʊt/",
            "AmE": "/aʊt/",
            "definition": "away from the inside of a place",
            "examples": [
               "Go out now.",
               "She ran out of the room.",
               "He took the dog out."
            ]
         },
         {
            
            "id": 54,
            "saved": false,
            "word": "over",
            "role": "preposition",
            "BrE": "/ˈəʊvə(r)/",
            "AmE": "/ˈoʊvər/",
            "definition": "above or across something",
            "examples": [
               "The bird flew over.",
               "She jumped over the wall.",
               "The bridge is over the river."
            ]
         },
         {
            
            "id": 54,
            "saved": false,
            "word": "page",
            "role": "noun",
            "BrE": "/peɪdʒ/",
            "AmE": "/peɪdʒ/",
            "definition": "one side of a piece of paper in a book",
            "examples": [
               "Read page ten.",
               "She wrote on the page.",
               "The book has a torn page."
            ]
         },
         {
            
            "id": 54,
            "saved": false,
            "word": "paint",
            "role": "verb",
            "BrE": "/peɪnt/",
            "AmE": "/peɪnt/",
            "definition": "to put colour on something using a brush",
            "examples": [
               "I paint a picture.",
               "She painted the wall blue.",
               "He paints houses for a job."
            ]
         },
         {
            
            "id": 54,
            "saved": false,
            "word": "painting",
            "role": "noun",
            "BrE": "/ˈpeɪntɪŋ/",
            "AmE": "/ˈpeɪntɪŋ/",
            "definition": "a picture made with paint",
            "examples": [
               "The painting is beautiful.",
               "She made a painting of a tree.",
               "His painting is in the museum."
            ]
         },
         {
            
            "id": 54,
            "saved": false,
            "word": "pair",
            "role": "noun",
            "BrE": "/peə(r)/",
            "AmE": "/per/",
            "definition": "two things that go together",
            "examples": [
               "I have a pair of shoes.",
               "She bought a pair of socks.",
               "The pair of gloves is new."
            ]
         },
         {
            
            "id": 54,
            "saved": false,
            "word": "paper",
            "role": "noun",
            "BrE": "/ˈpeɪpə(r)/",
            "AmE": "/ˈpeɪpər/",
            "definition": "material used for writing or drawing",
            "examples": [
               "I write on paper.",
               "She drew on a paper.",
               "The paper is white and clean."
            ]
         },
         {
            
            "id": 55,
            "saved": false,
            "word": "parent",
            "role": "noun",
            "BrE": "/ˈpeərənt/",
            "AmE": "/ˈperənt/",
            "definition": "a mother or father",
            "examples": [
               "My parent is kind.",
               "Her parents are teachers.",
               "The parent helped with homework."
            ]
         },
         {
            
            "id": 55,
            "saved": false,
            "word": "park",
            "role": "noun",
            "BrE": "/pɑːk/",
            "AmE": "/pɑːrk/",
            "definition": "a public area with grass and trees",
            "examples": [
               "I play in the park.",
               "The park is near my house.",
               "She walks her dog in the park."
            ]
         },
         {
            
            "id": 55,
            "saved": false,
            "word": "part",
            "role": "noun",
            "BrE": "/pɑːt/",
            "AmE": "/pɑːrt/",
            "definition": "one of the pieces of something",
            "examples": [
               "This is a part of the book.",
               "She ate part of the cake.",
               "He fixed a part of the car."
            ]
         },
         {
            
            "id": 55,
            "saved": false,
            "word": "party",
            "role": "noun",
            "BrE": "/ˈpɑːti/",
            "AmE": "/ˈpɑːrti/",
            "definition": "a social event with food and music",
            "examples": [
               "I go to a party.",
               "The party was fun.",
               "She invited me to her party."
            ]
         },
         {
            
            "id": 55,
            "saved": false,
            "word": "past",
            "role": "preposition",
            "BrE": "/pɑːst/",
            "AmE": "/pæst/",
            "definition": "beyond a point in time or place",
            "examples": [
               "It’s past six.",
               "She walked past the shop.",
               "The bus went past the school."
            ]
         },
         {
            
            "id": 55,
            "saved": false,
            "word": "pay",
            "role": "verb",
            "BrE": "/peɪ/",
            "AmE": "/peɪ/",
            "definition": "to give money for something",
            "examples": [
               "I pay for food.",
               "She paid for the book.",
               "He pays his bills online."
            ]
         },
         {
            
            "id": 55,
            "saved": false,
            "word": "pen",
            "role": "noun",
            "BrE": "/pen/",
            "AmE": "/pen/",
            "definition": "a tool for writing with ink",
            "examples": [
               "I write with a pen.",
               "Her pen is blue.",
               "He lost his pen at school."
            ]
         },
         {
            
            "id": 55,
            "saved": false,
            "word": "pencil",
            "role": "noun",
            "BrE": "/ˈpensl/",
            "AmE": "/ˈpensl/",
            "definition": "a tool for writing or drawing with a lead",
            "examples": [
               "I use a pencil.",
               "She sharpened her pencil.",
               "The pencil is on the desk."
            ]
         },
         {
            
            "id": 55,
            "saved": false,
            "word": "people",
            "role": "noun",
            "BrE": "/ˈpiːpl/",
            "AmE": "/ˈpiːpl/",
            "definition": "more than one person",
            "examples": [
               "People are kind.",
               "Many people came to the park.",
               "She helps people in her job."
            ]
         },
         {
            
            "id": 55,
            "saved": false,
            "word": "person",
            "role": "noun",
            "BrE": "/ˈpɜːsn/",
            "AmE": "/ˈpɜːrsn/",
            "definition": "a human being",
            "examples": [
               "He is a nice person.",
               "She met a person at the shop.",
               "That person helped me."
            ]
         },
         {
            
            "id": 56,
            "saved": false,
            "word": "phone",
            "role": "noun",
            "BrE": "/fəʊn/",
            "AmE": "/foʊn/",
            "definition": "a device for talking to people far away",
            "examples": [
               "I use my phone.",
               "Her phone is new.",
               "He left his phone at home."
            ]
         },
         {
            
            "id": 56,
            "saved": false,
            "word": "photo",
            "role": "noun",
            "BrE": "/ˈfəʊtəʊ/",
            "AmE": "/ˈfoʊtoʊ/",
            "definition": "a picture taken with a camera",
            "examples": [
               "I took a photo.",
               "She showed me a photo.",
               "The photo is of her dog."
            ]
         },
         {
            
            "id": 56,
            "saved": false,
            "word": "piano",
            "role": "noun",
            "BrE": "/piˈænəʊ/",
            "AmE": "/piˈænoʊ/",
            "definition": "a musical instrument with keys",
            "examples": [
               "I play the piano.",
               "Her piano is old.",
               "He had a piano lesson."
            ]
         },
         {
            
            "id": 56,
            "saved": false,
            "word": "picture",
            "role": "noun",
            "BrE": "/ˈpɪktʃə(r)/",
            "AmE": "/ˈpɪktʃər/",
            "definition": "an image, drawing, or photograph",
            "examples": [
               "I drew a picture.",
               "The picture is on the wall.",
               "She took a picture of the tree."
            ]
         },
         {
            
            "id": 56,
            "saved": false,
            "word": "place",
            "role": "noun",
            "BrE": "/pleɪs/",
            "AmE": "/pleɪs/",
            "definition": "a particular area or position",
            "examples": [
               "This is a nice place.",
               "She visited a new place.",
               "The place was quiet and calm."
            ]
         },
         {
            
            "id": 56,
            "saved": false,
            "word": "play",
            "role": "verb",
            "BrE": "/pleɪ/",
            "AmE": "/pleɪ/",
            "definition": "to take part in a game or activity",
            "examples": [
               "I play football.",
               "She plays with her dog.",
               "He played chess with his friend."
            ]
         },
         {
            
            "id": 56,
            "saved": false,
            "word": "player",
            "role": "noun",
            "BrE": "/ˈpleɪə(r)/",
            "AmE": "/ˈpleɪər/",
            "definition": "a person who plays a game or sport",
            "examples": [
               "He is a good player.",
               "The player scored a goal.",
               "She’s a great tennis player."
            ]
         },
         {
            
            "id": 56,
            "saved": false,
            "word": "please",
            "role": "exclamation",
            "BrE": "/pliːz/",
            "AmE": "/pliːz/",
            "definition": "used to make a polite request",
            "examples": [
               "Please, help me.",
               "Can you please open the door?",
               "Please come to the party."
            ]
         },
         {
            
            "id": 56,
            "saved": false,
            "word": "point",
            "role": "noun",
            "BrE": "/pɔɪnt/",
            "AmE": "/pɔɪnt/",
            "definition": "a particular place or idea",
            "examples": [
               "This is the point.",
               "She made a good point.",
               "The meeting point is the park."
            ]
         },
         {
            
            "id": 56,
            "saved": false,
            "word": "police",
            "role": "noun",
            "BrE": "/pəˈliːs/",
            "AmE": "/pəˈliːs/",
            "definition": "people who keep law and order",
            "examples": [
               "The police are here.",
               "She called the police.",
               "The police helped the lost child."
            ]
         },
         {
            
            "id": 57,
            "saved": false,
            "word": "poor",
            "role": "adjective",
            "BrE": "/pɔː(r)/",
            "AmE": "/pʊr/",
            "definition": "having little money or being of low quality",
            "examples": [
               "He is poor.",
               "The poor dog was hungry.",
               "She had a poor score on the test."
            ]
         },
         {
            
            "id": 57,
            "saved": false,
            "word": "possible",
            "role": "adjective",
            "BrE": "/ˈpɒsəbl/",
            "AmE": "/ˈpɑːsəbl/",
            "definition": "able to happen or be done",
            "examples": [
               "It is possible.",
               "She found a possible answer.",
               "Is it possible to come early?"
            ]
         },
         {
            
            "id": 57,
            "saved": false,
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
            
            "id": 57,
            "saved": false,
            "word": "pretty",
            "role": "adjective",
            "BrE": "/ˈprɪti/",
            "AmE": "/ˈprɪti/",
            "definition": "attractive in a pleasant way",
            "examples": [
               "The flower is pretty.",
               "She wore a pretty dress.",
               "The park looks pretty today."
            ]
         },
         {
            
            "id": 57,
            "saved": false,
            "word": "price",
            "role": "noun",
            "BrE": "/praɪs/",
            "AmE": "/praɪs/",
            "definition": "the amount of money needed to buy something",
            "examples": [
               "The price is high.",
               "She checked the price of the book.",
               "The price of the ticket is low."
            ]
         },
         {
            
            "id": 57,
            "saved": false,
            "word": "problem",
            "role": "noun",
            "BrE": "/ˈprɒbləm/",
            "AmE": "/ˈprɑːbləm/",
            "definition": "something that causes difficulty",
            "examples": [
               "I have a problem.",
               "She solved the math problem.",
               "The problem was hard to fix."
            ]
         },
         {
            
            "id": 57,
            "saved": false,
            "word": "programme",
            "role": "noun",
            "BrE": "/ˈprəʊɡræm/",
            "AmE": "/ˈproʊɡræm/",
            "definition": "a plan or a show on television or radio",
            "examples": [
               "I watch a programme.",
               "The programme was funny.",
               "She likes science programmes."
            ]
         },
         {
            
            "id": 57,
            "saved": false,
            "word": "put",
            "role": "verb",
            "BrE": "/pʊt/",
            "AmE": "/pʊt/",
            "definition": "to place something somewhere",
            "examples": [
               "I put the book down.",
               "She put her bag on the table.",
               "He puts his shoes by the door."
            ]
         },
         {
            
            "id": 57,
            "saved": false,
            "word": "question",
            "role": "noun",
            "BrE": "/ˈkwestʃən/",
            "AmE": "/ˈkwestʃən/",
            "definition": "something you ask",
            "examples": [
               "I have a question.",
               "She asked a question in class.",
               "The question was about the book."
            ]
         },
         {
            
            "id": 57,
            "saved": false,
            "word": "quick",
            "role": "adjective",
            "BrE": "/kwɪk/",
            "AmE": "/kwɪk/",
            "definition": "fast or taking little time",
            "examples": [
               "He is quick.",
               "She gave a quick answer.",
               "The quick fox ran away."
            ]
         },
         {
            
            "id": 58,
            "saved": false,
            "word": "quiet",
            "role": "adjective",
            "BrE": "/ˈkwaɪət/",
            "AmE": "/ˈkwaɪət/",
            "definition": "making little or no noise",
            "examples": [
               "The room is quiet.",
               "She has a quiet voice.",
               "The quiet forest was peaceful."
            ]
         },
         {
            
            "id": 58,
            "saved": false,
            "word": "radio",
            "role": "noun",
            "BrE": "/ˈreɪdiəʊ/",
            "AmE": "/ˈreɪdioʊ/",
            "definition": "a device for listening to music or news",
            "examples": [
               "I listen to the radio.",
               "The radio plays music.",
               "She turned on the radio."
            ]
         },
         {
            
            "id": 58,
            "saved": false,
            "word": "rain",
            "role": "noun",
            "BrE": "/reɪn/",
            "AmE": "/reɪn/",
            "definition": "water falling from the sky",
            "examples": [
               "It’s rain outside.",
               "The rain is heavy today.",
               "She got wet in the rain."
            ]
         },
         {
            
            "id": 58,
            "saved": false,
            "word": "read",
            "role": "verb",
            "BrE": "/riːd/",
            "AmE": "/riːd/",
            "definition": "to look at and understand words",
            "examples": [
               "I read a book.",
               "She reads every day.",
               "He read the letter carefully."
            ]
         },
         {
            
            "id": 58,
            "saved": false,
            "word": "ready",
            "role": "adjective",
            "BrE": "/ˈredi/",
            "AmE": "/ˈredi/",
            "definition": "prepared for something",
            "examples": [
               "I am ready.",
               "She is ready for school.",
               "The food is ready to eat."
            ]
         },
         {
            
            "id": 58,
            "saved": false,
            "word": "red",
            "role": "adjective",
            "BrE": "/red/",
            "AmE": "/red/",
            "definition": "having the colour of blood",
            "examples": [
               "The apple is red.",
               "She has a red bag.",
               "His red car is new."
            ]
         },
         {
            
            "id": 58,
            "saved": false,
            "word": "red",
            "role": "noun",
            "BrE": "/red/",
            "AmE": "/red/",
            "definition": "the colour of blood",
            "examples": [
               "Red is bright.",
               "She painted the wall red.",
               "I like red for my shirt."
            ]
         },
         {
            
            "id": 58,
            "saved": false,
            "word": "remember",
            "role": "verb",
            "BrE": "/rɪˈmembə(r)/",
            "AmE": "/rɪˈmembər/",
            "definition": "to keep something in your mind",
            "examples": [
               "I remember her name.",
               "She remembered the story.",
               "He remembers his old school."
            ]
         },
         {
            
            "id": 58,
            "saved": false,
            "word": "restaurant",
            "role": "noun",
            "BrE": "/ˈrestrɒnt/",
            "AmE": "/ˈrestərənt/",
            "definition": "a place where you can buy and eat meals",
            "examples": [
               "We eat at a restaurant.",
               "The restaurant is busy.",
               "She works in a restaurant."
            ]
         },
         {
            
            "id": 58,
            "saved": false,
            "word": "rice",
            "role": "noun",
            "BrE": "/raɪs/",
            "AmE": "/raɪs/",
            "definition": "small grains used as food",
            "examples": [
               "I eat rice.",
               "She cooked rice for dinner.",
               "The rice is in the bowl."
            ]
         },
         {
            
            "id": 59,
            "saved": false,
            "word": "rich",
            "role": "adjective",
            "BrE": "/rɪtʃ/",
            "AmE": "/rɪtʃ/",
            "definition": "having a lot of money",
            "examples": [
               "He is rich.",
               "She lives in a rich area.",
               "The rich man bought a car."
            ]
         },
         {
            
            "id": 59,
            "saved": false,
            "word": "right",
            "role": "adjective",
            "BrE": "/raɪt/",
            "AmE": "/raɪt/",
            "definition": "correct or on the side of the body opposite to left",
            "examples": [
               "The answer is right.",
               "Turn right at the corner.",
               "She writes with her right hand."
            ]
         },
         {
            
            "id": 59,
            "saved": false,
            "word": "right",
            "role": "adverb",
            "BrE": "/raɪt/",
            "AmE": "/raɪt/",
            "definition": "correctly or towards the right side",
            "examples": [
               "I did it right.",
               "Look right before crossing.",
               "She turned right at the shop."
            ]
         },
         {
            
            "id": 59,
            "saved": false,
            "word": "river",
            "role": "noun",
            "BrE": "/ˈrɪvə(r)/",
            "AmE": "/ˈrɪvər/",
            "definition": "a large flow of water",
            "examples": [
               "The river is wide.",
               "She swam in the river.",
               "The river flows through the town."
            ]
         },
         {
            
            "id": 59,
            "saved": false,
            "word": "road",
            "role": "noun",
            "BrE": "/rəʊd/",
            "AmE": "/roʊd/",
            "definition": "a way for vehicles and people to travel",
            "examples": [
               "The road is long.",
               "She lives on this road.",
               "The road to school is busy."
            ]
         },
         {
            
            "id": 59,
            "saved": false,
            "word": "room",
            "role": "noun",
            "BrE": "/ruːm/",
            "AmE": "/ruːm/",
            "definition": "a part of a building with walls",
            "examples": [
               "My room is big.",
               "She cleaned her room.",
               "The room has a big window."
            ]
         },
         {
            
            "id": 59,
            "saved": false,
            "word": "run",
            "role": "verb",
            "BrE": "/rʌn/",
            "AmE": "/rʌn/",
            "definition": "to move quickly on your feet",
            "examples": [
               "I run in the park.",
               "She runs every morning.",
               "He ran to catch the bus."
            ]
         },
         {
            
            "id": 59,
            "saved": false,
            "word": "sad",
            "role": "adjective",
            "BrE": "/sæd/",
            "AmE": "/sæd/",
            "definition": "feeling unhappy",
            "examples": [
               "I am sad today.",
               "She was sad about the news.",
               "The sad story made her cry."
            ]
         },
         {
            
            "id": 59,
            "saved": false,
            "word": "same",
            "role": "adjective",
            "BrE": "/seɪm/",
            "AmE": "/seɪm/",
            "definition": "not different",
            "examples": [
               "We have the same book.",
               "She wears the same dress.",
               "They live in the same town."
            ]
         },
         {
            
            "id": 59,
            "saved": false,
            "word": "Saturday",
            "role": "noun",
            "BrE": "/ˈsætədeɪ/",
            "AmE": "/ˈsætərdeɪ/",
            "definition": "the sixth day of the week",
            "examples": [
               "Saturday is fun.",
               "We play on Saturday.",
               "She visits her friend on Saturday."
            ]
         },
         {
            
            "id": 60,
            "saved": false,
            "word": "say",
            "role": "verb",
            "BrE": "/seɪ/",
            "AmE": "/seɪ/",
            "definition": "to speak or tell something",
            "examples": [
               "I say hello.",
               "She said her name.",
               "He says he is tired."
            ]
         },
         {
            
            "id": 60,
            "saved": false,
            "word": "school",
            "role": "noun",
            "BrE": "/skuːl/",
            "AmE": "/skuːl/",
            "definition": "a place where children learn",
            "examples": [
               "I go to school.",
               "Her school is big.",
               "The school has a new teacher."
            ]
         },
         {
            
            "id": 60,
            "saved": false,
            "word": "sea",
            "role": "noun",
            "BrE": "/siː/",
            "AmE": "/siː/",
            "definition": "a large area of water",
            "examples": [
               "The sea is blue.",
               "She swam in the sea.",
               "We saw fish in the sea."
            ]
         },
         {
            
            "id": 60,
            "saved": false,
            "word": "second",
            "role": "adjective",
            "BrE": "/ˈsekənd/",
            "AmE": "/ˈsekənd/",
            "definition": "coming after the first",
            "examples": [
               "This is the second book.",
               "She came in second place.",
               "The second day was sunny."
            ]
         },
         {
            
            "id": 60,
            "saved": false,
            "word": "see",
            "role": "verb",
            "BrE": "/siː/",
            "AmE": "/siː/",
            "definition": "to notice with your eyes",
            "examples": [
               "I see a bird.",
               "She saw a movie.",
               "He sees his friend every day."
            ]
         },
         {
            
            "id": 60,
            "saved": false,
            "word": "sell",
            "role": "verb",
            "BrE": "/sel/",
            "AmE": "/sel/",
            "definition": "to give something for money",
            "examples": [
               "I sell my book.",
               "She sells fruit at the market.",
               "He sold his old phone."
            ]
         },
         {
            
            "id": 60,
            "saved": false,
            "word": "send",
            "role": "verb",
            "BrE": "/send/",
            "AmE": "/send/",
            "definition": "to make something go to another place",
            "examples": [
               "I send a letter.",
               "She sent an email.",
               "He sends a gift every year."
            ]
         },
         {
            
            "id": 60,
            "saved": false,
            "word": "September",
            "role": "noun",
            "BrE": "/sepˈtembə(r)/",
            "AmE": "/sepˈtembər/",
            "definition": "the ninth month of the year",
            "examples": [
               "September is cool.",
               "School starts in September.",
               "Her birthday is on September 20th."
            ]
         },
         {
            
            "id": 60,
            "saved": false,
            "word": "seven",
            "role": "number",
            "BrE": "/ˈsevn/",
            "AmE": "/ˈsevn/",
            "definition": "the number 7",
            "examples": [
               "I have seven books.",
               "She is seven years old.",
               "Seven students are in the room."
            ]
         },
         {
            
            "id": 60,
            "saved": false,
            "word": "seventeen",
            "role": "number",
            "BrE": "/ˌsevənˈtiːn/",
            "AmE": "/ˌsevənˈtiːn/",
            "definition": "the number 17",
            "examples": [
               "He is seventeen.",
               "I bought seventeen pens.",
               "Seventeen people were at the party."
            ]
         },
         
         {
            
            "id": 61,
            "saved": false,
            "word": "seventy",
            "role": "number",
            "BrE": "/ˈsevnti/",
            "AmE": "/ˈsevnti/",
            "definition": "the number 70",
            "examples": [
               "She is seventy years old.",
               "I have seventy books.",
               "Seventy people came to the event."
            ]
         },
         {
            
            "id": 61,
            "saved": false,
            "word": "she",
            "role": "pronoun",
            "BrE": "/ʃiː/",
            "AmE": "/ʃiː/",
            "definition": "a female person or animal",
            "examples": [
               "She is my friend.",
               "She likes to read.",
               "She went to the park."
            ]
         },
         {
            
            "id": 61,
            "saved": false,
            "word": "shirt",
            "role": "noun",
            "BrE": "/ʃɜːt/",
            "AmE": "/ʃɜːrt/",
            "definition": "a piece of clothing worn on the upper body",
            "examples": [
               "I wear a shirt.",
               "His shirt is blue.",
               "She bought a new shirt."
            ]
         },
         {
            
            "id": 61,
            "saved": false,
            "word": "shoe",
            "role": "noun",
            "BrE": "/ʃuː/",
            "AmE": "/ʃuː/",
            "definition": "a covering for the foot",
            "examples": [
               "My shoe is black.",
               "She lost her shoe.",
               "He wears big shoes."
            ]
         },
         {
            
            "id": 61,
            "saved": false,
            "word": "shop",
            "role": "noun",
            "BrE": "/ʃɒp/",
            "AmE": "/ʃɑːp/",
            "definition": "a place where things are sold",
            "examples": [
               "I go to the shop.",
               "The shop sells food.",
               "She works in a book shop."
            ]
         },
         {
            
            "id": 61,
            "saved": false,
            "word": "short",
            "role": "adjective",
            "BrE": "/ʃɔːt/",
            "AmE": "/ʃɔːrt/",
            "definition": "having little length or time",
            "examples": [
               "The book is short.",
               "Her hair is short.",
               "The film was very short."
            ]
         },
         {
            
            "id": 61,
            "saved": false,
            "word": "show",
            "role": "verb",
            "BrE": "/ʃəʊ/",
            "AmE": "/ʃoʊ/",
            "definition": "to let someone see something",
            "examples": [
               "Show me your book.",
               "She showed me a photo.",
               "He shows his drawing to the class."
            ]
         },
         {
            
            "id": 61,
            "saved": false,
            "word": "sing",
            "role": "verb",
            "BrE": "/sɪŋ/",
            "AmE": "/sɪŋ/",
            "definition": "to make music with your voice",
            "examples": [
               "I sing a song.",
               "She sings very well.",
               "He sang at the party."
            ]
         },
         {
            
            "id": 61,
            "saved": false,
            "word": "sister",
            "role": "noun",
            "BrE": "/ˈsɪstə(r)/",
            "AmE": "/ˈsɪstər/",
            "definition": "a female sibling",
            "examples": [
               "My sister is kind.",
               "Her sister is at school.",
               "The sister helped with homework."
            ]
         },
         {
            
            "id": 61,
            "saved": false,
            "word": "sit",
            "role": "verb",
            "BrE": "/sɪt/",
            "AmE": "/sɪt/",
            "definition": "to rest on a chair or seat",
            "examples": [
               "I sit on the chair.",
               "She sat by the window.",
               "He sits at the front of the class."
            ]
         },
         {
            
            "id": 62,
            "saved": false,
            "word": "six",
            "role": "number",
            "BrE": "/sɪks/",
            "AmE": "/sɪks/",
            "definition": "the number 6",
            "examples": [
               "I have six pens.",
               "She is six years old.",
               "Six students are in the room."
            ]
         },
         {
            
            "id": 62,
            "saved": false,
            "word": "sixteen",
            "role": "number",
            "BrE": "/ˌsɪksˈtiːn/",
            "AmE": "/ˌsɪksˈtiːn/",
            "definition": "the number 16",
            "examples": [
               "He is sixteen.",
               "I bought sixteen apples.",
               "Sixteen people joined the club."
            ]
         },
         {
            
            "id": 62,
            "saved": false,
            "word": "sixty",
            "role": "number",
            "BrE": "/ˈsɪksti/",
            "AmE": "/ˈsɪksti/",
            "definition": "the number 60",
            "examples": [
               "She is sixty years old.",
               "I have sixty books.",
               "Sixty people were at the party."
            ]
         },
         {
            
            "id": 62,
            "saved": false,
            "word": "sleep",
            "role": "verb",
            "BrE": "/sliːp/",
            "AmE": "/sliːp/",
            "definition": "to rest with your eyes closed",
            "examples": [
               "I sleep at night.",
               "She sleeps for eight hours.",
               "He slept late this morning."
            ]
         },
         {
            
            "id": 62,
            "saved": false,
            "word": "small",
            "role": "adjective",
            "BrE": "/smɔːl/",
            "AmE": "/smɔːl/",
            "definition": "not big in size",
            "examples": [
               "The dog is small.",
               "She has a small bag.",
               "The small house is cozy."
            ]
         },
         {
            
            "id": 62,
            "saved": false,
            "word": "snow",
            "role": "noun",
            "BrE": "/snəʊ/",
            "AmE": "/snoʊ/",
            "definition": "soft white pieces of frozen water falling from the sky",
            "examples": [
               "I like snow.",
               "The snow is white.",
               "She played in the snow."
            ]
         },
         {
            
            "id": 62,
            "saved": false,
            "word": "so",
            "role": "adverb",
            "BrE": "/səʊ/",
            "AmE": "/soʊ/",
            "definition": "to a great degree or therefore",
            "examples": [
               "I am so tired.",
               "She was late, so she ran.",
               "He is so happy today."
            ]
         },
         {
            
            "id": 62,
            "saved": false,
            "word": "some",
            "role": "determiner",
            "BrE": "/sʌm/",
            "AmE": "/sʌm/",
            "definition": "a certain amount or number",
            "examples": [
               "I have some books.",
               "She bought some fruit.",
               "Some people are here."
            ]
         },
         {
            
            "id": 62,
            "saved": false,
            "word": "something",
            "role": "pronoun",
            "BrE": "/ˈsʌmθɪŋ/",
            "AmE": "/ˈsʌmθɪŋ/",
            "definition": "an unknown or unspecified thing",
            "examples": [
               "I see something.",
               "She found something new.",
               "He gave me something small."
            ]
         },
         {
            
            "id": 62,
            "saved": false,
            "word": "sometimes",
            "role": "adverb",
            "BrE": "/ˈsʌmtaɪmz/",
            "AmE": "/ˈsʌmtaɪmz/",
            "definition": "on some occasions but not always",
            "examples": [
               "I sometimes walk.",
               "She sometimes reads at night.",
               "He sometimes forgets his keys."
            ]
         },
         {
            
            "id": 63,
            "saved": false,
            "word": "son",
            "role": "noun",
            "BrE": "/sʌn/",
            "AmE": "/sʌn/",
            "definition": "a male child",
            "examples": [
               "My son is young.",
               "Her son plays football.",
               "The son helped his dad."
            ]
         },
         {
            
            "id": 63,
            "saved": false,
            "word": "song",
            "role": "noun",
            "BrE": "/sɒŋ/",
            "AmE": "/sɔːŋ/",
            "definition": "music with words that you sing",
            "examples": [
               "I like this song.",
               "She sang a song.",
               "The song is on the radio."
            ]
         },
         {
            
            "id": 63,
            "saved": false,
            "word": "soon",
            "role": "adverb",
            "BrE": "/suːn/",
            "AmE": "/suːn/",
            "definition": "in a short time",
            "examples": [
               "I’ll come soon.",
               "She will finish soon.",
               "He arrives soon after lunch."
            ]
         },
         {
            
            "id": 63,
            "saved": false,
            "word": "sorry",
            "role": "exclamation",
            "BrE": "/ˈsɒri/",
            "AmE": "/ˈsɑːri/",
            "definition": "used to apologize or show sadness",
            "examples": [
               "Sorry, I’m late.",
               "She said sorry for the mistake.",
               "He was sorry about the news."
            ]
         },
         {
            
            "id": 63,
            "saved": false,
            "word": "south",
            "role": "noun",
            "BrE": "/saʊθ/",
            "AmE": "/saʊθ/",
            "definition": "the direction towards the bottom of a map",
            "examples": [
               "The south is warm.",
               "We live in the south.",
               "The birds fly south."
            ]
         },
         {
            
            "id": 63,
            "saved": false,
            "word": "south",
            "role": "adjective",
            "BrE": "/saʊθ/",
            "AmE": "/saʊθ/",
            "definition": "in or towards the south",
            "examples": [
               "The south wind is warm.",
               "She lives in south London.",
               "The south side of the house is sunny."
            ]
         },
         {
            
            "id": 63,
            "saved": false,
            "word": "south",
            "role": "adverb",
            "BrE": "/saʊθ/",
            "AmE": "/saʊθ/",
            "definition": "towards the south",
            "examples": [
               "We traveled south.",
               "The plane flies south.",
               "She looked south to the sea."
            ]
         },
         {
            
            "id": 63,
            "saved": false,
            "word": "speak",
            "role": "verb",
            "BrE": "/spiːk/",
            "AmE": "/spiːk/",
            "definition": "to say words or talk",
            "examples": [
               "I speak English.",
               "She spoke to her friend.",
               "He speaks loudly in class."
            ]
         },
         {
            
            "id": 63,
            "saved": false,
            "word": "sport",
            "role": "noun",
            "BrE": "/spɔːt/",
            "AmE": "/spɔːrt/",
            "definition": "a physical activity with rules",
            "examples": [
               "I like sport.",
               "She plays a sport at school.",
               "Football is his favourite sport."
            ]
         },
         {
            
            "id": 63,
            "saved": false,
            "word": "spring",
            "role": "noun",
            "BrE": "/sprɪŋ/",
            "AmE": "/sprɪŋ/",
            "definition": "the season after winter",
            "examples": [
               "Spring is warm.",
               "Flowers grow in spring.",
               "We visit the park in spring."
            ]
         },
         {
            
            "id": 64,
            "saved": false,
            "word": "stand",
            "role": "verb",
            "BrE": "/stænd/",
            "AmE": "/stænd/",
            "definition": "to be on your feet",
            "examples": [
               "I stand up.",
               "She stood by the door.",
               "He stands in line at the shop."
            ]
         },
         {
            
            "id": 64,
            "saved": false,
            "word": "star",
            "role": "noun",
            "BrE": "/stɑː(r)/",
            "AmE": "/stɑːr/",
            "definition": "a bright object in the night sky",
            "examples": [
               "I see a star.",
               "The stars shine at night.",
               "She drew a star on the paper."
            ]
         },
         {
            
            "id": 64,
            "saved": false,
            "word": "start",
            "role": "verb",
            "BrE": "/stɑːt/",
            "AmE": "/stɑːrt/",
            "definition": "to begin something",
            "examples": [
               "I start my work.",
               "She started a new book.",
               "He starts school tomorrow."
            ]
         },
         {
            
            "id": 64,
            "saved": false,
            "word": "station",
            "role": "noun",
            "BrE": "/ˈsteɪʃn/",
            "AmE": "/ˈsteɪʃn/",
            "definition": "a place for trains or buses",
            "examples": [
               "I go to the station.",
               "The station is busy.",
               "She waited at the train station."
            ]
         },
         {
            
            "id": 64,
            "saved": false,
            "word": "stay",
            "role": "verb",
            "BrE": "/steɪ/",
            "AmE": "/steɪ/",
            "definition": "to remain in a place",
            "examples": [
               "I stay at home.",
               "She stayed with her friend.",
               "He stays at a hotel."
            ]
         },
         {
            
            "id": 64,
            "saved": false,
            "word": "stop",
            "role": "verb",
            "BrE": "/stɒp/",
            "AmE": "/stɑːp/",
            "definition": "to finish or end something",
            "examples": [
               "I stop the game.",
               "She stopped talking.",
               "He stopped the car quickly."
            ]
         },
         {
            
            "id": 64,
            "saved": false,
            "word": "store",
            "role": "noun",
            "BrE": "/stɔː(r)/",
            "AmE": "/stɔːr/",
            "definition": "a place where things are sold",
            "examples": [
               "I go to the store.",
               "The store sells clothes.",
               "She bought food at the store."
            ]
         },
         {
            
            "id": 64,
            "saved": false,
            "word": "street",
            "role": "noun",
            "BrE": "/striːt/",
            "AmE": "/striːt/",
            "definition": "a public road in a town or city",
            "examples": [
               "I live on this street.",
               "The street is busy.",
               "She walked down the street."
            ]
         },
         {
            
            "id": 64,
            "saved": false,
            "word": "strong",
            "role": "adjective",
            "BrE": "/strɒŋ/",
            "AmE": "/strɔːŋ/",
            "definition": "having a lot of power or strength",
            "examples": [
               "He is strong.",
               "The strong wind blew.",
               "She lifted the strong box."
            ]
         },
         {
            
            "id": 64,
            "saved": false,
            "word": "student",
            "role": "noun",
            "BrE": "/ˈstjuːdnt/",
            "AmE": "/ˈstuːdnt/",
            "definition": "a person who is learning",
            "examples": [
               "I am a student.",
               "She is a good student.",
               "The student read the book."
            ]
         },
         {
            
            "id": 65,
            "saved": false,
            "word": "study",
            "role": "verb",
            "BrE": "/ˈstʌdi/",
            "AmE": "/ˈstʌdi/",
            "definition": "to learn about something",
            "examples": [
               "I study English.",
               "She studies at home.",
               "He studied for the test."
            ]
         },
         {
            
            "id": 65,
            "saved": false,
            "word": "summer",
            "role": "noun",
            "BrE": "/ˈsʌmə(r)/",
            "AmE": "/ˈsʌmər/",
            "definition": "the season after spring",
            "examples": [
               "Summer is hot.",
               "We swim in summer.",
               "The summer holiday is long."
            ]
         },
         {
            
            "id": 65,
            "saved": false,
            "word": "sun",
            "role": "noun",
            "BrE": "/sʌn/",
            "AmE": "/sʌn/",
            "definition": "the star that gives light and heat to Earth",
            "examples": [
               "The sun is bright.",
               "She sat in the sun.",
               "The sun shines every day."
            ]
         },
         {
            
            "id": 65,
            "saved": false,
            "word": "Sunday",
            "role": "noun",
            "BrE": "/ˈsʌndeɪ/",
            "AmE": "/ˈsʌndeɪ/",
            "definition": "the seventh day of the week",
            "examples": [
               "Sunday is relaxing.",
               "We rest on Sunday.",
               "She visits family on Sunday."
            ]
         },
         {
            
            "id": 65,
            "saved": false,
            "word": "supermarket",
            "role": "noun",
            "BrE": "/ˈsuːpəmɑːkɪt/",
            "AmE": "/ˈsuːpərmɑːrkɪt/",
            "definition": "a large shop selling food and other items",
            "examples": [
               "I go to the supermarket.",
               "The supermarket is big.",
               "She bought milk at the supermarket."
            ]
         },
         {
            
            "id": 65,
            "saved": false,
            "word": "sure",
            "role": "adjective",
            "BrE": "/ʃʊə(r)/",
            "AmE": "/ʃʊr/",
            "definition": "certain or confident",
            "examples": [
               "I am sure.",
               "She is sure of the answer.",
               "He’s sure he locked the door."
            ]
         },
         {
            
            "id": 65,
            "saved": false,
            "word": "swim",
            "role": "verb",
            "BrE": "/swɪm/",
            "AmE": "/swɪm/",
            "definition": "to move through water using your body",
            "examples": [
               "I swim in the pool.",
               "She swims every day.",
               "He swam in the sea."
            ]
         },
         {
            
            "id": 65,
            "saved": false,
            "word": "table",
            "role": "noun",
            "BrE": "/ˈteɪbl/",
            "AmE": "/ˈteɪbl/",
            "definition": "a piece of furniture with a flat top",
            "examples": [
               "The table is big.",
               "She put the book on the table.",
               "He eats at the table."
            ]
         },
         {
            
            "id": 65,
            "saved": false,
            "word": "take",
            "role": "verb",
            "BrE": "/teɪk/",
            "AmE": "/teɪk/",
            "definition": "to get or carry something",
            "examples": [
               "I take my bag.",
               "She took the bus to school.",
               "He takes a book to read."
            ]
         },
         {
            
            "id": 65,
            "saved": false,
            "word": "talk",
            "role": "verb",
            "BrE": "/tɔːk/",
            "AmE": "/tɔːk/",
            "definition": "to speak or have a conversation",
            "examples": [
               "I talk to my friend.",
               "She talked about the book.",
               "He talks on the phone."
            ]
         },
         {
            
            "id": 66,
            "saved": false,
            "word": "tall",
            "role": "adjective",
            "BrE": "/tɔːl/",
            "AmE": "/tɔːl/",
            "definition": "having a great height",
            "examples": [
               "He is tall.",
               "The tall tree is green.",
               "She saw a tall building."
            ]
         },
         {
            
            "id": 66,
            "saved": false,
            "word": "tea",
            "role": "noun",
            "BrE": "/tiː/",
            "AmE": "/tiː/",
            "definition": "a hot drink made from leaves",
            "examples": [
               "I drink tea.",
               "She likes hot tea.",
               "The tea is in a cup."
            ]
         },
         {
            
            "id": 66,
            "saved": false,
            "word": "teacher",
            "role": "noun",
            "BrE": "/ˈtiːtʃə(r)/",
            "AmE": "/ˈtiːtʃər/",
            "definition": "a person who teaches",
            "examples": [
               "My teacher is kind.",
               "The teacher helps students.",
               "She is a math teacher."
            ]
         },
         {
            
            "id": 66,
            "saved": false,
            "word": "television",
            "role": "noun",
            "BrE": "/ˈtelɪvɪʒn/",
            "AmE": "/ˈtelɪvɪʒn/",
            "definition": "a device for watching programmes",
            "examples": [
               "I watch television.",
               "The television is new.",
               "She turned on the television."
            ]
         },
         {
            
            "id": 66,
            "saved": false,
            "word": "tell",
            "role": "verb",
            "BrE": "/tel/",
            "AmE": "/tel/",
            "definition": "to give information to someone",
            "examples": [
               "I tell a story.",
               "She told me her name.",
               "He tells jokes to his friends."
            ]
         },
         {
            
            "id": 66,
            "saved": false,
            "word": "ten",
            "role": "number",
            "BrE": "/ten/",
            "AmE": "/ten/",
            "definition": "the number 10",
            "examples": [
               "I have ten books.",
               "She is ten years old.",
               "Ten students are in the class."
            ]
         },
         {
            
            "id": 66,
            "saved": false,
            "word": "test",
            "role": "noun",
            "BrE": "/test/",
            "AmE": "/test/",
            "definition": "an exam to check knowledge",
            "examples": [
               "I have a test.",
               "The test was easy.",
               "She studied for the math test."
            ]
         },
         {
            
            "id": 66,
            "saved": false,
            "word": "than",
            "role": "conjunction",
            "BrE": "/ðæn/",
            "AmE": "/ðæn/",
            "definition": "used to compare two things",
            "examples": [
               "I am taller than her.",
               "She is faster than him.",
               "This book is better than that."
            ]
         },
         {
            
            "id": 66,
            "saved": false,
            "word": "thank",
            "role": "verb",
            "BrE": "/θæŋk/",
            "AmE": "/θæŋk/",
            "definition": "to express gratitude",
            "examples": [
               "I thank my friend.",
               "She thanked the teacher.",
               "He thanks her for the help."
            ]
         },
         {
            
            "id": 66,
            "saved": false,
            "word": "that",
            "role": "determiner",
            "BrE": "/ðæt/",
            "AmE": "/ðæt/",
            "definition": "used to point to a specific thing",
            "examples": [
               "That is my book.",
               "She likes that dress.",
               "That car is fast."
            ]
         },
         {
            
            "id": 67,
            "saved": false,
            "word": "the",
            "role": "determiner",
            "BrE": "/ðə/",
            "AmE": "/ðə/",
            "definition": "used to refer to a specific thing",
            "examples": [
               "The cat is on the mat.",
               "She read the book.",
               "The sun is bright today."
            ]
         },
         {
            
            "id": 67,
            "saved": false,
            "word": "their",
            "role": "determiner",
            "BrE": "/ðeə(r)/",
            "AmE": "/ðer/",
            "definition": "belonging to them",
            "examples": [
               "Their house is big.",
               "I saw their dog.",
               "Their books are on the table."
            ]
         },
         {
            
            "id": 67,
            "saved": false,
            "word": "them",
            "role": "pronoun",
            "BrE": "/ðem/",
            "AmE": "/ðem/",
            "definition": "a group of people or things",
            "examples": [
               "I saw them.",
               "She gave them a gift.",
               "He helped them with homework."
            ]
         },
         {
            
            "id": 67,
            "saved": false,
            "word": "then",
            "role": "adverb",
            "BrE": "/ðen/",
            "AmE": "/ðen/",
            "definition": "at that time or next",
            "examples": [
               "I was young then.",
               "She ate, then slept.",
               "He finished his work, then left."
            ]
         },
         {
            
            "id": 67,
            "saved": false,
            "word": "there",
            "role": "adverb",
            "BrE": "/ðeə(r)/",
            "AmE": "/ðer/",
            "definition": "in or to that place",
            "examples": [
               "I go there.",
               "She lives there.",
               "The book is over there."
            ]
         },
         {
            
            "id": 67,
            "saved": false,
            "word": "they",
            "role": "pronoun",
            "BrE": "/ðeɪ/",
            "AmE": "/ðeɪ/",
            "definition": "a group of people or things",
            "examples": [
               "They are my friends.",
               "They play football.",
               "They went to the park."
            ]
         },
         {
            
            "id": 67,
            "saved": false,
            "word": "thing",
            "role": "noun",
            "BrE": "/θɪŋ/",
            "AmE": "/θɪŋ/",
            "definition": "an object or item",
            "examples": [
               "I need a thing.",
               "She bought a new thing.",
               "This thing is heavy."
            ]
         },
         {
            
            "id": 67,
            "saved": false,
            "word": "think",
            "role": "verb",
            "BrE": "/θɪŋk/",
            "AmE": "/θɪŋk/",
            "definition": "to have an opinion or idea",
            "examples": [
               "I think it’s good.",
               "She thinks about her future.",
               "He thought the film was funny."
            ]
         },
         {
            
            "id": 67,
            "saved": false,
            "word": "third",
            "role": "adjective",
            "BrE": "/θɜːd/",
            "AmE": "/θɜːrd/",
            "definition": "coming after two others",
            "examples": [
               "This is the third book.",
               "She came in third place.",
               "The third day was sunny."
            ]
         },
         {
            
            "id": 67,
            "saved": false,
            "word": "thirteen",
            "role": "number",
            "BrE": "/ˌθɜːˈtiːn/",
            "AmE": "/ˌθɜːrˈtiːn/",
            "definition": "the number 13",
            "examples": [
               "He is thirteen.",
               "I have thirteen pens.",
               "Thirteen students are here."
            ]
         },
         {
            
            "id": 68,
            "saved": false,
            "word": "thirty",
            "role": "number",
            "BrE": "/ˈθɜːti/",
            "AmE": "/ˈθɜːrti/",
            "definition": "the number 30",
            "examples": [
               "She is thirty years old.",
               "I have thirty books.",
               "Thirty people were at the party."
            ]
         },
         {
            
            "id": 68,
            "saved": false,
            "word": "this",
            "role": "determiner",
            "BrE": "/ðɪs/",
            "AmE": "/ðɪs/",
            "definition": "used to point to a specific thing near you",
            "examples": [
               "This is my book.",
               "This cat is cute.",
               "This house is big."
            ]
         },
         {
            "id": 68,
            "saved": false,
            "word": "Thursday",
            "role": "noun",
            "BrE": "/ˈθɜːzdeɪ/",
            "AmE": "/ˈθɜːrzdeɪ/",
            "definition": "the fourth day of the week",
            "examples": [
               "Thursday is busy.",
               "We meet on Thursday.",
               "She has a test on Thursday."
            ]
         },
         {
            "id": 68,
            "saved": false,
            "word": "ticket",
            "role": "noun",
            "BrE": "/ˈtɪkɪt/",
            "AmE": "/ˈtɪkɪt/",
            "definition": "a piece of paper that allows entry or travel",
            "examples": [
               "I have a ticket.",
               "She bought a train ticket.",
               "The ticket is for the film."
            ]
         },
         {
            "id": 68,
            "saved": false,
            "word": "time",
            "role": "noun",
            "BrE": "/taɪm/",
            "AmE": "/taɪm/",
            "definition": "what is measured in hours and minutes",
            "examples": [
               "What time is it?",
               "She has no time today.",
               "The time for the meeting is two."
            ]
         },
         {
            "id": 68,
            "saved": false,
            "word": "to",
            "role": "preposition",
            "BrE": "/tə/",
            "AmE": "/tə/",
            "definition": "used to show direction or purpose",
            "examples": [
               "I go to school.",
               "She gave a book to him.",
               "He walks to the park."
            ]
         },
         {
            "id": 68,
            "saved": false,
            "word": "today",
            "role": "adverb",
            "BrE": "/təˈdeɪ/",
            "AmE": "/təˈdeɪ/",
            "definition": "on this day",
            "examples": [
               "I am busy today.",
               "She studies today.",
               "He went to the shop today."
            ]
         },
         {
            "id": 68,
            "saved": false,
            "word": "together",
            "role": "adverb",
            "BrE": "/təˈɡeðə(r)/",
            "AmE": "/təˈɡeðər/",
            "definition": "with another person or thing",
            "examples": [
               "We play together.",
               "They work together.",
               "She and her friend sat together."
            ]
         },
         {
            "id": 68,
            "saved": false,
            "word": "tomorrow",
            "role": "adverb",
            "BrE": "/təˈmɒrəʊ/",
            "AmE": "/təˈmɑːroʊ/",
            "definition": "the day after today",
            "examples": [
               "I’ll come tomorrow.",
               "She has a test tomorrow.",
               "Tomorrow is a sunny day."
            ]
         },
         {
            "id": 68,
            "saved": false,
            "word": "too",
            "role": "adverb",
            "BrE": "/tuː/",
            "AmE": "/tuː/",
            "definition": "also or more than wanted",
            "examples": [
               "I want to come too.",
               "She is too tired.",
               "The bag is too heavy."
            ]
         },
         {
            "id": 69,
            "saved": false,
            "word": "town",
            "role": "noun",
            "BrE": "/taʊn/",
            "AmE": "/taʊn/",
            "definition": "a place with many houses and shops",
            "examples": [
               "I live in a town.",
               "The town is small.",
               "She visited the town center."
            ]
         },
         {
            "id": 69,
            "saved": false,
            "word": "train",
            "role": "noun",
            "BrE": "/treɪn/",
            "AmE": "/treɪn/",
            "definition": "a vehicle that travels on rails",
            "examples": [
               "I take the train.",
               "The train is fast.",
               "She caught the train to London."
            ]
         },
         {
            "id": 69,
            "saved": false,
            "word": "travel",
            "role": "verb",
            "BrE": "/ˈtrævl/",
            "AmE": "/ˈtrævl/",
            "definition": "to go from one place to another",
            "examples": [
               "I travel by car.",
               "She travels to school.",
               "He traveled to Paris last year."
            ]
         },
         {
            "id": 69,
            "saved": false,
            "word": "tree",
            "role": "noun",
            "BrE": "/triː/",
            "AmE": "/triː/",
            "definition": "a tall plant with a trunk and branches",
            "examples": [
               "The tree is tall.",
               "She climbed the tree.",
               "The tree has green leaves."
            ]
         },
         {
            "id": 69,
            "saved": false,
            "word": "try",
            "role": "verb",
            "BrE": "/traɪ/",
            "AmE": "/traɪ/",
            "definition": "to make an effort to do something",
            "examples": [
               "I try to learn.",
               "She tried to open the door.",
               "He tries to win the game."
            ]
         },
         {
            "id": 69,
            "saved": false,
            "word": "Tuesday",
            "role": "noun",
            "BrE": "/ˈtjuːzdeɪ/",
            "AmE": "/ˈtuːzdeɪ/",
            "definition": "the second day of the week",
            "examples": [
               "Tuesday is busy.",
               "We meet on Tuesday.",
               "She has a class on Tuesday."
            ]
         },
         {
            "id": 69,
            "saved": false,
            "word": "turn",
            "role": "verb",
            "BrE": "/tɜːn/",
            "AmE": "/tɜːrn/",
            "definition": "to change direction or position",
            "examples": [
               "I turn left.",
               "She turned the page.",
               "He turned to see the dog."
            ]
         },
         {
            "id": 69,
            "saved": false,
            "word": "twelve",
            "role": "number",
            "BrE": "/twelv/",
            "AmE": "/twelv/",
            "definition": "the number 12",
            "examples": [
               "I have twelve books.",
               "She is twelve years old.",
               "Twelve students are in the class."
            ]
         },
         {
            "id": 69,
            "saved": false,
            "word": "twenty",
            "role": "number",
            "BrE": "/ˈtwenti/",
            "AmE": "/ˈtwenti/",
            "definition": "the number 20",
            "examples": [
               "I have twenty pens.",
               "She is twenty years old.",
               "Twenty people were at the party."
            ]
         },
         {
            "id": 69,
            "saved": false,
            "word": "two",
            "role": "number",
            "BrE": "/tuː/",
            "AmE": "/tuː/",
            "definition": "the number 2",
            "examples": [
               "I have two cats.",
               "She bought two apples.",
               "Two students are absent."
            ]
         },
         {
            "id": 70,
            "saved": false,
            "word": "umbrella",
            "role": "noun",
            "BrE": "/ʌmˈbrelə/",
            "AmE": "/ʌmˈbrelə/",
            "definition": "an object to protect from rain",
            "examples": [
               "I use an umbrella.",
               "Her umbrella is red.",
               "She forgot her umbrella at home."
            ]
         },
         {
            "id": 70,
            "saved": false,
            "word": "under",
            "role": "preposition",
            "BrE": "/ˈʌndə(r)/",
            "AmE": "/ˈʌndər/",
            "definition": "below something",
            "examples": [
               "The cat is under the table.",
               "She looked under the bed.",
               "He hid under a tree."
            ]
         },
         {
            "id": 70,
            "saved": false,
            "word": "understand",
            "role": "verb",
            "BrE": "/ˌʌndəˈstænd/",
            "AmE": "/ˌʌndərˈstænd/",
            "definition": "to know the meaning of something",
            "examples": [
               "I understand English.",
               "She understands the lesson.",
               "He understood the question."
            ]
         },
         {
            "id": 70,
            "saved": false,
            "word": "up",
            "role": "adverb",
            "BrE": "/ʌp/",
            "AmE": "/ʌp/",
            "definition": "towards a higher place",
            "examples": [
               "I look up.",
               "She climbed up the hill.",
               "He went up to his room."
            ]
         },
         {
            "id": 70,
            "saved": false,
            "word": "us",
            "role": "pronoun",
            "BrE": "/ʌs/",
            "AmE": "/ʌs/",
            "definition": "the people speaking",
            "examples": [
               "Give it to us.",
               "She helped us with work.",
               "He invited us to the party."
            ]
         },
         {
            "id": 70,
            "saved": false,
            "word": "use",
            "role": "verb",
            "BrE": "/juːz/",
            "AmE": "/juːz/",
            "definition": "to do something with an object",
            "examples": [
               "I use a pen.",
               "She uses her phone.",
               "He used a map to find the way."
            ]
         },
         {
            "id": 70,
            "saved": false,
            "word": "usually",
            "role": "adverb",
            "BrE": "/ˈjuːʒuəli/",
            "AmE": "/ˈjuːʒuəli/",
            "definition": "most of the time",
            "examples": [
               "I usually walk.",
               "She usually reads at night.",
               "He usually eats breakfast early."
            ]
         },
         {
            "id": 70,
            "saved": false,
            "word": "very",
            "role": "adverb",
            "BrE": "/ˈveri/",
            "AmE": "/ˈveri/",
            "definition": "to a great degree",
            "examples": [
               "I am very happy.",
               "She is very tired.",
               "The book is very interesting."
            ]
         },
         {
            "id": 70,
            "saved": false,
            "word": "visit",
            "role": "verb",
            "BrE": "/ˈvɪzɪt/",
            "AmE": "/ˈvɪzɪt/",
            "definition": "to go to see a person or place",
            "examples": [
               "I visit my friend.",
               "She visited the museum.",
               "He visits his family weekly."
            ]
         },
         {
            "id": 70,
            "saved": false,
            "word": "wait",
            "role": "verb",
            "BrE": "/weɪt/",
            "AmE": "/weɪt/",
            "definition": "to stay until something happens",
            "examples": [
               "I wait for the bus.",
               "She waited for her friend.",
               "He waits at the station."
            ]
         },
         
         {
            "id": 71,
            "saved": false,
            "word": "walk",
            "role": "verb",
            "BrE": "/wɔːk/",
            "AmE": "/wɔːk/",
            "definition": "to move on foot",
            "examples": [
               "I walk to school.",
               "She walks in the park.",
               "He walked home after work."
            ]
         },
         {
            "id": 71,
            "saved": false,
            "word": "wall",
            "role": "noun",
            "BrE": "/wɔːl/",
            "AmE": "/wɔːl/",
            "definition": "a vertical structure of a building or room",
            "examples": [
               "The wall is white.",
               "She painted the wall blue.",
               "A picture is on the wall."
            ]
         },
         {
            "id": 71,
            "saved": false,
            "word": "want",
            "role": "verb",
            "BrE": "/wɒnt/",
            "AmE": "/wɑːnt/",
            "definition": "to wish or need something",
            "examples": [
               "I want a book.",
               "She wants to learn English.",
               "He wanted a new phone."
            ]
         },
         {
            "id": 71,
            "saved": false,
            "word": "warm",
            "role": "adjective",
            "BrE": "/wɔːm/",
            "AmE": "/wɔːrm/",
            "definition": "having a comfortable temperature",
            "examples": [
               "The room is warm.",
               "Her coat is warm.",
               "The warm water feels nice."
            ]
         },
         {
            "id": 71,
            "saved": false,
            "word": "watch",
            "role": "verb",
            "BrE": "/wɒtʃ/",
            "AmE": "/wɑːtʃ/",
            "definition": "to look at something for a period of time",
            "examples": [
               "I watch TV.",
               "She watched a movie.",
               "He watches birds in the park."
            ]
         },
         {
            "id": 71,
            "saved": false,
            "word": "watch",
            "role": "noun",
            "BrE": "/wɒtʃ/",
            "AmE": "/wɑːtʃ/",
            "definition": "a device for telling the time",
            "examples": [
               "My watch is new.",
               "She lost her watch.",
               "The watch shows the time."
            ]
         },
         {
            "id": 71,
            "saved": false,
            "word": "water",
            "role": "noun",
            "BrE": "/ˈwɔːtə(r)/",
            "AmE": "/ˈwɔːtər/",
            "definition": "a clear liquid you drink",
            "examples": [
               "I drink water.",
               "The water is cold.",
               "She filled a glass with water."
            ]
         },
         {
            "id": 71,
            "saved": false,
            "word": "way",
            "role": "noun",
            "BrE": "/weɪ/",
            "AmE": "/weɪ/",
            "definition": "a method or path to do something",
            "examples": [
               "This is the way.",
               "She found a new way to study.",
               "The way to the park is short."
            ]
         },
         {
            "id": 71,
            "saved": false,
            "word": "we",
            "role": "pronoun",
            "BrE": "/wiː/",
            "AmE": "/wiː/",
            "definition": "the people speaking",
            "examples": [
               "We are happy.",
               "We go to school together.",
               "We watched a film yesterday."
            ]
         },
         {
            "id": 71,
            "saved": false,
            "word": "wear",
            "role": "verb",
            "BrE": "/weə(r)/",
            "AmE": "/wer/",
            "definition": "to have clothes on your body",
            "examples": [
               "I wear a hat.",
               "She wears a red dress.",
               "He wore jeans to the party."
            ]
         },
         {
            "id": 72,
            "saved": false,
            "word": "weather",
            "role": "noun",
            "BrE": "/ˈweðə(r)/",
            "AmE": "/ˈweðər/",
            "definition": "the conditions in the air, like rain or sun",
            "examples": [
               "The weather is sunny.",
               "Bad weather stopped the game.",
               "She checked the weather today."
            ]
         },
         {
            "id": 72,
            "saved": false,
            "word": "Wednesday",
            "role": "noun",
            "BrE": "/ˈwenzdeɪ/",
            "AmE": "/ˈwenzdeɪ/",
            "definition": "the third day of the week",
            "examples": [
               "Wednesday is busy.",
               "We meet on Wednesday.",
               "She has a class on Wednesday."
            ]
         },
         {
            "id": 72,
            "saved": false,
            "word": "week",
            "role": "noun",
            "BrE": "/wiːk/",
            "AmE": "/wiːk/",
            "definition": "a period of seven days",
            "examples": [
               "I work this week.",
               "She studies every week.",
               "The week was very busy."
            ]
         },
         {
            "id": 72,
            "saved": false,
            "word": "weekend",
            "role": "noun",
            "BrE": "/ˌwiːkˈend/",
            "AmE": "/ˌwiːkˈend/",
            "definition": "Saturday and Sunday",
            "examples": [
               "I rest at the weekend.",
               "She visits family at the weekend.",
               "The weekend was fun."
            ]
         },
         {
            "id": 72,
            "saved": false,
            "word": "well",
            "role": "adverb",
            "BrE": "/wel/",
            "AmE": "/wel/",
            "definition": "in a good way",
            "examples": [
               "I sing well.",
               "She plays football well.",
               "He did his homework well."
            ]
         },
         {
            "id": 72,
            "saved": false,
            "word": "west",
            "role": "noun",
            "BrE": "/west/",
            "AmE": "/west/",
            "definition": "the direction where the sun sets",
            "examples": [
               "The west is sunny.",
               "We live in the west.",
               "The sun sets in the west."
            ]
         },
         {
            "id": 72,
            "saved": false,
            "word": "west",
            "role": "adjective",
            "BrE": "/west/",
            "AmE": "/west/",
            "definition": "in or towards the west",
            "examples": [
               "The west wind is cool.",
               "She lives in west London.",
               "The west side of the house is shady."
            ]
         },
         {
            "id": 72,
            "saved": false,
            "word": "west",
            "role": "adverb",
            "BrE": "/west/",
            "AmE": "/west/",
            "definition": "towards the west",
            "examples": [
               "We traveled west.",
               "The birds fly west.",
               "She looked west to the hills."
            ]
         },
         {
            "id": 72,
            "saved": false,
            "word": "what",
            "role": "pronoun",
            "BrE": "/wɒt/",
            "AmE": "/wɑːt/",
            "definition": "used to ask about something",
            "examples": [
               "What is this?",
               "What time is it?",
               "What did she say?"
            ]
         },
         {
            "id": 72,
            "saved": false,
            "word": "when",
            "role": "adverb",
            "BrE": "/wen/",
            "AmE": "/wen/",
            "definition": "used to ask about time",
            "examples": [
               "When is the party?",
               "When did he arrive?",
               "When does the class start?"
            ]
         },
         {
            "id": 73,
            "saved": false,
            "word": "where",
            "role": "adverb",
            "BrE": "/weə(r)/",
            "AmE": "/wer/",
            "definition": "used to ask about place or position",
            "examples": [
               "Where is my book?",
               "Where does she live?",
               "Where are you going?"
            ]
         },
         {
            "id": 73,
            "saved": false,
            "word": "which",
            "role": "pronoun",
            "BrE": "/wɪtʃ/",
            "AmE": "/wɪtʃ/",
            "definition": "used to ask about one thing from a group",
            "examples": [
               "Which book is yours?",
               "Which one do you like?",
               "Which dress should she wear?"
            ]
         },
         {
            "id": 73,
            "saved": false,
            "word": "white",
            "role": "adjective",
            "BrE": "/waɪt/",
            "AmE": "/waɪt/",
            "definition": "having the colour of snow or milk",
            "examples": [
               "The wall is white.",
               "She has a white dress.",
               "His white car is clean."
            ]
         },
         {
            "id": 73,
            "saved": false,
            "word": "white",
            "role": "noun",
            "BrE": "/waɪt/",
            "AmE": "/waɪt/",
            "definition": "the colour of snow or milk",
            "examples": [
               "White is bright.",
               "She painted the room white.",
               "I like white for my shirt."
            ]
         },
         {
            "id": 73,
            "saved": false,
            "word": "who",
            "role": "pronoun",
            "BrE": "/huː/",
            "AmE": "/huː/",
            "definition": "used to ask about a person",
            "examples": [
               "Who is she?",
               "Who took my pen?",
               "Who was at the party?"
            ]
         },
         {
            "id": 73,
            "saved": false,
            "word": "why",
            "role": "adverb",
            "BrE": "/waɪ/",
            "AmE": "/waɪ/",
            "definition": "used to ask the reason for something",
            "examples": [
               "Why are you late?",
               "Why did she leave?",
               "Why is the sky blue?"
            ]
         },
         {
            "id": 73,
            "saved": false,
            "word": "wife",
            "role": "noun",
            "BrE": "/waɪf/",
            "AmE": "/waɪf/",
            "definition": "the woman a man is married to",
            "examples": [
               "His wife is kind.",
               "My wife cooks well.",
               "She met her wife at work."
            ]
         },
         {
            "id": 73,
            "saved": false,
            "word": "window",
            "role": "noun",
            "BrE": "/ˈwɪndəʊ/",
            "AmE": "/ˈwɪndoʊ/",
            "definition": "an opening in a wall for light and air",
            "examples": [
               "The window is open.",
               "She looked out the window.",
               "The window in my room is big."
            ]
         },
         {
            "id": 73,
            "saved": false,
            "word": "winter",
            "role": "noun",
            "BrE": "/ˈwɪntə(r)/",
            "AmE": "/ˈwɪntər/",
            "definition": "the season after autumn",
            "examples": [
               "Winter is cold.",
               "We ski in winter.",
               "The winter was very snowy."
            ]
         },
         {
            "id": 73,
            "saved": false,
            "word": "with",
            "role": "preposition",
            "BrE": "/wɪð/",
            "AmE": "/wɪð/",
            "definition": "together or using something",
            "examples": [
               "I am with my friend.",
               "She writes with a pen.",
               "He went with his sister."
            ]
         },
         {
            "id": 74,
            "saved": false,
            "word": "woman",
            "role": "noun",
            "BrE": "/ˈwʊmən/",
            "AmE": "/ˈwʊmən/",
            "definition": "an adult female person",
            "examples": [
               "The woman is kind.",
               "A woman helped me.",
               "She saw a woman at the shop."
            ]
         },
         {
            "id": 74,
            "saved": false,
            "word": "work",
            "role": "noun",
            "BrE": "/wɜːk/",
            "AmE": "/wɜːrk/",
            "definition": "a job or activity you do",
            "examples": [
               "I have work today.",
               "Her work is at a school.",
               "His work keeps him busy."
            ]
         },
         {
            "id": 74,
            "saved": false,
            "word": "work",
            "role": "verb",
            "BrE": "/wɜːk/",
            "AmE": "/wɜːrk/",
            "definition": "to do a job or task",
            "examples": [
               "I work in an office.",
               "She works as a teacher.",
               "He worked late yesterday."
            ]
         },
         {
            "id": 74,
            "saved": false,
            "word": "world",
            "role": "noun",
            "BrE": "/wɜːld/",
            "AmE": "/wɜːrld/",
            "definition": "the Earth or all people and places",
            "examples": [
               "The world is big.",
               "She travels the world.",
               "He wants to save the world."
            ]
         },
         {
            "id": 74,
            "saved": false,
            "word": "write",
            "role": "verb",
            "BrE": "/raɪt/",
            "AmE": "/raɪt/",
            "definition": "to make words on paper or a screen",
            "examples": [
               "I write a letter.",
               "She writes in her book.",
               "He wrote a story for class."
            ]
         },
         {
            "id": 74,
            "saved": false,
            "word": "year",
            "role": "noun",
            "BrE": "/jɪə(r)/",
            "AmE": "/jɪr/",
            "definition": "a period of twelve months",
            "examples": [
               "This year is fun.",
               "She is ten years old.",
               "The year 2025 is here."
            ]
         },
         {
            "id": 74,
            "saved": false,
            "word": "yellow",
            "role": "adjective",
            "BrE": "/ˈjeləʊ/",
            "AmE": "/ˈjeloʊ/",
            "definition": "having the colour of lemons or the sun",
            "examples": [
               "The flower is yellow.",
               "She has a yellow bag.",
               "His yellow car is bright."
            ]
         },
         {
            "id": 74,
            "saved": false,
            "word": "yellow",
            "role": "noun",
            "BrE": "/ˈjeləʊ/",
            "AmE": "/ˈjeloʊ/",
            "definition": "the colour of lemons or the sun",
            "examples": [
               "Yellow is bright.",
               "She painted the wall yellow.",
               "I like yellow for my shirt."
            ]
         },
         {
            "id": 74,
            "saved": false,
            "word": "yes",
            "role": "exclamation",
            "BrE": "/jes/",
            "AmE": "/jes/",
            "definition": "used to agree or confirm",
            "examples": [
               "Yes, I can come.",
               "She said yes to the question.",
               "Yes, the book is mine."
            ]
         },
         {
            "id": 74,
            "saved": false,
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
            "id": 75,
            "saved": false,
            "word": "you",
            "role": "pronoun",
            "BrE": "/juː/",
            "AmE": "/juː/",
            "definition": "the person or people being spoken to",
            "examples": [
               "You are my friend.",
               "Can you help me?",
               "You went to the park."
            ]
         },
         {
            "id": 75,
            "saved": false,
            "word": "young",
            "role": "adjective",
            "BrE": "/jʌŋ/",
            "AmE": "/jʌŋ/",
            "definition": "having a low age",
            "examples": [
               "The boy is young.",
               "She has a young sister.",
               "The young dog is playful."
            ]
         },
         {
            "id": 75,
            "saved": false,
            "word": "your",
            "role": "determiner",
            "BrE": "/jɔː(r)/",
            "AmE": "/jʊr/",
            "definition": "belonging to you",
            "examples": [
               "This is your book.",
               "Your dog is cute.",
               "Is this your pen?"
            ]
         },
         {
            "id": 75,
            "saved": false,
            "word": "zoo",
            "role": "noun",
            "BrE": "/zuː/",
            "AmE": "/zuː/",
            "definition": "a place where animals are kept for people to see",
            "examples": [
               "I went to the zoo.",
               "The zoo has lions.",
               "She visited the zoo with friends."
            ]
         },
         {
            "id": 75,
            "saved": false,
            "word": "always",
            "role": "adverb",
            "BrE": "/ˈɔːlweɪz/",
            "AmE": "/ˈɔːlweɪz/",
            "definition": "every time or forever",
            "examples": [
               "I always eat breakfast.",
               "She is always happy.",
               "He always arrives on time."
            ]
         },
         {
            "id": 75,
            "saved": false,
            "word": "any",
            "role": "determiner",
            "BrE": "/ˈeni/",
            "AmE": "/ˈeni/",
            "definition": "some, no matter which",
            "examples": [
               "Do you have any pens?",
               "She doesn’t have any time.",
               "Any book will do."
            ]
         },
         {
            "id": 75,
            "saved": false,
            "word": "ask",
            "role": "verb",
            "BrE": "/ɑːsk/",
            "AmE": "/æsk/",
            "definition": "to say something to get an answer",
            "examples": [
               "I ask a question.",
               "She asked for help.",
               "He asks about the homework."
            ]
         },
         {
            "id": 75,
            "saved": false,
            "word": "both",
            "role": "determiner",
            "BrE": "/bəʊθ/",
            "AmE": "/boʊθ/",
            "definition": "referring to two things or people",
            "examples": [
               "Both books are good.",
               "They both like to play.",
               "Both students passed the test."
            ]
         },
         {
            "id": 75,
            "saved": false,
            "word": "bring",
            "role": "verb",
            "BrE": "/brɪŋ/",
            "AmE": "/brɪŋ/",
            "definition": "to carry something to a place",
            "examples": [
               "I bring my book.",
               "She brought food to the party.",
               "He brings his dog to the park."
            ]
         },
         {
            "id": 75,
            "saved": false,
            "word": "busy",
            "role": "adjective",
            "BrE": "/ˈbɪzi/",
            "AmE": "/ˈbɪzi/",
            "definition": "having a lot to do",
            "examples": [
               "I am busy today.",
               "She has a busy day.",
               "The busy street is loud."
            ]
         },
         {
            "id": 76,
            "saved": false,
            "word": "call",
            "role": "verb",
            "BrE": "/kɔːl/",
            "AmE": "/kɔːl/",
            "definition": "to phone or name something",
            "examples": [
               "I call my friend.",
               "She called her dog Max.",
               "He calls his mum every day."
            ]
         },
         {
            "id": 76,
            "saved": false,
            "word": "careful",
            "role": "adjective",
            "BrE": "/ˈkeəfl/",
            "AmE": "/ˈkerfl/",
            "definition": "taking care to avoid mistakes or danger",
            "examples": [
               "Be careful!",
               "She is careful with her work.",
               "He was careful crossing the road."
            ]
         },
         {
            "id": 76,
            "saved": false,
            "word": "clean",
            "role": "adjective",
            "BrE": "/kliːn/",
            "AmE": "/kliːn/",
            "definition": "not dirty",
            "examples": [
               "The room is clean.",
               "Her clothes are clean.",
               "He keeps his car clean."
            ]
         },
         {
            "id": 76,
            "saved": false,
            "word": "clean",
            "role": "verb",
            "BrE": "/kliːn/",
            "AmE": "/kliːn/",
            "definition": "to make something not dirty",
            "examples": [
               "I clean the table.",
               "She cleaned her room.",
               "He cleans the house every week."
            ]
         },
         {
            "id": 76,
            "saved": false,
            "word": "close",
            "role": "verb",
            "BrE": "/kləʊz/",
            "AmE": "/kloʊz/",
            "definition": "to shut something",
            "examples": [
               "I close the door.",
               "She closed the book.",
               "He closes the shop at night."
            ]
         },
         {
            "id": 76,
            "saved": false,
            "word": "cold",
            "role": "adjective",
            "BrE": "/kəʊld/",
            "AmE": "/koʊld/",
            "definition": "having a low temperature",
            "examples": [
               "The water is cold.",
               "It’s cold outside.",
               "She felt cold in the wind."
            ]
         },
         {
            "id": 76,
            "saved": false,
            "word": "come",
            "role": "verb",
            "BrE": "/kʌm/",
            "AmE": "/kʌm/",
            "definition": "to move to a place",
            "examples": [
               "Come to my house.",
               "She came to the party.",
               "He comes to school early."
            ]
         },
         {
            "id": 76,
            "saved": false,
            "word": "cook",
            "role": "verb",
            "BrE": "/kʊk/",
            "AmE": "/kʊk/",
            "definition": "to prepare food by heating it",
            "examples": [
               "I cook dinner.",
               "She cooks very well.",
               "He cooked a meal for friends."
            ]
         },
         {
            "id": 76,
            "saved": false,
            "word": "cool",
            "role": "adjective",
            "BrE": "/kuːl/",
            "AmE": "/kuːl/",
            "definition": "slightly cold or fashionable",
            "examples": [
               "The room is cool.",
               "Her jacket is cool.",
               "It’s cool in the shade."
            ]
         },
         {
            "id": 76,
            "saved": false,
            "word": "dance",
            "role": "verb",
            "BrE": "/dɑːns/",
            "AmE": "/dæns/",
            "definition": "to move to music",
            "examples": [
               "I dance at the party.",
               "She dances very well.",
               "He danced with his friend."
            ]
         },
         {
            "id": 77,
            "saved": false,
            "word": "dark",
            "role": "adjective",
            "BrE": "/dɑːk/",
            "AmE": "/dɑːrk/",
            "definition": "having little or no light",
            "examples": [
               "The room is dark.",
               "It’s dark at night.",
               "She has dark hair."
            ]
         },
         {
            "id": 77,
            "saved": false,
            "word": "day",
            "role": "noun",
            "BrE": "/deɪ/",
            "AmE": "/deɪ/",
            "definition": "a period of 24 hours",
            "examples": [
               "Today is a nice day.",
               "She works every day.",
               "The day was warm and sunny."
            ]
         },
         {
            "id": 77,
            "saved": false,
            "word": "different",
            "role": "adjective",
            "BrE": "/ˈdɪfrənt/",
            "AmE": "/ˈdɪfrənt/",
            "definition": "not the same",
            "examples": [
               "This book is different.",
               "She has a different dress.",
               "They live in different towns."
            ]
         },
         {
            "id": 77,
            "saved": false,
            "word": "do",
            "role": "verb",
            "BrE": "/duː/",
            "AmE": "/duː/",
            "definition": "to perform an action",
            "examples": [
               "I do my homework.",
               "She does her job well.",
               "He did the dishes after dinner."
            ]
         },
         {
            "id": 77,
            "saved": false,
            "word": "draw",
            "role": "verb",
            "BrE": "/drɔː/",
            "AmE": "/drɔː/",
            "definition": "to make a picture with a pen or pencil",
            "examples": [
               "I draw a tree.",
               "She drew a house.",
               "He draws pictures every day."
            ]
         },
         {
            "id": 77,
            "saved": false,
            "word": "drink",
            "role": "verb",
            "BrE": "/drɪŋk/",
            "AmE": "/drɪŋk/",
            "definition": "to take liquid into your mouth",
            "examples": [
               "I drink water.",
               "She drinks tea every morning.",
               "He drank juice at lunch."
            ]
         },
         {
            "id": 77,
            "saved": false,
            "word": "easy",
            "role": "adjective",
            "BrE": "/ˈiːzi/",
            "AmE": "/ˈiːzi/",
            "definition": "not difficult",
            "examples": [
               "This test is easy.",
               "She found an easy book.",
               "The game was easy to play."
            ]
         },
         {
            "id": 77,
            "saved": false,
            "word": "eat",
            "role": "verb",
            "BrE": "/iːt/",
            "AmE": "/iːt/",
            "definition": "to put food in your mouth and swallow",
            "examples": [
               "I eat an apple.",
               "She eats breakfast daily.",
               "He ate dinner with his family."
            ]
         },
         {
            "id": 77,
            "saved": false,
            "word": "egg",
            "role": "noun",
            "BrE": "/eɡ/",
            "AmE": "/eɡ/",
            "definition": "a food produced by birds, often eaten",
            "examples": [
               "I eat an egg.",
               "She cooked two eggs.",
               "The egg is in the fridge."
            ]
         },
         {
            "id": 77,
            "saved": false,
            "word": "every",
            "role": "determiner",
            "BrE": "/ˈevri/",
            "AmE": "/ˈevri/",
            "definition": "each one of a group",
            "examples": [
               "Every book is good.",
               "She reads every day.",
               "Every student passed the test."
            ]
         },
         {
            "id": 78,
            "saved": false,
            "word": "excuse",
            "role": "exclamation",
            "BrE": "/ɪkˈskjuːz/",
            "AmE": "/ɪkˈskjuːz/",
            "definition": "used to get attention or apologize",
            "examples": [
               "Excuse me, please.",
               "Excuse me, where’s the shop?",
               "She said excuse me and left."
            ]
         },
         {
            "id": 78,
            "saved": false,
            "word": "family",
            "role": "noun",
            "BrE": "/ˈfæməli/",
            "AmE": "/ˈfæməli/",
            "definition": "a group of people related to each other",
            "examples": [
               "My family is big.",
               "She loves her family.",
               "The family went on holiday."
            ]
         },
         {
            "id": 78,
            "saved": false,
            "word": "fast",
            "role": "adjective",
            "BrE": "/fɑːst/",
            "AmE": "/fæst/",
            "definition": "moving or acting quickly",
            "examples": [
               "The car is fast.",
               "She runs very fast.",
               "He has a fast bike."
            ]
         },
         {
            "id": 78,
            "saved": false,
            "word": "father",
            "role": "noun",
            "BrE": "/ˈfɑːðə(r)/",
            "AmE": "/ˈfɑːðər/",
            "definition": "a male parent",
            "examples": [
               "My father is tall.",
               "Her father is a teacher.",
               "The father helped his son."
            ]
         },
         {
            "id": 78,
            "saved": false,
            "word": "find",
            "role": "verb",
            "BrE": "/faɪnd/",
            "AmE": "/faɪnd/",
            "definition": "to discover something",
            "examples": [
               "I find my keys.",
               "She found a new book.",
               "He found his phone under the bed."
            ]
         },
         {
            "id": 78,
            "saved": false,
            "word": "first",
            "role": "adjective",
            "BrE": "/fɜːst/",
            "AmE": "/fɜːrst/",
            "definition": "coming before all others",
            "examples": [
               "This is the first book.",
               "She was first in line.",
               "The first day was sunny."
            ]
         },
         {
            "id": 78,
            "saved": false,
            "word": "fish",
            "role": "noun",
            "BrE": "/fɪʃ/",
            "AmE": "/fɪʃ/",
            "definition": "an animal that lives in water",
            "examples": [
               "I see a fish.",
               "She has a pet fish.",
               "The fish swims in the sea."
            ]
         },
         {
            "id": 78,
            "saved": false,
            "word": "five",
            "role": "number",
            "BrE": "/faɪv/",
            "AmE": "/faɪv/",
            "definition": "the number 5",
            "examples": [
               "I have five books.",
               "She is five years old.",
               "Five students are here."
            ]
         },
         {
            "id": 78,
            "saved": false,
            "word": "floor",
            "role": "noun",
            "BrE": "/flɔː(r)/",
            "AmE": "/flɔːr/",
            "definition": "the surface you walk on inside a building",
            "examples": [
               "The floor is clean.",
               "She dropped her pen on the floor.",
               "The floor in the room is wood."
            ]
         },
         {
            "id": 78,
            "saved": false,
            "word": "food",
            "role": "noun",
            "BrE": "/fuːd/",
            "AmE": "/fuːd/",
            "definition": "things you eat",
            "examples": [
               "I like food.",
               "She cooked tasty food.",
               "The food is on the table."
            ]
         },
         {
            "id": 79,
            "saved": false,
            "word": "four",
            "role": "number",
            "BrE": "/fɔː(r)/",
            "AmE": "/fɔːr/",
            "definition": "the number 4",
            "examples": [
               "I have four pens.",
               "She has four cats.",
               "Four students are in the class."
            ]
         },
         {
            "id": 79,
            "saved": false,
            "word": "Friday",
            "role": "noun",
            "BrE": "/ˈfraɪdeɪ/",
            "AmE": "/ˈfraɪdeɪ/",
            "definition": "the fifth day of the week",
            "examples": [
               "Friday is fun.",
               "We meet on Friday.",
               "She has a test on Friday."
            ]
         },
         {
            "id": 79,
            "saved": false,
            "word": "friend",
            "role": "noun",
            "BrE": "/frend/",
            "AmE": "/frend/",
            "definition": "a person you like and know well",
            "examples": [
               "My friend is nice.",
               "She met her friend at school.",
               "He plays with his friends."
            ]
         },
         {
            "id": 79,
            "saved": false,
            "word": "fun",
            "role": "adjective",
            "BrE": "/fʌn/",
            "AmE": "/fʌn/",
            "definition": "enjoyable or entertaining",
            "examples": [
               "The game is fun.",
               "She had a fun day.",
               "The fun party lasted all night."
            ]
         },
         {
            "id": 79,
            "saved": false,
            "word": "game",
            "role": "noun",
            "BrE": "/ɡeɪm/",
            "AmE": "/ɡeɪm/",
            "definition": "an activity with rules for enjoyment",
            "examples": [
               "I play a game.",
               "She likes board games.",
               "The game was exciting."
            ]
         },
         {
            "id": 79,
            "saved": false,
            "word": "garden",
            "role": "noun",
            "BrE": "/ˈɡɑːdn/",
            "AmE": "/ˈɡɑːrdn/",
            "definition": "an area where plants or flowers grow",
            "examples": [
               "The garden is green.",
               "She works in the garden.",
               "He planted flowers in the garden."
            ]
         },
         {
            "id": 79,
            "saved": false,
            "word": "get",
            "role": "verb",
            "BrE": "/ɡet/",
            "AmE": "/ɡet/",
            "definition": "to receive or obtain something",
            "examples": [
               "I get a book.",
               "She got a new phone.",
               "He gets home at six."
            ]
         },
         {
            "id": 79,
            "saved": false,
            "word": "girl",
            "role": "noun",
            "BrE": "/ɡɜːl/",
            "AmE": "/ɡɜːrl/",
            "definition": "a young female person",
            "examples": [
               "The girl is happy.",
               "She is a kind girl.",
               "The girl reads a book."
            ]
         },
         {
            "id": 79,
            "saved": false,
            "word": "give",
            "role": "verb",
            "BrE": "/ɡɪv/",
            "AmE": "/ɡɪv/",
            "definition": "to hand something to someone",
            "examples": [
               "I give her a pen.",
               "She gave me a gift.",
               "He gives food to the dog."
            ]
         },
         {
            "id": 79,
            "saved": false,
            "word": "go",
            "role": "verb",
            "BrE": "/ɡəʊ/",
            "AmE": "/ɡoʊ/",
            "definition": "to move to a place",
            "examples": [
               "I go to school.",
               "She went to the shop.",
               "He goes to the park daily."
            ]
         },
         {
            "id": 80,
            "saved": false,
            "word": "good",
            "role": "adjective",
            "BrE": "/ɡʊd/",
            "AmE": "/ɡʊd/",
            "definition": "having high quality or being pleasant",
            "examples": [
               "This is a good book.",
               "She is a good student.",
               "The good food was tasty."
            ]
         },
         {
            "id": 80,
            "saved": false,
            "word": "great",
            "role": "adjective",
            "BrE": "/ɡreɪt/",
            "AmE": "/ɡreɪt/",
            "definition": "very good or large",
            "examples": [
               "It’s a great day.",
               "She had a great time.",
               "He saw a great movie."
            ]
         },
         {
            "id": 80,
            "saved": false,
            "word": "green",
            "role": "adjective",
            "BrE": "/ɡriːn/",
            "AmE": "/ɡriːn/",
            "definition": "having the colour of grass",
            "examples": [
               "The tree is green.",
               "She has a green bag.",
               "His green shirt is new."
            ]
         },
         {
            "id": 80,
            "saved": false,
            "word": "green",
            "role": "noun",
            "BrE": "/ɡriːn/",
            "AmE": "/ɡriːn/",
            "definition": "the colour of grass",
            "examples": [
               "Green is my favourite.",
               "She painted the wall green.",
               "I like green for my room."
            ]
         },
         {
            "id": 80,
            "saved": false,
            "word": "hair",
            "role": "noun",
            "BrE": "/heə(r)/",
            "AmE": "/her/",
            "definition": "the thin strands growing on your head",
            "examples": [
               "Her hair is long.",
               "He cut his hair short.",
               "The hair on the brush is black."
            ]
         },
         {
            "id": 80,
            "saved": false,
            "word": "happy",
            "role": "adjective",
            "BrE": "/ˈhæpi/",
            "AmE": "/ˈhæpi/",
            "definition": "feeling or showing pleasure",
            "examples": [
               "I am happy today.",
               "She was happy at the party.",
               "The happy dog wagged its tail."
            ]
         },
         {
            "id": 80,
            "saved": false,
            "word": "hat",
            "role": "noun",
            "BrE": "/hæt/",
            "AmE": "/hæt/",
            "definition": "a covering for the head",
            "examples": [
               "I wear a hat.",
               "Her hat is red.",
               "He lost his hat in the wind."
            ]
         },
         {
            "id": 80,
            "saved": false,
            "word": "have",
            "role": "verb",
            "BrE": "/hæv/",
            "AmE": "/hæv/",
            "definition": "to possess or own something",
            "examples": [
               "I have a book.",
               "She has a new phone.",
               "He had a great time."
            ]
         },
         {
            "id": 80,
            "saved": false,
            "word": "he",
            "role": "pronoun",
            "BrE": "/hiː/",
            "AmE": "/hiː/",
            "definition": "a male person or animal",
            "examples": [
               "He is my friend.",
               "He likes to read.",
               "He went to the shop."
            ]
         },
         {
            "id": 80,
            "saved": false,
            "word": "hello",
            "role": "exclamation",
            "BrE": "/həˈləʊ/",
            "AmE": "/həˈloʊ/",
            "definition": "used to greet someone",
            "examples": [
               "Hello, how are you?",
               "She said hello to her friend.",
               "He shouted hello at the door."
            ]
         },
         
         {
            "id": 81,
            "saved": false,
            "word": "help",
            "role": "verb",
            "BrE": "/help/",
            "AmE": "/help/",
            "definition": "to make something easier for someone",
            "examples": [
               "I help my friend.",
               "She helped with the homework.",
               "He helps his mum in the kitchen."
            ]
         },
         {
            "id": 81,
            "saved": false,
            "word": "her",
            "role": "pronoun",
            "BrE": "/hə(r)/",
            "AmE": "/hər/",
            "definition": "a female person or animal",
            "examples": [
               "I saw her.",
               "She gave her book to me.",
               "Her dog is very playful."
            ]
         },
         {
            "id": 81,
            "saved": false,
            "word": "here",
            "role": "adverb",
            "BrE": "/hɪə(r)/",
            "AmE": "/hɪr/",
            "definition": "in or to this place",
            "examples": [
               "Come here.",
               "She lives here.",
               "The book is here on the table."
            ]
         },
         {
            "id": 81,
            "saved": false,
            "word": "high",
            "role": "adjective",
            "BrE": "/haɪ/",
            "AmE": "/haɪ/",
            "definition": "having a large distance from bottom to top",
            "examples": [
               "The wall is high.",
               "She climbed a high tree.",
               "The high mountain was snowy."
            ]
         },
         {
            "id": 81,
            "saved": false,
            "word": "him",
            "role": "pronoun",
            "BrE": "/hɪm/",
            "AmE": "/hɪm/",
            "definition": "a male person or animal",
            "examples": [
               "I saw him.",
               "She gave him a pen.",
               "His dog ran to him."
            ]
         },
         {
            "id": 81,
            "saved": false,
            "word": "his",
            "role": "determiner",
            "BrE": "/hɪz/",
            "AmE": "/hɪz/",
            "definition": "belonging to a male person or animal",
            "examples": [
               "This is his book.",
               "His cat is black.",
               "I saw his new car."
            ]
         },
         {
            "id": 81,
            "saved": false,
            "word": "home",
            "role": "noun",
            "BrE": "/həʊm/",
            "AmE": "/hoʊm/",
            "definition": "the place where you live",
            "examples": [
               "I go home.",
               "Her home is big.",
               "He stayed at home today."
            ]
         },
         {
            "id": 81,
            "saved": false,
            "word": "hot",
            "role": "adjective",
            "BrE": "/hɒt/",
            "AmE": "/hɑːt/",
            "definition": "having a high temperature",
            "examples": [
               "The tea is hot.",
               "It’s hot outside.",
               "She drank hot soup."
            ]
         },
         {
            "id": 81,
            "saved": false,
            "word": "house",
            "role": "noun",
            "BrE": "/haʊs/",
            "AmE": "/haʊs/",
            "definition": "a building where people live",
            "examples": [
               "My house is big.",
               "She lives in a house.",
               "The house has a red door."
            ]
         },
         {
            "id": 81,
            "saved": false,
            "word": "how",
            "role": "adverb",
            "BrE": "/haʊ/",
            "AmE": "/haʊ/",
            "definition": "used to ask about the way or amount",
            "examples": [
               "How are you?",
               "How does it work?",
               "How many books do you have?"
            ]
         },
         {
            "id": 82,
            "saved": false,
            "word": "hundred",
            "role": "number",
            "BrE": "/ˈhʌndrəd/",
            "AmE": "/ˈhʌndrəd/",
            "definition": "the number 100",
            "examples": [
               "I have a hundred coins.",
               "She read a hundred pages.",
               "A hundred people were at the event."
            ]
         },
         {
            "id": 82,
            "saved": false,
            "word": "I",
            "role": "pronoun",
            "BrE": "/aɪ/",
            "AmE": "/aɪ/",
            "definition": "the person speaking",
            "examples": [
               "I am happy.",
               "I like to read.",
               "I went to the park."
            ]
         },
         {
            "id": 82,
            "saved": false,
            "word": "in",
            "role": "preposition",
            "BrE": "/ɪn/",
            "AmE": "/ɪn/",
            "definition": "inside or within a place or time",
            "examples": [
               "I am in the room.",
               "She lives in London.",
               "He reads in the evening."
            ]
         },
         {
            "id": 82,
            "saved": false,
            "word": "it",
            "role": "pronoun",
            "BrE": "/ɪt/",
            "AmE": "/ɪt/",
            "definition": "used for a thing, animal, or situation",
            "examples": [
               "It is a book.",
               "I like it.",
               "It was a sunny day."
            ]
         },
         {
            "id": 82,
            "saved": false,
            "word": "January",
            "role": "noun",
            "BrE": "/ˈdʒænjuəri/",
            "AmE": "/ˈdʒænjuəri/",
            "definition": "the first month of the year",
            "examples": [
               "January is cold.",
               "My birthday is in January.",
               "We have a holiday in January."
            ]
         },
         {
            "id": 82,
            "saved": false,
            "word": "job",
            "role": "noun",
            "BrE": "/dʒɒb/",
            "AmE": "/dʒɑːb/",
            "definition": "work that you do for money",
            "examples": [
               "I have a job.",
               "Her job is teaching.",
               "He found a new job."
            ]
         },
         {
            "id": 82,
            "saved": false,
            "word": "July",
            "role": "noun",
            "BrE": "/dʒuˈlaɪ/",
            "AmE": "/dʒuˈlaɪ/",
            "definition": "the seventh month of the year",
            "examples": [
               "July is warm.",
               "We travel in July.",
               "Her birthday is in July."
            ]
         },
         {
            "id": 82,
            "saved": false,
            "word": "June",
            "role": "noun",
            "BrE": "/dʒuːn/",
            "AmE": "/dʒuːn/",
            "definition": "the sixth month of the year",
            "examples": [
               "June is sunny.",
               "School ends in June.",
               "His party is in June."
            ]
         },
         {
            "id": 82,
            "saved": false,
            "word": "kind",
            "role": "adjective",
            "BrE": "/kaɪnd/",
            "AmE": "/kaɪnd/",
            "definition": "friendly and helpful",
            "examples": [
               "She is kind.",
               "He was kind to the dog.",
               "The kind teacher helped me."
            ]
         },
         {
            "id": 82,
            "saved": false,
            "word": "know",
            "role": "verb",
            "BrE": "/nəʊ/",
            "AmE": "/noʊ/",
            "definition": "to have information in your mind",
            "examples": [
               "I know her name.",
               "She knows the answer.",
               "He knew the way home."
            ]
         },
         {
            "id": 83,
            "saved": false,
            "word": "learn",
            "role": "verb",
            "BrE": "/lɜːn/",
            "AmE": "/lɜːrn/",
            "definition": "to gain knowledge or a skill",
            "examples": [
               "I learn English.",
               "She learned to swim.",
               "He learns math at school."
            ]
         },
         {
            "id": 83,
            "saved": false,
            "word": "left",
            "role": "adjective",
            "BrE": "/left/",
            "AmE": "/left/",
            "definition": "the side opposite to right",
            "examples": [
               "My left hand hurts.",
               "She turned left.",
               "The book is on the left side."
            ]
         },
         {
            "id": 83,
            "saved": false,
            "word": "letter",
            "role": "noun",
            "BrE": "/ˈletə(r)/",
            "AmE": "/ˈletər/",
            "definition": "a written message sent to someone",
            "examples": [
               "I write a letter.",
               "She got a letter.",
               "The letter is on the table."
            ]
         },
         {
            "id": 83,
            "saved": false,
            "word": "like",
            "role": "verb",
            "BrE": "/laɪk/",
            "AmE": "/laɪk/",
            "definition": "to enjoy or want something",
            "examples": [
               "I like to read.",
               "She likes ice cream.",
               "He liked the new movie."
            ]
         },
         {
            "id": 83,
            "saved": false,
            "word": "listen",
            "role": "verb",
            "BrE": "/ˈlɪsn/",
            "AmE": "/ˈlɪsn/",
            "definition": "to hear and pay attention",
            "examples": [
               "I listen to music.",
               "She listened to the teacher.",
               "He listens to the radio."
            ]
         },
         {
            "id": 83,
            "saved": false,
            "word": "little",
            "role": "adjective",
            "BrE": "/ˈlɪtl/",
            "AmE": "/ˈlɪtl/",
            "definition": "small in size or amount",
            "examples": [
               "The cat is little.",
               "She has a little bag.",
               "He ate a little food."
            ]
         },
         {
            "id": 83,
            "saved": false,
            "word": "live",
            "role": "verb",
            "BrE": "/lɪv/",
            "AmE": "/lɪv/",
            "definition": "to have your home in a place",
            "examples": [
               "I live in a house.",
               "She lives in London.",
               "He lived there for a year."
            ]
         },
         {
            "id": 83,
            "saved": false,
            "word": "long",
            "role": "adjective",
            "BrE": "/lɒŋ/",
            "AmE": "/lɔːŋ/",
            "definition": "having a great length or time",
            "examples": [
               "The road is long.",
               "She has long hair.",
               "The long book was interesting."
            ]
         },
         {
            "id": 83,
            "saved": false,
            "word": "look",
            "role": "verb",
            "BrE": "/lʊk/",
            "AmE": "/lʊk/",
            "definition": "to use your eyes to see",
            "examples": [
               "I look at the sky.",
               "She looked at the book.",
               "He looks out the window."
            ]
         },
         {
            "id": 83,
            "saved": false,
            "word": "love",
            "role": "verb",
            "BrE": "/lʌv/",
            "AmE": "/lʌv/",
            "definition": "to like something very much",
            "examples": [
               "I love music.",
               "She loves her dog.",
               "He loved the new film."
            ]
         },
         {
            "id": 84,
            "saved": false,
            "word": "make",
            "role": "verb",
            "BrE": "/meɪk/",
            "AmE": "/meɪk/",
            "definition": "to create or produce something",
            "examples": [
               "I make a cake.",
               "She made a drawing.",
               "He makes toys for children."
            ]
         },
         {
            "id": 84,
            "saved": false,
            "word": "man",
            "role": "noun",
            "BrE": "/mæn/",
            "AmE": "/mæn/",
            "definition": "an adult male person",
            "examples": [
               "The man is tall.",
               "She saw a man at the shop.",
               "The man helped me."
            ]
         },
         {
            "id": 84,
            "saved": false,
            "word": "many",
            "role": "determiner",
            "BrE": "/ˈmeni/",
            "AmE": "/ˈmeni/",
            "definition": "a large number of things or people",
            "examples": [
               "I have many books.",
               "Many people came.",
               "She has many friends."
            ]
         },
         {
            "id": 84,
            "saved": false,
            "word": "March",
            "role": "noun",
            "BrE": "/mɑːtʃ/",
            "AmE": "/mɑːrtʃ/",
            "definition": "the third month of the year",
            "examples": [
               "March is cool.",
               "We travel in March.",
               "Her birthday is in March."
            ]
         },
         {
            "id": 84,
            "saved": false,
            "word": "May",
            "role": "noun",
            "BrE": "/meɪ/",
            "AmE": "/meɪ/",
            "definition": "the fifth month of the year",
            "examples": [
               "May is warm.",
               "School ends in May.",
               "His party is in May."
            ]
         },
         {
            "id": 84,
            "saved": false,
            "word": "me",
            "role": "pronoun",
            "BrE": "/miː/",
            "AmE": "/miː/",
            "definition": "the person speaking",
            "examples": [
               "Give it to me.",
               "She saw me at the park.",
               "He helped me with my bag."
            ]
         },
         {
            "id": 84,
            "saved": false,
            "word": "milk",
            "role": "noun",
            "BrE": "/mɪlk/",
            "AmE": "/mɪlk/",
            "definition": "a white liquid from cows or other animals",
            "examples": [
               "I drink milk.",
               "She bought milk.",
               "The milk is in the fridge."
            ]
         },
         {
            "id": 84,
            "saved": false,
            "word": "money",
            "role": "noun",
            "BrE": "/ˈmʌni/",
            "AmE": "/ˈmʌni/",
            "definition": "what you use to buy things",
            "examples": [
               "I have money.",
               "She spent money on books.",
               "He saved money for a trip."
            ]
         },
         {
            "id": 84,
            "saved": false,
            "word": "month",
            "role": "noun",
            "BrE": "/mʌnθ/",
            "AmE": "/mʌnθ/",
            "definition": "a period of about 30 days",
            "examples": [
               "This month is busy.",
               "She travels every month.",
               "The month of June is warm."
            ]
         },
         {
            "id": 84,
            "saved": false,
            "word": "morning",
            "role": "noun",
            "BrE": "/ˈmɔːnɪŋ/",
            "AmE": "/ˈmɔːrnɪŋ/",
            "definition": "the time from midnight to midday",
            "examples": [
               "Good morning!",
               "She runs in the morning.",
               "The morning was sunny."
            ]
         },
         {
            "id": 85,
            "saved": false,
            "word": "mother",
            "role": "noun",
            "BrE": "/ˈmʌðə(r)/",
            "AmE": "/ˈmʌðər/",
            "definition": "a female parent",
            "examples": [
               "My mother is kind.",
               "Her mother is a doctor.",
               "The mother read a story."
            ]
         },
         {
            "id": 85,
            "saved": false,
            "word": "music",
            "role": "noun",
            "BrE": "/ˈmjuːzɪk/",
            "AmE": "/ˈmjuːzɪk/",
            "definition": "sounds that are pleasant, like songs",
            "examples": [
               "I like music.",
               "She plays music.",
               "The music was loud."
            ]
         },
         {
            "id": 85,
            "saved": false,
            "word": "my",
            "role": "determiner",
            "BrE": "/maɪ/",
            "AmE": "/maɪ/",
            "definition": "belonging to the person speaking",
            "examples": [
               "This is my book.",
               "My dog is small.",
               "I lost my pen."
            ]
         },
         {
            "id": 85,
            "saved": false,
            "word": "name",
            "role": "noun",
            "BrE": "/neɪm/",
            "AmE": "/neɪm/",
            "definition": "the word for a person or thing",
            "examples": [
               "My name is Tom.",
               "What is her name?",
               "The name of the book is fun."
            ]
         },
         {
            "id": 85,
            "saved": false,
            "word": "near",
            "role": "preposition",
            "BrE": "/nɪə(r)/",
            "AmE": "/nɪr/",
            "definition": "close to something in distance",
            "examples": [
               "I live near the park.",
               "She sat near the window.",
               "The shop is near my house."
            ]
         },
         {
            "id": 85,
            "saved": false,
            "word": "need",
            "role": "verb",
            "BrE": "/niːd/",
            "AmE": "/niːd/",
            "definition": "to require something",
            "examples": [
               "I need a pen.",
               "She needs help.",
               "He needed a new bag."
            ]
         },
         {
            "id": 85,
            "saved": false,
            "word": "never",
            "role": "adverb",
            "BrE": "/ˈnevə(r)/",
            "AmE": "/ˈnevər/",
            "definition": "not at any time",
            "examples": [
               "I never eat fish.",
               "She never goes there.",
               "He never forgets his keys."
            ]
         },
         {
            "id": 85,
            "saved": false,
            "word": "new",
            "role": "adjective",
            "BrE": "/njuː/",
            "AmE": "/nuː/",
            "definition": "not old or used",
            "examples": [
               "I have a new book.",
               "She bought a new dress.",
               "His new phone is fast."
            ]
         },
         {
            "id": 85,
            "saved": false,
            "word": "news",
            "role": "noun",
            "BrE": "/njuːz/",
            "AmE": "/nuːz/",
            "definition": "information about recent events",
            "examples": [
               "I watch the news.",
               "The news was interesting.",
               "She heard good news today."
            ]
         },
         {
            "id": 85,
            "saved": false,
            "word": "next",
            "role": "adjective",
            "BrE": "/nekst/",
            "AmE": "/nekst/",
            "definition": "coming after this one",
            "examples": [
               "The next day is Tuesday.",
               "She’s in the next room.",
               "The next bus arrives soon."
            ]
         },
         {
            "id": 86,
            "saved": false,
            "word": "nice",
            "role": "adjective",
            "BrE": "/naɪs/",
            "AmE": "/naɪs/",
            "definition": "pleasant or kind",
            "examples": [
               "She is nice.",
               "The weather is nice today.",
               "He gave me a nice gift."
            ]
         },
         {
            "id": 86,
            "saved": false,
            "word": "night",
            "role": "noun",
            "BrE": "/naɪt/",
            "AmE": "/naɪt/",
            "definition": "the time when it is dark outside",
            "examples": [
               "I sleep at night.",
               "The stars shine at night.",
               "She stayed up late last night."
            ]
         },
         {
            "id": 86,
            "saved": false,
            "word": "nine",
            "role": "number",
            "BrE": "/naɪn/",
            "AmE": "/naɪn/",
            "definition": "the number 9",
            "examples": [
               "I have nine pens.",
               "She is nine years old.",
               "Nine students are in the class."
            ]
         },
         {
            "id": 86,
            "saved": false,
            "word": "nineteen",
            "role": "number",
            "BrE": "/ˌnaɪnˈtiːn/",
            "AmE": "/ˌnaɪnˈtiːn/",
            "definition": "the number 19",
            "examples": [
               "He is nineteen.",
               "I bought nineteen apples.",
               "Nineteen people came to the party."
            ]
         },
         {
            "id": 86,
            "saved": false,
            "word": "ninety",
            "role": "number",
            "BrE": "/ˈnaɪnti/",
            "AmE": "/ˈnaɪnti/",
            "definition": "the number 90",
            "examples": [
               "She is ninety years old.",
               "The shop has ninety items.",
               "Ninety students joined the club."
            ]
         },
         {
            "id": 86,
            "saved": false,
            "word": "no",
            "role": "exclamation",
            "BrE": "/nəʊ/",
            "AmE": "/noʊ/",
            "definition": "used to give a negative answer",
            "examples": [
               "No, I don’t want it.",
               "She said no to the question.",
               "No, he can’t come today."
            ]
         },
         {
            "id": 86,
            "saved": false,
            "word": "nobody",
            "role": "pronoun",
            "BrE": "/ˈnəʊbədi/",
            "AmE": "/ˈnoʊbədi/",
            "definition": "no person",
            "examples": [
               "Nobody is here.",
               "Nobody saw the cat.",
               "Nobody answered the phone."
            ]
         },
         {
            "id": 86,
            "saved": false,
            "word": "north",
            "role": "noun",
            "BrE": "/nɔːθ/",
            "AmE": "/nɔːrθ/",
            "definition": "the direction towards the top of a map",
            "examples": [
               "The north is cold.",
               "We live in the north.",
               "The sun rises far from the north."
            ]
         },
         {
            "id": 86,
            "saved": false,
            "word": "north",
            "role": "adjective",
            "BrE": "/nɔːθ/",
            "AmE": "/nɔːrθ/",
            "definition": "in or towards the north",
            "examples": [
               "The north wind is cold.",
               "She lives in north London.",
               "The north side of the house is cool."
            ]
         },
         {
            "id": 86,
            "saved": false,
            "word": "north",
            "role": "adverb",
            "BrE": "/nɔːθ/",
            "AmE": "/nɔːrθ/",
            "definition": "towards the north",
            "examples": [
               "We traveled north.",
               "The birds fly north.",
               "She looked north to see the mountains."
            ]
         },
         {
            "id": 87,
            "saved": false,
            "word": "nose",
            "role": "noun",
            "BrE": "/nəʊz/",
            "AmE": "/noʊz/",
            "definition": "the part of the face used for smelling",
            "examples": [
               "My nose is cold.",
               "She touched her nose.",
               "The dog’s nose is wet."
            ]
         },
         {
            "id": 87,
            "saved": false,
            "word": "not",
            "role": "adverb",
            "BrE": "/nɒt/",
            "AmE": "/nɑːt/",
            "definition": "used to make a sentence negative",
            "examples": [
               "I am not tired.",
               "She does not like tea.",
               "He’s not coming to the party."
            ]
         },
         {
            "id": 87,
            "saved": false,
            "word": "nothing",
            "role": "pronoun",
            "BrE": "/ˈnʌθɪŋ/",
            "AmE": "/ˈnʌθɪŋ/",
            "definition": "not anything",
            "examples": [
               "Nothing is here.",
               "I found nothing in the box.",
               "She said nothing about it."
            ]
         },
         {
            "id": 87,
            "saved": false,
            "word": "November",
            "role": "noun",
            "BrE": "/nəʊˈvembə(r)/",
            "AmE": "/noʊˈvembər/",
            "definition": "the eleventh month of the year",
            "examples": [
               "November is cool.",
               "My birthday is in November.",
               "We have a holiday in November."
            ]
         },
         {
            "id": 87,
            "saved": false,
            "word": "now",
            "role": "adverb",
            "BrE": "/naʊ/",
            "AmE": "/naʊ/",
            "definition": "at the present time",
            "examples": [
               "I am busy now.",
               "She is here now.",
               "Let’s start the game now."
            ]
         },
         {
            "id": 87,
            "saved": false,
            "word": "number",
            "role": "noun",
            "BrE": "/ˈnʌmbə(r)/",
            "AmE": "/ˈnʌmbər/",
            "definition": "a word or symbol that shows amount or position",
            "examples": [
               "My number is ten.",
               "Her phone number is new.",
               "The number of students is twenty."
            ]
         },
         {
            "id": 87,
            "saved": false,
            "word": "October",
            "role": "noun",
            "BrE": "/ɒkˈtəʊbə(r)/",
            "AmE": "/ɑːkˈtoʊbər/",
            "definition": "the tenth month of the year",
            "examples": [
               "October is autumn.",
               "We have a party in October.",
               "Her birthday is on October 5th."
            ]
         },
         {
            "id": 87,
            "saved": false,
            "word": "of",
            "role": "preposition",
            "BrE": "/əv/",
            "AmE": "/əv/",
            "definition": "used to show possession or connection",
            "examples": [
               "The book of mine.",
               "She is a friend of his.",
               "The colour of the car is red."
            ]
         },
         {
            "id": 87,
            "saved": false,
            "word": "off",
            "role": "adverb",
            "BrE": "/ɒf/",
            "AmE": "/ɔːf/",
            "definition": "away from a place or thing",
            "examples": [
               "The light is off.",
               "She took her hat off.",
               "He fell off the chair."
            ]
         },
         {
            "id": 87,
            "saved": false,
            "word": "often",
            "role": "adverb",
            "BrE": "/ˈɒfn/",
            "AmE": "/ˈɔːfn/",
            "definition": "many times",
            "examples": [
               "I often read.",
               "She often visits her friend.",
               "He often plays football."
            ]
         },
         {
            "id": 88,
            "saved": false,
            "word": "old",
            "role": "adjective",
            "BrE": "/əʊld/",
            "AmE": "/oʊld/",
            "definition": "having lived or existed for a long time",
            "examples": [
               "The house is old.",
               "He has an old car.",
               "She found an old book."
            ]
         },
         {
            "id": 88,
            "saved": false,
            "word": "on",
            "role": "preposition",
            "BrE": "/ɒn/",
            "AmE": "/ɑːn/",
            "definition": "touching the surface of something",
            "examples": [
               "The book is on the table.",
               "She has a hat on her head.",
               "The picture is on the wall."
            ]
         },
         {
            "id": 88,
            "saved": false,
            "word": "once",
            "role": "adverb",
            "BrE": "/wʌns/",
            "AmE": "/wʌns/",
            "definition": "one time only",
            "examples": [
               "I went once.",
               "She called me once.",
               "He visited once last year."
            ]
         },
         {
            "id": 88,
            "saved": false,
            "word": "one",
            "role": "number",
            "BrE": "/wʌn/",
            "AmE": "/wʌn/",
            "definition": "the number 1",
            "examples": [
               "I have one book.",
               "She bought one apple.",
               "One student is absent."
            ]
         },
         {
            "id": 88,
            "saved": false,
            "word": "only",
            "role": "adverb",
            "BrE": "/ˈəʊnli/",
            "AmE": "/ˈoʊnli/",
            "definition": "no one or nothing else",
            "examples": [
               "Only I am here.",
               "She only likes tea.",
               "He only has one pen."
            ]
         },
         {
            "id": 88,
            "saved": false,
            "word": "open",
            "role": "adjective",
            "BrE": "/ˈəʊpən/",
            "AmE": "/ˈoʊpən/",
            "definition": "not closed",
            "examples": [
               "The door is open.",
               "The shop is open now.",
               "She left the window open."
            ]
         },
         {
            "id": 88,
            "saved": false,
            "word": "open",
            "role": "verb",
            "BrE": "/ˈəʊpən/",
            "AmE": "/ˈoʊpən/",
            "definition": "to make something not closed",
            "examples": [
               "I open the door.",
               "She opened her book.",
               "He opens the shop every morning."
            ]
         },
         {
            "id": 88,
            "saved": false,
            "word": "or",
            "role": "conjunction",
            "BrE": "/ɔː(r)/",
            "AmE": "/ɔːr/",
            "definition": "used to show a choice between things",
            "examples": [
               "Tea or coffee?",
               "Do you want this or that?",
               "She can come or stay home."
            ]
         },
         {
            "id": 88,
            "saved": false,
            "word": "orange",
            "role": "noun",
            "BrE": "/ˈɒrɪndʒ/",
            "AmE": "/ˈɔːrɪndʒ/",
            "definition": "a fruit or the colour of that fruit",
            "examples": [
               "I eat an orange.",
               "Her dress is orange.",
               "The orange is sweet."
            ]
         },
         {
            "id": 88,
            "saved": false,
            "word": "our",
            "role": "determiner",
            "BrE": "/aʊə(r)/",
            "AmE": "/aʊr/",
            "definition": "belonging to us",
            "examples": [
               "This is our house.",
               "Our dog is playful.",
               "Our teacher is kind."
            ]
         },
         {
            "id": 89,
            "saved": false,
            "word": "out",
            "role": "adverb",
            "BrE": "/aʊt/",
            "AmE": "/aʊt/",
            "definition": "away from the inside of a place",
            "examples": [
               "Go out now.",
               "She ran out of the room.",
               "He took the dog out."
            ]
         },
         {
            "id": 89,
            "saved": false,
            "word": "over",
            "role": "preposition",
            "BrE": "/ˈəʊvə(r)/",
            "AmE": "/ˈoʊvər/",
            "definition": "above or across something",
            "examples": [
               "The bird flew over.",
               "She jumped over the wall.",
               "The bridge is over the river."
            ]
         },
         {
            "id": 89,
            "saved": false,
            "word": "page",
            "role": "noun",
            "BrE": "/peɪdʒ/",
            "AmE": "/peɪdʒ/",
            "definition": "one side of a piece of paper in a book",
            "examples": [
               "Read page ten.",
               "She wrote on the page.",
               "The book has a torn page."
            ]
         },
         {
            "id": 89,
            "saved": false,
            "word": "paint",
            "role": "verb",
            "BrE": "/peɪnt/",
            "AmE": "/peɪnt/",
            "definition": "to put colour on something using a brush",
            "examples": [
               "I paint a picture.",
               "She painted the wall blue.",
               "He paints houses for a job."
            ]
         },
         {
            "id": 89,
            "saved": false,
            "word": "painting",
            "role": "noun",
            "BrE": "/ˈpeɪntɪŋ/",
            "AmE": "/ˈpeɪntɪŋ/",
            "definition": "a picture made with paint",
            "examples": [
               "The painting is beautiful.",
               "She made a painting of a tree.",
               "His painting is in the museum."
            ]
         },
         {
            "id": 89,
            "saved": false,
            "word": "pair",
            "role": "noun",
            "BrE": "/peə(r)/",
            "AmE": "/per/",
            "definition": "two things that go together",
            "examples": [
               "I have a pair of shoes.",
               "She bought a pair of socks.",
               "The pair of gloves is new."
            ]
         },
         {
            "id": 89,
            "saved": false,
            "word": "paper",
            "role": "noun",
            "BrE": "/ˈpeɪpə(r)/",
            "AmE": "/ˈpeɪpər/",
            "definition": "material used for writing or drawing",
            "examples": [
               "I write on paper.",
               "She drew on a paper.",
               "The paper is white and clean."
            ]
         },
         {
            "id": 89,
            "saved": false,
            "word": "parent",
            "role": "noun",
            "BrE": "/ˈpeərənt/",
            "AmE": "/ˈperənt/",
            "definition": "a mother or father",
            "examples": [
               "My parent is kind.",
               "Her parents are teachers.",
               "The parent helped with homework."
            ]
         },
         {
            "id": 89,
            "saved": false,
            "word": "park",
            "role": "noun",
            "BrE": "/pɑːk/",
            "AmE": "/pɑːrk/",
            "definition": "a public area with grass and trees",
            "examples": [
               "I play in the park.",
               "The park is near my house.",
               "She walks her dog in the park."
            ]
         },
         {
            "id": 89,
            "saved": false,
            "word": "part",
            "role": "noun",
            "BrE": "/pɑːt/",
            "AmE": "/pɑːrt/",
            "definition": "one of the pieces of something",
            "examples": [
               "This is a part of the book.",
               "She ate part of the cake.",
               "He fixed a part of the car."
            ]
         },
         {
            "id": 90,
            "saved": false,
            "word": "party",
            "role": "noun",
            "BrE": "/ˈpɑːti/",
            "AmE": "/ˈpɑːrti/",
            "definition": "a social event with food and music",
            "examples": [
               "I go to a party.",
               "The party was fun.",
               "She invited me to her party."
            ]
         },
         {
            "id": 90,
            "saved": false,
            "word": "past",
            "role": "preposition",
            "BrE": "/pɑːst/",
            "AmE": "/pæst/",
            "definition": "beyond a point in time or place",
            "examples": [
               "It’s past six.",
               "She walked past the shop.",
               "The bus went past the school."
            ]
         },
         {
            "id": 90,
            "saved": false,
            "word": "pay",
            "role": "verb",
            "BrE": "/peɪ/",
            "AmE": "/peɪ/",
            "definition": "to give money for something",
            "examples": [
               "I pay for food.",
               "She paid for the book.",
               "He pays his bills online."
            ]
         },
         {
            "id": 90,
            "saved": false,
            "word": "pen",
            "role": "noun",
            "BrE": "/pen/",
            "AmE": "/pen/",
            "definition": "a tool for writing with ink",
            "examples": [
               "I write with a pen.",
               "Her pen is blue.",
               "He lost his pen at school."
            ]
         },
         {
            "id": 90,
            "saved": false,
            "word": "pencil",
            "role": "noun",
            "BrE": "/ˈpensl/",
            "AmE": "/ˈpensl/",
            "definition": "a tool for writing or drawing with a lead",
            "examples": [
               "I use a pencil.",
               "She sharpened her pencil.",
               "The pencil is on the desk."
            ]
         },
         {
            "id": 90,
            "saved": false,
            "word": "people",
            "role": "noun",
            "BrE": "/ˈpiːpl/",
            "AmE": "/ˈpiːpl/",
            "definition": "more than one person",
            "examples": [
               "People are kind.",
               "Many people came to the park.",
               "She helps people in her job."
            ]
         },
         {
            "id": 90,
            "saved": false,
            "word": "person",
            "role": "noun",
            "BrE": "/ˈpɜːsn/",
            "AmE": "/ˈpɜːrsn/",
            "definition": "a human being",
            "examples": [
               "He is a nice person.",
               "She met a person at the shop.",
               "That person helped me."
            ]
         },
         {
            "id": 90,
            "saved": false,
            "word": "phone",
            "role": "noun",
            "BrE": "/fəʊn/",
            "AmE": "/foʊn/",
            "definition": "a device for talking to people far away",
            "examples": [
               "I use my phone.",
               "Her phone is new.",
               "He left his phone at home."
            ]
         },
         {
            "id": 90,
            "saved": false,
            "word": "photo",
            "role": "noun",
            "BrE": "/ˈfəʊtəʊ/",
            "AmE": "/ˈfoʊtoʊ/",
            "definition": "a picture taken with a camera",
            "examples": [
               "I took a photo.",
               "She showed me a photo.",
               "The photo is of her dog."
            ]
         },
         {
            "id": 90,
            "saved": false,
            "word": "piano",
            "role": "noun",
            "BrE": "/piˈænəʊ/",
            "AmE": "/piˈænoʊ/",
            "definition": "a musical instrument with keys",
            "examples": [
               "I play the piano.",
               "Her piano is old.",
               "He had a piano lesson."
            ]
         },
         
         {
            "id": 91,
            "saved": false,
            "word": "picture",
            "role": "noun",
            "BrE": "/ˈpɪktʃə(r)/",
            "AmE": "/ˈpɪktʃər/",
            "definition": "an image or drawing on paper or a screen",
            "examples": [
               "I see a picture.",
               "She drew a picture of a tree.",
               "The picture is on the wall."
            ]
         },
         {
            "id": 91,
            "saved": false,
            "word": "place",
            "role": "noun",
            "BrE": "/pleɪs/",
            "AmE": "/pleɪs/",
            "definition": "a particular area or location",
            "examples": [
               "This is a nice place.",
               "She found a place to sit.",
               "The place was very quiet."
            ]
         },
         {
            "id": 91,
            "saved": false,
            "word": "play",
            "role": "verb",
            "BrE": "/pleɪ/",
            "AmE": "/pleɪ/",
            "definition": "to do something for fun or in a game",
            "examples": [
               "I play football.",
               "She plays with her dog.",
               "He played chess with his friend."
            ]
         },
         {
            "id": 91,
            "saved": false,
            "word": "please",
            "role": "exclamation",
            "BrE": "/pliːz/",
            "AmE": "/pliːz/",
            "definition": "used to make a request polite",
            "examples": [
               "Please help me.",
               "Can you close the door, please?",
               "Please, tell me your name."
            ]
         },
         {
            "id": 91,
            "saved": false,
            "word": "point",
            "role": "verb",
            "BrE": "/pɔɪnt/",
            "AmE": "/pɔɪnt/",
            "definition": "to show direction with your finger",
            "examples": [
               "I point at the sky.",
               "She pointed to the book.",
               "He points at the map."
            ]
         },
         {
            "id": 91,
            "saved": false,
            "word": "pretty",
            "role": "adjective",
            "BrE": "/ˈprɪti/",
            "AmE": "/ˈprɪti/",
            "definition": "attractive in a delicate way",
            "examples": [
               "The flower is pretty.",
               "She has a pretty dress.",
               "The pretty garden is green."
            ]
         },
         {
            "id": 91,
            "saved": false,
            "word": "put",
            "role": "verb",
            "BrE": "/pʊt/",
            "AmE": "/pʊt/",
            "definition": "to place something somewhere",
            "examples": [
               "I put the book here.",
               "She put her bag on the table.",
               "He puts his shoes by the door."
            ]
         },
         {
            "id": 91,
            "saved": false,
            "word": "question",
            "role": "noun",
            "BrE": "/ˈkwestʃən/",
            "AmE": "/ˈkwestʃən/",
            "definition": "something you ask to get information",
            "examples": [
               "I have a question.",
               "She asked a question.",
               "The question was about math."
            ]
         },
         {
            "id": 91,
            "saved": false,
            "word": "quick",
            "role": "adjective",
            "BrE": "/kwɪk/",
            "AmE": "/kwɪk/",
            "definition": "doing something fast",
            "examples": [
               "The cat is quick.",
               "She gave a quick answer.",
               "He runs in a quick way."
            ]
         },
         {
            "id": 91,
            "saved": false,
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
            "id": 92,
            "saved": false,
            "word": "read",
            "role": "verb",
            "BrE": "/riːd/",
            "AmE": "/riːd/",
            "definition": "to look at and understand words",
            "examples": [
               "I read a book.",
               "She reads every day.",
               "He read a story to the class."
            ]
         },
         {
            "id": 92,
            "saved": false,
            "word": "red",
            "role": "adjective",
            "BrE": "/red/",
            "AmE": "/red/",
            "definition": "having the colour of blood",
            "examples": [
               "The apple is red.",
               "She has a red bag.",
               "His red car is new."
            ]
         },
         {
            "id": 92,
            "saved": false,
            "word": "red",
            "role": "noun",
            "BrE": "/red/",
            "AmE": "/red/",
            "definition": "the colour of blood",
            "examples": [
               "Red is bright.",
               "She painted the wall red.",
               "I like red for my shirt."
            ]
         },
         {
            "id": 92,
            "saved": false,
            "word": "right",
            "role": "adjective",
            "BrE": "/raɪt/",
            "AmE": "/raɪt/",
            "definition": "correct or on the side opposite to left",
            "examples": [
               "This is the right answer.",
               "She turned right.",
               "His right hand is strong."
            ]
         },
         {
            "id": 92,
            "saved": false,
            "word": "room",
            "role": "noun",
            "BrE": "/ruːm/",
            "AmE": "/ruːm/",
            "definition": "a part of a building with walls",
            "examples": [
               "My room is big.",
               "She cleaned the room.",
               "The room has a large window."
            ]
         },
         {
            "id": 92,
            "saved": false,
            "word": "run",
            "role": "verb",
            "BrE": "/rʌn/",
            "AmE": "/rʌn/",
            "definition": "to move quickly on foot",
            "examples": [
               "I run to school.",
               "She runs in the park.",
               "He ran to catch the bus."
            ]
         },
         {
            "id": 92,
            "saved": false,
            "word": "sad",
            "role": "adjective",
            "BrE": "/sæd/",
            "AmE": "/sæd/",
            "definition": "unhappy or showing sorrow",
            "examples": [
               "I am sad today.",
               "She was sad about the news.",
               "The sad story made him cry."
            ]
         },
         {
            "id": 92,
            "saved": false,
            "word": "same",
            "role": "adjective",
            "BrE": "/seɪm/",
            "AmE": "/seɪm/",
            "definition": "not different",
            "examples": [
               "We have the same book.",
               "She wears the same dress.",
               "They live in the same town."
            ]
         },
         {
            "id": 92,
            "saved": false,
            "word": "Saturday",
            "role": "noun",
            "BrE": "/ˈsætədeɪ/",
            "AmE": "/ˈsætərdeɪ/",
            "definition": "the sixth day of the week",
            "examples": [
               "Saturday is fun.",
               "We play on Saturday.",
               "She visits friends on Saturday."
            ]
         },
         {
            "id": 92,
            "saved": false,
            "word": "say",
            "role": "verb",
            "BrE": "/seɪ/",
            "AmE": "/seɪ/",
            "definition": "to speak or express something aloud",
            "examples": [
               "I say hello.",
               "She said her name.",
               "He says he is tired."
            ]
         },
         {
            "id": 93,
            "saved": false,
            "word": "school",
            "role": "noun",
            "BrE": "/skuːl/",
            "AmE": "/skuːl/",
            "definition": "a place where children learn",
            "examples": [
               "I go to school.",
               "Her school is big.",
               "The school has a playground."
            ]
         },
         {
            "id": 93,
            "saved": false,
            "word": "sea",
            "role": "noun",
            "BrE": "/siː/",
            "AmE": "/siː/",
            "definition": "a large body of salt water",
            "examples": [
               "The sea is blue.",
               "She swam in the sea.",
               "The sea is near the town."
            ]
         },
         {
            "id": 93,
            "saved": false,
            "word": "second",
            "role": "adjective",
            "BrE": "/ˈsekənd/",
            "AmE": "/ˈsekənd/",
            "definition": "coming after the first",
            "examples": [
               "This is the second book.",
               "She came in second place.",
               "The second day was rainy."
            ]
         },
         {
            "id": 93,
            "saved": false,
            "word": "see",
            "role": "verb",
            "BrE": "/siː/",
            "AmE": "/siː/",
            "definition": "to use your eyes to look",
            "examples": [
               "I see a bird.",
               "She saw a movie.",
               "He sees his friend every day."
            ]
         },
         {
            "id": 93,
            "saved": false,
            "word": "September",
            "role": "noun",
            "BrE": "/sepˈtembə(r)/",
            "AmE": "/sepˈtembər/",
            "definition": "the ninth month of the year",
            "examples": [
               "September is cool.",
               "School starts in September.",
               "Her birthday is in September."
            ]
         },
         {
            "id": 93,
            "saved": false,
            "word": "seven",
            "role": "number",
            "BrE": "/ˈsevn/",
            "AmE": "/ˈsevn/",
            "definition": "the number 7",
            "examples": [
               "I have seven pens.",
               "She is seven years old.",
               "Seven students are in the room."
            ]
         },
         {
            "id": 93,
            "saved": false,
            "word": "seventeen",
            "role": "number",
            "BrE": "/ˌsevnˈtiːn/",
            "AmE": "/ˌsevnˈtiːn/",
            "definition": "the number 17",
            "examples": [
               "He is seventeen.",
               "I bought seventeen apples.",
               "Seventeen people joined the club."
            ]
         },
         {
            "id": 93,
            "saved": false,
            "word": "sheep",
            "role": "noun",
            "BrE": "/ʃiːp/",
            "AmE": "/ʃiːp/",
            "definition": "an animal with wool, kept for meat or wool",
            "examples": [
               "I see a sheep.",
               "The sheep is in the field.",
               "She counted sheep to sleep."
            ]
         },
         {
            "id": 93,
            "saved": false,
            "word": "shorts",
            "role": "noun",
            "BrE": "/ʃɔːts/",
            "AmE": "/ʃɔːrts/",
            "definition": "short trousers ending above the knee",
            "examples": [
               "I wear shorts.",
               "His shorts are blue.",
               "She runs in her shorts."
            ]
         },
         {
            "id": 93,
            "saved": false,
            "word": "sick",
            "role": "adjective",
            "BrE": "/sɪk/",
            "AmE": "/sɪk/",
            "definition": "not feeling well",
            "examples": [
               "I am sick today.",
               "She felt sick after lunch.",
               "The sick dog stayed home."
            ]
         },
         {
            "id": 94,
            "saved": false,
            "word": "sky",
            "role": "noun",
            "BrE": "/skaɪ/",
            "AmE": "/skaɪ/",
            "definition": "the space above the Earth where clouds are",
            "examples": [
               "The sky is blue.",
               "She looked at the sky.",
               "The sky was clear today."
            ]
         },
         {
            "id": 94,
            "saved": false,
            "word": "sleep",
            "role": "noun",
            "BrE": "/sliːp/",
            "AmE": "/sliːp/",
            "definition": "the state of resting with eyes closed",
            "examples": [
               "I need sleep.",
               "She had a good sleep.",
               "He gets eight hours of sleep."
            ]
         },
         {
            "id": 94,
            "saved": false,
            "word": "slow",
            "role": "adjective",
            "BrE": "/sləʊ/",
            "AmE": "/sloʊ/",
            "definition": "not fast",
            "examples": [
               "The car is slow.",
               "She walks in a slow way.",
               "The slow train stopped often."
            ]
         },
         {
            "id": 94,
            "saved": false,
            "word": "smile",
            "role": "verb",
            "BrE": "/smaɪl/",
            "AmE": "/smaɪl/",
            "definition": "to make a happy expression with your mouth",
            "examples": [
               "I smile at her.",
               "She smiled at the baby.",
               "He smiles when he is happy."
            ]
         },
         {
            "id": 94,
            "saved": false,
            "word": "snow",
            "role": "verb",
            "BrE": "/snəʊ/",
            "AmE": "/snoʊ/",
            "definition": "when snow falls from the sky",
            "examples": [
               "It will snow today.",
               "It snowed last night.",
               "She loves when it snows."
            ]
         },
         {
            "id": 94,
            "saved": false,
            "word": "somebody",
            "role": "pronoun",
            "BrE": "/ˈsʌmbədi/",
            "AmE": "/ˈsʌmbədi/",
            "definition": "an unknown or unspecified person",
            "examples": [
               "Somebody is here.",
               "She saw somebody in the park.",
               "Somebody left a book here."
            ]
         },
         {
            "id": 94,
            "saved": false,
            "word": "sound",
            "role": "noun",
            "BrE": "/saʊnd/",
            "AmE": "/saʊnd/",
            "definition": "something you hear",
            "examples": [
               "I hear a sound.",
               "The sound was loud.",
               "She heard a strange sound."
            ]
         },
         {
            "id": 94,
            "saved": false,
            "word": "stand",
            "role": "noun",
            "BrE": "/stænd/",
            "AmE": "/stænd/",
            "definition": "a place where things are sold or displayed",
            "examples": [
               "The market has a stand.",
               "She bought fruit at the stand.",
               "The stand sells flowers."
            ]
         },
         {
            "id": 94,
            "saved": false,
            "word": "start",
            "role": "noun",
            "BrE": "/stɑːt/",
            "AmE": "/stɑːrt/",
            "definition": "the beginning of something",
            "examples": [
               "The start is now.",
               "The race had a good start.",
               "She was at the start of the line."
            ]
         },
         {
            "id": 94,
            "saved": false,
            "word": "store",
            "role": "verb",
            "BrE": "/stɔː(r)/",
            "AmE": "/stɔːr/",
            "definition": "to keep something for future use",
            "examples": [
               "I store my books.",
               "She stores food in the fridge.",
               "He stored his clothes in a box."
            ]
         },
         {
            "id": 95,
            "saved": false,
            "word": "story",
            "role": "noun",
            "BrE": "/ˈstɔːri/",
            "AmE": "/ˈstɔːri/",
            "definition": "a description of events, real or imagined",
            "examples": [
               "I read a story.",
               "She told a funny story.",
               "The story was about a dog."
            ]
         },
         {
            "id": 95,
            "saved": false,
            "word": "study",
            "role": "noun",
            "BrE": "/ˈstʌdi/",
            "AmE": "/ˈstʌdi/",
            "definition": "the act of learning something",
            "examples": [
               "I do my study.",
               "Her study time is at night.",
               "The study of math is fun."
            ]
         },
         {
            "id": 95,
            "saved": false,
            "word": "sunny",
            "role": "adjective",
            "BrE": "/ˈsʌni/",
            "AmE": "/ˈsʌni/",
            "definition": "bright with sunlight",
            "examples": [
               "It is sunny today.",
               "She loves sunny weather.",
               "The sunny beach was warm."
            ]
         },
         {
            "id": 95,
            "saved": false,
            "word": "sweet",
            "role": "adjective",
            "BrE": "/swiːt/",
            "AmE": "/swiːt/",
            "definition": "having a taste like sugar",
            "examples": [
               "The cake is sweet.",
               "She ate a sweet apple.",
               "He likes sweet drinks."
            ]
         },
         {
            "id": 95,
            "saved": false,
            "word": "talk",
            "role": "noun",
            "BrE": "/tɔːk/",
            "AmE": "/tɔːk/",
            "definition": "a conversation or discussion",
            "examples": [
               "We had a talk.",
               "Her talk was interesting.",
               "The talk was about school."
            ]
         },
         {
            "id": 95,
            "saved": false,
            "word": "teacher",
            "role": "noun",
            "BrE": "/ˈtiːtʃə(r)/",
            "AmE": "/ˈtiːtʃər/",
            "definition": "a person who teaches",
            "examples": [
               "The teacher is kind.",
               "She met her teacher.",
               "The teacher gave us homework."
            ]
         },
         {
            "id": 95,
            "saved": false,
            "word": "team",
            "role": "noun",
            "BrE": "/tiːm/",
            "AmE": "/tiːm/",
            "definition": "a group of people who play or work together",
            "examples": [
               "I am in a team.",
               "Her team won the game.",
               "The team played well."
            ]
         },
         {
            "id": 95,
            "saved": false,
            "word": "tell",
            "role": "noun",
            "BrE": "/tel/",
            "AmE": "/tel/",
            "definition": "the act of giving information",
            "examples": [
               "His tell was clear.",
               "She gave a tell about the story.",
               "The tell was about her day."
            ]
         },
         {
            "id": 95,
            "saved": false,
            "word": "tennis",
            "role": "noun",
            "BrE": "/ˈtenɪs/",
            "AmE": "/ˈtenɪs/",
            "definition": "a sport played with a racket and ball",
            "examples": [
               "I play tennis.",
               "She likes tennis a lot.",
               "He watched a tennis match."
            ]
         },
         {
            "id": 95,
            "saved": false,
            "word": "test",
            "role": "verb",
            "BrE": "/test/",
            "AmE": "/test/",
            "definition": "to check knowledge or ability",
            "examples": [
               "I test my skills.",
               "She tested the students.",
               "He was tested on math."
            ]
         },
         {
            "id": 96,
            "saved": false,
            "word": "thank you",
            "role": "exclamation",
            "BrE": "/ˈθæŋk juː/",
            "AmE": "/ˈθæŋk juː/",
            "definition": "used to show gratitude",
            "examples": [
               "Thank you for the gift.",
               "She said thank you to him.",
               "Thank you, I like it!"
            ]
         },
         {
            "id": 96,
            "saved": false,
            "word": "thing",
            "role": "noun",
            "BrE": "/θɪŋ/",
            "AmE": "/θɪŋ/",
            "definition": "an object or item",
            "examples": [
               "This is a thing.",
               "She bought a new thing.",
               "The thing on the table is mine."
            ]
         },
         {
            "id": 96,
            "saved": false,
            "word": "time",
            "role": "noun",
            "BrE": "/taɪm/",
            "AmE": "/taɪm/",
            "definition": "what is measured in hours and minutes",
            "examples": [
               "What time is it?",
               "She has no time today.",
               "The time for the meeting is two."
            ]
         },
         {
            "id": 96,
            "saved": false,
            "word": "tired",
            "role": "adjective",
            "BrE": "/ˈtaɪəd/",
            "AmE": "/ˈtaɪərd/",
            "definition": "needing rest or sleep",
            "examples": [
               "I am tired.",
               "She was tired after work.",
               "The tired dog slept all day."
            ]
         },
         {
            "id": 96,
            "saved": false,
            "word": "to",
            "role": "preposition",
            "BrE": "/tə/",
            "AmE": "/tə/",
            "definition": "used to show direction or purpose",
            "examples": [
               "I go to school.",
               "She gave a book to him.",
               "He walks to the park."
            ]
         },
         {
            "id": 96,
            "saved": false,
            "word": "today",
            "role": "noun",
            "BrE": "/təˈdeɪ/",
            "AmE": "/təˈdeɪ/",
            "definition": "this day",
            "examples": [
               "Today is sunny.",
               "She is busy today.",
               "We play football today."
            ]
         },
         {
            "id": 96,
            "saved": false,
            "word": "together",
            "role": "adjective",
            "BrE": "/təˈɡeðə(r)/",
            "AmE": "/təˈɡeðər/",
            "definition": "being with another person or thing",
            "examples": [
               "We are together.",
               "They work in a together way.",
               "The together group was happy."
            ]
         },
         {
            "id": 96,
            "saved": false,
            "word": "tomorrow",
            "role": "noun",
            "BrE": "/təˈmɒrəʊ/",
            "AmE": "/təˈmɑːroʊ/",
            "definition": "the day after today",
            "examples": [
               "Tomorrow is Monday.",
               "She will come tomorrow.",
               "We have a test tomorrow."
            ]
         },
         {
            "id": 96,
            "saved": false,
            "word": "too",
            "role": "adverb",
            "BrE": "/tuː/",
            "AmE": "/tuː/",
            "definition": "also or more than wanted",
            "examples": [
               "I want to come too.",
               "She is too tired.",
               "The bag is too heavy."
            ]
         },
         {
            "id": 96,
            "saved": false,
            "word": "train",
            "role": "verb",
            "BrE": "/treɪn/",
            "AmE": "/treɪn/",
            "definition": "to learn or teach a skill",
            "examples": [
               "I train for sports.",
               "She trains her dog.",
               "He trained to be a teacher."
            ]
         },
         {
            "id": 97,
            "saved": false,
            "word": "tree",
            "role": "noun",
            "BrE": "/triː/",
            "AmE": "/triː/",
            "definition": "a tall plant with a trunk and branches",
            "examples": [
               "The tree is green.",
               "She climbed the tree.",
               "The tree has many leaves."
            ]
         },
         {
            "id": 97,
            "saved": false,
            "word": "true",
            "role": "adjective",
            "BrE": "/truː/",
            "AmE": "/truː/",
            "definition": "correct or realPMI",
            "examples": [
               "Is it true?",
               "Her story is true.",
               "He said it was true."
            ]
         },
         {
            "id": 97,
            "saved": false,
            "word": "try",
            "role": "noun",
            "BrE": "/traɪ/",
            "AmE": "/traɪ/",
            "definition": "an attempt to do something",
            "examples": [
               "I made a try.",
               "Her try was successful.",
               "His try at the game failed."
            ]
         },
         {
            "id": 97,
            "saved": false,
            "word": "turn",
            "role": "noun",
            "BrE": "/tɜːn/",
            "AmE": "/tɜːrn/",
            "definition": "a chance to do something",
            "examples": [
               "It’s my turn.",
               "She took her turn.",
               "His turn came last."
            ]
         },
         {
            "id": 97,
            "saved": false,
            "word": "TV",
            "role": "noun",
            "BrE": "/ˌtiː ˈviː/",
            "AmE": "/ˌtiː ˈviː/",
            "definition": "a device for watching programmes",
            "examples": [
               "I watch TV.",
               "She turned on the TV.",
               "The TV shows news."
            ]
         },
         {
            "id": 97,
            "saved": false,
            "word": "umbrella",
            "role": "noun",
            "BrE": "/ʌmˈbrelə/",
            "AmE": "/ʌmˈbrelə/",
            "definition": "an object to protect from rain",
            "examples": [
               "I use an umbrella.",
               "Her umbrella is red.",
               "He forgot his umbrella."
            ]
         },
         {
            "id": 97,
            "saved": false,
            "word": "understand",
            "role": "verb",
            "BrE": "/ˌʌndəˈstænd/",
            "AmE": "/ˌʌndərˈstænd/",
            "definition": "to know the meaning of something",
            "examples": [
               "I understand you.",
               "She understands the book.",
               "He understood the lesson."
            ]
         },
         {
            "id": 97,
            "saved": false,
            "word": "up",
            "role": "preposition",
            "BrE": "/ʌp/",
            "AmE": "/ʌp/",
            "definition": "towards a higher place",
            "examples": [
               "I go up the stairs.",
               "She climbed up the hill.",
               "The balloon went up."
            ]
         },
         {
            "id": 97,
            "saved": false,
            "word": "use",
            "role": "noun",
            "BrE": "/juːs/",
            "AmE": "/juːs/",
            "definition": "the act of using something",
            "examples": [
               "The use of pens is common.",
               "She made good use of time.",
               "His use of tools was skillful."
            ]
         },
         {
            "id": 97,
            "saved": false,
            "word": "very",
            "role": "adjective",
            "BrE": "/ˈveri/",
            "AmE": "/ˈveri/",
            "definition": "to a great degree",
            "examples": [
               "It’s very cold.",
               "She is very happy.",
               "The very big dog ran fast."
            ]
         },
         {
            "id": 98,
            "saved": false,
            "word": "visit",
            "role": "noun",
            "BrE": "/ˈvɪzɪt/",
            "AmE": "/ˈvɪzɪt/",
            "definition": "an act of going to see a person or place",
            "examples": [
               "I made a visit.",
               "Her visit was fun.",
               "The visit to the zoo was great."
            ]
         },
         {
            "id": 98,
            "saved": false,
            "word": "wait",
            "role": "noun",
            "BrE": "/weɪt/",
            "AmE": "/weɪt/",
            "definition": "the act of staying until something happens",
            "examples": [
               "I had a long wait.",
               "Her wait was short.",
               "The wait for the bus was cold."
            ]
         },
         {
            "id": 98,
            "saved": false,
            "word": "walk",
            "role": "noun",
            "BrE": "/wɔːk/",
            "AmE": "/wɔːk/",
            "definition": "a short trip on foot",
            "examples": [
               "I took a walk.",
               "She went for a walk.",
               "The walk in the park was nice."
            ]
         },
         {
            "id": 98,
            "saved": false,
            "word": "want",
            "role": "noun",
            "BrE": "/wɒnt/",
            "AmE": "/wɑːnt/",
            "definition": "a desire for something",
            "examples": [
               "My want is a new book.",
               "Her want is to travel.",
               "His want for food was clear."
            ]
         },
         {
            "id": 98,
            "saved": false,
            "word": "water",
            "role": "verb",
            "BrE": "/ˈwɔːtə(r)/",
            "AmE": "/ˈwɔːtər/",
            "definition": "to pour water on plants",
            "examples": [
               "I water the plants.",
               "She watered the flowers.",
               "He waters the garden daily."
            ]
         },
         {
            "id": 98,
            "saved": false,
            "word": "way",
            "role": "noun",
            "BrE": "/weɪ/",
            "AmE": "/weɪ/",
            "definition": "a method or path",
            "examples": [
               "This is the way.",
               "She found a new way to learn.",
               "The way to school is short."
            ]
         },
         {
            "id": 98,
            "saved": false,
            "word": "wear",
            "role": "noun",
            "BrE": "/weə(r)/",
            "AmE": "/wer/",
            "definition": "the act of wearing something",
            "examples": [
               "Her wear is stylish.",
               "The wear of hats is common.",
               "His wear was casual."
            ]
         },
         {
            "id": 98,
            "saved": false,
            "word": "week",
            "role": "noun",
            "BrE": "/wiːk/",
            "AmE": "/wiːk/",
            "definition": "a period of seven days",
            "examples": [
               "This week is busy.",
               "She studies every week.",
               "The week was full of fun."
            ]
         },
         {
            "id": 98,
            "saved": false,
            "word": "well",
            "role": "adjective",
            "BrE": "/wel/",
            "AmE": "/wel/",
            "definition": "healthy or in good condition",
            "examples": [
               "I am well.",
               "She feels well today.",
               "The well dog runs fast."
            ]
         },
         {
            "id": 98,
            "saved": false,
            "word": "what",
            "role": "determiner",
            "BrE": "/wɒt/",
            "AmE": "/wɑːt/",
            "definition": "used to ask about something",
            "examples": [
               "What book is this?",
               "What time is the class?",
               "What colour is her dress?"
            ]
         },
         {
            "id": 99,
            "saved": false,
            "word": "when",
            "role": "conjunction",
            "BrE": "/wen/",
            "AmE": "/wen/",
            "definition": "at the time that",
            "examples": [
               "I smile when I’m happy.",
               "She left when it rained.",
               "He calls when he’s free."
            ]
         },
         {
            "id": 99,
            "saved": false,
            "word": "where",
            "role": "conjunction",
            "BrE": "/weə(r)/",
            "AmE": "/wer/",
            "definition": "in or to the place that",
            "examples": [
               "I go where she goes.",
               "Stay where you are.",
               "He lives where it’s quiet."
            ]
         },
         {
            "id": 99,
            "saved": false,
            "word": "which",
            "role": "determiner",
            "BrE": "/wɪtʃ/",
            "AmE": "/wɪtʃ/",
            "definition": "used to specify one thing from a group",
            "examples": [
               "Which book is yours?",
               "Which pen do you want?",
               "Which car is faster?"
            ]
         },
         {
            "id": 99,
            "saved": false,
            "word": "white",
            "role": "adjective",
            "BrE": "/waɪt/",
            "AmE": "/waɪt/",
            "definition": "having the colour of snow",
            "examples": [
               "The wall is white.",
               "She has a white dress.",
               "His white shirt is clean."
            ]
         },
         {
            "id": 99,
            "saved": false,
            "word": "who",
            "role": "pronoun",
            "BrE": "/huː/",
            "AmE": "/huː/",
            "definition": "used to refer to a person",
            "examples": [
               "Who is that?",
               "She’s the one who helped.",
               "Who took my book?"
            ]
         },
         {
            "id": 99,
            "saved": false,
            "word": "why",
            "role": "conjunction",
            "BrE": "/waɪ/",
            "AmE": "/waɪ/",
            "definition": "the reason for something",
            "examples": [
               "I know why she’s late.",
               "Tell me why you did it.",
               "That’s why I’m here."
            ]
         },
         {
            "id": 99,
            "saved": false,
            "word": "wind",
            "role": "noun",
            "BrE": "/wɪnd/",
            "AmE": "/wɪnd/",
            "definition": "air moving across the Earth",
            "examples": [
               "The wind is strong.",
               "She felt the wind outside.",
               "The wind blew the leaves."
            ]
         },
         {
            "id": 99,
            "saved": false,
            "word": "window",
            "role": "noun",
            "BrE": "/ˈwɪndəʊ/",
            "AmE": "/ˈwɪndoʊ/",
            "definition": "an opening in a wall for light or air",
            "examples": [
               "The window is open.",
               "She looked out the window.",
               "The window is big."
            ]
         },
         {
            "id": 99,
            "saved": false,
            "word": "winter",
            "role": "noun",
            "BrE": "/ˈwɪntə(r)/",
            "AmE": "/ˈwɪntər/",
            "definition": "the season after autumn",
            "examples": [
               "Winter is cold.",
               "We ski in winter.",
               "The winter was snowy."
            ]
         },
         {
            "id": 99,
            "saved": false,
            "word": "with",
            "role": "preposition",
            "BrE": "/wɪð/",
            "AmE": "/wɪð/",
            "definition": "together or using something",
            "examples": [
               "I am with my friend.",
               "She writes with a pen.",
               "He went with his sister."
            ]
         },
         {
            "id": 100,
            "saved": false,
            "word": "woman",
            "role": "noun",
            "BrE": "/ˈwʊmən/",
            "AmE": "/ˈwʊmən/",
            "definition": "an adult female person",
            "examples": [
               "The woman is kind.",
               "She is a strong woman.",
               "A woman helped me."
            ]
         },
         {
            "id": 100,
            "saved": false,
            "word": "work",
            "role": "noun",
            "BrE": "/wɜːk/",
            "AmE": "/wɜːrk/",
            "definition": "a job or activity you do",
            "examples": [
               "I have work today.",
               "Her work is teaching.",
               "His work keeps him busy."
            ]
         },
         {
            "id": 100,
            "saved": false,
            "word": "world",
            "role": "noun",
            "BrE": "/wɜːld/",
            "AmE": "/wɜːrld/",
            "definition": "the Earth or all people and places",
            "examples": [
               "The world is big.",
               "She travels the world.",
               "He wants to see the world."
            ]
         },
         {
            "id": 100,
            "saved": false,
            "word": "write",
            "role": "verb",
            "BrE": "/raɪt/",
            "AmE": "/raɪt/",
            "definition": "to make words on paper or a screen",
            "examples": [
               "I write a letter.",
               "She wrote a story.",
               "He writes in his notebook."
            ]
         },
         {
            "id": 100,
            "saved": false,
            "word": "year",
            "role": "noun",
            "BrE": "/jɪə(r)/",
            "AmE": "/jɪr/",
            "definition": "a period of twelve months",
            "examples": [
               "This year is fun.",
               "She is ten years old.",
               "The year was very warm."
            ]
         },
         {
            "id": 100,
            "saved": false,
            "word": "yellow",
            "role": "adjective",
            "BrE": "/ˈjeləʊ/",
            "AmE": "/ˈjeloʊ/",
            "definition": "having the colour of lemons",
            "examples": [
               "The flower is yellow.",
               "She has a yellow bag.",
               "His yellow car is bright."
            ]
         },
         {
            "id": 100,
            "saved": false,
            "word": "yes",
            "role": "exclamation",
            "BrE": "/jes/",
            "AmE": "/jes/",
            "definition": "used to agree or confirm",
            "examples": [
               "Yes, I agree.",
               "She said yes to the plan.",
               "Yes, I’ll come."
            ]
         },
         {
            "id": 100,
            "saved": false,
            "word": "yesterday",
            "role": "noun",
            "BrE": "/ˈjestədeɪ/",
            "AmE": "/ˈjestərdeɪ/",
            "definition": "the day before today",
            "examples": [
               "Yesterday was sunny.",
               "She called me yesterday.",
               "We went there yesterday."
            ]
         },
         {
            "id": 100,
            "saved": false,
            "word": "you",
            "role": "pronoun",
            "BrE": "/juː/",
            "AmE": "/juː/",
            "definition": "the person or people being spoken to",
            "examples": [
               "You are my friend.",
               "Can you help me?",
               "You went to the park."
            ]
         },
         {
            "id": 100,
            "saved": false,
            "word": "young",
            "role": "adjective",
            "BrE": "/jʌŋ/",
            "AmE": "/jʌŋ/",
            "definition": "having a low age",
            "examples": [
               "The boy is young.",
               "She has a young sister.",
               "The young dog is playful."
            ]
         },
         
         {
            "id": 101,
            "saved": false,
            "word": "address",
            "role": "noun",
            "BrE": "/əˈdres/",
            "AmE": "/əˈdres/",
            "definition": "the details of where someone lives or works",
            "examples": [
               "My address is simple.",
               "She wrote her address.",
               "The address is on the letter."
            ]
         },
         {
            "id": 101,
            "saved": false,
            "word": "afternoon",
            "role": "noun",
            "BrE": "/ˌæftəˈnuːn/",
            "AmE": "/ˌæftərˈnuːn/",
            "definition": "the time from midday to evening",
            "examples": [
               "Good afternoon!",
               "She works in the afternoon.",
               "The afternoon was warm."
            ]
         },
         {
            "id": 101,
            "saved": false,
            "word": "again",
            "role": "adverb",
            "BrE": "/əˈɡen/",
            "AmE": "/əˈɡen/",
            "definition": "one more time",
            "examples": [
               "Say it again.",
               "She called again yesterday.",
               "He will try again tomorrow."
            ]
         },
         {
            "id": 101,
            "saved": false,
            "word": "age",
            "role": "noun",
            "BrE": "/eɪdʒ/",
            "AmE": "/eɪdʒ/",
            "definition": "how old someone or something is",
            "examples": [
               "My age is ten.",
               "Her age is a secret.",
               "The age of the tree is old."
            ]
         },
         {
            "id": 101,
            "word": "reply",
            "role": "verb",
            "BrE": "/rɪˈplaɪ/",
            "AmE": "/rɪˈplaɪ/",
            "definition": "to answer or respond to something",
            "examples": [
               "She replied to the email.",
               "He replied with a smile.",
               "They replied promptly to the question."
            ]
         },
         {
            "id": 101,
            "saved": false,
            "word": "arm",
            "role": "noun",
            "BrE": "/ɑːm/",
            "AmE": "/ɑːrm/",
            "definition": "the part of the body from shoulder to hand",
            "examples": [
               "My arm is strong.",
               "She hurt her arm.",
               "He raised his arm to wave."
            ]
         },
         {
            "id": 101,
            "saved": false,
            "word": "arrive",
            "role": "verb",
            "BrE": "/əˈraɪv/",
            "AmE": "/əˈraɪv/",
            "definition": "to reach a place",
            "examples": [
               "I arrive at school.",
               "She arrived late.",
               "He arrives home at six."
            ]
         },
         {
            "id": 101,
            "saved": false,
            "word": "bag",
            "role": "noun",
            "BrE": "/bæɡ/",
            "AmE": "/bæɡ/",
            "definition": "a container for carrying things",
            "examples": [
               "My bag is heavy.",
               "She bought a new bag.",
               "The bag is on the chair."
            ]
         },
         {
            "id": 101,
            "saved": false,
            "word": "ball",
            "role": "noun",
            "BrE": "/bɔːl/",
            "AmE": "/bɔːl/",
            "definition": "a round object used in games",
            "examples": [
               "I kick a ball.",
               "She plays with a ball.",
               "The ball is in the garden."
            ]
         },
         {
            "id": 101,
            "saved": false,
            "word": "begin",
            "role": "verb",
            "BrE": "/bɪˈɡɪn/",
            "AmE": "/bɪˈɡɪn/",
            "definition": "to start something",
            "examples": [
               "I begin my work.",
               "She began to read.",
               "He begins school today."
            ]
         },
         {
            "id": 102,
            "saved": false,
            "word": "behind",
            "role": "preposition",
            "BrE": "/bɪˈhaɪnd/",
            "AmE": "/bɪˈhaɪnd/",
            "definition": "at the back of something",
            "examples": [
               "The cat is behind the door.",
               "She stood behind me.",
               "He hid behind the tree."
            ]
         },
         {
            "id": 102,
            "saved": false,
            "word": "best",
            "role": "adjective",
            "BrE": "/best/",
            "AmE": "/best/",
            "definition": "the most excellent",
            "examples": [
               "This is my best book.",
               "She is my best friend.",
               "He did his best work."
            ]
         },
         {
            "id": 102,
            "saved": false,
            "word": "bike",
            "role": "noun",
            "BrE": "/baɪk/",
            "AmE": "/baɪk/",
            "definition": "a bicycle",
            "examples": [
               "I ride a bike.",
               "Her bike is red.",
               "He rides his bike to school."
            ]
         },
         {
            "id": 102,
            "saved": false,
            "word": "bird",
            "role": "noun",
            "BrE": "/bɜːd/",
            "AmE": "/bɜːrd/",
            "definition": "an animal with wings and feathers",
            "examples": [
               "I see a bird.",
               "The bird is in the tree.",
               "She watched a bird fly."
            ]
         },
         {
            "id": 102,
            "saved": false,
            "word": "black",
            "role": "adjective",
            "BrE": "/blæk/",
            "AmE": "/blæk/",
            "definition": "having the darkest colour",
            "examples": [
               "The cat is black.",
               "She has a black dress.",
               "His black shoes are new."
            ]
         },
         {
            "id": 102,
            "saved": false,
            "word": "blue",
            "role": "adjective",
            "BrE": "/bluː/",
            "AmE": "/bluː/",
            "definition": "having the colour of the sky",
            "examples": [
               "The sky is blue.",
               "She wore a blue hat.",
               "His blue bag is big."
            ]
         },
         {
            "id": 102,
            "saved": false,
            "word": "boat",
            "role": "noun",
            "BrE": "/bəʊt/",
            "AmE": "/boʊt/",
            "definition": "a vehicle that travels on water",
            "examples": [
               "I see a boat.",
               "She sailed a boat.",
               "The boat is on the lake."
            ]
         },
         {
            "id": 102,
            "saved": false,
            "word": "body",
            "role": "noun",
            "BrE": "/ˈbɒdi/",
            "AmE": "/ˈbɑːdi/",
            "definition": "the whole physical structure of a person",
            "examples": [
               "My body is strong.",
               "She exercises her body.",
               "He hurt his body playing."
            ]
         },
         {
            "id": 102,
            "saved": false,
            "word": "box",
            "role": "noun",
            "BrE": "/bɒks/",
            "AmE": "/bɑːks/",
            "definition": "a container with a flat base",
            "examples": [
               "I have a box.",
               "She put toys in the box.",
               "The box is under the bed."
            ]
         },
         {
            "id": 102,
            "saved": false,
            "word": "bread",
            "role": "noun",
            "BrE": "/bred/",
            "AmE": "/bred/",
            "definition": "a food made from flour and water",
            "examples": [
               "I eat bread.",
               "She bought fresh bread.",
               "The bread is on the table."
            ]
         },
         {
            "id": 103,
            "saved": false,
            "word": "breakfast",
            "role": "noun",
            "BrE": "/ˈbrekfəst/",
            "AmE": "/ˈbrekfəst/",
            "definition": "the meal eaten in the morning",
            "examples": [
               "I eat breakfast.",
               "She had a big breakfast.",
               "Breakfast is at seven."
            ]
         },
         {
            "id": 103,
            "saved": false,
            "word": "bridge",
            "role": "noun",
            "BrE": "/brɪdʒ/",
            "AmE": "/brɪdʒ/",
            "definition": "a structure over a river or road",
            "examples": [
               "The bridge is old.",
               "She crossed the bridge.",
               "The bridge is near the park."
            ]
         },
         {
            "id": 103,
            "saved": false,
            "word": "brother",
            "role": "noun",
            "BrE": "/ˈbrʌðə(r)/",
            "AmE": "/ˈbrʌðər/",
            "definition": "a male sibling",
            "examples": [
               "My brother is tall.",
               "She loves her brother.",
               "The brother helped with homework."
            ]
         },
         {
            "id": 103,
            "saved": false,
            "word": "brown",
            "role": "adjective",
            "BrE": "/braʊn/",
            "AmE": "/braʊn/",
            "definition": "having the colour of wood or soil",
            "examples": [
               "The dog is brown.",
               "She has a brown bag.",
               "His brown shoes are old."
            ]
         },
         {
            "id": 103,
            "saved": false,
            "word": "bus",
            "role": "noun",
            "BrE": "/bʌs/",
            "AmE": "/bʌs/",
            "definition": "a large vehicle for many passengers",
            "examples": [
               "I take the bus.",
               "She missed the bus.",
               "The bus stops at the school."
            ]
         },
         {
            "id": 103,
            "saved": false,
            "word": "buy",
            "role": "verb",
            "BrE": "/baɪ/",
            "AmE": "/baɪ/",
            "definition": "to get something with money",
            "examples": [
               "I buy a book.",
               "She bought new shoes.",
               "He buys food every week."
            ]
         },
         {
            "id": 103,
            "saved": false,
            "word": "cake",
            "role": "noun",
            "BrE": "/keɪk/",
            "AmE": "/keɪk/",
            "definition": "a sweet food made from flour and sugar",
            "examples": [
               "I eat cake.",
               "She made a chocolate cake.",
               "The cake was delicious."
            ]
         },
         {
            "id": 103,
            "saved": false,
            "word": "car",
            "role": "noun",
            "BrE": "/kɑː(r)/",
            "AmE": "/kɑːr/",
            "definition": "a vehicle with four wheels",
            "examples": [
               "My car is red.",
               "She drives a car.",
               "The car is in the garage."
            ]
         },
         {
            "id": 103,
            "saved": false,
            "word": "chair",
            "role": "noun",
            "BrE": "/tʃeə(r)/",
            "AmE": "/tʃer/",
            "definition": "a seat for one person",
            "examples": [
               "I sit on a chair.",
               "She bought a new chair.",
               "The chair is by the table."
            ]
         },
         {
            "id": 103,
            "saved": false,
            "word": "child",
            "role": "noun",
            "BrE": "/tʃaɪld/",
            "AmE": "/tʃaɪld/",
            "definition": "a young person",
            "examples": [
               "The child is happy.",
               "She has one child.",
               "The child plays in the park."
            ]
         },
         {
            "id": 104,
            "saved": false,
            "word": "city",
            "role": "noun",
            "BrE": "/ˈsɪti/",
            "AmE": "/ˈsɪti/",
            "definition": "a large town",
            "examples": [
               "I live in a city.",
               "She visited a big city.",
               "The city is very busy."
            ]
         },
         {
            "id": 104,
            "saved": false,
            "word": "class",
            "role": "noun",
            "BrE": "/klɑːs/",
            "AmE": "/klæs/",
            "definition": "a group of students learning together",
            "examples": [
               "I go to class.",
               "Her class is fun.",
               "The class starts at nine."
            ]
         },
         {
            "id": 104,
            "saved": false,
            "word": "clock",
            "role": "noun",
            "BrE": "/klɒk/",
            "AmE": "/klɑːk/",
            "definition": "a device that shows the time",
            "examples": [
               "The clock is big.",
               "She looked at the clock.",
               "The clock shows three."
            ]
         },
         {
            "id": 104,
            "saved": false,
            "word": "clothes",
            "role": "noun",
            "BrE": "/kləʊðz/",
            "AmE": "/kloʊðz/",
            "definition": "things you wear",
            "examples": [
               "My clothes are new.",
               "She washed her clothes.",
               "The clothes are in the bag."
            ]
         },
         {
            "id": 104,
            "saved": false,
            "word": "cloud",
            "role": "noun",
            "BrE": "/klaʊd/",
            "AmE": "/klaʊd/",
            "definition": "a white or grey mass in the sky",
            "examples": [
               "I see a cloud.",
               "The cloud is white.",
               "Clouds covered the sky."
            ]
         },
         {
            "id": 104,
            "saved": false,
            "word": "coffee",
            "role": "noun",
            "BrE": "/ˈkɒfi/",
            "AmE": "/ˈkɔːfi/",
            "definition": "a hot drink made from beans",
            "examples": [
               "I drink coffee.",
               "She likes strong coffee.",
               "The coffee is on the table."
            ]
         },
         {
            "id": 104,
            "saved": false,
            "word": "colour",
            "role": "noun",
            "BrE": "/ˈkʌlə(r)/",
            "AmE": "/ˈkʌlər/",
            "definition": "what you see, like red or blue",
            "examples": [
               "My favourite colour is blue.",
               "She chose a bright colour.",
               "The colour of the car is red."
            ]
         },
         {
            "id": 104,
            "saved": false,
            "word": "computer",
            "role": "noun",
            "BrE": "/kəmˈpjuːtə(r)/",
            "AmE": "/kəmˈpjuːtər/",
            "definition": "an electronic device for information",
            "examples": [
               "I use a computer.",
               "She bought a new computer.",
               "The computer is on the desk."
            ]
         },
         {
            "id": 104,
            "saved": false,
            "word": "country",
            "role": "noun",
            "BrE": "/ˈkʌntri/",
            "AmE": "/ˈkʌntri/",
            "definition": "a nation or area outside cities",
            "examples": [
               "I love my country.",
               "She lives in the country.",
               "The country has green fields."
            ]
         },
         {
            "id": 104,
            "saved": false,
            "word": "cup",
            "role": "noun",
            "BrE": "/kʌp/",
            "AmE": "/kʌp/",
            "definition": "a small container for drinking",
            "examples": [
               "I drink from a cup.",
               "She has a red cup.",
               "The cup is full of tea."
            ]
         },
         {
            "id": 105,
            "saved": false,
            "word": "daughter",
            "role": "noun",
            "BrE": "/ˈdɔːtə(r)/",
            "AmE": "/ˈdɔːtər/",
            "definition": "a female child",
            "examples": [
               "My daughter is young.",
               "She loves her daughter.",
               "The daughter plays piano."
            ]
         },
         {
            "id": 105,
            "saved": false,
            "word": "day",
            "role": "noun",
            "BrE": "/deɪ/",
            "AmE": "/deɪ/",
            "definition": "a period of 24 hours",
            "examples": [
               "Today is a nice day.",
               "She works every day.",
               "The day was warm and sunny."
            ]
         },
         {
            "id": 105,
            "saved": false,
            "word": "desk",
            "role": "noun",
            "BrE": "/desk/",
            "AmE": "/desk/",
            "definition": "a table for working or studying",
            "examples": [
               "My desk is big.",
               "She put her book on the desk.",
               "The desk is in the room."
            ]
         },
         {
            "id": 105,
            "saved": false,
            "word": "dinner",
            "role": "noun",
            "BrE": "/ˈdɪnə(r)/",
            "AmE": "/ˈdɪnər/",
            "definition": "the main meal of the day",
            "examples": [
               "I eat dinner.",
               "She cooked dinner.",
               "Dinner is at seven."
            ]
         },
         {
            "id": 105,
            "saved": false,
            "word": "dog",
            "role": "noun",
            "BrE": "/dɒɡ/",
            "AmE": "/dɔːɡ/",
            "definition": "a common pet animal",
            "examples": [
               "My dog is small.",
               "She walks her dog.",
               "The dog runs in the park."
            ]
         },
         {
            "id": 105,
            "saved": false,
            "word": "door",
            "role": "noun",
            "BrE": "/dɔː(r)/",
            "AmE": "/dɔːr/",
            "definition": "a way to enter or leave a room",
            "examples": [
               "The door is open.",
               "She closed the door.",
               "The door is red."
            ]
         },
         {
            "id": 105,
            "saved": false,
            "word": "dress",
            "role": "noun",
            "BrE": "/dres/",
            "AmE": "/dres/",
            "definition": "a piece of clothing for women or girls",
            "examples": [
               "Her dress is blue.",
               "She wore a new dress.",
               "The dress is in the shop."
            ]
         },
         {
            "id": 105,
            "saved": false,
            "word": "drink",
            "role": "noun",
            "BrE": "/drɪŋk/",
            "AmE": "/drɪŋk/",
            "definition": "a liquid you swallow",
            "examples": [
               "I want a drink.",
               "She bought a cold drink.",
               "The drink is in the fridge."
            ]
         },
         {
            "id": 105,
            "saved": false,
            "word": "ear",
            "role": "noun",
            "BrE": "/ɪə(r)/",
            "AmE": "/ɪr/",
            "definition": "the part of the body used for hearing",
            "examples": [
               "My ear hurts.",
               "She whispered in his ear.",
               "The ear of the dog is soft."
            ]
         },
         {
            "id": 105,
            "saved": false,
            "word": "eat",
            "role": "verb",
            "BrE": "/iːt/",
            "AmE": "/iːt/",
            "definition": "to put food in your mouth and swallow",
            "examples": [
               "I eat an apple.",
               "She eats breakfast daily.",
               "He ate dinner with his family."
            ]
         },
         {
            "id": 106,
            "saved": false,
            "word": "eight",
            "role": "number",
            "BrE": "/eɪt/",
            "AmE": "/eɪt/",
            "definition": "the number 8",
            "examples": [
               "I have eight books.",
               "She is eight years old.",
               "Eight students are here."
            ]
         },
         {
            "id": 106,
            "saved": false,
            "word": "evening",
            "role": "noun",
            "BrE": "/ˈiːvnɪŋ/",
            "AmE": "/ˈiːvnɪŋ/",
            "definition": "the time from late afternoon to night",
            "examples": [
               "Good evening!",
               "She reads in the evening.",
               "The evening was cool."
            ]
         },
         {
            "id": 106,
            "saved": false,
            "word": "eye",
            "role": "noun",
            "BrE": "/aɪ/",
            "AmE": "/aɪ/",
            "definition": "the part of the body used for seeing",
            "examples": [
               "My eye is blue.",
               "She closed her eyes.",
               "The eye of the cat is green."
            ]
         },
         {
            "id": 106,
            "saved": false,
            "word": "face",
            "role": "noun",
            "BrE": "/feɪs/",
            "AmE": "/feɪs/",
            "definition": "the front part of the head",
            "examples": [
               "Her face is happy.",
               "He washed his face.",
               "The face in the photo is clear."
            ]
         },
         {
            "id": 106,
            "saved": false,
            "word": "farm",
            "role": "noun",
            "BrE": "/fɑːm/",
            "AmE": "/fɑːrm/",
            "definition": "a place where animals or crops are grown",
            "examples": [
               "I visit a farm.",
               "She works on a farm.",
               "The farm has many cows."
            ]
         },
         {
            "id": 106,
            "saved": false,
            "word": "fast",
            "role": "adverb",
            "BrE": "/fɑːst/",
            "AmE": "/fæst/",
            "definition": "quickly",
            "examples": [
               "I run fast.",
               "She drives fast.",
               "He walks fast to school."
            ]
         },
         {
            "id": 106,
            "saved": false,
            "word": "fish",
            "role": "verb",
            "BrE": "/fɪʃ/",
            "AmE": "/fɪʃ/",
            "definition": "to try to catch fish",
            "examples": [
               "I fish in the river.",
               "She fished all day.",
               "He fishes with his dad."
            ]
         },
         {
            "id": 106,
            "saved": false,
            "word": "flower",
            "role": "noun",
            "BrE": "/ˈflaʊə(r)/",
            "AmE": "/ˈflaʊər/",
            "definition": "the colourful part of a plant",
            "examples": [
               "The flower is red.",
               "She picked a flower.",
               "The flower is in the garden."
            ]
         },
         {
            "id": 106,
            "saved": false,
            "word": "fly",
            "role": "verb",
            "BrE": "/flaɪ/",
            "AmE": "/flaɪ/",
            "definition": "to move through the air",
            "examples": [
               "Birds fly in the sky.",
               "She flies to London.",
               "He flew a kite yesterday."
            ]
         },
         {
            "id": 106,
            "saved": false,
            "word": "food",
            "role": "noun",
            "BrE": "/fuːd/",
            "AmE": "/fuːd/",
            "definition": "things you eat",
            "examples": [
               "I like food.",
               "She cooked tasty food.",
               "The food is on the table."
            ]
         },
         {
            "id": 107,
            "saved": false,
            "word": "foot",
            "role": "noun",
            "BrE": "/fʊt/",
            "AmE": "/fʊt/",
            "definition": "the part of the body you walk on",
            "examples": [
               "My foot hurts.",
               "She washed her feet.",
               "The foot of the dog is wet."
            ]
         },
         {
            "id": 107,
            "saved": false,
            "word": "friend",
            "role": "noun",
            "BrE": "/frend/",
            "AmE": "/frend/",
            "definition": "a person you like and know well",
            "examples": [
               "My friend is nice.",
               "She met her friend at school.",
               "He plays with his friends."
            ]
         },
         {
            "id": 107,
            "saved": false,
            "word": "fruit",
            "role": "noun",
            "BrE": "/fruːt/",
            "AmE": "/fruːt/",
            "definition": "sweet food from plants, like apples",
            "examples": [
               "I eat fruit.",
               "She likes fresh fruit.",
               "The fruit is in the bowl."
            ]
         },
         {
            "id": 107,
            "saved": false,
            "word": "funny",
            "role": "adjective",
            "BrE": "/ˈfʌni/",
            "AmE": "/ˈfʌni/",
            "definition": "making you laugh",
            "examples": [
               "The story is funny.",
               "She told a funny joke.",
               "His funny face made me smile."
            ]
         },
         {
            "id": 107,
            "saved": false,
            "word": "garden",
            "role": "noun",
            "BrE": "/ˈɡɑːdn/",
            "AmE": "/ˈɡɑːrdn/",
            "definition": "an area where plants or flowers grow",
            "examples": [
               "The garden is green.",
               "She works in the garden.",
               "He planted flowers in the garden."
            ]
         },
         {
            "id": 107,
            "saved": false,
            "word": "girl",
            "role": "noun",
            "BrE": "/ɡɜːl/",
            "AmE": "/ɡɜːrl/",
            "definition": "a young female person",
            "examples": [
               "The girl is happy.",
               "She is a kind girl.",
               "The girl reads a book."
            ]
         },
         {
            "id": 107,
            "saved": false,
            "word": "glass",
            "role": "noun",
            "BrE": "/ɡlɑːs/",
            "AmE": "/ɡlæs/",
            "definition": "a container for drinking made of glass",
            "examples": [
               "I drink from a glass.",
               "She broke a glass.",
               "The glass is full of water."
            ]
         },
         {
            "id": 107,
            "saved": false,
            "word": "goodbye",
            "role": "exclamation",
            "BrE": "/ˌɡʊdˈbaɪ/",
            "AmE": "/ˌɡʊdˈbaɪ/",
            "definition": "used when leaving someone",
            "examples": [
               "Goodbye, see you!",
               "She said goodbye to her friend.",
               "He waved goodbye at the door."
            ]
         },
         {
            "id": 107,
            "saved": false,
            "word": "grass",
            "role": "noun",
            "BrE": "/ɡrɑːs/",
            "AmE": "/ɡræs/",
            "definition": "a green plant covering the ground",
            "examples": [
               "The grass is green.",
               "She sat on the grass.",
               "The grass needs cutting."
            ]
         },
         {
            "id": 107,
            "saved": false,
            "word": "hand",
            "role": "noun",
            "BrE": "/hænd/",
            "AmE": "/hænd/",
            "definition": "the part of the body at the end of the arm",
            "examples": [
               "My hand is clean.",
               "She held his hand.",
               "The hand of the clock moves."
            ]
         },
         {
            "id": 108,
            "saved": false,
            "word": "head",
            "role": "noun",
            "BrE": "/hed/",
            "AmE": "/hed/",
            "definition": "the top part of the body",
            "examples": [
               "My head hurts.",
               "She touched her head.",
               "The head of the dog is big."
            ]
         },
         {
            "id": 108,
            "saved": false,
            "word": "holiday",
            "role": "noun",
            "BrE": "/ˈhɒlədeɪ/",
            "AmE": "/ˈhɑːlədeɪ/",
            "definition": "a time when you don’t work or study",
            "examples": [
               "I love holidays.",
               "She went on holiday.",
               "The holiday was fun."
            ]
         },
         {
            "id": 108,
            "saved": false,
            "word": "horse",
            "role": "noun",
            "BrE": "/hɔːs/",
            "AmE": "/hɔːrs/",
            "definition": "a large animal used for riding",
            "examples": [
               "I see a horse.",
               "She rides a horse.",
               "The horse runs fast."
            ]
         },
         {
            "id": 108,
            "saved": false,
            "word": "hospital",
            "role": "noun",
            "BrE": "/ˈhɒspɪtl/",
            "AmE": "/ˈhɑːspɪtl/",
            "definition": "a place where sick people are treated",
            "examples": [
               "The hospital is big.",
               "She works in a hospital.",
               "He visited the hospital."
            ]
         },
         {
            "id": 108,
            "saved": false,
            "word": "hotel",
            "role": "noun",
            "BrE": "/həʊˈtel/",
            "AmE": "/hoʊˈtel/",
            "definition": "a place where people stay and pay",
            "examples": [
               "I stay in a hotel.",
               "She booked a hotel.",
               "The hotel is near the sea."
            ]
         },
         {
            "id": 108,
            "saved": false,
            "word": "hour",
            "role": "noun",
            "BrE": "/aʊə(r)/",
            "AmE": "/aʊr/",
            "definition": "a period of 60 minutes",
            "examples": [
               "I wait an hour.",
               "She slept for an hour.",
               "The class is one hour long."
            ]
         },
         {
            "id": 108,
            "saved": false,
            "word": "ice",
            "role": "noun",
            "BrE": "/aɪs/",
            "AmE": "/aɪs/",
            "definition": "frozen water",
            "examples": [
               "The ice is cold.",
               "She put ice in her drink.",
               "Ice covered the lake."
            ]
         },
         {
            "id": 108,
            "saved": false,
            "word": "idea",
            "role": "noun",
            "BrE": "/aɪˈdɪə/",
            "AmE": "/aɪˈdiːə/",
            "definition": "a thought or plan",
            "examples": [
               "I have an idea.",
               "She had a good idea.",
               "His idea was to play."
            ]
         },
         {
            "id": 108,
            "saved": false,
            "word": "important",
            "role": "adjective",
            "BrE": "/ɪmˈpɔːtnt/",
            "AmE": "/ɪmˈpɔːrtnt/",
            "definition": "having great value or meaning",
            "examples": [
               "This is important.",
               "She has an important job.",
               "The important book is here."
            ]
         },
         {
            "id": 108,
            "saved": false,
            "word": "inside",
            "role": "preposition",
            "BrE": "/ɪnˈsaɪd/",
            "AmE": "/ɪnˈsaɪd/",
            "definition": "in or into something",
            "examples": [
               "I am inside the house.",
               "She looked inside the box.",
               "The cat is inside the room."
            ]
         },
         {
            "id": 109,
            "saved": false,
            "word": "juice",
            "role": "noun",
            "BrE": "/dʒuːs/",
            "AmE": "/dʒuːs/",
            "definition": "a liquid from fruit or vegetables",
            "examples": [
               "I drink juice.",
               "She likes orange juice.",
               "The juice is in the glass."
            ]
         },
         {
            "id": 109,
            "saved": false,
            "word": "jump",
            "role": "verb",
            "BrE": "/dʒʌmp/",
            "AmE": "/dʒʌmp/",
            "definition": "to push yourself off the ground",
            "examples": [
               "I jump high.",
               "She jumped over the rope.",
               "He jumps in the park."
            ]
         },
         {
            "id": 109,
            "saved": false,
            "word": "key",
            "role": "noun",
            "BrE": "/kiː/",
            "AmE": "/kiː/",
            "definition": "a metal object to open a lock",
            "examples": [
               "I lost my key.",
               "She found the key.",
               "The key is on the table."
            ]
         },
         {
            "id": 109,
            "saved": false,
            "word": "kitchen",
            "role": "noun",
            "BrE": "/ˈkɪtʃɪn/",
            "AmE": "/ˈkɪtʃɪn/",
            "definition": "a room where food is prepared",
            "examples": [
               "The kitchen is clean.",
               "She cooks in the kitchen.",
               "The kitchen has a big table."
            ]
         },
         {
            "id": 109,
            "saved": false,
            "word": "leg",
            "role": "noun",
            "BrE": "/leɡ/",
            "AmE": "/leɡ/",
            "definition": "the part of the body you walk with",
            "examples": [
               "My leg is strong.",
               "She hurt her leg.",
               "The leg of the dog is fast."
            ]
         },
         {
            "id": 109,
            "saved": false,
            "word": "lesson",
            "role": "noun",
            "BrE": "/ˈlesn/",
            "AmE": "/ˈlesn/",
            "definition": "a period of learning",
            "examples": [
               "I have a lesson.",
               "She likes her lesson.",
               "The lesson was about math."
            ]
         },
         {
            "id": 109,
            "saved": false,
            "word": "light",
            "role": "noun",
            "BrE": "/laɪt/",
            "AmE": "/laɪt/",
            "definition": "energy that makes things visible",
            "examples": [
               "The light is bright.",
               "She turned on the light.",
               "The light is in the room."
            ]
         },
         {
            "id": 109,
            "saved": false,
            "word": "like",
            "role": "preposition",
            "BrE": "/laɪk/",
            "AmE": "/laɪk/",
            "definition": "similar to something",
            "examples": [
               "It looks like rain.",
               "She sings like a bird.",
               "He runs like his brother."
            ]
         },
         {
            "id": 109,
            "saved": false,
            "word": "live",
            "role": "adjective",
            "BrE": "/laɪv/",
            "AmE": "/laɪv/",
            "definition": "alive or happening now",
            "examples": [
               "The live show is fun.",
               "She saw a live concert.",
               "The live animal is in the zoo."
            ]
         },
         {
            "id": 109,
            "saved": false,
            "word": "love",
            "role": "noun",
            "BrE": "/lʌv/",
            "AmE": "/lʌv/",
            "definition": "a strong feeling of affection",
            "examples": [
               "I feel love.",
               "Her love for music is big.",
               "His love for dogs is clear."
            ]
         },
         {
            "id": 110,
            "saved": false,
            "word": "market",
            "role": "noun",
            "BrE": "/ˈmɑːkɪt/",
            "AmE": "/ˈmɑːrkɪt/",
            "definition": "a place where things are sold",
            "examples": [
               "I go to the market.",
               "She bought fruit at the market.",
               "The market is busy today."
            ]
         },
         {
            "id": 110,
            "saved": false,
            "word": "minute",
            "role": "noun",
            "BrE": "/ˈmɪnɪt/",
            "AmE": "/ˈmɪnɪt/",
            "definition": "a period of 60 seconds",
            "examples": [
               "Wait a minute.",
               "She was late by a minute.",
               "The minute passed quickly."
            ]
         },
         {
            "id": 110,
            "saved": false,
            "word": "moon",
            "role": "noun",
            "BrE": "/muːn/",
            "AmE": "/muːn/",
            "definition": "the large object in the night sky",
            "examples": [
               "The moon is bright.",
               "She saw the moon.",
               "The moon is full tonight."
            ]
         },
         {
            "id": 110,
            "saved": false,
            "word": "mountain",
            "role": "noun",
            "BrE": "/ˈmaʊntən/",
            "AmE": "/ˈmaʊntən/",
            "definition": "a very high hill",
            "examples": [
               "The mountain is big.",
               "She climbed the mountain.",
               "The mountain has snow."
            ]
         },
         {
            "id": 110,
            "saved": false,
            "word": "mouth",
            "role": "noun",
            "BrE": "/maʊθ/",
            "AmE": "/maʊθ/",
            "definition": "the part of the face for eating and speaking",
            "examples": [
               "My mouth is dry.",
               "She opened her mouth.",
               "The mouth of the dog is big."
            ]
         },
         {
            "id": 110,
            "saved": false,
            "word": "music",
            "role": "noun",
            "BrE": "/ˈmjuːzɪk/",
            "AmE": "/ˈmjuːzɪk/",
            "definition": "sounds that are pleasant, like songs",
            "examples": [
               "I like music.",
               "She plays music.",
               "The music was loud."
            ]
         },
         {
            "id": 110,
            "saved": false,
            "word": "night",
            "role": "noun",
            "BrE": "/naɪt/",
            "AmE": "/naɪt/",
            "definition": "the time when it is dark outside",
            "examples": [
               "I sleep at night.",
               "The stars shine at night.",
               "She stayed up late last night."
            ]
         },
         {
            "id": 110,
            "saved": false,
            "word": "noise",
            "role": "noun",
            "BrE": "/nɔɪz/",
            "AmE": "/nɔɪz/",
            "definition": "a loud or unpleasant sound",
            "examples": [
               "I hear a noise.",
               "She made a noise.",
               "The noise was from the car."
            ]
         },
         {
            "id": 110,
            "saved": false,
            "word": "open",
            "role": "verb",
            "BrE": "/ˈəʊpən/",
            "AmE": "/ˈoʊpən/",
            "definition": "to make something not closed",
            "examples": [
               "I open the door.",
               "She opened her book.",
               "He opens the shop every morning."
            ]
         },
         {
            "id": 110,
            "saved": false,
            "word": "outside",
            "role": "preposition",
            "BrE": "/ˌaʊtˈsaɪd/",
            "AmE": "/ˌaʊtˈsaɪd/",
            "definition": "not inside something",
            "examples": [
               "I play outside.",
               "She waited outside the house.",
               "The dog is outside the door."
            ]
         },
         {
            "id": 111,
            "saved": false,
            "word": "park",
            "role": "verb",
            "BrE": "/pɑːk/",
            "AmE": "/pɑːrk/",
            "definition": "to stop and leave a vehicle",
            "examples": [
               "I park my car.",
               "She parked near the shop.",
               "He parks in the garage."
            ]
         },
         {
            "id": 111,
            "saved": false,
            "word": "pen",
            "role": "noun",
            "BrE": "/pen/",
            "AmE": "/pen/",
            "definition": "a tool for writing with ink",
            "examples": [
               "I write with a pen.",
               "Her pen is blue.",
               "He lost his pen at school."
            ]
         },
         {
            "id": 111,
            "saved": false,
            "word": "place",
            "role": "verb",
            "BrE": "/pleɪs/",
            "AmE": "/pleɪs/",
            "definition": "to put something in a position",
            "examples": [
               "I place the book here.",
               "She placed her bag on the table.",
               "He places his shoes by the door."
            ]
         },
         {
            "id": 111,
            "saved": false,
            "word": "play",
            "role": "noun",
            "BrE": "/pleɪ/",
            "AmE": "/pleɪ/",
            "definition": "an activity done for fun",
            "examples": [
               "I enjoy play time.",
               "Her play was with dolls.",
               "The play in the park was fun."
            ]
         },
         {
            "id": 111,
            "saved": false,
            "word": "rain",
            "role": "noun",
            "BrE": "/reɪn/",
            "AmE": "/reɪn/",
            "definition": "water falling from the sky",
            "examples": [
               "The rain is heavy.",
               "She likes the rain.",
               "Rain fell all day."
            ]
         },
         {
            "id": 111,
            "saved": false,
            "word": "read",
            "role": "noun",
            "BrE": "/riːd/",
            "AmE": "/riːd/",
            "definition": "the act of reading",
            "examples": [
               "I had a good read.",
               "Her read was interesting.",
               "The read of the book was fun."
            ]
         },
         {
            "id": 111,
            "saved": false,
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
            "id": 111,
            "saved": false,
            "word": "road",
            "role": "noun",
            "BrE": "/rəʊd/",
            "AmE": "/roʊd/",
            "definition": "a path for vehicles or walking",
            "examples": [
               "The road is long.",
               "She lives on this road.",
               "The road to the city is busy."
            ]
         },
         {
            "id": 111,
            "saved": false,
            "word": "run",
            "role": "noun",
            "BrE": "/rʌn/",
            "AmE": "/rʌn/",
            "definition": "the act of running",
            "examples": [
               "I went for a run.",
               "Her run was fast.",
               "The run in the park was fun."
            ]
         },
         {
            "id": 111,
            "saved": false,
            "word": "school",
            "role": "noun",
            "BrE": "/skuːl/",
            "AmE": "/skuːl/",
            "definition": "a place where children learn",
            "examples": [
               "I go to school.",
               "Her school is big.",
               "The school has a playground."
            ]
         },
         {
            "id": 112,
            "saved": false,
            "word": "sea",
            "role": "noun",
            "BrE": "/siː/",
            "AmE": "/siː/",
            "definition": "a large body of salt water",
            "examples": [
               "The sea is blue.",
               "She swam in the sea.",
               "The sea is near the town."
            ]
         },
         {
            "id": 112,
            "saved": false,
            "word": "shop",
            "role": "noun",
            "BrE": "/ʃɒp/",
            "AmE": "/ʃɑːp/",
            "definition": "a place where things are sold",
            "examples": [
               "I go to the shop.",
               "She bought a dress in the shop.",
               "The shop is open now."
            ]
         },
         {
            "id": 112,
            "saved": false,
            "word": "sing",
            "role": "verb",
            "BrE": "/sɪŋ/",
            "AmE": "/sɪŋ/",
            "definition": "to make musical sounds with your voice",
            "examples": [
               "I sing a song.",
               "She sings beautifully.",
               "He sang at the party."
            ]
         },
         {
            "id": 112,
            "saved": false,
            "word": "sister",
            "role": "noun",
            "BrE": "/ˈsɪstə(r)/",
            "AmE": "/ˈsɪstər/",
            "definition": "a female sibling",
            "examples": [
               "My sister is kind.",
               "She plays with her sister.",
               "The sister helped with homework."
            ]
         },
         {
            "id": 112,
            "saved": false,
            "word": "sit",
            "role": "verb",
            "BrE": "/sɪt/",
            "AmE": "/sɪt/",
            "definition": "to rest on a chair or surface",
            "examples": [
               "I sit on a chair.",
               "She sat on the bench.",
               "He sits in the classroom."
            ]
         },
         {
            "id": 112,
            "saved": false,
            "word": "six",
            "role": "number",
            "BrE": "/sɪks/",
            "AmE": "/sɪks/",
            "definition": "the number 6",
            "examples": [
               "I have six books.",
               "She is six years old.",
               "Six students are in the class."
            ]
         },
         {
            "id": 112,
            "saved": false,
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
            "id": 112,
            "saved": false,
            "word": "snow",
            "role": "noun",
            "BrE": "/snəʊ/",
            "AmE": "/snoʊ/",
            "definition": "soft white pieces falling from the sky",
            "examples": [
               "The snow is white.",
               "She played in the snow.",
               "Snow covered the ground."
            ]
         },
         {
            "id": 112,
            "saved": false,
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
            "id": 112,
            "saved": false,
            "word": "star",
            "role": "noun",
            "BrE": "/stɑː(r)/",
            "AmE": "/stɑːr/",
            "definition": "a bright object in the night sky",
            "examples": [
               "I see a star.",
               "She looked at the stars.",
               "The star is bright tonight."
            ]
         },
         {
            "id": 113,
            "saved": false,
            "word": "stop",
            "role": "verb",
            "BrE": "/stɒp/",
            "AmE": "/stɑːp/",
            "definition": "to end an action or movement",
            "examples": [
               "I stop the car.",
               "She stopped talking.",
               "He stops at the shop."
            ]
         },
         {
            "id": 113,
            "saved": false,
            "word": "street",
            "role": "noun",
            "BrE": "/striːt/",
            "AmE": "/striːt/",
            "definition": "a road in a city or town",
            "examples": [
               "The street is busy.",
               "She lives on this street.",
               "The street has many shops."
            ]
         },
         {
            "id": 113,
            "saved": false,
            "word": "student",
            "role": "noun",
            "BrE": "/ˈstjuːdnt/",
            "AmE": "/ˈstuːdnt/",
            "definition": "a person who studies",
            "examples": [
               "I am a student.",
               "She is a good student.",
               "The student reads a book."
            ]
         },
         {
            "id": 113,
            "saved": false,
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
            "id": 113,
            "saved": false,
            "word": "table",
            "role": "noun",
            "BrE": "/ˈteɪbl/",
            "AmE": "/ˈteɪbl/",
            "definition": "a piece of furniture with a flat top",
            "examples": [
               "The table is big.",
               "She put her book on the table.",
               "The table is in the kitchen."
            ]
         },
         {
            "id": 113,
            "saved": false,
            "word": "talk",
            "role": "verb",
            "BrE": "/tɔːk/",
            "AmE": "/tɔːk/",
            "definition": "to speak or have a conversation",
            "examples": [
               "I talk to my friend.",
               "She talked about school.",
               "He talks with his teacher."
            ]
         },
         {
            "id": 113,
            "saved": false,
            "word": "tea",
            "role": "noun",
            "BrE": "/tiː/",
            "AmE": "/tiː/",
            "definition": "a hot drink made from leaves",
            "examples": [
               "I drink tea.",
               "She likes green tea.",
               "The tea is in the cup."
            ]
         },
         {
            "id": 113,
            "saved": false,
            "word": "teach",
            "role": "verb",
            "BrE": "/tiːtʃ/",
            "AmE": "/tiːtʃ/",
            "definition": "to give lessons or knowledge",
            "examples": [
               "I teach math.",
               "She teaches English.",
               "He taught his class yesterday."
            ]
         },
         {
            "id": 113,
            "saved": false,
            "word": "ten",
            "role": "number",
            "BrE": "/ten/",
            "AmE": "/ten/",
            "definition": "the number 10",
            "examples": [
               "I have ten pens.",
               "She is ten years old.",
               "Ten students are here."
            ]
         },
         {
            "id": 113,
            "saved": false,
            "word": "test",
            "role": "noun",
            "BrE": "/test/",
            "AmE": "/test/",
            "definition": "an exam to check knowledge",
            "examples": [
               "I have a test.",
               "She passed the test.",
               "The test was about English."
            ]
         },
         {
            "id": 114,
            "saved": false,
            "word": "their",
            "role": "determiner",
            "BrE": "/ðeə(r)/",
            "AmE": "/ðer/",
            "definition": "belonging to them",
            "examples": [
               "This is their book.",
               "Their dog is big.",
               "I saw their new car."
            ]
         },
         {
            "id": 114,
            "saved": false,
            "word": "there",
            "role": "adverb",
            "BrE": "/ðeə(r)/",
            "AmE": "/ðer/",
            "definition": "in or to that place",
            "examples": [
               "I go there.",
               "She lives there.",
               "The book is over there."
            ]
         },
         {
            "id": 114,
            "saved": false,
            "word": "they",
            "role": "pronoun",
            "BrE": "/ðeɪ/",
            "AmE": "/ðeɪ/",
            "definition": "a group of people or things",
            "examples": [
               "They are my friends.",
               "They play football.",
               "They went to the park."
            ]
         },
         {
            "id": 114,
            "saved": false,
            "word": "think",
            "role": "verb",
            "BrE": "/θɪŋk/",
            "AmE": "/θɪŋk/",
            "definition": "to use your mind to consider",
            "examples": [
               "I think about you.",
               "She thinks it’s a good idea.",
               "He thought about the question."
            ]
         },
         {
            "id": 114,
            "saved": false,
            "word": "three",
            "role": "number",
            "BrE": "/θriː/",
            "AmE": "/θriː/",
            "definition": "the number 3",
            "examples": [
               "I have three books.",
               "She has three cats.",
               "Three students are absent."
            ]
         },
         {
            "id": 114,
            "saved": false,
            "word": "Thursday",
            "role": "noun",
            "BrE": "/ˈθɜːzdeɪ/",
            "AmE": "/ˈθɜːrzdeɪ/",
            "definition": "the fourth day of the week",
            "examples": [
               "Thursday is busy.",
               "We meet on Thursday.",
               "She has a class on Thursday."
            ]
         },
         {
            "id": 114,
            "saved": false,
            "word": "ticket",
            "role": "noun",
            "BrE": "/ˈtɪkɪt/",
            "AmE": "/ˈtɪkɪt/",
            "definition": "a piece of paper for entry or travel",
            "examples": [
               "I have a ticket.",
               "She bought a bus ticket.",
               "The ticket is for the movie."
            ]
         },
         {
            "id": 114,
            "saved": false,
            "word": "time",
            "role": "noun",
            "BrE": "/taɪm/",
            "AmE": "/taɪm/",
            "definition": "what is measured in hours and minutes",
            "examples": [
               "What time is it?",
               "She has no time today.",
               "The time for the meeting is two."
            ]
         },
         {
            "id": 114,
            "saved": false,
            "word": "tired",
            "role": "adjective",
            "BrE": "/ˈtaɪəd/",
            "AmE": "/ˈtaɪərd/",
            "definition": "needing rest or sleep",
            "examples": [
               "I am tired.",
               "She was tired after work.",
               "The tired dog slept all day."
            ]
         },
         {
            "id": 114,
            "saved": false,
            "word": "today",
            "role": "adverb",
            "BrE": "/təˈdeɪ/",
            "AmE": "/təˈdeɪ/",
            "definition": "on this day",
            "examples": [
               "I am busy today.",
               "She comes today.",
               "Today is a sunny day."
            ]
         },
         {
            "id": 115,
            "saved": false,
            "word": "together",
            "role": "adverb",
            "BrE": "/təˈɡeðə(r)/",
            "AmE": "/təˈɡeðər/",
            "definition": "with each other",
            "examples": [
               "We play together.",
               "They work together.",
               "She and I went together."
            ]
         },
         {
            "id": 115,
            "saved": false,
            "word": "tomorrow",
            "role": "adverb",
            "BrE": "/təˈmɒrəʊ/",
            "AmE": "/təˈmɑːroʊ/",
            "definition": "on the day after today",
            "examples": [
               "I’ll see you tomorrow.",
               "She works tomorrow.",
               "Tomorrow is a holiday."
            ]
         },
         {
            "id": 115,
            "saved": false,
            "word": "train",
            "role": "noun",
            "BrE": "/treɪn/",
            "AmE": "/treɪn/",
            "definition": "a vehicle that travels on rails",
            "examples": [
               "I take the train.",
               "She missed the train.",
               "The train is very fast."
            ]
         },
         {
            "id": 115,
            "saved": false,
            "word": "tree",
            "role": "noun",
            "BrE": "/triː/",
            "AmE": "/triː/",
            "definition": "a tall plant with a trunk and branches",
            "examples": [
               "The tree is green.",
               "She climbed the tree.",
               "The tree has many leaves."
            ]
         },
         {
            "id": 115,
            "saved": false,
            "word": "try",
            "role": "verb",
            "BrE": "/traɪ/",
            "AmE": "/traɪ/",
            "definition": "to attempt to do something",
            "examples": [
               "I try to sing.",
               "She tried to draw.",
               "He tries to learn English."
            ]
         },
         {
            "id": 115,
            "saved": false,
            "word": "turn",
            "role": "verb",
            "BrE": "/tɜːn/",
            "AmE": "/tɜːrn/",
            "definition": "to change direction or position",
            "examples": [
               "I turn left.",
               "She turned the page.",
               "He turns the car around."
            ]
         },
         {
            "id": 115,
            "saved": false,
            "word": "two",
            "role": "number",
            "BrE": "/tuː/",
            "AmE": "/tuː/",
            "definition": "the number 2",
            "examples": [
               "I have two cats.",
               "She bought two books.",
               "Two students are here."
            ]
         },
         {
            "id": 115,
            "saved": false,
            "word": "umbrella",
            "role": "noun",
            "BrE": "/ʌmˈbrelə/",
            "AmE": "/ʌmˈbrelə/",
            "definition": "an object to protect from rain",
            "examples": [
               "I use an umbrella.",
               "Her umbrella is red.",
               "He forgot his umbrella."
            ]
         },
         {
            "id": 115,
            "saved": false,
            "word": "up",
            "role": "adverb",
            "BrE": "/ʌp/",
            "AmE": "/ʌp/",
            "definition": "towards a higher place",
            "examples": [
               "I look up.",
               "She climbed up the ladder.",
               "The balloon went up high."
            ]
         },
         {
            "id": 115,
            "saved": false,
            "word": "use",
            "role": "verb",
            "BrE": "/juːz/",
            "AmE": "/juːz/",
            "definition": "to do something with an object",
            "examples": [
               "I use a pen.",
               "She uses her phone.",
               "He used a map to find the way."
            ]
         },
         {
            "id": 116,
            "saved": false,
            "word": "very",
            "role": "adverb",
            "BrE": "/ˈveri/",
            "AmE": "/ˈveri/",
            "definition": "to a great degree",
            "examples": [
               "I am very happy.",
               "She runs very fast.",
               "The very cold day was snowy."
            ]
         },
         {
            "id": 116,
            "saved": false,
            "word": "visit",
            "role": "verb",
            "BrE": "/ˈvɪzɪt/",
            "AmE": "/ˈvɪzɪt/",
            "definition": "to go to see a person or place",
            "examples": [
               "I visit my friend.",
               "She visited the zoo.",
               "He visits his family often."
            ]
         },
         {
            "id": 116,
            "saved": false,
            "word": "wait",
            "role": "verb",
            "BrE": "/weɪt/",
            "AmE": "/weɪt/",
            "definition": "to stay until something happens",
            "examples": [
               "I wait for the bus.",
               "She waited for her friend.",
               "He waits at the station."
            ]
         },
         {
            "id": 116,
            "saved": false,
            "word": "wall",
            "role": "noun",
            "BrE": "/wɔːl/",
            "AmE": "/wɔːl/",
            "definition": "a vertical structure of a building",
            "examples": [
               "The wall is white.",
               "She painted the wall blue.",
               "A picture is on the wall."
            ]
         },
         {
            "id": 116,
            "saved": false,
            "word": "warm",
            "role": "adjective",
            "BrE": "/wɔːm/",
            "AmE": "/wɔːrm/",
            "definition": "having a comfortable temperature",
            "examples": [
               "The room is warm.",
               "Her coat is warm.",
               "The warm water feels nice."
            ]
         },
         {
            "id": 116,
            "saved": false,
            "word": "watch",
            "role": "noun",
            "BrE": "/wɒtʃ/",
            "AmE": "/wɑːtʃ/",
            "definition": "a device for telling the time",
            "examples": [
               "My watch is new.",
               "She lost her watch.",
               "The watch shows the time."
            ]
         },
         {
            "id": 116,
            "saved": false,
            "word": "water",
            "role": "noun",
            "BrE": "/ˈwɔːtə(r)/",
            "AmE": "/ˈwɔːtər/",
            "definition": "a clear liquid you drink",
            "examples": [
               "I drink water.",
               "The water is cold.",
               "She filled a glass with water."
            ]
         },
         {
            "id": 116,
            "saved": false,
            "word": "weather",
            "role": "noun",
            "BrE": "/ˈweðə(r)/",
            "AmE": "/ˈweðər/",
            "definition": "the conditions in the air, like rain or sun",
            "examples": [
               "The weather is sunny.",
               "Bad weather stopped the game.",
               "She checked the weather today."
            ]
         },
         {
            "id": 116,
            "saved": false,
            "word": "weekend",
            "role": "noun",
            "BrE": "/ˌwiːkˈend/",
            "AmE": "/ˌwiːkˈend/",
            "definition": "Saturday and Sunday",
            "examples": [
               "I rest at the weekend.",
               "She visits family at the weekend.",
               "The weekend was fun."
            ]
         },
         {
            "id": 116,
            "saved": false,
            "word": "well",
            "role": "exclamation",
            "BrE": "/wel/",
            "AmE": "/wel/",
            "definition": "used to start speaking or show surprise",
            "examples": [
               "Well, I’m here!",
               "Well, that’s a good idea.",
               "Well, she did it!"
            ]
         },
         {
            "id": 117,
            "saved": false,
            "word": "west",
            "role": "noun",
            "BrE": "/west/",
            "AmE": "/west/",
            "definition": "the direction where the sun sets",
            "examples": [
               "The west is sunny.",
               "We live in the west.",
               "The sun sets in the west."
            ]
         },
         {
            "id": 117,
            "saved": false,
            "word": "what",
            "role": "pronoun",
            "BrE": "/wɒt/",
            "AmE": "/wɑːt/",
            "definition": "used to ask about something",
            "examples": [
               "What is this?",
               "What time is it?",
               "What did she say?"
            ]
         },
         {
            "id": 117,
            "saved": false,
            "word": "when",
            "role": "adverb",
            "BrE": "/wen/",
            "AmE": "/wen/",
            "definition": "used to ask about time",
            "examples": [
               "When is the party?",
               "When did he arrive?",
               "When does the class start?"
            ]
         },
         {
            "id": 117,
            "saved": false,
            "word": "where",
            "role": "adverb",
            "BrE": "/weə(r)/",
            "AmE": "/wer/",
            "definition": "used to ask about place or position",
            "examples": [
               "Where is my book?",
               "Where does she live?",
               "Where are you going?"
            ]
         },
         {
            "id": 117,
            "saved": false,
            "word": "which",
            "role": "pronoun",
            "BrE": "/wɪtʃ/",
            "AmE": "/wɪtʃ/",
            "definition": "used to ask about one thing from a group",
            "examples": [
               "Which book is yours?",
               "Which one do you like?",
               "Which dress should she wear?"
            ]
         },
         {
            "id": 117,
            "saved": false,
            "word": "white",
            "role": "noun",
            "BrE": "/waɪt/",
            "AmE": "/waɪt/",
            "definition": "the colour of snow or milk",
            "examples": [
               "White is bright.",
               "She painted the room white.",
               "I like white for my shirt."
            ]
         },
         {
            "id": 117,
            "saved": false,
            "word": "who",
            "role": "pronoun",
            "BrE": "/huː/",
            "AmE": "/huː/",
            "definition": "used to ask about a person",
            "examples": [
               "Who is she?",
               "Who took my pen?",
               "Who was at the party?"
            ]
         },
         {
            "id": 117,
            "saved": false,
            "word": "why",
            "role": "adverb",
            "BrE": "/waɪ/",
            "AmE": "/waɪ/",
            "definition": "used to ask the reason for something",
            "examples": [
               "Why are you late?",
               "Why did she leave?",
               "Why is the sky blue?"
            ]
         },
         {
            "id": 117,
            "saved": false,
            "word": "wife",
            "role": "noun",
            "BrE": "/waɪf/",
            "AmE": "/waɪf/",
            "definition": "the woman a man is married to",
            "examples": [
               "His wife is kind.",
               "My wife cooks well.",
               "She met her wife at work."
            ]
         },
         {
            "id": 117,
            "saved": false,
            "word": "wind",
            "role": "noun",
            "BrE": "/wɪnd/",
            "AmE": "/wɪnd/",
            "definition": "air moving across the Earth",
            "examples": [
               "The wind is strong.",
               "She felt the wind outside.",
               "The wind blew the leaves."
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
      
      if(savedA1Vocabs.some(item => item.word == ws.word.word) && savedA1Vocabs.some(item => item.role == ws.word.role)){
         setSavedA1Vocabs(savedA1Vocabs.filter((item) => {
            return !(item.word === ws.word.word && item.role === ws.word.role)
         }))

         setCancelBox(true)

         setTimeout(() => {
            setCancelBox(false);
         }, 3000);

      } else {
         setSavedA1Vocabs((prev) => [
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

   return (
      <div className={styles.container}>

         <Image
            src= '/images/back/vocabBack.jpg'
            alt= 'background image'
            fill
         />

         <div className={styles.lessonTitle}>Lesson {lessonNumber}</div>
         <div className={styles.lessonLevel}>A1</div>

         {stage === 'assessment' && (
            <div className={`${styles.assessCard} ${close && styles.shiftMsg}`}>
               <div className={styles.titleHolder}>
                  <h2 className={styles.check}>Knowledge Check</h2>
                  <p className={styles.prompt}>checking how much control do you have over each word in this lesson.</p>
               </div>
               <div className={styles.vocabHolder}>
                  <p className={styles.vocab}>{specificLessonWords[currentWordIndex].word}</p>
                  <p className={styles.role}>{specificLessonWords[currentWordIndex].role}</p>
               </div>
               <div className={styles.buttonGroup}>
                  <button
                     className={`${styles.button} ${styles.buttonKnown}`}
                     onClick={() => handleAnswer('known')}
                  >
                  I know it and use it a lot
                  </button>
                  <button
                     className={`${styles.button} ${styles.buttonPartial}`}
                     onClick={() => handleAnswer('partial')}
                  >
                  I know it but can’t use it
                  </button>
                  <button
                     className={`${styles.button} ${styles.buttonUnknown}`}
                     onClick={() => handleAnswer('unknown')}
                  >
                  I don’t know it 
                  </button>
               </div>
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
   
         {stage === 'learning' && (
         <div className={`${styles.learnCard} ${fade && styles.fadeIn}`}>
            {(() => {
               const learningWords = [...partialWords, ...unknownWords];
               if (learningWords.length === 0) {
                  return <div className={styles.done}>
               <div className={styles.doneTitle}>All done. Brilliant :)</div>
               <div className={styles.btnHolder}>
                  <Link href='/a1' className={styles.back} onClick={saveProgress}>Done</Link>
                  {
                     lessonNumber < wholeLessons ?
                     <Link href={`/a1/${lessonNumber + 1}`} className={styles.back} onClick={saveProgress}>Next Lesson</Link>
                     :
                     <Link href='/a2' className={styles.back} onClick={saveProgress}>Start A2</Link>
                  }
               </div>
            </div>
               }
               const ws = learningWords[learningWordIndex];
               return (
               <>
                  <div className={styles.actionsHolder}>
                     <p className={styles.title}>The words you need to learn</p>
                     <p className={styles.actions} onClick={() => saveHandle(ws)}>
                        {  
                           (savedA1Vocabs.some(item => item.word == ws.word.word) && savedA1Vocabs.some(item => item.role == ws.word.role)) ? <FaBookmark className={styles.save}/> : <FaRegBookmark className={styles.save}/>  
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
                                 <Link href={`/a1/${lessonNumber + 1}`} className={styles.button} onClick={saveProgress}>Lesson {lessonNumber + 1}</Link>
                                 :
                                 <Link href='/a2' className={styles.button} onClick={saveProgress}>Start A2</Link>  
                              }
                              <Link className={styles.button}
                                 href='/a1'
                                 onClick={saveProgress}
                              >
                                 Save
                              </Link>
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
               const revisionWords = [...partialWords, ...unknownWords];
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
                  <Link href={`/a1/${lessonNumber + 1}`} className={styles.button} onClick={saveProgress}>Next Lesson</Link>
                  :
                  <Link href='/a2' className={styles.button} onClick={saveProgress}>Start A2</Link>
               }

               <Link href='/a1'
                  className={styles.button}
                  onClick={saveProgress}
               >
                  Done
               </Link>
            </div>
         </div>
      )}

      {
         confirmBox ? <div className={styles.confirm}>Saved Successfully</div>
         :
         cancelBox ? <div  className={styles.cancel}>Removed Successfully</div> : null
      }
      </div>
   );
}













