import styled from 'styled-components';
import LectureGroupSubSectionTop, { ContentsTypeInner } from './LectureGroupSubSectionTop';
import LectureGroupSubSectionContents from './LectureGroupSubSectionContents';
import { useEffect, useRef, useState } from 'react';
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
  position: relative;
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
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setIsSelected(selected?.code === code);

    if (selected?.code != code) {
      setProfessorCode(null);
    }
  }, [selected]);

  const handleClickOutside = (event: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
      setIsSelected(false);
      setProfessorCode(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleContentsClick = (_code: string) => {
    if (_code == professorCode) {
      setProfessorCode(null);
      setLectureCode(null);
    } else {
      setLectureCode({ code: code, professorCode: _code });
      setProfessorCode(_code);
    }
  };

  return (
    <CardWrapper
      isSelected={isSelected}
      ref={wrapperRef}
      onClick={() => {
        handleClickOutside;
      }}>
      <div
        onClick={() => {
          handleContentsClick('0');
        }}>
        <LectureGroupSubSectionTop
          name={name}
          code={code}
          division={division}
          selected={professorCode}
          type={`${type}`}
        />
      </div>
      {[...professorName].map(([key, professor], idx) => (
        <div
          key={idx}
          onClick={() => {
            handleContentsClick(key);
          }}>
          <LectureGroupSubSectionContents
            name={professor}
            code={key}
            type={`${type}`}
            professorCode={professorCode}
          />
        </div>
      ))}
    </CardWrapper>
  );
};

export default LectureGroupSubSection;
