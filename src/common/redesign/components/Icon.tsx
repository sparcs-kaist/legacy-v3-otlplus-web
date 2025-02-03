'use client';

import React from 'react';
import { Icon as MUIIcon } from '@mui/material';
import * as MuiIcons from '@mui/icons-material'; // 아이콘을 동적으로 가져오기 위한 import
import isPropValid from '@emotion/is-prop-valid';
import styled, { css } from 'styled-components';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface IconProps {
  type: string;
  size: number;
  onClick?: () => void;
  color?: string;
}

const Icon: React.FC<IconProps> = ({ type, size, onClick = undefined, color = 'inherit' }) => {
  // MuiIcons에서 `type`에 해당하는 아이콘을 동적으로 가져옵니다.
  const IconComponent = MuiIcons[type as keyof typeof MuiIcons];

  // 아이콘이 존재하지 않으면 렌더링하지 않거나 에러 메시지 표시
  if (!IconComponent) {
    return <ErrorOutlineIcon />;
  }

  return (
    <div
      style={{
        display: 'flex',
        cursor: onClick ? 'pointer' : 'default',
        color: color,
        fontSize: `${size}px`,
      }}>
      <IconComponent fontSize="inherit" onClick={onClick} />
    </div>
  );
};

export default Icon;
