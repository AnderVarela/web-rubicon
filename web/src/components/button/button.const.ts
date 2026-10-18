export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  INVERSE = 'inverse',
  PLAIN = 'plain',
  LINK = 'link',
  LINK_INVERSE = 'linkInverse',
}

export enum ButtonSize {
  S = 's',
  M = 'm',
  L = 'l',
}

export enum ButtonJustify {
  START = 'start',
  CENTER = 'center',
  BETWEEN = 'between',
}

export enum IconPosition {
  START = 'start',
  END = 'end',
}

export const DEFAULT_BUTTON_VARIANT = ButtonVariant.PRIMARY;
export const DEFAULT_BUTTON_SIZE = ButtonSize.L;
export const DEFAULT_BUTTON_JUSTIFY = ButtonJustify.CENTER;
export const EXTERNAL_LINK_REL = 'noopener noreferrer';
export const EXTERNAL_LINK_TARGET = '_blank';
