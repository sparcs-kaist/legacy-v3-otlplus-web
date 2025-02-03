'use client';

import React from 'react';
import styled from 'styled-components';
import Chip from '../../Chip';

interface OptionChipGridProps {
  selectedAll: boolean;
  nameList: Array<string>;
  chosenList: Array<boolean>;
  handleOptionClick?: (value: number) => void;
  handleSelectAllClick?: () => void;
}

const OptionChipWrapper = styled.div`
  display: inline-flex;
  flex-direction: row;
  gap: 8px;
  width: 100%;
  background-color: aliceblue;
  flex-wrap: wrap;
  overflow: hidden;
`;
const OptionChipGrid: React.FC<OptionChipGridProps> = ({
  nameList,
  chosenList,
  handleOptionClick = () => {},
  handleSelectAllClick = () => {},
  selectedAll,
}) => {
  return (
    <OptionChipWrapper>
      <Chip selected={selectedAll} chipText="전체" onClick={handleSelectAllClick} />
      {nameList.map((value, idx) => (
        <Chip
          key={idx}
          selected={chosenList[idx]}
          chipText={`${nameList[idx]}`}
          onClick={() => {
            handleOptionClick(idx);
          }}
        />
      ))}
    </OptionChipWrapper>
  );
};

export default OptionChipGrid;
