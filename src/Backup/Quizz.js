import React from "react";
import ReactDOM from "react-dom";
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

import Questions from "./components/Questions.js"

//https://opentdb.com/api_config.php

export default function Quizz(props){

    const [score, setScore] = React.useState(0)
    const [submit, setSubmit] = React.useState(false)
    const [error, setError] = React.useState(false)

    
    const quizzElements = props.newQuizz.map( question => {

        return(
            <Questions
                key={question.id}

                question={question.question}
                answears={question.allAnswer.options}

                id={question.id}
                questionId={question.allAnswer.id}

                isSelected={question.allAnswer.isSelected}
                correctAnswer={question.correct_answer}

                handleSelection={props.handleSelection}
                submit={submit}
            />
        )   
    })



    function checkAnsweres() {
        if(props.newQuizz.every( item => item.isAnswered ===true)){
            setSubmit( oldSubmit => !oldSubmit)
            for(let i = 0; i < props.newQuizz.length; i++) {
                let option = props.newQuizz[i]
                if (option.correct_answer === option.currentAns){
                    setScore(oldScore=>oldScore +1)
                }
            }
        } else { 
            setError (error => !error)
        }
    }


    return(
        <div className="container-quizz" >
            {Quizz.score >3 && <Confetti />}
  
            {quizzElements}

            <div className="container--footer">
                {submit 
                    ? 
                        <p className="question">You scored {score}/5</p>
                    :
                        error && <p className="question">Please answear all questions before submiting 🙃 </p>}

                {!submit 
                    ?
                        <button 
                            className="btn btn-quizz"
                            onClick={checkAnsweres}
                            >
                            Check Answer
                        </button> 
                    :
                        <button 
                            className="btn btn-quizz"
                            onClick={() => props.newGame(setScore, setSubmit,setError)}
                            >
                            Start Again
                        </button>}
                
            </div>

        </div>
    )
}

