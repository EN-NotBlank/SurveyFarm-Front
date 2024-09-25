import { useState } from "react";
import AddOptionButton from "../../buttons/AddOptionButton";
import SaveQuestionButton from "../../buttons/SaveQuestionButton";
import DeleteQuestionButton from "../../buttons/DeleteQuestionButton";
import Option from "./Option";
import QuestionTitle from "./QuestionTitle";
import ChangeQuestionButton from "../../buttons/ChangeQuestionButton";

interface MCQuestionProps {
    id: number; // Question의 고유한 ID
    onDeleteClick: (id: number) => void;
    onTitleChange: (id: number, title: string) => void; // 질문 텍스트를 상위로 전달하는 함수
    onOptionChange: (id: number, index: number, text: string) => void; // 옵션 텍스트를 상위로 전달하는 함수
}

const MCQuestion: React.FC<MCQuestionProps> = ({ id, onDeleteClick, onTitleChange, onOptionChange }) => {
    const [options, updateOptions] = useState<number[]>([]); // 선택지 관리
    const [isChecked, setIsChecked] = useState<boolean>(true); // 체크박스 관리
    const [isDisabled, setIsDisabled] = useState<boolean>(false); // 비활성화 관리

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onTitleChange(id, e.target.value); // 질문 텍스트를 상위로 전달
    };

    // 매개변수로 받은 질문의 고유 id만 넣어서 상위 컴포넌트 함수 호출
    const handleOptionChange = (index: number, text: string) => {
        onOptionChange(id, index, text); // 상위 컴포넌트 함수 호출
    };

    const addOption = () => {
        if (options.length < 8) {
            const newOptionIndex = options.length === 0 ? 0 : Math.max(...options) + 1;
            updateOptions((prevOptions) => [...prevOptions, newOptionIndex]); // 새로운 옵션 추가
        } else {
            window.alert("선택지는 8개 이하만 가능합니다!");
        }
    };

    const deleteOption = (index: number) => {
        const newOptions = options.filter((opt) => opt !== index); // 특정 index 옵션만 제거
        updateOptions(newOptions); // 새로운 Option 배열로 업데이트
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
    };

    const handleQuestionStatus = () => {
        setIsDisabled(!isDisabled); // 버튼 클릭 시 비활성화 상태로 변경
    };

    return (
        <div className="flex my-4 rounded-md">
            <div className="w-1/6">
                <img src="https://cdn-icons-png.flaticon.com/128/8371/8371275.png" className="w-full h-auto" />
                <div className="flex px-2 py-2 mt-auto">
                    <input
                        id="redCheckBox"
                        type="checkbox"
                        className="my-0.5 w-5 h-5 accent-blue-500"
                        checked={isChecked}
                        onChange={handleCheckboxChange} // 상태 변경 함수 연결
                    />
                    <span className="ml-2 text-l font-semibold">복수선택 허용</span>
                </div>
            </div>

            <div className="flex-grow">
                <QuestionTitle isDisabled={isDisabled} onChange={handleTitleChange} />

                <div>
                    {options.map((option, idx) => (
                        <div key={option} className="py-2">
                            <Option
                                key={option} // 고유한 key값을 그대로 유지
                                index={idx + 1} // 인덱스는 1부터 증가하는 값을 유지
                                onChange={(text) => handleOptionChange(idx, text)}
                                onDelete={() => deleteOption(option)} // 고유한 option 값으로 삭제
                                disabled={isDisabled} // 비활성화 상태 전달
                            />
                        </div>
                    ))}
                </div>

                <AddOptionButton onClick={addOption} disabled={isDisabled} />
                {options.length > 0 && !isDisabled && (
                    <SaveQuestionButton onSaveClicked={handleQuestionStatus} />
                )}
            </div>

            <div className="flex w-1/8 py-1">
                {isDisabled && (<ChangeQuestionButton onClick={handleQuestionStatus} />)}
                <DeleteQuestionButton onClick={() => onDeleteClick(id)} /> {/* 고유 ID로 삭제 */}
            </div>
        </div>
    );
};

export default MCQuestion;
