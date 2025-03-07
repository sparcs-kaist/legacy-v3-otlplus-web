import Arrow from '@/common/daily-tf/Arrow';
import styled from 'styled-components';
import FlexWrapper from '@/common/daily-tf/FlexWrapper';
import { useEffect, useRef, useState } from 'react';
import getFormattedDate from '@/common/daily-tf/utils/getFormattedDate';
import React from 'react';
import ScheduleSetupGrid from './ScheduleSetupGrid';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  flex: 1;
  overflow: auto;
  max-height: 70vh;
`;

const ArrowGrid = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-height: 70vh;
`;

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
`;

const TimeWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 37px;
  font-size: 8px;
  line-height: 11px;
`;

const DateWrapper = styled.div<{ width: number }>`
  width: ${(props) => `${props.width}px`};
  align-items: center;
  font-size: 12px;
  line-height: 15px;
  padding-bottom: 5px;
  text-align: center;
`;

interface GridProps {
  begin: number;
  end: number;
  days: Date[];
  cellWidth: number;
  tunedDateArray: Date[];
  placeholderIndex: number[];
  myArea: Map<number, boolean[]>;
  maxMember: number;
  coworkerArea: Map<string, Map<number, boolean[]>>;
  title: string;
  setupArea: Map<number, boolean[]>;
  setSetupArea: React.Dispatch<React.SetStateAction<Map<number, boolean[]>>>;
}

const GridArea: React.FC<GridProps> = ({
  begin,
  end,
  days,
  cellWidth,
  tunedDateArray,
  placeholderIndex,
  myArea,
  coworkerArea,
  title,
  setupArea,
  setSetupArea,
}) => {
  const [page, setPage] = useState<number>(0);
  const maxPage = Math.ceil(days.length / 7) - 1;
  const [dateHeader, setDateHeader] = useState<string[]>([]);
  const [pageStart, setPageStart] = useState<number>(0);
  const [pageEnd, setPageEnd] = useState<number>(tunedDateArray.length - 1);
  const placeholderDate = new Date('2005-11-21');

  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let contents = 0;
    let startIndex = 0;
    while (contents < page * 7) {
      if (!placeholderIndex.includes(startIndex)) {
        contents++;
      }
      startIndex++;
    }
    setPageStart(startIndex);
    let endIndex = startIndex;

    while (contents < (page + 1) * 7 - 1 && endIndex < tunedDateArray.length - 1) {
      if (!placeholderIndex.includes(endIndex)) {
        contents++;
      }
      endIndex++;
    }
    if (placeholderIndex.includes(endIndex)) {
      endIndex++;
    }
    setPageEnd(Math.min(endIndex, tunedDateArray.length - 1));
  }, [page]);

  const generateDates = () => {
    const dates: string[] = [];
    for (let i = pageStart; i <= pageEnd; i++) {
      const date = tunedDateArray[i];
      if (date == undefined) {
        dates.push('none');
      } else {
        if (+date == +placeholderDate) {
          dates.push('');
        } else {
          dates.push(getFormattedDate(date));
        }
      }
    }
    return dates;
  };

  useEffect(() => {
    setDateHeader(generateDates());
  }, [pageStart, pageEnd]);

  return (
    <ArrowGrid ref={arrowRef}>
      {page > 0 ? (
        <Arrow
          handleOnClick={() => {
            setPage(page - 1);
          }}
          isForward={false}
          hoverEvent={false}
        />
      ) : (
        <div style={{ display: 'flex', width: '24px' }} />
      )}
      <PageWrapper>
        <SectionWrapper>
          <TimeWrapper>
            {Array.from({ length: end - begin + 1 }, (_, index) => index + begin).map((number) => (
              <div key={number}>{number % 12 || 12}</div>
            ))}
          </TimeWrapper>
          <FlexWrapper direction="column" gap={0}>
            <FlexWrapper direction="row" gap={5}>
              {dateHeader.map(
                (date, index) =>
                  date !== 'none' && (
                    <DateWrapper key={index} width={date === '' ? 10 : cellWidth}>
                      {date}
                    </DateWrapper>
                  ),
              )}
            </FlexWrapper>
            <ScheduleSetupGrid
              n={(end - begin) * 2}
              m={pageEnd - pageStart + 1}
              myArea={myArea}
              placeholderIndex={placeholderIndex}
              pageStart={pageStart}
              pageEnd={pageEnd}
              coworkerArea={coworkerArea}
              cellHeight={24}
              cellWidth={80}
              selectedArea={setupArea}
              setSelectedArea={setSetupArea}
              tunedDateArray={tunedDateArray}
              title={title}
              parentRef={arrowRef}
            />
          </FlexWrapper>
        </SectionWrapper>
      </PageWrapper>
      {maxPage >= page + 1 ? (
        <Arrow
          handleOnClick={() => {
            setPage(page + 1);
          }}
          hoverEvent={false}
        />
      ) : (
        <div style={{ display: 'flex', width: '24px' }} />
      )}
    </ArrowGrid>
  );
};

export default GridArea;
