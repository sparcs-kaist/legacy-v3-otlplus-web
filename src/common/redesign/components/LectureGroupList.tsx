/* eslint-disable no-console */
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import SearchArea from '@/common/redesign/components/SearchArea';
import LectureGroupSubSection from '@/common/redesign/components/LectureList/LectureGroupSubSection';
import styled from 'styled-components';
import { ContentsTypeInner } from '@/common/redesign/components/LectureList/LectureGroupSubSectionContents';

export type OptionProps = {
  nameList: string[];
  selectedList: boolean[];
  setSelectedList: Dispatch<SetStateAction<boolean[]>>;
};

export type LectureProps = {
  code: string;
  professorCode: string;
};

export type LectureDetailProps = {
  code: string;
  division: string;
  name: string;
  type: keyof typeof ContentsTypeInner;
};

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 100%;
  width: 100%;
  gap: 20px;
  padding-bottom: 20px;
`;

const LectureGroupList = () => {
  const [lectureCode, setLectureCode] = useState<LectureProps | null>(null);

  const lectureInfo: Array<LectureDetailProps> = [
    { name: 'Default', code: 'SP101', division: '기필', type: 'default' },
    { name: 'Completed', code: 'SP103', division: '기필', type: 'completed' },
    { name: 'Disabled', code: 'SP102', division: '기필', type: 'disabled' },
  ];

  useEffect(() => {
    console.log(lectureCode?.code, lectureCode?.professorCode);
  }, [lectureCode]);

  return (
    <ListWrapper>
      {lectureInfo.map((value, index) => (
        <LectureGroupSubSection
          key={index}
          name={value.name}
          code={value.code}
          division={value.division}
          type={value.type}
          selected={lectureCode}
          setLectureCode={setLectureCode}
        />
      ))}
    </ListWrapper>
  );
};

export default LectureGroupList;
