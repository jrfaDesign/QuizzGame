import React from "react"

export default function Question(props) {
    
    function generateClassList(answer) {
        if(props.show) {
            return `answear option-btn ${answer.correct ? "correct" : answer.correct === null ? "" : "wrong"}`
        } else {
            return `answear option-btn ${answer.selected ? "selected" : ""}`
        }
    }    
    
    const answerElements = props.answers.map(answer => {
        return <div 
            key={answer.id} 
            className={generateClassList(answer)} 
            onClick={() => props.handleAnswerSelect(answer.id, props.id)}
            >{answer.answer}</div>
    })
    
    return (
        <>
            <div className="container--questions">
                <h3 className="question">{props.question}</h3>
                <div className="container--answear">
                    {answerElements}
                </div>
            </div>
            <hr />
        </>
    )
}