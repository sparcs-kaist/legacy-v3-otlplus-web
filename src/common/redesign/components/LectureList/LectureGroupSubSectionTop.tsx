import styled from 'styled-components';

interface LectureGroupSubSectionTopProps {
  name: string;
  code: string;
  division: string;
  type?: keyof typeof ContentsTypeInner;
  setProfessorCode: React.Dispatch<React.SetStateAction<null | string>>;
  selected: null | string;
}

const ContentsInner = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 8px 10px;
  font-size: 13px;
  line-height: 14px;
  font-weight: 400;
  color: #333333;
  background: #f5f5f5;
`;

const ContentsDefaultInner = styled(ContentsInner)`
  cursor: pointer;
  &:hover {
    background: #ebebeb;
  }
`;

const ContentsDefaultSelectedInner = styled(ContentsInner)`
  background: #ebebeb;
`;

const ContentsCompletedSelectedInner = styled(ContentsInner)`
  background: #e1e1e1;
`;

const ContentsCompletedInner = styled(ContentsInner)`
  background: #ebebeb;
  cursor: pointer;
  &:hover {
    background: #e1e1e1;
  }
`;

const ContentsDisabledInner = styled(ContentsInner)`
  background: #f0f0f0;
  cursor: not-allowed;
  pointer-events: none;
`;

const TitleWrapper = styled.div`
  display: flex;
  gap: 6px;
  flex-direction: row;
`;

export const ContentsTypeInner = {
  default: ContentsDefaultInner,
  disabled: ContentsDisabledInner,
  completed: ContentsCompletedInner,
  selectedDefault: ContentsDefaultSelectedInner,
  selectedCompleted: ContentsCompletedSelectedInner,
};

const LectureGroupSubSectionTop: React.FC<LectureGroupSubSectionTopProps> = ({
  name,
  code,
  division,
  type = 'default',
  setProfessorCode,
  selected,
}) => {
  let ContentsChosenInner = ContentsTypeInner[type];
  const isCompleted = type == 'completed';
  const isDisabled = type == 'disabled';
  const isSelected = '0' == selected;

  if (isSelected) {
    if (isCompleted) {
      ContentsChosenInner = ContentsTypeInner['selectedCompleted'];
    } else {
      ContentsChosenInner = ContentsTypeInner['selectedDefault'];
    }
  }

  const handleOnclick = () => {
    if (selected == '0') {
      setProfessorCode(null);
    } else {
      setProfessorCode('0');
    }
  };

  return (
    <ContentsChosenInner onClick={handleOnclick}>
      <TitleWrapper style={{ opacity: `${isCompleted || isDisabled ? 0.3 : 1}` }}>
        <div style={{ fontWeight: 700 }}>{name}</div>
        {code}
      </TitleWrapper>
      <div
        style={{
          color: `${isCompleted ? '#333333' : '#E54C65'}`,
          opacity: `${isDisabled ? 0.3 : 1}`,
        }}>
        {isCompleted ? '수강완료' : division}
      </div>
    </ContentsChosenInner>
  );
};

export default LectureGroupSubSectionTop;
