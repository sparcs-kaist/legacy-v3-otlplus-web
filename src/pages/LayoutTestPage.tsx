import styled from 'styled-components';
import DividedLayout from './DividedLayout';

const ContentLeft = styled.div`
  width: 200px;
  height: 100%;
  background-color: blue;
`;

const ContentInner = styled.div`
  width: 100px;
  height: 5000px;
  background-color: pink;
`;
const ContentRight = styled.div`
  width: 200px;
  height: 100%;
  background-color: blue;
`;

const LayoutTestPage: React.FC = () => {
  return (
    <DividedLayout>
      <ContentLeft>
        <ContentInner></ContentInner>
      </ContentLeft>
      <ContentRight />
    </DividedLayout>
  );
};

export default LayoutTestPage;
