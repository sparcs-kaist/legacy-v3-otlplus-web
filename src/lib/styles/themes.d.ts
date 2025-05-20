import type colors from './themes/colors';
import type fonts from './themes/fonts';

export type ColorTheme = typeof colors;
export type FontTheme = typeof fonts;

export type Theme = {
  colors: ColorTheme;
  fonts: FontTheme;
};

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
