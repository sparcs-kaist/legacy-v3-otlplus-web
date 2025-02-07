/* eslint-disable no-console */
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import LectureGroupList from '../common/redesign/components/LectureGroupList';
import SearchArea from '@/common/redesign/components/SearchArea';

export type OptionProps = {
  nameList: string[];
  selectedList: boolean[];
  setSelectedList: Dispatch<SetStateAction<boolean[]>>;
};

export type LectureProps = {
  code: string;
  professorCode: string;
};

const TestPage = () => {
  const [lectureCode, setLectureCode] = useState<LectureProps | null>(null);

  useEffect(() => {
    console.log(lectureCode?.code, lectureCode?.professorCode);
  }, [lectureCode]);

  return (
    <div
      style={{
        padding: '100px',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        width: '500px',
      }}>
      <SearchArea />
      <LectureGroupList />
    </div>
  );
};

export default TestPage;
