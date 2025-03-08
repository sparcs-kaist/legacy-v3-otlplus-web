import FlexWrapper from './FlexWrapper';
import TabButton from './TabButton';

interface TabButtonRowProps {
  rowLength: number;
}

const TabButtonRow: React.FC<TabButtonRowProps> = ({ rowLength }) => {
  return (
    <FlexWrapper direction="row" gap={3}>
      {Array.from({ length: rowLength }).map((_, i) => {
        if (i == 0) {
          return <TabButton key={i}>수강 시간표</TabButton>;
        } else {
          return <TabButton key={i}></TabButton>;
        }
      })}
    </FlexWrapper>
  );
};
