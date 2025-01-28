import React, { useEffect, useState } from 'react';
import MyTimeGrid from '@/common/daily-tf/myTimeGrid';
import styled from 'styled-components';
import GroupTimeGrid from '@/common/daily-tf/groupTimeGrid';
import Modal from '@/common/daily-tf/Modal';
import EditModalBody from '@/common/daily-tf/EditModalBody';
import Arrow from '@/common/daily-tf/Arrow';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Button from '@/common/daily-tf/Button';
import Typography from '@/common/daily-tf/Typography';
import TextInput from '@/common/daily-tf/TextInputArea';
import getFormattedDate from '@/common/daily-tf/utils/getFormattedDate';

/* TODO: 코드 정리 */

/* TODO: 그리드 크기 default 값 설정 */
export interface GridProps {
  dateArray: Date[];
  startTime: number;
  endTime: number;
  groupName: string;
  members: number;
}

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.Line.divider};
`;

const EditButtonWrapper = styled.div`
  width: 20px;
  height: 20px;
  color: ${({ theme }) => theme.colors.Text.placeholder};

  :hover {
    color: ${({ theme }) => theme.colors.Text.default};
  }
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 100px;
  overflow: hidden;
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

const MyAreaWrapper = styled.div`
  background-color: white;
  gap: 20px;
  padding-top: 64px !important;
  padding: 16px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  width: 800px;
  // height 제대로 고치기..
  min-height: 100vh;
  align-items: center;
`;

const TitleTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  font-size: 23px;
  line-height: 25px;
  font-weight: 700;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  justify-content: space-between;
`;

const InfoContent = styled.div`
  flex-grow: 1;
  display: flex;
  gap: 10px;
  flex-direction: row;
  align-items: center;
`;

const TilteWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const GroupAreaWrapper = styled.div`
  background-color: white;
  gap: 40px;
  padding-top: 64px !important;
  padding: 16px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  width: 800px;
  min-height: 100vh;
  align-items: center;
`;

const TextInputWrapper = styled.div`
  display: flex;
  flex-grow: 1;
`;

interface ColorScaleProps {
  count: number;
}

const ColorScaleWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 0px 80px;
  gap: 20px;
  flex-direction: row;
  align-items: center;
  height: 20px;
`;

const ChartWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  gap: 5px;
  flex-direction: row;
  justify-content: space-between;
  height: 100%;
`;

const ColorCard = styled.div<{ index: number; total: number }>`
  display: flex;
  flex-grow: 1;
  height: 100%;
  background-color: ${({ index, total, theme }) =>
    index == 0
      ? theme.colors.Background.Block.default
      : `rgba(229, 76, 101, ${(1 / total) * index} )`};
  border-radius: 4px;
`;

const disableScroll = () => {
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.top = `-${window.scrollY}px`;
};

const enableScroll = () => {
  // 스크롤 허용
  document.body.style.overflow = 'auto';
  const scrollY = document.body.style.top;
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.top = '';
  window.scrollTo(0, parseInt(scrollY || '0') * -1); // 저장된 위치로 이동
};

const ColorScale: React.FC<ColorScaleProps> = ({ count }) => {
  return (
    <ColorScaleWrapper>
      <Typography type="Normal">{`0명/${count}명 참여`}</Typography>
      <ChartWrapper>
        {Array.from({ length: count + 1 }, (_, i) => (
          <ColorCard key={i} index={i} total={count} />
        ))}
      </ChartWrapper>
      <Typography type="Normal">{`${count}명/${count}명 참여`}</Typography>
    </ColorScaleWrapper>
  );
};

const When2MeetPage: React.FC<GridProps> = ({
  // 테스트 용으로 그냥 넣어둔 값이에용
  dateArray = [new Date('2025-01-24'), new Date('2025-01-25'), new Date('2025-01-28')],
  startTime = 8,
  endTime = 15,
  groupName = '익명의 그룹',
  members = 5,
}) => {
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

  // TODO : 로그인 되어 있으면 기본으로 가져오기?
  const [myName, setMyName] = useState<string>('');
  const [myStudentId, setMyStudentId] = useState<string>('');

  const handleChangeName = (newValue: string) => {
    setMyName(newValue);
  };

  const handleChangeId = (newValue: string) => {
    setMyStudentId(newValue);
  };

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

  const handelModalClose = () => {
    setIsModalOpen(false);
    enableScroll();
  };
  const [groupInfo, setGroupInfo] = useState<GridProps>(defaultGroupInfo);

  const tunedDateArray = insertMissingDates(groupInfo.dateArray);

  const m: number = tunedDateArray.length;
  const n: number = (groupInfo.endTime - groupInfo.startTime) * 2;

  const [page, setPage] = useState<number>(0);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [pageStart, setPageStart] = useState<number>(0);
  const [pageEnd, setPageEnd] = useState<number>(m - 1);

  const [dateHeader, setDateHeader] = useState<string[]>([]);

  /* TODO : 백엔드에서 저장값 가져와서 저장값 = 초기값 */
  const [selectedArea, setSelectedArea] = useState<Map<number, boolean[]>>(
    new Map(Array.from({ length: m }, (_, rowIndex) => [rowIndex, Array(n).fill(false)])),
  );

  useEffect(() => {
    const newSelectedArea = new Map(
      Array.from({ length: m }, (_, rowIndex) => [rowIndex, Array(n).fill(false)]),
    );
    setSelectedArea(newSelectedArea);
  }, [groupInfo]);

  useEffect(() => {
    setPage(0);

    setMaxPage(Math.ceil(groupInfo.dateArray.length / 7) - 1);
  }, [groupInfo]);

  const generateDates = () => {
    const dates: string[] = [];
    for (let i = pageStart; i <= pageEnd; i++) {
      const date = tunedDateArray[i];
      if (date == undefined) {
        dates.push('none');
      } else {
        if (date == placeholderDate) {
          dates.push('');
        } else {
          dates.push(getFormattedDate(date));
        }
      }
    }
    return dates;
  };

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

    while (contents < (page + 1) * 7 - 1 && endIndex < m - 1) {
      if (!placeholderIndex.includes(endIndex)) {
        contents++;
      }
      endIndex++;
    }
    if (placeholderIndex.includes(endIndex)) {
      endIndex++;
    }
    setPageEnd(Math.min(endIndex, m - 1));
  }, [page, groupInfo]);

  useEffect(() => {
    setDateHeader(generateDates());
  }, [pageStart, pageEnd, groupInfo]);

  return (
    <PageWrapper>
      <MyAreaWrapper>
        <TilteWrapper>
          <TitleTextWrapper>
            {groupInfo.groupName}
            <EditButtonWrapper
              onClick={() => {
                setIsModalOpen(true);
                disableScroll();
                setPage(0);
              }}>
              <ModeEditOutlineOutlinedIcon />
            </EditButtonWrapper>
          </TitleTextWrapper>
        </TilteWrapper>
        <Divider />
        <InfoWrapper>
          <InfoContent>
            <Typography type="Big">학번</Typography>
            <TextInputWrapper>
              <TextInput
                placeholder={'학번을 입력하세요'}
                value={myStudentId}
                handleChange={handleChangeId}></TextInput>
            </TextInputWrapper>
          </InfoContent>
          <InfoContent>
            <Typography type="Big">이름</Typography>
            <TextInputWrapper>
              <TextInput
                placeholder={'이름을 입력하세요'}
                value={myName}
                handleChange={handleChangeName}></TextInput>
            </TextInputWrapper>
          </InfoContent>
          <Button type="selected" isFlexColumn={false} isFlexRow={false}>
            {/* TODO : 로그인 되어 있으면 disabled, 확인 버튼 클릭 시 API 보내서 시간표 조회 */}
            조회
          </Button>
        </InfoWrapper>
        <Modal isOpen={isModalOpen} onClose={handelModalClose} title="일정 편집">
          <EditModalBody
            groupInfo={groupInfo}
            setGroupInfo={setGroupInfo}
            onClose={handelModalClose}
          />
        </Modal>
        <SectionWrapper>
          {page > 0 && (
            <Arrow
              handleOnClick={() => {
                setPage(page - 1);
              }}
              isForward={false}
            />
          )}
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
              {dateHeader.map(
                (date, index) =>
                  date != 'none' && (
                    <DateWrapper key={index} width={date == '' ? 10 : cellWidth}>
                      {date}
                    </DateWrapper>
                  ),
              )}
            </DateHeader>
            <MyTimeGrid
              selectedArea={selectedArea}
              setSelectedArea={setSelectedArea}
              n={n}
              m={pageEnd - pageStart + 1}
              cellHeight={cellHeight}
              cellWidth={cellWidth}
              isModal={isModalOpen}
              placeholderIndex={placeholderIndex}
              pageEnd={pageEnd}
              pageStart={pageStart}
              tunedDateArray={tunedDateArray}
              startTime={groupInfo.startTime}
            />
          </GridWrapper>
          {maxPage >= page + 1 && (
            <Arrow
              handleOnClick={() => {
                setPage(page + 1);
              }}
            />
          )}
        </SectionWrapper>
      </MyAreaWrapper>
      <GroupAreaWrapper>
        <TilteWrapper>
          <TitleTextWrapper>Group’s Availibility</TitleTextWrapper>
          <Button isFlexRow={false} type="selected">
            일정 확정
          </Button>
        </TilteWrapper>
        <ColorScale count={groupInfo.members}></ColorScale>
        <SectionWrapper>
          {page > 0 && (
            <Arrow
              handleOnClick={() => {
                setPage(page - 1);
              }}
              isForward={false}
            />
          )}
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
              {dateHeader.map(
                (date, index) =>
                  date != 'none' && (
                    <DateWrapper key={index} width={date == '' ? 10 : cellWidth}>
                      {date}
                    </DateWrapper>
                  ),
              )}
            </DateHeader>
            <GroupTimeGrid
              myArea={selectedArea}
              n={n}
              m={pageEnd - pageStart + 1}
              cellHeight={cellHeight}
              cellWidth={cellWidth}
              isModal={isModalOpen}
              placeholderIndex={placeholderIndex}
              pageStart={pageStart}
              pageEnd={pageEnd}
            />
          </GridWrapper>
          {maxPage >= page + 1 && (
            <Arrow
              handleOnClick={() => {
                setPage(page + 1);
              }}
            />
          )}
        </SectionWrapper>
      </GroupAreaWrapper>
    </PageWrapper>
  );
};

export default When2MeetPage;
