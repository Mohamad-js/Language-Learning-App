"use client";
import { use, useEffect, useReducer, useRef, useState } from "react";
import ProgressBar from "@/components/ProgressBar/ProgressBar";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { CiMenuFries } from "react-icons/ci";
import { IoBookOutline, IoReaderOutline  } from "react-icons/io5";
import { BiConversation } from "react-icons/bi";
import { FaAssistiveListeningSystems } from "react-icons/fa";
import styles from './page.module.css'



const StudyPlan = () => {
   const [startApp, setStartApp] = useState('startup');
   const [info, setInfo] = useState([]);
   const [menu,setMenu] = useState(false)
   const [warning,setWarning] = useState(false)
   const [pages, setPages] = useState('home')
   const optionRef = useRef(null)
   const [aveProgress,setAveProgress] = useState(38)
   const [readProgress,setReadProgress] = useState(42)
   const [writeProgress,setWriteProgress] = useState(18)
   const [listenProgress,setListenProgress] = useState(29)
   const [speakProgress,setSpeakProgress] = useState(57)

   useEffect(()=>{
      const appStatus = localStorage.getItem('app state');
      appStatus && setStartApp(JSON.parse(appStatus));

   }, [startApp])


   useEffect(() => {
      document.addEventListener('click', closeOption)


      setInfo([
         {
            day: 1,
            images: ["../images/oxford/int/1a.jpg", "../images/oxford/int/1b.jpg"],
            book: "Word Skills Int.",
            pages: [12, 13],
            instructions: [
               {
                  title: 'Learning The Glossary (p 12)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 12)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 12)',
                  todo:'Read the "ADVICE FOR READING" and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 12)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'Learning The Vocabularies (p 13)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 13)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 13)',
                  todo:'Read the reading and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 13)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'SPOTLIGHT (p 13)',
                  todo:'Read the spotlight and check the difference between conversation, discussion and argument. Then check the definition and examples for each word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) to better understand their differences.',
                  extra: ''
               },
               {
                  title: 'Practicing British Accent',
                  todo: 'Practice reading the text on pages 12 & 13 in British accent. When you feel you are ready, read each text again aloud and record your voice. Then send your recordings to the teacher before the end of the day to check your mistakes and weaknesses.',
                  extra: ''
               }
            ],
         },
         {
            day: 2,
            images: ["../images/oxford/int/2a.jpg", "../images/oxford/int/2b.jpg"],
            book: "Word Skills Int.",
            pages: [14, 15],
            instructions: [
               {
                  title: 'Learning The Glossary (p 14)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 14)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 14)',
                  todo:'Read the reading and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 14)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'Learning The Vocabularies (p 15)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 15)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 15)',
                  todo:'Read the reading and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 15)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'SPOTLIGHT (p 15)',
                  todo:'Read the spotlight and check the difference between contain and include. Then check the definition and examples for each word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) to better understand their differences.',
                  extra: ''
               },
               {
                  title: 'Practicing British Accent',
                  todo: 'Practice reading the text on pages 14 & 15 in British accent. When you feel you are ready, read each text again aloud and record your voice. Then send your recordings to the teacher before the end of the day to check your mistakes and weaknesses.',
                  extra: ''
               }
            ],
         },
         {
            day: 3,
            images: ["../images/oxford/int/3.jpg"],
            book: "Word Skills Int.",
            pages: [16],
            instructions: [
               {
                  title: 'Learning The Glossary (p 16)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 16)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 16)',
                  todo:'Check the dictionary pages in unit 3 and using the pictures, see what the words mean in a typical dictionary. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 16)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'SPOTLIGHT (p 16)',
                  todo:'Read the spotlight and check the difference between emphasize and stress. Then check the definition and examples for each word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) to better understand their differences.',
                  extra: ''
               },
               {
                  title: 'Practicing British Accent',
                  todo: 'Practice reading the sentences on page 16 in British accent. When you feel you are ready, read each text again aloud and record your voice. Then send your recordings to the teacher before the end of the day to check your mistakes and weaknesses.',
                  extra: ''
               }
            ],
         },
         {
            day: 4,
            images: ["../images/oxford/int/4.jpg"],
            book: "Word Skills Int.",
            pages: [18],
            instructions: [
               {
                  title: 'Learning The Glossary (p 18)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning The Punctuations (p 18)',
                  todo:'Check the punctuations and where we should use them in English, using the "Some important punctuation rules" section.',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 18)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 18)',
                  todo:'Read the "Some important punctuation rules" and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 18)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'SPOTLIGHT (p 18)',
                  todo:'Read the spotlight and check the difference between contain and include. Then check the definition and examples for each word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) to better understand their differences.',
                  extra: ''
               },
               {
                  title: 'Practicing British Accent',
                  todo: 'Practice reading the text on page 18 in British accent. When you feel you are ready, read each text again aloud and record your voice. Then send your recordings to the teacher before the end of the day to check your mistakes and weaknesses.',
                  extra: ''
               }
            ],
         },
         {
            day: 5,
            images: ["../images/oxford/int/5a.jpg", "../images/oxford/int/5b.jpg"],
            book: "Word Skills Int.",
            pages: [20, 21],
            instructions: [
               {
                  title: 'Learning The Words (p 20)',
                  todo:'Read the words and try to understand their meaning from the pictures provided. If you needed a dictionary, use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 20)',
                  todo:'Check the British phonetic & pronunciation of each word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 20)',
                  todo:'Make a good sentence with each word. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'Learning The Vocabularies (p 21)',
                  todo:'Read the words and try to understand their meaning from the pictures provided. If you needed a dictionary, use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 21)',
                  todo:'Check the British phonetic & pronunciation of each word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 21)',
                  todo:'Make a good sentence with each word. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
            ]
         },
         {
            day: 6,
            images: ["../images/oxford/int/6a.jpg", "../images/oxford/int/6b.jpg"],
            book: "Word Skills Int.",
            pages: [22, 23],
            instructions: [
               {
                  title: 'Learning The Glossary (p 22)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary plus the new words under each picture and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 22)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 22)',
                  todo:'Make a good sentence with each word in the Glossary plus the new words under each picture. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'SPOTLIGHT (p 22)',
                  todo:'Read the spotlight and check the difference between ugly and unattractive. Then check the definition and examples for each word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) to better understand their differences.',
                  extra: ''
               },
               {
                  title: 'Learning The Vocabularies (p 23)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 23)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 23)',
                  todo:'Read the reading and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 23)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'SPOTLIGHT (p 23)',
                  todo:'Read the spotlight and check where and why we use the suffix -ish in English. Then check the definition and examples for each example word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) to better understand its use cases.',
                  extra: ''
               },
               {
                  title: 'Practicing British Accent',
                  todo: 'Practice reading the two texts on page 23 in British accent. When you feel you are ready, read each text again aloud and record your voice. Then send your recordings to the teacher before the end of the day to check your mistakes and weaknesses.',
                  extra: ''
               }
            ]
         },
         {
            day: 7,
            images: ["../images/oxford/int/7.jpg"],
            book: "Word Skills Int.",
            pages: [24],
            instructions: [
               {
                  title: 'Learning The Vocabularies (p 24)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 24)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 24)',
                  todo:'Read the texts next to the pictures and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 24)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'SPOTLIGHT (p 24)',
                  todo:'Read the spotlight and check the difference between crazy and mad. Then check the definition and examples for each word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) to better understand their differences.',
                  extra: ''
               },
               {
                  title: 'Practicing British Accent',
                  todo: 'Practice reading the texts on page 24 in British accent. When you feel you are ready, read each text again aloud and record your voice. Then send your recordings to the teacher before the end of the day to check your mistakes and weaknesses.',
                  extra: ''
               }
            ]
         },
         {
            day: 8,
            images: ["../images/oxford/int/8a.jpg", "../images/oxford/int/8b.jpg"],
            book: "Word Skills Int.",
            pages: [26, 27],
            instructions: [
               {
                  title: 'Learning The Glossary (p 26)',
                  todo:'Read the words, meanings and the synonyms & antonyms (if any) in the chart and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 26)',
                  todo:'Check the British phonetic & pronunciation of each word of the chart in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 26)',
                  todo:'Read the examples in the chart and check how the words are used in natural English. If you forget the meaning of the words while you read, check the meaning. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 26)',
                  todo:'Make a good sentence with each word in the chart. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'SPOTLIGHT (p 26)',
                  todo:'Read the spotlight and check the difference between alone, lonely and on your own. Then check the definition and examples for each word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) to better understand their differences.',
                  extra: ''
               },
               {
                  title: 'Learning The Vocabularies (p 27)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 27)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 27)',
                  todo:'Read the "YOU AND YOUR EMOTIONS" and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 27)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'SPOTLIGHT (p 27)',
                  todo:'Read the spotlight and check the different meanings of the word get. Then check the definition and examples in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) to better understand their differences.',
                  extra: ''
               },
               {
                  title: 'Practicing British Accent',
                  todo: 'Practice reading the examples on page 14 and the sentences on page 15 in British accent. When you feel you are ready, read each text again aloud and record your voice. Then send your recordings to the teacher before the end of the day to check your mistakes and weaknesses.',
                  extra: ''
               }
            ]
         },
         {
            day: 9,
            images: ["../images/oxford/int/9a.jpg", "../images/oxford/int/9b.jpg"],
            book: "Word Skills Int.",
            pages: [28, 29],
            instructions: [
               {
                  title: 'Learning The Glossary (p 28)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 28)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 28)',
                  todo:'Read the readings and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 28)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'Learning The Vocabularies (p 29)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 29)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 29)',
                  todo:'Read the reading and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 29)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'SPOTLIGHT (p 29)',
                  todo:'Read the spotlight and check the meaning of expect and how it is used in a sentence. Then check the definition and examples for each word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) to better understand their differences.',
                  extra: ''
               },
               {
                  title: 'Practicing British Accent',
                  todo: 'Practice reading the readings on pages 28 & 29 in British accent. When you feel you are ready, read each text again aloud and record your voice. Then send your recordings to the teacher before the end of the day to check your mistakes and weaknesses.',
                  extra: ''
               }
            ]
         },
         {
            day: 10,
            images: ["../images/oxford/int/10a.jpg", "../images/oxford/int/10b.jpg"],
            book: "Word Skills Int.",
            pages: [30, 31],
            instructions: [
               {
                  title: 'Learning The Glossary (p 30)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 30)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 30)',
                  todo:'Read the sentences and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 30)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'Learning The Vocabularies (p 31)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 31)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 31)',
                  todo:'Read the reading and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 31)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'Practicing British Accent',
                  todo: 'Practice reading the text on page 31 in British accent. When you feel you are ready, read each text again aloud and record your voice. Then send your recordings to the teacher before the end of the day to check your mistakes and weaknesses.',
                  extra: ''
               },
               {
                  title: 'Review',
                  todo: 'Answer all the exercises of chapter 1 to review the words and information. No problem if you have forgotten some parts. It is absolutely natural. Check back any meaning or pronunciation you do not remember.',
                  extra: ''
               },
               {
                  title: 'Sentence Production Techniques',
                  todo: 'Using the information you have learnt in the class, write a good outline for the following topic: Poverty.',
                  extra: ''
               }
            ]
         },
         {
            day: 11,
            images: ["../images/oxford/int/11a.jpg", "../images/oxford/int/11b.jpg"],
            book: "Word Skills Int.",
            pages: [32, 33],
            instructions: [
               {
                  title: 'Learning The Glossary (p 32)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 32)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 32)',
                  todo:'Read the reading and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 32)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'Learning The Vocabularies (p 33)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 33)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 33)',
                  todo:'Read the readings and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 33)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'SPOTLIGHT (p 33)',
                  todo:'Read the spotlight and check the difference between give birth and to be born. Then check the definition and examples for each word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) to better understand their differences.',
                  extra: ''
               },
               {
                  title: 'Practicing British Accent',
                  todo: 'Practice reading the texts on page 33 in British accent. When you feel you are ready, read each text again aloud and record your voice. Then send your recordings to the teacher before the end of the day to check your mistakes and weaknesses.',
                  extra: ''
               },
               {
                  title: 'Review',
                  todo: 'Answer all the exercises of chapter 2 to review the words and information. No problem if you have forgotten some parts. It is absolutely natural. Check back any meaning or pronunciation you do not remember.',
                  extra: ''
               },
               {
                  title: 'Sentence Production Techniques',
                  todo: 'Using the information you have learnt in the class, write a good outline for the following topic: Happiness.',
                  extra: ''
               }
            ]
         },
         {
            day: 12,
            images: ["../images/oxford/int/12a.jpg", "../images/oxford/int/12b.jpg"],
            book: "Word Skills Int.",
            pages: [34, 35],
            instructions: [
               {
                  title: 'Learning The Glossary (p 34)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 34)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 34)',
                  todo:'Read the reading and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 34)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'Learning The Vocabularies (p 35)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 35)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 35)',
                  todo:'Read the reading and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 35)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'SPOTLIGHT (p 35)',
                  todo:'Read the spotlight and check the difference between the adjective and verb forms of the word separate. Then check the definition and examples for each word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) to better understand their differences.',
                  extra: ''
               },
               {
                  title: 'Practicing British Accent',
                  todo: 'Practice reading the text on page 35 in British accent. When you feel you are ready, read each text again aloud and record your voice. Then send your recordings to the teacher before the end of the day to check your mistakes and weaknesses.',
                  extra: ''
               },
               {
                  title: 'Review',
                  todo: 'Answer all the exercises of chapter 3 to review the words and information. No problem if you have forgotten some parts. It is absolutely natural. Check back any meaning or pronunciation you do not remember.',
                  extra: ''
               },
               {
                  title: 'Sentence Production Techniques',
                  todo: 'Using the information you have learnt in the class, write a good outline for the following topic: Opposite Sex Friendship.',
                  extra: ''
               }
            ]
         },
         {
            day: 13,
            images: ["../images/oxford/int/13a.jpg", "../images/oxford/int/13b.jpg"],
            book: "Word Skills Int.",
            pages: [36, 37],
            instructions: [
               {
                  title: 'Learning The Glossary (p 36)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary plus the information below the pictures and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 36)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 36)',
                  todo:'Read the reading and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 36)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'Learning The Vocabularies (p 37)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary plus the new words in the text which are shown in the picture and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 37)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 37)',
                  todo:'Read the reading and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 37)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'Practicing British Accent',
                  todo: 'Practice reading the text on page 37 in British accent. When you feel you are ready, read each text again aloud and record your voice. Then send your recordings to the teacher before the end of the day to check your mistakes and weaknesses.',
                  extra: ''
               },
               {
                  title: 'Review',
                  todo: 'Answer all the exercises of chapter 4 to review the words and information. No problem if you have forgotten some parts. It is absolutely natural. Check back any meaning or pronunciation you do not remember.',
                  extra: ''
               },
               {
                  title: 'Sentence Production Techniques',
                  todo: 'Using the information you have learnt in the class, write a good outline for the following topic: Is Quran Really From God?',
                  extra: ''
               }
            ]
         },
         {
            day: 14,
            images: ["../images/oxford/int/14a.jpg", "../images/oxford/int/14b.jpg"],
            book: "Word Skills Int.",
            pages: [38, 39],
            instructions: [
               {
                  title: 'Learning The Glossary (p 38)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 38)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 38)',
                  todo:'Read the reading and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 38)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'Learning The Vocabularies (p 39)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 39)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 39)',
                  todo:'Read the reading and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 39)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'SPOTLIGHT (p 39)',
                  todo:'Read the spotlight and check the difference between discover and invent plus their word classes. Then check the definition and examples for each word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) to better understand their differences.',
                  extra: ''
               },
               {
                  title: 'Practicing British Accent',
                  todo: 'Practice reading the text on page 39 in British accent. When you feel you are ready, read each text again aloud and record your voice. Then send your recordings to the teacher before the end of the day to check your mistakes and weaknesses.',
                  extra: ''
               },
               {
                  title: 'Review',
                  todo: 'Answer all the exercises of chapter 5 to review the words and information. No problem if you have forgotten some parts. It is absolutely natural. Check back any meaning or pronunciation you do not remember.',
                  extra: ''
               },
               {
                  title: 'Sentence Production Techniques',
                  todo: 'Using the information you have learnt in the class, write a good outline for the following topic: The Issues Psychology Cannot Solve Alone.',
                  extra: ''
               }
            ]
         },
         {
            day: 15,
            images: ["../images/oxford/int/15a.jpg", "../images/oxford/int/15b.jpg"],
            book: "Word Skills Int.",
            pages: [40, 41],
            instructions: [
               {
                  title: 'Learning The Glossary (p 40)',
                  todo:'Read the words, meanings and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 40)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 40)',
                  todo:'Read the examples and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 40)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'Learning The Vocabularies (p 41)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 41)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 41)',
                  todo:'Read the reading and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 41)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'Practicing British Accent',
                  todo: 'Practice reading the text on page 41 in British accent. When you feel you are ready, read each text again aloud and record your voice. Then send your recordings to the teacher before the end of the day to check your mistakes and weaknesses.',
                  extra: ''
               },
               {
                  title: 'Review',
                  todo: 'Answer all the exercises of chapter 6 to review the words and information. No problem if you have forgotten some parts. It is absolutely natural. Check back any meaning or pronunciation you do not remember.',
                  extra: ''
               },
               {
                  title: 'Sentence Production Techniques',
                  todo: 'Using the information you have learnt in the class, write a good outline for the following topic: Individualism, Right or Wrong?',
                  extra: ''
               }
            ]
         },
         {
            day: 16,
            images: ["../images/oxford/int/16.jpg"],
            book: "Word Skills Int.",
            pages: [42],
            instructions: [
               {
                  title: 'Learning The Glossary (p 42)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 42)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 42)',
                  todo:'Read the reading and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 42)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'SPOTLIGHT (p 42)',
                  todo:'Read the spotlight and check the difference between effect and affect. Then check the definition and examples for each word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) to better understand their differences.',
                  extra: ''
               },
               {
                  title: 'Practicing British Accent',
                  todo: 'Practice reading the text on page 42 in British accent. When you feel you are ready, read each text again aloud and record your voice. Then send your recordings to the teacher before the end of the day to check your mistakes and weaknesses.',
                  extra: ''
               },
               {
                  title: 'Review',
                  todo: 'Answer all the exercises of chapter 7 to review the words and information. No problem if you have forgotten some parts. It is absolutely natural. Check back any meaning or pronunciation you do not remember.',
                  extra: ''
               },
               {
                  title: 'Sentence Production Techniques',
                  todo: 'Using the information you have learnt in the class, write a good outline for the following topic: The Advantages of Behaviorism Over Psychotherapy.',
                  extra: ''
               }
            ]
         },
         {
            day: 17,
            images: ["../images/oxford/int/17a.jpg", "../images/oxford/int/17b.jpg"],
            book: "Word Skills Int.",
            pages: [44, 45],
            instructions: [
               {
                  title: 'Learning The Glossary (p 44)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 44)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 44)',
                  todo:'Read the reading and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 44)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'Learning The Vocabularies (p 45)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 45)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 45)',
                  todo:'Read the reading and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 45)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'SPOTLIGHT (p 45)',
                  todo:'Read the spotlight and check the difference between whenever, wherever and whatever. Then check the definition and examples for each word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) to better understand their differences.',
                  extra: ''
               },
               {
                  title: 'Practicing British Accent',
                  todo: 'Practice reading the text on page 45 in British accent. When you feel you are ready, read each text again aloud and record your voice. Then send your recordings to the teacher before the end of the day to check your mistakes and weaknesses.',
                  extra: ''
               },
               {
                  title: 'Review',
                  todo: 'Answer all the exercises of chapter 8 to review the words and information. No problem if you have forgotten some parts. It is absolutely natural. Check back any meaning or pronunciation you do not remember.',
                  extra: ''
               },
               {
                  title: 'Sentence Production Techniques',
                  todo: 'Using the information you have learnt in the class, write a good outline for the following topic: Why Freud Still Deserves the Title "Father of Psychology."',
                  extra: ''
               }
            ]
         },
         {
            day: 18,
            images: ["../images/oxford/int/18a.jpg", "../images/oxford/int/18b.jpg"],
            book: "Word Skills Int.",
            pages: [46, 47],
            instructions: [
               {
                  title: 'Learning The Glossary (p 46)',
                  todo:'Read the words and learn the animals. Then check the text and try to understand new words without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 46)',
                  todo:'Check the British phonetic & pronunciation of each word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 46)',
                  todo:'Make a good sentence with each word. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'Learning The Vocabularies (p 47)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 47)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 47)',
                  todo:'Read the reading and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 47)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'Practicing British Accent',
                  todo: 'Practice reading one of the texts on page 47 in British accent. When you feel you are ready, read each text again aloud and record your voice. Then send your recordings to the teacher before the end of the day to check your mistakes and weaknesses.',
                  extra: ''
               },
               {
                  title: 'Review',
                  todo: 'Answer all the exercises of chapter 9 to review the words and information. No problem if you have forgotten some parts. It is absolutely natural. Check back any meaning or pronunciation you do not remember.',
                  extra: ''
               },
               {
                  title: 'Sentence Production Techniques',
                  todo: 'Using the information you have learnt in the class, write a good outline for the following topic: Positive Psychology, Unreal Dream or Real Sceince?',
                  extra: ''
               }
            ]
         },
         {
            day: 19,
            images: ["../images/oxford/int/19a.jpg", "../images/oxford/int/19b.jpg"],
            book: "Word Skills Int.",
            pages: [48, 49],
            instructions: [
               {
                  title: 'Learning The Glossary (p 48)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 48)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 48)',
                  todo:'Read the sentences and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 48)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'SPOTLIGHT (p 48)',
                  todo:'Read the spotlight and check the difference between gradable and ungradable adjectives. Then check the definition and examples for each in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) to better understand their differences.',
                  extra: ''
               },
               {
                  title: 'Learning The Vocabularies (p 49)',
                  todo:'Read the words, meanings and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 49)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 49)',
                  todo:'Read the exmaples and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 49)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'SPOTLIGHT (p 49)',
                  todo:'Read the spotlight and check the difference between the suffixes -ed and -ing. Then check the definition and examples for each word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) to better understand their differences.',
                  extra: ''
               },
               {
                  title: 'Practicing British Accent',
                  todo: 'Practice reading the sentences on page 48 in British accent. When you feel you are ready, read each text again aloud and record your voice. Then send your recordings to the teacher before the end of the day to check your mistakes and weaknesses.',
                  extra: ''
               },
               {
                  title: 'Review',
                  todo: 'Answer all the exercises of chapter 10 to review the words and information. No problem if you have forgotten some parts. It is absolutely natural. Check back any meaning or pronunciation you do not remember.',
                  extra: ''
               },
               {
                  title: 'Sentence Production Techniques',
                  todo: 'Using the information you have learnt in the class, write a good outline for the following topic: How Politics Can Affect Our Life.',
                  extra: ''
               }
            ]
         },
         {
            day: 20,
            images: ["../images/oxford/int/20a.jpg", "../images/oxford/int/20b.jpg"],
            book: "Word Skills Int.",
            pages: [50, 51],
            instructions: [
               {
                  title: 'Learning The Glossary (p 50)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 50)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 50)',
                  todo:'Read the texts and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 50)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'Learning The Vocabularies (p 51)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 51)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 51)',
                  todo:'Read the reading and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 51)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'SPOTLIGHT (p 51)',
                  todo:'Read the spotlight and check the difference between adjectives ending in -ful and -less. Then check the definition and examples for each word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) to better understand their differences.',
                  extra: ''
               },
               {
                  title: 'Practicing British Accent',
                  todo: 'Practice reading the text on page 51 in British accent. When you feel you are ready, read each text again aloud and record your voice. Then send your recordings to the teacher before the end of the day to check your mistakes and weaknesses.',
                  extra: ''
               },
               {
                  title: 'Review',
                  todo: 'Answer all the exercises of chapter 11 to review the words and information. No problem if you have forgotten some parts. It is absolutely natural. Check back any meaning or pronunciation you do not remember.',
                  extra: ''
               },
               {
                  title: 'Sentence Production Techniques',
                  todo: 'Using the information you have learnt in the class, write a good outline for the following topic: The Factors of a Happy Marriage.',
                  extra: ''
               }
            ]
         },
         {
            day: 21,
            images: ["../images/oxford/int/21a.jpg", "../images/oxford/int/21b.jpg"],
            book: "Word Skills Int.",
            pages: [52, 53],
            instructions: [
               {
                  title: 'Learning The Glossary (p 52)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 52)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 52)',
                  todo:'Read the reading and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 52)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'SPOTLIGHT (p 52)',
                  todo:'Read the spotlight and check the difference between completely, absolutely and totally. Then check the definition and examples for each word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) to better understand their differences.',
                  extra: ''
               },
               {
                  title: 'Learning The Vocabularies (p 53)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 53)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 53)',
                  todo:'Read the conversation and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 53)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'SPOTLIGHT (p 53)',
                  todo:'Read the spotlight and check the difference between quite, fairly, rather, and pretty. Then check the definition and examples for each word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) to better understand their differences.',
                  extra: ''
               },
               {
                  title: 'Practicing British Accent',
                  todo: 'Practice reading the conversation on page 53 in British accent. When you feel you are ready, read each text again aloud and record your voice. Then send your recordings to the teacher before the end of the day to check your mistakes and weaknesses.',
                  extra: ''
               },
               {
                  title: 'Review',
                  todo: 'Answer all the exercises of chapter 12 to review the words and information. No problem if you have forgotten some parts. It is absolutely natural. Check back any meaning or pronunciation you do not remember.',
                  extra: ''
               },
               {
                  title: 'Sentence Production Techniques',
                  todo: 'Using the information you have learnt in the class, write a good outline for the following topic: The Connexion Between Wealth and Depression.',
                  extra: ''
               }
            ]
         },
         {
            day: 22,
            images: ["../images/oxford/int/22a.jpg", "../images/oxford/int/22b.jpg"],
            book: "Word Skills Int.",
            pages: [54, 55],
            instructions: [
               {
                  title: 'Learning The Glossary (p 54)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 54)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 54)',
                  todo:'Read the reading and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 54)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'Learning The Vocabularies (p 55)',
                  todo:'Read the words, definitions and the synonyms & antonyms (if any) in the Glossary and try to understand their meaning without using English-Persian dictioanry. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version).',
                  extra: ''
               },
               {
                  title: 'Learning Pronunciation (p 55)',
                  todo:'Check the British phonetic & pronunciation of each Glossary word in the dictionary. Then try to repeat the correct British pronunciation 3 times. If you need more help with the British accent, check the "ACCENT" page of the app.',
                  extra: ''
               },
               {
                  title: 'Word Comprehension (p 55)',
                  todo:'Read the reading and check how the words in the Glossary are used in natural English. If you forget the meaning of the words while you read, check the meaning back in the glossary. Use Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) for the unknown words in the text.',
                  extra: ''
               },
               {
                  title: 'Using The Vocabularies (p 55)',
                  todo:'Make a good sentence with each word in the Glossary. If you have difficulty understading what to write, check the examples of the word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version). But try not to copy the exmaple. Instead, try to find an idea by reading the examples.',
                  extra: ''
               },
               {
                  title: 'SPOTLIGHT (p 55)',
                  todo:'Read the spotlight and check adverbs of manner. Then check the definition and examples for each word in Google Online Dictionary or Longman Dictionary of Contemporary English (latest version) to better understand their differences.',
                  extra: ''
               },
               {
                  title: 'Practicing British Accent',
                  todo: 'Practice reading the text on page 55 in British accent. When you feel you are ready, read each text again aloud and record your voice. Then send your recordings to the teacher before the end of the day to check your mistakes and weaknesses.',
                  extra: ''
               },
               {
                  title: 'Review',
                  todo: 'Answer all the exercises of chapter 13 to review the words and information. No problem if you have forgotten some parts. It is absolutely natural. Check back any meaning or pronunciation you do not remember.',
                  extra: ''
               },
               {
                  title: 'Sentence Production Techniques',
                  todo: 'Using the information you have learnt in the class, write a good outline for the following topic: Darwinism, Truth or Lie?',
                  extra: ''
               }
            ]
         },
         // {
         //    day: 23,
         //    images: ["../images/oxford/int/23.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 24,
         //    images: ["../images/oxford/int/24a.jpg", "../images/oxford/int/24b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 25,
         //    images: ["../images/oxford/int/25a.jpg", "../images/oxford/int/25b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 26,
         //    images: ["../images/oxford/int/26a.jpg", "../images/oxford/int/26b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 27,
         //    images: ["../images/oxford/int/27.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 28,
         //    images: ["../images/oxford/int/28a.jpg", "../images/oxford/int/28b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 29,
         //    images: ["../images/oxford/int/29a.jpg", "../images/oxford/int/29b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 30,
         //    images: ["../images/oxford/int/30.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 31,
         //    images: ["../images/oxford/int/31a.jpg", "../images/oxford/int/31b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 32,
         //    images: ["../images/oxford/int/32a.jpg", "../images/oxford/int/32b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 33,
         //    images: ["../images/oxford/int/33a.jpg", "../images/oxford/int/33b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 34,
         //    images: ["../images/oxford/int/34a.jpg", "../images/oxford/int/34b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 35,
         //    images: ["../images/oxford/int/35a.jpg", "../images/oxford/int/35b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 36,
         //    images: ["../images/oxford/int/36.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 37,
         //    images: ["../images/oxford/int/37.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 38,
         //    images: ["../images/oxford/int/38.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 39,
         //    images: ["../images/oxford/int/39.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 40,
         //    images: ["../images/oxford/int/40a.jpg", "../images/oxford/int/40b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 41,
         //    images: ["../images/oxford/int/41a.jpg", "../images/oxford/int/41b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 42,
         //    images: ["../images/oxford/int/42a.jpg", "../images/oxford/int/42b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 43,
         //    images: ["../images/oxford/int/43a.jpg", "../images/oxford/int/43b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 44,
         //    images: ["../images/oxford/int/2a.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 45,
         //    images: ["../images/oxford/int/2a.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 46,
         //    images: ["../images/oxford/int/2a.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 47,
         //    images: ["../images/oxford/int/2a.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 48,
         //    images: ["../images/oxford/int/48a.jpg", "../images/oxford/int/48b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 49,
         //    images: ["../images/oxford/int/49a.jpg", "../images/oxford/int/49b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 50,
         //    images: ["../images/oxford/int/50a.jpg", "../images/oxford/int/50b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 51,
         //    images: ["../images/oxford/int/51a.jpg", "../images/oxford/int/51b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 52,
         //    images: ["../images/oxford/int/52a.jpg", "../images/oxford/int/52b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 53,
         //    images: ["../images/oxford/int/53.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 54,
         //    images: ["../images/oxford/int/54a.jpg", "../images/oxford/int/54b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 55,
         //    images: ["../images/oxford/int/55a.jpg", "../images/oxford/int/55b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 56,
         //    images: ["../images/oxford/int/56.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 57,
         //    images: ["../images/oxford/int/57.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 58,
         //    images: ["../images/oxford/int/58.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 59,
         //    images: ["../images/oxford/int/59a.jpg", "../images/oxford/int/59b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 60,
         //    images: ["../images/oxford/int/60.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 61,
         //    images: ["../images/oxford/int/61.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 62,
         //    images: ["../images/oxford/int/62a.jpg", "../images/oxford/int/62b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 63,
         //    images: ["../images/oxford/int/63a.jpg", "../images/oxford/int/63b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 64,
         //    images: ["../images/oxford/int/64a.jpg", "../images/oxford/int/64b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 65,
         //    images: ["../images/oxford/int/65a.jpg", "../images/oxford/int/65b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 66,
         //    images: ["../images/oxford/int/66a.jpg", "../images/oxford/int/66b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 67,
         //    images: ["../images/oxford/int/67a.jpg", "../images/oxford/int/67b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 68,
         //    images: ["../images/oxford/int/68.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 69,
         //    images: ["../images/oxford/int/69a.jpg", "../images/oxford/int/69b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 70,
         //    images: ["../images/oxford/int/70a.jpg", "../images/oxford/int/70b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 71,
         //    images: ["../images/oxford/int/71a.jpg", "../images/oxford/int/71b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 72,
         //    images: ["../images/oxford/int/72a.jpg", "../images/oxford/int/72b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 73,
         //    images: ["../images/oxford/int/73a.jpg", "../images/oxford/int/73b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 74,
         //    images: ["../images/oxford/int/74a.jpg", "../images/oxford/int/74b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 75,
         //    images: ["../images/oxford/int/75.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 76,
         //    images: ["../images/oxford/int/76.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 77,
         //    images: ["../images/oxford/int/77a.jpg", "../images/oxford/int/77b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 78,
         //    images: ["../images/oxford/int/78a.jpg", "../images/oxford/int/78b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 79,
         //    images: ["../images/oxford/int/79.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 80,
         //    images: ["../images/oxford/int/80a.jpg", "../images/oxford/int/80b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 81,
         //    images: ["../images/oxford/int/81a.jpg", "../images/oxford/int/81b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 82,
         //    images: ["../images/oxford/int/82a.jpg", "../images/oxford/int/82b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 83,
         //    images: ["../images/oxford/int/83.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 84,
         //    images: ["../images/oxford/int/84a.jpg", "../images/oxford/int/84b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 85,
         //    images: ["../images/oxford/int/85a.jpg", "../images/oxford/int/85b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 86,
         //    images: ["../images/oxford/int/86a.jpg", "../images/oxford/int/86b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 87,
         //    images: ["../images/oxford/int/87a.jpg", "../images/oxford/int/87b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 88,
         //    images: ["../images/oxford/int/88.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 89,
         //    images: ["../images/oxford/int/89.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 90,
         //    images: ["../images/oxford/int/90a.jpg", "../images/oxford/int/90b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 91,
         //    images: ["../images/oxford/int/91.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 92,
         //    images: ["../images/oxford/int/92.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 93,
         //    images: ["../images/oxford/int/93a.jpg", "../images/oxford/int/93b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 94,
         //    images: ["../images/oxford/int/94a.jpg", "../images/oxford/int/94b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 95,
         //    images: ["../images/oxford/int/95.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 96,
         //    images: ["../images/oxford/int/96.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 97,
         //    images: ["../images/oxford/int/97a.jpg", "../images/oxford/int/97b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 98,
         //    images: ["../images/oxford/int/98.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 99,
         //    images: ["../images/oxford/int/99a.jpg", "../images/oxford/int/99b.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // },
         // {
         //    day: 100,
         //    images: ["../images/oxford/int/100.jpg"],
         //    book: "Word Skills Int.",
         //    pages: [],
         //    instructions: []
         // }
      ]);


   }, [])

  

   function toggleMenu(){
      setMenu(!menu)
   }

   function closeOption(event){
      if (optionRef.current && !optionRef.current.contains(event.target)) {
         setMenu(false)
      }
   }

   function showWarning(){
      setWarning(true)
   }

   function restartApp(){
      localStorage.setItem('app state', JSON.stringify('startup'));
      window.location.reload()
   }

   function cancelRestart(){
      setWarning(false)
   }

   const start = () => {
      localStorage.setItem('app state', JSON.stringify('running'));

      const appStatus = localStorage.getItem('app state');
      appStatus && setStartApp(JSON.parse(appStatus));
   }

   const toggleHome = () => {
      setStartApp('running');
   }


   if (startApp === 'startup') {
      return (
      <div className={styles.container}>
         <Image className={styles.image}
            src='../images/back/background.jpg'
            fill
            alt='background'
         />
         <div className={styles.layer}>
            <div className={styles.intro}>
               <h1 className={styles.title}>Welcome My Love :)</h1>
               <p className={styles.welcome}>Start Your English Journey Here</p>
            </div>
            <div className={styles.startBtn} onClick={start}>Start Your Learning</div>
         </div>
         <div className={styles.programmer}>Powered by: Mohamad Gomar</div>
      </div>
      );
   }

   if(startApp === 'running'){
      return (
         <div className={styles.bigMom}>
   
            <Image className={styles.back}
               src='../images/back/mainBack.jpg'
               fill
               alt="background"
            />
            
            <div className={styles.holder}>
               <div className={styles.dates}>
                  <div className={styles.backHolder}>
                     <IoIosArrowDown className={styles.backBtn}/>
                     <div className={styles.date} onClick={() => setPages('home')}>Home</div>
                  </div>
                  <div className={styles.menuHolder}>
                     <div className={styles.dotHolder} onClick={toggleMenu} ref={optionRef}>
                        <CiMenuFries className={styles.hamIcon} />
                     </div>
                  </div>
               </div>
            </div>
            {
               menu ?
               <div className={styles.menu}>
                  <div className={styles.item} onClick={showWarning}>Restart</div>
                  <div className={styles.item}>Saved</div>
                  <div className={styles.item}>Dictionary</div>
                  <div className={styles.item}>Tests</div>
                  <div className={styles.item}>Review</div>
               </div>
               : null

            }

            {
               pages === 'home' ? <>
                  <div className={styles.pageHolder}>
                     <div className={styles.progress}>
                        <div className={styles.mainTitle}>Your Progress</div>
                        <div className={styles.illHolder}>
                           <Image className={styles.progPic}
                              src='../images/illustrations/progress.png'
                              alt="progress"
                              fill
                           />
                        </div>
                        <div className={styles.aveProgress}>
                           <ProgressBar inputNumber={aveProgress}/>
                           <div className={styles.aveTitle}>Completed</div>
                        </div>
                        <div className={styles.progBarHolder}>
                           <div className={styles.progBar}>
                              <div className={styles.progHolder}>
                                 <div className={styles.progNumber}>{speakProgress}%</div>
                                 <div className={styles.progTitle}>SPEAKING</div>
                              </div>
                              <div className={styles.progHolder}>
                                 <div className={styles.progNumber}>{writeProgress}%</div>
                                 <div className={styles.progTitle}>WRITING</div>
                              </div>
                              <div className={styles.progHolder}>
                                 <div className={styles.progNumber}>{listenProgress}%</div>
                                 <div className={styles.progTitle}>LISTENING</div>
                              </div>
                              <div className={styles.progHolder}>
                                 <div className={styles.progNumber}>{readProgress}%</div>
                                 <div className={styles.progTitle}>READING</div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className={styles.activityHolder}>
                        <div className={styles.activityTitle}>Start From Here</div>
                        <div className={styles.pair}>
                           <div className={styles.activity}>
                              <Image className={styles.actPic}
                                 src='../images/illustrations/activity.jpg'
                                 alt="progress"
                                 fill
                              />
                           </div>
                           <div className={styles.activity}></div>
                        </div>
                        <div className={styles.pair}>
                           <div className={styles.activity}></div>
                           <div className={styles.activity}></div>
                        </div>
                        <div className={styles.pair}>
                           <div className={styles.activity}></div>
                           <div className={styles.activity}></div>
                        </div>
                     </div>
                  </div>
               </> :
               pages === 'read' ? <>
                  <div className={styles.pageHolder}>The Reading Page</div>
               </> :
               pages === 'speak' ? <>
                  <div className={styles.pageHolder}>The Speaking Page</div>
               </> :
               pages === 'write' ? <>
                  <div className={styles.pageHolder}>The Writing Page</div>
               </> :
               pages === 'listen' ? <>
                  <div className={styles.pageHolder}>The Listening Page</div>
               </> : <div>THIS IS AN ERROR</div>
            }
            
            <div className={styles.navigation}>
               <div className={styles.iconHolder} onClick={() => setPages('read')}>
                  <IoBookOutline className={`${styles.navIcons} ${pages === 'read' && styles.selected}`} />
                  <div className={`${styles.savesTitle} ${pages === 'read' && styles.selected}`}>Read</div>
               </div>
               <div className={styles.iconHolder} onClick={() => setPages('speak')}>
                  <BiConversation className={`${styles.navIcons} ${pages === 'speak' && styles.selected}`} />
                  <div className={`${styles.savesTitle} ${pages === 'speak' && styles.selected}`}>Speak</div>
               </div>
               <div className={styles.iconHolder} onClick={() => setPages('write')}>
                  <IoReaderOutline  className={`${styles.navIcons} ${pages === 'write' && styles.selected}`} />
                  <div className={`${styles.savesTitle} ${pages === 'write' && styles.selected}`}>Write</div>
               </div>
               <div className={styles.iconHolder} onClick={() => setPages('listen')}>
                  <FaAssistiveListeningSystems  className={`${styles.navIcons} ${pages === 'listen' && styles.selected}`} />
                  <div className={`${styles.savesTitle} ${pages === 'listen' && styles.selected}`}>Listen</div>
               </div>
            </div>
   
            {
               warning ?
               <div className={styles.warning}>
                  <div>Are you sure you want to restart?</div>
                  <div className={styles.btns}>
                     <button className={styles.yes} onClick={restartApp}>Yes</button>
                     <button className={styles.no} onClick={cancelRestart}>No</button>
                  </div>
               </div>
               : null
            }
         </div>
      );
   } else {
      return (
         <div className={styles.bigMom}>
            <h2>Data Available Soon</h2>
            <button
               className={styles.btn}
               onClick={() => setCurrentDay(currentDay - 1)}
            >Go Back</button>
         </div>
      )
   }
};

export default StudyPlan;
