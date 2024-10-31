import { useEffect, useState } from 'react';
import QuestionBox from '../../questionbox/question';
import QuestionImage from '../../questionimage/QuestionImage';
import ResultPieChart from "../multichoice/resultpiechart";
import "./multichoice.css";

interface MultiChoiceProps {
  question: {
    qid: number;
    title: string;
    optionList: { text: string }[];
  };
  id:number;
}

interface AnswerResult {
  text: string; 
  count: number; 
}

const MultiChoice: React.FC<MultiChoiceProps> = ({ question,id }) => {
  const [series, setSeries] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/answer/result/${question.qid}`);
        const data = await response.json();

        const resultData: AnswerResult[] = data.result;

        const sortedResults = resultData
          .sort((a, b) => Number(a.text) - Number(b.text)); 

        setSeries(sortedResults.map(item => item.count)); 
        setLabels(sortedResults.map(item => `${item.text}번`));
        
      } catch (error) {
        console.error('Error fetching answers:', error);
      }
    };

    fetchAnswers();
  }, [question.qid]);

  return (
    <div className="Result_page_multiple_choice">
      <QuestionBox questionText={id+". " +question.title} />
      <div className="Result_page_multiple_choice_answer">
        <QuestionImage imageUrl={"https://cdn-icons-png.flaticon.com/128/8371/8371275.png"} />
        <div className="Result_page_multiple_choice_answer_question">
          {question.optionList.map((option, index) => (
            <h2 key={index}>
              {index + 1}. {option.text}
            </h2>
          ))}
        </div>
        <ResultPieChart series={series} labels={labels} />
      </div>
    </div>
  );
}

export default MultiChoice;
