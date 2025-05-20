import styled from 'styled-components';

const StyledDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.Line.divider};
`;

const Divider: React.FC = () => {
  return <StyledDivider />;
};

export default Divider;
