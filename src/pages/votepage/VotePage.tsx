import React, { useEffect, useState } from "react";
import "./VotePage.css";
import MultiChoiceVote from "../../components/votepage/MultiChoiceVote";
import ShortAnswerVote from "../../components/votepage/ShortAnswerVote";

interface QuestionOption {
  text: string;
}

interface Question {
  qid: number;
  title: string;
  optionList: QuestionOption[];
  isMultipleAnswer: boolean;
  questionType: "MC" | "SA";
}

interface SurveyData {
  sid: number;
  ownerId: number;
  selectedRegion: string[];
  selectedJob: string[];
  selectedGender: string[];
  selectedAge: string[];
  headCnt: number;
  point: number;
  endAt: string;
  description: string | null;
  questionList: Question[];
}

interface Answer {
  qid: number;
  answer: string | string[];
}

const VotePage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const surveyId = 2; 

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/survey/${surveyId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer`, 
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: SurveyData = await response.json();
        setQuestions(data.questionList); 
      } catch (err) {
        console.error("Fetch error:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [surveyId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (questions.length === 0) {
    return <div>No questions available.</div>;
  }

  const handleAnswerChange = (qid: number, answer: string | string[]) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.filter((a) => a.qid !== qid);
      return [...updatedAnswers, { qid, answer }];
    });
  };

  const handleSubmitAnswers = () => {
    console.log("Submitted Answers:", answers);
    
    // 서버에 전송하려면 다음과 같이 fetch를 사용합니다:
    /*
    const apiUrl = import.meta.env.VITE_API_URL;
    fetch(`${apiUrl}/submit-answers`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer`, 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ surveyId, answers }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log("Answers submitted successfully:", data);
    })
    .catch(error => {
      console.error("Error submitting answers:", error);
    });
    */
  };

  return (
    <div className="vote-page-body">
      {questions.map((question,index) => (
        <div key={question.qid}>
          {question.questionType === "MC" ? (
            <MultiChoiceVote
              isMultipleChoice={question.isMultipleAnswer}
              answers={question.optionList.map(option => option.text)}
              question={question.title}
              id={index + 1} 
              onAnswerChange={(answer) => handleAnswerChange(question.qid, answer)}
            />
          ) : (
            <ShortAnswerVote
              question={question.title}
              id={index + 1} 
              onAnswerChange={(answer) => handleAnswerChange(question.qid, answer)}
            />
          )}
        </div>
      ))}
        <div className="Vote_page_button-container">
            <button className="Vote_page_submit_button" onClick={handleSubmitAnswers}>제출</button>
        </div>    
      </div>
  );
};

export default VotePage;
