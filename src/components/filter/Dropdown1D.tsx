import React, { useState } from 'react';

interface Dropdown1DProps {
    name: string;
    options: string[];
    isOpen: boolean;
    onToggle: () => void;
    onApply: (selected: string) => void;  // 선택된 옵션을 부모에게 전달하는 콜백 함수
}

const Dropdown1D: React.FC<Dropdown1DProps> = ({ name, options, isOpen, onToggle, onApply }) => {

    // selectedOption은 String 형이고 초기값은 빈문자열 ""
    // setSelectedOptions로 값을 바꿀 수 있음
    const [selectedOption, setSelectedOptions] = useState<string>("");

    const handleSelect = (option: string) => {
        setSelectedOptions(option);
    };

    const handleApply = () => {
        onApply(selectedOption);  // 선택된 옵션을 부모 컴포넌트에 전달
        onToggle(); // 드롭다운 닫기
    };

    return (
        <div className="relative inline-block text-left">
            <button onClick={onToggle} className="flex justify-between w-[5vw] text-white px-3 py-2 rounded-md" style={{ backgroundColor: '#577FF8' }}>
                {name}
                <img src={isOpen
                    ? "https://cdn-icons-png.flaticon.com/128/3385/3385656.png"
                    : "https://cdn-icons-png.flaticon.com/128/32/32195.png"}
                    className="w-4 h-4 my-1"
                />
            </button>

            {isOpen && (
                <div className="absolute mt-2 w-[8vw] bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    <div className="flex flex-col p-2">
                        {options.map((option) => (
                            <div
                                key={option}
                                onClick={() => handleSelect(option)}
                                // 띄워주고 싶으면 my-0.5 추가
                                className={`text-sm cursor-pointer py-2 px-3 text-center rounded-md
                                    ${selectedOption === option ? 'bg-white text-black border-black border-[1px]' : 'bg-gray-100 text-gray-700'}`}
                            >
                                {option}
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center space-x-2 py-5 border-t border-gray-300">
                        <button
                            onClick={handleApply}
                            className="bg-blue-800 text-white px-4 py-2 rounded-md"
                        >
                            적용하기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dropdown1D;