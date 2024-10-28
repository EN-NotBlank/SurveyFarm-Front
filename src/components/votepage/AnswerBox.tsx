import React, { ReactNode } from 'react';
import './AnswerBox.css';

interface AnswerBoxProps {
  children: ReactNode;
  disabled: boolean;
  checked: boolean;
  onChange: (checked: boolean) => void;
  type: 'single' | 'multiple'; 
}

const AnswerBox: React.FC<AnswerBoxProps> = ({ children, disabled, checked, onChange, type }) => {
  return (
    <label className="custom-checkbox">
      <input
        className="checkbox-input"
        type={type === 'single' ? 'radio' : 'checkbox'}
        disabled={disabled}
        checked={checked}
        onChange={({ target: { checked } }) => onChange(checked)}
      />
      <span className="custom-checkmark"></span>
      {children}
    </label>
  );
};

export default AnswerBox;