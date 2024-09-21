import React, { useState } from "react";
import AddButton from "../buttons/AddButton";
import QuestionHeader from "./QuestionHeader";
import Option from "./Option";
import FinishButton from "../buttons/FinishButton";

const Question = () => {
    const [options, updateOptions] = useState<JSX.Element[]>([]);

    const addOption = () => {
        if (options.length < 8) {
            // 새로운 Option 컴포넌트 생성
            const newOption = (
                <Option
                    key={options.length}
                    index={options.length + 1}
                    onDelete={() => deleteOption(options.length)}
                />
            );

            updateOptions((prevOptions) => [...prevOptions, newOption]); // 새로운 옵션 추가
        }
    };

    const deleteOption = (index: number) => {
        // 새로운 배열을 만들어서 특정 인덱스를 제거
        const newOptions = options.filter((_, i) => i !== index);
        updateOptions(newOptions);
        // console.log(options);
    }

    return (
        <div className="flex border-[3px] border-black my-4 rounded-md" style={{ height: `4 + ${options.length + AddButton.length + FinishButton.length}rem` }}> {/* 높이 설정 */}
            <div className="w-1/6 border-[4px] border-red-500">
                사진
            </div>
            <div className="w-5/6 border-[4px] border-green-500">
                <QuestionHeader />

                <div>
                    {options.map((option) => (
                        <div key={option.key} className="border-b border-gray-300 py-2">
                            {option}
                        </div>
                    ))}
                </div>

                <AddButton onClick={addOption} />
                {options.length > 0 && <FinishButton />} {/* options.length가 1 이상일 때 FinishButton 렌더링 */}
            </div>
        </div>
    );
};

export default Question;
