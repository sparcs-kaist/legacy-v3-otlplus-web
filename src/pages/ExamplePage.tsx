import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Modal from '@/common/daily-tf/Modal';
import Calendar from '@/common/daily-tf/Calendar';
import TextInput from '@/common/daily-tf/TextInputArea';
import ScrollableDropdown from '@/common/daily-tf/ScrollableDropdown';
import EditModalBody from '@/common/daily-tf/EditModalBody';
import Button from '@/common/daily-tf/Button';

/* TODO: 그리드 크기 default 값 설정 */

const PageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
  gap: 12px;
  padding: 100px;
  overflow: auto;
  position: relative;
`;

const Wrapper = styled.div`
  overflow: scroll;
  flex-direction: column;
  height: 300px;
  display: flex;
  position: absolute;
  width: 100px;
`;

const OptionScroll = styled.div<{ top: number; left: number; width: number }>`
  display: flex;
  flex-direction: column;
  height: 100px;
  z-index: 9999;
  width: ${(props) => `${props.width}px`};
  position: absolute;
  top: ${(props) => `${props.top + 36}px`};
  left: ${(props) => `${props.left}px`};
  overflow: scroll;
`;

const Grid = styled.div`
  height: 200px;
  background-color: aqua;
  border: 1px solid black;
`;

const ExamplePage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(18);

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
        {/* <h2>Modal Title</h2>
        <p>This is the modal content.</p>
        <TextInput placeholder={''} value={name} handleChange={handleChange}></TextInput>
        <TextInput placeholder={''} value={name} handleChange={handleChange}></TextInput>
        <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate}></Calendar>
        <Dropdown
          options={timeArray}
          zindex={20}
          disabledOptions={Array.from({ length: 19 - endTime }, (_, i) => 19 - i)}
          selectedOption={startTime}
          setSelectedOption={setStartTime}
        />
        <Dropdown
          options={timeArray}
          disabledOptions={Array.from({ length: startTime }, (_, i) => i)}
          selectedOption={endTime}
          setSelectedOption={setEndTime}
        /> */}
        {/* <EditModalBody /> */}
        hello
      </Modal>
    </PageWrapper>
  );
};

export default ExamplePage;
