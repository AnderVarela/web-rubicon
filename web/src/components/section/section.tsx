import type { ReactNode } from 'react';
import { Container } from '@components/container';
import styles from './section.module.css';
import { DEFAULT_SECTION_TONE, SectionTone } from './section.const';

export interface SectionProps {
  id: string;
  labelledBy: string;
  tone?: SectionTone;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}

// Sección de la página con ancla para el menú y su título como nombre accesible.
export const Section = ({ id, labelledBy, tone = DEFAULT_SECTION_TONE, children, className, containerClassName }: SectionProps) => (
  <section id={id} aria-labelledby={labelledBy} className={[styles.section, styles[tone], className].filter(Boolean).join(' ')}>
    <Container className={containerClassName}>{children}</Container>
  </section>
);
