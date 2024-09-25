import { useState } from "react";
import SaveQuestionButton from "../../buttons/SaveQuestionButton";
import DeleteQuestionButton from "../../buttons/DeleteQuestionButton";
import QuestionTitle from "./QuestionTitle";
import ChangeQuestionButton from "../../buttons/ChangeQuestionButton";

interface SAQuestionProps {
    id: number; // 고유한 ID
    onTitleChange: (id: number, title: string) => void;
    onDeleteClick: (id: number) => void; // 삭제 함수
}

const SAQuestion: React.FC<SAQuestionProps> = ({ id, onTitleChange, onDeleteClick }) => {

    // 비활성화 상태관리
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    // 비활성화 호출함수
    const handleQuestionStatus = () => {
        setIsDisabled(!isDisabled);
    };

    // 제목바꿨을때 부모에게 값 전달하기
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onTitleChange(id, e.target.value);
    }

    return (
        <div className="flex my-4 rounded-md">
            <div className="w-1/6">
                <img src="https://cdn-icons-png.flaticon.com/128/14919/14919351.png" className="w-full h-auto" />
            </div>
            <div className="flex-grow">
                <QuestionTitle isDisabled={isDisabled} onChange={handleTitleChange} />

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
