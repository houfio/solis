import { column } from './renderers/column';
import { ContentBlockRenderer, State } from './types';
import { button } from './renderers/button';
import { text } from './renderers/text';
import { ContentBlockTypes } from './api/ContentBlock';
import { PageGuardTypes } from './api/Page';
import { hero } from './renderers/hero';

export const BLOCK_RENDERERS: { [T in keyof ContentBlockTypes]: ContentBlockRenderer<T> } = {
  text,
  button,
  column,
  hero
};

export const GUARDS: { [T in PageGuardTypes]: (state: State) => boolean } = {
  auth: state => Boolean(state.auth.token),
  no_auth: state => !Boolean(state.auth.token)
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
