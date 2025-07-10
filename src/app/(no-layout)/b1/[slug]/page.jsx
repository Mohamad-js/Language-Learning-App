'use client';
import { useState, useEffect } from 'react';
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
   const [savedB1Vocabs, setSavedB1Vocabs] = useState([])

   const { slug } = params;

   useEffect(() => {
      setLessonNumber(Number(slug))
   }, [slug])

// Retrieve data from localStorage on mount
   useEffect(() => {
      try {
         const savedKnowns = JSON.parse(localStorage.getItem(`knownWords-${slug}-B1`) || '[]');
         const savedUnknowns = JSON.parse(localStorage.getItem(`unknownWords-${slug}-B1`) || '[]');
         const savedPartials = JSON.parse(localStorage.getItem(`partialWords-${slug}-B1`) || '[]');

         setKnownWords(savedKnowns);
         setUnknownWords(savedUnknowns);
         setPartialWords(savedPartials);
      } catch (e) {
         console.error('Error parsing localStorage data:', e);
      }
   }, [slug]); // Depend on slug to reload when lesson changes

   // Save data to localStorage when state changes
   // useEffect(() => {
   //    try {
   //       localStorage.setItem(`knownWords-${slug}-B1`, JSON.stringify(knownWords));
   //       localStorage.setItem(`partialWords-${slug}-B1`, JSON.stringify(partialWords));
   //       localStorage.setItem(`unknownWords-${slug}-B1`, JSON.stringify(unknownWords));

   //    } catch (e) {
   //       console.error('Error saving to localStorage:', e);
   //    }
   // }, [knownWords, partialWords, unknownWords, slug]);
   
   const saveProgress = () => {
      try {
         localStorage.setItem(`knownWords-${slug}-B1`, JSON.stringify(knownWords));
         localStorage.setItem(`partialWords-${slug}-B1`, JSON.stringify(partialWords));
         localStorage.setItem(`unknownWords-${slug}-B1`, JSON.stringify(unknownWords));
   
      } catch (e) {
         console.error('Error saving to localStorage:', e);
      }

   }

   // Save data to localStorage when state changes
   useEffect(() => {
      try {
         localStorage.setItem(`savedB1Vocabs-${slug}-B1`, JSON.stringify(savedB1Vocabs));

      } catch (e) {
         console.error('Error saving to localStorage:', e);
      }
   }, [savedB1Vocabs, slug]);

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
         "word": "absolutely",
         "role": "adverb",
         "BrE": "/ˈæbsəluːtli/",
         "AmE": "/ˈæbsəluːtli/",
         "definition": "completely or totally",
         "examples": [
            "I absolutely love chocolate.",
            "She was absolutely sure of her decision.",
            "The results were absolutely conclusive, leaving no room for doubt."
         ]
      },
      {
         "id": 1,
         "word": "academic",
         "role": "adjective",
         "BrE": "/ˌækəˈdemɪk/",
         "AmE": "/ˌækəˈdemɪk/",
         "definition": "relating to education, especially at college or university level",
         "examples": [
            "He is good at academic subjects.",
            "Her academic performance was excellent.",
            "The academic standards of the university are very high."
         ]
      },
      {
         "id": 1,
         "word": "access",
         "role": "noun",
         "BrE": "/ˈækses/",
         "AmE": "/ˈækses/",
         "definition": "the opportunity or right to use something or to see somebody/something",
         "examples": [
            "I have access to the internet.",
            "Students need access to the library for research.",
            "Unauthorized access to the database is prohibited."
         ]
      },
      {
         "id": 1,
         "word": "accommodation",
         "role": "noun",
         "BrE": "/əˌkɒməˈdeɪʃn/",
         "AmE": "/əˌkɑːməˈdeɪʃn/",
         "definition": "a place to live, work or stay in",
         "examples": [
            "We need accommodation for the night.",
            "The hotel offers comfortable accommodation.",
            "Finding affordable accommodation in the city was challenging."
         ]
      },
      {
         "id": 1,
         "word": "account",
         "role": "noun",
         "BrE": "/əˈkaʊnt/",
         "AmE": "/əˈkaʊnt/",
         "definition": "an arrangement with a bank to keep your money there and to allow you to take it out when you need to",
         "examples": [
            "I have a bank account.",
            "She opened a savings account last week.",
            "Managing multiple bank accounts requires careful planning."
         ]
      },
      {
         "id": 1,
         "word": "achievement",
         "role": "noun",
         "BrE": "/əˈtʃiːvmənt/",
         "AmE": "/əˈtʃiːvmənt/",
         "definition": "a thing that somebody has done successfully, especially using their own effort and skill",
         "examples": [
            "Winning the race was a big achievement.",
            "Her academic achievements impressed the teachers.",
            "The project’s completion was a remarkable achievement for the team."
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
            "You need to act quickly.",
            "He acted bravely during the emergency.",
            "The government must act decisively to address the crisis."
         ]
      },
      {
         "id": 1,
         "word": "ad",
         "role": "noun",
         "BrE": "/æd/",
         "AmE": "/æd/",
         "definition": "an advertisement",
         "examples": [
            "I saw an ad on TV.",
            "The ad for the new phone was exciting.",
            "The company launched an ad campaign to boost sales."
         ]
      },
      {
         "id": 1,
         "word": "addition",
         "role": "noun",
         "BrE": "/əˈdɪʃn/",
         "AmE": "/əˈdɪʃn/",
         "definition": "the act of adding something to something else",
         "examples": [
            "We learned addition in math class.",
            "The addition of sugar made the cake sweeter.",
            "The addition of new features improved the software."
         ]
      },
      {
         "id": 1,
         "word": "admire",
         "role": "verb",
         "BrE": "/ədˈmaɪə(r)/",
         "AmE": "/ədˈmaɪr/",
         "definition": "to respect or like somebody/something very much",
         "examples": [
            "I admire her beautiful dress.",
            "People admire his courage and determination.",
            "She is widely admired for her contributions to science."
         ]
      },
      {
         "id": 2,
         "word": "admit",
         "role": "verb",
         "BrE": "/ədˈmɪt/",
         "AmE": "/ədˈmɪt/",
         "definition": "to agree, often unwillingly, that something is true",
         "examples": [
            "He admitted he was wrong.",
            "She admitted to making a mistake.",
            "The suspect admitted his involvement in the crime."
         ]
      },
      {
         "id": 2,
         "word": "advanced",
         "role": "adjective",
         "BrE": "/ədˈvɑːnst/",
         "AmE": "/ədˈvænst/",
         "definition": "having the most modern and recently developed ideas, methods, etc.",
         "examples": [
            "This is an advanced phone.",
            "She took an advanced course in English.",
            "The hospital uses advanced technology for surgeries."
         ]
      },
      {
         "id": 2,
         "word": "advise",
         "role": "verb",
         "BrE": "/ədˈvaɪz/",
         "AmE": "/ədˈvaɪz/",
         "definition": "to tell somebody what you think they should do in a particular situation",
         "examples": [
            "I advise you to rest.",
            "The teacher advised her to study harder.",
            "Experts advise against investing all your money in one place."
         ]
      },
      {
         "id": 2,
         "word": "afford",
         "role": "verb",
         "BrE": "/əˈfɔːd/",
         "AmE": "/əˈfɔːrd/",
         "definition": "to have enough money or time to be able to buy or to do something",
         "examples": [
            "I can’t afford a new phone.",
            "She can afford to travel abroad this year.",
            "Few families can afford private education for their children."
         ]
      },
      {
         "id": 2,
         "word": "age",
         "role": "noun",
         "BrE": "/eɪdʒ/",
         "AmE": "/eɪdʒ/",
         "definition": "the number of years that a person has lived or a thing has existed",
         "examples": [
            "She is 20 years of age.",
            "The age of the building is over 100 years.",
            "Age restrictions apply to this movie."
         ]
      },
      {
         "id": 2,
         "word": "aged",
         "role": "adjective",
         "BrE": "/ˈeɪdʒɪd/",
         "AmE": "/ˈeɪdʒɪd/",
         "definition": "of the age of",
         "examples": [
            "He is aged 15.",
            "The competition is for children aged 10 to 16.",
            "The program targets workers aged between 25 and 40."
         ]
      },
      {
         "id": 2,
         "word": "agent",
         "role": "noun",
         "BrE": "/ˈeɪdʒənt/",
         "AmE": "/ˈeɪdʒənt/",
         "definition": "a person whose job is to act for, or manage the affairs of, other people in business, sport, etc.",
         "examples": [
            "She is a travel agent.",
            "The actor hired an agent to find roles.",
            "The real estate agent showed us the house."
         ]
      },
      {
         "id": 2,
         "word": "agreement",
         "role": "noun",
         "BrE": "/əˈɡriːmənt/",
         "AmE": "/əˈɡriːmənt/",
         "definition": "an arrangement, a promise or a contract made with somebody",
         "examples": [
            "We made an agreement to meet.",
            "The company signed an agreement with the supplier.",
            "The trade agreement benefits both countries."
         ]
      },
      {
         "id": 2,
         "word": "ahead",
         "role": "adverb",
         "BrE": "/əˈhed/",
         "AmE": "/əˈhed/",
         "definition": "in front of somebody/something or further forward in space or time",
         "examples": [
            "The car ahead is slow.",
            "She walked ahead of the group.",
            "Planning ahead is essential for success."
         ]
      },
      {
         "id": 2,
         "word": "aim",
         "role": "verb",
         "BrE": "/eɪm/",
         "AmE": "/eɪm/",
         "definition": "to try or plan to achieve something",
         "examples": [
            "I aim to win the game.",
            "She aims to finish her homework tonight.",
            "The project aims to reduce pollution in the city."
         ]
      },
      {
         "id": 3,
         "word": "alarm",
         "role": "noun",
         "BrE": "/əˈlɑːm/",
         "AmE": "/əˈlɑːrm/",
         "definition": "a device that makes a noise to warn people of danger",
         "examples": [
            "The fire alarm is loud.",
            "The alarm woke everyone in the building.",
            "The security alarm was triggered by a break-in."
         ]
      },
      {
         "id": 3,
         "word": "album",
         "role": "noun",
         "BrE": "/ˈælbəm/",
         "AmE": "/ˈælbəm/",
         "definition": "a collection of songs, photographs, etc., usually in a book or on a record",
         "examples": [
            "I bought a new music album.",
            "Her photo album is full of memories.",
            "The band’s latest album topped the charts."
         ]
      },
      {
         "id": 3,
         "word": "alcohol",
         "role": "noun",
         "BrE": "/ˈælkəhɒl/",
         "AmE": "/ˈælkəhɔːl/",
         "definition": "drinks such as beer, wine, etc. that can make people drunk",
         "examples": [
            "He doesn’t drink alcohol.",
            "The party served alcohol to adults.",
            "Alcohol consumption is regulated in many countries."
         ]
      },
      {
         "id": 3,
         "word": "alcoholic",
         "role": "adjective",
         "BrE": "/ˌælkəˈhɒlɪk/",
         "AmE": "/ˌælkəˈhɔːlɪk/",
         "definition": "containing or connected with alcohol",
         "examples": [
            "Beer is an alcoholic drink.",
            "They served alcoholic beverages at the event.",
            "Alcoholic drinks are not allowed in some places."
         ]
      },
      {
         "id": 3,
         "word": "alternative",
         "role": "noun",
         "BrE": "/ɔːlˈtɜːnətɪv/",
         "AmE": "/ɔːlˈtɜːrnətɪv/",
         "definition": "a thing that you can choose to do or have out of two or more possibilities",
         "examples": [
            "I have no alternative plan.",
            "We need an alternative to driving.",
            "Solar power is an alternative to traditional energy sources."
         ]
      },
      {
         "id": 3,
         "word": "amazed",
         "role": "adjective",
         "BrE": "/əˈmeɪzd/",
         "AmE": "/əˈmeɪzd/",
         "definition": "very surprised",
         "examples": [
            "I was amazed by the magic trick.",
            "She was amazed at how fast he ran.",
            "The audience was amazed by the stunning performance."
         ]
      },
      {
         "id": 3,
         "word": "ambition",
         "role": "noun",
         "BrE": "/æmˈbɪʃn/",
         "AmE": "/æmˈbɪʃn/",
         "definition": "a strong desire to achieve something",
         "examples": [
            "Her ambition is to be a doctor.",
            "His ambition drives him to work hard.",
            "She has the ambition to start her own company."
         ]
      },
      {
         "id": 3,
         "word": "ambitious",
         "role": "adjective",
         "BrE": "/æmˈbɪʃəs/",
         "AmE": "/æmˈbɪʃəs/",
         "definition": "having a strong desire to be successful, powerful, or rich",
         "examples": [
            "She is an ambitious student.",
            "His ambitious goals impressed the team.",
            "The company has ambitious plans for expansion."
         ]
      },
      {
         "id": 3,
         "word": "analyse",
         "role": "verb",
         "BrE": "/ˈænəlaɪz/",
         "AmE": "/ˈænəlaɪz/",
         "definition": "to examine the nature or structure of something, especially by separating it into its parts",
         "examples": [
            "We need to analyse the problem.",
            "She analysed the data carefully.",
            "The scientist analysed the results of the experiment."
         ]
      },
      {
         "id": 3,
         "word": "analysis",
         "role": "noun",
         "BrE": "/əˈnæləsɪs/",
         "AmE": "/əˈnæləsɪs/",
         "definition": "the detailed study or examination of something in order to understand more about it",
         "examples": [
            "The analysis showed clear results.",
            "Her analysis of the book was interesting.",
            "The economic analysis predicted a downturn."
         ]
      },
      {
         "id": 4,
         "word": "announce",
         "role": "verb",
         "BrE": "/əˈnaʊns/",
         "AmE": "/əˈnaʊns/",
         "definition": "to tell people something officially, especially about a decision, plan, etc.",
         "examples": [
            "They will announce the winner.",
            "She announced her retirement yesterday.",
            "The government announced new policies today."
         ]
      },
      {
         "id": 4,
         "word": "announcement",
         "role": "noun",
         "BrE": "/əˈnaʊnsmənt/",
         "AmE": "/əˈnaʊnsmənt/",
         "definition": "a spoken or written statement that informs people about something",
         "examples": [
            "The announcement was on the radio.",
            "The school made an announcement about the holiday.",
            "The company’s announcement surprised investors."
         ]
      },
      {
         "id": 4,
         "word": "annoy",
         "role": "verb",
         "BrE": "/əˈnɔɪ/",
         "AmE": "/əˈnɔɪ/",
         "definition": "to make somebody slightly angry or upset",
         "examples": [
            "Loud music can annoy people.",
            "He was annoyed by her late arrival.",
            "Her constant complaints annoyed everyone in the room."
         ]
      },
      {
         "id": 4,
         "word": "annoyed",
         "role": "adjective",
         "BrE": "/əˈnɔɪd/",
         "AmE": "/əˈnɔɪd/",
         "definition": "slightly angry or upset",
         "examples": [
            "She was annoyed about the noise.",
            "He felt annoyed when the train was late.",
            "They were annoyed at the lack of communication."
         ]
      },
      {
         "id": 4,
         "word": "annoying",
         "role": "adjective",
         "BrE": "/əˈnɔɪɪŋ/",
         "AmE": "/əˈnɔɪɪŋ/",
         "definition": "making you feel slightly angry or upset",
         "examples": [
            "The annoying sound woke me up.",
            "Her annoying habit irritated everyone.",
            "It’s annoying when people don’t listen carefully."
         ]
      },
      {
         "id": 4,
         "word": "apart",
         "role": "adverb",
         "BrE": "/əˈpɑːt/",
         "AmE": "/əˈpɑːrt/",
         "definition": "separated by a distance, of space or time",
         "examples": [
            "The houses are far apart.",
            "They live two miles apart from each other.",
            "The events happened years apart in history."
         ]
      },
      {
         "id": 4,
         "word": "apologize",
         "role": "verb",
         "BrE": "/əˈpɒlədʒaɪz/",
         "AmE": "/əˈpɑːlədʒaɪz/",
         "definition": "to say that you are sorry for doing something wrong or causing a problem",
         "examples": [
            "I apologized for being late.",
            "She apologized to her friend for forgetting.",
            "He apologized publicly for his mistake."
         ]
      },
      {
         "id": 4,
         "word": "application",
         "role": "noun",
         "BrE": "/ˌæplɪˈkeɪʃn/",
         "AmE": "/ˌæplɪˈkeɪʃn/",
         "definition": "a formal request for something, usually in writing",
         "examples": [
            "I sent an application for a job.",
            "Her application to the university was accepted.",
            "The scholarship application process is competitive."
         ]
      },
      {
         "id": 4,
         "word": "appointment",
         "role": "noun",
         "BrE": "/əˈpɔɪntmənt/",
         "AmE": "/əˈpɔɪntmənt/",
         "definition": "a formal arrangement to meet or visit somebody at a particular time",
         "examples": [
            "I have an appointment with the doctor.",
            "She missed her dental appointment.",
            "The appointment with the lawyer lasted an hour."
         ]
      },
      {
         "id": 4,
         "word": "appreciate",
         "role": "verb",
         "BrE": "/əˈpriːʃieɪt/",
         "AmE": "/əˈpriːʃieɪt/",
         "definition": "to be grateful for something that somebody has done",
         "examples": [
            "I appreciate your help.",
            "She appreciated the gift from her friend.",
            "We greatly appreciate your support during this time."
         ]
      },
      {
         "id": 5,
         "word": "approximately",
         "role": "adverb",
         "BrE": "/əˈprɒksɪmətli/",
         "AmE": "/əˈprɑːksɪmətli/",
         "definition": "used to show that something is almost, but not exactly, accurate",
         "examples": [
            "The trip takes approximately two hours.",
            "Approximately 50 people attended the event.",
            "The project will cost approximately $10,000."
         ]
      },
      {
         "id": 5,
         "word": "arrest",
         "role": "verb",
         "BrE": "/əˈrest/",
         "AmE": "/əˈrest/",
         "definition": "to take somebody to a police station because they are believed to have committed a crime",
         "examples": [
            "The police arrested the thief.",
            "They arrested him for stealing a car.",
            "The suspect was arrested after a long investigation."
         ]
      },
      {
         "id": 5,
         "word": "arrival",
         "role": "noun",
         "BrE": "/əˈraɪvl/",
         "AmE": "/əˈraɪvl/",
         "definition": "the act of arriving at a place",
         "examples": [
            "Their arrival was late.",
            "The arrival of the train was delayed.",
            "Her arrival at the party caused excitement."
         ]
      },
      {
         "id": 5,
         "word": "assignment",
         "role": "noun",
         "BrE": "/əˈsaɪnmənt/",
         "AmE": "/əˈsaɪnmənt/",
         "definition": "a task or piece of work that somebody is given to do",
         "examples": [
            "I finished my school assignment.",
            "The teacher gave us a difficult assignment.",
            "The assignment required extensive research."
         ]
      },
      {
         "id": 5,
         "word": "assist",
         "role": "verb",
         "BrE": "/əˈsɪst/",
         "AmE": "/əˈsɪst/",
         "definition": "to help somebody to do something",
         "examples": [
            "I will assist you with your homework.",
            "She assisted the team in finishing the project.",
            "Volunteers assisted in cleaning up the park."
         ]
      },
      {
         "id": 5,
         "word": "atmosphere",
         "role": "noun",
         "BrE": "/ˈætməsfɪə(r)/",
         "AmE": "/ˈætməsfɪr/",
         "definition": "the mood or feeling of a place or situation",
         "examples": [
            "The party had a fun atmosphere.",
            "The atmosphere in the room was tense.",
            "The festival created a lively and joyful atmosphere."
         ]
      },
      {
         "id": 5,
         "word": "attach",
         "role": "verb",
         "BrE": "/əˈtætʃ/",
         "AmE": "/əˈtætʃ/",
         "definition": "to fasten or join one thing to another",
         "examples": [
            "Attach the photo to the email.",
            "She attached a note to the gift.",
            "Please attach the document to your application."
         ]
      },
      {
         "id": 5,
         "word": "attitude",
         "role": "noun",
         "BrE": "/ˈætɪtjuːd/",
         "AmE": "/ˈætɪtuːd/",
         "definition": "the way you think and feel about somebody/something",
         "examples": [
            "She has a positive attitude.",
            "His attitude towards work is excellent.",
            "A professional attitude is important in business."
         ]
      },
      {
         "id": 5,
         "word": "attract",
         "role": "verb",
         "BrE": "/əˈtrækt/",
         "AmE": "/əˈtrækt/",
         "definition": "to cause somebody/something to go to or be interested in something",
         "examples": [
            "Flowers attract bees.",
            "The sale attracted many customers.",
            "The museum attracts thousands of visitors annually."
         ]
      },
      {
         "id": 5,
         "word": "attraction",
         "role": "noun",
         "BrE": "/əˈtrækʃn/",
         "AmE": "/əˈtrækʃn/",
         "definition": "something that interests people and makes them want to visit or watch it",
         "examples": [
            "The zoo is a big attraction.",
            "The city’s main attraction is the castle.",
            "Tourist attractions bring millions to the region."
         ]
      },
      {
         "id": 6,
         "word": "authority",
         "role": "noun",
         "BrE": "/ɔːˈθɒrəti/",
         "AmE": "/əˈθɔːrəti/",
         "definition": "the power to give orders to people",
         "examples": [
            "The teacher has authority in class.",
            "The police have the authority to arrest.",
            "The government’s authority was challenged."
         ]
      },
      {
         "id": 6,
         "word": "average",
         "role": "adjective",
         "BrE": "/ˈævərɪdʒ/",
         "AmE": "/ˈævərɪdʒ/",
         "definition": "typical or normal; not special",
         "examples": [
            "He is an average student.",
            "The average temperature today is 20°C.",
            "Her performance was above average for her age."
         ]
      },
      {
         "id": 6,
         "word": "award",
         "role": "noun",
         "BrE": "/əˈwɔːd/",
         "AmE": "/əˈwɔːrd/",
         "definition": "a prize or other reward given to somebody for something they have done",
         "examples": [
            "She won an award for singing.",
            "The film received several awards.",
            "The scientist was given an award for her research."
         ]
      },
      {
         "id": 6,
         "word": "aware",
         "role": "adjective",
         "BrE": "/əˈweə(r)/",
         "AmE": "/əˈwer/",
         "definition": "knowing about or noticing something",
         "examples": [
            "I’m aware of the problem.",
            "She was aware of the danger nearby.",
            "He is fully aware of the project’s requirements."
         ]
      },
      {
         "id": 6,
         "word": "backwards",
         "role": "adverb",
         "BrE": "/ˈbækwədz/",
         "AmE": "/ˈbækwərdz/",
         "definition": "towards a place or position that is behind",
         "examples": [
            "He walked backwards slowly.",
            "She stepped backwards to avoid the puddle.",
            "The car moved backwards into the parking space."
         ]
      },
      {
         "id": 6,
         "word": "bake",
         "role": "verb",
         "BrE": "/beɪk/",
         "AmE": "/beɪk/",
         "definition": "to cook food in an oven without extra fat or liquid",
         "examples": [
            "I like to bake cookies.",
            "She baked a cake for the party.",
            "He baked bread using a traditional recipe."
         ]
      },
      {
         "id": 6,
         "word": "balance",
         "role": "noun",
         "BrE": "/ˈbæləns/",
         "AmE": "/ˈbæləns/",
         "definition": "a state where things are of equal weight or force",
         "examples": [
            "She lost her balance and fell.",
            "The balance of power shifted in the game.",
            "Maintaining a work-life balance is challenging."
         ]
      },
      {
         "id": 6,
         "word": "ban",
         "role": "verb",
         "BrE": "/bæn/",
         "AmE": "/bæn/",
         "definition": "to officially say that something is not allowed",
         "examples": [
            "They ban smoking here.",
            "The school banned mobile phones.",
            "The government banned the sale of certain drugs."
         ]
      },
      {
         "id": 6,
         "word": "base",
         "role": "noun",
         "BrE": "/beɪs/",
         "AmE": "/beɪs/",
         "definition": "the lowest part of something, especially the part on which it rests or is supported",
         "examples": [
            "The lamp has a heavy base.",
            "The mountain’s base is covered in snow.",
            "The company’s customer base grew rapidly."
         ]
      },
      {
         "id": 6,
         "word": "basic",
         "role": "adjective",
         "BrE": "/ˈbeɪsɪk/",
         "AmE": "/ˈbeɪsɪk/",
         "definition": "forming the part of something that is most necessary and from which other things develop",
         "examples": [
            "I know basic English.",
            "The course teaches basic computer skills.",
            "Basic knowledge of math is essential for this job."
         ]
      },
      {
         "id": 7,
         "word": "basis",
         "role": "noun",
         "BrE": "/ˈbeɪsɪs/",
         "AmE": "/ˈbeɪsɪs/",
         "definition": "the reason or way in which something happens or is done",
         "examples": [
            "We meet on a weekly basis.",
            "Decisions are made on a fair basis.",
            "The study was conducted on a scientific basis."
         ]
      },
      {
         "id": 7,
         "word": "battery",
         "role": "noun",
         "BrE": "/ˈbætəri/",
         "AmE": "/ˈbætəri/",
         "definition": "a device that produces electricity to provide power for radios, cars, etc.",
         "examples": [
            "My phone needs a new battery.",
            "The battery in the car died.",
            "Solar panels charge the battery during the day."
         ]
      },
      {
         "id": 7,
         "word": "battle",
         "role": "noun",
         "BrE": "/ˈbætl/",
         "AmE": "/ˈbætl/",
         "definition": "a fight between two armies in a war",
         "examples": [
            "The battle lasted all day.",
            "They won the battle but lost many soldiers.",
            "The historic battle changed the course of the war."
         ]
      },
      {
         "id": 7,
         "word": "beauty",
         "role": "noun",
         "BrE": "/ˈbjuːti/",
         "AmE": "/ˈbjuːti/",
         "definition": "the quality of being pleasing to look at",
         "examples": [
            "The flower’s beauty amazed her.",
            "The beauty of the sunset was breathtaking.",
            "The painting captures the beauty of nature."
         ]
      },
      {
         "id": 7,
         "word": "bee",
         "role": "noun",
         "BrE": "/biː/",
         "AmE": "/biː/",
         "definition": "an insect that makes honey and can sting",
         "examples": [
            "A bee is on the flower.",
            "Bees are important for pollination.",
            "The bee’s sting caused a sharp pain."
         ]
      },
      {
         "id": 7,
         "word": "belief",
         "role": "noun",
         "BrE": "/bɪˈliːf/",
         "AmE": "/bɪˈliːf/",
         "definition": "a feeling that something is true or exists",
         "examples": [
            "I have a belief in magic.",
            "Her belief in hard work paid off.",
            "His strong belief in equality inspired others."
         ]
      },
      {
         "id": 7,
         "word": "bell",
         "role": "noun",
         "BrE": "/bel/",
         "AmE": "/bel/",
         "definition": "a hollow metal object that makes a ringing sound when struck",
         "examples": [
            "The bell rings at school.",
            "The church bell rang loudly.",
            "The bell signaled the start of the ceremony."
         ]
      },
      {
         "id": 7,
         "word": "bend",
         "role": "verb",
         "BrE": "/bend/",
         "AmE": "/bend/",
         "definition": "to make something straight into a curve or angle",
         "examples": [
            "Bend the wire carefully.",
            "She bent down to pick up the book.",
            "The road bends sharply to the left."
         ]
      },
      {
         "id": 7,
         "word": "benefit",
         "role": "noun",
         "BrE": "/ˈbenɪfɪt/",
         "AmE": "/ˈbenɪfɪt/",
         "definition": "an advantage or useful effect that something has",
         "examples": [
            "Exercise has many benefits.",
            "The new law brings benefits to workers.",
            "The benefits of recycling are clear to everyone."
         ]
      },
      {
         "id": 7,
         "word": "better",
         "role": "adjective",
         "BrE": "/ˈbetə(r)/",
         "AmE": "/ˈbetər/",
         "definition": "of a higher quality or standard than something else",
         "examples": [
            "This book is better than that one.",
            "Her grades are better this year.",
            "The new system is better for the environment."
         ]
      },
      {
         "id": 8,
         "word": "bite",
         "role": "verb",
         "BrE": "/baɪt/",
         "AmE": "/baɪt/",
         "definition": "to use your teeth to cut into or through something",
         "examples": [
            "The dog might bite you.",
            "She bit into the apple hungrily.",
            "Be careful not to bite your tongue while eating."
         ]
      },
      {
         "id": 8,
         "word": "block",
         "role": "noun",
         "BrE": "/blɒk/",
         "AmE": "/blɑːk/",
         "definition": "a large piece of something solid with flat sides",
         "examples": [
            "The wall is made of blocks.",
            "He lives two blocks from the park.",
            "The building block collapsed during the storm."
         ]
      },
      {
         "id": 8,
         "word": "board",
         "role": "noun",
         "BrE": "/bɔːd/",
         "AmE": "/bɔːrd/",
         "definition": "a flat piece of wood, plastic, etc. used for a particular purpose",
         "examples": [
            "Write on the board, please.",
            "The board was covered with notices.",
            "The diving board was very high."
         ]
      },
      {
         "id": 8,
         "word": "bomb",
         "role": "noun",
         "BrE": "/bɒm/",
         "AmE": "/bɑːm/",
         "definition": "a weapon that explodes and causes damage",
         "examples": [
            "The bomb was found in a bag.",
            "The city was damaged by a bomb.",
            "The bomb squad safely disarmed the device."
         ]
      },
      {
         "id": 8,
         "word": "border",
         "role": "noun",
         "BrE": "/ˈbɔːdə(r)/",
         "AmE": "/ˈbɔːrdər/",
         "definition": "the line that divides two countries or areas",
         "examples": [
            "We crossed the border into Canada.",
            "The town is near the border.",
            "Border security has been increased."
         ]
      },
      {
         "id": 8,
         "word": "bother",
         "role": "verb",
         "BrE": "/ˈbɒðə(r)/",
         "AmE": "/ˈbɑːðər/",
         "definition": "to annoy, worry, or upset somebody",
         "examples": [
            "Don’t bother me now.",
            "The noise bothers her when she studies.",
            "It bothers me that he never apologizes."
         ]
      },
      {
         "id": 8,
         "word": "branch",
         "role": "noun",
         "BrE": "/brɑːntʃ/",
         "AmE": "/bræntʃ/",
         "definition": "a part of a tree that grows out from the main stem",
         "examples": [
            "The bird is on a branch.",
            "The tree’s branches were full of leaves.",
            "The bank opened a new branch in the city."
         ]
      },
      {
         "id": 8,
         "word": "brand",
         "role": "noun",
         "BrE": "/brænd/",
         "AmE": "/brænd/",
         "definition": "a type of product made by a particular company",
         "examples": [
            "I like this brand of coffee.",
            "The brand is famous for its quality.",
            "The new brand of shoes sold out quickly."
         ]
      },
      {
         "id": 8,
         "word": "brave",
         "role": "adjective",
         "BrE": "/breɪv/",
         "AmE": "/breɪv/",
         "definition": "showing courage and not afraid in difficult situations",
         "examples": [
            "She is a brave girl.",
            "The brave firefighter saved the child.",
            "His brave decision changed the company’s future."
         ]
      },
      {
         "id": 8,
         "word": "breath",
         "role": "noun",
         "BrE": "/breθ/",
         "AmE": "/breθ/",
         "definition": "the air that you take into and let out of your lungs",
         "examples": [
            "Take a deep breath.",
            "She held her breath under water.",
            "His breath was visible in the cold air."
         ]
      },
      {
         "id": 9,
         "word": "breathe",
         "role": "verb",
         "BrE": "/briːð/",
         "AmE": "/briːð/",
         "definition": "to take air into your lungs and let it out again",
         "examples": [
            "Breathe slowly to relax.",
            "He breathed deeply before speaking.",
            "It’s hard to breathe in polluted air."
         ]
      },
      {
         "id": 9,
         "word": "breathing",
         "role": "noun",
         "BrE": "/ˈbriːðɪŋ/",
         "AmE": "/ˈbriːðɪŋ/",
         "definition": "the act of taking air into and letting it out of your lungs",
         "examples": [
            "Her breathing was fast.",
            "Deep breathing helps reduce stress.",
            "The patient’s breathing was monitored closely."
         ]
      },
      {
         "id": 9,
         "word": "bride",
         "role": "noun",
         "BrE": "/braɪd/",
         "AmE": "/braɪd/",
         "definition": "a woman on her wedding day, or just before or after it",
         "examples": [
            "The bride wore a white dress.",
            "The bride smiled during the ceremony.",
            "Everyone admired the bride’s elegant gown."
         ]
      },
      {
         "id": 9,
         "word": "bubble",
         "role": "noun",
         "BrE": "/ˈbʌbl/",
         "AmE": "/ˈbʌbl/",
         "definition": "a ball of air in a liquid or a soft material",
         "examples": [
            "Bubbles floated in the water.",
            "The child blew soap bubbles.",
            "Bubbles formed in the boiling soup."
         ]
      },
      {
         "id": 9,
         "word": "bury",
         "role": "verb",
         "BrE": "/ˈberi/",
         "AmE": "/ˈberi/",
         "definition": "to put something in the ground and cover it with earth",
         "examples": [
            "The dog buried a bone.",
            "They buried the treasure in the sand.",
            "The village was buried under volcanic ash."
         ]
      },
      {
         "id": 9,
         "word": "calm",
         "role": "adjective",
         "BrE": "/kɑːm/",
         "AmE": "/kɑːm/",
         "definition": "not excited, nervous, or upset",
         "examples": [
            "She stayed calm during the storm.",
            "His calm voice reassured everyone.",
            "Remaining calm in a crisis is important."
         ]
      },
      {
         "id": 9,
         "word": "campaign",
         "role": "noun",
         "BrE": "/kæmˈpeɪn/",
         "AmE": "/kæmˈpeɪn/",
         "definition": "a series of planned activities to achieve a particular goal",
         "examples": [
            "The campaign raised a lot of money.",
            "The election campaign was exciting.",
            "The environmental campaign promoted recycling."
         ]
      },
      {
         "id": 9,
         "word": "campus",
         "role": "noun",
         "BrE": "/ˈkæmpəs/",
         "AmE": "/ˈkæmpəs/",
         "definition": "the buildings and grounds of a university or college",
         "examples": [
            "The campus has a big library.",
            "She lives on campus during the semester.",
            "The university campus is beautifully designed."
         ]
      },
      {
         "id": 9,
         "word": "candidate",
         "role": "noun",
         "BrE": "/ˈkændɪdət/",
         "AmE": "/ˈkændɪdeɪt/",
         "definition": "a person who applies for a job or is trying to be elected",
         "examples": [
            "He is a candidate for the job.",
            "The candidate spoke at the meeting.",
            "Several candidates competed for the position."
         ]
      },
      {
         "id": 9,
         "word": "cap",
         "role": "noun",
         "BrE": "/kæp/",
         "AmE": "/kæp/",
         "definition": "a soft flat hat with a curved part sticking out at the front",
         "examples": [
            "He wore a red cap.",
            "The baseball cap was his favorite.",
            "She put on a cap to shield her eyes from the sun."
         ]
      },
      {
         "id": 10,
         "word": "captain",
         "role": "noun",
         "BrE": "/ˈkæptɪn/",
         "AmE": "/ˈkæptɪn/",
         "definition": "the leader of a team or group, especially in sports",
         "examples": [
            "He is the team captain.",
            "The captain led the team to victory.",
            "The ship’s captain navigated through the storm."
         ]
      },
      {
         "id": 10,
         "word": "careless",
         "role": "adjective",
         "BrE": "/ˈkeələs/",
         "AmE": "/ˈkerləs/",
         "definition": "not giving enough attention or thought to what you are doing",
         "examples": [
            "He made a careless mistake.",
            "Her careless driving caused an accident.",
            "Careless handling of the equipment led to damage."
         ]
      },
      {
         "id": 10,
         "word": "category",
         "role": "noun",
         "BrE": "/ˈkætəɡəri/",
         "AmE": "/ˈkætəɡɔːri/",
         "definition": "a group of people or things that are similar in some way",
         "examples": [
            "Books are in different categories.",
            "The film falls into the comedy category.",
            "Products are divided into categories for sale."
         ]
      },
      {
         "id": 10,
         "word": "ceiling",
         "role": "noun",
         "BrE": "/ˈsiːlɪŋ/",
         "AmE": "/ˈsiːlɪŋ/",
         "definition": "the top inside surface of a room",
         "examples": [
            "The ceiling is painted white.",
            "A fan is on the ceiling.",
            "The high ceiling made the room feel spacious."
         ]
      },
      {
         "id": 10,
         "word": "celebration",
         "role": "noun",
         "BrE": "/ˌselɪˈbreɪʃn/",
         "AmE": "/ˌselɪˈbreɪʃn/",
         "definition": "a special event that people organize in order to show happiness about something",
         "examples": [
            "We had a birthday celebration.",
            "The celebration lasted all night.",
            "The victory celebration attracted thousands."
         ]
      },
      {
         "id": 10,
         "word": "central",
         "role": "adjective",
         "BrE": "/ˈsentrəl/",
         "AmE": "/ˈsentrəl/",
         "definition": "in the centre of an area or object",
         "examples": [
            "The city has a central park.",
            "Central London is very busy.",
            "The central idea of the book is friendship."
         ]
      },
      {
         "id": 10,
         "word": "centre",
         "role": "noun",
         "BrE": "/ˈsentə(r)/",
         "AmE": "/ˈsentər/",
         "definition": "the middle point or part of something",
         "examples": [
            "The shop is in the town centre.",
            "The centre of the circle is marked.",
            "The community centre hosts many events."
         ]
      },
      {
         "id": 10,
         "word": "ceremony",
         "role": "noun",
         "BrE": "/ˈserəməni/",
         "AmE": "/ˈserəmoʊni/",
         "definition": "a formal public event with special traditions",
         "examples": [
            "The wedding ceremony was beautiful.",
            "The ceremony honored the winners.",
            "A formal ceremony marked the opening of the building."
         ]
      },
      {
         "id": 10,
         "word": "chain",
         "role": "noun",
         "BrE": "/tʃeɪn/",
         "AmE": "/tʃeɪn/",
         "definition": "a series of connected metal links or rings",
         "examples": [
            "The bike has a strong chain.",
            "She wore a gold chain necklace.",
            "The chain on the gate was rusty."
         ]
      },
      {
         "id": 10,
         "word": "challenge",
         "role": "noun",
         "BrE": "/ˈtʃælɪndʒ/",
         "AmE": "/ˈtʃælɪndʒ/",
         "definition": "a new or difficult task that tests somebody’s ability and skill",
         "examples": [
            "The game is a fun challenge.",
            "Climbing the mountain was a challenge.",
            "The project presented a significant challenge."
         ]
      },
      {
         "id": 11,
         "word": "champion",
         "role": "noun",
         "BrE": "/ˈtʃæmpiən/",
         "AmE": "/ˈtʃæmpiən/",
         "definition": "a person, team, etc. that has won a competition",
         "examples": [
            "She is the school champion.",
            "The team became world champions.",
            "The champion defended his title successfully."
         ]
      },
      {
         "id": 11,
         "word": "channel",
         "role": "noun",
         "BrE": "/ˈtʃænl/",
         "AmE": "/ˈtʃænl/",
         "definition": "a television station",
         "examples": [
            "I watch the news channel.",
            "The sports channel shows football games.",
            "The channel broadcasts documentaries every evening."
         ]
      },
      {
         "id": 11,
         "word": "chapter",
         "role": "noun",
         "BrE": "/ˈtʃæptə(r)/",
         "AmE": "/ˈtʃæptər/",
         "definition": "a division of a book",
         "examples": [
            "I read one chapter of the book.",
            "The novel has ten chapters.",
            "The final chapter revealed the mystery."
         ]
      },
      {
         "id": 11,
         "word": "charge",
         "role": "noun",
         "BrE": "/tʃɑːdʒ/",
         "AmE": "/tʃɑːrdʒ/",
         "definition": "the amount of money that you have to pay for something",
         "examples": [
            "There is no charge for entry.",
            "The charge for the room was high.",
            "Additional charges apply for extra services."
         ]
      },
      {
         "id": 11,
         "word": "cheap",
         "role": "adjective",
         "BrE": "/tʃiːp/",
         "AmE": "/tʃiːp/",
         "definition": "costing little money or less than you expect",
         "examples": [
            "This shirt is very cheap.",
            "They found a cheap hotel to stay in.",
            "Buying cheap products can save money initially."
         ]
      },
      {
         "id": 11,
         "word": "cheat",
         "role": "verb",
         "BrE": "/tʃiːt/",
         "AmE": "/tʃiːt/",
         "definition": "to act in a dishonest way to gain an advantage",
         "examples": [
            "Don’t cheat in the game.",
            "He cheated on the test by copying.",
            "Cheating in exams can lead to serious consequences."
         ]
      },
      {
         "id": 11,
         "word": "cheerful",
         "role": "adjective",
         "BrE": "/ˈtʃɪəfl/",
         "AmE": "/ˈtʃɪrfl/",
         "definition": "happy, and showing it by the way you behave",
         "examples": [
            "She has a cheerful smile.",
            "The cheerful atmosphere made everyone happy.",
            "His cheerful attitude lifted the team’s spirits."
         ]
      },
      {
         "id": 11,
         "word": "chemical",
         "role": "noun",
         "BrE": "/ˈkemɪkl/",
         "AmE": "/ˈkemɪkl/",
         "definition": "a substance obtained by or used in a chemical process",
         "examples": [
            "Water is a chemical made of hydrogen and oxygen.",
            "The factory uses chemicals to make paint.",
            "Hazardous chemicals require careful handling in the laboratory."
         ]
      },
      {
         "id": 11,
         "word": "chest",
         "role": "noun",
         "BrE": "/tʃest/",
         "AmE": "/tʃest/",
         "definition": "the upper front part of the body between the neck and the stomach",
         "examples": [
            "He has a pain in his chest.",
            "The doctor listened to her chest with a stethoscope.",
            "A tight feeling in the chest can be a symptom of anxiety."
         ]
      },
      {
         "id": 11,
         "word": "childhood",
         "role": "noun",
         "BrE": "/ˈtʃaɪldhʊd/",
         "AmE": "/ˈtʃaɪldhʊd/",
         "definition": "the period of somebody’s life when they are a child",
         "examples": [
            "I had a happy childhood.",
            "Her childhood memories are full of joy.",
            "Growing up in a small village shaped his childhood experiences."
         ]
      },
      {
         "id": 12,
         "word": "claim",
         "role": "verb",
         "BrE": "/kleɪm/",
         "AmE": "/kleɪm/",
         "definition": "to say that something is true, without having proof of it",
         "examples": [
            "She claims she saw a ghost.",
            "He claimed that he finished the work on time.",
            "The suspect claimed his involvement in the crime."
         ]
      },
      {
         "id": 12,
         "word": "clause",
         "role": "noun",
         "BrE": "/klɔːz/",
         "AmE": "/klɔːz/",
         "definition": "a group of words containing a subject and a verb, forming part of a sentence",
         "examples": [
            "This sentence has two clauses.",
            "The clause in the contract was clear.",
            "Understanding complex clauses improves writing skills."
         ]
      },
      {
         "id": 12,
         "word": "clear",
         "role": "adjective",
         "BrE": "/klɪə(r)/",
         "AmE": "/klɪr/",
         "definition": "easy to understand, see, or hear",
         "examples": [
            "The water is clear.",
            "Her explanation was very clear.",
            "The instructions must be clear to avoid mistakes."
         ]
      },
      {
         "id": 12,
         "word": "click",
         "role": "verb",
         "BrE": "/klɪk/",
         "AmE": "/klɪk/",
         "definition": "to press a button on a computer mouse to select something on the screen",
         "examples": [
            "Click the button to start.",
            "She clicked on the link to open it.",
            "Clicking the icon opens the application."
         ]
      },
      {
         "id": 12,
         "word": "client",
         "role": "noun",
         "BrE": "/ˈklaɪənt/",
         "AmE": "/ˈklaɪənt/",
         "definition": "a person who uses the services or advice of a professional person or organization",
         "examples": [
            "The lawyer has a new client.",
            "The client was happy with the service.",
            "The company serves hundreds of clients daily."
         ]
      },
      {
         "id": 12,
         "word": "climb",
         "role": "verb",
         "BrE": "/klaɪm/",
         "AmE": "/klaɪm/",
         "definition": "to go up something, especially using your hands and feet",
         "examples": [
            "I can climb the tree.",
            "They climbed the steep hill.",
            "Climbing the mountain was a great achievement."
         ]
      },
      {
         "id": 12,
         "word": "close",
         "role": "verb",
         "BrE": "/kləʊz/",
         "AmE": "/kloʊz/",
         "definition": "to shut something",
         "examples": [
            "Please close the door.",
            "She closed the book after reading.",
            "The shop closes at 6 p.m. every day."
         ]
      },
      {
         "id": 12,
         "word": "cloth",
         "role": "noun",
         "BrE": "/klɒθ/",
         "AmE": "/klɔːθ/",
         "definition": "material made by weaving cotton, wool, etc., used for making clothes",
         "examples": [
            "This cloth is soft.",
            "She bought cloth to make a dress.",
            "The cloth was dyed in bright colors."
         ]
      },
      {
         "id": 12,
         "word": "clue",
         "role": "noun",
         "BrE": "/kluː/",
         "AmE": "/kluː/",
         "definition": "a piece of information that helps you solve a problem or mystery",
         "examples": [
            "I found a clue in the game.",
            "The clue helped solve the puzzle.",
            "Detectives searched for clues at the crime scene."
         ]
      },
      {
         "id": 12,
         "word": "coach",
         "role": "noun",
         "BrE": "/kəʊtʃ/",
         "AmE": "/koʊtʃ/",
         "definition": "a person who trains a person or team in a sport",
         "examples": [
            "The coach teaches football.",
            "Our coach is very encouraging.",
            "The coach developed a winning strategy."
         ]
      },
      {
         "id": 13,
         "word": "coal",
         "role": "noun",
         "BrE": "/kəʊl/",
         "AmE": "/koʊl/",
         "definition": "a hard black substance that is found in the ground and burned as fuel",
         "examples": [
            "Coal is used to make fire.",
            "The factory burns coal for energy.",
            "Coal mining was once a major industry."
         ]
      },
      {
         "id": 13,
         "word": "coin",
         "role": "noun",
         "BrE": "/kɔɪn/",
         "AmE": "/kɔɪn/",
         "definition": "a small, flat piece of metal used as money",
         "examples": [
            "I found a coin on the ground.",
            "She collected old coins as a hobby.",
            "The coin was worth more than its face value."
         ]
      },
      {
         "id": 13,
         "word": "collection",
         "role": "noun",
         "BrE": "/kəˈlekʃn/",
         "AmE": "/kəˈlekʃn/",
         "definition": "a group of objects or works that are kept together",
         "examples": [
            "He has a stamp collection.",
            "Her collection of books is huge.",
            "The museum’s art collection is impressive."
         ]
      },
      {
         "id": 13,
         "word": "coloured",
         "role": "adjective",
         "BrE": "/ˈkʌləd/",
         "AmE": "/ˈkʌlərd/",
         "definition": "having a particular colour or colours",
         "examples": [
            "She wore a coloured scarf.",
            "The room was painted with coloured walls.",
            "Coloured lights decorated the festival."
         ]
      },
      {
         "id": 13,
         "word": "combine",
         "role": "verb",
         "BrE": "/kəmˈbaɪn/",
         "AmE": "/kəmˈbaɪn/",
         "definition": "to join or mix two or more things together",
         "examples": [
            "Combine sugar and flour.",
            "They combined their ideas for the project.",
            "The recipe combines traditional and modern flavors."
         ]
      },
      {
         "id": 13,
         "word": "comment",
         "role": "noun",
         "BrE": "/ˈkɒment/",
         "AmE": "/ˈkɑːment/",
         "definition": "something that you say or write that expresses an opinion",
         "examples": [
            "She made a kind comment.",
            "His comment about the movie was funny.",
            "The teacher’s comments helped improve my work."
         ]
      },
      {
         "id": 13,
         "word": "commercial",
         "role": "adjective",
         "BrE": "/kəˈmɜːʃl/",
         "AmE": "/kəˈmɜːrʃl/",
         "definition": "connected with buying and selling goods or services",
         "examples": [
            "This is a commercial area.",
            "The commercial success of the film was huge.",
            "Commercial products are sold worldwide."
         ]
      },
      {
         "id": 13,
         "word": "commit",
         "role": "verb",
         "BrE": "/kəˈmɪt/",
         "AmE": "/kəˈmɪt/",
         "definition": "to do something wrong or illegal",
         "examples": [
            "He didn’t commit the crime.",
            "She committed to finishing the task.",
            "The company committed to reducing waste."
         ]
      },
      {
         "id": 13,
         "word": "communication",
         "role": "noun",
         "BrE": "/kəˌmjuːnɪˈkeɪʃn/",
         "AmE": "/kəˌmjuːnɪˈkeɪʃn/",
         "definition": "the activity or process of expressing ideas and feelings",
         "examples": [
            "Good communication is important.",
            "The team improved their communication skills.",
            "Effective communication is key in business."
         ]
      },
      {
         "id": 13,
         "word": "comparison",
         "role": "noun",
         "BrE": "/kəmˈpærɪsn/",
         "AmE": "/kəmˈpærɪsn/",
         "definition": "the act of comparing two or more things",
         "examples": [
            "The comparison showed differences.",
            "Her comparison of the books was helpful.",
            "The comparison between the two products was clear."
         ]
      },
      {
         "id": 14,
         "word": "competitive",
         "role": "adjective",
         "BrE": "/kəmˈpetɪtɪv/",
         "AmE": "/kəmˈpetɪtɪv/",
         "definition": "involving competition; wanting to be more successful than others",
         "examples": [
            "The game was very competitive.",
            "She is a competitive athlete.",
            "The job market is highly competitive."
         ]
      },
      {
         "id": 14,
         "word": "competitor",
         "role": "noun",
         "BrE": "/kəmˈpetɪtə(r)/",
         "AmE": "/kəmˈpetɪtər/",
         "definition": "a person or organization that tries to be better than others",
         "examples": [
            "He beat his competitor.",
            "The company has many competitors.",
            "Competitors in the race trained for months."
         ]
      },
      {
         "id": 14,
         "word": "complaint",
         "role": "noun",
         "BrE": "/kəmˈpleɪnt/",
         "AmE": "/kəmˈpleɪnt/",
         "definition": "a statement that you are not satisfied with something",
         "examples": [
            "She made a complaint about the food.",
            "The customer filed a complaint.",
            "The manager addressed all complaints quickly."
         ]
      },
      {
         "id": 14,
         "word": "complex",
         "role": "adjective",
         "BrE": "/ˈkɒmpleks/",
         "AmE": "/ˈkɑːmpleks/",
         "definition": "made of many different parts and often difficult to understand",
         "examples": [
            "The puzzle is complex.",
            "The problem was too complex to solve quickly.",
            "The complex system required expert knowledge."
         ]
      },
      {
         "id": 14,
         "word": "concentrate",
         "role": "verb",
         "BrE": "/ˈkɒnsntreɪt/",
         "AmE": "/ˈkɑːnsntreɪt/",
         "definition": "to give all your attention to something",
         "examples": [
            "I need to concentrate on my work.",
            "She concentrated on solving the puzzle.",
            "Concentrating during the exam was difficult."
         ]
      },
      {
         "id": 14,
         "word": "conclude",
         "role": "verb",
         "BrE": "/kənˈkluːd/",
         "AmE": "/kənˈkluːd/",
         "definition": "to decide or believe something as a result of what you have heard or seen",
         "examples": [
            "They concluded the meeting early.",
            "She concluded that he was right.",
            "The study concluded with surprising results."
         ]
      },
      {
         "id": 14,
         "word": " Ang kənˈkluːʒn/",
         "AmE": "/kənˈkluːʒn/",
         "definition": "the final part of something, especially a speech, performance, etc.",
         "examples": [
            "The story’s conclusion was happy.",
            "The conclusion of the book was exciting.",
            "The conclusion of the study confirmed the hypothesis."
         ]
      },
      {
         "id": 14,
         "word": "confident",
         "role": "adjective",
         "BrE": "/ˈkɒnfɪdənt/",
         "AmE": "/ˈkɑːnfɪdənt/",
         "definition": "feeling or showing that you believe you can do something well",
         "examples": [
            "She is confident in her skills.",
            "He felt confident about the exam.",
            "The team was confident of winning the match."
         ]
      },
      {
         "id": 14,
         "word": "confirm",
         "role": "verb",
         "BrE": "/kənˈfɜːm/",
         "AmE": "/kənˈfɜːrm/",
         "definition": "to state or show that something is definitely true or correct",
         "examples": [
            "Please confirm your attendance.",
            "She confirmed the meeting time.",
            "The test results confirmed the diagnosis."
         ]
      },
      {
         "id": 14,
         "word": "confuse",
         "role": "verb",
         "BrE": "/kənˈfjuːz/",
         "AmE": "/kənˈfjuːz/",
         "definition": "to make somebody unable to think clearly or understand something",
         "examples": [
            "The question confused me.",
            "Her explanation confused everyone.",
            "The complex instructions confused the new students."
         ]
      },
      {
         "id": 15,
         "word": "confused",
         "role": "adjective",
         "BrE": "/kənˈfjuːzd/",
         "AmE": "/kənˈfjuːzd/",
         "definition": "unable to think clearly or understand something",
         "examples": [
            "I’m confused by the rules.",
            "She felt confused during the lesson.",
            "The instructions left everyone confused."
         ]
      },
      {
         "id": 15,
         "word": "connection",
         "role": "noun",
         "BrE": "/kəˈnekʃn/",
         "AmE": "/kəˈnekʃn/",
         "definition": "a relationship between people, things, or ideas",
         "examples": [
            "We have a good connection.",
            "There’s a connection between the events.",
            "The study found a connection between diet and health."
         ]
      },
      {
         "id": 15,
         "word": "consequence",
         "role": "noun",
         "BrE": "/ˈkɒnsɪkwəns/",
         "AmE": "/ˈkɑːnsɪkwens/",
         "definition": "a result or effect of something",
         "examples": [
            "His actions had bad consequences.",
            "The consequence of missing the bus was being late.",
            "The decision had serious consequences for the company."
         ]
      },
      {
         "id": 15,
         "word": "consist",
         "role": "verb",
         "BrE": "/kənˈsɪst/",
         "AmE": "/kənˈsɪst/",
         "definition": "to be made up or formed of something",
         "examples": [
            "The team consists of ten players.",
            "The meal consists of rice and vegetables.",
            "The course consists of lectures and practical sessions."
         ]
      },
      {
         "id": 15,
         "word": "consume",
         "role": "verb",
         "BrE": "/kənˈsjuːm/",
         "AmE": "/kənˈsuːm/",
         "definition": "to use something, especially fuel, energy, or time",
         "examples": [
            "Cars consume a lot of fuel.",
            "The project consumed all her time.",
            "The factory consumes large amounts of electricity."
         ]
      },
      {
         "id": 15,
         "word": "consumer",
         "role": "noun",
         "BrE": "/kənˈsjuːmə(r)/",
         "AmE": "/kənˈsuːmər/",
         "definition": "a person who buys goods or uses services",
         "examples": [
            "The consumer bought a new phone.",
            "Consumers prefer cheaper products.",
            "The company focuses on consumer satisfaction."
         ]
      },
      {
         "id": 15,
         "word": "contact",
         "role": "noun",
         "BrE": "/ˈkɒntækt/",
         "AmE": "/ˈkɑːntækt/",
         "definition": "communication with a person or organization",
         "examples": [
            "I lost contact with her.",
            "Please keep in contact with the team.",
            "Regular contact with clients is essential."
         ]
      },
      {
         "id": 15,
         "word": "container",
         "role": "noun",
         "BrE": "/kənˈteɪnə(r)/",
         "AmE": "/kənˈteɪnər/",
         "definition": "something used for holding or carrying things",
         "examples": [
            "Put food in a container.",
            "The container was full of water.",
            "Large containers are used for shipping goods."
         ]
      },
      {
         "id": 15,
         "word": "content",
         "role": "noun",
         "BrE": "/ˈkɒntent/",
         "AmE": "/ˈkɑːntent/",
         "definition": "the things that are contained in something",
         "examples": [
            "Check the content of the box.",
            "The content of the book is interesting.",
            "The website’s content was updated recently."
         ]
      },
      {
         "id": 15,
         "word": "continuous",
         "role": "adjective",
         "BrE": "/kənˈtɪnjuəs/",
         "AmE": "/kənˈtɪnjuəs/",
         "definition": "happening or existing without stopping",
         "examples": [
            "The rain was continuous all day.",
            "Continuous noise disturbed her sleep.",
            "The machine requires continuous monitoring."
         ]
      },
      {
         "id": 16,
         "word": "contrast",
         "role": "noun",
         "BrE": "/ˈkɒntræst/",
         "AmE": "/ˈkɑːntræst/",
         "definition": "a difference between two or more things",
         "examples": [
            "The contrast between colors is nice.",
            "There’s a contrast between their opinions.",
            "The contrast between the two paintings was striking."
         ]
      },
      {
         "id": 16,
         "word": "convenient",
         "role": "adjective",
         "BrE": "/kənˈviːniənt/",
         "AmE": "/kənˈviːniənt/",
         "definition": "useful, easy, or quick to use",
         "examples": [
            "The shop is in a convenient place.",
            "Online banking is very convenient.",
            "The location was convenient for all attendees."
         ]
      },
      {
         "id": 16,
         "word": "convince",
         "role": "verb",
         "BrE": "/kənˈvɪns/",
         "AmE": "/kənˈvɪns/",
         "definition": "to persuade somebody to do something or believe something",
         "examples": [
            "She convinced me to join.",
            "He convinced her to try new food.",
            "The evidence convinced the jury of his guilt."
         ]
      },
      {
         "id": 16,
         "word": "cool",
         "role": "adjective",
         "BrE": "/kuːl/",
         "AmE": "/kuːl/",
         "definition": "not hot or warm; fairly cold",
         "examples": [
            "The water is cool to drink.",
            "The weather was cool in the evening.",
            "A cool breeze made the hike comfortable."
         ]
      },
      {
         "id": 16,
         "word": "costume",
         "role": "noun",
         "BrE": "/ˈkɒstjuːm/",
         "AmE": "/ˈkɑːstuːm/",
         "definition": "a set of clothes worn to look like someone or something else",
         "examples": [
            "She wore a witch costume.",
            "The costume for the play was colorful.",
            "The costume designer created unique outfits."
         ]
      },
      {
         "id": 16,
         "word": "cottage",
         "role": "noun",
         "BrE": "/ˈkɒtɪdʒ/",
         "AmE": "/ˈkɑːtɪdʒ/",
         "definition": "a small house, especially in the country",
         "examples": [
            "They live in a cottage.",
            "The cottage had a small garden.",
            "The cottage was surrounded by beautiful fields."
         ]
      },
      {
         "id": 16,
         "word": "cotton",
         "role": "noun",
         "BrE": "/ˈkɒtn/",
         "AmE": "/ˈkɑːtn/",
         "definition": "a soft white material from a plant, used to make clothes",
         "examples": [
            "This shirt is made of cotton.",
            "Cotton is soft and comfortable.",
            "The cotton industry supports many workers."
         ]
      },
      {
         "id": 16,
         "word": "count",
         "role": "verb",
         "BrE": "/kaʊnt/",
         "AmE": "/kaʊnt/",
         "definition": "to calculate the total number of something",
         "examples": [
            "Count the apples in the basket.",
            "She counted the money carefully.",
            "They counted the votes after the election."
         ]
      },
      {
         "id": 16,
         "word": "countryside",
         "role": "noun",
         "BrE": "/ˈkʌntrisaɪd/",
         "AmE": "/ˈkʌntrisaɪd/",
         "definition": "land outside towns and cities, with fields, woods, etc.",
         "examples": [
            "The countryside is peaceful.",
            "We walked in the countryside all day.",
            "The countryside offers stunning views."
         ]
      },
      {
         "id": 16,
         "word": "court",
         "role": "noun",
         "BrE": "/kɔːt/",
         "AmE": "/kɔːrt/",
         "definition": "a place where legal cases are heard",
         "examples": [
            "The case went to court.",
            "The court heard the evidence.",
            "The court ruled in favor of the plaintiff."
         ]
      },
      {
         "id": 17,
         "word": "cover",
         "role": "verb",
         "BrE": "/ˈkʌvə(r)/",
         "AmE": "/ˈkʌvər/",
         "definition": "to place something over or on top of something",
         "examples": [
            "Cover the food with a lid.",
            "She covered the table with a cloth.",
            "The blanket covered her completely."
         ]
      },
      {
         "id": 17,
         "word": "covered",
         "role": "adjective",
         "BrE": "/ˈkʌvəd/",
         "AmE": "/ˈkʌvərd/",
         "definition": "having a layer or amount of something on top",
         "examples": [
            "The car was covered in snow.",
            "The walls were covered with paint.",
            "The ground was covered in fallen leaves."
         ]
      },
      {
         "id": 17,
         "word": "cream",
         "role": "noun",
         "BrE": "/kriːm/",
         "AmE": "/kriːm/",
         "definition": "a thick, soft, white or yellowish substance used in food or on the skin",
         "examples": [
            "I like cream on my cake.",
            "She uses cream for her skin.",
            "The dessert was topped with whipped cream."
         ]
      },
      {
         "id": 17,
         "word": "criminal",
         "role": "noun",
         "BrE": "/ˈkrɪmɪnl/",
         "AmE": "/ˈkrɪmɪnl/",
         "definition": "a person who commits a crime",
         "examples": [
            "The criminal was caught.",
            "Police are searching for the criminal.",
            "The criminal was sentenced to five years."
         ]
      },
      {
         "id": 17,
         "word": "cruel",
         "role": "adjective",
         "BrE": "/ˈkruːəl/",
         "AmE": "/ˈkruːəl/",
         "definition": "causing physical or mental pain to others",
         "examples": [
            "It’s cruel to hurt animals.",
            "His cruel words upset her.",
            "The cruel treatment of workers was reported."
         ]
      },
      {
         "id": 17,
         "word": "cultural",
         "role": "adjective",
         "BrE": "/ˈkʌltʃərəl/",
         "AmE": "/ˈkʌltʃərəl/",
         "definition": "relating to the arts, customs, or way of life of a group of people",
         "examples": [
            "The festival is a cultural event.",
            "Cultural differences can cause misunderstandings.",
            "The museum showcases cultural artifacts."
         ]
      },
      {
         "id": 17,
         "word": "currency",
         "role": "noun",
         "BrE": "/ˈkʌrənsi/",
         "AmE": "/ˈkɜːrənsi/",
         "definition": "the system of money used in a country",
         "examples": [
            "The currency here is dollars.",
            "The euro is a common currency.",
            "Foreign currency exchange rates vary daily."
         ]
      },
      {
         "id": 17,
         "word": "current",
         "role": "adjective",
         "BrE": "/ˈkʌrənt/",
         "AmE": "/ˈkɜːrənt/",
         "definition": "happening or existing now",
         "examples": [
            "The current time is 5 p.m.",
            "The current president is popular.",
            "Current trends show increased online shopping."
         ]
      },
      {
         "id": 17,
         "word": "currently",
         "role": "adverb",
         "BrE": "/ˈkʌrəntli/",
         "AmE": "/ˈkɜːrəntli/",
         "definition": "at the present time",
         "examples": [
            "She is currently at school.",
            "He is currently working on a project.",
            "The team is currently leading the league."
         ]
      },
      {
         "id": 17,
         "word": "curtain",
         "role": "noun",
         "BrE": "/ˈkɜːtn/",
         "AmE": "/ˈkɜːrtn/",
         "definition": "a piece of material hung to cover a window",
         "examples": [
            "The curtain is blue.",
            "She opened the curtains to let in light.",
            "The heavy curtains blocked out the sunlight."
         ]
      },
      {
         "id": 18,
         "word": "custom",
         "role": "noun",
         "BrE": "/ˈkʌstəm/",
         "AmE": "/ˈkʌstəm/",
         "definition": "a traditional way of behaving or doing something",
         "examples": [
            "It’s a custom to give gifts.",
            "The custom of shaking hands is common.",
            "Local customs vary from country to country."
         ]
      },
      {
         "id": 18,
         "word": "cut",
         "role": "verb",
         "BrE": "/kʌt/",
         "AmE": "/kʌt/",
         "definition": "to make an opening or a wound in something with a sharp tool",
         "examples": [
            "She cut the paper with scissors.",
            "He cut his finger while cooking.",
            "The tailor cut the fabric carefully."
         ]
      },
      {
         "id": 18,
         "word": "daily",
         "role": "adjective",
         "BrE": "/ˈdeɪli/",
         "AmE": "/ˈdeɪli/",
         "definition": "happening or done every day",
         "examples": [
            "I read the daily news.",
            "She takes a daily walk.",
            "The daily meetings help the team stay organized."
         ]
      },
      {
         "id": 18,
         "word": "damage",
         "role": "noun",
         "BrE": "/ˈdæmɪdʒ/",
         "AmE": "/ˈdæmɪdʒ/",
         "definition": "physical harm caused to something",
         "examples": [
            "The storm caused damage.",
            "The car had some damage after the crash.",
            "The flood damage affected many homes."
         ]
      },
      {
         "id": 18,
         "word": "deal",
         "role": "noun",
         "BrE": "/diːl/",
         "AmE": "/diːl/",
         "definition": "an agreement, especially in business",
         "examples": [
            "They made a good deal.",
            "The deal with the company was fair.",
            "The trade deal benefited both parties."
         ]
      },
      {
         "id": 18,
         "word": "decade",
         "role": "noun",
         "BrE": "/ˈdekeɪd/",
         "AmE": "/ˈdekeɪd/",
         "definition": "a period of ten years",
         "examples": [
            "A decade is ten years.",
            "She worked there for a decade.",
            "The city changed a lot over the past decade."
         ]
      },
      {
         "id": 18,
         "word": "decorate",
         "role": "verb",
         "BrE": "/ˈdekəreɪt/",
         "AmE": "/ˈdekəreɪt/",
         "definition": "to add things to something to make it look more attractive",
         "examples": [
            "We decorate the house for Christmas.",
            "She decorated her room with posters.",
            "The hall was decorated for the celebration."
         ]
      },
      {
         "id": 18,
         "word": "deep",
         "role": "adjective",
         "BrE": "/diːp/",
         "AmE": "/diːp/",
         "definition": "going a long way down from the top or surface",
         "examples": [
            "The water is deep here.",
            "They dug a deep hole in the ground.",
            "The deep ocean is home to many creatures."
         ]
      },
      {
         "id": 18,
         "word": "define",
         "role": "verb",
         "BrE": "/dɪˈfaɪn/",
         "AmE": "/dɪˈfaɪn/",
         "definition": "to explain clearly what something means",
         "examples": [
            "Define the word ‘happy’.",
            "She defined her goals clearly.",
            "The dictionary defines technical terms accurately."
         ]
      },
      {
         "id": 18,
         "word": "definite",
         "role": "adjective",
         "BrE": "/ˈdefɪnət/",
         "AmE": "/ˈdefɪnət/",
         "definition": "fixed, certain, or clear",
         "examples": [
            "I need a definite answer.",
            "The date is not definite yet.",
            "The plan requires a definite commitment."
         ]
      },
      {
         "id": 19,
         "word": "definition",
         "role": "noun",
         "BrE": "/ˌdefɪˈnɪʃn/",
         "AmE": "/ˌdefɪˈnɪʃn/",
         "definition": "a statement that explains the meaning of a word or phrase",
         "examples": [
            "What’s the definition of ‘love’?",
            "The dictionary has clear definitions.",
            "The definition of success varies for everyone."
         ]
      },
      {
         "id": 19,
         "word": "deliver",
         "role": "verb",
         "BrE": "/dɪˈlɪvə(r)/",
         "AmE": "/dɪˈlɪvər/",
         "definition": "to take goods, letters, etc. to a person or place",
         "examples": [
            "They deliver pizza to my house.",
            "The mail was delivered late.",
            "The company delivers packages worldwide."
         ]
      },
      {
         "id": 19,
         "word": "departure",
         "role": "noun",
         "BrE": "/dɪˈpɑːtʃə(r)/",
         "AmE": "/dɪˈpɑːrtʃər/",
         "definition": "the act of leaving a place",
         "examples": [
            "The departure time is 7 p.m.",
            "Her departure from the team was sudden.",
            "The flight’s departure was delayed by an hour."
         ]
      },
      {
         "id": 19,
         "word": "despite",
         "role": "preposition",
         "BrE": "/dɪˈspaɪt/",
         "AmE": "/dɪˈspaɪt/",
         "definition": "used to show that something happened or is true although something else might have prevented it",
         "examples": [
            "She went out despite the rain.",
            "Despite his fear, he tried it.",
            "Despite challenges, the project was completed."
         ]
      },
      {
         "id": 19,
         "word": "destination",
         "role": "noun",
         "BrE": "/ˌdestɪˈneɪʃn/",
         "AmE": "/ˌdestɪˈneɪʃn/",
         "definition": "the place that somebody/something is going to",
         "examples": [
            "Our destination is Paris.",
            "The train’s destination was London.",
            "The city is a popular tourist destination."
         ]
      },
      {
         "id": 19,
         "word": "determine",
         "role": "verb",
         "BrE": "/dɪˈtɜːmɪn/",
         "AmE": "/dɪˈtɜːrmɪn/",
         "definition": "to discover the facts about something; to decide",
         "examples": [
            "They determined the cause of the fire.",
            "She determined to finish the race.",
            "The test will determine her skill level."
         ]
      },
      {
         "id": 19,
         "word": "determined",
         "role": "adjective",
         "BrE": "/dɪˈtɜːmɪnd/",
         "AmE": "/dɪˈtɜːrmɪnd/",
         "definition": "having a strong desire to do something and not letting anything stop you",
         "examples": [
            "She is determined to win.",
            "He was determined to learn English.",
            "Her determined effort led to success."
         ]
      },
      {
         "id": 19,
         "word": "development",
         "role": "noun",
         "BrE": "/dɪˈveləpmənt/",
         "AmE": "/dɪˈveləpmənt/",
         "definition": "the process of growing, changing, or improving",
         "examples": [
            "The baby’s development is fast.",
            "The city’s development was rapid.",
            "Economic development benefits the region."
         ]
      },
      {
         "id": 19,
         "word": "diagram",
         "role": "noun",
         "BrE": "/ˈdaɪəɡræm/",
         "AmE": "/ˈdaɪəɡræm/",
         "definition": "a simple drawing showing how something works or is organized",
         "examples": [
            "The diagram shows the machine.",
            "She drew a diagram of the plan.",
            "The diagram explained the process clearly."
         ]
      },
      {
         "id": 19,
         "word": "diamond",
         "role": "noun",
         "BrE": "/ˈdaɪəmənd/",
         "AmE": "/ˈdaɪəmənd/",
         "definition": "a hard, clear precious stone used in jewellery",
         "examples": [
            "Her ring has a diamond.",
            "The diamond sparkled in the light.",
            "Diamonds are valued for their rarity."
         ]
      },
      {
         "id": 20,
         "word": "difficulty",
         "role": "noun",
         "BrE": "/ˈdɪfɪkəlti/",
         "AmE": "/ˈdɪfɪkəlti/",
         "definition": "the state or quality of being difficult",
         "examples": [
            "I had difficulty with the puzzle.",
            "She faced difficulty learning the language.",
            "The task’s difficulty surprised everyone."
         ]
      },
      {
         "id": 20,
         "word": "direct",
         "role": "adjective",
         "BrE": "/dəˈrekt/",
         "AmE": "/dəˈrekt/",
         "definition": "going straight from one place to another without stopping",
         "examples": [
            "This is a direct flight.",
            "The direct route is faster.",
            "A direct approach solved the issue."
         ]
      },
      {
         "id": 20,
         "word": "directly",
         "role": "adverb",
         "BrE": "/dəˈrektli/",
         "AmE": "/dəˈrektli/",
         "definition": "in a straight line; without anyone or anything in between",
         "examples": [
            "Go directly to school.",
            "She spoke directly to the manager.",
            "The message was sent directly to her."
         ]
      },
      {
         "id": 20,
         "word": "dirt",
         "role": "noun",
         "BrE": "/dɜːt/",
         "AmE": "/dɜːrt/",
         "definition": "any substance that makes something dirty, like dust or soil",
         "examples": [
            "The shoes are full of dirt.",
            "He cleaned the dirt from the floor.",
            "The dirt on the car was hard to remove."
         ]
      },
      {
         "id": 20,
         "word": "disadvantage",
         "role": "noun",
         "BrE": "/ˌdɪsədˈvɑːntɪdʒ/",
         "AmE": "/ˌdɪsədˈvæntɪdʒ/",
         "definition": "something that causes problems or makes a situation worse",
         "examples": [
            "The rain was a disadvantage.",
            "His height was a disadvantage in basketball.",
            "The lack of experience was a disadvantage."
         ]
      },
      {
         "id": 20,
         "word": "disappointed",
         "role": "adjective",
         "BrE": "/ˌdɪsəˈpɔɪntɪd/",
         "AmE": "/ˌdɪsəˈpɔɪntɪd/",
         "definition": "sad because something was not as good as expected",
         "examples": [
            "I was disappointed with the movie.",
            "She felt disappointed about the result.",
            "They were disappointed by the poor service."
         ]
      },
      {
         "id": 20,
         "word": "disappointing",
         "role": "adjective",
         "BrE": "/ˌdɪsəˈpɔɪntɪŋ/",
         "AmE": "/ˌdɪsəˈpɔɪntɪŋ/",
         "definition": "making you feel sad because it is not as good as you hoped",
         "examples": [
            "The food was disappointing.",
            "The match was disappointing for fans.",
            "The results were disappointing for the team."
         ]
      },
      {
         "id": 20,
         "word": "discount",
         "role": "noun",
         "BrE": "/ˈdɪskaʊnt/",
         "AmE": "/ˈdɪskaʊnt/",
         "definition": "a reduction in the usual price of something",
         "examples": [
            "I got a discount on the shirt.",
            "The store offered a 20% discount.",
            "Students receive a discount on tickets."
         ]
      },
      {
         "id": 20,
         "word": "dislike",
         "role": "verb",
         "BrE": "/dɪsˈlaɪk/",
         "AmE": "/dɪsˈlaɪk/",
         "definition": "to not like something or someone",
         "examples": [
            "I dislike spicy food.",
            "She dislikes waking up early.",
            "He dislikes working in noisy places."
         ]
      },
      {
         "id": 20,
         "word": "divide",
         "role": "verb",
         "BrE": "/dɪˈvaɪd/",
         "AmE": "/dɪˈvaɪd/",
         "definition": "to separate something into parts or groups",
         "examples": [
            "Divide the cake into pieces.",
            "The class was divided into teams.",
            "The country is divided into regions."
         ]
      },
         {
         "id": 21,
         "word": "documentary",
         "role": "noun",
         "BrE": "/ˌdɒkjuˈmentri/",
         "AmE": "/ˌdɑːkjuˈmentri/",
         "definition": "a film or television programme that gives facts and information about a subject",
         "examples": [
            "I watched a documentary about animals.",
            "The documentary on space was fascinating.",
            "The documentary explored the history of the city."
         ]
      },
      {
         "id": 21,
         "word": "donate",
         "role": "verb",
         "BrE": "/dəʊˈneɪt/",
         "AmE": "/ˈdoʊneɪt/",
         "definition": "to give money or goods to help a person or organization",
         "examples": [
            "I donate to charity.",
            "She donated clothes to the shelter.",
            "They donated funds to support the project."
         ]
      },
      {
         "id": 21,
         "word": "double",
         "role": "adjective",
         "BrE": "/ˈdʌbl/",
         "AmE": "/ˈdʌbl/",
         "definition": "twice as much or as many",
         "examples": [
            "I want a double coffee.",
            "The room has a double bed.",
            "Her income doubled after the promotion."
         ]
      },
      {
         "id": 21,
         "word": "doubt",
         "role": "noun",
         "BrE": "/daʊt/",
         "AmE": "/daʊt/",
         "definition": "a feeling of being uncertain about something",
         "examples": [
            "I have no doubt he will win.",
            "There’s some doubt about the plan.",
            "She expressed doubt about the decision."
         ]
      },
      {
         "id": 21,
         "word": "dressed",
         "role": "adjective",
         "BrE": "/drest/",
         "AmE": "/drest/",
         "definition": "wearing clothes",
         "examples": [
            "She is dressed in blue.",
            "He was dressed for the party.",
            "They were formally dressed for the event."
         ]
      },
      {
         "id": 21,
         "word": "drop",
         "role": "verb",
         "BrE": "/drɒp/",
         "AmE": "/drɑːp/",
         "definition": "to fall or let something fall by accident",
         "examples": [
            "I dropped my pen.",
            "She dropped the glass on the floor.",
            "The temperature dropped suddenly overnight."
         ]
      },
      {
         "id": 21,
         "word": "drum",
         "role": "noun",
         "BrE": "/drʌm/",
         "AmE": "/drʌm/",
         "definition": "a musical instrument that you hit with your hands or sticks",
         "examples": [
            "He plays the drum.",
            "The drum made a loud sound.",
            "The band’s drummer set the rhythm."
         ]
      },
      {
         "id": 21,
         "word": "drunk",
         "role": "adjective",
         "BrE": "/drʌŋk/",
         "AmE": "/drʌŋk/",
         "definition": "having drunk too much alcohol",
         "examples": [
            "He was drunk after the party.",
            "Drunk driving is dangerous.",
            "She felt drunk after just one drink."
         ]
      },
      {
         "id": 21,
         "word": "due",
         "role": "adjective",
         "BrE": "/djuː/",
         "AmE": "/duː/",
         "definition": "expected or planned to happen at a particular time",
         "examples": [
            "The bus is due at 5 p.m.",
            "Her project is due tomorrow.",
            "The payment is due by the end of the month."
         ]
      },
      {
         "id": 21,
         "word": "dust",
         "role": "noun",
         "BrE": "/dʌst/",
         "AmE": "/dʌst/",
         "definition": "a fine powder made of very small pieces of dirt",
         "examples": [
            "The table is covered in dust.",
            "She cleaned the dust from the shelf.",
            "Dust from the road made it hard to see."
         ]
      },
      {
         "id": 22,
         "word": "duty",
         "role": "noun",
         "BrE": "/ˈdjuːti/",
         "AmE": "/ˈduːti/",
         "definition": "something you must do because it is your job or responsibility",
         "examples": [
            "It’s my duty to help.",
            "The guard is on duty tonight.",
            "She fulfilled her duty as a teacher."
         ]
      },
      {
         "id": 22,
         "word": "earthquake",
         "role": "noun",
         "BrE": "/ˈɜːθkweɪk/",
         "AmE": "/ˈɜːrθkweɪk/",
         "definition": "a sudden shaking of the ground caused by movement under the earth’s surface",
         "examples": [
            "The earthquake damaged houses.",
            "An earthquake struck the city last night.",
            "The region is prone to frequent earthquakes."
         ]
      },
      {
         "id": 22,
         "word": "eastern",
         "role": "adjective",
         "BrE": "/ˈiːstən/",
         "AmE": "/ˈiːstərn/",
         "definition": "in or from the east of a place",
         "examples": [
            "Eastern food is spicy.",
            "She lives in eastern Canada.",
            "The eastern region faces cold winters."
         ]
      },
      {
         "id": 22,
         "word": "economic",
         "role": "adjective",
         "BrE": "/ˌiːkəˈnɒmɪk/",
         "AmE": "/ˌiːkəˈnɑːmɪk/",
         "definition": "connected with the economy or the use of money",
         "examples": [
            "The country has economic problems.",
            "Economic growth was slow this year.",
            "The economic policy affects businesses."
         ]
      },
      {
         "id": 22,
         "word": "economy",
         "role": "noun",
         "BrE": "/ɪˈkɒnəmi/",
         "AmE": "/ɪˈkɑːnəmi/",
         "definition": "the system of money, industry, and trade in a country or region",
         "examples": [
            "The economy is growing.",
            "The global economy affects jobs.",
            "The economy recovered after the crisis."
         ]
      },
      {
         "id": 22,
         "word": "edge",
         "role": "noun",
         "BrE": "/edʒ/",
         "AmE": "/edʒ/",
         "definition": "the outside limit of an object, area, or surface",
         "examples": [
            "Stand at the edge of the pool.",
            "The cup was on the edge of the table.",
            "The town is on the edge of the forest."
         ]
      },
      {
         "id": 22,
         "word": "editor",
         "role": "noun",
         "BrE": "/ˈedɪtə(r)/",
         "AmE": "/ˈedɪtər/",
         "definition": "a person who is in charge of a newspaper, magazine, etc., or part of one",
         "examples": [
            "The editor checked the article.",
            "She works as a magazine editor.",
            "The editor made changes to the story."
         ]
      },
      {
         "id": 22,
         "word": "educate",
         "role": ".providers",
         "AmE": "/ˈedʒukeɪt/",
         "definition": "to teach or train somebody, especially in school",
         "examples": [
            "Teachers educate children.",
            "The program educates people about health.",
            "The school educates students in science."
         ]
      },
      {
         "id": 22,
         "word": "educated",
         "role": "adjective",
         "BrE": "/ˈedʒukeɪtɪd/",
         "AmE": "/ˈedʒukeɪtɪd/",
         "definition": "having learned a lot through study or training",
         "examples": [
            "She is an educated woman.",
            "He is well educated in history.",
            "Educated professionals are in demand."
         ]
      },
      {
         "id": 22,
         "word": "educational",
         "role": "adjective",
         "BrE": "/ˌedʒuˈkeɪʃənl/",
         "AmE": "/ˌedʒuˈkeɪʃənl/",
         "definition": "connected with education",
         "examples": [
            "The show is educational.",
            "The museum offers educational programs.",
            "Educational games help children learn."
         ]
      },
      {
         "id": 23,
         "word": "effective",
         "role": "adjective",
         "BrE": "/ɪˈfektɪv/",
         "AmE": "/ɪˈfektɪv/",
         "definition": "producing the result that is wanted or intended",
         "examples": [
            "The medicine is effective.",
            "Her teaching method is very effective.",
            "The new strategy proved highly effective."
         ]
      },
      {
         "id": 23,
         "word": "effectively",
         "role": "adverb",
         "BrE": "/ɪˈfektɪvli/",
         "AmE": "/ɪˈfektɪvli/",
         "definition": "in a way that produces the result that is wanted",
         "examples": [
            "She works effectively.",
            "He explained the topic effectively.",
            "The team collaborated effectively on the project."
         ]
      },
      {
         "id": 23,
         "word": "effort",
         "role": "noun",
         "BrE": "/ˈefət/",
         "AmE": "/ˈefərt/",
         "definition": "the physical or mental energy needed to do something",
         "examples": [
            "It took effort to climb the hill.",
            "She put effort into her studies.",
            "The team’s effort led to victory."
         ]
      },
      {
         "id": 23,
         "word": "election",
         "role": "noun",
         "BrE": "/ɪˈlekʃn/",
         "AmE": "/ɪˈlekʃn/",
         "definition": "the act of choosing a person for a position by voting",
         "examples": [
            "The election is next month.",
            "She won the election for mayor.",
            "The presidential election attracted global attention."
         ]
      },
      {
         "id": 23,
         "word": "element",
         "role": "noun",
         "BrE": "/ˈelɪmənt/",
         "AmE": "/ˈelɪmənt/",
         "definition": "a part of something, especially one that is necessary",
         "examples": [
            "Water is an element of life.",
            "Trust is an element of friendship.",
            "The design includes modern elements."
         ]
      },
      {
         "id": 23,
         "word": "embarrassed",
         "role": "adjective",
         "BrE": "/ɪmˈbærəst/",
         "AmE": "/ɪmˈbærəst/",
         "definition": "feeling shy, awkward, or ashamed",
         "examples": [
            "I was embarrassed by my mistake.",
            "She felt embarrassed during the speech.",
            "He was embarrassed about forgetting her name."
         ]
      },
      {
         "id": 23,
         "word": "embarrassing",
         "role": "adjective",
         "BrE": "/ɪmˈbærəsɪŋ/",
         "AmE": "/ɪmˈbærəsɪŋ/",
         "definition": "making you feel shy, awkward, or ashamed",
         "examples": [
            "It was an embarrassing moment.",
            "His mistake was embarrassing for him.",
            "The situation was highly embarrassing for everyone."
         ]
      },
      {
         "id": 23,
         "word": "emergency",
         "role": "noun",
         "BrE": "/ɪˈmɜːdʒənsi/",
         "AmE": "/ɪˈmɜːrdʒənsi/",
         "definition": "a sudden serious event that needs immediate action",
         "examples": [
            "Call 911 in an emergency.",
            "The hospital handles emergencies.",
            "The emergency required quick thinking."
         ]
      },
      {
         "id": 23,
         "word": "emotion",
         "role": "noun",
         "BrE": "/ɪˈməʊʃn/",
         "AmE": "/ɪˈmoʊʃn/",
         "definition": "a strong feeling such as love, anger, or fear",
         "examples": [
            "She showed no emotion.",
            "His speech was full of emotion.",
            "The movie stirred deep emotions in the audience."
         ]
      },
      {
         "id": 23,
         "word": "employment",
         "role": "noun",
         "BrE": "/ɪmˈplɔɪmənt/",
         "AmE": "/ɪmˈplɔɪmənt/",
         "definition": "the situation in which people have work",
         "examples": [
            "He found employment as a teacher.",
            "Employment rates are increasing.",
            "The company offers stable employment."
         ]
      },
      {
         "id": 24,
         "word": "empty",
         "role": "adjective",
         "BrE": "/ˈempti/",
         "AmE": "/ˈempti/",
         "definition": "with nothing or nobody inside",
         "examples": [
            "The box is empty.",
            "The room was empty after the party.",
            "The streets were empty late at night."
         ]
      },
      {
         "id": 24,
         "word": "encourage",
         "role": "verb",
         "BrE": "/ɪnˈkʌrɪdʒ/",
         "AmE": "/ɪnˈkɜːrɪdʒ/",
         "definition": "to give somebody support or confidence to do something",
         "examples": [
            "I encourage you to try.",
            "She encouraged him to study harder.",
            "The teacher encourages creativity in class."
         ]
      },
      {
         "id": 24,
         "word": "enemy",
         "role": "noun",
         "BrE": "/ˈenəmi/",
         "AmE": "/ˈenəmi/",
         "definition": "a person who hates or opposes another person",
         "examples": [
            "He has no enemies.",
            "The enemy attacked the village.",
            "They were enemies during the competition."
         ]
      },
      {
         "id": 24,
         "word": "engaged",
         "role": "adjective",
         "BrE": "/ɪnˈɡeɪdʒd/",
         "AmE": "/ɪnˈɡeɪdʒd/",
         "definition": "having agreed to marry somebody",
         "examples": [
            "They got engaged last week.",
            "The engaged couple planned their wedding.",
            "She is engaged to her childhood friend."
         ]
      },
      {
         "id": 24,
         "word": "engineering",
         "role": "noun",
         "BrE": "/ˌendʒɪˈnɪərɪŋ/",
         "AmE": "/ˌendʒɪˈnɪrɪŋ/",
         "definition": "the activity of applying scientific knowledge to design and build machines, structures, etc.",
         "examples": [
            "Engineering is his career.",
            "She studied engineering at university.",
            "Engineering advances improve technology."
         ]
      },
      {
         "id": 24,
         "word": "entertain",
         "role": "verb",
         "BrE": "/ˌentəˈteɪn/",
         "AmE": "/ˌentərˈteɪn/",
         "definition": "to interest and amuse somebody",
         "examples": [
            "The clown entertained the children.",
            "The movie entertained the audience.",
            "She entertained guests with her stories."
         ]
      },
      {
         "id": 24,
         "word": "entertainment",
         "role": "noun",
         "BrE": "/ˌentəˈteɪnmənt/",
         "AmE": "/ˌentərˈteɪnmənt/",
         "definition": "things such as films, television, or shows that amuse or interest people",
         "examples": [
            "The party had great entertainment.",
            "Live music is popular entertainment.",
            "The festival offered a variety of entertainment."
         ]
      },
      {
         "id": 24,
         "word": "entrance",
         "role": "noun",
         "BrE": "/ˈentrəns/",
         "AmE": "/ˈentrəns/",
         "definition": "the act of entering or the place where you enter",
         "examples": [
            "The entrance is over there.",
            "Her entrance to the room was dramatic.",
            "The main entrance is heavily guarded."
         ]
      },
      {
         "id": 24,
         "word": "entry",
         "role": "noun",
         "BrE": "/ˈentri/",
         "AmE": "/ˈentri/",
         "definition": "the act of entering a place or competition",
         "examples": [
            "Entry to the park is free.",
            "The entry fee for the race is $10.",
            "Unauthorized entry is prohibited."
         ]
      },
      {
         "id": 24,
         "word": "environmental",
         "role": "adjective",
         "BrE": "/ɪnˌvaɪrənˈmentl/",
         "AmE": "/ɪnˌvaɪrənˈmentl/",
         "definition": "connected with the natural world",
         "examples": [
            "We care about environmental issues.",
            "Environmental laws protect wildlife.",
            "The environmental impact was significant."
         ]
      },
      {
         "id": 25,
         "word": "episode",
         "role": "noun",
         "BrE": "/ˈepɪsəʊd/",
         "AmE": "/ˈepɪsoʊd/",
         "definition": "one part of a television or radio series",
         "examples": [
            "I watched one episode of the show.",
            "The latest episode was exciting.",
            "The series has ten episodes this season."
         ]
      },
      {
         "id": 25,
         "word": "equal",
         "role": "adjective",
         "BrE": "/ˈiːkwəl/",
         "AmE": "/ˈiːkwəl/",
         "definition": "the same in size, amount, value, or importance",
         "examples": [
            "The teams have equal scores.",
            "Everyone should have equal rights.",
            "The tasks were divided into equal parts."
         ]
      },
      {
         "id": 25,
         "word": "equally",
         "role": "adverb",
         "BrE": "/ˈiːkwəli/",
         "AmE": "/ˈiːkwəli/",
         "definition": "to the same degree or amount",
         "examples": [
            "Share the food equally.",
            "Both teams played equally well.",
            "Resources were distributed equally among groups."
         ]
      },
      {
         "id": 25,
         "word": "escape",
         "role": "verb",
         "BrE": "/ɪˈskeɪp/",
         "AmE": "/ɪˈskeɪp/",
         "definition": "to get away from a place or situation",
         "examples": [
            "The dog escaped from the yard.",
            "She escaped from danger.",
            "The prisoner escaped from the jail."
         ]
      },
      {
         "id": 25,
         "word": "essential",
         "role": "adjective",
         "BrE": "/ɪˈsenʃl/",
         "AmE": "/ɪˈsenʃl/",
         "definition": "completely necessary",
         "examples": [
            "Water is essential for life.",
            "This book is essential for the course.",
            "Good communication is essential in teamwork."
         ]
      },
      {
         "id": 25,
         "word": "eventually",
         "role": "adverb",
         "BrE": "/ɪˈventʃuəli/",
         "AmE": "/ɪˈventʃuəli/",
         "definition": "in the end, especially after a long time",
         "examples": [
            "She eventually found her keys.",
            "He eventually finished the race.",
            "The project was eventually completed."
         ]
      },
      {
         "id": 25,
         "word": "examine",
         "role": "verb",
         "BrE": "/ɪɡˈzæmɪn/",
         "AmE": "/ɪɡˈzæmɪn/",
         "definition": "to look at something carefully to learn about it",
         "examples": [
            "The doctor examined the patient.",
            "She examined the map closely.",
            "Scientists examined the evidence thoroughly."
         ]
      },
      {
         "id": 25,
         "word": "except",
         "role": "preposition",
         "BrE": "/ɪkˈsept/",
         "AmE": "/ɪkˈsept/",
         "definition": "not including; apart from",
         "examples": [
            "Everyone came except John.",
            "The store is open except on Sundays.",
            "All the answers were correct except one."
         ]
      },
      {
         "id": 25,
         "word": "exchange",
         "role": "noun",
         "BrE": "/ɪksˈtʃeɪndʒ/",
         "AmE": "/ɪksˈtʃeɪndʒ/",
         "definition": "the act of giving something to somebody and receiving something else",
         "examples": [
            "We had an exchange of gifts.",
            "The exchange of ideas was helpful.",
            "The currency exchange rate changed."
         ]
      },
      {
         "id": 25,
         "word": "excitement",
         "role": "noun",
         "BrE": "/ɪkˈsaɪtmənt/",
         "AmE": "/ɪkˈsaɪtmənt/",
         "definition": "a feeling of being excited",
         "examples": [
            "The game caused a lot of excitement.",
            "Her excitement about the trip was clear.",
            "The announcement created excitement in the crowd."
         ]
      },
      {
         "id": 26,
         "word": "exhibition",
         "role": "noun",
         "BrE": "/ˌeksɪˈbɪʃn/",
         "AmE": "/ˌeksɪˈbɪʃn/",
         "definition": "a collection of things shown publicly, especially in a museum or gallery",
         "examples": [
            "The art exhibition was amazing.",
            "She visited an exhibition of paintings.",
            "The exhibition showcased new technology."
         ]
      },
      {
         "id": 26,
         "word": "expand",
         "role": "verb",
         "BrE": "/ɪkˈspænd/",
         "AmE": "/ɪkˈspænd/",
         "definition": "to become or make something larger",
         "examples": [
            "The balloon will expand.",
            "The company plans to expand its stores.",
            "The business expanded into new markets."
         ]
      },
      {
         "id": 26,
         "word": "expected",
         "role": "adjective",
         "BrE": "/ɪkˈspektɪd/",
         "AmE": "/ɪkˈspektɪd/",
         "definition": "thought or believed to happen or be true",
         "examples": [
            "The expected time is 3 p.m.",
            "The expected results were positive.",
            "The project’s expected outcome was achieved."
         ]
      },
      {
         "id": 26,
         "word": "expedition",
         "role": "noun",
         "BrE": "/ˌekspəˈdɪʃn/",
         "AmE": "/ˌekspəˈdɪʃn/",
         "definition": "an organized journey for a particular purpose",
         "examples": [
            "The expedition explored the jungle.",
            "They went on a climbing expedition.",
            "The scientific expedition studied marine life."
         ]
      },
      {
         "id": 26,
         "word": "experience",
         "role": "noun",
         "BrE": "/ɪkˈspɪəriəns/",
         "AmE": "/ɪkˈspɪriəns/",
         "definition": "the knowledge or skill you get from doing or seeing something",
         "examples": [
            "I have no experience in cooking.",
            "Her work experience helped her get the job.",
            "Traveling provides valuable life experience."
         ]
      },
      {
         "id": 26,
         "word": "experienced",
         "role": "adjective",
         "BrE": "/ɪkˈspɪəriənst/",
         "AmE": "/ɪkˈspɪriənst/",
         "definition": "having knowledge or skill from doing something",
         "examples": [
            "He is an experienced teacher.",
            "We need an experienced driver.",
            "The experienced team handled the crisis well."
         ]
      },
      {
         "id": 26,
         "word": "experiment",
         "role": "noun",
         "BrE": "/ɪkˈsperɪmənt/",
         "AmE": "/ɪkˈsperɪmənt/",
         "definition": "a scientific test done to learn something or test a theory",
         "examples": [
            "We did an experiment in class.",
            "The experiment tested the new drug.",
            "The experiment yielded unexpected results."
         ]
      },
      {
         "id": 26,
         "word": "explode",
         "role": "verb",
         "BrE": "/ɪkˈspləʊd/",
         "AmE": "/ɪkˈsploʊd/",
         "definition": "to burst or make something burst with a loud noise",
         "examples": [
            "The balloon might explode.",
            "The bomb exploded in the distance.",
            "The fireworks exploded in bright colors."
         ]
      },
      {
         "id": 26,
         "word": "explore",
         "role": "verb",
         "BrE": "/ɪkˈsplɔː(r)/",
         "AmE": "/ɪkˈsplɔːr/",
         "definition": "to travel around a place to learn about it",
         "examples": [
            "Let’s explore the forest.",
            "They explored the city on foot.",
            "The team explored new methods for research."
         ]
      },
      {
         "id": 26,
         "word": "explosion",
         "role": "noun",
         "BrE": "/ɪkˈspləʊʒn/",
         "AmE": "/ɪkˈsploʊʒn/",
         "definition": "the act of something bursting with a loud noise",
         "examples": [
            "The explosion was loud.",
            "The explosion caused a lot of damage.",
            "The factory explosion was investigated."
         ]
      },
      {
         "id": 27,
         "word": "export",
         "role": "verb",
         "BrE": "/ɪkˈspɔːt/",
         "AmE": "/ɪkˈspɔːrt/",
         "definition": "to sell and send goods to another country",
         "examples": [
            "They export fruit.",
            "The country exports oil to Europe.",
            "Exporting goods boosts the economy."
         ]
      },
      {
         "id": 27,
         "word": "extra",
         "role": "adjective",
         "BrE": "/ˈekstrə/",
         "AmE": "/ˈekstrə/",
         "definition": "more than is usual or necessary",
         "examples": [
            "I need extra paper.",
            "She worked extra hours this week.",
            "The store charges extra for delivery."
         ]
      },
      {
         "id": 27,
         "word": "face",
         "role": "noun",
         "BrE": "/feɪs/",
         "AmE": "/feɪs/",
         "definition": "the front part of the head, from the forehead to the chin",
         "examples": [
            "She has a happy face.",
            "His face turned red with embarrassment.",
            "The actor’s face was on the poster."
         ]
      },
      {
         "id": 27,
         "word": "fairly",
         "role": "adverb",
         "BrE": "/ˈfeəli/",
         "AmE": "/ˈferli/",
         "definition": "to some extent but not very",
         "examples": [
            "The test was fairly easy.",
            "She is fairly good at math.",
            "The weather is fairly warm today."
         ]
      },
      {
         "id": 27,
         "word": "familiar",
         "role": "adjective",
         "BrE": "/fəˈmɪliə(r)/",
         "AmE": "/fəˈmɪliər/",
         "definition": "well known to you or easily recognized",
         "examples": [
            "This song is familiar.",
            "Her face looks familiar to me.",
            "The city felt familiar after years away."
         ]
      },
      {
         "id": 27,
         "word": "fancy",
         "role": "adjective",
         "BrE": "/ˈfænsi/",
         "AmE": "/ˈfænsi/",
         "definition": "unusually complicated or expensive",
         "examples": [
            "She wore a fancy dress.",
            "The restaurant serves fancy food.",
            "The hotel was too fancy for my budget."
         ]
      },
      {
         "id": 27,
         "word": "far",
         "role": "adverb",
         "BrE": "/fɑː(r)/",
         "AmE": "/fɑːr/",
         "definition": "at or to a great distance",
         "examples": [
            "The shop is far from here.",
            "They traveled far to see the show.",
            "The village is far from the city center."
         ]
      },
      {
         "id": 27,
         "word": "fascinating",
         "role": "adjective",
         "BrE": "/ˈfæsɪneɪtɪŋ/",
         "AmE": "/ˈfæsɪneɪtɪŋ/",
         "definition": "extremely interesting",
         "examples": [
            "The book is fascinating.",
            "Her story was fascinating to hear.",
            "The documentary presented fascinating facts."
         ]
      },
      {
         "id": 27,
         "word": "fashionable",
         "role": "adjective",
         "BrE": "/ˈfæʃnəbl/",
         "AmE": "/ˈfæʃnəbl/",
         "definition": "following a style that is popular at a particular time",
         "examples": [
            "She wears fashionable clothes.",
            "This jacket is very fashionable now.",
            "Fashionable trends change every season."
         ]
      },
      {
         "id": 27,
         "word": "fasten",
         "role": "verb",
         "BrE": "/ˈfɑːsn/",
         "AmE": "/ˈfæsn/",
         "definition": "to close or join something securely",
         "examples": [
            "Fasten your seatbelt.",
            "She fastened the necklace around her neck.",
            "Please fasten the lid tightly."
         ]
      },
      {
         "id": 28,
         "word": "favour",
         "role": "noun",
         "BrE": "/ˈfeɪvə(r)/",
         "AmE": "/ˈfeɪvər/",
         "definition": "something you do to help someone",
         "examples": [
            "Can you do me a favour?",
            "She asked for a small favour.",
            "He did her a favour by lending money."
         ]
      },
      {
         "id": 28,
         "word": "fear",
         "role": "noun",
         "BrE": "/fɪə(r)/",
         "AmE": "/fɪr/",
         "definition": "the feeling you get when you are afraid",
         "examples": [
            "I have a fear of heights.",
            "Her fear of spiders is strong.",
            "The fear of failure stopped him."
         ]
      },
      {
         "id": 28,
         "word": "feature",
         "role": "noun",
         "BrE": "/ˈfiːtʃə(r)/",
         "AmE": "/ˈfiːtʃər/",
         "definition": "an important or noticeable part of something",
         "examples": [
            "The phone has new features.",
            "The main feature of the park is a lake.",
            "Safety features were added to the car."
         ]
      },
      {
         "id": 28,
         "word": "fence",
         "role": "noun",
         "BrE": "/fens/",
         "AmE": "/fens/",
         "definition": "a structure made of wood or metal that surrounds an area",
         "examples": [
            "The garden has a fence.",
            "The fence keeps the dog inside.",
            "They built a tall fence around the house."
         ]
      },
      {
         "id": 28,
         "word": "fighting",
         "role": "noun",
         "BrE": "/ˈfaɪtɪŋ/",
         "AmE": "/ˈfaɪtɪŋ/",
         "definition": "the act of taking part in a fight or battle",
         "examples": [
            "Fighting is not allowed in school.",
            "The fighting in the game was exciting.",
            "Street fighting caused injuries."
         ]
      },
      {
         "id": 28,
         "word": "file",
         "role": "noun",
         "BrE": "/faɪl/",
         "AmE": "/faɪl/",
         "definition": "a collection of information or documents stored together",
         "examples": [
            "I saved the file on my computer.",
            "The file contains important data.",
            "She organized files in the office."
         ]
      },
      {
         "id": 28,
         "word": "financial",
         "role": "adjective",
         "BrE": "/faɪˈnænʃl/",
         "AmE": "/faɪˈnænʃl/",
         "definition": "connected with money",
         "examples": [
            "He has financial problems.",
            "Financial support helped the project.",
            "The company faced financial challenges."
         ]
      },
      {
         "id": 28,
         "word": "fire",
         "role": "noun",
         "BrE": "/ˈfaɪə(r)/",
         "AmE": "/ˈfaɪr/",
         "definition": "the flames, light, and heat produced when something burns",
         "examples": [
            "The fire is warm.",
            "A fire destroyed the house.",
            "The fire spread quickly through the forest."
         ]
      },
      {
         "id": 28,
         "word": "fitness",
         "role": "noun",
         "BrE": "/ˈfɪtnəs/",
         "AmE": "/ˈfɪtnəs/",
         "definition": "the state of being physically healthy and strong",
         "examples": [
            "Fitness is important for health.",
            "She goes to the gym for fitness.",
            "The fitness program improved her strength."
         ]
      },
      {
         "id": 28,
         "word": "fixed",
         "role": "adjective",
         "BrE": "/fɪkst/",
         "AmE": "/fɪkst/",
         "definition": "firmly fastened and not able to be moved",
         "examples": [
            "The chair is fixed to the floor.",
            "The price is fixed at $10.",
            "The schedule is fixed for next week."
         ]
      },
      {
         "id": 29,
         "word": "flag",
         "role": "noun",
         "BrE": "/flæɡ/",
         "AmE": "/flæɡ/",
         "definition": "a piece of cloth with a special design, used as a symbol of a country or group",
         "examples": [
            "The flag is red and white.",
            "They raised the flag at school.",
            "The national flag was flown at the event."
         ]
      },
      {
         "id": 29,
         "word": "flood",
         "role": "noun",
         "BrE": "/flʌd/",
         "AmE": "/flʌd/",
         "definition": "a large amount of water covering an area that is usually dry",
         "examples": [
            "The flood damaged the village.",
            "Heavy rain caused a flood.",
            "The flood forced people to evacuate."
         ]
      },
      {
         "id": 29,
         "word": "flour",
         "role": "noun",
         "BrE": "/ˈflaʊə(r)/",
         "AmE": "/ˈflaʊər/",
         "definition": "a powder made from grain, used for making bread, cakes, etc.",
         "examples": [
            "I need flour to bake bread.",
            "She mixed flour with water.",
            "Whole wheat flour is healthier."
         ]
      },
      {
         "id": 29,
         "word": "flow",
         "role": "verb",
         "BrE": "/fləʊ/",
         "AmE": "/floʊ/",
         "definition": "to move smoothly and continuously, like water",
         "examples": [
            "The river flows fast.",
            "Traffic flowed smoothly today.",
            "Ideas flowed freely during the meeting."
         ]
      },
      {
         "id": 29,
         "word": "fold",
         "role": "verb",
         "BrE": "/fəʊld/",
         "AmE": "/foʊld/",
         "definition": "to bend something so that one part lies over another",
         "examples": [
            "Fold the paper in half.",
            "She folded the clothes neatly.",
            "He folded the map after using it."
         ]
      },
      {
         "id": 29,
         "word": "folk",
         "role": "noun",
         "BrE": "/fəʊk/",
         "AmE": "/foʊk/",
         "definition": "people in general",
         "examples": [
            "Folk here are friendly.",
            "The folk in the village helped us.",
            "Local folk shared their traditions."
         ]
      },
      {
         "id": 29,
         "word": "following",
         "role": "adjective",
         "BrE": "/ˈfɒləʊɪŋ/",
         "AmE": "/ˈfɑːloʊɪŋ/",
         "definition": "coming next in time or order",
         "examples": [
            "The following day was sunny.",
            "Read the following instructions.",
            "The following chapter explains the theory."
         ]
      },
      {
         "id": 29,
         "word": "force",
         "role": "noun",
         "BrE": "/fɔːs/",
         "AmE": "/fɔːrs/",
         "definition": "physical strength or power",
         "examples": [
            "The wind has strong force.",
            "The force of the storm was scary.",
            "They used force to open the door."
         ]
      },
      {
         "id": 29,
         "word": "forever",
         "role": "adverb",
         "BrE": "/fəˈrevə(r)/",
         "AmE": "/fəˈrevər/",
         "definition": "for all time",
         "examples": [
            "I’ll love you forever.",
            "The memory will last forever.",
            "The decision will affect us forever."
         ]
      },
      {
         "id": 29,
         "word": "frame",
         "role": "noun",
         "BrE": "/freɪm/",
         "AmE": "/freɪm/",
         "definition": "a structure that holds something, like a picture or window",
         "examples": [
            "The picture is in a frame.",
            "The window frame is wooden.",
            "The photo frame was beautifully designed."
         ]
      },
      {
         "id": 30,
         "word": "freeze",
         "role": "verb",
         "BrE": "/friːz/",
         "AmE": "/friːz/",
         "definition": "to become or make something very cold and hard, like ice",
         "examples": [
            "Water can freeze in winter.",
            "She froze the food to keep it fresh.",
            "The lake froze completely overnight."
         ]
      },
      {
         "id": 30,
         "word": "frequently",
         "role": "adverb",
         "BrE": "/ˈfriːkwəntli/",
         "AmE": "/ˈfriːkwəntli/",
         "definition": "often",
         "examples": [
            "I frequently visit my family.",
            "She frequently checks her phone.",
            "The bus arrives frequently during rush hour."
         ]
      },
      {
         "id": 30,
         "word": "friendship",
         "role": "noun",
         "BrE": "/ˈfrendʃɪp/",
         "AmE": "/ˈfrendʃɪp/",
         "definition": "a relationship between friends",
         "examples": [
            "Their friendship is strong.",
            "Friendship is important in life.",
            "The friendship grew over many years."
         ]
      },
      {
         "id": 30,
         "word": "frighten",
         "role": "verb",
         "BrE": "/ˈfraɪtn/",
         "AmE": "/ˈfraɪtn/",
         "definition": "to make someone afraid",
         "examples": [
            "The loud noise frightened me.",
            "The dog frightened the children.",
            "The movie’s scary scenes frightened her."
         ]
      },
      {
         "id": 30,
         "word": "frightened",
         "role": "adjective",
         "BrE": "/ˈfraɪtnd/",
         "AmE": "/ˈfraɪtnd/",
         "definition": "afraid or scared",
         "examples": [
            "I’m frightened of dogs.",
            "She was frightened by the storm.",
            "The frightened child hid under the bed."
         ]
      },
      {
         "id": 30,
         "word": "frightening",
         "role": "adjective",
         "BrE": "/ˈfraɪtnɪŋ/",
         "AmE": "/ˈfraɪtnɪŋ/",
         "definition": "making you feel afraid",
         "examples": [
            "The movie was frightening.",
            "The loud sound was frightening.",
            "The situation was frightening for everyone."
         ]
      },
      {
         "id": 30,
         "word": "frozen",
         "role": "adjective",
         "BrE": "/ˈfrəʊzn/",
         "AmE": "/ˈfroʊzn/",
         "definition": "extremely cold or turned into ice",
         "examples": [
            "The lake is frozen.",
            "She bought frozen food.",
            "The frozen ground was hard to walk on."
         ]
      },
      {
         "id": 30,
         "word": "fry",
         "role": "verb",
         "BrE": "/fraɪ/",
         "AmE": "/fraɪ/",
         "definition": "to cook something in hot fat or oil",
         "examples": [
            "I fry eggs for breakfast.",
            "She fried the chicken in oil.",
            "He fried potatoes for dinner."
         ]
      },
      {
         "id": 30,
         "word": "fuel",
         "role": "noun",
         "BrE": "/fjuːəl/",
         "AmE": "/fjuːəl/",
         "definition": "material like coal, oil, or gas that is burned to produce heat or power",
         "examples": [
            "The car needs fuel.",
            "Fuel prices are increasing.",
            "The plane ran out of fuel mid-flight."
         ]
      },
      {
         "id": 30,
         "word": "function",
         "role": "noun",
         "BrE": "/ˈfʌŋkʃn/",
         "AmE": "/ˈfʌŋkʃn/",
         "definition": "the purpose or role that something has",
         "examples": [
            "The machine’s function is to cut.",
            "The function of the heart is to pump blood.",
            "Each button has a specific function."
         ]
      },
         {
         "id": 31,
         "word": "fundamental",
         "role": "adjective",
         "BrE": "/ˌfʌndəˈmentl/",
         "AmE": "/ˌfʌndəˈmentl/",
         "definition": "basic or essential",
         "examples": [
            "Water is fundamental to life.",
            "Fundamental skills are taught first.",
            "The fundamental principles guide the research."
         ]
      },
      {
         "id": 31,
         "word": "funny",
         "role": "adjective",
         "BrE": "/ˈfʌni/",
         "AmE": "/ˈfʌni/",
         "definition": "making you laugh or amusing",
         "examples": [
            "The joke was funny.",
            "She told a funny story.",
            "His funny comments lightened the mood."
         ]
      },
      {
         "id": 31,
         "word": "fur",
         "role": "noun",
         "BrE": "/fɜː(r)/",
         "AmE": "/fɜːr/",
         "definition": "the soft, thick hair that covers the bodies of some animals",
         "examples": [
            "The cat has soft fur.",
            "The coat is made of fur.",
            "The animal’s fur keeps it warm."
         ]
      },
      {
         "id": 31,
         "word": "furniture",
         "role": "noun",
         "BrE": "/ˈfɜːnɪtʃə(r)/",
         "AmE": "/ˈfɜːrnɪtʃər/",
         "definition": "objects such as chairs, tables, and beds used in a home",
         "examples": [
            "The room has new furniture.",
            "She bought furniture for her house.",
            "The furniture was arranged neatly."
         ]
      },
      {
         "id": 31,
         "word": "gain",
         "role": "verb",
         "BrE": "/ɡeɪn/",
         "AmE": "/ɡeɪn/",
         "definition": "to get or obtain something",
         "examples": [
            "I gained new skills.",
            "She gained experience at work.",
            "The team gained confidence after the win."
         ]
      },
      {
         "id": 31,
         "word": "gap",
         "role": "noun",
         "BrE": "/ɡæp/",
         "AmE": "/ɡæp/",
         "definition": "a space or difference between two things",
         "examples": [
            "There’s a gap in the wall.",
            "The gap between the teams was clear.",
            "The age gap affected their friendship."
         ]
      },
      {
         "id": 31,
         "word": "gather",
         "role": "verb",
         "BrE": "/ˈɡæðə(r)/",
         "AmE": "/ˈɡæðər/",
         "definition": "to come or bring together in one place",
         "examples": [
            "We gather at the park.",
            "She gathered her books for class.",
            "They gathered evidence for the case."
         ]
      },
      {
         "id": 31,
         "word": "generally",
         "role": "adverb",
         "BrE": "/ˈdʒenrəli/",
         "AmE": "/ˈdʒenrəli/",
         "definition": "by most people or in most situations",
         "examples": [
            "It’s generally sunny here.",
            "People generally like her.",
            "The rule is generally applied."
         ]
      },
      {
         "id": 31,
         "word": "generation",
         "role": "noun",
         "BrE": "/ˌdʒenəˈreɪʃn/",
         "AmE": "/ˌdʒenəˈreɪʃn/",
         "definition": "all the people born around the same time",
         "examples": [
            "My generation loves music.",
            "The older generation uses less technology.",
            "The new generation faces different challenges."
         ]
      },
      {
         "id": 31,
         "word": "gentle",
         "role": "adjective",
         "BrE": "/ˈdʒentl/",
         "AmE": "/ˈdʒentl/",
         "definition": "kind, soft, or quiet",
         "examples": [
            "She has a gentle voice.",
            "The gentle breeze felt nice.",
            "His gentle approach calmed the situation."
         ]
      },
      {
         "id": 32,
         "word": "gently",
         "role": "adverb",
         "BrE": "/ˈdʒentli/",
         "AmE": "/ˈdʒentli/",
         "definition": "in a kind, soft, or quiet way",
         "examples": [
            "Speak gently to the baby.",
            "She gently touched the flower.",
            "He gently explained the mistake."
         ]
      },
      {
         "id": 32,
         "word": "gift",
         "role": "noun",
         "BrE": "/ɡɪft/",
         "AmE": "/ɡɪft/",
         "definition": "something given to someone without expecting payment",
         "examples": [
            "I got a gift for my birthday.",
            "She gave him a gift of books.",
            "The gift was wrapped beautifully."
         ]
      },
      {
         "id": 32,
         "word": "global",
         "role": "adjective",
         "BrE": "/ˈɡləʊbl/",
         "AmE": "/ˈɡloʊbl/",
         "definition": "relating to the whole world",
         "examples": [
            "Global news is on TV.",
            "The company has global offices.",
            "Global warming affects everyone."
         ]
      },
      {
         "id": 32,
         "word": "glove",
         "role": "noun",
         "BrE": "/ɡlʌv/",
         "AmE": "/ɡlʌv/",
         "definition": "a piece of clothing that covers the hand",
         "examples": [
            "I wear gloves in winter.",
            "She lost one glove at the park.",
            "The gloves protected her hands from cold."
         ]
      },
      {
         "id": 32,
         "word": "goal",
         "role": "noun",
         "BrE": "/ɡəʊl/",
         "AmE": "/ɡoʊl/",
         "definition": "something you want to achieve",
         "examples": [
            "My goal is to learn English.",
            "Her goal is to become a doctor.",
            "The team achieved its sales goal."
         ]
      },
      {
         "id": 32,
         "word": "govern",
         "role": "verb",
         "BrE": "/ˈɡʌvn/",
         "AmE": "/ˈɡʌvərn/",
         "definition": "to officially control a country or organization",
         "examples": [
            "They govern the country well.",
            "The board governs the company.",
            "Laws govern how people behave."
         ]
      },
      {
         "id": 32,
         "word": "government",
         "role": "noun",
         "BrE": "/ˈɡʌvənmənt/",
         "AmE": "/ˈɡʌvərnmənt/",
         "definition": "the group of people who officially control a country",
         "examples": [
            "The government makes laws.",
            "The government built new schools.",
            "The government addressed the crisis quickly."
         ]
      },
      {
         "id": 32,
         "word": "grab",
         "role": "verb",
         "BrE": "/ɡræb/",
         "AmE": "/ɡræb/",
         "definition": "to take or hold something quickly",
         "examples": [
            "Grab your bag and go.",
            "She grabbed the book from the shelf.",
            "He grabbed the opportunity to travel."
         ]
      },
      {
         "id": 32,
         "word": "grade",
         "role": "noun",
         "BrE": "/ɡreɪd/",
         "AmE": "/ɡreɪd/",
         "definition": "a mark given for schoolwork or an exam",
         "examples": [
            "I got a good grade.",
            "Her grades in math are high.",
            "The teacher gave him a failing grade."
         ]
      },
      {
         "id": 32,
         "word": "graduate",
         "role": "verb",
         "BrE": "/ˈɡrædʒueɪt/",
         "AmE": "/ˈɡrædʒueɪt/",
         "definition": "to complete a course of study at a school or university",
         "examples": [
            "She will graduate next year.",
            "He graduated from high school.",
            "They graduated with honors in science."
         ]
      },
      {
         "id": 33,
         "word": "gradually",
         "role": "adverb",
         "BrE": "/ˈɡrædʒuəli/",
         "AmE": "/ˈɡrædʒuəli/",
         "definition": "slowly, over a period of time",
         "examples": [
            "The sky gradually got dark.",
            "She gradually improved her skills.",
            "The pain gradually went away."
         ]
      },
      {
         "id": 33,
         "word": "grain",
         "role": "noun",
         "BrE": "/ɡreɪn/",
         "AmE": "/ɡreɪn/",
         "definition": "the small, hard seeds of crops like wheat or rice",
         "examples": [
            "Rice is a type of grain.",
            "The farmer grows grains.",
            "Whole grains are good for health."
         ]
      },
      {
         "id": 33,
         "word": "graph",
         "role": "noun",
         "BrE": "/ɡræf/",
         "AmE": "/ɡræf/",
         "definition": "a diagram showing the relationship between two or more things",
         "examples": [
            "The graph shows sales data.",
            "She drew a graph for the project.",
            "The graph illustrated the trend clearly."
         ]
      },
      {
         "id": 33,
         "word": "grateful",
         "role": "adjective",
         "BrE": "/ˈɡreɪtfl/",
         "AmE": "/ˈɡreɪtfl/",
         "definition": "feeling or showing thanks",
         "examples": [
            "I’m grateful for your help.",
            "She was grateful for the gift.",
            "He is grateful for their support."
         ]
      },
      {
         "id": 33,
         "word": "growth",
         "role": "noun",
         "BrE": "/ɡrəʊθ/",
         "AmE": "/ɡroʊθ/",
         "definition": "the process of growing or increasing",
         "examples": [
            "The plant shows fast growth.",
            "Economic growth was strong.",
            "The city’s growth attracted new businesses."
         ]
      },
      {
         "id": 33,
         "word": "guarantee",
         "role": "noun",
         "BrE": "/ˌɡærənˈtiː/",
         "AmE": "/ˌɡærənˈtiː/",
         "definition": "a promise that something will be done or will happen",
         "examples": [
            "The product has a guarantee.",
            "The store offers a one-year guarantee.",
            "The guarantee covers repairs for free."
         ]
      },
      {
         "id": 33,
         "word": "guard",
         "role": "noun",
         "BrE": "/ɡɑːd/",
         "AmE": "/ɡɑːrd/",
         "definition": "a person who protects a place or person",
         "examples": [
            "The guard stands at the gate.",
            "A guard protects the building.",
            "The security guard checked my bag."
         ]
      },
      {
         "id": 33,
         "word": "guess",
         "role": "verb",
         "BrE": "/ɡes/",
         "AmE": "/ɡes/",
         "definition": "to try to give an answer without being sure",
         "examples": [
            "Can you guess my age?",
            "She guessed the answer correctly.",
            "I can only guess what happened."
         ]
      },
      {
         "id": 33,
         "word": "guest",
         "role": "noun",
         "BrE": "/ɡest/",
         "AmE": "/ɡest/",
         "definition": "a person invited to a place or event",
         "examples": [
            "We have a guest for dinner.",
            "The guest stayed at the hotel.",
            "The event had many important guests."
         ]
      },
      {
         "id": 33,
         "word": "guidance",
         "role": "noun",
         "BrE": "/ˈɡaɪdns/",
         "AmE": "/ˈɡaɪdns/",
         "definition": "help or advice given to someone",
         "examples": [
            "I need guidance with my homework.",
            "The teacher gave guidance on the project.",
            "Her guidance helped me succeed."
         ]
      },
      {
         "id": 34,
         "word": "habit",
         "role": "noun",
         "BrE": "/ˈhæbɪt/",
         "AmE": "/ˈhæbɪt/",
         "definition": "something you do often and regularly",
         "examples": [
            "Reading is my habit.",
            "She has a habit of waking early.",
            "Breaking bad habits takes effort."
         ]
      },
      {
         "id": 34,
         "word": "haircut",
         "role": "noun",
         "BrE": "/ˈheəkʌt/",
         "AmE": "/ˈherkʌt/",
         "definition": "the act or style of cutting someone’s hair",
         "examples": [
            "I need a haircut.",
            "Her new haircut looks great.",
            "The haircut changed his appearance."
         ]
      },
      {
         "id": 34,
         "word": "harm",
         "role": "noun",
         "BrE": "/hɑːm/",
         "AmE": "/hɑːrm/",
         "definition": "damage or injury",
         "examples": [
            "The storm caused no harm.",
            "Smoking can cause harm to health.",
            "The decision did more harm than good."
         ]
      },
      {
         "id": 34,
         "word": "harmful",
         "role": "adjective",
         "BrE": "/ˈhɑːmfl/",
         "AmE": "/ˈhɑːrmfl/",
         "definition": "causing damage or injury",
         "examples": [
            "Smoking is harmful.",
            "Harmful chemicals were removed.",
            "The harmful effects were studied."
         ]
      },
      {
         "id": 34,
         "word": "heat",
         "role": "noun",
         "BrE": "/hiːt/",
         "AmE": "/hiːt/",
         "definition": "the quality of being hot or warm",
         "examples": [
            "The heat is strong today.",
            "The heat from the fire was nice.",
            "The desert heat was unbearable."
         ]
      },
      {
         "id": 34,
         "word": "heating",
         "role": "noun",
         "BrE": "/ˈhiːtɪŋ/",
         "AmE": "/ˈhiːtɪŋ/",
         "definition": "the system or equipment used to make a place warm",
         "examples": [
            "The house has good heating.",
            "Heating costs are high in winter.",
            "The heating system was repaired."
         ]
      },
      {
         "id": 34,
         "word": "heavily",
         "role": "adverb",
         "BrE": "/ˈhevɪli/",
         "AmE": "/ˈhevɪli/",
         "definition": "to a great degree; a lot",
         "examples": [
            "It’s raining heavily outside.",
            "She relies heavily on her phone.",
            "The company invested heavily in technology."
         ]
      },
      {
         "id": 34,
         "word": "height",
         "role": "noun",
         "BrE": "/haɪt/",
         "AmE": "/haɪt/",
         "definition": "the measurement of how tall something is",
         "examples": [
            "The height of the tree is 10 meters.",
            "Her height is 1.7 meters.",
            "The height of the building impressed us."
         ]
      },
      {
         "id": 34,
         "word": "highly",
         "role": "adverb",
         "BrE": "/ˈhaɪli/",
         "AmE": "/ˈhaɪli/",
         "definition": "to a high degree or level",
         "examples": [
            "She is highly intelligent.",
            "The movie was highly rated.",
            "He is highly respected in his field."
         ]
      },
      {
         "id": 34,
         "word": "hire",
         "role": "verb",
         "BrE": "/ˈhaɪə(r)/",
         "AmE": "/ˈhaɪr/",
         "definition": "to give someone a job or to use something for payment",
         "examples": [
            "They will hire a new teacher.",
            "She hired a car for the trip.",
            "The company hired him for his skills."
         ]
      },
      {
         "id": 35,
         "word": "historic",
         "role": "adjective",
         "BrE": "/hɪˈstɒrɪk/",
         "AmE": "/hɪˈstɔːrɪk/",
         "definition": "important in history",
         "examples": [
            "This is a historic building.",
            "The event was a historic moment.",
            "The historic site attracts many visitors."
         ]
      },
      {
         "id": 35,
         "word": "historical",
         "role": "adjective",
         "BrE": "/hɪˈstɒrɪkl/",
         "AmE": "/hɪˈstɔːrɪkl/",
         "definition": "connected with history or based on events in the past",
         "examples": [
            "I read a historical book.",
            "The film is based on historical events.",
            "Historical records show the city’s growth."
         ]
      },
      {
         "id": 35,
         "word": "hobby",
         "role": "noun",
         "BrE": "/ˈhɒbi/",
         "AmE": "/ˈhɑːbi/",
         "definition": "an activity you enjoy doing in your free time",
         "examples": [
            "My hobby is reading.",
            "She has a hobby of painting.",
            "Collecting stamps is his favorite hobby."
         ]
      },
      {
         "id": 35,
         "word": "honest",
         "role": "adjective",
         "BrE": "/ˈɒnɪst/",
         "AmE": "/ˈɑːnɪst/",
         "definition": "always telling the truth",
         "examples": [
            "He is an honest boy.",
            "Her honest answer surprised me.",
            "Being honest builds trust in relationships."
         ]
      },
      {
         "id": 35,
         "word": "honestly",
         "role": "adverb",
         "BrE": "/ˈɒnɪstli/",
         "AmE": "/ˈɑːnɪstli/",
         "definition": "in a way that is truthful",
         "examples": [
            "I honestly don’t know.",
            "She spoke honestly about her feelings.",
            "Honestly, I didn’t expect that result."
         ]
      },
      {
         "id": 35,
         "word": "hopeful",
         "role": "adjective",
         "BrE": "/ˈhəʊpfl/",
         "AmE": "/ˈhoʊpfl/",
         "definition": "feeling or showing hope",
         "examples": [
            "I’m hopeful about the future.",
            "She is hopeful for a good grade.",
            "The team is hopeful of winning."
         ]
      },
      {
         "id": 35,
         "word": "horrible",
         "role": "adjective",
         "BrE": "/ˈhɒrəbl/",
         "AmE": "/ˈhɔːrəbl/",
         "definition": "very bad or unpleasant",
         "examples": [
            "The weather was horrible.",
            "The movie was horrible to watch.",
            "The accident was a horrible experience."
         ]
      },
      {
         "id": 35,
         "word": "horror",
         "role": "noun",
         "BrE": "/ˈhɒrə(r)/",
         "AmE": "/ˈhɔːrər/",
         "definition": "a strong feeling of fear or shock",
         "examples": [
            "The horror movie scared me.",
            "She watched in horror as it happened.",
            "The horror of the event shocked everyone."
         ]
      },
      {
         "id": 35,
         "word": "host",
         "role": "noun",
         "BrE": "/həʊst/",
         "AmE": "/hoʊst/",
         "definition": "a person who invites guests or organizes an event",
         "examples": [
            "She is the host of the party.",
            "The host welcomed the guests.",
            "The TV show has a new host."
         ]
      },
      {
         "id": 35,
         "word": "household",
         "role": "noun",
         "BrE": "/ˈhaʊshəʊld/",
         "AmE": "/ˈhaʊshoʊld/",
         "definition": "all the people living together in a house",
         "examples": [
            "Our household is small.",
            "The household shares the chores.",
            "Household expenses increased this year."
         ]
      },
      {
         "id": 36,
         "word": "housing",
         "role": "noun",
         "BrE": "/ˈhaʊzɪŋ/",
         "AmE": "/ˈhaʊzɪŋ/",
         "definition": "buildings or places for people to live",
         "examples": [
            "Housing is expensive here.",
            "The city needs more housing.",
            "Affordable housing is a big issue."
         ]
      },
      {
         "id": 36,
         "word": "human",
         "role": "noun",
         "BrE": "/ˈhjuːmən/",
         "AmE": "/ˈhjuːmən/",
         "definition": "a person",
         "examples": [
            "Humans need food and water.",
            "The human population is growing.",
            "Human behavior is studied in psychology."
         ]
      },
      {
         "id": 36,
         "word": "hunt",
         "role": "verb",
         "BrE": "/hʌnt/",
         "AmE": "/hʌnt/",
         "definition": "to chase and try to catch animals",
         "examples": [
            "They hunt in the forest.",
            "He hunted for food last weekend.",
            "The tribe hunts to survive."
         ]
      },
      {
         "id": 36,
         "word": "hurry",
         "role": "verb",
         "BrE": "/ˈhʌri/",
         "AmE": "/ˈhɜːri/",
         "definition": "to move or do something quickly",
         "examples": [
            "Hurry, we’re late!",
            "She hurried to catch the bus.",
            "They hurried to finish the project."
         ]
      },
      {
         "id": 36,
         "word": "ignore",
         "role": "verb",
         "BrE": "/ɪɡˈnɔː(r)/",
         "AmE": "/ɪɡˈnɔːr/",
         "definition": "to pay no attention to something",
         "examples": [
            "Don’t ignore the rules.",
            "She ignored his rude comment.",
            "Ignoring the problem won’t solve it."
         ]
      },
      {
         "id": 36,
         "word": "ill",
         "role": "adjective",
         "BrE": "/ɪl/",
         "AmE": "/ɪl/",
         "definition": "not healthy; sick",
         "examples": [
            "She is ill and needs rest.",
            "He felt ill after eating.",
            "The ill patient was taken to hospital."
         ]
      },
      {
         "id": 36,
         "word": "illegal",
         "role": "adjective",
         "BrE": "/ɪˈliːɡl/",
         "AmE": "/ɪˈliːɡl/",
         "definition": "not allowed by law",
         "examples": [
            "It’s illegal to steal.",
            "Illegal parking can lead to fines.",
            "The illegal activity was reported."
         ]
      },
      {
         "id": 36,
         "word": "image",
         "role": "noun",
         "BrE": "/ˈɪmɪdʒ/",
         "AmE": "/ˈɪmɪdʒ/",
         "definition": "a picture or photograph",
         "examples": [
            "The image is clear.",
            "She shared an image online.",
            "The image captured the moment perfectly."
         ]
      },
      {
         "id": 36,
         "word": "imagination",
         "role": "noun",
         "BrE": "/ɪˌmædʒɪˈneɪʃn/",
         "AmE": "/ɪˌmædʒɪˈneɪʃn/",
         "definition": "the ability to create ideas or pictures in your mind",
         "examples": [
            "Kids have great imagination.",
            "Her imagination created a fun story.",
            "The book sparks the reader’s imagination."
         ]
      },
      {
         "id": 36,
         "word": "immediate",
         "role": "adjective",
         "BrE": "/ɪˈmiːdiət/",
         "AmE": "/ɪˈmiːdiət/",
         "definition": "happening or done at once",
         "examples": [
            "I need an immediate answer.",
            "The response was immediate.",
            "Immediate action saved the situation."
         ]
      },
      {
         "id": 37,
         "word": "immediately",
         "role": "adverb",
         "BrE": "/ɪˈmiːdiətli/",
         "AmE": "/ɪˈmiːdiətli/",
         "definition": "at once; without delay",
         "examples": [
            "Call me immediately.",
            "She left immediately after the meeting.",
            "The doctor responded immediately to the emergency."
         ]
      },
      {
         "id": 37,
         "word": "impact",
         "role": "noun",
         "BrE": "/ˈɪmpækt/",
         "AmE": "/ˈɪmpækt/",
         "definition": "the effect or influence of something",
         "examples": [
            "The news had a big impact.",
            "Her speech had a strong impact.",
            "The policy’s impact was felt widely."
         ]
      },
      {
         "id": 37,
         "word": "impolite",
         "role": "adjective",
         "BrE": "/ˌɪmpəˈlaɪt/",
         "AmE": "/ˌɪmpəˈlaɪt/",
         "definition": "not polite; rude",
         "examples": [
            "It’s impolite to interrupt.",
            "His impolite behavior upset her.",
            "Being impolite can offend people."
         ]
      },
      {
         "id": 37,
         "word": "import",
         "role": "verb",
         "BrE": "/ɪmˈpɔːt/",
         "AmE": "/ɪmˈpɔːrt/",
         "definition": "to bring goods or services into a country",
         "examples": [
            "They import cars from Japan.",
            "The country imports most of its food.",
            "Importing goods can be expensive."
         ]
      },
      {
         "id": 37,
         "word": "importance",
         "role": "noun",
         "BrE": "/ɪmˈpɔːtns/",
         "AmE": "/ɪmˈpɔːrtns/",
         "definition": "the quality of being important",
         "examples": [
            "Health is of great importance.",
            "She understands the importance of study.",
            "The importance of teamwork was clear."
         ]
      },
      {
         "id": 37,
         "word": "impossible",
         "role": "adjective",
         "BrE": "/ɪmˈpɒsəbl/",
         "AmE": "/ɪmˈpɑːsəbl/",
         "definition": "not able to happen or exist",
         "examples": [
            "It’s impossible to fly without wings.",
            "The task seemed impossible at first.",
            "Finishing on time was impossible."
         ]
      },
      {
         "id": 37,
         "word": "impress",
         "role": "verb",
         "BrE": "/ɪmˈpres/",
         "AmE": "/ɪmˈpres/",
         "definition": "to make someone admire or respect you",
         "examples": [
            "Her skills impress me.",
            "He impressed the boss with his work.",
            "The performance impressed the audience."
         ]
      },
      {
         "id": 37,
         "word": "impressive",
         "role": "adjective",
         "BrE": "/ɪmˈpresɪv/",
         "AmE": "/ɪmˈpresɪv/",
         "definition": "causing admiration because it is very good or large",
         "examples": [
            "The view is impressive.",
            "Her speech was very impressive.",
            "The building’s size was impressive."
         ]
      },
      {
         "id": 37,
         "word": "improve",
         "role": "verb",
         "BrE": "/ɪmˈpruːv/",
         "AmE": "/ɪmˈpruːv/",
         "definition": "to make something better",
         "examples": [
            "I want to improve my English.",
            "She improved her grades this year.",
            "The company improved its services."
         ]
      },
      {
         "id": 37,
         "word": "improvement",
         "role": "noun",
         "BrE": "/ɪmˈpruːvmənt/",
         "AmE": "/ɪmˈpruːvmənt/",
         "definition": "the act or process of becoming better",
         "examples": [
            "There’s improvement in her work.",
            "The improvement in sales was clear.",
            "Home improvements increased the house’s value."
         ]
      },
      {
         "id": 38,
         "word": "include",
         "role": "verb",
         "BrE": "/ɪnˈkluːd/",
         "AmE": "/ɪnˈkluːd/",
         "definition": "to have something or someone as a part",
         "examples": [
            "The price includes tax.",
            "The team includes new players.",
            "The package includes free delivery."
         ]
      },
      {
         "id": 38,
         "word": "including",
         "role": "preposition",
         "BrE": "/ɪnˈkluːdɪŋ/",
         "AmE": "/ɪnˈkluːdɪŋ/",
         "definition": "having something or someone as a part",
         "examples": [
            "Everyone, including me, agrees.",
            "The group, including John, went hiking.",
            "All costs, including shipping, were covered."
         ]
      },
      {
         "id": 38,
         "word": "increase",
         "role": "verb",
         "BrE": "/ɪnˈkriːs/",
         "AmE": "/ɪnˈkriːs/",
         "definition": "to become or make something larger in amount",
         "examples": [
            "Prices increase every year.",
            "She increased her study time.",
            "The company increased its production."
         ]
      },
      {
         "id": 38,
         "word": "increasingly",
         "role": "adverb",
         "BrE": "/ɪnˈkriːsɪŋli/",
         "AmE": "/ɪnˈkriːsɪŋli/",
         "definition": "more and more",
         "examples": [
            "It’s increasingly hot today.",
            "She became increasingly confident.",
            "The issue is increasingly important."
         ]
      },
      {
         "id": 38,
         "word": "independent",
         "role": "adjective",
         "BrE": "/ˌɪndɪˈpendənt/",
         "AmE": "/ˌɪndɪˈpendənt/",
         "definition": "not needing other people or things",
         "examples": [
            "She is an independent woman.",
            "He lives an independent life.",
            "The country became independent in 1947."
         ]
      },
      {
         "id": 38,
         "word": "indicate",
         "role": "verb",
         "BrE": "/ˈɪndɪkeɪt/",
         "AmE": "/ˈɪndɪkeɪt/",
         "definition": "to show or suggest something",
         "examples": [
            "The sign indicates the exit.",
            "Her smile indicated happiness.",
            "The results indicate a need for change."
         ]
      },
      {
         "id": 38,
         "word": "individual",
         "role": "adjective",
         "BrE": "/ˌɪndɪˈvɪdʒuəl/",
         "AmE": "/ˌɪndɪˈvɪdʒuəl/",
         "definition": "considered separately from others",
         "examples": [
            "Each individual student got a book.",
            "Individual effort is important.",
            "The individual needs of clients vary."
         ]
      },
      {
         "id": 38,
         "word": "industry",
         "role": "noun",
         "BrE": "/ˈɪndəstri/",
         "AmE": "/ˈɪndəstri/",
         "definition": "the production of goods in factories",
         "examples": [
            "The car industry is big.",
            "She works in the fashion industry.",
            "The industry employs thousands of people."
         ]
      },
      {
         "id": 38,
         "word": "informal",
         "role": "adjective",
         "BrE": "/ɪnˈfɔːml/",
         "AmE": "/ɪnˈfɔːrml/",
         "definition": "relaxed and friendly, not following strict rules",
         "examples": [
            "We had an informal meeting.",
            "Her clothes are informal and comfortable.",
            "The event has an informal atmosphere."
         ]
      },
      {
         "id": 38,
         "word": "injure",
         "role": "verb",
         "BrE": "/ˈɪndʒə(r)/",
         "AmE": "/ˈɪndʒər/",
         "definition": "to hurt or harm someone or something",
         "examples": [
            "Don’t injure yourself playing.",
            "He injured his leg in the game.",
            "The accident injured several people."
         ]
      },
      {
         "id": 39,
         "word": "injury",
         "role": "noun",
         "BrE": "/ˈɪndʒəri/",
         "AmE": "/ˈɪndʒəri/",
         "definition": "damage to a person’s body",
         "examples": [
            "He has a leg injury.",
            "The injury took weeks to heal.",
            "Sports injuries are common in football."
         ]
      },
      {
         "id": 39,
         "word": "inner",
         "role": "adjective",
         "BrE": "/ˈɪnə(r)/",
         "AmE": "/ˈɪnər/",
         "definition": "inside or closer to the center",
         "examples": [
            "The inner room is small.",
            "She felt inner peace.",
            "The inner layer of the jacket is warm."
         ]
      },
      {
         "id": 39,
         "word": "insect",
         "role": "noun",
         "BrE": "/ˈɪnsekt/",
         "AmE": "/ˈɪnsekt/",
         "definition": "a small animal with six legs, often with wings",
         "examples": [
            "A bee is an insect.",
            "Insects were flying near the light.",
            "Some insects can carry diseases."
         ]
      },
      {
         "id": 39,
         "word": "install",
         "role": "verb",
         "BrE": "/ɪnˈstɔːl/",
         "AmE": "/ɪnˈstɔːl/",
         "definition": "to put equipment or software in place so it is ready to use",
         "examples": [
            "They will install a new TV.",
            "She installed a game on her phone.",
            "The company installed new software."
         ]
      },
      {
         "id": 39,
         "word": "instant",
         "role": "adjective",
         "BrE": "/ˈɪnstənt/",
         "AmE": "/ˈɪnstənt/",
         "definition": "happening immediately",
         "examples": [
            "The soup is instant.",
            "She felt instant relief.",
            "The instant response surprised everyone."
         ]
      },
      {
         "id": 39,
         "word": "instantly",
         "role": "adverb",
         "BrE": "/ˈɪnstəntli/",
         "AmE": "/ˈɪnstəntli/",
         "definition": "immediately",
         "examples": [
            "I recognized her instantly.",
            "The light turned on instantly.",
            "The message was sent instantly."
         ]
      },
      {
         "id": 39,
         "word": "instruction",
         "role": "noun",
         "BrE": "/ɪnˈstrʌkʃn/",
         "AmE": "/ɪnˈstrʌkʃn/",
         "definition": "information on how to do or use something",
         "examples": [
            "Follow the instructions.",
            "The instructions were clear.",
            "The manual provides detailed instructions."
         ]
      },
      {
         "id": 39,
         "word": "instrument",
         "role": "noun",
         "BrE": "/ˈɪnstrəmənt/",
         "AmE": "/ˈɪnstrəmənt/",
         "definition": "a tool or device used for a particular purpose, especially music",
         "examples": [
            "She plays a musical instrument.",
            "The guitar is her favorite instrument.",
            "The surgeon used a precise instrument."
         ]
      },
      {
         "id": 39,
         "word": "insult",
         "role": "verb",
         "BrE": "/ɪnˈsʌlt/",
         "AmE": "/ɪnˈsʌlt/",
         "definition": "to say or do something rude that offends someone",
         "examples": [
            "Don’t insult your friends.",
            "His words insulted her deeply.",
            "The comment was meant to insult him."
         ]
      },
      {
         "id": 39,
         "word": "intelligence",
         "role": "noun",
         "BrE": "/ɪnˈtelɪdʒəns/",
         "AmE": "/ɪnˈtelɪdʒəns/",
         "definition": "the ability to learn, understand, and make decisions",
         "examples": [
            "She has high intelligence.",
            "His intelligence helped solve the problem.",
            "Artificial intelligence is advancing rapidly."
         ]
      },
      {
         "id": 40,
         "word": "intelligent",
         "role": "adjective",
         "BrE": "/ɪnˈtelɪdʒənt/",
         "AmE": "/ɪnˈtelɪdʒənt/",
         "definition": "able to learn, understand, and make decisions quickly",
         "examples": [
            "He is an intelligent student.",
            "Her intelligent answers impressed the teacher.",
            "The intelligent design solved many issues."
         ]
      },
      {
         "id": 40,
         "word": "intend",
         "role": "verb",
         "BrE": "/ɪnˈtend/",
         "AmE": "/ɪnˈtend/",
         "definition": "to plan or mean to do something",
         "examples": [
            "I intend to study tonight.",
            "She intends to travel next year.",
            "They intend to launch a new product."
         ]
      },
      {
         "id": 40,
         "word": "intention",
         "role": "noun",
         "BrE": "/ɪnˈtenʃn/",
         "AmE": "/ɪnˈtenʃn/",
         "definition": "something you plan to do",
         "examples": [
            "My intention is to help.",
            "Her intention was to finish early.",
            "The company’s intention is to expand."
         ]
      },
      {
         "id": 40,
         "word": "international",
         "role": "adjective",
         "BrE": "/ˌɪntəˈnæʃnəl/",
         "AmE": "/ˌɪntərˈnæʃnəl/",
         "definition": "involving more than one country",
         "examples": [
            "It’s an international event.",
            "She works for an international company.",
            "International trade benefits the economy."
         ]
      },
      {
         "id": 40,
         "word": "interrupt",
         "role": "verb",
         "BrE": "/ˌɪntəˈrʌpt/",
         "AmE": "/ˌɪntəˈrʌpt/",
         "definition": "to stop something or someone temporarily",
         "examples": [
            "Don’t interrupt me now.",
            "She interrupted the meeting with a question.",
            "The phone call interrupted his work."
         ]
      },
      {
         "id": 40,
         "word": "interview",
         "role": "noun",
         "BrE": "/ˈɪntəvjuː/",
         "AmE": "/ˈɪntərvjuː/",
         "definition": "a formal meeting where someone asks questions to learn about a person",
         "examples": [
            "I have a job interview tomorrow.",
            "The interview was on TV.",
            "The interview helped her get the job."
         ]
      },
      {
         "id": 40,
         "word": "introduce",
         "role": "verb",
         "BrE": "/ˌɪntrəˈdjuːs/",
         "AmE": "/ˌɪntrəˈduːs/",
         "definition": "to present someone or something to others for the first time",
         "examples": [
            "Let me introduce my friend.",
            "She introduced a new idea.",
            "The company introduced a new product."
         ]
      },
      {
         "id": 40,
         "word": "introduction",
         "role": "noun",
         "BrE": "/ˌɪntrəˈdʌkʃn/",
         "AmE": "/ˌɪntrəˈdʌkʃn/",
         "definition": "the act of presenting someone or something for the first time",
         "examples": [
            "The book has an introduction.",
            "Her introduction to the team was warm.",
            "The introduction of the law caused debate."
         ]
      },
      {
         "id": 40,
         "word": "invent",
         "role": "verb",
         "BrE": "/ɪnˈvent/",
         "AmE": "/ɪnˈvent/",
         "definition": "to create something new that did not exist before",
         "examples": [
            "He invented a new game.",
            "The telephone was invented long ago.",
            "She invented a device to save energy."
         ]
      },
      {
         "id": 40,
         "word": "invention",
         "role": "noun",
         "BrE": "/ɪnˈvenʃn/",
         "AmE": "/ɪnˈvenʃn/",
         "definition": "something new that has been created",
         "examples": [
            "The invention changed lives.",
            "His invention was a success.",
            "The invention of the wheel was historic."
         ]
      },
         {
         "id": 41,
         "word": "invest",
         "role": "verb",
         "BrE": "/ɪnˈvest/",
         "AmE": "/ɪnˈvest/",
         "definition": "to put money into something to make a profit",
         "examples": [
            "I want to invest my money.",
            "She invested in a new company.",
            "They invested heavily in the project."
         ]
      },
      {
         "id": 41,
         "word": "investigation",
         "role": "noun",
         "BrE": "/ɪnˌvestɪˈɡeɪʃn/",
         "AmE": "/ɪnˌvestɪˈɡeɪʃn/",
         "definition": "the process of examining something to find out facts",
         "examples": [
            "The police started an investigation.",
            "The investigation found new evidence.",
            "The investigation into the case took months."
         ]
      },
      {
         "id": 41,
         "word": "invite",
         "role": "verb",
         "BrE": "/ɪnˈvaɪt/",
         "AmE": "/ɪnˈvaɪt/",
         "definition": "to ask someone to come to an event or place",
         "examples": [
            "I’ll invite her to the party.",
            "They invited us for dinner.",
            "She was invited to speak at the event."
         ]
      },
      {
         "id": 41,
         "word": "involve",
         "role": "verb",
         "BrE": "/ɪnˈvɒlv/",
         "AmE": "/ɪnˈvɑːlv/",
         "definition": "to include or affect someone or something",
         "examples": [
            "The game will involve teams.",
            "Her job involves a lot of travel.",
            "The project involves multiple departments."
         ]
      },
      {
         "id": 41,
         "word": "involved",
         "role": "adjective",
         "BrE": "/ɪnˈvɒlvd/",
         "AmE": "/ɪnˈvɑːlvd/",
         "definition": "taking part in something",
         "examples": [
            "She is involved in sports.",
            "He was involved in the decision.",
            "The involved parties reached an agreement."
         ]
      },
      {
         "id": 41,
         "word": "issue",
         "role": "noun",
         "BrE": "/ˈɪʃuː/",
         "AmE": "/ˈɪʃuː/",
         "definition": "a problem or topic for discussion",
         "examples": [
            "We have an issue with the plan.",
            "The issue was discussed in the meeting.",
            "Environmental issues are important."
         ]
      },
      {
         "id": 41,
         "word": "jacket",
         "role": "noun",
         "BrE": "/ˈdʒækɪt/",
         "AmE": "/ˈdʒækɪt/",
         "definition": "a short coat",
         "examples": [
            "I wore a jacket today.",
            "Her jacket is blue and warm.",
            "The leather jacket was expensive."
         ]
      },
      {
         "id": 41,
         "word": "jazz",
         "role": "noun",
         "BrE": "/dʒæz/",
         "AmE": "/dʒæz/",
         "definition": "a type of music with strong rhythms",
         "examples": [
            "I like listening to jazz.",
            "The jazz band played well.",
            "Jazz music is popular in the city."
         ]
      },
      {
         "id": 41,
         "word": "join",
         "role": "verb",
         "BrE": "/dʒɔɪn/",
         "AmE": "/dʒɔɪn/",
         "definition": "to become a member of a group or organization",
         "examples": [
            "I’ll join the club.",
            "She joined the team last year.",
            "He joined the company as a manager."
         ]
      },
      {
         "id": 41,
         "word": "journalist",
         "role": "noun",
         "BrE": "/ˈdʒɜːnəlɪst/",
         "AmE": "/ˈdʒɜːrnəlɪst/",
         "definition": "a person who writes or reports news",
         "examples": [
            "The journalist wrote an article.",
            "She is a famous journalist.",
            "Journalists covered the event live."
         ]
      },
      {
         "id": 42,
         "word": "journey",
         "role": "noun",
         "BrE": "/ˈdʒɜːni/",
         "AmE": "/ˈdʒɜːrni/",
         "definition": "the act of traveling from one place to another",
         "examples": [
            "The journey was long.",
            "Her journey to school takes an hour.",
            "The train journey was comfortable."
         ]
      },
      {
         "id": 42,
         "word": "judge",
         "role": "noun",
         "BrE": "/dʒʌdʒ/",
         "AmE": "/dʒʌdʒ/",
         "definition": "a person who decides the result of a competition or case",
         "examples": [
            "The judge made a decision.",
            "The judge awarded her first place.",
            "The court judge listened to the case."
         ]
      },
      {
         "id": 42,
         "word": "judgment",
         "role": "noun",
         "BrE": "/ˈdʒʌdʒmənt/",
         "AmE": "/ˈdʒʌdʒmənt/",
         "definition": "the ability to make decisions or the decision itself",
         "examples": [
            "I trust her judgment.",
            "His judgment was fair.",
            "The judgment in the case was clear."
         ]
      },
      {
         "id": 42,
         "word": "jump",
         "role": "verb",
         "BrE": "/dʒʌmp/",
         "AmE": "/dʒʌmp/",
         "definition": "to move quickly off the ground using your legs",
         "examples": [
            "The dog can jump high.",
            "She jumped over the fence.",
            "He jumped into the pool with a splash."
         ]
      },
      {
         "id": 42,
         "word": "justice",
         "role": "noun",
         "BrE": "/ˈdʒʌstɪs/",
         "AmE": "/ˈdʒʌstɪs/",
         "definition": "the fair treatment of people",
         "examples": [
            "We want justice for all.",
            "The court delivered justice.",
            "Justice was served in the trial."
         ]
      },
      {
         "id": 42,
         "word": "kick",
         "role": "verb",
         "BrE": "/kɪk/",
         "AmE": "/kɪk/",
         "definition": "to hit something with your foot",
         "examples": [
            "He kicked the ball.",
            "She kicked the door open.",
            "The player kicked the goal."
         ]
      },
      {
         "id": 42,
         "word": "killing",
         "role": "noun",
         "BrE": "/ˈkɪlɪŋ/",
         "AmE": "/ˈkɪlɪŋ/",
         "definition": "the act of causing death",
         "examples": [
            "The killing of animals is sad.",
            "The killing was reported on the news.",
            "The investigation focused on the killing."
         ]
      },
      {
         "id": 42,
         "word": "kindness",
         "role": "noun",
         "BrE": "/ˈkaɪndnəs/",
         "AmE": "/ˈkaɪndnəs/",
         "definition": "the quality of being kind",
         "examples": [
            "Her kindness helped me.",
            "He showed kindness to strangers.",
            "The act of kindness touched everyone."
         ]
      },
      {
         "id": 42,
         "word": "kiss",
         "role": "verb",
         "BrE": "/kɪs/",
         "AmE": "/kɪs/",
         "definition": "to touch someone with your lips to show love or greeting",
         "examples": [
            "She kissed her baby.",
            "He kissed her on the cheek.",
            "They kissed to celebrate their love."
         ]
      },
      {
         "id": 42,
         "word": "knock",
         "role": "verb",
         "BrE": "/nɒk/",
         "AmE": "/nɑːk/",
         "definition": "to hit a door or surface to get attention",
         "examples": [
            "Knock on the door.",
            "She knocked before entering.",
            "He knocked loudly to wake them."
         ]
      },
      {
         "id": 43,
         "word": "label",
         "role": "noun",
         "BrE": "/ˈleɪbl/",
         "AmE": "/ˈleɪbl/",
         "definition": "a piece of paper or material with information on it",
         "examples": [
            "Check the label on the bottle.",
            "The label shows the price.",
            "The product label lists the ingredients."
         ]
      },
      {
         "id": 43,
         "word": "laboratory",
         "role": "noun",
         "BrE": "/ləˈbɒrətri/",
         "AmE": "/ˈlæbrətɔːri/",
         "definition": "a room or building used for scientific experiments",
         "examples": [
            "We work in a laboratory.",
            "The laboratory has new equipment.",
            "The experiment was conducted in a laboratory."
         ]
      },
      {
         "id": 43,
         "word": "lack",
         "role": "noun",
         "BrE": "/læk/",
         "AmE": "/læk/",
         "definition": "not having enough of something",
         "examples": [
            "There’s a lack of water.",
            "The lack of time was a problem.",
            "A lack of funds delayed the project."
         ]
      },
      {
         "id": 43,
         "word": "landscape",
         "role": "noun",
         "BrE": "/ˈlændskeɪp/",
         "AmE": "/ˈlændskeɪp/",
         "definition": "everything you can see in an area of land",
         "examples": [
            "The landscape is beautiful.",
            "The desert landscape was vast.",
            "The painting shows a rural landscape."
         ]
      },
      {
         "id": 43,
         "word": "latest",
         "role": "adjective",
         "BrE": "/ˈleɪtɪst/",
         "AmE": "/ˈleɪtɪst/",
         "definition": "most recent",
         "examples": [
            "I bought the latest phone.",
            "Her latest book is popular.",
            "The latest news shocked everyone."
         ]
      },
      {
         "id": 43,
         "word": "laughter",
         "role": "noun",
         "BrE": "/ˈlɑːftə(r)/",
         "AmE": "/ˈlæftər/",
         "definition": "the act or sound of laughing",
         "examples": [
            "Her laughter filled the room.",
            "The joke caused loud laughter.",
            "Laughter helped reduce the tension."
         ]
      },
      {
         "id": 43,
         "word": "laundry",
         "role": "noun",
         "BrE": "/ˈlɔːndri/",
         "AmE": "/ˈlɔːndri/",
         "definition": "clothes that need to be washed or have been washed",
         "examples": [
            "I need to do the laundry.",
            "The laundry is drying outside.",
            "She folded the clean laundry."
         ]
      },
      {
         "id": 43,
         "word": "lawyer",
         "role": "noun",
         "BrE": "/ˈlɔɪə(r)/",
         "AmE": "/ˈlɔɪər/",
         "definition": "a person who is trained to advise people about the law",
         "examples": [
            "The lawyer helped me.",
            "She hired a lawyer for the case.",
            "The lawyer presented evidence in court."
         ]
      },
      {
         "id": 43,
         "word": "leadership",
         "role": "noun",
         "BrE": "/ˈliːdəʃɪp/",
         "AmE": "/ˈliːdərʃɪp/",
         "definition": "the ability to lead or the position of a leader",
         "examples": [
            "Good leadership is important.",
            "Her leadership inspired the team.",
            "The company needs strong leadership."
         ]
      },
      {
         "id": 43,
         "word": "leading",
         "role": "adjective",
         "BrE": "/ˈliːdɪŋ/",
         "AmE": "/ˈliːdɪŋ/",
         "definition": "most important or best",
         "examples": [
            "He is a leading scientist.",
            "The leading brand sells well.",
            "She is a leading expert in biology."
         ]
      },
      {
         "id": 44,
         "word": "league",
         "role": "noun",
         "BrE": "/liːɡ/",
         "AmE": "/liːɡ/",
         "definition": "a group of teams that compete in a sport",
         "examples": [
            "Our team is in the league.",
            "The league has ten teams.",
            "They won the football league."
         ]
      },
      {
         "id": 44,
         "word": "lean",
         "role": "verb",
         "BrE": "/liːn/",
         "AmE": "/liːn/",
         "definition": "to bend or move from an upright position",
         "examples": [
            "Lean against the wall.",
            "She leaned forward to listen.",
            "He leaned out of the window to wave."
         ]
      },
      {
         "id": 44,
         "word": "lecture",
         "role": "noun",
         "BrE": "/ˈlektʃə(r)/",
         "AmE": "/ˈlektʃər/",
         "definition": "a talk given to teach people about a subject",
         "examples": [
            "The lecture was about history.",
            "She attended a lecture at college.",
            "The professor gave an interesting lecture."
         ]
      },
      {
         "id": 44,
         "word": "legal",
         "role": "adjective",
         "BrE": "/ˈliːɡl/",
         "AmE": "/ˈliːɡl/",
         "definition": "allowed by the law",
         "examples": [
            "It’s a legal contract.",
            "The action was legal and fair.",
            "Legal advice helped solve the issue."
         ]
      },
      {
         "id": 44,
         "word": "lend",
         "role": "verb",
         "BrE": "/lend/",
         "AmE": "/lend/",
         "definition": "to give something to someone for a short time",
         "examples": [
            "Can you lend me a pen?",
            "She lent her book to a friend.",
            "The bank lends money to businesses."
         ]
      },
      {
         "id": 44,
         "word": "length",
         "role": "noun",
         "BrE": "/leŋθ/",
         "AmE": "/leŋθ/",
         "definition": "the measurement of something from end to end",
         "examples": [
            "The length of the table is 2 meters.",
            "The movie’s length is two hours.",
            "The length of the river is impressive."
         ]
      },
      {
         "id": 44,
         "word": "less",
         "role": "determiner",
         "BrE": "/les/",
         "AmE": "/les/",
         "definition": "a smaller amount of something",
         "examples": [
            "I have less money now.",
            "She ate less food than yesterday.",
            "Less effort was needed this time."
         ]
      },
      {
         "id": 44,
         "word": "license",
         "role": "noun",
         "BrE": "/ˈlaɪsns/",
         "AmE": "/ˈlaɪsns/",
         "definition": "an official document that allows you to do something",
         "examples": [
            "I got my driver’s license.",
            "The license allows her to work.",
            "The restaurant has a food license."
         ]
      },
      {
         "id": 44,
         "word": "lie",
         "role": "verb",
         "BrE": "/laɪ/",
         "AmE": "/laɪ/",
         "definition": "to be or put yourself in a flat position",
         "examples": [
            "Lie down on the bed.",
            "She lay on the grass to rest.",
            "He was lying on the couch all day."
         ]
      },
      {
         "id": 44,
         "word": "lift",
         "role": "verb",
         "BrE": "/lɪft/",
         "AmE": "/lɪft/",
         "definition": "to raise something or someone to a higher position",
         "examples": [
            "Lift the box carefully.",
            "She lifted the child onto the chair.",
            "The crane lifted the heavy load."
         ]
      },
      {
         "id": 45,
         "word": "likely",
         "role": "adjective",
         "BrE": "/ˈlaɪkli/",
         "AmE": "/ˈlaɪkli/",
         "definition": "probably going to happen",
         "examples": [
            "It’s likely to rain today.",
            "She is likely to win the race.",
            "The plan is likely to succeed."
         ]
      },
      {
         "id": 45,
         "word": "limit",
         "role": "noun",
         "BrE": "/ˈlɪmɪt/",
         "AmE": "/ˈlɪmɪt/",
         "definition": "the greatest amount or level allowed",
         "examples": [
            "There’s a speed limit here.",
            "The limit for bags is two.",
            "The time limit for the exam is one hour."
         ]
      },
      {
         "id": 45,
         "word": "limited",
         "role": "adjective",
         "BrE": "/ˈlɪmɪtɪd/",
         "AmE": "/ˈlɪmɪtɪd/",
         "definition": "not very large in amount or number",
         "examples": [
            "We have limited time.",
            "The store has limited stock.",
            "Her knowledge of the topic is limited."
         ]
      },
      {
         "id": 45,
         "word": "liquid",
         "role": "noun",
         "BrE": "/ˈlɪkwɪd/",
         "AmE": "/ˈlɪkwɪd/",
         "definition": "a substance that flows, like water",
         "examples": [
            "Water is a liquid.",
            "The liquid spilled on the floor.",
            "The recipe needs a liquid ingredient."
         ]
      },
      {
         "id": 45,
         "word": "literature",
         "role": "noun",
         "BrE": "/ˈlɪtrətʃə(r)/",
         "AmE": "/ˈlɪtərətʃər/",
         "definition": "books, poems, etc., considered as art",
         "examples": [
            "I study English literature.",
            "She loves reading classic literature.",
            "The library has a literature section."
         ]
      },
      {
         "id": 45,
         "word": "load",
         "role": "noun",
         "BrE": "/ləʊd/",
         "AmE": "/loʊd/",
         "definition": "something that is carried, often heavy",
         "examples": [
            "The truck carried a heavy load.",
            "She carried a load of books.",
            "The load was too heavy for him."
         ]
      },
      {
         "id": 45,
         "word": "local",
         "role": "adjective",
         "BrE": "/ˈləʊkl/",
         "AmE": "/ˈloʊkl/",
         "definition": "relating to a particular area or place",
         "examples": [
            "I shop at the local store.",
            "The local team won the game.",
            "Local news covered the event."
         ]
      },
      {
         "id": 45,
         "word": "locate",
         "role": "verb",
         "BrE": "/ləʊˈkeɪt/",
         "AmE": "/ˈloʊkeɪt/",
         "definition": "to find the position of something",
         "examples": [
            "Can you locate the keys?",
            "She located the shop on the map.",
            "They located the missing item."
         ]
      },
      {
         "id": 45,
         "word": "location",
         "role": "noun",
         "BrE": "/ləʊˈkeɪʃn/",
         "AmE": "/loʊˈkeɪʃn/",
         "definition": "a place or position",
         "examples": [
            "The location is beautiful.",
            "The store’s location is central.",
            "They chose a new location for the event."
         ]
      },
      {
         "id": 45,
         "word": "lock",
         "role": "verb",
         "BrE": "/lɒk/",
         "AmE": "/lɑːk/",
         "definition": "to close something with a key",
         "examples": [
            "Lock the door before leaving.",
            "She locked her bike to the pole.",
            "He locked the safe with his money."
         ]
      },
      {
         "id": 46,
         "word": "logical",
         "role": "adjective",
         "BrE": "/ˈlɒdʒɪkl/",
         "AmE": "/ˈlɑːdʒɪkl/",
         "definition": "based on reason or clear thinking",
         "examples": [
            "Her answer was logical.",
            "The plan seems logical to me.",
            "A logical solution fixed the issue."
         ]
      },
      {
         "id": 46,
         "word": "lonely",
         "role": "adjective",
         "BrE": "/ˈləʊnli/",
         "AmE": "/ˈloʊnli/",
         "definition": "feeling sad because you are alone",
         "examples": [
            "She felt lonely at home.",
            "The lonely man sat by himself.",
            "Being lonely can affect your health."
         ]
      },
      {
         "id": 46,
         "word": "loss",
         "role": "noun",
         "BrE": "/lɒs/",
         "AmE": "/lɔːs/",
         "definition": "the act of losing something",
         "examples": [
            "The loss of my phone was bad.",
            "The team suffered a big loss.",
            "The loss of jobs worried the town."
         ]
      },
      {
         "id": 46,
         "word": "lovely",
         "role": "adjective",
         "BrE": "/ˈlʌvli/",
         "AmE": "/ˈlʌvli/",
         "definition": "beautiful or attractive",
         "examples": [
            "The flowers are lovely.",
            "She wore a lovely dress.",
            "The lovely view attracted tourists."
         ]
      },
      {
         "id": 46,
         "word": "luck",
         "role": "noun",
         "BrE": "/lʌk/",
         "AmE": "/lʌk/",
         "definition": "good or bad things that happen by chance",
         "examples": [
            "I had good luck today.",
            "Her luck changed after the win.",
            "With luck, we’ll finish early."
         ]
      },
      {
         "id": 46,
         "word": "luggage",
         "role": "noun",
         "BrE": "/ˈlʌɡɪdʒ/",
         "AmE": "/ˈlʌɡɪdʒ/",
         "definition": "bags and cases used for traveling",
         "examples": [
            "My luggage is heavy.",
            "She lost her luggage at the airport.",
            "The luggage was checked before boarding."
         ]
      },
      {
         "id": 46,
         "word": "magic",
         "role": "noun",
         "BrE": "/ˈmædʒɪk/",
         "AmE": "/ˈmædʒɪk/",
         "definition": "the use of special powers to make things happen",
         "examples": [
            "The story is about magic.",
            "The magic trick amazed the kids.",
            "The show was full of magic and wonder."
         ]
      },
      {
         "id": 46,
         "word": "mainly",
         "role": "adverb",
         "BrE": "/ˈmeɪnli/",
         "AmE": "/ˈmeɪnli/",
         "definition": "mostly or to a large extent",
         "examples": [
            "The book is mainly about love.",
            "She works mainly from home.",
            "The event is mainly for students."
         ]
      },
      {
         "id": 46,
         "word": "maintain",
         "role": "verb",
         "BrE": "/meɪnˈteɪn/",
         "AmE": "/meɪnˈteɪn/",
         "definition": "to keep something in good condition or at the same level",
         "examples": [
            "Maintain your car regularly.",
            "She maintains a healthy diet.",
            "The team maintained their lead."
         ]
      },
      {
         "id": 46,
         "word": "major",
         "role": "adjective",
         "BrE": "/ˈmeɪdʒə(r)/",
         "AmE": "/ˈmeɪdʒər/",
         "definition": "very important or large",
         "examples": [
            "It’s a major problem.",
            "He made a major decision.",
            "The city is a major tourist spot."
         ]
      },
      {
         "id": 47,
         "word": "majority",
         "role": "noun",
         "BrE": "/məˈdʒɒrəti/",
         "AmE": "/məˈdʒɔːrəti/",
         "definition": "the largest part of a group",
         "examples": [
            "The majority voted yes.",
            "The majority of students passed.",
            "The majority preferred the new plan."
         ]
      },
      {
         "id": 47,
         "word": "manage",
         "role": "verb",
         "BrE": "/ˈmænɪdʒ/",
         "AmE": "/ˈmænɪdʒ/",
         "definition": "to control or be in charge of something",
         "examples": [
            "She manages a small shop.",
            "He managed the project well.",
            "They managed to finish on time."
         ]
      },
      {
         "id": 47,
         "word": "management",
         "role": "noun",
         "BrE": "/ˈmænɪdʒmənt/",
         "AmE": "/ˈmænɪdʒmənt/",
         "definition": "the act of controlling or organizing something",
         "examples": [
            "Good management is key.",
            "The management made new rules.",
            "Time management helps with work."
         ]
      },
      {
         "id": 47,
         "word": "manager",
         "role": "noun",
         "BrE": "/ˈmænɪdʒə(r)/",
         "AmE": "/ˈmænɪdʒər/",
         "definition": "a person who controls or organizes a business or group",
         "examples": [
            "The manager is kind.",
            "She spoke to the store manager.",
            "The manager led the team to success."
         ]
      },
      {
         "id": 47,
         "word": "manner",
         "role": "noun",
         "BrE": "/ˈmænə(r)/",
         "AmE": "/ˈmænər/",
         "definition": "the way something is done or happens",
         "examples": [
            "Speak in a polite manner.",
            "Her manner was calm and friendly.",
            "He explained it in a clear manner."
         ]
      },
      {
         "id": 47,
         "word": "march",
         "role": "verb",
         "BrE": "/mɑːtʃ/",
         "AmE": "/mɑːrtʃ/",
         "definition": "to walk in a group, often for a purpose",
         "examples": [
            "The soldiers march in a line.",
            "They marched for peace.",
            "The protesters marched through the city."
         ]
      },
      {
         "id": 47,
         "word": "marriage",
         "role": "noun",
         "BrE": "/ˈmærɪdʒ/",
         "AmE": "/ˈmærɪdʒ/",
         "definition": "the relationship between two people who are married",
         "examples": [
            "Their marriage is happy.",
            "The marriage lasted ten years.",
            "The marriage ceremony was beautiful."
         ]
      },
      {
         "id": 47,
         "word": "mass",
         "role": "noun",
         "BrE": "/mæs/",
         "AmE": "/mæs/",
         "definition": "a large amount or number of something",
         "examples": [
            "A mass of people came.",
            "The mass of papers was heavy.",
            "The event attracted a mass of visitors."
         ]
      },
      {
         "id": 47,
         "word": "massive",
         "role": "adjective",
         "BrE": "/ˈmæsɪv/",
         "AmE": "/ˈmæsɪv/",
         "definition": "very large in size or amount",
         "examples": [
            "The building is massive.",
            "She received a massive gift.",
            "The massive crowd cheered loudly."
         ]
      },
      {
         "id": 47,
         "word": "material",
         "role": "noun",
         "BrE": "/məˈtɪəriəl/",
         "AmE": "/məˈtɪriəl/",
         "definition": "a substance used to make things",
         "examples": [
            "The dress is made of soft material.",
            "Wood is a common building material.",
            "The material for the project was expensive."
         ]
      },
      {
         "id": 48,
         "word": "mathematics",
         "role": "noun",
         "BrE": "/ˌmæθəˈmætɪks/",
         "AmE": "/ˌmæθəˈmætɪks/",
         "definition": "the study of numbers, shapes, and patterns",
         "examples": [
            "Mathematics is my favorite subject.",
            "She teaches mathematics at school.",
            "Mathematics helps solve real-world problems."
         ]
      },
      {
         "id": 48,
         "word": "mature",
         "role": "adjective",
         "BrE": "/məˈtʃʊə(r)/",
         "AmE": "/məˈtʃʊr/",
         "definition": "fully grown or developed, especially mentally",
         "examples": [
            "He is a mature student.",
            "Her mature attitude impressed me.",
            "The decision showed a mature mindset."
         ]
      },
      {
         "id": 48,
         "word": "maximum",
         "role": "adjective",
         "BrE": "/ˈmæksɪməm/",
         "AmE": "/ˈmæksɪməm/",
         "definition": "the largest possible amount",
         "examples": [
            "The maximum score is 100.",
            "The room holds a maximum of 50 people.",
            "The maximum speed is 60 mph."
         ]
      },
      {
         "id": 48,
         "word": "measure",
         "role": "verb",
         "BrE": "/ˈmeʒə(r)/",
         "AmE": "/ˈmeʒər/",
         "definition": "to find the size, amount, or degree of something",
         "examples": [
            "Measure the length of the table.",
            "She measured the room carefully.",
            "They measured the success of the project."
         ]
      },
      {
         "id": 48,
         "word": "media",
         "role": "noun",
         "BrE": "/ˈmiːdiə/",
         "AmE": "/ˈmiːdiə/",
         "definition": "means of communication, like TV, newspapers, or the internet",
         "examples": [
            "The media reported the news.",
            "Social media is popular today.",
            "The media covered the event widely."
         ]
      },
      {
         "id": 48,
         "word": "medical",
         "role": "adjective",
         "BrE": "/ˈmedɪkl/",
         "AmE": "/ˈmedɪkl/",
         "definition": "related to medicine or health",
         "examples": [
            "She needs medical help.",
            "The medical team was ready.",
            "Medical research saved many lives."
         ]
      },
      {
         "id": 48,
         "word": "medicine",
         "role": "noun",
         "BrE": "/ˈmedɪsn/",
         "AmE": "/ˈmedɪsn/",
         "definition": "a substance used to treat illness",
         "examples": [
            "Take your medicine now.",
            "The medicine helped her recover.",
            "The doctor prescribed new medicine."
         ]
      },
      {
         "id": 48,
         "word": "medium",
         "role": "adjective",
         "BrE": "/ˈmiːdiəm/",
         "AmE": "/ˈmiːdiəm/",
         "definition": "average in size or amount",
         "examples": [
            "I want a medium coffee.",
            "She wears medium-sized clothes.",
            "The project is of medium difficulty."
         ]
      },
      {
         "id": 48,
         "word": "melt",
         "role": "verb",
         "BrE": "/melt/",
         "AmE": "/melt/",
         "definition": "to change from solid to liquid by heating",
         "examples": [
            "The ice will melt soon.",
            "She melted the chocolate for baking.",
            "The snow melted in the warm sun."
         ]
      },
      {
         "id": 48,
         "word": "membership",
         "role": "noun",
         "BrE": "/ˈmembəʃɪp/",
         "AmE": "/ˈmembərʃɪp/",
         "definition": "the state of being a member of a group or organization",
         "examples": [
            "I have a gym membership.",
            "Membership costs $50 a year.",
            "Her membership gave her access to events."
         ]
      },
      {
         "id": 49,
         "word": "memory",
         "role": "noun",
         "BrE": "/ˈmeməri/",
         "AmE": "/ˈmeməri/",
         "definition": "the ability to remember or something you remember",
         "examples": [
            "I have a good memory.",
            "Her memory of the trip was clear.",
            "The event is a happy memory for her."
         ]
      },
      {
         "id": 49,
         "word": "mental",
         "role": "adjective",
         "BrE": "/ˈmentl/",
         "AmE": "/ˈmentl/",
         "definition": "relating to the mind",
         "examples": [
            "Mental health is important.",
            "She has strong mental focus.",
            "The task required mental effort."
         ]
      },
      {
         "id": 49,
         "word": "mention",
         "role": "verb",
         "BrE": "/ˈmenʃn/",
         "AmE": "/ˈmenʃn/",
         "definition": "to talk or write about something briefly",
         "examples": [
            "She mentioned her new job.",
            "He didn’t mention the problem.",
            "The article mentioned recent changes."
         ]
      },
      {
         "id": 49,
         "word": "menu",
         "role": "noun",
         "BrE": "/ˈmenjuː/",
         "AmE": "/ˈmenjuː/",
         "definition": "a list of food or drinks available in a restaurant",
         "examples": [
            "The menu has pizza.",
            "She read the menu carefully.",
            "The restaurant updated its menu."
         ]
      },
      {
         "id": 49,
         "word": "mess",
         "role": "noun",
         "BrE": "/mes/",
         "AmE": "/mes/",
         "definition": "a situation or place that is dirty or untidy",
         "examples": [
            "My room is a mess.",
            "The kitchen was in a mess.",
            "The project turned into a big mess."
         ]
      },
      {
         "id": 49,
         "word": "method",
         "role": "noun",
         "BrE": "/ˈmeθəd/",
         "AmE": "/ˈmeθəd/",
         "definition": "a way of doing something",
         "examples": [
            "This is a good method.",
            "Her teaching method works well.",
            "The method improved their results."
         ]
      },
      {
         "id": 49,
         "word": "military",
         "role": "adjective",
         "BrE": "/ˈmɪlɪtri/",
         "AmE": "/ˈmɪlɪteri/",
         "definition": "relating to the armed forces",
         "examples": [
            "He wears a military uniform.",
            "The military base is nearby.",
            "Military training is very strict."
         ]
      },
      {
         "id": 49,
         "word": "mind",
         "role": "noun",
         "BrE": "/maɪnd/",
         "AmE": "/maɪnd/",
         "definition": "the part of a person that thinks and feels",
         "examples": [
            "My mind is tired today.",
            "She changed her mind about the plan.",
            "His mind was focused on the task."
         ]
      },
      {
         "id": 49,
         "word": "mine",
         "role": "noun",
         "BrE": "/maɪn/",
         "AmE": "/maɪn/",
         "definition": "a place underground where minerals are dug",
         "examples": [
            "The mine produces coal.",
            "Workers went into the mine.",
            "The gold mine was very profitable."
         ]
      },
      {
         "id": 49,
         "word": "minimum",
         "role": "adjective",
         "BrE": "/ˈmɪnɪməm/",
         "AmE": "/ˈmɪnɪməm/",
         "definition": "the smallest possible amount",
         "examples": [
            "The minimum age is 18.",
            "Pay the minimum amount now.",
            "The minimum requirement was met."
         ]
      },
      {
         "id": 50,
         "word": "minor",
         "role": "adjective",
         "BrE": "/ˈmaɪnə(r)/",
         "AmE": "/ˈmaɪnər/",
         "definition": "not very important or serious",
         "examples": [
            "It’s a minor problem.",
            "She had a minor injury.",
            "The change was minor but helpful."
         ]
      },
      {
         "id": 50,
         "word": "minority",
         "role": "noun",
         "BrE": "/maɪˈnɒrəti/",
         "AmE": "/maɪˈnɔːrəti/",
         "definition": "the smaller part of a group",
         "examples": [
            "A minority voted no.",
            "The minority group had a voice.",
            "Only a minority supported the idea."
         ]
      },
      {
         "id": 50,
         "word": "mirror",
         "role": "noun",
         "BrE": "/ˈmɪrə(r)/",
         "AmE": "/ˈmɪrər/",
         "definition": "a piece of glass that reflects images",
         "examples": [
            "I looked in the mirror.",
            "The mirror is on the wall.",
            "She checked her hair in the mirror."
         ]
      },
      {
         "id": 50,
         "word": "mix",
         "role": "verb",
         "BrE": "/mɪks/",
         "AmE": "/mɪks/",
         "definition": "to combine two or more things together",
         "examples": [
            "Mix the sugar and flour.",
            "She mixed colors for the painting.",
            "The DJ mixed two songs together."
         ]
      },
      {
         "id": 50,
         "word": "mixture",
         "role": "noun",
         "BrE": "/ˈmɪkstʃə(r)/",
         "AmE": "/ˈmɪkstʃər/",
         "definition": "a combination of different things",
         "examples": [
            "The cake needs a mixture.",
            "The mixture of colors was bright.",
            "The dish is a mixture of flavors."
         ]
      },
      {
         "id": 50,
         "word": "modern",
         "role": "adjective",
         "BrE": "/ˈmɒdn/",
         "AmE": "/ˈmɑːdərn/",
         "definition": "relating to the present time or recent ideas",
         "examples": [
            "This is a modern phone.",
            "Her house has a modern design.",
            "Modern technology changes fast."
         ]
      },
      {
         "id": 50,
         "word": "monitor",
         "role": "verb",
         "BrE": "/ˈmɒnɪtə(r)/",
         "AmE": "/ˈmɑːnɪtər/",
         "definition": "to watch or check something carefully",
         "examples": [
            "They monitor the weather.",
            "She monitors her students’ progress.",
            "The system monitors traffic in real-time."
         ]
      },
      {
         "id": 50,
         "word": "mood",
         "role": "noun",
         "BrE": "/muːd/",
         "AmE": "/muːd/",
         "definition": "the way you feel at a particular time",
         "examples": [
            "I’m in a good mood today.",
            "Her mood changed after the news.",
            "The music created a happy mood."
         ]
      },
      {
         "id": 50,
         "word": "moral",
         "role": "adjective",
         "BrE": "/ˈmɒrəl/",
         "AmE": "/ˈmɔːrəl/",
         "definition": "relating to right and wrong behavior",
         "examples": [
            "It’s a moral question.",
            "She has strong moral values.",
            "The story teaches a moral lesson."
         ]
      },
      {
         "id": 50,
         "word": "mostly",
         "role": "adverb",
         "BrE": "/ˈməʊstli/",
         "AmE": "/ˈmoʊstli/",
         "definition": "almost all or mainly",
         "examples": [
            "The team is mostly new players.",
            "It’s mostly sunny this afternoon.",
            "The audience was mostly young people."
         ]
      },
         {
         "id": 51,
         "word": "motivate",
         "role": "verb",
         "BrE": "/ˈməʊtɪveɪt/",
         "AmE": "/ˈmoʊtɪveɪt/",
         "definition": "to make someone want to do something",
         "examples": [
            "The teacher motivates her students.",
            "He was motivated by the reward.",
            "The speech motivated the team to work harder."
         ]
      },
      {
         "id": 51,
         "word": "motivation",
         "role": "noun",
         "BrE": "/ˌməʊtɪˈveɪʃn/",
         "AmE": "/ˌmoʊtɪˈveɪʃn/",
         "definition": "the reason or desire to do something",
         "examples": [
            "My motivation is to learn.",
            "Her motivation comes from her goals.",
            "Lack of motivation affected his progress."
         ]
      },
      {
         "id": 51,
         "word": "motor",
         "role": "noun",
         "BrE": "/ˈməʊtə(r)/",
         "AmE": "/ˈmoʊtər/",
         "definition": "a device that produces power or movement",
         "examples": [
            "The car has a strong motor.",
            "The boat’s motor stopped working.",
            "The motor powers the machine."
         ]
      },
      {
         "id": 51,
         "word": "movement",
         "role": "noun",
         "BrE": "/ˈmuːvmənt/",
         "AmE": "/ˈmuːvmənt/",
         "definition": "the act of moving or a group working for a cause",
         "examples": [
            "I saw a movement in the bushes.",
            "The movement for peace grew.",
            "Her hand movement was quick."
         ]
      },
      {
         "id": 51,
         "word": "multiply",
         "role": "verb",
         "BrE": "/ˈmʌltɪplaɪ/",
         "AmE": "/ˈmʌltɪplaɪ/",
         "definition": "to increase in number or do a calculation",
         "examples": [
            "Two multiplied by three is six.",
            "The bacteria multiply quickly.",
            "Her efforts multiplied the team’s success."
         ]
      },
      {
         "id": 51,
         "word": "muscle",
         "role": "noun",
         "BrE": "/ˈmʌsl/",
         "AmE": "/ˈmʌsl/",
         "definition": "a part of the body that produces movement",
         "examples": [
            "My muscle hurts after exercise.",
            "He built muscle by lifting weights.",
            "The athlete’s muscles are strong."
         ]
      },
      {
         "id": 51,
         "word": "musical",
         "role": "adjective",
         "BrE": "/ˈmjuːzɪkl/",
         "AmE": "/ˈmjuːzɪkl/",
         "definition": "relating to music",
         "examples": [
            "She plays a musical instrument.",
            "The musical performance was amazing.",
            "His musical talent impressed everyone."
         ]
      },
      {
         "id": 51,
         "word": "musician",
         "role": "noun",
         "BrE": "/mjuˈzɪʃn/",
         "AmE": "/mjuˈzɪʃn/",
         "definition": "a person who plays or writes music",
         "examples": [
            "The musician played the guitar.",
            "She is a talented musician.",
            "The musician performed at the concert."
         ]
      },
      {
         "id": 51,
         "word": "nail",
         "role": "noun",
         "BrE": "/neɪl/",
         "AmE": "/neɪl/",
         "definition": "a small metal pin used to hold things together or a part of a finger",
         "examples": [
            "I hammered a nail into the wood.",
            "She painted her nails red.",
            "The nail broke while fixing the shelf."
         ]
      },
      {
         "id": 51,
         "word": "narrow",
         "role": "adjective",
         "BrE": "/ˈnærəʊ/",
         "AmE": "/ˈnæroʊ/",
         "definition": "not wide",
         "examples": [
            "The street is narrow.",
            "The narrow path was hard to walk.",
            "The bridge is too narrow for cars."
         ]
      },
      {
         "id": 52,
         "word": "nation",
         "role": "noun",
         "BrE": "/ˈneɪʃn/",
         "AmE": "/ˈneɪʃn/",
         "definition": "a country or its people",
         "examples": [
            "The nation celebrated the holiday.",
            "Our nation has a new leader.",
            "The nation faced economic challenges."
         ]
      },
      {
         "id": 52,
         "word": "national",
         "role": "adjective",
         "BrE": "/ˈnæʃnəl/",
         "AmE": "/ˈnæʃnəl/",
         "definition": "relating to a whole country",
         "examples": [
            "It’s a national park.",
            "The national team won the game.",
            "National news was on TV."
         ]
      },
      {
         "id": 52,
         "word": "naturally",
         "role": "adverb",
         "BrE": "/ˈnætʃrəli/",
         "AmE": "/ˈnætʃrəli/",
         "definition": "in a natural way or as expected",
         "examples": [
            "She sings naturally well.",
            "He naturally agreed to help.",
            "The plan naturally evolved over time."
         ]
      },
      {
         "id": 52,
         "word": "negative",
         "role": "adjective",
         "BrE": "/ˈneɡətɪv/",
         "AmE": "/ˈneɡətɪv/",
         "definition": "bad or harmful; not hopeful",
         "examples": [
            "He has a negative attitude.",
            "The test result was negative.",
            "Negative feedback helped her improve."
         ]
      },
      {
         "id": 52,
         "word": "nervous",
         "role": "adjective",
         "BrE": "/ˈnɜːvəs/",
         "AmE": "/ˈnɜːrvəs/",
         "definition": "feeling worried or afraid",
         "examples": [
            "I’m nervous about the exam.",
            "She was nervous before the speech.",
            "His nervous behavior was noticeable."
         ]
      },
      {
         "id": 52,
         "word": "network",
         "role": "noun",
         "BrE": "/ˈnetwɜːk/",
         "AmE": "/ˈnetwɜːrk/",
         "definition": "a group of people or systems connected",
         "examples": [
            "The network connects computers.",
            "She built a network of friends.",
            "The TV network aired a new show."
         ]
      },
      {
         "id": 52,
         "word": "noise",
         "role": "noun",
         "BrE": "/nɔɪz/",
         "AmE": "/nɔɪz/",
         "definition": "a loud or unpleasant sound",
         "examples": [
            "The noise woke me up.",
            "The noise from the street was loud.",
            "The machine makes a strange noise."
         ]
      },
      {
         "id": 52,
         "word": "noisy",
         "role": "adjective",
         "BrE": "/ˈnɔɪzi/",
         "AmE": "/ˈnɔɪzi/",
         "definition": "making a lot of noise",
         "examples": [
            "The room is noisy.",
            "The noisy party kept us awake.",
            "Noisy children were playing outside."
         ]
      },
      {
         "id": 52,
         "word": "normal",
         "role": "adjective",
         "BrE": "/ˈnɔːml/",
         "AmE": "/ˈnɔːrml/",
         "definition": "usual or ordinary",
         "examples": [
            "It’s a normal day.",
            "Her temperature is normal now.",
            "The situation returned to normal."
         ]
      },
      {
         "id": 52,
         "word": "normally",
         "role": "adverb",
         "BrE": "/ˈnɔːməli/",
         "AmE": "/ˈnɔːrməli/",
         "definition": "in a usual or expected way",
         "examples": [
            "I normally wake up early.",
            "She normally walks to school.",
            "The system is normally reliable."
         ]
      },
      {
         "id": 53,
         "word": "notice",
         "role": "verb",
         "BrE": "/ˈnəʊtɪs/",
         "AmE": "/ˈnoʊtɪs/",
         "definition": "to see or become aware of something",
         "examples": [
            "I didn’t notice the sign.",
            "She noticed a change in his mood.",
            "Did you notice the new painting?"
         ]
      },
      {
         "id": 53,
         "word": "nowadays",
         "role": "adverb",
         "BrE": "/ˈnaʊədeɪz/",
         "AmE": "/ˈnaʊədeɪz/",
         "definition": "at the present time, compared to the past",
         "examples": [
            "Nowadays, people use phones a lot.",
            "Kids nowadays play video games.",
            "Travel is easier nowadays."
         ]
      },
      {
         "id": 53,
         "word": "nuclear",
         "role": "adjective",
         "BrE": "/ˈnjuːkliə(r)/",
         "AmE": "/ˈnuːkliər/",
         "definition": "relating to the energy produced by splitting atoms",
         "examples": [
            "Nuclear power is used here.",
            "The nuclear plant is safe.",
            "Nuclear energy is controversial."
         ]
      },
      {
         "id": 53,
         "word": "obvious",
         "role": "adjective",
         "BrE": "/ˈɒbviəs/",
         "AmE": "/ˈɑːbviəs/",
         "definition": "easy to see or understand",
         "examples": [
            "The answer is obvious.",
            "Her happiness was obvious to all.",
            "The mistake was obvious in the report."
         ]
      },
      {
         "id": 53,
         "word": "obviously",
         "role": "adverb",
         "BrE": "/ˈɒbviəsli/",
         "AmE": "/ˈɑːbviəsli/",
         "definition": "in a way that is easy to see or understand",
         "examples": [
            "She was obviously tired.",
            "He obviously didn’t like the idea.",
            "The team was obviously well-prepared."
         ]
      },
      {
         "id": 53,
         "word": "occasion",
         "role": "noun",
         "BrE": "/əˈkeɪʒn/",
         "AmE": "/əˈkeɪʒn/",
         "definition": "a special event or time",
         "examples": [
            "It’s a special occasion.",
            "The party was a happy occasion.",
            "We met on several occasions."
         ]
      },
      {
         "id": 53,
         "word": "occasionally",
         "role": "adverb",
         "BrE": "/əˈkeɪʒnəli/",
         "AmE": "/əˈkeɪʒnəli/",
         "definition": "sometimes but not often",
         "examples": [
            "I occasionally eat pizza.",
            "She occasionally visits her grandparents.",
            "He occasionally works late."
         ]
      },
      {
         "id": 53,
         "word": "occur",
         "role": "verb",
         "BrE": "/əˈkɜː(r)/",
         "AmE": "/əˈkɜːr/",
         "definition": "to happen or take place",
         "examples": [
            "The accident occurred at night.",
            "Changes occur over time.",
            "The event occurred last weekend."
         ]
      },
      {
         "id": 53,
         "word": "ocean",
         "role": "noun",
         "BrE": "/ˈəʊʃn/",
         "AmE": "/ˈoʊʃn/",
         "definition": "a very large area of sea",
         "examples": [
            "The ocean is deep.",
            "They sailed across the ocean.",
            "The Pacific Ocean is the largest."
         ]
      },
      {
         "id": 53,
         "word": "offer",
         "role": "verb",
         "BrE": "/ˈɒfə(r)/",
         "AmE": "/ˈɔːfər/",
         "definition": "to present something for someone to accept",
         "examples": [
            "She offered me a drink.",
            "He offered to help with the work.",
            "The company offered her a job."
         ]
      },
      {
         "id": 54,
         "word": "official",
         "role": "adjective",
         "BrE": "/əˈfɪʃl/",
         "AmE": "/əˈfɪʃl/",
         "definition": "approved by someone in authority",
         "examples": [
            "It’s an official document.",
            "The official announcement came today.",
            "She is an official representative."
         ]
      },
      {
         "id": 54,
         "word": "oil",
         "role": "noun",
         "BrE": "/ɔɪl/",
         "AmE": "/ɔɪl/",
         "definition": "a thick liquid used as fuel or in cooking",
         "examples": [
            "I cook with olive oil.",
            "The car needs more oil.",
            "Oil prices increased this year."
         ]
      },
      {
         "id": 54,
         "word": "operate",
         "role": "verb",
         "BrE": "/ˈɒpəreɪt/",
         "AmE": "/ˈɑːpəreɪt/",
         "definition": "to work or use a machine or system",
         "examples": [
            "He operates the machine.",
            "The system operates smoothly.",
            "She was operated on in hospital."
         ]
      },
      {
         "id": 54,
         "word": "operation",
         "role": "noun",
         "BrE": "/ˌɒpəˈreɪʃn/",
         "AmE": "/ˌɑːpəˈreɪʃn/",
         "definition": "the process of working or a medical procedure",
         "examples": [
            "The operation was successful.",
            "The factory’s operation is efficient.",
            "The operation took three hours."
         ]
      },
      {
         "id": 54,
         "word": "opinion",
         "role": "noun",
         "BrE": "/əˈpɪnjən/",
         "AmE": "/əˈpɪnjən/",
         "definition": "what you think about something",
         "examples": [
            "What’s your opinion on this?",
            "Her opinion about the plan was clear.",
            "Everyone has a different opinion."
         ]
      },
      {
         "id": 54,
         "word": "oppose",
         "role": "verb",
         "BrE": "/əˈpəʊz/",
         "AmE": "/əˈpoʊz/",
         "definition": "to disagree with something and try to stop it",
         "examples": [
            "I oppose the new rule.",
            "She opposed the decision strongly.",
            "They opposed the construction project."
         ]
      },
      {
         "id": 54,
         "word": "opposite",
         "role": "adjective",
         "BrE": "/ˈɒpəzɪt/",
         "AmE": "/ˈɑːpəzɪt/",
         "definition": "completely different or on the other side",
         "examples": [
            "They live on opposite sides.",
            "Her opinion is the opposite of mine.",
            "The opposite team played well."
         ]
      },
      {
         "id": 54,
         "word": "option",
         "role": "noun",
         "BrE": "/ˈɒpʃn/",
         "AmE": "/ˈɑːpʃn/",
         "definition": "something you can choose",
         "examples": [
            "You have two options.",
            "The menu has many options.",
            "The best option is to wait."
         ]
      },
      {
         "id": 54,
         "word": "ordinary",
         "role": "adjective",
         "BrE": "/ˈɔːdnri/",
         "AmE": "/ˈɔːrdneri/",
         "definition": "normal or not special",
         "examples": [
            "It’s an ordinary day.",
            "He lives an ordinary life.",
            "The house looks ordinary but cozy."
         ]
      },
      {
         "id": 54,
         "word": "organ",
         "role": "noun",
         "BrE": "/ˈɔːɡən/",
         "AmE": "/ˈɔːrɡən/",
         "definition": "a part of the body with a specific function",
         "examples": [
            "The heart is an organ.",
            "The organ was damaged in the accident.",
            "Healthy organs are vital for life."
         ]
      },
      {
         "id": 55,
         "word": "organization",
         "role": "noun",
         "BrE": "/ˌɔːɡənaɪˈzeɪʃn/",
         "AmE": "/ˌɔːrɡənəˈzeɪʃn/",
         "definition": "a group of people working together for a purpose",
         "examples": [
            "She works for an organization.",
            "The organization helps the poor.",
            "The event was run by a charity organization."
         ]
      },
      {
         "id": 55,
         "word": "organize",
         "role": "verb",
         "BrE": "/ˈɔːɡənaɪz/",
         "AmE": "/ˈɔːrɡənaɪz/",
         "definition": "to plan or arrange something",
         "examples": [
            "I’ll organize the party.",
            "She organized her books neatly.",
            "They organized a meeting for the team."
         ]
      },
      {
         "id": 55,
         "word": "original",
         "role": "adjective",
         "BrE": "/əˈrɪdʒənl/",
         "AmE": "/əˈrɪdʒənl/",
         "definition": "new and different or the first one made",
         "examples": [
            "Her idea is original.",
            "The original painting is expensive.",
            "The original plan was changed."
         ]
      },
      {
         "id": 55,
         "word": "originally",
         "role": "adverb",
         "BrE": "/əˈrɪdʒənəli/",
         "AmE": "/əˈrɪdʒənəli/",
         "definition": "in the beginning or in a new way",
         "examples": [
            "I originally planned to stay.",
            "The book was originally written in French.",
            "She originally came from a small town."
         ]
      },
      {
         "id": 55,
         "word": "otherwise",
         "role": "adverb",
         "BrE": "/ˈʌðəwaɪz/",
         "AmE": "/ˈʌðərwaɪz/",
         "definition": "in a different way or if not",
         "examples": [
            "Do it now, otherwise you’ll forget.",
            "She thought otherwise about the plan.",
            "Hurry, otherwise we’ll be late."
         ]
      },
      {
         "id": 55,
         "word": "outcome",
         "role": "noun",
         "BrE": "/ˈaʊtkʌm/",
         "AmE": "/ˈaʊtkʌm/",
         "definition": "the result of something",
         "examples": [
            "The outcome was good.",
            "The outcome of the game was a tie.",
            "We don’t know the outcome yet."
         ]
      },
      {
         "id": 55,
         "word": "outline",
         "role": "noun",
         "BrE": "/ˈaʊtlaɪn/",
         "AmE": "/ˈaʊtlaɪn/",
         "definition": "a description of the main ideas or shape of something",
         "examples": [
            "I wrote an outline for the essay.",
            "The outline of the plan is clear.",
            "She gave an outline of the project."
         ]
      },
      {
         "id": 55,
         "word": "output",
         "role": "noun",
         "BrE": "/ˈaʊtpʊt/",
         "AmE": "/ˈaʊtpʊt/",
         "definition": "the amount produced by a person, machine, or system",
         "examples": [
            "The factory’s output is high.",
            "Her output of work increased.",
            "The machine’s output was measured."
         ]
      },
      {
         "id": 55,
         "word": "oven",
         "role": "noun",
         "BrE": "/ˈʌvn/",
         "AmE": "/ˈʌvn/",
         "definition": "a device used for baking or heating food",
         "examples": [
            "Put the cake in the oven.",
            "The oven is very hot.",
            "She baked bread in the oven."
         ]
      },
      {
         "id": 55,
         "word": "overall",
         "role": "adverb",
         "BrE": "/ˌəʊvərˈɔːl/",
         "AmE": "/ˌoʊvərˈɔːl/",
         "definition": "considering everything",
         "examples": [
            "Overall, the day was good.",
            "The project was overall successful.",
            "Overall, the results were positive."
         ]
      },
      {
         "id": 56,
         "word": "owe",
         "role": "verb",
         "BrE": "/əʊ/",
         "AmE": "/oʊ/",
         "definition": "to need to pay or give something to someone",
         "examples": [
            "I owe her ten dollars.",
            "He owes the bank money.",
            "She owes her success to hard work."
         ]
      },
      {
         "id": 56,
         "word": "owner",
         "role": "noun",
         "BrE": "/ˈəʊnə(r)/",
         "AmE": "/ˈoʊnər/",
         "definition": "a person who owns something",
         "examples": [
            "The dog’s owner is kind.",
            "She is the owner of the shop.",
            "The car’s owner fixed it."
         ]
      },
      {
         "id": 56,
         "word": "pace",
         "role": "noun",
         "BrE": "/peɪs/",
         "AmE": "/peɪs/",
         "definition": "the speed at which something happens",
         "examples": [
            "Walk at a slow pace.",
            "The pace of work is fast.",
            "The race’s pace was intense."
         ]
      },
      {
         "id": 56,
         "word": "painful",
         "role": "adjective",
         "BrE": "/ˈpeɪnfl/",
         "AmE": "/ˈpeɪnfl/",
         "definition": "causing pain or emotional hurt",
         "examples": [
            "The injury was painful.",
            "Her words were painful to hear.",
            "The painful memory stayed with him."
         ]
      },
      {
         "id": 56,
         "word": "painting",
         "role": "noun",
         "BrE": "/ˈpeɪntɪŋ/",
         "AmE": "/ˈpeɪntɪŋ/",
         "definition": "a picture made with paint",
         "examples": [
            "The painting is beautiful.",
            "She bought a painting for her house.",
            "The painting hangs in the gallery."
         ]
      },
      {
         "id": 56,
         "word": "pair",
         "role": "noun",
         "BrE": "/peə(r)/",
         "AmE": "/per/",
         "definition": "two things of the same type used together",
         "examples": [
            "I need a pair of shoes.",
            "She bought a pair of gloves.",
            "The pair of socks was mismatched."
         ]
      },
      {
         "id": 56,
         "word": "palace",
         "role": "noun",
         "BrE": "/ˈpæləs/",
         "AmE": "/ˈpæləs/",
         "definition": "a large, impressive house, often for royalty",
         "examples": [
            "The palace is very old.",
            "They visited the royal palace.",
            "The palace has beautiful gardens."
         ]
      },
      {
         "id": 56,
         "word": "pale",
         "role": "adjective",
         "BrE": "/peɪl/",
         "AmE": "/peɪl/",
         "definition": "having a light color or looking unwell",
         "examples": [
            "Her face was pale.",
            "The pale blue sky was clear.",
            "He looked pale after the illness."
         ]
      },
      {
         "id": 56,
         "word": "panic",
         "role": "noun",
         "BrE": "/ˈpænɪk/",
         "AmE": "/ˈpænɪk/",
         "definition": "a sudden feeling of fear",
         "examples": [
            "She felt panic during the fire.",
            "The crowd was in a panic.",
            "Panic spread through the room."
         ]
      },
      {
         "id": 56,
         "word": "participate",
         "role": "verb",
         "BrE": "/pɑːˈtɪsɪpeɪt/",
         "AmE": "/pɑːrˈtɪsɪpeɪt/",
         "definition": "to take part in something",
         "examples": [
            "I’ll participate in the game.",
            "She participated in the discussion.",
            "They participated in the charity event."
         ]
      },
      {
         "id": 57,
         "word": "particular",
         "role": "adjective",
         "BrE": "/pəˈtɪkjələ(r)/",
         "AmE": "/pərˈtɪkjələr/",
         "definition": "specific or special",
         "examples": [
            "I need a particular book.",
            "She has a particular style.",
            "This particular issue needs attention."
         ]
      },
      {
         "id": 57,
         "word": "particularly",
         "role": "adverb",
         "BrE": "/pəˈtɪkjələli/",
         "AmE": "/pərˈtɪkjələrli/",
         "definition": "especially or more than usual",
         "examples": [
            "I’m not particularly hungry.",
            "She particularly likes this song.",
            "The movie was particularly exciting."
         ]
      },
      {
         "id": 57,
         "word": "partly",
         "role": "adverb",
         "BrE": "/ˈpɑːtli/",
         "AmE": "/ˈpɑːrtli/",
         "definition": "to some extent but not completely",
         "examples": [
            "It’s partly my fault.",
            "The room was partly clean.",
            "The delay was partly due to traffic."
         ]
      },
      {
         "id": 57,
         "word": "partner",
         "role": "noun",
         "BrE": "/ˈpɑːtnə(r)/",
         "AmE": "/ˈpɑːrtnər/",
         "definition": "a person you work with or do an activity with",
         "examples": [
            "My partner in class helped me.",
            "She is his business partner.",
            "The dance partner was very skilled."
         ]
      },
      {
         "id": 57,
         "word": "pass",
         "role": "verb",
         "BrE": "/pɑːs/",
         "AmE": "/pæs/",
         "definition": "to go past or through something",
         "examples": [
            "The car passed us quickly.",
            "She passed the ball to her friend.",
            "He passed the exam with high marks."
         ]
      },
      {
         "id": 57,
         "word": "passage",
         "role": "noun",
         "BrE": "/ˈpæsɪdʒ/",
         "AmE": "/ˈpæsɪdʒ/",
         "definition": "a short part of a book or a way through something",
         "examples": [
            "Read the passage carefully.",
            "The passage in the book was sad.",
            "The passage led to a hidden room."
         ]
      },
      {
         "id": 57,
         "word": "passenger",
         "role": "noun",
         "BrE": "/ˈpæsɪndʒə(r)/",
         "AmE": "/ˈpæsɪndʒər/",
         "definition": "a person traveling in a vehicle",
         "examples": [
            "The bus has many passengers.",
            "The passenger lost his ticket.",
            "All passengers must wear seatbelts."
         ]
      },
      {
         "id": 57,
         "word": "path",
         "role": "noun",
         "BrE": "/pɑːθ/",
         "AmE": "/pæθ/",
         "definition": "a way or track for walking",
         "examples": [
            "The path goes to the park.",
            "She walked along the forest path.",
            "The path was covered with leaves."
         ]
      },
      {
         "id": 57,
         "word": "pattern",
         "role": "noun",
         "BrE": "/ˈpætn/",
         "AmE": "/ˈpætərn/",
         "definition": "a regular way something happens or a design",
         "examples": [
            "The dress has a nice pattern.",
            "The pattern of rain is unusual.",
            "Her behavior follows a strange pattern."
         ]
      },
      {
         "id": 57,
         "word": "pause",
         "role": "verb",
         "BrE": "/pɔːz/",
         "AmE": "/pɔːz/",
         "definition": "to stop something for a short time",
         "examples": [
            "Pause the video now.",
            "She paused to think about the question.",
            "He paused the music to answer the phone."
         ]
      },
      {
         "id": 58,
         "word": "payment",
         "role": "noun",
         "BrE": "/ˈpeɪmənt/",
         "AmE": "/ˈpeɪmənt/",
         "definition": "money given for goods or services",
         "examples": [
            "I made a payment online.",
            "The payment is due tomorrow.",
            "She received payment for her work."
         ]
      },
      {
         "id": 58,
         "word": "peace",
         "role": "noun",
         "BrE": "/piːs/",
         "AmE": "/piːs/",
         "definition": "a situation with no war or violence",
         "examples": [
            "The country is at peace.",
            "She wants peace and quiet.",
            "The treaty brought peace to the region."
         ]
      },
      {
         "id": 58,
         "word": "peaceful",
         "role": "adjective",
         "BrE": "/ˈpiːsfl/",
         "AmE": "/ˈpiːsfl/",
         "definition": "calm and without disturbance",
         "examples": [
            "The park is peaceful.",
            "The peaceful evening was relaxing.",
            "They enjoyed a peaceful holiday."
         ]
      },
      {
         "id": 58,
         "word": "penny",
         "role": "noun",
         "BrE": "/ˈpeni/",
         "AmE": "/ˈpeni/",
         "definition": "a small unit of money (one cent)",
         "examples": [
            "I found a penny on the ground.",
            "The item costs a few pennies.",
            "She saved every penny for the trip."
         ]
      },
      {
         "id": 58,
         "word": "per",
         "role": "preposition",
         "BrE": "/pə(r)/",
         "AmE": "/pər/",
         "definition": "for each",
         "examples": [
            "It costs $5 per ticket.",
            "She earns $20 per hour.",
            "The speed is 60 miles per hour."
         ]
      },
      {
         "id": 58,
         "word": "perfect",
         "role": "adjective",
         "BrE": "/ˈpɜːfɪkt/",
         "AmE": "/ˈpɜːrfɪkt/",
         "definition": "having no mistakes or flaws",
         "examples": [
            "The picture is perfect.",
            "Her performance was perfect.",
            "The plan worked out perfectly."
         ]
      },
      {
         "id": 58,
         "word": "perfectly",
         "role": "adverb",
         "BrE": "/ˈpɜːfɪktli/",
         "AmE": "/ˈpɜːrfɪktli/",
         "definition": "in a way that is perfect",
         "examples": [
            "She sings perfectly.",
            "The machine works perfectly now.",
            "The event was perfectly organized."
         ]
      },
      {
         "id": 58,
         "word": "perform",
         "role": "verb",
         "BrE": "/pəˈfɔːm/",
         "AmE": "/pərˈfɔːrm/",
         "definition": "to do something, like a play or task",
         "examples": [
            "They perform a play tonight.",
            "She performed well in the test.",
            "The band performed at the festival."
         ]
      },
      {
         "id": 58,
         "word": "performance",
         "role": "noun",
         "BrE": "/pəˈfɔːməns/",
         "AmE": "/pərˈfɔːrməns/",
         "definition": "the act of performing or how well something is done",
         "examples": [
            "The performance was amazing.",
            "His performance in class improved.",
            "The car’s performance is excellent."
         ]
      },
      {
         "id": 58,
         "word": "permanent",
         "role": "adjective",
         "BrE": "/ˈpɜːmənənt/",
         "AmE": "/ˈpɜːrmənənt/",
         "definition": "lasting forever or for a long time",
         "examples": [
            "It’s a permanent job.",
            "The damage is permanent.",
            "She got a permanent place to live."
         ]
      },
      {
         "id": 59,
         "word": "permission",
         "role": "noun",
         "BrE": "/pəˈmɪʃn/",
         "AmE": "/pərˈmɪʃn/",
         "definition": "the act of allowing something",
         "examples": [
            "I need permission to leave.",
            "She got permission to use the car.",
            "Permission was granted for the event."
         ]
      },
      {
         "id": 59,
         "word": "permit",
         "role": "verb",
         "BrE": "/pəˈmɪt/",
         "AmE": "/pərˈmɪt/",
         "definition": "to allow something",
         "examples": [
            "They permit pets here.",
            "The rules permit extra time.",
            "Smoking is not permitted inside."
         ]
      },
      {
         "id": 59,
         "word": "personal",
         "role": "adjective",
         "BrE": "/ˈpɜːsənl/",
         "AmE": "/ˈpɜːrsənl/",
         "definition": "relating to a specific person",
         "examples": [
            "It’s a personal choice.",
            "Her personal items were stolen.",
            "Keep your personal information safe."
         ]
      },
      {
         "id": 59,
         "word": "personality",
         "role": "noun",
         "BrE": "/ˌpɜːsəˈnæləti/",
         "AmE": "/ˌpɜːrsəˈnæləti/",
         "definition": "the qualities that make a person unique",
         "examples": [
            "She has a great personality.",
            "His personality makes him fun.",
            "The job requires a strong personality."
         ]
      },
      {
         "id": 59,
         "word": "persuade",
         "role": "verb",
         "BrE": "/pəˈsweɪd/",
         "AmE": "/pərˈsweɪd/",
         "definition": "to convince someone to do something",
         "examples": [
            "I persuaded her to come.",
            "He persuaded the team to agree.",
            "She was persuaded by his argument."
         ]
      },
      {
         "id": 59,
         "word": "pet",
         "role": "noun",
         "BrE": "/pet/",
         "AmE": "/pet/",
         "definition": "an animal kept for companionship",
         "examples": [
            "My pet is a cat.",
            "She loves her pet dog.",
            "The pet needs food and care."
         ]
      },
      {
         "id": 59,
         "word": "physical",
         "role": "adjective",
         "BrE": "/ˈfɪzɪkl/",
         "AmE": "/ˈfɪzɪkl/",
         "definition": "relating to the body or things you can touch",
         "examples": [
            "Physical exercise is healthy.",
            "The job requires physical strength.",
            "The physical damage was repaired."
         ]
      },
      {
         "id": 59,
         "word": "pile",
         "role": "noun",
         "BrE": "/paɪl/",
         "AmE": "/paɪl/",
         "definition": "a group of things placed one on top of another",
         "examples": [
            "There’s a pile of books.",
            "She sorted a pile of clothes.",
            "The papers were in a messy pile."
         ]
      },
      {
         "id": 59,
         "word": "pipe",
         "role": "noun",
         "BrE": "/paɪp/",
         "AmE": "/paɪp/",
         "definition": "a tube for carrying liquid or gas",
         "examples": [
            "The pipe is leaking water.",
            "They fixed the broken pipe.",
            "The pipe carries gas to the house."
         ]
      },
      {
         "id": 59,
         "word": "pitch",
         "role": "noun",
         "BrE": "/pɪtʃ/",
         "AmE": "/pɪtʃ/",
         "definition": "a sports field or the level of something",
         "examples": [
            "The soccer pitch is green.",
            "They played on a wet pitch.",
            "The pitch of his voice was high."
         ]
      },
      {
         "id": 60,
         "word": "plain",
         "role": "adjective",
         "BrE": "/pleɪn/",
         "AmE": "/pleɪn/",
         "definition": "simple or not decorated",
         "examples": [
            "She wore a plain dress.",
            "The room has plain walls.",
            "The plain design was very practical."
         ]
      },
      {
         "id": 60,
         "word": "planet",
         "role": "noun",
         "BrE": "/ˈplænɪt/",
         "AmE": "/ˈplænɪt/",
         "definition": "a large round object in space that moves around a star",
         "examples": [
            "Earth is a planet.",
            "Mars is a red planet.",
            "Scientists study planets in our galaxy."
         ]
      },
      {
         "id": 60,
         "word": "planning",
         "role": "noun",
         "BrE": "/ˈplænɪŋ/",
         "AmE": "/ˈplænɪŋ/",
         "definition": "the act of making plans",
         "examples": [
            "Planning is important for success.",
            "The event needs careful planning.",
            "City planning improves living conditions."
         ]
      },
      {
         "id": 60,
         "word": "plastic",
         "role": "noun",
         "BrE": "/ˈplæstɪk/",
         "AmE": "/ˈplæstɪk/",
         "definition": "a man-made material that can be shaped",
         "examples": [
            "The bottle is made of plastic.",
            "Plastic bags are harmful to nature.",
            "She bought a plastic chair."
         ]
      },
      {
         "id": 60,
         "word": "plate",
         "role": "noun",
         "BrE": "/pleɪt/",
         "AmE": "/pleɪt/",
         "definition": "a flat dish used for food",
         "examples": [
            "Put food on the plate.",
            "She washed the dirty plates.",
            "The plate was full of vegetables."
         ]
      },
      {
         "id": 60,
         "word": "platform",
         "role": "noun",
         "BrE": "/ˈplætfɔːm/",
         "AmE": "/ˈplætfɔːrm/",
         "definition": "a raised surface, often for trains or speeches",
         "examples": [
            "The train is at platform two.",
            "He spoke from a high platform.",
            "The platform was crowded with people."
         ]
      },
      {
         "id": 60,
         "word": "pleasant",
         "role": "adjective",
         "BrE": "/ˈpleznt/",
         "AmE": "/ˈpleznt/",
         "definition": "nice or enjoyable",
         "examples": [
            "The weather is pleasant today.",
            "She had a pleasant conversation.",
            "The trip was a pleasant experience."
         ]
      },
      {
         "id": 60,
         "word": "pleasure",
         "role": "noun",
         "BrE": "/ˈpleʒə(r)/",
         "AmE": "/ˈpleʒər/",
         "definition": "a feeling of happiness or enjoyment",
         "examples": [
            "Reading is a pleasure for me.",
            "It’s a pleasure to meet you.",
            "The party was a source of pleasure."
         ]
      },
      {
         "id": 60,
         "word": "plenty",
         "role": "pronoun",
         "BrE": "/ˈplenti/",
         "AmE": "/ˈplenti/",
         "definition": "a large amount or enough of something",
         "examples": [
            "We have plenty of food.",
            "There’s plenty of time to finish.",
            "Plenty of people attended the event."
         ]
      },
      {
         "id": 60,
         "word": "plot",
         "role": "noun",
         "BrE": "/plɒt/",
         "AmE": "/plɑːt/",
         "definition": "the story of a book or movie, or a small area of land",
         "examples": [
            "The movie has a great plot.",
            "She owns a plot of land.",
            "The book’s plot was exciting."
         ]
      },

         {
            "id": 61,
            "word": "plus",
            "role": "preposition/conjunction",
            "BrE": "/plʌs/",
            "AmE": "/plʌs/",
            "definition": "in addition to; and also",
            "examples": [
               "We’ll go shopping, plus we can have lunch.",
               "I’m tired, plus I have a lot of work.",
               "She speaks French plus German fluently."
            ]
         },
         {
            "id": 61,
            "word": "poem",
            "role": "noun",
            "BrE": "/ˈpəʊəm/",
            "AmE": "/ˈpoʊəm/",
            "definition": "a short piece of writing in which the words are arranged in separate lines, often with a repeated rhythm or rhyme",
            "examples": [
               "She wrote a nice poem.",
               "He learned a poem at school.",
               "The poem about the sea made me calm."
            ]
         },
         {
            "id": 61,
            "word": "poet",
            "role": "noun",
            "BrE": "/ˈpəʊɪt/",
            "AmE": "/ˈpoʊət/",
            "definition": "someone who writes poems",
            "examples": [
               "He is a famous poet.",
               "The poet wrote about love.",
               "That poet uses simple words beautifully."
            ]
         },
         {
            "id": 61,
            "word": "poetry",
            "role": "noun",
            "BrE": "/ˈpəʊɪtri/",
            "AmE": "/ˈpoʊət̬ri/",
            "definition": "writing in which the words are chosen for their sound and expressive quality, often in lines or verses",
            "examples": [
               "She likes poetry.",
               "I enjoy reading poetry at night.",
               "His poetry uses clear images and feelings."
            ]
         },
         {
            "id": 61,
            "word": "point",
            "role": "noun",
            "BrE": "/pɔɪnt/",
            "AmE": "/pɔɪnt/",
            "definition": "the meaning or purpose of something, or a particular detail",
            "examples": [
               "What is the point?",
               "The point of the story was clear.",
               "He made a good point in the meeting."
            ]
         },
         {
            "id": 61,
            "word": "poison",
            "role": "noun",
            "BrE": "/ˈpɔɪzən/",
            "AmE": "/ˈpɔɪzən/",
            "definition": "a substance that can make you ill or kill you if you eat or drink it",
            "examples": [
               "The plant is poison.",
               "He found poison in the drink.",
               "The chemical is a strong poison."
            ]
         },
         {
            "id": 61,
            "word": "poisonous",
            "role": "adjective",
            "BrE": "/ˈpɔɪzənəs/",
            "AmE": "/ˈpɔɪzənəs/",
            "definition": "containing poison that can kill or harm",
            "examples": [
               "That frog is poisonous.",
               "Be careful, these berries are poisonous.",
               "The snake’s bite is very poisonous."
            ]
         },
         {
            "id": 61,
            "word": "policy",
            "role": "noun",
            "BrE": "/ˈpɒləsi/",
            "AmE": "/ˈpɑːləsi/",
            "definition": "a plan or set of plans agreed by a government, business, or other organization",
            "examples": [
               "Our school has a no‑phone policy.",
               "They changed their return policy.",
               "The company’s policy helps customers."
            ]
         },
         {
            "id": 61,
            "word": "political",
            "role": "adjective",
            "BrE": "/pəˈlɪtɪkəl/",
            "AmE": "/pəˈlɪtɪkəl/",
            "definition": "relating to politics, which is the activities of the government or public affairs",
            "examples": [
               "He is not political.",
               "They had a political debate.",
               "She reads political news every day."
            ]
         },
         {
            "id": 61,
            "word": "politician",
            "role": "noun",
            "BrE": "/ˌpɒlɪˈtɪʃən/",
            "AmE": "/ˌpɑːlɪˈtɪʃən/",
            "definition": "someone who works in politics, especially an elected member of the government",
            "examples": [
               "The politician spoke well.",
               "She became a politician last year.",
               "Every politician makes promises."
            ]
         },
         
         {
            "id": 62,
            "word": "politics",
            "role": "noun",
            "BrE": "/ˈpɒlətɪks/",
            "AmE": "/ˈpɑːlətɪks/",
            "definition": "the activity of governing a country or area, and the groups of people who do this",
            "examples": [
               "He doesn’t talk about politics.",
               "I read politics in the newspaper.",
               "They study politics at university."
            ]
         },
         {
            "id": 62,
            "word": "port",
            "role": "noun",
            "BrE": "/pɔːt/",
            "AmE": "/pɔːrt/",
            "definition": "a place on the coast where ships load and unload goods and passengers",
            "examples": [
               "We arrived at the port.",
               "The ship left the port.",
               "The port is busy every morning."
            ]
         },
         {
            "id": 62,
            "word": "portrait",
            "role": "noun",
            "BrE": "/ˈpɔːtrət/",
            "AmE": "/ˈpɔːrtrət/",
            "definition": "a painting, drawing, or photograph of a person, especially the head and shoulders",
            "examples": [
               "She drew his portrait.",
               "The portrait was on the wall.",
               "The artist painted a beautiful portrait."
            ]
         },
         {
            "id": 62,
            "word": "possibly",
            "role": "adverb",
            "BrE": "/ˈpɒsəbli/",
            "AmE": "/ˈpɑːsəbli/",
            "definition": "used when something may be true or may happen, but is not certain",
            "examples": [
               "We could possibly go tomorrow.",
               "He is possibly late.",
               "She can possibly finish the work today."
            ]
         },
         {
            "id": 62,
            "word": "pot",
            "role": "noun",
            "BrE": "/pɒt/",
            "AmE": "/pɑːt/",
            "definition": "a container, usually round, used for cooking or keeping plants",
            "examples": [
               "She washed the pot.",
               "I planted flowers in a pot.",
               "The soup is in a big pot."
            ]
         },
         {
            "id": 62,
            "word": "pour",
            "role": "verb",
            "BrE": "/pɔː(r)/",
            "AmE": "/pɔːr/",
            "definition": "to make a liquid or other substance flow from a container, especially into another container or a surface",
            "examples": [
               "Pour water into the glass.",
               "He poured milk on his cereal.",
               "Can you pour tea for everyone?"
            ]
         },
         {
            "id": 62,
            "word": "poverty",
            "role": "noun",
            "BrE": "/ˈpɒvə(r)ti/",
            "AmE": "/ˈpɑːvərti/",
            "definition": "the state of being poor",
            "examples": [
               "Many people live in poverty.",
               "They help people in poverty.",
               "The family escaped poverty last year."
            ]
         },
         {
            "id": 62,
            "word": "powder",
            "role": "noun",
            "BrE": "/ˈpaʊdə(r)/",
            "AmE": "/ˈpaʊdər/",
            "definition": "a dry substance made of very small grains",
            "examples": [
               "Add the sugar powder.",
               "She put face powder on.",
               "The baby powder smells nice."
            ]
         },
         {
            "id": 62,
            "word": "powerful",
            "role": "adjective",
            "BrE": "/ˈpaʊəf(ə)l/",
            "AmE": "/ˈpaʊərfəl/",
            "definition": "having great power or strength",
            "examples": [
               "He is a powerful man.",
               "That engine is powerful.",
               "Her speech was very powerful."
            ]
         },
         {
            "id": 62,
            "word": "practical",
            "role": "adjective",
            "BrE": "/ˈpræktɪk(ə)l/",
            "AmE": "/ˈpræktɪkəl/",
            "definition": "relating to real situations and actions, not ideas or imagination",
            "examples": [
               "She gives practical help.",
               "They chose a practical solution.",
               "He has practical skills in cooking."
            ]
         },
         
         {
            "id": 63,
            "word": "pray",
            "role": "verb",
            "BrE": "/preɪ/",
            "AmE": "/preɪ/",
            "definition": "to speak to God, especially to ask for help or express thanks",
            "examples": [
               "I pray every night.",
               "They pray for their family.",
               "She prays quietly before dinner."
            ]
         },
         {
            "id": 63,
            "word": "prayer",
            "role": "noun",
            "BrE": "/ˈpreɪə(r)/",
            "AmE": "/ˈpreɪər/",
            "definition": "something that you say to God, especially to ask for help or express thanks",
            "examples": [
               "He said a short prayer.",
               "We join in the prayer.",
               "Her prayer sounded very kind."
            ]
         },
         {
            "id": 63,
            "word": "prediction",
            "role": "noun",
            "BrE": "/prɪˈdɪkʃ(ə)n/",
            "AmE": "/prɪˈdɪkʃən/",
            "definition": "a statement about what you think will happen in the future",
            "examples": [
               "Her prediction was right.",
               "I made a prediction in class.",
               "My prediction about the match came true."
            ]
         },
         {
            "id": 63,
            "word": "prepared",
            "role": "adjective",
            "BrE": "/prɪˈpeəd/",
            "AmE": "/prɪˈpɛrd/",
            "definition": "ready and able to deal with something",
            "examples": [
               "I am prepared for the exam.",
               "They were prepared early.",
               "She stayed prepared for any question."
            ]
         },
         {
            "id": 63,
            "word": "presentation",
            "role": "noun",
            "BrE": "/ˌprɛzənˈteɪʃ(ə)n/",
            "AmE": "/ˌprɛzənˈteɪʃən/",
            "definition": "a talk giving information about something, often with slides",
            "examples": [
               "He gave a presentation.",
               "The presentation was interesting.",
               "She prepared a clear presentation."
            ]
         },
         {
            "id": 63,
            "word": "press",
            "role": "noun/verb",
            "BrE": "/prɛs/",
            "AmE": "/prɛs/",
            "definition": "to push; also, the news media (noun)",
            "examples": [
               "Press the button.",
               "The press wrote about it.",
               "He pressed his hand on the table."
            ]
         },
         {
            "id": 63,
            "word": "pressure",
            "role": "noun",
            "BrE": "/ˈprɛʃə(r)/",
            "AmE": "/ˈprɛʃər/",
            "definition": "a feeling of worry and stress caused by the need to do well",
            "examples": [
               "We feel pressure at work.",
               "There is pressure before exams.",
               "She handles pressure well."
            ]
         },
         {
            "id": 63,
            "word": "pretend",
            "role": "verb",
            "BrE": "/prɪˈtɛnd/",
            "AmE": "/prɪˈtɛnd/",
            "definition": "to behave as if something is true when it is not",
            "examples": [
               "He can pretend to be a doctor.",
               "They pretend to sleep.",
               "She pretended she knew the answer."
            ]
         },
         {
            "id": 63,
            "word": "previous",
            "role": "adjective",
            "BrE": "/ˈpriːviəs/",
            "AmE": "/ˈpriviəs/",
            "definition": "happening before the time or event you are talking about",
            "examples": [
               "On the previous day, it rained.",
               "His previous job was in sales.",
               "They met in a previous class."
            ]
         },
         {
            "id": 63,
            "word": "previously",
            "role": "adverb",
            "BrE": "/ˈpriːviəsli/",
            "AmE": "/ˈpriviəsli/",
            "definition": "before a particular time or event",
            "examples": [
               "She had previously lived in Paris.",
               "They previously met in school.",
               "He had previously worked here."
            ]
         },
         
         {
            "id": 64,
            "word": "priest",
            "role": "noun",
            "BrE": "/priːst/",
            "AmE": "/priːst/",
            "definition": "a religious leader in some religions, for example in Christianity",
            "examples": [
               "The priest spoke at the ceremony.",
               "She asked the priest for advice.",
               "Every Sunday, the priest teaches children."
            ]
         },
         {
            "id": 64,
            "word": "primary",
            "role": "adjective",
            "BrE": "/ˈpraɪməri/",
            "AmE": "/ˈpraɪˌmɛri/",
            "definition": "most important; first in order",
            "examples": [
               "My primary job is teaching.",
               "Her primary concern is safety.",
               "The primary aim of the project was clear."
            ]
         },
         {
            "id": 64,
            "word": "prince",
            "role": "noun",
            "BrE": "/prɪns/",
            "AmE": "/prɪns/",
            "definition": "a male member of a royal family",
            "examples": [
               "The prince waved to the crowd.",
               "She met a prince at the castle.",
               "The young prince learned to ride a horse."
            ]
         },
         {
            "id": 64,
            "word": "princess",
            "role": "noun",
            "BrE": "/ˌprɪnˈsɛs/",
            "AmE": "/ˌprɪnˈsɛs/",
            "definition": "a female member of a royal family",
            "examples": [
               "The princess wore a crown.",
               "They told stories about a princess.",
               "Every child knows the fairy‑tale princess."
            ]
         },
         {
            "id": 64,
            "word": "printing",
            "role": "noun",
            "BrE": "/ˈprɪntɪŋ/",
            "AmE": "/ˈprɪntɪŋ/",
            "definition": "the process of producing books, newspapers, etc. by pressing words onto paper",
            "examples": [
               "Printing the tickets took time.",
               "He works in printing.",
               "The printing quality is good."
            ]
         },
         {
            "id": 64,
            "word": "prisoner",
            "role": "noun",
            "BrE": "/ˈprɪz(ə)nə(r)/",
            "AmE": "/ˈprɪzənər/",
            "definition": "someone who is kept in prison as a punishment",
            "examples": [
               "The prisoner had lunch at noon.",
               "They visited the prisoner.",
               "Every prisoner must follow the rules."
            ]
         },
         {
            "id": 64,
            "word": "private",
            "role": "adjective",
            "BrE": "/ˈprʌɪvət/ or /ˈpraɪvət/",
            "AmE": "/ˈpraɪvət/",
            "definition": "only for one person or group, and not for everyone",
            "examples": [
               "This is a private room.",
               "She told me in private.",
               "He shared a private message."
            ]
         },
         {
            "id": 64,
            "word": "producer",
            "role": "noun",
            "BrE": "/prəˈdjuːsə(r)/",
            "AmE": "/prəˈduːsər/",
            "definition": "someone whose job is to control the money, actors, and plans for a film, play, or radio or television programme",
            "examples": [
               "The producer called the actors.",
               "She works as a film producer.",
               "The producer plans every detail of the show."
            ]
         },
         {
            "id": 64,
            "word": "production",
            "role": "noun",
            "BrE": "/prəˈdʌkʃ(ə)n/",
            "AmE": "/prəˈdʌkʃən/",
            "definition": "the process of making or growing things, especially in large quantities",
            "examples": [
               "The factory’s production was high.",
               "They increased car production.",
               "Food production is important here."
            ]
         },
         {
            "id": 64,
            "word": "profession",
            "role": "noun",
            "BrE": "/prəˈfɛʃ(ə)n/",
            "AmE": "/prəˈfɛʃən/",
            "definition": "a type of job that needs special training or skill",
            "examples": [
               "Teaching is a good profession.",
               "She entered the legal profession.",
               "He chose medicine as his profession."
            ]
         },
         
         {
            "id": 65,
            "word": "profit",
            "role": "noun",
            "BrE": "/ˈprɒfɪt/",
            "AmE": "/ˈprɑːfɪt/",
            "definition": "the money that you get when you sell something for more than it costs you",
            "examples": [
               "The shop made a profit.",
               "They want to increase their profit.",
               "The business showed a big profit last year."
            ]
         },
         {
            "id": 65,
            "word": "program",
            "role": "noun",
            "BrE": "/ˈprəʊɡræm/",
            "AmE": "/ˈproʊɡræm/",
            "definition": "a plan of activities, events, or performances",
            "examples": [
               "The TV program starts at 8.",
               "I watched a cooking program.",
               "The school has a new program for sports."
            ]
         },
         {
            "id": 65,
            "word": "promote",
            "role": "verb",
            "BrE": "/prəˈməʊt/",
            "AmE": "/prəˈmoʊt/",
            "definition": "to encourage people to like, buy, use, do, or support something",
            "examples": [
               "They promote healthy food.",
               "The company promotes new products.",
               "She wants to promote her book."
            ]
         },
         {
            "id": 65,
            "word": "proper",
            "role": "adjective",
            "BrE": "/ˈprɒpə(r)/",
            "AmE": "/ˈprɑːpər/",
            "definition": "correct or suitable",
            "examples": [
               "Wear proper shoes.",
               "This is a proper way to do it.",
               "He needs a proper explanation."
            ]
         },
         {
            "id": 65,
            "word": "properly",
            "role": "adverb",
            "BrE": "/ˈprɒpəli/",
            "AmE": "/ˈprɑːpərli/",
            "definition": "in a correct or suitable way",
            "examples": [
               "Do the work properly.",
               "She cooked the meal properly.",
               "The machine does not work properly."
            ]
         },
         {
            "id": 65,
            "word": "property",
            "role": "noun",
            "BrE": "/ˈprɒpəti/",
            "AmE": "/ˈprɑːpərti/",
            "definition": "something that someone owns",
            "examples": [
               "The house is her property.",
               "They bought the property last year.",
               "The property has a big garden."
            ]
         },
         {
            "id": 65,
            "word": "protest",
            "role": "noun/verb",
            "BrE": "/ˈprəʊtɛst/",
            "AmE": "/ˈproʊtɛst/",
            "definition": "a strong complaint or action against something",
            "examples": [
               "They made a protest.",
               "People protested against the law.",
               "The protest was peaceful."
            ]
         },
         {
            "id": 65,
            "word": "proud",
            "role": "adjective",
            "BrE": "/praʊd/",
            "AmE": "/praʊd/",
            "definition": "feeling pleased and satisfied about something you have done",
            "examples": [
               "I am proud of my work.",
               "She felt proud after the game.",
               "They are proud to help others."
            ]
         },
         {
            "id": 65,
            "word": "prove",
            "role": "verb",
            "BrE": "/pruːv/",
            "AmE": "/pruːv/",
            "definition": "to show that something is true",
            "examples": [
               "He proved he was right.",
               "The test proved the idea.",
               "She proved that she can do it."
            ]
         },
         {
            "id": 65,
            "word": "pull",
            "role": "verb",
            "BrE": "/pʊl/",
            "AmE": "/pʊl/",
            "definition": "to use force to move something towards you",
            "examples": [
               "Pull the door open.",
               "He pulled the rope.",
               "She pulled the chair closer."
            ]
         },
         
         {
            "id": 66,
            "word": "punish",
            "role": "verb",
            "BrE": "/ˈpʌnɪʃ/",
            "AmE": "/ˈpʌnɪʃ/",
            "definition": "to make someone suffer because they have done something wrong",
            "examples": [
               "The teacher will punish late students.",
               "He was punished for breaking the rules.",
               "They punished the boy for lying."
            ]
         },
         {
            "id": 66,
            "word": "punishment",
            "role": "noun",
            "BrE": "/ˈpʌnɪʃmənt/",
            "AmE": "/ˈpʌnɪʃmənt/",
            "definition": "the act of punishing someone",
            "examples": [
               "The punishment was fair.",
               "He received a punishment for cheating.",
               "Punishment helps people learn."
            ]
         },
         {
            "id": 66,
            "word": "push",
            "role": "verb",
            "BrE": "/pʊʃ/",
            "AmE": "/pʊʃ/",
            "definition": "to use force to move something away from you",
            "examples": [
               "Push the door to open it.",
               "She pushed the box across the room.",
               "They pushed hard to start the car."
            ]
         },
         {
            "id": 66,
            "word": "qualification",
            "role": "noun",
            "BrE": "/ˌkwɒlɪfɪˈkeɪʃən/",
            "AmE": "/ˌkwɑːləfɪˈkeɪʃən/",
            "definition": "an official record showing that you have finished a training or course",
            "examples": [
               "She has good qualifications.",
               "You need a qualification to teach.",
               "His qualifications helped him get the job."
            ]
         },
         {
            "id": 66,
            "word": "qualified",
            "role": "adjective",
            "BrE": "/ˈkwɒlɪfaɪd/",
            "AmE": "/ˈkwɑːlɪfaɪd/",
            "definition": "having the skills or knowledge needed for a job",
            "examples": [
               "He is a qualified teacher.",
               "She is qualified to drive a bus.",
               "They hired qualified workers."
            ]
         },
         {
            "id": 66,
            "word": "qualify",
            "role": "verb",
            "BrE": "/ˈkwɒlɪfaɪ/",
            "AmE": "/ˈkwɑːlɪfaɪ/",
            "definition": "to have the right skills or qualities for something",
            "examples": [
               "You must qualify for the test.",
               "She qualified as a nurse last year.",
               "They qualified for the final game."
            ]
         },
         {
            "id": 66,
            "word": "queue",
            "role": "noun",
            "BrE": "/kjuː/",
            "AmE": "/kjuː/",
            "definition": "a line of people waiting for something",
            "examples": [
               "We waited in the queue.",
               "There was a long queue at the shop.",
               "He joined the queue for tickets."
            ]
         },
         {
            "id": 66,
            "word": "quit",
            "role": "verb",
            "BrE": "/kwɪt/",
            "AmE": "/kwɪt/",
            "definition": "to stop doing something",
            "examples": [
               "She decided to quit her job.",
               "He quit smoking last year.",
               "They quit the game early."
            ]
         },
         {
            "id": 66,
            "word": "quotation",
            "role": "noun",
            "BrE": "/kwəʊˈteɪʃən/",
            "AmE": "/kwoʊˈteɪʃən/",
            "definition": "a sentence or phrase from a book or speech",
            "examples": [
               "He gave a quotation from the book.",
               "The quotation was famous.",
               "She used a quotation in her speech."
            ]
         },
         {
            "id": 66,
            "word": "quote",
            "role": "verb",
            "BrE": "/kwəʊt/",
            "AmE": "/kwoʊt/",
            "definition": "to repeat the words that someone else said or wrote",
            "examples": [
               "She quoted her teacher.",
               "He likes to quote famous people.",
               "They quoted a line from the movie."
            ]
         },
         
         {
            "id": 67,
            "word": "racing",
            "role": "noun",
            "BrE": "/ˈreɪsɪŋ/",
            "AmE": "/ˈreɪsɪŋ/",
            "definition": "the sport of running, riding, driving, or sailing in races",
            "examples": [
               "He enjoys car racing.",
               "They watched the horse racing on TV.",
               "Racing requires a lot of practice."
            ]
         },
         {
            "id": 67,
            "word": "range",
            "role": "noun",
            "BrE": "/reɪndʒ/",
            "AmE": "/reɪndʒ/",
            "definition": "the amount between the highest and lowest limits",
            "examples": [
               "The price range is wide.",
               "The mountain range is beautiful.",
               "His skills are in a wide range."
            ]
         },
         {
            "id": 67,
            "word": "rare",
            "role": "adjective",
            "BrE": "/reə(r)/",
            "AmE": "/rer/",
            "definition": "not common or usual",
            "examples": [
               "It is rare to see snow here.",
               "She found a rare flower.",
               "Rare animals live in this forest."
            ]
         },
         {
            "id": 67,
            "word": "rarely",
            "role": "adverb",
            "BrE": "/ˈreəli/",
            "AmE": "/ˈrerli/",
            "definition": "not often",
            "examples": [
               "He rarely eats fast food.",
               "They rarely go to the cinema.",
               "She rarely misses school."
            ]
         },
         {
            "id": 67,
            "word": "reaction",
            "role": "noun",
            "BrE": "/riˈækʃən/",
            "AmE": "/riˈækʃən/",
            "definition": "what you do, say, or feel because of something that has happened",
            "examples": [
               "His reaction was surprise.",
               "She had a good reaction to the news.",
               "The doctor checked the patient's reaction."
            ]
         },
         {
            "id": 67,
            "word": "reality",
            "role": "noun",
            "BrE": "/riˈæləti/",
            "AmE": "/riˈæləti/",
            "definition": "the true situation",
            "examples": [
               "In reality, it was easy.",
               "She faced the reality of the problem.",
               "Reality can be different from dreams."
            ]
         },
         {
            "id": 67,
            "word": "receipt",
            "role": "noun",
            "BrE": "/rɪˈsiːt/",
            "AmE": "/rɪˈsiːt/",
            "definition": "a piece of paper that shows you have bought something",
            "examples": [
               "Keep your receipt for the book.",
               "She lost the receipt for her phone.",
               "They asked for a receipt at the shop."
            ]
         },
         {
            "id": 67,
            "word": "recommendation",
            "role": "noun",
            "BrE": "/ˌrɛkəmɛnˈdeɪʃən/",
            "AmE": "/ˌrɛkəmɛnˈdeɪʃən/",
            "definition": "a suggestion that something is good or suitable",
            "examples": [
               "He gave a recommendation for a hotel.",
               "She asked for a recommendation about books.",
               "The teacher's recommendation helped me."
            ]
         },
         {
            "id": 67,
            "word": "reference",
            "role": "noun",
            "BrE": "/ˈrɛfərəns/",
            "AmE": "/ˈrɛfərəns/",
            "definition": "a mention of something or someone",
            "examples": [
               "There was a reference to history in the book.",
               "She gave a reference for the job.",
               "The article made a reference to science."
            ]
         },
         {
            "id": 67,
            "word": "reflect",
            "role": "verb",
            "BrE": "/rɪˈflɛkt/",
            "AmE": "/rɪˈflɛkt/",
            "definition": "to show or express something",
            "examples": [
               "The mirror reflects light.",
               "His face reflected happiness.",
               "The report reflects the situation well."
            ]
         },
         
         {
            "id": 68,
            "word": "regularly",
            "role": "adverb",
            "BrE": "/ˈrɛɡjʊləli/",
            "AmE": "/ˈrɛɡjələrli/",
            "definition": "happening often or at the same time each day, week, etc.",
            "examples": [
               "She visits the gym regularly.",
               "We have meetings regularly on Fridays.",
               "He exercises regularly to stay healthy."
            ]
         },
         {
            "id": 68,
            "word": "reject",
            "role": "verb",
            "BrE": "/rɪˈdʒɛkt/",
            "AmE": "/rɪˈdʒɛkt/",
            "definition": "to say no to something or someone",
            "examples": [
               "He rejected the invitation.",
               "She rejected the offer.",
               "They rejected the idea quickly."
            ]
         },
         {
            "id": 68,
            "word": "relate",
            "role": "verb",
            "BrE": "/rɪˈleɪt/",
            "AmE": "/rɪˈleɪt/",
            "definition": "to be connected with something",
            "examples": [
               "The story relates to his life.",
               "She relates well to children.",
               "The two ideas relate closely."
            ]
         },
         {
            "id": 68,
            "word": "related",
            "role": "adjective",
            "BrE": "/rɪˈleɪtɪd/",
            "AmE": "/rɪˈleɪtɪd/",
            "definition": "connected with something",
            "examples": [
               "These problems are related.",
               "They work on related projects.",
               "The subjects are closely related."
            ]
         },
         {
            "id": 68,
            "word": "relation",
            "role": "noun",
            "BrE": "/rɪˈleɪʃən/",
            "AmE": "/rɪˈleɪʃən/",
            "definition": "the way two or more things are connected",
            "examples": [
               "There is a relation between exercise and health.",
               "The relation between them is strong.",
               "We studied the relation of plants and animals."
            ]
         },
         {
            "id": 68,
            "word": "relative",
            "role": "adjective",
            "BrE": "/ˈrɛlətɪv/",
            "AmE": "/ˈrɛlətɪv/",
            "definition": "considered by comparison with something else",
            "examples": [
               "It’s a relative problem.",
               "The cost is relative to the size.",
               "Her success is relative to her effort."
            ]
         },
         {
            "id": 68,
            "word": "relaxed",
            "role": "adjective",
            "BrE": "/rɪˈlækst/",
            "AmE": "/rɪˈlækst/",
            "definition": "feeling calm and free from stress",
            "examples": [
               "He looks relaxed after work.",
               "She felt relaxed on holiday.",
               "The music made everyone relaxed."
            ]
         },
         {
            "id": 68,
            "word": "relaxing",
            "role": "adjective",
            "BrE": "/rɪˈlæk.sɪŋ/",
            "AmE": "/rɪˈlæk.sɪŋ/",
            "definition": "making you feel calm",
            "examples": [
               "This music is relaxing.",
               "The beach is a relaxing place.",
               "Reading is relaxing for me."
            ]
         },
         {
            "id": 68,
            "word": "release",
            "role": "verb",
            "BrE": "/rɪˈliːs/",
            "AmE": "/rɪˈliːs/",
            "definition": "to allow something to be available or to leave",
            "examples": [
               "They released a new song.",
               "The prisoner was released.",
               "The company released a report."
            ]
         },
         {
            "id": 68,
            "word": "reliable",
            "role": "adjective",
            "BrE": "/rɪˈlaɪəbl/",
            "AmE": "/rɪˈlaɪəbl/",
            "definition": "able to be trusted",
            "examples": [
               "He is a reliable friend.",
               "This car is reliable.",
               "The information is reliable."
            ]
         },
         
         {
            "id": 69,
            "word": "religion",
            "role": "noun",
            "BrE": "/rɪˈlɪdʒən/",
            "AmE": "/rɪˈlɪdʒən/",
            "definition": "the belief in and worship of a god or gods",
            "examples": [
               "Many people follow a religion.",
               "Religion is important to her family.",
               "He studies different religions at school."
            ]
         },
         {
            "id": 69,
            "word": "religious",
            "role": "adjective",
            "BrE": "/rɪˈlɪdʒəs/",
            "AmE": "/rɪˈlɪdʒəs/",
            "definition": "connected with religion",
            "examples": [
               "They went to a religious ceremony.",
               "She is very religious.",
               "Religious festivals are celebrated here."
            ]
         },
         {
            "id": 69,
            "word": "remain",
            "role": "verb",
            "BrE": "/rɪˈmeɪn/",
            "AmE": "/rɪˈmeɪn/",
            "definition": "to stay in the same place or condition",
            "examples": [
               "Please remain seated.",
               "He remained calm during the test.",
               "The weather remained cold all day."
            ]
         },
         {
            "id": 69,
            "word": "remind",
            "role": "verb",
            "BrE": "/rɪˈmaɪnd/",
            "AmE": "/rɪˈmaɪnd/",
            "definition": "to help someone remember something",
            "examples": [
               "Please remind me to call her.",
               "The photo reminded him of his childhood.",
               "This smell reminds me of the beach."
            ]
         },
         {
            "id": 69,
            "word": "remote",
            "role": "adjective",
            "BrE": "/rɪˈməʊt/",
            "AmE": "/rɪˈmoʊt/",
            "definition": "far away in distance or time",
            "examples": [
               "They live in a remote village.",
               "The island is very remote.",
               "Remote work is becoming popular."
            ]
         },
         {
            "id": 69,
            "word": "rent",
            "role": "noun",
            "BrE": "/rɛnt/",
            "AmE": "/rɛnt/",
            "definition": "money you pay regularly to use a house, room, or car",
            "examples": [
               "They pay rent every month.",
               "The rent for this flat is high.",
               "He couldn’t afford the rent."
            ]
         },
         {
            "id": 69,
            "word": "repair",
            "role": "verb",
            "BrE": "/rɪˈpɛər/",
            "AmE": "/rɪˈpɛr/",
            "definition": "to fix something that is broken or damaged",
            "examples": [
               "I need to repair my bike.",
               "They repaired the broken window.",
               "The car is being repaired."
            ]
         },
         {
            "id": 69,
            "word": "repeat",
            "role": "verb",
            "BrE": "/rɪˈpiːt/",
            "AmE": "/rɪˈpiːt/",
            "definition": "to say or do something again",
            "examples": [
               "Please repeat the question.",
               "She repeated the instructions.",
               "He repeated the story twice."
            ]
         },
         {
            "id": 69,
            "word": "repeated",
            "role": "adjective",
            "BrE": "/rɪˈpiːtɪd/",
            "AmE": "/rɪˈpiːtɪd/",
            "definition": "happening again and again",
            "examples": [
               "There were repeated mistakes.",
               "He made repeated attempts to call.",
               "The repeated noise was annoying."
            ]
         },
         {
            "id": 69,
            "word": "represent",
            "role": "verb",
            "BrE": "/ˌrɛprɪˈzɛnt/",
            "AmE": "/ˌrɛprɪˈzɛnt/",
            "definition": "to speak or act for someone or something",
            "examples": [
               "She represents her school at events.",
               "This flag represents the country.",
               "He represents the workers in meetings."
            ]
         },
         
         {
            "id": 70,
            "word": "request",
            "role": "noun",
            "BrE": "/rɪˈkwɛst/",
            "AmE": "/rɪˈkwɛst/",
            "definition": "an act of asking politely or formally for something",
            "examples": [
               "He made a request for help.",
               "She sent a request to join the club.",
               "The teacher received many requests for extra lessons."
            ]
         },
         {
            "id": 70,
            "word": "require",
            "role": "verb",
            "BrE": "/rɪˈkwaɪə(r)/",
            "AmE": "/rɪˈkwaɪər/",
            "definition": "to need something or make something necessary",
            "examples": [
               "The job requires experience.",
               "This recipe requires two eggs.",
               "Some schools require uniforms."
            ]
         },
         {
            "id": 70,
            "word": "reservation",
            "role": "noun",
            "BrE": "/ˌrɛzəˈveɪʃən/",
            "AmE": "/ˌrɛzərˈveɪʃən/",
            "definition": "an arrangement to have something (such as a seat or room) kept for your use",
            "examples": [
               "I made a reservation at the restaurant.",
               "She confirmed the hotel reservation.",
               "They had a reservation for two."
            ]
         },
         {
            "id": 70,
            "word": "resource",
            "role": "noun",
            "BrE": "/rɪˈzɔːs/",
            "AmE": "/rɪˈsɔːrs/",
            "definition": "a useful or valuable thing, person, or quality",
            "examples": [
               "Water is an important resource.",
               "The library is a good resource for students.",
               "Natural resources must be protected."
            ]
         },
         {
            "id": 70,
            "word": "respect",
            "role": "noun",
            "BrE": "/rɪˈspɛkt/",
            "AmE": "/rɪˈspɛkt/",
            "definition": "a feeling of admiration for someone or something",
            "examples": [
               "She has great respect for her teacher.",
               "We should respect others' opinions.",
               "He earned respect through hard work."
            ]
         },
         {
            "id": 70,
            "word": "responsibility",
            "role": "noun",
            "BrE": "/rɪˌspɒnsəˈbɪləti/",
            "AmE": "/rɪˌspɑːnsəˈbɪləti/",
            "definition": "a duty to deal with something or take care of someone",
            "examples": [
               "It is your responsibility to do homework.",
               "Parents have responsibility for their children.",
               "She accepted responsibility for the mistake."
            ]
         },
         {
            "id": 70,
            "word": "responsible",
            "role": "adjective",
            "BrE": "/rɪˈspɒnsəbl/",
            "AmE": "/rɪˈspɑːnsəbl/",
            "definition": "having the duty to do something or take care of someone",
            "examples": [
               "He is responsible for the project.",
               "She is responsible and reliable.",
               "Parents are responsible for their children."
            ]
         },
         {
            "id": 70,
            "word": "result",
            "role": "noun",
            "BrE": "/rɪˈzʌlt/",
            "AmE": "/rɪˈzʌlt/",
            "definition": "something that happens because of an action or situation",
            "examples": [
               "The result was a good grade.",
               "The experiment had an interesting result.",
               "His hard work had positive results."
            ]
         },
         {
            "id": 70,
            "word": "retire",
            "role": "verb",
            "BrE": "/rɪˈtaɪə(r)/",
            "AmE": "/rɪˈtaɪər/",
            "definition": "to stop working because of age",
            "examples": [
               "My father will retire next year.",
               "She retired after 40 years of work.",
               "He decided to retire early."
            ]
         },
         {
            "id": 70,
            "word": "retired",
            "role": "adjective",
            "BrE": "/rɪˈtaɪəd/",
            "AmE": "/rɪˈtaɪərd/",
            "definition": "having stopped working because of age",
            "examples": [
               "My grandparents are retired.",
               "He is a retired teacher.",
               "Retired people often travel."
            ]
         },
         
         {
            "id": 71,
            "word": "revise",
            "role": "verb",
            "BrE": "/rɪˈvaɪz/",
            "AmE": "/rɪˈvaɪz/",
            "definition": "to study again something you have already learned, in preparation for an exam",
            "examples": [
               "I need to revise for my test.",
               "She revised her notes before the exam.",
               "He spent the evening revising the whole chapter."
            ]
         },
         {
            "id": 71,
            "word": "rise",
            "role": "verb",
            "BrE": "/raɪz/",
            "AmE": "/raɪz/",
            "definition": "to move up or increase",
            "examples": [
               "The sun rises in the morning.",
               "Prices are starting to rise.",
               "The river rises after heavy rain."
            ]
         },
         {
            "id": 71,
            "word": "risk",
            "role": "noun",
            "BrE": "/rɪsk/",
            "AmE": "/rɪsk/",
            "definition": "the possibility of something bad happening",
            "examples": [
               "There is a risk of rain today.",
               "He took a risk by trying something new.",
               "Smoking is a health risk."
            ]
         },
         {
            "id": 71,
            "word": "robot",
            "role": "noun",
            "BrE": "/ˈrəʊbɒt/",
            "AmE": "/ˈroʊbɑːt/",
            "definition": "a machine that can do work by itself",
            "examples": [
               "The robot cleans the floor.",
               "Robots are used in factories.",
               "This robot can talk and move."
            ]
         },
         {
            "id": 71,
            "word": "roll",
            "role": "verb",
            "BrE": "/rəʊl/",
            "AmE": "/roʊl/",
            "definition": "to move by turning over and over",
            "examples": [
               "The ball rolled down the hill.",
               "She rolled the dough for the cake.",
               "The car rolled into the garage."
            ]
         },
         {
            "id": 71,
            "word": "romantic",
            "role": "adjective",
            "BrE": "/rəʊˈmæntɪk/",
            "AmE": "/roʊˈmæntɪk/",
            "definition": "relating to love or a close personal relationship",
            "examples": [
               "They had a romantic dinner.",
               "He wrote her a romantic letter.",
               "The movie has a romantic story."
            ]
         },
         {
            "id": 71,
            "word": "rope",
            "role": "noun",
            "BrE": "/rəʊp/",
            "AmE": "/roʊp/",
            "definition": "a strong thick string made of many threads",
            "examples": [
               "He tied the box with a rope.",
               "The rope was strong and long.",
               "They used a rope to climb."
            ]
         },
         {
            "id": 71,
            "word": "rough",
            "role": "adjective",
            "BrE": "/rʌf/",
            "AmE": "/rʌf/",
            "definition": "not smooth or even",
            "examples": [
               "The table surface is rough.",
               "He had rough hands from work.",
               "The road was rough and bumpy."
            ]
         },
         {
            "id": 71,
            "word": "row",
            "role": "noun",
            "BrE": "/rəʊ/",
            "AmE": "/roʊ/",
            "definition": "a line of things or people next to each other",
            "examples": [
               "There was a row of trees.",
               "They sat in the front row.",
               "The chairs were in a straight row."
            ]
         },
         {
            "id": 71,
            "word": "royal",
            "role": "adjective",
            "BrE": "/ˈrɔɪəl/",
            "AmE": "/ˈrɔɪəl/",
            "definition": "connected with a king or queen",
            "examples": [
               "They visited the royal palace.",
               "The royal family is famous.",
               "She wore a royal crown."
            ]
         },
         
         {
            "id": 72,
            "word": "rugby",
            "role": "noun",
            "BrE": "/ˈrʌɡbi/",
            "AmE": "/ˈrʌɡbi/",
            "definition": "a team sport played with an oval ball that players carry and kick",
            "examples": [
               "He plays rugby at school.",
               "Rugby is popular in many countries.",
               "They watched a rugby match on TV."
            ]
         },
         {
            "id": 72,
            "word": "rule",
            "role": "noun",
            "BrE": "/ruːl/",
            "AmE": "/ruːl/",
            "definition": "an official instruction about what you can or cannot do",
            "examples": [
               "You must follow the school rules.",
               "There is a rule about no phones.",
               "Rules help keep order."
            ]
         },
         {
            "id": 72,
            "word": "safety",
            "role": "noun",
            "BrE": "/ˈseɪfti/",
            "AmE": "/ˈseɪfti/",
            "definition": "the state of being safe and protected from danger",
            "examples": [
               "Wear a helmet for safety.",
               "Safety is important at work.",
               "The safety rules prevent accidents."
            ]
         },
         {
            "id": 72,
            "word": "sail",
            "role": "verb",
            "BrE": "/seɪl/",
            "AmE": "/seɪl/",
            "definition": "to travel on water in a boat or ship",
            "examples": [
               "They sail across the lake.",
               "We sailed to the island last summer.",
               "She loves to sail in the ocean."
            ]
         },
         {
            "id": 72,
            "word": "sailor",
            "role": "noun",
            "BrE": "/ˈseɪlə(r)/",
            "AmE": "/ˈseɪlər/",
            "definition": "a person who works on a ship or boat",
            "examples": [
               "The sailor steered the ship.",
               "Sailors work on big ships.",
               "He is a brave sailor."
            ]
         },
         {
            "id": 72,
            "word": "sample",
            "role": "noun",
            "BrE": "/ˈsɑːmpl/",
            "AmE": "/ˈsæmpl/",
            "definition": "a small part of something that shows what the whole is like",
            "examples": [
               "They gave us a free sample of the food.",
               "I tried a sample of the new drink.",
               "The sample showed the quality of the product."
            ]
         },
         {
            "id": 72,
            "word": "sand",
            "role": "noun",
            "BrE": "/sænd/",
            "AmE": "/sænd/",
            "definition": "small grains of rock found on beaches and deserts",
            "examples": [
               "We played in the sand at the beach.",
               "The sand was hot under our feet.",
               "She made a castle with sand."
            ]
         },
         {
            "id": 72,
            "word": "scan",
            "role": "verb",
            "BrE": "/skæn/",
            "AmE": "/skæn/",
            "definition": "to look at something carefully to find information",
            "examples": [
               "I scanned the page for my name.",
               "The doctor scanned the patient's body.",
               "He scanned the room for his friend."
            ]
         },
         {
            "id": 72,
            "word": "scientific",
            "role": "adjective",
            "BrE": "/ˌsaɪənˈtɪfɪk/",
            "AmE": "/ˌsaɪənˈtɪfɪk/",
            "definition": "related to science",
            "examples": [
               "She did a scientific experiment.",
               "The scientific method is important.",
               "They made a scientific discovery."
            ]
         },
         {
            "id": 72,
            "word": "script",
            "role": "noun",
            "BrE": "/skrɪpt/",
            "AmE": "/skrɪpt/",
            "definition": "the written words of a play, film, or broadcast",
            "examples": [
               "The actors learned their script.",
               "She wrote a script for the play.",
               "The script was hard to remember."
            ]
         },
         
         {
            "id": 73,
            "word": "sculpture",
            "role": "noun",
            "BrE": "/ˈskʌlp.tʃər/",
            "AmE": "/ˈskʌlp.tʃɚ/",
            "definition": "a piece of art made by shaping stone, wood, or other materials",
            "examples": [
               "The museum has a famous sculpture.",
               "She made a sculpture from clay.",
               "The sculpture was very detailed."
            ]
         },
         {
            "id": 73,
            "word": "secondary",
            "role": "adjective",
            "BrE": "/ˈsek.ən.dər.i/",
            "AmE": "/ˈsek.ən.der.i/",
            "definition": "coming after the first or main thing",
            "examples": [
               "This is a secondary road.",
               "Secondary schools come after primary schools.",
               "The secondary effect was unexpected."
            ]
         },
         {
            "id": 73,
            "word": "security",
            "role": "noun",
            "BrE": "/sɪˈkjʊə.rɪ.ti/",
            "AmE": "/sɪˈkjʊr.ə.ti/",
            "definition": "the state of being safe from danger or crime",
            "examples": [
               "Security at the airport is very strict.",
               "They improved security in the building.",
               "The security guard watched carefully."
            ]
         },
         {
            "id": 73,
            "word": "seed",
            "role": "noun",
            "BrE": "/siːd/",
            "AmE": "/siːd/",
            "definition": "a small hard part from a plant that can grow into a new plant",
            "examples": [
               "She planted a seed in the soil.",
               "The seed grew into a tree.",
               "Birds eat many kinds of seed."
            ]
         },
         {
            "id": 73,
            "word": "sensible",
            "role": "adjective",
            "BrE": "/ˈsen.sɪ.bl̩/",
            "AmE": "/ˈsen.sə.bl̩/",
            "definition": "showing good judgment and practical ideas",
            "examples": [
               "It is sensible to wear a coat in winter.",
               "She made a sensible decision.",
               "He gave sensible advice to his friend."
            ]
         },
         {
            "id": 73,
            "word": "separate",
            "role": "adjective",
            "BrE": "/ˈsep.ər.ət/",
            "AmE": "/ˈsep.ə.rət/",
            "definition": "not joined or together",
            "examples": [
               "They live in separate houses.",
               "The boys have separate rooms.",
               "The two ideas are separate."
            ]
         },
         {
            "id": 73,
            "word": "seriously",
            "role": "adverb",
            "BrE": "/ˈsɪə.ri.əs.li/",
            "AmE": "/ˈsɪr.i.əs.li/",
            "definition": "in a way that shows importance or thought",
            "examples": [
               "She was seriously ill.",
               "You should take this seriously.",
               "He seriously thinks about his future."
            ]
         },
         {
            "id": 73,
            "word": "servant",
            "role": "noun",
            "BrE": "/ˈsɜː.vənt/",
            "AmE": "/ˈsɜːr.vənt/",
            "definition": "a person who works for another person, especially in their house",
            "examples": [
               "The servant cleaned the house.",
               "In old times, servants worked in big houses.",
               "She is a loyal servant."
            ]
         },
         {
            "id": 73,
            "word": "set",
            "role": "verb",
            "BrE": "/set/",
            "AmE": "/set/",
            "definition": "to put something in a particular place",
            "examples": [
               "She set the table for dinner.",
               "He set the alarm clock.",
               "They set the books on the shelf."
            ]
         },
         {
            "id": 73,
            "word": "setting",
            "role": "noun",
            "BrE": "/ˈset.ɪŋ/",
            "AmE": "/ˈset̬.ɪŋ/",
            "definition": "the place or time where something happens",
            "examples": [
               "The story has a setting in a small town.",
               "The setting of the play is in the 19th century.",
               "She described the setting clearly."
            ]
         },
         
         {
            "id": 74,
            "word": "sex",
            "role": "noun",
            "BrE": "/seks/",
            "AmE": "/seks/",
            "definition": "the state of being male or female",
            "examples": [
               "The baby’s sex is a boy.",
               "Sex is a natural part of life.",
               "The test determines the sex of the animal."
            ]
         },
         {
            "id": 74,
            "word": "sexual",
            "role": "adjective",
            "BrE": "/ˈsekʃuəl/",
            "AmE": "/ˈsekʃuəl/",
            "definition": "relating to sex or the differences between male and female",
            "examples": [
               "They talked about sexual health.",
               "Sexual education is important.",
               "The animals show sexual behavior."
            ]
         },
         {
            "id": 74,
            "word": "shake",
            "role": "verb",
            "BrE": "/ʃeɪk/",
            "AmE": "/ʃeɪk/",
            "definition": "to move something quickly up and down or from side to side",
            "examples": [
               "He shook the bottle before opening it.",
               "She shook hands with her teacher.",
               "The ground shook during the earthquake."
            ]
         },
         {
            "id": 74,
            "word": "share",
            "role": "verb",
            "BrE": "/ʃeər/",
            "AmE": "/ʃer/",
            "definition": "to use or have something with others",
            "examples": [
               "They share their toys.",
               "She shared her lunch with me.",
               "We shared a room at the hotel."
            ]
         },
         {
            "id": 74,
            "word": "sharp",
            "role": "adjective",
            "BrE": "/ʃɑːp/",
            "AmE": "/ʃɑːrp/",
            "definition": "having a thin edge that can cut",
            "examples": [
               "Be careful, the knife is sharp.",
               "He felt a sharp pain in his leg.",
               "The sharp blade cut the paper."
            ]
         },
         {
            "id": 74,
            "word": "shelf",
            "role": "noun",
            "BrE": "/ʃelf/",
            "AmE": "/ʃelf/",
            "definition": "a flat board attached to a wall or inside a cupboard to put things on",
            "examples": [
               "The books are on the shelf.",
               "She put the vase on the shelf.",
               "There are many things on the kitchen shelf."
            ]
         },
         {
            "id": 74,
            "word": "shell",
            "role": "noun",
            "BrE": "/ʃel/",
            "AmE": "/ʃel/",
            "definition": "the hard outer covering of eggs, nuts, or animals like turtles and crabs",
            "examples": [
               "We found a shell on the beach.",
               "The turtle has a hard shell.",
               "The egg shell is fragile."
            ]
         },
         {
            "id": 74,
            "word": "shift",
            "role": "verb",
            "BrE": "/ʃɪft/",
            "AmE": "/ʃɪft/",
            "definition": "to move something to a different place or position",
            "examples": [
               "Please shift the chair a little.",
               "He shifted his weight from one foot to the other.",
               "The wind shifted to the east."
            ]
         },
         {
            "id": 74,
            "word": "shine",
            "role": "verb",
            "BrE": "/ʃaɪn/",
            "AmE": "/ʃaɪn/",
            "definition": "to give out light",
            "examples": [
               "The sun shines in the sky.",
               "Her shoes shine because they are clean.",
               "The stars shine at night."
            ]
         },
         {
            "id": 74,
            "word": "shiny",
            "role": "adjective",
            "BrE": "/ˈʃaɪ.ni/",
            "AmE": "/ˈʃaɪ.ni/",
            "definition": "giving back light, bright",
            "examples": [
               "The floor is shiny after cleaning.",
               "He has shiny black hair.",
               "The shiny car looks new."
            ]
         },
         
         {
            "id": 75,
            "word": "shoot",
            "role": "verb",
            "BrE": "/ʃuːt/",
            "AmE": "/ʃuːt/",
            "definition": "to fire a bullet or arrow from a gun or bow",
            "examples": [
               "He learned how to shoot a gun.",
               "They shoot arrows at the target.",
               "The soldiers shoot during the training."
            ]
         },
         {
            "id": 75,
            "word": "shy",
            "role": "adjective",
            "BrE": "/ʃaɪ/",
            "AmE": "/ʃaɪ/",
            "definition": "nervous or uncomfortable about meeting or talking to people",
            "examples": [
               "She is shy with new people.",
               "The child is shy at school.",
               "He felt shy during the meeting."
            ]
         },
         {
            "id": 75,
            "word": "sight",
            "role": "noun",
            "BrE": "/saɪt/",
            "AmE": "/saɪt/",
            "definition": "the ability to see",
            "examples": [
               "Birds have good sight.",
               "He lost his sight in one eye.",
               "The beautiful sight made her smile."
            ]
         },
         {
            "id": 75,
            "word": "signal",
            "role": "noun",
            "BrE": "/ˈsɪɡ.nəl/",
            "AmE": "/ˈsɪɡ.nəl/",
            "definition": "a sound, light, or action that sends a message",
            "examples": [
               "The green light is a signal to go.",
               "He gave a signal to start.",
               "The signal was weak in the building."
            ]
         },
         {
            "id": 75,
            "word": "silent",
            "role": "adjective",
            "BrE": "/ˈsaɪ.lənt/",
            "AmE": "/ˈsaɪ.lənt/",
            "definition": "not making any sound",
            "examples": [
               "The room was silent.",
               "She was silent during the test.",
               "The silent night was very calm."
            ]
         },
         {
            "id": 75,
            "word": "silly",
            "role": "adjective",
            "BrE": "/ˈsɪl.i/",
            "AmE": "/ˈsɪl.i/",
            "definition": "not serious or sensible; funny in a simple way",
            "examples": [
               "That joke is silly.",
               "He made a silly mistake.",
               "The children played silly games."
            ]
         },
         {
            "id": 75,
            "word": "similarity",
            "role": "noun",
            "BrE": "/ˌsɪm.ɪˈlær.ə.ti/",
            "AmE": "/ˌsɪm.əˈlær.ə.ti/",
            "definition": "the state of being almost the same",
            "examples": [
               "There is a similarity between the two pictures.",
               "They noticed the similarity in their voices.",
               "The similarity in ideas helped them work together."
            ]
         },
         {
            "id": 75,
            "word": "similarly",
            "role": "adverb",
            "BrE": "/ˈsɪm.ɪ.lə.li/",
            "AmE": "/ˈsɪm.ə.lɚ.li/",
            "definition": "in a similar way",
            "examples": [
               "She likes apples. Similarly, I like oranges.",
               "The first experiment failed. Similarly, the second one did.",
               "They responded similarly to the question."
            ]
         },
         {
            "id": 75,
            "word": "simply",
            "role": "adverb",
            "BrE": "/ˈsɪm.pli/",
            "AmE": "/ˈsɪm.pli/",
            "definition": "in a clear or easy way",
            "examples": [
               "Explain simply so I understand.",
               "She simply said no.",
               "The recipe is simply delicious."
            ]
         },
         {
            "id": 75,
            "word": "since",
            "role": "preposition",
            "BrE": "/sɪns/",
            "AmE": "/sɪns/",
            "definition": "from a time in the past until now",
            "examples": [
               "I have lived here since 2010.",
               "She hasn’t called since Monday.",
               "It has rained every day since last week."
            ]
         },
         {
            "id": 76,
            "word": "sink",
            "role": "verb",
            "BrE": "/sɪŋk/",
            "AmE": "/sɪŋk/",
            "definition": "to go down below the surface of water",
            "examples": [
               "The boat began to sink.",
               "He dropped the stone and watched it sink.",
               "The sun seems to sink in the evening."
            ]
         },
         {
            "id": 76,
            "word": "slice",
            "role": "noun",
            "BrE": "/slaɪs/",
            "AmE": "/slaɪs/",
            "definition": "a flat piece cut from something",
            "examples": [
               "She ate a slice of cake.",
               "I cut a slice of bread.",
               "The pizza was cut into slices."
            ]
         },
         {
            "id": 76,
            "word": "slightly",
            "role": "adverb",
            "BrE": "/ˈslaɪt.li/",
            "AmE": "/ˈslaɪt.li/",
            "definition": "a little bit",
            "examples": [
               "The water is slightly cold.",
               "He is slightly taller than me.",
               "The color changed slightly after washing."
            ]
         },
         {
            "id": 76,
            "word": "slow",
            "role": "adjective",
            "BrE": "/sləʊ/",
            "AmE": "/sloʊ/",
            "definition": "not fast",
            "examples": [
               "The car is slow.",
               "He walks very slow.",
               "The slow computer takes a long time."
            ]
         },
         {
            "id": 76,
            "word": "smart",
            "role": "adjective",
            "BrE": "/smɑːt/",
            "AmE": "/smɑːrt/",
            "definition": "clever or well dressed",
            "examples": [
               "She is smart and studies hard.",
               "He wore a smart suit to the party.",
               "The smart student answered all questions."
            ]
         },
         {
            "id": 76,
            "word": "smooth",
            "role": "adjective",
            "BrE": "/smuːð/",
            "AmE": "/smuːð/",
            "definition": "having a surface without bumps or holes",
            "examples": [
               "The table is smooth.",
               "She has smooth skin.",
               "The road is smooth and easy to drive on."
            ]
         },
         {
            "id": 76,
            "word": "software",
            "role": "noun",
            "BrE": "/ˈsɒft.weər/",
            "AmE": "/ˈsɔːft.wer/",
            "definition": "programs used by a computer",
            "examples": [
               "The software is easy to use.",
               "He installed new software on his laptop.",
               "Software helps the computer run."
            ]
         },
         {
            "id": 76,
            "word": "soil",
            "role": "noun",
            "BrE": "/sɔɪl/",
            "AmE": "/sɔɪl/",
            "definition": "the top layer of earth where plants grow",
            "examples": [
               "The plant grows in the soil.",
               "Good soil helps flowers grow.",
               "The soil is wet after rain."
            ]
         },
         {
            "id": 76,
            "word": "solid",
            "role": "adjective",
            "BrE": "/ˈsɒl.ɪd/",
            "AmE": "/ˈsɑː.lɪd/",
            "definition": "hard or firm; not liquid or gas",
            "examples": [
               "Ice is solid water.",
               "The table is made of solid wood.",
               "He ate a solid meal."
            ]
         },
         {
            "id": 76,
            "word": "sort",
            "role": "noun",
            "BrE": "/sɔːt/",
            "AmE": "/sɔːrt/",
            "definition": "a type or kind",
            "examples": [
               "What sort of music do you like?",
               "There are many sorts of flowers here.",
               "She likes this sort of book."
            ]
         },
         
         {
            "id": 77,
            "word": "specifically",
            "role": "adverb",
            "BrE": "/spəˈsɪf.ɪ.kəl.i/",
            "AmE": "/spəˈsɪf.ɪ.kəl.i/",
            "definition": "in a clear and exact way",
            "examples": [
               "She asked specifically for chocolate cake.",
               "The teacher explained the question specifically.",
               "He spoke specifically about the problem."
            ]
         },
         {
            "id": 77,
            "word": "spending",
            "role": "noun",
            "BrE": "/ˈspen.dɪŋ/",
            "AmE": "/ˈspen.dɪŋ/",
            "definition": "the act of using money to buy things",
            "examples": [
               "His spending is too high.",
               "They reduced spending on food.",
               "Government spending helps the economy."
            ]
         },
         {
            "id": 77,
            "word": "spicy",
            "role": "adjective",
            "BrE": "/ˈspaɪ.si/",
            "AmE": "/ˈspaɪ.si/",
            "definition": "having a strong, hot taste",
            "examples": [
               "I like spicy food.",
               "The curry is very spicy.",
               "She added spicy peppers to the dish."
            ]
         },
         {
            "id": 77,
            "word": "spirit",
            "role": "noun",
            "BrE": "/ˈspɪr.ɪt/",
            "AmE": "/ˈspɪr.ɪt/",
            "definition": "a feeling of energy or enthusiasm",
            "examples": [
               "The team showed great spirit.",
               "She has a kind spirit.",
               "His spirit was strong after the event."
            ]
         },
         {
            "id": 77,
            "word": "spoken",
            "role": "adjective",
            "BrE": "/ˈspəʊ.kən/",
            "AmE": "/ˈspoʊ.kən/",
            "definition": "expressed in speech",
            "examples": [
               "English is a spoken language.",
               "She has good spoken skills.",
               "The spoken word can be powerful."
            ]
         },
         {
            "id": 77,
            "word": "spot",
            "role": "noun",
            "BrE": "/spɒt/",
            "AmE": "/spɑːt/",
            "definition": "a small mark or area",
            "examples": [
               "There is a spot on your shirt.",
               "They found a good spot to sit.",
               "The dog has black spots."
            ]
         },
         {
            "id": 77,
            "word": "spread",
            "role": "verb",
            "BrE": "/spred/",
            "AmE": "/spred/",
            "definition": "to cover a larger area",
            "examples": [
               "She spread butter on the bread.",
               "The fire spread quickly.",
               "The news spread across the town."
            ]
         },
         {
            "id": 77,
            "word": "stadium",
            "role": "noun",
            "BrE": "/ˈsteɪ.di.əm/",
            "AmE": "/ˈsteɪ.di.əm/",
            "definition": "a large sports area with seats for many people",
            "examples": [
               "They watched the game in the stadium.",
               "The stadium was full of fans.",
               "The concert will be held at the stadium."
            ]
         },
         {
            "id": 77,
            "word": "staff",
            "role": "noun",
            "BrE": "/stɑːf/",
            "AmE": "/stæf/",
            "definition": "all the people who work in a place",
            "examples": [
               "The staff are very helpful.",
               "The hospital has many staff members.",
               "The staff worked hard all day."
            ]
         },
         {
            "id": 77,
            "word": "standard",
            "role": "noun",
            "BrE": "/ˈstæn.dəd/",
            "AmE": "/ˈstæn.dɚd/",
            "definition": "a level of quality or skill",
            "examples": [
               "The school has high standards.",
               "The product meets safety standards.",
               "She works to a good standard."
            ]
         },
         
         {
            "id": 78,
            "word": "state",
            "role": "noun",
            "BrE": "/steɪt/",
            "AmE": "/steɪt/",
            "definition": "a country or area with its own government",
            "examples": [
               "Texas is a state in the USA.",
               "The state passed a new law.",
               "She lives in a state with many mountains."
            ]
         },
         {
            "id": 78,
            "word": "statistic",
            "role": "noun",
            "BrE": "/stəˈtɪs.tɪk/",
            "AmE": "/stəˈtɪs.tɪk/",
            "definition": "a number that shows information about something",
            "examples": [
               "The statistic shows how many people voted.",
               "Statistics help understand the problem.",
               "This statistic is important for the study."
            ]
         },
         {
            "id": 78,
            "word": "statue",
            "role": "noun",
            "BrE": "/ˈstætʃ.uː/",
            "AmE": "/ˈstætʃ.uː/",
            "definition": "a model of a person or animal in stone or metal",
            "examples": [
               "There is a statue in the park.",
               "The statue is very old.",
               "We saw a famous statue in the city."
            ]
         },
         {
            "id": 78,
            "word": "stick",
            "role": "noun",
            "BrE": "/stɪk/",
            "AmE": "/stɪk/",
            "definition": "a small thin piece of wood",
            "examples": [
               "He found a stick on the ground.",
               "The dog carried a stick in its mouth.",
               "We used sticks to make a fire."
            ]
         },
         {
            "id": 78,
            "word": "still",
            "role": "adverb",
            "BrE": "/stɪl/",
            "AmE": "/stɪl/",
            "definition": "up to now; continuing",
            "examples": [
               "She is still here.",
               "It is still raining outside.",
               "I still don’t understand the question."
            ]
         },
         {
            "id": 78,
            "word": "store",
            "role": "noun",
            "BrE": "/stɔːr/",
            "AmE": "/stɔːr/",
            "definition": "a place where things are sold",
            "examples": [
               "I went to the store to buy bread.",
               "The store is closed today.",
               "There are many stores in the city."
            ]
         },
         {
            "id": 78,
            "word": "stranger",
            "role": "noun",
            "BrE": "/ˈstreɪn.dʒər/",
            "AmE": "/ˈstreɪn.dʒɚ/",
            "definition": "someone you do not know",
            "examples": [
               "Don’t talk to strangers.",
               "The stranger asked for directions.",
               "She feels nervous around strangers."
            ]
         },
         {
            "id": 78,
            "word": "strength",
            "role": "noun",
            "BrE": "/streŋθ/",
            "AmE": "/streŋθ/",
            "definition": "the quality of being strong",
            "examples": [
               "He has great strength.",
               "The team showed strength in the game.",
               "Physical strength is important for athletes."
            ]
         },
         {
            "id": 78,
            "word": "string",
            "role": "noun",
            "BrE": "/strɪŋ/",
            "AmE": "/strɪŋ/",
            "definition": "a thin piece of rope or thread",
            "examples": [
               "She tied the box with string.",
               "The kite flew with a long string.",
               "We need string to fix the tent."
            ]
         },
         {
            "id": 78,
            "word": "strongly",
            "role": "adverb",
            "BrE": "/ˈstrɒŋ.li/",
            "AmE": "/ˈstrɔːŋ.li/",
            "definition": "in a powerful or forceful way",
            "examples": [
               "He strongly disagreed with the idea.",
               "The wind blew strongly all night.",
               "She felt strongly about the issue."
            ]
         },
         
         {
            "id": 79,
            "word": "studio",
            "role": "noun",
            "BrE": "/ˈstjuː.di.əʊ/",
            "AmE": "/ˈstuː.di.oʊ/",
            "definition": "a room where music, art, or movies are made",
            "examples": [
               "She works in a music studio.",
               "The artist painted in her studio.",
               "They filmed the movie in a large studio."
            ]
         },
         {
            "id": 79,
            "word": "stuff",
            "role": "noun",
            "BrE": "/stʌf/",
            "AmE": "/stʌf/",
            "definition": "things or materials of various kinds",
            "examples": [
               "Put your stuff in the bag.",
               "He has a lot of stuff in his room.",
               "The box is full of old stuff."
            ]
         },
         {
            "id": 79,
            "word": "substance",
            "role": "noun",
            "BrE": "/ˈsʌb.stəns/",
            "AmE": "/ˈsʌb.stəns/",
            "definition": "a material with particular qualities",
            "examples": [
               "Water is a clear substance.",
               "The substance was soft and sticky.",
               "Scientists studied the new substance carefully."
            ]
         },
         {
            "id": 79,
            "word": "successfully",
            "role": "adverb",
            "BrE": "/səkˈses.fəl.i/",
            "AmE": "/səkˈses.fəl.i/",
            "definition": "in a way that achieves a goal",
            "examples": [
               "She passed the test successfully.",
               "They completed the project successfully.",
               "He successfully climbed the mountain."
            ]
         },
         {
            "id": 79,
            "word": "sudden",
            "role": "adjective",
            "BrE": "/ˈsʌd.ən/",
            "AmE": "/ˈsʌd.ən/",
            "definition": "happening quickly without warning",
            "examples": [
               "There was a sudden noise.",
               "The sudden rain surprised us.",
               "She had a sudden idea."
            ]
         },
         {
            "id": 79,
            "word": "suffer",
            "role": "verb",
            "BrE": "/ˈsʌf.ər/",
            "AmE": "/ˈsʌf.ɚ/",
            "definition": "to experience pain or problems",
            "examples": [
               "He suffers from a cold.",
               "Many people suffer after the accident.",
               "She suffered a lot during the illness."
            ]
         },
         {
            "id": 79,
            "word": "suit",
            "role": "noun",
            "BrE": "/suːt/",
            "AmE": "/suːt/",
            "definition": "a set of clothes worn together",
            "examples": [
               "He wore a black suit.",
               "The suit fits him well.",
               "She bought a new suit for work."
            ]
         },
         {
            "id": 79,
            "word": "suitable",
            "role": "adjective",
            "BrE": "/ˈsuː.tə.bəl/",
            "AmE": "/ˈsuː.t̬ə.bəl/",
            "definition": "right or good for a particular purpose",
            "examples": [
               "This movie is suitable for children.",
               "The shoes are suitable for running.",
               "We found a suitable place to meet."
            ]
         },
         {
            "id": 79,
            "word": "summarize",
            "role": "verb",
            "BrE": "/ˈsʌm.ər.aɪz/",
            "AmE": "/ˈsʌm.ə.raɪz/",
            "definition": "to give the main points briefly",
            "examples": [
               "Please summarize the story.",
               "She summarized the lesson clearly.",
               "The report summarizes the results."
            ]
         },
         {
            "id": 79,
            "word": "summary",
            "role": "noun",
            "BrE": "/ˈsʌm.ər.i/",
            "AmE": "/ˈsʌm.ɚ.i/",
            "definition": "a short statement of the main points",
            "examples": [
               "He gave a summary of the book.",
               "The summary is easy to understand.",
               "Please read the summary before class."
            ]
         },
         
         {
            "id": 80,
            "word": "supply",
            "role": "noun",
            "BrE": "/səˈplaɪ/",
            "AmE": "/səˈplaɪ/",
            "definition": "the amount of something available to use",
            "examples": [
               "The store has a good supply of water.",
               "We need to increase the supply of food.",
               "The supply of electricity was cut off."
            ]
         },
         {
            "id": 80,
            "word": "supporter",
            "role": "noun",
            "BrE": "/səˈpɔː.tər/",
            "AmE": "/səˈpɔːr.t̬ɚ/",
            "definition": "someone who likes and helps a person, team, or idea",
            "examples": [
               "She is a supporter of the team.",
               "He is a supporter of the new law.",
               "The supporters cheered loudly."
            ]
         },
         {
            "id": 80,
            "word": "surely",
            "role": "adverb",
            "BrE": "/ˈʃɔː.li/",
            "AmE": "/ˈʃʊr.li/",
            "definition": "used to show that something is certain",
            "examples": [
               "Surely you can help me.",
               "Surely it will rain today.",
               "She will surely win the prize."
            ]
         },
         {
            "id": 80,
            "word": "surface",
            "role": "noun",
            "BrE": "/ˈsɜː.fɪs/",
            "AmE": "/ˈsɜːr.fɪs/",
            "definition": "the outside or top layer of something",
            "examples": [
               "The surface of the table is clean.",
               "The boat floated on the water surface.",
               "The surface of the road is smooth."
            ]
         },
         {
            "id": 80,
            "word": "survive",
            "role": "verb",
            "BrE": "/səˈvaɪv/",
            "AmE": "/sərˈvaɪv/",
            "definition": "to continue to live or exist",
            "examples": [
               "Many animals survive the winter.",
               "He survived the accident.",
               "The plant survived without water."
            ]
         },
         {
            "id": 80,
            "word": "swim",
            "role": "verb",
            "BrE": "/swɪm/",
            "AmE": "/swɪm/",
            "definition": "to move through water using arms and legs",
            "examples": [
               "I like to swim in the pool.",
               "She swims every morning.",
               "They swam across the lake."
            ]
         },
         {
            "id": 80,
            "word": "switch",
            "role": "noun",
            "BrE": "/swɪtʃ/",
            "AmE": "/swɪtʃ/",
            "definition": "a button or device to turn something on or off",
            "examples": [
               "Turn off the light with the switch.",
               "The switch is on the wall.",
               "He pressed the switch quickly."
            ]
         },
         {
            "id": 80,
            "word": "symptom",
            "role": "noun",
            "BrE": "/ˈsɪmp.təm/",
            "AmE": "/ˈsɪmp.təm/",
            "definition": "a sign of illness",
            "examples": [
               "Fever is a symptom of flu.",
               "Cough is a common symptom.",
               "She showed symptoms of cold."
            ]
         },
         {
            "id": 80,
            "word": "tail",
            "role": "noun",
            "BrE": "/teɪl/",
            "AmE": "/teɪl/",
            "definition": "the part at the back of an animal’s body",
            "examples": [
               "The dog wagged its tail.",
               "Birds have long tails.",
               "The cat’s tail is very soft."
            ]
         },
         {
            "id": 80,
            "word": "talent",
            "role": "noun",
            "BrE": "/ˈtæl.ənt/",
            "AmE": "/ˈtæl.ənt/",
            "definition": "a natural ability to do something well",
            "examples": [
               "She has a talent for singing.",
               "His talent helped him win the contest.",
               "The school looks for students with talent."
            ]
         },
         
         {
            "id": 81,
            "word": "talented",
            "role": "adjective",
            "BrE": "/ˈtæl.ən.tɪd/",
            "AmE": "/ˈtæl.ən.tɪd/",
            "definition": "having a natural ability to do something well",
            "examples": [
               "She is a talented musician.",
               "The team has many talented players.",
               "He is very talented at painting."
            ]
         },
         {
            "id": 81,
            "word": "tape",
            "role": "noun",
            "BrE": "/teɪp/",
            "AmE": "/teɪp/",
            "definition": "a long, thin strip used to stick things together or record sound",
            "examples": [
               "Use tape to fix the paper.",
               "The tape is on the table.",
               "She listened to a tape of the interview."
            ]
         },
         {
            "id": 81,
            "word": "tax",
            "role": "noun",
            "BrE": "/tæks/",
            "AmE": "/tæks/",
            "definition": "money paid to the government",
            "examples": [
               "We pay tax on our income.",
               "The tax is higher this year.",
               "The government collects taxes for schools."
            ]
         },
         {
            "id": 81,
            "word": "technical",
            "role": "adjective",
            "BrE": "/ˈtek.nɪ.kəl/",
            "AmE": "/ˈtek.nɪ.kəl/",
            "definition": "relating to science or machines",
            "examples": [
               "He has a technical problem with his computer.",
               "The machine needs technical help.",
               "She gave a technical explanation."
            ]
         },
         {
            "id": 81,
            "word": "technique",
            "role": "noun",
            "BrE": "/tekˈniːk/",
            "AmE": "/tekˈniːk/",
            "definition": "a way of doing something",
            "examples": [
               "She learned a new painting technique.",
               "Good technique helps in sports.",
               "He uses a special technique to cook."
            ]
         },
         {
            "id": 81,
            "word": "tend",
            "role": "verb",
            "BrE": "/tend/",
            "AmE": "/tend/",
            "definition": "to be likely to do something",
            "examples": [
               "I tend to wake up early.",
               "People tend to eat more in winter.",
               "He tends to forget his keys."
            ]
         },
         {
            "id": 81,
            "word": "tent",
            "role": "noun",
            "BrE": "/tent/",
            "AmE": "/tent/",
            "definition": "a shelter made of cloth and poles for camping",
            "examples": [
               "We sleep in a tent when camping.",
               "The tent is big enough for two people.",
               "They set up the tent near the river."
            ]
         },
         {
            "id": 81,
            "word": "that",
            "role": "pronoun",
            "BrE": "/ðæt/",
            "AmE": "/ðæt/",
            "definition": "used to show a particular thing or person",
            "examples": [
               "That is my book.",
               "I like that shirt.",
               "She said that was her idea."
            ]
         },
         {
            "id": 81,
            "word": "theirs",
            "role": "pronoun",
            "BrE": "/ðeəz/",
            "AmE": "/ðer/",
            "definition": "belonging to them",
            "examples": [
               "The house is theirs.",
               "These books are theirs.",
               "That car is theirs."
            ]
         },
         {
            "id": 81,
            "word": "theme",
            "role": "noun",
            "BrE": "/θiːm/",
            "AmE": "/θiːm/",
            "definition": "the main subject or idea in a talk or book",
            "examples": [
               "The theme of the story is friendship.",
               "The movie’s theme is love.",
               "We studied the theme in class."
            ]
         },
         
         {
            "id": 82,
            "word": "theory",
            "role": "noun",
            "BrE": "/ˈθɪə.ri/",
            "AmE": "/ˈθɪr.i/",
            "definition": "an idea or set of ideas that explain something",
            "examples": [
               "He has a theory about why it happened.",
               "Scientists study many theories.",
               "The theory was hard to understand."
            ]
         },
         {
            "id": 82,
            "word": "therefore",
            "role": "adverb",
            "BrE": "/ˈðeə.fɔːr/",
            "AmE": "/ˈðer.fɔːr/",
            "definition": "for that reason; so",
            "examples": [
               "It was raining, therefore we stayed inside.",
               "She was tired, therefore she slept early.",
               "The road was closed, therefore we went another way."
            ]
         },
         {
            "id": 82,
            "word": "this",
            "role": "pronoun",
            "BrE": "/ðɪs/",
            "AmE": "/ðɪs/",
            "definition": "used to show a particular thing or person close to you",
            "examples": [
               "This is my bag.",
               "I like this song.",
               "This is my favorite book."
            ]
         },
         {
            "id": 82,
            "word": "though",
            "role": "conjunction",
            "BrE": "/ðəʊ/",
            "AmE": "/ðoʊ/",
            "definition": "used to show contrast",
            "examples": [
               "It was cold, though it was sunny.",
               "She is tired, though she keeps working.",
               "Though it was hard, he finished."
            ]
         },
         {
            "id": 82,
            "word": "throat",
            "role": "noun",
            "BrE": "/θrəʊt/",
            "AmE": "/θroʊt/",
            "definition": "the passage in the neck for food and air",
            "examples": [
               "My throat hurts.",
               "She cleared her throat before speaking.",
               "He has a sore throat."
            ]
         },
         {
            "id": 82,
            "word": "throughout",
            "role": "preposition",
            "BrE": "/θruːˈaʊt/",
            "AmE": "/θruːˈaʊt/",
            "definition": "in every part of a place or during a period of time",
            "examples": [
               "It rained throughout the day.",
               "She stayed calm throughout the meeting.",
               "The festival happened throughout the city."
            ]
         },
         {
            "id": 82,
            "word": "tight",
            "role": "adjective",
            "BrE": "/taɪt/",
            "AmE": "/taɪt/",
            "definition": "firm or fixed, not loose",
            "examples": [
               "The lid is tight.",
               "The shoes feel tight.",
               "He held the rope tight."
            ]
         },
         {
            "id": 82,
            "word": "till",
            "role": "preposition",
            "BrE": "/tɪl/",
            "AmE": "/tɪl/",
            "definition": "up to a certain time",
            "examples": [
               "Wait till I come back.",
               "She worked till six o’clock.",
               "Stay here till it stops raining."
            ]
         },
         {
            "id": 82,
            "word": "tin",
            "role": "noun",
            "BrE": "/tɪn/",
            "AmE": "/tɪn/",
            "definition": "a metal container for food or drink",
            "examples": [
               "The tin of beans is on the shelf.",
               "She opened a tin of soup.",
               "He bought a tin of biscuits."
            ]
         },
         {
            "id": 82,
            "word": "tiny",
            "role": "adjective",
            "BrE": "/ˈtaɪ.ni/",
            "AmE": "/ˈtaɪ.ni/",
            "definition": "very small",
            "examples": [
               "Look at the tiny bird.",
               "She has tiny hands.",
               "They live in a tiny house."
            ]
         },
         
         {
            "id": 83,
            "word": "tip",
            "role": "noun",
            "BrE": "/tɪp/",
            "AmE": "/tɪp/",
            "definition": "a small piece of advice or helpful information",
            "examples": [
               "Here is a tip for studying.",
               "She gave me a good tip about cooking.",
               "The teacher gave tips to improve writing."
            ]
         },
         {
            "id": 83,
            "word": "toe",
            "role": "noun",
            "BrE": "/təʊ/",
            "AmE": "/toʊ/",
            "definition": "one of the five parts at the end of the foot",
            "examples": [
               "He hurt his toe.",
               "She has long toes.",
               "The baby wiggled his toes."
            ]
         },
         {
            "id": 83,
            "word": "tongue",
            "role": "noun",
            "BrE": "/tʌŋ/",
            "AmE": "/tʌŋ/",
            "definition": "the soft part inside the mouth used for tasting and speaking",
            "examples": [
               "She stuck out her tongue.",
               "The tongue helps us taste food.",
               "He burned his tongue on hot soup."
            ]
         },
         {
            "id": 83,
            "word": "total",
            "role": "adjective",
            "BrE": "/ˈtəʊ.təl/",
            "AmE": "/ˈtoʊ.t̬əl/",
            "definition": "complete or whole",
            "examples": [
               "The total cost is ten dollars.",
               "She spent a total of two hours studying.",
               "The team won by a total of five points."
            ]
         },
         {
            "id": 83,
            "word": "touch",
            "role": "verb",
            "BrE": "/tʌtʃ/",
            "AmE": "/tʌtʃ/",
            "definition": "to put your hand on something",
            "examples": [
               "Don’t touch the hot stove.",
               "He touched the ball carefully.",
               "She touched the painting gently."
            ]
         },
         {
            "id": 83,
            "word": "tour",
            "role": "noun",
            "BrE": "/tʊər/",
            "AmE": "/tʊr/",
            "definition": "a trip to visit places",
            "examples": [
               "We went on a city tour.",
               "She took a tour of the museum.",
               "The tour included many famous sites."
            ]
         },
         {
            "id": 83,
            "word": "trade",
            "role": "noun",
            "BrE": "/treɪd/",
            "AmE": "/treɪd/",
            "definition": "the buying and selling of goods or services",
            "examples": [
               "Trade between countries is important.",
               "They work in the trade business.",
               "The trade of goods increased last year."
            ]
         },
         {
            "id": 83,
            "word": "translate",
            "role": "verb",
            "BrE": "/trænzˈleɪt/",
            "AmE": "/trænsˈleɪt/",
            "definition": "to change words into another language",
            "examples": [
               "Can you translate this sentence?",
               "She translates books from French to English.",
               "The app helps translate foreign languages."
            ]
         },
         {
            "id": 83,
            "word": "translation",
            "role": "noun",
            "BrE": "/trænzˈleɪ.ʃən/",
            "AmE": "/trænsˈleɪ.ʃən/",
            "definition": "the process of changing words into another language",
            "examples": [
               "The translation of the book took months.",
               "He works in translation.",
               "The translation is very accurate."
            ]
         },
         {
            "id": 83,
            "word": "transport",
            "role": "noun",
            "BrE": "/ˈtræn.spɔːt/",
            "AmE": "/ˈtræn.spɔːrt/",
            "definition": "the system or method of moving people or goods",
            "examples": [
               "Public transport is busy in the city.",
               "They used transport to move the goods.",
               "The transport system is very good."
            ]
         },
         
         {
            "id": 84,
            "word": "treat",
            "role": "verb",
            "BrE": "/triːt/",
            "AmE": "/triːt/",
            "definition": "to behave towards someone in a particular way",
            "examples": [
               "She treats me kindly.",
               "They treat patients at the hospital.",
               "He treats his friends well."
            ]
         },
         {
            "id": 84,
            "word": "treatment",
            "role": "noun",
            "BrE": "/ˈtriːt.mənt/",
            "AmE": "/ˈtriːt.mənt/",
            "definition": "medical care given to a patient",
            "examples": [
               "He is getting treatment for his illness.",
               "The treatment helped her feel better.",
               "Doctors offer different treatments."
            ]
         },
         {
            "id": 84,
            "word": "trend",
            "role": "noun",
            "BrE": "/trend/",
            "AmE": "/trend/",
            "definition": "a general development or change in a situation",
            "examples": [
               "There is a trend of using less plastic.",
               "Fashion trends change every year.",
               "The trend shows more people exercise."
            ]
         },
         {
            "id": 84,
            "word": "trick",
            "role": "noun",
            "BrE": "/trɪk/",
            "AmE": "/trɪk/",
            "definition": "a clever action or way to do something",
            "examples": [
               "He showed me a magic trick.",
               "The trick is to be patient.",
               "She learned a new trick with cards."
            ]
         },
         {
            "id": 84,
            "word": "truth",
            "role": "noun",
            "BrE": "/truːθ/",
            "AmE": "/truːθ/",
            "definition": "a fact or reality",
            "examples": [
               "Tell me the truth.",
               "The truth is important.",
               "He always speaks the truth."
            ]
         },
         {
            "id": 84,
            "word": "tube",
            "role": "noun",
            "BrE": "/tjuːb/",
            "AmE": "/tuːb/",
            "definition": "a long, hollow object",
            "examples": [
               "The toothpaste is in a tube.",
               "He put the water in a tube.",
               "The tube carries air inside the machine."
            ]
         },
         {
            "id": 84,
            "word": "type",
            "role": "noun",
            "BrE": "/taɪp/",
            "AmE": "/taɪp/",
            "definition": "a group with similar characteristics",
            "examples": [
               "What type of music do you like?",
               "This type of phone is popular.",
               "There are many types of animals."
            ]
         },
         {
            "id": 84,
            "word": "typically",
            "role": "adverb",
            "BrE": "/ˈtɪp.ɪ.kəl.i/",
            "AmE": "/ˈtɪp.ɪ.kəl.i/",
            "definition": "usually or normally",
            "examples": [
               "She typically eats breakfast at 8.",
               "It is typically cold in winter.",
               "They typically arrive on time."
            ]
         },
         {
            "id": 84,
            "word": "tyre",
            "role": "noun",
            "BrE": "/ˈtaɪə(r)/",
            "AmE": "/ˈtaɪɚ/",
            "definition": "a rubber ring around a wheel",
            "examples": [
               "The car has a flat tyre.",
               "He changed the tyre quickly.",
               "Tyres are important for driving."
            ]
         },
         {
            "id": 84,
            "word": "ugly",
            "role": "adjective",
            "BrE": "/ˈʌɡ.li/",
            "AmE": "/ˈʌɡ.li/",
            "definition": "not pleasant to look at",
            "examples": [
               "That building looks ugly.",
               "He made an ugly face.",
               "The painting is ugly to some people."
            ]
         },
         {
            "id": 85,
            "word": "unable",
            "role": "adjective",
            "BrE": "/ʌnˈeɪ.bl̩/",
            "AmE": "/ʌnˈeɪ.bl̩/",
            "definition": "not having the ability or power to do something",
            "examples": [
               "She was unable to come.",
               "He is unable to swim.",
               "They were unable to finish the work."
            ]
         },
         {
            "id": 85,
            "word": "uncomfortable",
            "role": "adjective",
            "BrE": "/ʌnˈkʌm.fɚ.tə.bəl/",
            "AmE": "/ʌnˈkʌm.fɚ.tə.bəl/",
            "definition": "not feeling physically or emotionally comfortable",
            "examples": [
               "The chair is uncomfortable.",
               "He felt uncomfortable at the party.",
               "She wore uncomfortable shoes."
            ]
         },
         {
            "id": 85,
            "word": "underwear",
            "role": "noun",
            "BrE": "/ˈʌn.də.weər/",
            "AmE": "/ˈʌn.dɚ.weər/",
            "definition": "clothes worn under other clothes",
            "examples": [
               "He bought new underwear.",
               "She changed her underwear.",
               "Underwear is important for comfort."
            ]
         },
         {
            "id": 85,
            "word": "unemployed",
            "role": "adjective",
            "BrE": "/ˌʌn.ɪmˈplɔɪd/",
            "AmE": "/ˌʌn.ɪmˈplɔɪd/",
            "definition": "without a job",
            "examples": [
               "He is unemployed right now.",
               "Many people were unemployed last year.",
               "She is looking for a job because she is unemployed."
            ]
         },
         {
            "id": 85,
            "word": "unemployment",
            "role": "noun",
            "BrE": "/ˌʌn.ɪmˈplɔɪ.mənt/",
            "AmE": "/ˌʌn.ɪmˈplɔɪ.mənt/",
            "definition": "the state of not having a job",
            "examples": [
               "Unemployment is high in the city.",
               "The government works to reduce unemployment.",
               "Unemployment affects many families."
            ]
         },
         {
            "id": 85,
            "word": "unfair",
            "role": "adjective",
            "BrE": "/ʌnˈfeər/",
            "AmE": "/ʌnˈfer/",
            "definition": "not treating people equally or reasonably",
            "examples": [
               "It’s unfair to take his things.",
               "She thinks the rules are unfair.",
               "The decision was unfair to the workers."
            ]
         },
         {
            "id": 85,
            "word": "union",
            "role": "noun",
            "BrE": "/ˈjuː.njən/",
            "AmE": "/ˈjuː.njən/",
            "definition": "a group of workers who join together to protect their rights",
            "examples": [
               "The workers joined a union.",
               "The union helps protect workers.",
               "He is a member of the union."
            ]
         },
         {
            "id": 85,
            "word": "unless",
            "role": "conjunction",
            "BrE": "/ənˈles/",
            "AmE": "/ənˈles/",
            "definition": "except if",
            "examples": [
               "I won’t go unless you come.",
               "She won’t eat unless she’s hungry.",
               "You can’t play unless you finish homework."
            ]
         },
         {
            "id": 85,
            "word": "unlike",
            "role": "preposition",
            "BrE": "/ʌnˈlaɪk/",
            "AmE": "/ʌnˈlaɪk/",
            "definition": "different from",
            "examples": [
               "Unlike her brother, she is tall.",
               "Unlike before, it’s sunny today.",
               "The two cars are unlike in color."
            ]
         },
         {
            "id": 85,
            "word": "unlikely",
            "role": "adjective",
            "BrE": "/ʌnˈlaɪ.kli/",
            "AmE": "/ʌnˈlaɪ.kli/",
            "definition": "not likely to happen",
            "examples": [
               "It is unlikely to rain today.",
               "She is unlikely to come late.",
               "They said it’s unlikely he will win."
            ]
         },
            {
            "id": 86,
            "word": "unnecessary",
            "role": "adjective",
            "BrE": "/ʌnˈnes.ə.ser.i/",
            "AmE": "/ʌnˈnes.ə.ser.i/",
            "definition": "not needed or not necessary",
            "examples": [
               "That is an unnecessary expense.",
               "She made an unnecessary mistake.",
               "It’s unnecessary to bring so much food."
            ]
         },
         {
            "id": 86,
            "word": "unpleasant",
            "role": "adjective",
            "BrE": "/ʌnˈplez.ənt/",
            "AmE": "/ʌnˈplez.ənt/",
            "definition": "not enjoyable or nice",
            "examples": [
               "The weather was unpleasant yesterday.",
               "He had an unpleasant experience at school.",
               "The smell was unpleasant in the room."
            ]
         },
         {
            "id": 86,
            "word": "update",
            "role": "verb",
            "BrE": "/ˈʌp.deɪt/",
            "AmE": "/ˈʌp.deɪt/",
            "definition": "to make something more modern or correct",
            "examples": [
               "Please update your software.",
               "They update the website every week.",
               "He updated the report with new information."
            ]
         },
         {
            "id": 86,
            "word": "upon",
            "role": "preposition",
            "BrE": "/əˈpɒn/",
            "AmE": "/əˈpɑːn/",
            "definition": "on or immediately after",
            "examples": [
               "Upon arrival, please call me.",
               "She smiled upon seeing him.",
               "The decision was made upon review."
            ]
         },
         {
            "id": 86,
            "word": "upset",
            "role": "adjective",
            "BrE": "/ʌpˈset/",
            "AmE": "/ʌpˈset/",
            "definition": "unhappy or worried",
            "examples": [
               "He was upset after the game.",
               "She felt upset about the news.",
               "They were upset by the bad weather."
            ]
         },
         {
            "id": 86,
            "word": "used",
            "role": "adjective",
            "BrE": "/juːzd/",
            "AmE": "/juːzd/",
            "definition": "not new; already owned or worn",
            "examples": [
               "I bought a used car.",
               "She wears used clothes sometimes.",
               "The book was used but in good condition."
            ]
         },
         {
            "id": 86,
            "word": "valuable",
            "role": "adjective",
            "BrE": "/ˈvæl.jə.bəl/",
            "AmE": "/ˈvæl.jə.bəl/",
            "definition": "worth a lot of money or important",
            "examples": [
               "This ring is very valuable.",
               "She gave me valuable advice.",
               "The painting is valuable and old."
            ]
         },
         {
            "id": 86,
            "word": "value",
            "role": "noun",
            "BrE": "/ˈvæl.juː/",
            "AmE": "/ˈvæl.juː/",
            "definition": "how much something is worth",
            "examples": [
               "The value of the car is high.",
               "She understands the value of hard work.",
               "Prices depend on the value of goods."
            ]
         },
         {
            "id": 86,
            "word": "various",
            "role": "adjective",
            "BrE": "/ˈveə.ri.əs/",
            "AmE": "/ˈver.i.əs/",
            "definition": "different kinds of",
            "examples": [
               "There are various colors to choose from.",
               "She has various hobbies.",
               "They visited various places on their trip."
            ]
         },
         {
            "id": 86,
            "word": "version",
            "role": "noun",
            "BrE": "/ˈvɜː.ʃən/",
            "AmE": "/ˈvɝː.ʒən/",
            "definition": "a form of something that is different from others",
            "examples": [
               "This is the new version of the app.",
               "She prefers the older version of the song.",
               "The software has many versions."
            ]
         },
            {
            "id": 87,
            "word": "victim",
            "role": "noun",
            "BrE": "/ˈvɪk.tɪm/",
            "AmE": "/ˈvɪk.tɪm/",
            "definition": "someone who has been harmed or hurt",
            "examples": [
               "She was a victim of bullying.",
               "Many victims of the accident were helped.",
               "The victim called the police."
            ]
         },
         {
            "id": 87,
            "word": "view",
            "role": "noun",
            "BrE": "/vjuː/",
            "AmE": "/vjuː/",
            "definition": "what you can see from a place",
            "examples": [
               "The view from the hill is nice.",
               "She likes the view of the sea.",
               "We enjoyed the beautiful view."
            ]
         },
         {
            "id": 87,
            "word": "viewer",
            "role": "noun",
            "BrE": "/ˈvjuː.ər/",
            "AmE": "/ˈvjuː.ɚ/",
            "definition": "someone who watches TV or a screen",
            "examples": [
               "The viewers liked the show.",
               "Viewers watched the football game.",
               "Many viewers called to ask questions."
            ]
         },
         {
            "id": 87,
            "word": "violent",
            "role": "adjective",
            "BrE": "/ˈvaɪə.lənt/",
            "AmE": "/ˈvaɪə.lənt/",
            "definition": "using force to hurt someone",
            "examples": [
               "The movie had violent scenes.",
               "He showed violent behavior.",
               "Violent storms caused damage."
            ]
         },
         {
            "id": 87,
            "word": "volunteer",
            "role": "noun",
            "BrE": "/ˌvɒl.ənˈtɪər/",
            "AmE": "/ˌvɑː.lənˈtɪr/",
            "definition": "someone who offers to help without pay",
            "examples": [
               "She is a volunteer at the hospital.",
               "Volunteers help in many places.",
               "Many volunteers worked on the project."
            ]
         },
         {
            "id": 87,
            "word": "vote",
            "role": "verb",
            "BrE": "/vəʊt/",
            "AmE": "/voʊt/",
            "definition": "to choose by voting",
            "examples": [
               "People vote in elections.",
               "She voted for the new leader.",
               "They will vote tomorrow."
            ]
         },
         {
            "id": 87,
            "word": "warm",
            "role": "adjective",
            "BrE": "/wɔːm/",
            "AmE": "/wɔːrm/",
            "definition": "having a temperature that is not cold",
            "examples": [
               "The room is warm.",
               "She wore a warm coat.",
               "It was a warm day."
            ]
         },
         {
            "id": 87,
            "word": "warn",
            "role": "verb",
            "BrE": "/wɔːn/",
            "AmE": "/wɔːrn/",
            "definition": "to tell someone about possible danger",
            "examples": [
               "I warned him about the rain.",
               "The sign warns drivers to slow down.",
               "She warned them to be careful."
            ]
         },
         {
            "id": 87,
            "word": "warning",
            "role": "noun",
            "BrE": "/ˈwɔː.nɪŋ/",
            "AmE": "/ˈwɔːr.nɪŋ/",
            "definition": "a message that tells about danger",
            "examples": [
               "There was a warning about the storm.",
               "He ignored the warning signs.",
               "The warning saved many people."
            ]
         },
         {
            "id": 87,
            "word": "waste",
            "role": "noun",
            "BrE": "/weɪst/",
            "AmE": "/weɪst/",
            "definition": "things that are not needed and thrown away",
            "examples": [
               "Don’t waste water.",
               "They recycle their waste.",
               "Waste causes pollution."
            ]
         },
         {
            "id": 88,
            "word": "water",
            "role": "noun",
            "BrE": "/ˈwɔː.tər/",
            "AmE": "/ˈwɑː.t̬ɚ/",
            "definition": "a clear liquid that people, animals, and plants need to live",
            "examples": [
               "I drink water every day.",
               "She poured water into the glass.",
               "Water is important for health."
            ]
         },
         {
            "id": 88,
            "word": "wave",
            "role": "noun",
            "BrE": "/weɪv/",
            "AmE": "/weɪv/",
            "definition": "a movement of water on the sea or ocean",
            "examples": [
               "The waves are big today.",
               "He jumped over the wave.",
               "The surfer rides the waves."
            ]
         },
         {
            "id": 88,
            "word": "weapon",
            "role": "noun",
            "BrE": "/ˈwep.ən/",
            "AmE": "/ˈwep.ən/",
            "definition": "something used to hurt or defend against others",
            "examples": [
               "The soldier carried a weapon.",
               "Knives can be dangerous weapons.",
               "The police found the weapon."
            ]
         },
         {
            "id": 88,
            "word": "weigh",
            "role": "verb",
            "BrE": "/weɪ/",
            "AmE": "/weɪ/",
            "definition": "to find out how heavy something is",
            "examples": [
               "I will weigh the apples.",
               "The box weighs five kilos.",
               "She weighed herself this morning."
            ]
         },
         {
            "id": 88,
            "word": "western",
            "role": "adjective",
            "BrE": "/ˈwes.tən/",
            "AmE": "/ˈwes.tɚn/",
            "definition": "related to the west or Western countries",
            "examples": [
               "Western movies are popular.",
               "She loves Western music.",
               "The culture is influenced by Western ideas."
            ]
         },
         {
            "id": 88,
            "word": "whatever",
            "role": "pronoun",
            "BrE": "/wɒtˈev.ər/",
            "AmE": "/wʌtˈev.ɚ/",
            "definition": "anything or everything that",
            "examples": [
               "Choose whatever you like.",
               "Take whatever you want.",
               "Do whatever makes you happy."
            ]
         },
         {
            "id": 88,
            "word": "whenever",
            "role": "adverb",
            "BrE": "/wenˈev.ər/",
            "AmE": "/wenˈev.ɚ/",
            "definition": "at any time when",
            "examples": [
               "Call me whenever you need help.",
               "She visits whenever she can.",
               "You can come whenever you want."
            ]
         },
         {
            "id": 88,
            "word": "whether",
            "role": "conjunction",
            "BrE": "/ˈweð.ər/",
            "AmE": "/ˈweð.ɚ/",
            "definition": "used to talk about choices or possibilities",
            "examples": [
               "I don’t know whether to go.",
               "She asked whether he was ready.",
               "Whether it rains or not, we will go."
            ]
         },
         {
            "id": 88,
            "word": "while",
            "role": "conjunction",
            "BrE": "/waɪl/",
            "AmE": "/waɪl/",
            "definition": "during the time that",
            "examples": [
               "I read while waiting.",
               "She listened while he spoke.",
               "He worked while it was raining."
            ]
         },
         {
            "id": 88,
            "word": "whole",
            "role": "adjective",
            "BrE": "/həʊl/",
            "AmE": "/hoʊl/",
            "definition": "complete; all of something",
            "examples": [
               "I ate the whole cake.",
               "She read the whole book.",
               "The whole family went to the park."
            ]
         },
            {
            "id": 89,
            "word": "will",
            "role": "modal verb",
            "BrE": "/wɪl/",
            "AmE": "/wɪl/",
            "definition": "used to talk about the future",
            "examples": [
               "I will help you tomorrow.",
               "She will come later.",
               "They will finish the work soon."
            ]
         },
         {
            "id": 89,
            "word": "win",
            "role": "verb",
            "BrE": "/wɪn/",
            "AmE": "/wɪn/",
            "definition": "to be the best or first in a game or competition",
            "examples": [
               "He will win the race.",
               "She won the game.",
               "They want to win the competition."
            ]
         },
         {
            "id": 89,
            "word": "wing",
            "role": "noun",
            "BrE": "/wɪŋ/",
            "AmE": "/wɪŋ/",
            "definition": "part of a bird or airplane used for flying",
            "examples": [
               "The bird spread its wings.",
               "The airplane has two wings.",
               "The injured bird could not use its wing."
            ]
         },
         {
            "id": 89,
            "word": "within",
            "role": "preposition",
            "BrE": "/wɪˈðɪn/",
            "AmE": "/wɪˈðɪn/",
            "definition": "inside or not beyond a certain area or time",
            "examples": [
               "Please finish within an hour.",
               "The answer is within the book.",
               "We stayed within the city limits."
            ]
         },
         {
            "id": 89,
            "word": "wonder",
            "role": "verb",
            "BrE": "/ˈwʌn.dər/",
            "AmE": "/ˈwʌn.dɚ/",
            "definition": "to think about something with curiosity",
            "examples": [
               "I wonder what time it is.",
               "She wondered about the future.",
               "He wonders if it will rain."
            ]
         },
         {
            "id": 89,
            "word": "wool",
            "role": "noun",
            "BrE": "/wʊl/",
            "AmE": "/wʊl/",
            "definition": "soft material from sheep’s fur",
            "examples": [
               "The sweater is made of wool.",
               "She bought wool for knitting.",
               "Wool keeps you warm in winter."
            ]
         },
         {
            "id": 89,
            "word": "worldwide",
            "role": "adjective",
            "BrE": "/ˌwɜːldˈwaɪd/",
            "AmE": "/ˌwɜːrldˈwaɪd/",
            "definition": "existing or happening all over the world",
            "examples": [
               "The company has worldwide offices.",
               "The disease spread worldwide.",
               "Their music is known worldwide."
            ]
         },
         {
            "id": 89,
            "word": "worry",
            "role": "verb",
            "BrE": "/ˈwʌr.i/",
            "AmE": "/ˈwɝː.i/",
            "definition": "to feel nervous or concerned",
            "examples": [
               "I worry about the test.",
               "She worries when he is late.",
               "Don’t worry too much."
            ]
         },
         {
            "id": 89,
            "word": "worse",
            "role": "adjective",
            "BrE": "/wɜːs/",
            "AmE": "/wɝːs/",
            "definition": "more bad or unpleasant",
            "examples": [
               "The weather got worse.",
               "His cold is worse today.",
               "That is a worse problem."
            ]
         },
         {
            "id": 89,
            "word": "worst",
            "role": "adjective",
            "BrE": "/wɜːst/",
            "AmE": "/wɝːst/",
            "definition": "most bad or unpleasant",
            "examples": [
               "This is the worst day.",
               "He had the worst headache.",
               "That was the worst game ever."
            ]
         },
         {
            "id": 90,
            "word": "worth",
            "role": "adjective",
            "BrE": "/wɜːθ/",
            "AmE": "/wɝːθ/",
            "definition": "having value or importance",
            "examples": [
               "This book is worth reading.",
               "The trip was worth the cost.",
               "It’s worth trying again."
            ]
         },
         {
            "id": 90,
            "word": "written",
            "role": "adjective",
            "BrE": "/ˈrɪt.ən/",
            "AmE": "/ˈrɪt.ən/",
            "definition": "expressed in writing",
            "examples": [
               "She has a written note.",
               "The rules are written clearly.",
               "He read the written instructions."
            ]
         },
         {
            "id": 90,
            "word": "wrong",
            "role": "adjective",
            "BrE": "/rɒŋ/",
            "AmE": "/rɔːŋ/",
            "definition": "not correct or true",
            "examples": [
               "That answer is wrong.",
               "She chose the wrong way.",
               "It was wrong to lie."
            ]
         },
         {
            "id": 90,
            "word": "yard",
            "role": "noun",
            "BrE": "/jɑːd/",
            "AmE": "/jɑːrd/",
            "definition": "an area of land near a house",
            "examples": [
               "The children played in the yard.",
               "There are flowers in the yard.",
               "He mowed the yard yesterday."
            ]
         },
         {
            "id": 90,
            "word": "young",
            "role": "adjective",
            "BrE": "/jʌŋ/",
            "AmE": "/jʌŋ/",
            "definition": "not old",
            "examples": [
               "The baby is very young.",
               "She is young but smart.",
               "They have young children."
            ]
         },
         {
            "id": 90,
            "word": "youth",
            "role": "noun",
            "BrE": "/juːθ/",
            "AmE": "/juːθ/",
            "definition": "the time when someone is young",
            "examples": [
               "He spent his youth in the city.",
               "Many youth like to play sports.",
               "Youth is a time for learning."
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
      
      if(savedB1Vocabs.some(item => item.word == ws.word.word) && savedB1Vocabs.some(item => item.role == ws.word.role)){
         setSavedB1Vocabs(savedB1Vocabs.filter((item) => {
            return !(item.word === ws.word.word && item.role === ws.word.role)
         }))
      } else {
         setSavedB1Vocabs((prev) => [
            ...prev,
            foundWord[0]
         ])
      }
   }
   
   const specificLessonWords = data.wordList.filter((item) => {
      return item.id == slug
   })

   const wholeLessons = data.wordList[data.wordList.length - 1].id


   return (
      <div className={styles.container}>

         <div className={styles.lessonTitle}>Lesson {lessonNumber}</div>
         <div className={styles.lessonLevel}>B1</div>

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
            {(() => {
               const learningWords = [...partialWords, ...unknownWords];
               if (learningWords.length === 0) {
                  return <div className={styles.done}>
               <div className={styles.doneTitle}>All done. Brilliant :)</div>
               <div className={styles.btnHolder}>
                  <Link href='/b1' className={styles.back} onClick={saveProgress}>Done</Link>
                  {
                     lessonNumber < wholeLessons ?
                     <Link href={`/b1/${lessonNumber + 1}`} className={styles.back} onClick={saveProgress}>Next Lesson</Link>
                     :
                     <Link href='/b2' className={styles.back} onClick={saveProgress}>Start B2</Link>
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
                           (savedB1Vocabs.some(item => item.word == ws.word.word) && savedB1Vocabs.some(item => item.role == ws.word.role)) ? <FaBookmark className={styles.save}/> : <FaRegBookmark className={styles.save}/>  
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
                                 Review Again
                              </button>
                              {
                              lessonNumber < wholeLessons ?
                                 <Link href={`/b1/${lessonNumber + 1}`} className={styles.button} onClick={saveProgress}>Next Lesson</Link>
                                 :
                                 <Link href='/b2' className={styles.button} onClick={saveProgress}>Start B1</Link>  
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
                  <Link href={`/b1/${lessonNumber + 1}`} className={styles.button} onClick={saveProgress}>Next Lesson</Link>
                  :
                  <Link href='/b2' className={styles.button} onClick={saveProgress}>Start B2</Link>
               }

               <Link href='/b1'
                  className={styles.button}
                  onClick={saveProgress}
               >
                  Done
               </Link>
            </div>
         </div>
      )}
      </div>
   );
}













