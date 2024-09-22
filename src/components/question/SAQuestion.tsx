import { useState } from "react";
import FinishQuestionButton from "../../buttons/FinishQuestionButton";
import DeleteQuestionButton from "../../buttons/DeleteQuestionButton";
import QuestionHeader from "./QuestionHeader";

interface SAQuestionProps {
    id: number; // 고유한 ID
    onDelete: (id: number) => void; // 삭제 함수
}

const SAQuestion: React.FC<SAQuestionProps> = ({ id, onDelete }) => {

    const [isDisabled, setIsDisabled] = useState<boolean>(false); // 비활성화 관리

    const handleQuestionStatus = () => {
        setIsDisabled(!isDisabled); // 버튼 클릭 시 비활성화 상태로 변경
    };

    return (
        <div className="flex border-[3px] my-4 rounded-md">
            <div className="w-1/6 border-[4px]">
                <img src="https://upload.wikimedia.org/wikipedia/ko/4/4a/%EC%8B%A0%EC%A7%B1%EA%B5%AC.png" className="w-full h-auto" />
            </div>
            <div className="flex-grow border-[4px]">
                <QuestionHeader isDisabled={isDisabled} />
                <div className="px-2 py-2">
                    <textarea
                        name="input"
                        id="input"
                        rows={5}
                        required
                        disabled={isDisabled}
                        placeholder="상세설명 입력하세요"
                        className="w-full rounded-lg bg-black bg-opacity-5 border-2 border-solid border-black border-opacity-10 font-mono font-medium text-sm"
                    ></textarea>
                </div>
                <FinishQuestionButton isFinished={isDisabled} onFinish={handleQuestionStatus} />
            </div>
            <div className="w-1/8 border-[4px]">
                <DeleteQuestionButton onClick={() => onDelete(id)} /> {/* 고유 ID로 삭제 */}
            </div>
        </div>
    );
};

export default SAQuestion;
