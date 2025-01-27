import React, { useEffect, useState } from 'react';
import MyTimeGrid from '@/common/daily-tf/myTimeGrid';
import styled from 'styled-components';
import GroupTimeGrid from '@/common/daily-tf/groupTimeGrid';
import TextInput from '@/common/daily-tf/TextInputArea';
import Modal from '@/common/daily-tf/Modal';
import EditModalBody from '@/common/daily-tf/EditModalBody';

/* TODO: 그리드 크기 default 값 설정 */
export interface GridProps {
  dateArray: Date[];
  startTime: number;
  endTime: number;
  groupName: string;
  members: number;
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
  gap: 37px;
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
  width: 630px;
  height: calc(100vh - 200px);
`;

const When2MeetPage: React.FC<GridProps> = ({
  // 테스트 용으로 그냥 넣어둔 값이에용
  dateArray = [new Date('2025-01-24'), new Date('2025-01-25'), new Date('2025-01-28')],
  startTime = 8,
  endTime = 15,
  groupName = '익명의 그룹',
  members = 5,
}) => {
  // 이전 값을 저장해둔다

  const [prevSelectedDate, setPrevSelectedDate] = useState<Map<Date, number[]>>(new Map());
  const defaultGroupInfo: GridProps = {
    groupName: groupName,
    members: members,
    dateArray: dateArray,
    startTime: startTime,
    endTime: endTime,
  };

  const cellHeight = 24;
  const cellWidth = 80;

  const placeholderDate = new Date('2005-11-21');

  const placeholderIndex: number[] = [];

  function insertMissingDates(dates: Date[]) {
    const result = [];

    for (let i = 0; i < dates.length - 1; i++) {
      const currentDate: Date = dates[i];
      const nextDate: Date = dates[i + 1];
      result.push(currentDate);

      if (nextDate.getTime() - currentDate.getTime() > 86400000) {
        result.push(placeholderDate);
      }
    }
    result.push(dates[dates.length - 1]);

    for (let i = 0; i < result.length; i++) {
      if (result[i] === placeholderDate) {
        placeholderIndex.push(i);
      }
    }

    return result;
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupInfo, setGroupInfo] = useState<GridProps>(defaultGroupInfo);

  const tunedDateArray = insertMissingDates(groupInfo.dateArray);

  const m: number = tunedDateArray.length;
  const n: number = (groupInfo.endTime - groupInfo.startTime) * 2;

  /* TODO : 백엔드에서 저장값 가져와서 저장값 = 초기값 */
  const [selectedArea, setSelectedArea] = useState<Map<number, boolean[]>>(
    new Map(Array.from({ length: m }, (_, rowIndex) => [rowIndex, Array(n).fill(false)])),
  );

  useEffect(() => {
    const res = new Map(
      Array.from({ length: m }, (_, rowIndex) => [rowIndex, Array(n).fill(false)]),
    );
    for (let i = 0; i < m; i++) {
      const date = tunedDateArray[i];
      if (date !== placeholderDate) {
        const prevSelected = prevSelectedDate.has(date) ? prevSelectedDate.get(date) : [];
        for (let j = 0; j < n; j++) {
          const prevIndex = j + (groupInfo.startTime - 8) * 2;
          if (prevSelected?.includes(prevIndex)) {
            const currentRow = res.get(i) || Array(n).fill(false);
            currentRow[j] = true;
            res.set(i, currentRow);
          }
        }
      }
    }

    setSelectedArea(res);
  }, [groupInfo]);

  useEffect(() => {
    if (isModalOpen) {
      const prev = new Map();
      selectedArea.forEach((value, key) => {
        const date = tunedDateArray[key];
        if (date !== placeholderDate) {
          const selectedList = value
            .map((_value, _index) => (_value ? _index + (groupInfo.startTime - 8) * 2 : -1))
            .filter((i) => i !== -1);
          if (selectedList.length > 0) {
            prev.set(date, selectedList);
          }
        }
      });
      setPrevSelectedDate(prev);
    }
  }, [isModalOpen]);

  const getFormattedDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: '2-digit',
      month: '2-digit',
    };
    return date.toLocaleDateString('ko-KR', options).replace(',', '');
  };

  const generateDates = () => {
    const dates: string[] = [];
    tunedDateArray.forEach((date) => {
      if (date == placeholderDate) {
        dates.push('');
      } else {
        dates.push(getFormattedDate(date));
      }
    });
    return dates;
  };

  return (
    <PageWrapper>
      <AreaWrapper>
        <button
          onClick={() => {
            setIsModalOpen(true);
          }}>
          Open Modal
        </button>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="일정 편집">
          <EditModalBody groupInfo={groupInfo} setGroupInfo={setGroupInfo} />
        </Modal>
        <div>{groupInfo.groupName}</div>
        <SectionWrapper>
          <TimeWrapper>
            {Array.from(
              { length: groupInfo.endTime - groupInfo.startTime + 1 },
              (_, index) => index + groupInfo.startTime,
            ).map((number) => (
              <div key={number}>{number % 12 || 12}</div>
            ))}
          </TimeWrapper>
          <GridWrapper>
            <DateHeader>
              {generateDates().map((date, index) => (
                <DateWrapper key={index} width={date == '' ? 10 : cellWidth}>
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
              placeholderIndex={placeholderIndex}
            />
          </GridWrapper>
        </SectionWrapper>
      </AreaWrapper>
      <AreaWrapper>
        <SectionWrapper>
          <TimeWrapper>
            {Array.from(
              { length: groupInfo.endTime - groupInfo.startTime + 1 },
              (_, index) => index + groupInfo.startTime,
            ).map((number) => (
              <div key={number}>{number % 12 || 12}</div>
            ))}
          </TimeWrapper>
          <GridWrapper>
            <DateHeader>
              {generateDates().map((date, index) => (
                <DateWrapper key={index} width={date == '' ? 10 : cellWidth}>
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
              placeholderIndex={placeholderIndex}
            />
          </GridWrapper>
        </SectionWrapper>
      </AreaWrapper>
    </PageWrapper>
  );
};

export default When2MeetPage;
