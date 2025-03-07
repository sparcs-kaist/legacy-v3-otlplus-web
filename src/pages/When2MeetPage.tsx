import Divider from '@/common/daily-tf/Divider';
import EditModalBody from '@/common/daily-tf/EditModalBody';
import PlaceholderComponenet from '@/common/daily-tf/Placeholder';
import TextInput from '@/common/daily-tf/TextInputArea';
import { useState } from 'react';

import styled from 'styled-components';
import { GridProps } from './When2MeetDetailPage';
import { MeetingGroup } from '@/common/daily-tf/interface/groupInfoType';
import { defaultGroupInfo } from '@/common/daily-tf/utils/defaultGroupInfo';
import Typography from '@/common/daily-tf/Typography';
import { filterMeeting } from '@/common/daily-tf/utils/filterMeeting';
import mockMeetingGroups from '@/common/daily-tf/mock/mockMeetingGroup';
import MeetingCard from '@/common/daily-tf/MeetingCard';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  padding: 100px;
  overflow: scroll;
  padding-top: 55px !important;
  height: 100vh;
`;

const ContentsWrapper = styled.div`
  background-color: white;
  gap: 16px;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  width: 630px;
  min-height: 100%;
`;

const ContentsContainer = styled.div`
  display: flex;
  align-items: stretch;
  gap: 12px;
`;

const TitleWrapper = styled.div`
  font-size: 23px;
  line-height: 20px;
  font-weight: 700;
`;

const When2MeetPage: React.FC = () => {
  const [groupInfo, setGroupInfo] = useState<MeetingGroup>(defaultGroupInfo);
  // 여기에 API 연결 예정
  const groupMap = filterMeeting(mockMeetingGroups);
  const pendingGroup = groupMap.get('pending');
  const setUpGroup = groupMap.get('setUp');
  const readyGroup = groupMap.get('ready');

  return (
    <PageWrapper>
      <ContentsContainer>
        <ContentsWrapper>
          <TitleWrapper>모임 만들기</TitleWrapper>
          <Divider />
          <EditModalBody
            groupInfo={groupInfo}
            setGroupInfo={setGroupInfo}
            onClose={() => {}}
            isDetail={false}
          />
          <Divider />
          {setUpGroup!.length > 0 && (
            <>
              <Typography type="BigBold">다가오는 모임</Typography>
              {setUpGroup!.map((val, idx) => (
                <MeetingCard key={idx} group={val} />
              ))}
            </>
          )}
          {readyGroup!.length > 0 && (
            <>
              <Typography type="BigBold">확정 대기 모임</Typography>
              {readyGroup!.map((val, idx) => (
                <MeetingCard key={idx} group={val} />
              ))}
            </>
          )}
          {pendingGroup!.length > 0 && (
            <>
              <Typography type="BigBold">참여 대기 모임</Typography>
              {pendingGroup!.map((val, idx) => (
                <MeetingCard key={idx} group={val} />
              ))}
            </>
          )}
        </ContentsWrapper>

        <ContentsWrapper>
          <PlaceholderComponenet />
        </ContentsWrapper>
      </ContentsContainer>
    </PageWrapper>
  );
};

export default When2MeetPage;
