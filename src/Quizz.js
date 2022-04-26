import React from "react"
import Question from "./components/Questions"

export default function Quiz(props) {
    
    const [showAnswers, setShowAnswers] = React.useState(false)
    
    const questionElements = props.quizData ? props.quizData.map(question => {
        return <Question 
                key={question.id}
                id={question.id}
                question={question.question}
                answers={question.all_answers}
                handleAnswerSelect={props.handleAnswerSelect}
                show={showAnswers}
                />
    }) : ""
    
    function submitQuiz() {

        if(showAnswers) {
            setShowAnswers(prevState => !prevState)
            props.handleStartClick() 
            props.newQuiz()
            return 
        } else {
            setShowAnswers(prevState => !prevState)
            props.handleCheckAnswers()
        }
    }
    
    return (
        <div className="container-quizz">
            {questionElements}
            <div className="container--footer">
                {showAnswers && <p className="question">You scored {props.correctAnswers}/{props.quizData.length} correct answers</p>}
                <button className="submit-btn btn" onClick={submitQuiz}>{showAnswers ? "Play again" : "Check answers"}</button>
            </div>
        </div>
    )
}