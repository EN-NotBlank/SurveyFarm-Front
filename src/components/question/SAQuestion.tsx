import React from "react";
import FinishQuestionButton from "../../buttons/FinishQuestionButton";
import DeleteQuestionButton from "../../buttons/DeleteQuestionButton";
import QuestionHeader from "./QuestionHeader";

interface SAQuestionProps {
    id: number; // 고유한 ID
    onDelete: (id: number) => void; // 삭제 함수
}

const SAQuestion: React.FC<SAQuestionProps> = ({ id, onDelete }) => {
    return (
        <div className="flex border-[3px] border-black my-4 rounded-md">
            <div className="w-1/6 border-[4px] border-red-500">사진</div>
            <div className="flex-grow border-[4px] border-green-500">
                <QuestionHeader />
                <div className="px-2 py-2">
                    <textarea
                        name="input"
                        id="input"
                        rows={5}
                        required
                        placeholder="상세설명 입력하세요"
                        className="w-full rounded-lg bg-black bg-opacity-5 border-2 border-solid border-black border-opacity-10 font-mono font-medium text-sm"
                    ></textarea>
                </div>
                <FinishQuestionButton />
            </div>
            <div className="w-1/8 border-[4px]">
                <DeleteQuestionButton onClick={() => onDelete(id)} /> {/* 고유 ID로 삭제 */}
            </div>
        </div>
    );
};

export default SAQuestion;
