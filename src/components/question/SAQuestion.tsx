import React from "react";
import QuestionHeader from "./QuestionHeader";
import FinishQuestionButton from "../../buttons/FinishQuestionButton";
import DeleteQuestionButton from "../../buttons/DeleteQuestionButton";

// short-answer question
const SAQuestion = () => {

    return (
        <div className="flex border-[3px] border-black my-4 rounded-md" style={{ height: `4 + ${FinishQuestionButton.length}rem` }}> {/* 높이 설정 */}
            <div className="w-1/6 border-[4px] border-red-500">
                사진
            </div>
            <div className="flex-grow border-[4px] border-green-500">
                <QuestionHeader />
                <div className="px-2 py-2">
                    <textarea name="input" id="input"
                        rows={5}
                        required
                        placeholder="상세설명 입력하세요"
                        className="w-full rounded-lg  bg-black bg-opacity-5 border-2 border-solid border-black border-opacity-10 font-mono font-medium text-sm"
                    ></textarea>
                </div>
                <FinishQuestionButton />
            </div>
            <div className="w-1/8 border-[4px]">
                <DeleteQuestionButton onClick={() => deleteOption} />
            </div>
        </div>
    );
};

export default SAQuestion;
