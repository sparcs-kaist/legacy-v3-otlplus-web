import CustomTimeTableGrid from '@/common/daily-tf/CustomTimeTableGrid';
import Icon from '@/common/daily-tf/Icon';
import LectureTile from '@/common/daily-tf/LectureTile';
import mockLectureSummaries from '@/common/daily-tf/mock/mockLectureSummary';
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
  background-color: white;
  gap: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  width: 950px;
  min-height: 100%;
  align-items: center;
`;

const FriendPage: React.FC = () => {
  return (
    <PageWrapper>
      <ContentsWrapper>
        <CustomTimeTableGrid lectureSummary={mockLectureSummaries}></CustomTimeTableGrid>
      </ContentsWrapper>
    </PageWrapper>
  );
};

export default FriendPage;
