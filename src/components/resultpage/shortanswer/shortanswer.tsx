import React, { useEffect, useState } from "react";
import "./shortanswer.css";
import QuestionBox from "../../questionbox/question";
import WordCloudBox from "../shortanswer/wordcloud";
import AiAnswer from "./ai_answer";
import QuestionImage from "../../questionimage/QuestionImage";

interface ShortAnswerProps {
    question: {
        qid: number;
        title: string;
    };
    id: number;
}

const ShortAnswer: React.FC<ShortAnswerProps> = ({ question, id }) => {
    const [answers, setAnswers] = useState<string[]>([]);
    const [words, setWords] = useState<{ text: string; value: number }[]>([]);
    const imageUrl = "https://cdn-icons-png.flaticon.com/128/14919/14919351.png";

    useEffect(() => {
        const fetchAnswers = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL;
                const response = await fetch(`${apiUrl}/answer/result/${question.qid}`);
                const data = await response.json();
                setAnswers(data.result);

                const keywordResponse = await fetch(`${apiUrl}/gpt/split`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data.result),
                });
                const keywordData = await keywordResponse.json();

                const updatedWords = keywordData.map((item: Record<string, number>) => {
                    const [text, value] = Object.entries(item)[0];
                    return { text, value };
                });
                setWords(updatedWords);
            } catch (error) {
                console.error("Error fetching answers or keywords:", error);
            }
        };

        fetchAnswers();
    }, [question.qid]);

    const topKeywords = words
        .sort((a, b) => b.value - a.value)
        .slice(0, 10)
        .map(word => word.text);

    return (
        <div className="Result_page_short_answer">
            <QuestionBox questionText={`${id}. ${question.title}`} />
            <div className="Result_page_short_answer_answer">
                <QuestionImage imageUrl={imageUrl} />
                <div className="Result_page_short_answer_wordcloud">
                    <WordCloudBox words={words} />
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
            <AiAnswer answers={answers} />
        </div>
    );
};

export default ShortAnswer;
