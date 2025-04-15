import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  padding-top: 55px;
  padding-bottom: 12px;
  min-height: 100dvh;
  overflow: auto;
  gap: 12px;
  justify-content: center;
`;

const RightWrapper = styled.div`
  display: inline-block;
  min-height: 100%;
`;

const LeftWrapper = styled.div`
  display: inline-block;
  min-height: 100%;
`;

const DividedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leftChild, rightChild] = React.Children.toArray(children);

  return (
    <Wrapper>
      <LeftWrapper>{leftChild}</LeftWrapper>
      <RightWrapper>{rightChild}</RightWrapper>
    </Wrapper>
  );
};

export default DividedLayout;
