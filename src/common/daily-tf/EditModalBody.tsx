import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Modal from '@/common/daily-tf/Modal';
import Calendar from '@/common/daily-tf/Calendar';
import TextInput from '@/common/daily-tf/TextInputArea';
import Dropdown from '@/common/daily-tf/Dropdown';
import Typography from './Typography';
import { Info } from '@mui/icons-material';
import Button from './Button';

/* TODO: 그리드 크기 default 값 설정 */

interface EditModalBodyProps {
  defaultName?: string;
  defaultSelectedDate?: Date[];
  defaultStartTime?: number;
  defaultEndTime?: number;
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

const EditModalBody: React.FC<EditModalBodyProps> = ({
  defaultName = '',
  defaultSelectedDate = [],
  defaultEndTime = 18,
  defaultStartTime = 0,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date[]>(defaultSelectedDate);
  const [startTime, setStartTime] = useState<number>(defaultStartTime);
  const [endTime, setEndTime] = useState<number>(defaultEndTime);

  const [isFirstOption, setIsFirstOption] = useState<boolean>(true);

  // TODO : 숫자만 가능하도록 추가
  const [member, setMember] = useState('0');

  const [name, setName] = useState(defaultName);

  const handleChange = (newValue: string) => {
    setName(newValue);
  };

  const handleChange2 = (newValue: string) => {
    setMember(newValue);
  };

  const TimeIndex = (index: number) => {
    if (index >= 0 && index <= 3) {
      return `오전 ${index + 9}시`;
    } else if (index >= 4 && index <= 15) {
      return `오후 ${index - 3}시`;
    } else if (index >= 16 && index <= 18) {
      return `오전 ${index - 15}시`;
    }
    return '';
  };
  const timeArray = Array.from({ length: 19 }, (_, index) => TimeIndex(index));

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
            <Button type="selected">확인</Button>
          </ButtonWrapper>
        </ColumnWrapper>
      </RowWrapper>
    </PageWrapper>
  );
};

export default EditModalBody;
