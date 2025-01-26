import React, { useState } from 'react';
import MyTimeGrid from '@/common/daily-tf/myTimeGrid';
import styled from 'styled-components';
import GroupTimeGrid from '@/common/daily-tf/groupTimeGrid';
import TextInput from '@/common/daily-tf/TextInputArea';
import Modal from '@/common/daily-tf/Modal';

/* TODO: 그리드 크기 default 값 설정 */
interface GridProps {
  //n?: number; // 세로 크기
  //m?: number; // 가로 크기
  startDate?: Date;
  endDate?: Date;
  startTime?: number;
  endTime?: number;
  groupName?: string;
  members?: number;
}

const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
  gap: 12px;
  padding: 100px;
  overflow: auto;
`;

const DateWrapper = styled.div<{ width: number }>`
  width: ${(props) => `${props.width}px`};
  align-items: center;
  font-size: 12px;
  line-height: 15px;
  padding-bottom: 5px;
  text-align: center;
`;

const DateHeader = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: row;
`;

const GridWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const TimeWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 29px;
  font-size: 8px;
  line-height: 11px;
`;

const AreaWrapper = styled.div`
  background-color: white;
  gap: 20px;
  padding-top: 64px !important;
  padding: 12px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
`;

const When2MeetPage: React.FC<GridProps> = ({
  startDate = new Date('2025-01-20'),
  endDate = new Date('2025-01-24'),
  startTime = 8,
  endTime = 15,
  groupName = '익명의 그룹',
  members = 5,
}) => {
  function getDateDifference(startDate: Date, endDate: Date): number {
    const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
    const differenceInDays = differenceInMilliseconds / (1000 * 3600 * 24);
    return differenceInDays;
  }

  const defaultGroupInfo: GridProps = {
    groupName: groupName,
    members: members,
  };

  const cellHeight = 24;
  const cellWidth = 114;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupInfo, setGroupInfo] = useState<GridProps>(defaultGroupInfo);

  const m: number = getDateDifference(startDate, endDate) + 1;
  const n: number = (endTime - startTime) * 2;

  /* TODO : 백엔드에서 저장값 가져와서 저장값 = 초기값 */
  const [selectedArea, setSelectedArea] = useState<Map<number, boolean[]>>(
    new Map(Array.from({ length: m }, (_, rowIndex) => [rowIndex, Array(n).fill(false)])),
  );

  // 위에 헤더 로딩
  const getFormattedDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long', // 요일을 줄여서 표시 (예: 월, 화)
      day: '2-digit', // 두 자릿수로 날짜 표시 (예: 01, 02)
      month: '2-digit', // 두 자릿수로 월 표시 (예: 01, 02)
    };
    // 한국어 형식으로 변환
    return date.toLocaleDateString('ko-KR', options).replace(',', ''); // xx.xx 요일 형식으로 변환
  };

  const generateDates = () => {
    const dates: string[] = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      dates.push(getFormattedDate(currentDate));
      currentDate.setDate(currentDate.getDate() + 1); // 하루씩 증가
    }
    return dates;
  };

  return (
    <PageWrapper>
      <AreaWrapper>
        <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="일정 편집">
          <h2>Modal Title</h2>
          <p>This is the modal content.</p>
        </Modal>
        <div>{groupInfo.groupName}</div>
        <SectionWrapper>
          <TimeWrapper>
            {Array.from({ length: endTime - startTime + 1 }, (_, index) => index + startTime).map(
              (number) => (
                <div key={number}>{number % 12 || 12}</div>
              ),
            )}
          </TimeWrapper>
          <GridWrapper>
            <DateHeader>
              {generateDates().map((date, index) => (
                <DateWrapper key={index} width={cellWidth}>
                  {date}
                </DateWrapper>
              ))}
            </DateHeader>
            <MyTimeGrid
              selectedArea={selectedArea}
              setSelectedArea={setSelectedArea}
              n={n}
              m={m}
              cellHeight={cellHeight}
              cellWidth={cellWidth}
              isModal={isModalOpen}
            />
          </GridWrapper>
        </SectionWrapper>
      </AreaWrapper>
      <AreaWrapper>
        <SectionWrapper>
          <TimeWrapper>
            {Array.from({ length: endTime - startTime + 1 }, (_, index) => index + startTime).map(
              (number) => (
                <div key={number}>{number % 12 || 12}</div>
              ),
            )}
          </TimeWrapper>
          <GridWrapper>
            <DateHeader>
              {generateDates().map((date, index) => (
                <DateWrapper key={index} width={cellWidth}>
                  {date}
                </DateWrapper>
              ))}
            </DateHeader>
            <GroupTimeGrid
              myArea={selectedArea}
              n={n}
              m={m}
              cellHeight={cellHeight}
              cellWidth={cellWidth}
              isModal={isModalOpen}
            />
          </GridWrapper>
        </SectionWrapper>
      </AreaWrapper>
    </PageWrapper>
  );
};

export default When2MeetPage;
