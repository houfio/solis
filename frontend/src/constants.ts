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

export const API_URL = '/api';

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
