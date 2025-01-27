import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { IconButton, Typography } from '@mui/material';

interface CalendarProps {
  selectedDate: Date[];
  setSelectedDate: React.Dispatch<React.SetStateAction<Date[]>>;
}

function getWeeksInMonth(year: number, month: number): number {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const lastDate = lastDayOfMonth.getDate();

  const weeks = Math.ceil((lastDate + firstDayWeekday) / 7);
  return weeks;
}

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: fit-content;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 100%;
  font-size: 16px;
  line-height: 20px;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  color: rgba(51, 51, 51, 1);
`;

const DaysOfWeek = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  width: fit-content;
  font-weight: bold;
  gap: 2px;
`;

const DayGrid = styled.div<{ gridRows: number }>`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: ${(props) => `repeat(${props.gridRows}, 1fr)`};
  gap: 2px;
  width: fit-content;
  height: fit-content;
`;

const DayCell = styled.div<{ isCurrentMonth: boolean; isSelected: boolean }>`
  padding: 10px;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  font-size: 14px;
  line-height: 17.5px;
  font-weight: 400;
  width: 30px;
  height: 30px;
  border-radius: 6px;

  background-color: ${(props) =>
    props.isSelected ? props.theme.colors.Highlight.default : 'transparent'};

  color: ${(props) => (props.isSelected ? 'white' : 'rgba(51, 51, 51, 1)')};

  &:hover {
    background-color: ${(props) =>
      props.isSelected
        ? 'rgba(229, 76, 101, 1)'
        : props.isCurrentMonth
        ? 'rgba(245, 245, 245, 1)'
        : 'transparent'};
  }

  pointer-events: ${(props) => (props.isCurrentMonth ? 'auto' : 'none')};
`;

const DayWrapper = styled.div`
  font-size: 14px;
  line-height: 17.5px;
  font-weight: 400;
  width: 30px;
`;

const Calendar: React.FC<CalendarProps> = ({ selectedDate, setSelectedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weeksInMonth, setWeeksInMonth] = useState(0);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const firstDayWeekday = firstDayOfMonth.getDay();
  const lastDate = lastDayOfMonth.getDate();

  useEffect(() => {
    const weeks = getWeeksInMonth(currentYear, currentMonth);
    setWeeksInMonth(weeks);
  }, [currentYear, currentMonth]);

  const daysArray = Array.from({ length: weeksInMonth * 7 }, (_, i) => {
    const dayNumber = i - firstDayWeekday + 1;
    return dayNumber > 0 && dayNumber <= lastDate ? dayNumber : null;
  });

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const isSelected = (date?: Date) => {
    if (date != null) {
      return selectedDate.some((d) => d.getTime() === date.getTime());
    }
    return false;
  };

  const getDateFromDay = (day: number): Date => {
    return new Date(currentYear, currentMonth, day);
  };

  const handleDateClick = (day: number) => {
    const date = getDateFromDay(day);
    if (date) {
      if (selectedDate.some((d) => d.getTime() === date.getTime())) {
        setSelectedDate(selectedDate.filter((d) => d.getTime() !== date.getTime()));
      } else {
        setSelectedDate([...selectedDate, date]);
      }
    }
  };

  return (
    <CalendarWrapper>
      <Header>
        <IconButton
          onClick={goToPreviousMonth}
          style={{ color: 'rgba(51, 51, 51, 1)', width: '14px', height: '12px' }}>
          <ChevronLeftIcon />
        </IconButton>
        <span>
          {currentYear}년 {currentMonth + 1}월
        </span>
        <IconButton
          onClick={goToNextMonth}
          style={{ color: 'rgba(51, 51, 51, 1)', width: '14px', height: '12px' }}>
          <ChevronRightIcon />
        </IconButton>
      </Header>
      <DaysOfWeek>
        <DayWrapper>일</DayWrapper>
        <DayWrapper>월</DayWrapper>
        <DayWrapper>화</DayWrapper>
        <DayWrapper>수</DayWrapper>
        <DayWrapper>목</DayWrapper>
        <DayWrapper>금</DayWrapper>
        <DayWrapper>토</DayWrapper>
      </DaysOfWeek>
      <DayGrid gridRows={weeksInMonth}>
        {daysArray.map((day, index) => (
          <DayCell
            key={index}
            isCurrentMonth={day !== null}
            isSelected={day == null ? false : isSelected(getDateFromDay(day))}
            onClick={() => {
              if (day != null) {
                handleDateClick(day);
              }
            }}>
            {day}
          </DayCell>
        ))}
      </DayGrid>
    </CalendarWrapper>
  );
};

export default Calendar;
