import styles from './logo.module.css';
import { DEFAULT_LOGO_ALIGN, DEFAULT_LOGO_TONE, DEFAULT_LOGO_VARIANT, LogoAlign, LogoTone, LogoVariant } from './logo.const';
import { getLogoClassName } from './logo.helper';

export interface LogoProps {
  variant?: LogoVariant;
  tone?: LogoTone;
  align?: LogoAlign;
  label?: string;
  className?: string;
}

export const Logo = ({
  variant = DEFAULT_LOGO_VARIANT,
  tone = DEFAULT_LOGO_TONE,
  align = DEFAULT_LOGO_ALIGN,
  label,
  className,
}: LogoProps) => (
  <span
    className={getLogoClassName(styles, { variant, tone, align, className })}
    {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
  />
);
