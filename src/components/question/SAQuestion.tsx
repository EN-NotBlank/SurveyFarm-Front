import { useState } from "react";
import SaveQuestionButton from "../../buttons/SaveQuestionButton";
import DeleteQuestionButton from "../../buttons/DeleteQuestionButton";
import QuestionHeader from "./QuestionHeader";
import ChangeQuestionButton from "../../buttons/ChangeQuestionButton";

interface SAQuestionProps {
    id: number; // 고유한 ID
    onDeleteClick: (id: number) => void; // 삭제 함수
}

const SAQuestion: React.FC<SAQuestionProps> = ({ id, onDeleteClick }) => {

    const [isDisabled, setIsDisabled] = useState<boolean>(false); // 비활성화 관리

    const handleQuestionStatus = () => {
        setIsDisabled(!isDisabled); // 버튼 클릭 시 비활성화 상태로 변경
    };

    return (
        <div className="flex my-4 rounded-md">
            <div className="w-1/6">
                <img src="https://cdn-icons-png.flaticon.com/128/14919/14919351.png" className="w-full h-auto" />
            </div>
            <div className="flex-grow">
                <QuestionHeader isDisabled={isDisabled} />
                <div className="px-2 py-2">
                    <textarea
                        name="input"
                        id="input"
                        rows={5}
                        required
                        disabled={isDisabled}
                        placeholder="부가설명을 입력하세요"
                        className="w-full rounded-lg bg-black bg-opacity-5 border-2 border-solid border-black border-opacity-10 font-mono font-medium text-sm"
                    ></textarea>
                </div>
                {!isDisabled && (
                    <SaveQuestionButton onSaveClicked={handleQuestionStatus} />
                )}
            </div>
            <div className="flex w-1/8">
                {isDisabled && (<ChangeQuestionButton onClick={handleQuestionStatus} />)}
                <DeleteQuestionButton onClick={() => onDeleteClick(id)} /> {/* 고유 ID로 삭제 */}
            </div>
        </div>
    );
};

export default SAQuestion;
