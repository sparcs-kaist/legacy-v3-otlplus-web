import Typography from '@/common/daily-tf/Typography';
import styled from 'styled-components';

interface LectureGroupSubsectionTopProps {
  name: string;
  code: string;
  type: string;
  completedCourse: boolean;
}

const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  gap: 12px;
`;

const SectionDefault = styled(Section)`
  background-color: #fafafa;
`;

const SectionCompleted = styled(Section)`
  background-color: #ebebeb;
`;

const TitleWrapper = styled.div`
  flex: 0 1 auto;
  flex-direction: row;
  gap: 6px;
  padding: 8px 0 6px 0;
  display: flex;
  align-items: center;
  & > * {
    flex: 0 1 auto;
  }
`;

const LectureGroupSubsectionTop: React.FC<LectureGroupSubsectionTopProps> = ({
  name,
  code,
  type,
  completedCourse,
}) => {
  const SectionWrapper = completedCourse ? SectionCompleted : SectionDefault;
  const titleTextColor = completedCourse ? 'Text.placeholder' : 'Text.default';

  return (
    <SectionWrapper>
      <TitleWrapper>
        <Typography type="NormalBold" color={titleTextColor}>
          {name}
        </Typography>
        <Typography type="Normal" color={titleTextColor}>
          {code}
        </Typography>
      </TitleWrapper>
      {completedCourse ? (
        <Typography type="Small">수강완료</Typography>
      ) : (
        <Typography type="Normal" color="Highlight.default">
          {type}
        </Typography>
      )}
    </SectionWrapper>
  );
};

export default LectureGroupSubsectionTop;
