import styled from 'styled-components';

const HoverContainer = styled.div<{ top: number; left: number; width?: number }>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: ${(props) => props.top + 20}px;
  left: ${(props) => props.left}px;
  background-color: rgba(51, 51, 51, 0.5);
  color: white;
  padding: 10px;
  border-radius: 2px;
  pointer-events: none;
  width: ${(props) => (props.width ? `${props.width}px` : 'auto')};
  height: auto;
  overflow: auto;
  z-index: 9999;
`;

export default HoverContainer;
