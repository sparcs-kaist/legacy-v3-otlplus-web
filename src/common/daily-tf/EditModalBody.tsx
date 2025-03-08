import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Modal from '@/common/daily-tf/Modal';
import Calendar from '@/common/daily-tf/Calendar';
import TextInput from '@/common/daily-tf/TextInputArea';
import ScrollableDropdown from '@/common/daily-tf/ScrollableDropdown';
import Typography from './Typography';
import { Info } from '@mui/icons-material';
import Button from './Button';
import { GridProps } from '@/pages/When2MeetDetailPage';

import { MeetingGroup } from './interface/groupInfoType';
import { TimeBlockDay } from './interface/timeBlockType';
import { defaultGroupInfo } from './utils/defaultGroupInfo';
import { useNavigate } from 'react-router';
import { group } from 'console';

/* TODO: 그리드 크기 default 값 설정 */

interface EditModalBodyProps {
  groupInfo: MeetingGroup;
  setGroupInfo: React.Dispatch<MeetingGroup>;
  onClose: () => void;
  isDetail?: boolean;
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const TextInputWrapper = styled.div`
  width: 40px;
`;

const RowWrapper = styled.div<{ isDetail: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: auto;
  gap: ${({ isDetail }) => (isDetail ? '50px' : '60px')};
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const CalendarWrapper = styled.div`
  width: 240px;
`;

const ColumnWrapper = styled.div<{ isDetail: boolean }>`
  display: flex;
  flex-direction: column;
  //justify-content: space-between;
  gap: ${({ isDetail }) => (isDetail ? '10px' : '20px')};
`;

const InfoSelectWrapper = styled.div<{ isDetail: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ isDetail }) => (isDetail ? '30px' : '20px')};
`;

const RightColumnWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const DropdownWrapper = styled.div`
  width: fit-content;
`;

const TimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ButtonWrapper = styled.div<{ isDetail: boolean }>`
  width: ${({ isDetail }) => (isDetail ? '314px' : '100%')};
  height: 48px;
`;

const ButtonRowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 10px;
  justify-content: flex-end;
`;

const SelectWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  justify-content: space-between;
  height: 36px;
  width: 100%;
`;

const SelectItem = styled.div`
  flex-grow: 1;
  display: flex;
`;

const EditModalBody: React.FC<EditModalBodyProps> = ({
  groupInfo,
  setGroupInfo,
  onClose,
  isDetail = false,
}) => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date[]>(groupInfo.days! as Date[]);
  const [startTime, setStartTime] = useState<number>(groupInfo.begin! - 8);
  const [endTime, setEndTime] = useState<number>(groupInfo.end! - 8);

  const [isFirstOption, setIsFirstOption] = useState<boolean>(true);

  // TODO : 숫자만 가능하도록 추가
  const [member, setMember] = useState(`${groupInfo.maxMember}`);

  const [name, setName] = useState(groupInfo.title);

  const handleChange = (newValue: string) => {
    setName(newValue);
  };

  const handleChange2 = (newValue: string) => {
    setMember(newValue);
  };

  const handleReset = () => {
    setGroupInfo(defaultGroupInfo);
  };

  const handleSubmit = () => {
    const groupInfo: MeetingGroup = {
      maxMember: parseInt(member, 10),
      begin: startTime + 8,
      end: endTime + 8,
      title: name,
      days: selectedDate.sort((a, b) => a.getTime() - b.getTime()),
      id: 0,
      year: 0,
      semester: 0,
      leaderUserProfileId: 0,
      schedule: [],
      members: [],
    };
    setGroupInfo(groupInfo);
  };

  const handleSubmit2 = () => {
    navigate('/w2m/id');
  };

  const TimeIndex = (index: number) => {
    if (index >= 0 && index <= 4) {
      return `오전 ${index + 8}시`;
    } else if (index >= 5 && index <= 16) {
      return `오후 ${index - 4}시`;
    } else if (index >= 17 && index <= 19) {
      return `오전 ${index - 16}시`;
    }
    return '';
  };
  const timeArray = Array.from({ length: 20 }, (_, index) => TimeIndex(index));

  return (
    <PageWrapper>
      <TextInput placeholder={'그룹 이름을 입력하세요'} value={name} handleChange={handleChange} />
      <RowWrapper isDetail={isDetail}>
        <ColumnWrapper isDetail={isDetail}>
          <SelectWrapper>
            <SelectItem>
              <Button
                onClick={() => {
                  setIsFirstOption(true);
                }}
                type={isFirstOption ? 'selected' : 'default'}>
                특정 날짜
              </Button>
            </SelectItem>
            <SelectItem>
              <Button
                onClick={() => {
                  setIsFirstOption(false);
                }}
                type={isFirstOption ? 'default' : 'selected'}>
                특정 요일
              </Button>
            </SelectItem>
          </SelectWrapper>
          {isDetail ? (
            <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
          ) : (
            <CalendarWrapper>
              <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            </CalendarWrapper>
          )}
        </ColumnWrapper>
        <RightColumnWrapper>
          <InfoSelectWrapper isDetail={isDetail}>
            <TimeWrapper>
              <Typography type="Big">가능시간</Typography>
              <InfoWrapper>
                <DropdownWrapper>
                  <ScrollableDropdown
                    options={timeArray}
                    zindex={20}
                    disabledOptions={Array.from({ length: 19 - endTime }, (_, i) => 19 - i)}
                    selectedOption={startTime}
                    setSelectedOption={setStartTime}
                    isDetail={isDetail}
                  />
                </DropdownWrapper>
                <Typography type="Big">시 부터</Typography>
              </InfoWrapper>
              <InfoWrapper>
                <DropdownWrapper>
                  <ScrollableDropdown
                    options={timeArray}
                    disabledOptions={Array.from({ length: startTime }, (_, i) => i)}
                    selectedOption={endTime}
                    setSelectedOption={setEndTime}
                    isDetail={isDetail}
                  />
                </DropdownWrapper>
                <Typography type="Big">시 까지</Typography>
              </InfoWrapper>
            </TimeWrapper>
            <InfoWrapper>
              <Typography type="Big">가능인원</Typography>
              <TextInputWrapper>
                <TextInput placeholder={''} value={member} handleChange={handleChange2} />
              </TextInputWrapper>
              <Typography type="Big">명</Typography>
            </InfoWrapper>
          </InfoSelectWrapper>
          <ButtonWrapper isDetail={isDetail}>
            {isDetail ? (
              <Button
                type="selected"
                onClick={() => {
                  handleSubmit();
                  onClose();
                }}>
                확인
              </Button>
            ) : (
              <ButtonRowWrapper>
                <Button type="default" onClick={handleReset} isFlexRow={false}>
                  초기화
                </Button>
                <Button type="selected" onClick={handleSubmit2} isFlexRow={false}>
                  모임만들기
                </Button>
              </ButtonRowWrapper>
            )}
          </ButtonWrapper>
        </RightColumnWrapper>
      </RowWrapper>
    </PageWrapper>
  );
};

export default EditModalBody;
