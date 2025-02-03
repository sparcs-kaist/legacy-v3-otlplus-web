// Search Area

import Chip from '@/common/redesign/components/Chip';
import Icon from '@/common/redesign/components/Icon';
import OptionChipGrid from '@/common/redesign/components/Search/util/generateChips';
import TextInput from '@/common/redesign/components/TextInput';
import { Icon as MUIIcon } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';

const SearchInputAreaWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

const PageWrapper = styled.div`
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TestPage = () => {
  const [value, setValue] = useState<string>('');

  const gradeList = ['100번대', '200번대', '300번대', '400번대'];
  const [gradeSelect, setGrade] = useState<boolean[]>(Array(gradeList.length).fill(false));

  const divisionList = [
    '기필',
    '기선',
    '전필',
    '전선',
    '교필',
    '인선',
    '공통',
    '석박',
    '자선',
    '기타',
  ];
  const [divisionSelect, setDivison] = useState<boolean[]>(Array(divisionList.length).fill(false));

  const majorList = [
    '인문',
    '건환',
    '기경',
    '기계',
    '뇌인지',
    '물리',
    '바공',
    '반시공',
    '상공',
    '산디',
    '생명',
    '생화공',
    '수리',
    '신소재',
    '원양',
    '융인',
    '전산',
    '전자',
    '항공',
    '화학',
    '기타',
  ];
  const [majorSelect, setMajor] = useState<boolean[]>(Array(majorList.length).fill(false));

  const handleSubmit = () => {
    // console.log(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleOptionClick = (
    idx: number,
    targetList: boolean[],
    setList: Dispatch<SetStateAction<boolean[]>>,
  ) => {
    const updatedList = [...targetList];
    updatedList[idx] = !targetList[idx];
    setList(updatedList);
  };

  const handleSelectAll = (targetList: boolean[], setList: Dispatch<SetStateAction<boolean[]>>) => {
    setList(Array(targetList.length).fill(false));
  };

  return (
    <div style={{ padding: '100px' }}>
      <PageWrapper>
        {/* 위쪽 검색어 입력 부분 */}
        <SearchInputAreaWrapper>
          <Icon type="Search" size={13} color="#E54C65" />
          <TextInput
            placeholder={''}
            value={value}
            handleChange={(newValue) => {
              setValue(newValue);
            }}
            onKeyDown={handleKeyDown}
          />
        </SearchInputAreaWrapper>
        <OptionChipGrid
          nameList={divisionList}
          chosenList={divisionSelect}
          handleOptionClick={(idx: number) => {
            handleOptionClick(idx, divisionSelect, setDivison);
          }}
          handleSelectAllClick={() => {
            handleSelectAll(divisionSelect, setDivison);
          }}
          selectedAll={!divisionSelect.includes(true)}
        />
        <OptionChipGrid
          nameList={majorList}
          chosenList={majorSelect}
          handleOptionClick={(idx: number) => {
            handleOptionClick(idx, majorSelect, setMajor);
          }}
          handleSelectAllClick={() => {
            handleSelectAll(majorSelect, setMajor);
          }}
          selectedAll={!majorSelect.includes(true)}
        />
        <OptionChipGrid
          nameList={gradeList}
          chosenList={gradeSelect}
          handleOptionClick={(idx: number) => {
            handleOptionClick(idx, gradeSelect, setGrade);
          }}
          handleSelectAllClick={() => {
            handleSelectAll(gradeSelect, setGrade);
          }}
          selectedAll={!gradeSelect.includes(true)}
        />
      </PageWrapper>
    </div>
  );
};

export default TestPage;
