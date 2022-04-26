import React from "react";
import ReactDOM from "react-dom";
import { nanoid } from 'nanoid'

//https://opentdb.com/api_config.php

export default function Quizz(){
    const [quizz, setQuizz] = React.useState([])
    const [submit, setSubmit] = React.useState(false)
    const [score, setScore] = React.useState(0)
    const [error, setError] = React.useState(false)
    const [btnClass, setBtnClass] = React.useState("answear option-btn")

    function getQuizz() {
        fetch("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple")
            .then( res => res.json())
            .then( data => setQuizz( oldQuizz => data.results.map( quiz => ({
                id:nanoid(),
                question: quiz.question,
                correct_answer: quiz.correct_answer,
                options: randomize([quiz.correct_answer,quiz.incorrect_answers[0],quiz.incorrect_answers[1],quiz.incorrect_answers[2]]),

                currentAns:"",
                isAnswered: false
            }))))
    }

    function randomize(array){
        for (let i = array.length - 1; i > 0; i--) {
            // Generate random number
            let j = Math.floor(Math.random() * (i + 1));
                        
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }   
        return array;
     }

    React.useEffect(()=>{
        getQuizz()
    },[])

    function handleChange(event){
        const {name, value} = event.target
        setQuizz ( oldQuiz => oldQuiz.map( item =>(
            item.id === name ? {...item, currentAns:value, isAnswered: true} :item
            )))
        }


    function checkAnsweres() {
        if(quizz.every( item => item.isAnswered === true)){
            setSubmit(oldSubmit => !oldSubmit)
            if(quizz.currentAns === quizz.correct_answer){
                setScore(oldScore => oldScore + 1)
            }  
        } else{
            setError (error => !error)
        }
    }

    function startAgain() {
        setSubmit(oldSubmit => !oldSubmit)
        setError (oldError => !oldError)
        console.log("Game started again")
    }

    function getAnswerInfo (items){

    }



    const renderQuizz = quizz.map( (quiz) => {
        return(
            <div key={quiz.id} className="container--questions" >
                <h3 className="question">{quiz.question}</h3>
                <div className="container--answear">
                    <input
                        type="radio"
                        value={quiz.options[0]}
                        id={quiz.options[0]}
                        name={quiz.id}
                        checked={quiz.currentAns === quiz.options[0]}
                        onChange={handleChange}
                    >
                    </input>
                    <label 
                        htmlFor={quiz.options[0]} 
                        className={ submit ? `answear option-btn locked ${getAnswerInfo(quiz)}` : "answear option-btn"}
                        >
                        {quiz.options[0]}
                    </label>
{/* ============== */}

                    <input
                        type="radio"
                        value={quiz.options[1]}
                        id={quiz.options[1]}
                        name={quiz.id}
                        checked={quiz.currentAns === quiz.options[1]}
                        onChange={handleChange}
                    >
                    </input>
                    <label 
                        htmlFor={quiz.options[1]}
                        className={ submit ? `answear option-btn locked ${getAnswerInfo(quiz)}` : "answear option-btn"}
                        >
                        {quiz.options[1]}
                    </label>
{/* ============== */}

                    <input
                        type="radio"
                        value={quiz.options[2]}
                        id={quiz.options[2]}
                        name={quiz.id}
                        checked={quiz.currentAns === quiz.options[2]}
                        onChange={handleChange}
                    >
                    </input>
                    <label 
                        htmlFor={quiz.options[2]}
                        className={ submit ? `answear option-btn locked ${getAnswerInfo(quiz)}` : "answear option-btn"}
                        >
                        {quiz.options[2]}
                    </label>
{/* ============== */}

                    <input
                        type="radio"
                        value={quiz.options[3]}
                        id={quiz.options[3]}
                        name={quiz.id}
                        checked={quiz.currentAns === quiz.options[3]}
                        onChange={handleChange}
                    >
                    </input>
                    <label 
                        htmlFor={quiz.options[3]}
                        className={ submit ? `answear option-btn locked ${getAnswerInfo(quiz)}` : "answear option-btn"}
                        >
                        {quiz.options[3]}
                    </label>
                </div>

            </div>
        )
    })

    return(
        <div className="container-quizz">
            {renderQuizz}
            <div className="container--footer">
            {submit ? <p className="question">You scored {score}/5</p> : error && <p className="question">Please answear all questions before submiting 🙃 </p>}
            
            {!submit ?
                <button 
                    className="btn btn-quizz"
                    onClick={checkAnsweres}
                    >
                    Check Answer
                </button>
            :
                <button 
                    className="btn btn-quizz"
                    onClick={startAgain}
                    >
                    Play Again
                </button>
            }  
            </div>
        </div>
    )
}

