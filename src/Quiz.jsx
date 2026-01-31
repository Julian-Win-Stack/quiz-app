import yellowBlob from './assets/yellow.svg'
import blueBlob from './assets/blue.svg'
import React from 'react';
import { decode } from "html-entities";

export default function Quiz({questionArray, shuffledAnswerArray}){

    const combinedArray = questionArray.map((question, index)=>{
        return {
            question: question, 
            answer: shuffledAnswerArray[index]
        };
    });

    const renderArray = combinedArray.map((object, qIndex)=>{
        const questonIndex = `question${qIndex}`;
        const answersPart = object.answer.map((answer, aIndex)=>{
            const answerIndex = `q-${qIndex}, a-${aIndex}`
            return (
                <React.Fragment key={answerIndex}>
                    <input type="radio" id={answerIndex} name={questonIndex} />
                    <label htmlFor={answerIndex} className="radio-btn">
                        {decode(answer)}
                    </label>
                </React.Fragment>
            )
        });

        return (
            <div className='quiz-questions' key={questonIndex}>
                <h2>{decode(object.question)}</h2>
                <div className="radio-group">
                    {answersPart}
                </div>
            </div>
        );
    })

    return(
        <div className="quiz">
            <img className="blob quiz-yellow-blob" src={yellowBlob} aria-hidden="true"></img>
            <img className="blob quiz-blue-blob" src={blueBlob} aria-hidden="true"></img> 
            
                {renderArray}

            <div className='check-answers-btn-div'>
                <button className='check-answers-btn'>Check answers</button>                   
            </div>
        </div>
    )
}
