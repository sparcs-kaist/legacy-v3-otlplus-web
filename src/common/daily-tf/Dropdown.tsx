import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { IconButton } from '@mui/material';

interface DropdownProps {
  options?: string[];
  zindex?: number;
  disabledOptions?: number[];
  setSelectedOption: React.Dispatch<React.SetStateAction<number>>;
  selectedOption: number;
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

const OptionCard = styled.div<{ disabled: boolean }>`
  display: flex;
  padding: 8px 12px;
  color: rgba(51, 51, 51, 1);
  background-color: white;
  height: 36px;
  align-items: center;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  pointer-events: ${(props) => (props.disabled ? 'none' : 'all')};
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

const OptionScroll = styled.div<{ top: number; left: number; width: number; zindex: number }>`
  display: flex;
  flex-direction: column;
  height: 100px;
  z-index: ${(props) => `${props.zindex}`};
  width: ${(props) => `${props.width}px`};
  position: absolute;
  top: ${(props) => `${props.top + 36}px`};
  left: ${(props) => `${props.left}px`};
  overflow: scroll;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
`;

const TextWrapper = styled.div<{ disabled: boolean }>`
  line-height: 17.5px;
  font-size: 14px;
  color: ${(props) => (props.disabled ? 'rgba(170, 170, 170, 1)' : 'rgba(51, 51, 51, 1)')};
`;

const Dropdown: React.FC<DropdownProps> = ({
  options = ['option1', 'option2', 'option3'],
  zindex = 10,
  disabledOptions = [],
  setSelectedOption,
  selectedOption,
}) => {
  const [isExpand, setIsExpand] = useState(false);

  // SelectedWrapper 위치를 참조할 ref
  const selectedWrapperRef = useRef<HTMLDivElement>(null);

  // SelectedWrapper의 위치를 추적할 상태 변수
  const [position, setPosition] = useState<{ top: number; left: number; width: number }>({
    top: 0,
    left: 0,
    width: 0,
  });

  useEffect(() => {
    const updatePosition = () => {
      if (selectedWrapperRef.current) {
        const rect = selectedWrapperRef.current.getBoundingClientRect();
        setPosition({
          top: rect.top,
          left: rect.left,
          width: rect.width,
        });
      }
    };
    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, [isExpand]);

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
          zindex={zindex}>
          {options.map((option, index) => {
            const disabled = disabledOptions.includes(index);
            return (
              <OptionCard
                key={index}
                onClick={() => {
                  setSelectedOption(index);
                  setIsExpand(false);
                }}
                disabled={disabled}>
                <TextWrapper disabled={disabled}>{option}</TextWrapper>
              </OptionCard>
            );
          })}
        </OptionScroll>
      )}
    </DropdownWrapper>
  );
};

export default Dropdown;
