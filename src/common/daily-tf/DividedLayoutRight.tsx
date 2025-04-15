// 오른쪽 요소를 기준으로 왼쪽 높이가 맞춰져야 할 때의 layout
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  padding-bottom: 20px;
  overflow: scroll;
  padding-top: 55px;
  height: 100vh;
  width: 100%;
`;

const LeftWrapper = styled.div`
  display: flex;
`;

const RightWrapper = styled.div`
  display: flex;
  min-height: 100%;
`;

const DividedLayoutRight: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leftChild, rightChild] = React.Children.toArray(children);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;
    if (!left || !right) return;

    const resizeObserver = new ResizeObserver(() => {
      left.style.height = `${right.offsetHeight}px`;
    });

    resizeObserver.observe(right);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <Wrapper>
      <LeftWrapper ref={leftRef}>{leftChild}</LeftWrapper>
      <RightWrapper ref={rightRef}>{rightChild}</RightWrapper>
    </Wrapper>
  );
};

export default DividedLayoutRight;
