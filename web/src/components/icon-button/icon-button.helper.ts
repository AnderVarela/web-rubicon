import type { IconButtonSize, IconButtonVariant } from './icon-button.const';

export const getIconButtonClassName = (
  styles: Record<string, string>,
  { variant, size, className }: { variant: IconButtonVariant; size: IconButtonSize; className?: string },
) => [styles.iconButton, styles[variant], styles[`size-${size}`], className].filter(Boolean).join(' ');
