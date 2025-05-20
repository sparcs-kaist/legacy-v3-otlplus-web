'use client';

import React from 'react';
import * as MuiIcons from '@mui/icons-material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface IconProps {
  type: string;
  size: number;
  onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  color?: string;
}

const Icon: React.FC<IconProps> = ({ type, size, onClick = undefined, color = 'inherit' }) => {
  const IconComponent = MuiIcons[type as keyof typeof MuiIcons];

  if (!IconComponent) {
    return (
      <div
        style={{
          display: 'flex',
          cursor: onClick ? 'pointer' : 'default',
          color: color,
          fontSize: `${size}px`,
        }}>
        <ErrorOutlineIcon />
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        cursor: onClick ? 'pointer' : 'default',
        color: color,
        fontSize: `${size}px`,
      }}
      onClick={onClick}>
      <IconComponent fontSize="inherit" />
    </div>
  );
};

export default Icon;
