import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { SearchLecture } from '@/common/daily-tf/interface/SearchLecture';
import Lecture from '@/common/daily-tf/interface/Lecture';
import { transferSearchLectureToLecture } from '@/common/daily-tf/utils/transferSearchLectureToLecture';
import LectureGroupSubsectionTop from '@/common/daily-tf/timetable/lecture/LectureGroupSubsectionTop';
import LectureGroupSubsectionBottom from '@/common/daily-tf/timetable/lecture/LectureGroupSubsectionBottom';

interface LectureGroupBlockProps {
  lectures: SearchLecture[];
  completedCourse: boolean;
  wishList: SearchLecture[];
  setWishList: React.Dispatch<React.SetStateAction<SearchLecture[]>>;
  timeTableLectures: SearchLecture[];
  hoveredLecture: Lecture | null;
  setHoveredLecture: React.Dispatch<React.SetStateAction<Lecture | null>>;
  selectedLecture: Lecture | null;
  setSelectedLecture: React.Dispatch<React.SetStateAction<Lecture | null>>;
}

const BlockWrapper = styled.div<{ selected: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.2s ease-in-out;

  position: ${({ selected }) => (selected ? 'relative' : 'static')};
  top: ${({ selected }) => (selected ? '-3px' : '0')};
  box-shadow: ${({ selected }) => (selected ? '2px 4px 8px -2px #00000033' : 'none')};
`;

const LectureGroupBlock: React.FC<LectureGroupBlockProps> = ({
  lectures,
  completedCourse,
  wishList,
  setWishList,
  timeTableLectures,
  hoveredLecture,
  setHoveredLecture,
  selectedLecture,
  setSelectedLecture,
}) => {
  const lectureIds = lectures.map((lecture) => {
    return lecture.id;
  });
  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
    setIsSelected(selectedLecture !== null && lectureIds.includes(selectedLecture.id));
  }, [selectedLecture]);

  return (
    <BlockWrapper
      selected={isSelected}
      onClickCapture={(e) => {
        if (completedCourse) e.stopPropagation();
      }}
      style={{ opacity: selectedLecture !== null && !isSelected ? 0.3 : 1 }}>
      <LectureGroupSubsectionTop
        name={lectures[0].title}
        code={lectures[0].code}
        type={lectures[0].type}
        completedCourse={completedCourse}></LectureGroupSubsectionTop>
      {lectures.map((lecture) => (
        <div
          key={lecture.id}
          onClick={(e) => {
            e.stopPropagation();
            if (selectedLecture?.id === lecture.id) {
              setSelectedLecture(null);
            } else {
              setSelectedLecture(transferSearchLectureToLecture(lecture));
            }
            setHoveredLecture(null);
          }}
          onMouseEnter={(e) => {
            e.stopPropagation();
            if (selectedLecture !== null) return;
            if (hoveredLecture?.id === lecture.id) {
              setHoveredLecture(null);
            } else {
              setHoveredLecture(transferSearchLectureToLecture(lecture));
            }
          }}
          onMouseLeave={(e) => {
            e.stopPropagation();
            if (selectedLecture !== null) return;
            if (hoveredLecture?.id === lecture.id) {
              setHoveredLecture(null);
            } else {
              setHoveredLecture(transferSearchLectureToLecture(lecture));
            }
          }}>
          <LectureGroupSubsectionBottom
            classNumber={lecture.class_title}
            lectureName={lecture.professors.map((professor) => professor.name).join(', ')}
            isWishlisted={wishList.includes(lecture)}
            setWishlist={() => {
              setWishList((wishList) => {
                if (wishList.includes(lecture)) {
                  return wishList.filter((wish) => wish.id !== lecture.id);
                } else {
                  return [...wishList, lecture];
                }
              });
            }}
            isAdded={false}
            isSelected={
              completedCourse || selectedLecture?.id === lecture.id
            }></LectureGroupSubsectionBottom>
        </div>
      ))}
    </BlockWrapper>
  );
};

export default LectureGroupBlock;
