import styled from 'styled-components';
import Icon from '../Icon';

interface LectureGroupSubSectionContentsProps {
  name: string;
  code: string;
  type?: keyof typeof ContentsTypeInner;
  setProfessorCode: React.Dispatch<React.SetStateAction<null | string>>;
  professorCode: string | null;
}

const ContentsInner = styled.div`
  border-top: 1px solid #c9c9c9;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding-left: 8px;
  padding-top: 8px;
  padding-bottom: 8px;
  font-size: 13px;
  line-height: 14px;
  font-weight: 400;
  color: #333333;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  padding-left: 10px;
  padding-right: 10px;
`;

const ContentsDefaultInner = styled(Wrapper)`
  background: #f5f5f5;
  cursor: pointer;
  &:hover {
    background: #ebebeb;
  }
`;

const ContentsDefaultSelectedInner = styled(Wrapper)`
  background: #ebebeb;
`;

const ContentsCompletedSelectedInner = styled(Wrapper)`
  background: #e1e1e1;
`;

const ContentsCompletedInner = styled(Wrapper)`
  background: #ebebeb;
  cursor: pointer;
  &:hover {
    background: #e1e1e1;
  }
`;

const ContentsDisabledInner = styled(Wrapper)`
  background: #f0f0f0;
  cursor: not-allowed;
  pointer-events: none;
`;

const TitleWrapper = styled.div`
  display: flex;
  gap: 2px;
  flex-direction: row;
`;

export const ContentsTypeInner = {
  default: ContentsDefaultInner,
  disabled: ContentsDisabledInner,
  completed: ContentsCompletedInner,
  selectedDefault: ContentsDefaultSelectedInner,
  selectedCompleted: ContentsCompletedSelectedInner,
};

const LectureGroupSubSectionContents: React.FC<LectureGroupSubSectionContentsProps> = ({
  name,
  code,
  type = 'default',
  setProfessorCode,
  professorCode,
}) => {
  let WrapperChosen = ContentsTypeInner[type];
  const isDisabled = type == 'disabled';
  if (code == professorCode) {
    if (type == 'default') {
      WrapperChosen = ContentsTypeInner['selectedDefault'];
    } else if (type == 'completed') {
      WrapperChosen = ContentsTypeInner['selectedCompleted'];
    }
  }

  const handleOnclick = () => {
    // eslint-disable-next-line no-console
    console.log('clicked');
  };

  const handleWrapperClick = () => {
    if (professorCode == code) {
      setProfessorCode(null);
    } else {
      setProfessorCode(code);
    }
  };

  return (
    <WrapperChosen onClick={handleWrapperClick}>
      <ContentsInner>
        <TitleWrapper style={{ opacity: `${isDisabled ? 0.3 : 1}` }}>
          <div style={{ fontWeight: 700 }}>{code}</div>
          {name}
        </TitleWrapper>
        <div style={{ opacity: `${isDisabled ? 0.3 : 1}` }}>
          <Icon type={'Add'} size={13} onClick={handleOnclick} />
        </div>
      </ContentsInner>
    </WrapperChosen>
  );
};

export default LectureGroupSubSectionContents;
