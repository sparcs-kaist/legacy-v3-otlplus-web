import styled from 'styled-components';
import LectureGroupSubSectionTop, { ContentsTypeInner } from './LectureGroupSubSectionTop';
import LectureGroupSubSectionContents from './LectureGroupSubSectionContents';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LectureProps } from '@/pages/TestPageNew';

interface LectureGroupSubSectionProps {
  name: string;
  code: string;
  division: string;
  type?: keyof typeof ContentsTypeInner;
  isCompleted?: boolean;
  selected: null | LectureProps;
  setLectureCode: React.Dispatch<React.SetStateAction<null | LectureProps>>;
}

const CardWrapper = styled(motion.div)<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: ${(props) => (props.isSelected ? '2px 3px 8px -2px rgba(0, 0, 0, 0.2)' : 'none')};
  transition: box-shadow 0.2s ease-out;
`;

const LectureGroupSubSection: React.FC<LectureGroupSubSectionProps> = ({
  name,
  code,
  division,
  type = 'default',
  selected,
  setLectureCode,
}) => {
  const professorName = new Map([
    ['A', '김교수'],
    ['B', '박교수'],
    ['C', '이교수'],
  ]);

  // 전체 과목 선택 시, 교수 코드가 '0'으로 들어감
  const [professorCode, setProfessorCode] = useState<null | string>(null);

  const [isSelected, setIsSelected] = useState<boolean>(selected?.code != code);

  useEffect(() => {
    setIsSelected(selected?.code == code && selected.professorCode == professorCode);
    if (professorCode == null) {
      setLectureCode(null);
    } else {
      setLectureCode({ code: code, professorCode: professorCode });
    }
  }, [professorCode]);

  useEffect(() => {
    if (selected?.code != code) {
      setProfessorCode(null);
    }
  }, [selected]);

  return (
    <CardWrapper isSelected={isSelected}>
      <LectureGroupSubSectionTop
        name={name}
        code={code}
        division={division}
        setProfessorCode={setProfessorCode}
        selected={professorCode}
        type={`${type}`}
      />
      {[...professorName].map(([key, professor], idx) => (
        <LectureGroupSubSectionContents
          name={professor}
          code={key}
          type={`${type}`}
          key={idx}
          setProfessorCode={setProfessorCode}
          professorCode={professorCode}
        />
      ))}
    </CardWrapper>
  );
};

export default LectureGroupSubSection;
