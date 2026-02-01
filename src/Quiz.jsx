import yellowBlob from './assets/yellow.svg'
import blueBlob from './assets/blue.svg'
import React from 'react';
import { decode } from "html-entities";
// 
export default function Quiz({questionArray, shuffledAnswerArray, correctAnswerArray, fetchAPI}){

    const [userAnswers, setUserAnswers] = React.useState({});
    const [checkAnswers, setCheckAnswers] = React.useState(false);
    const [countCorrectAnswers, setCountCorrectAnswers] = React.useState(null);

    const unCheckedBtnsForm = checkAnswers ? 'quiz-form un-checked' : 'quiz-form';

    const buttonText = checkAnswers ? 'Play again' : 'Check answers';

    const combinedArray = questionArray.map((question, index)=>{
        return {
            question: question, 
            answer: shuffledAnswerArray[index]
        };
    });

    const renderArray = combinedArray.map((object, qIndex)=>{
        const questionIndex = `question${qIndex}`;
        const userAnswer = userAnswers[questionIndex];
        const correctAnswer = correctAnswerArray[qIndex];

        const answersPart = object.answer.map((answer, aIndex)=>{
            const correct = checkAnswers && Object.keys(userAnswers).length !== 0 && (answer === correctAnswer);
            const wrong = (checkAnswers) && (Object.keys(userAnswers).length !== 0) && (userAnswer !== correctAnswer) && (answer === userAnswer);
            const statusClass = correct
                ? 'radio-btn correct'
                : wrong
                    ? 'radio-btn wrong'
                    : 'radio-btn';

            const answerIndex = `q-${qIndex}, a-${aIndex}`
            return (
                <React.Fragment key={answerIndex}>
                    <input type="radio" id={answerIndex} name={questionIndex} required={aIndex === 0} value={decode(answer)}/>
                    <label htmlFor={answerIndex} className={statusClass}>
                        {decode(answer)}
                        <span className="sr-only">
                            { correct
                            ? 'Correct'
                            : wrong
                                ? 'Incorrect'
                                : null}
                        </span>
                    </label>
                </React.Fragment>
            )
        });

        return (
            <fieldset className='quiz-questions' key={questionIndex}>
                <legend>{decode(object.question)}</legend>
                <div className="radio-group">
                    {answersPart}
                </div>
            </fieldset>
        );
    })


    function handleSubmit(e){
        e.preventDefault();
        if (!checkAnswers){
            const formData = new FormData(e.target);
            const answers = Object.fromEntries(formData.entries());
            const rawNumCorrectAnswers = correctAnswerArray.map((answer,index)=>{
                const objProperty = `question${index}`
                if (answers[objProperty] === answer){
                    return true;
                } else{
                    return false;
                }
            })
            const countCorrectAnswers = rawNumCorrectAnswers.filter(Boolean).length;
            setCountCorrectAnswers(countCorrectAnswers);
            setUserAnswers(answers);
            setCheckAnswers(true);
        } else{
            e.target.reset();
            setUserAnswers({});
            setCheckAnswers(false);
            setCountCorrectAnswers(null);
            fetchAPI();
        }

       
    }
     



    return(
        <div className="quiz">
            <img className="blob quiz-yellow-blob" src={yellowBlob} aria-hidden="true"></img>
            <img className="blob quiz-blue-blob" src={blueBlob} aria-hidden="true"></img> 
            <form onSubmit={handleSubmit} className={unCheckedBtnsForm}>
                {renderArray}
                <div className='check-answers-btn-div'>
                    {countCorrectAnswers !== null ? <h3 role="status">You scored {countCorrectAnswers}/{questionArray.length} correct answers</h3> : null}
                    <button className='check-answers-btn' type='submit'>{buttonText}</button>                   
                </div>
            </form>
        </div>
    )
}
