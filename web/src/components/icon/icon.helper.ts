import type { IconSize, IconTone } from './icon.const';

export const getIconClassName = (
  styles: Record<string, string>,
  { size, tone, className }: { size: IconSize; tone: IconTone; className?: string },
): string => [styles.icon, styles[`size-${size}`], styles[`tone-${tone}`], className].filter(Boolean).join(' ');

// Con etiqueta, el icono es una imagen con nombre; sin ella, es decorativo.
export const getIconA11yProps = (label?: string) =>
  label ? { role: 'img' as const, 'aria-label': label } : { 'aria-hidden': true as const };
