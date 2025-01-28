import React from 'react';
import styled from 'styled-components';
import type { Theme } from 'src/lib/styles/themes';
import fonts from '@/lib/styles/themes/fonts';

interface TypographyPropsBase extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

type ColorKeys = keyof Theme['colors'];
type NestedColorKeys<C extends ColorKeys> = C extends keyof Theme['colors']
  ? Theme['colors'][C] extends string | number
    ? never
    : keyof Theme['colors'][C] & (string | number)
  : never;

type NestedColors = {
  [C in ColorKeys]: NestedColorKeys<C> extends never ? never : `${C}.${NestedColorKeys<C>}`;
}[ColorKeys];

type ThemeColors = ColorKeys | NestedColors;

const getColorFromTheme = (theme: Theme, colorString: ThemeColors) => {
  if (typeof colorString === 'string' && colorString.includes('.')) {
    const [colorKey, shade] = colorString.split('.');
    const colorValue = theme.colors[colorKey as keyof Theme['colors']];

    if (typeof colorValue === 'object' && shade in colorValue) {
      return colorValue[shade as unknown as keyof typeof colorValue];
    }
  }

  return theme.colors[colorString as keyof Theme['colors']];
};

interface TypographyProps extends TypographyPropsBase {
  type?: keyof typeof fonts; // Ensure `type` corresponds to a key in `fonts`
  color?: ThemeColors;
}

const TypographyInner = styled.div<TypographyProps>`
  color: ${({ color, theme }) => (color ? getColorFromTheme(theme, color) : 'inherit')};
  font-size: ${({ type }) => (type ? `${fonts[type].fontSize}px` : 'inherit')};
  font-weight: ${({ type }) => (type ? fonts[type].fontWeight : 'inherit')};
  line-height: ${({ type }) => (type ? `${fonts[type].lineHeight}px` : 'inherit')};
`;

const Typography: React.FC<TypographyProps> = ({ children, ...rest }) => (
  <TypographyInner {...rest}>{children}</TypographyInner>
);

export default Typography;
