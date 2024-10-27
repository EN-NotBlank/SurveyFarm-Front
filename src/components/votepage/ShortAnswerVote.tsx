import React, { useState } from "react";
import './ShortAnswerVote.css';
import QuestionBox from "../questionbox/question";
import QuestionImage from "../questionimage/QuestionImage";

interface ShortAnswerVoteProps {
    question: string;  
    id : number;
    onAnswerChange: (answer: string) => void; 
  }

const ShortAnswerVote: React.FC<ShortAnswerVoteProps> = ({question,id, onAnswerChange})=>{
    const [answer, setAnswer] = useState('');
    const imageUrl ="https://cdn-icons-png.flaticon.com/128/14919/14919351.png";

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAnswer(e.target.value); 
        onAnswerChange(e.target.value);
      };

    return( 
        <div className="Short_Answer_Vote">
            <QuestionBox questionText={id+". "+question} />
            <div className="Short_Answer_Vote_answer">
                <QuestionImage imageUrl={imageUrl} />
                <textarea
                    value={answer}
                    onChange={handleInputChange} 
                    placeholder="Enter your answer" 
                    className="Short_Answer_Vote_input" 
                    rows={3} 
                />
            </div>
        </div>
    );
}

export default ShortAnswerVote;