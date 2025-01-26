import React, { ChangeEvent, InputHTMLAttributes, useEffect } from 'react';
import styled, { css } from 'styled-components';

// PhoneInput, RentalInput에서 사용하기 위해 export
export interface TextInputProps
  extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  placeholder: string;
  errorMessage?: string;
  area?: boolean;
  disabled?: boolean;
  value?: string;
  handleChange?: (value: string) => void;
  setErrorStatus?: (hasError: boolean) => void;
}

const errorBorderStyle = css`
  border-color: red;
`;

const disabledStyle = css`
  background-color: rgba(245, 245, 245, 1);
`;

const areaInputStyle = css`
  height: 100px;
  resize: none;
  overflow: auto;
`;

const Input = styled.input.attrs<TextInputProps>(({ area }) => ({
  as: area ? 'textarea' : 'input',
}))<TextInputProps & { hasError: boolean }>`
  display: block;
  width: 100%;
  padding: 8px 12px 8px 12px;
  outline: none;
  border-radius: 4px;
  gap: 8px;
  font-size: 14px;
  line-height: 17.5px;
  color: rgba(51, 51, 51, 1);
  background-color: rgba(245, 245, 245, 1);
  ${({ disabled }) => disabled && disabledStyle}
  ${({ hasError }) => hasError && errorBorderStyle}
  ${({ area }) => area && areaInputStyle} // TextAreaInput
`;

const InputWrapper = styled.div`
  width: 100%;
  flex-direction: column;
  display: flex;
  gap: 4px;
`;

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
`;

// Component
const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  errorMessage = '',
  area = false,
  disabled = false,
  value = '',
  handleChange = () => {},
  setErrorStatus = () => {},
  ...props
}) => {
  const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    handleChange(inputValue);
  };

  useEffect(() => {
    const hasError = !!errorMessage;
    if (setErrorStatus) {
      setErrorStatus(hasError);
    }
  }, [errorMessage, setErrorStatus]);

  return (
    <InputWrapper>
      <InputContainer>
        <Input
          placeholder={placeholder}
          hasError={!!errorMessage}
          area={area}
          disabled={disabled}
          value={value}
          onChange={handleValueChange}
          {...props}
        />
      </InputContainer>
    </InputWrapper>
  );
};

export default TextInput;
