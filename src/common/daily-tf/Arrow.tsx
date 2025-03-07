import styled from 'styled-components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

interface ArrowProps {
  handleOnClick: () => void;
  isForward?: boolean;
  hoverEvent?: boolean;
}

const ArrowWrapper = styled.div`
  display: flex;
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.colors.Highlight.default};
  position: relative;
  overflow: visible;
  display: inline-block;

  &:hover {
    cursor: pointer;
  }
`;

const Triangle = styled.div`
  width: 0;
  height: 0;
  border-left: 4.5px solid transparent;
  border-right: 4.5px solid transparent;
  border-top: 15px solid rgba(229, 76, 101, 0.8);
`;

const HoverTextWrapper = styled.div`
  background-color: rgba(229, 76, 101, 0.8);
  color: white;
  font-size: 12px;
  line-height: 15px;
  font-weight: 400;
  padding: 10px;
  white-space: nowrap;
  border-radius: 2px;
`;

const HoverWrapper = styled.div<{ top: number; left: number }>`
  position: absolute;
  top: ${(props) => props.top - 5}px;
  left: ${(props) => props.left}px;
  transform: translateX(-50%) translateY(-50%);
  pointer-events: none;
  width: fit-content;
  height: auto;
  overflow: visible;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Arrow: React.FC<ArrowProps> = ({ handleOnClick, isForward = true, hoverEvent = true }) => {
  const [isHovered, setIsHovered] = useState(false);

  const [position, setPosition] = useState({ top: 0, left: 0 });
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (arrowRef.current) {
      const rect = arrowRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top - 20,
        left: rect.left + rect.width / 2,
      });
    }
  }, [isHovered]);

  return (
    <ArrowWrapper
      onClick={handleOnClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={arrowRef}>
      {isHovered &&
        hoverEvent &&
        ReactDOM.createPortal(
          <HoverWrapper top={position.top} left={position.left}>
            <HoverTextWrapper>표시되지 않은 날짜가 있어요!</HoverTextWrapper>
            <Triangle />
          </HoverWrapper>,
          document.body,
        )}
      {isForward ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}
    </ArrowWrapper>
  );
};

export default Arrow;
