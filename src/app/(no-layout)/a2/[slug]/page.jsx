'use client';
import { useState, useEffect } from 'react';
import styles from './slug.module.css';
import Link from 'next/link';



export default function Lessons({ params }) {
   const [currentWordIndex, setCurrentWordIndex] = useState(0);
   const [learningWordIndex, setLearningWordIndex] = useState(0);
   const [stage, setStage] = useState('assessment');
   const [knownWords, setKnownWords] = useState([]);
   const [partialWords, setPartialWords] = useState([]);
   const [unknownWords, setUnknownWords] = useState([]);
   const [btn, setBtn] = useState(false)
   const [lessonNumber, setLessonNumber] = useState(null)

   const { slug } = params;

   useEffect(() => {
      setLessonNumber(Number(slug))
   }, [slug])

// Retrieve data from localStorage on mount
   useEffect(() => {
      try {
         const savedKnowns = JSON.parse(localStorage.getItem(`knownWords-${slug}-A2`) || '[]');
         const savedUnknowns = JSON.parse(localStorage.getItem(`unknownWords-${slug}-A2`) || '[]');
         const savedPartials = JSON.parse(localStorage.getItem(`partialWords-${slug}-A2`) || '[]');

         setKnownWords(savedKnowns);
         setUnknownWords(savedUnknowns);
         setPartialWords(savedPartials);
      } catch (e) {
         console.error('Error parsing localStorage data:', e);
      }
   }, [slug]); // Depend on slug to reload when lesson changes

   // Save data to localStorage when state changes
   useEffect(() => {
      try {
         localStorage.setItem(`knownWords-${slug}-A2`, JSON.stringify(knownWords));
         localStorage.setItem(`partialWords-${slug}-A2`, JSON.stringify(partialWords));
         localStorage.setItem(`unknownWords-${slug}-A2`, JSON.stringify(unknownWords));
      } catch (e) {
         console.error('Error saving to localStorage:', e);
      }
   }, [knownWords, partialWords, unknownWords, slug]);

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
         setStage('learning');
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
            "word": "ability",
            "role": "noun",
            "BrE": "/əˈbɪləti/",
            "AmE": "/əˈbɪləti/",
            "definition": "the mental or physical power or skill that makes it possible to do something",
            "examples": [
               "She has the ability to draw well.",
               "His ability to solve problems quickly is impressive.",
               "The ability to adapt to new technologies is essential in this job."
            ]
         },
         {
            "id": 1,
            "word": "able",
            "role": "adjective",
            "BrE": "/ˈeɪbl/",
            "AmE": "/ˈeɪbl/",
            "definition": "having the skill, strength, or knowledge to do something",
            "examples": [
               "She is able to swim fast.",
               "He was able to finish the project on time.",
               "Being able to communicate effectively is crucial for teamwork."
            ]
         },
         {
            "id": 1,
            "word": "abroad",
            "role": "adverb",
            "BrE": "/əˈbrɔːd/",
            "AmE": "/əˈbrɔːd/",
            "definition": "to or in another country",
            "examples": [
               "She went abroad for her holidays.",
               "He studies abroad in France every summer.",
               "Living abroad can broaden your understanding of different cultures."
            ]
         },
         {
            "id": 1,
            "word": "accept",
            "role": "verb",
            "BrE": "/əkˈsept/",
            "AmE": "/əkˈsept/",
            "definition": "to receive or take something offered",
            "examples": [
               "She accepted the gift happily.",
               "He accepted the job offer after thinking about it.",
               "The school does not accept responsibility for lost items."
            ]
         },
         {
            "id": 1,
            "word": "accident",
            "role": "noun",
            "BrE": "/ˈæksɪdənt/",
            "AmE": "/ˈæksɪdənt/",
            "definition": "an unpleasant event that happens unexpectedly and causes injury or damage",
            "examples": [
               "The car accident was scary.",
               "She broke her leg in a skiing accident.",
               "The accident caused a long delay on the motorway."
            ]
         },
         {
            "id": 1,
            "word": "according to",
            "role": "preposition",
            "BrE": "/əˈkɔːdɪŋ tə/",
            "AmE": "/əˈkɔːrdɪŋ tə/",
            "definition": "as stated or reported by somebody/something",
            "examples": [
               "According to the news, it will rain today.",
               "According to the teacher, the test is tomorrow.",
               "According to the survey, most people prefer coffee to tea."
            ]
         },
         {
            "id": 1,
            "word": "achieve",
            "role": "verb",
            "BrE": "/əˈtʃiːv/",
            "AmE": "/əˈtʃiːv/",
            "definition": "to succeed in doing or having something by working hard",
            "examples": [
               "She achieved good marks in her exam.",
               "He achieved his goal of running a marathon.",
               "The team achieved significant progress in the project."
            ]
         },
         {
            "id": 1,
            "word": "act",
            "role": "verb",
            "BrE": "/ækt/",
            "AmE": "/ækt/",
            "definition": "to do something for a particular purpose or to deal with a situation",
            "examples": [
               "You need to act fast in an emergency.",
               "She acted quickly to solve the problem.",
               "The government must act to reduce pollution levels."
            ]
         },
         {
            "id": 1,
            "word": "active",
            "role": "adjective",
            "BrE": "/ˈæktɪv/",
            "AmE": "/ˈæktɪv/",
            "definition": "always doing things, often moving or working",
            "examples": [
               "He is an active boy who loves sports.",
               "She stays active by walking every day.",
               "The active participation of students improves learning."
            ]
         },
         {
            "id": 1,
            "word": "actually",
            "role": "adverb",
            "BrE": "/ˈæktʃuəli/",
            "AmE": "/ˈæktʃuəli/",
            "definition": "used to emphasize something that is true or to correct a mistake",
            "examples": [
               "I actually like this song.",
               "He’s actually much older than he looks.",
               "The meeting was actually more productive than expected."
            ]
         },
         {
            "id": 2,
            "word": "adult",
            "role": "noun",
            "BrE": "/ˈædʌlt/",
            "AmE": "/əˈdʌlt/",
            "definition": "a fully grown person who is legally responsible for their actions",
            "examples": [
               "The movie is for adults only.",
               "She became an adult at the age of 18.",
               "As an adult, he is responsible for his own decisions."
            ]
         },
         {
            "id": 2,
            "word": "advantage",
            "role": "noun",
            "BrE": "/ədˈvɑːntɪdʒ/",
            "AmE": "/ədˈvæntɪdʒ/",
            "definition": "something that helps you to be more successful than others",
            "examples": [
               "Her height is an advantage in basketball.",
               "Knowing two languages is a big advantage.",
               "The team’s experience gave them a competitive advantage."
            ]
         },
         {
            "id": 2,
            "word": "adventure",
            "role": "noun",
            "BrE": "/ədˈventʃə(r)/",
            "AmE": "/ədˈventʃər/",
            "definition": "an unusual, exciting, or dangerous experience",
            "examples": [
               "They went on an adventure in the forest.",
               "Her trip to Africa was a great adventure.",
               "The book describes the adventures of a young explorer."
            ]
         },
         {
            "id": 2,
            "word": "advertise",
            "role": "verb",
            "BrE": "/ˈædvətaɪz/",
            "AmE": "/ˈædvərtaɪz/",
            "definition": "to tell people about a product or service, for example in newspapers or on television",
            "examples": [
               "They advertise their shop on TV.",
               "The company advertised its new product online.",
               "We need to advertise the event to attract more people."
            ]
         },
         {
            "id": 2,
            "word": "advertisement",
            "role": "noun",
            "BrE": "/ədˈvɜːtɪsmənt/",
            "AmE": "/ˌædvərˈtaɪzmənt/",
            "definition": "a notice, picture, or film telling people about a product, job, or service",
            "examples": [
               "I saw an advertisement for a new phone.",
               "The advertisement was in the newspaper.",
               "A creative advertisement can attract many customers."
            ]
         },
         {
            "id": 2,
            "word": "advertising",
            "role": "noun",
            "BrE": "/ˈædvətaɪzɪŋ/",
            "AmE": "/ˈædvərtaɪzɪŋ/",
            "definition": "the activity or business of telling people about products or services to persuade them to buy or use them",
            "examples": [
               "Advertising helps sell products.",
               "She works in the advertising industry.",
               "Effective advertising can increase a company’s sales."
            ]
         },
         {
            "id": 2,
            "word": "affect",
            "role": "verb",
            "BrE": "/əˈfekt/",
            "AmE": "/əˈfekt/",
            "definition": "to produce a change in somebody/something",
            "examples": [
               "The weather affects my mood.",
               "Pollution affects the environment badly.",
               "The new law will affect how businesses operate."
            ]
         },
         {
            "id": 2,
            "word": "after",
            "role": "preposition",
            "BrE": "/ˈɑːftə(r)/",
            "AmE": "/ˈæftər/",
            "definition": "following something in time or order",
            "examples": [
               "We’ll meet after school.",
               "She ate dessert after dinner.",
               "The meeting is scheduled after the lunch break."
            ]
         },
         {
            "id": 2,
            "word": "against",
            "role": "preposition",
            "BrE": "/əˈɡenst/",
            "AmE": "/əˈɡenst/",
            "definition": "in opposition to something or somebody",
            "examples": [
               "I’m against eating too much sugar.",
               "She voted against the new rule.",
               "The team played against a strong opponent."
            ]
         },
         {
            "id": 2,
            "word": "ah",
            "role": "exclamation",
            "BrE": "/ɑː/",
            "AmE": "/ɑː/",
            "definition": "used to express surprise, pleasure, or understanding",
            "examples": [
               "Ah, you’re here!",
               "Ah, I understand now.",
               "Ah, what a beautiful sunset!"
            ]
         },
         {
            "id": 3,
            "word": "airline",
            "role": "noun",
            "BrE": "/ˈeəlaɪn/",
            "AmE": "/ˈerlaɪn/",
            "definition": "a company that provides regular flights to take passengers and goods to different places",
            "examples": [
               "The airline has cheap tickets.",
               "She works for a famous airline.",
               "This airline offers flights to over 50 countries."
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
               "The fish is still alive.",
               "He felt alive after the run.",
               "The forest is alive with many animals."
            ]
         },
         {
            "id": 3,
            "word": "all",
            "role": "determiner",
            "BrE": "/ɔːl/",
            "AmE": "/ɔːl/",
            "definition": "the whole number or amount of something",
            "examples": [
               "All my friends came to the party.",
               "She spent all her money on books.",
               "All the students passed the final exam."
            ]
         },
         {
            "id": 3,
            "word": "all right",
            "role": "adjective",
            "BrE": "/ˌɔːl ˈraɪt/",
            "AmE": "/ˌɔːl ˈraɪt/",
            "definition": "satisfactory or acceptable; not bad",
            "examples": [
               "The food was all right.",
               "Is everything all right with you?",
               "The plan seems all right, but we need more details."
            ]
         },
         {
            "id": 3,
            "word": "allow",
            "role": "verb",
            "BrE": "/əˈlaʊ/",
            "AmE": "/əˈlaʊ/",
            "definition": "to let somebody do something or let something happen",
            "examples": [
               "They allow pets in the hotel.",
               "The teacher allows us to use dictionaries.",
               "The rules do not allow smoking in this area."
            ]
         },
         {
            "id": 3,
            "word": "almost",
            "role": "adverb",
            "BrE": "/ˈɔːlməʊst/",
            "AmE": "/ˈɔːlmoʊst/",
            "definition": "nearly but not completely",
            "examples": [
               "I’m almost ready to go.",
               "She almost missed the bus.",
               "The project is almost finished, just a few details left."
            ]
         },
         {
            "id": 3,
            "word": "alone",
            "role": "adjective",
            "BrE": "/əˈləʊn/",
            "AmE": "/əˈloʊn/",
            "definition": "without any other people",
            "examples": [
               "She lives alone in a small house.",
               "He felt alone without his friends.",
               "She prefers to work alone on difficult tasks."
            ]
         },
         {
            "id": 3,
            "word": "along",
            "role": "preposition",
            "BrE": "/əˈlɒŋ/",
            "AmE": "/əˈlɔːŋ/",
            "definition": "from one end to or towards the other end of something",
            "examples": [
               "We walked along the river.",
               "There are trees along the road.",
               "Shops are built along the main street."
            ]
         },
         {
            "id": 3,
            "word": "already",
            "role": "adverb",
            "BrE": "/ɔːlˈredi/",
            "AmE": "/ɔːlˈredi/",
            "definition": "used to say that something has happened earlier than expected",
            "examples": [
               "I’ve already finished my homework.",
               "She’s already left for the airport.",
               "The event has already attracted a large audience."
            ]
         },
         {
            "id": 3,
            "word": "alternative",
            "role": "noun",
            "BrE": "/ɔːlˈtɜːnətɪv/",
            "AmE": "/ɔːlˈtɜːrnətɪv/",
            "definition": "something you can choose to do or use instead of something else",
            "examples": [
               "Sugar is bad for health. Any other alternative?",
               "There is no alternative for money in life.",
               "The alternative that we need should have all the requirments."
            ]
         },
         {
            "id": 4,
            "word": "although",
            "role": "conjunction",
            "BrE": "/ɔːlˈðəʊ/",
            "AmE": "/ɔːlˈðoʊ/",
            "definition": "despite the fact that; used to introduce a statement that contrasts with something that has been mentioned before",
            "examples": [
               "She went out, although it was raining.",
               "Although he was tired, he finished his work.",
               "Although the task was difficult, they completed it successfully."
            ]
         },
         {
            "id": 4,
            "word": "among",
            "role": "preposition",
            "BrE": "/əˈmʌŋ/",
            "AmE": "/əˈmʌŋ/",
            "definition": "in the middle of or surrounded by other things or people",
            "examples": [
               "She stood among her friends.",
               "The book was hidden among the papers.",
               "He felt comfortable among people from different cultures."
            ]
         },
         {
            "id": 4,
            "word": "amount",
            "role": "noun",
            "BrE": "/əˈmaʊnt/",
            "AmE": "/əˈmaʊnt/",
            "definition": "a quantity of something, such as money or time",
            "examples": [
               "She spent a large amount on clothes.",
               "The amount of work was overwhelming.",
               "A significant amount of time was spent on research."
            ]
         },
         {
            "id": 4,
            "word": "ancient",
            "role": "adjective",
            "BrE": "/ˈeɪnʃnt/",
            "AmE": "/ˈeɪnʃnt/",
            "definition": "belonging to a time long ago in history",
            "examples": [
               "The ancient castle is beautiful.",
               "They visited an ancient temple in Egypt.",
               "Ancient civilizations left behind many mysteries."
            ]
         },
         {
            "id": 4,
            "word": "ankle",
            "role": "noun",
            "BrE": "/ˈæŋkl/",
            "AmE": "/ˈæŋkl/",
            "definition": "the joint between the foot and the leg",
            "examples": [
               "She hurt her ankle playing football.",
               "His ankle was swollen after the fall.",
               "The injury to her ankle required medical attention."
            ]
         },
         {
            "id": 4,
            "word": "any",
            "role": "determiner",
            "BrE": "/ˈeni/",
            "AmE": "/ˈeni/",
            "definition": "used to refer to one, some, or all of a group of things or people, when it does not matter which",
            "examples": [
               "Do you have any questions?",
               "Any student can join the club.",
               "She didn’t have any trouble finding the place."
            ]
         },
         {
            "id": 4,
            "word": "any more",
            "role": "adverb",
            "BrE": "/ˌeni ˈmɔː(r)/",
            "AmE": "/ˌeni ˈmɔːr/",
            "definition": "no longer; not now as before",
            "examples": [
               "I don’t live there any more.",
               "She doesn’t play tennis any more.",
               "They don’t sell that product any more."
            ]
         },
         {
            "id": 4,
            "word": "anybody",
            "role": "pronoun",
            "BrE": "/ˈenibɒdi/",
            "AmE": "/ˈenibɑːdi/",
            "definition": "any person; it does not matter who",
            "examples": [
               "Does anybody want coffee?",
               "Anybody can join the team.",
               "I didn’t see anybody in the park."
            ]
         },
         {
            "id": 4,
            "word": "anyway",
            "role": "adverb",
            "BrE": "/ˈeniweɪ/",
            "AmE": "/ˈeniweɪ/",
            "definition": "used to change the subject or return to an earlier subject",
            "examples": [
               "I’m tired, but I’ll go anyway.",
               "Anyway, let’s talk about the plan.",
               "It was late, but she finished the work anyway."
            ]
         },
         {
            "id": 4,
            "word": "anywhere",
            "role": "adverb",
            "BrE": "/ˈeniweə(r)/",
            "AmE": "/ˈeniwer/",
            "definition": "in, at, or to any place",
            "examples": [
               "You can sit anywhere.",
               "I couldn’t find my keys anywhere.",
               "She travels anywhere her job takes her."
            ]
         },
         {
            "id": 5,
            "word": "app",
            "role": "noun",
            "BrE": "/æp/",
            "AmE": "/æp/",
            "definition": "a small program that you can download and use on a mobile phone or computer",
            "examples": [
               "I use an app to learn English.",
               "This app helps me track my exercise.",
               "The new app simplifies online shopping."
            ]
         },
         {
            "id": 5,
            "word": "appear",
            "role": "verb",
            "BrE": "/əˈpɪə(r)/",
            "AmE": "/əˈpɪr/",
            "definition": "to start to be seen or to be noticed",
            "examples": [
               "The sun appeared after the rain.",
               "She appeared nervous before the speech.",
               "New problems appeared during the project."
            ]
         },
         {
            "id": 5,
            "word": "appearance",
            "role": "noun",
            "BrE": "/əˈpɪərəns/",
            "AmE": "/əˈpɪrəns/",
            "definition": "the way that somebody/something looks or seems",
            "examples": [
               "Her appearance was tidy and clean.",
               "The appearance of the house was beautiful.",
               "His confident appearance impressed the audience."
            ]
         },
         {
            "id": 5,
            "word": "apply",
            "role": "verb",
            "BrE": "/əˈplaɪ/",
            "AmE": "/əˈplaɪ/",
            "definition": "to make a formal request, usually in writing, for something such as a job",
            "examples": [
               "She applied for a new job.",
               "He applied to study at the university.",
               "They applied for a permit to build a house."
            ]
         },
         {
            "id": 5,
            "word": "architect",
            "role": "noun",
            "BrE": "/ˈɑːkɪtekt/",
            "AmE": "/ˈɑːrkɪtekt/",
            "definition": "a person who designs buildings",
            "examples": [
               "The architect drew a house plan.",
               "She is a famous architect in the city.",
               "The architect’s design won an award."
            ]
         },
         {
            "id": 5,
            "word": "architecture",
            "role": "noun",
            "BrE": "/ˈɑːkɪtektʃə(r)/",
            "AmE": "/ˈɑːrkɪtektʃər/",
            "definition": "the art and science of designing and making buildings",
            "examples": [
               "I study architecture at university.",
               "The city has beautiful modern architecture.",
               "Architecture from the 18th century is fascinating."
            ]
         },
         {
            "id": 5,
            "word": "argue",
            "role": "verb",
            "BrE": "/ˈɑːɡjuː/",
            "AmE": "/ˈɑːrɡjuː/",
            "definition": "to speak angrily to somebody because you disagree with them",
            "examples": [
               "They argue about money often.",
               "She argued with her brother yesterday.",
               "The team argued over the best strategy."
            ]
         },
         {
            "id": 5,
            "word": "argument",
            "role": "noun",
            "BrE": "/ˈɑːɡjumənt/",
            "AmE": "/ˈɑːrɡjumənt/",
            "definition": "an angry discussion with somebody when you disagree",
            "examples": [
               "They had an argument about homework.",
               "The argument with her friend upset her.",
               "A heated argument broke out during the meeting."
            ]
         },
         {
            "id": 5,
            "word": "army",
            "role": "noun",
            "BrE": "/ˈɑːmi/",
            "AmE": "/ˈɑːrmi/",
            "definition": "a large organized group of soldiers who are trained to fight",
            "examples": [
               "He joined the army last year.",
               "The army trained in the desert.",
               "The army was sent to maintain peace."
            ]
         },
         {
            "id": 5,
            "word": "arrange",
            "role": "verb",
            "BrE": "/əˈreɪndʒ/",
            "AmE": "/əˈreɪndʒ/",
            "definition": "to plan or organize something in advance",
            "examples": [
               "She arranged a party for her friends.",
               "He arranged a meeting with his boss.",
               "They arranged transport for the school trip."
            ]
         },
         {
            "id": 6,
            "word": "arrangement",
            "role": "noun",
            "BrE": "/əˈreɪndʒmənt/",
            "AmE": "/əˈreɪndʒmənt/",
            "definition": "a plan or preparation that you make so that something can happen",
            "examples": [
               "She made an arrangement to meet him.",
               "The arrangement for the trip was perfect.",
               "Special arrangements were made for the event."
            ]
         },
         {
            "id": 6,
            "word": "as",
            "role": "preposition",
            "BrE": "/əz/",
            "AmE": "/əz/",
            "definition": "used to describe the function, role, or job of somebody/something",
            "examples": [
               "She works as a teacher.",
               "He acted as the team leader.",
               "The room was used as a study area."
            ]
         },
         {
            "id": 6,
            "word": "asleep",
            "role": "adjective",
            "BrE": "/əˈsliːp/",
            "AmE": "/əˈsliːp/",
            "definition": "sleeping; not awake",
            "examples": [
               "The baby is asleep in bed.",
               "She fell asleep during the movie.",
               "He was asleep when the phone rang."
            ]
         },
         {
            "id": 6,
            "word": "assistant",
            "role": "noun",
            "BrE": "/əˈsɪstənt/",
            "AmE": "/əˈsɪstənt/",
            "definition": "a person who helps someone in their work",
            "examples": [
               "She works as a shop assistant.",
               "The assistant helped with the project.",
               "He hired a personal assistant for his office."
            ]
         },
         {
            "id": 6,
            "word": "athlete",
            "role": "noun",
            "BrE": "/ˈæθliːt/",
            "AmE": "/ˈæθliːt/",
            "definition": "a person who competes in sports",
            "examples": [
               "He is a great athlete at school.",
               "The athlete won a gold medal.",
               "Professional athletes train every day."
            ]
         },
         {
            "id": 6,
            "word": "attack",
            "role": "verb",
            "BrE": "/əˈtæk/",
            "AmE": "/əˈtæk/",
            "definition": "to use violence to try to hurt or kill somebody",
            "examples": [
               "The dog attacked the stranger.",
               "They were attacked during the hike.",
               "The army attacked the enemy’s position."
            ]
         },
         {
            "id": 6,
            "word": "attend",
            "role": "verb",
            "BrE": "/əˈtend/",
            "AmE": "/əˈtend/",
            "definition": "to go to an event, such as a meeting or a class",
            "examples": [
               "She attends school every day.",
               "He attended a concert last night.",
               "They attended an important business meeting."
            ]
         },
         {
            "id": 6,
            "word": "attention",
            "role": "noun",
            "BrE": "/əˈtenʃn/",
            "AmE": "/əˈtenʃn/",
            "definition": "the act of watching or listening to something carefully",
            "examples": [
               "Pay attention in class!",
               "The teacher asked for our attention.",
               "Her speech captured everyone’s attention."
            ]
         },
         {
            "id": 6,
            "word": "attractive",
            "role": "adjective",
            "BrE": "/əˈtræktɪv/",
            "AmE": "/əˈtræktɪv/",
            "definition": "pleasing to look at; appealing",
            "examples": [
               "She wore an attractive dress.",
               "The house has an attractive garden.",
               "The shop’s attractive display drew customers."
            ]
         },
         {
            "id": 6,
            "word": "audience",
            "role": "noun",
            "BrE": "/ˈɔːdiəns/",
            "AmE": "/ˈɔːdiəns/",
            "definition": "a group of people who watch or listen to something, such as a play or speech",
            "examples": [
               "The audience clapped loudly.",
               "The movie had a large audience.",
               "The speaker addressed an enthusiastic audience."
            ]
         },
         {
            "id": 7,
            "word": "author",
            "role": "noun",
            "BrE": "/ˈɔːθə(r)/",
            "AmE": "/ˈɔːθər/",
            "definition": "a person who writes a book, article, etc.",
            "examples": [
               "She is the author of a novel.",
               "The author signed my book.",
               "The author’s new book is very popular."
            ]
         },
         {
            "id": 7,
            "word": "available",
            "role": "adjective",
            "BrE": "/əˈveɪləbl/",
            "AmE": "/əˈveɪləbl/",
            "definition": "able to be used or obtained",
            "examples": [
               "Tickets are available at the door.",
               "The book is available in the library.",
               "Free parking is available near the mall."
            ]
         },
         {
            "id": 7,
            "word": "average",
            "role": "adjective",
            "BrE": "/ˈævərɪdʒ/",
            "AmE": "/ˈævərɪdʒ/",
            "definition": "typical or normal; not special",
            "examples": [
               "He is an average student.",
               "The weather was average for July.",
               "Her test score was above average."
            ]
         },
         {
            "id": 7,
            "word": "avoid",
            "role": "verb",
            "BrE": "/əˈvɔɪd/",
            "AmE": "/əˈvɔɪd/",
            "definition": "to prevent something from happening or to try not to do something",
            "examples": [
               "I avoid eating too much sugar.",
               "She avoided the busy road.",
               "He avoided answering the difficult question."
            ]
         },
         {
            "id": 7,
            "word": "award",
            "role": "noun",
            "BrE": "/əˈwɔːd/",
            "AmE": "/əˈwɔːrd/",
            "definition": "a prize or other recognition given for something well done",
            "examples": [
               "She won an award for her essay.",
               "The film received many awards.",
               "The award for best actor was surprising."
            ]
         },
         {
            "id": 7,
            "word": "awful",
            "role": "adjective",
            "BrE": "/ˈɔːfl/",
            "AmE": "/ˈɔːfl/",
            "definition": "very bad or unpleasant",
            "examples": [
               "The weather was awful today.",
               "She had an awful day at work.",
               "The smell in the room was truly awful."
            ]
         },
         {
            "id": 7,
            "word": "back",
            "role": "noun",
            "BrE": "/bæk/",
            "AmE": "/bæk/",
            "definition": "the part of the body from the neck to the bottom of the spine",
            "examples": [
               "My back hurts after sitting.",
               "He carried a bag on his back.",
               "She injured her back while exercising."
            ]
         },
         {
            "id": 7,
            "word": "background",
            "role": "noun",
            "BrE": "/ˈbækɡraʊnd/",
            "AmE": "/ˈbækɡraʊnd/",
            "definition": "the things behind something, or the part of a picture or scene that is furthest from you",
            "examples": [
               "The photo has a nice background.",
               "There’s a mountain in the background.",
               "The painting’s background adds to its beauty."
            ]
         },
         {
            "id": 7,
            "word": "badly",
            "role": "adverb",
            "BrE": "/ˈbædli/",
            "AmE": "/ˈbædli/",
            "definition": "in a way that is not good or not successful",
            "examples": [
               "He sang badly in the show.",
               "The team played badly yesterday.",
               "The project was managed badly."
            ]
         },
         {
            "id": 7,
            "word": "bar",
            "role": "noun",
            "BrE": "/bɑː(r)/",
            "AmE": "/bɑːr/",
            "definition": "a place where you can buy and drink alcoholic drinks",
            "examples": [
               "Let’s meet at the bar.",
               "The bar was crowded last night.",
               "They enjoyed drinks at the hotel bar."
            ]
         },
         {
            "id": 8,
            "word": "baseball",
            "role": "noun",
            "BrE": "/ˈbeɪsbɔːl/",
            "AmE": "/ˈbeɪsbɔːl/",
            "definition": "a game played with a bat and ball between two teams",
            "examples": [
               "He plays baseball at school.",
               "Baseball is popular in America.",
               "The baseball match lasted three hours."
            ]
         },
         {
            "id": 8,
            "word": "based",
            "role": "adjective",
            "BrE": "/beɪst/",
            "AmE": "/beɪst/",
            "definition": "having something as its main part or origin",
            "examples": [
               "The movie is based on a book.",
               "Her decision was based on facts.",
               "The story is based on real events."
            ]
         },
         {
            "id": 8,
            "word": "basketball",
            "role": "noun",
            "BrE": "/ˈbɑːskɪtbɔːl/",
            "AmE": "/ˈbæskɪtbɔːl/",
            "definition": "a game played by two teams who try to throw a ball through a high net",
            "examples": [
               "I play basketball with friends.",
               "Basketball is her favourite sport.",
               "The basketball team won the championship."
            ]
         },
         {
            "id": 8,
            "word": "bean",
            "role": "noun",
            "BrE": "/biːn/",
            "AmE": "/biːn/",
            "definition": "a seed or pod used as food",
            "examples": [
               "She cooked beans for dinner.",
               "He likes green beans with rice.",
               "The recipe includes black beans."
            ]
         },
         {
            "id": 8,
            "word": "bear",
            "role": "noun",
            "BrE": "/beə(r)/",
            "AmE": "/ber/",
            "definition": "a large, heavy animal with thick fur",
            "examples": [
               "I saw a bear in the zoo.",
               "The bear was fishing in the river.",
               "Polar bears live in cold climates."
            ]
         },
         {
            "id": 8,
            "word": "beat",
            "role": "verb",
            "BrE": "/biːt/",
            "AmE": "/biːt/",
            "definition": "to defeat somebody in a game or competition",
            "examples": [
               "Our team beat the others.",
               "She beat him at chess.",
               "They beat their rivals in the final."
            ]
         },
         {
            "id": 8,
            "word": "beef",
            "role": "noun",
            "BrE": "/biːf/",
            "AmE": "/biːf/",
            "definition": "the meat from a cow",
            "examples": [
               "We ate beef for dinner.",
               "The beef was cooked perfectly.",
               "She prepared a beef stew."
            ]
         },
         {
            "id": 8,
            "word": "before",
            "role": "preposition",
            "BrE": "/bɪˈfɔː(r)/",
            "AmE": "/bɪˈfɔːr/",
            "definition": "earlier than a particular time or event",
            "examples": [
               "I’ll call you before lunch.",
               "She finished her work before noon.",
               "Check the details before signing."
            ]
         },
         {
            "id": 8,
            "word": "behave",
            "role": "verb",
            "BrE": "/bɪˈheɪv/",
            "AmE": "/bɪˈheɪv/",
            "definition": "to act in a particular way",
            "examples": [
               "The children behave well.",
               "He behaved badly at the party.",
               "She always behaves politely in public."
            ]
         },
         {
            "id": 8,
            "word": "behaviour",
            "role": "noun",
            "BrE": "/bɪˈheɪvjə(r)/",
            "AmE": "/bɪˈheɪvjər/",
            "definition": "the way that somebody acts or behaves",
            "examples": [
               "His behaviour was very good.",
               "Her behaviour surprised everyone.",
               "The teacher praised their good behaviour."
            ]
         },
         {
            "id": 9,
            "word": "belong",
            "role": "verb",
            "BrE": "/bɪˈlɒŋ/",
            "AmE": "/bɪˈlɔːŋ/",
            "definition": "to be in the right place or to be owned by someone",
            "examples": [
               "This book belongs to me.",
               "She belongs to the music club.",
               "These items belong in the kitchen."
            ]
         },
         {
            "id": 9,
            "word": "belt",
            "role": "noun",
            "BrE": "/belt/",
            "AmE": "/belt/",
            "definition": "a long, narrow piece of leather or cloth worn around the waist",
            "examples": [
               "He wore a black belt.",
               "The belt matches her dress.",
               "She tightened her belt before running."
            ]
         },
         {
            "id": 9,
            "word": "benefit",
            "role": "noun",
            "BrE": "/ˈbenɪfɪt/",
            "AmE": "/ˈbenɪfɪt/",
            "definition": "an advantage or useful effect that something has",
            "examples": [
               "Exercise has many benefits.",
               "The job offers health benefits.",
               "Learning a language has long-term benefits."
            ]
         },
         {
            "id": 9,
            "word": "best",
            "role": "adjective",
            "BrE": "/best/",
            "AmE": "/best/",
            "definition": "better than all others in quality or ability",
            "examples": [
               "She is my best friend.",
               "This is the best cake ever.",
               "He was the best candidate for the job."
            ]
         },
         {
            "id": 9,
            "word": "better",
            "role": "adjective",
            "BrE": "/ˈbetə(r)/",
            "AmE": "/ˈbetər/",
            "definition": "of a higher quality or standard than something else",
            "examples": [
               "This book is better than that one.",
               "She feels better after resting.",
               "His grades are better this year."
            ]
         },
         {
            "id": 9,
            "word": "between",
            "role": "preposition",
            "BrE": "/bɪˈtwiːn/",
            "AmE": "/bɪˈtwiːn/",
            "definition": "in or into the space or time that separates two things or people",
            "examples": [
               "The shop is between the bank and the school.",
               "We’ll meet between 2 and 3 p.m.",
               "The choice is between two good options."
            ]
         },
         {
            "id": 9,
            "word": "billion",
            "role": "number",
            "BrE": "/ˈbɪljən/",
            "AmE": "/ˈbɪljən/",
            "definition": "the number 1,000,000,000",
            "examples": [
               "The company is worth a billion.",
               "A billion people live in the country.",
               "The project cost over a billion dollars."
            ]
         },
         {
            "id": 9,
            "word": "bin",
            "role": "noun",
            "BrE": "/bɪn/",
            "AmE": "/bɪn/",
            "definition": "a container for putting rubbish in",
            "examples": [
               "Throw the paper in the bin.",
               "The bin is full of rubbish.",
               "Please empty the recycling bin."
            ]
         },
         {
            "id": 9,
            "word": "biology",
            "role": "noun",
            "BrE": "/baɪˈɒlədʒi/",
            "AmE": "/baɪˈɑːlədʒi/",
            "definition": "the scientific study of living things",
            "examples": [
               "She studies biology at school.",
               "Biology is her favourite subject.",
               "The biology class learned about plants."
            ]
         },
         {
            "id": 9,
            "word": "birth",
            "role": "noun",
            "BrE": "/bɜːθ/",
            "AmE": "/bɜːrθ/",
            "definition": "the time when a baby is born",
            "examples": [
               "The baby’s birth was yesterday.",
               "Her birth was in a hospital.",
               "The birth of her son was joyful."
            ]
         },
         {
            "id": 10,
            "word": "biscuit",
            "role": "noun",
            "BrE": "/ˈbɪskɪt/",
            "AmE": "/ˈbɪskɪt/",
            "definition": "a small, flat cake that is usually sweet",
            "examples": [
               "I ate a chocolate biscuit.",
               "She offered biscuits with tea.",
               "Homemade biscuits are the best."
            ]
         },
         {
            "id": 10,
            "word": "bit",
            "role": "noun",
            "BrE": "/bɪt/",
            "AmE": "/bɪt/",
            "definition": "a small amount or piece of something",
            "examples": [
               "Add a bit of salt.",
               "I’m a bit tired today.",
               "She ate a bit of the cake."
            ]
         },
         {
            "id": 10,
            "word": "blank",
            "role": "adjective",
            "BrE": "/blæŋk/",
            "AmE": "/blæŋk/",
            "definition": "empty or with nothing written or drawn on it",
            "examples": [
               "The page was blank.",
               "She handed me a blank paper.",
               "His mind went blank during the test."
            ]
         },
         {
            "id": 10,
            "word": "blood",
            "role": "noun",
            "BrE": "/blʌd/",
            "AmE": "/blʌd/",
            "definition": "the red liquid that flows through the body",
            "examples": [
               "There was blood on his hand.",
               "The doctor checked her blood pressure.",
               "Blood tests showed no problems."
            ]
         },
         {
            "id": 10,
            "word": "blow",
            "role": "verb",
            "BrE": "/bləʊ/",
            "AmE": "/bloʊ/",
            "definition": "to send out air from the mouth",
            "examples": [
               "Blow out the candles!",
               "She blew on her soup to cool it.",
               "The wind blew strongly last night."
            ]
         },
         {
            "id": 10,
            "word": "board",
            "role": "noun",
            "BrE": "/bɔːd/",
            "AmE": "/bɔːrd/",
            "definition": "a flat piece of wood or other material used for a particular purpose",
            "examples": [
               "Write on the board.",
               "The board has a new message.",
               "They posted notices on the board."
            ]
         },
         {
            "id": 10,
            "word": "boil",
            "role": "verb",
            "BrE": "/bɔɪl/",
            "AmE": "/bɔɪl/",
            "definition": "to heat a liquid, such as water, until it reaches a high temperature",
            "examples": [
               "Boil water for tea.",
               "She boiled the eggs for breakfast.",
               "The soup is boiling on the stove."
            ]
         },
         {
            "id": 10,
            "word": "bone",
            "role": "noun",
            "BrE": "/bəʊn/",
            "AmE": "/boʊn/",
            "definition": "one of the hard parts that form the skeleton of a body",
            "examples": [
               "The dog chewed a bone.",
               "He broke a bone in his arm.",
               "The fish bone got stuck in her throat."
            ]
         },
         {
            "id": 10,
            "word": "book",
            "role": "noun",
            "BrE": "/bʊk/",
            "AmE": "/bʊk/",
            "definition": "a set of printed pages that are held together in a cover",
            "examples": [
               "I read a good book.",
               "She wrote a book about history.",
               "The library has many new books."
            ]
         },
         {
            "id": 10,
            "word": "borrow",
            "role": "verb",
            "BrE": "/ˈbɒrəʊ/",
            "AmE": "/ˈbɑːroʊ/",
            "definition": "to take and use something that belongs to someone else, with the intention of returning it",
            "examples": [
               "Can I borrow your pen?",
               "She borrowed a book from me.",
               "He borrowed money from his friend."
            ]
         },
         {
            "id": 11,
            "word": "boss",
            "role": "noun",
            "BrE": "/bɒs/",
            "AmE": "/bɔːs/",
            "definition": "a person who is in charge of others at work",
            "examples": [
               "My boss is very kind.",
               "The boss gave us a new task.",
               "She discussed the project with her boss."
            ]
         },
         {
            "id": 11,
            "word": "bottom",
            "role": "noun",
            "BrE": "/ˈbɒtəm/",
            "AmE": "/ˈbɑːtəm/",
            "definition": "the lowest part of something",
            "examples": [
               "The book is at the bottom of the bag.",
               "She sat at the bottom of the stairs.",
               "The ship sank to the bottom of the sea."
            ]
         },
         {
            "id": 11,
            "word": "bowl",
            "role": "noun",
            "BrE": "/bəʊl/",
            "AmE": "/boʊl/",
            "definition": "a deep, round container used for holding food",
            "examples": [
               "Put the soup in a bowl.",
               "She ate cereal from a bowl.",
               "The bowl was filled with fruit."
            ]
         },
         {
            "id": 11,
            "word": "brain",
            "role": "noun",
            "BrE": "/breɪn/",
            "AmE": "/breɪn/",
            "definition": "the organ inside the head that controls thought, memory, and feeling",
            "examples": [
               "The brain is very important.",
               "Her brain works quickly in tests.",
               "Scientists study how the brain functions."
            ]
         },
         {
            "id": 11,
            "word": "bridge",
            "role": "noun",
            "BrE": "/brɪdʒ/",
            "AmE": "/brɪdʒ/",
            "definition": "a structure built over a river or road to allow people to cross",
            "examples": [
               "We crossed the bridge to the town.",
               "The bridge is old but strong.",
               "A new bridge was built last year."
            ]
         },
         {
            "id": 11,
            "word": "bright",
            "role": "adjective",
            "BrE": "/braɪt/",
            "AmE": "/braɪt/",
            "definition": "full of light or shining strongly",
            "examples": [
               "The sun is bright today.",
               "She wore a bright red dress.",
               "The bright lights lit up the stage."
            ]
         },
         {
            "id": 11,
            "word": "brilliant",
            "role": "adjective",
            "BrE": "/ˈbrɪliənt/",
            "AmE": "/ˈbrɪliənt/",
            "definition": "extremely clever or impressive",
            "examples": [
               "She had a brilliant idea.",
               "His speech was absolutely brilliant.",
               "The scientist made a brilliant discovery."
            ]
         },
         {
            "id": 11,
            "word": "broken",
            "role": "adjective",
            "BrE": "/ˈbrəʊkən/",
            "AmE": "/ˈbroʊkən/",
            "definition": "damaged and no longer working or whole",
            "examples": [
               "The cup is broken.",
               "He fixed the broken chair.",
               "The broken machine was replaced."
            ]
         },
         {
            "id": 11,
            "word": "brush",
            "role": "noun",
            "BrE": "/brʌʃ/",
            "AmE": "/brʌʃ/",
            "definition": "an object with bristles used for cleaning or painting",
            "examples": [
               "I need a brush for my hair.",
               "She used a brush to paint.",
               "The brush cleaned the shoes well."
            ]
         },
         {
            "id": 11,
            "word": "burn",
            "role": "verb",
            "BrE": "/bɜːn/",
            "AmE": "/bɜːrn/",
            "definition": "to be on fire or to destroy something with fire",
            "examples": [
               "The candle burned brightly.",
               "She burned her hand on the stove.",
               "The fire burned all the papers."
            ]
         },
         {
            "id": 12,
            "word": "businessman",
            "role": "noun",
            "BrE": "/ˈbɪznəsmən/",
            "AmE": "/ˈbɪznəsmən/",
            "definition": "a man who works in business, especially at a high level",
            "examples": [
               "He is a successful businessman.",
               "The businessman travelled to London.",
               "The businessman invested in new projects."
            ]
         },
         {
            "id": 12,
            "word": "button",
            "role": "noun",
            "BrE": "/ˈbʌtn/",
            "AmE": "/ˈbʌtn/",
            "definition": "a small, usually round object used to fasten clothes",
            "examples": [
               "My shirt lost a button.",
               "She sewed a button on her coat.",
               "The button on his jacket was shiny."
            ]
         },
         {
            "id": 12,
            "word": "camp",
            "role": "noun",
            "BrE": "/kæmp/",
            "AmE": "/kæmp/",
            "definition": "a place where people stay in tents or temporary shelters",
            "examples": [
               "We stayed at a camp by the lake.",
               "The camp was fun for kids.",
               "They set up a camp in the forest."
            ]
         },
         {
            "id": 12,
            "word": "camping",
            "role": "noun",
            "BrE": "/ˈkæmpɪŋ/",
            "AmE": "/ˈkæmpɪŋ/",
            "definition": "the activity of staying in a tent or temporary shelter",
            "examples": [
               "Camping is fun in summer.",
               "We went camping in the mountains.",
               "Camping requires good planning."
            ]
         },
         {
            "id": 12,
            "word": "can",
            "role": "modal verb",
            "BrE": "/kən/",
            "AmE": "/kən/",
            "definition": "used to show that something is possible or allowed",
            "examples": [
               "I can swim very well.",
               "Can you come to the party?",
               "She can speak three languages fluently."
            ]
         },
         {
            "id": 12,
            "word": "care",
            "role": "verb",
            "BrE": "/keə(r)/",
            "AmE": "/ker/",
            "definition": "to feel interested in or concerned about something",
            "examples": [
               "I care about my family.",
               "She cares deeply about the environment.",
               "He doesn’t care about the new rules."
            ]
         },
         {
            "id": 12,
            "word": "careful",
            "role": "adjective",
            "BrE": "/ˈkeəfl/",
            "AmE": "/ˈkerfl/",
            "definition": "taking care to avoid mistakes or danger",
            "examples": [
               "Be careful with the knife.",
               "She was careful crossing the road.",
               "Careful planning led to success."
            ]
         },
         {
            "id": 12,
            "word": "carefully",
            "role": "adverb",
            "BrE": "/ˈkeəfəli/",
            "AmE": "/ˈkerfəli/",
            "definition": "in a way that shows care to avoid mistakes or danger",
            "examples": [
               "Drive carefully in the rain.",
               "She read the instructions carefully.",
               "He carefully checked his work."
            ]
         },
         {
            "id": 12,
            "word": "carpet",
            "role": "noun",
            "BrE": "/ˈkɑːpɪt/",
            "AmE": "/ˈkɑːrpɪt/",
            "definition": "a thick material used to cover floors",
            "examples": [
               "The carpet is soft and warm.",
               "We bought a new carpet for the room.",
               "The red carpet matched the curtains."
            ]
         },
         {
            "id": 12,
            "word": "cartoon",
            "role": "noun",
            "BrE": "/kɑːˈtuːn/",
            "AmE": "/kɑːrˈtuːn/",
            "definition": "a film or TV programme made by photographing a series of drawings",
            "examples": [
               "Kids love watching cartoons.",
               "The cartoon was funny and colorful.",
               "The cartoon series is popular worldwide."
            ]
         },
         {
            "id": 13,
            "word": "case",
            "role": "noun",
            "BrE": "/keɪs/",
            "AmE": "/keɪs/",
            "definition": "a particular situation or example of something",
            "examples": [
               "This is a special case.",
               "In this case, we need more time.",
               "In some cases, the rules don’t apply."
            ]
         },
         {
            "id": 13,
            "word": "cash",
            "role": "noun",
            "BrE": "/kæʃ/",
            "AmE": "/kæʃ/",
            "definition": "money in the form of coins or notes",
            "examples": [
               "I paid with cash.",
               "She carries cash in her wallet.",
               "The shop only accepts cash payments."
            ]
         },
         {
            "id": 13,
            "word": "castle",
            "role": "noun",
            "BrE": "/ˈkɑːsl/",
            "AmE": "/ˈkæsl/",
            "definition": "a large building with thick walls, often built in the past to protect people",
            "examples": [
               "The castle is very old.",
               "We visited a castle in Scotland.",
               "The castle was built in the 12th century."
            ]
         },
         {
            "id": 13,
            "word": "catch",
            "role": "verb",
            "BrE": "/kætʃ/",
            "AmE": "/kætʃ/",
            "definition": "to take hold of something that is moving through the air",
            "examples": [
               "Catch the ball!",
               "She caught the keys he threw.",
               "He caught a fish in the lake."
            ]
         },
         {
            "id": 13,
            "word": "cause",
            "role": "verb",
            "BrE": "/kɔːz/",
            "AmE": "/kɔːz/",
            "definition": "to make something happen",
            "examples": [
               "Rain caused the delay.",
               "His words caused her to cry.",
               "The storm caused damage to the house."
            ]
         },
         {
            "id": 13,
            "word": "celebrate",
            "role": "verb",
            "BrE": "/ˈselɪbreɪt/",
            "AmE": "/ˈselɪbreɪt/",
            "definition": "to do something enjoyable because of a special occasion",
            "examples": [
               "We celebrate Christmas every year.",
               "They celebrated their wedding anniversary.",
               "The team celebrated their victory."
            ]
         },
         {
            "id": 13,
            "word": "celebrity",
            "role": "noun",
            "BrE": "/səˈlebrəti/",
            "AmE": "/səˈlebrəti/",
            "definition": "a famous person, especially in entertainment or sport",
            "examples": [
               "She’s a celebrity on TV.",
               "The celebrity signed autographs for fans.",
               "Celebrities attended the film premiere."
            ]
         },
         {
            "id": 13,
            "word": "certain",
            "role": "adjective",
            "BrE": "/ˈsɜːtn/",
            "AmE": "/ˈsɜːrtn/",
            "definition": "completely sure; without doubt",
            "examples": [
               "I’m certain he’s coming.",
               "She’s certain about her decision.",
               "We’re certain the plan will work."
            ]
         },
         {
            "id": 13,
            "word": "certainly",
            "role": "adverb",
            "BrE": "/ˈsɜːtnli/",
            "AmE": "/ˈsɜːrtnli/",
            "definition": "without doubt; definitely",
            "examples": [
               "I’ll certainly help you.",
               "She certainly knows a lot.",
               "The event will certainly attract visitors."
            ]
         },
         {
            "id": 13,
            "word": "chance",
            "role": "noun",
            "BrE": "/tʃɑːns/",
            "AmE": "/tʃæns/",
            "definition": "an opportunity or possibility of something happening",
            "examples": [
               "Give me a chance to try.",
               "There’s a chance it might rain.",
               "He got a chance to meet the star."
            ]
         },
         {
            "id": 14,
            "word": "character",
            "role": "noun",
            "BrE": "/ˈkærəktə(r)/",
            "AmE": "/ˈkærəktər/",
            "definition": "a person in a story, film, or play",
            "examples": [
               "The book has funny characters.",
               "Her favourite character is the hero.",
               "The main character faces many challenges."
            ]
         },
         {
            "id": 14,
            "word": "charity",
            "role": "noun",
            "BrE": "/ˈtʃærəti/",
            "AmE": "/ˈtʃærəti/",
            "definition": "an organization that collects money to help people in need",
            "examples": [
               "She gave money to charity.",
               "The charity helps homeless people.",
               "They ran a race for charity."
            ]
         },
         {
            "id": 14,
            "word": "chat",
            "role": "verb",
            "BrE": "/tʃæt/",
            "AmE": "/tʃæt/",
            "definition": "to talk in a friendly, informal way",
            "examples": [
               "We chatted about the weather.",
               "She chatted with her friend online.",
               "They chatted happily during lunch."
            ]
         },
         {
            "id": 14,
            "word": "check",
            "role": "verb",
            "BrE": "/tʃek/",
            "AmE": "/tʃek/",
            "definition": "to examine something to see if it is correct or safe",
            "examples": [
               "Check your answers carefully.",
               "He checked the car’s oil level.",
               "Please check the list for errors."
            ]
         },
         {
            "id": 14,
            "word": "chef",
            "role": "noun",
            "BrE": "/ʃef/",
            "AmE": "/ʃef/",
            "definition": "a professional cook, especially the main cook in a restaurant",
            "examples": [
               "The chef cooked a great meal.",
               "She’s a chef at a famous restaurant.",
               "The chef created a new dessert."
            ]
         },
         {
            "id": 14,
            "word": "chemistry",
            "role": "noun",
            "BrE": "/ˈkemɪstri/",
            "AmE": "/ˈkemɪstri/",
            "definition": "the scientific study of substances and how they change",
            "examples": [
               "I study chemistry at school.",
               "Chemistry is a difficult subject.",
               "The chemistry experiment was exciting."
            ]
         },
         {
            "id": 14,
            "word": "chip",
            "role": "noun",
            "BrE": "/tʃɪp/",
            "AmE": "/tʃɪp/",
            "definition": "a thin piece of potato fried until crisp",
            "examples": [
               "I ate chips with my lunch.",
               "She bought a bag of chips.",
               "The chips were salty and crunchy."
            ]
         },
         {
            "id": 14,
            "word": "choice",
            "role": "noun",
            "BrE": "/tʃɔɪs/",
            "AmE": "/tʃɔɪs/",
            "definition": "the act of choosing between two or more possibilities",
            "examples": [
               "You have a choice of colors.",
               "Her choice of dress was perfect.",
               "Making the right choice was difficult."
            ]
         },
         {
            "id": 14,
            "word": "church",
            "role": "noun",
            "BrE": "/tʃɜːtʃ/",
            "AmE": "/tʃɜːrtʃ/",
            "definition": "a building where Christians go to pray",
            "examples": [
               "The church is very old.",
               "She goes to church every Sunday.",
               "The church has beautiful stained glass."
            ]
         },
         {
            "id": 14,
            "word": "cigarette",
            "role": "noun",
            "BrE": "/ˌsɪɡəˈret/",
            "AmE": "/ˈsɪɡəret/",
            "definition": "a small roll of tobacco wrapped in paper, used for smoking",
            "examples": [
               "He smoked a cigarette outside.",
               "Cigarettes are bad for health.",
               "She quit smoking cigarettes last year."
            ]
         },
         {
            "id": 15,
            "word": "circle",
            "role": "noun",
            "BrE": "/ˈsɜːkl/",
            "AmE": "/ˈsɜːrkl/",
            "definition": "a round shape",
            "examples": [
               "Draw a circle on the paper.",
               "The kids sat in a circle.",
               "The circle of friends was small."
            ]
         },
         {
            "id": 15,
            "word": "classical",
            "role": "adjective",
            "BrE": "/ˈklæsɪkl/",
            "AmE": "/ˈklæsɪkl/",
            "definition": "relating to music, art, or literature of a traditional and serious style",
            "examples": [
               "She loves classical music.",
               "The concert played classical pieces.",
               "Classical literature is studied in school."
            ]
         },
         {
            "id": 15,
            "word": "clear",
            "role": "adjective",
            "BrE": "/klɪə(r)/",
            "AmE": "/klɪr/",
            "definition": "easy to understand, see, or hear",
            "examples": [
               "Her voice is clear and loud.",
               "The instructions were clear enough.",
               "The water in the lake was clear."
            ]
         },
         {
            "id": 15,
            "word": "clearly",
            "role": "adverb",
            "BrE": "/ˈklɪəli/",
            "AmE": "/ˈklɪrli/",
            "definition": "in a way that is easy to see, hear, or understand",
            "examples": [
               "Speak clearly, please.",
               "She explained the problem clearly.",
               "The rules were clearly stated."
            ]
         },
         {
            "id": 15,
            "word": "clever",
            "role": "adjective",
            "BrE": "/ˈklevə(r)/",
            "AmE": "/ˈklevər/",
            "definition": "quick at learning and understanding things",
            "examples": [
               "He’s a clever student.",
               "Her clever idea saved time.",
               "The clever design won an award."
            ]
         },
         {
            "id": 15,
            "word": "climate",
            "role": "noun",
            "BrE": "/ˈklaɪmət/",
            "AmE": "/ˈklaɪmət/",
            "definition": "the typical weather conditions in a particular area",
            "examples": [
               "The climate here is warm.",
               "The climate affects farming.",
               "Climate change is a global issue."
            ]
         },
         {
            "id": 15,
            "word": "close",
            "role": "verb",
            "BrE": "/kləʊz/",
            "AmE": "/kloʊz/",
            "definition": "to shut something",
            "examples": [
               "Close the door, please.",
               "She closed her book and slept.",
               "He closed the shop early today."
            ]
         },
         {
            "id": 15,
            "word": "closed",
            "role": "adjective",
            "BrE": "/kləʊzd/",
            "AmE": "/kloʊzd/",
            "definition": "not open",
            "examples": [
               "The shop is closed now.",
               "The road was closed for repairs.",
               "Her eyes were closed during the song."
            ]
         },
         {
            "id": 15,
            "word": "clothing",
            "role": "noun",
            "BrE": "/ˈkləʊðɪŋ/",
            "AmE": "/ˈkloʊðɪŋ/",
            "definition": "the things that people wear to cover their body",
            "examples": [
               "She bought new clothing.",
               "The store sells winter clothing.",
               "His clothing was wet from rain."
            ]
         },
         {
            "id": 15,
            "word": "cloud",
            "role": "noun",
            "BrE": "/klaʊd/",
            "AmE": "/klaʊd/",
            "definition": "a white or grey mass in the sky that is made of tiny drops of water",
            "examples": [
               "The sky has many clouds.",
               "A cloud covered the sun.",
               "Dark clouds brought heavy rain."
            ]
         },
         {
            "id": 16,
            "word": "coach",
            "role": "noun",
            "BrE": "/kəʊtʃ/",
            "AmE": "/koʊtʃ/",
            "definition": "a person who trains a team or person in a sport",
            "examples": [
               "The coach helped the team win.",
               "She’s a great swimming coach.",
               "The coach gave advice to players."
            ]
         },
         {
            "id": 16,
            "word": "coast",
            "role": "noun",
            "BrE": "/kəʊst/",
            "AmE": "/koʊst/",
            "definition": "the land next to the sea",
            "examples": [
               "We walked along the coast.",
               "The coast has beautiful beaches.",
               "The town is on the south coast."
            ]
         },
         {
            "id": 16,
            "word": "code",
            "role": "noun",
            "BrE": "/kəʊd/",
            "AmE": "/koʊd/",
            "definition": "a system of words, numbers, or signs used to represent information",
            "examples": [
               "Enter the code to unlock it.",
               "The code was hard to crack.",
               "She learned a new computer code."
            ]
         },
         {
            "id": 16,
            "word": "colleague",
            "role": "noun",
            "BrE": "/ˈkɒliːɡ/",
            "AmE": "/ˈkɑːliːɡ/",
            "definition": "a person you work with",
            "examples": [
               "My colleague helped me today.",
               "She met her colleague for lunch.",
               "His colleagues respect his work."
            ]
         },
         {
            "id": 16,
            "word": "collect",
            "role": "verb",
            "BrE": "/kəˈlekt/",
            "AmE": "/kəˈlekt/",
            "definition": "to bring things together or gather them",
            "examples": [
               "I collect old coins.",
               "She collected shells on the beach.",
               "He collects data for his research."
            ]
         },
         {
            "id": 16,
            "word": "column",
            "role": "noun",
            "BrE": "/ˈkɒləm/",
            "AmE": "/ˈkɑːləm/",
            "definition": "a tall, vertical post, or a section of writing in a newspaper",
            "examples": [
               "The column supports the roof.",
               "She writes a column for the paper.",
               "The temple has marble columns."
            ]
         },
         {
            "id": 16,
            "word": "comedy",
            "role": "noun",
            "BrE": "/ˈkɒmədi/",
            "AmE": "/ˈkɑːmədi/",
            "definition": "a play, film, or programme that makes people laugh",
            "examples": [
               "I watched a funny comedy.",
               "The comedy show was hilarious.",
               "Her favourite comedy is on TV tonight."
            ]
         },
         {
            "id": 16,
            "word": "comfortable",
            "role": "adjective",
            "BrE": "/ˈkʌmftəbl/",
            "AmE": "/ˈkʌmfərtəbl/",
            "definition": "feeling physically relaxed and at ease",
            "examples": [
               "This chair is very comfortable.",
               "She felt comfortable in her new home.",
               "The comfortable bed helped her sleep."
            ]
         },
         {
            "id": 16,
            "word": "comment",
            "role": "noun",
            "BrE": "/ˈkɒment/",
            "AmE": "/ˈkɑːment/",
            "definition": "something you say or write that gives your opinion",
            "examples": [
               "He made a funny comment.",
               "Her comment about the food was kind.",
               "The teacher wrote comments on my essay."
            ]
         },
         {
            "id": 16,
            "word": "communicate",
            "role": "verb",
            "BrE": "/kəˈmjuːnɪkeɪt/",
            "AmE": "/kəˈmjuːnɪkeɪt/",
            "definition": "to exchange information or ideas with someone, usually by speaking or writing",
            "examples": [
               "We communicate by phone.",
               "She communicates well with her team.",
               "They communicate through emails daily."
            ]
         },
         {
            "id": 17,
            "word": "community",
            "role": "noun",
            "BrE": "/kəˈmjuːnəti/",
            "AmE": "/kəˈmjuːnəti/",
            "definition": "a group of people who live in the same area or share interests",
            "examples": [
               "Our community is very friendly.",
               "The community helped build the park.",
               "She’s active in the local community."
            ]
         },
         {
            "id": 17,
            "word": "compete",
            "role": "verb",
            "BrE": "/kəmˈpiːt/",
            "AmE": "/kəmˈpiːt/",
            "definition": "to try to win something by being better than others",
            "examples": [
               "They compete in sports.",
               "She competed in a race yesterday.",
               "Teams compete for the championship."
            ]
         },
         {
            "id": 17,
            "word": "competition",
            "role": "noun",
            "BrE": "/ˌkɒmpəˈtɪʃn/",
            "AmE": "/ˌkɑːmpəˈtɪʃn/",
            "definition": "an event in which people try to win by being the best",
            "examples": [
               "The competition was fun.",
               "He won the singing competition.",
               "The competition attracted many participants."
            ]
         },
         {
            "id": 17,
            "word": "complain",
            "role": "verb",
            "BrE": "/kəmˈpleɪn/",
            "AmE": "/kəmˈpleɪn/",
            "definition": "to say that you are unhappy or not satisfied with something",
            "examples": [
               "She complained about the food.",
               "He complained to the manager.",
               "They complained about the noisy neighbors."
            ]
         },
         {
            "id": 17,
            "word": "completely",
            "role": "adverb",
            "BrE": "/kəmˈpliːtli/",
            "AmE": "/kəmˈpliːtli/",
            "definition": "in every way; totally",
            "examples": [
               "I’m completely tired.",
               "The room was completely empty.",
               "She completely forgot the meeting."
            ]
         },
         {
            "id": 17,
            "word": "condition",
            "role": "noun",
            "BrE": "/kənˈdɪʃn/",
            "AmE": "/kənˈdɪʃn/",
            "definition": "the state that something is in",
            "examples": [
               "The car is in good condition.",
               "His health condition is improving.",
               "The house was in poor condition."
            ]
         },
         {
            "id": 17,
            "word": "conference",
            "role": "noun",
            "BrE": "/ˈkɒnfərəns/",
            "AmE": "/ˈkɑːnfərəns/",
            "definition": "a large meeting where people discuss ideas or work",
            "examples": [
               "She went to a conference.",
               "The conference was about science.",
               "Experts spoke at the annual conference."
            ]
         },
         {
            "id": 17,
            "word": "connect",
            "role": "verb",
            "BrE": "/kəˈnekt/",
            "AmE": "/kəˈnekt/",
            "definition": "to join two things or places together",
            "examples": [
               "Connect the cables now.",
               "This road connects two towns.",
               "The app connects users worldwide."
            ]
         },
         {
            "id": 17,
            "word": "connected",
            "role": "adjective",
            "BrE": "/kəˈnektɪd/",
            "AmE": "/kəˈnektɪd/",
            "definition": "joined or linked to something",
            "examples": [
               "The towns are connected.",
               "My phone is connected to Wi-Fi.",
               "The cities are connected by trains."
            ]
         },
         {
            "id": 17,
            "word": "consider",
            "role": "verb",
            "BrE": "/kənˈsɪdə(r)/",
            "AmE": "/kənˈsɪdər/",
            "definition": "to think about something carefully before deciding",
            "examples": [
               "I’ll consider your idea.",
               "She considered moving to a new city.",
               "He considered all options before choosing."
            ]
         },
         {
            "id": 18,
            "word": "contain",
            "role": "verb",
            "BrE": "/kənˈteɪn/",
            "AmE": "/kənˈteɪn/",
            "definition": "to have something inside or as part of it",
            "examples": [
               "This box contains books.",
               "The drink contains sugar.",
               "The report contains useful information."
            ]
         },
         {
            "id": 18,
            "word": "context",
            "role": "noun",
            "BrE": "/ˈkɒntekst/",
            "AmE": "/ˈkɑːntekst/",
            "definition": "the situation in which something happens",
            "examples": [
               "The word depends on context.",
               "She explained it in context.",
               "Understanding the context helps learning."
            ]
         },
         {
            "id": 18,
            "word": "continent",
            "role": "noun",
            "BrE": "/ˈkɒntɪnənt/",
            "AmE": "/ˈkɑːntɪnənt/",
            "definition": "one of the large land masses of the Earth, such as Africa or Asia",
            "examples": [
               "Africa is a continent.",
               "He travelled across the continent.",
               "The continent of Europe is diverse."
            ]
         },
         {
            "id": 18,
            "word": "continue",
            "role": "verb",
            "BrE": "/kənˈtɪnjuː/",
            "AmE": "/kənˈtɪnjuː/",
            "definition": "to keep doing something without stopping",
            "examples": [
               "Continue writing, please.",
               "She continued her studies abroad.",
               "The rain continued all afternoon."
            ]
         },
         {
            "id": 18,
            "word": "control",
            "role": "verb",
            "BrE": "/kənˈtrəʊl/",
            "AmE": "/kənˈtroʊl/",
            "definition": "to have power over something or to manage it",
            "examples": [
               "She controls her anger well.",
               "He controls the company’s budget.",
               "They tried to control the fire."
            ]
         },
         {
            "id": 18,
            "word": "cook",
            "role": "verb",
            "BrE": "/kʊk/",
            "AmE": "/kʊk/",
            "definition": "to prepare food by heating it",
            "examples": [
               "I cook dinner every night.",
               "She cooked a delicious meal.",
               "He’s learning to cook Italian food."
            ]
         },
         {
            "id": 18,
            "word": "cooker",
            "role": "noun",
            "BrE": "/ˈkʊkə(r)/",
            "AmE": "/ˈkʊkər/",
            "definition": "a machine used for cooking food",
            "examples": [
               "The cooker is in the kitchen.",
               "She bought a new electric cooker.",
               "The cooker broke down yesterday."
            ]
         },
         {
            "id": 18,
            "word": "copy",
            "role": "noun",
            "BrE": "/ˈkɒpi/",
            "AmE": "/ˈkɑːpi/",
            "definition": "something that is made to be the same as another thing",
            "examples": [
               "I need a copy of this book.",
               "She made a copy of the letter.",
               "He kept a copy of the contract."
            ]
         },
         {
            "id": 18,
            "word": "corner",
            "role": "noun",
            "BrE": "/ˈkɔːnə(r)/",
            "AmE": "/ˈkɔːrnər/",
            "definition": "a place where two lines, roads, or edges meet",
            "examples": [
               "The shop is on the corner.",
               "Turn left at the corner.",
               "The table stood in the corner."
            ]
         },
         {
            "id": 18,
            "word": "correctly",
            "role": "adverb",
            "BrE": "/kəˈrektli/",
            "AmE": "/kəˈrektli/",
            "definition": "in a way that is right or accurate",
            "examples": [
               "She answered correctly.",
               "He spelled the word correctly.",
               "Follow the instructions correctly."
            ]
         },
         {
            "id": 19,
            "word": "count",
            "role": "verb",
            "BrE": "/kaʊnt/",
            "AmE": "/kaʊnt/",
            "definition": "to calculate the total number of things or people",
            "examples": [
               "Count the books on the shelf.",
               "She counted the money carefully.",
               "They counted the votes after the election."
            ]
         },
         {
            "id": 19,
            "word": "couple",
            "role": "noun",
            "BrE": "/ˈkʌpl/",
            "AmE": "/ˈkʌpl/",
            "definition": "two people who are married or in a relationship",
            "examples": [
               "The couple danced together.",
               "A young couple moved next door.",
               "The couple celebrated their anniversary."
            ]
         },
         {
            "id": 19,
            "word": "cover",
            "role": "verb",
            "BrE": "/ˈkʌvə(r)/",
            "AmE": "/ˈkʌvər/",
            "definition": "to put something over or on top of something else",
            "examples": [
               "Cover the food with a plate.",
               "She covered the table with a cloth.",
               "Snow covered the ground completely."
            ]
         },
         {
            "id": 19,
            "word": "crazy",
            "role": "adjective",
            "BrE": "/ˈkreɪzi/",
            "AmE": "/ˈkreɪzi/",
            "definition": "very strange or not sensible",
            "examples": [
               "That’s a crazy idea!",
               "He has a crazy sense of humor.",
               "Her crazy plan actually worked."
            ]
         },
         {
            "id": 19,
            "word": "creative",
            "role": "adjective",
            "BrE": "/kriˈeɪtɪv/",
            "AmE": "/kriˈeɪtɪv/",
            "definition": "able to produce new ideas or things",
            "examples": [
               "She’s a creative artist.",
               "His creative writing is excellent.",
               "The team found a creative solution."
            ]
         },
         {
            "id": 19,
            "word": "credit",
            "role": "noun",
            "BrE": "/ˈkredɪt/",
            "AmE": "/ˈkredɪt/",
            "definition": "a way of buying something now and paying for it later",
            "examples": [
               "I used credit to buy a phone.",
               "She has a credit card.",
               "The store offers credit to customers."
            ]
         },
         {
            "id": 19,
            "word": "crime",
            "role": "noun",
            "BrE": "/kraɪm/",
            "AmE": "/kraɪm/",
            "definition": "an act that breaks the law",
            "examples": [
               "Stealing is a crime.",
               "Crime is a problem in the city.",
               "The police are fighting crime."
            ]
         },
         {
            "id": 19,
            "word": "criminal",
            "role": "noun",
            "BrE": "/ˈkrɪmɪnl/",
            "AmE": "/ˈkrɪmɪnl/",
            "definition": "a person who has committed a crime",
            "examples": [
               "The criminal was caught.",
               "He’s a dangerous criminal.",
               "The police arrested the criminal."
            ]
         },
         {
            "id": 19,
            "word": "cross",
            "role": "verb",
            "BrE": "/krɒs/",
            "AmE": "/krɔːs/",
            "definition": "to go from one side of something to the other",
            "examples": [
               "Cross the street carefully.",
               "She crossed the bridge to the park.",
               "They crossed the river by boat."
            ]
         },
         {
            "id": 19,
            "word": "crowd",
            "role": "noun",
            "BrE": "/kraʊd/",
            "AmE": "/kraʊd/",
            "definition": "a large group of people in one place",
            "examples": [
               "A crowd watched the game.",
               "The crowd cheered loudly.",
               "The crowd gathered for the concert."
            ]
         },
         {
            "id": 20,
            "word": "crowded",
            "role": "adjective",
            "BrE": "/ˈkraʊdɪd/",
            "AmE": "/ˈkraʊdɪd/",
            "definition": "full of people",
            "examples": [
               "The bus was crowded.",
               "The crowded market was noisy.",
               "The room was too crowded to move."
            ]
         },
         {
            "id": 20,
            "word": "cry",
            "role": "verb",
            "BrE": "/kraɪ/",
            "AmE": "/kraɪ/",
            "definition": "to produce tears from your eyes, usually because you are sad",
            "examples": [
               "The baby cried loudly.",
               "She cried when she heard the news.",
               "He cried during the sad movie."
            ]
         },
         {
            "id": 20,
            "word": "cupboard",
            "role": "noun",
            "BrE": "/ˈkʌbəd/",
            "AmE": "/ˈkʌbərd/",
            "definition": "a piece of furniture or a small space used for storing things",
            "examples": [
               "The plates are in the cupboard.",
               "She opened the kitchen cupboard.",
               "The cupboard was full of clothes."
            ]
         },
         {
            "id": 20,
            "word": "curly",
            "role": "adjective",
            "BrE": "/ˈkɜːli/",
            "AmE": "/ˈkɜːrli/",
            "definition": "having curls or a curved shape",
            "examples": [
               "She has curly hair.",
               "His curly hair is hard to manage.",
               "The plant has curly leaves."
            ]
         },
         {
            "id": 20,
            "word": "cycle",
            "role": "verb",
            "BrE": "/ˈsaɪkl/",
            "AmE": "/ˈsaɪkl/",
            "definition": "to ride a bicycle",
            "examples": [
               "I cycle to school.",
               "She cycled through the park.",
               "They cycle to stay healthy."
            ]
         },
         {
            "id": 20,
            "word": "daily",
            "role": "adjective",
            "BrE": "/ˈdeɪli/",
            "AmE": "/ˈdeɪli/",
            "definition": "happening or done every day",
            "examples": [
               "I read the daily news.",
               "She has a daily exercise routine.",
               "The daily meetings are tiring."
            ]
         },
         {
            "id": 20,
            "word": "danger",
            "role": "noun",
            "BrE": "/ˈdeɪndʒə(r)/",
            "AmE": "/ˈdeɪndʒər/",
            "definition": "the possibility of something bad happening",
            "examples": [
               "The sign warned of danger.",
               "There’s danger in crossing here.",
               "The danger of fire was high."
            ]
         },
         {
            "id": 20,
            "word": "dark",
            "role": "adjective",
            "BrE": "/dɑːk/",
            "AmE": "/dɑːrk/",
            "definition": "having little or no light",
            "examples": [
               "The room was dark.",
               "It’s getting dark outside.",
               "The dark forest was scary."
            ]
         },
         {
            "id": 20,
            "word": "data",
            "role": "noun",
            "BrE": "/ˈdeɪtə/",
            "AmE": "/ˈdeɪtə/",
            "definition": "facts or information used for making decisions",
            "examples": [
               "The data shows sales increased.",
               "She analyzed the data carefully.",
               "We need more data for the report."
            ]
         },
         {
            "id": 20,
            "word": "dead",
            "role": "adjective",
            "BrE": "/ded/",
            "AmE": "/ded/",
            "definition": "no longer alive",
            "examples": [
               "The plant is dead.",
               "They found a dead bird.",
               "The dead tree was removed."
            ]
         },
            {
            "id": 21,
            "word": "deal",
            "role": "noun",
            "BrE": "/diːl/",
            "AmE": "/diːl/",
            "definition": "an agreement, especially in business, on particular conditions",
            "examples": [
               "We made a deal to share.",
               "The deal saved us money.",
               "They signed a deal with the company."
            ]
         },
         {
            "id": 21,
            "word": "dear",
            "role": "adjective",
            "BrE": "/dɪə(r)/",
            "AmE": "/dɪr/",
            "definition": "loved or valued very much",
            "examples": [
               "She’s my dear friend.",
               "His dear dog ran away.",
               "Her dear memories made her smile."
            ]
         },
         {
            "id": 21,
            "word": "death",
            "role": "noun",
            "BrE": "/deθ/",
            "AmE": "/deθ/",
            "definition": "the end of life",
            "examples": [
               "The death of the tree was sad.",
               "His death shocked everyone.",
               "The death rate decreased this year."
            ]
         },
         {
            "id": 21,
            "word": "decision",
            "role": "noun",
            "BrE": "/dɪˈsɪʒn/",
            "AmE": "/dɪˈsɪʒn/",
            "definition": "a choice you make after thinking",
            "examples": [
               "I made a decision to stay.",
               "Her decision was to study abroad.",
               "The decision affected the whole team."
            ]
         },
         {
            "id": 21,
            "word": "deep",
            "role": "adjective",
            "BrE": "/diːp/",
            "AmE": "/diːp/",
            "definition": "going far down from the surface",
            "examples": [
               "The water is deep here.",
               "She took a deep breath.",
               "The deep ocean is full of life."
            ]
         },
         {
            "id": 21,
            "word": "definitely",
            "role": "adverb",
            "BrE": "/ˈdefɪnətli/",
            "AmE": "/ˈdefɪnətli/",
            "definition": "without any doubt; certainly",
            "examples": [
               "I’ll definitely come tomorrow.",
               "She definitely knows the answer.",
               "The plan will definitely succeed."
            ]
         },
         {
            "id": 21,
            "word": "degree",
            "role": "noun",
            "BrE": "/dɪˈɡriː/",
            "AmE": "/dɪˈɡriː/",
            "definition": "a qualification given for completing a university course",
            "examples": [
               "She has a degree in biology.",
               "He earned a degree last year.",
               "Her degree opened new job opportunities."
            ]
         },
         {
            "id": 21,
            "word": "dentist",
            "role": "noun",
            "BrE": "/ˈdentɪst/",
            "AmE": "/ˈdentɪst/",
            "definition": "a person whose job is to treat teeth",
            "examples": [
               "I visit the dentist yearly.",
               "The dentist fixed her tooth.",
               "The dentist recommended brushing twice daily."
            ]
         },
         {
            "id": 21,
            "word": "department",
            "role": "noun",
            "BrE": "/dɪˈpɑːtmənt/",
            "AmE": "/dɪˈpɑːrtmənt/",
            "definition": "a section of a large organization, such as a company or university",
            "examples": [
               "She works in the sales department.",
               "The department organized a meeting.",
               "The history department is very popular."
            ]
         },
         {
            "id": 21,
            "word": "depend",
            "role": "verb",
            "BrE": "/dɪˈpend/",
            "AmE": "/dɪˈpend/",
            "definition": "to rely on someone or something",
            "examples": [
               "I depend on my parents.",
               "The plan depends on the weather.",
               "Her success depends on hard work."
            ]
         },
         {
            "id": 22,
            "word": "desert",
            "role": "noun",
            "BrE": "/ˈdezət/",
            "AmE": "/ˈdezərt/",
            "definition": "a large area of land with little water and few plants",
            "examples": [
               "The desert is very hot.",
               "Camels live in the desert.",
               "The Sahara Desert is vast."
            ]
         },
         {
            "id": 22,
            "word": "designer",
            "role": "noun",
            "BrE": "/dɪˈzaɪnə(r)/",
            "AmE": "/dɪˈzaɪnər/",
            "definition": "a person who plans how something will look",
            "examples": [
               "She’s a fashion designer.",
               "The designer created a new logo.",
               "A famous designer made her dress."
            ]
         },
         {
            "id": 22,
            "word": "destroy",
            "role": "verb",
            "BrE": "/dɪˈstrɔɪ/",
            "AmE": "/dɪˈstrɔɪ/",
            "definition": "to damage something so badly that it cannot be used",
            "examples": [
               "The fire destroyed the house.",
               "They destroyed the old bridge.",
               "The storm destroyed many crops."
            ]
         },
         {
            "id": 22,
            "word": "detective",
            "role": "noun",
            "BrE": "/dɪˈtektɪv/",
            "AmE": "/dɪˈtektɪv/",
            "definition": "a person, often a police officer, who investigates crimes",
            "examples": [
               "The detective solved the case.",
               "She reads detective stories.",
               "The detective found new clues."
            ]
         },
         {
            "id": 22,
            "word": "develop",
            "role": "verb",
            "BrE": "/dɪˈveləp/",
            "AmE": "/dɪˈveləp/",
            "definition": "to grow or change into a more advanced form",
            "examples": [
               "The baby is developing fast.",
               "She developed new skills.",
               "The company developed a new product."
            ]
         },
         {
            "id": 22,
            "word": "device",
            "role": "noun",
            "BrE": "/dɪˈvaɪs/",
            "AmE": "/dɪˈvaɪs/",
            "definition": "a tool or piece of equipment made for a particular purpose",
            "examples": [
               "This device saves energy.",
               "Her device tracks steps daily.",
               "The new device improves safety."
            ]
         },
         {
            "id": 22,
            "word": "diary",
            "role": "noun",
            "BrE": "/ˈdaɪəri/",
            "AmE": "/ˈdaɪəri/",
            "definition": "a book where you write about your life or plans",
            "examples": [
               "I write in my diary daily.",
               "Her diary is full of secrets.",
               "The diary helped her plan tasks."
            ]
         },
         {
            "id": 22,
            "word": "differently",
            "role": "adverb",
            "BrE": "/ˈdɪfrəntli/",
            "AmE": "/ˈdɪfrəntli/",
            "definition": "in a way that is not the same",
            "examples": [
               "She thinks differently.",
               "He dresses differently from others.",
               "They solved the problem differently."
            ]
         },
         {
            "id": 22,
            "word": "digital",
            "role": "adjective",
            "BrE": "/ˈdɪdʒɪtl/",
            "AmE": "/ˈdɪdʒɪtl/",
            "definition": "using electronic technology to store or show information",
            "examples": [
               "I have a digital watch.",
               "The digital camera takes great photos.",
               "Digital books are popular now."
            ]
         },
         {
            "id": 22,
            "word": "direct",
            "role": "adjective",
            "BrE": "/dɪˈrekt/",
            "AmE": "/dɪˈrekt/",
            "definition": "going straight from one place to another without stopping",
            "examples": [
               "Take the direct route.",
               "She booked a direct flight.",
               "The direct train saves time."
            ]
         },
         {
            "id": 23,
            "word": "direction",
            "role": "noun",
            "BrE": "/dɪˈrekʃn/",
            "AmE": "/dɪˈrekʃn/",
            "definition": "the way something or someone moves or faces",
            "examples": [
               "Which direction is the park?",
               "Follow the direction of the arrow.",
               "The wind changed direction suddenly."
            ]
         },
         {
            "id": 23,
            "word": "director",
            "role": "noun",
            "BrE": "/dɪˈrektə(r)/",
            "AmE": "/dɪˈrektər/",
            "definition": "a person who manages a company or an important activity",
            "examples": [
               "He’s the director of the school.",
               "The director led the project.",
               "She’s a film director."
            ]
         },
         {
            "id": 23,
            "word": "disagree",
            "role": "verb",
            "BrE": "/ˌdɪsəˈɡriː/",
            "AmE": "/ˌdɪsəˈɡriː/",
            "definition": "to have a different opinion from someone else",
            "examples": [
               "I disagree with you.",
               "They disagreed about the plan.",
               "She disagrees with her boss often."
            ]
         },
         {
            "id": 23,
            "word": "disappear",
            "role": "verb",
            "BrE": "/ˌdɪsəˈpɪə(r)/",
            "AmE": "/ˌdɪsəˈpɪr/",
            "definition": "to become impossible to see or find",
            "examples": [
               "The cat disappeared suddenly.",
               "Her keys disappeared from the table.",
               "The fog disappeared by noon."
            ]
         },
         {
            "id": 23,
            "word": "disaster",
            "role": "noun",
            "BrE": "/dɪˈzɑːstə(r)/",
            "AmE": "/dɪˈzæstər/",
            "definition": "a very bad event that causes harm or damage",
            "examples": [
               "The flood was a disaster.",
               "The disaster affected many people.",
               "It was a disaster for the team."
            ]
         },
         {
            "id": 23,
            "word": "discover",
            "role": "verb",
            "BrE": "/dɪˈskʌvə(r)/",
            "AmE": "/dɪˈskʌvər/",
            "definition": "to find or learn something new",
            "examples": [
               "I discovered a new park.",
               "She discovered a great book.",
               "Scientists discovered a new species."
            ]
         },
         {
            "id": 23,
            "word": "discovery",
            "role": "noun",
            "BrE": "/dɪˈskʌvəri/",
            "AmE": "/dɪˈskʌvəri/",
            "definition": "the act of finding or learning something new",
            "examples": [
               "The discovery was exciting.",
               "Her discovery changed science.",
               "The discovery of gold caused a rush."
            ]
         },
         {
            "id": 23,
            "word": "discussion",
            "role": "noun",
            "BrE": "/dɪˈskʌʃn/",
            "AmE": "/dɪˈskʌʃn/",
            "definition": "the act of talking about something with others",
            "examples": [
               "We had a discussion about school.",
               "The discussion was very useful.",
               "The team held a long discussion."
            ]
         },
         {
            "id": 23,
            "word": "disease",
            "role": "noun",
            "BrE": "/dɪˈziːz/",
            "AmE": "/dɪˈziːz/",
            "definition": "an illness affecting humans, animals, or plants",
            "examples": [
               "The disease made her weak.",
               "This disease spreads quickly.",
               "Doctors are studying the disease."
            ]
         },
         {
            "id": 23,
            "word": "distance",
            "role": "noun",
            "BrE": "/ˈdɪstəns/",
            "AmE": "/ˈdɪstəns/",
            "definition": "the amount of space between two places",
            "examples": [
               "The distance to school is short.",
               "She ran a long distance.",
               "The distance between cities is 200 miles."
            ]
         },
         {
            "id": 24,
            "word": "divorced",
            "role": "adjective",
            "BrE": "/dɪˈvɔːst/",
            "AmE": "/dɪˈvɔːrst/",
            "definition": "no longer married",
            "examples": [
               "Her parents are divorced.",
               "He’s a divorced father of two.",
               "The divorced couple remained friends."
            ]
         },
         {
            "id": 24,
            "word": "document",
            "role": "noun",
            "BrE": "/ˈdɒkjumənt/",
            "AmE": "/ˈdɑːkjumənt/",
            "definition": "an official paper or file with information",
            "examples": [
               "I signed the document.",
               "The document is on my desk.",
               "She submitted an important document."
            ]
         },
         {
            "id": 24,
            "word": "double",
            "role": "adjective",
            "BrE": "/ˈdʌbl/",
            "AmE": "/ˈdʌbl/",
            "definition": "twice as much or as many",
            "examples": [
               "I want a double coffee.",
               "The room has a double bed.",
               "Her salary doubled this year."
            ]
         },
         {
            "id": 24,
            "word": "download",
            "role": "verb",
            "BrE": "/ˌdaʊnˈləʊd/",
            "AmE": "/ˌdaʊnˈloʊd/",
            "definition": "to copy or move data from the internet to a device",
            "examples": [
               "I download music often.",
               "She downloaded a new app.",
               "He downloaded the file quickly."
            ]
         },
         {
            "id": 24,
            "word": "downstairs",
            "role": "adverb",
            "BrE": "/ˌdaʊnˈsteəz/",
            "AmE": "/ˌdaʊnˈsterz/",
            "definition": "to or on a lower floor of a building",
            "examples": [
               "She went downstairs to eat.",
               "The kitchen is downstairs.",
               "He ran downstairs to answer the door."
            ]
         },
         {
            "id": 24,
            "word": "drama",
            "role": "noun",
            "BrE": "/ˈdrɑːmə/",
            "AmE": "/ˈdrɑːmə/",
            "definition": "a play for the theatre, radio, or television",
            "examples": [
               "I watched a drama on TV.",
               "The drama was very exciting.",
               "She stars in a new drama series."
            ]
         },
         {
            "id": 24,
            "word": "drawing",
            "role": "noun",
            "BrE": "/ˈdrɔːɪŋ/",
            "AmE": "/ˈdrɔːɪŋ/",
            "definition": "a picture or diagram made with a pencil or pen",
            "examples": [
               "Her drawing is beautiful.",
               "He made a drawing of a tree.",
               "The drawing showed the house plan."
            ]
         },
         {
            "id": 24,
            "word": "dream",
            "role": "noun",
            "BrE": "/driːm/",
            "AmE": "/driːm/",
            "definition": "a series of thoughts or images that happen in your mind when you sleep",
            "examples": [
               "I had a strange dream.",
               "Her dream was about flying.",
               "The dream felt very real."
            ]
         },
         {
            "id": 24,
            "word": "drive",
            "role": "verb",
            "BrE": "/draɪv/",
            "AmE": "/draɪv/",
            "definition": "to control a vehicle such as a car",
            "examples": [
               "I drive to work daily.",
               "She drives a fast car.",
               "He learned to drive last year."
            ]
         },
         {
            "id": 24,
            "word": "driving",
            "role": "noun",
            "BrE": "/ˈdraɪvɪŋ/",
            "AmE": "/ˈdraɪvɪŋ/",
            "definition": "the act of controlling a vehicle",
            "examples": [
               "Driving is fun for her.",
               "Safe driving saves lives.",
               "His driving improved with practice."
            ]
         },
         {
            "id": 25,
            "word": "drop",
            "role": "verb",
            "BrE": "/drɒp/",
            "AmE": "/drɑːp/",
            "definition": "to fall or let something fall",
            "examples": [
               "The glass dropped and broke.",
               "She dropped her book on the floor.",
               "The temperature dropped suddenly."
            ]
         },
         {
            "id": 25,
            "word": "drug",
            "role": "noun",
            "BrE": "/drʌɡ/",
            "AmE": "/drʌɡ/",
            "definition": "a medicine or substance used to treat an illness",
            "examples": [
               "The drug helped her pain.",
               "This drug treats colds.",
               "Doctors prescribed a new drug."
            ]
         },
         {
            "id": 25,
            "word": "dry",
            "role": "adjective",
            "BrE": "/draɪ/",
            "AmE": "/draɪ/",
            "definition": "having no water or other liquid",
            "examples": [
               "My clothes are dry now.",
               "The desert is very dry.",
               "Her dry skin needed cream."
            ]
         },
         {
            "id": 25,
            "word": "earn",
            "role": "verb",
            "BrE": "/ɜːn/",
            "AmE": "/ɜːrn/",
            "definition": "to receive money for work that you do",
            "examples": [
               "She earns a good salary.",
               "He earns money by teaching.",
               "They earn extra by working weekends."
            ]
         },
         {
            "id": 25,
            "word": "earth",
            "role": "noun",
            "BrE": "/ɜːθ/",
            "AmE": "/ɜːrθ/",
            "definition": "the planet we live on",
            "examples": [
               "The Earth is round.",
               "We must protect the Earth.",
               "Life on Earth is diverse."
            ]
         },
         {
            "id": 25,
            "word": "easily",
            "role": "adverb",
            "BrE": "/ˈiːzɪli/",
            "AmE": "/ˈiːzɪli/",
            "definition": "without difficulty",
            "examples": [
               "She learns easily.",
               "He won the game easily.",
               "The problem was solved easily."
            ]
         },
         {
            "id": 25,
            "word": "education",
            "role": "noun",
            "BrE": "/ˌedʒuˈkeɪʃn/",
            "AmE": "/ˌedʒuˈkeɪʃn/",
            "definition": "the process of teaching and learning, usually in a school",
            "examples": [
               "Education is important for all.",
               "She studies education at university.",
               "Good education leads to better jobs."
            ]
         },
         {
            "id": 25,
            "word": "effect",
            "role": "noun",
            "BrE": "/ɪˈfekt/",
            "AmE": "/ɪˈfekt/",
            "definition": "a change that happens because of something",
            "examples": [
               "The medicine had an effect.",
               "Her speech had a big effect.",
               "The effect of the law was clear."
            ]
         },
         {
            "id": 25,
            "word": "either",
            "role": "determiner",
            "BrE": "/ˈaɪðə(r)/",
            "AmE": "/ˈiːðər/",
            "definition": "one or the other of two things or people",
            "examples": [
               "Choose either book.",
               "Either path leads to the park.",
               "You can sit on either side."
            ]
         },
         {
            "id": 25,
            "word": "electric",
            "role": "adjective",
            "BrE": "/ɪˈlektrɪk/",
            "AmE": "/ɪˈlektrɪk/",
            "definition": "using or producing electricity",
            "examples": [
               "I have an electric car.",
               "The electric light is bright.",
               "Electric power saves energy."
            ]
         },
         {
            "id": 26,
            "word": "electrical",
            "role": "adjective",
            "BrE": "/ɪˈlektrɪkl/",
            "AmE": "/ɪˈlektrɪkl/",
            "definition": "relating to electricity",
            "examples": [
               "The electrical system broke.",
               "He fixed the electrical wires.",
               "Electrical faults caused the blackout."
            ]
         },
         {
            "id": 26,
            "word": "electricity",
            "role": "noun",
            "BrE": "/ɪˌlekˈtrɪsəti/",
            "AmE": "/ɪˌlekˈtrɪsəti/",
            "definition": "a form of energy used for power or light",
            "examples": [
               "Electricity powers our home.",
               "The storm cut the electricity.",
               "Electricity bills are high."
            ]
         },
         {
            "id": 26,
            "word": "electronic",
            "role": "adjective",
            "BrE": "/ɪˌlekˈtrɒnɪk/",
            "AmE": "/ɪˌlekˈtrɑːnɪk/",
            "definition": "using electronic devices or technology",
            "examples": [
               "I use an electronic dictionary.",
               "Electronic games are fun.",
               "The electronic system failed."
            ]
         },
         {
            "id": 26,
            "word": "employ",
            "role": "verb",
            "BrE": "/ɪmˈplɔɪ/",
            "AmE": "/ɪmˈplɔɪ/",
            "definition": "to give someone a job",
            "examples": [
               "They employ ten workers.",
               "She was employed as a teacher.",
               "The company employs many engineers."
            ]
         },
         {
            "id": 26,
            "word": "employee",
            "role": "noun",
            "BrE": "/ɪmˈplɔɪiː/",
            "AmE": "/ɪmˈplɔɪiː/",
            "definition": "a person who works for someone else",
            "examples": [
               "He’s a new employee.",
               "The employee works hard.",
               "Employees received a bonus."
            ]
         },
         {
            "id": 26,
            "word": "employer",
            "role": "noun",
            "BrE": "/ɪmˈplɔɪə(r)/",
            "AmE": "/ɪmˈplɔɪər/",
            "definition": "a person or company that pays people to work for them",
            "examples": [
               "Her employer is kind.",
               "The employer offered a raise.",
               "The employer hired new staff."
            ]
         },
         {
            "id": 26,
            "word": "empty",
            "role": "adjective",
            "BrE": "/ˈempti/",
            "AmE": "/ˈempti/",
            "definition": "having nothing inside",
            "examples": [
               "The bottle is empty.",
               "The room was completely empty.",
               "The empty box was thrown away."
            ]
         },
         {
            "id": 26,
            "word": "ending",
            "role": "noun",
            "BrE": "/ˈendɪŋ/",
            "AmE": "/ˈendɪŋ/",
            "definition": "the way a story, film, or event finishes",
            "examples": [
               "The movie has a happy ending.",
               "The book’s ending was surprising.",
               "The ending of the play was sad."
            ]
         },
         {
            "id": 26,
            "word": "energy",
            "role": "noun",
            "BrE": "/ˈenədʒi/",
            "AmE": "/ˈenərdʒi/",
            "definition": "the power or ability to be active",
            "examples": [
               "Kids have a lot of energy.",
               "She has energy to run daily.",
               "We need energy to finish this."
            ]
         },
         {
            "id": 26,
            "word": "engine",
            "role": "noun",
            "BrE": "/ˈendʒɪn/",
            "AmE": "/ˈendʒɪn/",
            "definition": "a machine that produces power to make something move",
            "examples": [
               "The car’s engine is loud.",
               "The engine stopped working.",
               "The boat has a powerful engine."
            ]
         },
         {
            "id": 27,
            "word": "engineer",
            "role": "noun",
            "BrE": "/ˌendʒɪˈnɪə(r)/",
            "AmE": "/ˌendʒɪˈnɪr/",
            "definition": "a person who designs or builds machines, roads, or bridges",
            "examples": [
               "He’s an engineer at the factory.",
               "The engineer designed a bridge.",
               "Engineers fixed the machine."
            ]
         },
         {
            "id": 27,
            "word": "enormous",
            "role": "adjective",
            "BrE": "/ɪˈnɔːməs/",
            "AmE": "/ɪˈnɔːrməs/",
            "definition": "very large in size or amount",
            "examples": [
               "The elephant is enormous.",
               "She has an enormous house.",
               "The enormous crowd cheered loudly."
            ]
         },
         {
            "id": 27,
            "word": "enter",
            "role": "verb",
            "BrE": "/ˈentə(r)/",
            "AmE": "/ˈentər/",
            "definition": "to go or come into a place",
            "examples": [
               "Enter the room quietly.",
               "He entered the building quickly.",
               "She entered the competition."
            ]
         },
         {
            "id": 27,
            "word": "environment",
            "role": "noun",
            "BrE": "/ɪnˈvaɪrənmənt/",
            "AmE": "/ɪnˈvaɪrənmənt/",
            "definition": "the natural world, such as air, water, and land",
            "examples": [
               "We must protect the environment.",
               "The environment is cleaner now.",
               "Pollution harms the environment."
            ]
         },
         {
            "id": 27,
            "word": "equipment",
            "role": "noun",
            "BrE": "/ɪˈkwɪpmənt/",
            "AmE": "/ɪˈkwɪpmənt/",
            "definition": "the things needed for a particular activity",
            "examples": [
               "We need sports equipment.",
               "The equipment is new.",
               "They bought camping equipment."
            ]
         },
         {
            "id": 27,
            "word": "error",
            "role": "noun",
            "BrE": "/ˈerə(r)/",
            "AmE": "/ˈerər/",
            "definition": "a mistake",
            "examples": [
               "I made an error in math.",
               "The error was in the report.",
               "Her error caused a delay."
            ]
         },
         {
            "id": 27,
            "word": "especially",
            "role": "adverb",
            "BrE": "/ɪˈspeʃəli/",
            "AmE": "/ɪˈspeʃəli/",
            "definition": "more than other things or people",
            "examples": [
               "I like coffee, especially in the morning.",
               "She loves animals, especially dogs.",
               "This is especially important for kids."
            ]
         },
         {
            "id": 27,
            "word": "essay",
            "role": "noun",
            "BrE": "/ˈeseɪ/",
            "AmE": "/ˈeseɪ/",
            "definition": "a short piece of writing on a particular subject",
            "examples": [
               "I wrote an essay for school.",
               "Her essay was about history.",
               "The essay won a prize."
            ]
         },
         {
            "id": 27,
            "word": "everyday",
            "role": "adjective",
            "BrE": "/ˈevrideɪ/",
            "AmE": "/ˈevrideɪ/",
            "definition": "normal and used or happening every day",
            "examples": [
               "I wear everyday clothes.",
               "It’s an everyday problem.",
               "Everyday tasks take time."
            ]
         },
         {
            "id": 27,
            "word": "everywhere",
            "role": "adverb",
            "BrE": "/ˈevriweə(r)/",
            "AmE": "/ˈevriwer/",
            "definition": "in or to all places",
            "examples": [
               "Books are everywhere in her room.",
               "She looked everywhere for her keys.",
               "Flowers grow everywhere in spring."
            ]
         },
         {
            "id": 28,
            "word": "evidence",
            "role": "noun",
            "BrE": "/ˈevɪdəns/",
            "AmE": "/ˈevɪdəns/",
            "definition": "facts or information that show something is true",
            "examples": [
               "There’s evidence of rain.",
               "The evidence proved his guilt.",
               "Scientists found evidence of life."
            ]
         },
         {
            "id": 28,
            "word": "exact",
            "role": "adjective",
            "BrE": "/ɪɡˈzækt/",
            "AmE": "/ɪɡˈzækt/",
            "definition": "completely correct in every detail",
            "examples": [
               "Give me the exact time.",
               "The exact location is unknown.",
               "Her exact words were recorded."
            ]
         },
         {
            "id": 28,
            "word": "exactly",
            "role": "adverb",
            "BrE": "/ɪɡˈzæktli/",
            "AmE": "/ɪɡˈzæktli/",
            "definition": "in a way that is completely correct",
            "examples": [
               "I know exactly where it is.",
               "She followed the instructions exactly.",
               "He arrived exactly on time."
            ]
         },
         {
            "id": 28,
            "word": "excellent",
            "role": "adjective",
            "BrE": "/ˈeksələnt/",
            "AmE": "/ˈeksələnt/",
            "definition": "extremely good",
            "examples": [
               "The food was excellent.",
               "She did an excellent job.",
               "His excellent work was praised."
            ]
         },
         {
            "id": 28,
            "word": "except",
            "role": "preposition",
            "BrE": "/ɪkˈsept/",
            "AmE": "/ɪkˈsept/",
            "definition": "not including; apart from",
            "examples": [
               "Everyone came except Tom.",
               "The shop is open except Sundays.",
               "All passed except two students."
            ]
         },
         {
            "id": 28,
            "word": "exist",
            "role": "verb",
            "BrE": "/ɪɡˈzɪst/",
            "AmE": "/ɪɡˈzɪst/",
            "definition": "to be real or alive",
            "examples": [
               "Ghosts don’t exist.",
               "This species still exists.",
               "Solutions exist for this problem."
            ]
         },
         {
            "id": 28,
            "word": "expect",
            "role": "verb",
            "BrE": "/ɪkˈspekt/",
            "AmE": "/ɪkˈspekt/",
            "definition": "to think or believe something will happen",
            "examples": [
               "I expect she’ll call soon.",
               "They expect rain this afternoon.",
               "We expect good results this year."
            ]
         },
         {
            "id": 28,
            "word": "experience",
            "role": "noun",
            "BrE": "/ɪkˈspɪəriəns/",
            "AmE": "/ɪkˈspɪriəns/",
            "definition": "knowledge or skill gained by doing something",
            "examples": [
               "She has teaching experience.",
               "His experience helped the team.",
               "Travel is a great experience."
            ]
         },
         {
            "id": 28,
            "word": "experiment",
            "role": "noun",
            "BrE": "/ɪkˈsperɪmənt/",
            "AmE": "/ɪkˈsperɪmənt/",
            "definition": "a scientific test to find out something",
            "examples": [
               "We did an experiment in class.",
               "The experiment tested water quality.",
               "Her experiment showed new results."
            ]
         },
         {
            "id": 28,
            "word": "expert",
            "role": "noun",
            "BrE": "/ˈekspɜːt/",
            "AmE": "/ˈekspɜːrt/",
            "definition": "a person with special knowledge or skill",
            "examples": [
               "He’s an expert in math.",
               "The expert fixed the computer.",
               "She’s an expert on animals."
            ]
         },
         {
            "id": 29,
            "word": "explanation",
            "role": "noun",
            "BrE": "/ˌekspləˈneɪʃn/",
            "AmE": "/ˌekspləˈneɪʃn/",
            "definition": "a statement that makes something clear",
            "examples": [
               "She gave a clear explanation.",
               "His explanation was helpful.",
               "The teacher’s explanation was simple."
            ]
         },
         {
            "id": 29,
            "word": "express",
            "role": "verb",
            "BrE": "/ɪkˈspres/",
            "AmE": "/ɪkˈspres/",
            "definition": "to show a feeling or opinion",
            "examples": [
               "She expressed her joy.",
               "He expressed his ideas clearly.",
               "They expressed concern about safety."
            ]
         },
         {
            "id": 29,
            "word": "expression",
            "role": "noun",
            "BrE": "/ɪkˈspreʃn/",
            "AmE": "/ɪkˈspreʃn/",
            "definition": "the look on someone’s face that shows their feelings",
            "examples": [
               "Her expression was happy.",
               "His sad expression worried me.",
               "The expression on her face was calm."
            ]
         },
         {
            "id": 29,
            "word": "extreme",
            "role": "adjective",
            "BrE": "/ɪkˈstriːm/",
            "AmE": "/ɪkˈstriːm/",
            "definition": "very great in degree; not ordinary",
            "examples": [
               "The heat is extreme today.",
               "Extreme sports are exciting.",
               "She faced extreme weather conditions."
            ]
         },
         {
            "id": 29,
            "word": "extremely",
            "role": "adverb",
            "BrE": "/ɪkˈstriːmli/",
            "AmE": "/ɪkˈstriːmli/",
            "definition": "to a very great degree",
            "examples": [
               "I’m extremely tired.",
               "She’s extremely good at singing.",
               "The situation is extremely serious."
            ]
         },
         {
            "id": 29,
            "word": "factor",
            "role": "noun",
            "BrE": "/ˈfæktə(r)/",
            "AmE": "/ˈfæktər/",
            "definition": "one of several things that cause or influence something",
            "examples": [
               "Weather is a factor in travel.",
               "Cost was a key factor.",
               "Many factors affect the decision."
            ]
         },
         {
            "id": 29,
            "word": "factory",
            "role": "noun",
            "BrE": "/ˈfæktri/",
            "AmE": "/ˈfæktri/",
            "definition": "a building where goods are made in large quantities",
            "examples": [
               "The factory makes cars.",
               "She works in a shoe factory.",
               "The factory produces 100 units daily."
            ]
         },
         {
            "id": 29,
            "word": "fail",
            "role": "verb",
            "BrE": "/feɪl/",
            "AmE": "/feɪl/",
            "definition": "to not succeed in something",
            "examples": [
               "I failed the test.",
               "He failed to finish on time.",
               "The plan failed due to errors."
            ]
         },
         {
            "id": 29,
            "word": "fair",
            "role": "adjective",
            "BrE": "/feə(r)/",
            "AmE": "/fer/",
            "definition": "treating everyone equally or reasonably",
            "examples": [
               "The game was fair.",
               "She wants a fair chance.",
               "The teacher’s rules are fair."
            ]
         },
         {
            "id": 29,
            "word": "fall",
            "role": "verb",
            "BrE": "/fɔːl/",
            "AmE": "/fɔːl/",
            "definition": "to move quickly downwards",
            "examples": [
               "The leaf fell from the tree.",
               "She fell and hurt her knee.",
               "Prices fell sharply this month."
            ]
         },
         {
            "id": 30,
            "word": "fan",
            "role": "noun",
            "BrE": "/fæn/",
            "AmE": "/fæn/",
            "definition": "a person who likes something or someone very much",
            "examples": [
               "I’m a fan of football.",
               "She’s a big fan of the band.",
               "The fans cheered for their team."
            ]
         },
         {
            "id": 30,
            "word": "farm",
            "role": "noun",
            "BrE": "/fɑːm/",
            "AmE": "/fɑːrm/",
            "definition": "an area of land used for growing crops or keeping animals",
            "examples": [
               "They live on a farm.",
               "The farm grows vegetables.",
               "The farm has cows and sheep."
            ]
         },
         {
            "id": 30,
            "word": "farming",
            "role": "noun",
            "BrE": "/ˈfɑːmɪŋ/",
            "AmE": "/ˈfɑːrmɪŋ/",
            "definition": "the activity of working on a farm",
            "examples": [
               "Farming is hard work.",
               "He studied modern farming.",
               "Farming supports the village."
            ]
         },
         {
            "id": 30,
            "word": "fashion",
            "role": "noun",
            "BrE": "/ˈfæʃn/",
            "AmE": "/ˈfæʃn/",
            "definition": "the style of clothes or behaviour popular at a particular time",
            "examples": [
               "She loves fashion.",
               "The fashion show was exciting.",
               "New fashion trends change yearly."
            ]
         },
         {
            "id": 30,
            "word": "fat",
            "role": "adjective",
            "BrE": "/fæt/",
            "AmE": "/fæt/",
            "definition": "having too much weight on the body",
            "examples": [
               "The cat is fat.",
               "He ate fat-free food.",
               "The fat dog needs exercise."
            ]
         },
         {
            "id": 30,
            "word": "fear",
            "role": "noun",
            "BrE": "/fɪə(r)/",
            "AmE": "/fɪr/",
            "definition": "the feeling of being afraid",
            "examples": [
               "She has a fear of spiders.",
               "His fear stopped him from trying.",
               "Fear of failure affects many people."
            ]
         },
         {
            "id": 30,
            "word": "feature",
            "role": "noun",
            "BrE": "/ˈfiːtʃə(r)/",
            "AmE": "/ˈfiːtʃər/",
            "definition": "an important or noticeable part of something",
            "examples": [
               "The phone has new features.",
               "Safety is a key feature.",
               "The app’s best feature is its design."
            ]
         },
         {
            "id": 30,
            "word": "feed",
            "role": "verb",
            "BrE": "/fiːd/",
            "AmE": "/fiːd/",
            "definition": "to give food to a person or animal",
            "examples": [
               "I feed my dog twice daily.",
               "She fed the birds bread.",
               "They feed the animals at the zoo."
            ]
         },
         {
            "id": 30,
            "word": "female",
            "role": "adjective",
            "BrE": "/ˈfiːmeɪl/",
            "AmE": "/ˈfiːmeɪl/",
            "definition": "belonging to the sex that can have babies",
            "examples": [
               "The female cat is small.",
               "She’s a female athlete.",
               "Female students joined the club."
            ]
         },
         {
            "id": 30,
            "word": "fiction",
            "role": "noun",
            "BrE": "/ˈfɪkʃn/",
            "AmE": "/ˈfɪkʃn/",
            "definition": "stories that are not true or real",
            "examples": [
               "I read fiction books.",
               "Her favourite genre is fiction.",
               "The fiction story was exciting."
            ]
         },
            {
            "id": 31,
            "word": "field",
            "role": "noun",
            "BrE": "/fiːld/",
            "AmE": "/fiːld/",
            "definition": "an open area of land, often used for growing crops or sports",
            "examples": [
               "The field is full of flowers.",
               "They played football in the field.",
               "The farmer worked in the field."
            ]
         },
         {
            "id": 31,
            "word": "fight",
            "role": "verb",
            "BrE": "/faɪt/",
            "AmE": "/faɪt/",
            "definition": "to use physical force to try to defeat someone",
            "examples": [
               "They fight in the game.",
               "He fought with his friend.",
               "The soldiers fought bravely."
            ]
         },
         {
            "id": 31,
            "word": "figure",
            "role": "noun",
            "BrE": "/ˈfɪɡə(r)/",
            "AmE": "/ˈfɪɡjər/",
            "definition": "a number or amount",
            "examples": [
               "The figure is ten.",
               "Sales figures increased this year.",
               "The figure on the chart is wrong."
            ]
         },
         {
            "id": 31,
            "word": "fill",
            "role": "verb",
            "BrE": "/fɪl/",
            "AmE": "/fɪl/",
            "definition": "to make something full",
            "examples": [
               "Fill the cup with water.",
               "She filled the bag with clothes.",
               "He filled the form with details."
            ]
         },
         {
            "id": 31,
            "word": "final",
            "role": "adjective",
            "BrE": "/ˈfaɪnl/",
            "AmE": "/ˈfaɪnl/",
            "definition": "being the last in a series or process",
            "examples": [
               "This is the final test.",
               "The final score was close.",
               "Her final decision surprised us."
            ]
         },
         {
            "id": 31,
            "word": "finally",
            "role": "adverb",
            "BrE": "/ˈfaɪnəli/",
            "AmE": "/ˈfaɪnəli/",
            "definition": "after a long time or at the end",
            "examples": [
               "She finally arrived home.",
               "He finally finished his homework.",
               "The team finally won the game."
            ]
         },
         {
            "id": 31,
            "word": "finger",
            "role": "noun",
            "BrE": "/ˈfɪŋɡə(r)/",
            "AmE": "/ˈfɪŋɡər/",
            "definition": "one of the five parts at the end of your hand",
            "examples": [
               "She cut her finger.",
               "He pointed with his finger.",
               "The ring is on her finger."
            ]
         },
         {
            "id": 31,
            "word": "fire",
            "role": "noun",
            "BrE": "/ˈfaɪə(r)/",
            "AmE": "/ˈfaɪr/",
            "definition": "the heat and flames produced when something burns",
            "examples": [
               "The fire is warm.",
               "A fire started in the kitchen.",
               "They sat by the fire at night."
            ]
         },
         {
            "id": 31,
            "word": "fish",
            "role": "noun",
            "BrE": "/fɪʃ/",
            "AmE": "/fɪʃ/",
            "definition": "an animal that lives in water and swims",
            "examples": [
               "I saw a fish in the river.",
               "She caught a big fish.",
               "Fish swim in the aquarium."
            ]
         },
         {
            "id": 31,
            "word": "fit",
            "role": "verb",
            "BrE": "/fɪt/",
            "AmE": "/fɪt/",
            "definition": "to be the right size or shape for something",
            "examples": [
               "These shoes fit well.",
               "The dress fits her perfectly.",
               "The box didn’t fit in the car."
            ]
         },
         {
            "id": 32,
            "word": "fix",
            "role": "verb",
            "BrE": "/fɪks/",
            "AmE": "/fɪks/",
            "definition": "to repair something that is broken",
            "examples": [
               "He fixed the broken chair.",
               "She fixed the computer quickly.",
               "They fixed the leak in the pipe."
            ]
         },
         {
            "id": 32,
            "word": "flat",
            "role": "noun",
            "BrE": "/flæt/",
            "AmE": "/flæt/",
            "definition": "a set of rooms for living in, usually on one floor",
            "examples": [
               "She lives in a flat.",
               "The flat has two bedrooms.",
               "They rented a modern flat."
            ]
         },
         {
            "id": 32,
            "word": "flight",
            "role": "noun",
            "BrE": "/flaɪt/",
            "AmE": "/flaɪt/",
            "definition": "a journey made by an aeroplane",
            "examples": [
               "My flight is at noon.",
               "The flight was very smooth.",
               "Her flight landed early."
            ]
         },
         {
            "id": 32,
            "word": "float",
            "role": "verb",
            "BrE": "/fləʊt/",
            "AmE": "/floʊt/",
            "definition": "to stay on the surface of a liquid",
            "examples": [
               "The boat floats on water.",
               "Leaves float on the river.",
               "The balloon floated high above."
            ]
         },
         {
            "id": 32,
            "word": "floor",
            "role": "noun",
            "BrE": "/flɔː(r)/",
            "AmE": "/flɔːr/",
            "definition": "the flat surface of a room that you walk on",
            "examples": [
               "The floor is clean.",
               "She dropped her pen on the floor.",
               "The floor was made of wood."
            ]
         },
         {
            "id": 32,
            "word": "flow",
            "role": "verb",
            "BrE": "/fləʊ/",
            "AmE": "/floʊ/",
            "definition": "to move smoothly, like water",
            "examples": [
               "The river flows fast.",
               "Traffic flowed smoothly today.",
               "Water flows through the pipe."
            ]
         },
         {
            "id": 32,
            "word": "flower",
            "role": "noun",
            "BrE": "/ˈflaʊə(r)/",
            "AmE": "/ˈflaʊər/",
            "definition": "the colourful part of a plant",
            "examples": [
               "The flower is red.",
               "She picked a flower from the garden.",
               "Flowers bloom in spring."
            ]
         },
         {
            "id": 32,
            "word": "fly",
            "role": "verb",
            "BrE": "/flaɪ/",
            "AmE": "/flaɪ/",
            "definition": "to move through the air, like a bird or plane",
            "examples": [
               "Birds fly in the sky.",
               "She flew to Paris yesterday.",
               "The plane flies at night."
            ]
         },
         {
            "id": 32,
            "word": "focus",
            "role": "verb",
            "BrE": "/ˈfəʊkəs/",
            "AmE": "/ˈfoʊkəs/",
            "definition": "to give attention to one particular thing",
            "examples": [
               "Focus on your work.",
               "She focused on her studies.",
               "He focused on solving the problem."
            ]
         },
         {
            "id": 32,
            "word": "follow",
            "role": "verb",
            "BrE": "/ˈfɒləʊ/",
            "AmE": "/ˈfɑːloʊ/",
            "definition": "to go after someone or something",
            "examples": [
               "Follow me to the park.",
               "He followed the teacher’s advice.",
               "They followed the path to the river."
            ]
         },
         {
            "id": 33,
            "word": "food",
            "role": "noun",
            "BrE": "/fuːd/",
            "AmE": "/fuːd/",
            "definition": "things that people or animals eat",
            "examples": [
               "I like Italian food.",
               "She cooked delicious food.",
               "Healthy food is good for you."
            ]
         },
         {
            "id": 33,
            "word": "foot",
            "role": "noun",
            "BrE": "/fʊt/",
            "AmE": "/fʊt/",
            "definition": "the part of the body below the ankle",
            "examples": [
               "My foot hurts.",
               "He injured his left foot.",
               "She walked on foot to school."
            ]
         },
         {
            "id": 33,
            "word": "football",
            "role": "noun",
            "BrE": "/ˈfʊtbɔːl/",
            "AmE": "/ˈfʊtbɑːl/",
            "definition": "a game played by two teams who kick a ball",
            "examples": [
               "I play football with friends.",
               "The football match was exciting.",
               "He watches football every weekend."
            ]
         },
         {
            "id": 33,
            "word": "foreign",
            "role": "adjective",
            "BrE": "/ˈfɒrən/",
            "AmE": "/ˈfɔːrən/",
            "definition": "from or relating to another country",
            "examples": [
               "She speaks a foreign language.",
               "He loves foreign films.",
               "They visited a foreign country."
            ]
         },
         {
            "id": 33,
            "word": "forest",
            "role": "noun",
            "BrE": "/ˈfɒrɪst/",
            "AmE": "/ˈfɔːrɪst/",
            "definition": "a large area covered with trees",
            "examples": [
               "The forest is beautiful.",
               "We walked through the forest.",
               "Animals live in the forest."
            ]
         },
         {
            "id": 33,
            "word": "forever",
            "role": "adverb",
            "BrE": "/fəˈrevə(r)/",
            "AmE": "/fəˈrevər/",
            "definition": "for all time",
            "examples": [
               "I’ll love you forever.",
               "The moment felt like forever.",
               "This book will stay forever."
            ]
         },
         {
            "id": 33,
            "word": "forget",
            "role": "verb",
            "BrE": "/fəˈɡet/",
            "AmE": "/fərˈɡet/",
            "definition": "to be unable to remember something",
            "examples": [
               "I forgot my keys.",
               "She forgot his name.",
               "Don’t forget to call me."
            ]
         },
         {
            "id": 33,
            "word": "fork",
            "role": "noun",
            "BrE": "/fɔːk/",
            "AmE": "/fɔːrk/",
            "definition": "a tool with points used for eating",
            "examples": [
               "I need a fork to eat.",
               "She dropped her fork.",
               "The fork was on the table."
            ]
         },
         {
            "id": 33,
            "word": "form",
            "role": "noun",
            "BrE": "/fɔːm/",
            "AmE": "/fɔːrm/",
            "definition": "a document with spaces to write information",
            "examples": [
               "Fill out the form.",
               "The form asked for my name.",
               "She completed the application form."
            ]
         },
         {
            "id": 33,
            "word": "formal",
            "role": "adjective",
            "BrE": "/ˈfɔːml/",
            "AmE": "/ˈfɔːrml/",
            "definition": "serious or official in manner or style",
            "examples": [
               "Wear formal clothes tonight.",
               "The letter was very formal.",
               "She gave a formal speech."
            ]
         },
         {
            "id": 34,
            "word": "forward",
            "role": "adverb",
            "BrE": "/ˈfɔːwəd/",
            "AmE": "/ˈfɔːrwərd/",
            "definition": "towards a place or position ahead",
            "examples": [
               "Move forward slowly.",
               "He stepped forward to speak.",
               "The car moved forward quickly."
            ]
         },
         {
            "id": 34,
            "word": "free",
            "role": "adjective",
            "BrE": "/friː/",
            "AmE": "/friː/",
            "definition": "costing nothing or not controlled",
            "examples": [
               "The museum is free.",
               "She’s free this afternoon.",
               "Free tickets were given out."
            ]
         },
         {
            "id": 34,
            "word": "freedom",
            "role": "noun",
            "BrE": "/ˈfriːdəm/",
            "AmE": "/ˈfriːdəm/",
            "definition": "the state of being able to do what you want",
            "examples": [
               "I love my freedom.",
               "Freedom is important to her.",
               "They fought for their freedom."
            ]
         },
         {
            "id": 34,
            "word": "fresh",
            "role": "adjective",
            "BrE": "/freʃ/",
            "AmE": "/freʃ/",
            "definition": "new, clean, or not old",
            "examples": [
               "I bought fresh fruit.",
               "The air smells fresh today.",
               "She ate fresh bread this morning."
            ]
         },
         {
            "id": 34,
            "word": "friendship",
            "role": "noun",
            "BrE": "/ˈfrendʃɪp/",
            "AmE": "/ˈfrendʃɪp/",
            "definition": "a relationship between friends",
            "examples": [
               "Their friendship is strong.",
               "She values her childhood friendship.",
               "Friendship makes life better."
            ]
         },
         {
            "id": 34,
            "word": "front",
            "role": "noun",
            "BrE": "/frʌnt/",
            "AmE": "/frʌnt/",
            "definition": "the part or side of something that faces forward",
            "examples": [
               "The front of the house is white.",
               "Sit in the front of the class.",
               "The front door was open."
            ]
         },
         {
            "id": 34,
            "word": "frozen",
            "role": "adjective",
            "BrE": "/ˈfrəʊzn/",
            "AmE": "/ˈfroʊzn/",
            "definition": "very cold or turned into ice",
            "examples": [
               "The lake is frozen.",
               "She bought frozen food.",
               "The frozen ground was hard."
            ]
         },
         {
            "id": 34,
            "word": "fruit",
            "role": "noun",
            "BrE": "/fruːt/",
            "AmE": "/fruːt/",
            "definition": "the part of a plant that contains seeds and is eaten",
            "examples": [
               "I eat fruit every day.",
               "She likes tropical fruit.",
               "The fruit was sweet and juicy."
            ]
         },
         {
            "id": 34,
            "word": "fuel",
            "role": "noun",
            "BrE": "/fjuːəl/",
            "AmE": "/fjuːəl/",
            "definition": "a material used to produce energy or power",
            "examples": [
               "The car needs fuel.",
               "Fuel prices are high.",
               "They used wood as fuel."
            ]
         },
         {
            "id": 34,
            "word": "funny",
            "role": "adjective",
            "BrE": "/ˈfʌni/",
            "AmE": "/ˈfʌni/",
            "definition": "making you laugh or smile",
            "examples": [
               "The joke was funny.",
               "He’s a funny person.",
               "The funny movie made us laugh."
            ]
         },
         {
            "id": 35,
            "word": "furniture",
            "role": "noun",
            "BrE": "/ˈfɜːnɪtʃə(r)/",
            "AmE": "/ˈfɜːrnɪtʃər/",
            "definition": "objects like chairs, tables, or beds in a room",
            "examples": [
               "The furniture is new.",
               "She bought furniture for her flat.",
               "The room has modern furniture."
            ]
         },
         {
            "id": 35,
            "word": "future",
            "role": "noun",
            "BrE": "/ˈfjuːtʃə(r)/",
            "AmE": "/ˈfjuːtʃər/",
            "definition": "the time that will come",
            "examples": [
               "I plan for the future.",
               "Her future looks bright.",
               "The future of the project is clear."
            ]
         },
         {
            "id": 35,
            "word": "gallery",
            "role": "noun",
            "BrE": "/ˈɡæləri/",
            "AmE": "/ˈɡæləri/",
            "definition": "a place where art or other objects are shown",
            "examples": [
               "We visited an art gallery.",
               "The gallery has new paintings.",
               "Her photos are in the gallery."
            ]
         },
         {
            "id": 35,
            "word": "game",
            "role": "noun",
            "BrE": "/ɡeɪm/",
            "AmE": "/ɡeɪm/",
            "definition": "an activity or sport with rules, often for fun",
            "examples": [
               "Let’s play a game.",
               "The game was very exciting.",
               "She won the chess game."
            ]
         },
         {
            "id": 35,
            "word": "gap",
            "role": "noun",
            "BrE": "/ɡæp/",
            "AmE": "/ɡæp/",
            "definition": "an empty space or difference between things",
            "examples": [
               "There’s a gap in the wall.",
               "The gap between them grew.",
               "Mind the gap on the platform."
            ]
         },
         {
            "id": 35,
            "word": "garden",
            "role": "noun",
            "BrE": "/ˈɡɑːdn/",
            "AmE": "/ˈɡɑːrdn/",
            "definition": "an area of land where plants or flowers are grown",
            "examples": [
               "The garden has roses.",
               "She works in the garden daily.",
               "Their garden is full of vegetables."
            ]
         },
         {
            "id": 35,
            "word": "gate",
            "role": "noun",
            "BrE": "/ɡeɪt/",
            "AmE": "/ɡeɪt/",
            "definition": "a door in a fence or wall",
            "examples": [
               "Open the gate, please.",
               "The gate leads to the park.",
               "The wooden gate was locked."
            ]
         },
         {
            "id": 35,
            "word": "general",
            "role": "adjective",
            "BrE": "/ˈdʒenrəl/",
            "AmE": "/ˈdʒenrəl/",
            "definition": "affecting or involving most people or things",
            "examples": [
               "It’s a general rule.",
               "The general opinion was positive.",
               "He has general knowledge of science."
            ]
         },
         {
            "id": 35,
            "word": "gentle",
            "role": "adjective",
            "BrE": "/ˈdʒentl/",
            "AmE": "/ˈdʒentl/",
            "definition": "kind, soft, or not strong",
            "examples": [
               "She has a gentle voice.",
               "The gentle breeze felt nice.",
               "He was gentle with the puppy."
            ]
         },
         {
            "id": 35,
            "word": "get",
            "role": "verb",
            "Br drawingE": "/ɡet/",
            "AmE": "/ɡet/",
            "definition": "to receive, obtain, or buy something",
            "examples": [
               "I got a new phone.",
               "She got a gift from him.",
               "He got tired after work."
            ]
         },
         {
            "id": 36,
            "word": "gift",
            "role": "noun",
            "BrE": "/ɡɪft/",
            "AmE": "/ɡɪft/",
            "definition": "something given to someone without expecting payment",
            "examples": [
               "She gave me a gift.",
               "The gift was a book.",
               "He bought a gift for her birthday."
            ]
         },
         {
            "id": 36,
            "word": "girl",
            "role": "noun",
            "BrE": "/ɡɜːl/",
            "AmE": "/ɡɜːrl/",
            "definition": "a female child",
            "examples": [
               "The girl is playing.",
               "She’s a smart young girl.",
               "The girl won the race."
            ]
         },
         {
            "id": 36,
            "word": "give",
            "role": "verb",
            "BrE": "/ɡɪv/",
            "AmE": "/ɡɪv/",
            "definition": "to provide someone with something",
            "examples": [
               "Give me the book.",
               "She gave him a smile.",
               "They gave food to the poor."
            ]
         },
         {
            "id": 36,
            "word": "glass",
            "role": "noun",
            "BrE": "/ɡlɑːs/",
            "AmE": "/ɡlæs/",
            "definition": "a hard, transparent material or a container for drinking",
            "examples": [
               "The glass is full.",
               "She broke a glass cup.",
               "The window is made of glass."
            ]
         },
         {
            "id": 36,
            "word": "go",
            "role": "verb",
            "BrE": "/ɡəʊ/",
            "AmE": "/ɡoʊ/",
            "definition": "to move or travel to a place",
            "examples": [
               "I go to school daily.",
               "She went to the shop.",
               "They’re going on holiday tomorrow."
            ]
         },
         {
            "id": 36,
            "word": "goal",
            "role": "noun",
            "BrE": "/ɡəʊl/",
            "AmE": "/ɡoʊl/",
            "definition": "something you want to achieve",
            "examples": [
               "My goal is to learn English.",
               "Her goal was to run faster.",
               "The team reached its goal."
            ]
         },
         {
            "id": 36,
            "word": "gold",
            "role": "noun",
            "BrE": "/ɡəʊld/",
            "AmE": "/ɡoʊld/",
            "definition": "a valuable yellow metal",
            "examples": [
               "She wears a gold ring.",
               "The gold medal was hers.",
               "Gold is expensive this year."
            ]
         },
         {
            "id": 36,
            "word": "good",
            "role": "adjective",
            "BrE": "/ɡʊd/",
            "AmE": "/ɡʊd/",
            "definition": "of high quality or pleasant",
            "examples": [
               "This is a good book.",
               "He’s a good student.",
               "The weather was good today."
            ]
         },
         {
            "id": 36,
            "word": "government",
            "role": "noun",
            "BrE": "/ˈɡʌvənmənt/",
            "AmE": "/ˈɡʌvərnmənt/",
            "definition": "the group of people who control a country",
            "examples": [
               "The government makes laws.",
               "She works for the government.",
               "The government built new schools."
            ]
         },
         {
            "id": 36,
            "word": "great",
            "role": "adjective",
            "BrE": "/ɡreɪt/",
            "AmE": "/ɡreɪt/",
            "definition": "very good or large in amount",
            "examples": [
               "It’s a great day.",
               "She did a great job.",
               "He has a great love for music."
            ]
         },
         {
            "id": 37,
            "word": "green",
            "role": "adjective",
            "BrE": "/ɡriːn/",
            "AmE": "/ɡriːn/",
            "definition": "having the colour of grass or limes",
            "examples": [
               "The grass is green.",
               "She wore a green dress.",
               "The green forest was beautiful."
            ]
         },
         {
            "id": 37,
            "word": "grey",
            "role": "adjective",
            "BrE": "/ɡreɪ/",
            "AmE": "/ɡreɪ/",
            "definition": "having the colour between black and white",
            "examples": [
               "Her hair is grey.",
               "The grey clouds brought rain.",
               "He bought a grey jacket."
            ]
         },
         {
            "id": 37,
            "word": "ground",
            "role": "noun",
            "BrE": "/ɡraʊnd/",
            "AmE": "/ɡraʊnd/",
            "definition": "the surface of the earth",
            "examples": [
               "The ground is wet.",
               "He sat on the ground.",
               "Leaves covered the ground."
            ]
         },
         {
            "id": 37,
            "word": "group",
            "role": "noun",
            "BrE": "/ɡruːp/",
            "AmE": "/ɡruːp/",
            "definition": "a number of people or things together",
            "examples": [
               "A group of friends met.",
               "The group studied together.",
               "The group discussed the project."
            ]
         },
         {
            "id": 37,
            "word": "grow",
            "role": "verb",
            "BrE": "/ɡrəʊ/",
            "AmE": "/ɡroʊ/",
            "definition": "to increase in size or develop",
            "examples": [
               "Plants grow in the garden.",
               "She grew taller this year.",
               "The company grew quickly."
            ]
         },
         {
            "id": 37,
            "word": "guess",
            "role": "verb",
            "BrE": "/ɡes/",
            "AmE": "/ɡes/",
            "definition": "to try to give an answer without knowing if it is correct",
            "examples": [
               "Guess my age!",
               "She guessed the right answer.",
               "I can only guess what happened."
            ]
         },
         {
            "id": 37,
            "word": "guest",
            "role": "noun",
            "BrE": "/ɡest/",
            "AmE": "/ɡest/",
            "definition": "a person invited to a place or event",
            "examples": [
               "We have a guest tonight.",
               "The guest spoke at the event.",
               "Guests arrived for the party."
            ]
         },
         {
            "id": 37,
            "word": "guide",
            "role": "noun",
            "BrE": "/ɡaɪd/",
            "AmE": "/ɡaɪd/",
            "definition": "a person who shows others the way or gives information",
            "examples": [
               "The guide showed us the city.",
               "Our guide was very helpful.",
               "She’s a guide at the museum."
            ]
         },
         {
            "id": 37,
            "word": "gun",
            "role": "noun",
            "BrE": "/ɡʌn/",
            "AmE": "/ɡʌn/",
            "definition": "a weapon that shoots bullets",
            "examples": [
               "The soldier carried a gun.",
               "Guns are dangerous weapons.",
               "He saw a gun in the movie."
            ]
         },
         {
            "id": 37,
            "word": "hair",
            "role": "noun",
            "BrE": "/heə(r)/",
            "AmE": "/her/",
            "definition": "the thin strands that grow on your head",
            "examples": [
               "Her hair is long.",
               "He brushed his hair.",
               "She dyed her hair red."
            ]
         },
         {
            "id": 38,
            "word": "half",
            "role": "noun",
            "BrE": "/hɑːf/",
            "AmE": "/hæf/",
            "definition": "one of two equal parts of something",
            "examples": [
               "I ate half the cake.",
               "She worked for half a day.",
               "Half of the class was absent."
            ]
         },
         {
            "id": 38,
            "word": "hall",
            "role": "noun",
            "BrE": "/hɔːl/",
            "AmE": "/hɔːl/",
            "definition": "a large room or building for events or meetings",
            "examples": [
               "The hall was full.",
               "The meeting is in the hall.",
               "The concert hall was beautiful."
            ]
         },
         {
            "id": 38,
            "word": "hand",
            "role": "noun",
            "BrE": "/hænd/",
            "AmE": "/hænd/",
            "definition": "the part of the body at the end of the arm",
            "examples": [
               "Raise your hand.",
               "She held his hand tightly.",
               "He wrote with his left hand."
            ]
         },
         {
            "id": 38,
            "word": "happen",
            "role": "verb",
            "BrE": "/ˈhæpən/",
            "AmE": "/ˈhæpən/",
            "definition": "to take place, often by chance",
            "examples": [
               "What happened at school?",
               "The accident happened yesterday.",
               "Good things happen when you try."
            ]
         },
         {
            "id": 38,
            "word": "happy",
            "role": "adjective",
            "BrE": "/ˈhæpi/",
            "AmE": "/ˈhæpi/",
            "definition": "feeling or showing pleasure",
            "examples": [
               "She’s happy today.",
               "He was happy with his gift.",
               "The happy children played outside."
            ]
         },
         {
            "id": 38,
            "word": "hard",
            "role": "adjective",
            "BrE": "/hɑːd/",
            "AmE": "/hɑːrd/",
            "definition": "difficult or not soft",
            "examples": [
               "This test is hard.",
               "The ground was hard and cold.",
               "She worked hard all day."
            ]
         },
         {
            "id": 38,
            "word": "hat",
            "role": "noun",
            "BrE": "/hæt/",
            "AmE": "/hæt/",
            "definition": "a covering for the head",
            "examples": [
               "She wore a red hat.",
               "The hat kept her warm.",
               "He lost his favourite hat."
            ]
         },
         {
            "id": 38,
            "word": "hate",
            "role": "verb",
            "BrE": "/heɪt/",
            "AmE": "/heɪt/",
            "definition": "to strongly dislike something or someone",
            "examples": [
               "I hate cold weather.",
               "She hates doing homework.",
               "He hates waiting for buses."
            ]
         },
         {
            "id": 38,
            "word": "head",
            "role": "noun",
            "BrE": "/hed/",
            "AmE": "/hed/",
            "definition": "the part of the body above the neck",
            "examples": [
               "My head hurts.",
               "She nodded her head.",
               "He hit his head on the door."
            ]
         },
         {
            "id": 38,
            "word": "health",
            "role": "noun",
            "BrE": "/helθ/",
            "AmE": "/helθ/",
            "definition": "the condition of your body",
            "examples": [
               "Her health is good.",
               "He takes care of his health.",
               "Poor health stopped her working."
            ]
         },
         {
            "id": 39,
            "word": "healthy",
            "role": "adjective",
            "BrE": "/ˈhelθi/",
            "AmE": "/ˈhelθi/",
            "definition": "good for your health or physically well",
            "examples": [
               "She eats healthy food.",
               "He’s a healthy young man.",
               "A healthy diet includes fruit."
            ]
         },
         {
            "id": 39,
            "word": "hear",
            "role": "verb",
            "BrE": "/hɪə(r)/",
            "AmE": "/hɪr/",
            "definition": "to receive sounds with your ears",
            "examples": [
               "I hear a bird.",
               "She heard a loud noise.",
               "He heard the news on TV."
            ]
         },
         {
            "id": 39,
            "word": "heart",
            "role": "noun",
            "BrE": "/hɑːt/",
            "AmE": "/hɑːrt/",
            "definition": "the organ in your chest that pumps blood",
            "examples": [
               "My heart is beating fast.",
               "She has a kind heart.",
               "His heart was checked by a doctor."
            ]
         },
         {
            "id": 39,
            "word": "heat",
            "role": "noun",
            "BrE": "/hiːt/",
            "AmE": "/hiːt/",
            "definition": "the quality of being hot",
            "examples": [
               "The heat is strong today.",
               "She felt the heat of the fire.",
               "The heat made him tired."
            ]
         },
         {
            "id": 39,
            "word": "heavy",
            "role": "adjective",
            "BrE": "/ˈhevi/",
            "AmE": "/ˈhevi/",
            "definition": "having a lot of weight",
            "examples": [
               "The bag is heavy.",
               "He lifted a heavy box.",
               "The heavy rain caused floods."
            ]
         },
         {
            "id": 39,
            "word": "height",
            "role": "noun",
            "BrE": "/haɪt/",
            "AmE": "/haɪt/",
            "definition": "how tall or high something is",
            "examples": [
               "Her height is 1.7 meters.",
               "The height of the tree is amazing.",
               "The wall’s height was measured."
            ]
         },
         {
            "id": 39,
            "word": "help",
            "role": "verb",
            "BrE": "/help/",
            "AmE": "/help/",
            "definition": "to make something easier or better for someone",
            "examples": [
               "Can you help me?",
               "She helped him with homework.",
               "They helped clean the park."
            ]
         },
         {
            "id": 39,
            "word": "hide",
            "role": "verb",
            "BrE": "/haɪd/",
            "AmE": "/haɪd/",
            "definition": "to put or keep something where it cannot be seen",
            "examples": [
               "Hide the gift quickly.",
               "She hid behind the door.",
               "He hid his feelings well."
            ]
         },
         {
            "id": 39,
            "word": "high",
            "role": "adjective",
            "BrE": "/haɪ/",
            "AmE": "/haɪ/",
            "definition": "having a large distance from top to bottom or far above the ground",
            "examples": [
               "The mountain is high.",
               "She climbed a high wall.",
               "The high tower was visible."
            ]
         },
         {
            "id": 39,
            "word": "hill",
            "role": "noun",
            "BrE": "/hɪl/",
            "AmE": "/hɪl/",
            "definition": "a raised area of land, smaller than a mountain",
            "examples": [
               "The house is on a hill.",
               "We walked up the hill.",
               "The hill was covered in grass."
            ]
         },
         {
            "id": 40,
            "word": "history",
            "role": "noun",
            "BrE": "/ˈhɪstri/",
            "AmE": "/ˈhɪstri/",
            "definition": "the study of past events",
            "examples": [
               "I study history at school.",
               "She loves reading about history.",
               "The history of the city is old."
            ]
         },
         {
            "id": 40,
            "word": "hit",
            "role": "verb",
            "BrE": "/hɪt/",
            "AmE": "/hɪt/",
            "definition": "to strike something or someone",
            "examples": [
               "He hit the ball.",
               "She hit her hand on the table.",
               "The car hit a tree."
            ]
         },
         {
            "id": 40,
            "word": "hobby",
            "role": "noun",
            "BrE": "/ˈhɒbi/",
            "AmE": "/ˈhɑːbi/",
            "definition": "an activity done for enjoyment in your free time",
            "examples": [
               "My hobby is painting.",
               "He has a new hobby.",
               "Her hobby is collecting stamps."
            ]
         },
         {
            "id": 40,
            "word": "hold",
            "role": "verb",
            "BrE": "/həʊld/",
            "AmE": "/hoʊld/",
            "definition": "to carry or keep something in your hands",
            "examples": [
               "Hold the book tightly.",
               "She held her baby carefully.",
               "He held the prize proudly."
            ]
         },
         {
            "id": 40,
            "word": "hole",
            "role": "noun",
            "BrE": "/həʊl/",
            "AmE": "/hoʊl/",
            "definition": "an empty space in something solid",
            "examples": [
               "There’s a hole in my shoe.",
               "The dog dug a hole.",
               "A hole appeared in the wall."
            ]
         },
         {
            "id": 40,
            "word": "holiday",
            "role": "noun",
            "BrE": "/ˈhɒlədeɪ/",
            "AmE": "/ˈhɑːlədeɪ/",
            "definition": "a time when you do not go to work or school",
            "examples": [
               "We’re on holiday now.",
               "She planned a holiday abroad.",
               "The holiday was relaxing."
            ]
         },
         {
            "id": 40,
            "word": "home",
            "role": "noun",
            "BrE": "/həʊm/",
            "AmE": "/hoʊm/",
            "definition": "the place where you live",
            "examples": [
               "I’m going home now.",
               "Her home is in London.",
               "They built a new home."
            ]
         },
         {
            "id": 40,
            "word": "hope",
            "role": "verb",
            "BrE": "/həʊp/",
            "AmE": "/hoʊp/",
            "definition": "to want something to happen",
            "examples": [
               "I hope it’s sunny.",
               "She hopes to pass the test.",
               "He hoped for a better job."
            ]
         },
         {
            "id": 40,
            "word": "hospital",
            "role": "noun",
            "BrE": "/ˈhɒspɪtl/",
            "AmE": "/ˈhɑːspɪtl/",
            "definition": "a place where sick or injured people are treated",
            "examples": [
               "He’s in the hospital.",
               "The hospital is very big.",
               "She visited her friend in hospital."
            ]
         },
         {
            "id": 40,
            "word": "hot",
            "role": "adjective",
            "BrE": "/hɒt/",
            "AmE": "/hɑːt/",
            "definition": "having a high temperature",
            "examples": [
               "The soup is hot.",
               "It’s a hot summer day.",
               "The hot water burned his hand."
            ]
         },
            {
            "id": 41,
            "word": "hotel",
            "role": "noun",
            "BrE": "/həʊˈtel/",
            "AmE": "/hoʊˈtel/",
            "definition": "a building where people stay and pay for rooms and meals",
            "examples": [
               "We stayed in a hotel.",
               "The hotel has a pool.",
               "The hotel was near the beach."
            ]
         },
         {
            "id": 41,
            "word": "hour",
            "role": "noun",
            "BrE": "/aʊə(r)/",
            "AmE": "/aʊr/",
            "definition": "a period of 60 minutes",
            "examples": [
               "The class is one hour.",
               "She waited for an hour.",
               "The journey takes two hours."
            ]
         },
         {
            "id": 41,
            "word": "house",
            "role": "noun",
            "BrE": "/haʊs/",
            "AmE": "/haʊs/",
            "definition": "a building where people live",
            "examples": [
               "My house is big.",
               "They bought a new house.",
               "Her house has a garden."
            ]
         },
         {
            "id": 41,
            "word": "huge",
            "role": "adjective",
            "BrE": "/hjuːdʒ/",
            "AmE": "/hjuːdʒ/",
            "definition": "extremely large in size or amount",
            "examples": [
               "The elephant is huge.",
               "He has a huge dog.",
               "The huge crowd cheered loudly."
            ]
         },
         {
            "id": 41,
            "word": "human",
            "role": "noun",
            "BrE": "/ˈhjuːmən/",
            "AmE": "/ˈhjuːmən/",
            "definition": "a person",
            "examples": [
               "Humans need water.",
               "She’s a kind human.",
               "Humans created this technology."
            ]
         },
         {
            "id": 41,
            "word": "hungry",
            "role": "adjective",
            "BrE": "/ˈhʌŋɡri/",
            "AmE": "/ˈhʌŋɡri/",
            "definition": "wanting or needing food",
            "examples": [
               "I’m hungry now.",
               "The hungry cat ate quickly.",
               "They were hungry after the trip."
            ]
         },
         {
            "id": 41,
            "word": "hurry",
            "role": "verb",
            "BrE": "/ˈhʌri/",
            "AmE": "/ˈhɜːri/",
            "definition": "to move or do something quickly",
            "examples": [
               "Hurry, we’re late!",
               "She hurried to catch the bus.",
               "He hurried through his homework."
            ]
         },
         {
            "id": 41,
            "word": "hurt",
            "role": "verb",
            "BrE": "/hɜːt/",
            "AmE": "/hɜːrt/",
            "definition": "to cause pain or injury",
            "examples": [
               "My leg hurts.",
               "She hurt her arm playing.",
               "His words hurt her feelings."
            ]
         },
         {
            "id": 41,
            "word": "ice",
            "role": "noun",
            "BrE": "/aɪs/",
            "AmE": "/aɪs/",
            "definition": "frozen water",
            "examples": [
               "The ice is cold.",
               "She put ice in her drink.",
               "The lake was covered in ice."
            ]
         },
         {
            "id": 41,
            "word": "idea",
            "role": "noun",
            "BrE": "/aɪˈdɪə/",
            "AmE": "/aɪˈdiːə/",
            "definition": "a plan or suggestion in your mind",
            "examples": [
               "I have an idea.",
               "Her idea was brilliant.",
               "The idea came to him suddenly."
            ]
         },
         {
            "id": 42,
            "word": "identify",
            "role": "verb",
            "BrE": "/aɪˈdentɪfaɪ/",
            "AmE": "/aɪˈdentɪfaɪ/",
            "definition": "to recognize or name something or someone",
            "examples": [
               "Can you identify this bird?",
               "She identified the thief.",
               "He identified the problem quickly."
            ]
         },
         {
            "id": 42,
            "word": "ill",
            "role": "adjective",
            "BrE": "/ɪl/",
            "AmE": "/ɪl/",
            "definition": "not healthy; sick",
            "examples": [
               "She’s ill today.",
               "He felt ill after lunch.",
               "The ill patient needed rest."
            ]
         },
         {
            "id": 42,
            "word": "image",
            "role": "noun",
            "BrE": "/ˈɪmɪdʒ/",
            "AmE": "/ˈɪmɪdʒ/",
            "definition": "a picture or photograph",
            "examples": [
               "This image is clear.",
               "She took an image of the sunset.",
               "The image was on the screen."
            ]
         },
         {
            "id": 42,
            "word": "imagine",
            "role": "verb",
            "BrE": "/ɪˈmædʒɪn/",
            "AmE": "/ɪˈmædʒɪn/",
            "definition": "to form a picture or idea in your mind",
            "examples": [
               "Imagine a big castle.",
               "She imagined living by the sea.",
               "He imagined a world without cars."
            ]
         },
         {
            "id": 42,
            "word": "important",
            "role": "adjective",
            "BrE": "/ɪmˈpɔːtnt/",
            "AmE": "/ɪmˈpɔːrtnt/",
            "definition": "having a lot of value or influence",
            "examples": [
               "This test is important.",
               "Her role is very important.",
               "The meeting was important for all."
            ]
         },
         {
            "id": 42,
            "word": "improve",
            "role": "verb",
            "BrE": "/ɪmˈpruːv/",
            "AmE": "/ɪmˈpruːv/",
            "definition": "to make something better",
            "examples": [
               "I want to improve my English.",
               "She improved her grades.",
               "The team improved their skills."
            ]
         },
         {
            "id": 42,
            "word": "include",
            "role": "verb",
            "BrE": "/ɪnˈkluːd/",
            "AmE": "/ɪnˈkluːd/",
            "definition": "to have something as part of a group or set",
            "examples": [
               "The price includes tax.",
               "The list includes her name.",
               "The menu includes dessert."
            ]
         },
         {
            "id": 42,
            "word": "increase",
            "role": "verb",
            "BrE": "/ɪnˈkriːs/",
            "AmE": "/ɪnˈkriːs/",
            "definition": "to become or make something larger",
            "examples": [
               "Prices increase every year.",
               "She increased her speed.",
               "They increased the team’s budget."
            ]
         },
         {
            "id": 42,
            "word": "individual",
            "role": "noun",
            "BrE": "/ˌɪndɪˈvɪdʒuəl/",
            "AmE": "/ˌɪndɪˈvɪdʒuəl/",
            "definition": "a single person",
            "examples": [
               "Each individual has a vote.",
               "She’s a talented individual.",
               "The individual completed the task."
            ]
         },
         {
            "id": 42,
            "word": "industry",
            "role": "noun",
            "BrE": "/ˈɪndəstri/",
            "AmE": "/ˈɪndəstri/",
            "definition": "the production of goods in factories",
            "examples": [
               "The industry makes cars.",
               "She works in the fashion industry.",
               "The industry grew this year."
            ]
         },
         {
            "id": 43,
            "word": "information",
            "role": "noun",
            "BrE": "/ˌɪnfəˈmeɪʃn/",
            "AmE": "/ˌɪnfərˈmeɪʃn/",
            "definition": "facts or details about something",
            "examples": [
               "I need more information.",
               "The information was helpful.",
               "She shared information about the event."
            ]
         },
         {
            "id": 43,
            "word": "inside",
            "role": "preposition",
            "BrE": "/ɪnˈsaɪd/",
            "AmE": "/ɪnˈsaɪd/",
            "definition": "within something",
            "examples": [
               "The keys are inside the bag.",
               "He stayed inside the house.",
               "The gift was inside the box."
            ]
         },
         {
            "id": 43,
            "word": "instead",
            "role": "adverb",
            "BrE": "/ɪnˈsted/",
            "AmE": "/ɪnˈsted/",
            "definition": "in place of something or someone",
            "examples": [
               "I’ll go instead.",
               "She chose tea instead of coffee.",
               "He walked instead of driving."
            ]
         },
         {
            "id": 43,
            "word": "instruction",
            "role": "noun",
            "BrE": "/ɪnˈstrʌkʃn/",
            "AmE": "/ɪnˈstrʌkʃn/",
            "definition": "information on how to do something",
            "examples": [
               "Follow the instructions.",
               "The instructions were clear.",
               "She read the instructions carefully."
            ]
         },
         {
            "id": 43,
            "word": "interest",
            "role": "noun",
            "BrE": "/ˈɪntrəst/",
            "AmE": "/ˈɪntrəst/",
            "definition": "a feeling of wanting to know or learn about something",
            "examples": [
               "I have an interest in art.",
               "Her interest is music.",
               "His interest in history grew."
            ]
         },
         {
            "id": 43,
            "word": "interested",
            "role": "adjective",
            "BrE": "/ˈɪntrəstɪd/",
            "AmE": "/ˈɪntrəstɪd/",
            "definition": "wanting to know or learn about something",
            "examples": [
               "I’m interested in books.",
               "She’s interested in science.",
               "He’s interested in learning Spanish."
            ]
         },
         {
            "id": 43,
            "word": "international",
            "role": "adjective",
            "BrE": "/ˌɪntəˈnæʃnəl/",
            "AmE": "/ˌɪntərˈnæʃnəl/",
            "definition": "involving more than one country",
            "examples": [
               "It’s an international school.",
               "She travels to international cities.",
               "The international team won."
            ]
         },
         {
            "id": 43,
            "word": "internet",
            "role": "noun",
            "BrE": "/ˈɪntənet/",
            "AmE": "/ˈɪntərnet/",
            "definition": "a global computer network for sharing information",
            "examples": [
               "I use the internet daily.",
               "The internet is very fast.",
               "She found the answer on the internet."
            ]
         },
         {
            "id": 43,
            "word": "interview",
            "role": "noun",
            "BrE": "/ˈɪntəvjuː/",
            "AmE": "/ˈɪntərvjuː/",
            "definition": "a meeting where someone is asked questions",
            "examples": [
               "I have a job interview.",
               "The interview was on TV.",
               "She prepared for her interview."
            ]
         },
         {
            "id": 43,
            "word": "into",
            "role": "preposition",
            "BrE": "/ˈɪntə/",
            "AmE": "/ˈɪntu/",
            "definition": "moving towards the inside of something",
            "examples": [
               "She went into the room.",
               "He jumped into the pool.",
               "The car crashed into a tree."
            ]
         },
         {
            "id": 44,
            "word": "introduce",
            "role": "verb",
            "BrE": "/ˌɪntrəˈdjuːs/",
            "AmE": "/ˌɪntrəˈduːs/",
            "definition": "to present someone or something to others",
            "examples": [
               "I’ll introduce my friend.",
               "She introduced her new idea.",
               "He introduced the speaker to the crowd."
            ]
         },
         {
            "id": 44,
            "word": "introduction",
            "role": "noun",
            "BrE": "/ˌɪntrəˈdʌkʃn/",
            "AmE": "/ˌɪntrəˈdʌkʃn/",
            "definition": "the act of presenting someone or something",
            "examples": [
               "The introduction was short.",
               "Her introduction was clear.",
               "The book’s introduction was interesting."
            ]
         },
         {
            "id": 44,
            "word": "invent",
            "role": "verb",
            "BrE": "/ɪnˈvent/",
            "AmE": "/ɪnˈvent/",
            "definition": "to create something new",
            "examples": [
               "He invented a new game.",
               "She invented a useful tool.",
               "They invented the telephone."
            ]
         },
         {
            "id": 44,
            "word": "invention",
            "role": "noun",
            "BrE": "/ɪnˈvenʃn/",
            "AmE": "/ɪnˈvenʃn/",
            "definition": "something that has been created for the first time",
            "examples": [
               "The invention changed lives.",
               "His invention was successful.",
               "The new invention saves time."
            ]
         },
         {
            "id": 44,
            "word": "invite",
            "role": "verb",
            "BrE": "/ɪnˈvaɪt/",
            "AmE": "/ɪnˈvaɪt/",
            "definition": "to ask someone to come to an event",
            "examples": [
               "Invite her to the party.",
               "They invited us for dinner.",
               "She was invited to speak."
            ]
         },
         {
            "id": 44,
            "word": "involve",
            "role": "verb",
            "BrE": "/ɪnˈvɒlv/",
            "AmE": "/ɪnˈvɑːlv/",
            "definition": "to include someone or something in an activity",
            "examples": [
               "The game involves teams.",
               "She involved everyone in the plan.",
               "The project involves hard work."
            ]
         },
         {
            "id": 44,
            "word": "island",
            "role": "noun",
            "BrE": "/ˈaɪlənd/",
            "AmE": "/ˈaɪlənd/",
            "definition": "a piece of land surrounded by water",
            "examples": [
               "We visited an island.",
               "The island has a beach.",
               "She lives on a small island."
            ]
         },
         {
            "id": 44,
            "word": "issue",
            "role": "noun",
            "BrE": "/ˈɪʃuː/",
            "AmE": "/ˈɪʃuː/",
            "definition": "an important topic or problem",
            "examples": [
               "The issue is serious.",
               "They discussed the issue.",
               "The issue was solved quickly."
            ]
         },
         {
            "id": 44,
            "word": "item",
            "role": "noun",
            "BrE": "/ˈaɪtəm/",
            "AmE": "/ˈaɪtəm/",
            "definition": "a single thing in a list or group",
            "examples": [
               "I bought one item.",
               "The item was expensive.",
               "Each item was checked."
            ]
         },
         {
            "id": 44,
            "word": "job",
            "role": "noun",
            "BrE": "/dʒɒb/",
            "AmE": "/dʒɑːb/",
            "definition": "work that you do for money",
            "examples": [
               "She has a new job.",
               "His job is teaching.",
               "The job requires long hours."
            ]
         },
         {
            "id": 45,
            "word": "join",
            "role": "verb",
            "BrE": "/dʒɔɪn/",
            "AmE": "/dʒɔɪn/",
            "definition": "to become a member of a group or to connect things",
            "examples": [
               "Join our club!",
               "She joined the team.",
               "He joined the wires together."
            ]
         },
         {
            "id": 45,
            "word": "joke",
            "role": "noun",
            "BrE": "/dʒəʊk/",
            "AmE": "/dʒoʊk/",
            "definition": "something said to make people laugh",
            "examples": [
               "He told a funny joke.",
               "The joke made her smile.",
               "His joke was about dogs."
            ]
         },
         {
            "id": 45,
            "word": "journalist",
            "role": "noun",
            "BrE": "/ˈdʒɜːnəlɪst/",
            "AmE": "/ˈdʒɜːrnəlɪst/",
            "definition": "a person who writes or reports news",
            "examples": [
               "She’s a journalist.",
               "The journalist wrote a story.",
               "He’s a famous journalist."
            ]
         },
         {
            "id": 45,
            "word": "journey",
            "role": "noun",
            "BrE": "/ˈdʒɜːni/",
            "AmE": "/ˈdʒɜːrni/",
            "definition": "the act of travelling from one place to another",
            "examples": [
               "The journey was long.",
               "Her journey took five hours.",
               "Their journey was an adventure."
            ]
         },
         {
            "id": 45,
            "word": "jump",
            "role": "verb",
            "BrE": "/dʒʌmp/",
            "AmE": "/dʒʌmp/",
            "definition": "to move quickly off the ground using your legs",
            "examples": [
               "The cat can jump.",
               "She jumped over the fence.",
               "He jumped high in the game."
            ]
         },
         {
            "id": 45,
            "word": "keep",
            "role": "verb",
            "BrE": "/kiːp/",
            "AmE": "/kiːp/",
            "definition": "to have something and not give it away",
            "examples": [
               "Keep this book safe.",
               "She kept the letter for years.",
               "He keeps his room clean."
            ]
         },
         {
            "id": 45,
            "word": "key",
            "role": "noun",
            "BrE": "/kiː/",
            "AmE": "/kiː/",
            "definition": "a piece of metal used to lock or unlock something",
            "examples": [
               "I lost my key.",
               "The key opens the door.",
               "She found the car key."
            ]
         },
         {
            "id": 45,
            "word": "kick",
            "role": "verb",
            "BrE": "/kɪk/",
            "AmE": "/kɪk/",
            "definition": "to hit something with your foot",
            "examples": [
               "He kicked the ball.",
               "She kicked the door open.",
               "They kicked stones on the path."
            ]
         },
         {
            "id": 45,
            "word": "kid",
            "role": "noun",
            "BrE": "/kɪd/",
            "AmE": "/kɪd/",
            "definition": "a child",
            "examples": [
               "The kid is playing.",
               "She’s a happy kid.",
               "The kids enjoyed the park."
            ]
         },
         {
            "id": 45,
            "word": "kill",
            "role": "verb",
            "BrE": "/kɪl/",
            "AmE": "/kɪl/",
            "definition": "to make someone or something die",
            "examples": [
               "The cold killed the plants.",
               "He killed a spider.",
               "The storm killed many trees."
            ]
         },
         {
            "id": 46,
            "word": "kind",
            "role": "adjective",
            "BrE": "/kaɪnd/",
            "AmE": "/kaɪnd/",
            "definition": "friendly and helpful",
            "examples": [
               "She’s a kind person.",
               "He was kind to the dog.",
               "Her kind words helped me."
            ]
         },
         {
            "id": 46,
            "word": "king",
            "role": "noun",
            "BrE": "/kɪŋ/",
            "AmE": "/kɪŋ/",
            "definition": "a man who rules a country",
            "examples": [
               "The king lives in a palace.",
               "The king made a speech.",
               "He read about a famous king."
            ]
         },
         {
            "id": 46,
            "word": "kitchen",
            "role": "noun",
            "BrE": "/ˈkɪtʃɪn/",
            "AmE": "/ˈkɪtʃɪn/",
            "definition": "a room where food is prepared and cooked",
            "examples": [
               "The kitchen is clean.",
               "She cooked in the kitchen.",
               "The kitchen has new appliances."
            ]
         },
         {
            "id": 46,
            "word": "knee",
            "role": "noun",
            "BrE": "/niː/",
            "AmE": "/niː/",
            "definition": "the joint between the upper and lower leg",
            "examples": [
               "My knee hurts.",
               "She fell on her knee.",
               "He bent his knee to sit."
            ]
         },
         {
            "id": 46,
            "word": "knife",
            "role": "noun",
            "BrE": "/naɪf/",
            "AmE": "/naɪf/",
            "definition": "a tool with a sharp blade for cutting",
            "examples": [
               "I need a knife to cut.",
               "The knife is in the kitchen.",
               "She used a sharp knife."
            ]
         },
         {
            "id": 46,
            "word": "knock",
            "role": "verb",
            "BrE": "/nɒk/",
            "AmE": "/nɑːk/",
            "definition": "to hit something, like a door, to make a sound",
            "examples": [
               "Knock on the door.",
               "He knocked and entered.",
               "She knocked over the glass."
            ]
         },
         {
            "id": 46,
            "word": "know",
            "role": "verb",
            "BrE": "/nəʊ/",
            "AmE": "/noʊ/",
            "definition": "to have information in your mind",
            "examples": [
               "I know her name.",
               "She knows the answer.",
               "He knows a lot about history."
            ]
         },
         {
            "id": 46,
            "word": "knowledge",
            "role": "noun",
            "BrE": "/ˈnɒlɪdʒ/",
            "AmE": "/ˈnɑːlɪdʒ/",
            "definition": "information and understanding about a subject",
            "examples": [
               "She has good knowledge.",
               "His knowledge of math is strong.",
               "Knowledge helps in life."
            ]
         },
         {
            "id": 46,
            "word": "lake",
            "role": "noun",
            "BrE": "/leɪk/",
            "AmE": "/leɪk/",
            "definition": "a large area of water surrounded by land",
            "examples": [
               "The lake is beautiful.",
               "We swam in the lake.",
               "The lake was calm and clear."
            ]
         },
         {
            "id": 46,
            "word": "land",
            "role": "noun",
            "BrE": "/lænd/",
            "AmE": "/lænd/",
            "definition": "the surface of the earth that is not water",
            "examples": [
               "The land is green.",
               "They bought land to build.",
               "The plane landed on the land."
            ]
         },
         {
            "id": 47,
            "word": "language",
            "role": "noun",
            "BrE": "/ˈlæŋɡwɪdʒ/",
            "AmE": "/ˈlæŋɡwɪdʒ/",
            "definition": "a system of communication using words",
            "examples": [
               "English is my language.",
               "She speaks two languages.",
               "Learning a language is fun."
            ]
         },
         {
            "id": 47,
            "word": "large",
            "role": "adjective",
            "BrE": "/lɑːdʒ/",
            "AmE": "/lɑːrdʒ/",
            "definition": "big in size or amount",
            "examples": [
               "The house is large.",
               "He has a large family.",
               "A large crowd watched the game."
            ]
         },
         {
            "id": 47,
            "word": "last",
            "role": "adjective",
            "BrE": "/lɑːst/",
            "AmE": "/læst/",
            "definition": "coming after all others",
            "examples": [
               "This is the last book.",
               "She was the last to arrive.",
               "The last day was sunny."
            ]
         },
         {
            "id": 47,
            "word": "late",
            "role": "adjective",
            "BrE": "/leɪt/",
            "AmE": "/leɪt/",
            "definition": "happening or arriving after the expected time",
            "examples": [
               "I’m late for school.",
               "The train was late today.",
               "She arrived late to the meeting."
            ]
         },
         {
            "id": 47,
            "word": "laugh",
            "role": "verb",
            "BrE": "/lɑːf/",
            "AmE": "/læf/",
            "definition": "to make sounds showing you are happy or amused",
            "examples": [
               "We laugh at jokes.",
               "She laughed at his story.",
               "They laughed during the movie."
            ]
         },
         {
            "id": 47,
            "word": "law",
            "role": "noun",
            "BrE": "/lɔː/",
            "AmE": "/lɔː/",
            "definition": "a rule made by a government",
            "examples": [
               "Follow the law.",
               "The law protects people.",
               "Breaking the law is wrong."
            ]
         },
         {
            "id": 47,
            "word": "lawyer",
            "role": "noun",
            "BrE": "/ˈlɔɪə(r)/",
            "AmE": "/ˈlɔɪər/",
            "definition": "a person who gives legal advice or represents people in court",
            "examples": [
               "She’s a lawyer.",
               "The lawyer helped her case.",
               "He hired a famous lawyer."
            ]
         },
         {
            "id": 47,
            "word": "lazy",
            "role": "adjective",
            "BrE": "/ˈleɪzi/",
            "AmE": "/ˈleɪzi/",
            "definition": "not wanting to work or make an effort",
            "examples": [
               "He’s a lazy student.",
               "She felt lazy today.",
               "The lazy dog slept all day."
            ]
         },
         {
            "id": 47,
            "word": "lead",
            "role": "verb",
            "BrE": "/liːd/",
            "AmE": "/liːd/",
            "definition": "to guide or show the way",
            "examples": [
               "Lead us to the park.",
               "She led the team to victory.",
               "This road leads to the city."
            ]
         },
         {
            "id": 47,
            "word": "leader",
            "role": "noun",
            "BrE": "/ˈliːdə(r)/",
            "AmE": "/ˈliːdər/",
            "definition": "a person who is in charge of a group",
            "examples": [
               "She’s the team leader.",
               "The leader made a decision.",
               "He’s a strong leader."
            ]
         },
         {
            "id": 48,
            "word": "learn",
            "role": "verb",
            "BrE": "/lɜːn/",
            "AmE": "/lɜːrn/",
            "definition": "to gain knowledge or a skill",
            "examples": [
               "I learn English daily.",
               "She learned to play guitar.",
               "He’s learning about history."
            ]
         },
         {
            "id": 48,
            "word": "least",
            "role": "adverb",
            "BrE": "/liːst/",
            "AmE": "/liːst/",
            "definition": "to the smallest degree",
            "examples": [
               "She’s the least shy.",
               "He cares the least about sports.",
               "This is the least expensive option."
            ]
         },
         {
            "id": 48,
            "word": "leave",
            "role": "verb",
            "BrE": "/liːv/",
            "AmE": "/liːv/",
            "definition": "to go away from a place or person",
            "examples": [
               "I leave home at 8.",
               "She left the room quietly.",
               "They left for Paris yesterday."
            ]
         },
         {
            "id": 48,
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
            "id": 48,
            "word": "leg",
            "role": "noun",
            "BrE": "/leɡ/",
            "AmE": "/leɡ/",
            "definition": "one of the long parts of the body used for walking",
            "examples": [
               "My leg is tired.",
               "He broke his leg skiing.",
               "The dog has short legs."
            ]
         },
         {
            "id": 48,
            "word": "legal",
            "role": "adjective",
            "BrE": "/ˈliːɡl/",
            "AmE": "/ˈliːɡl/",
            "definition": "allowed by the law",
            "examples": [
               "It’s a legal document.",
               "Her action was legal.",
               "The legal age to drive is 17."
            ]
         },
         {
            "id": 48,
            "word": "lesson",
            "role": "noun",
            "BrE": "/ˈlesn/",
            "AmE": "/ˈlesn/",
            "definition": "a period of time when you learn something",
            "examples": [
               "I have a piano lesson.",
               "The lesson was about math.",
               "She attended an English lesson."
            ]
         },
         {
            "id": 48,
            "word": "letter",
            "role": "noun",
            "BrE": "/ˈletə(r)/",
            "AmE": "/ˈletər/",
            "definition": "a written message sent to someone",
            "examples": [
               "I wrote a letter.",
               "She received a letter today.",
               "The letter was from her friend."
            ]
         },
         {
            "id": 48,
            "word": "level",
            "role": "noun",
            "BrE": "/ˈlevl/",
            "AmE": "/ˈlevl/",
            "definition": "the amount, size, or position of something",
            "examples": [
               "The water level is high.",
               "Her English level is good.",
               "The game has many levels."
            ]
         },
         {
            "id": 48,
            "word": "library",
            "role": "noun",
            "BrE": "/ˈlaɪbrəri/",
            "AmE": "/ˈlaɪbreri/",
            "definition": "a place where books are kept for borrowing",
            "examples": [
               "I go to the library.",
               "The library has many books.",
               "She studied in the library."
            ]
         },
         {
            "id": 49,
            "word": "lie",
            "role": "verb",
            "BrE": "/laɪ/",
            "AmE": "/laɪ/",
            "definition": "to say something that is not true",
            "examples": [
               "Don’t lie to me.",
               "She lied about her age.",
               "He lied to avoid trouble."
            ]
         },
         {
            "id": 49,
            "word": "life",
            "role": "noun",
            "BrE": "/laɪf/",
            "AmE": "/laɪf/",
            "definition": "the state of being alive or the way someone lives",
            "examples": [
               "Life is beautiful.",
               "Her life is very busy.",
               "He enjoys a simple life."
            ]
         },
         {
            "id": 49,
            "word": "lift",
            "role": "verb",
            "BrE": "/lɪft/",
            "AmE": "/lɪft/",
            "definition": "to raise something to a higher position",
            "examples": [
               "Lift the box carefully.",
               "She lifted her hand to wave.",
               "He lifted the heavy bag."
            ]
         },
         {
            "id": 49,
            "word": "light",
            "role": "noun",
            "BrE": "/laɪt/",
            "AmE": "/laɪt/",
            "definition": "the energy that makes things visible",
            "examples": [
               "Turn on the light.",
               "The light is very bright.",
               "Sunlight filled the room."
            ]
         },
         {
            "id": 49,
            "word": "like",
            "role": "verb",
            "BrE": "/laɪk/",
            "AmE": "/laɪk/",
            "definition": "to enjoy or find something pleasant",
            "examples": [
               "I like to read.",
               "She likes chocolate ice cream.",
               "They like watching movies."
            ]
         },
         {
            "id": 49,
            "word": "likely",
            "role": "adjective",
            "BrE": "/ˈlaɪkli/",
            "AmE": "/ˈlaɪkli/",
            "definition": "probably going to happen",
            "examples": [
               "It’s likely to rain.",
               "She’s likely to win.",
               "The team is likely to succeed."
            ]
         },
         {
            "id": 49,
            "word": "limit",
            "role": "noun",
            "BrE": "/ˈlɪmɪt/",
            "AmE": "/ˈlɪmɪt/",
            "definition": "the greatest amount or level allowed",
            "examples": [
               "There’s a speed limit.",
               "The limit is 50 people.",
               "She reached her limit."
            ]
         },
         {
            "id": 49,
            "word": "line",
            "role": "noun",
            "BrE": "/laɪn/",
            "AmE": "/laɪn/",
            "definition": "a long, thin mark",
            "examples": [
               "Draw a straight line.",
               "The line was very long.",
               "She wrote a line of poetry."
            ]
         },
         {
            "id": 49,
            "word": "link",
            "role": "noun",
            "BrE": "/lɪŋk/",
            "AmE": "/lɪŋk/",
            "definition": "a connection between two things",
            "examples": [
               "There’s a link to the site.",
               "The link between them is strong.",
               "This link explains the topic."
            ]
         },
         {
            "id": 49,
            "word": "list",
            "role": "noun",
            "BrE": "/lɪst/",
            "AmE": "/lɪst/",
            "definition": "a series of items written or spoken",
            "examples": [
               "I made a shopping list.",
               "Her name is on the list.",
               "The list includes ten items."
            ]
         },
         {
            "id": 50,
            "word": "listen",
            "role": "verb",
            "BrE": "/ˈlɪsn/",
            "AmE": "/ˈlɪsn/",
            "definition": "to pay attention to sounds",
            "examples": [
               "Listen to the music.",
               "She listened to the teacher.",
               "He listened carefully to the story."
            ]
         },
         {
            "id": 50,
            "word": "little",
            "role": "adjective",
            "BrE": "/ˈlɪtl/",
            "AmE": "/ˈlɪtl/",
            "definition": "small in size or amount",
            "examples": [
               "It’s a little dog.",
               "She has little time to rest.",
               "The little house was cozy."
            ]
         },
         {
            "id": 50,
            "word": "live",
            "role": "verb",
            "BrE": "/lɪv/",
            "AmE": "/lɪv/",
            "definition": "to have your home in a particular place",
            "examples": [
               "I live in a city.",
               "She lives with her parents.",
               "They live near the school."
            ]
         },
         {
            "id": 50,
            "word": "local",
            "role": "adjective",
            "BrE": "/ˈləʊkl/",
            "AmE": "/ˈloʊkl/",
            "definition": "relating to a particular area or place",
            "examples": [
               "The local shop is open.",
               "He reads the local news.",
               "Local people helped the event."
            ]
         },
         {
            "id": 50,
            "word": "lock",
            "role": "verb",
            "BrE": "/lɒk/",
            "AmE": "/lɑːk/",
            "definition": "to close something with a key",
            "examples": [
               "Lock the door, please.",
               "She locked her bike outside.",
               "He locked the car carefully."
            ]
         },
         {
            "id": 50,
            "word": "long",
            "role": "adjective",
            "BrE": "/lɒŋ/",
            "AmE": "/lɔːŋ/",
            "definition": "having a great length or duration",
            "examples": [
               "The road is long.",
               "She waited for a long time.",
               "His long speech was boring."
            ]
         },
         {
            "id": 50,
            "word": "look",
            "role": "verb",
            "BrE": "/lʊk/",
            "AmE": "/lʊk/",
            "definition": "to use your eyes to see something",
            "examples": [
               "Look at the sky.",
               "She looked at the picture.",
               "He looked for his lost keys."
            ]
         },
         {
            "id": 50,
            "word": "lose",
            "role": "verb",
            "BrE": "/luːz/",
            "AmE": "/luːz/",
            "definition": "to not be able to find something",
            "examples": [
               "I lost my phone.",
               "She lost her way home.",
               "He lost the game yesterday."
            ]
         },
         {
            "id": 50,
            "word": "lot",
            "role": "noun",
            "BrE": "/lɒt/",
            "AmE": "/lɑːt/",
            "definition": "a large number or amount",
            "examples": [
               "I have a lot of books.",
               "She eats a lot of fruit.",
               "A lot of people came."
            ]
         },
         {
            "id": 50,
            "word": "love",
            "role": "verb",
            "BrE": "/lʌv/",
            "AmE": "/lʌv/",
            "definition": "to have strong feelings of affection",
            "examples": [
               "I love my family.",
               "She loves to sing songs.",
               "He loves her very much."
            ]
         },
            {
            "id": 51,
            "word": "lovely",
            "role": "adjective",
            "BrE": "/ˈlʌvli/",
            "AmE": "/ˈlʌvli/",
            "definition": "beautiful or attractive",
            "examples": [
               "It’s a lovely day.",
               "She has a lovely smile.",
               "The lovely garden was full of flowers."
            ]
         },
         {
            "id": 51,
            "word": "low",
            "role": "adjective",
            "BrE": "/ləʊ/",
            "AmE": "/loʊ/",
            "definition": "close to the ground or not high",
            "examples": [
               "The wall is low.",
               "He spoke in a low voice.",
               "The low temperature felt cold."
            ]
         },
         {
            "id": 51,
            "word": "luck",
            "role": "noun",
            "BrE": "/lʌk/",
            "AmE": "/lʌk/",
            "definition": "good things that happen by chance",
            "examples": [
               "I had good luck today.",
               "She wished him luck.",
               "His luck changed after the game."
            ]
         },
         {
            "id": 51,
            "word": "lucky",
            "role": "adjective",
            "BrE": "/ˈlʌki/",
            "AmE": "/ˈlʌki/",
            "definition": "having good luck",
            "examples": [
               "I’m lucky to be here.",
               "He’s a lucky person.",
               "She was lucky to win the prize."
            ]
         },
         {
            "id": 51,
            "word": "lunch",
            "role": "noun",
            "BrE": "/lʌntʃ/",
            "AmE": "/lʌntʃ/",
            "definition": "a meal eaten in the middle of the day",
            "examples": [
               "I ate lunch at noon.",
               "She packed lunch for school.",
               "They had lunch at a café."
            ]
         },
         {
            "id": 51,
            "word": "machine",
            "role": "noun",
            "BrE": "/məˈʃiːn/",
            "AmE": "/məˈʃiːn/",
            "definition": "a piece of equipment with moving parts",
            "examples": [
               "The machine is loud.",
               "She used a washing machine.",
               "The machine broke down yesterday."
            ]
         },
         {
            "id": 51,
            "word": "main",
            "role": "adjective",
            "BrE": "/meɪn/",
            "AmE": "/meɪn/",
            "definition": "most important or largest",
            "examples": [
               "The main door is open.",
               "The main reason was time.",
               "He lives on the main street."
            ]
         },
         {
            "id": 51,
            "word": "make",
            "role": "verb",
            "BrE": "/meɪk/",
            "AmE": "/meɪk/",
            "definition": "to create or produce something",
            "examples": [
               "I made a cake.",
               "She makes her own clothes.",
               "They made a plan for the trip."
            ]
         },
         {
            "id": 51,
            "word": "male",
            "role": "adjective",
            "BrE": "/meɪl/",
            "AmE": "/meɪl/",
            "definition": "belonging to the sex that does not give birth",
            "examples": [
               "The male lion is big.",
               "He’s a male student.",
               "Male birds are often colorful."
            ]
         },
         {
            "id": 51,
            "word": "man",
            "role": "noun",
            "BrE": "/mæn/",
            "AmE": "/mæn/",
            "definition": "an adult male person",
            "examples": [
               "The man is tall.",
               "A man helped me yesterday.",
               "The man works in an office."
            ]
         },
         {
            "id": 52,
            "word": "manager",
            "role": "noun",
            "BrE": "/ˈmænɪdʒə(r)/",
            "AmE": "/ˈmænɪdʒər/",
            "definition": "a person who controls a business or team",
            "examples": [
               "She’s the store manager.",
               "The manager gave instructions.",
               "He’s a good team manager."
            ]
         },
         {
            "id": 52,
            "word": "map",
            "role": "noun",
            "BrE": "/mæp/",
            "AmE": "/mæp/",
            "definition": "a drawing showing the features of an area",
            "examples": [
               "I need a map.",
               "The map shows the city.",
               "She followed the map to the park."
            ]
         },
         {
            "id": 52,
            "word": "mark",
            "role": "noun",
            "BrE": "/mɑːk/",
            "AmE": "/mɑːrk/",
            "definition": "a number or letter showing the quality of work",
            "examples": [
               "I got a good mark.",
               "Her mark in math was high.",
               "The teacher gave him a mark."
            ]
         },
         {
            "id": 52,
            "word": "market",
            "role": "noun",
            "BrE": "/ˈmɑːkɪt/",
            "AmE": "/ˈmɑːrkɪt/",
            "definition": "a place where goods are bought and sold",
            "examples": [
               "I go to the market.",
               "The market sells fresh fruit.",
               "She bought fish at the market."
            ]
         },
         {
            "id": 52,
            "word": "married",
            "role": "adjective",
            "BrE": "/ˈmærid/",
            "AmE": "/ˈmærid/",
            "definition": "having a husband or wife",
            "examples": [
               "She’s married now.",
               "He’s a married man.",
               "They’ve been married for years."
            ]
         },
         {
            "id": 52,
            "word": "match",
            "role": "noun",
            "BrE": "/mætʃ/",
            "AmE": "/mætʃ/",
            "definition": "a sports competition between two teams or people",
            "examples": [
               "The match was exciting.",
               "They won the football match.",
               "She watched a tennis match."
            ]
         },
         {
            "id": 52,
            "word": "material",
            "role": "noun",
            "BrE": "/məˈtɪəriəl/",
            "AmE": "/məˈtɪriəl/",
            "definition": "something used to make things, like cloth or wood",
            "examples": [
               "The material is soft.",
               "She bought material for a dress.",
               "The house is made of strong material."
            ]
         },
         {
            "id": 52,
            "word": "matter",
            "role": "noun",
            "BrE": "/ˈmætə(r)/",
            "AmE": "/ˈmætər/",
            "definition": "a subject or situation that needs attention",
            "examples": [
               "It’s an important matter.",
               "The matter needs discussion.",
               "She solved the matter quickly."
            ]
         },
         {
            "id": 52,
            "word": "meal",
            "role": "noun",
            "BrE": "/miːl/",
            "AmE": "/miːl/",
            "definition": "food eaten at a particular time",
            "examples": [
               "I ate a big meal.",
               "Dinner is my favorite meal.",
               "She cooked a healthy meal."
            ]
         },
         {
            "id": 52,
            "word": "mean",
            "role": "verb",
            "BrE": "/miːn/",
            "AmE": "/miːn/",
            "definition": "to have a particular meaning or intention",
            "examples": [
               "What does this word mean?",
               "She didn’t mean to hurt you.",
               "His smile meant he was happy."
            ]
         },
         {
            "id": 53,
            "word": "meaning",
            "role": "noun",
            "BrE": "/ˈmiːnɪŋ/",
            "AmE": "/ˈmiːnɪŋ/",
            "definition": "what something represents or expresses",
            "examples": [
               "What’s the meaning of this?",
               "The word has two meanings.",
               "The meaning of the story was clear."
            ]
         },
         {
            "id": 53,
            "word": "meat",
            "role": "noun",
            "BrE": "/miːt/",
            "AmE": "/miːt/",
            "definition": "the flesh of animals used as food",
            "examples": [
               "I don’t eat meat.",
               "She cooked meat for dinner.",
               "The meat was fresh and tasty."
            ]
         },
         {
            "id": 53,
            "word": "media",
            "role": "noun",
            "BrE": "/ˈmiːdiə/",
            "AmE": "/ˈmiːdiə/",
            "definition": "ways of communicating information, like TV or newspapers",
            "examples": [
               "The media reported the news.",
               "She works in the media.",
               "Social media is popular now."
            ]
         },
         {
            "id": 53,
            "word": "medical",
            "role": "adjective",
            "BrE": "/ˈmedɪkl/",
            "AmE": "/ˈmedɪkl/",
            "definition": "related to medicine or health",
            "examples": [
               "He needs medical help.",
               "She studies medical science.",
               "The medical team was ready."
            ]
         },
         {
            "id": 53,
            "word": "medicine",
            "role": "noun",
            "BrE": "/ˈmedɪsn/",
            "AmE": "/ˈmedɪsn/",
            "definition": "a substance used to treat illness",
            "examples": [
               "Take this medicine.",
               "The medicine helped her cold.",
               "He forgot his medicine at home."
            ]
         },
         {
            "id": 53,
            "word": "meet",
            "role": "verb",
            "BrE": "/miːt/",
            "AmE": "/miːt/",
            "definition": "to come together with someone",
            "examples": [
               "Let’s meet at the park.",
               "She met her friend yesterday.",
               "They meet every week."
            ]
         },
         {
            "id": 53,
            "word": "meeting",
            "role": "noun",
            "BrE": "/ˈmiːtɪŋ/",
            "AmE": "/ˈmiːtɪŋ/",
            "definition": "an event where people discuss something",
            "examples": [
               "The meeting is at 10.",
               "She attended a work meeting.",
               "The meeting lasted two hours."
            ]
         },
         {
            "id": 53,
            "word": "member",
            "role": "noun",
            "BrE": "/ˈmembə(r)/",
            "AmE": "/ˈmembər/",
            "definition": "a person who belongs to a group or organization",
            "examples": [
               "I’m a club member.",
               "She’s a new team member.",
               "All members voted today."
            ]
         },
         {
            "id": 53,
            "word": "memory",
            "role": "noun",
            "BrE": "/ˈmeməri/",
            "AmE": "/ˈmeməri/",
            "definition": "the ability to remember or something you remember",
            "examples": [
               "I have a good memory.",
               "Her memory of the trip was clear.",
               "Memories make her happy."
            ]
         },
         {
            "id": 53,
            "word": "menu",
            "role": "noun",
            "BrE": "/ˈmenjuː/",
            "AmE": "/ˈmenjuː/",
            "definition": "a list of food available in a restaurant",
            "examples": [
               "The menu has pizza.",
               "She read the menu carefully.",
               "The restaurant updated its menu."
            ]
         },
         {
            "id": 54,
            "word": "message",
            "role": "noun",
            "BrE": "/ˈmesɪdʒ/",
            "AmE": "/ˈmesɪdʒ/",
            "definition": "a piece of information sent to someone",
            "examples": [
               "I sent a message.",
               "She got a text message.",
               "His message was very clear."
            ]
         },
         {
            "id": 54,
            "word": "method",
            "role": "noun",
            "BrE": "/ˈmeθəd/",
            "AmE": "/ˈmeθəd/",
            "definition": "a way of doing something",
            "examples": [
               "This is a good method.",
               "Her method works well.",
               "They used a new teaching method."
            ]
         },
         {
            "id": 54,
            "word": "middle",
            "role": "noun",
            "BrE": "/ˈmɪdl/",
            "AmE": "/ˈmɪdl/",
            "definition": "the central point or position",
            "examples": [
               "Stand in the middle.",
               "The middle of the book is exciting.",
               "She sat in the middle row."
            ]
         },
         {
            "id": 54,
            "word": "mind",
            "role": "noun",
            "BrE": "/maɪnd/",
            "AmE": "/maɪnd/",
            "definition": "the part of a person that thinks and feels",
            "examples": [
               "My mind is tired.",
               "She changed her mind.",
               "He has a sharp mind."
            ]
         },
         {
            "id": 54,
            "word": "minute",
            "role": "noun",
            "BrE": "/ˈmɪnɪt/",
            "AmE": "/ˈmɪnɪt/",
            "definition": "a period of 60 seconds",
            "examples": [
               "Wait a minute.",
               "The meeting lasted 30 minutes.",
               "She arrived a minute late."
            ]
         },
         {
            "id": 54,
            "word": "miss",
            "role": "verb",
            "BrE": "/mɪs/",
            "AmE": "/mɪs/",
            "definition": "to not catch, see, or hit something",
            "examples": [
               "I missed the bus.",
               "She missed the ball.",
               "He missed his chance to win."
            ]
         },
         {
            "id": 54,
            "word": "mistake",
            "role": "noun",
            "BrE": "/mɪˈsteɪk/",
            "AmE": "/mɪˈsteɪk/",
            "definition": "something that is incorrect",
            "examples": [
               "I made a mistake.",
               "Her mistake was small.",
               "The mistake cost them time."
            ]
         },
         {
            "id": 54,
            "word": "mix",
            "role": "verb",
            "BrE": "/mɪks/",
            "AmE": "/mɪks/",
            "definition": "to combine things together",
            "examples": [
               "Mix the sugar and flour.",
               "She mixed colors for painting.",
               "They mixed ideas for the project."
            ]
         },
         {
            "id": 54,
            "word": "model",
            "role": "noun",
            "BrE": "/ˈmɒdl/",
            "AmE": "/ˈmɑːdl/",
            "definition": "a small copy of something or a person who shows clothes",
            "examples": [
               "He built a model plane.",
               "She’s a fashion model.",
               "The model car was detailed."
            ]
         },
         {
            "id": 54,
            "word": "modern",
            "role": "adjective",
            "BrE": "/ˈmɒdn/",
            "AmE": "/ˈmɑːdərn/",
            "definition": "new and using the latest ideas or technology",
            "examples": [
               "This is a modern phone.",
               "Her house is very modern.",
               "Modern art is interesting."
            ]
         },
         {
            "id": 55,
            "word": "moment",
            "role": "noun",
            "BrE": "/ˈməʊmənt/",
            "AmE": "/ˈmoʊmənt/",
            "definition": "a very short period of time",
            "examples": [
               "Wait a moment, please.",
               "The moment was special.",
               "She paused for a moment."
            ]
         },
         {
            "id": 55,
            "word": "money",
            "role": "noun",
            "BrE": "/ˈmʌni/",
            "AmE": "/ˈmʌni/",
            "definition": "what you use to buy things",
            "examples": [
               "I need some money.",
               "She saved money for a car.",
               "Money is in the wallet."
            ]
         },
         {
            "id": 55,
            "word": "month",
            "role": "noun",
            "BrE": "/mʌnθ/",
            "AmE": "/mʌnθ/",
            "definition": "one of the twelve periods in a year",
            "examples": [
               "January is a cold month.",
               "She worked for a month.",
               "The trip lasted one month."
            ]
         },
         {
            "id": 55,
            "word": "moon",
            "role": "noun",
            "BrE": "/muːn/",
            "AmE": "/muːn/",
            "definition": "the large object in the sky seen at night",
            "examples": [
               "The moon is bright.",
               "She looked at the full moon.",
               "The moon was hidden by clouds."
            ]
         },
         {
            "id": 55,
            "word": "more",
            "role": "determiner",
            "BrE": "/mɔː(r)/",
            "AmE": "/mɔːr/",
            "definition": "a larger amount or number",
            "examples": [
               "I want more food.",
               "She needs more time.",
               "More people came to the party."
            ]
         },
         {
            "id": 55,
            "word": "morning",
            "role": "noun",
            "BrE": "/ˈmɔːnɪŋ/",
            "AmE": "/ˈmɔːrnɪŋ/",
            "definition": "the early part of the day",
            "examples": [
               "Good morning!",
               "She runs every morning.",
               "The morning was sunny and warm."
            ]
         },
         {
            "id": 55,
            "word": "most",
            "role": "determiner",
            "BrE": "/məʊst/",
            "AmE": "/moʊst/",
            "definition": "the largest amount or number",
            "examples": [
               "Most people like music.",
               "She ate most of the cake.",
               "Most students passed the test."
            ]
         },
         {
            "id": 55,
            "word": "mother",
            "role": "noun",
            "BrE": "/ˈmʌðə(r)/",
            "AmE": "/ˈmʌðər/",
            "definition": "a female parent",
            "examples": [
               "My mother is kind.",
               "She called her mother.",
               "Her mother works as a teacher."
            ]
         },
         {
            "id": 55,
            "word": "mountain",
            "role": "noun",
            "BrE": "/ˈmaʊntən/",
            "AmE": "/ˈmaʊntən/",
            "definition": "a very high hill",
            "examples": [
               "The mountain is tall.",
               "They climbed the mountain.",
               "Snow covered the mountain."
            ]
         },
         {
            "id": 55,
            "word": "mouth",
            "role": "noun",
            "BrE": "/maʊθ/",
            "AmE": "/maʊθ/",
            "definition": "the part of the face used for eating and speaking",
            "examples": [
               "Open your mouth.",
               "She smiled with her mouth.",
               "Food was stuck in his mouth."
            ]
         },
         {
            "id": 56,
            "word": "move",
            "role": "verb",
            "BrE": "/muːv/",
            "AmE": "/muːv/",
            "definition": "to change position or place",
            "examples": [
               "Move the chair here.",
               "She moved to a new city.",
               "He moved the box carefully."
            ]
         },
         {
            "id": 56,
            "word": "movie",
            "role": "noun",
            "BrE": "/ˈmuːvi/",
            "AmE": "/ˈmuːvi/",
            "definition": "a story shown on a screen, like in a cinema",
            "examples": [
               "I watched a movie.",
               "The movie was very funny.",
               "She loves action movies."
            ]
         },
         {
            "id": 56,
            "word": "music",
            "role": "noun",
            "BrE": "/ˈmjuːzɪk/",
            "AmE": "/ˈmjuːzɪk/",
            "definition": "sounds arranged in a way that is pleasant to hear",
            "examples": [
               "I listen to music.",
               "She plays music on the piano.",
               "The music was loud and fun."
            ]
         },
         {
            "id": 56,
            "word": "musical",
            "role": "adjective",
            "BrE": "/ˈmjuːzɪkl/",
            "AmE": "/ˈmjuːzɪkl/",
            "definition": "related to music",
            "examples": [
               "He plays a musical instrument.",
               "The musical show was great.",
               "She has a musical voice."
            ]
         },
         {
            "id": 56,
            "word": "name",
            "role": "noun",
            "BrE": "/neɪm/",
            "AmE": "/neɪm/",
            "definition": "the word or words used to identify a person or thing",
            "examples": [
               "My name is Anna.",
               "What’s the name of this book?",
               "She wrote her name on the paper."
            ]
         },
         {
            "id": 56,
            "word": "nation",
            "role": "noun",
            "BrE": "/ˈneɪʃn/",
            "AmE": "/ˈneɪʃn/",
            "definition": "a country or its people",
            "examples": [
               "The nation celebrated.",
               "She’s proud of her nation.",
               "The nation voted for a leader."
            ]
         },
         {
            "id": 56,
            "word": "national",
            "role": "adjective",
            "BrE": "/ˈnæʃnəl/",
            "AmE": "/ˈnæʃnəl/",
            "definition": "relating to a whole country",
            "examples": [
               "It’s a national holiday.",
               "The national team won.",
               "She watches national news."
            ]
         },
         {
            "id": 56,
            "word": "natural",
            "role": "adjective",
            "BrE": "/ˈnætʃrəl/",
            "AmE": "/ˈnætʃrəl/",
            "definition": "existing in nature, not made by people",
            "examples": [
               "The lake is natural.",
               "She has natural beauty.",
               "Natural resources are important."
            ]
         },
         {
            "id": 56,
            "word": "nature",
            "role": "noun",
            "BrE": "/ˈneɪtʃə(r)/",
            "AmE": "/ˈneɪtʃər/",
            "definition": "the physical world, including plants and animals",
            "examples": [
               "I love nature.",
               "Nature is beautiful in spring.",
               "They protect nature in the park."
            ]
         },
         {
            "id": 56,
            "word": "near",
            "role": "preposition",
            "BrE": "/nɪə(r)/",
            "AmE": "/nɪr/",
            "definition": "close to something in distance",
            "examples": [
               "The shop is near.",
               "She lives near the school.",
               "The park is near my house."
            ]
         },
         {
            "id": 57,
            "word": "necessary",
            "role": "adjective",
            "BrE": "/ˈnesəsəri/",
            "AmE": "/ˈnesəseri/",
            "definition": "needed to achieve something",
            "examples": [
               "Water is necessary.",
               "It’s necessary to study.",
               "The tool is necessary for the job."
            ]
         },
         {
            "id": 57,
            "word": "neck",
            "role": "noun",
            "BrE": "/nek/",
            "AmE": "/nek/",
            "definition": "the part of the body between the head and shoulders",
            "examples": [
               "My neck hurts.",
               "She wore a scarf around her neck.",
               "The necklace was on her neck."
            ]
         },
         {
            "id": 57,
            "word": "need",
            "role": "verb",
            "BrE": "/niːd/",
            "AmE": "/niːd/",
            "definition": "to require something",
            "examples": [
               "I need a pen.",
               "She needs help with math.",
               "They need food for the party."
            ]
         },
         {
            "id": 57,
            "word": "neighbour",
            "role": "noun",
            "BrE": "/ˈneɪbə(r)/",
            "AmE": "/ˈneɪbər/",
            "definition": "a person who lives near you",
            "examples": [
               "My neighbour is kind.",
               "The neighbour has a dog.",
               "She helped her neighbour."
            ]
         },
         {
            "id": 57,
            "word": "network",
            "role": "noun",
            "BrE": "/ˈnetwɜːk/",
            "AmE": "/ˈnetwɜːrk/",
            "definition": "a group of people or things that are connected",
            "examples": [
               "The network is fast.",
               "She joined a social network.",
               "The computer network crashed."
            ]
         },
         {
            "id": 57,
            "word": "never",
            "role": "adverb",
            "BrE": "/ˈnevə(r)/",
            "AmE": "/ˈnevər/",
            "definition": "not at any time",
            "examples": [
               "I never eat meat.",
               "She never forgets names.",
               "He never visited that city."
            ]
         },
         {
            "id": 57,
            "word": "new",
            "role": "adjective",
            "BrE": "/njuː/",
            "AmE": "/nuː/",
            "definition": "recently made or started",
            "examples": [
               "I have a new phone.",
               "She started a new job.",
               "The new rules are strict."
            ]
         },
         {
            "id": 57,
            "word": "news",
            "role": "noun",
            "BrE": "/njuːz/",
            "AmE": "/nuːz/",
            "definition": "new information about recent events",
            "examples": [
               "I heard the news.",
               "The news was on TV.",
               "She shared good news."
            ]
         },
         {
            "id": 57,
            "word": "newspaper",
            "role": "noun",
            "BrE": "/ˈnjuːzpeɪpə(r)/",
            "AmE": "/ˈnuːzpeɪpər/",
            "definition": "a publication with news and stories",
            "examples": [
               "I read the newspaper.",
               "The newspaper had good articles.",
               "She buys a newspaper daily."
            ]
         },
         {
            "id": 57,
            "word": "next",
            "role": "adjective",
            "BrE": "/nekst/",
            "AmE": "/nekst/",
            "definition": "coming immediately after",
            "examples": [
               "The next bus is late.",
               "She’s in the next room.",
               "The next meeting is tomorrow."
            ]
         },
         {
            "id": 58,
            "word": "nice",
            "role": "adjective",
            "BrE": "/naɪs/",
            "AmE": "/naɪs/",
            "definition": "pleasant or enjoyable",
            "examples": [
               "It’s a nice day.",
               "She’s a nice teacher.",
               "The nice weather helped the picnic."
            ]
         },
         {
            "id": 58,
            "word": "night",
            "role": "noun",
            "BrE": "/naɪt/",
            "AmE": "/naɪt/",
            "definition": "the time when it is dark outside",
            "examples": [
               "I sleep at night.",
               "The night was cold.",
               "They danced all night."
            ]
         },
         {
            "id": 58,
            "word": "noise",
            "role": "noun",
            "BrE": "/nɔɪz/",
            "AmE": "/nɔɪz/",
            "definition": "a loud or unpleasant sound",
            "examples": [
               "The noise woke me.",
               "She heard a strange noise.",
               "The noise came from the street."
            ]
         },
         {
            "id": 58,
            "word": "noisy",
            "role": "adjective",
            "BrE": "/ˈnɔɪzi/",
            "AmE": "/ˈnɔɪzi/",
            "definition": "making a lot of noise",
            "examples": [
               "The room is noisy.",
               "Noisy cars passed by.",
               "The noisy party kept us awake."
            ]
         },
         {
            "id": 58,
            "word": "none",
            "role": "pronoun",
            "BrE": "/nʌn/",
            "AmE": "/nʌn/",
            "definition": "not one or not any",
            "examples": [
               "None of them came.",
               "She has none left.",
               "None of the books were new."
            ]
         },
         {
            "id": 58,
            "word": "normal",
            "role": "adjective",
            "BrE": "/ˈnɔːml/",
            "AmE": "/ˈnɔːrml/",
            "definition": "usual or typical",
            "examples": [
               "It’s a normal day.",
               "Her temperature is normal.",
               "The normal routine was followed."
            ]
         },
         {
            "id": 58,
            "word": "north",
            "role": "noun",
            "BrE": "/nɔːθ/",
            "AmE": "/nɔːrθ/",
            "definition": "the direction towards the top of a map",
            "examples": [
               "We’re going north.",
               "The north is cold.",
               "The city is in the north."
            ]
         },
         {
            "id": 58,
            "word": "nose",
            "role": "noun",
            "BrE": "/nəʊz/",
            "AmE": "/noʊz/",
            "definition": "the part of the face used for smelling",
            "examples": [
               "My nose is cold.",
               "She touched her nose.",
               "The dog sniffed with its nose."
            ]
         },
         {
            "id": 58,
            "word": "note",
            "role": "noun",
            "BrE": "/nəʊt/",
            "AmE": "/noʊt/",
            "definition": "a short written message or record",
            "examples": [
               "I wrote a note.",
               "She left a note for him.",
               "His note was on the table."
            ]
         },
         {
            "id": 58,
            "word": "nothing",
            "role": "pronoun",
            "BrE": "/ˈnʌθɪŋ/",
            "AmE": "/ˈnʌθɪŋ/",
            "definition": "not anything",
            "examples": [
               "There’s nothing in the box.",
               "She said nothing about it.",
               "Nothing happened during the trip."
            ]
         },
         {
            "id": 59,
            "word": "notice",
            "role": "verb",
            "BrE": "/ˈnəʊtɪs/",
            "AmE": "/ˈnoʊtɪs/",
            "definition": "to see or become aware of something",
            "examples": [
               "I noticed a bird.",
               "She noticed his new shoes.",
               "He didn’t notice the mistake."
            ]
         },
         {
            "id": 59,
            "word": "number",
            "role": "noun",
            "BrE": "/ˈnʌmbə(r)/",
            "AmE": "/ˈnʌmbər/",
            "definition": "a word or symbol that shows an amount",
            "examples": [
               "My number is five.",
               "She wrote down the number.",
               "The number of students grew."
            ]
         },
         {
            "id": 59,
            "word": "nurse",
            "role": "noun",
            "BrE": "/nɜːs/",
            "AmE": "/nɜːrs/",
            "definition": "a person who cares for sick or injured people",
            "examples": [
               "The nurse helped me.",
               "She’s a nurse at the hospital.",
               "The nurse checked his temperature."
            ]
         },
         {
            "id": 59,
            "word": "object",
            "role": "noun",
            "BrE": "/ˈɒbdʒɪkt/",
            "AmE": "/ˈɑːbdʒɪkt/",
            "definition": "a thing that can be seen or touched",
            "examples": [
               "What’s that object?",
               "The object fell on the floor.",
               "She picked up a small object."
            ]
         },
         {
            "id": 59,
            "word": "occasion",
            "role": "noun",
            "BrE": "/əˈkeɪʒn/",
            "AmE": "/əˈkeɪʒn/",
            "definition": "a special event or time",
            "examples": [
               "It’s a special occasion.",
               "The occasion was a wedding.",
               "She dressed up for the occasion."
            ]
         },
         {
            "id": 59,
            "word": "offer",
            "role": "verb",
            "BrE": "/ˈɒfə(r)/",
            "AmE": "/ˈɔːfər/",
            "definition": "to give or provide something to someone",
            "examples": [
               "He offered me a drink.",
               "She offered to help.",
               "They offered a discount."
            ]
         },
         {
            "id": 59,
            "word": "office",
            "role": "noun",
            "BrE": "/ˈɒfɪs/",
            "AmE": "/ˈɔːfɪs/",
            "definition": "a place where people work, often at desks",
            "examples": [
               "I work in an office.",
               "The office is big.",
               "She left her bag in the office."
            ]
         },
         {
            "id": 59,
            "word": "often",
            "role": "adverb",
            "BrE": "/ˈɒfn/",
            "AmE": "/ˈɔːfn/",
            "definition": "many times",
            "examples": [
               "I often read books.",
               "She often visits her family.",
               "He often walks to school."
            ]
         },
         {
            "id": 59,
            "word": "oil",
            "role": "noun",
            "BrE": "/ɔɪl/",
            "AmE": "/ɔɪl/",
            "definition": "a thick liquid used for cooking or fuel",
            "examples": [
               "I cook with oil.",
               "The car needs oil.",
               "Olive oil is healthy."
            ]
         },
         {
            "id": 59,
            "word": "old",
            "role": "adjective",
            "BrE": "/əʊld/",
            "AmE": "/oʊld/",
            "definition": "having lived or existed for a long time",
            "examples": [
               "The house is old.",
               "She has an old book.",
               "The old man walked slowly."
            ]
         },
         {
            "id": 60,
            "word": "once",
            "role": "adverb",
            "BrE": "/wʌns/",
            "AmE": "/wʌns/",
            "definition": "one time only",
            "examples": [
               "I went once.",
               "She called me once.",
               "He visited the city once."
            ]
         },
         {
            "id": 60,
            "word": "online",
            "role": "adjective",
            "BrE": "/ˌɒnˈlaɪn/",
            "AmE": "/ˌɑːnˈlaɪn/",
            "definition": "connected to or done on the internet",
            "examples": [
               "I shop online.",
               "The online game is fun.",
               "She took an online course."
            ]
         },
         {
            "id": 60,
            "word": "open",
            "role": "verb",
            "BrE": "/ˈəʊpən/",
            "AmE": "/ˈoʊpən/",
            "definition": "to move something so it is not closed",
            "examples": [
               "Open the door, please.",
               "She opened the window.",
               "He opened the book to read."
            ]
         },
         {
            "id": 60,
            "word": "opinion",
            "role": "noun",
            "BrE": "/əˈpɪnjən/",
            "AmE": "/əˈpɪnjən/",
            "definition": "what someone thinks about something",
            "examples": [
               "What’s your opinion?",
               "Her opinion was clear.",
               "They have different opinions."
            ]
         },
         {
            "id": 60,
            "word": "opportunity",
            "role": "noun",
            "BrE": "/ˌɒpəˈtjuːnəti/",
            "AmE": "/ˌɑːpərˈtuːnəti/",
            "definition": "a chance to do something",
            "examples": [
               "It’s a good opportunity.",
               "She got a job opportunity.",
               "He took the opportunity to learn."
            ]
         },
         {
            "id": 60,
            "word": "opposite",
            "role": "adjective",
            "BrE": "/ˈɒpəzɪt/",
            "AmE": "/ˈɑːpəzɪt/",
            "definition": "completely different or facing each other",
            "examples": [
               "They sat opposite me.",
               "Her ideas are opposite mine.",
               "The house is opposite the park."
            ]
         },
         {
            "id": 60,
            "word": "option",
            "role": "noun",
            "BrE": "/ˈɒpʃn/",
            "AmE": "/ˈɑːpʃn/",
            "definition": "something that you can choose",
            "examples": [
               "I have two options.",
               "She chose the best option.",
               "The menu has many options."
            ]
         },
         {
            "id": 60,
            "word": "order",
            "role": "noun",
            "BrE": "/ˈɔːdə(r)/",
            "AmE": "/ˈɔːrdər/",
            "definition": "a request for something to be made or delivered",
            "examples": [
               "I placed an order.",
               "Her order arrived quickly.",
               "The order was for pizza."
            ]
         },
         {
            "id": 60,
            "word": "organization",
            "role": "noun",
            "BrE": "/ˌɔːɡənaɪˈzeɪʃn/",
            "AmE": "/ˌɔːrɡənəˈzeɪʃn/",
            "definition": "a group of people working together for a purpose",
            "examples": [
               "She joined an organization.",
               "The organization helps animals.",
               "He works for a big organization."
            ]
         },
         {
            "id": 60,
            "word": "original",
            "role": "adjective",
            "BrE": "/əˈrɪdʒənl/",
            "AmE": "/əˈrɪdʒənl/",
            "definition": "new and not copied",
            "examples": [
               "It’s an original idea.",
               "She drew an original picture.",
               "The original book was better."
            ]
         },
            {
            "id": 61,
            "word": "other",
            "role": "adjective",
            "BrE": "/ˈʌðə(r)/",
            "AmE": "/ˈʌðər/",
            "definition": "different or additional",
            "examples": [
               "I have other books.",
               "She chose the other dress.",
               "The other team played well."
            ]
         },
         {
            "id": 61,
            "word": "outside",
            "role": "preposition",
            "BrE": "/ˌaʊtˈsaɪd/",
            "AmE": "/ˌaʊtˈsaɪd/",
            "definition": "on or to the outer side of something",
            "examples": [
               "Wait outside the shop.",
               "The dog is outside.",
               "She parked outside the house."
            ]
         },
         {
            "id": 61,
            "word": "own",
            "role": "adjective",
            "BrE": "/əʊn/",
            "AmE": "/oʊn/",
            "definition": "belonging to a particular person",
            "examples": [
               "This is my own pen.",
               "She has her own room.",
               "He built his own house."
            ]
         },
         {
            "id": 61,
            "word": "page",
            "role": "noun",
            "BrE": "/peɪdʒ/",
            "AmE": "/peɪdʒ/",
            "definition": "one side of a sheet of paper in a book",
            "examples": [
               "Turn to page ten.",
               "She read a page quickly.",
               "The page was full of pictures."
            ]
         },
         {
            "id": 61,
            "word": "pain",
            "role": "noun",
            "BrE": "/peɪn/",
            "AmE": "/peɪn/",
            "definition": "the feeling when you are hurt",
            "examples": [
               "I feel pain in my leg.",
               "Her pain was strong.",
               "The pain stopped after medicine."
            ]
         },
         {
            "id": 61,
            "word": "paint",
            "role": "verb",
            "BrE": "/peɪnt/",
            "AmE": "/peɪnt/",
            "definition": "to put color on something using a brush",
            "examples": [
               "I paint the wall.",
               "She painted her room blue.",
               "He painted a beautiful picture."
            ]
         },
         {
            "id": 61,
            "word": "painting",
            "role": "noun",
            "BrE": "/ˈpeɪntɪŋ/",
            "AmE": "/ˈpeɪntɪŋ/",
            "definition": "a picture made with paint",
            "examples": [
               "The painting is pretty.",
               "She hung a painting on the wall.",
               "His painting won a prize."
            ]
         },
         {
            "id": 61,
            "word": "pair",
            "role": "noun",
            "BrE": "/peə(r)/",
            "AmE": "/per/",
            "definition": "two things of the same type used together",
            "examples": [
               "I have a pair of shoes.",
               "She bought a pair of gloves.",
               "The pair of socks is new."
            ]
         },
         {
            "id": 61,
            "word": "paper",
            "role": "noun",
            "BrE": "/ˈpeɪpə(r)/",
            "AmE": "/ˈpeɪpər/",
            "definition": "material used for writing or printing",
            "examples": [
               "I need some paper.",
               "She wrote on the paper.",
               "The paper was full of notes."
            ]
         },
         {
            "id": 61,
            "word": "parent",
            "role": "noun",
            "BrE": "/ˈpeərənt/",
            "AmE": "/ˈperənt/",
            "definition": "a mother or father",
            "examples": [
               "My parent is at home.",
               "Her parents are teachers.",
               "The parent helped with homework."
            ]
         },
         {
            "id": 62,
            "word": "park",
            "role": "noun",
            "BrE": "/pɑːk/",
            "AmE": "/pɑːrk/",
            "definition": "a public area with grass and trees",
            "examples": [
               "I play in the park.",
               "The park is near my house.",
               "She walked through the park."
            ]
         },
         {
            "id": 62,
            "word": "part",
            "role": "noun",
            "BrE": "/pɑːt/",
            "AmE": "/pɑːrt/",
            "definition": "a piece or section of something",
            "examples": [
               "This is a part of the book.",
               "She ate part of the cake.",
               "The part was hard to find."
            ]
         },
         {
            "id": 62,
            "word": "party",
            "role": "noun",
            "BrE": "/ˈpɑːti/",
            "AmE": "/ˈpɑːrti/",
            "definition": "a social event with people and food",
            "examples": [
               "I’m at a party.",
               "The party was fun.",
               "She planned a birthday party."
            ]
         },
         {
            "id": 62,
            "word": "pass",
            "role": "verb",
            "BrE": "/pɑːs/",
            "AmE": "/pæs/",
            "definition": "to go past something or someone",
            "examples": [
               "The car passed us.",
               "She passed the test easily.",
               "He passed the ball to her."
            ]
         }
   
      ]
   }

   const specificLessonWords = data.wordList.filter((item) => {
      return item.id == slug
   })

   return (
      <div className={styles.container}>

         <div className={styles.lessonTitle}>Lesson {lessonNumber}</div>
         <div className={styles.lessonLevel}>A2</div>

         {stage === 'assessment' && (
            <div className={styles.assessCard}>
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
   
         {stage === 'learning' && (
         <div className={styles.learnCard}>
            <p className={styles.title}>The words you ned to learn</p>
            {(() => {
               const learningWords = [...partialWords, ...unknownWords];
               if (learningWords.length === 0) {
                  return <div className={styles.done}>
               <div className={styles.doneTitle}>All done. Brilliant :)</div>
               <div className={styles.btnHolder}>
                  <Link href='/a2' className={styles.back}>Done</Link>
                  {
                     lessonNumber < 62 ?
                     <Link href={`/a2/${lessonNumber + 1}`} className={styles.back}>Next Lesson</Link>
                     :
                     <Link href='/a2' className={styles.back}>Start A2</Link>
                  }
               </div>
            </div>
               }
               const ws = learningWords[learningWordIndex];
               return (
               <div className={styles.wordBlock}>
                  <div className={styles.wordHolder}>
                     <p className={styles.wordTitle}>{ws.word.word}</p>
                     <div className={styles.infoHolder}>
                        <p className={styles.phonetics}>{ws.word.AmE}</p>
                        <p className={styles.phonetics}>{ws.word.BrE}</p>
                        <div className={styles.role}>{specificLessonWords[currentWordIndex].role}</div>
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
                              Review Again
                           </button>
                           {
                           lessonNumber < 62 ?
                              <Link href={`/a2/${lessonNumber + 1}`} className={styles.button}>Next Lesson</Link>
                              :
                              <Link href='/a2' className={styles.button}>Start A2</Link>  
                           }
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
                        <div className={styles.role}>{specificLessonWords[currentWordIndex].role}</div>
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
                  lessonNumber < 62 ?
                  <Link href={`/a2/${lessonNumber + 1}`} className={styles.button}>Next Lesson</Link>
                  :
                  <Link href='/a2' className={styles.button}>Start A2</Link>
               }

               <Link href='/a2'
                  className={styles.button}
               >
                  Done
               </Link>
            </div>
         </div>
      )}
      </div>
   );
}













