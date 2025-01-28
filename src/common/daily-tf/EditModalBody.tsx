import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Modal from '@/common/daily-tf/Modal';
import Calendar from '@/common/daily-tf/Calendar';
import TextInput from '@/common/daily-tf/TextInputArea';
import Dropdown from '@/common/daily-tf/Dropdown';
import Typography from './Typography';
import { Info } from '@mui/icons-material';
import Button from './Button';
import { GridProps } from '@/pages/When2MeetPage';

/* TODO: 그리드 크기 default 값 설정 */

interface EditModalBodyProps {
  groupInfo: GridProps;
  setGroupInfo: React.Dispatch<GridProps>;
  onClose: () => void;
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

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: auto;
  gap: 50px;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

const DropdownWrapper = styled.div`
  width: fit-content;
`;

const TimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ButtonWrapper = styled.div`
  width: 314px;
  height: 48px;
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

const EditModalBody: React.FC<EditModalBodyProps> = ({ groupInfo, setGroupInfo, onClose }) => {
  const [selectedDate, setSelectedDate] = useState<Date[]>(groupInfo.dateArray!);
  const [startTime, setStartTime] = useState<number>(groupInfo.startTime! - 8);
  const [endTime, setEndTime] = useState<number>(groupInfo.endTime! - 8);

  const [isFirstOption, setIsFirstOption] = useState<boolean>(true);

  // TODO : 숫자만 가능하도록 추가
  const [member, setMember] = useState(`${groupInfo.members}`);

  const [name, setName] = useState(groupInfo.groupName);

  const handleChange = (newValue: string) => {
    setName(newValue);
  };

  const handleChange2 = (newValue: string) => {
    setMember(newValue);
  };

  const handleSubmit = () => {
    const groupInfo: GridProps = {
      members: parseInt(member, 10),
      startTime: startTime + 8,
      endTime: endTime + 8,
      groupName: name,
      dateArray: selectedDate.sort((a, b) => a.getTime() - b.getTime()),
    };
    setGroupInfo(groupInfo);
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
      <RowWrapper>
        <ColumnWrapper>
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
          <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </ColumnWrapper>
        <ColumnWrapper>
          <TimeWrapper>
            <Typography type="Big">가능시간</Typography>
            <InfoWrapper>
              <DropdownWrapper>
                <Dropdown
                  options={timeArray}
                  zindex={20}
                  disabledOptions={Array.from({ length: 19 - endTime }, (_, i) => 19 - i)}
                  selectedOption={startTime}
                  setSelectedOption={setStartTime}
                />
              </DropdownWrapper>
              <Typography type="Big">시 부터</Typography>
            </InfoWrapper>
            <InfoWrapper>
              <DropdownWrapper>
                <Dropdown
                  options={timeArray}
                  disabledOptions={Array.from({ length: startTime }, (_, i) => i)}
                  selectedOption={endTime}
                  setSelectedOption={setEndTime}
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
          <ButtonWrapper>
            <Button
              type="selected"
              onClick={() => {
                handleSubmit();
                onClose();
              }}>
              확인
            </Button>
          </ButtonWrapper>
        </ColumnWrapper>
      </RowWrapper>
    </PageWrapper>
  );
};

export default EditModalBody;
