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
   const [revisionWords, setRevisionWords] = ([...partialWords, ...unknownWords])
   const [done,setDone] = useState(false)

   useEffect(() => {
      localStorage.setItem('knownWords', JSON.stringify(knownWords));
      localStorage.setItem('partialWords', JSON.stringify(partialWords));
      localStorage.setItem('unknownWords', JSON.stringify(unknownWords));
   }, [knownWords, partialWords, unknownWords]);

   const handleAnswer = (status) => {
      const currentWord = specificLessonWords[currentWordIndex];
      if (status === 'known') {
         setKnownWords([...knownWords, { word: currentWord, status }]);
      } else if (status === 'partial') {
         setPartialWords([...partialWords, { word: currentWord, status }]);
      } else {
         setUnknownWords([...unknownWords, { word: currentWord, status }]);
      }

      if (currentWordIndex + 1 < specificLessonWords.length) {
         setCurrentWordIndex(currentWordIndex + 1);
      } else {
         (unknownWords == [] && partialWords == []) ? setDone(true) : setStage('learning');
      }
   };

   const handleNextLearningWord = () => {
      const learningWords = [...partialWords, ...unknownWords];
      if (learningWordIndex + 1 < learningWords.length) {
         setLearningWordIndex(learningWordIndex + 1);
      } else {
         setStage('revision');
      }
   };

   const handleBackLearningWord = () => {
      if (learningWordIndex - 1 >= 0) {
         setLearningWordIndex(learningWordIndex - 1);
      } else {
         null;
      }
   };

   // console.log('known:', knownWords);
   // console.log('unknown:', unknownWords);
   // console.log('partial:', partialWords);

   // Access the slug from the URL
   const { slug } = params;

   const data = {
      slug,
      wordList: [
         {
            "id": 1,
            "role": 'adj',
            "word": "big",
            "phonetics": "/bɪg/",
            "definition": "",
            "examples": [
               "The big dog runs fast.",
               "I have a big red ball.",
               "The house is very big."
            ]
         },
         {
            "id": 1,
            "role": 'adj',
            "word": "small",
            "phonetics": "/smɔːl/",
            "definition": "",
            "examples": [
               "The small cat is cute.",
               "I found a small rock.",
               "She has a small bag."
            ]
         },
         {
            "id": 1,
            "role": 'adj',
            "word": "large",
            "phonetics": "/lɑːrdʒ/",
            "definition": "",
            "examples": [
               "The large tree is green.",
               "He has a large book.",
               "The room is very large."
            ]
         },
         {
            "id": 1,
            "role": 'adj',
            "word": "little",
            "phonetics": "/ˈlɪtəl/",
            "definition": "",
            "examples": [
               "The little bird sings well.",
               "I want a little cake.",
               "She has a little doll."
            ]
         },
         {
            "id": 1,
            "role": 'adj',
            "word": "tall",
            "phonetics": "/tɔːl/",
            "definition": "",
            "examples": [
               "The tall man walks fast.",
               "The tree is very tall.",
               "She has a tall chair."
            ]
         },
         {
            "id": 1,
            "role": 'adj',
            "word": "short",
            "phonetics": "/ʃɔːrt/",
            "definition": "",
            "examples": [
               "The short boy runs fast.",
               "I have a short pencil.",
               "The story is very short."
            ]
         },
         {
            "id": 1,
            "role": 'adj',
            "word": "long",
            "phonetics": "/lɔːŋ/",
            "definition": "definition for long",
            "examples": [
               "The long road is quiet.",
               "She has a long dress.",
               "The book is very long."
            ]
         },
         {
            "id": 1,
            "role": 'adj',
            "word": "wide",
            "phonetics": "/waɪd/",
            "definition": "",
            "examples": [
               "The wide river is blue.",
               "He has a wide smile.",
               "The street is very wide."
            ]
         },
         {
            "id": 1,
            "role": 'adj',
            "word": "narrow",
            "phonetics": "/ˈnærəʊ/",
            "definition": "",
            "examples": [
               "The narrow path is safe.",
               "She walks on a narrow bridge.",
               "The door is very narrow."
            ]
         },
         {
            "id": 1,
            "role": 'adj',
            "word": "high",
            "phonetics": "/haɪ/",
            "definition": "",
            "examples": [
               "The high mountain is big.",
               "The kite flies very high.",
               "She jumps high."
            ]
         },
         {
            "id": 1,
            "role": 'adj',
            "word": "low",
            "phonetics": "/ləʊ/",
            "definition": "",
            "examples": [
               "The low wall is short.",
               "The plane flies very low.",
               "He has a low chair."
            ]
         },
         {
            "id": 1,
            "role": 'adj',
            "word": "full",
            "phonetics": "/fʊl/",
            "definition": "",
            "examples": [
               "The full cup has water.",
               "The bag is very full.",
               "Her plate is full."
            ]
         },
         {
            "id": 1,
            "role": 'adj',
            "word": "empty",
            "phonetics": "/ˈɛmpti/",
            "definition": "",
            "examples": [
               "The empty box is light.",
               "The room is very empty.",
               "She has an empty bottle."
            ]
         },
         {
            "id": 1,
            "role": 'adj',
            "word": "heavy",
            "phonetics": "/ˈhɛvi/",
            "definition": "",
            "examples": [
               "The heavy rock is big.",
               "He carries a heavy bag.",
               "The book is very heavy."
            ]
         },
         {
            "id": 1,
            "role": 'adj',
            "word": "light",
            "phonetics": "/laɪt/",
            "definition": "",
            "examples": [
               "The light feather is soft.",
               "She has a light bag.",
               "The box is very light."
            ]
         },
         {
            "id": 2,
            "role": 'adj',
            "word": "red",
            "phonetics": "/rɛd/",
            "definition": "",
            "examples": [
               "The red apple is sweet.",
               "She wears a red hat.",
               "The car is very red."
            ]
         },
         {
            "id": 2,
            "role": 'adj',
            "word": "blue",
            "phonetics": "/bluː/",
            "definition": "",
            "examples": [
               "The blue sky is clear.",
               "He has a blue shirt.",
               "The water is very blue."
            ]
         },
         {
            "id": 2,
            "role": 'adj',
            "word": "green",
            "phonetics": "/ɡriːn/",
            "definition": "",
            "examples": [
               "The green grass is soft.",
               "She has a green bag.",
               "The tree is very green."
            ]
         },
         {
            "id": 2,
            "role": 'adj',
            "word": "yellow",
            "phonetics": "/ˈjɛləʊ/",
            "definition": "",
            "examples": [
               "The yellow flower is pretty.",
               "He has a yellow ball.",
               "The sun is very yellow."
            ]
         },
         {
            "id": 2,
            "role": 'adj',
            "word": "black",
            "phonetics": "/blæk/",
            "definition": "",
            "examples": [
               "The black cat is soft.",
               "She has a black shoe.",
               "The sky is very black."
            ]
         },
         {
            "id": 2,
            "role": 'adj',
            "word": "white",
            "phonetics": "/waɪt/",
            "definition": "",
            "examples": [
               "The white snow is cold.",
               "He has a white shirt.",
               "The cloud is very white."
            ]
         },
         {
            "id": 2,
            "role": 'adj',
            "word": "brown",
            "phonetics": "/braʊn/",
            "definition": "",
            "examples": [
               "The brown dog is big.",
               "She has a brown bag.",
               "The tree is very brown."
            ]
         },
         {
            "id": 2,
            "role": 'adj',
            "word": "grey",
            "phonetics": "/ɡreɪ/",
            "definition": "",
            "examples": [
               "The grey rock is hard.",
               "He has a grey hat.",
               "The sky is very grey."
            ]
         },
         {
            "id": 2,
            "role": 'adj',
            "word": "orange",
            "phonetics": "/ˈɒrɪndʒ/",
            "definition": "",
            "examples": [
               "The orange fruit is sweet.",
               "She has an orange dress.",
               "The ball is very orange."
            ]
         },
         {
            "id": 2,
            "role": 'adj',
            "word": "purple",
            "phonetics": "/ˈpɜːrpəl/",
            "definition": "",
            "examples": [
               "The purple flower is nice.",
               "He has a purple shirt.",
               "The book is very purple."
            ]
         },
         {
            "id": 2,
            "role": 'adj',
            "word": "pink",
            "phonetics": "/pɪŋk/",
            "definition": "",
            "examples": [
               "The pink hat is pretty.",
               "She has a pink bag.",
               "The flower is very pink."
            ]
         },
         {
            "id": 3,
            "role": 'adj',
            "word": "good",
            "phonetics": "/ɡʊd/",
            "definition": "",
            "examples": [
               "The good dog is kind.",
               "She has a good book.",
               "The food is very good."
            ]
         },
         {
            "id": 3,
            "role": 'adj',
            "word": "bad",
            "phonetics": "/bæd/",
            "definition": "",
            "examples": [
               "The bad apple is old.",
               "He has a bad day.",
               "The smell is very bad."
            ]
         },
         {
            "id": 3,
            "role": 'adj',
            "word": "nice",
            "phonetics": "/naɪs/",
            "definition": "",
            "examples": [
               "The nice girl is kind.",
               "She has a nice dress.",
               "The day is very nice."
            ]
         },
         {
            "id": 3,
            "role": 'adj',
            "word": "beautiful",
            "phonetics": "/ˈbjuːtɪfəl/",
            "definition": "",
            "examples": [
               "The beautiful flower is red.",
               "She has a beautiful smile.",
               "The sky is very beautiful."
            ]
         },
         {
            "id": 3,
            "role": 'adj',
            "word": "ugly",
            "phonetics": "/ˈʌɡli/",
            "definition": "",
            "examples": [
               "The ugly rock is big.",
               "He has an ugly shirt.",
               "The house is very ugly."
            ]
         },
         {
            "id": 3,
            "role": 'adj',
            "word": "great",
            "phonetics": "/ɡreɪt/",
            "definition": "",
            "examples": [
               "The great day is sunny.",
               "She has a great book.",
               "The game is very great."
            ]
         },
         {
            "id": 3,
            "role": 'adj',
            "word": "terrible",
            "phonetics": "/ˈtɛrəbəl/",
            "definition": "",
            "examples": [
               "The terrible storm is loud.",
               "He has a terrible day.",
               "The smell is very terrible."
            ]
         },
         {
            "id": 3,
            "role": 'adj',
            "word": "wonderful",
            "phonetics": "/ˈwʌndərfəl/",
            "definition": "",
            "examples": [
               "The wonderful view is nice.",
               "She has a wonderful gift.",
               "The day is very wonderful."
            ]
         },
         {
            "id": 3,
            "role": 'adj',
            "word": "fantastic",
            "phonetics": "/fænˈtæstɪk/",
            "definition": "",
            "examples": [
               "The fantastic show is fun.",
               "He has a fantastic toy.",
               "The story is very fantastic."
            ]
         },
         {
            "id": 3,
            "role": 'adj',
            "word": "awful",
            "phonetics": "/ˈɔːfəl/",
            "definition": "",
            "examples": [
               "The awful smell is bad.",
               "She has an awful day.",
               "The weather is very awful."
            ]
         },
         {
            "id": 3,
            "role": 'adj',
            "word": "lovely",
            "phonetics": "/ˈlʌvli/",
            "definition": "",
            "examples": [
               "The lovely flower is pink.",
               "She has a lovely dress.",
               "The day is very lovely."
            ]
         },
         {
            "id": 3,
            "role": 'adj',
            "word": "perfect",
            "phonetics": "/ˈpɜːrfɪkt/",
            "definition": "",
            "examples": [
               "The perfect day is sunny.",
               "He has a perfect score.",
               "The cake is very perfect."
            ]
         },
         {
            "id": 3,
            "role": 'adj',
            "word": "horrible",
            "phonetics": "/ˈhɒrəbəl/",
            "definition": "",
            "examples": [
               "The horrible noise is loud.",
               "She has a horrible day.",
               "The smell is very horrible."
            ]
         },
         {
            "id": 3,
            "role": 'adj',
            "word": "excellent",
            "phonetics": "/ˈɛksələnt/",
            "definition": "",
            "examples": [
               "The excellent book is fun.",
               "He has an excellent idea.",
               "The food is very excellent."
            ]
         },
         {
            "id": 3,
            "role": 'adj',
            "word": "poor",
            "phonetics": "/pʊər/",
            "definition": "",
            "examples": [
               "The poor dog is sad.",
               "She has a poor old shoe.",
               "The house is very poor."
            ]
         },
         {
            "id": 4,
            "role": 'adj',
            "word": "happy",
            "phonetics": "/ˈhæpi/",
            "definition": "",
            "examples": [
               "The happy boy plays well.",
               "She has a happy smile.",
               "The day is very happy."
            ]
         },
         {
            "id": 4,
            "role": 'adj',
            "word": "sad",
            "phonetics": "/sæd/",
            "definition": "",
            "examples": [
               "The sad girl is quiet.",
               "He has a sad face.",
               "The story is very sad."
            ]
         },
         {
            "id": 4,
            "role": 'adj',
            "word": "angry",
            "phonetics": "/ˈæŋɡri/",
            "definition": "",
            "examples": [
               "The angry dog barks loud.",
               "She is angry with her friend.",
               "He feels very angry."
            ]
         },
         {
            "id": 4,
            "role": 'adj',
            "word": "tired",
            "phonetics": "/ˈtaɪərd/",
            "definition": "",
            "examples": [
               "The tired boy sleeps well.",
               "She feels very tired.",
               "He has a tired face."
            ]
         },
         {
            "id": 4,
            "role": 'adj',
            "word": "hungry",
            "phonetics": "/ˈhʌŋɡri/",
            "definition": "",
            "examples": [
               "The hungry cat eats fast.",
               "She feels very hungry.",
               "He has a hungry look."
            ]
         },
         {
            "id": 4,
            "role": 'adj',
            "word": "thirsty",
            "phonetics": "/ˈθɜːrsti/",
            "definition": "",
            "examples": [
               "The thirsty dog drinks water.",
               "She feels very thirsty.",
               "He has a thirsty face."
            ]
         },
         {
            "id": 4,
            "role": 'adj',
            "word": "hot",
            "phonetics": "/hɒt/",
            "definition": "",
            "examples": [
               "The hot sun shines bright.",
               "She has a hot drink.",
               "The day is very hot."
            ]
         },
         {
            "id": 4,
            "role": 'adj',
            "word": "cold",
            "phonetics": "/kəʊld/",
            "definition": "",
            "examples": [
               "The cold water is nice.",
               "He has a cold hand.",
               "The day is very cold."
            ]
         },
         {
            "id": 4,
            "role": 'adj',
            "word": "scared",
            "phonetics": "/skeərd/",
            "definition": "",
            "examples": [
               "The scared cat runs fast.",
               "She feels very scared.",
               "He has a scared look."
            ]
         },
         {
            "id": 4,
            "role": 'adj',
            "word": "excited",
            "phonetics": "/ɪkˈsaɪtɪd/",
            "definition": "",
            "examples": [
               "The excited boy jumps high.",
               "She feels very excited.",
               "He has an excited smile."
            ]
         },
         {
            "id": 4,
            "role": 'adj',
            "word": "bored",
            "phonetics": "/bɔːrd/",
            "definition": "",
            "examples": [
               "The bored girl sits quietly.",
               "He feels very bored.",
               "She has a bored face."
            ]
         },
         {
            "id": 4,
            "role": 'adj',
            "word": "nervous",
            "phonetics": "/ˈnɜːrvəs/",
            "definition": "",
            "examples": [
               "The nervous boy walks slowly.",
               "She feels very nervous.",
               "He has a nervous smile."
            ]
         },
         {
            "πτυ":4,
            "word": "calm",
            "phonetics": "/kɑːm/",
            "definition": "",
            "examples": [
               "The calm lake is quiet.",
               "She feels very calm.",
               "He has a calm voice."
            ]
         },
         {
            "id": 4,
            "role": 'adj',
            "word": "surprised",
            "phonetics": "/sərˈpraɪzd/",
            "definition": "",
            "examples": [
               "The surprised girl looks happy.",
               "He feels very surprised.",
               "She has a surprised face."
            ]
         },
         {
            "id": 5,
            "role": 'adj',
            "word": "young",
            "phonetics": "/jʌŋ/",
            "definition": "",
            "examples": [
               "The young boy runs fast.",
               "She has a young cat.",
               "The tree is very young."
            ]
         },
         {
            "id": 5,
            "role": 'adj',
            "word": "old",
            "phonetics": "/əʊld/",
            "definition": "",
            "examples": [
               "The old man walks slowly.",
               "She has an old book.",
               "The house is very old."
            ]
         },
         {
            "id": 5,
            "role": 'adj',
            "word": "pretty",
            "phonetics": "/ˈprɪti/",
            "definition": "",
            "examples": [
               "The pretty flower is red.",
               "She has a pretty dress.",
               "The day is very pretty."
            ]
         },
         {
            "id": 5,
            "role": 'adj',
            "word": "handsome",
            "phonetics": "/ˈhænsəm/",
            "definition": "",
            "examples": [
               "The handsome boy smiles big.",
               "He has a handsome face.",
               "The dog is very handsome."
            ]
         },
         {
            "id": 5,
            "role": 'adj',
            "word": "strong",
            "phonetics": "/strɒŋ/",
            "definition": "",
            "examples": [
               "The strong man lifts heavy.",
               "She has a strong dog.",
               "The tree is very strong."
            ]
         },
         {
            "id": 5,
            "role": 'adj',
            "word": "weak",
            "phonetics": "/wiːk/",
            "definition": "",
            "examples": [
               "The weak plant is small.",
               "He feels very weak.",
               "The chair is very weak."
            ]
         },
         {
            "id": 5,
            "role": 'adj',
            "word": "fat",
            "phonetics": "/fæt/",
            "definition": "",
            "examples": [
               "The fat cat sleeps well.",
               "She has a fat book.",
               "The dog is very fat."
            ]
         },
         {
            "id": 5,
            "role": 'adj',
            "word": "thin",
            "phonetics": "/θɪn/",
            "definition": "",
            "examples": [
               "The thin boy runs fast.",
               "She has a thin book.",
               "The tree is very thin."
            ]
         },
         {
            "id": 5,
            "role": 'adj',
            "word": "slim",
            "phonetics": "/slɪm/",
            "definition": "",
            "examples": [
               "The slim girl dances well.",
               "He has a slim phone.",
               "The book is very slim."
            ]
         },
         {
            "id": 5,
            "role": 'adj',
            "word": "healthy",
            "phonetics": "/ˈhɛlθi/",
            "definition": "",
            "examples": [
               "The healthy boy plays well.",
               "She eats healthy food.",
               "The dog is very healthy."
            ]
         },
         {
            "id": 5,
            "role": 'adj',
            "word": "sick",
            "phonetics": "/sɪk/",
            "definition": "",
            "examples": [
               "The sick cat sleeps much.",
               "He feels very sick.",
               "She has a sick dog."
            ]
         },
         {
            "id": 5,
            "role": 'adj',
            "word": "clean",
            "phonetics": "/kliːn/",
            "definition": "",
            "examples": [
               "The clean room is nice.",
               "She has a clean shirt.",
               "The house is very clean."
            ]
         },
         {
            "id": 5,
            "role": 'adj',
            "word": "dirty",
            "phonetics": "/ˈdɜːrti/",
            "definition": "",
            "examples": [
               "The dirty shoe is old.",
               "He has a dirty hand.",
               "The room is very dirty."
            ]
         },
         {
            "id": 6,
            "role": 'adj',
            "word": "fast",
            "phonetics": "/fæst/",
            "definition": "",
            "examples": [
               "The fast car moves quick.",
               "She runs very fast.",
               "The dog is very fast."
            ]
         },
         {
            "id": 6,
            "role": 'adj',
            "word": "slow",
            "phonetics": "/sləʊ/",
            "definition": "",
            "examples": [
               "The slow turtle walks quietly.",
               "He moves very slow.",
               "The car is very slow."
            ]
         },
         {
            "id": 6,
            "role": 'adj',
            "word": "quick",
            "phonetics": "/kwɪk/",
            "definition": "",
            "examples": [
               "The quick fox runs fast.",
               "She has a quick smile.",
               "The boy is very quick."
            ]
         },
         {
            "id": 6,
            "role": 'adj',
            "word": "early",
            "phonetics": "/ˈɜːrli/",
            "definition": "",
            "examples": [
               "The early bird flies high.",
               "She wakes up very early.",
               "He comes early."
            ]
         },
         {
            "id": 6,
            "role": 'adj',
            "word": "late",
            "phonetics": "/leɪt/",
            "definition": "",
            "examples": [
               "The late bus is slow.",
               "She arrives very late.",
               "He sleeps late."
            ]
         },
         {
            "id": 6,
            "role": 'adj',
            "word": "new",
            "phonetics": "/njuː/",
            "definition": "",
            "examples": [
               "The new book is fun.",
               "She has a new dress.",
               "The car is very new."
            ]
         },
         {
            "id": 7,
            "role": 'adj',
            "word": "easy",
            "phonetics": "/ˈiːzi/",
               "definition": "",
            "examples": [
               "The easy game is fun.",
               "She has an easy task.",
               "The book is very easy."
            ]
         },
         {
            "id": 7,
            "role": 'adj',
            "word": "difficult",
            "phonetics": "/ˈdɪfɪkəlt/",
            "definition": "",
            "examples": [
               "The difficult puzzle is hard.",
               "He has a difficult test.",
               "The game is very difficult."
            ]
         },
         {
            "id": 7,
            "role": 'adj',
            "word": "hard",
            "phonetics": "/hɑːrd/",
            "definition": "",
            "examples": [
               "The hard rock is heavy.",
               "She has a hard chair.",
               "The test is very hard."
            ]
         },
         {
            "id": 7,
            "role": 'adj',
            "word": "simple",
            "phonetics": "/ˈsɪmpəl/",
            "definition": "",
            "examples": [
               "The simple story is nice.",
               "She has a simple dress.",
               "The game is very simple."
            ]
         },
         {
            "id": 7,
            "role": 'adj',
            "word": "complex",
            "phonetics": "/ˈkɒmpleks/",
            "definition": "",
            "examples": [
               "The complex puzzle is hard.",
               "He has a complex book.",
               "The game is very complex."
            ]
         },
         {
            "id": 8,
            "role": 'adj',
            "word": "warm",
            "phonetics": "/wɔːrm/",
            "definition": "",
            "examples": [
               "The warm day is nice.",
               "She has a warm coat.",
               "The water is very warm."
            ]
         },
         {
            "id": 8,
            "role": 'adj',
            "word": "cool",
            "phonetics": "/kuːl/",
            "definition": "",
            "examples": [
               "The cool wind is nice.",
               "He has a cool drink.",
               "The day is very cool."
            ]
         },
         {
            "id": 8,
            "role": 'adj',
            "word": "sunny",
            "phonetics": "/ˈsʌni/",
            "definition": "",
            "examples": [
               "The sunny day is bright.",
               "She likes sunny weather.",
               "The park is very sunny."
            ]
         },
         {
            "id": 8,
            "role": 'adj',
            "word": "rainy",
            "phonetics": "/ˈreɪni/",
            "definition": "",
            "examples": [
               "The rainy day is wet.",
               "She has a rainy walk.",
               "The sky is very rainy."
            ]
         },
         {
            "id": 8,
            "role": 'adj',
            "word": "windy",
            "phonetics": "/ˈwɪndi/",
            "definition": "",
            "examples": [
               "The windy day is cool.",
               "He flies a windy kite.",
               "The tree is very windy."
            ]
         },
         {
            "id": 8,
            "role": 'adj',
            "word": "cloudy",
            "phonetics": "/ˈklaʊdi/",
            "definition": "",
            "examples": [
               "The cloudy sky is grey.",
               "She sees a cloudy day.",
               "The weather is very cloudy."
            ]
         },
         {
            "id": 8,
            "role": 'adj',
            "word": "snowy",
            "phonetics": "/ˈsnəʊi/",
            "definition": "",
            "examples": [
               "The snowy day is cold.",
               "She has a snowy walk.",
               "The hill is very snowy."
            ]
         },
         {
            "id": 8,
            "role": 'adj',
            "word": "foggy",
            "phonetics": "/ˈfɒɡi/",
            "definition": "",
            "examples": [
               "The foggy morning is grey.",
               "He sees a foggy road.",
               "The day is very foggy."
            ]
         },
         {
            "id": 9,
            "role": 'adj',
            "word": "sweet",
            "phonetics": "/swiːt/",
            "definition": "",
            "examples": [
               "The sweet apple is red.",
               "She has a sweet cake.",
               "The drink is very sweet."
            ]
         },
         {
            "id": 9,
            "role": 'adj',
            "word": "salty",
            "phonetics": "/ˈsɔːlti/",
            "definition": "",
            "examples": [
               "The salty soup is hot.",
               "He eats salty food.",
               "The snack is very salty."
            ]
         },
         {
            "id": 9,
            "role": 'adj',
            "word": "sour",
            "phonetics": "/saʊər/",
            "definition": "",
            "examples": [
               "The sour lemon is yellow.",
               "She tastes sour candy.",
               "The drink is very sour."
            ]
         },
         {
            "id": 9,
            "role": 'adj',
            "word": "bitter",
            "phonetics": "/ˈbɪtər/",
            "definition": "",
            "examples": [
               "The bitter tea is hot.",
               "He tastes bitter food.",
               "The drink is very bitter."
            ]
         },
         {
            "id": 9,
            "role": 'adj',
            "word": "delicious",
            "phonetics": "/dɪˈlɪʃəs/",
            "definition": "",
            "examples": [
               "The delicious cake is sweet.",
               "She eats delicious food.",
               "The meal is very delicious."
            ]
         },
         {
            "id": 9,
            "role": 'adj',
            "word": "tasty",
            "phonetics": "/ˈteɪsti/",
            "definition": "",
            "examples": [
               "The tasty apple is red.",
               "He eats tasty food.",
               "The soup is very tasty."
            ]
         },
         {
            "id": 9,
            "role": 'adj',
            "word": "fresh",
            "phonetics": "/freʃ/",
            "definition": "",
            "examples": [
               "The fresh fruit is sweet.",
               "She eats fresh bread.",
               "The water is very fresh."
            ]
         },
         {
            "id": 10,
            "role": 'adj',
            "word": "many",
            "phonetics": "/ˈmɛni/",
            "definition": "",
            "examples": [
               "Many birds fly high.",
               "She has many books.",
               "The stars are very many."
            ]
         },
         {
            "id": 10,
            "role": 'adj',
            "word": "few",
            "phonetics": "/fjuː/",
            "definition": "",
            "examples": [
               "Few apples are left.",
               "He has few toys.",
               "The trees are very few."
            ]
         },
         {
            "id": 10,
            "role": 'adj',
            "word": "much",
            "phonetics": "/mʌtʃ/",
            "definition": "",
            "examples": [
               "Much water is in the cup.",
               "She has much food.",
               "The rain is very much."
            ]
         },
         {
            "id": 10,
            "role": 'adj',
            "word": "little",
            "phonetics": "/ˈlɪtəl/",
            "definition": "",
            "examples": [
               "The little bird sings well.",
               "He has little water.",
               "The cake has little sugar."
            ]
         },
         {
            "id": 10,
            "role": 'adj',
            "word": "some",
            "phonetics": "/sʌm/",
            "definition": "",
            "examples": [
               "Some apples are red.",
               "She has some books.",
               "The bag has some toys."
            ]
         },
         {
            "id": 10,
            "role": 'adj',
            "word": "any",
            "phonetics": "/ˈɛni/",
            "definition": "",
            "examples": [
               "Any cat can run fast.",
               "She has any book.",
               "The box has any toy."
            ]
         },
         {
            "id": 11,
            "role": 'adj',
            "word": "important",
            "phonetics": "/ɪmˈpɔːrtnt/",
            "definition": "",
            "examples": [
               "The important book is big.",
               "She has an important task.",
               "The day is very important."
            ]
         },
         {
            "id": 11,
            "role": 'adj',
            "word": "different",
            "phonetics": "/ˈdɪfərənt/",
            "definition": "",
            "examples": [
               "The different colors are nice.",
               "She has a different bag.",
               "The toys are very different."
            ]
         },
         {
            "id": 11,
            "role": 'adj',
            "word": "same",
            "phonetics": "/seɪm/",
            "definition": "",
            "examples": [
               "The same book is fun.",
               "She has the same dress.",
               "The toys are very same."
            ]
         },
         {
            "id": 11,
            "role": 'adj',
            "word": "right",
            "phonetics": "/raɪt/",
            "definition": "",
            "examples": [
               "The right answer is good.",
               "She picks the right book.",
               "The path is very right."
            ]
         },
         {
            "id": 11,
            "role": 'adj',
            "word": "wrong",
            "phonetics": "/rɒŋ/",
            "definition": "",
            "examples": [
               "The wrong key is small.",
               "He picks the wrong book.",
               "The answer is very wrong."
            ]
         },
         {
            "id": 11,
            "role": 'adj',
            "word": "true",
            "phonetics": "/truː/",
            "definition": "",
            "examples": [
               "The true story is fun.",
               "She tells a true fact.",
               "The answer is very true."
            ]
         },
         {
            "id": 11,
            "role": 'adj',
            "word": "false",
            "phonetics": "/fɔːls/",
            "definition": "",
            "examples": [
               "The false story is bad.",
               "He gives a false answer.",
               "The fact is very false."
            ]
         },
         {
            "id": 11,
            "role": 'adj',
            "word": "safe",
            "phonetics": "/seɪf/",
            "definition": "",
            "examples": [
               "The safe place is nice.",
               "She feels very safe.",
               "The house is very safe."
            ]
         },
         {
            "id": 11,
            "role": 'adj',
            "word": "dangerous",
            "phonetics": "/ˈdeɪndʒərəs/",
            "definition": "",
            "examples": [
               "The dangerous road is long.",
               "He sees a dangerous dog.",
               "The place is very dangerous."
            ]
         },
         {
            "id": 11,
            "role": 'adj',
            "word": "quiet",
            "phonetics": "/ˈkwaɪət/",
            "definition": "",
            "examples": [
               "The quiet room is nice.",
               "She likes a quiet place.",
               "The night is very quiet."
            ]
         },
         {
            "id": 11,
            "role": 'adj',
            "word": "loud",
            "phonetics": "/laʊd/",
            "definition": "",
            "examples": [
               "The loud dog barks much.",
               "He hears a loud sound.",
               "The music is very loud."
            ]
         },
         {
            "id": 12,
            "role": 'adj',
            "word": "bright",
            "phonetics": "/braɪt/",
            "definition": "",
            "examples": [
               "The bright sun shines well.",
               "She has a bright smile.",
               "The room is very bright."
            ]
         },
         {
            "id": 12,
            "role": 'adj',
            "word": "dark",
            "phonetics": "/dɑːrk/",
            "definition": "",
            "examples": [
               "The dark night is quiet.",
               "He sees a dark room.",
               "The sky is very dark."
            ]
         },
         {
            "id": 12,
            "role": 'adj',
            "word": "wet",
            "phonetics": "/wɛt/",
            "definition": "",
            "examples": [
               "The wet grass is green.",
               "She has a wet shirt.",
               "The day is very wet."
            ]
         },
         {
            "id": 12,
            "role": 'adj',
            "word": "dry",
            "phonetics": "/draɪ/",
            "definition": "",
            "examples": [
               "The dry sand is hot.",
               "He has a dry towel.",
               "The day is very dry."
            ]
         },
         {
            "id": 12,
            "role": 'adj',
            "word": "soft",
            "phonetics": "/sɒft/",
            "definition": "",
            "examples": [
               "The soft blanket is warm.",
               "She has a soft pillow.",
               "The cat is very soft."
            ]
         },
         {
            "id": 12,
            "role": 'adj',
            "word": "tough",
            "phonetics": "/tʌf/",
            "definition": "",
            "examples": [
               "The tough rope is strong.",
               "He has a tough shoe.",
               "The meat is very tough."
            ]
         },
         {
            "id": 12,
            "role": 'adj',
            "word": "smooth",
            "phonetics": "/smuːð/",
            "definition": "",
            "examples": [
               "The smooth stone is nice.",
               "She has a smooth table.",
               "The road is very smooth."
            ]
         },
         {
            "id": 12,
            "role": 'adj',
            "word": "rough",
            "phonetics": "/rʌf/",
            "definition": "",
            "examples": [
               "The rough rock is hard.",
               "He has a rough hand.",
               "The path is very rough."
            ]
         },
         {
            "id": 12,
            "role": 'adj',
            "word": "open",
            "phonetics": "/ˈəʊpən/",
            "definition": "",
            "examples": [
               "The open door is wide.",
               "She sees an open box.",
               "The shop is very open."
            ]
         },
         {
            "id": 12,
            "role": 'adj',
            "word": "closed",
            "phonetics": "/kləʊzd/",
            "definition": "",
            "examples": [
               "The closed door is red.",
               "He sees a closed shop.",
               "The box is very closed."
            ]
         },
         {
            "id": 12,
            "role": 'adj',
            "word": "cheap",
            "phonetics": "/tʃiːp/",
            "definition": "",
            "examples": [
               "The cheap toy is fun.",
               "She buys a cheap book.",
               "The shirt is very cheap."
            ]
         },
         {
            "id": 12,
            "role": 'adj',
            "word": "expensive",
            "phonetics": "/ɪkˈspɛnsɪv/",
            "definition": "",
            "examples": [
               "The expensive car is fast.",
               "She has an expensive dress.",
               "The toy is very expensive."
            ]
         },
         {
            "id": 12,
            "role": 'adj',
            "word": "free",
            "phonetics": "/friː/",
            "definition": "",
            "examples": [
               "The free book is nice.",
               "She gets a free toy.",
               "The game is very free."
            ]
         },
         {
            "id": 12,
            "role": 'adj',
            "word": "busy",
            "phonetics": "/ˈbɪzi/",
            "definition": "",
            "examples": [
               "The busy day is long.",
               "She has a busy time.",
               "The shop is very busy."
            ]
         },
         {
            "id": 1,
            "role": "verb",
            "word": "be",
            "phonetics": "/biː/",
            "definition": "",
            "examples": [
            "I am a happy boy.",
            "She is in the park.",
            "They are very kind."
            ]
         },
         {
            "id": 1,
            "role": "verb",
            "word": "have",
            "phonetics": "/hæv/",
            "definition": "",
            "examples": [
            "I have a red ball.",
            "She has a big dog.",
            "He has a new book."
            ]
         },
         {
            "id": 1,
            "role": "verb",
            "word": "do",
            "phonetics": "/duː/",
            "definition": "",
            "examples": [
            "I do my work daily.",
            "She does a fun dance.",
            "He does his best."
            ]
         },
         {
            "id": 1,
            "role": "verb",
            "word": "go",
            "phonetics": "/ɡəʊ/",
            "definition": "",
            "examples": [
            "I go to the park.",
            "She goes to school daily.",
            "They go to the shop."
            ]
         },
         {
            "id": 1,
            "role": "verb",
            "word": "come",
            "phonetics": "/kʌm/",
            "definition": "",
            "examples": [
            "I come to the house.",
            "She comes with her friend.",
            "They come to play."
            ]
         },
         {
            "id": 1,
            "role": "verb",
            "word": "get",
            "phonetics": "/ɡɛt/",
            "definition": "",
            "examples": [
            "I get a new toy.",
            "She gets a big cake.",
            "He gets a red ball."
            ]
         },
         {
            "id": 1,
            "role": "verb",
            "word": "give",
            "phonetics": "/ɡɪv/",
            "definition": "",
            "examples": [
            "I give her a book.",
            "She gives me a gift.",
            "He gives the dog food."
            ]
         },
         {
            "id": 1,
            "role": "verb",
            "word": "take",
            "phonetics": "/teɪk/",
            "definition": "",
            "examples": [
            "I take the blue pen.",
            "She takes a big bag.",
            "He takes his small dog."
            ]
         },
         {
            "id": 1,
            "role": "verb",
            "word": "make",
            "phonetics": "/meɪk/",
            "definition": "",
            "examples": [
            "I make a fun game.",
            "She makes a tasty cake.",
            "He makes a tall tower."
            ]
         },
         {
            "id": 1,
            "role": "verb",
            "word": "put",
            "phonetics": "/pʊt/",
            "definition": "",
            "examples": [
            "I put the book here.",
            "She puts her toy away.",
            "He puts the cup down."
            ]
         },
         {
            "id": 2,
            "role": "verb",
            "word": "say",
            "phonetics": "/seɪ/",
            "definition": "",
            "examples": [
            "I say a kind word.",
            "She says a funny joke.",
            "He says he is happy."
            ]
         },
         {
            "id": 2,
            "role": "verb",
            "word": "tell",
            "phonetics": "/tɛl/",
            "definition": "",
            "examples": [
            "I tell a short story.",
            "She tells her friend news.",
            "He tells a fun tale."
            ]
         },
         {
            "id": 2,
            "role": "verb",
            "word": "ask",
            "phonetics": "/æsk/",
            "definition": "",
            "examples": [
            "I ask for a toy.",
            "She asks about the dog.",
            "He asks for a book."
            ]
         },
         {
            "id": 2,
            "role": "verb",
            "word": "answer",
            "phonetics": "/ˈænsər/",
            "definition": "",
            "examples": [
            "I answer the easy question.",
            "She answers with a smile.",
            "He answers the teacher fast."
            ]
         },
         {
            "id": 2,
            "role": "verb",
            "word": "call",
            "phonetics": "/kɔːl/",
            "definition": "",
            "examples": [
            "I call my small dog.",
            "She calls her best friend.",
            "He calls for help."
            ]
         },
         {
            "id": 2,
            "role": "verb",
            "word": "talk",
            "phonetics": "/tɔːk/",
            "definition": "",
            "examples": [
            "I talk to my friend.",
            "She talks about her cat.",
            "He talks in a loud voice."
            ]
         },
         {
            "id": 2,
            "role": "verb",
            "word": "speak",
            "phonetics": "/spiːk/",
            "definition": "",
            "examples": [
            "I speak to the class.",
            "She speaks in a clear voice.",
            "He speaks about his dog."
            ]
         },
         {
            "id": 2,
            "role": "verb",
            "word": "listen",
            "phonetics": "/ˈlɪsən/",
            "definition": "",
            "examples": [
            "I listen to the song.",
            "She listens to her teacher.",
            "He listens to the bird."
            ]
         },
         {
            "id": 2,
            "role": "verb",
            "word": "hear",
            "phonetics": "/hɪər/",
            "definition": "",
            "examples": [
            "I hear a loud sound.",
            "She hears the dog bark.",
            "He hears a soft song."
            ]
         },
         {
            "id": 2,
            "role": "verb",
            "word": "see",
            "phonetics": "/siː/",
            "definition": "",
            "examples": [
            "I see a big tree.",
            "She sees a red bird.",
            "He sees a bright star."
            ]
         },
         {
            "id": 3,
            "role": "verb",
            "word": "look",
            "phonetics": "/lʊk/",
            "definition": "",
            "examples": [
            "I look at the blue sky.",
            "She looks at her book.",
            "He looks at the small cat."
            ]
         },
         {
            "id": 3,
            "role": "verb",
            "word": "watch",
            "phonetics": "/wɒtʃ/",
            "definition": "",
            "examples": [
            "I watch the fun game.",
            "She watches the bright stars.",
            "He watches his little dog."
            ]
         },
         {
            "id": 3,
            "role": "verb",
            "word": "read",
            "phonetics": "/riːd/",
            "definition": "",
            "examples": [
            "I read a short book.",
            "She reads a fun story.",
            "He reads a new page."
            ]
         },
         {
            "id": 3,
            "role": "verb",
            "word": "write",
            "phonetics": "/raɪt/",
            "definition": "",
            "examples": [
            "I write a short note.",
            "She writes a kind letter.",
            "He writes his name."
            ]
         },
         {
            "id": 3,
            "role": "verb",
            "word": "draw",
            "phonetics": "/drɔː/",
            "definition": "",
            "examples": [
            "I draw a big house.",
            "She draws a red flower.",
            "He draws a tall tree."
            ]
         },
         {
            "id": 3,
            "role": "verb",
            "word": "sing",
            "phonetics": "/sɪŋ/",
            "definition": "",
            "examples": [
            "I sing a happy song.",
            "She sings with her friend.",
            "He sings in a loud voice."
            ]
         },
         {
            "id": 3,
            "role": "verb",
            "word": "dance",
            "phonetics": "/dæns/",
            "definition": "",
            "examples": [
            "I dance with my friend.",
            "She dances to the music.",
            "He dances in the park."
            ]
         },
         {
            "id": 3,
            "role": "verb",
            "word": "play",
            "phonetics": "/pleɪ/",
            "definition": "",
            "examples": [
            "I play with a red ball.",
            "She plays a fun game.",
            "He plays with his dog."
            ]
         },
         {
            "id": 3,
            "role": "verb",
            "word": "work",
            "phonetics": "/wɜːrk/",
            "definition": "",
            "examples": [
            "I work on a big project.",
            "She works in a small shop.",
            "He works with his friend."
            ]
         },
         {
            "id": 3,
            "role": "verb",
            "word": "study",
            "phonetics": "/ˈstʌdi/",
            "definition": "",
            "examples": [
            "I study a new book.",
            "She studies for her test.",
            "He studies in the room."
            ]
         },
         {
            "id": 4,
            "role": "verb",
            "word": "learn",
            "phonetics": "/lɜːrn/",
            "definition": "",
            "examples": [
            "I learn a new word.",
            "She learns to ride fast.",
            "He learns about the stars."
            ]
         },
         {
            "id": 4,
            "role": "verb",
            "word": "teach",
            "phonetics": "/tiːtʃ/",
            "definition": "",
            "examples": [
            "I teach my little brother.",
            "She teaches a fun class.",
            "He teaches his small dog."
            ]
         },
         {
            "id": 4,
            "role": "verb",
            "word": "think",
            "phonetics": "/θɪŋk/",
            "definition": "",
            "examples": [
            "I think about my dog.",
            "She thinks of a fun game.",
            "He thinks about the book."
            ]
         },
         {
            "id": 4,
            "role": "verb",
            "word": "know",
            "phonetics": "/nəʊ/",
            "definition": "",
            "examples": [
            "I know the right answer.",
            "She knows her friend well.",
            "He knows a fun story."
            ]
         },
         {
            "id": 4,
            "role": "verb",
            "word": "understand",
            "phonetics": "/ˌʌndərˈstænd/",
            "definition": "",
            "examples": [
            "I understand the easy rule.",
            "She understands the book well.",
            "He understands his teacher."
            ]
         },
         {
            "id": 4,
            "role": "verb",
            "word": "want",
            "phonetics": "/wɒnt/",
            "definition": "",
            "examples": [
            "I want a red apple.",
            "She wants a new toy.",
            "He wants to play now."
            ]
         },
         {
            "id": 4,
            "role": "verb",
            "word": "need",
            "phonetics": "/niːd/",
            "definition": "",
            "examples": [
            "I need a new pencil.",
            "She needs a big bag.",
            "He needs to eat food."
            ]
         },
         {
            "id": 4,
            "role": "verb",
            "word": "like",
            "phonetics": "/laɪk/",
            "definition": "",
            "examples": [
            "I like the blue sky.",
            "She likes her small cat.",
            "He likes to read books."
            ]
         },
         {
            "id": 4,
            "role": "verb",
            "word": "love",
            "phonetics": "/lʌv/",
            "definition": "",
            "examples": [
            "I love my little dog.",
            "She loves her red dress.",
            "He loves to play games."
            ]
         },
         {
            "id": 4,
            "role": "verb",
            "word": "hate",
            "phonetics": "/heɪt/",
            "definition": "",
            "examples": [
            "I hate the cold rain.",
            "She hates the loud noise.",
            "He hates to wait long."
            ]
         },
         {
            "id": 5,
            "role": "verb",
            "word": "live",
            "phonetics": "/lɪv/",
            "definition": "",
            "examples": [
            "I live in a big house.",
            "She lives near the park.",
            "He lives with his cat."
            ]
         },
         {
            "id": 5,
            "role": "verb",
            "word": "stay",
            "phonetics": "/steɪ/",
            "definition": "",
            "examples": [
            "I stay at home today.",
            "She stays with her friend.",
            "He stays in the room."
            ]
         },
         {
            "id": 5,
            "role": "verb",
            "word": "wait",
            "phonetics": "/weɪt/",
            "definition": "",
            "examples": [
            "I wait for the bus.",
            "She waits for her friend.",
            "He waits at the shop."
            ]
         },
         {
            "id": 5,
            "role": "verb",
            "word": "start",
            "phonetics": "/stɑːrt/",
            "definition": "",
            "examples": [
            "I start a new game.",
            "She starts to read now.",
            "He starts his fun work."
            ]
         },
         {
            "id": 5,
            "role": "verb",
            "word": "stop",
            "phonetics": "/stɒp/",
            "definition": "",
            "examples": [
            "I stop the loud music.",
            "She stops her fast run.",
            "He stops the big car."
            ]
         },
         {
            "id": 5,
            "role": "verb",
            "word": "finish",
            "phonetics": "/ˈfɪnɪʃ/",
            "definition": "",
            "examples": [
            "I finish my short book.",
            "She finishes her fun game.",
            "He finishes his work fast."
            ]
         },
         {
            "id": 5,
            "role": "verb",
            "word": "open",
            "phonetics": "/ˈəʊpən/",
            "definition": "",
            "examples": [
            "I open the big door.",
            "She opens her new book.",
            "He opens the small box."
            ]
         },
         {
            "id": 5,
            "role": "verb",
            "word": "close",
            "phonetics": "/kləʊz/",
            "definition": "",
            "examples": [
            "I close the red door.",
            "She closes her big bag.",
            "He closes the fun book."
            ]
         },
         {
            "id": 5,
            "role": "verb",
            "word": "use",
            "phonetics": "/juːz/",
            "definition": "",
            "examples": [
            "I use a blue pen.",
            "She uses her small phone.",
            "He uses a new tool."
            ]
         },
         {
            "id": 5,
            "role": "verb",
            "word": "help",
            "phonetics": "/hɛlp/",
            "definition": "",
            "examples": [
            "I help my little friend.",
            "She helps her kind teacher.",
            "He helps his small dog."
            ]
         },
         {
            "id": 6,
            "role": "verb",
            "word": "eat",
            "phonetics": "/iːt/",
            "definition": "",
            "examples": [
            "I eat a red apple.",
            "She eats a tasty cake.",
            "He eats his big lunch."
            ]
         },
         {
            "id": 6,
            "role": "verb",
            "word": "drink",
            "phonetics": "/drɪŋk/",
            "definition": "",
            "examples": [
            "I drink cold water.",
            "She drinks a sweet juice.",
            "He drinks from a cup."
            ]
         },
         {
            "id": 6,
            "role": "verb",
            "word": "cook",
            "phonetics": "/kʊk/",
            "definition": "",
            "examples": [
            "I cook a hot soup.",
            "She cooks a tasty meal.",
            "He cooks with his friend."
            ]
         },
         {
            "id": 6,
            "role": "verb",
            "word": "sleep",
            "phonetics": "/sliːp/",
            "definition": "",
            "examples": [
            "I sleep in a soft bed.",
            "She sleeps with her cat.",
            "He sleeps for long hours."
            ]
         },
         {
            "id": 6,
            "role": "verb",
            "word": "wake",
            "phonetics": "/weɪk/",
            "definition": "",
            "examples": [
            "I wake in the morning.",
            "She wakes her little dog.",
            "He wakes with a smile."
            ]
         },
         {
            "id": 6,
            "role": "verb",
            "word": "get up",
            "phonetics": "/ɡɛt ʌp/",
            "definition": "",
            "examples": [
            "I get up early today.",
            "She gets up with a yawn.",
            "He gets up to play."
            ]
         },
         {
            "id": 6,
            "role": "verb",
            "word": "wash",
            "phonetics": "/wɒʃ/",
            "definition": "",
            "examples": [
            "I wash my small hands.",
            "She washes her red shirt.",
            "He washes the big dish."
            ]
         },
         {
            "id": 6,
            "role": "verb",
            "word": "clean",
            "phonetics": "/kliːn/",
            "definition": "",
            "examples": [
            "I clean the big room.",
            "She cleans her small desk.",
            "He cleans his new toy."
            ]
         },
         {
            "id": 6,
            "role": "verb",
            "word": "brush",
            "phonetics": "/brʌʃ/",
            "definition": "",
            "examples": [
            "I brush my short hair.",
            "She brushes her white teeth.",
            "He brushes his soft dog."
            ]
         },
         {
            "id": 6,
            "role": "verb",
            "word": "dress",
            "phonetics": "/drɛs/",
            "definition": "",
            "examples": [
            "I dress in a blue shirt.",
            "She dresses in a red skirt.",
            "He dresses for the party."
            ]
         },
         {
            "id": 7,
            "role": "verb",
            "word": "sit",
            "phonetics": "/sɪt/",
            "definition": "",
            "examples": [
            "I sit on a soft chair.",
            "She sits with her friend.",
            "He sits by the big tree."
            ]
         },
         {
            "id": 7,
            "role": "verb",
            "word": "stand",
            "phonetics": "/stænd/",
            "definition": "",
            "examples": [
            "I stand by the tall tree.",
            "She stands in the room.",
            "He stands with his dog."
            ]
         },
         {
            "id": 7,
            "role": "verb",
            "word": "walk",
            "phonetics": "/wɔːk/",
            "definition": "",
            "examples": [
            "I walk to the green park.",
            "She walks with her cat.",
            "He walks on the long road."
            ]
         },
         {
            "id": 7,
            "role": "verb",
            "word": "run",
            "phonetics": "/rʌn/",
            "definition": "",
            "examples": [
            "I run in the big park.",
            "She runs with her friend.",
            "He runs very fast."
            ]
         },
         {
            "id": 7,
            "role": "verb",
            "word": "jump",
            "phonetics": "/dʒʌmp/",
            "definition": "",
            "examples": [
            "I jump on the soft grass.",
            "She jumps with her dog.",
            "He jumps very high."
            ]
         },
         {
            "id": 7,
            "role": "verb",
            "word": "arrive",
            "phonetics": "/əˈraɪv/",
            "definition": "",
            "examples": [
            "I arrive at the big house.",
            "She arrives with her bag.",
            "He arrives at the shop."
            ]
         },
         {
            "id": 7,
            "role": "verb",
            "word": "leave",
            "phonetics": "/liːv/",
            "definition": "",
            "examples": [
            "I leave the small room.",
            "She leaves her red book.",
            "He leaves for the park."
            ]
         },
         {
            "id": 7,
            "role": "verb",
            "word": "drive",
            "phonetics": "/draɪv/",
            "definition": "",
            "examples": [
            "I drive a fast car.",
            "She drives to the shop.",
            "He drives with his friend."
            ]
         },
         {
            "id": 7,
            "role": "verb",
            "word": "ride",
            "phonetics": "/raɪd/",
            "definition": "",
            "examples": [
            "I ride a red bike.",
            "She rides her big horse.",
            "He rides to the park."
            ]
         },
         {
            "id": 7,
            "role": "verb",
            "word": "fly",
            "phonetics": "/flaɪ/",
            "definition": "",
            "examples": [
            "I fly a small kite.",
            "She flies to a new city.",
            "He flies with a big plane."
            ]
         },
         {
            "id": 8,
            "role": "verb",
            "word": "travel",
            "phonetics": "/ˈtrævəl/",
            "definition": "",
            "examples": [
            "I travel to a fun place.",
            "She travels with her bag.",
            "He travels in a car."
            ]
         },
         {
            "id": 8,
            "role": "verb",
            "word": "visit",
            "phonetics": "/ˈvɪzɪt/",
            "definition": "",
            "examples": [
            "I visit my kind friend.",
            "She visits the big park.",
            "He visits his small house."
            ]
         },
         {
            "id": 8,
            "role": "verb",
            "word": "turn",
            "phonetics": "/tɜːrn/",
            "definition": "",
            "examples": [
            "I turn the big wheel.",
            "She turns to her friend.",
            "He turns the small key."
            ]
         },
         {
            "id": 8,
            "role": "verb",
            "word": "move",
            "phonetics": "/muːv/",
            "definition": "",
            "examples": [
            "I move the heavy box.",
            "She moves to a new house.",
            "He moves the small chair."
            ]
         },
         {
            "id": 8,
            "role": "verb",
            "word": "buy",
            "phonetics": "/baɪ/",
            "definition": "",
            "examples": [
            "I buy a red apple.",
            "She buys a new book.",
            "He buys a small toy."
            ]
         },
         {
            "id": 8,
            "role": "verb",
            "word": "sell",
            "phonetics": "/sɛl/",
            "definition": "",
            "examples": [
            "I sell my old book.",
            "She sells her big bag.",
            "He sells a red car."
            ]
         },
         {
            "id": 8,
            "role": "verb",
            "word": "pay",
            "phonetics": "/peɪ/",
            "definition": "",
            "examples": [
            "I pay for the sweet cake.",
            "She pays for her new toy.",
            "He pays at the shop."
            ]
         },
         {
            "id": 8,
            "role": "verb",
            "word": "cost",
            "phonetics": "/kɒst/",
            "definition": "",
            "examples": [
            "The book costs a little.",
            "Her dress costs a lot.",
            "The toy costs ten coins."
            ]
         },
         {
            "id": 8,
            "role": "verb",
            "word": "shop",
            "phonetics": "/ʃɒp/",
            "definition": "",
            "examples": [
            "I shop at the big store.",
            "She shops for a new dress.",
            "He shops with his friend."
            ]
         },
         {
            "id": 8,
            "role": "verb",
            "word": "meet",
            "phonetics": "/miːt/",
            "definition": "",
            "examples": [
            "I meet my kind friend.",
            "She meets her teacher today.",
            "He meets at the park."
            ]
         },
         {
            "id": 9,
            "role": "verb",
            "word": "invite",
            "phonetics": "/ɪnˈvaɪt/",
            "definition": "",
            "examples": [
            "I invite my best friend.",
            "She invites him to play.",
            "He invites her to the party."
            ]
         },
         {
            "id": 9,
            "role": "verb",
            "word": "thank",
            "phonetics": "/θæŋk/",
            "definition": "",
            "examples": [
            "I thank my nice teacher.",
            "She thanks her kind friend.",
            "He thanks for the gift."
            ]
         },
         {
            "id": 9,
            "role": "verb",
            "word": "smile",
            "phonetics": "/smaɪl/",
            "definition": "",
            "examples": [
            "I smile at my small dog.",
            "She smiles in the park.",
            "He smiles with his friend."
            ]
         },
         {
            "id": 9,
            "role": "verb",
            "word": "laugh",
            "phonetics": "/læf/",
            "definition": "",
            "examples": [
            "I laugh at the fun joke.",
            "She laughs with her friend.",
            "He laughs in the room."
            ]
         },
         {
            "id": 9,
            "role": "verb",
            "word": "cry",
            "phonetics": "/kraɪ/",
            "definition": "",
            "examples": [
            "I cry when I am sad.",
            "She cries in the room.",
            "He cries for his lost toy."
            ]
         },
         {
            "id": 9,
            "role": "verb",
            "word": "find",
            "phonetics": "/faɪnd/",
            "definition": "",
            "examples": [
            "I find a small key.",
            "She finds her red book.",
            "He finds a big ball."
            ]
         },
         {
            "id": 9,
            "role": "verb",
            "word": "lose",
            "phonetics": "/luːz/",
            "definition": "",
            "examples": [
            "I lose my blue pen.",
            "She loses her small toy.",
            "He loses his new book."
            ]
         },
         {
            "id": 9,
            "role": "verb",
            "word": "try",
            "phonetics": "/traɪ/",
            "definition": "",
            "examples": [
            "I try to run fast.",
            "She tries to draw well.",
            "He tries a new game."
            ]
         },
         {
            "id": 9,
            "role": "verb",
            "word": "choose",
            "phonetics": "/tʃuːz/",
            "definition": "",
            "examples": [
            "I choose a red apple.",
            "She chooses a big book.",
            "He chooses a fun toy."
            ]
         },
         {
            "id": 9,
            "role": "verb",
            "word": "show",
            "phonetics": "/ʃəʊ/",
            "definition": "",
            "examples": [
            "I show my new picture.",
            "She shows her small dog.",
            "He shows his fun toy."
            ]
         },
         {
            "id": 10,
            "role": "verb",
            "word": "bring",
            "phonetics": "/brɪŋ/",
            "definition": "",
            "examples": [
            "I bring a red ball.",
            "She brings her big book.",
            "He brings a small gift."
            ]
         },
         {
            "id": 10,
            "role": "verb",
            "word": "send",
            "phonetics": "/sɛnd/",
            "definition": "",
            "examples": [
            "I send a short letter.",
            "She sends a kind note.",
            "He sends a fun picture."
            ]
         },
         {
            "id": 10,
            "role": "verb",
            "word": "receive",
            "phonetics": "/rɪˈsiːv/",
            "definition": "",
            "examples": [
            "I receive a new toy.",
            "She receives a big gift.",
            "He receives a fun book."
            ]
         },
         {
            "id": 10,
            "role": "verb",
            "word": "forget",
            "phonetics": "/fərˈɡɛt/",
            "definition": "",
            "examples": [
            "I forget my small book.",
            "She forgets her red bag.",
            "He forgets his fun game."
            ]
         },
         {
            "id": 10,
            "role": "verb",
            "word": "remember",
            "phonetics": "/rɪˈmɛmbər/",
            "definition": "",
            "examples": [
            "I remember my kind friend.",
            "She remembers her big test.",
            "He remembers his fun day."
            ]
         },
         {
            "id": 10,
            "role": "verb",
            "word": "change",
            "phonetics": "/tʃeɪndʒ/",
            "definition": "",
            "examples": [
            "I change my blue shirt.",
            "She changes her small bag.",
            "He changes the fun game."
            ]
         },
         {
            "id": 10,
            "role": "verb",
            "word": "check",
            "phonetics": "/tʃɛk/",
            "definition": "",
            "examples": [
            "I check my new book.",
            "She checks her big bag.",
            "He checks the small box."
            ]
         },
         {
            "id": 10,
            "role": "verb",
            "word": "count",
            "phonetics": "/kaʊnt/",
            "definition": "",
            "examples": [
            "I count the red apples.",
            "She counts her small toys.",
            "He counts the big stars."
            ]
         },
         {
            "id": 10,
            "role": "verb",
            "word": "cut",
            "phonetics": "/kʌt/",
            "definition": "",
            "examples": [
            "I cut the big paper.",
            "She cuts her red apple.",
            "He cuts the small rope."
            ]
         },
         {
            "id": 10,
            "role": "verb",
            "word": "paint",
            "phonetics": "/peɪnt/",
            "definition": "",
            "examples": [
            "I paint a red house.",
            "She paints a big flower.",
            "He paints his small room."
            ]
         }
      ]
   }

   const specificLessonWords = data.wordList.filter((item) => {
      return item.id == slug
   })

   console.log('loaded words:', specificLessonWords);
   console.log('unknown words:', unknownWords);
   console.log('partial words:', partialWords);

   const title = slug == 1 ? 'Sizes' : slug == 2 ? 'Colors' : slug == 3 ? 'Quality' : slug == 4 ? 'Feelings' : slug == 5 ? 'Appereance' : slug == 6 ? 'Time' : slug == 7 ? 'Difficulty' : slug == 8 ? 'Weather' : slug == 9 ? 'Tastes' : slug == 10 ? 'Quantity' : ''

   return (
      <div className={styles.container}>
         <div className={styles.title}>{title}</div>
         {stage === 'assessment' && (
         <div className={styles.card}>
            <h1 className={styles.title}>{specificLessonWords[currentWordIndex].word} ({specificLessonWords[currentWordIndex].role})</h1>
            <p className={styles.prompt}>Do you know this word?</p>
            <div className={styles.buttonGroup}>
               <button
               className={`${styles.button} ${styles.buttonKnown}`}
               onClick={() => handleAnswer('known')}
               >
               I know it completely
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
         <div className={styles.card}>
            <h1 className={styles.title}>Learning Word</h1>
            {(() => {
               const learningWords = [...partialWords, ...unknownWords];
               if (learningWords.length === 0) {
               return <p>No words to learn.</p>;
               }
               const ws = learningWords[learningWordIndex];
               return (
               <div className={styles.wordBlock}>
                  <h3 className={styles.wordTitle}>{ws.word.word}</h3>
                  <p><strong>Pronunciation:</strong> {ws.word.phonetics}</p>
                  <p><strong>Definition:</strong> {ws.word.definition}</p>
                  <p><strong>Examples:</strong></p>
                  <ul className={styles.exampleList}>
                     {ws.word.examples.slice(0, ws.status === 'partial' ? 2 : 3).map((example, i) => (
                     <li key={i}>{example}</li>
                     ))}
                  </ul>
                  <button
                     className={`${styles.button} ${styles.buttonNext}`}
                     onClick={handleNextLearningWord}
                  >
                     Next
                  </button>
                  <button
                     className={`${styles.button} ${styles.buttonNext}`}
                     onClick={handleBackLearningWord}
                  >
                     Back
                  </button>
               </div>
               );
            })()}
         </div>
         )}
   
         {stage === 'revision' && (
         <div className={styles.card}>
            <h1 className={styles.title}>What you learnt in this lesson:</h1>
            {(() => {
               const revisionWords = [...partialWords, ...unknownWords];
               if (revisionWords.length === 0) {
               return <p>No words to revise.</p>;
               }
               return revisionWords.map((ws, index) => (
               <div key={index} className={styles.wordBlock}>
                  <h3 className={styles.wordTitle}>{ws.word.word}</h3>
                  <p><strong>Pronunciation:</strong> {ws.word.phonetics}</p>
                  <p><strong>Definition:</strong> {ws.word.definition}</p>
                  <p><strong>Examples:</strong></p>
                  <ul className={styles.exampleList}>
                     {ws.word.examples.map((example, i) => (
                     <li key={i}>{example}</li>
                     ))}
                  </ul>
               </div>
               ));
            })()}
         </div>
      )}

         {
            done &&
            <div className={styles.done}>
               <div className={styles.doneTitle}>Wow, Brilliant :)</div>
               <Link href='/a1' className={styles.back}></Link>
            </div>
         }
      </div>
   );
}













