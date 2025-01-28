import styled from 'styled-components';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

interface ArrowProps {
  handleOnClick: () => void;
  isForward?: boolean;
}

const ArrowWrapper = styled.div`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.colors.Highlight.default};
`;

const Arrow: React.FC<ArrowProps> = ({ handleOnClick, isForward = true }) => {
  return (
    <ArrowWrapper onClick={handleOnClick}>
      {isForward ? <ArrowForwardIosIcon /> : <ArrowBackIosNewIcon />}
    </ArrowWrapper>
  );
};

export default Arrow;
