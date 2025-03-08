'use client';

import React from 'react';
import styled, { css } from 'styled-components';

interface IconProps {
  type: string;
  size: number;
  onClick?: () => void;
  color?: string;
}

const IconInner = styled.div<{
  size: number;
  clickable: boolean;
}>`
  display: flex;
  font-size: ${({ size }) => size}px;
  color: ${({ color }) => color || 'black'};
  ${({ clickable }) =>
    clickable &&
    css`
      cursor: pointer;
    `}
`;

const Icon: React.FC<IconProps> = ({ type, size, onClick = undefined, color = 'black' }) => {
  const IconComponent = React.lazy(
    () => import(`@mui/icons-material/${type.charAt(0).toUpperCase() + type.slice(1)}`),
  );

  return (
    <IconInner size={size} clickable={!!onClick} color={color} onClick={onClick}>
      <IconComponent fontSize="inherit" />
    </IconInner>
  );
};

export default Icon;
