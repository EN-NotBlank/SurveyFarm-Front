import { useState } from "react";
import Nav from "./components/Nav";
import Header from "./components/Header";
import ParticipantFilter from "./components/filter/ParticipantFilter";
import MCQuestion from "./components/question/MCQuestion";
import SAQuestion from "./components/question/SAQuestion";
import NewQuestionButton from "./buttons/NewQuestionButton";

const App = () => {
  const [questions, updateQuestions] = useState<{ id: number; type: string }[]>([]); // 고유한 ID와 타입 저장
  const [questionCount, setQuestionCount] = useState(0); // 고유한 ID 생성을 위한 카운트

  const addQuestions = (type: string) => {
    if (questions.length < 10) {
      const newQuestion = { id: questionCount, type }; // 고유한 ID와 타입 저장
      setQuestionCount((prevCount) => prevCount + 1);
      updateQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    }
  };

  const deleteQuestion = (id: number) => {
    const newQuestions = questions.filter((q) => q.id !== id); // 고유한 ID로 삭제
    updateQuestions(newQuestions);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <Header />
      <main className="px-[20vw]">
        <div className="border-b-2 border-black py-4">
          <h1 className="text-2xl font-bold mx-8 my-5">조건 설정</h1>
          <ParticipantFilter />
        </div>

        <div className="border-b-2 border-black">
          <h1 className="text-2xl font-bold mx-8 my-5">설문 제작</h1>
        </div>

        <div className="border-[3px] border-black my-4 rounded-md">
          <div>
            {questions.map((question) => (
              <div key={question.id} className="border-b border-gray-300 py-2">
                {question.type === "MC" ? (
                  <MCQuestion id={question.id} onDelete={deleteQuestion} />
                ) : (
                  <SAQuestion id={question.id} onDelete={deleteQuestion} />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between border-[5px] border-yellow-500">
            <NewQuestionButton name="객관식" onClick={() => addQuestions("MC")} />
            <NewQuestionButton name="주관식" onClick={() => addQuestions("SA")} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
