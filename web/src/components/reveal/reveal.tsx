import { useRef, type ReactNode } from 'react';
import { useReveal } from '@hooks/use-reveal';
import styles from './reveal.module.css';
import { getRevealStyle } from './reveal.helper';

export interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

// Bloque que aparece con un fundido suave al entrar en pantalla.
export const Reveal = ({ children, delay = 0, className }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useReveal(ref);

  return (
    <div ref={ref} className={[styles.reveal, className].filter(Boolean).join(' ')} style={getRevealStyle(delay)}>
      {children}
    </div>
  );
};
