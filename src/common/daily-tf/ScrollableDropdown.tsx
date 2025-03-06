import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { IconButton } from '@mui/material';

interface ScrollableDropdownProps {
  options?: string[];
  zindex?: number;
  disabledOptions?: number[];
  setSelectedOption: React.Dispatch<React.SetStateAction<number>>;
  selectedOption: number;
  isDetail?: boolean;
}

const SelectedWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 8px 12px;
  color: ${(props) => props.theme.colors.Text.default};
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
  background-color: white;
  height: 36px;
  align-items: center;
  cursor: 'pointer';
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

const OptionScroll = styled.div<{
  top: number;
  left: number;
  width: number;
  zindex: number;
  isDetail: boolean;
}>`
  display: flex;
  flex-direction: column;
  height: ${(props) => (props.isDetail ? '100px' : '250px')};
  z-index: ${(props) => `${props.zindex}`};
  width: ${(props) => `${props.width}px`};
  position: absolute;
  top: ${(props) => `${props.top + 36}px`};
  left: ${(props) => `${props.left}px`};
  overflow: scroll;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  border-left: 1px solid ${(props) => props.theme.colors.Line.default};
  border-right: 1px solid ${(props) => props.theme.colors.Line.default};
  border-bottom: 1px solid ${(props) => props.theme.colors.Line.default};
`;

const TextWrapper = styled.div<{ disabled: boolean; selected: boolean }>`
  line-height: 17.5px;
  font-size: 14px;
  color: ${(props) =>
    props.disabled
      ? 'rgba(170, 170, 170, 1)'
      : props.selected
      ? props.theme.colors.Highlight.default
      : 'rgba(51, 51, 51, 1)'};
`;

const ScrollableDropdown: React.FC<ScrollableDropdownProps> = ({
  options = ['option1', 'option2', 'option3'],
  zindex = 10,
  disabledOptions = [],
  setSelectedOption,
  selectedOption,
  isDetail = true,
}) => {
  const [isExpand, setIsExpand] = useState(false);

  const selectedWrapperRef = useRef<HTMLDivElement>(null);

  const [position, setPosition] = useState<{ top: number; left: number; width: number }>({
    top: 0,
    left: 0,
    width: 0,
  });

  const optionScrollRef = useRef<HTMLDivElement>(null);

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

  // 처음 창을 켰을 때 scroll이 selectedOption부터 시작하도록
  useEffect(() => {
    if (optionScrollRef.current && options.length > 0 && selectedOption >= 0) {
      const selectedOptionElement = optionScrollRef.current.children[selectedOption] as HTMLElement;
      if (selectedOptionElement) {
        const offsetTop = selectedOptionElement.getBoundingClientRect().top;
        const scrollOffset = offsetTop - optionScrollRef.current.getBoundingClientRect().top;
        if (optionScrollRef.current) {
          optionScrollRef.current.scrollTop = scrollOffset;
        }
      }
    }
  }, [selectedOption, isExpand, options]);

  return (
    <DropdownWrapper isExpand={isExpand}>
      <SelectedWrapper
        ref={selectedWrapperRef}
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
          ref={optionScrollRef}
          top={position.top}
          left={position.left}
          width={position.width}
          zindex={zindex}
          isDetail={isDetail}>
          {options.map((option, index) => {
            const disabled = disabledOptions.includes(index);
            const selected = selectedOption == index;
            return (
              <OptionCard
                key={index}
                onClick={() => {
                  setSelectedOption(index);
                  setIsExpand(false);
                }}
                disabled={disabled}>
                <TextWrapper disabled={disabled} selected={selected}>
                  {option}
                </TextWrapper>
              </OptionCard>
            );
          })}
        </OptionScroll>
      )}
    </DropdownWrapper>
  );
};

export default ScrollableDropdown;
