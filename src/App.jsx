import React from 'react';
import StartScreen from './startScreen';
import Quiz from './Quiz';


export default function App(){
  const [start, setStart] = React.useState(false);
  const [apiData, setapiData] = React.useState([]);
  const [questionArray, setQuestionArray] = React.useState([]);
  const [shuffledAnswerArray, setShuffledAnswerArray] = React.useState([]);
  const [correctAnswerArray, setCorrectAnswerArray] = React.useState([]);

  React.useEffect(()=>{
    if (!start){
      return;
    }
    fetchAPI();

  }, [start]);

  React.useEffect(()=>{
    if (!apiData.length){
      return;
    };

  const questionArray = apiData.map((set)=>{
      return set.question;
    });
  
  const correctAnswerArray = apiData.map((set)=>{
    return set.correct_answer;
  })
  


  const rawAnswerArray = apiData.map((set)=>{
      return [...set.incorrect_answers, set.correct_answer];
    })

  const shuffledAnswerArray = rawAnswerArray.map((answerArray)=>{
      const answer = shuffle(answerArray);
      return answer;
    });

  setShuffledAnswerArray(shuffledAnswerArray);
  setQuestionArray(questionArray);
  setCorrectAnswerArray(correctAnswerArray)


  }, [apiData]);


  
  function handleStartQuiz(){
    setStart(true);
  }


  async function fetchAPI() {
    try{
        const res = await fetch(
          'https://opentdb.com/api.php?amount=4&category=9&difficulty=easy&type=multiple'
        );
        const data = await res.json();
        setapiData(data.results);
        }catch(err){
          console.error('Failed to fetch API', err);
        }
  }

  function shuffle(answerArray){
    if (!Array.isArray(answerArray)){
      throw new Error ('shuffle expects an array');;
    }

    const copy = [...answerArray];
    for (let i = copy.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  return (
    <main>
      {apiData.length && questionArray.length && shuffledAnswerArray.length  ? 
      <Quiz questionArray={questionArray} shuffledAnswerArray={shuffledAnswerArray} correctAnswerArray={correctAnswerArray} fetchAPI={fetchAPI}/> 
      : <StartScreen startQuiz={handleStartQuiz}/>}
    </main>
    

  )
}