'use client';

import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import Icon from './Icon';

type ChipProps = {
  selected?: boolean;
  chipText?: string;
} & HTMLAttributes<HTMLDivElement>;

const ChipInner = styled.div`
  display: inline-flex;
  padding: 8px;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  font-size: 14px;
  line-height: 17.5px;
  font-weight: 400;
`;

const ChipDefaultInner = styled(ChipInner)`
  color: #555555;
  background: #f5f5f5;
  cursor: pointer;
  &:hover {
    background: #ebebeb;
  }
`;

const ChipSelectedInner = styled(ChipInner)`
  color: #e54c65;
  background: #f9f0f0;
  cursor: pointer;
  &:hover {
    background: #fae6e6;
  }
`;

const ChipContentWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  gap: 6px;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Chip = ({ selected = false, chipText = '', ...divProps }: ChipProps) => {
  const ChipContent = () => (
    <ChipContentWrapper>
      {chipText}
      {selected ? <Icon type="Check" size={13} /> : <Icon type="Add" size={13} />}
    </ChipContentWrapper>
  );

  const ChipChosenInner = selected ? ChipSelectedInner : ChipDefaultInner;
  return (
    <ChipChosenInner {...divProps} onClick={divProps.onClick}>
      <ChipContent />
    </ChipChosenInner>
  );
};

export default Chip;
