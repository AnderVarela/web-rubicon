import type { LogoAlign, LogoTone, LogoVariant } from './logo.const';

export const getLogoClassName = (
  styles: Record<string, string>,
  { variant, tone, align, className }: { variant: LogoVariant; tone: LogoTone; align: LogoAlign; className?: string },
) => [styles.logo, styles[variant], styles[`tone-${tone}`], styles[`align-${align}`], className].filter(Boolean).join(' ');
