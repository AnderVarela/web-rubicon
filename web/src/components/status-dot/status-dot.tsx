import styles from './status-dot.module.css';

export interface StatusDotProps {
  open: boolean;
  pulse?: boolean;
}

// Punto de color decorativo: el estado siempre se acompaña de texto.
export const StatusDot = ({ open, pulse = true }: StatusDotProps) => (
  <span
    aria-hidden="true"
    className={[styles.dot, open ? styles.open : styles.closed, open && pulse && styles.pulse].filter(Boolean).join(' ')}
  />
);
