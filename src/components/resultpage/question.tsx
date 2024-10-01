import React from "react";
import './question.css';

interface QuestionBoxProps{
    questionText:string;
}

const QuestionBox: React.FC<QuestionBoxProps> = ({ questionText }) => {
    return (
        <div className="Result_page_question">
            {questionText} 
        </div>
    );
}

export default QuestionBox;