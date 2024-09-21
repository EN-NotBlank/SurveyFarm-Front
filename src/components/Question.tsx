import { useState } from "react";
import AddButton from "../buttons/AddButton";
import FinishButton from "../buttons/FinishButton";
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
        // height가 options 개수에 따라 변하게 하고 안의 component들을 h-full로 하여 변화에 맞게끔 같이 커지게 만들기
        <div className="flex border-[3px] border-black h-[20vh] my-4" style={{ height: `${4 + options.length * 4}rem` }}>
            <div className="w-1/6 h-full border-[2px] border-red-500">
                사진
            </div>
            <div className="w-5/6 h-full border-[3px] border-green-500">
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