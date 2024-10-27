import React, { useState } from "react";
import QuestionBox from "../questionbox/question";
import './MultiChoiceVote.css';
import QuestionImage from "../questionimage/QuestionImage";
import AnswerBox from "./AnswerBox";


interface MultiChoiceVoteProps {
  isMultipleChoice: boolean; 
  answers: string[]; 
  question: string;  
  id : number;
  onAnswerChange: (answer: string[]) => void; 
}

const MultiChoiceVote: React.FC<MultiChoiceVoteProps> = ({isMultipleChoice, answers, question, id, onAnswerChange }) => {
  const imageUrl = "https://cdn-icons-png.flaticon.com/128/8371/8371275.png";
  
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  const handleAnswerChange = (answer: string, checked: boolean) => {
    let updatedAnswers;
        if (isMultipleChoice) {
            updatedAnswers = checked
                ? [...selectedAnswers, answer]
                : selectedAnswers.filter((a) => a !== answer);
        } else {
            updatedAnswers = checked ? [answer] : [];
        }
        setSelectedAnswers(updatedAnswers);
        onAnswerChange(updatedAnswers);
  };

  return (
    <div className="Multi_Choice_Vote">
      <QuestionBox questionText={id+". "+question} />
      <div className="Multi_Choice_Vote_answer">
        <QuestionImage imageUrl={imageUrl} />
        <div className="Multi_Choice_Vote_choices">
          {answers.map((answer) => (
            <AnswerBox
              key={answer}
              disabled={false}
              checked={selectedAnswers.includes(answer)}
              onChange={(checked: boolean) => handleAnswerChange(answer, checked)}
              type={isMultipleChoice ? 'multiple' : 'single'}
            >
              {answer}
            </AnswerBox>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MultiChoiceVote;
