import Divider from '@/common/daily-tf/Divider';
import EditModalBody from '@/common/daily-tf/EditModalBody';
import PlaceholderComponenet from '@/common/daily-tf/Placeholder';
import TextInput from '@/common/daily-tf/TextInputArea';
import { useState } from 'react';

import styled from 'styled-components';
import { GridProps } from './When2MeetDetailPage';
import { MeetingGroup } from '@/common/daily-tf/interface/groupInfoType';
import { defaultGroupInfo } from '@/common/daily-tf/utils/defaultGroupInfo';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 100px;
  overflow: scroll;
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

const TitleWrapper = styled.div`
  font-size: 23px;
  line-height: 20px;
  font-weight: 700;
`;

const When2MeetPage: React.FC = () => {
  const [groupName, setGroupName] = useState<string>('');
  const [groupInfo, setGroupInfo] = useState<MeetingGroup>(defaultGroupInfo);

  const handleChange = (newValue: string) => {
    setGroupName(newValue);
  };

  return (
    <PageWrapper>
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
      </ContentsWrapper>
      <ContentsWrapper style={{ justifyContent: 'center', alignContent: 'center' }}>
        <PlaceholderComponenet />
      </ContentsWrapper>
    </PageWrapper>
  );
};

export default When2MeetPage;
