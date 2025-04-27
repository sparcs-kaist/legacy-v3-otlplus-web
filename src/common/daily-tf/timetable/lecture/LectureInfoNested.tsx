import styled from 'styled-components';
import Lecture from '../../interface/Lecture';
import FlexWrapper from '../../FlexWrapper';
import Typography from '../../Typography';
import { useNavigate } from 'react-router-dom';
import { formatTimeAreaToString } from '../../utils/formatTimeblockToString';

const ContentsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  align-items: center;
`;

const TextButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 8px;
  justify-content: flex-end;
`;

const GradeRowWrapper = styled.div`
  width: 100%;
  padding: 10px 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const InfoArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const GradeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: -3px;
  align-items: center;
  width: 60px;
  overflow: visible;
`;

const LectureInfoNested: React.FC<{ lecture: Lecture }> = ({ lecture }) => {
  const navigate = useNavigate();
  const onClickDictionary = () => {
    navigate(`/dictionary?startLectureId=${lecture.id}`);
  };
  const onClickSylabuys = () => {};

  const classesMap: Map<keyof Lecture, string> = new Map([
    ['num_classes', '강의시간'],
    ['num_labs', '실험'],
    ['credit', '학점'],
  ]);

  const gradeMap: Map<keyof Lecture, string> = new Map([
    ['grade', '성적'],
    ['load', '널널'],
    ['speech', '강의'],
  ]);

  const infoMap: Map<keyof Lecture, string> = new Map([
    ['type', '구분'],
    ['department_name', '학과'],
    ['professors', '교수'],
    ['classroom', '장소'],
    ['limit', '정원'],
    ['examtimes', '시험'],
  ]);

  const mappedInfo: Map<keyof Lecture, string> = new Map([
    ['type', lecture.type],
    ['department_name', lecture.department_name],
    ['professors', lecture.professors.map((professor) => professor.name).join(', ')],
    ['classroom', lecture.classroom],
    ['limit', `${lecture.limit}`],
    [
      'examtimes',
      lecture.examtimes.map((timeBlock) => formatTimeAreaToString(timeBlock)).join(' /'),
    ],
  ]);

  return (
    <ContentsWrapper>
      <FlexWrapper direction="column" gap={0}>
        <Typography type="Bigger" style={{ textAlign: 'center' }}>
          {lecture.title}
        </Typography>
        <Typography type="Big" style={{ textAlign: 'center' }}>
          {lecture.old_code}
        </Typography>
      </FlexWrapper>
      <TextButtonWrapper>
        <Typography
          type="Normal"
          color="Highlight.default"
          onClick={onClickDictionary}
          style={{ cursor: 'pointer' }}>
          과목사전
        </Typography>
        <Typography
          type="Normal"
          color="Highlight.default"
          onClick={onClickSylabuys}
          style={{ cursor: 'pointer' }}>
          실라버스
        </Typography>
      </TextButtonWrapper>
      <InfoArea>
        {[...infoMap].map(([key, val], idx) => {
          return (
            <FlexWrapper direction="row" gap={6} key={idx}>
              <Typography type="NormalBold">{val}</Typography>
              <Typography type="Normal">{mappedInfo.get(key)}</Typography>
            </FlexWrapper>
          );
        })}
      </InfoArea>
      <GradeRowWrapper>
        {[...classesMap].map(([key, val], idx) => {
          return (
            <GradeWrapper key={idx}>
              <Typography type="Bigger">{`${lecture[key]}`}</Typography>
              <Typography type="Normal">{val}</Typography>
            </GradeWrapper>
          );
        })}
      </GradeRowWrapper>
      <GradeRowWrapper>
        {[...gradeMap].map(([key, val], idx) => {
          return (
            <GradeWrapper key={idx}>
              <Typography type="Bigger">{`${lecture[key]}`}</Typography>
              <Typography type="Normal">{val}</Typography>
            </GradeWrapper>
          );
        })}
      </GradeRowWrapper>
    </ContentsWrapper>
  );
};

export default LectureInfoNested;
