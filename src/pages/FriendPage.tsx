import CustomTimeTableGrid from '@/common/daily-tf/CustomTimeTableGrid';
import Icon from '@/common/daily-tf/Icon';
import mockLectureSummaries from '@/common/daily-tf/mock/mockLectureSummary';
import TabButtonRow from '@/common/daily-tf/TabButtonRow';
import { useState } from 'react';
import styled from 'styled-components';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  padding-bottom: 20px;
  overflow: scroll;
  padding-top: 55px !important;
  height: 100vh;
`;

const ContentsWrapper = styled.div`
  //background-color: white;
  padding: 16px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  width: 950px;
  min-height: 100%;
  align-items: flex-start;
`;

const Block = styled.div`
  display: flex;
  flex-grow: 1;
  width: 100%;
  background-color: white;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 12px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

const FriendPage: React.FC = () => {
  const [index, setIndex] = useState<number>(0);

  return (
    <PageWrapper>
      <ContentsWrapper>
        <TabButtonRow rowLength={3} index={index} setIndex={setIndex} isTimetable={false} />
        {/* <CustomTimeTableGrid lectureSummary={mockLectureSummaries}></CustomTimeTableGrid> */}
        <Block>
          <CustomTimeTableGrid lectureSummary={mockLectureSummaries}></CustomTimeTableGrid>
        </Block>
      </ContentsWrapper>
    </PageWrapper>
  );
};

export default FriendPage;
