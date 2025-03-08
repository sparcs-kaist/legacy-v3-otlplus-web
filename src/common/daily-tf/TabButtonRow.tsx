import { ContentCopy } from '@mui/icons-material';
import FlexWrapper from './FlexWrapper';
import Icon from './Icon';
import TabButton from './TabButton';
import Typography from './Typography';

interface TabButtonRowProps {
  rowLength: number;
  index: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  isTimetable?: boolean;
}

const TabButtonRow: React.FC<TabButtonRowProps> = ({
  rowLength,
  index,
  setIndex,
  isTimetable = true,
}) => {
  return (
    <FlexWrapper direction="row" gap={3}>
      {Array.from({ length: rowLength }).map((_, i) => {
        if (i == 0) {
          return (
            <TabButton
              key={i}
              type={index == i ? 'selected' : 'default'}
              onClick={() => {
                setIndex(i);
              }}>
              수강 시간표
            </TabButton>
          );
        } else {
          return (
            <TabButton
              key={i}
              type={index == i ? 'selected' : 'default'}
              onClick={() => {
                setIndex(i);
              }}>
              <Typography type="Normal">{`시간표 ${i}`}</Typography>
              {isTimetable && (
                <>
                  <Icon type={'ContentCopy'} size={17.5} />
                  <Icon type={'Close'} size={17.5} />
                </>
              )}
            </TabButton>
          );
        }
      })}
      {isTimetable && (
        <TabButton>
          <Icon type={'Add'} size={17.5} />
        </TabButton>
      )}
    </FlexWrapper>
  );
};

export default TabButtonRow;
