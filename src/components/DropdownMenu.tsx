import React, { useState } from 'react';

interface DropdownMenuProps {
    name: string;
    options: string[];  // 메뉴에 나타낼 옵션 목록
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ name, options }) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option: string) => {
        setSelectedOptions((prev) =>
            prev.includes(option)
                ? prev.filter((item) => item !== option) // 이미 선택한 경우 해제
                : [...prev, option] // 선택 추가
        );
    };

    const handleApply = () => {
        setIsOpen(false); // 적용하기 버튼 클릭 시 드롭다운 닫기
    };

    const handleReset = () => {
        setSelectedOptions([]); // 초기화 버튼 클릭 시 선택 해제
    };

    return (
        <div className="relative inline-block text-left mx-3">
            {/* 드롭다운 토글 버튼 */}
            <button
                onClick={toggleMenu}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
                {name}
            </button>

            {/* 드롭다운 메뉴 */}
            {isOpen && (
                <div className="absolute mt-2 w-[50vw] bg-white border border-gray-300 rounded-md shadow-lg z-10">
                    <div className="grid grid-cols-4 gap-2 p-2">
                        {options.map((option) => (
                            <div
                                key={option}
                                onClick={() => handleSelect(option)}
                                className={`cursor-pointer p-2 text-center rounded-md ${selectedOptions.includes(option)
                                    ? 'bg-white text-black border-black border-[1px]'
                                    : 'bg-gray-100 text-gray-700'
                                    }`}
                            >
                                {option}
                            </div>
                        ))}
                    </div>

                    {/* 초기화, 적용하기 버튼 */}
                    <div className="flex justify-between p-2 border-t border-gray-300">
                        <button
                            onClick={handleReset}
                            className="bg-gray-300 text-black px-4 py-2 rounded-md"
                        >
                            초기화
                        </button>
                        <button
                            onClick={handleApply}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
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
