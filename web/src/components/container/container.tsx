import type { ReactNode } from 'react';
import styles from './container.module.css';

export interface ContainerProps {
  children: ReactNode;
  className?: string;
}

// Ancho máximo de la página con sus márgenes laterales.
export const Container = ({ children, className }: ContainerProps) => (
  <div className={[styles.container, className].filter(Boolean).join(' ')}>{children}</div>
);
