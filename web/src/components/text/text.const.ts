export enum TypographyKinds {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  P = 'p',
  SPAN = 'span',
  LABEL = 'label',
  STRONG = 'strong',
  DT = 'dt',
  DD = 'dd',
  CAPTION = 'caption',
}

export enum TypographyVariant {
  DISPLAY = 'display',
  DISPLAY_NUMBER = 'displayNumber',
  TITLE_XL = 'titleXl',
  TITLE_L = 'titleL',
  TITLE_M = 'titleM',
  TITLE_ACTION = 'titleAction',
  TITLE_S = 'titleS',
  TITLE_CARD = 'titleCard',
  TITLE_XS = 'titleXs',
  QUOTE = 'quote',
  SERIF_NOTE = 'serifNote',
  BODY_L = 'bodyL',
  BODY_LEAD = 'bodyLead',
  BODY_M = 'bodyM',
  BODY_MS = 'bodyMs',
  BODY_S = 'bodyS',
  CAPTION = 'caption',
  EYEBROW = 'eyebrow',
  LABEL = 'label',
  MICRO = 'micro',
}

export enum TypographyTone {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  INVERSE = 'inverse',
  INVERSE_MUTED = 'inverseMuted',
  INHERIT = 'inherit',
}

export enum TypographyWeight {
  LIGHT = 'light',
  REGULAR = 'regular',
  MEDIUM = 'medium',
  SEMIBOLD = 'semibold',
  BOLD = 'bold',
}

export const DEFAULT_KIND = TypographyKinds.P;
export const DEFAULT_VARIANT = TypographyVariant.BODY_M;
export const DEFAULT_TONE = TypographyTone.PRIMARY;
