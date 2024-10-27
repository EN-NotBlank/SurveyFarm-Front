import React, { useEffect, useRef, useState } from 'react';
import { FilterGroup, SurveyFilterParams } from '../../types/SurveyCard';
import './SurveyFilterDropdown.css';

interface FilterDropdownProps {
  filterGroup: FilterGroup;
  selectedValue: string;
  onSelect: (key: keyof SurveyFilterParams, value: string) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  filterGroup,
  selectedValue,
  onSelect
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
    onSelect(filterGroup.key, value);
    setIsOpen(false);
  };

  const selectedLabel = filterGroup.options.find(
    option => option.value === selectedValue
  )?.label || filterGroup.options[0].label;

  return (
    <div className="filter-dropdown" ref={dropdownRef}>
      <button
        className="dropdown-button"
        onClick={() => setIsOpen(!isOpen)}
      >
        {filterGroup.title}: {selectedLabel} ▼
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {filterGroup.options.map((option) => (
            <button
              key={option.value}
              className={`dropdown-item ${selectedValue === option.value ? 'selected' : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
