import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { IconButton } from '@mui/material';

interface MemberChipProps {
  partInfo: Map<string, boolean>;
  partCount: number;
  zindex?: number;
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
  height: 32px;
  align-items: center;
  justify-content: space-between;
  cursor: default;
`;

const OptionCard = styled.div<{ disabled: boolean }>`
  display: flex;
  padding: 8px 12px;
  background-color: white;
  height: 36px;
  align-items: center;
`;

const DropdownWrapper = styled.div<{ isExpand: boolean }>`
  width: fit-content;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  overflow: hidden;
`;

const OptionScroll = styled.div<{ top: number; left: number; width: number; zindex: number }>`
  display: flex;
  flex-direction: column;
  z-index: ${(props) => `${props.zindex}`};
  position: absolute;
  top: ${(props) => `${props.top + 32}px`};
  left: ${(props) => `${props.left}px`};
  width: ${(props) => `${props.width}px`};
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

const MemberChip: React.FC<MemberChipProps> = ({ partCount, partInfo, zindex = 10 }) => {
  const [isExpand, setIsExpand] = useState(false);
  const selectedWrapperRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ top: number; left: number; width: number }>({
    top: 0,
    left: 0,
    width: 0,
  });

  /* TODO: 내 정보 가져오기 */
  const myName = 'casio';

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
        ref={selectedWrapperRef}
        onClick={() => {
          setIsExpand(!isExpand);
        }}>
        {`참여 ${partCount}명 / ${Array.from(partInfo.keys()).length}명`}
        {/* <IconButton
          onClick={() => {
            setIsExpand(!isExpand);
          }}>
          {isExpand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton> */}
      </SelectedWrapper>
      {isExpand && (
        <OptionScroll
          top={position.top}
          left={position.left}
          width={position.width}
          zindex={zindex}>
          {/* coworker Map을 배열로 변환하여 반복 처리 */}
          {[...partInfo].map(([key, value], index) => {
            // 여기서 `key`는 coworker의 키, `value`는 해당하는 값입니다.
            const disabled = false; // 조건을 추가할 수 있습니다.
            const selected = false; // 선택된 항목을 표시하려면 상태를 추가하세요.
            return (
              <OptionCard key={index} disabled={disabled}>
                <TextWrapper disabled={disabled} selected={selected}>
                  {`${key} ${value}`} {/* key 또는 원하는 정보를 표시 */}
                </TextWrapper>
              </OptionCard>
            );
          })}
        </OptionScroll>
      )}
    </DropdownWrapper>
  );
};

export default MemberChip;
