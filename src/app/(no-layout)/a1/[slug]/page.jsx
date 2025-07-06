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
         const savedKnowns = JSON.parse(localStorage.getItem(`knownWords-${slug}-A1`) || '[]');
         const savedUnknowns = JSON.parse(localStorage.getItem(`unknownWords-${slug}-A1`) || '[]');
         const savedPartials = JSON.parse(localStorage.getItem(`partialWords-${slug}-A1`) || '[]');

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
         localStorage.setItem(`knownWords-${slug}-A1`, JSON.stringify(knownWords));
         localStorage.setItem(`partialWords-${slug}-A1`, JSON.stringify(partialWords));
         localStorage.setItem(`unknownWords-${slug}-A1`, JSON.stringify(unknownWords));
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
         "word": "about",
         "role": "preposition",
         "BrE": "/əˈbaʊt/",
         "AmE": "/əˈbaʊt/",
         "definition": "on the subject of something",
         "examples": [
            "This book is about animals.",
            "She is talking about her new school.",
            "The article discusses facts about climate change."
         ]
      },
      {
         "id": 1,
         "word": "above",
         "role": "preposition",
         "BrE": "/əˈbʌv/",
         "AmE": "/əˈbʌv/",
         "definition": "at a higher level or position than something",
         "examples": [
            "The bird is flying above the tree.",
            "The picture is above the sofa in the living room.",
            "The temperature rose above 30 degrees yesterday."
         ]
      },
      {
         "id": 1,
         "word": "across",
         "role": "preposition",
         "BrE": "/əˈkrɒs/",
         "AmE": "/əˈkrɔːs/",
         "definition": "from one side to the other side of something",
         "examples": [
            "We walk across the street.",
            "She swam across the river to reach the other side.",
            "The bridge stretches across the valley."
         ]
      },
      {
         "id": 1,
         "word": "action",
         "role": "noun",
         "BrE": "/ˈækʃn/",
         "AmE": "/ˈækʃn/",
         "definition": "something that you do",
         "examples": [
            "His action was very kind.",
            "The action of helping others makes her happy.",
            "Quick action by the team saved the project."
         ]
      },
      {
         "id": 1,
         "word": "activity",
         "role": "noun",
         "BrE": "/ækˈtɪvəti/",
         "AmE": "/ækˈtɪvəti/",
         "definition": "something that you do for interest or pleasure",
         "examples": [
            "Drawing is a fun activity.",
            "The school offers many activities like sports and music.",
            "Outdoor activities help us stay healthy and active."
         ]
      },
      {
         "id": 1,
         "word": "actor",
         "role": "noun",
         "BrE": "/ˈæktə(r)/",
         "AmE": "/ˈæktər/",
         "definition": "a person who performs in plays or films",
         "examples": [
            "He is an actor in a movie.",
            "The actor played a hero in the new film.",
            "Famous actors often attend big events."
         ]
      },
      {
         "id": 1,
         "word": "actress",
         "role": "noun",
         "BrE": "/ˈæktrəs/",
         "AmE": "/ˈæktrəs/",
         "definition": "a woman who performs in plays or films",
         "examples": [
            "She is a great actress.",
            "The actress won an award for her role.",
            "Young actresses dream of starring in big films."
         ]
      },
      {
         "id": 1,
         "word": "add",
         "role": "verb",
         "BrE": "/æd/",
         "AmE": "/æd/",
         "definition": "to put something together with something else",
         "examples": [
            "Add sugar to the tea.",
            "Can you add more water to the soup?",
            "She added her name to the list of participants."
         ]
      },
      {
         "id": 1,
         "word": "address",
         "role": "noun",
         "BrE": "/əˈdres/",
         "AmE": "/ˈædres/",
         "definition": "the details of where someone lives or works",
         "examples": [
            "My address is 123 Main Street.",
            "Write your address on the envelope, please.",
            "The company’s address is in the city centre."
         ]
      },
      {
         "id": 1,
         "word": "adult",
         "role": "noun",
         "BrE": "/ˈædʌlt/",
         "AmE": "/əˈdʌlt/",
         "definition": "a person who is fully grown",
         "examples": [
            "This movie is for adults.",
            "Adults must buy a ticket to enter the park.",
            "The course is designed for adult learners."
         ]
      },
      {
         "id": 2,
         "word": "advice",
         "role": "noun",
         "BrE": "/ədˈvaɪs/",
         "AmE": "/ədˈvaɪs/",
         "definition": "an opinion or suggestion about what someone should do",
         "examples": [
            "She gave me good advice.",
            "His advice about studying was very helpful.",
            "The teacher’s advice helped her choose a career."
         ]
      },
      {
         "id": 2,
         "word": "afraid",
         "role": "adjective",
         "BrE": "/əˈfreɪd/",
         "AmE": "/əˈfreɪd/",
         "definition": "feeling fear or worry",
         "examples": [
            "I am afraid of dogs.",
            "She’s afraid to walk alone at night.",
            "He was afraid of failing the important exam."
         ]
      },
      {
         "id": 2,
         "word": "after",
         "role": "preposition",
         "BrE": "/ˈɑːftə(r)/",
         "AmE": "/ˈæftər/",
         "definition": "later than something; following in time",
         "examples": [
            "We play after school.",
            "She arrived after the movie started.",
            "The party will start after the guests arrive."
         ]
      },
      {
         "id": 2,
         "word": "afternoon",
         "role": "noun",
         "BrE": "/ˌɑːftəˈnuːn/",
         "AmE": "/ˌæftərˈnuːn/",
         "definition": "the time of day from 12 o’clock until evening",
         "examples": [
            "I sleep in the afternoon.",
            "We meet every afternoon for tea.",
            "This afternoon, she finished her homework early."
         ]
      },
      {
         "id": 2,
         "word": "again",
         "role": "adverb",
         "BrE": "/əˈɡen/",
         "AmE": "/əˈɡen/",
         "definition": "one more time; another time",
         "examples": [
            "Say it again, please.",
            "He watched the movie again yesterday.",
            "She tried again to solve the difficult puzzle."
         ]
      },
      {
         "id": 2,
         "word": "age",
         "role": "noun",
         "BrE": "/eɪdʒ/",
         "AmE": "/eɪdʒ/",
         "definition": "how old someone or something is",
         "examples": [
            "My age is ten.",
            "Her age is the same as mine.",
            "At the age of 18, he started university."
         ]
      },
      {
         "id": 2,
         "word": "ago",
         "role": "adverb",
         "BrE": "/əˈɡəʊ/",
         "AmE": "/əˈɡoʊ/",
         "definition": "in the past; before now",
         "examples": [
            "I saw him two days ago.",
            "She moved here a year ago.",
            "Long ago, people lived without electricity."
         ]
      },
      {
         "id": 2,
         "word": "agree",
         "role": "verb",
         "BrE": "/əˈɡriː/",
         "AmE": "/əˈɡriː/",
         "definition": "to have the same opinion as someone",
         "examples": [
            "I agree with you.",
            "They agree on the new plan.",
            "We all agree that the project needs more time."
         ]
      },
      {
         "id": 2,
         "word": "air",
         "role": "noun",
         "BrE": "/eə(r)/",
         "AmE": "/er/",
         "definition": "the mixture of gases that we breathe",
         "examples": [
            "The air is clean today.",
            "Fresh air is good for your health.",
            "The mountain air was cool and refreshing."
         ]
      },
      {
         "id": 2,
         "word": "airport",
         "role": "noun",
         "BrE": "/ˈeəpɔːt/",
         "AmE": "/ˈerpɔːrt/",
         "definition": "a place where planes land and take off",
         "examples": [
            "The airport is big.",
            "We arrived at the airport early.",
            "The new airport handles thousands of passengers daily."
         ]
      },
      {
         "id": 3,
         "word": "all",
         "role": "determiner",
         "BrE": "/ɔːl/",
         "AmE": "/ɔːl/",
         "definition": "every one of a group",
         "examples": [
            "All my books are here.",
            "She ate all the cookies in the jar.",
            "All the students passed the final exam."
         ]
      },
      {
         "id": 3,
         "word": "also",
         "role": "adverb",
         "BrE": "/ˈɔːlsəʊ/",
         "AmE": "/ˈɔːlsoʊ/",
         "definition": "in addition; too",
         "examples": [
            "I like tea and also coffee.",
            "She sings and also plays the guitar.",
            "He is a teacher and also writes books."
         ]
      },
      {
         "id": 3,
         "word": "always",
         "role": "adverb",
         "BrE": "/ˈɔːlweɪz/",
         "AmE": "/ˈɔːlweɪz/",
         "definition": "at all times; every time",
         "examples": [
            "I always eat breakfast.",
            "She always arrives at school on time.",
            "He always checks his work before submitting it."
         ]
      },
      {
         "id": 3,
         "word": "amazing",
         "role": "adjective",
         "BrE": "/əˈmeɪzɪŋ/",
         "AmE": "/əˈmeɪzɪŋ/",
         "definition": "very surprising, wonderful, or impressive",
         "examples": [
            "The view is amazing.",
            "Her performance was truly amazing.",
            "The museum’s collection of art is amazing."
         ]
      },
      {
         "id": 3,
         "word": "and",
         "role": "conjunction",
         "BrE": "/ənd/",
         "AmE": "/ənd/",
         "definition": "used to connect words or parts of sentences",
         "examples": [
            "I like tea and cake.",
            "She bought a pen and a notebook.",
            "He plays football and studies every day."
         ]
      },
      {
         "id": 3,
         "word": "angry",
         "role": "adjective",
         "BrE": "/ˈæŋɡri/",
         "AmE": "/ˈæŋɡri/",
         "definition": "feeling or showing strong emotion because of something bad",
         "examples": [
            "He is angry with me.",
            "She was angry because he was late.",
            "The teacher was angry about the noisy class."
         ]
      },
      {
         "id": 3,
         "word": "animal",
         "role": "noun",
         "BrE": "/ˈænɪml/",
         "AmE": "/ˈænɪml/",
         "definition": "a living creature such as a dog, cat, or cow",
         "examples": [
            "I have a pet animal.",
            "The zoo has many animals like lions.",
            "Protecting wild animals is important for nature."
         ]
      },
      {
         "id": 3,
         "word": "another",
         "role": "determiner",
         "BrE": "/əˈnʌðə(r)/",
         "AmE": "/əˈnʌðər/",
         "definition": "one more; an additional one",
         "examples": [
            "I want another apple.",
            "She needs another chair for the guest.",
            "He wrote another story for the competition."
         ]
      },
      {
         "id": 3,
         "word": "answer",
         "role": "noun",
         "BrE": "/ˈɑːnsə(r)/",
         "AmE": "/ˈænsər/",
         "definition": "something you say or write in reply to a question",
         "examples": [
            "Her answer was yes.",
            "The answer to the question was easy.",
            "His answer explained the problem clearly."
         ]
      },
      {
         "id": 3,
         "word": "any",
         "role": "determiner",
         "BrE": "/ˈeni/",
         "AmE": "/ˈeni/",
         "definition": "some, no matter which",
         "examples": [
            "Do you have any pens?",
            "Is there any milk in the fridge?",
            "She didn’t find any books she liked."
         ]
      },
      {
         "id": 4,
         "word": "anyone",
         "role": "pronoun",
         "BrE": "/ˈeniwʌn/",
         "AmE": "/ˈeniwʌn/",
         "definition": "any person; it does not matter who",
         "examples": [
            "Can anyone help me?",
            "Does anyone know the answer?",
            "Anyone can join the club if interested."
         ]
      },
      {
         "id": 4,
         "word": "anything",
         "role": "pronoun",
         "BrE": "/ˈeniθɪŋ/",
         "AmE": "/ˈeniθɪŋ/",
         "definition": "any thing, no matter what",
         "examples": [
            "I don’t want anything.",
            "Is there anything to eat in the kitchen?",
            "She can do anything she sets her mind to."
         ]
      },
      {
         "id": 4,
         "word": "apartment",
         "role": "noun",
         "BrE": "/əˈpɑːtmənt/",
         "AmE": "/əˈpɑːrtmənt/",
         "definition": "a set of rooms for living in, usually on one floor",
         "examples": [
            "I live in an apartment.",
            "Her apartment is near the park.",
            "The new apartment has a big kitchen."
         ]
      },
      {
         "id": 4,
         "word": "apple",
         "role": "noun",
         "BrE": "/ˈæpl/",
         "AmE": "/ˈæpl/",
         "definition": "a round fruit with a red or green skin",
         "examples": [
            "I eat an apple.",
            "She bought some apples from the market.",
            "An apple a day keeps the doctor away."
         ]
      },
      {
         "id": 4,
         "word": "April",
         "role": "noun",
         "BrE": "/ˈeɪprəl/",
         "AmE": "/ˈeɪprəl/",
         "definition": "the fourth month of the year",
         "examples": [
            "My birthday is in April.",
            "We have a holiday in April.",
            "April is usually warm and sunny here."
         ]
      },
      {
         "id": 4,
         "word": "area",
         "role": "noun",
         "BrE": "/ˈeəriə/",
         "AmE": "/ˈeriə/",
         "definition": "a part of a place or region",
         "examples": [
            "This is a quiet area.",
            "The park is in a nice area.",
            "The shopping area is busy on weekends."
         ]
      },
      {
         "id": 4,
         "word": "arm",
         "role": "noun",
         "BrE": "/ɑːm/",
         "AmE": "/ɑːrm/",
         "definition": "the part of the body between the shoulder and the hand",
         "examples": [
            "My arm hurts.",
            "She waved her arm to say hello.",
            "He broke his arm while playing football."
         ]
      },
      {
         "id": 4,
         "word": "around",
         "role": "preposition",
         "BrE": "/əˈraʊnd/",
         "AmE": "/əˈraʊnd/",
         "definition": "on every side of something",
         "examples": [
            "Trees are around the house.",
            "We walked around the park.",
            "The fence goes around the entire garden."
         ]
      },
      {
         "id": 4,
         "word": "arrive",
         "role": "verb",
         "BrE": "/əˈraɪv/",
         "AmE": "/əˈraɪv/",
         "definition": "to get to a place",
         "examples": [
            "The bus arrives soon.",
            "She arrived at school early today.",
            "They will arrive in London tomorrow morning."
         ]
      },
      {
         "id": 4,
         "word": "art",
         "role": "noun",
         "BrE": "/ɑːt/",
         "AmE": "/ɑːrt/",
         "definition": "the activity of creating paintings, drawings, or sculptures",
         "examples": [
            "I like art class.",
            "Her art is very beautiful.",
            "The museum shows modern art."
         ]
      },
      {
         "id": 5,
         "word": "article",
         "role": "noun",
         "BrE": "/ˈɑːtɪkl/",
         "AmE": "/ˈɑːrtɪkl/",
         "definition": "a piece of writing in a newspaper or magazine",
         "examples": [
            "I read an article.",
            "The article was about animals.",
            "She wrote an article for the school magazine."
         ]
      },
      {
         "id": 5,
         "word": "artist",
         "role": "noun",
         "BrE": "/ˈɑːtɪst/",
         "AmE": "/ˈɑːrtɪst/",
         "definition": "a person who creates paintings, drawings, or sculptures",
         "examples": [
            "He is a famous artist.",
            "The artist painted a big picture.",
            "Young artists displayed their work at the gallery."
         ]
      },
      {
         "id": 5,
         "word": "as",
         "role": "preposition",
         "BrE": "/əz/",
         "AmE": "/əz/",
         "definition": "used to describe the purpose or job of someone or something",
         "examples": [
            "She works as a teacher.",
            "He works as a driver for a company.",
            "She dressed as a princess for the party."
         ]
      },
      {
         "id": 5,
         "word": "ask",
         "role": "verb",
         "BrE": "/ɑːsk/",
         "AmE": "/æsk/",
         "definition": "to say or write something to get an answer",
         "examples": [
            "I ask a question.",
            "She asked him about the homework.",
            "He asked for directions to the museum."
         ]
      },
      {
         "id": 5,
         "word": "at",
         "role": "preposition",
         "BrE": "/ət/",
         "AmE": "/ət/",
         "definition": "used to show the place or time of something",
         "examples": [
            "I am at home.",
            "Meet me at the park at 5 o’clock.",
            "She works at a big office in the city."
         ]
      },
      {
         "id": 5,
         "word": "August",
         "role": "noun",
         "BrE": "/ˈɔːɡəst/",
         "AmE": "/ˈɔːɡəst/",
         "definition": "the eighth month of the year",
         "examples": [
            "We go on holiday in August.",
            "August is a warm month here.",
            "School starts again in late August."
         ]
      },
      {
         "id": 5,
         "word": "aunt",
         "role": "noun",
         "BrE": "/ɑːnt/",
         "AmE": "/ænt/",
         "definition": "the sister of your mother or father",
         "examples": [
            "My aunt is nice.",
            "Her aunt lives in a big city.",
            "My aunt gave me a book for my birthday."
         ]
      },
      {
         "id": 5,
         "word": "autumn",
         "role": "noun",
         "BrE": "/ˈɔːtəm/",
         "AmE": "/ˈɔːtəm/",
         "definition": "the season of the year between summer and winter",
         "examples": [
            "Leaves fall in autumn.",
            "Autumn is cool and colorful.",
            "We go hiking every autumn in the forest."
         ]
      },
      {
         "id": 5,
         "word": "away",
         "role": "adverb",
         "BrE": "/əˈweɪ/",
         "AmE": "/əˈweɪ/",
         "definition": "to or at a distance from something or someone",
         "examples": [
            "The cat ran away.",
            "She is away on holiday this week.",
            "The hotel is two miles away from the beach."
         ]
      },
      {
         "id": 5,
         "word": "baby",
         "role": "noun",
         "BrE": "/ˈbeɪbi/",
         "AmE": "/ˈbeɪbi/",
         "definition": "a very young child",
         "examples": [
            "The baby is sleeping.",
            "Her baby is six months old.",
            "The baby smiled at everyone in the room."
         ]
      },
      {
         "id": 6,
         "word": "back",
         "role": "noun",
         "BrE": "/bæk/",
         "AmE": "/bæk/",
         "definition": "the part of the body from the neck to the bottom",
         "examples": [
            "My back hurts.",
            "He carried a bag on his back.",
            "She has a tattoo on her lower back."
         ]
      },
      {
         "id": 6,
         "word": "bad",
         "role": "adjective",
         "BrE": "/bæd/",
         "AmE": "/bæd/",
         "definition": "not good or pleasant",
         "examples": [
            "The weather is bad.",
            "This food tastes bad to me.",
            "His bad behavior upset the teacher."
         ]
      },
      {
         "id": 6,
         "word": "bag",
         "role": "noun",
         "BrE": "/bæɡ/",
         "AmE": "/bæɡ/",
         "definition": "a container made of paper or plastic for carrying things",
         "examples": [
            "I have a new bag.",
            "She put her books in the bag.",
            "The shopping bag was full of groceries."
         ]
      },
      {
         "id": 6,
         "word": "ball",
         "role": "noun",
         "BrE": "/bɔːl/",
         "AmE": "/bɔːl/",
         "definition": "a round object used in games and sports",
         "examples": [
            "Kick the ball to me.",
            "We played with a red ball.",
            "The soccer ball rolled across the field."
         ]
      },
      {
         "id": 6,
         "word": "banana",
         "role": "noun",
         "BrE": "/bəˈnɑːnə/",
         "AmE": "/bəˈnænə/",
         "definition": "a long, curved fruit with a yellow skin",
         "examples": [
            "I ate a banana.",
            "Bananas are my favorite fruit.",
            "She packed a banana for her lunch."
         ]
      },
      {
         "id": 6,
         "word": "band",
         "role": "noun",
         "BrE": "/bænd/",
         "AmE": "/bænd/",
         "definition": "a group of people who play music together",
         "examples": [
            "The band plays music.",
            "Her band performed at the school.",
            "The rock band is famous in our city."
         ]
      },
      {
         "id": 6,
         "word": "bank",
         "role": "noun",
         "BrE": "/bæŋk/",
         "AmE": "/bæŋk/",
         "definition": "a place where you keep money",
         "examples": [
            "I go to the bank.",
            "She saves money in the bank.",
            "The bank is open until 5 p.m. daily."
         ]
      },
      {
         "id": 6,
         "word": "bath",
         "role": "noun",
         "BrE": "/bɑːθ/",
         "AmE": "/bæθ/",
         "definition": "a large container you fill with water to wash your body",
         "examples": [
            "I take a bath.",
            "The bath is full of warm water.",
            "She enjoys a long bath every evening."
         ]
      },
      {
         "id": 6,
         "word": "bathroom",
         "role": "noun",
         "BrE": "/ˈbɑːθruːm/",
         "AmE": "/ˈbæθruːm/",
         "definition": "a room with a toilet and usually a bath or shower",
         "examples": [
            "The bathroom is clean.",
            "Our bathroom has a big mirror.",
            "She keeps her towels in the bathroom."
         ]
      },
      {
         "id": 6,
         "word": "be",
         "role": "verb",
         "BrE": "/biː/",
         "AmE": "/biː/",
         "definition": "to exist or to have a particular quality or state",
         "examples": [
            "I am happy.",
            "They are at the park now.",
            "She will be a doctor in the future."
         ]
      },
      {
         "id": 7,
         "word": "beach",
         "role": "noun",
         "BrE": "/biːtʃ/",
         "AmE": "/biːtʃ/",
         "definition": "an area of sand or stones beside the sea",
         "examples": [
            "We go to the beach.",
            "The beach is sunny today.",
            "Children play games on the beach."
         ]
      },
      {
         "id": 7,
         "word": "beautiful",
         "role": "adjective",
         "BrE": "/ˈbjuːtɪfl/",
         "AmE": "/ˈbjuːtɪfl/",
         "definition": "very attractive or pleasing",
         "examples": [
            "The flower is beautiful.",
            "She has a beautiful smile.",
            "The sunset over the lake is beautiful."
         ]
      },
      {
         "id": 7,
         "word": "because",
         "role": "conjunction",
         "BrE": "/bɪˈkɒz/",
         "AmE": "/bɪˈkɔːz/",
         "definition": "for the reason that",
         "examples": [
            "I’m late because of traffic.",
            "She cried because she was sad.",
            "He stayed home because it was raining."
         ]
      },
      {
         "id": 7,
         "word": "become",
         "role": "verb",
         "BrE": "/bɪˈkʌm/",
         "AmE": "/bɪˈkʌm/",
         "definition": "to start to be something",
         "examples": [
            "I want to become a teacher.",
            "She became tired after the game.",
            "He became a famous singer last year."
         ]
      },
      {
         "id": 7,
         "word": "bed",
         "role": "noun",
         "BrE": "/bed/",
         "AmE": "/bed/",
         "definition": "a piece of furniture for sleeping on",
         "examples": [
            "I sleep in my bed.",
            "The bed is soft and comfortable.",
            "She made her bed before breakfast."
         ]
      },
      {
         "id": 7,
         "word": "bedroom",
         "role": "noun",
         "BrE": "/ˈbedruːm/",
         "AmE": "/ˈbedruːm/",
         "definition": "a room for sleeping in",
         "examples": [
            "My bedroom is big.",
            "Her bedroom has a blue wall.",
            "The bedroom is quiet at night."
         ]
      },
      {
         "id": 7,
         "word": "beer",
         "role": "noun",
         "BrE": "/bɪə(r)/",
         "AmE": "/bɪr/",
         "definition": "an alcoholic drink made from grain",
         "examples": [
            "He drinks a beer.",
            "They shared a cold beer.",
            "The bar serves many types of beer."
         ]
      },
      {
         "id": 7,
         "word": "before",
         "role": "preposition",
         "BrE": "/bɪˈfɔː(r)/",
         "AmE": "/bɪˈfɔːr/",
         "definition": "earlier than something or someone",
         "examples": [
            "Come before 6 p.m.",
            "I eat breakfast before school.",
            "She finished her work before the meeting."
         ]
      },
      {
         "id": 7,
         "word": "begin",
         "role": "verb",
         "BrE": "/bɪˈɡɪn/",
         "AmE": "/bɪˈɡɪn/",
         "definition": "to start something",
         "examples": [
            "Let’s begin the game.",
            "The movie begins at 7 p.m.",
            "She began learning English last year."
         ]
      },
      {
         "id": 7,
         "word": "beginning",
         "role": "noun",
         "BrE": "/bɪˈɡɪnɪŋ/",
         "AmE": "/bɪˈɡɪnɪŋ/",
         "definition": "the start of something",
         "examples": [
            "The beginning is easy.",
            "The book’s beginning is exciting.",
            "At the beginning of the year, we set goals."
         ]
      },
      {
         "id": 8,
         "word": "behind",
         "role": "preposition",
         "BrE": "/bɪˈhaɪnd/",
         "AmE": "/bɪˈhaɪnd/",
         "definition": "at the back of something",
         "examples": [
            "The cat is behind the chair.",
            "She hid behind the door.",
            "The garden is behind the house."
         ]
      },
      {
         "id": 8,
         "word": "believe",
         "role": "verb",
         "BrE": "/bɪˈliːv/",
         "AmE": "/bɪˈliːv/",
         "definition": "to think that something is true",
         "examples": [
            "I believe you.",
            "She believes in ghosts.",
            "He believes the story is true."
         ]
      },
      {
         "id": 8,
         "word": "below",
         "role": "preposition",
         "BrE": "/bɪˈləʊ/",
         "AmE": "/bɪˈloʊ/",
         "definition": "at a lower level than something",
         "examples": [
            "The fish swim below the water.",
            "The temperature is below zero.",
            "Her name is below mine on the list."
         ]
      },
      {
         "id": 8,
         "word": "best",
         "role": "adjective",
         "BrE": "/best/",
         "AmE": "/best/",
         "definition": "the most excellent or suitable",
         "examples": [
            "This is my best book.",
            "She is my best friend.",
            "He did his best to win the race."
         ]
      },
      {
         "id": 8,
         "word": "better",
         "role": "adjective",
         "BrE": "/ˈbetə(r)/",
         "AmE": "/ˈbetər/",
         "definition": "more excellent or suitable than another",
         "examples": [
            "This cake is better.",
            "Her grades are better this year.",
            "I feel better after resting."
         ]
      },
      {
         "id": 8,
         "word": "between",
         "role": "preposition",
         "BrE": "/bɪˈtwiːn/",
         "AmE": "/bɪˈtwiːn/",
         "definition": "in the space or time separating two things",
         "examples": [
            "The cat is between the chairs.",
            "We meet between 2 and 3 p.m.",
            "The shop is between the bank and the cafe."
         ]
      },
      {
         "id": 8,
         "word": "bicycle",
         "role": "noun",
         "BrE": "/ˈbaɪsɪkl/",
         "AmE": "/ˈbaɪsɪkl/",
         "definition": "a vehicle with two wheels that you ride",
         "examples": [
            "I ride a bicycle.",
            "Her bicycle is red and fast.",
            "He rides his bicycle to school every day."
         ]
      },
      {
         "id": 8,
         "word": "big",
         "role": "adjective",
         "BrE": "/bɪɡ/",
         "AmE": "/bɪɡ/",
         "definition": "large in size or amount",
         "examples": [
            "The dog is big.",
            "We live in a big house.",
            "The city has a big park for children."
         ]
      },
      {
         "id": 8,
         "word": "bike",
         "role": "noun",
         "BrE": "/baɪk/",
         "AmE": "/baɪk/",
         "definition": "a bicycle or motorcycle",
         "examples": [
            "I have a new bike.",
            "She rides her bike to the shop.",
            "His bike broke down on the way home."
         ]
      },
      {
         "id": 8,
         "word": "bill",
         "role": "noun",
         "BrE": "/bɪl/",
         "AmE": "/bɪl/",
         "definition": "a document showing how much money you owe",
         "examples": [
            "I paid the bill.",
            "The restaurant bill was high.",
            "She checked the bill before paying."
         ]
      },
      {
         "id": 9,
         "word": "bird",
         "role": "noun",
         "BrE": "/bɜːd/",
         "AmE": "/bɜːrd/",
         "definition": "an animal with wings and feathers that can usually fly",
         "examples": [
            "The bird is in the tree.",
            "A small bird flew into the garden.",
            "Colorful birds live in the forest."
         ]
      },
      {
         "id": 9,
         "word": "birthday",
         "role": "noun",
         "BrE": "/ˈbɜːθdeɪ/",
         "AmE": "/ˈbɜːrθdeɪ/",
         "definition": "the day in each year when you were born",
         "examples": [
            "My birthday is tomorrow.",
            "Her birthday party was fun.",
            "He got a new bike for his birthday."
         ]
      },
      {
         "id": 9,
         "word": "black",
         "role": "adjective",
         "BrE": "/blæk/",
         "AmE": "/blæk/",
         "definition": "having the darkest color, like the night",
         "examples": [
            "I have a black cat.",
            "She wore a black dress.",
            "The sky was black during the storm."
         ]
      },
      {
         "id": 9,
         "word": "blog",
         "role": "noun",
         "BrE": "/blɒɡ/",
         "AmE": "/blɑːɡ/",
         "definition": "a website where someone writes regularly about their ideas",
         "examples": [
            "I read her blog.",
            "His blog is about travel.",
            "She writes a blog about healthy food."
         ]
      },
      {
         "id": 9,
         "word": "blonde",
         "role": "adjective",
         "BrE": "/blɒnd/",
         "AmE": "/blɑːnd/",
         "definition": "having light yellow hair",
         "examples": [
            "Her hair is blonde.",
            "The blonde girl is my friend.",
            "She dyed her hair blonde last week."
         ]
      },
      {
         "id": 9,
         "word": "blue",
         "role": "adjective",
         "BrE": "/bluː/",
         "AmE": "/bluː/",
         "definition": "having the color of the sky or sea",
         "examples": [
            "The sky is blue.",
            "I have a blue shirt.",
            "Her blue eyes shine in the sunlight."
         ]
      },
      {
         "id": 9,
         "word": "boat",
         "role": "noun",
         "BrE": "/bəʊt/",
         "AmE": "/boʊt/",
         "definition": "a vehicle that travels on water",
         "examples": [
            "We saw a boat.",
            "The boat is on the lake.",
            "They sailed a small boat to the island."
         ]
      },
      {
         "id": 9,
         "word": "body",
         "role": "noun",
         "BrE": "/ˈbɒdi/",
         "AmE": "/ˈbɑːdi/",
         "definition": "all the physical parts of a person",
         "examples": [
            "Exercise is good for the body.",
            "Her body is strong from swimming.",
            "The doctor checked his body carefully."
         ]
      },
      {
         "id": 9,
         "word": "book",
         "role": "noun",
         "BrE": "/bʊk/",
         "AmE": "/bʊk/",
         "definition": "a set of pages with writing or pictures, usually bound together",
         "examples": [
            "I read a book.",
            "This book is about history.",
            "She borrowed a book from the library."
         ]
      },
      {
         "id": 9,
         "word": "boot",
         "role": "noun",
         "BrE": "/buːt/",
         "AmE": "/buːt/",
         "definition": "a type of shoe that covers the ankle and sometimes the leg",
         "examples": [
            "I wear boots.",
            "Her boots are black and shiny.",
            "He bought new boots for hiking."
         ]
      },
      {
         "id": 10,
         "word": "bored",
         "role": "adjective",
         "BrE": "/bɔːd/",
         "AmE": "/bɔːrd/",
         "definition": "feeling tired and unhappy because something is not interesting",
         "examples": [
            "I am bored at home.",
            "She was bored during the long movie.",
            "He feels bored without his friends around."
         ]
      },
      {
         "id": 10,
         "word": "boring",
         "role": "adjective",
         "BrE": "/ˈbɔːrɪŋ/",
         "AmE": "/ˈbɔːrɪŋ/",
         "definition": "not interesting or exciting",
         "examples": [
            "The book is boring.",
            "This lesson was very boring.",
            "The boring movie made her fall asleep."
         ]
      },
      {
         "id": 10,
         "word": "born",
         "role": "verb",
         "BrE": "/bɔːn/",
         "AmE": "/bɔːrn/",
         "definition": "to come into the world by birth",
         "examples": [
            "I was born in 2010.",
            "She was born in a small village.",
            "He was born on a cold winter day."
         ]
      },
      {
         "id": 10,
         "word": "both",
         "role": "determiner",
         "BrE": "/bəʊθ/",
         "AmE": "/boʊθ/",
         "definition": "used to talk about two people or things together",
         "examples": [
            "Both cats are cute.",
            "Both girls like to sing.",
            "Both teams played well in the match."
         ]
      },
      {
         "id": 10,
         "word": "bottle",
         "role": "noun",
         "BrE": "/ˈbɒtl/",
         "AmE": "/ˈbɑːtl/",
         "definition": "a container for liquids, usually made of glass or plastic",
         "examples": [
            "I drink from a bottle.",
            "The bottle of water is empty.",
            "She bought a bottle of juice."
         ]
      },
      {
         "id": 10,
         "word": "box",
         "role": "noun",
         "BrE": "/bɒks/",
         "AmE": "/bɑːks/",
         "definition": "a container with a flat base and sides, usually square",
         "examples": [
            "Put it in the box.",
            "The box is full of toys.",
            "She opened the box to find a gift."
         ]
      },
      {
         "id": 10,
         "word": "boy",
         "role": "noun",
         "BrE": "/bɔɪ/",
         "AmE": "/bɔɪ/",
         "definition": "a male child",
         "examples": [
            "The boy is playing.",
            "That boy is my brother.",
            "The boy helped his friend with homework."
         ]
      },
      {
         "id": 10,
         "word": "boyfriend",
         "role": "noun",
         "BrE": "/ˈbɔɪfrend/",
         "AmE": "/ˈbɔɪfrend/",
         "definition": "a man or boy that someone is having a romantic relationship with",
         "examples": [
            "Her boyfriend is kind.",
            "My boyfriend likes football.",
            "She went to the cinema with her boyfriend."
         ]
      },
      {
         "id": 10,
         "word": "bread",
         "role": "noun",
         "BrE": "/bred/",
         "AmE": "/bred/",
         "definition": "a food made from flour and water, baked in an oven",
         "examples": [
            "I eat bread.",
            "She bought fresh bread today.",
            "He made a sandwich with white bread."
         ]
      },
      {
         "id": 10,
         "word": "break",
         "role": "verb",
         "BrE": "/breɪk/",
         "AmE": "/breɪk/",
         "definition": "to make something into pieces by hitting or dropping it",
         "examples": [
            "Don’t break the glass.",
            "She broke her pencil in class.",
            "The plate broke when it fell on the floor."
         ]
      },
      {
         "id": 11,
         "word": "breakfast",
         "role": "noun",
         "BrE": "/ˈbrekfəst/",
         "AmE": "/ˈbrekfəst/",
         "definition": "the meal you eat in the morning",
         "examples": [
            "I eat breakfast at 7.",
            "Her breakfast is eggs and toast.",
            "A healthy breakfast gives energy for the day."
         ]
      },
      {
         "id": 11,
         "word": "bring",
         "role": "verb",
         "BrE": "/brɪŋ/",
         "AmE": "/brɪŋ/",
         "definition": "to carry or take something to a place",
         "examples": [
            "Bring your book.",
            "She brought her lunch to school.",
            "He brought his camera to the party."
         ]
      },
      {
         "id": 11,
         "word": "brother",
         "role": "noun",
         "BrE": "/ˈbrʌðə(r)/",
         "AmE": "/ˈbrʌðər/",
         "definition": "a male sibling",
         "examples": [
            "My brother is tall.",
            "Her brother plays football.",
            "His older brother studies at university."
         ]
      },
      {
         "id": 11,
         "word": "brown",
         "role": "adjective",
         "BrE": "/braʊn/",
         "AmE": "/braʊn/",
         "definition": "having the color of earth or wood",
         "examples": [
            "I have a brown dog.",
            "She wore a brown jacket.",
            "The brown leaves fell from the tree."
         ]
      },
      {
         "id": 11,
         "word": "build",
         "role": "verb",
         "BrE": "/bɪld/",
         "AmE": "/bɪld/",
         "definition": "to make something by putting parts together",
         "examples": [
            "They build a house.",
            "He built a small table.",
            "The company plans to build a new office."
         ]
      },
      {
         "id": 11,
         "word": "building",
         "role": "noun",
         "BrE": "/ˈbɪldɪŋ/",
         "AmE": "/ˈbɪldɪŋ/",
         "definition": "a structure such as a house or school",
         "examples": [
            "The building is tall.",
            "Our school is a big building.",
            "The old building is now a museum."
         ]
      },
      {
         "id": 11,
         "word": "bus",
         "role": "noun",
         "BrE": "/bʌs/",
         "AmE": "/bʌs/",
         "definition": "a large vehicle that carries passengers",
         "examples": [
            "I take the bus.",
            "The bus stops near my house.",
            "She missed the bus to school today."
         ]
      },
      {
         "id": 11,
         "word": "business",
         "role": "noun",
         "BrE": "/ˈbɪznəs/",
         "AmE": "/ˈbɪznəs/",
         "definition": "the activity of making, buying, or selling goods or services",
         "examples": [
            "He has a business.",
            "Her business sells clothes.",
            "The new business opened in the city."
         ]
      },
      {
         "id": 11,
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
         "id": 11,
         "word": "but",
         "role": "conjunction",
         "BrE": "/bət/",
         "AmE": "/bət/",
         "definition": "used to introduce something different from what was said before",
         "examples": [
            "I like tea but not coffee.",
            "She wanted to go but was tired.",
            "He studied hard but didn’t pass."
         ]
      },
      {
         "id": 12,
         "word": "butter",
         "role": "noun",
         "BrE": "/ˈbʌtə(r)/",
         "AmE": "/ˈbʌtər/",
         "definition": "a soft yellow food made from milk",
         "examples": [
            "I put butter on bread.",
            "She bought butter from the shop.",
            "The recipe needs butter and sugar."
         ]
      },
      {
         "id": 12,
         "word": "buy",
         "role": "verb",
         "BrE": "/baɪ/",
         "AmE": "/baɪ/",
         "definition": "to get something by paying money for it",
         "examples": [
            "I buy a book.",
            "She bought a new dress.",
            "He buys food at the supermarket."
         ]
      },
      {
         "id": 12,
         "word": "by",
         "role": "preposition",
         "BrE": "/baɪ/",
         "AmE": "/baɪ/",
         "definition": "near or beside something",
         "examples": [
            "The book is by the table.",
            "She sits by the window.",
            "The park is by the river."
         ]
      },
      {
         "id": 12,
         "word": "bye",
         "role": "exclamation",
         "BrE": "/baɪ/",
         "AmE": "/baɪ/",
         "definition": "a way to say goodbye",
         "examples": [
            "Bye, see you later!",
            "She said bye and left.",
            "He waved and shouted bye to his friends."
         ]
      },
      {
         "id": 12,
         "word": "cafe",
         "role": "noun",
         "BrE": "/ˈkæfeɪ/",
         "AmE": "/kæˈfeɪ/",
         "definition": "a place where you can buy and eat food or drinks",
         "examples": [
            "Let’s go to the cafe.",
            "The cafe serves good coffee.",
            "We met at a small cafe in town."
         ]
      },
      {
         "id": 12,
         "word": "cake",
         "role": "noun",
         "BrE": "/keɪk/",
         "AmE": "/keɪk/",
         "definition": "a sweet food made from flour, eggs, and sugar",
         "examples": [
            "I like chocolate cake.",
            "She baked a cake for the party.",
            "The cake was decorated with flowers."
         ]
      },
      {
         "id": 12,
         "word": "call",
         "role": "verb",
         "BrE": "/kɔːl/",
         "AmE": "/kɔːl/",
         "definition": "to telephone someone",
         "examples": [
            "I call my friend.",
            "She called her mum yesterday.",
            "He calls his boss every morning."
         ]
      },
      {
         "id": 12,
         "word": "camera",
         "role": "noun",
         "BrE": "/ˈkæmərə/",
         "AmE": "/ˈkæmərə/",
         "definition": "a device for taking photographs",
         "examples": [
            "I have a new camera.",
            "She took a photo with her camera.",
            "The camera captured the beautiful sunset."
         ]
      },
      {
         "id": 12,
         "word": "can",
         "role": "modal verb",
         "BrE": "/kən/",
         "AmE": "/kən/",
         "definition": "to be able to do something",
         "examples": [
            "I can swim.",
            "She can speak English well.",
            "Can you help me with this task?"
         ]
      },
      {
         "id": 12,
         "word": "cannot",
         "role": "modal verb",
         "BrE": "/ˈkænɒt/",
         "AmE": "/ˈkænɑːt/",
         "definition": "the negative form of can",
         "examples": [
            "I cannot run fast.",
            "She cannot come to the party.",
            "He cannot finish the work today."
         ]
      },
      {
         "id": 13,
         "word": "capital",
         "role": "noun",
         "BrE": "/ˈkæpɪtl/",
         "AmE": "/ˈkæpɪtl/",
         "definition": "the most important city in a country",
         "examples": [
            "Paris is a capital.",
            "The capital of France is Paris.",
            "We visited the capital during our trip."
         ]
      },
      {
         "id": 13,
         "word": "car",
         "role": "noun",
         "BrE": "/kɑː(r)/",
         "AmE": "/kɑːr/",
         "definition": "a vehicle with four wheels for traveling",
         "examples": [
            "I have a red car.",
            "He drives his car to work.",
            "The car stopped at the traffic light."
         ]
      },
      {
         "id": 13,
         "word": "card",
         "role": "noun",
         "BrE": "/kɑːd/",
         "AmE": "/kɑːrd/",
         "definition": "a piece of paper or plastic used for payment or identification",
         "examples": [
            "I use a credit card.",
            "She sent a birthday card.",
            "His library card is new."
         ]
      },
      {
         "id": 13,
         "word": "career",
         "role": "noun",
         "BrE": "/kəˈrɪə(r)/",
         "AmE": "/kəˈrɪr/",
         "definition": "a job or profession that you do for a long time",
         "examples": [
            "Her career is teaching.",
            "He wants a career in music.",
            "She built a successful career in business."
         ]
      },
      {
         "id": 13,
         "word": "carrot",
         "role": "noun",
         "BrE": "/ˈkærət/",
         "AmE": "/ˈkærət/",
         "definition": "a long, orange vegetable",
         "examples": [
            "I eat a carrot.",
            "Carrots are good for your eyes.",
            "She added carrots to the soup."
         ]
      },
      {
         "id": 13,
         "word": "carry",
         "role": "verb",
         "BrE": "/ˈkæri/",
         "AmE": "/ˈkæri/",
         "definition": "to hold and take something from one place to another",
         "examples": [
            "I carry a bag.",
            "She carries her books to school.",
            "He carried the heavy box upstairs."
         ]
      },
      {
         "id": 13,
         "word": "cat",
         "role": "noun",
         "BrE": "/kæt/",
         "AmE": "/kæt/",
         "definition": "a small animal with fur, often kept as a pet",
         "examples": [
            "My cat is black.",
            "The cat sleeps on the sofa.",
            "Her cat loves playing with a ball."
         ]
      },
      {
         "id": 13,
         "word": "CD",
         "role": "noun",
         "BrE": "/ˌsiː ˈdiː/",
         "AmE": "/ˌsiː ˈdiː/",
         "definition": "a small, round disc for storing music or data",
         "examples": [
            "I bought a CD.",
            "The CD has my favorite songs.",
            "She plays a CD in the car."
         ]
      },
      {
         "id": 13,
         "word": "cent",
         "role": "noun",
         "BrE": "/sent/",
         "AmE": "/sent/",
         "definition": "a unit of money; 100 cents make a dollar",
         "examples": [
            "This costs 50 cents.",
            "I found a cent on the floor.",
            "The candy is only ten cents."
         ]
      },
      {
         "id": 13,
         "word": "centre",
         "role": "noun",
         "BrE": "/ˈsentə(r)/",
         "AmE": "/ˈsentər/",
         "definition": "the middle part of something",
         "examples": [
            "The park is in the centre.",
            "The city centre is busy.",
            "The shopping centre has many stores."
         ]
      },
      {
         "id": 14,
         "word": "century",
         "role": "noun",
         "BrE": "/ˈsentʃəri/",
         "AmE": "/ˈsentʃəri/",
         "definition": "a period of 100 years",
         "examples": [
            "This is the 21st century.",
            "The castle is from the 12th century.",
            "Many changes happened in the last century."
         ]
      },
      {
         "id": 14,
         "word": "chair",
         "role": "noun",
         "BrE": "/tʃeə(r)/",
         "AmE": "/tʃer/",
         "definition": "a piece of furniture for one person to sit on",
         "examples": [
            "Sit on the chair.",
            "The chair is by the table.",
            "She bought a new chair for her room."
         ]
      },
      {
         "id": 14,
         "word": "change",
         "role": "verb",
         "BrE": "/tʃeɪndʒ/",
         "AmE": "/tʃeɪndʒ/",
         "definition": "to make or become different",
         "examples": [
            "I change my clothes.",
            "She changed her hairstyle.",
            "The weather changed suddenly today."
         ]
      },
      {
         "id": 14,
         "word": "chart",
         "role": "noun",
         "BrE": "/tʃɑːt/",
         "AmE": "/tʃɑːrt/",
         "definition": "a picture or table showing information",
         "examples": [
            "Look at the chart.",
            "The chart shows the weather.",
            "This chart explains the class schedule."
         ]
      },
      {
         "id": 14,
         "word": "cheap",
         "role": "adjective",
         "BrE": "/tʃiːp/",
         "AmE": "/tʃiːp/",
         "definition": "not expensive; costing little money",
         "examples": [
            "This book is cheap.",
            "The shop sells cheap clothes.",
            "She found a cheap ticket to Paris."
         ]
      },
      {
         "id": 14,
         "word": "check",
         "role": "verb",
         "BrE": "/tʃek/",
         "AmE": "/tʃek/",
         "definition": "to look at something to make sure it is correct",
         "examples": [
            "Check your bag.",
            "I checked my homework twice.",
            "He checked the time on his watch."
         ]
      },
      {
         "id": 14,
         "word": "cheese",
         "role": "noun",
         "BrE": "/tʃiːz/",
         "AmE": "/tʃiːz/",
         "definition": "a food made from milk",
         "examples": [
            "I like cheese.",
            "She put cheese on her sandwich.",
            "The shop sells many types of cheese."
         ]
      },
      {
         "id": 14,
         "word": "chicken",
         "role": "noun",
         "BrE": "/ˈtʃɪkɪn/",
         "AmE": "/ˈtʃɪkɪn/",
         "definition": "a bird or its meat used as food",
         "examples": [
            "We ate chicken.",
            "The chicken was delicious.",
            "She cooked chicken for dinner."
         ]
      },
      {
         "id": 14,
         "word": "child",
         "role": "noun",
         "BrE": "/tʃaɪld/",
         "AmE": "/tʃaɪld/",
         "definition": "a young person who is not yet an adult",
         "examples": [
            "The child is playing.",
            "Her child is five years old.",
            "Every child needs a good education."
         ]
      },
      {
         "id": 14,
         "word": "chocolate",
         "role": "noun",
         "BrE": "/ˈtʃɒklət/",
         "AmE": "/ˈtʃɑːklət/",
         "definition": "a sweet brown food made from cocoa",
         "examples": [
            "I love chocolate.",
            "She bought a chocolate bar.",
            "The cake is filled with chocolate."
         ]
      },
      {
         "id": 15,
         "word": "choose",
         "role": "verb",
         "BrE": "/tʃuːz/",
         "AmE": "/tʃuːz/",
         "definition": "to decide which thing you want",
         "examples": [
            "I choose this book.",
            "She chose a red dress.",
            "He chose to study science at school."
         ]
      },
      {
         "id": 15,
         "word": "cinema",
         "role": "noun",
         "BrE": "/ˈsɪnəmə/",
         "AmE": "/ˈsɪnəmə/",
         "definition": "a place where you watch films",
         "examples": [
            "We go to the cinema.",
            "The cinema is big and new.",
            "They watched a funny movie at the cinema."
         ]
      },
      {
         "id": 15,
         "word": "city",
         "role": "noun",
         "BrE": "/ˈsɪti/",
         "AmE": "/ˈsɪti/",
         "definition": "a large town",
         "examples": [
            "I live in a city.",
            "The city has many shops.",
            "She loves the busy life of the city."
         ]
      },
      {
         "id": 15,
         "word": "class",
         "role": "noun",
         "BrE": "/klɑːs/",
         "AmE": "/klæs/",
         "definition": "a group of students who learn together",
         "examples": [
            "My class is fun.",
            "The class studies English.",
            "Her class has 20 students."
         ]
      },
      {
         "id": 15,
         "word": "classroom",
         "role": "noun",
         "BrE": "/ˈklɑːsruːm/",
         "AmE": "/ˈklæsruːm/",
         "definition": "a room where students learn",
         "examples": [
            "The classroom is big.",
            "Our classroom has new desks.",
            "The teacher writes on the classroom board."
         ]
      },
      {
         "id": 15,
         "word": "clean",
         "role": "verb",
         "BrE": "/kliːn/",
         "AmE": "/kliːn/",
         "definition": "to make something free from dirt",
         "examples": [
            "I clean my room.",
            "She cleaned the kitchen today.",
            "He cleans his car every weekend."
         ]
      },
      {
         "id": 15,
         "word": "climb",
         "role": "verb",
         "BrE": "/klaɪm/",
         "AmE": "/klaɪm/",
         "definition": "to go up something, often using hands and feet",
         "examples": [
            "I climb the tree.",
            "They climbed the hill.",
            "She loves to climb mountains."
         ]
      },
      {
         "id": 15,
         "word": "clock",
         "role": "noun",
         "BrE": "/klɒk/",
         "AmE": "/klɑːk/",
         "definition": "a device that shows the time",
         "examples": [
            "The clock is ticking.",
            "The clock shows 3 o’clock.",
            "She looked at the clock to check the time."
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
            "Close the door.",
            "She closed the book.",
            "He closed the window before leaving."
         ]
      },
      {
         "id": 15,
         "word": "clothes",
         "role": "noun",
         "BrE": "/kləʊðz/",
         "AmE": "/kloʊðz/",
         "definition": "things you wear, like shirts and trousers",
         "examples": [
            "I need new clothes.",
            "Her clothes are colorful.",
            "He washed his clothes yesterday."
         ]
      },
      {
         "id": 16,
         "word": "club",
         "role": "noun",
         "BrE": "/klʌb/",
         "AmE": "/klʌb/",
         "definition": "a group of people who meet to do something together",
         "examples": [
            "I joined a club.",
            "The book club meets weekly.",
            "She is in the school’s chess club."
         ]
      },
      {
         "id": 16,
         "word": "coat",
         "role": "noun",
         "BrE": "/kəʊt/",
         "AmE": "/koʊt/",
         "definition": "a piece of clothing worn over other clothes to keep warm",
         "examples": [
            "I wear a coat.",
            "Her coat is warm and red.",
            "He forgot his coat at home."
         ]
      },
      {
         "id": 16,
         "word": "coffee",
         "role": "noun",
         "BrE": "/ˈkɒfi/",
         "AmE": "/ˈkɔːfi/",
         "definition": "a hot drink made from roasted beans",
         "examples": [
            "I drink coffee.",
            "She likes strong coffee.",
            "They met for coffee in the morning."
         ]
      },
      {
         "id": 16,
         "word": "cold",
         "role": "adjective",
         "BrE": "/kəʊld/",
         "AmE": "/koʊld/",
         "definition": "having a low temperature",
         "examples": [
            "The water is cold.",
            "It’s cold outside today.",
            "She drank a cold glass of juice."
         ]
      },
      {
         "id": 16,
         "word": "college",
         "role": "noun",
         "BrE": "/ˈkɒlɪdʒ/",
         "AmE": "/ˈkɑːlɪdʒ/",
         "definition": "a place where people study after high school",
         "examples": [
            "She goes to college.",
            "His college is far away.",
            "The college offers many courses."
         ]
      },
      {
         "id": 16,
         "word": "colour",
         "role": "noun",
         "BrE": "/ˈkʌlə(r)/",
         "AmE": "/ˈkʌlər/",
         "definition": "the appearance that something has because of light",
         "examples": [
            "My favourite colour is blue.",
            "The flower has a bright colour.",
            "She painted the room in a light colour."
         ]
      },
      {
         "id": 16,
         "word": "come",
         "role": "verb",
         "BrE": "/kʌm/",
         "AmE": "/kʌm/",
         "definition": "to move to or towards a place",
         "examples": [
            "Come to my house.",
            "She comes to school by bus.",
            "They came to the party late."
         ]
      },
      {
         "id": 16,
         "word": "common",
         "role": "adjective",
         "BrE": "/ˈkɒmən/",
         "AmE": "/ˈkɑːmən/",
         "definition": "happening or found often",
         "examples": [
            "Cats are common pets.",
            "This bird is common in our area.",
            "It’s common to see rain in spring."
         ]
      },
      {
         "id": 16,
         "word": "company",
         "role": "noun",
         "BrE": "/ˈkʌmpəni/",
         "AmE": "/ˈkʌmpəni/",
         "definition": "a business that sells goods or services",
         "examples": [
            "He works for a company.",
            "The company makes cars.",
            "Her company opened a new office."
         ]
      },
      {
         "id": 16,
         "word": "compare",
         "role": "verb",
         "BrE": "/kəmˈpeə(r)/",
         "AmE": "/kəmˈper/",
         "definition": "to look at things to see how they are similar or different",
         "examples": [
            "Compare the two pictures.",
            "She compared prices at the shop.",
            "He compared the books before choosing one."
         ]
      },
      {
         "id": 17,
         "word": "complete",
         "role": "verb",
         "BrE": "/kəmˈpliːt/",
         "AmE": "/kəmˈpliːt/",
         "definition": "to finish something",
         "examples": [
            "I complete my homework.",
            "She completed the puzzle.",
            "He completed the project on time."
         ]
      },
      {
         "id": 17,
         "word": "computer",
         "role": "noun",
         "BrE": "/kəmˈpjuːtə(r)/",
         "AmE": "/kəmˈpjuːtər/",
         "definition": "an electronic machine for storing and processing information",
         "examples": [
            "I use a computer.",
            "Her computer is very fast.",
            "He plays games on his computer."
         ]
      },
      {
         "id": 17,
         "word": "concert",
         "role": "noun",
         "BrE": "/ˈkɒnsət/",
         "AmE": "/ˈkɑːnsərt/",
         "definition": "a performance of music",
         "examples": [
            "I went to a concert.",
            "The concert was loud and fun.",
            "She bought tickets for the rock concert."
         ]
      },
      {
         "id": 17,
         "word": "conversation",
         "role": "noun",
         "BrE": "/ˌkɒnvəˈseɪʃn/",
         "AmE": "/ˌkɑːnvərˈseɪʃn/",
         "definition": "talking between two or more people",
         "examples": [
            "We had a conversation.",
            "Their conversation was about school.",
            "The long conversation lasted all evening."
         ]
      },
      {
         "id": 17,
         "word": "cook",
         "role": "verb",
         "BrE": "/kʊk/",
         "AmE": "/kʊk/",
         "definition": "to prepare food by heating it",
         "examples": [
            "I cook dinner.",
            "She cooks pasta every Friday.",
            "He cooked a delicious meal for his friends."
         ]
      },
      {
         "id": 17,
         "word": "cooking",
         "role": "noun",
         "BrE": "/ˈkʊkɪŋ/",
         "AmE": "/ˈkʊkɪŋ/",
         "definition": "the activity of preparing food",
         "examples": [
            "Cooking is fun.",
            "Her cooking is very good.",
            "He learned cooking from his mother."
         ]
      },
      {
         "id": 17,
         "word": "cool",
         "role": "adjective",
         "BrE": "/kuːl/",
         "AmE": "/kuːl/",
         "definition": "slightly cold in a pleasant way",
         "examples": [
            "The water is cool.",
            "It’s cool in the shade.",
            "The cool breeze felt nice today."
         ]
      },
      {
         "id": 17,
         "word": "correct",
         "role": "adjective",
         "BrE": "/kəˈrekt/",
         "AmE": "/kəˈrekt/",
         "definition": "right or accurate",
         "examples": [
            "Your answer is correct.",
            "Her spelling is always correct.",
            "The correct time is on the clock."
         ]
      },
      {
         "id": 17,
         "word": "cost",
         "role": "verb",
         "BrE": "/kɒst/",
         "AmE": "/kɔːst/",
         "definition": "to have a price",
         "examples": [
            "This book costs $5.",
            "The ticket costs ten dollars.",
            "Her new phone cost a lot of money."
         ]
      },
      {
         "id": 17,
         "word": "could",
         "role": "modal verb",
         "BrE": "/kʊd/",
         "AmE": "/kʊd/",
         "definition": "used to show possibility or ability in the past",
         "examples": [
            "I could run fast.",
            "She could swim when she was five.",
            "Could you help me with this task?"
         ]
      },
      {
         "id": 17,
         "word": "country",
         "role": "noun",
         "BrE": "/ˈkʌntri/",
         "AmE": "/ˈkʌntri/",
         "definition": "an area with its own government",
         "examples": [
            "I love my country.",
            "She visited a new country.",
            "This country has beautiful mountains."
         ]
      },
      {
         "id": 17,
         "word": "course",
         "role": "noun",
         "BrE": "/kɔːs/",
         "AmE": "/kɔːrs/",
         "definition": "a set of lessons or studies",
         "examples": [
            "I take an English course.",
            "Her course is about art.",
            "The cooking course starts next week."
         ]
      },
      {
         "id": 18,
         "word": "cousin",
         "role": "noun",
         "BrE": "/ˈkʌzn/",
         "AmE": "/ˈkʌzn/",
         "definition": "a child of your aunt or uncle",
         "examples": [
            "My cousin is funny.",
            "Her cousin lives in London.",
            "I play games with my cousin every summer."
         ]
      },
      {
         "id": 18,
         "word": "cow",
         "role": "noun",
         "BrE": "/kaʊ/",
         "AmE": "/kaʊ/",
         "definition": "a large animal that gives milk",
         "examples": [
            "The cow is in the field.",
            "We saw a cow on the farm.",
            "Cows produce milk for the village."
         ]
      },
      {
         "id": 18,
         "word": "cream",
         "role": "noun",
         "BrE": "/kriːm/",
         "AmE": "/kriːm/",
         "definition": "a thick liquid made from milk",
         "examples": [
            "I like cream with cake.",
            "She put cream in her coffee.",
            "The dessert has fresh cream on top."
         ]
      },
      {
         "id": 18,
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
         "id": 18,
         "word": "culture",
         "role": "noun",
         "BrE": "/ˈkʌltʃə(r)/",
         "AmE": "/ˈkʌltʃər/",
         "definition": "the customs and beliefs of a group of people",
         "examples": [
            "I like her culture.",
            "The festival shows our culture.",
            "Learning about other cultures is interesting."
         ]
      },
      {
         "id": 18,
         "word": "cup",
         "role": "noun",
         "BrE": "/kʌp/",
         "AmE": "/kʌp/",
         "definition": "a small container for drinking",
         "examples": [
            "I drink from a cup.",
            "The cup is full of tea.",
            "She bought a new cup for coffee."
         ]
      },
      {
         "id": 18,
         "word": "customer",
         "role": "noun",
         "BrE": "/ˈkʌstəmə(r)/",
         "AmE": "/ˈkʌstəmər/",
         "definition": "a person who buys goods or services",
         "examples": [
            "The customer is happy.",
            "She helped a customer in the shop.",
            "The store has many customers daily."
         ]
      },
      {
         "id": 18,
         "word": "cut",
         "role": "verb",
         "BrE": "/kʌt/",
         "AmE": "/kʌt/",
         "definition": "to use a knife to divide something",
         "examples": [
            "Cut the apple.",
            "She cut the paper with scissors.",
            "He cut his hair short yesterday."
         ]
      },
      {
         "id": 18,
         "word": "dad",
         "role": "noun",
         "BrE": "/dæd/",
         "AmE": "/dæd/",
         "definition": "an informal word for father",
         "examples": [
            "My dad is kind.",
            "Her dad drives a car.",
            "Dad helped me with my homework."
         ]
      },
      {
         "id": 18,
         "word": "dance",
         "role": "verb",
         "BrE": "/dɑːns/",
         "AmE": "/dæns/",
         "definition": "to move your body to music",
         "examples": [
            "I dance at parties.",
            "She dances very well.",
            "They danced together at the festival."
         ]
      },
      {
         "id": 19,
         "word": "dancer",
         "role": "noun",
         "BrE": "/ˈdɑːnsə(r)/",
         "AmE": "/ˈdænsər/",
         "definition": "a person who dances",
         "examples": [
            "She is a dancer.",
            "The dancer was on TV.",
            "Young dancers practiced for the show."
         ]
      },
      {
         "id": 19,
         "word": "dancing",
         "role": "noun",
         "BrE": "/ˈdɑːnsɪŋ/",
         "AmE": "/ˈdænsɪŋ/",
         "definition": "the activity of moving your body to music",
         "examples": [
            "Dancing is fun.",
            "Her dancing is beautiful.",
            "They joined a dancing class at school."
         ]
      },
      {
         "id": 19,
         "word": "dangerous",
         "role": "adjective",
         "BrE": "/ˈdeɪndʒərəs/",
         "AmE": "/ˈdeɪndʒərəs/",
         "definition": "likely to cause harm or injury",
         "examples": [
            "The road is dangerous.",
            "Swimming here is dangerous.",
            "Dangerous animals live in the forest."
         ]
      },
      {
         "id": 19,
         "word": "dark",
         "role": "adjective",
         "BrE": "/dɑːk/",
         "AmE": "/dɑːrk/",
         "definition": "having little or no light",
         "examples": [
            "The room is dark.",
            "It’s dark outside at night.",
            "The dark sky showed many stars."
         ]
      },
      {
         "id": 19,
         "word": "date",
         "role": "noun",
         "BrE": "/deɪt/",
         "AmE": "/deɪt/",
         "definition": "a particular day, month, or year",
         "examples": [
            "What is the date?",
            "The date of the party is Saturday.",
            "Her birthday date is in June."
         ]
      },
      {
         "id": 19,
         "word": "daughter",
         "role": "noun",
         "BrE": "/ˈdɔːtə(r)/",
         "AmE": "/ˈdɔːtər/",
         "definition": "a female child",
         "examples": [
            "My daughter is young.",
            "Her daughter likes to read.",
            "Their daughter studies at college."
         ]
      },
      {
         "id": 19,
         "word": "day",
         "role": "noun",
         "BrE": "/deɪ/",
         "AmE": "/deɪ/",
         "definition": "a period of 24 hours",
         "examples": [
            "Today is a sunny day.",
            "She works every day.",
            "The best day was our trip to the beach."
         ]
      },
      {
         "id": 19,
         "word": "dear",
         "role": "adjective",
         "BrE": "/dɪə(r)/",
         "AmE": "/dɪr/",
         "definition": "loved or liked very much",
         "examples": [
            "My dear friend is here.",
            "She wrote a dear letter.",
            "He is very dear to his family."
         ]
      },
      {
         "id": 19,
         "word": "December",
         "role": "noun",
         "BrE": "/dɪˈsembə(r)/",
         "AmE": "/dɪˈsembər/",
         "definition": "the twelfth month of the year",
         "examples": [
            "Christmas is in December.",
            "December is cold here.",
            "We plan a party in December."
         ]
      },
      {
         "id": 19,
         "word": "decide",
         "role": "verb",
         "BrE": "/dɪˈsaɪd/",
         "AmE": "/dɪˈsaɪd/",
         "definition": "to choose something after thinking",
         "examples": [
            "I decide to stay.",
            "She decided to buy the book.",
            "They decided on a new school."
         ]
      },
      {
         "id": 20,
         "word": "delicious",
         "role": "adjective",
         "BrE": "/dɪˈlɪʃəs/",
         "AmE": "/dɪˈlɪʃəs/",
         "definition": "tasting or smelling very good",
         "examples": [
            "The food is delicious.",
            "Her cake was delicious.",
            "This delicious soup is homemade."
         ]
      },
      {
         "id": 20,
         "word": "describe",
         "role": "verb",
         "BrE": "/dɪˈskraɪb/",
         "AmE": "/dɪˈskraɪb/",
         "definition": "to say what something or someone is like",
         "examples": [
            "Describe your house.",
            "She described her favorite book.",
            "He described the city in detail."
         ]
      },
      {
         "id": 20,
         "word": "description",
         "role": "noun",
         "BrE": "/dɪˈskrɪpʃn/",
         "AmE": "/dɪˈskrɪpʃn/",
         "definition": "a statement that explains what something is like",
         "examples": [
            "Give a description.",
            "Her description of the park was clear.",
            "The book has a description of the town."
         ]
      },
      {
         "id": 20,
         "word": "design",
         "role": "verb",
         "BrE": "/dɪˈzaɪn/",
         "AmE": "/dɪˈzaɪn/",
         "definition": "to plan or create something",
         "examples": [
            "I design a poster.",
            "She designed a new dress.",
            "He designed a website for his friend."
         ]
      },
      {
         "id": 20,
         "word": "desk",
         "role": "noun",
         "BrE": "/desk/",
         "AmE": "/desk/",
         "definition": "a piece of furniture for working or studying",
         "examples": [
            "My desk is small.",
            "The desk is in the classroom.",
            "She keeps her books on the desk."
         ]
      },
      {
         "id": 20,
         "word": "detail",
         "role": "noun",
         "BrE": "/ˈdiːteɪl/",
         "AmE": "/ˈdiːteɪl/",
         "definition": "a single piece of information",
         "examples": [
            "Give me one detail.",
            "She wrote every detail in her book.",
            "The detail about the event was helpful."
         ]
      },
      {
         "id": 20,
         "word": "dialogue",
         "role": "noun",
         "BrE": "/ˈdaɪəlɒɡ/",
         "AmE": "/ˈdaɪəlɔːɡ/",
         "definition": "a conversation in a book, play, or film",
         "examples": [
            "The dialogue is funny.",
            "The book has short dialogues.",
            "The film’s dialogue was easy to follow."
         ]
      },
      {
         "id": 20,
         "word": "dictionary",
         "role": "noun",
         "BrE": "/ˈdɪkʃənri/",
         "AmE": "/ˈdɪkʃəneri/",
         "definition": "a book that explains the meanings of words",
         "examples": [
            "I use a dictionary.",
            "The dictionary has many words.",
            "She checked the word in the dictionary."
         ]
      },
      {
         "id": 20,
         "word": "die",
         "role": "verb",
         "BrE": "/daɪ/",
         "AmE": "/daɪ/",
         "definition": "to stop living",
         "examples": [
            "Plants die without water.",
            "The old tree died last year.",
            "Some fish die in polluted rivers."
         ]
      },
      {
         "id": 20,
         "word": "diet",
         "role": "noun",
         "BrE": "/ˈdaɪət/",
         "AmE": "/ˈdaɪət/",
         "definition": "the food that you usually eat",
         "examples": [
            "My diet is healthy.",
            "Her diet includes vegetables.",
            "A balanced diet is good for you."
         ]
      },
      {
         "id": 21,
         "word": "difference",
         "role": "noun",
         "BrE": "/ˈdɪfrəns/",
         "AmE": "/ˈdɪfrəns/",
         "definition": "the way in which two things are not the same",
         "examples": [
            "There is a difference.",
            "The difference between cats and dogs is clear.",
            "She noticed a difference in his behavior."
         ]
      },
      {
         "id": 21,
         "word": "different",
         "role": "adjective",
         "BrE": "/ˈdɪfrənt/",
         "AmE": "/ˈdɪfrənt/",
         "definition": "not the same",
         "examples": [
            "This book is different.",
            "Her dress is different from mine.",
            "They live in a different city now."
         ]
      },
      {
         "id": 21,
         "word": "difficult",
         "role": "adjective",
         "BrE": "/ˈdɪfɪkəlt/",
         "AmE": "/ˈdɪfɪkəlt/",
         "definition": "not easy to do or understand",
         "examples": [
            "The test is difficult.",
            "Math is difficult for her.",
            "The difficult puzzle took hours to solve."
         ]
      },
      {
         "id": 21,
         "word": "dinner",
         "role": "noun",
         "BrE": "/ˈdɪnə(r)/",
         "AmE": "/ˈdɪnər/",
         "definition": "the main meal of the day, usually in the evening",
         "examples": [
            "We eat dinner.",
            "Dinner is at 7 p.m.",
            "She cooked a big dinner for her family."
         ]
      },
      {
         "id": 21,
         "word": "dirty",
         "role": "adjective",
         "BrE": "/ˈdɜːti/",
         "AmE": "/ˈdɜːrti/",
         "definition": "not clean",
         "examples": [
            "My shoes are dirty.",
            "The room was dirty after the party.",
            "He washed his dirty clothes."
         ]
      },
      {
         "id": 21,
         "word": "discuss",
         "role": "verb",
         "BrE": "/dɪˈskʌs/",
         "AmE": "/dɪˈskʌs/",
         "definition": "to talk about something with others",
         "examples": [
            "We discuss the book.",
            "They discussed the plan in class.",
            "She discussed her ideas with the teacher."
         ]
      },
      {
         "id": 21,
         "word": "dish",
         "role": "noun",
         "BrE": "/dɪʃ/",
         "AmE": "/dɪʃ/",
         "definition": "a plate or bowl for food",
         "examples": [
            "Wash the dish.",
            "The dish is full of rice.",
            "She served soup in a big dish."
         ]
      },
      {
         "id": 21,
         "word": "do",
         "role": "verb",
         "BrE": "/duː/",
         "AmE": "/duː/",
         "definition": "to perform an action or activity",
         "examples": [
            "I do my homework.",
            "She does sports every day.",
            "What do you do on weekends?"
         ]
      },
      {
         "id": 21,
         "word": "doctor",
         "role": "noun",
         "BrE": "/ˈdɒktə(r)/",
         "AmE": "/ˈdɑːktər/",
         "definition": "a person who helps sick people",
         "examples": [
            "The doctor is kind.",
            "I visited the doctor yesterday.",
            "The doctor gave her some medicine."
         ]
      },
      {
         "id": 21,
         "word": "dog",
         "role": "noun",
         "BrE": "/dɒɡ/",
         "AmE": "/dɔːɡ/",
         "definition": "a common animal often kept as a pet",
         "examples": [
            "My dog is big.",
            "The dog barked at the cat.",
            "She walks her dog every morning."
         ]
      },
      {
         "id": 22,
         "word": "dollar",
         "role": "noun",
         "BrE": "/ˈdɒlə(r)/",
         "AmE": "/ˈdɑːlər/",
         "definition": "a unit of money used in the US and other countries",
         "examples": [
            "This costs one dollar.",
            "She has ten dollars.",
            "The book was only five dollars."
         ]
      },
      {
         "id": 22,
         "word": "door",
         "role": "noun",
         "BrE": "/dɔː(r)/",
         "AmE": "/dɔːr/",
         "definition": "a piece of wood or glass you open to enter a room",
         "examples": [
            "Open the door.",
            "The door is red.",
            "She knocked on the door before entering."
         ]
      },
      {
         "id": 22,
         "word": "down",
         "role": "preposition",
         "BrE": "/daʊn/",
         "AmE": "/daʊn/",
         "definition": "to a lower place or position",
         "examples": [
            "Go down the stairs.",
            "The ball rolled down the hill.",
            "She walked down the street to the shop."
         ]
      },
      {
         "id": 22,
         "word": "downstairs",
         "role": "adverb",
         "BrE": "/ˌdaʊnˈsteəz/",
         "AmE": "/ˌdaʊnˈsterz/",
         "definition": "to or on a lower floor of a building",
         "examples": [
            "I go downstairs.",
            "She is downstairs in the kitchen.",
            "He left his bag downstairs."
         ]
      },
      {
         "id": 22,
         "word": "draw",
         "role": "verb",
         "BrE": "/drɔː/",
         "AmE": "/drɔː/",
         "definition": "to make a picture with a pencil or pen",
         "examples": [
            "I draw a cat.",
            "She drew a house in art class.",
            "He draws animals very well."
         ]
      },
      {
         "id": 22,
         "word": "dress",
         "role": "noun",
         "BrE": "/dres/",
         "AmE": "/dres/",
         "definition": "a piece of clothing worn by women or girls",
         "examples": [
            "Her dress is blue.",
            "I like her new dress.",
            "She wore a long dress to the party."
         ]
      },
      {
         "id": 22,
         "word": "drink",
         "role": "verb",
         "BrE": "/drɪŋk/",
         "AmE": "/drɪŋk/",
         "definition": "to take liquid into your mouth",
         "examples": [
            "I drink water.",
            "She drinks tea every morning.",
            "He drank a glass of milk."
         ]
      },
      {
         "id": 22,
         "word": "drive",
         "role": "verb",
         "BrE": "/draɪv/",
         "AmE": "/draɪv/",
         "definition": "to control a vehicle like a car",
         "examples": [
            "I drive a car.",
            "He drives to work every day.",
            "She learned to drive last year."
         ]
      },
      {
         "id": 22,
         "word": "driver",
         "role": "noun",
         "BrE": "/ˈdraɪvə(r)/",
         "AmE": "/ˈdraɪvər/",
         "definition": "a person who drives a vehicle",
         "examples": [
            "The driver is careful.",
            "Our bus driver is friendly.",
            "She became a taxi driver last month."
         ]
      },
      {
         "id": 22,
         "word": "during",
         "role": "preposition",
         "BrE": "/ˈdjʊərɪŋ/",
         "AmE": "/ˈdʊrɪŋ/",
         "definition": "throughout a period of time",
         "examples": [
            "I sleep during the night.",
            "She read during the trip.",
            "He worked during the summer holidays."
         ]
      },
      {
         "id": 23,
         "word": "DVD",
         "role": "noun",
         "BrE": "/ˌdiː viː ˈdiː/",
         "AmE": "/ˌdiː viː ˈdiː/",
         "definition": "a disc used for storing films or music",
         "examples": [
            "I watch a DVD.",
            "The DVD has a new movie.",
            "She bought a DVD of her favorite show."
         ]
      },
      {
         "id": 23,
         "word": "each",
         "role": "determiner",
         "BrE": "/iːtʃ/",
         "AmE": "/iːtʃ/",
         "definition": "every one of two or more things or people",
         "examples": [
            "Each book is new.",
            "Each student has a pen.",
            "Each child got a gift at the party."
         ]
      },
      {
         "id": 23,
         "word": "ear",
         "role": "noun",
         "BrE": "/ɪə(r)/",
         "AmE": "/ɪr/",
         "definition": "the part of the body used for hearing",
         "examples": [
            "My ear hurts.",
            "She wears earrings in her ears.",
            "He covered his ears during the loud music."
         ]
      },
      {
         "id": 23,
         "word": "early",
         "role": "adjective",
         "BrE": "/ˈɜːli/",
         "AmE": "/ˈɜːrli/",
         "definition": "happening before the usual or expected time",
         "examples": [
            "I wake up early.",
            "She arrived early for class.",
            "The bus left early this morning."
         ]
      },
      {
         "id": 23,
         "word": "east",
         "role": "noun",
         "BrE": "/iːst/",
         "AmE": "/iːst/",
         "definition": "the direction where the sun rises",
         "examples": [
            "The sun rises in the east.",
            "We live in the east of the city.",
            "The east side has a big park."
         ]
      },
      {
         "id": 23,
         "word": "easy",
         "role": "adjective",
         "BrE": "/ˈiːzi/",
         "AmE": "/ˈiːzi/",
         "definition": "not difficult",
         "examples": [
            "This game is easy.",
            "The test was easy for her.",
            "Learning colors is easy for children."
         ]
      },
      {
         "id": 23,
         "word": "eat",
         "role": "verb",
         "BrE": "/iːt/",
         "AmE": "/iːt/",
         "definition": "to put food in your mouth and swallow it",
         "examples": [
            "I eat an apple.",
            "She eats lunch at school.",
            "They ate pizza for dinner yesterday."
         ]
      },
      {
         "id": 23,
         "word": "egg",
         "role": "noun",
         "BrE": "/eɡ/",
         "AmE": "/eɡ/",
         "definition": "a food with a hard shell, often from a chicken",
         "examples": [
            "I eat an egg.",
            "She cooked two eggs.",
            "Eggs are good for breakfast."
         ]
      },
      {
         "id": 23,
         "word": "eight",
         "role": "number",
         "BrE": "/eɪt/",
         "AmE": "/eɪt/",
         "definition": "the number 8",
         "examples": [
            "I have eight books.",
            "She is eight years old.",
            "The shop opens at eight o’clock."
         ]
      },
      {
         "id": 23,
         "word": "eighteen",
         "role": "number",
         "BrE": "/ˌeɪˈtiːn/",
         "AmE": "/ˌeɪˈtiːn/",
         "definition": "the number 18",
         "examples": [
            "He is eighteen.",
            "I bought eighteen apples.",
            "She turned eighteen last month."
         ]
      },
      {
         "id": 24,
         "word": "eighty",
         "role": "number",
         "BrE": "/ˈeɪti/",
         "AmE": "/ˈeɪti/",
         "definition": "the number 80",
         "examples": [
            "My grandma is eighty.",
            "The book costs eighty cents.",
            "Eighty people came to the party."
         ]
      },
      {
         "id": 24,
         "word": "elephant",
         "role": "noun",
         "BrE": "/ˈelɪfənt/",
         "AmE": "/ˈelɪfənt/",
         "definition": "a large animal with a long trunk",
         "examples": [
            "The elephant is big.",
            "We saw an elephant at the zoo.",
            "Elephants live in Africa and Asia."
         ]
      },
      {
         "id": 24,
         "word": "eleven",
         "role": "number",
         "BrE": "/ɪˈlevn/",
         "AmE": "/ɪˈlevn/",
         "definition": "the number 11",
         "examples": [
            "I have eleven pens.",
            "She is eleven years old.",
            "The game starts at eleven."
         ]
      },
      {
         "id": 24,
         "word": "else",
         "role": "adverb",
         "BrE": "/els/",
         "AmE": "/els/",
         "definition": "in addition or different",
         "examples": [
            "What else do you want?",
            "Is there anything else to eat?",
            "She didn’t want to go anywhere else."
         ]
      },
      {
         "id": 24,
         "word": "email",
         "role": "noun",
         "BrE": "/ˈiːmeɪl/",
         "AmE": "/ˈiːmeɪl/",
         "definition": "a message sent using a computer",
         "examples": [
            "I sent an email.",
            "Her email was short.",
            "He checks his email every morning."
         ]
      },
      {
         "id": 24,
         "word": "end",
         "role": "noun",
         "BrE": "/end/",
         "AmE": "/end/",
         "definition": "the final part of something",
         "examples": [
            "The movie’s end was sad.",
            "We reached the end of the book.",
            "The end of the year is busy."
         ]
      },
      {
         "id": 24,
         "word": "enjoy",
         "role": "verb",
         "BrE": "/ɪnˈdʒɔɪ/",
         "AmE": "/ɪnˈdʒɔɪ/",
         "definition": "to like doing something",
         "examples": [
            "I enjoy music.",
            "She enjoys reading books.",
            "They enjoyed the party last night."
         ]
      },
      {
         "id": 24,
         "word": "enough",
         "role": "adverb",
         "BrE": "/ɪˈnʌf/",
         "AmE": "/ɪˈnʌf/",
         "definition": "as much or as many as needed",
         "examples": [
            "I have enough food.",
            "Is there enough water for all?",
            "She studied enough to pass the test."
         ]
      },
      {
         "id": 24,
         "word": "euro",
         "role": "noun",
         "BrE": "/ˈjʊərəʊ/",
         "AmE": "/ˈjʊroʊ/",
         "definition": "the unit of money used in many European countries",
         "examples": [
            "This costs one euro.",
            "She has ten euros.",
            "The ticket was twenty euros."
         ]
      },
      {
         "id": 24,
         "word": "even",
         "role": "adverb",
         "BrE": "/ˈiːvn/",
         "AmE": "/ˈiːvn/",
         "definition": "used to emphasize something surprising",
         "examples": [
            "Even I can do it.",
            "Even the dog was tired.",
            "She didn’t cry, not even once."
         ]
      },
      {
         "id": 25,
         "word": "evening",
         "role": "noun",
         "BrE": "/ˈiːvnɪŋ/",
         "AmE": "/ˈiːvnɪŋ/",
         "definition": "the time of day between afternoon and night",
         "examples": [
            "I study in the evening.",
            "The evening was cool and quiet.",
            "We watch movies every evening."
         ]
      },
      {
         "id": 25,
         "word": "event",
         "role": "noun",
         "BrE": "/ɪˈvent/",
         "AmE": "/ɪˈvent/",
         "definition": "something that happens, especially something important",
         "examples": [
            "The event was fun.",
            "The school event is tomorrow.",
            "The sports event attracted many people."
         ]
      },
      {
         "id": 25,
         "word": "ever",
         "role": "adverb",
         "BrE": "/ˈevə(r)/",
         "AmE": "/ˈevər/",
         "definition": "at any time",
         "examples": [
            "Have you ever seen it?",
            "She has never been there.",
            "Is this the best book you’ve ever read?"
         ]
      },
      {
         "id": 25,
         "word": "every",
         "role": "determiner",
         "BrE": "/ˈevri/",
         "AmE": "/ˈevri/",
         "definition": "each one of a group",
         "examples": [
            "Every book is good.",
            "I go there every day.",
            "Every student got a prize."
         ]
      },
      {
         "id": 25,
         "word": "everybody",
         "role": "pronoun",
         "BrE": "/ˈevribɒdi/",
         "AmE": "/ˈevribɑːdi/",
         "definition": "all people",
         "examples": [
            "Everybody is here.",
            "Everybody likes her.",
            "Everybody enjoyed the school party."
         ]
      },
      {
         "id": 25,
         "word": "everyone",
         "role": "pronoun",
         "BrE": "/ˈevriwʌn/",
         "AmE": "/ˈevriwʌn/",
         "definition": "every person",
         "examples": [
            "Everyone is happy.",
            "Everyone came to the meeting.",
            "Everyone in the class passed the test."
         ]
      },
      {
         "id": 25,
         "word": "everything",
         "role": "pronoun",
         "BrE": "/ˈevriθɪŋ/",
         "AmE": "/ˈevriθɪŋ/",
         "definition": "all things",
         "examples": [
            "Everything is ready.",
            "She packed everything in her bag.",
            "Everything in the shop is new."
         ]
      },
      {
         "id": 25,
         "word": "exam",
         "role": "noun",
         "BrE": "/ɪɡˈzæm/",
         "AmE": "/ɪɡˈzæm/",
         "definition": "a test of what you know or can do",
         "examples": [
            "I have an exam.",
            "Her exam is tomorrow.",
            "The math exam was very difficult."
         ]
      },
      {
         "id": 25,
         "word": "example",
         "role": "noun",
         "BrE": "/ɪɡˈzɑːmpl/",
         "AmE": "/ɪɡˈzæmpl/",
         "definition": "something that shows what other things are like",
         "examples": [
            "Give me an example.",
            "This is a good example.",
            "Her work is an example for others."
         ]
      },
      {
         "id": 25,
         "word": "excited",
         "role": "adjective",
         "BrE": "/ɪkˈsaɪtɪd/",
         "AmE": "/ɪkˈsaɪtɪd/",
         "definition": "feeling happy and enthusiastic",
         "examples": [
            "I am excited.",
            "She’s excited about the trip.",
            "The children were excited for the party."
         ]
      },
      {
         "id": 26,
         "word": "exciting",
         "role": "adjective",
         "BrE": "/ɪkˈsaɪtɪŋ/",
         "AmE": "/ɪkˈsaɪtɪŋ/",
         "definition": "making you feel excited",
         "examples": [
            "The movie is exciting.",
            "Her book is very exciting.",
            "The game was exciting to watch."
         ]
      },
      {
         "id": 26,
         "word": "exercise",
         "role": "noun",
         "BrE": "/ˈeksəsaɪz/",
         "AmE": "/ˈeksərsaɪz/",
         "definition": "physical activity to stay healthy",
         "examples": [
            "I do exercise daily.",
            "Swimming is good exercise.",
            "Exercise helps you feel strong."
         ]
      },
      {
         "id": 26,
         "word": "expensive",
         "role": "adjective",
         "BrE": "/ɪkˈspensɪv/",
         "AmE": "/ɪkˈspensɪv/",
         "definition": "costing a lot of money",
         "examples": [
            "This bag is expensive.",
            "Her phone was very expensive.",
            "Expensive cars are parked outside."
         ]
      },
      {
         "id": 26,
         "word": "explain",
         "role": "verb",
         "BrE": "/ɪkˈspleɪn/",
         "AmE": "/ɪkˈspleɪn/",
         "definition": "to make something clear by giving details",
         "examples": [
            "Explain the word.",
            "She explained the game rules.",
            "He explained his idea to the class."
         ]
      },
      {
         "id": 26,
         "word": "extra",
         "role": "adjective",
         "BrE": "/ˈekstrə/",
         "AmE": "/ˈekstrə/",
         "definition": "more than what is usual",
         "examples": [
            "I have extra paper.",
            "She bought an extra ticket.",
            "We need extra time to finish."
         ]
      },
      {
         "id": 26,
         "word": "eye",
         "role": "noun",
         "BrE": "/aɪ/",
         "AmE": "/aɪ/",
         "definition": "the part of the body used for seeing",
         "examples": [
            "My eye is blue.",
            "She closed her eyes.",
            "He wears glasses to protect his eyes."
         ]
      },
      {
         "id": 26,
         "word": "fact",
         "role": "noun",
         "BrE": "/fækt/",
         "AmE": "/fækt/",
         "definition": "something that is true",
         "examples": [
            "It’s a fact.",
            "The fact is that she’s right.",
            "He learned new facts about animals."
         ]
      },
      {
         "id": 26,
         "word": "fall",
         "role": "verb",
         "BrE": "/fɔːl/",
         "AmE": "/fɔːl/",
         "definition": "to go down quickly to the ground",
         "examples": [
            "Leaves fall in autumn.",
            "She fell off her bike.",
            "He fell while climbing the hill."
         ]
      },
      {
         "id": 26,
         "word": "false",
         "role": "adjective",
         "BrE": "/fɔːls/",
         "AmE": "/fɔːls/",
         "definition": "not true or correct",
         "examples": [
            "The answer is false.",
            "Her story was false.",
            "He gave a false name to the police."
         ]
      },
      {
         "id": 27,
         "word": "family",
         "role": "noun",
         "BrE": "/ˈfæməli/",
         "AmE": "/ˈfæməli/",
         "definition": "a group of people related to each other",
         "examples": [
            "My family is big.",
            "Her family lives in a village.",
            "We visit family every holiday."
         ]
      },
      {
         "id": 27,
         "word": "famous",
         "role": "adjective",
         "BrE": "/ˈfeɪməs/",
         "AmE": "/ˈfeɪməs/",
         "definition": "known by many people",
         "examples": [
            "She is a famous singer.",
            "This city is famous for art.",
            "The famous actor visited our school."
         ]
      },
      {
         "id": 27,
         "word": "fantastic",
         "role": "adjective",
         "BrE": "/fænˈtæstɪk/",
         "AmE": "/fænˈtæstɪk/",
         "definition": "very good or enjoyable",
         "examples": [
            "The movie was fantastic.",
            "Her party was fantastic.",
            "We had a fantastic time at the beach."
         ]
      },
      {
         "id": 27,
         "word": "far",
         "role": "adverb",
         "BrE": "/fɑː(r)/",
         "AmE": "/fɑːr/",
         "definition": "a long distance away",
         "examples": [
            "The shop is far.",
            "She lives far from school.",
            "The mountain is far from the city."
         ]
      },
      {
         "id": 27,
         "word": "farm",
         "role": "noun",
         "BrE": "/fɑːm/",
         "AmE": "/fɑːrm/",
         "definition": "an area of land used for growing crops or keeping animals",
         "examples": [
            "We visited a farm.",
            "The farm has many cows.",
            "She works on a farm every summer."
         ]
      },
      {
         "id": 27,
         "word": "farmer",
         "role": "noun",
         "BrE": "/ˈfɑːmə(r)/",
         "AmE": "/ˈfɑːrmər/",
         "definition": "a person who works on a farm",
         "examples": [
            "The farmer is kind.",
            "The farmer grows vegetables.",
            "He became a farmer after moving."
         ]
      },
      {
         "id": 27,
         "word": "fast",
         "role": "adjective",
         "BrE": "/fɑːst/",
         "AmE": "/fæst/",
         "definition": "moving or happening quickly",
         "examples": [
            "The car is fast.",
            "She runs very fast.",
            "The fast train arrived early."
         ]
      },
      {
         "id": 27,
         "word": "fat",
         "role": "adjective",
         "BrE": "/fæt/",
         "AmE": "/fæt/",
         "definition": "having too much weight",
         "examples": [
            "The cat is fat.",
            "He ate too much and got fat.",
            "The fat dog needs more exercise."
         ]
      },
      {
         "id": 27,
         "word": "father",
         "role": "noun",
         "BrE": "/ˈfɑːðə(r)/",
         "AmE": "/ˈfɑːðər/",
         "definition": "a male parent",
         "examples": [
            "My father is tall.",
            "Her father works in a bank.",
            "His father taught him to ride a bike."
         ]
      },
      {
         "id": 27,
         "word": "favourite",
         "role": "adjective",
         "BrE": "/ˈfeɪvərɪt/",
         "AmE": "/ˈfeɪvərɪt/",
         "definition": "liked more than others",
         "examples": [
            "Blue is my favourite color.",
            "Her favourite book is short.",
            "This is my favourite place to visit."
         ]
      },
      {
         "id": 28,
         "word": "February",
         "role": "noun",
         "BrE": "/ˈfebruəri/",
         "AmE": "/ˈfebruˌeri/",
         "definition": "the second month of the year",
         "examples": [
            "February is cold.",
            "My birthday is in February.",
            "It snows a lot in February here."
         ]
      },
      {
         "id": 28,
         "word": "feel",
         "role": "verb",
         "BrE": "/fiːl/",
         "AmE": "/fiːl/",
         "definition": "to experience an emotion or sensation",
         "examples": [
            "I feel happy.",
            "She feels tired after work.",
            "He felt cold during the night."
         ]
      },
      {
         "id": 28,
         "word": "feeling",
         "role": "noun",
         "BrE": "/ˈfiːlɪŋ/",
         "AmE": "/ˈfiːlɪŋ/",
         "definition": "an emotion or sensation",
         "examples": [
            "I have a good feeling.",
            "Her feeling was one of joy.",
            "The feeling of success was amazing."
         ]
      },
      {
         "id": 28,
         "word": "festival",
         "role": "noun",
         "BrE": "/ˈfestɪvl/",
         "AmE": "/ˈfestɪvl/",
         "definition": "a special event with music, food, or activities",
         "examples": [
            "The festival is fun.",
            "We went to a music festival.",
            "The town festival happens every year."
         ]
      },
      {
         "id": 28,
         "word": "few",
         "role": "determiner",
         "BrE": "/fjuː/",
         "AmE": "/fjuː/",
         "definition": "a small number of things or people",
         "examples": [
            "I have few books.",
            "She has few friends here.",
            "A few people came to the meeting."
         ]
      },
      {
         "id": 28,
         "word": "fifteen",
         "role": "number",
         "BrE": "/ˌfɪfˈtiːn/",
         "AmE": "/ˌfɪfˈtiːn/",
         "definition": "the number 15",
         "examples": [
            "I am fifteen.",
            "She bought fifteen apples.",
            "The bus leaves in fifteen minutes."
         ]
      },
      {
         "id": 28,
         "word": "fifth",
         "role": "number",
         "BrE": "/fɪfθ/",
         "AmE": "/fɪfθ/",
         "definition": "the number 5 in a series",
         "examples": [
            "It’s the fifth book.",
            "She came in fifth place.",
            "The fifth day was sunny."
         ]
      },
      {
         "id": 28,
         "word": "fifty",
         "role": "number",
         "BrE": "/ˈfɪfti/",
         "AmE": "/ˈfɪfti/",
         "definition": "the number 50",
         "examples": [
            "He is fifty years old.",
            "The shop has fifty items.",
            "It costs fifty dollars."
         ]
      },
      {
         "id": 28,
         "word": "fill",
         "role": "verb",
         "BrE": "/fɪl/",
         "AmE": "/fɪl/",
         "definition": "to make something full",
         "examples": [
            "Fill the cup.",
            "She filled the bottle with water.",
            "He filled the bag with books."
         ]
      },
      {
         "id": 28,
         "word": "film",
         "role": "noun",
         "BrE": "/fɪlm/",
         "AmE": "/fɪlm/",
         "definition": "a movie shown in a cinema or on TV",
         "examples": [
            "I watched a film.",
            "The film was funny.",
            "She loves old films about adventure."
         ]
      },
      {
         "id": 29,
         "word": "final",
         "role": "adjective",
         "BrE": "/ˈfaɪnl/",
         "AmE": "/ˈfaɪnl/",
         "definition": "last in a series or process",
         "examples": [
            "The final game is today.",
            "Her final answer was correct.",
            "The final chapter of the book was exciting."
         ]
      },
      {
         "id": 29,
         "word": "find",
         "role": "verb",
         "BrE": "/faɪnd/",
         "AmE": "/faɪnd/",
         "definition": "to discover something or someone",
         "examples": [
            "I find my keys.",
            "She found a nice book.",
            "He found his dog in the park."
         ]
      },
      {
         "id": 29,
         "word": "fine",
         "role": "adjective",
         "BrE": "/faɪn/",
         "AmE": "/faɪn/",
         "definition": "good or acceptable",
         "examples": [
            "I feel fine.",
            "The weather is fine today.",
            "Her fine work impressed the teacher."
         ]
      },
      {
         "id": 29,
         "word": "finish",
         "role": "verb",
         "BrE": "/ˈfɪnɪʃ/",
         "AmE": "/ˈfɪnɪʃ/",
         "definition": "to complete something",
         "examples": [
            "I finish my homework.",
            "She finished the race first.",
            "He finished writing his book."
         ]
      },

      {
         "id": 29,
         "word": "fire",
         "role": "noun",
         "BrE": "/ˈfaɪə(r)/",
         "AmE": "/ˈfaɪər/",
         "definition": "something burning that produces flames",
         "examples": [
            "The fire is warm.",
            "They sat by the fire.",
            "The fire in the forest was dangerous."
         ]
      },
      {
         "id": 29,
         "word": "first",
         "role": "adjective",
         "BrE": "/fɜːst/",
         "AmE": "/fɜːrst/",
         "definition": "coming before all others",
         "examples": [
            "She was first in line.",
            "The first day was exciting.",
            "His first book became very popular."
         ]
      },
      {
         "id": 29,
         "word": "fish",
         "role": "noun",
         "BrE": "/fɪʃ/",
         "AmE": "/fɪʃ/",
         "definition": "an animal that lives in water",
         "examples": [
            "I see a fish.",
            "The fish swims in the river.",
            "She caught a big fish yesterday."
         ]
      },
      {
         "id": 29,
         "word": "five",
         "role": "number",
         "BrE": "/faɪv/",
         "AmE": "/faɪv/",
         "definition": "the number 5",
         "examples": [
            "I have five books.",
            "She is five years old.",
            "The shop opens at five."
         ]
      },
      {
         "id": 29,
         "word": "flat",
         "role": "noun",
         "BrE": "/flæt/",
         "AmE": "/flæt/",
         "definition": "a set of rooms for living in, usually on one floor",
         "examples": [
            "I live in a flat.",
            "Her flat is small but nice.",
            "The flat has a big kitchen."
         ]
      },
      {
         "id": 29,
         "word": "flight",
         "role": "noun",
         "BrE": "/flaɪt/",
         "AmE": "/flaɪt/",
         "definition": "a journey in an airplane",
         "examples": [
            "The flight was long.",
            "Her flight leaves at 8 p.m.",
            "He booked a flight to Paris."
         ]
      },
      {
         "id": 30,
         "word": "floor",
         "role": "noun",
         "BrE": "/flɔː(r)/",
         "AmE": "/flɔːr/",
         "definition": "the flat surface you walk on inside a building",
         "examples": [
            "The floor is clean.",
            "The book is on the floor.",
            "She lives on the third floor."
         ]
      },
      {
         "id": 30,
         "word": "flower",
         "role": "noun",
         "BrE": "/ˈflaʊə(r)/",
         "AmE": "/ˈflaʊər/",
         "definition": "the colorful part of a plant",
         "examples": [
            "I pick a flower.",
            "The flower is red.",
            "She grows flowers in her garden."
         ]
      },
      {
         "id": 30,
         "word": "fly",
         "role": "verb",
         "BrE": "/flaɪ/",
         "AmE": "/flaɪ/",
         "definition": "to move through the air",
         "examples": [
            "Birds fly in the sky.",
            "She flew to London yesterday.",
            "The plane flies high above the clouds."
         ]
      },
      {
         "id": 30,
         "word": "follow",
         "role": "verb",
         "BrE": "/ˈfɒləʊ/",
         "AmE": "/ˈfɑːloʊ/",
         "definition": "to go after someone or something",
         "examples": [
            "Follow me.",
            "He followed the teacher’s rules.",
            "She follows her brother to school."
         ]
      },
      {
         "id": 30,
         "word": "food",
         "role": "noun",
         "BrE": "/fuːd/",
         "AmE": "/fuːd/",
         "definition": "things that people or animals eat",
         "examples": [
            "I like spicy food.",
            "The food at the party was good.",
            "Healthy food is important for kids."
         ]
      },
      {
         "id": 30,
         "word": "foot",
         "role": "noun",
         "BrE": "/fʊt/",
         "AmE": "/fʊt/",
         "definition": "the part of the body you stand on",
         "examples": [
            "My foot hurts.",
            "He kicked the ball with his foot.",
            "She hurt her foot while running."
         ]
      },
      {
         "id": 30,
         "word": "football",
         "role": "noun",
         "BrE": "/ˈfʊtbɔːl/",
         "AmE": "/ˈfʊtbɔːl/",
         "definition": "a game played with a ball by two teams",
         "examples": [
            "I play football.",
            "Football is his favorite sport.",
            "The football match was exciting."
         ]
      },
      {
         "id": 30,
         "word": "for",
         "role": "preposition",
         "BrE": "/fə(r)/",
         "AmE": "/fər/",
         "definition": "used to show purpose, reason, or time",
         "examples": [
            "This gift is for you.",
            "She studies for two hours.",
            "I bought a book for my friend."
         ]
      },
      {
         "id": 30,
         "word": "forget",
         "role": "verb",
         "BrE": "/fəˈɡet/",
         "AmE": "/fərˈɡet/",
         "definition": "to not remember something",
         "examples": [
            "Don’t forget your bag.",
            "She forgot her homework.",
            "He forgot where he parked the car."
         ]
      },
      {
         "id": 30,
         "word": "form",
         "role": "noun",
         "BrE": "/fɔːm/",
         "AmE": "/fɔːrm/",
         "definition": "a document with spaces to write information",
         "examples": [
            "Fill in the form.",
            "The form asks for your name.",
            "She completed the school form."
         ]
      },
      {
         "id": 31,
         "word": "forty",
         "role": "number",
         "BrE": "/ˈfɔːti/",
         "AmE": "/ˈfɔːrti/",
         "definition": "the number 40",
         "examples": [
            "He is forty years old.",
            "The book costs forty dollars.",
            "Forty people came to the event."
         ]
      },
      {
         "id": 31,
         "word": "four",
         "role": "number",
         "BrE": "/fɔː(r)/",
         "AmE": "/fɔːr/",
         "definition": "the number 4",
         "examples": [
            "I have four cats.",
            "She is four years old.",
            "The shop opens at four."
         ]
      },
      {
         "id": 31,
         "word": "fourteen",
         "role": "number",
         "BrE": "/ˌfɔːˈtiːn/",
         "AmE": "/ˌfɔːrˈtiːn/",
         "definition": "the number 14",
         "examples": [
            "She is fourteen.",
            "I bought fourteen books.",
            "The bus leaves at fourteen minutes past."
         ]
      },
      {
         "id": 31,
         "word": "fourth",
         "role": "number",
         "BrE": "/fɔːθ/",
         "AmE": "/fɔːrθ/",
         "definition": "the number 4 in a series",
         "examples": [
            "It’s the fourth book.",
            "He came in fourth place.",
            "The fourth day was rainy."
         ]
      },
      {
         "id": 31,
         "word": "free",
         "role": "adjective",
         "BrE": "/friː/",
         "AmE": "/friː/",
         "definition": "costing no money",
         "examples": [
            "The ticket is free.",
            "She got a free book.",
            "The museum is free on Sundays."
         ]
      },
      {
         "id": 31,
         "word": "Friday",
         "role": "noun",
         "BrE": "/ˈfraɪdeɪ/",
         "AmE": "/ˈfraɪdeɪ/",
         "definition": "the day after Thursday",
         "examples": [
            "Friday is my favorite day.",
            "We meet every Friday.",
            "The party is this Friday evening."
         ]
      },
      {
         "id": 31,
         "word": "friend",
         "role": "noun",
         "BrE": "/frend/",
         "AmE": "/frend/",
         "definition": "a person you like and know well",
         "examples": [
            "My friend is kind.",
            "She visited her friend yesterday.",
            "He has many friends at school."
         ]
      },
      {
         "id": 31,
         "word": "friendly",
         "role": "adjective",
         "BrE": "/ˈfrendli/",
         "AmE": "/ˈfrendli/",
         "definition": "kind and pleasant to others",
         "examples": [
            "She is friendly.",
            "The dog is very friendly.",
            "Our teacher is friendly and helpful."
         ]
      },
      {
         "id": 31,
         "word": "from",
         "role": "preposition",
         "BrE": "/frəm/",
         "AmE": "/frəm/",
         "definition": "showing where something starts",
         "examples": [
            "I’m from London.",
            "She got a letter from her friend.",
            "The train is from Paris."
         ]
      },
      {
         "id": 31,
         "word": "front",
         "role": "noun",
         "BrE": "/frʌnt/",
         "AmE": "/frʌnt/",
         "definition": "the part of something that faces forward",
         "examples": [
            "The front of the house is red.",
            "She stood at the front of the class.",
            "The front door was open."
         ]
      },
      {
         "id": 32,
         "word": "fruit",
         "role": "noun",
         "BrE": "/fruːt/",
         "AmE": "/fruːt/",
         "definition": "food like apples or bananas from plants",
         "examples": [
            "I eat fruit.",
            "She likes tropical fruit.",
            "Fruit is healthy for everyone."
         ]
      },
      {
         "id": 32,
         "word": "full",
         "role": "adjective",
         "BrE": "/fʊl/",
         "AmE": "/fʊl/",
         "definition": "containing as much as possible",
         "examples": [
            "The bag is full.",
            "Her cup is full of tea.",
            "The room was full of people."
         ]
      },
      {
         "id": 32,
         "word": "fun",
         "role": "noun",
         "BrE": "/fʌn/",
         "AmE": "/fʌn/",
         "definition": "enjoyment or pleasure",
         "examples": [
            "The game is fun.",
            "We had fun at the park.",
            "Swimming is always fun for kids."
         ]
      },
      {
         "id": 32,
         "word": "funny",
         "role": "adjective",
         "BrE": "/ˈfʌni/",
         "AmE": "/ˈfʌni/",
         "definition": "making you laugh",
         "examples": [
            "The movie is funny.",
            "His joke was very funny.",
            "She told a funny story in class."
         ]
      },
      {
         "id": 32,
         "word": "future",
         "role": "noun",
         "BrE": "/ˈfjuːtʃə(r)/",
         "AmE": "/ˈfjuːtʃər/",
         "definition": "the time that will come",
         "examples": [
            "The future is exciting.",
            "She plans for her future.",
            "What will the future bring for us?"
         ]
      },
      {
         "id": 32,
         "word": "game",
         "role": "noun",
         "BrE": "/ɡeɪm/",
         "AmE": "/ɡeɪm/",
         "definition": "an activity or sport with rules",
         "examples": [
            "I play a game.",
            "The game was exciting.",
            "They won the football game."
         ]
      },
      {
         "id": 32,
         "word": "garden",
         "role": "noun",
         "BrE": "/ˈɡɑːdn/",
         "AmE": "/ˈɡɑːrdn/",
         "definition": "a place where plants or flowers are grown",
         "examples": [
            "The garden is beautiful.",
            "She works in the garden.",
            "Their garden has many flowers."
         ]
      },
      {
         "id": 32,
         "word": "geography",
         "role": "noun",
         "BrE": "/dʒiˈɒɡrəfi/",
         "AmE": "/dʒiˈɑːɡrəfi/",
         "definition": "the study of the earth’s surface and countries",
         "examples": [
            "I study geography.",
            "Geography is her favorite subject.",
            "We learned about rivers in geography."
         ]
      },
      {
         "id": 32,
         "word": "get",
         "role": "verb",
         "BrE": "/ɡet/",
         "AmE": "/ɡet/",
         "definition": "to receive or obtain something",
         "examples": [
            "I get a gift.",
            "She got a new phone.",
            "He gets good grades in school."
         ]
      },
      {
         "id": 32,
         "word": "girl",
         "role": "noun",
         "BrE": "/ɡɜːl/",
         "AmE": "/ɡɜːrl/",
         "definition": "a female child",
         "examples": [
            "The girl is happy.",
            "She is a kind girl.",
            "The girl in my class loves music."
         ]
      },
      {
         "id": 33,
         "word": "girlfriend",
         "role": "noun",
         "BrE": "/ˈɡɜːlfrend/",
         "AmE": "/ˈɡɜːrlfrend/",
         "definition": "a woman or girl someone is having a romantic relationship with",
         "examples": [
            "His girlfriend is nice.",
            "My girlfriend likes to dance.",
            "She went shopping with her girlfriend."
         ]
      },
      {
         "id": 33,
         "word": "give",
         "role": "verb",
         "BrE": "/ɡɪv/",
         "AmE": "/ɡɪv/",
         "definition": "to hand something to someone",
         "examples": [
            "Give me the book.",
            "She gave him a gift.",
            "He gives his time to help others."
         ]
      },
      {
         "id": 33,
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
         "id": 33,
         "word": "go",
         "role": "verb",
         "BrE": "/ɡəʊ/",
         "AmE": "/ɡoʊ/",
         "definition": "to move or travel to a place",
         "examples": [
            "I go to school.",
            "She goes to the park.",
            "They went to London last week."
         ]
      },
      {
         "id": 33,
         "word": "good",
         "role": "adjective",
         "BrE": "/ɡʊd/",
         "AmE": "/ɡʊd/",
         "definition": "of high quality or pleasant",
         "examples": [
            "This is a good book.",
            "He is a good student.",
            "The food was really good today."
         ]
      },
      {
         "id": 33,
         "word": "goodbye",
         "role": "exclamation",
         "BrE": "/ˌɡʊdˈbaɪ/",
         "AmE": "/ˌɡʊdˈbaɪ/",
         "definition": "a way to say farewell",
         "examples": [
            "Goodbye, see you soon!",
            "She said goodbye and left.",
            "He waved goodbye to his friends."
         ]
      },
      {
         "id": 33,
         "word": "grandfather",
         "role": "noun",
         "BrE": "/ˈɡrænfɑːðə(r)/",
         "AmE": "/ˈɡrænfɑːðər/",
         "definition": "the father of your mother or father",
         "examples": [
            "My grandfather is old.",
            "Her grandfather tells stories.",
            "He visits his grandfather every Sunday."
         ]
      },
      {
         "id": 33,
         "word": "grandmother",
         "role": "noun",
         "BrE": "/ˈɡrænmʌðə(r)/",
         "AmE": "/ˈɡrænmʌðər/",
         "definition": "the mother of your mother or father",
         "examples": [
            "My grandmother is kind.",
            "She cooks with her grandmother.",
            "Her grandmother lives in a village."
         ]
      },
      {
         "id": 33,
         "word": "grandparent",
         "role": "noun",
         "BrE": "/ˈɡrænpeərənt/",
         "AmE": "/ˈɡrænperənt/",
         "definition": "a grandmother or grandfather",
         "examples": [
            "My grandparent is nice.",
            "Her grandparents live far away.",
            "The grandparents gave her a gift."
         ]
      },
      {
         "id": 33,
         "word": "great",
         "role": "adjective",
         "BrE": "/ɡreɪt/",
         "AmE": "/ɡreɪt/",
         "definition": "very good or important",
         "examples": [
            "It’s a great day.",
            "She had a great time.",
            "This is a great book to read."
         ]
      },
      {
         "id": 34,
         "word": "green",
         "role": "adjective",
         "BrE": "/ɡriːn/",
         "AmE": "/ɡriːn/",
         "definition": "having the color of grass or leaves",
         "examples": [
            "The grass is green.",
            "She wore a green dress.",
            "The green forest was beautiful."
         ]
      },
      {
         "id": 34,
         "word": "grey",
         "role": "adjective",
         "BrE": "/ɡreɪ/",
         "AmE": "/ɡreɪ/",
         "definition": "having the color between black and white",
         "examples": [
            "Her hair is grey.",
            "The sky was grey today.",
            "He bought a grey jacket."
         ]
      },
      {
         "id": 34,
         "word": "group",
         "role": "noun",
         "BrE": "/ɡruːp/",
         "AmE": "/ɡruːp/",
         "definition": "a number of people or things together",
         "examples": [
            "We work in a group.",
            "The group played a game.",
            "A group of students visited the museum."
         ]
      },
      {
         "id": 34,
         "word": "grow",
         "role": "verb",
         "BrE": "/ɡrəʊ/",
         "AmE": "/ɡroʊ/",
         "definition": "to increase in size or develop",
         "examples": [
            "Plants grow fast.",
            "She grows flowers in her garden.",
            "The city is growing quickly."
         ]
      },
      {
         "id": 34,
         "word": "guess",
         "role": "verb",
         "BrE": "/ɡes/",
         "AmE": "/ɡes/",
         "definition": "to try to give an answer without knowing if it’s correct",
         "examples": [
            "I guess the answer.",
            "She guessed his age.",
            "He guessed the number correctly."
         ]
      },
      {
         "id": 34,
         "word": "guitar",
         "role": "noun",
         "BrE": "/ɡɪˈtɑː(r)/",
         "AmE": "/ɡɪˈtɑːr/",
         "definition": "a musical instrument with strings",
         "examples": [
            "I play the guitar.",
            "Her guitar is new.",
            "He played the guitar at the concert."
         ]
      },
      {
         "id": 34,
         "word": "gym",
         "role": "noun",
         "BrE": "/dʒɪm/",
         "AmE": "/dʒɪm/",
         "definition": "a place for exercise or sports",
         "examples": [
            "I go to the gym.",
            "The gym is big and modern.",
            "She exercises in the gym every day."
         ]
      },
      {
         "id": 34,
         "word": "hair",
         "role": "noun",
         "BrE": "/heə(r)/",
         "AmE": "/her/",
         "definition": "the thin strands that grow on your head",
         "examples": [
            "Her hair is long.",
            "He cut his hair short.",
            "She dyed her hair red."
         ]
      },
      {
         "id": 34,
         "word": "half",
         "role": "noun",
         "BrE": "/hɑːf/",
         "AmE": "/hæf/",
         "definition": "one of two equal parts of something",
         "examples": [
            "I ate half the cake.",
            "Half the class was absent.",
            "She worked for half the day."
         ]
      },
      {
         "id": 34,
         "word": "hand",
         "role": "noun",
         "BrE": "/hænd/",
         "AmE": "/hænd/",
         "definition": "the part of the body at the end of the arm",
         "examples": [
            "Raise your hand.",
            "Her hand was cold.",
            "He wrote his name with his hand."
         ]
      },
      {
         "id": 35,
         "word": "happen",
         "role": "verb",
         "BrE": "/ˈhæpən/",
         "AmE": "/ˈhæpən/",
         "definition": "to take place, often by chance",
         "examples": [
            "What happened?",
            "The accident happened yesterday.",
            "Good things happen when you work hard."
         ]
      },
      {
         "id": 35,
         "word": "happy",
         "role": "adjective",
         "BrE": "/ˈhæpi/",
         "AmE": "/ˈhæpi/",
         "definition": "feeling or showing pleasure",
         "examples": [
            "I am happy today.",
            "She was happy with her gift.",
            "The happy children played in the park."
         ]
      },
      {
         "id": 35,
         "word": "hard",
         "role": "adjective",
         "BrE": "/hɑːd/",
         "AmE": "/hɑːrd/",
         "definition": "difficult or not soft",
         "examples": [
            "The test was hard.",
            "The ground is hard in winter.",
            "She worked hard to pass the exam."
         ]
      },
      {
         "id": 35,
         "word": "hat",
         "role": "noun",
         "BrE": "/hæt/",
         "AmE": "/hæt/",
         "definition": "a covering for the head",
         "examples": [
            "I wear a hat.",
            "Her hat is red.",
            "He bought a new hat for winter."
         ]
      },
      {
         "id": 35,
         "word": "hate",
         "role": "verb",
         "BrE": "/heɪt/",
         "AmE": "/heɪt/",
         "definition": "to strongly dislike something",
         "examples": [
            "I hate rain.",
            "She hates doing homework.",
            "He hates waking up early."
         ]
      },
      {
         "id": 35,
         "word": "have",
         "role": "verb",
         "BrE": "/hæv/",
         "AmE": "/hæv/",
         "definition": "to own or possess something",
         "examples": [
            "I have a dog.",
            "She has a new phone.",
            "They have two cars at home."
         ]
      },
      {
         "id": 35,
         "word": "have to",
         "role": "verb",
         "BrE": "/ˈhæv tə/",
         "AmE": "/ˈhæv tə/",
         "definition": "must do something because it is necessary",
         "examples": [
            "I have to study.",
            "She has to go to school.",
            "We have to finish this today."
         ]
      },
      {
         "id": 35,
         "word": "he",
         "role": "pronoun",
         "BrE": "/hiː/",
         "AmE": "/hiː/",
         "definition": "used to refer to a male person",
         "examples": [
            "He is my friend.",
            "He plays football well.",
            "He was late for the meeting."
         ]
      },
      {
         "id": 35,
         "word": "head",
         "role": "noun",
         "BrE": "/hed/",
         "AmE": "/hed/",
         "definition": "the part of the body above the neck",
         "examples": [
            "My head hurts.",
            "She has long hair on her head.",
            "He hit his head on the door."
         ]
      },
      {
         "id": 35,
         "word": "health",
         "role": "noun",
         "BrE": "/helθ/",
         "AmE": "/helθ/",
         "definition": "the condition of your body",
         "examples": [
            "Health is important.",
            "Her health is very good.",
            "Exercise is good for your health."
         ]
      },
      {
         "id": 36,
         "word": "healthy",
         "role": "adjective",
         "BrE": "/ˈhelθi/",
         "AmE": "/ˈhelθi/",
         "definition": "good for your health",
         "examples": [
            "Vegetables are healthy.",
            "She eats healthy food.",
            "A healthy lifestyle includes exercise."
         ]
      },
      {
         "id": 36,
         "word": "hear",
         "role": "verb",
         "BrE": "/hɪə(r)/",
         "AmE": "/hɪr/",
         "definition": "to receive sounds with your ears",
         "examples": [
            "I hear music.",
            "She heard a loud noise.",
            "He hears birds every morning."
         ]
      },
      {
         "id": 36,
         "word": "hello",
         "role": "exclamation",
         "BrE": "/həˈləʊ/",
         "AmE": "/həˈloʊ/",
         "definition": "a way to greet someone",
         "examples": [
            "Hello, how are you?",
            "She said hello to her friend.",
            "He shouted hello from across the street."
         ]
      },
      {
         "id": 36,
         "word": "help",
         "role": "verb",
         "BrE": "/help/",
         "AmE": "/help/",
         "definition": "to make something easier for someone",
         "examples": [
            "Help me, please.",
            "She helped her brother study.",
            "He helps his parents at home."
         ]
      },
      {
         "id": 36,
         "word": "her",
         "role": "pronoun",
         "BrE": "/hə(r)/",
         "AmE": "/hər/",
         "definition": "used to refer to a female person",
         "examples": [
            "I gave her a book.",
            "Her dress is beautiful.",
            "She lost her keys yesterday."
         ]
      },
      {
         "id": 36,
         "word": "here",
         "role": "adverb",
         "BrE": "/hɪə(r)/",
         "AmE": "/hɪr/",
         "definition": "in or to this place",
         "examples": [
            "Come here, please.",
            "She lives here in this town.",
            "The book is here on the table."
         ]
      },
      {
         "id": 36,
         "word": "hey",
         "role": "exclamation",
         "BrE": "/heɪ/",
         "AmE": "/heɪ/",
         "definition": "a way to get attention or greet someone",
         "examples": [
            "Hey, look at this!",
            "Hey, how are you today?",
            "She shouted hey to her friend."
         ]
      },
      {
         "id": 36,
         "word": "hi",
         "role": "exclamation",
         "BrE": "/haɪ/",
         "AmE": "/haɪ/",
         "definition": "an informal way to say hello",
         "examples": [
            "Hi, nice to meet you!",
            "She said hi to everyone.",
            "He waved and said hi."
         ]
      },
      {
         "id": 36,
         "word": "high",
         "role": "adjective",
         "BrE": "/haɪ/",
         "AmE": "/haɪ/",
         "definition": "having a large distance from bottom to top",
         "examples": [
            "The mountain is high.",
            "She climbed a high tree.",
            "The high building has many floors."
         ]
      },
      {
         "id": 36,
         "word": "him",
         "role": "pronoun",
         "BrE": "/hɪm/",
         "AmE": "/hɪm/",
         "definition": "used to refer to a male person",
         "examples": [
            "I saw him yesterday.",
            "She gave him a book.",
            "The teacher helped him with math."
         ]
      },
      {
         "id": 37,
         "word": "his",
         "role": "pronoun",
         "BrE": "/hɪz/",
         "AmE": "/hɪz/",
         "definition": "belonging to a male person",
         "examples": [
            "This is his book.",
            "His car is new.",
            "She borrowed his pencil."
         ]
      },
      {
         "id": 37,
         "word": "history",
         "role": "noun",
         "BrE": "/ˈhɪstri/",
         "AmE": "/ˈhɪstri/",
         "definition": "the study of past events",
         "examples": [
            "I like history.",
            "History class is interesting.",
            "She studies the history of her country."
         ]
      },
      {
         "id": 37,
         "word": "hobby",
         "role": "noun",
         "BrE": "/ˈhɒbi/",
         "AmE": "/ˈhɑːbi/",
         "definition": "an activity you enjoy doing in your free time",
         "examples": [
            "My hobby is reading.",
            "Her hobby is painting.",
            "His favorite hobby is playing soccer."
         ]
      },
      {
         "id": 37,
         "word": "holiday",
         "role": "noun",
         "BrE": "/ˈhɒlədeɪ/",
         "AmE": "/ˈhɑːlədeɪ/",
         "definition": "a time when you do not work or go to school",
         "examples": [
            "I love holidays.",
            "We went on holiday to the beach.",
            "The school holiday is next week."
         ]
      },
      {
         "id": 37,
         "word": "home",
         "role": "noun",
         "BrE": "/həʊm/",
         "AmE": "/hoʊm/",
         "definition": "the place where you live",
         "examples": [
            "I am at home.",
            "Her home is big.",
            "He went home after school."
         ]
      },
      {
         "id": 37,
         "word": "homework",
         "role": "noun",
         "BrE": "/ˈhəʊmwɜːk/",
         "AmE": "/ˈhoʊmwɜːrk/",
         "definition": "school work you do at home",
         "examples": [
            "I do my homework.",
            "Her homework was difficult.",
            "He finished his homework early."
         ]
      },
      {
         "id": 37,
         "word": "hope",
         "role": "verb",
         "BrE": "/həʊp/",
         "AmE": "/hoʊp/",
         "definition": "to want something to happen",
         "examples": [
            "I hope it’s sunny.",
            "She hopes to pass the test.",
            "He hopes to visit his friend soon."
         ]
      },
      {
         "id": 37,
         "word": "horse",
         "role": "noun",
         "BrE": "/hɔːs/",
         "AmE": "/hɔːrs/",
         "definition": "a large animal used for riding or pulling things",
         "examples": [
            "The horse is fast.",
            "She rides a horse.",
            "The horse ran across the field."
         ]
      },
      {
         "id": 37,
         "word": "hospital",
         "role": "noun",
         "BrE": "/ˈhɒspɪtl/",
         "AmE": "/ˈhɑːspɪtl/",
         "definition": "a place where sick people are treated",
         "examples": [
            "The hospital is big.",
            "She visited the hospital.",
            "He stayed in the hospital for a week."
         ]
      },
      {
         "id": 37,
         "word": "hot",
         "role": "adjective",
         "BrE": "/hɒt/",
         "AmE": "/hɑːt/",
         "definition": "having a high temperature",
         "examples": [
            "The tea is hot.",
            "It’s hot outside today.",
            "The hot soup warmed her hands."
         ]
      },
      {
         "id": 38,
         "word": "hotel",
         "role": "noun",
         "BrE": "/həʊˈtel/",
         "AmE": "/hoʊˈtel/",
         "definition": "a place where people stay and pay for a room",
         "examples": [
            "We stayed in a hotel.",
            "The hotel is near the beach.",
            "She booked a hotel for the weekend."
         ]
      },
      {
         "id": 38,
         "word": "hour",
         "role": "noun",
         "BrE": "/ˈaʊə(r)/",
         "AmE": "/ˈaʊər/",
         "definition": "a period of 60 minutes",
         "examples": [
            "I waited an hour.",
            "The class lasts one hour.",
            "She studied for two hours yesterday."
         ]
      },
      {
         "id": 38,
         "word": "house",
         "role": "noun",
         "BrE": "/haʊs/",
         "AmE": "/haʊs/",
         "definition": "a building where people live",
         "examples": [
            "My house is big.",
            "Her house has a garden.",
            "They live in a small house."
         ]
      },
      {
         "id": 38,
         "word": "how",
         "role": "adverb",
         "BrE": "/haʊ/",
         "AmE": "/haʊ/",
         "definition": "in what way or to what extent",
         "examples": [
            "How are you?",
            "How do you spell this word?",
            "How did she find the book?"
         ]
      },
      {
         "id": 38,
         "word": "huge",
         "role": "adjective",
         "BrE": "/hjuːdʒ/",
         "AmE": "/hjuːdʒ/",
         "definition": "very big",
         "examples": [
            "The elephant is huge.",
            "He has a huge dog.",
            "The huge mountain was beautiful."
         ]
      },
      {
         "id": 38,
         "word": "hundred",
         "role": "number",
         "BrE": "/ˈhʌndrəd/",
         "AmE": "/ˈhʌndrəd/",
         "definition": "the number 100",
         "examples": [
            "I have hundred books.",
            "She walked a hundred steps.",
            "The shop sells a hundred items."
         ]
      },
      {
         "id": 38,
         "word": "hungry",
         "role": "adjective",
         "BrE": "/ˈhʌŋɡri/",
         "AmE": "/ˈhʌŋɡri/",
         "definition": "wanting or needing food",
         "examples": [
            "I am hungry.",
            "The dog looks hungry.",
            "She was hungry after the game."
         ]
      },
      {
         "id": 38,
         "word": "hurry",
         "role": "verb",
         "BrE": "/ˈhʌri/",
         "AmE": "/ˈhɜːri/",
         "definition": "to move or do something quickly",
         "examples": [
            "Hurry, we’re late!",
            "She hurried to the bus stop.",
            "He hurried to finish his work."
         ]
      },
      {
         "id": 38,
         "word": "husband",
         "role": "noun",
         "BrE": "/ˈhʌzbənd/",
         "AmE": "/ˈhʌzbənd/",
         "definition": "the man a woman is married to",
         "examples": [
            "Her husband is kind.",
            "My husband works in a shop.",
            "They went on holiday with her husband."
         ]
      },
      {
         "id": 38,
         "word": "I",
         "role": "pronoun",
         "BrE": "/aɪ/",
         "AmE": "/aɪ/",
         "definition": "used to refer to yourself",
         "examples": [
            "I like to read.",
            "I am going to school.",
            "I bought a new book yesterday."
         ]
      },
      {
         "id": 39,
         "word": "ice",
         "role": "noun",
         "BrE": "/aɪs/",
         "AmE": "/aɪs/",
         "definition": "frozen water",
         "examples": [
            "Ice is cold.",
            "Put ice in the drink.",
            "The ice on the lake was thick."
         ]
      },
      {
         "id": 39,
         "word": "idea",
         "role": "noun",
         "BrE": "/aɪˈdɪə/",
         "AmE": "/aɪˈdiːə/",
         "definition": "a plan or suggestion",
         "examples": [
            "I have an idea.",
            "Her idea was good.",
            "His idea for the party was fun."
         ]
      },
      {
         "id": 39,
         "word": "if",
         "role": "conjunction",
         "BrE": "/ɪf/",
         "AmE": "/ɪf/",
         "definition": "used to talk about possibilities",
         "examples": [
            "If it rains, I stay home.",
            "She comes if she is free.",
            "If you study, you will pass."
         ]
      },
      {
         "id": 39,
         "word": "important",
         "role": "adjective",
         "BrE": "/ɪmˈpɔːtnt/",
         "AmE": "/ɪmˈpɔːrtnt/",
         "definition": "having a big effect or value",
         "examples": [
            "This test is important.",
            "Her job is very important.",
            "It’s important to eat healthy food."
         ]
      },
      {
         "id": 39,
         "word": "in",
         "role": "preposition",
         "BrE": "/ɪn/",
         "AmE": "/ɪn/",
         "definition": "used to show place, time, or manner",
         "examples": [
            "I live in a house.",
            "She studies in the morning.",
            "The book is in the bag."
         ]
      },
      {
         "id": 39,
         "word": "information",
         "role": "noun",
         "BrE": "/ˌɪnfəˈmeɪʃn/",
         "AmE": "/ˌɪnfərˈmeɪʃn/",
         "definition": "facts or details about something",
         "examples": [
            "I need information.",
            "The book has information about animals.",
            "She gave me information about the trip."
         ]
      },
      {
         "id": 39,
         "word": "inside",
         "role": "preposition",
         "BrE": "/ˌɪnˈsaɪd/",
         "AmE": "/ˌɪnˈsaɪd/",
         "definition": "within something",
         "examples": [
            "The cat is inside.",
            "Put it inside the box.",
            "She stayed inside during the rain."
         ]
      },
      {
         "id": 39,
         "word": "interest",
         "role": "noun",
         "BrE": "/ˈɪntrəst/",
         "AmE": "/ˈɪntrəst/",
         "definition": "something you enjoy or want to know about",
         "examples": [
            "My interest is music.",
            "She has an interest in art.",
            "His interests include sports and books."
         ]
      },
      {
         "id": 39,
         "word": "interesting",
         "role": "adjective",
         "BrE": "/ˈɪntrəstɪŋ/",
         "AmE": "/ˈɪntrəstɪŋ/",
         "definition": "making you want to know more",
         "examples": [
            "The book is interesting.",
            "Her story was very interesting.",
            "I found the film really interesting."
         ]
      },
      {
         "id": 39,
         "word": "internet",
         "role": "noun",
         "BrE": "/ˈɪntənet/",
         "AmE": "/ˈɪntərnet/",
         "definition": "a system for connecting computers worldwide",
         "examples": [
            "I use the internet.",
            "She found it on the internet.",
            "The internet helps us learn new things."
         ]
      },
      {
         "id": 40,
         "word": "into",
         "role": "preposition",
         "BrE": "/ˈɪntə/",
         "AmE": "/ˈɪntə/",
         "definition": "moving toward the inside of something",
         "examples": [
            "Go into the room.",
            "She jumped into the water.",
            "He put the book into his bag."
         ]
      },
      {
         "id": 40,
         "word": "invite",
         "role": "verb",
         "BrE": "/ɪnˈvaɪt/",
         "AmE": "/ɪnˈvaɪt/",
         "definition": "to ask someone to come to an event",
         "examples": [
            "I invite my friend.",
            "She invited me to her party.",
            "He invited his family for dinner."
         ]
      },
      {
         "id": 40,
         "word": "it",
         "role": "pronoun",
         "BrE": "/ɪt/",
         "AmE": "/ɪt/",
         "definition": "used to refer to a thing or situation",
         "examples": [
            "It is a nice book.",
            "It’s raining outside.",
            "I like it when you smile."
         ]
      },
      {
         "id": 40,
         "word": "January",
         "role": "noun",
         "BrE": "/ˈdʒænjuəri/",
         "AmE": "/ˈdʒænjuˌeri/",
         "definition": "the first month of the year",
         "examples": [
            "January is cold.",
            "My birthday is in January.",
            "It snows in January here."
         ]
      },
      {
         "id": 40,
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
         "id": 40,
         "word": "job",
         "role": "noun",
         "BrE": "/dʒɒb/",
         "AmE": "/dʒɑːb/",
         "definition": "work that you do for money",
         "examples": [
            "She has a job.",
            "His job is in an office.",
            "I need a job this summer."
         ]
      },
      {
         "id": 40,
         "word": "join",
         "role": "verb",
         "BrE": "/dʒɔɪn/",
         "AmE": "/dʒɔɪn/",
         "definition": "to become part of a group or activity",
         "examples": [
            "Join our team.",
            "She joined a club.",
            "He joined the game with his friends."
         ]
      },
      {
         "id": 40,
         "word": "journey",
         "role": "noun",
         "BrE": "/ˈdʒɜːni/",
         "AmE": "/ˈdʒɜːrni/",
         "definition": "a trip from one place to another",
         "examples": [
            "The journey was long.",
            "Her journey took two hours.",
            "We enjoyed the journey to the city."
         ]
      },
      {
         "id": 40,
         "word": "juice",
         "role": "noun",
         "BrE": "/dʒuːs/",
         "AmE": "/dʒuːs/",
         "definition": "a drink made from fruit",
         "examples": [
            "I drink juice.",
            "She likes orange juice.",
            "He bought apple juice at the shop."
         ]
      },
      {
         "id": 40,
         "word": "July",
         "role": "noun",
         "BrE": "/dʒuˈlaɪ/",
         "AmE": "/dʒuˈlaɪ/",
         "definition": "the seventh month of the year",
         "examples": [
            "July is warm.",
            "We go on holiday in July.",
            "Her birthday is in July."
         ]
      },
      {
         "id": 41,
         "word": "June",
         "role": "noun",
         "BrE": "/dʒuːn/",
         "AmE": "/dʒuːn/",
         "definition": "the sixth month of the year",
         "examples": [
            "June is my favorite month.",
            "School ends in June.",
            "It’s warm in June here."
         ]
      },
      {
         "id": 41,
         "word": "just",
         "role": "adverb",
         "BrE": "/dʒʌst/",
         "AmE": "/dʒʌst/",
         "definition": "exactly or only a moment ago",
         "examples": [
            "I just finished.",
            "She just left the room.",
            "It’s just a small problem."
         ]
      },
      {
         "id": 41,
         "word": "keep",
         "role": "verb",
         "BrE": "/kiːp/",
         "AmE": "/kiːp/",
         "definition": "to have something and not give it away",
         "examples": [
            "Keep this book.",
            "She keeps her toys in a box.",
            "He kept the letter for years."
         ]
      },
      {
         "id": 41,
         "word": "key",
         "role": "noun",
         "BrE": "/kiː/",
         "AmE": "/kiː/",
         "definition": "a piece of metal used to lock or unlock something",
         "examples": [
            "I lost my key.",
            "The key opens the door.",
            "She found her car key."
         ]
      },
      {
         "id": 41,
         "word": "kind",
         "role": "adjective",
         "BrE": "/kaɪnd/",
         "AmE": "/kaɪnd/",
         "definition": "friendly and helpful",
         "examples": [
            "She is kind.",
            "He was kind to the dog.",
            "The kind teacher helped everyone."
         ]
      },
      {
         "id": 41,
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
         "id": 41,
         "word": "know",
         "role": "verb",
         "BrE": "/nəʊ/",
         "AmE": "/noʊ/",
         "definition": "to have information in your mind",
         "examples": [
            "I know her name.",
            "She knows the answer.",
            "He knows a lot about animals."
         ]
      },
      {
         "id": 41,
         "word": "language",
         "role": "noun",
         "BrE": "/ˈlæŋɡwɪdʒ/",
         "AmE": "/ˈlæŋɡwɪdʒ/",
         "definition": "a system of communication using words",
         "examples": [
            "I learn a language.",
            "English is a language.",
            "She speaks two languages fluently."
         ]
      },
      {
         "id": 41,
         "word": "large",
         "role": "adjective",
         "BrE": "/lɑːdʒ/",
         "AmE": "/lɑːrdʒ/",
         "definition": "big in size or amount",
         "examples": [
            "The house is large.",
            "She has a large bag.",
            "A large dog ran in the park."
         ]
      },
      {
         "id": 41,
         "word": "last",
         "role": "adjective",
         "BrE": "/lɑːst/",
         "AmE": "/læst/",
         "definition": "most recent or final",
         "examples": [
            "Last week was fun.",
            "The last bus left early.",
            "She read the last page."
         ]
      },
      {
         "id": 42,
         "word": "late",
         "role": "adjective",
         "BrE": "/leɪt/",
         "AmE": "/leɪt/",
         "definition": "happening or arriving after the expected time",
         "examples": [
            "I was late today.",
            "The train was late again.",
            "She arrived late for the meeting."
         ]
      },
      {
         "id": 42,
         "word": "laugh",
         "role": "verb",
         "BrE": "/lɑːf/",
         "AmE": "/læf/",
         "definition": "to make sounds showing you are happy or amused",
         "examples": [
            "I laugh at jokes.",
            "She laughed at the funny movie.",
            "He laughs when he hears a joke."
         ]
      },
      {
         "id": 42,
         "word": "learn",
         "role": "verb",
         "BrE": "/lɜːn/",
         "AmE": "/lɜːrn/",
         "definition": "to gain knowledge or a skill",
         "examples": [
            "I learn English.",
            "She learned to swim.",
            "He is learning to play the piano."
         ]
      },
      {
         "id": 42,
         "word": "leave",
         "role": "verb",
         "BrE": "/liːv/",
         "AmE": "/liːv/",
         "definition": "to go away from a place",
         "examples": [
            "I leave home early.",
            "She left the room quickly.",
            "He leaves for school at 8 a.m."
         ]
      },
      {
         "id": 42,
         "word": "left",
         "role": "adjective",
         "BrE": "/left/",
         "AmE": "/left/",
         "definition": "on or toward the side of the body where the heart is",
         "examples": [
            "My left hand hurts.",
            "Turn left at the corner.",
            "She writes with her left hand."
         ]
      },
      {
         "id": 42,
         "word": "leg",
         "role": "noun",
         "BrE": "/leɡ/",
         "AmE": "/leɡ/",
         "definition": "the part of the body used for walking",
         "examples": [
            "My leg is strong.",
            "The dog hurt its leg.",
            "She broke her leg playing football."
         ]
      },
      {
         "id": 42,
         "word": "lesson",
         "role": "noun",
         "BrE": "/ˈlesn/",
         "AmE": "/ˈlesn/",
         "definition": "a period of time for learning something",
         "examples": [
            "I have a lesson today.",
            "Her lesson was about math.",
            "The English lesson was fun."
         ]
      },
      {
         "id": 42,
         "word": "let",
         "role": "verb",
         "BrE": "/let/",
         "AmE": "/let/",
         "definition": "to allow something to happen",
         "examples": [
            "Let me help you.",
            "She let the dog out.",
            "He lets his sister use his phone."
         ]
      },
      {
         "id": 42,
         "word": "letter",
         "role": "noun",
         "BrE": "/ˈletə(r)/",
         "AmE": "/ˈletər/",
         "definition": "a written message sent to someone",
         "examples": [
            "I wrote a letter.",
            "She got a letter from a friend.",
            "The letter arrived yesterday."
         ]
      },
      {
         "id": 42,
         "word": "library",
         "role": "noun",
         "BrE": "/ˈlaɪbrəri/",
         "AmE": "/ˈlaɪbreri/",
         "definition": "a place where books are kept for borrowing",
         "examples": [
            "I go to the library.",
            "The library has many books.",
            "She studies in the library every day."
         ]
      },
      {
         "id": 43,
         "word": "life",
         "role": "noun",
         "BrE": "/laɪf/",
         "AmE": "/laɪf/",
         "definition": "the state of being alive",
         "examples": [
            "Life is beautiful.",
            "Her life is busy.",
            "He enjoys a quiet life."
         ]
      },
      {
         "id": 43,
         "word": "light",
         "role": "noun",
         "BrE": "/laɪt/",
         "AmE": "/laɪt/",
         "definition": "something that makes things visible",
         "examples": [
            "Turn on the light.",
            "The light is bright.",
            "She needs a light to read."
         ]
      },
      {
         "id": 43,
         "word": "like",
         "role": "verb",
         "BrE": "/laɪk/",
         "AmE": "/laɪk/",
         "definition": "to enjoy or think something is nice",
         "examples": [
            "I like ice cream.",
            "She likes to read books.",
            "He likes playing football with friends."
         ]
      },
      {
         "id": 43,
         "word": "line",
         "role": "noun",
         "BrE": "/laɪn/",
         "AmE": "/laɪn/",
         "definition": "a long, thin mark",
         "examples": [
            "Draw a line.",
            "The line is straight.",
            "She wrote her name on the line."
         ]
      },
      {
         "id": 43,
         "word": "listen",
         "role": "verb",
         "BrE": "/ˈlɪsn/",
         "AmE": "/ˈlɪsn/",
         "definition": "to pay attention to sounds",
         "examples": [
            "Listen to the music.",
            "She listens to the teacher.",
            "He listened to the radio all day."
         ]
      },
      {
         "id": 43,
         "word": "little",
         "role": "adjective",
         "BrE": "/ˈlɪtl/",
         "AmE": "/ˈlɪtl/",
         "definition": "small in size or amount",
         "examples": [
            "The cat is little.",
            "She has a little bag.",
            "He ate a little piece of cake."
         ]
      },
      {
         "id": 43,
         "word": "live",
         "role": "verb",
         "BrE": "/lɪv/",
         "AmE": "/lɪv/",
         "definition": "to have your home in a place",
         "examples": [
            "I live in a city.",
            "She lives with her parents.",
            "They live near the school."
         ]
      },
      {
         "id": 43,
         "word": "long",
         "role": "adjective",
         "BrE": "/lɒŋ/",
         "AmE": "/lɔːŋ/",
         "definition": "having a great length or time",
         "examples": [
            "The road is long.",
            "Her hair is very long.",
            "The long movie was exciting."
         ]
      },
      {
         "id": 43,
         "word": "look",
         "role": "verb",
         "BrE": "/lʊk/",
         "AmE": "/lʊk/",
         "definition": "to use your eyes to see",
         "examples": [
            "Look at the bird.",
            "She looked at the picture.",
            "He looks happy today."
         ]
      },
      {
         "id": 43,
         "word": "lose",
         "role": "verb",
         "BrE": "/luːz/",
         "AmE": "/luːz/",
         "definition": "to not be able to find something",
         "examples": [
            "I lost my pen.",
            "She lost her bag yesterday.",
            "He never loses his keys."
         ]
      },
      {
         "id": 44,
         "word": "lot",
         "role": "noun",
         "BrE": "/lɒt/",
         "AmE": "/lɑːt/",
         "definition": "a large number or amount",
         "examples": [
            "I have a lot of books.",
            "She eats a lot of fruit.",
            "A lot of people came to the party."
         ]
      },
      {
         "id": 44,
         "word": "love",
         "role": "verb",
         "BrE": "/lʌv/",
         "AmE": "/lʌv/",
         "definition": "to like something very much",
         "examples": [
            "I love music.",
            "She loves her dog.",
            "He loves to play football."
         ]
      },
      {
         "id": 44,
         "word": "low",
         "role": "adjective",
         "BrE": "/ləʊ/",
         "AmE": "/loʊ/",
         "definition": "not high or tall",
         "examples": [
            "The wall is low.",
            "She has a low table.",
            "The low bridge was old."
         ]
      },
      {
         "id": 44,
         "word": "lunch",
         "role": "noun",
         "BrE": "/lʌntʃ/",
         "AmE": "/lʌntʃ/",
         "definition": "a meal eaten in the middle of the day",
         "examples": [
            "I eat lunch at noon.",
            "Her lunch was a sandwich.",
            "We had lunch at the park."
         ]
      },
      {
         "id": 44,
         "word": "magazine",
         "role": "noun",
         "BrE": "/ˌmæɡəˈziːn/",
         "AmE": "/ˌmæɡəˈziːn/",
         "definition": "a thin book with pictures and stories",
         "examples": [
            "I read a magazine.",
            "She bought a fashion magazine.",
            "The magazine has new pictures."
         ]
      },
      {
         "id": 44,
         "word": "make",
         "role": "verb",
         "BrE": "/meɪk/",
         "AmE": "/meɪk/",
         "definition": "to create or produce something",
         "examples": [
            "I make a cake.",
            "She made a drawing.",
            "He makes toys for his kids."
         ]
      },
      {
         "id": 44,
         "word": "man",
         "role": "noun",
         "BrE": "/mæn/",
         "AmE": "/mæn/",
         "definition": "an adult male person",
         "examples": [
            "The man is tall.",
            "A man helped me.",
            "The man in the shop was kind."
         ]
      },
      {
         "id": 44,
         "word": "many",
         "role": "determiner",
         "BrE": "/ˈmeni/",
         "AmE": "/ˈmeni/",
         "definition": "a large number of things or people",
         "examples": [
            "I have many books.",
            "Many people like music.",
            "She has many friends at school."
         ]
      },
      {
         "id": 44,
         "word": "March",
         "role": "noun",
         "BrE": "/mɑːtʃ/",
         "AmE": "/mɑːrtʃ/",
         "definition": "the third month of the year",
         "examples": [
            "March is rainy.",
            "Her birthday is in March.",
            "We go hiking in March."
         ]
      },
      {
         "id": 44,
         "word": "market",
         "role": "noun",
         "BrE": "/ˈmɑːkɪt/",
         "AmE": "/ˈmɑːrkɪt/",
         "definition": "a place where things are bought and sold",
         "examples": [
            "I go to the market.",
            "The market has fresh fruit.",
            "She bought vegetables at the market."
         ]
      },
      {
         "id": 45,
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
         "id": 45,
         "word": "match",
         "role": "noun",
         "BrE": "/mætʃ/",
         "AmE": "/mætʃ/",
         "definition": "a sports competition between two teams",
         "examples": [
            "I watched a match.",
            "The football match was exciting.",
            "She played in a tennis match."
         ]
      },
      {
         "id": 45,
         "word": "May",
         "role": "noun",
         "BrE": "/meɪ/",
         "AmE": "/meɪ/",
         "definition": "the fifth month of the year",
         "examples": [
            "May is warm.",
            "My birthday is in May.",
            "Flowers bloom in May."
         ]
      },
      {
         "id": 45,
         "word": "me",
         "role": "pronoun",
         "BrE": "/miː/",
         "AmE": "/miː/",
         "definition": "used to refer to yourself as the object",
         "examples": [
            "Give it to me.",
            "She helped me with homework.",
            "He called me yesterday."
         ]
      },
      {
         "id": 45,
         "word": "meal",
         "role": "noun",
         "BrE": "/miːl/",
         "AmE": "/miːl/",
         "definition": "food eaten at a specific time",
         "examples": [
            "I eat a meal.",
            "Her meal was delicious.",
            "We had a big meal together."
         ]
      },
      {
         "id": 45,
         "word": "meat",
         "role": "noun",
         "BrE": "/miːt/",
         "AmE": "/miːt/",
         "definition": "food from animals",
         "examples": [
            "I eat meat.",
            "She cooked meat for dinner.",
            "The meat was fresh from the market."
         ]
      },
      {
         "id": 45,
         "word": "meet",
         "role": "verb",
         "BrE": "/miːt/",
         "AmE": "/miːt/",
         "definition": "to see and talk to someone",
         "examples": [
            "I meet my friend.",
            "She met her teacher.",
            "They meet every week at the park."
         ]
      },
      {
         "id": 45,
         "word": "member",
         "role": "noun",
         "BrE": "/ˈmembə(r)/",
         "AmE": "/ˈmembər/",
         "definition": "a person who belongs to a group",
         "examples": [
            "I am a member.",
            "She is a club member.",
            "He became a member of the team."
         ]
      },
      {
         "id": 45,
         "word": "memory",
         "role": "noun",
         "BrE": "/ˈmeməri/",
         "AmE": "/ˈmeməri/",
         "definition": "something you remember",
         "examples": [
            "I have a good memory.",
            "Her memory of the trip is clear.",
            "He shared a memory from school."
         ]
      },
      {
         "id": 45,
         "word": "message",
         "role": "noun",
         "BrE": "/ˈmesɪdʒ/",
         "AmE": "/ˈmesɪdʒ/",
         "definition": "a short piece of information sent to someone",
         "examples": [
            "I sent a message.",
            "She got a message from him.",
            "The message was about the party."
         ]
      },
      {
         "id": 46,
         "word": "milk",
         "role": "noun",
         "BrE": "/mɪlk/",
         "AmE": "/mɪlk/",
         "definition": "a white liquid from cows or other animals",
         "examples": [
            "I drink milk.",
            "She bought milk at the shop.",
            "Milk is good for your health."
         ]
      },
      {
         "id": 46,
         "word": "minute",
         "role": "noun",
         "BrE": "/ˈmɪnɪt/",
         "AmE": "/ˈmɪnɪt/",
         "definition": "a period of 60 seconds",
         "examples": [
            "Wait a minute.",
            "The bus comes in five minutes.",
            "She was late by ten minutes."
         ]
      },
      {
         "id": 46,
         "word": "miss",
         "role": "verb",
         "BrE": "/mɪs/",
         "AmE": "/mɪs/",
         "definition": "to not catch or see something",
         "examples": [
            "I miss the bus.",
            "She missed the movie.",
            "He misses his family a lot."
         ]
      },
      {
         "id": 46,
         "word": "money",
         "role": "noun",
         "BrE": "/ˈmʌni/",
         "AmE": "/ˈmʌni/",
         "definition": "coins or notes used to buy things",
         "examples": [
            "I have some money.",
            "She spent money on clothes.",
            "He saved money for a bike."
         ]
      },
      {
         "id": 46,
         "word": "month",
         "role": "noun",
         "BrE": "/mʌnθ/",
         "AmE": "/mʌnθ/",
         "definition": "a period of about four weeks",
         "examples": [
            "This month is busy.",
            "She travels every month.",
            "The rent is due next month."
         ]
      },
      {
         "id": 46,
         "word": "Monday",
         "role": "noun",
         "BrE": "/ˈmʌndeɪ/",
         "AmE": "/ˈmʌndeɪ/",
         "definition": "the day after Sunday",
         "examples": [
            "Monday is a school day.",
            "We meet every Monday.",
            "She starts work on Monday."
         ]
      },
      {
         "id": 46,
         "word": "more",
         "role": "adverb",
         "BrE": "/mɔː(r)/",
         "AmE": "/mɔːr/",
         "definition": "a greater amount or number",
         "examples": [
            "I need more water.",
            "She wants more books.",
            "He ate more than his sister."
         ]
      },
      {
         "id": 46,
         "word": "morning",
         "role": "noun",
         "BrE": "/ˈmɔːnɪŋ/",
         "AmE": "/ˈmɔːrnɪŋ/",
         "definition": "the time from midnight to noon",
         "examples": [
            "Good morning!",
            "I study in the morning.",
            "The morning was cold and sunny."
         ]
      },
      {
         "id": 46,
         "word": "mother",
         "role": "noun",
         "BrE": "/ˈmʌðə(r)/",
         "AmE": "/ˈmʌðər/",
         "definition": "a female parent",
         "examples": [
            "My mother is kind.",
            "Her mother cooks well.",
            "She called her mother yesterday."
         ]
      },
      {
         "id": 46,
         "word": "mountain",
         "role": "noun",
         "BrE": "/ˈmaʊntən/",
         "AmE": "/ˈmaʊntən/",
         "definition": "a very high hill",
         "examples": [
            "The mountain is tall.",
            "We climbed a mountain.",
            "The mountain has snow on top."
         ]
      },
      {
         "id": 47,
         "word": "mouse",
         "role": "noun",
         "BrE": "/maʊs/",
         "AmE": "/maʊs/",
         "definition": "a small animal with a long tail",
         "examples": [
            "The mouse is small.",
            "A mouse ran across the floor.",
            "She saw a mouse in the kitchen."
         ]
      },
      {
         "id": 47,
         "word": "mouth",
         "role": "noun",
         "BrE": "/maʊθ/",
         "AmE": "/maʊθ/",
         "definition": "the part of the face used for eating and speaking",
         "examples": [
            "My mouth is dry.",
            "She opened her mouth to speak.",
            "He put food in his mouth."
         ]
      },
      {
         "id": 47,
         "word": "move",
         "role": "verb",
         "BrE": "/muːv/",
         "AmE": "/muːv/",
         "definition": "to change position or place",
         "examples": [
            "Move the chair.",
            "She moved to a new city.",
            "He moved the table to the corner."
         ]
      },
      {
         "id": 47,
         "word": "movie",
         "role": "noun",
         "BrE": "/ˈmuːvi/",
         "AmE": "/ˈmuːvi/",
         "definition": "a story shown on a screen",
         "examples": [
            "I watched a movie.",
            "The movie was funny.",
            "She loves action movies."
         ]
      },
      {
         "id": 47,
         "word": "much",
         "role": "adverb",
         "BrE": "/mʌtʃ/",
         "AmE": "/mʌtʃ/",
         "definition": "a large amount",
         "examples": [
            "I don’t have much time.",
            "She ate too much cake.",
            "He doesn’t talk much in class."
         ]
      },
      {
         "id": 47,
         "word": "mum",
         "role": "noun",
         "BrE": "/mʌm/",
         "AmE": "/mʌm/",
         "definition": "an informal word for mother",
         "examples": [
            "My mum is nice.",
            "Her mum made dinner.",
            "She helps her mum at home."
         ]
      },
      {
         "id": 47,
         "word": "museum",
         "role": "noun",
         "BrE": "/mjuˈziːəm/",
         "AmE": "/mjuˈziːəm/",
         "definition": "a place where old or interesting things are shown",
         "examples": [
            "I visited a museum.",
            "The museum has old art.",
            "She works in a history museum."
         ]
      },
      {
         "id": 47,
         "word": "music",
         "role": "noun",
         "BrE": "/ˈmjuːzɪk/",
         "AmE": "/ˈmjuːzɪk/",
         "definition": "sounds arranged in a way that is pleasant to hear",
         "examples": [
            "I listen to music.",
            "She loves pop music.",
            "The music at the party was loud."
         ]
      },
      {
         "id": 47,
         "word": "must",
         "role": "modal verb",
         "BrE": "/mʌst/",
         "AmE": "/mʌst/",
         "definition": "used to show something is necessary",
         "examples": [
            "I must go now.",
            "She must study for the test.",
            "We must finish this by tomorrow."
         ]
      },
      {
         "id": 47,
         "word": "my",
         "role": "pronoun",
         "BrE": "/maɪ/",
         "AmE": "/maɪ/",
         "definition": "belonging to me",
         "examples": [
            "This is my book.",
            "My dog is small.",
            "She borrowed my pencil."
         ]
      },
      {
         "id": 48,
         "word": "name",
         "role": "noun",
         "BrE": "/neɪm/",
         "AmE": "/neɪm/",
         "definition": "the word used to call a person or thing",
         "examples": [
            "My name is Anna.",
            "What is your name?",
            "She wrote her name on the paper."
         ]
      },
      {
         "id": 48,
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
         "id": 48,
         "word": "need",
         "role": "verb",
         "BrE": "/niːd/",
         "AmE": "/niːd/",
         "definition": "to require something",
         "examples": [
            "I need water.",
            "She needs a new pen.",
            "He needs help with his homework."
         ]
      },
      {
         "id": 48,
         "word": "never",
         "role": "adverb",
         "BrE": "/ˈnevə(r)/",
         "AmE": "/ˈnevər/",
         "definition": "not at any time",
         "examples": [
            "I never eat fish.",
            "She never goes to the park.",
            "He has never been late."
         ]
      },
      {
         "id": 48,
         "word": "new",
         "role": "adjective",
         "BrE": "/njuː/",
         "AmE": "/nuː/",
         "definition": "recently made or created",
         "examples": [
            "I have a new phone.",
            "Her new dress is red.",
            "The new teacher is nice."
         ]
      },
      {
         "id": 48,
         "word": "next",
         "role": "adjective",
         "BrE": "/nekst/",
         "AmE": "/nekst/",
         "definition": "coming immediately after",
         "examples": [
            "The next day is Monday.",
            "She is next in line.",
            "The next bus arrives soon."
         ]
      },
      {
         "id": 48,
         "word": "nice",
         "role": "adjective",
         "BrE": "/naɪs/",
         "AmE": "/naɪs/",
         "definition": "pleasant or kind",
         "examples": [
            "The day is nice.",
            "She is a nice person.",
            "This nice book is my favorite."
         ]
      },
      {
         "id": 48,
         "word": "night",
         "role": "noun",
         "BrE": "/naɪt/",
         "AmE": "/naɪt/",
         "definition": "the time when it is dark outside",
         "examples": [
            "I sleep at night.",
            "The night was cold.",
            "She works at night sometimes."
         ]
      },
      {
         "id": 48,
         "word": "nine",
         "role": "number",
         "BrE": "/naɪn/",
         "AmE": "/naɪn/",
         "definition": "the number 9",
         "examples": [
            "I have nine books.",
            "She is nine years old.",
            "The shop opens at nine."
         ]
      },
      {
         "id": 48,
         "word": "nineteen",
         "role": "number",
         "BrE": "/ˌnaɪnˈtiːn/",
         "AmE": "/ˌnaɪnˈtiːn/",
         "definition": "the number 19",
         "examples": [
            "She is nineteen.",
            "I bought nineteen apples.",
            "The bus leaves at nineteen minutes past."
         ]
      },
      {
         "id": 49,
         "word": "ninety",
         "role": "number",
         "BrE": "/ˈnaɪnti/",
         "AmE": "/ˈnaɪnti/",
         "definition": "the number 90",
         "examples": [
            "He is ninety years old.",
            "The book costs ninety cents.",
            "Ninety people came to the event."
         ]
      },
      {
         "id": 49,
         "word": "no",
         "role": "exclamation",
         "BrE": "/nəʊ/",
         "AmE": "/noʊ/",
         "definition": "used to give a negative answer",
         "examples": [
            "No, I don’t want it.",
            "She said no to the plan.",
            "No, the shop is closed."
         ]
      },
      {
         "id": 49,
         "word": "nobody",
         "role": "pronoun",
         "BrE": "/ˈnəʊbədi/",
         "AmE": "/ˈnoʊbədi/",
         "definition": "no person",
         "examples": [
            "Nobody is here.",
            "Nobody saw the cat.",
            "Nobody answered the question."
         ]
      },
      {
         "id": 49,
         "word": "north",
         "role": "noun",
         "BrE": "/nɔːθ/",
         "AmE": "/nɔːrθ/",
         "definition": "the direction toward the top of a map",
         "examples": [
            "We live in the north.",
            "The north is cold in winter.",
            "She traveled to the north of the country."
         ]
      },
      {
         "id": 49,
         "word": "nose",
         "role": "noun",
         "BrE": "/nəʊz/",
         "AmE": "/noʊz/",
         "definition": "the part of the face used for smelling",
         "examples": [
            "My nose is cold.",
            "The dog has a wet nose.",
            "She touched her nose with her hand."
         ]
      },
      {
         "id": 49,
         "word": "not",
         "role": "adverb",
         "BrE": "/nɒt/",
         "AmE": "/nɑːt/",
         "definition": "used to make a sentence negative",
         "examples": [
            "I am not tired.",
            "She does not like fish.",
            "He’s not coming to the party."
         ]
      },
      {
         "id": 49,
         "word": "note",
         "role": "noun",
         "BrE": "/nəʊt/",
         "AmE": "/noʊt/",
         "definition": "a short written message",
         "examples": [
            "I wrote a note.",
            "She left a note on the table.",
            "His note was about the meeting."
         ]
      },
      {
         "id": 49,
         "word": "nothing",
         "role": "pronoun",
         "BrE": "/ˈnʌθɪŋ/",
         "AmE": "/ˈnʌθɪŋ/",
         "definition": "not anything",
         "examples": [
            "There is nothing here.",
            "She said nothing about it.",
            "He has nothing in his bag."
         ]
      },
      {
         "id": 49,
         "word": "November",
         "role": "noun",
         "BrE": "/nəʊˈvembə(r)/",
         "AmE": "/noʊˈvembər/",
         "definition": "the eleventh month of the year",
         "examples": [
            "November is cool.",
            "Her birthday is in November.",
            "We travel in November."
         ]
      },
      {
         "id": 49,
         "word": "now",
         "role": "adverb",
         "BrE": "/naʊ/",
         "AmE": "/naʊ/",
         "definition": "at the present time",
         "examples": [
            "I am busy now.",
            "She is here now.",
            "Let’s go to the park now."
         ]
      },
      {
         "id": 50,
         "word": "number",
         "role": "noun",
         "BrE": "/ˈnʌmbə(r)/",
         "AmE": "/ˈnʌmbər/",
         "definition": "a word or symbol that shows amount or position",
         "examples": [
            "What is your number?",
            "The number of students is ten.",
            "She wrote her phone number."
         ]
      },
      {
         "id": 50,
         "word": "October",
         "role": "noun",
         "BrE": "/ɒkˈtəʊbə(r)/",
         "AmE": "/ɑːkˈtoʊbər/",
         "definition": "the tenth month of the year",
         "examples": [
            "October is autumn.",
            "My birthday is in October.",
            "It’s cool in October here."
         ]
      },
      {
         "id": 50,
         "word": "of",
         "role": "preposition",
         "BrE": "/əv/",
         "AmE": "/əv/",
         "definition": "used to show possession or connection",
         "examples": [
            "A book of stories.",
            "She is a friend of mine.",
            "The color of the car is red."
         ]
      },
      {
         "id": 50,
         "word": "off",
         "role": "preposition",
         "BrE": "/ɒf/",
         "AmE": "/ɔːf/",
         "definition": "away from a place or position",
         "examples": [
            "Take it off the table.",
            "She fell off the chair.",
            "He got off the bus."
         ]
      },
      {
         "id": 50,
         "word": "office",
         "role": "noun",
         "BrE": "/ˈɒfɪs/",
         "AmE": "/ˈɔːfɪs/",
         "definition": "a place where people work at desks",
         "examples": [
            "I work in an office.",
            "The office is big.",
            "She went to the office early."
         ]
      },
      {
         "id": 50,
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
         "id": 50,
         "word": "old",
         "role": "adjective",
         "BrE": "/əʊld/",
         "AmE": "/oʊld/",
         "definition": "having lived or existed for a long time",
         "examples": [
            "The house is old.",
            "Her dog is very old.",
            "He found an old book."
         ]
      },
      {
         "id": 50,
         "word": "on",
         "role": "preposition",
         "BrE": "/ɒn/",
         "AmE": "/ɑːn/",
         "definition": "touching the surface of something",
         "examples": [
            "The book is on the table.",
            "She sits on a chair.",
            "He wrote on the paper."
         ]
      },
      {
         "id": 50,
         "word": "once",
         "role": "adverb",
         "BrE": "/wʌns/",
         "AmE": "/wʌns/",
         "definition": "one time only",
         "examples": [
            "I went there once.",
            "She called me once.",
            "He visited the city once."
         ]
      },
      {
         "id": 50,
         "word": "one",
         "role": "number",
         "BrE": "/wʌn/",
         "AmE": "/wʌn/",
         "definition": "the number 1",
         "examples": [
            "I have one book.",
            "She is one year old.",
            "One apple is on the table."
         ]
      },
      {
         "id": 51,
         "word": "only",
         "role": "adverb",
         "BrE": "/ˈəʊnli/",
         "AmE": "/ˈoʊnli/",
         "definition": "no more than or just",
         "examples": [
            "I have only one pen.",
            "She only likes tea.",
            "Only he knows the answer."
         ]
      },
      {
         "id": 51,
         "word": "open",
         "role": "verb",
         "BrE": "/ˈəʊpən/",
         "AmE": "/ˈoʊpən/",
         "definition": "to make something accessible",
         "examples": [
            "Open the door.",
            "She opened her bag.",
            "He opened the window for air."
         ]
      },
      {
         "id": 51,
         "word": "or",
         "role": "conjunction",
         "BrE": "/ɔː(r)/",
         "AmE": "/ɔːr/",
         "definition": "used to show a choice",
         "examples": [
            "Tea or coffee?",
            "Do you want red or blue?",
            "She can come today or tomorrow."
         ]
      },
      {
         "id": 51,
         "word": "orange",
         "role": "noun",
         "BrE": "/ˈɒrɪndʒ/",
         "AmE": "/ˈɔːrɪndʒ/",
         "definition": "a fruit or a color",
         "examples": [
            "I eat an orange.",
            "Her dress is orange.",
            "He bought an orange at the market."
         ]
      },
      {
         "id": 51,
         "word": "our",
         "role": "pronoun",
         "BrE": "/aʊə(r)/",
         "AmE": "/aʊr/",
         "definition": "belonging to us",
         "examples": [
            "This is our house.",
            "Our dog is friendly.",
            "She visited our school."
         ]
      },
      {
         "id": 51,
         "word": "out",
         "role": "adverb",
         "BrE": "/aʊt/",
         "AmE": "/aʊt/",
         "definition": "away from the inside of a place",
         "examples": [
            "Go out now.",
            "She went out to play.",
            "He took the dog out for a walk."
         ]
      },
      {
         "id": 51,
         "word": "outside",
         "role": "adverb",
         "BrE": "/ˌaʊtˈsaɪd/",
         "AmE": "/ˌaʊtˈsaɪd/",
         "definition": "not inside a building",
         "examples": [
            "I play outside.",
            "It’s cold outside today.",
            "She waited outside the shop."
         ]
      },
      {
         "id": 51,
         "word": "over",
         "role": "preposition",
         "BrE": "/ˈəʊvə(r)/",
         "AmE": "/ˈoʊvər/",
         "definition": "above or across something",
         "examples": [
            "Jump over the wall.",
            "The bird flew over the tree.",
            "She walked over the bridge."
         ]
      },
      {
         "id": 51,
         "word": "own",
         "role": "verb",
         "BrE": "/əʊn/",
         "AmE": "/oʊn/",
         "definition": "to have something that belongs to you",
         "examples": [
            "I own a bike.",
            "She owns a big house.",
            "He owns two cats."
         ]
      },
      {
         "id": 51,
         "word": "page",
         "role": "noun",
         "BrE": "/peɪdʒ/",
         "AmE": "/peɪdʒ/",
         "definition": "one side of a sheet of paper in a book",
         "examples": [
            "Turn the page.",
            "She read page ten.",
            "The book has a hundred pages."
         ]
      },
      {
         "id": 52,
         "word": "paint",
         "role": "verb",
         "BrE": "/peɪnt/",
         "AmE": "/peɪnt/",
         "definition": "to put color on something using a brush",
         "examples": [
            "I paint a picture.",
            "She painted the wall blue.",
            "He paints houses for his job."
         ]
      },
      {
         "id": 52,
         "word": "painting",
         "role": "noun",
         "BrE": "/ˈpeɪntɪŋ/",
         "AmE": "/ˈpeɪntɪŋ/",
         "definition": "a picture made with paint",
         "examples": [
            "The painting is beautiful.",
            "Her painting is on the wall.",
            "He saw a painting in the museum."
         ]
      },
      {
         "id": 52,
         "word": "pair",
         "role": "noun",
         "BrE": "/peə(r)/",
         "AmE": "/per/",
         "definition": "two things of the same type",
         "examples": [
            "I have a pair of shoes.",
            "She bought a pair of socks.",
            "A pair of gloves is on the table."
         ]
      },
      {
         "id": 52,
         "word": "paper",
         "role": "noun",
         "BrE": "/ˈpeɪpə(r)/",
         "AmE": "/ˈpeɪpər/",
         "definition": "material used for writing or drawing",
         "examples": [
            "I need paper.",
            "She wrote on the paper.",
            "The paper is for drawing."
         ]
      },
      {
         "id": 52,
         "word": "parent",
         "role": "noun",
         "BrE": "/ˈpeərənt/",
         "AmE": "/ˈperənt/",
         "definition": "a mother or father",
         "examples": [
            "My parent is kind.",
            "Her parents work in a shop.",
            "The parents came to the school."
         ]
      },
      {
         "id": 52,
         "word": "park",
         "role": "noun",
         "BrE": "/pɑːk/",
         "AmE": "/pɑːrk/",
         "definition": "a public area with grass and trees",
         "examples": [
            "I play in the park.",
            "The park is big.",
            "She walks her dog in the park."
         ]
      },
      {
         "id": 52,
         "word": "party",
         "role": "noun",
         "BrE": "/ˈpɑːti/",
         "AmE": "/ˈpɑːrti/",
         "definition": "a social event with food and music",
         "examples": [
            "I go to a party.",
            "Her party was fun.",
            "The birthday party was yesterday."
         ]
      },
      {
         "id": 52,
         "word": "pass",
         "role": "verb",
         "BrE": "/pɑːs/",
         "AmE": "/pæs/",
         "definition": "to go past something or someone",
         "examples": [
            "I pass the shop.",
            "She passed the test.",
            "He passed the ball to his friend."
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
         <div className={styles.lessonLevel}>A1</div>

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
                  <Link href='/a1' className={styles.back}>Done</Link>
                  {
                     lessonNumber < 52 ?
                     <Link href={`/a1/${lessonNumber + 1}`} className={styles.back}>Next Lesson</Link>
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
                           lessonNumber < 52 ?
                              <Link href={`/a1/${lessonNumber + 1}`} className={styles.button}>Next Lesson</Link>
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
                  lessonNumber < 52 ?
                  <Link href={`/a1/${lessonNumber + 1}`} className={styles.button}>Next Lesson</Link>
                  :
                  <Link href='/a2' className={styles.button}>Start A2</Link>
               }

               <Link href='/a1'
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













