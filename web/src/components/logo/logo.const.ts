export enum LogoVariant {
  WORDMARK = 'wordmark',
  WORDMARK_SLOGAN = 'wordmarkSlogan',
  SYMBOL = 'symbol',
}

export enum LogoTone {
  PRIMARY = 'primary',
  INVERSE = 'inverse',
}

export enum LogoAlign {
  START = 'start',
  CENTER = 'center',
  END = 'end',
}

export const DEFAULT_LOGO_VARIANT = LogoVariant.WORDMARK;
export const DEFAULT_LOGO_TONE = LogoTone.PRIMARY;
export const DEFAULT_LOGO_ALIGN = LogoAlign.START;
