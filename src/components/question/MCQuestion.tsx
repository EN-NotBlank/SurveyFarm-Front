import { useState } from "react";
import AddOptionButton from "../../buttons/AddOptionButton";
import FinishQuestionButton from "../../buttons/FinishQuestionButton";
import DeleteQuestionButton from "../../buttons/DeleteQuestionButton";
import Option from "./Option";
import QuestionHeader from "./QuestionHeader";

interface MCQuestionProps {
    id: number; // 고유한 ID
    onDelete: (id: number) => void; // 삭제 함수
}

const MCQuestion: React.FC<MCQuestionProps> = ({ id, onDelete }) => {
    const [options, updateOptions] = useState<number[]>([]); // 숫자로 고유한 index 관리

    const addOption = () => {
        if (options.length < 8) {
            const newOptionIndex = options.length === 0 ? 0 : Math.max(...options) + 1;
            updateOptions((prevOptions) => [...prevOptions, newOptionIndex]); // 새로운 옵션 추가
        }
    };

    const deleteOption = (index: number) => {
        const newOptions = options.filter((opt) => opt !== index); // 특정 index 옵션만 제거
        updateOptions(newOptions); // 새로운 Option 배열로 상태를 업데이트
    };

    return (
        <div className="flex border-[3px] border-black my-4 rounded-md">
            <div className="w-1/6 border-[4px] border-red-500">사진</div>
            <div className="flex-grow border-[4px] border-green-500">
                <QuestionHeader />

                <div>
                    {options.map((option, idx) => (
                        <div key={option} className="border-b border-gray-300 py-2">
                            <Option
                                key={option} // 고유한 key값을 그대로 유지
                                index={idx + 1} // 인덱스는 1부터 증가하는 값을 유지
                                onDelete={() => deleteOption(option)} // 고유한 option 값으로 삭제
                            />
                        </div>
                    ))}
                </div>

                <AddOptionButton onClick={addOption} />
                {options.length > 0 && <FinishQuestionButton />}
            </div>
            <div className="w-1/8 border-[4px]">
                <DeleteQuestionButton onClick={() => onDelete(id)} /> {/* 고유 ID로 삭제 */}
            </div>
        </div>
    );
};

export default MCQuestion;
