import styled from 'styled-components';

interface DividerProps {
  direction?: 'column' | 'row';
}

const ColumnDivider = styled.div`
  width: 1px;
  background-color: ${({ theme }) => theme.colors.Line.divider};
`;

const RowDivider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.Line.divider};
`;

const Divider: React.FC<DividerProps> = ({ direction = 'column' }) => {
  return direction === 'column' ? <ColumnDivider /> : <RowDivider />;
};

export default Divider;
