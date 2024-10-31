import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./VotePage.css";
import MultiChoiceVote from "../../components/votepage/MultiChoiceVote";
import ShortAnswerVote from "../../components/votepage/ShortAnswerVote";
import Layout from '../../layouts/layout/Layout';

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
  questions: Question[];
}

interface Answer {
  qid: number;
  uid: number;
  text: string | string[];
}

const VotePage: React.FC = () => {
  const { surveyId } = useParams<{ surveyId: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const navigate = useNavigate();
  
  const uid = 2;

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
        setQuestions(data.questions); 
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? "Failed to load questions. Please try again." : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [surveyId]);

  const handleAnswerChange = (qid: number, uid: number, answer: string | string[]) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.filter((a) => a.qid !== qid);
      return [...updatedAnswers, { qid, uid, text: answer }];
    });
  };

  const handleSubmitAnswers = () => {
    console.log("Submitted Answers:", answers);
  
    const apiUrl = import.meta.env.VITE_API_URL;
  
    const submitData = answers.map(answer => ({
      uid: uid,
      qid: answer.qid,
      text: Array.isArray(answer.text) ? answer.text.join(", ") : answer.text,
    }));
  
    submitData.forEach((data) => {
      fetch(`${apiUrl}/answer`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(responseData => {
        if (responseData === true) { 
          navigate("/search-survey"); 
        }
      })
      .then(data => {
        console.log("Answer submitted successfully:", data);
      })
      .catch(error => {
        console.error("Error submitting answer:", error);
        setError("Failed to submit answer. Please try again.");
      });
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (questions.length === 0) {
    return <div>No questions available.</div>;
  }

  return (
    <Layout>
      <div className="vote-page-body">
        {questions.map((question, index) => (
          <div key={question.qid}>
            {question.questionType === "MC" ? (
              <MultiChoiceVote
                isMultipleChoice={question.isMultipleAnswer}
                answers={question.optionList.map(option => option.text)}
                question={question.title}
                id={index + 1}
                onAnswerChange={(answer) => handleAnswerChange(question.qid, uid, answer)}
              />
            ) : (
              <ShortAnswerVote
                question={question.title}
                id={index + 1}
                onAnswerChange={(answer) => handleAnswerChange(question.qid, uid, answer)}
              />
            )}
          </div>
        ))}
        <div className="Vote_page_button-container">
          <button className="Vote_page_submit_button" onClick={handleSubmitAnswers}>제출</button>
        </div>    
      </div>
    </Layout>
  );
};

export default VotePage;
