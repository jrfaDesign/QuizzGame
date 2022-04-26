import React from "react";
import ReactDOM from "react-dom";

import { nanoid } from 'nanoid'


import Start from "./Start.js";
import Quizz from "./Quizz.js";

export default function App() {

    
    const [start, setStart] = React.useState(false) //Start Game
    const [newQuizz, setNewQuizz] = React.useState([])
    const [startAgain, setStartAgain] = React.useState(false)

    React.useEffect( () => {
        fetch("https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple")
            .then(res => res.json())
            .then(data => {
                setNewQuizz (data.results.map( item => {

                    let allOptions = randomize([item.correct_answer,item.incorrect_answers[0],item.incorrect_answers[1],item.incorrect_answers[2]])
                    
                    const options = allOptions.map( answer => 
                        ({
                            id:nanoid(),
                            answer: answer,
                            isSelected:false,

                        })
                    )

                    return {
                        id:nanoid(),
                        question: item.question,
                        correct_answer: item.correct_answer,
                        allAnswer: {options}  ,
                        
                        currentAns:"",
                        isAnswered: false,
                        isCorrect: ""
                    }
                } ))

                function randomize(array){
                    for (let i = array.length - 1; i > 0; i--) {
                        // Generate random number
                        let j = Math.floor(Math.random() * (i + 1));
                                    
                        let temp = array[i];
                        array[i] = array[j];
                        array[j] = temp;
                    }   
                    return array;
                 } //Randomize options


                })
    }, [startAgain] )
   
    function startQuizz(){
        setStart( start => !start)
    }// Change Start state



    function handleSelection(questionId, answerId, value) {
        console.log(newQuizz[0])

        setNewQuizz( oldQuizz => {
            return oldQuizz (question => {
                if(question.id === questionId) {
                    let newAnswers = question.allAnswer.map( answer => {
                        return answer.id === answerId ? {...answer, selected: true} : {...answer, selected: false}
                    })
                    return {...question, allAnswer: newAnswers,currentAns: value, isAnswered: true}
                } else{
                    return question
                }
            })
        })
    }
    
    console.log(newQuizz[0])

    function newGame(score, submit, error){
        score ( oldScore => 0)
        submit (oldSubmite => false)
        error (oldError => false)
        setStart(oldStart => false)
        setStartAgain( startAgain => !startAgain)
    }

    //Levar score para APP.js senao confeeti n funcina

    return (
        <main >
            
            {start 
                ?
                    <Quizz
                        newQuizz = {newQuizz}
                        handleSelection = {handleSelection}
                        newGame = {newGame}
                    /> 
                :
                    <Start
                        startHandle ={startQuizz}
                        startAgain={startAgain}
                    />}
        </main>
    )
}