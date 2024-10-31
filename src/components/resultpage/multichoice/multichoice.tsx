import { useEffect, useState } from 'react';
import QuestionBox from '../../questionbox/question';
import QuestionImage from '../../questionimage/QuestionImage';
import ResultPieChart from "../multichoice/resultpiechart";
import "./multichoice.css";

const MultiChoice = () => {
  const [answers, setAnswers] = useState<string[]>([]);
  const [series, setSeries] = useState<number[]>([]);
  const question = "1. What is the capital of France?";
  const imageUrl = "https://cdn-icons-png.flaticon.com/128/8371/8371275.png";

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const data = {
          answers: ["Paris", "London", "Berlin", "Madrid","Korea","Seoul","Canada","France"],
          series: [40, 25, 20, 15,30,8,20,9]
        };

        setAnswers(data.answers);
        setSeries(data.series);
      } catch (error) {
        console.error('Error fetching answers:', error);
      }
    };

    fetchAnswers();
  }, []);

  return (
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
        <ResultPieChart series={series} labels={answers} />
      </div>
    </div>
  );
}

export default MultiChoice;
