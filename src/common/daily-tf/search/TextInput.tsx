import React, { ChangeEvent, InputHTMLAttributes, useEffect, forwardRef } from 'react';
import styled, { css } from 'styled-components';
export interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder: string;
  errorMessage?: string;
  disabled?: boolean;
  value?: string;
  $placeholderColor?: string;
  handleChange?: (value: string) => void;
  setErrorStatus?: ($hasError: boolean) => void;
}

const errorBorderStyle = css`
  border-color: red;
`;

const disabledStyle = css`
  background-color: rgba(245, 245, 245, 1);
`;

const Input = styled.input<TextInputProps & { $hasError: boolean }>`
  display: block;
  width: 100%;
  outline: none;
  border-radius: 4px;
  font-size: 14px;
  line-height: 17.5px;
  color: rgba(51, 51, 51, 1);
  &::placeholder {
    color: ${({ $placeholderColor: placeholderColor }) => placeholderColor || '#aaaaaa'};
  }

  ${({ disabled }) => disabled && disabledStyle}
  ${({ $hasError: hasError }) => hasError && errorBorderStyle}
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

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      placeholder,
      errorMessage = '',
      disabled = false,
      value = '',
      handleChange = () => {},
      setErrorStatus = () => {},
      $placeholderColor: placeholderColor,
      ...props
    },
    ref,
  ) => {
    const handleValueChange = (e: ChangeEvent<HTMLInputElement>) => {
      handleChange(e.target.value);
    };

    useEffect(() => {
      if (setErrorStatus) {
        setErrorStatus(!!errorMessage);
      }
    }, [errorMessage, setErrorStatus]);

    return (
      <InputWrapper>
        <InputContainer>
          <Input
            ref={ref}
            placeholder={placeholder}
            $hasError={!!errorMessage}
            disabled={disabled}
            value={value}
            onChange={handleValueChange}
            $placeholderColor={placeholderColor}
            {...props}
          />
        </InputContainer>
      </InputWrapper>
    );
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;
