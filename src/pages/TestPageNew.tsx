/* eslint-disable no-console */
import { Dispatch, SetStateAction, useState } from 'react';
import SearchArea from '@/common/redesign/components/SearchArea';
import LectureGroupSubSection from '@/common/redesign/components/LectureList/LectureGroupSubSection';

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

  return (
    <div
      style={{
        padding: '100px',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <SearchArea />
      <LectureGroupSubSection
        name={'Default'}
        code={'SP101'}
        division={'기필'}
        selected={lectureCode}
        setLectureCode={setLectureCode}
      />
      <LectureGroupSubSection
        name={'Disabled'}
        code={'SP102'}
        division={'기필'}
        type="disabled"
        selected={lectureCode}
        setLectureCode={setLectureCode}
      />
      <LectureGroupSubSection
        name={'Completed'}
        code={'SP103'}
        division={'기필'}
        type="completed"
        selected={lectureCode}
        setLectureCode={setLectureCode}
      />
    </div>
  );
};

export default TestPage;
