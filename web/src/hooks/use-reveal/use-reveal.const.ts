// Solo se esconden los bloques que empiezan por debajo del 92 % de la pantalla.
export const REVEAL_VIEWPORT_RATIO = 0.92;
export const REVEAL_ROOT_MARGIN = '0px 0px -8% 0px';
export const REVEAL_STATE_ATTRIBUTE = 'data-reveal';

export enum RevealState {
  HIDDEN = 'hidden',
  SHOWN = 'shown',
}
