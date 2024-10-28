import React, { useState } from 'react';

interface Dropdown2DProps {
    name: string;
    options: string[];
    isOpen: boolean;
    onToggle: () => void;
    onApply: (selected: string[]) => void;  // 선택된 옵션을 부모에게 전달하는 콜백 함수
}

const Dropdown2D: React.FC<Dropdown2DProps> = ({ name, options, isOpen, onToggle, onApply }) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleSelect = (option: string) => {
        setSelectedOptions((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option) // 이미 선택한 경우 해제
                : [...prev, option] // 선택 추가
        );
    };

    const handleApply = () => {
        onApply(selectedOptions);  // 선택된 옵션을 부모 컴포넌트에 전달
        onToggle(); // 드롭다운 닫기
    };

    const handleReset = () => {
        setSelectedOptions([]); // 초기화 버튼 클릭 시 선택 해제
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
                <div className="absolute mt-2 w-[25vw] bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    <div className="grid grid-cols-4 gap-2 p-2">
                        {options.map((option) => (
                            <div
                                key={option}
                                onClick={() => handleSelect(option)}
                                className={`text-sm cursor-pointer py-2 px-3 text-center rounded-md ${selectedOptions.includes(option)
                                    ? 'bg-white text-black border-black border-[1px]'
                                    : 'bg-gray-100 text-gray-700'
                                    }`}
                            >
                                {option}
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center space-x-2 py-5 border-t border-gray-300">
                        <button
                            onClick={handleReset}
                            className="bg-white border-[1px] border-gray-400 text-black px-4 py-2 rounded-md"
                        >
                            초기화
                        </button>
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

export default Dropdown2D;