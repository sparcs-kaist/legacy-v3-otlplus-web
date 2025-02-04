'use client';

import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';

type ButtonProps = {
  type?: keyof typeof ButtonTypeInner;
  children?: React.ReactNode;
  isFlexColumn?: boolean;
  isFlexRow?: boolean;
  paddingLeft?: number;
  paddingTop?: number;
} & HTMLAttributes<HTMLDivElement>;

const ButtonInner = styled.div<{
  isFlexColumn: boolean;
  isFlexRow: boolean;
  paddingLeft: number;
  paddingTop: number;
}>`
  display: inline-flex;
  padding: ${(props) => `${props.paddingTop}px ${props.paddingLeft}px`};
  justify-content: center;
  width: ${(props) => (props.isFlexRow ? '100%' : 'fit-content')};
  height: ${(props) => (props.isFlexColumn ? '100%' : 'fit-content')};
  align-items: center;
  border-radius: 6px;
  font-size: 14px;
  line-height: 17.5px;
  font-weight: 400;
`;

const ButtonDefaultInner = styled(ButtonInner)`
  color: #aaaaaa;
  background: #f5f5f5;
  cursor: pointer;
  &:hover {
    background: #ebebeb;
  }
`;

const ButtonSelectedInner = styled(ButtonInner)`
  color: #e54c65;
  background: #f9f0f0;
  cursor: pointer;
  &:hover {
    background: #fae6e6;
  }
`;

const ButtonDisabledInner = styled(ButtonInner)`
  color: #aaaaaa;
  background: #f5f5f5;
  cursor: not-allowed;
`;

const ButtonDarkInner = styled(ButtonInner)`
  color: #555555;
  background: #ebebeb;
  cursor: pointer;
  &:hover {
    background: #e1e1e1;
  }
`;

const ButtonTypeInner = {
  default: ButtonDefaultInner,
  disabled: ButtonDisabledInner,
  selected: ButtonSelectedInner,
  dark: ButtonDarkInner,
};

const ButtonWithTextInner = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 4px;
  display: inline-flex;
`;

const ButtonWithChildren = (children: React.ReactNode) => (
  <ButtonWithTextInner>{children}</ButtonWithTextInner>
);

const Button = ({
  type = 'default',
  isFlexRow = false,
  isFlexColumn = false,
  children = undefined,
  paddingLeft = 24,
  paddingTop = 9,
  ...divProps
}: ButtonProps) => {
  const ButtonChosenInner = ButtonTypeInner[type];

  const ButtonContent = () => {
    return ButtonWithChildren(children);
  };

  return (
    <ButtonChosenInner
      {...divProps}
      onClick={type === 'disabled' ? undefined : divProps.onClick}
      isFlexRow={isFlexRow}
      isFlexColumn={isFlexColumn}
      paddingTop={paddingTop}
      paddingLeft={paddingLeft}>
      <ButtonContent />
    </ButtonChosenInner>
  );
};

export default Button;
