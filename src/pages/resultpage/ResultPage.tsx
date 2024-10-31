
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MultiChoice from "../../components/resultpage/multichoice/multichoice";
import ShortAnswer from "../../components/resultpage/shortanswer/shortanswer";
import Layout from '../../layouts/layout/Layout';
import "./ResultPage.css";

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
  questions: Question[]; // questionList에서 questions로 수정
}

const ResultPage: React.FC = () => {
  const { surveyId } = useParams<{ surveyId: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}/survey/${surveyId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: SurveyData = await response.json();
        setQuestions(data.questions); // 수정된 부분 반영
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [surveyId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleSubmit = () => {
    navigate("/search-survey");
  };

  return (
    <Layout>
      <div className="Result_page_body">
        {questions && questions.map((question, index) => (
          question.questionType === "MC" ? (
            <MultiChoice key={question.qid} question={question} id={index + 1} />
          ) : (
            <ShortAnswer key={question.qid} question={question} id={index + 1} />
          )
        ))}
        <div className="Result_page_button-container">
          <button className="Result_page_submit_button" onClick={handleSubmit}>확인</button>
        </div>
      </div>
    </Layout>
  );
};

export default ResultPage;
