import type { ReactNode } from 'react';
import styles from './visually-hidden.module.css';

export interface VisuallyHiddenProps {
  children: ReactNode;
  id?: string;
}

// Texto solo para lectores de pantalla.
export const VisuallyHidden = ({ children, id }: VisuallyHiddenProps) => (
  <span id={id} className={styles.visuallyHidden}>
    {children}
  </span>
);
