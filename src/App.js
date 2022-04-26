import React from "react"

import Start from "./Start"
import Quiz from "./Quizz"

import he from "he"
import {nanoid} from "nanoid"

export default function App() {
    
    const [showQuiz, setShowQuiz] = React.useState(false)
    const [quizData, setQuizData] = React.useState([])
    const [correctAnswers, setCorrectAnswers] = React.useState(0)
    const [newQuiz, setNewQuiz] = React.useState(0)

    
    // Fetch quiz data from API
    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=10")
        .then(res => res.json())
        .then(data => {
            
            const newQuizData = data.results.map(question => {
                // Create array of all possible answers
                let answers = []
                if(question.type === "boolean") {
                    answers = ["True", "False"]
                } else {
                    answers = question.incorrect_answers.map(answer => he.decode(answer)) 
                    const randomNumber = Math.floor(Math.random() * (answers.length + 1))
                    // insert correct answer into a random position
                    answers.splice(randomNumber, 0, he.decode(question.correct_answer))
                }
                 
                // Generate an array of answer objects
                const answersArray = answers.map(answer => 
                    ({
                        id: nanoid(),
                        answer: answer,
                        selected: false,
                        correct: null
                    })
                ) // end answers array map
                
                return {
                        id: nanoid(),
                        ...question,
                        correct_answer: he.decode(question.correct_answer),
                        question: he.decode(question.question), 
                        all_answers: answersArray
                        }
            }) // end new quiz data .map
            
            setQuizData(newQuizData)
            
        }) // end data function
    }, [newQuiz])
    
    
    function toggleShowQuiz() {
        setShowQuiz(prevShowState => !prevShowState)
    }
    
    
    function toggleAnswerSelect(id, questionId) {
        // console.log(`id = ${id}, questionId = ${questionId}`)
        setQuizData(prevQuiz => {
            return prevQuiz.map(question => {
              if(question.id === questionId) {
                  let newAnswers = question.all_answers.map(answer => {
                      return answer.id === id ?
                      {...answer, selected: true} :
                      {...answer, selected: false}
                  })
                  return {...question, all_answers: newAnswers}
              } else {
                  return question
              }
            })
        })
    }
    
    function checkAnswers() {
        
        setQuizData(prevQuiz => {
            return prevQuiz.map(question => {
                
                let newAnswers = question.all_answers.map(answer => {
                    let isCorrect = answer.answer === question.correct_answer
                    answer.selected && isCorrect && setCorrectAnswers(prevNum => prevNum + 1)
                    return isCorrect ? {...answer, correct: true} :
                    answer.selected && !isCorrect ? {...answer, correct: false} : answer 
                })
               
               return {...question, all_answers: newAnswers}
                
            }) // end prevQuiz.map
        }) // end setQuizData  
    }
    
    function generateNewQuiz() {
        setNewQuiz(prevNum => prevNum + 1)
        setCorrectAnswers(0)
    }
    
    //Add error message if not all selected ;
    // change text and btn margin from submit button
    // other things
    
    return (
        <main className="main">
        {showQuiz
            ? <Quiz 
                handleStartClick={toggleShowQuiz} 
                quizData={quizData}
                handleAnswerSelect={toggleAnswerSelect}
                handleCheckAnswers={checkAnswers}
                correctAnswers={correctAnswers}
                newQuiz={generateNewQuiz} />
            : <Start handleStartClick={toggleShowQuiz} /> }
        </main>
    )
}