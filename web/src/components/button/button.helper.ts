import type { ButtonJustify, ButtonSize, ButtonVariant } from './button.const';
import { EXTERNAL_LINK_REL, EXTERNAL_LINK_TARGET } from './button.const';

interface ButtonClassOptions {
  variant: ButtonVariant;
  size: ButtonSize;
  justify: ButtonJustify;
  fullWidth?: boolean;
  className?: string;
}

export const getButtonClassName = (
  styles: Record<string, string>,
  { variant, size, justify, fullWidth, className }: ButtonClassOptions,
) =>
  [styles.button, styles[variant], styles[`size-${size}`], styles[`justify-${justify}`], fullWidth && styles.fullWidth, className]
    .filter(Boolean)
    .join(' ');

export const getExternalLinkProps = (external?: boolean) =>
  external ? { target: EXTERNAL_LINK_TARGET, rel: EXTERNAL_LINK_REL } : {};
