import { button } from './renderers/button';
import { column } from './renderers/column';
import { hero } from './renderers/hero';
import { text } from './renderers/text';
import { ContentBlockRenderer, PageGuardType } from './types';

export const BLOCK_RENDERERS: { [T: string]: ContentBlockRenderer } = {
  text,
  button,
  column,
  hero
};

export const GUARDS: { [T in PageGuardType]: () => boolean } = {
  auth: () => Boolean(localStorage.getItem('token')),
  no_auth: () => !Boolean(localStorage.getItem('token'))
};

export const RED = '#fc5c65';
export const RED_ACCENT = '#eb3b5a';
export const ORANGE = '#fd9644';
export const ORANGE_ACCENT = '#fa8231';
export const YELLOW = '#fed330';
export const YELLOW_ACCENT = '#f7b731';
export const GREEN = '#26de81';
export const GREEN_ACCENT = '#20bf6b';
export const TURQUOISE = '#2bcbba';
export const TURQUOISE_ACCENT = '#0fb9b1';
export const BLUE = '#45aaf2';
export const BLUE_ACCENT = '#2d98da';
export const DARK_BLUE = '#4b7bec';
export const DARK_BLUE_ACCENT = '#3867d6';
export const PURPLE = '#a55eea';
export const PURPLE_ACCENT = '#8854d0';
export const GRAY = '#d1d8e0';
export const GRAY_ACCENT = '#a5b1c2';
export const DARK_GRAY = '#778ca3';
export const DARK_GRAY_ACCENT = '#4b6584';
export const WHITE = '#ffffff';
export const BLACK = '#121212';

export const PHONE = 'PHONE';
export const TABLET_PORTRAIT = 'TABLET_PORTRAIT';
export const TABLET_LANDSCAPE = 'TABLET_LANDSCAPE';
export const DESKTOP = 'DESKTOP';
export const BIG_DESKTOP = 'BIG_DESKTOP';

export const BREAKPOINTS = {
  [PHONE]: '0',
  [TABLET_PORTRAIT]: '600px',
  [TABLET_LANDSCAPE]: '900px',
  [DESKTOP]: '1200px',
  [BIG_DESKTOP]: '1600px'
};
