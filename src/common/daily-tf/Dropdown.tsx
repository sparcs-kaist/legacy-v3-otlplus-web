import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { IconButton } from '@mui/material';

interface DropdownProps {
  options?: string[];
  defaultIndex?: number;
}

const SelectedWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px 12px;
  color: rgba(170, 170, 170, 1);
  font-size: 14px;
  font-weight: 400;
  line-height: 17.5;
  background-color: rgba(245, 245, 245, 1);
  height: 36px;
  align-items: center;
  justify-content: space-between;
`;

const OptionCard = styled.div`
  display: flex;
  padding: 8px 12px;
  color: rgba(51, 51, 51, 1);
  font-size: 14px;
  font-weight: 400;
  line-height: 17.5;
  background-color: white;
  height: 36px;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(245, 245, 245, 1);
  }
`;

const DropdownWrapper = styled.div<{ isExpand: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  overflow: hidden;
`;

const OptionScroll = styled.div<{ top: number; left: number; width: number; maxHeight: number }>`
  display: flex;
  flex-direction: column;
  height: 100px;
  z-index: 9999;
  width: ${(props) => `${props.width}px`};
  position: absolute;
  top: ${(props) => `${props.top + 36}px`};
  left: ${(props) => `${props.left}px`};
  overflow: auto;
`;

const Dropdown: React.FC<DropdownProps> = ({
  options = ['option1', 'option2', 'option3'],
  defaultIndex = 0,
}) => {
  const [selectedOption, setSelectedOption] = useState(defaultIndex);
  const [isExpand, setIsExpand] = useState(false);

  // SelectedWrapper 위치를 참조할 ref
  const selectedWrapperRef = useRef<HTMLDivElement>(null);

  // SelectedWrapper의 위치를 추적할 상태 변수
  const [position, setPosition] = useState<{ top: number; left: number; width: number }>({
    top: 0,
    left: 0,
    width: 0,
  });

  const [maxHeight, setMaxHeight] = useState<number>(250);

  useEffect(() => {
    if (selectedWrapperRef.current) {
      const rect = selectedWrapperRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top,
        left: rect.left,
        width: rect.width,
      });
    }
  }, [isExpand]);

  useEffect(() => {
    // OptionScroll의 maxHeight를 각 OptionCard의 높이에 맞춰 계산 (최대 250px)
    setMaxHeight(Math.min(options.length * 36, 250)); // 옵션 수에 따라 높이 조정
  }, [options]);

  return (
    <DropdownWrapper isExpand={isExpand}>
      <SelectedWrapper
        ref={selectedWrapperRef} // ref를 SelectedWrapper에 추가
        onClick={() => {
          setIsExpand(!isExpand);
        }}>
        {options[selectedOption]}
        <IconButton
          onClick={() => {
            setIsExpand(!isExpand);
          }}>
          {isExpand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </SelectedWrapper>
      {isExpand && (
        <OptionScroll
          top={position.top}
          left={position.left}
          width={position.width}
          maxHeight={maxHeight}>
          {options.map((option, index) => {
            return (
              <OptionCard
                key={index}
                onClick={() => {
                  setSelectedOption(index);
                }}>
                {option}
              </OptionCard>
            );
          })}
        </OptionScroll>
      )}
    </DropdownWrapper>
  );
};

export default Dropdown;
