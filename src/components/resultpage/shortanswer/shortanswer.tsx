import React from "react";
import "./shortanswer.css";
import QuestionBox from "../../questionbox/question";
import WordCloudBox from "../shortanswer/wordcloud";
import AiAnswer from "./ai_answer";
import QuestionImage from "../../questionimage/QuestionImage";

const ShortAnswer: React.FC = () =>{
    
    const question = "2. What is the capital of France?";
    const imageUrl ="https://cdn-icons-png.flaticon.com/128/14919/14919351.png";

    const words: { text: string; value: number }[] = [
        { text: "Paris", value: 100 },
        { text: "France", value: 80 },
        { text: "Capital", value: 60 },
        { text: "Eiffel Tower", value: 50 },
        { text: "Louvre", value: 40 },
        { text: "Seine", value: 30 },
        { text: "Notre Dame", value: 20 },
        { text: "Croissant", value: 10 },
        { text: "Tourism", value: 5 },
        { text: "French Revolution", value: 4 },
        { text: "a", value: 3 },
        { text: "b", value: 2 },
      ];

      const topKeywords = words
    .sort((a, b) => b.value - a.value)
    .slice(0, 10)
    .map(word => word.text);

    return(
        <div className="Result_page_short_answer">
            <QuestionBox questionText={question}/>
            <div className="Result_page_short_answer_answer">
                <QuestionImage imageUrl={imageUrl} />
                <div className="Result_page_short_answer_wordcloud"> 
                    <WordCloudBox words={words}/>
                </div>
                <div className="Result_page_short_answer_keyword">
                    <ul>
                        상위 10개 키워드
                        {topKeywords.map((keyword, index) => (
                            <li key={index}>{index + 1}. {keyword}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <AiAnswer />
        </div>
    );
}

export default ShortAnswer;