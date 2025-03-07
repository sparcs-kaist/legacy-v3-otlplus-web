import { TimeBlock } from '../interface/timeBlockType';

export function formatTimeblockToString(timeblock: TimeBlock): string {
  const date = timeblock.day;
  const formattedDate = date
    .toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/ /g, '');
  return `${formattedDate} ${timeblock.startTime} - ${timeblock.endTime}`;
}
