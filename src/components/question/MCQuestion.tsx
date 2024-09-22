import React, { useState } from "react";
import AddOptionButton from "../../buttons/AddOptionButton";
import FinishQuestionButton from "../../buttons/FinishQuestionButton";
import DeleteQuestionButton from "../../buttons/DeleteQuestionButton";
import Option from "./Option";
import QuestionHeader from "./QuestionHeader";

// multiple-choice question
const MCQuestion = () => {
    const [options, updateOptions] = useState<JSX.Element[]>([]);

    const addOption = () => {
        if (options.length < 8) {
            // 새로운 Option 컴포넌트 생성
            const newOption = (
                <Option
                    key={options.length}
                    index={options.length}
                    onDelete={deleteOption}
                />
            );

            updateOptions((prevOptions) => [...prevOptions, newOption]); // 새로운 옵션 추가
        }
    };

    const deleteOption = (index: number) => {
        // 배열에서 특정 조건이 만족하는 원소들만 추출하여 새로운 배열을 만든다.
        // filter 함수를 통해 만족하는 경우: 새로운 배열을 만들어서 그 배열에 넣는다.
        // filter 함수를 통해 만족하지 않는 경우: 넣지 않는다.
        // map 
        const newOptions = options.filter((_, i) => i !== index);

        // 새로운 Option 배열로 상태를 업데이트
        updateOptions(newOptions);
    };

    return (
        <div className="flex border-[3px] border-black my-4 rounded-md" style={{ height: `4 + ${options.length + AddOptionButton.length + FinishQuestionButton.length}rem` }}> {/* 높이 설정 */}
            <div className="w-1/6 border-[4px] border-red-500">
                사진
            </div>
            <div className="flex-grow border-[4px] border-green-500">
                <QuestionHeader />

                <div>
                    {options.map((option) => (
                        <div key={option.key} className="border-b border-gray-300 py-2">
                            {option}
                        </div>
                    ))}
                </div>

                <AddOptionButton onClick={addOption} />
                {options.length > 0 && <FinishQuestionButton />} {/* options.length가 1 이상일 때 FinishButton 렌더링 */}
            </div>
            <div className="w-1/8 border-[4px]">
                <DeleteQuestionButton onClick={() => deleteOption} />
            </div>
        </div>
    );
};

export default MCQuestion;
