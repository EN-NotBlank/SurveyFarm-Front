import { useState } from "react";
import Nav from "../layouts/Nav";
import Header from "../layouts/Header"
import ParticipantFilter from "../components/filter/ParticipantFilter";
import MCQuestion from "../components/question/MCQuestion";
import SAQuestion from "../components/question/SAQuestion";
import NewQuestionButton from "../components/button/NewQuestionButton";

const RequestSurvey = () => {
    // question 한개는 고유한id, type, title, option들 배열로 구성됨
    const [questions, updateQuestions] = useState<{ qid: number; type: string, title: string, options: [number, string][]; }[]>([]);
    const [questionCount, setQuestionCount] = useState(0); // 고유한 ID 생성을 위한 카운트

    // ParticipantFilter에서 선택된 값을 저장할 상태
    const [selectedRegion, setSelectedRegion] = useState<string[]>([]);
    const [selectedJob, setSelectedJob] = useState<string[]>([]);
    const [selectedGender, setSelectedGender] = useState<string[]>([]);
    const [selectedAge, setSelectedAge] = useState<string[]>([]);
    const [selectedHeadCnt, setSelectedHeadCnt] = useState<string[]>([]);
    const [selectedDuration, setSelectedDuration] = useState<string[]>([]);

    const handleNewQuestions = (type: string) => {
        if (questions.length < 10) {
            const newQuestion = { qid: questionCount, type, title: "", options: [] }; // 고유한 ID와 타입 저장
            setQuestionCount((prevCount) => prevCount + 1);
            updateQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
        }
    };

    const handleTitleChange = (qid: number, newTitle: string) => {
        updateQuestions((prevQuestions) =>
            prevQuestions.map((cur) =>
                cur.qid === qid ? { ...cur, title: newTitle } : cur // 조건이 일치하지 않으면 기존 cur 반환
            )
        );
    };

    // 질문의 고유ID, 옵션ID, 새로운 옵션 string
    const handleChangeOption = (qid: number, oid: number, text: string) => {
        updateQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
                question.qid === qid
                    ? {
                        ...question,
                        options: question.options.map(([id, optionText]) =>
                            id === oid ? [id, text] : [id, optionText]
                        ),
                    }
                    : question
            )
        );
    };

    // 옵션 추가 함수
    const handleAddOption = (qid: number, oid: number) => {
        updateQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
                question.qid === qid
                    ? {
                        ...question,
                        options: [...question.options, [oid, ""]],
                    }
                    : question
            )
        );
    };

    // 옵션 삭제 함수
    const handleDeleteOption = (qid: number, oid: number) => {
        updateQuestions((prevQuestions) =>
            prevQuestions.map((question) =>
                question.qid === qid
                    ? {
                        ...question,
                        options: question.options.filter((option) => option[0] !== oid),
                    }
                    : question
            )
        );
    };

    // 질문 자체 삭제
    const handleDeleteQuestion = (qid: number) => {
        if (window.confirm("해당 질문을 삭제하시겠습니까?")) {
            const newQuestions = questions.filter((q) => q.qid !== qid); // 고유한 ID로 삭제
            updateQuestions(newQuestions);
        }
    };

    // 여기다 서버로 보내는거 써야되는데 지금 일단 확인용으로 console에 찍자
    const handleSubmit = () => {
        // 콘솔에 선택된 데이터들을 확인하기 위한 로그
        // console.log(selectedRegion);
        // console.log(selectedJob);
        // console.log(selectedGender);
        // console.log(selectedAge);
        // console.log(selectedHeadCnt);
        // console.log(selectedDuration);
        // console.log(questions);

        const payload = {
            ownerId: 123,  // 지금은 더미값 
            selectedRegion,
            selectedJob,
            selectedGender,
            selectedAge,
            selectedHeadCnt,
            selectedDuration,
            description: "this is survey description",
            questionList: questions.map(question => ({
                title: question.title,
                // 객관식일때만 option 매핑. 주관식이면 빈배열 반환
                optionList: question.type === 'MC'
                    ? question.options.map(option => ({ text: option[1] }))
                    : [],
                questionType: question.type === 'MC' ? 'MC' : 'SA'
            }))
        };

        // json으로 변환
        const jsonPayload = JSON.stringify(payload);
        console.log(jsonPayload);

        // 서버로 POST
        fetch(`http://localhost:3000/requestSurvey`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: jsonPayload,  // POST니까 body에 담아 보내기
        })
            .then(response => {
                // 성공이면 response 객체 json으로 파싱해주자
                if (response.ok) {
                    return response.json();
                }
                throw new Error('에러요 에러');
            })
    };


    return (
        <div className="min-h-screen bg-gray-100">
            <Nav />
            <Header />
            <main className="px-[20vw]">
                <div className="border-b-2 border-black py-4">
                    <h1 className="text-2xl font-bold mx-8 my-5">조건 설정</h1>
                    <ParticipantFilter
                        onRegionChange={setSelectedRegion}
                        onJobChange={setSelectedJob}
                        onGenderChange={setSelectedGender}
                        onAgeChange={setSelectedAge}
                        onHeadCntChange={setSelectedHeadCnt}
                        onDurationChange={setSelectedDuration}
                    />
                </div>

                <div className="border-b-2 border-black">
                    <h1 className="text-2xl font-bold mx-8 my-5">설문 소개</h1>
                    <textarea
                        name="introduction"
                        id="introduction"
                        rows={10}
                        required
                        placeholder="설문에 대한 간략한 설명을 적어주세요"
                        className="w-full mb-5 rounded-lg bg-white border-2 border-solid border-black border-opacity-10 font-mono font-medium text-base"
                    ></textarea>
                </div>

                <div className="border-b-2 border-black">
                    <h1 className="text-2xl font-bold mx-8 my-5">설문 제작</h1>
                </div>

                <div className="my-4 rounded-md">
                    <div>
                        {questions.map((question) => (
                            <div key={question.qid} className="border-b border-black py-2">
                                {question.type === "MC" ? (
                                    <MCQuestion
                                        qid={question.qid}
                                        onTitleChange={handleTitleChange}
                                        onAddOption={handleAddOption}
                                        onDeleteOption={handleDeleteOption}
                                        onOptionChange={handleChangeOption}
                                        onDeleteClick={handleDeleteQuestion}
                                    />
                                ) : (
                                    <SAQuestion
                                        qid={question.qid}
                                        onTitleChange={handleTitleChange}
                                        onDeleteClick={handleDeleteQuestion}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-between">
                        <NewQuestionButton name="객관식" onNewClick={() => handleNewQuestions("MC")} />
                        <NewQuestionButton name="주관식" onNewClick={() => handleNewQuestions("SA")} />
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleSubmit} // 의뢰하기 버튼 클릭 시 서버로 데이터 전송하게 해야함
                        className="bg-cyan-950 w-[7vw] text-white font-extrabold px-4 py-2 rounded-md"
                    >
                        의뢰하기
                    </button>
                </div>
            </main>
        </div>
    );
};

export default RequestSurvey;