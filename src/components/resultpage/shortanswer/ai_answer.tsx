import React, { useState, useEffect, useRef } from "react";
import "./ai_answer.css";

const AiAnswer = () => {
    const [answers, setAnswers] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const loader = useRef(null);

    const allAnswers = [
        "Answer 1 aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaad",
        "Answer 2 aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaad",
        "Answer 3",
        "Answer 4",
        "Answer 5",
        "Answer 6",
        "Answer 7",
        "Answer 8",
        "Answer 9",
        "Answer 10",
        "Answer 11",
        "Answer 12",
        "Answer 13",
        "Answer 14",
        "Answer 15",
        "Answer 16",
        "Answer 17",
        "Answer 18",
        "Answer 19",
        "Answer 20",
    ];

    const fetchAnswers = (pageNum: number) => {
        return allAnswers.slice((pageNum - 1) * 5, pageNum * 5);
    };

    useEffect(() => {
        const loadAnswers = () => {
            const newAnswers = fetchAnswers(page);
            setAnswers((prevAnswers) => {
                const uniqueAnswers = Array.from(new Set([...prevAnswers, ...newAnswers]));
                return uniqueAnswers;
            });
        };

        loadAnswers();
    }, [page]);

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

    return (
        <div className="Result_page_short_answer_ai">
            <div className="Result_page_short_answer_ai_list">
                {answers.map((answer, index) => (
                    <div key={index} className="answer-item">
                        {answer}
                    </div>
                ))}
                {answers.length < allAnswers.length && (
                    <div ref={loader} className="loading">
                        Loading...
                    </div>
                )}
            </div>
            <div className="Result_page_short_answer_ai_summary"></div>
        </div>
    );
};

export default AiAnswer;
