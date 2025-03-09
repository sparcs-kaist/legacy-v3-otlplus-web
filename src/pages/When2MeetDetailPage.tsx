import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Modal from '@/common/daily-tf/Modal';
import EditModalBody from '@/common/daily-tf/EditModalBody';
import Arrow from '@/common/daily-tf/Arrow';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Button from '@/common/daily-tf/Button';
import Typography from '@/common/daily-tf/Typography';
import TextInput from '@/common/daily-tf/TextInputArea';
import getFormattedDate from '@/common/daily-tf/utils/getFormattedDate';
import generateMockCoworkerList from '@/common/daily-tf/mock/mockCoworker';
import { DisabledAreaType } from '@/common/daily-tf/interface/disabledAreaType';
import generateMockDisabledArea from '@/common/daily-tf/mock/mockDisabledArea';
import { formatDisabledArea } from '@/common/daily-tf/utils/formatDisabledArea';
import { checkIfAnyTrue } from '@/common/daily-tf/utils/checkIfAnyTrue';
import MemberChipWrapper from '@/common/daily-tf/MemberChip';
import { MeetingGroup } from '@/common/daily-tf/interface/Group';
import {
  formatGroupTimeGridtoTimeblock,
  formatSelectedGridtoTimeblock,
} from '@/common/daily-tf/utils/formatGridtoTimeblock';
import FlexWrapper from '@/common/daily-tf/FlexWrapper';
import ScheduleSetupModalBody from '@/common/daily-tf/ScheduleSetupModalBody';

import { formatTimeBlockToStringWithDate } from '@/common/daily-tf/utils/formatTimeblockToString';

import GroupTimeGrid from '@/common/daily-tf/groupTimeGrid';
import MyTimeGrid from '@/common/daily-tf/MyTimeGrid';
import TimeBlock from '@/common/daily-tf/interface/Timeblock';

/* TODO: 코드 정리 */

/* TODO: 반응형 추가하기 */
/* TODO: 그리드 크기 default 값 설정 */
export interface GridProps {
  dateArray: Date[];
  startTime: number;
  endTime: number;
  groupName: string;
  members: number;
}

const ArrowGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 630px;
`;

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

const ButtonWrapper = styled.div`
  flex: 1;
  flex-shrink: 1;
  display: flex;
`;

const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  padding-bottom: 20px;
  overflow: scroll;
  height: 100vh;
  padding-top: 55px !important;
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
  //colPadding 값이랑 맞추기
  gap: 5px;
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
  overflow: visible;
`;

const TimeWrapper = styled.div`
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 37px;
  font-size: 8px;
  line-height: 11px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-shrink: 1;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  justify-content: center;
  font-size: ${({ theme }) => `${theme.fonts.Big.fontSize}px`};
  font-weight: ${({ theme }) => theme.fonts.Big.fontWeight};
  line-height: ${({ theme }) => `${theme.fonts.Big.lineHeight}px`};
`;
const MyAreaWrapper = styled.div`
  background-color: white;
  gap: 20px;
  padding-top: 64px !important;
  padding: 16px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  width: 750px;
  // height 제대로 고치기..
  min-height: 100%;
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
  position: relative;
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
  width: 750px;
  min-height: 100%;
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

const When2MeetDetailPage: React.FC = () => {
  const [prevSelectedDate, setPrevSelectedDate] = useState<Map<Date, number[]>>(new Map());

  // API 연결 후 첫 값을 defaultGroupInfo에 넣어둔다
  // 수정할 때마다 매번 API를 보내는 거 X, 계속 로컬에 저장했다가 마지막 순간의 변화를 DB에 저장하기
  const defaultGroupInfo: MeetingGroup = {
    id: 0,
    title: '테스트 그룹',
    members: [],
    days: [new Date('2025-01-24'), new Date('2025-01-25'), new Date('2025-01-28')],
    begin: 8,
    end: 27,
    year: 0,
    semester: 0,
    leaderUserProfileId: 0,
    schedule: [],
    maxMember: 5,
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

  // 변수명 예쁘게 쓰기..ㅎㅎ
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);

  const handelModalClose = () => {
    setIsModalOpen(false);
    enableScroll();
  };
  const handelModalClose2 = () => {
    setIsModalOpen2(false);
    enableScroll();
  };
  const handelModalClose3 = () => {
    setIsModalOpen3(false);
    enableScroll();
  };
  const [groupInfo, setGroupInfo] = useState<MeetingGroup>(defaultGroupInfo);

  const tunedDateArray = insertMissingDates(groupInfo.days as Date[]);

  const m: number = tunedDateArray.length;
  const n: number = (groupInfo.end - groupInfo.begin) * 2;

  const [page, setPage] = useState<number>(0);
  const [maxPage, setMaxPage] = useState<number>(1);
  const [pageStart, setPageStart] = useState<number>(0);
  const [pageEnd, setPageEnd] = useState<number>(m - 1);

  const [dateHeader, setDateHeader] = useState<string[]>([]);
  const [setupTimeblock, setSetupTimeblock] = useState<TimeBlock[]>([]);

  const [mockCoworker, setMockCoworker] = useState<Map<string, Map<number, boolean[]>>>(new Map());
  const [mockDisabledArea, setMockDisabledArea] = useState<Map<number, DisabledAreaType[]>>(
    new Map(),
  );
  const [formattedDisabledArea, setFormattedDisabledArea] = useState<Map<number, boolean[]>>(
    new Map(),
  );
  const [partInfo, setPartInfo] = useState<Map<string, boolean>>(new Map());
  const [partCount, setPartCount] = useState<number>(0);

  const parentRef = useRef<HTMLDivElement>(null);
  const [parentSize, setParentSize] = useState({ width: 0, height: 0 });

  const [setupArea, setSetupArea] = useState<Map<number, boolean[]>>(
    new Map(
      Array.from({ length: tunedDateArray.length }, (_, rowIndex) => [
        rowIndex,
        Array((groupInfo.end - groupInfo.begin) * 2).fill(false),
      ]),
    ),
  );

  useEffect(() => {
    const updateParentWidth = () => {
      if (parentRef.current) {
        const rect = parentRef.current.getBoundingClientRect();
        setParentSize({ width: rect.width, height: rect.height }); // 부모의 width 값을 state로 저장
      }
    };

    updateParentWidth();
    window.addEventListener('resize', updateParentWidth);
    return () => window.removeEventListener('resize', updateParentWidth);
  }, []);

  /* TODO : 백엔드에서 저장값 가져와서 저장값 = 초기값 */
  /* TODO: selectedArea를 Schedule로 변경해서 넣어주기? */
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
          const prevIndex = j + (groupInfo.begin - 8) * 2;
          if (prevSelected?.includes(prevIndex)) {
            const currentRow = res.get(i) || Array(n).fill(false);
            currentRow[j] = true;
            res.set(i, currentRow);
          }
        }
      }
    }
    setSelectedArea(res);

    const mockCoworker = generateMockCoworkerList(groupInfo.maxMember, m, n);
    setMockCoworker(mockCoworker);
    const mockDisabledArea = generateMockDisabledArea(
      tunedDateArray.length,
      groupInfo.end - groupInfo.begin + 1,
    );
    setMockDisabledArea(mockDisabledArea);
    const formattedDisabledArea = formatDisabledArea(mockDisabledArea, m, n);
    setFormattedDisabledArea(formattedDisabledArea);

    const partInfo = new Map<string, boolean>();
    let partCount = 0;

    // 로그인 되어 있는지 여부에 따라서 다르게 보여줘야 함
    mockCoworker.forEach((value, key) => {
      const part = checkIfAnyTrue(value);
      partInfo.set(key, part);
      if (part) {
        partCount++;
      }
    });

    const sortedPartInfo = [...partInfo];
    sortedPartInfo.sort((a, b) => {
      if (a[1] !== b[1]) {
        return b[1] === true ? 1 : -1;
      }
      return a[0].localeCompare(b[0]);
    });

    const sortedMap = new Map(sortedPartInfo);
    setPartInfo(sortedMap);

    setPartCount(partCount);
  }, [groupInfo]);

  useEffect(() => {
    if (isModalOpen) {
      const prev = new Map();
      selectedArea.forEach((value, key) => {
        const date = tunedDateArray[key];
        if (date !== placeholderDate) {
          const selectedList = value
            .map((_value, _index) => (_value ? _index + (groupInfo.begin - 8) * 2 : -1))
            .filter((i) => i !== -1);
          if (selectedList.length > 0) {
            prev.set(date, selectedList);
          }
        }
      });
      setPrevSelectedDate(prev);
    }
  }, [isModalOpen]);

  useEffect(() => {
    setPage(0);

    setMaxPage(Math.ceil(groupInfo.days.length / 7) - 1);
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

  const handleSetup = () => {
    setSetupTimeblock(
      formatSelectedGridtoTimeblock(setupArea, groupInfo.begin, groupInfo.end, tunedDateArray),
    );
    handelModalClose2();
    setIsModalOpen3(true);
    disableScroll();
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
        <TilteWrapper ref={parentRef}>
          <TitleTextWrapper>
            {groupInfo.title}
            <EditButtonWrapper
              onClick={() => {
                setIsModalOpen(true);
                disableScroll();
                setPage(0);
              }}>
              <ModeEditOutlineOutlinedIcon />
            </EditButtonWrapper>
          </TitleTextWrapper>
          {/* TODO: 여기에 member chip */}
          <MemberChipWrapper
            width={parentSize.width}
            height={parentSize.height}
            partInfo={partInfo}
            partCount={partCount}
          />
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
        {/* 일정 편집 모달 */}
        <Modal isOpen={isModalOpen} onClose={handelModalClose} title="일정 편집">
          <EditModalBody
            groupInfo={groupInfo}
            setGroupInfo={setGroupInfo}
            onClose={handelModalClose}
            isDetail={true}
          />
        </Modal>
        {/* 일정 확정 모달 */}
        <Modal
          isOpen={isModalOpen2}
          onClose={handelModalClose2}
          title={`${groupInfo.title} 일정 확정`}>
          <ScheduleSetupModalBody
            begin={groupInfo.begin}
            end={groupInfo.end}
            days={groupInfo.days as Date[]}
            cellWidth={cellWidth}
            tunedDateArray={tunedDateArray}
            placeholderIndex={placeholderIndex}
            myArea={selectedArea}
            maxMember={groupInfo.maxMember}
            coworkerArea={mockCoworker}
            title={groupInfo.title}
            setupArea={setupArea}
            setSetupArea={setSetupArea}
          />
          <FlexWrapper direction="row" gap={18}>
            <ButtonWrapper>
              <Button type="default">일정 삭제</Button>
            </ButtonWrapper>
            <ButtonWrapper>
              <Button
                type={checkIfAnyTrue(setupArea) ? 'selected' : 'disabled'}
                onClick={handleSetup}>
                일정 확정
              </Button>
            </ButtonWrapper>
          </FlexWrapper>
        </Modal>
        {/* 일정 확정 완료 모달*/}
        <Modal isOpen={isModalOpen3} onClose={handelModalClose3} title="일정 확정 완료">
          <ModalWrapper>
            <TextWrapper>
              {`${groupInfo.title} 모임이`}
              {setupTimeblock.map((val, idx) => (
                <React.Fragment key={idx}>
                  <div style={{ marginLeft: idx === 0 ? '5px' : '0px' }}>
                    {formatTimeBlockToStringWithDate(val)}
                  </div>
                  {idx < setupTimeblock.length - 1 && <span>,&nbsp;</span>}
                </React.Fragment>
              ))}
              {`로 확정되었습니다.`}
              <br />
              <div>모임 일정을 OTL 시간표에 추가하거나 공유해보세요!</div>
            </TextWrapper>
            <FlexWrapper direction="row" gap={18}>
              <ButtonWrapper>
                <Button type="default">카톡으로 공유</Button>
              </ButtonWrapper>
              <ButtonWrapper>
                <Button type="selected">시간표에 추가</Button>
              </ButtonWrapper>
            </FlexWrapper>
          </ModalWrapper>
        </Modal>
        {/* 여기부터 Grid Section 구성 */}
        <ArrowGrid>
          {page > 0 ? (
            <Arrow
              handleOnClick={() => {
                setPage(page - 1);
              }}
              isForward={false}
            />
          ) : (
            <div style={{ display: 'flex', width: '24px' }} />
          )}
          <SectionWrapper>
            <TimeWrapper>
              {Array.from(
                { length: groupInfo.end - groupInfo.begin + 1 },
                (_, index) => index + groupInfo.begin,
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
                isModal={isModalOpen || isModalOpen2}
                placeholderIndex={placeholderIndex}
                pageEnd={pageEnd}
                pageStart={pageStart}
                tunedDateArray={tunedDateArray}
                startTime={groupInfo.begin}
                disabledArea={mockDisabledArea}
                formattedDisabledArea={formattedDisabledArea}
              />
            </GridWrapper>
          </SectionWrapper>
          {maxPage >= page + 1 ? (
            <Arrow
              handleOnClick={() => {
                setPage(page + 1);
              }}
            />
          ) : (
            <div style={{ display: 'flex', width: '24px' }} />
          )}
        </ArrowGrid>
      </MyAreaWrapper>
      <GroupAreaWrapper>
        <TilteWrapper>
          <TitleTextWrapper>Group’s Availibility</TitleTextWrapper>
          <Button
            isFlexRow={false}
            type="selected"
            onClick={() => {
              // 일단 가라로 넣어뒀음
              setIsModalOpen2(true);
              disableScroll();
              formatGroupTimeGridtoTimeblock(
                selectedArea,
                mockCoworker,
                groupInfo.begin,
                groupInfo.end,
                groupInfo.days as Date[],
              );
            }}>
            일정 확정
          </Button>
        </TilteWrapper>
        <ColorScale count={groupInfo.maxMember}></ColorScale>
        <ArrowGrid>
          {page > 0 ? (
            <Arrow
              handleOnClick={() => {
                setPage(page - 1);
              }}
              isForward={false}
            />
          ) : (
            <div style={{ display: 'flex', width: '24px' }} />
          )}
          <SectionWrapper>
            <TimeWrapper>
              {Array.from(
                { length: groupInfo.end - groupInfo.begin + 1 },
                (_, index) => index + groupInfo.begin,
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
                isModal={isModalOpen || isModalOpen2}
                placeholderIndex={placeholderIndex}
                pageStart={pageStart}
                pageEnd={pageEnd}
                coworkerArea={mockCoworker}
              />
            </GridWrapper>
          </SectionWrapper>
          {maxPage >= page + 1 ? (
            <Arrow
              handleOnClick={() => {
                setPage(page + 1);
              }}
            />
          ) : (
            <div style={{ display: 'flex', width: '24px' }} />
          )}
        </ArrowGrid>
      </GroupAreaWrapper>
    </PageWrapper>
  );
};

export default When2MeetDetailPage;
