import { useState } from "react";
import AddOptionButton from "../../buttons/AddOptionButton";
import FinishQuestionButton from "../../buttons/FinishQuestionButton";
import DeleteQuestionButton from "../../buttons/DeleteQuestionButton";
import Option from "./Option";
import QuestionHeader from "./QuestionHeader";

interface MCQuestionProps {
    id: number; // Question의 고유한 ID
    onDelete: (id: number) => void;
}

const MCQuestion: React.FC<MCQuestionProps> = ({ id, onDelete }) => {
    const [options, updateOptions] = useState<number[]>([]); // 선택지 관리
    const [isChecked, setIsChecked] = useState<boolean>(true); // 체크박스 관리
    const [isDisabled, setIsDisabled] = useState<boolean>(false); // 비활성화 관리

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
        <div className="flex border-[3px] my-4 rounded-md">
            <div className="w-1/6 border-[4px]">
                <img src="https://sitem.ssgcdn.com/87/70/47/item/1000026477087_i1_750.jpg" className="w-full h-auto" />
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

            <div className="flex-grow border-[4px]">
                <QuestionHeader isDisabled={isDisabled} />

                <div>
                    {options.map((option, idx) => (
                        <div key={option} className="border-b border-gray-300 py-2">
                            <Option
                                key={option} // 고유한 key값을 그대로 유지
                                index={idx + 1} // 인덱스는 1부터 증가하는 값을 유지
                                onDelete={() => deleteOption(option)} // 고유한 option 값으로 삭제
                                disabled={isDisabled} // 비활성화 상태 전달
                            />
                        </div>
                    ))}
                </div>

                <AddOptionButton onClick={addOption} disabled={isDisabled} />
                {options.length > 0 && <FinishQuestionButton isFinished={isDisabled} onFinish={handleQuestionStatus} />}
            </div>

            <div className="w-1/8 border-[4px]">
                <DeleteQuestionButton onClick={() => onDelete(id)} /> {/* 고유 ID로 삭제 */}
            </div>
        </div>
    );
};

export default MCQuestion;
