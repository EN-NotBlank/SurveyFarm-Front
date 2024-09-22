import React, { useState } from 'react';

interface DropdownMenuProps {
    name: string;
    options: string[];  // 메뉴에 나타낼 옵션 목록
    isOpen: boolean;
    onToggle: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ name, options, isOpen, onToggle }) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const handleSelect = (option: string) => {
        setSelectedOptions((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option) // 이미 선택한 경우 해제
                : [...prev, option] // 선택 추가
        );
    };

    const handleApply = () => {
        onToggle(); // 해당 메뉴 닫기
    };

    const handleReset = () => {
        setSelectedOptions([]); // 초기화 버튼 클릭 시 선택 해제
    };

    return (
        <div className="relative inline-block text-left">
            {/* 드롭다운 토글 버튼 */}
            <button onClick={onToggle} className="bg-blue-500 w-[5vw] text-white px-4 py-2 rounded-md">
                {name}
            </button>

            {/* 드롭다운 메뉴 */}
            {isOpen && (
                <div className="absolute mt-2 w-[30vw] bg-white border border-gray-300 rounded-md shadow-lg z-10">
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

                    {/* 초기화, 적용하기 버튼 */}
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

export default DropdownMenu;
