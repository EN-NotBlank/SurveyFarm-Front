import { useState } from "react";
import SaveQuestionButton from "../button/SaveQuestionButton";
import DeleteQuestionButton from "../button/DeleteQuestionButton";
import QuestionTitle from "./QuestionTitle";
import ChangeQuestionButton from "../button/ChangeQuestionButton";

interface SAQuestionProps {
    qid: number; // 고유한 ID
    onTitleChange: (qid: number, title: string) => void;
    onDeleteClick: (qid: number) => void; // 삭제 함수
}

const SAQuestion: React.FC<SAQuestionProps> = ({ qid, onTitleChange, onDeleteClick }) => {

    // 비활성화 상태관리
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    // 비활성화 호출함수
    const handleQuestionStatus = () => {
        setIsDisabled(!isDisabled);
    };

    // 제목바꿨을때 부모에게 값 전달하기
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onTitleChange(qid, e.target.value);
    }

    return (
        <div className="flex my-4 rounded-md">
            <div className="w-1/6">
                <img src="https://cdn-icons-png.flaticon.com/128/14919/14919351.png" className="w-full h-auto" />
            </div>
            <div className="flex-grow">
                <QuestionTitle isDisabled={isDisabled} onChange={handleTitleChange} />

                {!isDisabled && (
                    <SaveQuestionButton onSaveClicked={handleQuestionStatus} />
                )}
            </div>
            <div className="flex w-1/8">
                {isDisabled && (<ChangeQuestionButton onClick={handleQuestionStatus} />)}
                <DeleteQuestionButton onClick={() => onDeleteClick(qid)} /> {/* 고유 ID로 삭제 */}
            </div>
        </div>
    );
};

export default SAQuestion;