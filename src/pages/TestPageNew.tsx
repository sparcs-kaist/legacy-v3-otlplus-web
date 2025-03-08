/* eslint-disable no-console */
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

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
        overflow: 'scroll',
      }}></div>
  );
};

export default TestPage;
