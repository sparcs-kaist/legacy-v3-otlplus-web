import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Modal from '@/common/daily-tf/Modal';
import Calendar from '@/common/daily-tf/Calendar';
import TextInput from '@/common/daily-tf/TextInputArea';
import Dropdown from '@/common/daily-tf/Dropdown';

/* TODO: 그리드 크기 default 값 설정 */

const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 100px;
  overflow: auto;
  position: relative;
`;

const EditModalBody: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);

  const [name, setName] = useState('hi');

  const handleChange = (newValue: string) => {
    setName(newValue);
  };

  const TimeIndex = (index: number) => {
    if (index >= 0 && index <= 3) {
      return `오전 ${index + 9}시`;
    } else if (index >= 4 && index <= 15) {
      return `오후 ${index - 3}시`;
    } else if (index >= 16 && index <= 18) {
      return `오전 ${index - 15}시`;
    }
    return '';
  };
  const timeArray = Array.from({ length: 19 }, (_, index) => TimeIndex(index));

  return (
    <PageWrapper>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="일정 편집">
        <h2>Modal Title</h2>
        <p>This is the modal content.</p>
        <TextInput placeholder={''} value={name} handleChange={handleChange}></TextInput>
        <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate}></Calendar>
        <Dropdown
          options={timeArray}
          zindex={20}
          disabledOptions={Array.from({ length: 19 - endTime }, (_, i) => 19 - i)}></Dropdown>
        <Dropdown options={timeArray}></Dropdown>
      </Modal>
    </PageWrapper>
  );
};

export default EditModalBody;
