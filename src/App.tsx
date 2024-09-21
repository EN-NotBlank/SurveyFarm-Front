import { useState } from "react";
import Question from "./components/Question";
import NewButton from "./buttons/NewButton";
import Nav from "./components/Nav";
import Header from "./components/Header"
import DropDown from "./components/Dropdown";

const App = () => {

  const [questions, updateQuestions] = useState<JSX.Element[]>([]);

  const addQuestions = () => {
    if (questions.length < 10) {
      // 새로운 Option 컴포넌트 생성
      const newQuestion = (
        <Question />
      );

      updateQuestions((prevQuestions) => [...prevQuestions, newQuestion]); // 새로운 옵션 추가
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Nav />
      <Header />
      <main className='px-[20vw]'>
        <div>
          <h1 className="text-2xl font-bold mx-8 my-5">조건 설정</h1>
          <DropDown />
        </div>

        <div>
          <h1 className="text-2xl font-bold mx-8 my-5">설문 제작</h1>
        </div>

        <div className="border-[3px] border-black my-4 rounded-md" style={{ height: `4 + ${Question.length}rem` }}> {/* 높이 설정 */}

          <div>
            {questions.map((question) => (
              <div key={question.key} className="border-b border-gray-300 py-2">
                {question}
              </div>
            ))}
          </div>

          <div className="flex justify-between border-[5px] border-yellow-500">
            <NewButton name='객관식' onClick={addQuestions} />
            <NewButton name='주관식' onClick={addQuestions} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;