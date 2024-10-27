import React, { useEffect, useState } from 'react';
import "./multichoice.css";
import ResultPieChart from "../multichoice/resultpiechart";
import QuestionBox from '../../questionbox/question';
import QuestionImage from '../../questionimage/QuestionImage';


const MultiChoice = () =>{

    const [answers, setAnswers] = useState<string[]>([]);
    const question = "1. What is the capital of France?";
    const imageUrl = "https://cdn-icons-png.flaticon.com/128/8371/8371275.png";

    useEffect(() => {
        const fetchAnswers = async () => {
          try {
            const response = await fetch(''); 
            const data = await response.json(); 
            setAnswers(data.answers); 
          } catch (error) {
            console.error('Error fetching answers:', error);
          }
        };
    
        fetchAnswers();
      }, []); 

    return(
        <div className="Result_page_multiple_choice">
            <QuestionBox questionText={question} />
            <div className="Result_page_multiple_choice_answer">
                <QuestionImage imageUrl={imageUrl} />
                <div className="Result_page_multiple_choice_answer_question">
                {answers.map((answer, index) => (
                    <h2 key={index}>
                        {index + 1}. {answer}
                    </h2>
                ))}
                </div>
                <ResultPieChart series={[44, 55, 28, 43, 22,13]} labels={['1번', '2번', '3번', '4번', '5번','6번']} />
            </div>

        </div>
    );
}

export default MultiChoice;