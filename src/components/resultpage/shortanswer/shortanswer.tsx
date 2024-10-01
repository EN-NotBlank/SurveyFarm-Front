import React from "react";
import "./shortanswer.css";
import QuestionBox from "../question";
import WordCloudBox from "../shortanswer/wordcloud";
import AiAnswer from "./ai_answer";

const ShortAnswer: React.FC = () =>{
    
    const question = "2. What is the capital of France?";

    const keywords: string[] = [
        "Paris", 
        "France", 
        "Capital", 
        "Eiffel Tower", 
        "Louvre", 
        "Seine", 
        "Notre Dame", 
        "Croissant", 
        "Tourism", 
        "French Revolution"
    ];

    return(
        <div className="Result_page_short_answer">
            <QuestionBox questionText={question}/>
            <div className="Result_page_short_answer_answer">
                <div className="Result_page_short_answer_image">
                    <img src="https://cdn-icons-png.flaticon.com/128/14919/14919351.png" />
                </div>
                <div className="Result_page_short_answer_wordcloud"> 
                    <WordCloudBox />
                </div>
                <div className="Result_page_short_answer_keyword">
                    <ul>
                        상위 10개 키워드
                        {keywords.map((keyword, index) => (
                            <li key={index}>{index+1}. {keyword}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <AiAnswer />
        </div>
    );
}

export default ShortAnswer;