import styled from 'styled-components';

const Divider: React.FC = () => {
  return styled.div`
    width: 100%;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.Line.divider};
  `;
};

export default Divider;
