import styled from 'styled-components';

const StyledDividerRow = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.Line.divider};
`;

const StyledDividerColumn = styled.div`
  width: 1px;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.Line.divider};
`;

const Divider: React.FC<{ direction?: 'column' | 'row' }> = ({ direction = 'row' }) => {
  return direction == 'row' ? <StyledDividerRow /> : <StyledDividerColumn />;
};

export default Divider;
