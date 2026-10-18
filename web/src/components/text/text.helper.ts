import type { TypographyTone, TypographyVariant, TypographyWeight } from './text.const';

interface TextClassOptions {
  variant: TypographyVariant;
  tone: TypographyTone;
  weight?: TypographyWeight;
  tabular?: boolean;
  balance?: boolean;
  className?: string;
}

export const getTextClassName = (
  styles: Record<string, string>,
  { variant, tone, weight, tabular, balance, className }: TextClassOptions,
): string =>
  [
    styles.text,
    styles[variant],
    styles[`tone-${tone}`],
    weight && styles[`weight-${weight}`],
    tabular && styles.tabular,
    balance && styles.balance,
    className,
  ]
    .filter(Boolean)
    .join(' ');
