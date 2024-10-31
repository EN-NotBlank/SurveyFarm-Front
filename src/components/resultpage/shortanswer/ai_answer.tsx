import { useEffect, useRef, useState } from "react";
import "./ai_answer.css";

interface AiAnswerProps {
    answers: string[]; 
}

const AiAnswer: React.FC<AiAnswerProps> = ({ answers }) => {
    const [displayedAnswers, setDisplayedAnswers] = useState<string[]>([]);
    const [summary, setSummary] = useState<string>("");
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const loader = useRef<HTMLDivElement | null>(null);

    const fetchAnswers = (pageNum: number) => {
        return answers.slice((pageNum - 1) * 5, pageNum * 5);
    };

    useEffect(() => {
        const loadAnswers = () => {
            const newAnswers = fetchAnswers(page);
            setDisplayedAnswers((prevAnswers) => {
                const uniqueAnswers = Array.from(new Set([...prevAnswers, ...newAnswers]));
                return uniqueAnswers;
            });
        };

        loadAnswers();
    }, [page, answers]); 

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            { threshold: 1 }
        );

        if (loader.current) {
            observer.observe(loader.current);
        }

        return () => {
            if (loader.current) {
                observer.unobserve(loader.current);
            }
        };
    }, []);

    useEffect(() => {
        const summarizeAnswers = async () => {
            if (displayedAnswers.length === 0) return;

            setIsLoading(true);
            try {
                const apiUrl = import.meta.env.VITE_API_URL;
                const requestBody = { answers: displayedAnswers };
                
                const response = await fetch(`${apiUrl}/gpt/summarize`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody), 
                });

                const contentType = response.headers.get("Content-Type");

                if (response.ok && contentType && contentType.includes("application/json")) {
                    const data = await response.json();
                    setSummary(data.summary);
                } else if (response.ok) {
                    const errorText = await response.text();
                    setSummary(errorText); 
                } else {
                    const errorText = await response.text();
                    console.error("Failed to fetch summary:", errorText);
                }
            } catch (error) {
                console.error("Error fetching summary:", error);
            } finally {
                setIsLoading(false);
            }
        };

        summarizeAnswers();
    }, [displayedAnswers]);

    return (
        <div className="Result_page_short_answer_ai">
            <div className="Result_page_short_answer_ai_list">
                {displayedAnswers.map((answer, index) => (
                    <div key={index} className="answer-item">
                        {answer}
                    </div>
                ))}
                {displayedAnswers.length < answers.length && !isLoading && (
                    <div ref={loader} className="loading">
                        Loading...
                    </div>
                )}
            </div>
            <div className="Result_page_short_answer_ai_summary">
                {isLoading ? <p>Summarizing...</p> : summary && <p>{summary}</p>}
            </div>
        </div>
    );
};

export default AiAnswer;
