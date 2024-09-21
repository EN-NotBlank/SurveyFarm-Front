import { useState } from "react";
import AddButton from "../buttons/AddButton";
import QuestionHeader from "./QuestionHeader";
import Option from "./Option";

const Question = () => {

    // updateOptions가 호출되면 options에 반영하고 화면 렌더링해라
    const [options, updateOptions] = useState<JSX.Element[]>([]);

    const addOption = () => {
        const newOption = <Option key={options.length} />; // 새로운 Option 컴포넌트 생성
        updateOptions((prevOptions) => [...prevOptions, newOption]); // 새로운 옵션 추가
    };

    return (
        <div className="flex border-[3px] border-black h-[20vh] my-4">
            <div className="w-1/6 border-[2px] border-red-500">
                사진
            </div>
            <div className="w-5/6 border-[3px] border-green-500">
                <QuestionHeader />
                <div>
                    {options.map((option) => (
                        <div key={option.key} className="border-b border-gray-300 py-2">
                            {option}
                        </div>
                    ))}
                </div>
                <AddButton onClick={addOption} />
            </div>
        </div>
    );
};

export default Question;