import { CSSProperties } from 'react';
import { ColorTheme } from '@/lib/styles/themes';
import styled from 'styled-components';
import { LectureSummary } from './interface/timetableType';
import { TimeBlock } from './interface/timeBlockType';

// tile Color를 mapping 해주는 부분
export const colorMap: Array<CSSProperties['color']> = [
  '#f2b9b9',
  '#ffc4b2',
  '#f7c4a1',
  '#f7d4a1',
  '#e5d69b',
  '#dce4a7',
  '#c3e3ab',
  '#b8ecc0',
  '#a1e4c8',
  '#9ee7dd',
  '#98dae0',
  '#a8d9ec',
  '#b2cae5',
  '#ccc8e6',
  '#d8bcd4',
  '#eebfce',
];

const TileWrapper = styled.div<{ course_id: number; duration: number }>`
  display: flex;
  flex-direction: column;
  padding: 6px 4px;
  width: 100%;
  height: ${({ duration }) => `${duration * 24 - 4}px`};
  margin-bottom: 2px;
  margin-top: 2px;
  justify-content: center;
  background-color: ${({ course_id }) => colorMap[course_id % 16]};
  overflow: hidden;
  overflow-wrap: break-word;
  gap: 1px;
`;

const TitleWrapper = styled.span`
  width: 100%;
  font-size: ${({ theme }) => theme.fonts.Small.fontSize};
  line-height: ${({ theme }) => `${theme.fonts.Small.lineHeight}px`};
  font-weight: ${({ theme }) => theme.fonts.Small.fontWeight};
  color: ${({ theme }) => theme.colors.Text.default};
  display: inline-block;
  word-wrap: break-word;
  word-break: keep-all;
  white-space: normal;
`;

const DescWrapper = styled.span`
  width: 100%;
  font-size: ${({ theme }) => theme.fonts.Small.fontSize};
  line-height: ${({ theme }) => `${theme.fonts.Small.lineHeight}px`};
  font-weight: ${({ theme }) => theme.fonts.Small.fontWeight};
  color: rgba(102, 102, 102, 0.6);
  word-wrap: break-word;
  display: inline-block;
  word-break: break-word;
  white-space: normal;
`;

const LectureTile: React.FC<{ lecture: LectureSummary; timeBlock: TimeBlock }> = ({
  lecture,
  timeBlock,
}) => {
  return (
    <TileWrapper course_id={lecture.course_id} duration={timeBlock.duration}>
      <TitleWrapper>{lecture.title}</TitleWrapper>
      <DescWrapper>{lecture.professor_name}</DescWrapper>
      <DescWrapper>{lecture.classroom}</DescWrapper>
    </TileWrapper>
  );
};

export default LectureTile;
