import React, { useEffect, useRef, useState } from 'react';
import { FilterGroup, SurveyFilterParams } from '../../types/SurveyCard';
import './SurveyFilterDropdown.css';

interface FilterDropdownProps {
  filterGroup: FilterGroup;
  selectedValues: string[];
  onSelect: (key: keyof SurveyFilterParams, values: string[]) => void;
  onApply: () => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  filterGroup,
  selectedValues,
  onSelect,
  onApply
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (value: string) => {
    // "전체"를 선택했을 경우 모든 선택된 값 초기화
    if (value === '전체') {
      onSelect(filterGroup.key, []);
      return;
    }

    const currentIndex = selectedValues.indexOf(value);
    let newValues: string[];

    if (currentIndex === -1) {
      newValues = [...selectedValues, value];
    } else {
      newValues = selectedValues.filter(item => item !== value);
    }

    onSelect(filterGroup.key, newValues);
  };

  // handle apply
  const handleApply = () => {
    onApply();
    setIsOpen(false);
  }

  // 선택된 값 표시하는 함수
  const renderSelectedValues = () => {
    if (selectedValues.length === 0) return '무관'; 

    const uniqueCount = selectedValues.length - 1;
    return uniqueCount > 0 ? `${selectedValues[0]} 외 ${uniqueCount}` : selectedValues[0];
  };

  return (
    <div className="filter-dropdown" ref={dropdownRef}>
      <button
        className="dropdown-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {filterGroup.title} ▼ <span className="selected-value">{renderSelectedValues()}</span>
      </button>

      {isOpen && (
        <div className="dropdown-content">
          <div className='dropdown-menu'>
            {filterGroup.options.map((option) => (
              <button
                key={option.value}
                className={`dropdown-item ${selectedValues.includes(option.value) ? 'selected' : ''}`}
                onClick={() => handleSelect(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="dropdown-actions">
            <button onClick={() => onSelect(filterGroup.key, [])}>초기화</button>
            <button onClick={() => handleApply()} className="apply-button">적용하기</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
