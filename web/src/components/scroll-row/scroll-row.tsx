import type { AriaRole, CSSProperties, KeyboardEventHandler, ReactNode, Ref, UIEventHandler } from 'react';
import styles from './scroll-row.module.css';
import { DEFAULT_SCROLL_ROW_GAP, ScrollRowGap } from './scroll-row.const';

export interface ScrollRowProps {
  children: ReactNode;
  label?: string;
  role?: AriaRole;
  focusable?: boolean;
  gap?: ScrollRowGap;
  desktopColumns?: number;
  onScroll?: UIEventHandler<HTMLDivElement>;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
  className?: string;
  ref?: Ref<HTMLDivElement>;
}

// Fila con desplazamiento lateral que sale hasta el borde de la pantalla.
// Con desktopColumns, en escritorio se convierte en una rejilla de ese número de columnas.
export const ScrollRow = ({
  children,
  label,
  role,
  focusable,
  gap = DEFAULT_SCROLL_ROW_GAP,
  desktopColumns,
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
    className={[styles.scrollRow, styles[`gap-${gap}`], desktopColumns && styles.desktopGrid, className].filter(Boolean).join(' ')}
    style={desktopColumns ? ({ '--scroll-row-columns': desktopColumns } as CSSProperties) : undefined}
  >
    {children}
  </div>
);
