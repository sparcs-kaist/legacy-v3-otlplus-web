import styled from 'styled-components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useEffect, useRef, useState } from 'react';
import Typography from './Typography';
import ReactDOM from 'react-dom';

interface ArrowProps {
  handleOnClick: () => void;
  isForward?: boolean;
}

const ArrowWrapper = styled.div`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.colors.Highlight.default};
  position: relative;
  overflow: visible;

  &:hover {
    cursor: pointer;
  }
`;

const HoverWrapper = styled.div`
  position: absolute;
  transform: translateX(-50%);
  width: auto;
  display: flex;
  padding: 12px;
  flex-direction: row;
  align-items: center;
  background-color: rgba(229, 76, 101, 0.8);
  color: white;
  writing-mode: horizontal-tb;
  z-index: 10; /* HoverWrapper가 다른 요소 위에 표시되도록 설정 */
`;

const Arrow: React.FC<ArrowProps> = ({ handleOnClick, isForward = true }) => {
  const [isHovered, setIsHovered] = useState(false);

  const [position, setPosition] = useState({ top: 0, left: 0 });
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (arrowRef.current) {
      const rect = arrowRef.current.getBoundingClientRect();
      setPosition({
        top: rect.top - 20, // 부모 컨테이너에서의 위치 + 조정값
        left: rect.left + rect.width / 2, // 가로 중앙에 위치하도록 설정
      });
    }
  }, [isHovered]); // Hover 상태가 변경될 때마다 위치를 재계산

  return (
    <ArrowWrapper
      onClick={handleOnClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={arrowRef}>
      {isHovered &&
        ReactDOM.createPortal(
          <div
            style={{
              position: 'absolute',
              top: position.top - 5,
              left: position.left,
              transform: 'translateX(-50%) translateY(-50%)',
              backgroundColor: 'white',
              border: '1px solid #ccc',
              padding: '10px',
              borderRadius: '4px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              pointerEvents: 'none',
              width: 'auto',
              height: 'auto',
              overflow: 'auto',
            }}>
            표시되지 않은 값이 있어요
          </div>,
          document.body,
        )}
      {isForward ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}
    </ArrowWrapper>
  );
};

export default Arrow;
