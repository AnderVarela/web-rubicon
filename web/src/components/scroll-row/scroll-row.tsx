import type { AriaRole, KeyboardEventHandler, ReactNode, Ref, UIEventHandler } from 'react';
import styles from './scroll-row.module.css';
import { DEFAULT_SCROLL_ROW_GAP, ScrollRowGap } from './scroll-row.const';

export interface ScrollRowProps {
  children: ReactNode;
  label?: string;
  role?: AriaRole;
  focusable?: boolean;
  gap?: ScrollRowGap;
  onScroll?: UIEventHandler<HTMLDivElement>;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

// Fila con desplazamiento lateral que sale hasta el borde de la pantalla.
export const ScrollRow = ({
  children,
  label,
  role,
  focusable,
  gap = DEFAULT_SCROLL_ROW_GAP,
  onScroll,
  onKeyDown,
  className,
  ref,
}: ScrollRowProps) => (
  <div
    ref={ref}
    role={role}
    aria-label={label}
    // Una zona desplazable debe poder alcanzarse con el teclado.
    tabIndex={focusable ? 0 : undefined}
    onScroll={onScroll}
    onKeyDown={onKeyDown}
    className={[styles.scrollRow, styles[`gap-${gap}`], className].filter(Boolean).join(' ')}
  >
    {children}
  </div>
);
